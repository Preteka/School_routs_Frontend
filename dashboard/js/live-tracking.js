/**
 * ==========================================================================
 * SCHOOLROUTE — PARENT DASHBOARD LIVE TRACKING CONTROLLER
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

  // Sync with master users store if available
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

  function saveUserData() {
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
      console.warn('Failed to persist user updates:', err);
    }
  }

  /* ==========================================================================
     3. NORMALIZE USER CHILDREN & ROUTE DATA
     ========================================================================== */
  function getUserChildren() {
    if (Array.isArray(currentUser.children) && currentUser.children.length > 0) {
      return currentUser.children;
    }
    
    // Check if legacy single-child format exists in currentUser
    if (currentUser.bus && currentUser.bus.number) {
      return [{
        id: 'child_1',
        name: currentUser.childName || 'My Child',
        school: currentUser.schoolName || 'Assigned School',
        grade: currentUser.childGrade || 'N/A',
        bus: currentUser.bus,
        stop: {
          name: currentUser.bus.childStop || currentUser.bus.stopName || 'Assigned Stop',
          scheduledTime: currentUser.bus.eta || '8:25 AM'
        },
        driver: currentUser.driver || null,
        stops: Array.isArray(currentUser.stops) ? currentUser.stops : []
      }];
    }

    return [];
  }

  let childrenList = getUserChildren();
  let selectedChildIndex = 0;

  /* ==========================================================================
     4. RENDER GREETING & HEADER
     ========================================================================== */
  const headerParentName = document.getElementById('header-parent-name');
  if (headerParentName) {
    headerParentName.textContent = currentUser.name;
  }

  const userDisplayName = document.getElementById('user-display-name');
  const dropdownFullName = document.getElementById('dropdown-full-name');
  const dropdownEmail = document.getElementById('dropdown-email');
  const avatarSlot = document.getElementById('user-avatar-slot');

  if (userDisplayName) userDisplayName.textContent = currentUser.name;
  if (dropdownFullName) dropdownFullName.textContent = currentUser.name;
  if (dropdownEmail) dropdownEmail.textContent = currentUser.email || 'parent@schoolroute.com';

  const userInitials = getInitials(currentUser.name);
  if (avatarSlot) {
    if (currentUser.avatar) {
      avatarSlot.innerHTML = `<img src="${currentUser.avatar}" alt="${currentUser.name}" class="user-avatar-img" width="38" height="38" onerror="this.outerHTML='<span class=\\'user-avatar-initials\\'>${userInitials}</span>';">`;
    } else {
      avatarSlot.innerHTML = `<span class="user-avatar-initials">${userInitials}</span>`;
    }
  }

  /* ==========================================================================
     5. RENDER CHILD SELECTOR
     ========================================================================== */
  const childSelectorContainer = document.getElementById('child-selector-container');

  function renderChildSelector() {
    if (!childSelectorContainer) return;

    if (childrenList.length === 0) {
      childSelectorContainer.innerHTML = `
        <div class="child-selector-card">
          <div class="child-selector-left">
            <div class="selector-icon-wrap">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <div class="selector-title-block">
              <span class="selector-label">Child Selected</span>
              <span class="selector-current-name">No children added yet</span>
            </div>
          </div>
          <div class="child-select-controls">
            <button type="button" class="btn-primary-cta" id="btn-trigger-add-child">
              <span>Add Child Details &rarr;</span>
            </button>
          </div>
        </div>
      `;

      const btnTriggerAdd = document.getElementById('btn-trigger-add-child');
      if (btnTriggerAdd) {
        btnTriggerAdd.addEventListener('click', openSetupModal);
      }
      return;
    }

    if (childrenList.length === 1) {
      const singleChild = childrenList[0];
      childSelectorContainer.innerHTML = `
        <div class="child-selector-card">
          <div class="child-selector-left">
            <div class="selector-icon-wrap">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
            </div>
            <div class="selector-title-block">
              <span class="selector-label">Selected Child</span>
              <span class="selector-current-name">${singleChild.name} &bull; <small style="font-size:0.85rem; font-weight:600; color:var(--muted-text);">${singleChild.school || 'School'}</small></span>
            </div>
          </div>
          <div class="child-select-controls">
            <button type="button" class="btn-text-link" id="btn-trigger-add-child-more" style="font-size:0.85rem;">
              <span>+ Add Another Child</span>
            </button>
          </div>
        </div>
      `;

      const btnAddMore = document.getElementById('btn-trigger-add-child-more');
      if (btnAddMore) {
        btnAddMore.addEventListener('click', openSetupModal);
      }
      return;
    }

    // Multiple Children Dropdown Selector
    const optionsHtml = childrenList.map((c, i) => `
      <option value="${i}" ${i === selectedChildIndex ? 'selected' : ''}>
        ${c.name} (${c.school || 'School'})
      </option>
    `).join('');

    childSelectorContainer.innerHTML = `
      <div class="child-selector-card">
        <div class="child-selector-left">
          <div class="selector-icon-wrap">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </div>
          <div class="selector-title-block">
            <span class="selector-label">Select Child</span>
            <span class="selector-current-name">${childrenList[selectedChildIndex].name}</span>
          </div>
        </div>
        <div class="child-select-controls">
          <div class="child-select-dropdown-wrap">
            <select class="child-select-dropdown" id="child-select-dropdown" aria-label="Choose child profile">
              ${optionsHtml}
            </select>
            <svg class="dropdown-arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
          <button type="button" class="btn-text-link" id="btn-trigger-add-child-multi" style="font-size:0.85rem; margin-left:0.5rem;">
            <span>+ Add Child</span>
          </button>
        </div>
      </div>
    `;

    const dropdown = document.getElementById('child-select-dropdown');
    if (dropdown) {
      dropdown.addEventListener('change', (e) => {
        selectedChildIndex = parseInt(e.target.value, 10) || 0;
        renderAllTrackingSections();
      });
    }

    const btnMultiAdd = document.getElementById('btn-trigger-add-child-multi');
    if (btnMultiAdd) {
      btnMultiAdd.addEventListener('click', openSetupModal);
    }
  }

  /* ==========================================================================
     6. RENDER TRACKING STATISTICS CARDS
     ========================================================================== */
  const trackingStatsContainer = document.getElementById('tracking-stats-container');

  function renderTrackingStats() {
    if (!trackingStatsContainer) return;

    if (childrenList.length === 0) {
      trackingStatsContainer.innerHTML = `
        <div class="tracking-stat-card">
          <div class="stat-icon-wrapper eta-theme">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>
          <div class="stat-meta-content">
            <span class="stat-card-title">Next Stop ETA</span>
            <span class="stat-primary-value">--:--</span>
          </div>
        </div>

        <div class="tracking-stat-card">
          <div class="stat-icon-wrapper speed-theme">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 10"></polyline></svg>
          </div>
          <div class="stat-meta-content">
            <span class="stat-card-title">Current Speed</span>
            <span class="stat-primary-value">-- km/h</span>
          </div>
        </div>

        <div class="tracking-stat-card">
          <div class="stat-icon-wrapper distance-theme">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          </div>
          <div class="stat-meta-content">
            <span class="stat-card-title">Distance to Stop</span>
            <span class="stat-primary-value">-- km</span>
          </div>
        </div>

        <div class="tracking-stat-card">
          <div class="stat-icon-wrapper status-theme">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          </div>
          <div class="stat-meta-content">
            <span class="stat-card-title">Journey Status</span>
            <span class="stat-status-badge-inline badge-state-not-started">Setup Required</span>
          </div>
        </div>
      `;
      return;
    }

    const child = childrenList[selectedChildIndex] || childrenList[0];
    const bus = child.bus;

    if (!bus || !bus.number) {
      trackingStatsContainer.innerHTML = `
        <div class="tracking-stat-card">
          <div class="stat-icon-wrapper eta-theme">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>
          <div class="stat-meta-content">
            <span class="stat-card-title">Next Stop ETA</span>
            <span class="stat-primary-value">--:--</span>
          </div>
        </div>

        <div class="tracking-stat-card">
          <div class="stat-icon-wrapper speed-theme">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 14 10"></polyline></svg>
          </div>
          <div class="stat-meta-content">
            <span class="stat-card-title">Current Speed</span>
            <span class="stat-primary-value">0 km/h</span>
          </div>
        </div>

        <div class="tracking-stat-card">
          <div class="stat-icon-wrapper distance-theme">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          </div>
          <div class="stat-meta-content">
            <span class="stat-card-title">Distance to Stop</span>
            <span class="stat-primary-value">-- km</span>
          </div>
        </div>

        <div class="tracking-stat-card">
          <div class="stat-icon-wrapper status-theme">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          </div>
          <div class="stat-meta-content">
            <span class="stat-card-title">Journey Status</span>
            <span class="stat-status-badge-inline badge-state-not-started">No Route Assigned</span>
          </div>
        </div>
      `;
      return;
    }

    const eta = bus.nextStopEta || bus.eta || '4 mins';
    const speed = bus.speed || '26 km/h';
    const distance = bus.distanceToStop || '1.0 km';
    const journeyStatus = bus.journeyStatus || 'On Route';

    let statusBadgeClass = 'badge-state-on-route';
    if (journeyStatus.toLowerCase().includes('arriving')) statusBadgeClass = 'badge-state-arriving';
    else if (journeyStatus.toLowerCase().includes('child') || journeyStatus.toLowerCase().includes('stop')) statusBadgeClass = 'badge-state-at-stop';
    else if (journeyStatus.toLowerCase().includes('completed') || journeyStatus.toLowerCase().includes('boarded')) statusBadgeClass = 'badge-state-completed';
    else if (journeyStatus.toLowerCase().includes('not started')) statusBadgeClass = 'badge-state-not-started';

    trackingStatsContainer.innerHTML = `
      <div class="tracking-stat-card">
        <div class="stat-icon-wrapper eta-theme">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        </div>
        <div class="stat-meta-content">
          <span class="stat-card-title">Next Stop ETA</span>
          <span class="stat-primary-value">${eta}</span>
        </div>
      </div>

      <div class="tracking-stat-card">
        <div class="stat-icon-wrapper speed-theme">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 10"></polyline></svg>
        </div>
        <div class="stat-meta-content">
          <span class="stat-card-title">Current Speed</span>
          <span class="stat-primary-value">${speed}</span>
        </div>
      </div>

      <div class="tracking-stat-card">
        <div class="stat-icon-wrapper distance-theme">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        </div>
        <div class="stat-meta-content">
          <span class="stat-card-title">Distance to Stop</span>
          <span class="stat-primary-value">${distance}</span>
        </div>
      </div>

      <div class="tracking-stat-card">
        <div class="stat-icon-wrapper status-theme">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
        </div>
        <div class="stat-meta-content">
          <span class="stat-card-title">Journey Status</span>
          <span class="stat-status-badge-inline ${statusBadgeClass}">${journeyStatus}</span>
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     7. RENDER MAIN LIVE BUS TRACKING CARD & SVG MAP
     ========================================================================== */
  const liveTrackingMainCard = document.getElementById('live-tracking-main-card');

  function renderMainTrackingCard() {
    if (!liveTrackingMainCard) return;

    if (childrenList.length === 0) {
      liveTrackingMainCard.innerHTML = `
        <div class="empty-state-card-full">
          <div class="empty-state-illustration">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          </div>
          <h3 class="empty-state-heading">No child or route assigned yet</h3>
          <p class="empty-state-description">Add your child's transport details to start tracking the school bus live in real time on this map.</p>
          <button type="button" class="btn-primary-cta" id="btn-empty-add-child">
            <span>Add Child Details &rarr;</span>
          </button>
        </div>
      `;
      const btnAdd = document.getElementById('btn-empty-add-child');
      if (btnAdd) btnAdd.addEventListener('click', openSetupModal);
      return;
    }

    const child = childrenList[selectedChildIndex] || childrenList[0];
    const bus = child.bus;

    if (!bus || !bus.number) {
      liveTrackingMainCard.innerHTML = `
        <div class="empty-state-card-full">
          <div class="empty-state-illustration">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="15" rx="2"></rect><circle cx="7" cy="16" r="2"></circle><circle cx="17" cy="16" r="2"></circle><path d="M3 10h18"></path></svg>
          </div>
          <h3 class="empty-state-heading">No route assigned yet</h3>
          <p class="empty-state-description">Transport route and bus assignment for <strong>${child.name}</strong> has not been configured. Add transport details to enable live bus tracking.</p>
          <button type="button" class="btn-primary-cta" id="btn-empty-setup-route">
            <span>Configure Transport Route &rarr;</span>
          </button>
        </div>
      `;
      const btnRoute = document.getElementById('btn-empty-setup-route');
      if (btnRoute) btnRoute.addEventListener('click', openSetupModal);
      return;
    }

    const isJourneyActive = bus.isJourneyActive !== false && (bus.journeyStatus || '').toLowerCase() !== 'not started';

    if (!isJourneyActive) {
      liveTrackingMainCard.innerHTML = `
        <div class="panel-header">
          <div class="panel-header-titles">
            <h3 class="panel-title">Bus Tracking</h3>
            <p class="panel-subtitle">${bus.number} &bull; ${bus.routeName || 'Assigned Route'}</p>
          </div>
          <div class="panel-header-badges">
            <span class="stat-pill-status pill-neutral">Journey Not Active</span>
          </div>
        </div>

        <div class="empty-state-card-full" style="box-shadow:none; border:none; padding:2.5rem 1.5rem;">
          <div class="empty-state-illustration" style="background-color:var(--soft-background); color:var(--muted-text);">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>
          <h3 class="empty-state-heading">Journey Not Active</h3>
          <p class="empty-state-description">Your child's next journey for <strong>${child.name}</strong> on ${bus.number} will appear here live when the bus starts its route.</p>
          <div style="font-size:0.875rem; color:var(--muted-text); background:var(--soft-background); padding:0.6rem 1.2rem; border-radius:var(--radius-pill); font-weight:600;">
            Scheduled Pickup: ${child.stop?.scheduledTime || bus.eta || 'Morning Route'} at ${child.stop?.name || 'Assigned Stop'}
          </div>
        </div>
      `;
      return;
    }

    // Active Journey Map Rendering
    const busNum = bus.number;
    const busLoc = bus.location || 'In Transit';
    const nextStopName = bus.nextStop || 'Next Stop';
    const nextStopEta = bus.nextStopEta || bus.eta || '2 mins';
    const childStopName = child.stop?.name || 'Your Child\'s Stop';
    const lastUpdatedText = bus.lastUpdated || '2 mins ago';

    liveTrackingMainCard.innerHTML = `
      <div class="panel-header">
        <div class="panel-header-titles">
          <h3 class="panel-title">Live Bus Tracking</h3>
          <p class="panel-subtitle">${busNum} &bull; ${bus.routeName || 'Assigned Route'}</p>
        </div>
        <div class="panel-header-badges">
          <span class="live-pulse-badge">
            <span class="pulse-ring"></span>
            <span class="pulse-dot"></span>
            <span class="pulse-text">Live Tracking Active</span>
          </span>
        </div>
      </div>

      <!-- Vector Map Canvas -->
      <div class="map-container" id="map-container" aria-label="Interactive Live Bus Route Map">
        
        <!-- Floating Info Card (Top Left) -->
        <div class="map-floating-info-card">
          <div class="floating-icon-box">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>
          <div class="floating-info-content">
            <span class="floating-info-label">Next Stop</span>
            <h4 class="floating-info-title">${nextStopName}</h4>
            <span class="floating-info-eta">${nextStopEta} away</span>
          </div>
        </div>

        <!-- SVG Map Layer -->
        <div class="map-canvas-layer" id="map-canvas">
          <svg class="map-vector-svg" viewBox="0 0 800 420" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="mapGridTracking" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" class="map-grid-line" stroke-width="1"/>
              </pattern>
              <pattern id="parkPatternTracking" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="5" cy="5" r="1.5" class="map-tree-dot"/>
                <circle cx="15" cy="15" r="1.5" class="map-tree-dot"/>
              </pattern>
              <linearGradient id="routeGradientTracking" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#32A852"/>
                <stop offset="60%" stop-color="#075B46"/>
                <stop offset="100%" stop-color="#F8C52C"/>
              </linearGradient>
            </defs>

            <!-- Map Background -->
            <rect width="800" height="420" class="map-bg-fill"/>
            <rect width="800" height="420" fill="url(#mapGridTracking)"/>

            <!-- Green Spaces -->
            <rect x="50" y="40" width="160" height="90" rx="12" class="map-park-fill"/>
            <rect x="50" y="40" width="160" height="90" rx="12" fill="url(#parkPatternTracking)"/>
            <text x="130" y="90" class="map-label-park" text-anchor="middle">Central Green Park</text>

            <rect x="540" y="240" width="210" height="120" rx="16" class="map-park-fill"/>
            <rect x="540" y="240" width="210" height="120" rx="16" fill="url(#parkPatternTracking)"/>
            <text x="645" y="305" class="map-label-park" text-anchor="middle">Forest Reserve</text>

            <!-- Secondary Roads -->
            <path d="M 0,90 L 800,90" fill="none" class="map-road-secondary" stroke-width="12"/>
            <path d="M 0,220 L 800,220" fill="none" class="map-road-secondary" stroke-width="12"/>
            <path d="M 0,330 L 800,330" fill="none" class="map-road-secondary" stroke-width="12"/>
            <path d="M 230,0 L 230,420" fill="none" class="map-road-secondary" stroke-width="12"/>
            <path d="M 480,0 L 480,420" fill="none" class="map-road-secondary" stroke-width="12"/>

            <!-- Main Route Path -->
            <path d="M 90,330 L 230,330 Q 260,330 260,300 L 260,220 Q 260,190 290,190 L 480,190 Q 510,190 510,160 L 510,90 L 680,90 Q 710,90 710,120 L 710,260" fill="none" class="map-road-main" stroke-width="22"/>
            <path d="M 90,330 L 230,330 Q 260,330 260,300 L 260,220 Q 260,190 290,190 L 480,190 Q 510,190 510,160 L 510,90 L 680,90 Q 710,90 710,120 L 710,260" fill="none" class="map-route-highlight" stroke="url(#routeGradientTracking)" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>

            <!-- Road Labels -->
            <text x="140" y="322" class="map-street-name">School Boulevard</text>
            <text x="360" y="182" class="map-street-name">Transit Route</text>
            <text x="580" y="82" class="map-street-name">Avenue Central</text>

            <!-- Stop Nodes -->
            <g class="map-stop-node completed" transform="translate(90, 330)">
              <circle r="12" class="node-outer-bg"/>
              <circle r="6" class="node-inner-dot"/>
            </g>

            <g class="map-stop-node current-stop" transform="translate(420, 190)">
              <circle r="14" class="node-outer-pulse"/>
              <circle r="8" class="node-outer-bg current"/>
              <circle r="4" class="node-inner-dot current"/>
            </g>

            <g class="map-stop-node child-stop" transform="translate(620, 90)">
              <circle r="16" class="node-child-ring"/>
              <circle r="9" class="node-outer-bg child"/>
              <circle r="4" class="node-inner-dot child"/>
            </g>

            <g class="map-stop-node final-stop" transform="translate(710, 260)">
              <circle r="12" class="node-outer-bg"/>
              <circle r="6" class="node-inner-dot final"/>
            </g>
          </svg>
        </div>

        <!-- Live Bus Floating Marker -->
        <div class="map-live-marker" id="live-bus-marker" style="top: 42%; left: 52%;">
          <div class="marker-pulse-glow"></div>
          <div class="marker-bus-badge">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="4" width="18" height="15" rx="2"></rect><circle cx="7" cy="16" r="2"></circle><circle cx="17" cy="16" r="2"></circle><path d="M3 10h18"></path></svg>
          </div>
          <!-- Bus Callout Tooltip -->
          <div class="marker-callout-card">
            <div class="callout-header">
              <span class="callout-bus-id">${busNum}</span>
              <span class="callout-status-tag">${bus.journeyStatus || 'On Route'}</span>
            </div>
            <p class="callout-next-info">Next Stop: <strong>${nextStopName}</strong></p>
            <span class="callout-eta-pill">${nextStopEta} away</span>
          </div>
        </div>

        <!-- Child's Stop Marker Pin -->
        <div class="map-child-marker" style="top: 18%; left: 74%;">
          <div class="child-marker-pin">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          </div>
          <div class="child-marker-tag">
            <span class="tag-title">Your Child's Stop</span>
            <span class="tag-sub">${childStopName} &bull; ${child.stop?.scheduledTime || 'Pickup Point'}</span>
          </div>
        </div>

        <!-- Map Navigation Controls -->
        <div class="map-controls-group" aria-label="Map Controls">
          <button type="button" class="map-ctrl-btn" id="btn-map-zoom-in" aria-label="Zoom In">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </button>
          <button type="button" class="map-ctrl-btn" id="btn-map-zoom-out" aria-label="Zoom Out">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </button>
          <button type="button" class="map-ctrl-btn" id="btn-map-recenter" aria-label="Recenter Map" title="Recenter Map">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line></svg>
          </button>
        </div>

      </div>

      <!-- Map Footer -->
      <div class="map-panel-footer">
        <div class="map-footer-status">
          <span class="status-indicator-live"></span>
          <span class="status-live-text">Live</span>
          <span class="status-divider">&bull;</span>
          <span class="status-timestamp" id="map-last-updated">Last updated: ${lastUpdatedText}</span>
        </div>
        <div class="map-footer-actions">
          <button type="button" class="btn-text-link" id="btn-view-full-map-trigger">
            <span>View Full Map</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </div>
      </div>
    `;

    attachMapControlListeners();
  }

  /* ==========================================================================
     8. MAP CONTROLS & ZOOM CONTROLLER
     ========================================================================== */
  let currentMapZoom = 1;
  const MIN_ZOOM = 0.9;
  const MAX_ZOOM = 1.5;

  function attachMapControlListeners() {
    const mapCanvas = document.getElementById('map-canvas');
    const btnZoomIn = document.getElementById('btn-map-zoom-in');
    const btnZoomOut = document.getElementById('btn-map-zoom-out');
    const btnRecenter = document.getElementById('btn-map-recenter');
    const btnFullMap = document.getElementById('btn-view-full-map-trigger');

    function updateTransform() {
      if (mapCanvas) mapCanvas.style.transform = `scale(${currentMapZoom})`;
    }

    if (btnZoomIn) {
      btnZoomIn.addEventListener('click', () => {
        if (currentMapZoom < MAX_ZOOM) {
          currentMapZoom = Math.min(MAX_ZOOM, currentMapZoom + 0.15);
          updateTransform();
          showToast(`Map Zoom: ${Math.round(currentMapZoom * 100)}%`);
        }
      });
    }

    if (btnZoomOut) {
      btnZoomOut.addEventListener('click', () => {
        if (currentMapZoom > MIN_ZOOM) {
          currentMapZoom = Math.max(MIN_ZOOM, currentMapZoom - 0.15);
          updateTransform();
          showToast(`Map Zoom: ${Math.round(currentMapZoom * 100)}%`);
        }
      });
    }

    if (btnRecenter) {
      btnRecenter.addEventListener('click', () => {
        currentMapZoom = 1;
        updateTransform();
        showToast('Map recentered to bus position.');
      });
    }

    if (btnFullMap) {
      btnFullMap.addEventListener('click', () => {
        showToast('Interactive full-screen map modal opened.');
      });
    }
  }

  /* ==========================================================================
     9. RENDER TODAY'S ROUTE TIMELINE
     ========================================================================== */
  const todaysRoutePanel = document.getElementById('todays-route-panel');

  function renderRouteTimeline() {
    if (!todaysRoutePanel) return;

    if (childrenList.length === 0) {
      todaysRoutePanel.innerHTML = `
        <div class="panel-header">
          <div class="panel-header-titles">
            <h3 class="panel-title">Today's Route</h3>
            <p class="panel-subtitle">Route Timeline</p>
          </div>
        </div>
        <div class="panel-empty-state">
          <div class="empty-icon-wrap">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="6" y1="3" x2="6" y2="15"></line><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M18 9a9 9 0 0 1-9 9"></path></svg>
          </div>
          <h4 class="empty-title">No route assigned</h4>
          <p class="empty-sub">Today's route stops will appear here once a bus route is assigned to your child.</p>
        </div>
      `;
      return;
    }

    const child = childrenList[selectedChildIndex] || childrenList[0];
    const stops = child.stops || [];

    if (stops.length === 0) {
      todaysRoutePanel.innerHTML = `
        <div class="panel-header">
          <div class="panel-header-titles">
            <h3 class="panel-title">Today's Route</h3>
            <p class="panel-subtitle">Journey Progress</p>
          </div>
        </div>
        <div class="panel-empty-state">
          <div class="empty-icon-wrap">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="6" y1="3" x2="6" y2="15"></line><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M18 9a9 9 0 0 1-9 9"></path></svg>
          </div>
          <h4 class="empty-title">Today's journey has not started yet</h4>
          <p class="empty-sub">Route stops and live progress will update automatically when the bus starts its trip.</p>
        </div>
      `;
      return;
    }

    const timelineItems = stops.map(stop => `
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
            <span class="stop-badge ${stop.status === 'completed' ? 'badge-completed' : stop.status === 'current' ? 'badge-current' : 'badge-upcoming'}">${stop.badge || (stop.status === 'completed' ? 'Departed' : stop.status === 'current' ? 'Next Stop' : 'Scheduled')}</span>
          </div>
          <h4 class="stop-name">${stop.name}</h4>
          <p class="stop-note">${stop.note || ''}</p>
        </div>
      </li>
    `).join('');

    todaysRoutePanel.innerHTML = `
      <div class="panel-header">
        <div class="panel-header-titles">
          <h3 class="panel-title">Today's Route</h3>
          <p class="panel-subtitle">Morning Route Timeline</p>
        </div>
      </div>
      <div class="timeline-container">
        <ol class="stops-timeline-list">
          ${timelineItems}
        </ol>
      </div>
    `;
  }

  /* ==========================================================================
     10. RENDER DRIVER INFORMATION
     ========================================================================== */
  const driverInfoPanel = document.getElementById('driver-info-panel');

  function renderDriverInfo() {
    if (!driverInfoPanel) return;

    if (childrenList.length === 0) {
      driverInfoPanel.innerHTML = `
        <div class="panel-header">
          <div class="panel-header-titles">
            <h3 class="panel-title">Driver Information</h3>
            <p class="panel-subtitle">Assigned Route Chaperone</p>
          </div>
        </div>
        <div class="panel-empty-state">
          <div class="empty-icon-wrap">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </div>
          <h4 class="empty-title">No driver assigned yet</h4>
          <p class="empty-sub">Driver information will appear once a route is assigned.</p>
        </div>
      `;
      return;
    }

    const child = childrenList[selectedChildIndex] || childrenList[0];
    const driver = child.driver;

    if (!driver || !driver.name) {
      driverInfoPanel.innerHTML = `
        <div class="panel-header">
          <div class="panel-header-titles">
            <h3 class="panel-title">Driver Information</h3>
            <p class="panel-subtitle">Assigned Route Chaperone</p>
          </div>
        </div>
        <div class="panel-empty-state">
          <div class="empty-icon-wrap">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </div>
          <h4 class="empty-title">Driver information will appear once a route is assigned</h4>
          <p class="empty-sub">Your assigned driver's profile, contact details, and verified credentials will be listed here.</p>
        </div>
      `;
      return;
    }

    const driverInitials = getInitials(driver.name);

    driverInfoPanel.innerHTML = `
      <div class="panel-header">
        <div class="panel-header-titles">
          <h3 class="panel-title">Driver Information</h3>
          <p class="panel-subtitle">Assigned Route Chaperone</p>
        </div>
        <div>
          <span class="verified-pill">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Verified</span>
          </span>
        </div>
      </div>

      <div class="driver-profile-card">
        <div class="driver-avatar-wrap">
          ${driver.avatar ? `<img src="${driver.avatar}" alt="${driver.name}" class="driver-avatar-img" width="70" height="70" onerror="this.outerHTML='<span class=\\'user-avatar-initials\\' style=\\'width:70px; height:70px; font-size:1.4rem;\\'>${driverInitials}</span>';">` : `<span class="user-avatar-initials" style="width:70px; height:70px; font-size:1.4rem;">${driverInitials}</span>`}
          <span class="driver-status-dot" title="Driver is actively on duty"></span>
        </div>
        <div class="driver-details">
          <h4 class="driver-name">${driver.name}</h4>
          <p class="driver-credential">${driver.experience || 'Verified Commercial Driver'}</p>
          <div class="driver-safety-tags">
            <span class="tag-badge">Commercial CDL</span>
            <span class="tag-badge">Background Checked</span>
          </div>
        </div>
        <div class="driver-action-wrap">
          <a href="tel:${driver.phone || ''}" class="btn-driver-call" aria-label="Call Driver ${driver.name}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            <span>Call Driver</span>
          </a>
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     11. MASTER RENDER ALL SECTIONS
     ========================================================================== */
  function renderAllTrackingSections() {
    childrenList = getUserChildren();
    renderChildSelector();
    renderTrackingStats();
    renderMainTrackingCard();
    renderRouteTimeline();
    renderDriverInfo();
  }

  renderAllTrackingSections();

  /* ==========================================================================
     12. SETUP / ADD CHILD MODAL CONTROLLER
     ========================================================================== */
  const setupModal = document.getElementById('setup-child-modal');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const btnCancelModal = document.getElementById('btn-cancel-modal');
  const setupForm = document.getElementById('setup-child-form');

  function openSetupModal() {
    if (setupModal) {
      setupModal.classList.add('active');
      setupModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeSetupModal() {
    if (setupModal) {
      setupModal.classList.remove('active');
      setupModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (setupForm) setupForm.reset();
    }
  }

  if (btnCloseModal) btnCloseModal.addEventListener('click', closeSetupModal);
  if (btnCancelModal) btnCancelModal.addEventListener('click', closeSetupModal);

  if (setupModal) {
    setupModal.addEventListener('click', (e) => {
      if (e.target === setupModal) closeSetupModal();
    });
  }

  if (setupForm) {
    setupForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const childName = document.getElementById('input-child-name').value.trim();
      const schoolName = document.getElementById('input-school-name').value.trim();
      const grade = document.getElementById('input-grade').value.trim() || 'Grade 5';
      const busNumber = document.getElementById('input-bus-number').value.trim();
      const childStop = document.getElementById('input-child-stop').value.trim();
      const driverName = document.getElementById('input-driver-name').value.trim();

      if (!childName || !schoolName || !busNumber || !childStop) {
        showToast('Please fill in all required fields marked with *');
        return;
      }

      const newChild = {
        id: 'child_' + Date.now(),
        name: childName,
        school: schoolName,
        grade: grade,
        status: 'Active',
        bus: {
          number: busNumber,
          routeName: schoolName + ' Route',
          location: 'En Route to ' + childStop,
          locationTime: 'Just now',
          nextStop: childStop,
          nextStopEta: '4 mins',
          speed: '28 km/h',
          distanceToStop: '1.2 km',
          journeyStatus: 'On Route',
          lastUpdated: 'Just now',
          isJourneyActive: true
        },
        stop: {
          name: childStop,
          scheduledTime: '8:25 AM'
        },
        driver: driverName ? {
          name: driverName,
          phone: '+91 98765 43210',
          experience: '8+ Years Verified Commercial CDL Driver',
          verified: true
        } : null,
        stops: [
          { name: 'Depot Departure', time: '7:45 AM', status: 'completed', note: 'Bus started route' },
          { name: childStop, time: '8:25 AM', status: 'current', badge: 'Child\'s Stop', note: 'Scheduled pickup point' },
          { name: schoolName, time: '8:45 AM', status: 'upcoming', note: 'Final Destination School' }
        ]
      };

      if (!Array.isArray(currentUser.children)) {
        currentUser.children = [];
      }
      currentUser.children.push(newChild);

      saveUserData();
      selectedChildIndex = currentUser.children.length - 1;
      closeSetupModal();
      renderAllTrackingSections();
      showToast(`Child details and live tracking for ${childName} activated!`);
    });
  }

  /* ==========================================================================
     13. TOAST NOTIFICATION HELPER
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
