/**
 * SCHOOLROUTE — SIGNUP PAGE JAVASCRIPT
 * Frontend Demo Prototype (No real backend)
 * localStorage-based user management
 */

'use strict';

/* ==========================================================================
   CENTRALIZED PLAN DATA (matches pricing.html exactly)
   ========================================================================== */
const SR_PLANS = {
  monthly: {
    id: 'monthly',
    name: 'Monthly Plan',
    displayName: 'Monthly Plan',
    price: 999,
    priceFormatted: '999',
    period: '/ month',
    badge: null,
    features: [
      'Live GPS Tracking',
      'Instant Arrival Alerts',
      'RFID Student Check-in Alerts',
      'Standard Support',
    ],
  },
  quarterly: {
    id: 'quarterly',
    name: 'Quarterly Plan',
    displayName: 'Quarterly Plan',
    price: 2499,
    priceFormatted: '2,499',
    period: '/ 3 months',
    badge: 'Most Popular',
    features: [
      'All Monthly Features',
      'Extended Support',
      'Multi-Guardian Alert Channels',
      'Advanced Multi-Stop Alerts',
    ],
  },
  yearly: {
    id: 'yearly',
    name: 'Yearly Plan',
    displayName: 'Yearly Plan',
    price: 8999,
    priceFormatted: '8,999',
    period: '/ year',
    badge: 'Best Value',
    features: [
      'All Features Included',
      '24/7 Priority Hotline',
      'Dedicated Safety Concierge',
      'Travel Reports & Insights',
    ],
  },
};

/* ==========================================================================
   LOCALSTORAGE KEYS
   ========================================================================== */
const LS_USERS_KEY       = 'schoolroute_users';
const LS_CURRENT_USER    = 'schoolroute_current_user';
const DASHBOARD_URL      = 'dashboard/dashboard.html'; // New parent dashboard

/* ==========================================================================
   HELPERS
   ========================================================================== */
function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(LS_USERS_KEY)) || [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(LS_USERS_KEY, JSON.stringify(users));
}

function findUserByEmail(email) {
  return getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
}

function generateUserId() {
  const num = String(getUsers().length + 1).padStart(3, '0');
  return 'SR' + num;
}

/* ==========================================================================
   URL QUERY PARAM — READ PLAN
   ========================================================================== */
function getPlanFromURL() {
  const params = new URLSearchParams(window.location.search);
  return (params.get('plan') || '').toLowerCase().trim();
}

/* ==========================================================================
   PLAN SUMMARY CARD — RENDER
   ========================================================================== */
function renderPlanSummary(planId) {
  const plan = SR_PLANS[planId];
  if (!plan) return;

  const nameEl    = document.getElementById('plan-name-display');
  const priceEl   = document.getElementById('plan-price-display');
  const periodEl  = document.getElementById('plan-period-display');
  const featEl    = document.getElementById('plan-features-display');

  if (nameEl) {
    nameEl.innerHTML = plan.displayName +
      (plan.badge ? ` <span class="plan-badge">${plan.badge}</span>` : '');
  }
  if (priceEl)  priceEl.textContent = plan.priceFormatted;
  if (periodEl) periodEl.textContent = plan.period;

  if (featEl) {
    featEl.innerHTML = plan.features.map(f => `
      <li class="plan-summary-feature">
        <div class="plan-feature-check" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#32A852" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <span>${f}</span>
      </li>
    `).join('');
  }
}

/* ==========================================================================
   FORM VALIDATION HELPERS
   ========================================================================== */
