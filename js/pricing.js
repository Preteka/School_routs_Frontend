/**
 * SCHOOLROUTE — PRICING PAGE JAVASCRIPT
 * Handles FAQ single-expand accordion, scroll reveal animations, and plan selections
 */

document.addEventListener('DOMContentLoaded', () => {
  initPricingFaq();
  initPricingScrollReveal();
});

/**
 * 1. PRICING FAQ ACCORDION (Single Expand, Accessible)
 */
function initPricingFaq() {
  const accordion = document.getElementById('pricing-faq-accordion');
  if (!accordion) return;

  const faqItems = accordion.querySelectorAll('.pfaq-item');

  faqItems.forEach((item) => {
    const trigger = item.querySelector('.pfaq-trigger');
    const answer = item.querySelector('.pfaq-answer');

    if (!trigger || !answer) return;

    trigger.addEventListener('click', () => {
      const isCurrentlyActive = item.classList.contains('active');

      // Close all other FAQ items (single-open accordion behavior)
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          const otherTrigger = otherItem.querySelector('.pfaq-trigger');
          const otherAnswer = otherItem.querySelector('.pfaq-answer');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          if (otherAnswer) otherAnswer.style.maxHeight = '0';
        }
      });

      // Toggle clicked item
      if (isCurrentlyActive) {
        item.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = '0';
      } else {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 30 + 'px';
      }
    });

    // Initialize initial heights
    if (item.classList.contains('active')) {
      trigger.setAttribute('aria-expanded', 'true');
      answer.style.maxHeight = answer.scrollHeight + 30 + 'px';
    } else {
      trigger.setAttribute('aria-expanded', 'false');
      answer.style.maxHeight = '0';
    }
  });

  // Recalculate heights on window resize
  window.addEventListener('resize', () => {
    const activeItem = accordion.querySelector('.pfaq-item.active');
    if (activeItem) {
      const answer = activeItem.querySelector('.pfaq-answer');
      if (answer) {
        answer.style.maxHeight = answer.scrollHeight + 30 + 'px';
      }
    }
  });
}

/**
 * 2. INTERSECTION OBSERVER SCROLL REVEAL ANIMATIONS
 */
function initPricingScrollReveal() {
  const revealElements = document.querySelectorAll('.fade-in-up');
  if (!revealElements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.getAttribute('data-delay') || 0;
          el.style.setProperty('--anim-delay', `${delay}ms`);
          el.classList.add('is-visible');
          obs.unobserve(el);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach((el) => observer.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }
}
