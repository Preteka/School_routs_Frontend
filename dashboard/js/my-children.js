/**
 * ==========================================================================
 * SCHOOLROUTE — PARENT DASHBOARD MY CHILDREN CONTROLLER
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
     2. NORMALIZE USER DATA
     ========================================================================== */
  const maxChildren = Math.max(1, parseInt(currentUser.numberOfChildren, 10) || 1);
  if (!Array.isArray(currentUser.children)) currentUser.children = [];

  /* ==========================================================================
     3. HELPERS
     ========================================================================== */
  function getInitials(fullName) {
    if (!fullName) return 'SR';
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function generateId() {
    return 'CH_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
  }

  function persistUser() {
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
      console.warn('Failed to persist user:', err);
    }
  }

  function isProfileComplete(child) {
    return Boolean(child.name && child.school && child.grade && child.stop);
  }

  function isValidPhone(phone) {
    if (!phone) return true; // optional field
    const cleaned = phone.replace(/[\s\-\(\)\+]/g, '');
    return /^\d{7,15}$/.test(cleaned);
  }

  /* ==========================================================================
     4. RENDER GREETING & HEADER PROFILE
     ========================================================================== */
  const headerParentName = document.getElementById('header-parent-name');
  if (headerParentName) headerParentName.textContent = currentUser.name;

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
     5. RENDER CHILD COUNT SUMMARY
     ========================================================================== */
  const countContainer = document.getElementById('child-count-summary-container');

  function renderCountSummary() {
    if (!countContainer) return;

    const total = maxChildren;
    const added = currentUser.children.length;
    const remaining = Math.max(0, total - added);
    const pct = Math.min(100, Math.round((added / total) * 100));
    const isFull = added >= total;

    countContainer.innerHTML = `
      <div class="child-count-summary-card">
        <div class="count-summary-left">
          <div class="count-icon-wrap">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </div>
          <div class="count-text-block">
            <span class="count-label">Children Registered</span>
            <div class="count-value-row">
              <span class="count-value">${added} of ${total}</span>
              <span class="count-remaining">${isFull ? 'All slots filled' : remaining + ' remaining'}</span>
            </div>
            <div class="count-progress-bar">
              <div class="count-progress-fill" style="width: ${pct}%;"></div>
            </div>
          </div>
        </div>
        <div class="count-summary-right">
          ${isFull
            ? `<span class="plan-full-message">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span>All child slots filled</span>
              </span>`
            : `<button type="button" class="btn-primary-cta" id="btn-add-child-summary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                <span>Add Child</span>
              </button>`
          }
        </div>
      </div>
    `;

    if (!isFull) {
      const btnAdd = document.getElementById('btn-add-child-summary');
      if (btnAdd) btnAdd.addEventListener('click', () => openChildModal());
    }
  }

  /* ==========================================================================
     6. RENDER CHILDREN CARDS GRID
     ========================================================================== */
  const cardsContainer = document.getElementById('children-cards-container');

  function renderChildrenCards() {
    if (!cardsContainer) return;

    if (currentUser.children.length === 0) {
      cardsContainer.innerHTML = `
        <div class="empty-state-card-full">
          <div class="empty-state-illustration">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </div>
          <h3 class="empty-state-heading">No Children Added Yet</h3>
          <p class="empty-state-description">Add your child's details to start managing their school transport journey.</p>
          <button type="button" class="btn-primary-cta" id="btn-empty-add-child">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            <span>Add Child</span>
          </button>
        </div>
      `;

      const btnEmpty = document.getElementById('btn-empty-add-child');
      if (btnEmpty) btnEmpty.addEventListener('click', () => openChildModal());
      return;
    }

    const cardsHtml = currentUser.children.map((child, index) => {
      const initials = getInitials(child.name);
      const complete = isProfileComplete(child);

      return `
        <div class="child-profile-card-item" data-child-index="${index}">
          <div class="child-card-header">
            <div class="child-avatar-block">
              <span>${initials}</span>
              <span class="child-status-dot ${complete ? '' : 'incomplete'}" title="${complete ? 'Profile Complete' : 'Profile Incomplete'}"></span>
            </div>
            <div class="child-card-name-block">
              <h4 class="child-card-name">${child.name}</h4>
              <span class="child-card-status-badge ${complete ? 'badge-profile-complete' : 'badge-profile-incomplete'}">
                ${complete
                  ? '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg> Profile Complete'
                  : '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg> Profile Incomplete'
                }
              </span>
            </div>
          </div>

          <div class="child-card-body">
            <div class="child-detail-list">
              <div class="child-detail-row">
                <svg class="detail-row-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                <span class="detail-row-label">School</span>
                <span class="detail-row-value">${child.school || 'Not provided'}</span>
              </div>
              <div class="child-detail-row">
                <svg class="detail-row-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                <span class="detail-row-label">Grade</span>
                <span class="detail-row-value">${child.grade || 'Not provided'}</span>
              </div>
              ${child.rollNumber ? `
              <div class="child-detail-row">
                <svg class="detail-row-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                <span class="detail-row-label">Roll No</span>
                <span class="detail-row-value">${child.rollNumber}</span>
              </div>` : ''}
              <div class="child-detail-row">
                <svg class="detail-row-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span class="detail-row-label">Stop</span>
                <span class="detail-row-value">${child.stop || 'Not assigned'}</span>
              </div>
              ${child.emergencyContactName ? `
              <div class="child-detail-row">
                <svg class="detail-row-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <span class="detail-row-label">Contact</span>
                <span class="detail-row-value">${child.emergencyContactName}${child.emergencyContactPhone ? ' · ' + child.emergencyContactPhone : ''}</span>
              </div>` : ''}
            </div>
          </div>

          <div class="child-card-footer">
            <button type="button" class="btn-child-edit" data-edit-index="${index}" aria-label="Edit ${child.name}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
              <span>Edit</span>
            </button>
            <button type="button" class="btn-child-remove" data-remove-index="${index}" aria-label="Remove ${child.name}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              <span>Remove</span>
            </button>
          </div>
        </div>
      `;
    }).join('');

    cardsContainer.innerHTML = `<div class="children-cards-grid">${cardsHtml}</div>`;

    // Attach edit listeners
    document.querySelectorAll('.btn-child-edit').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-edit-index'), 10);
        openChildModal(idx);
      });
    });

    // Attach remove listeners
    document.querySelectorAll('.btn-child-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-remove-index'), 10);
        openRemoveConfirmation(idx);
      });
    });
  }

  /* ==========================================================================
     7. ADD / EDIT CHILD MODAL CONTROLLER
     ========================================================================== */
  const childFormModal = document.getElementById('child-form-modal');
  const childForm = document.getElementById('child-form');
  const btnCloseChildModal = document.getElementById('btn-close-child-modal');
  const btnCancelChildModal = document.getElementById('btn-cancel-child-modal');
  const modalTitle = document.getElementById('child-modal-title');
  const modalSub = document.getElementById('child-modal-sub');
  const btnSaveText = document.getElementById('btn-save-child-text');

  let editingChildIndex = -1; // -1 = adding new, >= 0 = editing existing

  function openChildModal(editIndex) {
    editingChildIndex = typeof editIndex === 'number' ? editIndex : -1;

    // Check capacity on add
    if (editingChildIndex === -1 && currentUser.children.length >= maxChildren) {
      showToast(`Your current plan includes ${maxChildren} ${maxChildren === 1 ? 'child' : 'children'}. You have already added ${currentUser.children.length}.`);
      return;
    }

    clearAllErrors();

    if (editingChildIndex >= 0) {
      const child = currentUser.children[editingChildIndex];
      if (!child) return;

      modalTitle.textContent = 'Edit Child';
      modalSub.textContent = `Update ${child.name}'s school transport information.`;
      btnSaveText.textContent = 'Save Changes';

      document.getElementById('input-child-name').value = child.name || '';
      document.getElementById('input-school-name').value = child.school || '';
      document.getElementById('input-grade').value = child.grade || '';
      document.getElementById('input-roll-number').value = child.rollNumber || '';
      document.getElementById('input-stop').value = child.stop || '';
      document.getElementById('input-emergency-name').value = child.emergencyContactName || '';
      document.getElementById('input-emergency-phone').value = child.emergencyContactPhone || '';
    } else {
      modalTitle.textContent = 'Add Child';
      modalSub.textContent = 'Enter your child\'s school transport information below.';
      btnSaveText.textContent = 'Save Child Profile';
      childForm.reset();
    }

    childFormModal.classList.add('active');
    childFormModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus first input
    setTimeout(() => {
      document.getElementById('input-child-name').focus();
    }, 300);
  }

  function closeChildModal() {
    childFormModal.classList.remove('active');
    childFormModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    editingChildIndex = -1;
    clearAllErrors();
    childForm.reset();
  }

  if (btnCloseChildModal) btnCloseChildModal.addEventListener('click', closeChildModal);
  if (btnCancelChildModal) btnCancelChildModal.addEventListener('click', closeChildModal);
  if (childFormModal) {
    childFormModal.addEventListener('click', (e) => {
      if (e.target === childFormModal) closeChildModal();
    });
  }

  /* ==========================================================================
     8. FORM VALIDATION & SUBMIT
     ========================================================================== */
  function showFieldError(inputId, errorId, message) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    if (input) input.classList.add('has-error');
    if (error) {
      error.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>${message}`;
      error.classList.add('visible');
    }
  }

  function clearFieldError(inputId, errorId) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    if (input) input.classList.remove('has-error');
    if (error) error.classList.remove('visible');
  }

  function clearAllErrors() {
    const fields = [
      ['input-child-name', 'error-child-name'],
      ['input-school-name', 'error-school-name'],
      ['input-grade', 'error-grade'],
      ['input-stop', 'error-stop'],
      ['input-emergency-phone', 'error-emergency-phone']
    ];
    fields.forEach(([inputId, errorId]) => clearFieldError(inputId, errorId));
  }

  // Inline validation on input
  ['input-child-name', 'input-school-name', 'input-grade', 'input-stop'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => {
        if (el.value.trim()) {
          clearFieldError(id, id.replace('input-', 'error-'));
        }
      });
    }
  });

  const phoneInput = document.getElementById('input-emergency-phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      if (!phoneInput.value.trim() || isValidPhone(phoneInput.value.trim())) {
        clearFieldError('input-emergency-phone', 'error-emergency-phone');
      }
    });
  }

  if (childForm) {
    childForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearAllErrors();

      const name = document.getElementById('input-child-name').value.trim();
      const school = document.getElementById('input-school-name').value.trim();
      const grade = document.getElementById('input-grade').value.trim();
      const rollNumber = document.getElementById('input-roll-number').value.trim();
      const stop = document.getElementById('input-stop').value.trim();
      const emergencyName = document.getElementById('input-emergency-name').value.trim();
      const emergencyPhone = document.getElementById('input-emergency-phone').value.trim();

      let hasErrors = false;

      if (!name) {
        showFieldError('input-child-name', 'error-child-name', 'Child name is required');
        hasErrors = true;
      } else if (name.length < 2) {
        showFieldError('input-child-name', 'error-child-name', 'Name must be at least 2 characters');
        hasErrors = true;
      }

      if (!school) {
        showFieldError('input-school-name', 'error-school-name', 'School name is required');
        hasErrors = true;
      }

      if (!grade) {
        showFieldError('input-grade', 'error-grade', 'Grade / Class is required');
        hasErrors = true;
      }

      if (!stop) {
        showFieldError('input-stop', 'error-stop', 'Pickup / Drop-off stop is required');
        hasErrors = true;
      }

      if (emergencyPhone && !isValidPhone(emergencyPhone)) {
        showFieldError('input-emergency-phone', 'error-emergency-phone', 'Enter a valid phone number (7-15 digits)');
        hasErrors = true;
      }

      if (hasErrors) return;

      const childData = {
        id: editingChildIndex >= 0 ? (currentUser.children[editingChildIndex].id || generateId()) : generateId(),
        name,
        school,
        grade,
        rollNumber,
        stop,
        emergencyContactName: emergencyName,
        emergencyContactPhone: emergencyPhone,
        status: 'Active'
      };

      if (editingChildIndex >= 0) {
        // Preserve existing bus/driver/stops data
        const existing = currentUser.children[editingChildIndex];
        childData.bus = existing.bus || null;
        childData.driver = existing.driver || null;
        childData.stops = existing.stops || [];
        childData.avatar = existing.avatar || null;
        currentUser.children[editingChildIndex] = childData;
        showToast(`${name}'s profile updated successfully.`);
      } else {
        currentUser.children.push(childData);
        showToast(`${name} added successfully! ${currentUser.children.length} of ${maxChildren} children registered.`);
      }

      persistUser();
      closeChildModal();
      renderAll();
    });
  }

  /* ==========================================================================
     9. REMOVE CHILD CONFIRMATION
     ========================================================================== */
  const removeModal = document.getElementById('remove-confirm-modal');
  const btnCancelRemove = document.getElementById('btn-cancel-remove');
  const btnConfirmRemove = document.getElementById('btn-confirm-remove');
  const removeMessage = document.getElementById('remove-confirm-message');

  let removingChildIndex = -1;

  function openRemoveConfirmation(index) {
    removingChildIndex = index;
    const child = currentUser.children[index];
    if (!child) return;

    removeMessage.textContent = `Are you sure you want to remove ${child.name}'s profile? This action cannot be undone.`;

    removeModal.classList.add('active');
    removeModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeRemoveConfirmation() {
    removeModal.classList.remove('active');
    removeModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    removingChildIndex = -1;
  }

  if (btnCancelRemove) btnCancelRemove.addEventListener('click', closeRemoveConfirmation);
  if (removeModal) {
    removeModal.addEventListener('click', (e) => {
      if (e.target === removeModal) closeRemoveConfirmation();
    });
  }

  if (btnConfirmRemove) {
    btnConfirmRemove.addEventListener('click', () => {
      if (removingChildIndex < 0 || removingChildIndex >= currentUser.children.length) return;
      const removedName = currentUser.children[removingChildIndex].name;
      currentUser.children.splice(removingChildIndex, 1);
      persistUser();
      closeRemoveConfirmation();
      renderAll();
      showToast(`${removedName}'s profile has been removed.`);
    });
  }

  /* ==========================================================================
     10. MASTER RENDER
     ========================================================================== */
  function renderAll() {
    renderCountSummary();
    renderChildrenCards();
  }

  renderAll();

  /* ==========================================================================
     11. KEYBOARD ESCAPE HANDLER
     ========================================================================== */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (childFormModal && childFormModal.classList.contains('active')) {
        closeChildModal();
      } else if (removeModal && removeModal.classList.contains('active')) {
        closeRemoveConfirmation();
      }
    }
  });

  /* ==========================================================================
     12. TOAST NOTIFICATION HELPER
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
