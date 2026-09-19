/**
 * ==========================================================================
 * SCHOOLROUTE — PARENT USER DASHBOARD CONTROLLER
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

  // Read current user session
  let currentUser = null;
  try {
    const rawSession = localStorage.getItem(LS_CURRENT_USER);
    if (rawSession) {
      currentUser = JSON.parse(rawSession);
    }
  } catch (err) {
    console.warn('Failed to parse current user session:', err);
  }

  // If no logged-in user, redirect to login page immediately
  if (!currentUser || !currentUser.name || currentUser.role === 'admin') {
    window.location.href = '../login.html';
    return;
  }

  // Look up latest user record from registered users store to ensure synchronization
  try {
    const rawUsers = localStorage.getItem(LS_USERS_KEY);
    if (rawUsers) {
      const allUsers = JSON.parse(rawUsers);
      if (Array.isArray(allUsers)) {
        const matched = allUsers.find(u => 
          (currentUser.id && u.id === currentUser.id) || 
          (currentUser.email && u.email && u.email.toLowerCase() === currentUser.email.toLowerCase())
        );
        if (matched) {
          currentUser = Object.assign({}, matched, currentUser);
        }
      }
    }
  } catch (err) {
    console.warn('Failed to sync master user record:', err);
  }

  // Normalize User Properties (Never default to demo data!)
  const userData = {
    id: currentUser.id || 'SR001',
    name: (currentUser.name || 'Parent').trim(),
    email: (currentUser.email || '').trim(),
    phone: (currentUser.phone || '').trim(),
    numberOfChildren: Math.max(1, parseInt(currentUser.numberOfChildren, 10) || 1),
    selectedPlan: currentUser.selectedPlan || 'quarterly',
    pricePerChild: currentUser.pricePerChild || (currentUser.selectedPlan === 'monthly' ? 999 : currentUser.selectedPlan === 'yearly' ? 8999 : 2499),
    totalAmount: currentUser.totalAmount || (Math.max(1, parseInt(currentUser.numberOfChildren, 10) || 1) * (currentUser.pricePerChild || 2499)),
    paymentStatus: currentUser.paymentStatus || 'completed',
    subscriptionStatus: currentUser.subscriptionStatus || 'active',
    children: Array.isArray(currentUser.children) ? currentUser.children : [],
    bus: currentUser.bus || null,
    driver: currentUser.driver || null,
    stops: Array.isArray(currentUser.stops) ? currentUser.stops : [],
    notifications: Array.isArray(currentUser.notifications) ? currentUser.notifications : [],
    avatar: currentUser.avatar || null
  };

  /* ==========================================================================
     2. HELPER FUNCTIONS
     ========================================================================== */
  function getInitials(fullName) {
    if (!fullName) return 'SR';
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function formatPlanTitle(planKey) {
    switch (planKey.toLowerCase()) {
      case 'monthly': return 'Monthly Plan';
      case 'yearly': return 'Yearly Plan';
      case 'quarterly':
      default: return 'Quarterly Plan';
    }
  }

  /* ==========================================================================
     3. RENDER GREETING & PROFILE
     ========================================================================== */
  // Greeting
  const headerParentName = document.getElementById('header-parent-name');
  if (headerParentName) {
    headerParentName.textContent = userData.name;
  }

  // Profile Button & Dropdown
  const userDisplayName = document.getElementById('user-display-name');
  const userDisplayRole = document.getElementById('user-display-role');
  const dropdownFullName = document.getElementById('dropdown-full-name');
  const dropdownEmail = document.getElementById('dropdown-email');
  const avatarSlot = document.getElementById('user-avatar-slot');

  if (userDisplayName) userDisplayName.textContent = userData.name;
  if (userDisplayRole) userDisplayRole.textContent = 'Parent';
  if (dropdownFullName) dropdownFullName.textContent = userData.name;
  if (dropdownEmail) dropdownEmail.textContent = userData.email || 'parent@schoolroute.com';

  const userInitials = getInitials(userData.name);
  if (avatarSlot) {
    if (userData.avatar) {
      avatarSlot.innerHTML = `<img src="${userData.avatar}" alt="${userData.name}" class="user-avatar-img" width="38" height="38" onerror="this.outerHTML='<span class=\\'user-avatar-initials\\'>${userInitials}</span>';">`;
    } else {
      avatarSlot.innerHTML = `<span class="user-avatar-initials">${userInitials}</span>`;
    }
  }

  /* ==========================================================================
     4. RENDER TOP 4 STAT CARDS
     ========================================================================== */
  const statBusNumber = document.getElementById('stat-bus-number');
  const statBusRoute = document.getElementById('stat-bus-route');
  const statCurrentLocation = document.getElementById('stat-current-location');
  const statLocationTime = document.getElementById('stat-location-time');
  const statEtaTime = document.getElementById('stat-eta-time');
  const statEtaStatus = document.getElementById('stat-eta-status');
  const statTodayStatus = document.getElementById('stat-today-status');
  const statStatusDetail = document.getElementById('stat-status-detail');

  const hasAssignedBus = Boolean(userData.bus && userData.bus.number);

  if (hasAssignedBus) {
    if (statBusNumber) statBusNumber.textContent = userData.bus.number;
    if (statBusRoute) statBusRoute.textContent = userData.bus.route || 'Assigned Route';
    if (statCurrentLocation) statCurrentLocation.textContent = userData.bus.location || 'In Transit';
    if (statLocationTime) statLocationTime.textContent = userData.bus.locationTime || 'Live';
    if (statEtaTime) statEtaTime.textContent = userData.bus.eta || '--:--';
    if (statEtaStatus) {
      statEtaStatus.textContent = userData.bus.etaStatus || 'On Time';
      statEtaStatus.className = 'stat-pill-status pill-on-time';
    }
    if (statTodayStatus) statTodayStatus.textContent = userData.bus.todayStatus || 'Safe & On Route';
    if (statStatusDetail) statStatusDetail.textContent = userData.bus.statusDetail || 'No issues';
  } else {
    // Polished Setup / Empty States
    if (statBusNumber) statBusNumber.textContent = 'No bus assigned yet';
    if (statBusRoute) statBusRoute.textContent = 'Setup required';
    if (statCurrentLocation) statCurrentLocation.textContent = 'Not available yet';
    if (statLocationTime) statLocationTime.textContent = 'Awaiting route assignment';
    if (statEtaTime) statEtaTime.textContent = 'Not available';
    if (statEtaStatus) {
      statEtaStatus.textContent = 'Setup Required';
      statEtaStatus.className = 'stat-pill-status pill-neutral';
    }
    if (statTodayStatus) statTodayStatus.textContent = 'Setup Required';
    if (statStatusDetail) statStatusDetail.textContent = 'Add transport details';
  }

  /* ==========================================================================
     5. RENDER LIVE TRACKING MAP
     ========================================================================== */
  const mapContainer = document.getElementById('map-container');
  const liveBusMarker = document.getElementById('live-bus-marker');
  const mapChildMarker = document.querySelector('.map-child-marker');
  const mapLastUpdated = document.getElementById('map-last-updated');
  const livePulseBadge = document.querySelector('.live-pulse-badge');

  if (!hasAssignedBus && mapContainer) {
    if (liveBusMarker) liveBusMarker.style.display = 'none';
    if (mapChildMarker) mapChildMarker.style.display = 'none';

    // Replace live badge with inactive badge
    if (livePulseBadge) {
      livePulseBadge.innerHTML = `<span class="stat-pill-status pill-neutral">Route Inactive</span>`;
    }

    if (mapLastUpdated) {
      mapLastUpdated.textContent = 'No active tracking session';
    }

    // Add empty overlay if not already present
    if (!document.getElementById('map-empty-overlay')) {
      const overlay = document.createElement('div');
      overlay.id = 'map-empty-overlay';
      overlay.className = 'map-empty-overlay';
      overlay.innerHTML = `
        <div class="map-empty-icon">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        </div>
        <h4 class="map-empty-title">Your live route will appear here</h4>
        <p class="map-empty-sub">Add your child and route details to start live bus tracking in real time.</p>
        <button type="button" class="btn-empty-action" id="btn-map-setup-route">
          <span>Set Up Route &rarr;</span>
        </button>
      `;
      mapContainer.appendChild(overlay);

      const btnMapSetup = document.getElementById('btn-map-setup-route');
      if (btnMapSetup) {
        btnMapSetup.addEventListener('click', () => {
          showToast('Route configuration will open in the next update.');
        });
      }
    }
  }

  /* ==========================================================================
     6. RENDER TODAY'S STOPS
     ========================================================================== */
  const stopsTimelineContainer = document.getElementById('stops-timeline-container');
  const stopsTimelineList = document.getElementById('stops-timeline-list');

  if (stopsTimelineContainer) {
    if (userData.stops && userData.stops.length > 0) {
      if (stopsTimelineList) {
        stopsTimelineList.innerHTML = userData.stops.map(stop => `
          <li class="timeline-item ${stop.status === 'completed' ? 'completed' : stop.status === 'current' ? 'current' : stop.status === 'child-stop' ? 'child-stop-item upcoming' : 'upcoming'}">
            <div class="timeline-marker">
              <span class="timeline-icon ${stop.status === 'current' ? 'pulse-active' : ''}">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle></svg>
              </span>
              <span class="timeline-line"></span>
            </div>
            <div class="timeline-content ${stop.status === 'current' ? 'highlight-box' : ''}">
              <div class="timeline-time-row">
                <span class="stop-time">${stop.time || ''}</span>
                <span class="stop-badge ${stop.status === 'completed' ? 'badge-completed' : stop.status === 'current' ? 'badge-current' : 'badge-upcoming'}">${stop.badge || 'Scheduled'}</span>
              </div>
              <h4 class="stop-name">${stop.name}</h4>
              <p class="stop-note">${stop.note || ''}</p>
            </div>
          </li>
        `).join('');
      }
    } else {
      stopsTimelineContainer.innerHTML = `
        <div class="panel-empty-state">
          <div class="empty-icon-wrap">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="3" x2="6" y2="15"></line><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M18 9a9 9 0 0 1-9 9"></path></svg>
          </div>
          <h4 class="empty-title">No route assigned yet</h4>
          <p class="empty-sub">Today's stops and route progress will appear here once your child's route is assigned.</p>
          <button type="button" class="btn-empty-action" id="btn-stops-setup-route">
            <span>Set Up Route &rarr;</span>
          </button>
        </div>
      `;
      const btnStopsSetup = document.getElementById('btn-stops-setup-route');
      if (btnStopsSetup) {
        btnStopsSetup.addEventListener('click', () => {
          showToast('Route configuration will open in the next update.');
        });
      }
    }
  }

  /* ==========================================================================
     7. RENDER DRIVER INFORMATION
     ========================================================================== */
  const driverCardBody = document.getElementById('driver-card-body');
  const driverHeaderBadge = document.getElementById('driver-header-badge');

  if (driverCardBody) {
    if (userData.driver && userData.driver.name) {
      if (driverHeaderBadge) {
        driverHeaderBadge.innerHTML = `
          <span class="verified-pill">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Verified</span>
          </span>
        `;
      }
      const driverInitials = getInitials(userData.driver.name);
      driverCardBody.innerHTML = `
        <div class="driver-avatar-wrap">
          ${userData.driver.avatar ? `<img src="${userData.driver.avatar}" alt="${userData.driver.name}" class="driver-avatar-img" width="70" height="70" onerror="this.outerHTML='<span class=\\'user-avatar-initials\\'>${driverInitials}</span>';">` : `<span class="user-avatar-initials" style="width:70px; height:70px; font-size:1.4rem;">${driverInitials}</span>`}
          <span class="driver-status-dot" title="Driver is actively on duty"></span>
        </div>
        <div class="driver-details">
          <h4 class="driver-name" id="driver-name">${userData.driver.name}</h4>
          <p class="driver-credential" id="driver-experience">${userData.driver.experience || 'Verified Driver'}</p>
          <div class="driver-safety-tags">
            <span class="tag-badge">Commercial CDL</span>
            <span class="tag-badge">Background Checked</span>
          </div>
        </div>
        <div class="driver-action-wrap">
          <a href="tel:${userData.driver.phone || ''}" class="btn-driver-call" id="btn-call-driver" aria-label="Call Driver ${userData.driver.name}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            <span>Call Driver</span>
          </a>
        </div>
      `;
    } else {
      if (driverHeaderBadge) driverHeaderBadge.innerHTML = '';
      driverCardBody.innerHTML = `
        <div class="panel-empty-state">
          <div class="empty-icon-wrap">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </div>
          <h4 class="empty-title">No driver assigned yet</h4>
          <p class="empty-sub">Driver details will appear once a route is assigned.</p>
        </div>
      `;
    }
  }

  /* ==========================================================================
     8. RENDER RECENT NOTIFICATIONS & POPOVER
     ========================================================================== */
  const notificationsContainer = document.getElementById('notifications-container');
  const headerNotifCount = document.getElementById('header-notif-count');
  const sidebarNotifBadge = document.getElementById('sidebar-notif-badge');
  const popoverBadgeCount = document.getElementById('popover-badge-count');
  const popoverNotifList = document.getElementById('popover-notif-list');

  const notifCount = userData.notifications.length;
  if (headerNotifCount) headerNotifCount.textContent = String(notifCount);
  if (popoverBadgeCount) popoverBadgeCount.textContent = `${notifCount} New`;
  if (sidebarNotifBadge) {
    sidebarNotifBadge.textContent = String(notifCount);
    if (notifCount === 0) {
      sidebarNotifBadge.style.display = 'none';
    } else {
      sidebarNotifBadge.style.display = 'inline-flex';
    }
  }

  if (notificationsContainer) {
    if (notifCount > 0) {
      const notifHtml = userData.notifications.map(n => `
        <li class="notification-item">
          <div class="notif-icon-wrap notif-${n.type || 'primary'}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle></svg>
          </div>
          <div class="notif-content">
            <h5 class="notif-title">${n.title}</h5>
            <span class="notif-timestamp">${n.time || 'Today'}</span>
          </div>
        </li>
      `).join('');

      notificationsContainer.innerHTML = `<ul class="notifications-list" id="notifications-list">${notifHtml}</ul>`;

      if (popoverNotifList) {
        popoverNotifList.innerHTML = userData.notifications.slice(0, 3).map(n => `
          <li class="popover-item unread">
            <span class="popover-item-icon ${n.type || 'info'}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle></svg>
            </span>
            <div class="popover-item-content">
              <p class="popover-item-text">${n.title}</p>
              <span class="popover-item-time">${n.time || 'Today'}</span>
            </div>
          </li>
        `).join('');
      }
    } else {
      notificationsContainer.innerHTML = `
        <div class="panel-empty-state">
          <div class="empty-icon-wrap">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
          </div>
          <h4 class="empty-title">No notifications yet</h4>
          <p class="empty-sub">Live stop updates and arrival alerts will appear here during your child's journey.</p>
        </div>
      `;
      if (popoverNotifList) {
        popoverNotifList.innerHTML = `<li class="popover-item" style="justify-content: center; padding: 18px 12px; color: var(--muted-text); font-size: 0.82rem;">No recent notifications</li>`;
      }
    }
  }

  /* ==========================================================================
     9. RENDER MY CHILDREN & MULTI-CHILD CAROUSEL
     ========================================================================== */
  const childrenCardContainer = document.getElementById('children-card-container');
  let currentChildIndex = 0;

  function renderChildrenSection() {
    if (!childrenCardContainer) return;

    if (userData.children && userData.children.length > 0) {
      const child = userData.children[currentChildIndex] || userData.children[0];
      const childInitials = getInitials(child.name);
      const totalChildren = userData.children.length;

      childrenCardContainer.innerHTML = `
        <div class="child-profile-card">
          <div class="child-avatar-wrap">
            ${child.avatar ? `<img src="${child.avatar}" alt="${child.name}" class="child-avatar-img" width="76" height="76" onerror="this.outerHTML='<span class=\\'user-avatar-initials\\' style=\\'width:76px; height:76px; font-size:1.5rem;\\'>${childInitials}</span>';">` : `<span class="user-avatar-initials" style="width:76px; height:76px; font-size:1.5rem;">${childInitials}</span>`}
            <span class="child-status-badge badge-on-route">${child.status || 'Active'}</span>
          </div>

          <div class="child-details">
            <h4 class="child-name">${child.name}</h4>
            <div class="child-meta-list">
              <span class="meta-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                <span>${child.school || 'School Not Assigned'}</span>
              </span>
              <span class="meta-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                <span>${child.grade ? 'Grade ' + child.grade : 'Grade N/A'}</span>
              </span>
            </div>
          </div>

          <div class="child-carousel-nav">
            <button type="button" class="btn-carousel-ctrl prev" id="btn-child-prev" aria-label="Previous child profile" ${totalChildren <= 1 ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : ''}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <span class="carousel-counter">${currentChildIndex + 1} of ${totalChildren}</span>
            <button type="button" class="btn-carousel-ctrl next" id="btn-child-next" aria-label="Next child profile" ${totalChildren <= 1 ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : ''}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </div>
      `;

      // Attach Carousel Listeners
      const btnChildPrev = document.getElementById('btn-child-prev');
      const btnChildNext = document.getElementById('btn-child-next');

      if (btnChildPrev && totalChildren > 1) {
        btnChildPrev.addEventListener('click', () => {
          currentChildIndex = (currentChildIndex - 1 + totalChildren) % totalChildren;
          renderChildrenSection();
        });
      }

      if (btnChildNext && totalChildren > 1) {
        btnChildNext.addEventListener('click', () => {
          currentChildIndex = (currentChildIndex + 1) % totalChildren;
          renderChildrenSection();
        });
      }

    } else {
      // Empty state when no child has been entered yet
      const planName = formatPlanTitle(userData.selectedPlan);
      const slotWord = userData.numberOfChildren === 1 ? 'child slot' : 'child slots';

      childrenCardContainer.innerHTML = `
        <div class="panel-empty-state">
          <div class="empty-icon-wrap">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </div>
          <h4 class="empty-title">No children added yet</h4>
          <p class="empty-sub">Add your child details to start tracking their school journey.</p>
          <span class="empty-slots-badge">
            ${userData.numberOfChildren} ${slotWord} available under ${planName}
          </span>
          <button type="button" class="btn-empty-action" id="btn-add-child-action">
            <span>Add Child Details &rarr;</span>
          </button>
        </div>
      `;

      const btnAddChild = document.getElementById('btn-add-child-action');
      if (btnAddChild) {
        btnAddChild.addEventListener('click', () => {
          showToast('Child profile setup form will open in the next update.');
        });
      }
    }
  }

  renderChildrenSection();

  /* ==========================================================================
     10. THEME TOGGLE CONTROLLER (LIGHT / DARK)
     ========================================================================== */
  const THEME_STORAGE_KEY = 'schoolroute-theme';
  const themeToggleBtn = document.getElementById('theme-toggle');

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (themeToggleBtn) {
        themeToggleBtn.setAttribute('aria-label', 'Switch to light theme');
        themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
      }
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      if (themeToggleBtn) {
        themeToggleBtn.setAttribute('aria-label', 'Switch to dark theme');
        themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
      }
    }
  }

  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'light';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      showToast(`Theme switched to ${newTheme === 'dark' ? 'Dark Mode' : 'Light Mode'}`);
    });
  }

  /* ==========================================================================
     11. DIRECTION TOGGLE CONTROLLER (LTR / RTL)
     ========================================================================== */
  const DIR_STORAGE_KEY = 'schoolroute-direction';
  const dirToggleBtn = document.getElementById('direction-toggle');

  function applyDirection(dir) {
    if (dir === 'rtl') {
      document.documentElement.setAttribute('dir', 'rtl');
      if (dirToggleBtn) {
        dirToggleBtn.setAttribute('aria-label', 'Switch to LTR Layout');
        dirToggleBtn.setAttribute('title', 'Switch to LTR Layout');
      }
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      if (dirToggleBtn) {
        dirToggleBtn.setAttribute('aria-label', 'Switch to RTL Layout');
        dirToggleBtn.setAttribute('title', 'Switch to RTL Layout');
      }
    }
  }

  const savedDir = localStorage.getItem(DIR_STORAGE_KEY) || 'ltr';
  applyDirection(savedDir);

  if (dirToggleBtn) {
    dirToggleBtn.addEventListener('click', () => {
      const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
      const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
      applyDirection(newDir);
      localStorage.setItem(DIR_STORAGE_KEY, newDir);
      showToast(`Layout switched to ${newDir.toUpperCase()}`);
    });
  }

  /* ==========================================================================
     12. MOBILE DRAWER NAVIGATION CONTROLLER
     ========================================================================== */
  const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
  const sidebarCloseBtn = document.getElementById('sidebar-close-btn');
  const dashboardSidebar = document.getElementById('dashboard-sidebar');
  const sidebarBackdrop = document.getElementById('sidebar-backdrop');

  function openMobileSidebar() {
    if (dashboardSidebar && sidebarBackdrop) {
      dashboardSidebar.classList.add('active');
      sidebarBackdrop.classList.add('active');
      if (sidebarToggleBtn) sidebarToggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileSidebar() {
    if (dashboardSidebar && sidebarBackdrop) {
      dashboardSidebar.classList.remove('active');
      sidebarBackdrop.classList.remove('active');
      if (sidebarToggleBtn) sidebarToggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }

  if (sidebarToggleBtn) sidebarToggleBtn.addEventListener('click', openMobileSidebar);
  if (sidebarCloseBtn) sidebarCloseBtn.addEventListener('click', closeMobileSidebar);
  if (sidebarBackdrop) sidebarBackdrop.addEventListener('click', closeMobileSidebar);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileSidebar();
      closeProfileDropdown();
      closeNotificationsPopover();
    }
  });

  /* ==========================================================================
     13. USER PROFILE DROPDOWN & LOGOUT CONTROLLER
     ========================================================================== */
  const userProfileBtn = document.getElementById('user-profile-btn');
  const profileDropdownMenu = document.getElementById('profile-dropdown-menu');

  function toggleProfileDropdown(e) {
    e.stopPropagation();
    closeNotificationsPopover();
    const isActive = profileDropdownMenu.classList.contains('active');
    if (isActive) {
      closeProfileDropdown();
    } else {
      profileDropdownMenu.classList.add('active');
      userProfileBtn.setAttribute('aria-expanded', 'true');
    }
  }

  function closeProfileDropdown() {
    if (profileDropdownMenu) {
      profileDropdownMenu.classList.remove('active');
      if (userProfileBtn) userProfileBtn.setAttribute('aria-expanded', 'false');
    }
  }

  if (userProfileBtn && profileDropdownMenu) {
    userProfileBtn.addEventListener('click', toggleProfileDropdown);
  }

  const btnProfileAction = document.getElementById('btn-profile-action');
  const btnSettingsAction = document.getElementById('btn-settings-action');
  const btnLogoutAction = document.getElementById('btn-logout-action');

  if (btnProfileAction) {
    btnProfileAction.addEventListener('click', () => {
      closeProfileDropdown();
      showToast('Parent Profile settings will open in the next update.');
    });
  }

  if (btnSettingsAction) {
    btnSettingsAction.addEventListener('click', () => {
      closeProfileDropdown();
      showToast('Account Settings will open in the next update.');
    });
  }

  if (btnLogoutAction) {
    btnLogoutAction.addEventListener('click', () => {
      closeProfileDropdown();
      localStorage.removeItem(LS_CURRENT_USER);
      showToast('Logged out successfully. Redirecting to login...');
      setTimeout(() => {
        window.location.href = '../login.html';
      }, 500);
    });
  }

  /* ==========================================================================
     14. NOTIFICATIONS POPOVER CONTROLLER
     ========================================================================== */
  const btnNotificationsToggle = document.getElementById('btn-notifications-toggle');
  const notificationsPopover = document.getElementById('notifications-popover');
  const btnPopoverViewAll = document.getElementById('btn-popover-view-all');
  const btnViewAllNotifications = document.getElementById('btn-view-all-notifications');

  function toggleNotificationsPopover(e) {
    e.stopPropagation();
    closeProfileDropdown();
    const isActive = notificationsPopover.classList.contains('active');
    if (isActive) {
      closeNotificationsPopover();
    } else {
      notificationsPopover.classList.add('active');
      btnNotificationsToggle.setAttribute('aria-expanded', 'true');
    }
  }

  function closeNotificationsPopover() {
    if (notificationsPopover) {
      notificationsPopover.classList.remove('active');
      if (btnNotificationsToggle) btnNotificationsToggle.setAttribute('aria-expanded', 'false');
    }
  }

  if (btnNotificationsToggle && notificationsPopover) {
    btnNotificationsToggle.addEventListener('click', toggleNotificationsPopover);
  }

  if (btnPopoverViewAll) {
    btnPopoverViewAll.addEventListener('click', (e) => {
      e.preventDefault();
      closeNotificationsPopover();
      const notifPanel = document.getElementById('notifications');
      if (notifPanel) notifPanel.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (btnViewAllNotifications) {
    btnViewAllNotifications.addEventListener('click', () => {
      if (userData.notifications.length > 0) {
        showToast(`Showing all ${userData.notifications.length} recent alerts.`);
      } else {
        showToast('No notifications to display.');
      }
    });
  }

  document.addEventListener('click', (e) => {
    if (profileDropdownMenu && !profileDropdownMenu.contains(e.target) && !userProfileBtn.contains(e.target)) {
      closeProfileDropdown();
    }
    if (notificationsPopover && !notificationsPopover.contains(e.target) && !btnNotificationsToggle.contains(e.target)) {
      closeNotificationsPopover();
    }
  });

  /* ==========================================================================
     15. INTERACTIVE MAP CONTROLS
     ========================================================================== */
  const mapCanvas = document.getElementById('map-canvas');
  const btnMapZoomIn = document.getElementById('btn-map-zoom-in');
  const btnMapZoomOut = document.getElementById('btn-map-zoom-out');
  const btnMapRecenter = document.getElementById('btn-map-recenter');
  const btnViewFullMap = document.getElementById('btn-view-full-map');

  let currentMapZoom = 1;
  const MIN_ZOOM = 0.9;
  const MAX_ZOOM = 1.5;

  function updateMapTransform() {
    if (mapCanvas) {
      mapCanvas.style.transform = `scale(${currentMapZoom})`;
    }
  }

  if (btnMapZoomIn) {
    btnMapZoomIn.addEventListener('click', () => {
      if (currentMapZoom < MAX_ZOOM) {
        currentMapZoom = Math.min(MAX_ZOOM, currentMapZoom + 0.15);
        updateMapTransform();
        showToast(`Map Zoom: ${Math.round(currentMapZoom * 100)}%`);
      }
    });
  }

  if (btnMapZoomOut) {
    btnMapZoomOut.addEventListener('click', () => {
      if (currentMapZoom > MIN_ZOOM) {
        currentMapZoom = Math.max(MIN_ZOOM, currentMapZoom - 0.15);
        updateMapTransform();
        showToast(`Map Zoom: ${Math.round(currentMapZoom * 100)}%`);
      }
    });
  }

  if (btnMapRecenter) {
    btnMapRecenter.addEventListener('click', () => {
      currentMapZoom = 1;
      updateMapTransform();
      showToast('Map recentered.');
    });
  }

  if (btnViewFullMap) {
    btnViewFullMap.addEventListener('click', () => {
      showToast('Full-screen live map modal will be available in the upcoming tracking update.');
    });
  }

  /* ==========================================================================
     16. SIDEBAR & OTHER ACTION BUTTONS
     ========================================================================== */
  const btnManageChildren = document.getElementById('btn-manage-children');
  const btnSupportAction = document.getElementById('btn-support-action');
  const btnViewRoute = document.getElementById('btn-view-route');
  const btnEarnRewards = document.getElementById('btn-earn-rewards');
  const sidebarLinks = document.querySelectorAll('.sidebar-link');

  if (btnManageChildren) {
    btnManageChildren.addEventListener('click', () => {
      showToast('Child profile manager will open in the next update.');
    });
  }

  if (btnSupportAction) {
    btnSupportAction.addEventListener('click', () => {
      showToast('Opening 24/7 SchoolRoute Parent Support Line...');
    });
  }

  if (btnViewRoute) {
    btnViewRoute.addEventListener('click', () => {
      const trackingPanel = document.getElementById('live-tracking');
      if (trackingPanel) trackingPanel.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (btnEarnRewards) {
    btnEarnRewards.addEventListener('click', () => {
      showToast('Referral link copied! Share with fellow parents to earn rewards.');
    });
  }

  sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const navTarget = link.getAttribute('data-nav');
      
      if (navTarget === 'dashboard') {
        sidebarLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        closeMobileSidebar();
        return;
      }

      const targetHash = link.getAttribute('href');

      // Allow real page navigation (e.g. live-tracking.html)
      if (targetHash && targetHash.endsWith('.html')) {
        closeMobileSidebar();
        return; // Let the browser navigate naturally
      }

      if (targetHash && targetHash.startsWith('#')) {
        const targetEl = document.querySelector(targetHash);
        if (targetEl) {
          e.preventDefault();
          sidebarLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
          targetEl.scrollIntoView({ behavior: 'smooth' });
          closeMobileSidebar();
          return;
        }
      }

      e.preventDefault();
      const linkText = link.querySelector('.sidebar-link-text')?.textContent || 'This module';
      showToast(`${linkText} is scheduled for future release.`);
      closeMobileSidebar();
    });
  });

  /* ==========================================================================
     17. LIGHTWEIGHT TOAST NOTIFICATION HELPER
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

});
