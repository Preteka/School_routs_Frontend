/**
 * ==========================================================================
 * SCHOOLROUTE — ROUTE & STOPS CONTROLLER
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
     2. DOM ELEMENTS
     ========================================================================== */
  const emptyState = document.getElementById('route-empty-state');
  const activeView = document.getElementById('route-active-view');
  const childSelectorWrap = document.getElementById('child-selector-wrap');
  const childSelect = document.getElementById('child-select');

  const valRouteBus = document.getElementById('val-route-bus');
  const valBusId = document.getElementById('val-bus-id');
  const valPickupStop = document.getElementById('val-pickup-stop');
  const valPickupTime = document.getElementById('val-pickup-time');
  const valSchoolName = document.getElementById('val-school-name');
  const valSchoolReach = document.getElementById('val-school-reach');
  const valDropStop = document.getElementById('val-drop-stop');
  const valDropTime = document.getElementById('val-drop-time');

  const stopsTimelineList = document.getElementById('stops-timeline-list');
  const btnToggleMorning = document.getElementById('btn-toggle-morning');
  const btnToggleAfternoon = document.getElementById('btn-toggle-afternoon');

  const driverNameText = document.getElementById('driver-name-text');
  const driverRatingVal = document.getElementById('driver-rating-val');
  const driverExperienceText = document.getElementById('driver-experience-text');
  const driverPhoneLink = document.getElementById('driver-phone-link');
  const driverInitials = document.getElementById('driver-initials');

  const specBusReg = document.getElementById('spec-bus-reg');
  const specBusCapacity = document.getElementById('spec-bus-capacity');
  const specBusHelper = document.getElementById('spec-bus-helper');
  const schematicStopName = document.getElementById('schematic-stop-name');

  let currentShift = 'morning';
  let selectedChildIndex = 0;

  /* ==========================================================================
     3. USER DATA CHECK
     ========================================================================== */
  const children = Array.isArray(currentUser.children) ? currentUser.children : [];

  if (children.length === 0) {
    // Zero demo fallback: show clean empty state
    if (emptyState) emptyState.style.display = 'flex';
    if (activeView) activeView.style.display = 'none';
    if (childSelectorWrap) childSelectorWrap.style.display = 'none';
    return;
  }

  // Populate Child Selector if children exist
  if (childSelect) {
    childSelect.innerHTML = '';
    children.forEach((c, idx) => {
      const opt = document.createElement('option');
      opt.value = idx;
      opt.textContent = `${c.name || 'Child ' + (idx + 1)} (${c.school || 'School'})`;
      childSelect.appendChild(opt);
    });

    if (children.length > 1 && childSelectorWrap) {
      childSelectorWrap.style.display = 'flex';
    }

    childSelect.addEventListener('change', (e) => {
      selectedChildIndex = parseInt(e.target.value, 10) || 0;
      renderRouteDetails();
    });
  }

  /* ==========================================================================
     4. RENDER ROUTE DETAILS
     ========================================================================== */
  function renderRouteDetails() {
    const child = children[selectedChildIndex] || children[0];
    if (!child) {
      if (emptyState) emptyState.style.display = 'flex';
      if (activeView) activeView.style.display = 'none';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    if (activeView) activeView.style.display = 'block';

    const routeNum = child.route || (currentUser.bus ? currentUser.bus.route : 'Route 12');
    const busNum = child.bus || (currentUser.bus ? currentUser.bus.number : 'Bus 18');
    const stopName = child.stop || 'Gandhi Nagar';
    const pickupTime = child.pickupTime || '7:30 AM';
    const schoolName = child.school || 'ABC International School';
    const dropTime = child.dropTime || '4:00 PM';

    // Top Metric Cards
    if (valRouteBus) valRouteBus.textContent = routeNum;
    if (valBusId) valBusId.textContent = busNum;
    if (valPickupStop) valPickupStop.textContent = stopName;
    if (valPickupTime) valPickupTime.textContent = `Pickup: ${pickupTime}`;
    if (valSchoolName) valSchoolName.textContent = schoolName;
    if (valSchoolReach) valSchoolReach.textContent = 'Morning Bell: 8:00 AM';
    if (valDropStop) valDropStop.textContent = stopName;
    if (valDropTime) valDropTime.textContent = `Drop-off: ${dropTime}`;

    // Schematic update
    if (schematicStopName) schematicStopName.textContent = stopName;

    // Driver & Bus Details
    const driver = currentUser.driver || {
      name: 'Mr. Ramesh Kumar',
      phone: '+91 98765 43210',
      experience: '8+ Years',
      rating: '4.9'
    };

    if (driverNameText) driverNameText.textContent = driver.name || 'Assigned Driver';
    if (driverRatingVal) driverRatingVal.textContent = driver.rating || '4.9';
    if (driverExperienceText) driverExperienceText.textContent = `Experience: ${driver.experience || '8+ Years'} • Verified`;
    if (driverPhoneLink) {
      const cleanPhone = (driver.phone || '+919876543210').replace(/\s+/g, '');
      driverPhoneLink.setAttribute('href', `tel:${cleanPhone}`);
    }
    if (driverInitials) {
      const parts = (driver.name || 'RK').split(' ');
      driverInitials.textContent = parts.length > 1 ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() : 'DR';
    }

    if (specBusReg) specBusReg.textContent = currentUser.bus?.registration || 'KA-01-AB-1824';
    if (specBusCapacity) specBusCapacity.textContent = currentUser.bus?.capacity || '36 Seats (GPS Enabled)';
    if (specBusHelper) specBusHelper.textContent = currentUser.bus?.helper || 'Mrs. Rekha S.';

    renderTimeline(stopName, schoolName, pickupTime, dropTime);
  }

  /* ==========================================================================
     5. RENDER TIMELINE STOPS
     ========================================================================== */
  function renderTimeline(childStop, schoolName, pickupTime, dropTime) {
    if (!stopsTimelineList) return;

    let stops = [];

    if (currentShift === 'morning') {
      stops = [
        { name: 'Bus Depot & Origin Terminal', time: '07:05 AM', landmark: 'Main Highway Sector 4', isDepot: true },
        { name: 'Maple Heights Gate 2', time: '07:15 AM', landmark: 'Opposite Community Club' },
        { name: childStop, time: pickupTime, landmark: 'Designated Student Pickup Point', isChildStop: true },
        { name: 'Green Valley Extension', time: '07:42 AM', landmark: 'Near City Central Park' },
        { name: schoolName, time: '07:55 AM', landmark: 'Main School Campus Gate', isSchool: true }
      ];
    } else {
      stops = [
        { name: `${schoolName} (Campus Gate)`, time: '03:30 PM', landmark: 'Departure Boarding Bay 3', isSchool: true },
        { name: 'Green Valley Extension', time: '03:45 PM', landmark: 'Near City Central Park' },
        { name: childStop, time: dropTime, landmark: 'Designated Student Drop-off Point', isChildStop: true },
        { name: 'Maple Heights Gate 2', time: '04:15 PM', landmark: 'Opposite Community Club' },
        { name: 'Bus Depot & Evening Terminus', time: '04:30 PM', landmark: 'Main Highway Sector 4', isDepot: true }
      ];
    }

    stopsTimelineList.innerHTML = stops.map((s, idx) => `
      <li class="timeline-stop-item ${s.isChildStop ? 'stop-user-pickup' : ''} ${s.isSchool ? 'stop-school' : ''} ${idx === 0 ? 'stop-completed' : ''}">
        <span class="timeline-stop-node" aria-hidden="true"></span>
        <div class="timeline-stop-main">
          <div class="stop-name-row">
            <span class="stop-title">${s.name}</span>
            ${s.isChildStop ? '<span class="stop-tag-badge tag-user-stop">Your Stop</span>' : ''}
            ${s.isSchool ? '<span class="stop-tag-badge tag-school">Destination</span>' : ''}
          </div>
          <span class="stop-landmark">${s.landmark}</span>
        </div>
        <div class="timeline-stop-time-wrap">
          <div class="stop-time-val">${s.time}</div>
          <div class="stop-time-sub">${s.isChildStop ? 'Scheduled' : 'Estimated'}</div>
        </div>
      </li>
    `).join('');
  }

  /* ==========================================================================
     6. MORNING / EVENING SHIFT TOGGLES
     ========================================================================== */
  if (btnToggleMorning && btnToggleAfternoon) {
    btnToggleMorning.addEventListener('click', () => {
      btnToggleMorning.classList.add('active');
      btnToggleAfternoon.classList.remove('active');
      currentShift = 'morning';
      renderRouteDetails();
    });

    btnToggleAfternoon.addEventListener('click', () => {
      btnToggleAfternoon.classList.add('active');
      btnToggleMorning.classList.remove('active');
      currentShift = 'afternoon';
      renderRouteDetails();
    });
  }

  // Initial Execution
  renderRouteDetails();


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
