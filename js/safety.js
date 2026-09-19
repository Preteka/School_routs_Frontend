/**
 * SCHOOLROUTE — SAFETY PAGE JAVASCRIPT
 * Tagline: SAFE KIDS • STRONGER TOMORROWS
 * Vanilla JavaScript implementation for Safety Features, FAQ Accordion & Timeline Reveals
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. FAQ ACCORDION CONTROLLER (Single-Open with Smooth Height Transition)
     ========================================================================== */
  const faqItems = document.querySelectorAll('.faq-accordion .faq-item');

  function updateFaqItem(item, expand) {
    const trigger = item.querySelector('.faq-trigger');
    const answer = item.querySelector('.faq-answer');
    if (!trigger || !answer) return;

    if (expand) {
      item.classList.add('active');
      trigger.setAttribute('aria-expanded', 'true');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    } else {
      item.classList.remove('active');
      trigger.setAttribute('aria-expanded', 'false');
      answer.style.maxHeight = '0px';
    }
  }

  // Initialize initial active item
  faqItems.forEach(item => {
    const answer = item.querySelector('.faq-answer');
    if (!answer) return;

    if (item.classList.contains('active')) {
      answer.style.maxHeight = answer.scrollHeight + 'px';
    } else {
      answer.style.maxHeight = '0px';
    }

    const trigger = item.querySelector('.faq-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isCurrentlyActive = item.classList.contains('active');

        // Close all other open FAQ items
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            updateFaqItem(otherItem, false);
          }
        });

        // Toggle clicked item
        updateFaqItem(item, !isCurrentlyActive);
      });
    }
  });

  // Recalculate heights on window resize
  window.addEventListener('resize', () => {
    faqItems.forEach(item => {
      if (item.classList.contains('active')) {
        const answer = item.querySelector('.faq-answer');
        if (answer) {
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      }
    });
  });

  /* ==========================================================================
     2. SCROLL REVEAL / INTERSECTION OBSERVER (Staggered Animation Triggers)
     ========================================================================== */
  const animatedElements = document.querySelectorAll('.fade-in-up, .timeline-step-item, .checklist-card, .student-card');

  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.getAttribute('data-delay') || '0';
          setTimeout(() => {
            el.classList.add('revealed');
          }, parseInt(delay, 10));
          observer.unobserve(el);
        }
      });
    }, observerOptions);

    animatedElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    animatedElements.forEach(el => el.classList.add('revealed'));
  }

  /* ==========================================================================
     3. SMOOTH ANCHOR SCROLLING (Hero CTA -> Section)
     ========================================================================== */
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

  smoothScrollLinks.forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId !== '#' && targetId.length > 1) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
});
