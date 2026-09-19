/**
 * SCHOOLROUTE — CORE JAVASCRIPT
 * Tagline: SAFE KIDS • STRONGER TOMORROWS
 * Vanilla JavaScript (No Frameworks or External Libraries)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     0. UNIFIED NAVIGATION CONTROLLER (Active State & Route Sync)
     ========================================================================== */
  function initUnifiedNavbar() {
    const rawPath = window.location.pathname.toLowerCase();
    const currentFile = rawPath.substring(rawPath.lastIndexOf('/') + 1) || 'index.html';

    const desktopLinks = document.querySelectorAll('.main-nav .nav-link');
    const drawerLinks = document.querySelectorAll('.drawer-nav .drawer-nav-link');

    function syncLinks(links) {
      links.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        const linkFile = href.toLowerCase().split('?')[0].split('#')[0];

        const isCurrent = (currentFile === '' || currentFile === 'index.html') 
          ? (linkFile === 'index.html') 
          : (currentFile === linkFile);

        if (isCurrent) {
          link.classList.add('active');
          if (link.classList.contains('nav-link')) {
            link.setAttribute('aria-current', 'page');
          }
        } else {
          link.classList.remove('active');
          link.removeAttribute('aria-current');
        }
      });
    }

    syncLinks(desktopLinks);
    syncLinks(drawerLinks);
  }

  initUnifiedNavbar();

  /* ==========================================================================
     1. THEME TOGGLE (LIGHT / DARK MODE)
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const THEME_STORAGE_KEY = 'schoolroute-theme';

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeToggleBtn.setAttribute('aria-label', 'Switch to light theme');
      themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      themeToggleBtn.setAttribute('aria-label', 'Switch to dark theme');
      themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
    }
  }

  // Read saved theme from localStorage or default to light
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'light';
  applyTheme(savedTheme);

  // Toggle Theme on Click
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  });

  /* ==========================================================================
     2. DIRECTION / HANDEDNESS TOGGLE (LTR / RTL)
     ========================================================================== */
  const dirToggleBtn = document.getElementById('direction-toggle');
  const DIR_STORAGE_KEY = 'schoolroute-direction';

  function applyDirection(dir) {
    if (dir === 'rtl') {
      document.documentElement.setAttribute('dir', 'rtl');
      dirToggleBtn.setAttribute('aria-label', 'Switch to LTR / Left-side Layout');
      dirToggleBtn.setAttribute('title', 'Switch to LTR / Left-side Layout');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      dirToggleBtn.setAttribute('aria-label', 'Switch to RTL / Right-side Layout');
      dirToggleBtn.setAttribute('title', 'Switch to RTL / Right-side Layout');
    }
  }

  // Read saved direction from localStorage or default to ltr
  const savedDir = localStorage.getItem(DIR_STORAGE_KEY) || 'ltr';
  applyDirection(savedDir);

  // Toggle Direction on Click
  dirToggleBtn.addEventListener('click', () => {
    const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
    const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
    applyDirection(newDir);
    localStorage.setItem(DIR_STORAGE_KEY, newDir);
  });

  /* ==========================================================================
     3. MOBILE NAVIGATION DRAWER
     ========================================================================== */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');
  const drawerLinks = document.querySelectorAll('.drawer-nav-link');

  function openDrawer() {
    mobileDrawer.classList.add('active');
    drawerBackdrop.classList.add('active');
    mobileMenuBtn.classList.add('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    drawerBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('active');
    drawerBackdrop.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    drawerBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      if (mobileDrawer.classList.contains('active')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer.classList.contains('active')) {
      closeDrawer();
    }
  });

  /* ==========================================================================
     4. HERO STATISTICS NUMBER COUNTER ANIMATION
     ========================================================================== */
  const statNumbers = document.querySelectorAll('.stat-number');
  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;
    countersAnimated = true;

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
  }

  // Observe Hero Section for counter triggering
  const heroStatsSection = document.querySelector('.hero-stats-grid');
  if (heroStatsSection && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    statsObserver.observe(heroStatsSection);
  } else {
    animateCounters();
  }

  /* ==========================================================================
     5. GLOBAL SCROLL REVEAL SYSTEM (IntersectionObserver)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale, .cta-banner, .how-steps-col');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  /* ==========================================================================
     6. TESTIMONIALS CAROUSEL
     ========================================================================== */
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const dotButtons = document.querySelectorAll('.dot-btn');
  const prevBtn = document.getElementById('prev-testimonial');
  const nextBtn = document.getElementById('next-testimonial');
  const carouselWrapper = document.getElementById('testimonial-carousel');

  let currentSlide = 0;
  const totalSlides = testimonialCards.length;
  let autoSlideTimer = null;
  const AUTO_SLIDE_INTERVAL = 5000;

  function showSlide(index) {
    if (index < 0) {
      currentSlide = totalSlides - 1;
    } else if (index >= totalSlides) {
      currentSlide = 0;
    } else {
      currentSlide = index;
    }

    testimonialCards.forEach((card, idx) => {
      if (idx === currentSlide) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    dotButtons.forEach((dot, idx) => {
      if (idx === currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlideTimer = setInterval(() => {
      showSlide(currentSlide + 1);
    }, AUTO_SLIDE_INTERVAL);
  }

  function stopAutoSlide() {
    if (autoSlideTimer) {
      clearInterval(autoSlideTimer);
      autoSlideTimer = null;
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
      showSlide(isRtl ? currentSlide + 1 : currentSlide - 1);
      startAutoSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
      showSlide(isRtl ? currentSlide - 1 : currentSlide + 1);
      startAutoSlide();
    });
  }

  dotButtons.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      showSlide(idx);
      startAutoSlide();
    });
  });

  if (carouselWrapper) {
    carouselWrapper.addEventListener('mouseenter', stopAutoSlide);
    carouselWrapper.addEventListener('mouseleave', startAutoSlide);

    let touchStartX = 0;
    let touchEndX = 0;

    carouselWrapper.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoSlide();
    }, { passive: true });

    carouselWrapper.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diffX = touchStartX - touchEndX;
      const isRtl = document.documentElement.getAttribute('dir') === 'rtl';

      if (Math.abs(diffX) > 40) {
        if (diffX > 0) {
          showSlide(isRtl ? currentSlide - 1 : currentSlide + 1);
        } else {
          showSlide(isRtl ? currentSlide + 1 : currentSlide - 1);
        }
      }
      startAutoSlide();
    }, { passive: true });
  }

  // Initialize Carousel
  showSlide(0);
  startAutoSlide();

  /* ==========================================================================
     7. STICKY NAVBAR SCROLL STATE & SCROLL-TO-TOP BUTTON
     ========================================================================== */
  const siteHeader = document.getElementById('site-header');
  const scrollToTopBtn = document.getElementById('scroll-to-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Header state after 35px scroll
    if (scrollY > 35) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }

    // Scroll to Top visibility
    if (scrollToTopBtn) {
      if (scrollY > 400) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    }
  }, { passive: true });

  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  console.log('SchoolRoute Home Page 1 refined animations initialized.');
});
