/**
 * SCHOOLROUTE — ABOUT US JAVASCRIPT
 * Tagline: SAFE KIDS • STRONGER TOMORROWS
 * Vanilla JavaScript for About Page Interactive Features
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. ABOUT US TESTIMONIALS CAROUSEL
     ========================================================================== */
  const aboutCarouselWrapper = document.getElementById('testimonial-carousel-about');
  const aboutCards = aboutCarouselWrapper ? aboutCarouselWrapper.querySelectorAll('.testimonial-card') : [];
  const aboutDots = document.querySelectorAll('#carousel-dots-about .dot-btn');
  const aboutPrevBtn = document.getElementById('prev-testimonial-about');
  const aboutNextBtn = document.getElementById('next-testimonial-about');

  let currentAboutSlide = 0;
  const totalAboutSlides = aboutCards.length;
  let aboutAutoSlideTimer = null;
  const AUTO_SLIDE_INTERVAL = 5000;

  function showAboutSlide(index) {
    if (totalAboutSlides === 0) return;

    if (index < 0) {
      currentAboutSlide = totalAboutSlides - 1;
    } else if (index >= totalAboutSlides) {
      currentAboutSlide = 0;
    } else {
      currentAboutSlide = index;
    }

    aboutCards.forEach((card, idx) => {
      if (idx === currentAboutSlide) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    aboutDots.forEach((dot, idx) => {
      if (idx === currentAboutSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function startAboutAutoSlide() {
    stopAboutAutoSlide();
    aboutAutoSlideTimer = setInterval(() => {
      showAboutSlide(currentAboutSlide + 1);
    }, AUTO_SLIDE_INTERVAL);
  }

  function stopAboutAutoSlide() {
    if (aboutAutoSlideTimer) {
      clearInterval(aboutAutoSlideTimer);
      aboutAutoSlideTimer = null;
    }
  }

  if (aboutPrevBtn) {
    aboutPrevBtn.addEventListener('click', () => {
      const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
      showAboutSlide(isRtl ? currentAboutSlide + 1 : currentAboutSlide - 1);
      startAboutAutoSlide();
    });
  }

  if (aboutNextBtn) {
    aboutNextBtn.addEventListener('click', () => {
      const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
      showAboutSlide(isRtl ? currentAboutSlide - 1 : currentAboutSlide + 1);
      startAboutAutoSlide();
    });
  }

  aboutDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      showAboutSlide(idx);
      startAboutAutoSlide();
    });
  });

  if (aboutCarouselWrapper) {
    aboutCarouselWrapper.addEventListener('mouseenter', stopAboutAutoSlide);
    aboutCarouselWrapper.addEventListener('mouseleave', startAboutAutoSlide);

    let touchStartX = 0;
    let touchEndX = 0;

    aboutCarouselWrapper.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAboutAutoSlide();
    }, { passive: true });

    aboutCarouselWrapper.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diffX = touchStartX - touchEndX;
      const isRtl = document.documentElement.getAttribute('dir') === 'rtl';

      if (Math.abs(diffX) > 40) {
        if (diffX > 0) {
          showAboutSlide(isRtl ? currentAboutSlide - 1 : currentAboutSlide + 1);
        } else {
          showAboutSlide(isRtl ? currentAboutSlide + 1 : currentAboutSlide - 1);
        }
      }
      startAboutAutoSlide();
    }, { passive: true });

    // Initial setup
    showAboutSlide(0);
    startAboutAutoSlide();
  }

  /* ==========================================================================
     2. TRUST STATISTICS NUMBER COUNTER FOR ABOUT PAGE
     ========================================================================== */
  const trustStatsBox = document.querySelector('.trust-stats-box');
  if (trustStatsBox && 'IntersectionObserver' in window) {
    let statsDone = false;
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsDone) {
          statsDone = true;
          const statNumbers = trustStatsBox.querySelectorAll('.stat-number');
          statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'), 10);
            const suffix = stat.getAttribute('data-suffix') || '';
            const duration = 1400; // ms
            const startTime = performance.now();

            function updateCounter(currentTime) {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easeOut = 1 - Math.pow(1 - progress, 3);
              const currentVal = Math.floor(easeOut * target);

              stat.textContent = currentVal + suffix;

              if (progress < 1) {
                requestAnimationFrame(updateCounter);
              } else {
                stat.textContent = target + suffix;
              }
            }

            requestAnimationFrame(updateCounter);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    statsObserver.observe(trustStatsBox);
  }

  /* ==========================================================================
     3. TIMELINE INTERSECTION TRIGGER
     ========================================================================== */
  const timelineSection = document.getElementById('our-journey');
  if (timelineSection && 'IntersectionObserver' in window) {
    const timelineObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    timelineObserver.observe(timelineSection);
  }

  console.log('SchoolRoute About Us page scripts initialized.');
});