function showError(inputEl, errorEl, message) {
  inputEl.classList.add('has-error');
  inputEl.classList.remove('has-success');
  if (message) {
    const msgSpan = errorEl.querySelector('span') || errorEl;
    // Some errors just have a single text — replace just text nodes
    // Use the span itself if it has a span child for the text
    if (errorEl.querySelector('span')) {
      // keep the svg, set text
    }
    errorEl.textContent = '';
    errorEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>${message}`;
  }
  errorEl.classList.add('visible');
  inputEl.setAttribute('aria-invalid', 'true');
}

function clearError(inputEl, errorEl) {
  inputEl.classList.remove('has-error');
  errorEl.classList.remove('visible');
  inputEl.removeAttribute('aria-invalid');
}

function setSuccess(inputEl, errorEl) {
  clearError(inputEl, errorEl);
  inputEl.classList.add('has-success');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  const digits = phone.replace(/[\s\-().+]/g, '');
  return /^\d{10,}$/.test(digits);
}

/* ==========================================================================
   PASSWORD STRENGTH
   ========================================================================== */
function getPasswordStrength(password) {
  let score = 0;
  if (password.length >= 8)  score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { level: 'Weak',   width: '25%',  color: '#E63946' };
  if (score <= 2) return { level: 'Fair',   width: '50%',  color: '#E5A000' };
  if (score <= 3) return { level: 'Good',   width: '75%',  color: '#2E8B57' };
  return           { level: 'Strong', width: '100%', color: '#075B46' };
}

/* ==========================================================================
   DOM INIT
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {

  /* --- Read plan from URL --- */
  const planId = getPlanFromURL();

  /* If no valid plan → redirect to pricing */
  if (!planId || !SR_PLANS[planId]) {
    window.location.replace('pricing.html');
    return;
  }

  const plan = SR_PLANS[planId];

  /* --- Render plan summary card --- */
  renderPlanSummary(planId);

  /* --- Update login link to carry plan --- */
  const loginLink = document.getElementById('switch-to-login-link');
  if (loginLink) {
    loginLink.href = `login.html?plan=${planId}`;
  }

  /* --- Update "Login to Continue" link dynamically --- */
  const loginContinueBtn = document.getElementById('login-continue-btn');
  if (loginContinueBtn) {
    loginContinueBtn.href = `login.html?plan=${planId}`;
  }

  /* =====================================================================
     FORM ELEMENTS
     ===================================================================== */
  const form             = document.getElementById('signup-form');
  const nameInput        = document.getElementById('full-name');
  const emailInput       = document.getElementById('email');
  const phoneInput       = document.getElementById('phone');
  const childrenInput    = document.getElementById('num-children');
  const btnChildDec      = document.getElementById('btn-child-dec');
  const btnChildInc      = document.getElementById('btn-child-inc');
  const passwordInput    = document.getElementById('password');
  const confirmInput     = document.getElementById('confirm-password');
  const submitBtn        = document.getElementById('signup-submit-btn');

  const nameError        = document.getElementById('full-name-error');
  const emailError       = document.getElementById('email-error');
  const phoneError       = document.getElementById('phone-error');
  const childrenError    = document.getElementById('num-children-error');
  const passwordError    = document.getElementById('password-error');
  const confirmError     = document.getElementById('confirm-password-error');

  const formErrorBanner  = document.getElementById('form-error-banner');
  const formErrorMsg     = document.getElementById('form-error-msg');
  const existingBanner   = document.getElementById('existing-user-banner');

  const pwdStrengthMeter = document.getElementById('pwd-strength');
  const pwdStrengthFill  = document.getElementById('pwd-strength-fill');
  const pwdStrengthText  = document.getElementById('pwd-strength-text');

  /* =====================================================================
     DYNAMIC SUBSCRIPTION SUMMARY CALCULATION
     ===================================================================== */
  function updateSubscriptionSummary(planId, numChildren) {
    const currentPlan = SR_PLANS[planId] || SR_PLANS.quarterly;
    const safeCount = Math.max(1, Math.min(10, parseInt(numChildren, 10) || 1));
    const total = currentPlan.price * safeCount;
    const totalFormatted = total.toLocaleString('en-IN');

    const badgeEl    = document.getElementById('summary-plan-badge');
    const nameEl     = document.getElementById('summary-plan-name');
    const countEl    = document.getElementById('summary-child-count');
    const perChildEl = document.getElementById('summary-price-per-child');
    const formulaEl  = document.getElementById('summary-calc-breakdown');
    const totalEl    = document.getElementById('summary-total-amount');
    const periodEl   = document.getElementById('summary-total-period');

    if (badgeEl)    badgeEl.textContent = currentPlan.displayName;
    if (nameEl)     nameEl.textContent = currentPlan.displayName;
    if (countEl)    countEl.textContent = `${safeCount} ${safeCount === 1 ? 'Child' : 'Children'}`;
    if (perChildEl) perChildEl.textContent = `₹${currentPlan.priceFormatted} ${currentPlan.period}`;
    if (formulaEl)  formulaEl.textContent = `₹${currentPlan.priceFormatted} × ${safeCount} ${safeCount === 1 ? 'child' : 'children'}`;
    if (totalEl) {
      totalEl.textContent = totalFormatted;
      totalEl.style.transform = 'scale(1.08)';
      setTimeout(() => { totalEl.style.transform = 'scale(1)'; }, 180);
    }
    if (periodEl)   periodEl.textContent = currentPlan.period;
  }

  // Initial calculation on page load
  updateSubscriptionSummary(planId, childrenInput ? childrenInput.value : 1);

  /* Helper to validate number of children */
  function validateChildren(rawVal) {
    if (rawVal === '' || rawVal === null || rawVal === undefined) {
      return 'Please enter the number of children.';
    }
    const num = Number(rawVal);
    if (isNaN(num)) {
      return 'Please enter a valid number of children.';
    }
    if (!Number.isInteger(num)) {
      return 'Please enter a whole number.';
    }
    if (num < 1) {
      return 'Number of children must be at least 1.';
    }
    if (num > 10) {
      return 'Maximum 10 children allowed.';
    }
    return null;
  }

  /* --- Number of Children Input & Stepper Controls --- */
  if (childrenInput) {
    const handleChildrenChange = () => {
      const val = childrenInput.value.trim();
      const err = validateChildren(val);
      if (err) {
        showError(childrenInput, childrenError, err);
      } else {
        setSuccess(childrenInput, childrenError);
        updateSubscriptionSummary(planId, parseInt(val, 10));
      }
    };

    childrenInput.addEventListener('input', handleChildrenChange);
    childrenInput.addEventListener('blur', handleChildrenChange);

    if (btnChildDec) {
      btnChildDec.addEventListener('click', () => {
        let current = parseInt(childrenInput.value, 10) || 1;
        if (current > 1) {
          childrenInput.value = current - 1;
          handleChildrenChange();
        }
      });
    }

    if (btnChildInc) {
      btnChildInc.addEventListener('click', () => {
        let current = parseInt(childrenInput.value, 10) || 1;
        if (current < 10) {
          childrenInput.value = current + 1;
          handleChildrenChange();
        }
      });
    }
  }

  /* =====================================================================
     PASSWORD TOGGLE BUTTONS
     ===================================================================== */
  function setupPwdToggle(btnId, inputId) {
    const btn   = document.getElementById(btnId);
    const input = document.getElementById(inputId);
    if (!btn || !input) return;
    btn.addEventListener('click', () => {
      const isText = input.type === 'text';
      input.type = isText ? 'password' : 'text';
      btn.classList.toggle('showing', !isText);
      btn.setAttribute('aria-label', isText ? 'Show password' : 'Hide password');
    });
  }
  setupPwdToggle('pwd-toggle-1', 'password');
  setupPwdToggle('pwd-toggle-2', 'confirm-password');

  /* =====================================================================
     PASSWORD STRENGTH ON INPUT
     ===================================================================== */
  passwordInput.addEventListener('input', () => {
    const val = passwordInput.value;
    if (val.length === 0) {
      pwdStrengthMeter.classList.remove('visible');
      return;
    }
    pwdStrengthMeter.classList.add('visible');
    const strength = getPasswordStrength(val);
    pwdStrengthFill.style.width           = strength.width;
    pwdStrengthFill.style.backgroundColor = strength.color;
    pwdStrengthText.textContent           = strength.level;
    pwdStrengthText.style.color           = strength.color;
  });

  /* =====================================================================
     LIVE VALIDATION (on blur)
     ===================================================================== */
  nameInput.addEventListener('blur', () => {
    const v = nameInput.value.trim();
    if (!v || v.length < 2) {
      showError(nameInput, nameError, 'Please enter your full name (at least 2 characters).');
    } else {
      setSuccess(nameInput, nameError);
    }
  });

  emailInput.addEventListener('blur', () => {
    const v = emailInput.value.trim();
    if (!v || !isValidEmail(v)) {
      showError(emailInput, emailError, 'Please enter a valid email address.');
    } else {
      setSuccess(emailInput, emailError);
    }
  });

  phoneInput.addEventListener('blur', () => {
    const v = phoneInput.value.trim();
    if (!v || !isValidPhone(v)) {
      showError(phoneInput, phoneError, 'Please enter a valid phone number (at least 10 digits).');
    } else {
      setSuccess(phoneInput, phoneError);
    }
  });

  passwordInput.addEventListener('blur', () => {
    const v = passwordInput.value;
    if (!v || v.length < 8) {
      showError(passwordInput, passwordError, 'Password must be at least 8 characters long.');
    } else {
      setSuccess(passwordInput, passwordError);
    }
  });

  confirmInput.addEventListener('blur', () => {
    const v = confirmInput.value;
    if (!v || v !== passwordInput.value) {
      showError(confirmInput, confirmError, 'Passwords do not match.');
    } else {
      setSuccess(confirmInput, confirmError);
    }
  });

  /* =====================================================================
     FORM SUBMISSION
     ===================================================================== */
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    formErrorBanner.classList.remove('visible');
    existingBanner.classList.remove('visible');

    const name     = nameInput.value.trim();
    const email    = emailInput.value.trim();
    const phone    = phoneInput.value.trim();
    const rawChild = childrenInput ? childrenInput.value.trim() : '1';
    const pwd      = passwordInput.value;
    const confirm  = confirmInput.value;

    let hasError = false;

    /* Validate all fields */
    if (!name || name.length < 2) {
      showError(nameInput, nameError, 'Please enter your full name (at least 2 characters).');
      hasError = true;
    } else {
      setSuccess(nameInput, nameError);
    }

    if (!email || !isValidEmail(email)) {
      showError(emailInput, emailError, 'Please enter a valid email address.');
      hasError = true;
    } else {
      setSuccess(emailInput, emailError);
    }

    if (!phone || !isValidPhone(phone)) {
      showError(phoneInput, phoneError, 'Please enter a valid phone number (at least 10 digits).');
      hasError = true;
    } else {
      setSuccess(phoneInput, phoneError);
    }

    const childErrorMsg = validateChildren(rawChild);
    if (childErrorMsg) {
      showError(childrenInput, childrenError, childErrorMsg);
      hasError = true;
    } else {
      setSuccess(childrenInput, childrenError);
    }

    if (!pwd || pwd.length < 8) {
      showError(passwordInput, passwordError, 'Password must be at least 8 characters long.');
      hasError = true;
    } else {
      setSuccess(passwordInput, passwordError);
    }

    if (!confirm || confirm !== pwd) {
      showError(confirmInput, confirmError, 'Passwords do not match.');
      hasError = true;
    } else {
      setSuccess(confirmInput, confirmError);
    }

    if (hasError) {
      formErrorBanner.classList.add('visible');
      if (formErrorMsg) formErrorMsg.textContent = 'Please fix the errors above to continue.';
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      // Scroll to first error
      const firstError = form.querySelector('.has-error');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    /* --- Check if email already exists --- */
    const existingUser = findUserByEmail(email);

    // Simulate async processing
    setTimeout(() => {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;

      if (existingUser) {
        /* Show existing user banner */
        existingBanner.classList.add('visible');
        existingBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      /* --- Create new user with child count and total amount --- */
      const numChildren = parseInt(rawChild, 10) || 1;
      const totalAmount = plan.price * numChildren;

      const newUser = {
        id:                 generateUserId(),
        name:               name,
        email:              email.toLowerCase(),
        phone:              phone,
        password:           pwd,        // NOTE: plaintext only for frontend demo
        numberOfChildren:   numChildren,
        selectedPlan:       planId,
        pricePerChild:      plan.price,
        totalAmount:        totalAmount,
        billingPeriod:      plan.period,
        paymentStatus:      'pending',
        subscriptionStatus: 'inactive',
        paymentAmount:      null,
        paymentReference:   null,
        paymentDate:        null,
        children:           [],
        registeredAt:       new Date().toISOString(),
      };

      const users = getUsers();
      users.push(newUser);
      saveUsers(users);

      /* Set as current user */
      localStorage.setItem(LS_CURRENT_USER, JSON.stringify({
        id:                 newUser.id,
        name:               newUser.name,
        email:              newUser.email,
        phone:              newUser.phone || '',
        numberOfChildren:   numChildren,
        selectedPlan:       planId,
        pricePerChild:      plan.price,
        totalAmount:        totalAmount,
        billingPeriod:      plan.period,
        paymentStatus:      newUser.paymentStatus,
        subscriptionStatus: newUser.subscriptionStatus,
        children:           []
      }));

      /* Navigate to payment carrying both plan and children count */
      window.location.href = `payment.html?plan=${planId}&children=${numChildren}`;
    }, 900);
  });

});
