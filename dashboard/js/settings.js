/**
 * ==========================================================================
 * SCHOOLROUTE — SETTINGS & PREFERENCES CONTROLLER
 * Tagline: SAFE KIDS • STRONGER TOMORROWS
 * Vanilla JavaScript (User-Specific Real Data, Zero Fake Placeholders)
 * ==========================================================================
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. AUTHENTICATION & USER SESSION VALIDATION
     ========================================================================== */
  const LS_USERS_KEY = 'schoolroute_users';
  const LS_CURRENT_USER = 'schoolroute_current_user';
  const LS_THEME_KEY = 'schoolroute_theme';
  const LS_DIR_KEY = 'schoolroute_direction';

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
     2. HELPERS
     ========================================================================== */
  function getInitials(fullName) {
    if (!fullName) return 'PT';
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
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

  /* ==========================================================================
     3. DOM ELEMENTS
     ========================================================================== */
  // Account Profile
  const settDisplayName = document.getElementById('sett-display-name');
  const settFieldName = document.getElementById('sett-field-name');
  const settFieldEmail = document.getElementById('sett-field-email');
  const settFieldPhone = document.getElementById('sett-field-phone');
  const settingsAvatarCircle = document.getElementById('settings-avatar-circle');

  // Edit Profile Modal
  const editProfileModal = document.getElementById('edit-profile-modal');
  const btnOpenEditProfile = document.getElementById('btn-open-edit-profile');
  const btnCloseEditProfile = document.getElementById('btn-close-edit-profile');
  const btnCancelEditProfile = document.getElementById('btn-cancel-edit-profile');
  const formEditProfile = document.getElementById('form-edit-profile');
  const editName = document.getElementById('edit-name');
  const editEmail = document.getElementById('edit-email');
  const editPhone = document.getElementById('edit-phone');

  // Notification Toggles
  const prefArrival = document.getElementById('pref-arrival');
  const prefJourney = document.getElementById('pref-journey');
  const prefSafety = document.getElementById('pref-safety');
  const prefPayment = document.getElementById('pref-payment');
  const prefGeneral = document.getElementById('pref-general');

  // Theme & Direction Cards
  const themeCardLight = document.getElementById('theme-card-light');
  const themeCardDark = document.getElementById('theme-card-dark');
  const dirCardLtr = document.getElementById('dir-card-ltr');
  const dirCardRtl = document.getElementById('dir-card-rtl');

  // Security & Password Form
  const formChangePassword = document.getElementById('form-change-password');
  const pwdCurrent = document.getElementById('pwd-current');
  const pwdNew = document.getElementById('pwd-new');
  const pwdConfirm = document.getElementById('pwd-confirm');

  // Danger Zone
  const btnDangerLogout = document.getElementById('btn-danger-logout');
  const btnDangerDelete = document.getElementById('btn-danger-delete');
  const deleteConfirmModal = document.getElementById('delete-confirm-modal');
  const btnCloseDeleteModal = document.getElementById('btn-close-delete-modal');
  const btnCancelDelete = document.getElementById('btn-cancel-delete');
  const btnConfirmDelete = document.getElementById('btn-confirm-delete');

  /* ==========================================================================
     4. RENDER ACCOUNT PROFILE
     ========================================================================== */
  function renderProfile() {
    const name = currentUser.name || 'Parent Name';
    const email = currentUser.email || 'parent@example.com';
    const phone = currentUser.phone ? currentUser.phone.trim() : 'Not added yet';

    if (settDisplayName) settDisplayName.textContent = name;
    if (settFieldName) settFieldName.textContent = name;
    if (settFieldEmail) settFieldEmail.textContent = email;
    if (settFieldPhone) settFieldPhone.textContent = phone;

    if (settingsAvatarCircle) {
      settingsAvatarCircle.textContent = getInitials(name);
    }
  }

  renderProfile();

  /* ==========================================================================
     5. EDIT PROFILE MODAL
     ========================================================================== */
  function openEditModal() {
    if (!editProfileModal) return;
    if (editName) editName.value = currentUser.name || '';
    if (editEmail) editEmail.value = currentUser.email || '';
    if (editPhone) editPhone.value = currentUser.phone || '';

    editProfileModal.classList.add('active');
    editProfileModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeEditModal() {
    if (!editProfileModal) return;
    editProfileModal.classList.remove('active');
    editProfileModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (btnOpenEditProfile) btnOpenEditProfile.addEventListener('click', openEditModal);
  if (btnCloseEditProfile) btnCloseEditProfile.addEventListener('click', closeEditModal);
  if (btnCancelEditProfile) btnCancelEditProfile.addEventListener('click', closeEditModal);

  if (formEditProfile) {
    formEditProfile.addEventListener('submit', (e) => {
      e.preventDefault();
      const newName = editName ? editName.value.trim() : '';
      const newEmail = editEmail ? editEmail.value.trim() : '';
      const newPhone = editPhone ? editPhone.value.trim() : '';

      if (!newName || !newEmail) {
        showToast('Name and Email are required.');
        return;
      }

      currentUser.name = newName;
      currentUser.email = newEmail;
      currentUser.phone = newPhone;

      persistUser();
      renderProfile();
      closeEditModal();
      showToast('Profile updated successfully.');

      // Update header greeting
      const headerName = document.getElementById('header-parent-name');
      const userDisplayName = document.getElementById('user-display-name');
      const dropdownFullName = document.getElementById('dropdown-full-name');
      const dropdownEmail = document.getElementById('dropdown-email');
      const userInitials = document.getElementById('user-avatar-initials');

      if (headerName) headerName.textContent = newName;
      if (userDisplayName) userDisplayName.textContent = newName;
      if (dropdownFullName) dropdownFullName.textContent = newName;
      if (dropdownEmail) dropdownEmail.textContent = newEmail;
      if (userInitials) userInitials.textContent = getInitials(newName);
    });
  }

  /* ==========================================================================
     6. NOTIFICATION PREFERENCES
     ========================================================================== */
  const prefs = currentUser.notificationPreferences || {
    arrival: true,
    journey: true,
    safety: true,
    payment: true,
    general: false
  };

  if (prefArrival) prefArrival.checked = prefs.arrival !== false;
  if (prefJourney) prefJourney.checked = prefs.journey !== false;
  if (prefSafety) prefSafety.checked = prefs.safety !== false;
  if (prefPayment) prefPayment.checked = prefs.payment !== false;
  if (prefGeneral) prefGeneral.checked = Boolean(prefs.general);

  function saveNotifPrefs() {
    currentUser.notificationPreferences = {
      arrival: prefArrival ? prefArrival.checked : true,
      journey: prefJourney ? prefJourney.checked : true,
      safety: prefSafety ? prefSafety.checked : true,
      payment: prefPayment ? prefPayment.checked : true,
      general: prefGeneral ? prefGeneral.checked : false
    };
    persistUser();
    showToast('Notification preferences saved.');
  }

  [prefArrival, prefJourney, prefSafety, prefPayment, prefGeneral].forEach(toggle => {
    if (toggle) toggle.addEventListener('change', saveNotifPrefs);
  });

  /* ==========================================================================
     7. THEME & ORIENTATION SELECTION
     ========================================================================== */
  function updateThemeCards() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    if (themeCardLight) themeCardLight.classList.toggle('active', currentTheme === 'light');
    if (themeCardDark) themeCardDark.classList.toggle('active', currentTheme === 'dark');
  }

  function updateDirCards() {
    const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
    if (dirCardLtr) dirCardLtr.classList.toggle('active', currentDir === 'ltr');
    if (dirCardRtl) dirCardRtl.classList.toggle('active', currentDir === 'rtl');
  }

  updateThemeCards();
  updateDirCards();

  if (themeCardLight) {
    themeCardLight.addEventListener('click', () => {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem(LS_THEME_KEY, 'light');
      updateThemeCards();
      showToast('Light theme applied.');
    });
  }

  if (themeCardDark) {
    themeCardDark.addEventListener('click', () => {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem(LS_THEME_KEY, 'dark');
      updateThemeCards();
      showToast('Dark theme applied.');
    });
  }

  if (dirCardLtr) {
    dirCardLtr.addEventListener('click', () => {
      document.documentElement.setAttribute('dir', 'ltr');
      localStorage.setItem(LS_DIR_KEY, 'ltr');
      updateDirCards();
      showToast('Left-to-Right layout applied.');
    });
  }

  if (dirCardRtl) {
    dirCardRtl.addEventListener('click', () => {
      document.documentElement.setAttribute('dir', 'rtl');
      localStorage.setItem(LS_DIR_KEY, 'rtl');
      updateDirCards();
      showToast('Right-to-Left layout applied.');
    });
  }

    /* ==========================================================================
     8. PASSWORD RESET FORM & EYE TOGGLE FUNCTIONALITY
     ========================================================================== */
  // Eye Toggle Show/Hide Password
  const eyeButtons = document.querySelectorAll('.btn-toggle-password');
  eyeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (!input) return;

      const eyeOpen = btn.querySelector('.eye-open');
      const eyeClosed = btn.querySelector('.eye-closed');

      if (input.type === 'password') {
        input.type = 'text';
        btn.setAttribute('aria-label', 'Hide password');
        if (eyeOpen) eyeOpen.style.display = 'none';
        if (eyeClosed) eyeClosed.style.display = 'block';
      } else {
        input.type = 'password';
        btn.setAttribute('aria-label', 'Show password');
        if (eyeOpen) eyeOpen.style.display = 'block';
        if (eyeClosed) eyeClosed.style.display = 'none';
      }
    });
  });

  function clearValidationErrors() {
    ['pwd-current', 'pwd-new', 'pwd-confirm'].forEach(id => {
      const input = document.getElementById(id);
      const msg = document.getElementById('msg-' + id);
      if (input) input.classList.remove('has-error');
      if (msg) {
        msg.textContent = '';
        msg.classList.remove('visible');
      }
    });
  }

  function setFieldError(fieldId, errorText) {
    const input = document.getElementById(fieldId);
    const msg = document.getElementById('msg-' + fieldId);
    if (input) input.classList.add('has-error');
    if (msg) {
      msg.textContent = errorText;
      msg.classList.add('visible');
    }
  }

  ['pwd-current', 'pwd-new', 'pwd-confirm'].forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      input.addEventListener('input', () => {
        input.classList.remove('has-error');
        const msg = document.getElementById('msg-' + id);
        if (msg) {
          msg.textContent = '';
          msg.classList.remove('visible');
        }
      });
    }
  });

  const pwdSuccessMsg = document.getElementById('pwd-success-msg');
  let successMsgTimer = null;

  if (formChangePassword) {
    formChangePassword.addEventListener('submit', (e) => {
      e.preventDefault();
      clearValidationErrors();
      if (pwdSuccessMsg) pwdSuccessMsg.classList.remove('visible');

      const curr = pwdCurrent ? pwdCurrent.value.trim() : '';
      const nxt = pwdNew ? pwdNew.value : '';
      const conf = pwdConfirm ? pwdConfirm.value : '';

      let hasError = false;

      if (!curr) {
        setFieldError('pwd-current', 'Current password is required.');
        hasError = true;
      }

      if (!nxt) {
        setFieldError('pwd-new', 'New password is required.');
        hasError = true;
      } else if (nxt.length < 6) {
        setFieldError('pwd-new', 'Password must be at least 6 characters.');
        hasError = true;
      }

      if (!conf) {
        setFieldError('pwd-confirm', 'Please confirm your new password.');
        hasError = true;
      } else if (nxt && conf && nxt !== conf) {
        setFieldError('pwd-confirm', 'New password and confirm password must match.');
        hasError = true;
      }

      if (hasError) return;

      // Check current password against saved session password if available
      if (currentUser.password && currentUser.password !== curr) {
        setFieldError('pwd-current', 'Current password is incorrect.');
        return;
      }

      // Update password
      currentUser.password = nxt;
      persistUser();

      // Reset form fields
      if (pwdCurrent) pwdCurrent.value = '';
      if (pwdNew) pwdNew.value = '';
      if (pwdConfirm) pwdConfirm.value = '';

      // Reset any active eye toggles back to hidden
      eyeButtons.forEach(btn => {
        const targetId = btn.getAttribute('data-target');
        const input = document.getElementById(targetId);
        if (input) input.type = 'password';
        btn.setAttribute('aria-label', 'Show password');
        const eyeOpen = btn.querySelector('.eye-open');
        const eyeClosed = btn.querySelector('.eye-closed');
        if (eyeOpen) eyeOpen.style.display = 'block';
        if (eyeClosed) eyeClosed.style.display = 'none';
      });

      // Show inline success message
      if (pwdSuccessMsg) {
        pwdSuccessMsg.classList.add('visible');
        if (successMsgTimer) clearTimeout(successMsgTimer);
        successMsgTimer = setTimeout(() => {
          pwdSuccessMsg.classList.remove('visible');
        }, 5000);
      }

      showToast('Password updated successfully.');
    });
  }

