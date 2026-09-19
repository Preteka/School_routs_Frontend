/**
 * SCHOOLROUTE — PARENT DASHBOARD JAVASCRIPT
 * Frontend Demo Prototype
 * Handles session validation, plan & billing info, live tracking simulation, and logout
 */

'use strict';

const LS_USERS_KEY    = 'schoolroute_users';
const LS_CURRENT_USER = 'schoolroute_current_user';

const PLAN_DISPLAY = {
  monthly: { name: 'Monthly Plan', price: '₹999 / month' },
  quarterly: { name: 'Quarterly Plan', price: '₹2,499 / 3 months' },
  yearly: { name: 'Yearly Plan', price: '₹8,999 / year' },
};

document.addEventListener('DOMContentLoaded', () => {

  /* --- Check Session --- */
  const currentUserRaw = localStorage.getItem(LS_CURRENT_USER);
  let currentUser = null;
  try {
    currentUser = JSON.parse(currentUserRaw);
  } catch {
    currentUser = null;
  }

  let users = [];
  try {
    users = JSON.parse(localStorage.getItem(LS_USERS_KEY)) || [];
  } catch {
    users = [];
  }

  let fullUser = null;
  if (currentUser) {
    fullUser = users.find(u => u.id === currentUser.id || (u.email && u.email.toLowerCase() === currentUser.email.toLowerCase()));
  }

  // Fallback defaults for demo if opened directly
  const displayName = (fullUser && fullUser.name) || (currentUser && currentUser.name) || 'Parent';
  const planKey = (fullUser && fullUser.selectedPlan) || 'quarterly';
  const planInfo = PLAN_DISPLAY[planKey] || PLAN_DISPLAY.quarterly;
  const refCode = (fullUser && fullUser.paymentReference) || 'SRPAY-DEMO-7890';

  /* --- Populate UI Elements --- */
  const greetingEl = document.getElementById('dash-greeting-name');
  const userDisplayNameEl = document.getElementById('user-display-name');
  const userAvatarInitial = document.getElementById('user-avatar-letter');
  const dashSubPlan = document.getElementById('dash-sub-plan');
  const dashPlanTitle = document.getElementById('dash-plan-title');
  const dashPlanAmount = document.getElementById('dash-plan-amount');
  const dashPlanRef = document.getElementById('dash-plan-ref');

  if (greetingEl) greetingEl.textContent = displayName;
  if (userDisplayNameEl) userDisplayNameEl.textContent = displayName;
  if (userAvatarInitial) userAvatarInitial.textContent = displayName.charAt(0).toUpperCase();

  if (dashSubPlan) dashSubPlan.textContent = `${planInfo.name} · ${planInfo.price.split(' ')[0]}`;
  if (dashPlanTitle) dashPlanTitle.textContent = planInfo.name;
  if (dashPlanAmount) dashPlanAmount.textContent = planInfo.price;
  if (dashPlanRef) dashPlanRef.textContent = refCode;

  /* --- Logout Handlers --- */
  function handleLogout() {
    localStorage.removeItem(LS_CURRENT_USER);
    window.location.href = 'login.html';
  }

  const logoutBtn = document.getElementById('btn-logout');
  if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);

  const mobileLogoutBtn = document.getElementById('btn-mobile-logout');
  if (mobileLogoutBtn) mobileLogoutBtn.addEventListener('click', handleLogout);

  /* --- Demo Invoice Download --- */
  const invoiceBtn = document.getElementById('btn-demo-invoice');
  if (invoiceBtn) {
    invoiceBtn.addEventListener('click', () => {
      const originalText = invoiceBtn.textContent;
      invoiceBtn.textContent = 'Generating PDF...';
      invoiceBtn.disabled = true;

      setTimeout(() => {
        invoiceBtn.textContent = 'Receipt Downloaded ✓';
        setTimeout(() => {
          invoiceBtn.textContent = originalText;
          invoiceBtn.disabled = false;
        }, 2000);
      }, 900);
    });
  }

  /* --- Live Bus GPS Simulation Animation --- */
  const progressBar = document.getElementById('sim-progress-bar');
  const busMarker = document.getElementById('sim-bus-marker');
  const vitalEta = document.getElementById('vital-eta');
  const vitalSpeed = document.getElementById('vital-speed');
  const vitalDist = document.getElementById('vital-dist');

  let progress = 62;
  let direction = 1;

  setInterval(() => {
    // Subtle simulation movement
    progress += 0.4 * direction;
    if (progress > 68) direction = -1;
    if (progress < 58) direction = 1;

    if (progressBar) progressBar.style.width = `${progress}%`;
    if (busMarker) busMarker.style.left = `${progress}%`;

    // Vary speed slightly between 28 and 36 km/h
    const randomSpeed = Math.floor(30 + Math.sin(Date.now() / 1000) * 4);
    if (vitalSpeed) vitalSpeed.textContent = `${randomSpeed} km/h`;

    // Dynamic distance
    const dist = (1.2 - (progress - 58) * 0.05).toFixed(1);
    if (vitalDist) vitalDist.textContent = `${Math.max(0.8, dist)} km`;
  }, 1200);

});
