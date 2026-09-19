/**
 * ==========================================================================
 * SCHOOLROUTE — NOTIFICATIONS CONTROLLER
 * Tagline: SAFE KIDS • STRONGER TOMORROWS
 * Vanilla JavaScript (User-Specific Real Data, Zero Demo Fallback)
 * ==========================================================================
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. AUTHENTICATION & USER SESSION VALIDATION
     ========================================================================== */
  const LS_USERS_KEY = 'schoolroute_users';
  const LS_CURRENT_USER = 'schoolroute_current_user';

  let currentUser = null;
  try {
    const rawSession = localStorage.getItem(LS_CURRENT_USER);
    if (rawSession) currentUser = JSON.parse(rawSession);
  } catch (err) {
    console.warn('Failed to parse current user session:', err);
  }

  if (!currentUser || !currentUser.name || currentUser.role === 'admin') {
    window.location.href = '../login.html';
    return;
  }

  // Sync with master users store
  try {
    const rawUsers = localStorage.getItem(LS_USERS_KEY);
    if (rawUsers) {
      const allUsers = JSON.parse(rawUsers);
      if (Array.isArray(allUsers)) {
        const matched = allUsers.find(u =>
          (currentUser.id && u.id === currentUser.id) ||
          (currentUser.email && u.email && u.email.toLowerCase() === currentUser.email.toLowerCase())
        );
        if (matched) currentUser = Object.assign({}, matched, currentUser);
      }
    }
  } catch (err) {
    console.warn('Failed to sync master user record:', err);
  }

  /* ==========================================================================
     2. HELPERS & PERSISTENCE
     ========================================================================== */
  function persistUser() {
    try {
      localStorage.setItem(LS_CURRENT_USER, JSON.stringify(currentUser));
      const rawUsers = localStorage.getItem(LS_USERS_KEY);
      if (rawUsers) {
        let allUsers = JSON.parse(rawUsers);
        if (Array.isArray(allUsers)) {
          const idx = allUsers.findIndex(u =>
            (currentUser.id && u.id === currentUser.id) ||
            (currentUser.email && u.email && u.email.toLowerCase() === currentUser.email.toLowerCase())
          );
          if (idx !== -1) {
            allUsers[idx] = Object.assign({}, allUsers[idx], currentUser);
          } else {
            allUsers.push(currentUser);
          }
          localStorage.setItem(LS_USERS_KEY, JSON.stringify(allUsers));
        }
      }
    } catch (err) {
      console.warn('Failed to persist user:', err);
    }
  }

  function getCategoryIcon(category) {
    const cat = (category || 'journey').toLowerCase();
    switch (cat) {
      case 'arrival':
        return `
          <div class="notif-card-icon-wrap icon-category-arrival">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          </div>`;
      case 'safety':
        return `
          <div class="notif-card-icon-wrap icon-category-safety">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          </div>`;
      case 'payment':
        return `
          <div class="notif-card-icon-wrap icon-category-payment">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
          </div>`;
      case 'journey':
      default:
        return `
          <div class="notif-card-icon-wrap icon-category-journey">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="13" rx="2"></rect><circle cx="7" cy="19" r="2"></circle><circle cx="17" cy="19" r="2"></circle><path d="M3 11h18"></path></svg>
          </div>`;
    }
  }

  /* ==========================================================================
     3. DOM ELEMENTS
     ========================================================================== */
  const notifFeedList = document.getElementById('notif-feed-list');
  const notifEmptyState = document.getElementById('notif-empty-state');
  const notifSearch = document.getElementById('notif-search');
  const tabButtons = document.querySelectorAll('.notif-tab-btn');
  const btnMarkAllRead = document.getElementById('btn-mark-all-read');
  const btnClearRead = document.getElementById('btn-clear-read');

  const countAll = document.getElementById('count-all');
  const countJourney = document.getElementById('count-journey');
  const countArrival = document.getElementById('count-arrival');
  const countSafety = document.getElementById('count-safety');
  const countPayment = document.getElementById('count-payment');

  let currentCategory = 'all';
  let searchQuery = '';

  /* ==========================================================================
     4. RENDER NOTIFICATIONS
     ========================================================================== */
  function getNotifications() {
    return Array.isArray(currentUser.notifications) ? currentUser.notifications : [];
  }

  function updateCounts() {
    const list = getNotifications();
    const journeyCount = list.filter(n => (n.category || 'journey').toLowerCase() === 'journey').length;
    const arrivalCount = list.filter(n => (n.category || '').toLowerCase() === 'arrival').length;
    const safetyCount = list.filter(n => (n.category || '').toLowerCase() === 'safety').length;
    const paymentCount = list.filter(n => (n.category || '').toLowerCase() === 'payment').length;

    if (countAll) countAll.textContent = list.length;
    if (countJourney) countJourney.textContent = journeyCount;
    if (countArrival) countArrival.textContent = arrivalCount;
    if (countSafety) countSafety.textContent = safetyCount;
    if (countPayment) countPayment.textContent = paymentCount;
  }

  function renderNotifications() {
    updateCounts();

    const allNotifs = getNotifications();

    // Filter by Category & Search query
    let filtered = allNotifs.filter(item => {
      const cat = (item.category || 'journey').toLowerCase();
      const matchCat = (currentCategory === 'all') || (cat === currentCategory);

      const title = (item.title || item.message || '').toLowerCase();
      const desc = (item.desc || item.detail || '').toLowerCase();
      const matchQuery = !searchQuery || title.includes(searchQuery) || desc.includes(searchQuery);

      return matchCat && matchQuery;
    });

    if (filtered.length === 0) {
      if (notifFeedList) notifFeedList.innerHTML = '';
      if (notifEmptyState) notifEmptyState.style.display = 'flex';
      return;
    }

    if (notifEmptyState) notifEmptyState.style.display = 'none';

    notifFeedList.innerHTML = filtered.map((item, idx) => {
      const isUnread = item.read === false || item.unread === true;
      const title = item.title || item.message || 'Notification Alert';
      const desc = item.desc || item.detail || 'Your child\'s school bus route update.';
      const time = item.time || 'Today';
      const category = (item.category || 'journey').toLowerCase();

      return `
        <li class="notif-card-item ${isUnread ? 'unread' : ''}" data-index="${idx}" data-id="${item.id || idx}">
          ${getCategoryIcon(category)}
          <div class="notif-card-content">
            <div class="notif-title-row">
              <h4 class="notif-card-title">
                ${isUnread ? '<span class="unread-dot" title="Unread"></span>' : ''}
                <span>${title}</span>
              </h4>
              <span class="notif-card-time">${time}</span>
            </div>
            <p class="notif-card-desc">${desc}</p>
            <div class="notif-footer-actions">
              <span class="notif-category-badge">${category}</span>
              <div style="display: flex; gap: 0.85rem;">
                ${(category === 'journey' || category === 'arrival') ? '<a href="live-tracking.html" class="btn-notif-item-action">Track Bus →</a>' : ''}
                ${(category === 'payment') ? '<a href="payments.html" class="btn-notif-item-action">View Payment →</a>' : ''}
                <button type="button" class="btn-notif-item-action btn-toggle-read" data-idx="${allNotifs.indexOf(item)}">
                  ${isUnread ? 'Mark as read' : 'Mark as unread'}
                </button>
              </div>
            </div>
          </div>
        </li>
      `;
    }).join('');

    // Attach read toggles
    document.querySelectorAll('.btn-toggle-read').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.currentTarget.getAttribute('data-idx'), 10);
        if (currentUser.notifications && currentUser.notifications[index]) {
          const item = currentUser.notifications[index];
          const isCurrentlyUnread = item.read === false || item.unread === true;
          item.read = isCurrentlyUnread;
          item.unread = !isCurrentlyUnread;
          persistUser();
          renderNotifications();
        }
      });
    });
  }

  /* ==========================================================================
     5. CATEGORY TAB SWITCHING
     ========================================================================== */
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      currentCategory = btn.getAttribute('data-filter') || 'all';
      renderNotifications();
    });
  });

  /* ==========================================================================
     6. SEARCH FILTER
     ========================================================================== */
  if (notifSearch) {
    notifSearch.addEventListener('input', (e) => {
      searchQuery = (e.target.value || '').trim().toLowerCase();
      renderNotifications();
    });
  }

  /* ==========================================================================
     7. TOP ACTIONS (MARK ALL READ & CLEAR READ)
     ========================================================================== */
  if (btnMarkAllRead) {
    btnMarkAllRead.addEventListener('click', () => {
      const list = getNotifications();
      if (list.length === 0) return;
      list.forEach(n => {
        n.read = true;
        n.unread = false;
      });
      currentUser.notifications = list;
      persistUser();
      renderNotifications();
      showToast('All notifications marked as read.');
    });
  }

  if (btnClearRead) {
    btnClearRead.addEventListener('click', () => {
      const list = getNotifications();
      const unreadOnly = list.filter(n => n.read === false || n.unread === true);
      if (list.length === unreadOnly.length) {
        showToast('No read notifications to clear.');
        return;
      }
      currentUser.notifications = unreadOnly;
      persistUser();
      renderNotifications();
      showToast('Cleared all read notifications.');
    });
  }

  /* ==========================================================================
     8. TOAST NOTIFICATION HELPER
     ========================================================================== */
  function showToast(message) {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'dashboard-toast';
    toast.setAttribute('role', 'status');

    toast.innerHTML = `
      <span class="toast-icon-wrap">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
      </span>
      <span class="toast-message-text">${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toast-slide-out 0.25s cubic-bezier(0.2, 0.8, 0.3, 1) forwards';
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 250);
    }, 3500);
  }

  // Initial Execution
  renderNotifications();


  // Global Profile Logout Handler
  const logoutBtn = document.getElementById('btn-logout-action');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem(LS_CURRENT_USER);
      if (typeof showToast === 'function') showToast('Logged out successfully.');
      setTimeout(() => { window.location.href = '../login.html'; }, 300);
    });
  }

});