/* ==========================================================================
     9. DANGER ZONE: LOGOUT & DELETE ACCOUNT
     ========================================================================== */
  function handleLogout() {
    localStorage.removeItem(LS_CURRENT_USER);
    window.location.href = '../login.html';
  }

  if (btnDangerLogout) btnDangerLogout.addEventListener('click', handleLogout);

  function openDeleteModal() {
    if (!deleteConfirmModal) return;
    deleteConfirmModal.classList.add('active');
    deleteConfirmModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeDeleteModal() {
    if (!deleteConfirmModal) return;
    deleteConfirmModal.classList.remove('active');
    deleteConfirmModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (btnDangerDelete) btnDangerDelete.addEventListener('click', openDeleteModal);
  if (btnCloseDeleteModal) btnCloseDeleteModal.addEventListener('click', closeDeleteModal);
  if (btnCancelDelete) btnCancelDelete.addEventListener('click', closeDeleteModal);

  if (btnConfirmDelete) {
    btnConfirmDelete.addEventListener('click', () => {
      try {
        const rawUsers = localStorage.getItem(LS_USERS_KEY);
        if (rawUsers) {
          let allUsers = JSON.parse(rawUsers);
          if (Array.isArray(allUsers)) {
            allUsers = allUsers.filter(u =>
              (currentUser.id && u.id !== currentUser.id) &&
              (currentUser.email && u.email && u.email.toLowerCase() !== currentUser.email.toLowerCase())
            );
            localStorage.setItem(LS_USERS_KEY, JSON.stringify(allUsers));
          }
        }
      } catch (err) {
        console.warn('Failed to delete user:', err);
      }

      localStorage.removeItem(LS_CURRENT_USER);
      window.location.href = '../login.html';
    });
  }

  /* ==========================================================================
     10. KEYBOARD ESCAPE HANDLER
     ========================================================================== */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (editProfileModal && editProfileModal.classList.contains('active')) closeEditModal();
      if (deleteConfirmModal && deleteConfirmModal.classList.contains('active')) closeDeleteModal();
    }
  });

  /* ==========================================================================
     11. TOAST NOTIFICATION HELPER
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
