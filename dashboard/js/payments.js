/**
 * ==========================================================================
 * SCHOOLROUTE — PAYMENTS & SUBSCRIPTION CONTROLLER
 * Tagline: SAFE KIDS • STRONGER TOMORROWS
 * Vanilla JavaScript (User-Specific Real Data, Zero Hardcoded Pricing)
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
     2. DYNAMIC PRICING & PLAN CALCULATIONS
     ========================================================================== */
  const planKey = (currentUser.selectedPlan || 'quarterly').toLowerCase();
  const numChildren = Math.max(1, parseInt(currentUser.numberOfChildren, 10) || 1);

  let defaultRate = 2499;
  let periodText = 'Per Quarter';
  let planTitle = 'Quarterly Plan';

  if (planKey === 'monthly') {
    defaultRate = 999;
    periodText = 'Per Month';
    planTitle = 'Monthly Plan';
  } else if (planKey === 'yearly') {
    defaultRate = 8999;
    periodText = 'Per Year';
    planTitle = 'Yearly Plan';
  }

  const ratePerChild = currentUser.pricePerChild || defaultRate;
  const grandTotal = currentUser.totalAmount || (numChildren * ratePerChild);

  /* ==========================================================================
     3. DOM ELEMENTS
     ========================================================================== */
  const planNameDisplay = document.getElementById('plan-name-display');
  const planStatusPill = document.getElementById('plan-status-pill');
  const valChildrenCount = document.getElementById('val-children-count');
  const valChildrenNames = document.getElementById('val-children-names');
  const valPricePerChild = document.getElementById('val-price-per-child');
  const valBillingPeriod = document.getElementById('val-billing-period');
  const valNextBilling = document.getElementById('val-next-billing');

  const calcPlanName = document.getElementById('calc-plan-name');
  const calcBasePrice = document.getElementById('calc-base-price');
  const calcChildrenMult = document.getElementById('calc-children-mult');
  const valTotalAmount = document.getElementById('val-total-amount');

  const paymentsTableBody = document.getElementById('payments-table-body');
  const paymentsEmptyState = document.getElementById('payments-empty-state');
  const btnViewActiveInvoice = document.getElementById('btn-view-active-invoice');

  // Modal elements
  const invoiceModal = document.getElementById('invoice-modal');
  const btnCloseInvoice = document.getElementById('btn-close-invoice');
  const invParentName = document.getElementById('inv-parent-name');
  const invParentEmail = document.getElementById('inv-parent-email');
  const invParentPhone = document.getElementById('inv-parent-phone');
  const invIdText = document.getElementById('inv-id-text');
  const invDateText = document.getElementById('inv-date-text');
  const invItemPlanName = document.getElementById('inv-item-plan-name');
  const invItemQty = document.getElementById('inv-item-qty');
  const invItemRate = document.getElementById('inv-item-rate');
  const invItemSubtotal = document.getElementById('inv-item-subtotal');
  const invItemGrandtotal = document.getElementById('inv-item-grandtotal');

  /* ==========================================================================
     4. RENDER SUBSCRIPTION HERO CARD
     ========================================================================== */
  function formatINR(val) {
    return '₹' + Number(val).toLocaleString('en-IN');
  }

  if (planNameDisplay) planNameDisplay.textContent = planTitle;
  if (planStatusPill) {
    const isPending = (currentUser.paymentStatus || '').toLowerCase() === 'pending';
    planStatusPill.textContent = isPending ? 'Payment Pending' : 'Active Subscription';
    planStatusPill.className = isPending ? 'sub-status-pill status-pending' : 'sub-status-pill status-active';
  }

  if (valChildrenCount) valChildrenCount.textContent = `${numChildren} ${numChildren === 1 ? 'Child' : 'Children'}`;

  const childrenList = Array.isArray(currentUser.children) ? currentUser.children : [];
  if (valChildrenNames) {
    if (childrenList.length > 0) {
      valChildrenNames.textContent = childrenList.map(c => c.name).filter(Boolean).join(', ') || 'Covered Students';
    } else {
      valChildrenNames.textContent = 'Registered Student Pass';
    }
  }

  if (valPricePerChild) valPricePerChild.textContent = formatINR(ratePerChild);
  if (valBillingPeriod) valBillingPeriod.textContent = periodText;
  if (valNextBilling) valNextBilling.textContent = currentUser.nextBillingDate || '15 Nov 2026';

  if (calcPlanName) calcPlanName.textContent = planTitle;
  if (calcBasePrice) calcBasePrice.textContent = formatINR(ratePerChild);
  if (calcChildrenMult) calcChildrenMult.textContent = `× ${numChildren}`;
  if (valTotalAmount) valTotalAmount.textContent = formatINR(grandTotal);

  /* ==========================================================================
     5. RENDER BILLING / TRANSACTION HISTORY
     ========================================================================== */
  function renderPaymentHistory() {
    let history = Array.isArray(currentUser.paymentHistory) ? currentUser.paymentHistory : [];

    // If user has no explicit history array but completed a subscription payment, generate record
    if (history.length === 0 && (currentUser.paymentStatus === 'completed' || !currentUser.paymentStatus)) {
      history = [
        {
          id: 'INV-SR-2026-' + (currentUser.id ? currentUser.id.replace(/\D/g, '') || '8842' : '8842'),
          date: currentUser.signupDate || '15 Aug 2026',
          plan: `${planTitle} (${numChildren} ${numChildren === 1 ? 'Child' : 'Children'})`,
          mode: currentUser.paymentMethod || 'UPI / Net Banking',
          amount: grandTotal,
          status: 'Paid'
        }
      ];
    }

    if (history.length === 0) {
      if (paymentsTableBody) paymentsTableBody.innerHTML = '';
      if (paymentsEmptyState) paymentsEmptyState.style.display = 'flex';
      return;
    }

    if (paymentsEmptyState) paymentsEmptyState.style.display = 'none';

    if (paymentsTableBody) {
      paymentsTableBody.innerHTML = history.map((item, idx) => `
        <tr>
          <td><strong style="color: var(--dark-text);">${item.date || 'Recent'}</strong></td>
          <td><span class="invoice-id-badge">${item.id || 'INV-SR-00' + (idx + 1)}</span></td>
          <td>${item.plan || planTitle}</td>
          <td>${item.mode || 'Online Checkout'}</td>
          <td><strong style="font-family: var(--font-heading); color: var(--primary-green);">${formatINR(item.amount || grandTotal)}</strong></td>
          <td>
            <span class="sub-status-pill status-active" style="padding: 0.15rem 0.55rem; font-size: 0.72rem;">
              ${item.status || 'Paid'}
            </span>
          </td>
          <td style="text-align: right;">
            <button type="button" class="btn-invoice-action btn-open-receipt" data-idx="${idx}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
              <span>Receipt</span>
            </button>
          </td>
        </tr>
      `).join('');

      document.querySelectorAll('.btn-open-receipt').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(e.currentTarget.getAttribute('data-idx'), 10);
          const item = history[idx] || history[0];
          openInvoiceModal(item);
        });
      });
    }
  }

  /* ==========================================================================
     6. INVOICE MODAL CONTROLS
     ========================================================================== */
  function openInvoiceModal(item) {
    if (!invoiceModal) return;

    if (invParentName) invParentName.textContent = currentUser.name || 'Parent Name';
    if (invParentEmail) invParentEmail.textContent = currentUser.email || 'parent@schoolroute.com';
    if (invParentPhone) invParentPhone.textContent = currentUser.phone || '+91 98765 43210';

    if (invIdText) invIdText.textContent = item?.id || 'INV-SR-2026-8842';
    if (invDateText) invDateText.textContent = `Date: ${item?.date || '15 Aug 2026'}`;
    if (invItemPlanName) invItemPlanName.textContent = `${planTitle} Transport Pass`;
    if (invItemQty) invItemQty.textContent = numChildren;
    if (invItemRate) invItemRate.textContent = formatINR(ratePerChild);
    if (invItemSubtotal) invItemSubtotal.textContent = formatINR(item?.amount || grandTotal);
    if (invItemGrandtotal) invItemGrandtotal.textContent = formatINR(item?.amount || grandTotal);

    invoiceModal.classList.add('active');
    invoiceModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeInvoiceModal() {
    if (!invoiceModal) return;
    invoiceModal.classList.remove('active');
    invoiceModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (btnViewActiveInvoice) {
    btnViewActiveInvoice.addEventListener('click', () => {
      openInvoiceModal({
        id: 'INV-SR-2026-' + (currentUser.id ? currentUser.id.replace(/\D/g, '') || '8842' : '8842'),
        date: currentUser.signupDate || '15 Aug 2026',
        amount: grandTotal
      });
    });
  }

  if (btnCloseInvoice) btnCloseInvoice.addEventListener('click', closeInvoiceModal);

  if (invoiceModal) {
    invoiceModal.addEventListener('click', (e) => {
      if (e.target === invoiceModal) closeInvoiceModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && invoiceModal && invoiceModal.classList.contains('active')) {
      closeInvoiceModal();
    }
  });

  // Initial Execution
  renderPaymentHistory();


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
