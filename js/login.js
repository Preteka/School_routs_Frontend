/**
 * SCHOOLROUTE — LOGIN PAGE JAVASCRIPT
 * Frontend Demo Prototype (No real backend)
 * localStorage-based authentication with Admin & Parent routing
 */

'use strict';

/* ==========================================================================
   CONSTANTS & LOCALSTORAGE KEYS
   ========================================================================== */
const LS_USERS_KEY         = 'schoolroute_users';
const LS_CURRENT_USER      = 'schoolroute_current_user';
const PARENT_DASHBOARD_URL = 'dashboard/dashboard.html';
const ADMIN_DASHBOARD_URL  = 'admin-dashboard/admin-dashboard.html';

// Preset Admin Credentials
const ADMIN_CREDENTIALS = {
  email: 'admin@schoolroute.in',
  password: 'Admin@123'
};

/* ==========================================================================
   HELPERS & STORE INITIALIZATION
   ========================================================================== */
function getUsers() {
  try {
    const raw = localStorage.getItem(LS_USERS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Error reading users from localStorage:', err);
  }

  // Seed default demo parent user if none exists in browser storage
  const defaultUsers = [
    {
      id: 'SR001',
      name: 'Sarah Jenkins',
      email: 'parent@schoolroute.in',
      password: 'Parent@123',
      phone: '+91 98765 43210',
      numberOfChildren: 2,
      selectedPlan: 'quarterly',
      pricePerChild: 2499,
      totalAmount: 4998,
      billingPeriod: '/ 3 months',
      paymentStatus: 'completed',
      subscriptionStatus: 'active',
      children: [
        { id: 'c1', name: 'Aarav Jenkins', grade: 'Grade 4 - Section B', busNumber: 'Bus 24', stopName: 'Maple Street & 5th Ave', status: 'On Bus' },
        { id: 'c2', name: 'Ananya Jenkins', grade: 'Grade 2 - Section A', busNumber: 'Bus 12', stopName: 'Oak Ridge Society', status: 'At School' }
      ]
    },
    {
      id: 'SR002',
      name: 'Sarah Jenkins',
      email: 'parent@example.com',
      password: 'Parent@123',
      phone: '+91 98765 43210',
      numberOfChildren: 2,
      selectedPlan: 'quarterly',
      pricePerChild: 2499,
      totalAmount: 4998,
      billingPeriod: '/ 3 months',
      paymentStatus: 'completed',
      subscriptionStatus: 'active',
      children: [
        { id: 'c1', name: 'Aarav Jenkins', grade: 'Grade 4 - Section B', busNumber: 'Bus 24', stopName: 'Maple Street & 5th Ave', status: 'On Bus' },
        { id: 'c2', name: 'Ananya Jenkins', grade: 'Grade 2 - Section A', busNumber: 'Bus 12', stopName: 'Oak Ridge Society', status: 'At School' }
      ]
    }
  ];

  try {
    localStorage.setItem(LS_USERS_KEY, JSON.stringify(defaultUsers));
  } catch (err) {
    console.warn('Error seeding default users:', err);
  }

  return defaultUsers;
}

function findUserByEmail(email) {
  if (!email) return null;
  const users = getUsers();
  return users.find(u => u.email && u.email.toLowerCase() === email.toLowerCase());
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ==========================================================================
   URL QUERY PARAM — READ PLAN (passed when user comes from signup/pricing)
   ========================================================================== */
function getPlanFromURL() {
  const params = new URLSearchParams(window.location.search);
  return (params.get('plan') || '').toLowerCase().trim();
}

/* ==========================================================================
   FIELD ERROR HELPERS
   ========================================================================== */
function showFieldError(inputEl, errorEl, message) {
  inputEl.classList.add('has-error');
  inputEl.classList.remove('has-success');
  errorEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>${message}`;
  errorEl.classList.add('visible');
  inputEl.setAttribute('aria-invalid', 'true');
}

function clearFieldError(inputEl, errorEl) {
  inputEl.classList.remove('has-error');
  errorEl.classList.remove('visible');
  inputEl.removeAttribute('aria-invalid');
}

/* ==========================================================================
   INIT
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {

  const planId     = getPlanFromURL();
  const validPlans = ['monthly', 'quarterly', 'yearly'];

  /* Update "Create Account" link to carry plan if present */
  const signupLink = document.getElementById('switch-to-signup-link');
  if (signupLink && planId && validPlans.includes(planId)) {
    signupLink.href = `signup.html?plan=${planId}`;
  }

  /* ===== DOM refs ===== */
  const form          = document.getElementById('login-form');
  const emailInput    = document.getElementById('login-email');
  const passwordInput = document.getElementById('login-password');
  const submitBtn     = document.getElementById('login-submit-btn');

  const emailError    = document.getElementById('login-email-error');
  const passwordError = document.getElementById('login-password-error');
  const errorBanner   = document.getElementById('login-error-banner');
  const errorMsg      = document.getElementById('login-error-msg');
  const successBanner = document.getElementById('login-success-banner');
  const successMsg    = document.getElementById('login-success-msg');

  /* Check URL params for success state or prefilled email */
  const urlParams       = new URLSearchParams(window.location.search);
  const emailParam      = urlParams.get('email');
  const registeredParam = urlParams.get('registered');

  if (emailParam && emailInput) {
    emailInput.value = decodeURIComponent(emailParam);
  }

  if (registeredParam && successBanner) {
    successBanner.classList.add('visible');
    if (successMsg) {
      successMsg.textContent = 'Account created & payment completed! Please login to continue.';
    }
  }

  /* ===== Password toggle ===== */
  const pwdToggle = document.getElementById('login-pwd-toggle');
  if (pwdToggle && passwordInput) {
    pwdToggle.addEventListener('click', () => {
      const isText = passwordInput.type === 'text';
      passwordInput.type = isText ? 'password' : 'text';
      pwdToggle.classList.toggle('showing', !isText);
      pwdToggle.setAttribute('aria-label', isText ? 'Show password' : 'Hide password');
    });
  }

  /* ===== Live field validation on blur ===== */
  emailInput.addEventListener('blur', () => {
    const v = emailInput.value.trim();
    if (!v || !isValidEmail(v)) {
      showFieldError(emailInput, emailError, 'Please enter a valid email address.');
    } else {
      clearFieldError(emailInput, emailError);
      emailInput.classList.add('has-success');
    }
  });

  passwordInput.addEventListener('blur', () => {
    const v = passwordInput.value;
    if (!v) {
      showFieldError(passwordInput, passwordError, 'Please enter your password.');
    } else {
      clearFieldError(passwordInput, passwordError);
      passwordInput.classList.add('has-success');
    }
  });

  /* Helper to show error banner */
  function showLoginError() {
    errorBanner.classList.add('visible');
    if (errorMsg) {
      errorMsg.textContent = 'Invalid email or password.';
    }
    passwordInput.value = '';
    passwordInput.classList.add('has-error');
  }

  /* ===== Form submission ===== */
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    errorBanner.classList.remove('visible');

    const email    = emailInput.value.trim();
    const password = passwordInput.value;

    let hasError = false;

    if (!email || !isValidEmail(email)) {
      showFieldError(emailInput, emailError, 'Please enter a valid email address.');
      hasError = true;
    } else {
      clearFieldError(emailInput, emailError);
      emailInput.classList.add('has-success');
    }

    if (!password) {
      showFieldError(passwordInput, passwordError, 'Please enter your password.');
      hasError = true;
    } else {
      clearFieldError(passwordInput, passwordError);
    }

    if (hasError) {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      return;
    }

    /* --- Simulate async login check --- */
    setTimeout(() => {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;

      const normalizedEmail = email.toLowerCase();

      /* ----------------------------------------------------------------------
         1. ADMIN LOGIN AUTHENTICATION
         ---------------------------------------------------------------------- */
      if (normalizedEmail === ADMIN_CREDENTIALS.email.toLowerCase()) {
        if (password === ADMIN_CREDENTIALS.password) {
          // Store admin session in localStorage
          localStorage.setItem(LS_CURRENT_USER, JSON.stringify({
            id:        'ADMIN001',
            name:      'Fleet Administrator',
            email:     ADMIN_CREDENTIALS.email,
            role:      'admin',
            roleTitle: 'Chief Fleet Admin'
          }));

          // Redirect to Admin Dashboard
          window.location.href = ADMIN_DASHBOARD_URL;
          return;
        } else {
          showLoginError();
          return;
        }
      }

      /* ----------------------------------------------------------------------
         2. PARENT USER AUTHENTICATION
         ---------------------------------------------------------------------- */
      const user = findUserByEmail(normalizedEmail);

      // Check if registered user exists and password matches
      if (!user || user.password !== password) {
        showLoginError();
        return;
      }

      // Store parent session with all user attributes
      localStorage.setItem(LS_CURRENT_USER, JSON.stringify({
        id:                 user.id || ('SR' + Date.now().toString().slice(-4)),
        name:               user.name || 'Sarah Jenkins',
        email:              user.email,
        role:               'parent',
        phone:              user.phone || '+91 98765 43210',
        numberOfChildren:   user.numberOfChildren || 2,
        selectedPlan:       user.selectedPlan || 'quarterly',
        pricePerChild:      user.pricePerChild || 2499,
        totalAmount:        user.totalAmount || ((user.numberOfChildren || 2) * (user.pricePerChild || 2499)),
        billingPeriod:      user.billingPeriod || '/ 3 months',
        paymentStatus:      user.paymentStatus || 'completed',
        subscriptionStatus: user.subscriptionStatus || 'active',
        children:           user.children || [
          { id: 'c1', name: 'Aarav Jenkins', grade: 'Grade 4 - Section B', busNumber: 'Bus 24', stopName: 'Maple Street & 5th Ave', status: 'On Bus' },
          { id: 'c2', name: 'Ananya Jenkins', grade: 'Grade 2 - Section A', busNumber: 'Bus 12', stopName: 'Oak Ridge Society', status: 'At School' }
        ]
      }));

      // Determine redirect destination
      const hasPaidSubscription = (user.paymentStatus === 'paid' || user.paymentStatus === 'completed') &&
                                   (user.subscriptionStatus === 'active' || !user.subscriptionStatus);

      if (planId && validPlans.includes(planId)) {
        if (hasPaidSubscription) {
          window.location.href = PARENT_DASHBOARD_URL;
        } else {
          window.location.href = `payment.html?plan=${planId}`;
        }
        return;
      }

      if (hasPaidSubscription) {
        window.location.href = PARENT_DASHBOARD_URL;
      } else {
        const targetPlan = user.selectedPlan || 'monthly';
        window.location.href = `payment.html?plan=${targetPlan}`;
      }

    }, 600);
  });

});
