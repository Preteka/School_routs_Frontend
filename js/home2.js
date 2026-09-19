/**
 * SCHOOLROUTE — HOME PAGE 2 JAVASCRIPT
 * Product / SaaS Landing Interactions
 * Vanilla JavaScript (No Frameworks or External Libraries)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. WORKFLOW VIDEO / PRODUCT TOUR MODAL
     ========================================================================== */
  const watchVideoBtn = document.getElementById('watch-video-btn');
  const videoModal = document.getElementById('video-modal');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  function openModal() {
    if (videoModal) {
      videoModal.classList.add('active');
      videoModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (videoModal) {
      videoModal.classList.remove('active');
      videoModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (watchVideoBtn) watchVideoBtn.addEventListener('click', openModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal && videoModal.classList.contains('active')) {
      closeModal();
    }
  });

  /* ==========================================================================
     2. HOME 2 TESTIMONIALS CAROUSEL
     ========================================================================== */
  const testimonialCardsH2 = document.querySelectorAll('#testimonial-track-h2 .testimonial-card');
  const dotButtonsH2 = document.querySelectorAll('#carousel-dots-h2 .dot-btn');
  const prevBtnH2 = document.getElementById('prev-testimonial-h2');
  const nextBtnH2 = document.getElementById('next-testimonial-h2');
  const carouselWrapperH2 = document.getElementById('testimonial-carousel-h2');

  let currentSlideH2 = 0;
  const totalSlidesH2 = testimonialCardsH2.length;
  let autoSlideTimerH2 = null;
  const AUTO_SLIDE_INTERVAL = 5000;

  function showSlideH2(index) {
    if (index < 0) {
      currentSlideH2 = totalSlidesH2 - 1;
    } else if (index >= totalSlidesH2) {
      currentSlideH2 = 0;
    } else {
      currentSlideH2 = index;
    }

    testimonialCardsH2.forEach((card, idx) => {
      if (idx === currentSlideH2) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    dotButtonsH2.forEach((dot, idx) => {
      if (idx === currentSlideH2) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function startAutoSlideH2() {
    stopAutoSlideH2();
    autoSlideTimerH2 = setInterval(() => {
      showSlideH2(currentSlideH2 + 1);
    }, AUTO_SLIDE_INTERVAL);
  }

  function stopAutoSlideH2() {
    if (autoSlideTimerH2) {
      clearInterval(autoSlideTimerH2);
      autoSlideTimerH2 = null;
    }
  }

  if (prevBtnH2) {
    prevBtnH2.addEventListener('click', () => {
      const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
      showSlideH2(isRtl ? currentSlideH2 + 1 : currentSlideH2 - 1);
      startAutoSlideH2();
    });
  }

  if (nextBtnH2) {
    nextBtnH2.addEventListener('click', () => {
      const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
      showSlideH2(isRtl ? currentSlideH2 - 1 : currentSlideH2 + 1);
      startAutoSlideH2();
    });
  }

  dotButtonsH2.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      showSlideH2(idx);
      startAutoSlideH2();
    });
  });

  if (carouselWrapperH2) {
    carouselWrapperH2.addEventListener('mouseenter', stopAutoSlideH2);
    carouselWrapperH2.addEventListener('mouseleave', startAutoSlideH2);

    let touchStartX = 0;
    let touchEndX = 0;

    carouselWrapperH2.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoSlideH2();
    }, { passive: true });

    carouselWrapperH2.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diffX = touchStartX - touchEndX;
      const isRtl = document.documentElement.getAttribute('dir') === 'rtl';

      if (Math.abs(diffX) > 40) {
        if (diffX > 0) {
          showSlideH2(isRtl ? currentSlideH2 - 1 : currentSlideH2 + 1);
        } else {
          showSlideH2(isRtl ? currentSlideH2 + 1 : currentSlideH2 - 1);
        }
      }
      startAutoSlideH2();
    }, { passive: true });
  }

  // Initialize Home 2 Carousel
  if (totalSlidesH2 > 0) {
    showSlideH2(0);
    startAutoSlideH2();
  }

  console.log('SchoolRoute Home Page 2 initialized successfully.');
});
