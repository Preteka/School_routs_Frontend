/* ==========================================================================
   SCHOOLROUTE — ADMIN DASHBOARD INTERACTIONS
   ========================================================================== */

(function () {
  'use strict';

  /* -------------------------------------------------------------------------
     ADMIN AUTHENTICATION & ACCESS CONTROL
  --------------------------------------------------------------------------- */
  const LS_CURRENT_USER = 'schoolroute_current_user';
  let currentAdminUser = null;
  try {
    const rawSession = localStorage.getItem(LS_CURRENT_USER);
    if (rawSession) {
      currentAdminUser = JSON.parse(rawSession);
    }
  } catch (err) {
    console.warn('Failed to parse admin session:', err);
  }

  // If no logged-in user or if not an admin, redirect to public login page immediately
  if (!currentAdminUser || currentAdminUser.role !== 'admin') {
    window.location.href = '../login.html';
    return;
  }


  /* -------------------------------------------------------------------------
     UTILS
  --------------------------------------------------------------------------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* -------------------------------------------------------------------------
     THEME TOGGLE  (light ↔ dark)
  --------------------------------------------------------------------------- */
  const html = document.documentElement;
  const btnTheme = $('#btn-theme-toggle');

  function getStoredTheme() {
    return localStorage.getItem('sr-admin-theme') || 'light';
  }

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('sr-admin-theme', theme);
  }

  applyTheme(getStoredTheme());

  if (btnTheme) {
    btnTheme.addEventListener('click', () => {
      const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      showToast(next === 'dark' ? 'Dark mode enabled' : 'Light mode enabled');
    });
  }

  /* -------------------------------------------------------------------------
     DIRECTION TOGGLE  (LTR ↔ RTL)
  --------------------------------------------------------------------------- */
  const btnDir = $('#btn-dir-toggle');

  function applyDir(dir) {
    html.setAttribute('dir', dir);
    localStorage.setItem('sr-admin-dir', dir);
  }

  applyDir(localStorage.getItem('sr-admin-dir') || 'ltr');

  if (btnDir) {
    btnDir.addEventListener('click', () => {
      const next = html.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl';
      applyDir(next);
      showToast('Layout: ' + next.toUpperCase());
    });
  }

  /* -------------------------------------------------------------------------
     MOBILE SIDEBAR TOGGLE
  --------------------------------------------------------------------------- */
  const sidebar        = $('#admin-sidebar');
  const backdrop       = $('#sidebar-backdrop');
  const btnToggle      = $('#sidebar-toggle-btn');
  const btnClose       = $('#sidebar-close-btn');

  function openSidebar() {
    sidebar.classList.add('sidebar-open');
    backdrop.classList.add('active');
    btnToggle && btnToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('sidebar-open');
    backdrop.classList.remove('active');
    btnToggle && btnToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  btnToggle && btnToggle.addEventListener('click', openSidebar);
  btnClose  && btnClose.addEventListener('click', closeSidebar);
  backdrop  && backdrop.addEventListener('click', closeSidebar);

  /* -------------------------------------------------------------------------
     NOTIFICATIONS DROPDOWN
  --------------------------------------------------------------------------- */
  const btnNotif     = $('#btn-notifications-toggle');
  const notifMenu    = $('#notifications-dropdown-menu');
  const btnClearAll  = $('#btn-clear-notifications');
  const headerBadge  = $('#header-notif-badge');
  const sidebarBadge = $('#sidebar-notif-count');

  function toggleNotifMenu(forceClose) {
    if (!notifMenu) return;
    const isOpen = notifMenu.classList.contains('open');
    if (forceClose || isOpen) {
      notifMenu.classList.remove('open');
      btnNotif && btnNotif.setAttribute('aria-expanded', 'false');
    } else {
      closeAllDropdowns();
      notifMenu.classList.add('open');
      btnNotif && btnNotif.setAttribute('aria-expanded', 'true');
    }
  }

  btnNotif && btnNotif.addEventListener('click', (e) => { e.stopPropagation(); toggleNotifMenu(); });

  if (btnClearAll) {
    btnClearAll.addEventListener('click', () => {
      $$('.notif-item.unread', notifMenu).forEach(el => el.classList.remove('unread'));
      headerBadge  && (headerBadge.style.display  = 'none');
      sidebarBadge && (sidebarBadge.style.display = 'none');
      btnClearAll.textContent = 'All read';
      const countPill = $('.count-pill', notifMenu);
      if (countPill) countPill.textContent = '0 New';
      showToast('All notifications marked as read', 'success');
    });
  }

  /* -------------------------------------------------------------------------
     PROFILE DROPDOWN
  --------------------------------------------------------------------------- */
  const btnProfile   = $('#btn-profile-toggle');
  const profileMenu  = $('#profile-dropdown-menu');

  function toggleProfileMenu(forceClose) {
    if (!profileMenu) return;
    const isOpen = profileMenu.classList.contains('open');
    if (forceClose || isOpen) {
      profileMenu.classList.remove('open');
      btnProfile && btnProfile.setAttribute('aria-expanded', 'false');
    } else {
      closeAllDropdowns();
      profileMenu.classList.add('open');
      btnProfile && btnProfile.setAttribute('aria-expanded', 'true');
    }
  }

  btnProfile && btnProfile.addEventListener('click', (e) => { e.stopPropagation(); toggleProfileMenu(); });

  function closeAllDropdowns() {
    toggleNotifMenu(true);
    toggleProfileMenu(true);
  }

  document.addEventListener('click', closeAllDropdowns);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeAllDropdowns(); closeModal(); } });

  /* -------------------------------------------------------------------------
     PROFILE DROPDOWN ACTIONS
  --------------------------------------------------------------------------- */
  const btnProfile2  = $('#btn-action-profile');
  const btnSettings  = $('#btn-action-settings');
  const btnLogs      = $('#btn-action-logs');
  const btnLogout    = $('#btn-logout-action');

  btnProfile2 && btnProfile2.addEventListener('click', () => { closeAllDropdowns(); showToast('Opening Admin Profile…'); });
  btnSettings && btnSettings.addEventListener('click', () => { closeAllDropdowns(); showToast('Opening System Settings…'); });
  btnLogs     && btnLogs.addEventListener('click', () => { closeAllDropdowns(); showToast('Loading Audit Logs…'); });
  btnLogout && btnLogout.addEventListener('click', () => {
    closeAllDropdowns();
    localStorage.removeItem(LS_CURRENT_USER);
    showToast('Signing out…', 'warning');
    setTimeout(() => {
      window.location.href = '../login.html';
    }, 400);
  });

  /* -------------------------------------------------------------------------
     SIDEBAR NAVIGATION — active link on click
  --------------------------------------------------------------------------- */
  $$('.sidebar-link').forEach(link => {
    link.addEventListener('click', function (e) {
      $$('.sidebar-link').forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      // On mobile, close sidebar after navigation
      if (window.innerWidth <= 768) closeSidebar();
    });
  });

  /* -------------------------------------------------------------------------
     QUICK ACTION BUTTONS → open modal
  --------------------------------------------------------------------------- */
  const modal           = $('#admin-action-modal');
  const modalTitle      = $('#modal-title');
  const modalBody       = $('#modal-body-content');
  const btnModalCancel  = $('#btn-modal-cancel');
  const btnModalClose   = $('#modal-close-btn');
  const btnModalSubmit  = $('#btn-modal-submit');

  const quickActionConfigs = {

    'btn-add-bus': {
      title: 'Add New Bus',
      fields: [
        { label: 'Bus Number / ID', id: 'f-bus-num', type: 'text', placeholder: 'e.g. Bus #25' },
        { label: 'Registration Plate', id: 'f-bus-reg', type: 'text', placeholder: 'e.g. TN 39 XY 5432' },
        { label: 'Assigned Route', id: 'f-bus-route', type: 'select', options: ['Route 12 — Green Park', 'Route 05 — Lake View', 'Route 08 — Maple Street', 'Route 15 — Industrial Area', 'Stand-by / Unassigned'] },
        { label: 'Seating Capacity', id: 'f-bus-cap', type: 'number', placeholder: '40' }
      ]
    },
    'btn-add-route': {
      title: 'Add New Route',
      fields: [
        { label: 'Route Number', id: 'f-route-num', type: 'text', placeholder: 'e.g. Route 21' },
        { label: 'Route Name & Corridor', id: 'f-route-name', type: 'text', placeholder: 'e.g. Hill Top → Sunrise School' },
        { label: 'Assigned Bus', id: 'f-route-bus', type: 'select', options: ['Bus #01 (TN 39 AB 1201)', 'Bus #07 (TN 39 CD 4521)', 'Bus #12 (TN 39 EF 7832)', 'Bus #24 (TN 39 JK 3190)', 'Stand-by'] },
        { label: 'Departure Schedule', id: 'f-route-time', type: 'text', placeholder: 'e.g. 7:15 AM' }
      ]
    },
    'btn-add-driver-card': {
      title: 'Add Driver Profile',
      fields: [
        { label: 'Driver Full Name', id: 'f-drv-name', type: 'text', placeholder: 'e.g. Rajesh Sharma' },
        { label: 'Driver ID / License', id: 'f-drv-id', type: 'text', placeholder: 'e.g. DRV-005' },
        { label: 'Assigned Bus', id: 'f-drv-bus', type: 'select', options: ['Bus #01', 'Bus #07', 'Bus #12', 'Bus #18', 'Bus #24', 'Stand-by'] },
        { label: 'Contact Phone', id: 'f-drv-phone', type: 'tel', placeholder: 'e.g. +91 98405 12345' }
      ]
    },
    'btn-add-stop': {
      title: 'Add Designated Stop',
      fields: [
        { label: 'Stop Name', id: 'f-stop-name', type: 'text', placeholder: 'e.g. Hill View Crossing' },
        { label: 'Pickup / Arrival Time', id: 'f-stop-time', type: 'text', placeholder: 'e.g. 7:20 AM' },
        { label: 'Route Assignment', id: 'f-stop-route', type: 'select', options: ['Route 12', 'Route 05', 'Route 08', 'Route 15', 'Route 03'] },
        { label: 'Stop Type', id: 'f-stop-type', type: 'select', options: ['Pickup Stop', 'School Arrival', 'Drop-off Only'] }
      ]
    },

    'btn-qa-add-bus': {
      title: 'Add New Bus',
      fields: [
        { label: 'Bus Number', id: 'qa-bus-number', type: 'text', placeholder: 'e.g. Bus #25' },
        { label: 'Registration Plate', id: 'qa-bus-plate', type: 'text', placeholder: 'e.g. KA 01 AB 1234' },
        { label: 'Capacity (Students)', id: 'qa-bus-capacity', type: 'number', placeholder: 'e.g. 45' },
        { label: 'Status', id: 'qa-bus-status', type: 'select', options: ['Active', 'Inactive', 'Under Maintenance'] },
      ]
    },
    'btn-qa-add-driver': {
      title: 'Add New Driver',
      fields: [
        { label: 'Full Name', id: 'qa-driver-name', type: 'text', placeholder: 'e.g. Ramesh Kumar' },
        { label: 'Mobile Number', id: 'qa-driver-mobile', type: 'tel', placeholder: 'e.g. +91 98765 43210' },
        { label: 'License Number', id: 'qa-driver-license', type: 'text', placeholder: 'e.g. DL-0420110012345' },
        { label: 'Assigned Bus', id: 'qa-driver-bus', type: 'text', placeholder: 'e.g. Bus #01' },
      ]
    },
    'btn-qa-manage-routes': {
      title: 'Manage Routes',
      fields: [
        { label: 'Route Name', id: 'qa-route-name', type: 'text', placeholder: 'e.g. Route 12 - Morning' },
        { label: 'Start Stop', id: 'qa-route-start', type: 'text', placeholder: 'e.g. Green Park' },
        { label: 'End Stop', id: 'qa-route-end', type: 'text', placeholder: 'e.g. Sunrise Academy' },
        { label: 'Departure Time', id: 'qa-route-time', type: 'time' },
      ]
    },
    'btn-qa-add-student': {
      title: 'Add New Student',
      fields: [
        { label: 'Student Name', id: 'qa-student-name', type: 'text', placeholder: 'e.g. Arjun Sharma' },
        { label: 'Class / Grade', id: 'qa-student-grade', type: 'text', placeholder: 'e.g. Grade 7A' },
        { label: 'Parent Contact', id: 'qa-student-contact', type: 'tel', placeholder: 'e.g. +91 98765 43210' },
        { label: 'Assigned Stop', id: 'qa-student-stop', type: 'text', placeholder: 'e.g. Maple Street Stop' },
      ]
    }
  };

  function buildModalFields(fields) {
    return fields.map(f => {
      if (f.type === 'select') {
        return `<div class="modal-field">
          <label for="${f.id}">${f.label}</label>
          <select id="${f.id}">
            ${f.options.map(o => `<option>${o}</option>`).join('')}
          </select>
        </div>`;
      }
      return `<div class="modal-field">
        <label for="${f.id}">${f.label}</label>
        <input type="${f.type}" id="${f.id}" placeholder="${f.placeholder || ''}" autocomplete="off">
      </div>`;
    }).join('');
  }

  function openModal(btnId) {
    const config = quickActionConfigs[btnId];
    if (!config || !modal) return;
    modalTitle.textContent = config.title;
    modalBody.innerHTML = buildModalFields(config.fields);
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    // focus first field
    const firstInput = modal.querySelector('input, select');
    firstInput && setTimeout(() => firstInput.focus(), 100);
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }

  Object.keys(quickActionConfigs).forEach(btnId => {
    const btn = document.getElementById(btnId);
    btn && btn.addEventListener('click', () => openModal(btnId));
  });

  btnModalCancel && btnModalCancel.addEventListener('click', closeModal);
  btnModalClose  && btnModalClose.addEventListener('click', closeModal);
  modal && modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  btnModalSubmit && btnModalSubmit.addEventListener('click', () => {
    const inputs = $$('input, select, textarea', modalBody);
    const allFilled = inputs.every(el => el.value.trim().length > 0);
    if (!allFilled) {
      showToast('Please fill in all fields', 'warning');
      return;
    }
    closeModal();
    showToast('Record saved successfully!', 'success');
  });

  /* -------------------------------------------------------------------------
     SUPPORT BUTTON
  --------------------------------------------------------------------------- */
  const btnAdminSupport = $('#btn-admin-support');
  btnAdminSupport && btnAdminSupport.addEventListener('click', () => {
    showToast('Connecting to SchoolRoute Admin Support…');
  });

  /* -------------------------------------------------------------------------
     HEADER PANEL BUTTONS
  --------------------------------------------------------------------------- */
  const btnViewAllBuses = $('#btn-view-all-buses');
  btnViewAllBuses && btnViewAllBuses.addEventListener('click', () => {
    showToast('Loading full fleet view…');
  });

  const btnViewAllAlerts = $('#btn-view-all-alerts');
  btnViewAllAlerts && btnViewAllAlerts.addEventListener('click', () => {
    showToast('Opening full alerts log…');
  });

  const btnViewAllTrips = $('#btn-view-all-trips');
  btnViewAllTrips && btnViewAllTrips.addEventListener('click', () => {
    showToast('Opening trip schedule…');
  });

  /* -------------------------------------------------------------------------
     MAP CONTROLS (demo zoom effect)
  --------------------------------------------------------------------------- */
  const mapCanvas = $('#admin-map-canvas');
  let mapScale = 1;

  const btnZoomIn  = $('#btn-map-zoom-in');
  const btnZoomOut = $('#btn-map-zoom-out');

  btnZoomIn && btnZoomIn.addEventListener('click', () => {
    mapScale = Math.min(mapScale + 0.15, 2.2);
    if (mapCanvas) mapCanvas.style.transform = `scale(${mapScale})`;
    mapCanvas && (mapCanvas.style.transformOrigin = 'center center');
  });

  btnZoomOut && btnZoomOut.addEventListener('click', () => {
    mapScale = Math.max(mapScale - 0.15, 0.5);
    if (mapCanvas) mapCanvas.style.transform = `scale(${mapScale})`;
    mapCanvas && (mapCanvas.style.transformOrigin = 'center center');
  });

  /* -------------------------------------------------------------------------
     ANIMATE PROGRESS BARS ON PAGE LOAD
  --------------------------------------------------------------------------- */
  function animateProgressBars() {
    const fills = $$('.metric-progress-fill');
    fills.forEach(fill => {
      const target = fill.style.width;
      fill.style.width = '0%';
      setTimeout(() => { fill.style.width = target; }, 200);
    });
  }
  animateProgressBars();

  /* -------------------------------------------------------------------------
     LIVE CLOCK for greeting (time of day)
  --------------------------------------------------------------------------- */
  function updateGreeting() {
    const title = $('#greeting-text');
    if (!title) return;
    const hour = new Date().getHours();
    let greet = 'Good Morning';
    if (hour >= 12 && hour < 17) greet = 'Good Afternoon';
    else if (hour >= 17) greet = 'Good Evening';
    title.textContent = greet + ', Admin 👋';
  }
  updateGreeting();

  
  /* -------------------------------------------------------------------------
     TABLE SEARCH & FILTER (Buses & Routes pages)
  --------------------------------------------------------------------------- */
  const searchBuses = $('#search-buses-input');
  const filterBusStatus = $('#bus-status-filter');
  
  function filterBusRows() {
    const term = (searchBuses ? searchBuses.value : '').toLowerCase().trim();
    const statusVal = (filterBusStatus ? filterBusStatus.value : 'all').toLowerCase();
    
    $('.admin-data-table tbody tr').forEach(row => {
      const text = row.textContent.toLowerCase();
      const matchesSearch = !term || text.includes(term);
      const matchesStatus = statusVal === 'all' || text.includes(statusVal.replace('-', ' '));
      row.style.display = (matchesSearch && matchesStatus) ? '' : 'none';
    });
  }

  searchBuses && searchBuses.addEventListener('input', filterBusRows);
  filterBusStatus && filterBusStatus.addEventListener('change', filterBusRows);

  const searchRoutes = $('#search-routes-input');
  const filterRouteStatus = $('#route-status-filter');

  function filterRouteRows() {
    const term = (searchRoutes ? searchRoutes.value : '').toLowerCase().trim();
    const statusVal = (filterRouteStatus ? filterRouteStatus.value : 'all').toLowerCase();

    $('.admin-data-table tbody tr').forEach(row => {
      const text = row.textContent.toLowerCase();
      const matchesSearch = !term || text.includes(term);
      const matchesStatus = statusVal === 'all' || 
        (statusVal === 'morning' && text.includes('am')) ||
        (statusVal === 'afternoon' && text.includes('pm')) ||
        text.includes(statusVal);
      row.style.display = (matchesSearch && matchesStatus) ? '' : 'none';
    });
  }

  searchRoutes && searchRoutes.addEventListener('input', filterRouteRows);
  filterRouteStatus && filterRouteStatus.addEventListener('change', filterRouteRows);

  // Export buttons
  const btnQuickExport = $('#btn-quick-export');
  const btnExportRoutes = $('#btn-export-routes');
  btnQuickExport && btnQuickExport.addEventListener('click', () => showToast('Exporting Bus Fleet CSV…', 'success'));
  btnExportRoutes && btnExportRoutes.addEventListener('click', () => showToast('Exporting Routes & Stops CSV…', 'success'));

  /* -------------------------------------------------------------------------
     TOAST NOTIFICATION HELPER
  --------------------------------------------------------------------------- */
  let toastTimer = null;

  window.showToast = showToast;
  function showToast(message, type = '') {
    const toast = $('#admin-toast');
    if (!toast) return;
    clearTimeout(toastTimer);
    toast.className = 'admin-toast';
    if (type) toast.classList.add('toast-' + type);
    toast.textContent = message;
    toast.classList.add('show');
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
  }

  /* -------------------------------------------------------------------------
     LIVE PING TIMESTAMPS — update "Last Ping" times every 30s
  --------------------------------------------------------------------------- */
  function updatePingTimes() {
    const times = ['7:42 AM', '7:38 AM', '7:35 AM', '7:41 AM', '7:28 AM'];
    const cells = $$('.feed-col-time');
    // keep as static demo data (no actual API)
  }

  /* -------------------------------------------------------------------------
     WINDOW RESIZE — collapse responsive behaviour
  --------------------------------------------------------------------------- */
  let resizeDebounce;
  window.addEventListener('resize', () => {
    clearTimeout(resizeDebounce);
    resizeDebounce = setTimeout(() => {
      if (window.innerWidth > 768) closeSidebar();
    }, 200);
  });

  /* -------------------------------------------------------------------------
     STAT CARDS — micro-animation counter
  --------------------------------------------------------------------------- */
  function animateCounter(el, target, duration) {
    if (!el) return;
    const isPercent = target.endsWith('%');
    const end = parseInt(target);
    const start = 0;
    const step = (end - start) / (duration / 16);
    let current = start;
    const timer = setInterval(() => {
      current += step;
      if (current >= end) { current = end; clearInterval(timer); }
      el.textContent = Math.round(current) + (isPercent ? '%' : '');
    }, 16);
  }

  // Run counters on load
  const statCounters = [
    { id: 'val-total-buses',   val: '24',  dur: 600 },
    { id: 'val-total-drivers', val: '28',  dur: 700 },
    { id: 'val-total-routes',  val: '18',  dur: 650 },
    { id: 'val-total-students',val: '842', dur: 900 },
    { id: 'val-ontime-rate',   val: '99%', dur: 800 },
  ];

  setTimeout(() => {
    statCounters.forEach(({ id, val, dur }) => {
      animateCounter(document.getElementById(id), val, dur);
    });
  }, 300);

})();
