/**
 * SCHOOLROUTE — PAYMENT PAGE JAVASCRIPT
 * Frontend Demo Prototype (No real backend)
 * Simulates secure payment checkout, plan display, and subscription activation
 */

'use strict';

/* ==========================================================================
   CENTRALIZED PLAN DATA (matches pricing.html & signup.js exactly)
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
const LS_USERS_KEY    = 'schoolroute_users';
const LS_CURRENT_USER = 'schoolroute_current_user';

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
  try {
    localStorage.setItem(LS_USERS_KEY, JSON.stringify(users));
  } catch (e) {
    console.warn('Could not save users to localStorage:', e);
  }
}

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem(LS_CURRENT_USER)) || null;
  } catch {
    return null;
  }
}

function getPlanFromURL() {
  const params = new URLSearchParams(window.location.search);
  const plan = (params.get('plan') || '').toLowerCase().trim();
  return SR_PLANS[plan] ? plan : null;
}

function generatePaymentRef() {
  const dateStr = Date.now().toString(36).toUpperCase();
  const randStr = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `SRPAY-${dateStr}-${randStr}`;
}

/* ==========================================================================
   ERROR & VALIDATION HELPERS
   ========================================================================== */
function showFieldError(inputEl, errorEl, message) {
  if (inputEl) {
    inputEl.classList.add('has-error');
    inputEl.classList.remove('has-success');
    inputEl.setAttribute('aria-invalid', 'true');
  }
  if (errorEl) {
    errorEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>${message}`;
    errorEl.classList.add('visible');
  }
}

function clearFieldError(inputEl, errorEl) {
  if (inputEl) {
    inputEl.classList.remove('has-error');
    inputEl.removeAttribute('aria-invalid');
  }
  if (errorEl) {
    errorEl.classList.remove('visible');
  }
}

function setFieldSuccess(inputEl, errorEl) {
  if (inputEl) {
    inputEl.classList.remove('has-error');
    inputEl.classList.add('has-success');
    inputEl.removeAttribute('aria-invalid');
  }
  if (errorEl) {
    errorEl.classList.remove('visible');
  }
}

/* ==========================================================================
   MAIN INITIALIZATION
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {

  /* --- Identify Current User --- */
  const currentUser = getCurrentUser();
  const users = getUsers();
  const fullUserRecord = currentUser ? users.find(u => u.id === currentUser.id || u.email.toLowerCase() === currentUser.email.toLowerCase()) : null;

  const userNameEl = document.getElementById('payment-user-name');
  if (userNameEl) {
    userNameEl.textContent = (fullUserRecord && fullUserRecord.name) || (currentUser && currentUser.name) || 'Parent';
  }

  /* --- Identify Plan & Children Count --- */
  const urlParams = new URLSearchParams(window.location.search);
  let activePlanKey = getPlanFromURL() || (fullUserRecord && fullUserRecord.selectedPlan) || 'quarterly';
  if (!SR_PLANS[activePlanKey]) {
    activePlanKey = 'quarterly';
  }
  const currentPlan = SR_PLANS[activePlanKey];

  const rawChildrenParam = urlParams.get('children');
  let numChildren = 1;
  if (rawChildrenParam && !isNaN(parseInt(rawChildrenParam, 10))) {
    numChildren = Math.max(1, Math.min(10, parseInt(rawChildrenParam, 10)));
  } else if (fullUserRecord && fullUserRecord.numberOfChildren) {
    numChildren = Math.max(1, Math.min(10, parseInt(fullUserRecord.numberOfChildren, 10)));
  } else if (currentUser && currentUser.numberOfChildren) {
    numChildren = Math.max(1, Math.min(10, parseInt(currentUser.numberOfChildren, 10)));
  }

  const totalAmount = currentPlan.price * numChildren;
  const totalAmountFormatted = totalAmount.toLocaleString('en-IN');

  /* --- Populate Plan Details in UI --- */
  const planNameEl = document.getElementById('pmt-plan-name');
  const planAmountEl = document.getElementById('pmt-plan-amount');
  const planPeriodEl = document.getElementById('pmt-plan-period');
  const planFeaturesEl = document.getElementById('pmt-plan-features');

  const breakdownPlanName = document.getElementById('breakdown-plan-name');
  const breakdownChildrenCount = document.getElementById('breakdown-children-count');
  const breakdownPricePerChild = document.getElementById('breakdown-price-per-child');
  const breakdownAmount = document.getElementById('breakdown-amount');
  const breakdownTotal = document.getElementById('breakdown-total');
  const payBtnLabel = document.getElementById('pay-btn-label');

  if (planNameEl) {
    const badgeHtml = currentPlan.badge ? ` <span class="plan-badge">${currentPlan.badge}</span>` : '';
    planNameEl.innerHTML = `${currentPlan.name}${badgeHtml}`;
  }
  if (planAmountEl) planAmountEl.textContent = currentPlan.priceFormatted;
  if (planPeriodEl) planPeriodEl.textContent = currentPlan.period;

  if (planFeaturesEl) {
    planFeaturesEl.innerHTML = currentPlan.features.map(f => `
      <li class="plan-feature-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>${f}</span>
      </li>
    `).join('');
  }

  if (breakdownPlanName) breakdownPlanName.textContent = currentPlan.displayName;
  if (breakdownChildrenCount) breakdownChildrenCount.textContent = `${numChildren} ${numChildren === 1 ? 'Child' : 'Children'}`;
  if (breakdownPricePerChild) breakdownPricePerChild.textContent = `₹${currentPlan.priceFormatted}`;
  if (breakdownAmount) breakdownAmount.textContent = `₹${totalAmountFormatted}`;
  if (breakdownTotal) breakdownTotal.textContent = `₹${totalAmountFormatted}`;
  if (payBtnLabel) payBtnLabel.textContent = `Pay ₹${totalAmountFormatted}`;

  /* --- Payment Method Tabs --- */
  const tabBtns = document.querySelectorAll('.payment-tab-btn');
  const panels = document.querySelectorAll('.payment-method-panel');
  let activeMethod = 'upi';

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const method = btn.getAttribute('data-method');
      if (!method || method === activeMethod) return;

      activeMethod = method;

      // Update Tab state
      tabBtns.forEach(b => {
        const isTarget = b === btn;
        b.classList.toggle('active', isTarget);
        b.setAttribute('aria-selected', isTarget ? 'true' : 'false');
      });

      // Update Panel state
      panels.forEach(p => {
        const isTarget = p.id === `panel-${method}`;
        p.classList.toggle('active', isTarget);
      });

      // Hide error banner when switching tabs
      const errorBanner = document.getElementById('payment-error-banner');
      if (errorBanner) errorBanner.classList.remove('visible');
    });
  });

  /* --- Input Elements & Listeners --- */
  // UPI
  const upiInput = document.getElementById('upi-id');
  const upiError = document.getElementById('upi-error');

  if (upiInput) {
    upiInput.addEventListener('input', () => {
      clearFieldError(upiInput, upiError);
    });
  }

  // Card
  const cardNumberInput = document.getElementById('card-number');
  const cardNumberError = document.getElementById('card-number-error');
  const cardNameInput = document.getElementById('card-name');
  const cardNameError = document.getElementById('card-name-error');
  const cardExpiryInput = document.getElementById('card-expiry');
  const cardExpiryError = document.getElementById('card-expiry-error');
  const cardCvvInput = document.getElementById('card-cvv');
  const cardCvvError = document.getElementById('card-cvv-error');

  // Format Card Number (XXXX XXXX XXXX XXXX)
  if (cardNumberInput) {
    cardNumberInput.addEventListener('input', (e) => {
      clearFieldError(cardNumberInput, cardNumberError);
      let value = e.target.value.replace(/\D/g, '').substring(0, 16);
      let formatted = value.match(/.{1,4}/g)?.join(' ') || value;
      e.target.value = formatted;
    });
  }

  // Format Expiry (MM / YY)
  if (cardExpiryInput) {
    cardExpiryInput.addEventListener('input', (e) => {
      clearFieldError(cardExpiryInput, cardExpiryError);
      let value = e.target.value.replace(/\D/g, '').substring(0, 4);
      if (value.length >= 3) {
        e.target.value = `${value.substring(0, 2)} / ${value.substring(2, 4)}`;
      } else {
        e.target.value = value;
      }
    });
  }

  if (cardNameInput) {
    cardNameInput.addEventListener('input', () => clearFieldError(cardNameInput, cardNameError));
  }

  if (cardCvvInput) {
    cardCvvInput.addEventListener('input', (e) => {
      clearFieldError(cardCvvInput, cardCvvError);
      e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
    });
  }

  // Net Banking
  const bankSelect = document.getElementById('bank-select');
  const bankError = document.getElementById('bank-error');

  if (bankSelect) {
    bankSelect.addEventListener('change', () => {
      clearFieldError(bankSelect, bankError);
    });
  }

  /* --- Pay Button Submission Handler --- */
  const payBtn = document.getElementById('pay-btn');
  const errorBanner = document.getElementById('payment-error-banner');
  const errorMsg = document.getElementById('payment-error-msg');
  const successOverlay = document.getElementById('payment-success-overlay');

  if (payBtn) {
    payBtn.addEventListener('click', () => {
      if (payBtn.classList.contains('loading')) return;

      let isValid = true;
      if (errorBanner) errorBanner.classList.remove('visible');

      if (activeMethod === 'upi') {
        const upiVal = upiInput ? upiInput.value.trim() : '';
        const upiRegex = /^[\w.\-]{2,}@[a-zA-Z]{2,}$/;
        if (!upiVal || !upiRegex.test(upiVal)) {
          showFieldError(upiInput, upiError, 'Please enter a valid UPI ID (e.g. name@okaxis, user@upi).');
          isValid = false;
        } else {
          setFieldSuccess(upiInput, upiError);
        }
      } else if (activeMethod === 'card') {
        const rawCardNum = cardNumberInput ? cardNumberInput.value.replace(/\s/g, '') : '';
        if (!rawCardNum || rawCardNum.length !== 16 || !/^\d{16}$/.test(rawCardNum)) {
          showFieldError(cardNumberInput, cardNumberError, 'Please enter a valid 16-digit card number.');
          isValid = false;
        } else {
          setFieldSuccess(cardNumberInput, cardNumberError);
        }

        const nameVal = cardNameInput ? cardNameInput.value.trim() : '';
        if (!nameVal || nameVal.length < 3) {
          showFieldError(cardNameInput, cardNameError, 'Please enter the cardholder full name.');
          isValid = false;
        } else {
          setFieldSuccess(cardNameInput, cardNameError);
        }

        const expVal = cardExpiryInput ? cardExpiryInput.value.replace(/\s/g, '') : '';
        const expMatch = expVal.match(/^(\d{2})\/?(\d{2})$/);
        if (!expMatch) {
          showFieldError(cardExpiryInput, cardExpiryError, 'Enter a valid expiry in MM / YY format.');
          isValid = false;
        } else {
          const month = parseInt(expMatch[1], 10);
          if (month < 1 || month > 12) {
            showFieldError(cardExpiryInput, cardExpiryError, 'Invalid expiry month (01-12).');
            isValid = false;
          } else {
            setFieldSuccess(cardExpiryInput, cardExpiryError);
          }
        }

        const cvvVal = cardCvvInput ? cardCvvInput.value.trim() : '';
        if (!cvvVal || (cvvVal.length !== 3 && cvvVal.length !== 4)) {
          showFieldError(cardCvvInput, cardCvvError, 'Please enter a valid 3 or 4-digit CVV.');
          isValid = false;
        } else {
          setFieldSuccess(cardCvvInput, cardCvvError);
        }
      } else if (activeMethod === 'netbanking') {
        const bankVal = bankSelect ? bankSelect.value : '';
        if (!bankVal) {
          showFieldError(bankSelect, bankError, 'Please select your bank from the list.');
          isValid = false;
        } else {
          setFieldSuccess(bankSelect, bankError);
        }
      }

      if (!isValid) {
        if (errorBanner) {
          errorBanner.classList.add('visible');
          if (errorMsg) errorMsg.textContent = 'Please fill in all required payment fields correctly.';
        }
        return;
      }

      // Start processing animation
      payBtn.classList.add('loading');
      payBtn.disabled = true;

      // Simulate payment network roundtrip
      setTimeout(() => {
        payBtn.classList.remove('loading');
        payBtn.disabled = false;

        const refId = generatePaymentRef();
        const paymentDate = new Date().toISOString();

        // Update user state in localStorage
        const allUsers = getUsers();
        let updatedUserName = 'Parent';

        if (currentUser) {
          const idx = allUsers.findIndex(u => u.id === currentUser.id || u.email.toLowerCase() === currentUser.email.toLowerCase());
          if (idx !== -1) {
            allUsers[idx].paymentStatus = 'completed';
            allUsers[idx].subscriptionStatus = 'active';
            allUsers[idx].numberOfChildren = numChildren;
            allUsers[idx].pricePerChild = currentPlan.price;
            allUsers[idx].totalAmount = totalAmount;
            allUsers[idx].paymentAmount = totalAmount;
            allUsers[idx].paymentReference = refId;
            allUsers[idx].paymentDate = paymentDate;
            allUsers[idx].selectedPlan = activePlanKey;
            allUsers[idx].billingPeriod = currentPlan.period;
            updatedUserName = allUsers[idx].name || currentUser.name || 'Parent';
          } else {
            // Create user record if none existed
            const newRecord = {
              id:                 currentUser.id || 'usr_' + Date.now(),
              name:               currentUser.name || 'Parent',
              email:              (currentUser.email || 'parent@example.com').toLowerCase(),
              numberOfChildren:   numChildren,
              selectedPlan:       activePlanKey,
              pricePerChild:      currentPlan.price,
              totalAmount:        totalAmount,
              billingPeriod:      currentPlan.period,
              paymentStatus:      'completed',
              subscriptionStatus: 'active',
              paymentAmount:      totalAmount,
              paymentReference:   refId,
              paymentDate:        paymentDate,
              registeredAt:       paymentDate,
            };
            allUsers.push(newRecord);
            updatedUserName = newRecord.name;
          }
          saveUsers(allUsers);

          // Update current user session
          localStorage.setItem(LS_CURRENT_USER, JSON.stringify({
            id:                 currentUser.id,
            name:               updatedUserName,
            email:              currentUser.email,
            phone:              (allUsers[idx] && allUsers[idx].phone) || currentUser.phone || '',
            numberOfChildren:   numChildren,
            selectedPlan:       activePlanKey,
            pricePerChild:      currentPlan.price,
            totalAmount:        totalAmount,
            billingPeriod:      currentPlan.period,
            paymentStatus:      'completed',
            subscriptionStatus: 'active',
            children:           (allUsers[idx] && allUsers[idx].children) || []
          }));
        }

        // Fill modal details
        const successName = document.getElementById('success-user-name');
        const successPlan = document.getElementById('success-plan-name');
        const successAmount = document.getElementById('success-amount');
        const successRef = document.getElementById('success-ref-id');
        const continueBtn = document.getElementById('success-continue-btn');

        if (successName) successName.textContent = updatedUserName;
        if (successPlan) successPlan.textContent = `${currentPlan.name} • ${numChildren} ${numChildren === 1 ? 'Child' : 'Children'} (${currentPlan.period})`;
        if (successAmount) successAmount.textContent = `₹${totalAmountFormatted}`;
        if (successRef) successRef.textContent = refId;

        if (continueBtn) {
          continueBtn.href = `login.html?registered=true&email=${encodeURIComponent((currentUser && currentUser.email) || '')}`;
        }

        // Show Modal
        if (successOverlay) {
          successOverlay.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      }, 1200);
    });
  }

});
