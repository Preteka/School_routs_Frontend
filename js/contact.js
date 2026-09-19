/**
 * SCHOOLROUTE — CONTACT US JAVASCRIPT
 * Tagline: SAFE KIDS • STRONGER TOMORROWS
 *
 * Features:
 *   - Contact form validation (Name, Email, Phone, Subject, Message)
 *   - Accessible inline error messages
 *   - Form success state
 *   - FAQ accordion (single-open pattern)
 *   - IntersectionObserver scroll reveal
 *   - Vanilla JavaScript (No Frameworks)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. PAGE METADATA
     ========================================================================== */
  document.title = 'Contact Us | SchoolRoute — Safe Kids • Stronger Tomorrows';

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', 'Contact SchoolRoute to learn more about smarter, safer school transportation, subscriptions, tracking, and support.');
  }

  /* ==========================================================================
     2. SCROLL REVEAL — IntersectionObserver
     ========================================================================== */
  function initScrollReveal() {
    const revealSelector = '.reveal-up, .reveal-left, .reveal-right, .reveal-scale';
    const elements = document.querySelectorAll(revealSelector);
    if (!elements.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px'
      });

      elements.forEach(el => observer.observe(el));
    } else {
      // Fallback for very old browsers
      elements.forEach(el => el.classList.add('is-visible'));
    }
  }

  /* ==========================================================================
     3. CONTACT FORM VALIDATION & SUBMISSION
     ========================================================================== */
  const form = document.getElementById('contact-form-el');
  const submitBtn = document.getElementById('contact-submit-btn');
  const successState = document.getElementById('form-success-state');

  if (form) {
    /* -----------------------------------------------------------------------
       3a. Field References
    ----------------------------------------------------------------------- */
    const fields = {
      name:    { el: document.getElementById('contact-name'),    errEl: document.getElementById('error-name'),    group: document.getElementById('group-name') },
      email:   { el: document.getElementById('contact-email'),   errEl: document.getElementById('error-email'),   group: document.getElementById('group-email') },
      phone:   { el: document.getElementById('contact-phone'),   errEl: document.getElementById('error-phone'),   group: document.getElementById('group-phone') },
      subject: { el: document.getElementById('contact-subject'), errEl: document.getElementById('error-subject'), group: document.getElementById('group-subject') },
      message: { el: document.getElementById('contact-message'), errEl: document.getElementById('error-message'), group: document.getElementById('group-message') }
    };

    /* -----------------------------------------------------------------------
       3b. Validation Rules
    ----------------------------------------------------------------------- */
    const validators = {
      name(val) {
        if (!val.trim()) return 'Please enter your full name.';
        if (val.trim().length < 2) return 'Name must be at least 2 characters.';
        return '';
      },
      email(val) {
        if (!val.trim()) return 'Please enter your email address.';
        // RFC-simplified email regex
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailRe.test(val.trim())) return 'Please enter a valid email address.';
        return '';
      },
      phone(val) {
        if (!val.trim()) return 'Please enter your phone number.';
        // Accept digits, spaces, +, -, (), min 7 chars
        const phoneRe = /^[\d\s\+\-\(\)]{7,20}$/;
        if (!phoneRe.test(val.trim())) return 'Please enter a valid phone number.';
        return '';
      },
      subject(val) {
        if (!val.trim()) return 'Please enter a subject for your enquiry.';
        if (val.trim().length < 3) return 'Subject must be at least 3 characters.';
        return '';
      },
      message(val) {
        if (!val.trim()) return 'Please enter your message.';
        if (val.trim().length < 15) return 'Message must be at least 15 characters.';
        return '';
      }
    };

    /* -----------------------------------------------------------------------
       3c. Show / Clear Error Helper
    ----------------------------------------------------------------------- */
    function showError(fieldKey, message) {
      const { el, errEl, group } = fields[fieldKey];
      if (!el || !errEl) return;

      el.classList.add('input-error');
      el.setAttribute('aria-invalid', 'true');
      errEl.textContent = message;
      errEl.classList.add('show');

      if (group) group.setAttribute('data-error', 'true');
    }

    function clearError(fieldKey) {
      const { el, errEl, group } = fields[fieldKey];
      if (!el || !errEl) return;

      el.classList.remove('input-error');
      el.removeAttribute('aria-invalid');
      errEl.textContent = '';
      errEl.classList.remove('show');

      if (group) group.removeAttribute('data-error');
    }

    function clearAllErrors() {
      Object.keys(fields).forEach(key => clearError(key));
    }

    /* -----------------------------------------------------------------------
       3d. Live Validation on Blur (individual fields)
    ----------------------------------------------------------------------- */
    Object.keys(fields).forEach(key => {
      const { el } = fields[key];
      if (!el) return;

      el.addEventListener('blur', () => {
        const error = validators[key](el.value);
        if (error) {
          showError(key, error);
        } else {
          clearError(key);
        }
      });

      // Clear error on input after it was shown
      el.addEventListener('input', () => {
        if (el.classList.contains('input-error')) {
          const error = validators[key](el.value);
          if (!error) clearError(key);
        }
      });
    });

    /* -----------------------------------------------------------------------
       3e. Form Submit Handler
    ----------------------------------------------------------------------- */
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Validate all fields
      let hasError = false;
      let firstErrorEl = null;

      Object.keys(validators).forEach(key => {
        const { el } = fields[key];
        if (!el) return;

        const error = validators[key](el.value);
        if (error) {
          showError(key, error);
          hasError = true;
          if (!firstErrorEl) firstErrorEl = el;
        } else {
          clearError(key);
        }
      });

      // If validation failed, focus first error field
      if (hasError) {
        if (firstErrorEl) {
          firstErrorEl.focus();
          firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      // ---- All valid — show loading state ----
      if (submitBtn) {
        submitBtn.classList.add('is-loading');
        const btnSpan = submitBtn.querySelector('span');
        if (btnSpan) btnSpan.textContent = 'Sending...';
        submitBtn.setAttribute('disabled', 'true');
      }

      // Simulate async processing (replace with real fetch/API call when backend is connected)
      setTimeout(() => {
        // Reset button
        if (submitBtn) {
          submitBtn.classList.remove('is-loading');
          submitBtn.removeAttribute('disabled');
          const btnSpan = submitBtn.querySelector('span');
          if (btnSpan) btnSpan.textContent = 'Send Message';
        }

        // Hide form fields, show success state
        const formInputArea = form.querySelectorAll('.form-row, .form-group-full, .form-submit-row');
        formInputArea.forEach(el => { el.style.display = 'none'; });

        if (successState) {
          successState.style.display = 'flex';
          successState.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // Reset form values
        form.reset();
        clearAllErrors();

      }, 900);
    });
  }

  /* ==========================================================================
     4. FAQ ACCORDION
     Single-open accordion — only one panel open at a time
     ========================================================================== */
  function initFaqAccordion() {
    const accordion = document.getElementById('contact-faq-accordion');
    if (!accordion) return;

    const triggers = accordion.querySelectorAll('.faq-trigger');

    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const panelId = trigger.getAttribute('aria-controls');
        const panel = document.getElementById(panelId);
        const faqItem = trigger.closest('.faq-item');

        if (!panel || !faqItem) return;

        const isCurrentlyOpen = trigger.getAttribute('aria-expanded') === 'true';

        // Close ALL items first
        triggers.forEach(otherTrigger => {
          const otherPanelId = otherTrigger.getAttribute('aria-controls');
          const otherPanel = document.getElementById(otherPanelId);
          const otherItem = otherTrigger.closest('.faq-item');

          if (otherTrigger !== trigger) {
            otherTrigger.setAttribute('aria-expanded', 'false');
            if (otherPanel) otherPanel.classList.remove('is-open');
            if (otherItem) otherItem.classList.remove('is-open');
          }
        });

        // Toggle the clicked item
        if (isCurrentlyOpen) {
          trigger.setAttribute('aria-expanded', 'false');
          panel.classList.remove('is-open');
          faqItem.classList.remove('is-open');
        } else {
          trigger.setAttribute('aria-expanded', 'true');
          panel.classList.add('is-open');
          faqItem.classList.add('is-open');
        }
      });

      // Keyboard support — Space / Enter
      trigger.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          trigger.click();
        }
      });
    });
  }

  /* ==========================================================================
     5. INITIALISE ALL
     ========================================================================== */
  initScrollReveal();
  initFaqAccordion();

});
