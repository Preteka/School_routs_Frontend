/**
 * ==========================================================================
 * SCHOOLROUTE — SUPPORT & HELP CENTER CONTROLLER
 * Tagline: SAFE KIDS • STRONGER TOMORROWS
 * Vanilla JavaScript (User-Specific Data, Zero Fake Tickets)
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
     2. DOM ELEMENTS
     ========================================================================== */
  const supportTicketForm = document.getElementById('support-ticket-form');
  const supportName = document.getElementById('support-name');
  const supportEmail = document.getElementById('support-email');
  const supportSubject = document.getElementById('support-subject');
  const supportMessage = document.getElementById('support-message');
  const supportSuccessBanner = document.getElementById('support-success-banner');

  // Prepopulate with logged-in user credentials
  if (supportName) supportName.value = currentUser.name || '';
  if (supportEmail) supportEmail.value = currentUser.email || '';

  /* ==========================================================================
     3. FAQ ACCORDION HANDLERS
     ========================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close other items
        faqItems.forEach(i => {
          i.classList.remove('active');
          const b = i.querySelector('.faq-question-btn');
          if (b) b.setAttribute('aria-expanded', 'false');
        });

        // Toggle current item
        if (!isActive) {
          item.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  /* ==========================================================================
     4. CONTACT FORM SUBMISSION
     ========================================================================== */
  if (supportTicketForm) {
    supportTicketForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameVal = supportName ? supportName.value.trim() : '';
      const emailVal = supportEmail ? supportEmail.value.trim() : '';
      const subjVal = supportSubject ? supportSubject.value.trim() : '';
      const msgVal = supportMessage ? supportMessage.value.trim() : '';

      if (!nameVal || !emailVal || !subjVal || !msgVal) {
        showToast('Please fill out all required fields.');
        return;
      }

      // Show success alert
      if (supportSuccessBanner) {
        supportSuccessBanner.style.display = 'flex';
        supportSuccessBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      showToast('Support request submitted successfully!');

      // Reset specific fields but keep name & email
      if (supportSubject) supportSubject.value = '';
      if (supportMessage) supportMessage.value = '';

      setTimeout(() => {
        if (supportSuccessBanner) supportSuccessBanner.style.display = 'none';
      }, 6000);
    });
  }

  /* ==========================================================================
     5. TOAST NOTIFICATION HELPER
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
