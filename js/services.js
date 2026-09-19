/**
 * SCHOOLROUTE — SERVICES / PRODUCTS JAVASCRIPT
 * Tagline: SAFE KIDS • STRONGER TOMORROWS
 * Dynamic Services Catalog, Real-Time Search & Category Filtering
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. ENRICHED SERVICES DATA STRUCTURE
     ========================================================================== */
  const servicesData = [
    {
      id: 'tracking',
      title: 'Real-Time Bus Tracking',
      category: 'Tracking',
      status: 'Live GPS',
      description: 'Track the assigned school bus live on a map during pickup and drop-off with pinpoint GPS accuracy and speed indicators.',
      link: 'service-detail.html?id=tracking',
      keywords: ['tracking', 'gps', 'live', 'map', 'bus', 'location', 'realtime', 'pickup', 'drop'],
      features: [
        'Live map feed with 15s refresh',
        'Accurate ETA and route progress',
        'Speed monitoring & delay notices'
      ],
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>`
    },
    {
      id: 'routes',
      title: 'Route Management',
      category: 'Route Management',
      status: 'Optimized',
      description: 'View designated school routes, pickup zones, stops and schedules with complete transit clarity and optimization.',
      link: 'service-detail.html?id=routes',
      keywords: ['route', 'routes', 'management', 'stops', 'zones', 'schedule', 'timing', 'pickup', 'stations'],
      features: [
        'Interactive stop & zone directory',
        'Morning & evening route schedules',
        'Safe student pickup allocation'
      ],
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="6" cy="19" r="3"></circle>
        <path d="M9 19h8.5a4.5 4.5 0 0 0 0-9H7a4.5 4.5 0 0 1 0-9H18"></path>
        <circle cx="18" cy="5" r="3"></circle>
      </svg>`
    },
    {
      id: 'student-monitoring',
      title: 'Student Monitoring',
      category: 'Student Safety',
      status: 'RFID Verified',
      description: 'View daily boarding and alighting confirmation records for your child with secure automated check-in technology.',
      link: 'service-detail.html?id=student-monitoring',
      keywords: ['student', 'safety', 'monitoring', 'boarding', 'alighting', 'attendance', 'child', 'rfid'],
      features: [
        'Instant boarding confirmation timestamp',
        'Parent push notification on step-in',
        'Digital roll-call for transport staff'
      ],
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>`
    },
    {
      id: 'notifications',
      title: 'Arrival Notifications',
      category: 'Notifications',
      status: 'Instant Alert',
      description: 'Receive timely proactive alerts when the bus approaches your child\'s pickup or drop-off point via SMS and app alerts.',
      link: 'service-detail.html?id=notifications',
      keywords: ['notifications', 'alerts', 'arrival', 'bell', 'proximity', 'sms', 'eta', 'notice'],
      features: [
        'Configurable 5-10 min distance alerts',
        'Traffic bottleneck delay warnings',
        'Multi-parent broadcast support'
      ],
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
      </svg>`
    },
    {
      id: 'safety',
      title: 'Safety & Driver Verification',
      category: 'Student Safety',
      status: 'Verified',
      description: 'Background-verified drivers, regulated transit protocols and speed monitoring strictly designed around child safety.',
      link: 'service-detail.html?id=safety',
      keywords: ['safety', 'driver', 'verification', 'background', 'checks', 'procedures', 'security', 'wellbeing'],
      features: [
        'Police and identity verified staff',
        'Vehicle fitness & speed compliance',
        'Emergency SOS panic button support'
      ],
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        <polyline points="9 12 11 14 15 10"></polyline>
      </svg>`
    },
    {
      id: 'payments',
      title: 'Subscription & Payments',
      category: 'Payments',
      status: 'Secure 256-bit',
      description: 'Manage flexible transportation plans, complete online fee payments securely and download digital tax receipts easily.',
      link: 'service-detail.html?id=payments',
      keywords: ['payments', 'subscription', 'fees', 'plans', 'billing', 'receipts', 'online', 'portal', 'finance'],
      features: [
        'Flexible monthly & term billing',
        'Instant digital GST/tax receipts',
        'Auto-pay reminders & parent portal'
      ],
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
        <line x1="1" y1="10" x2="23" y2="10"></line>
      </svg>`
    }
  ];

  /* ==========================================================================
     2. DOM ELEMENTS
     ========================================================================== */
  const servicesGrid = document.getElementById('services-grid');
  const emptyState = document.getElementById('services-empty-state');
  const servicesCount = document.getElementById('services-count');
  const searchInput = document.getElementById('service-search-input');
  const searchClearBtn = document.getElementById('search-clear-btn');
  const filterTabs = document.querySelectorAll('.filter-tab-btn');
  const resetFilterBtn = document.getElementById('reset-filter-btn');

  let currentCategory = 'all';
  let currentSearchQuery = '';

  /* ==========================================================================
     3. RENDER SERVICES FUNCTION
     ========================================================================== */
  function renderServices(items) {
    if (!servicesGrid) return;

    if (items.length === 0) {
      servicesGrid.innerHTML = '';
      servicesGrid.style.display = 'none';
      if (emptyState) emptyState.style.display = 'block';
      if (servicesCount) servicesCount.textContent = '0 Services Found';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    servicesGrid.style.display = 'grid';

    if (servicesCount) {
      servicesCount.textContent = items.length === 1 ? '1 Service Available' : `${items.length} Services Available`;
    }

    const html = items.map((service, index) => {
      const delay = (index % 3) * 100;
      const featuresHtml = service.features.map(f => `
        <div class="service-feature-item">
          <svg class="feature-check-icon" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>${f}</span>
        </div>
      `).join('');

      return `
        <article class="service-card reveal-up" style="--delay: ${delay}ms;" data-id="${service.id}" data-category="${service.category}">
          <div class="service-card-header">
            <div class="service-icon-box">
              ${service.iconSvg}
            </div>
            <div class="service-status-pill">
              <span class="service-status-dot"></span>
              ${service.status}
            </div>
          </div>

          <span class="service-cat-badge">${service.category}</span>
          <h3 class="service-title">${service.title}</h3>
          <p class="service-desc">${service.description}</p>
          
          <div class="service-features-list">
            ${featuresHtml}
          </div>

          <a href="${service.link}" class="service-detail-link" aria-label="View details for ${service.title}">
            View Details <span class="service-link-arrow">→</span>
          </a>
        </article>
      `;
    }).join('');

    servicesGrid.innerHTML = html;

    // Observe newly created cards for scroll animation
    if ('IntersectionObserver' in window) {
      const cardObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      const newCards = servicesGrid.querySelectorAll('.service-card');
      newCards.forEach(card => cardObserver.observe(card));
    } else {
      const newCards = servicesGrid.querySelectorAll('.service-card');
      newCards.forEach(card => card.classList.add('is-revealed'));
    }
  }

  /* ==========================================================================
     4. FILTER & SEARCH LOGIC
     ========================================================================== */
  function applyFilters() {
    const query = currentSearchQuery.trim().toLowerCase();

    const filtered = servicesData.filter(service => {
      // Category Match
      let categoryMatch = false;
      if (currentCategory === 'all') {
        categoryMatch = true;
      } else {
        categoryMatch = service.category.toLowerCase() === currentCategory.toLowerCase();
      }

      // Search Query Match
      let searchMatch = true;
      if (query.length > 0) {
        const titleMatch = service.title.toLowerCase().includes(query);
        const descMatch = service.description.toLowerCase().includes(query);
        const catMatch = service.category.toLowerCase().includes(query);
        const kwMatch = service.keywords.some(k => k.toLowerCase().includes(query));
        searchMatch = titleMatch || descMatch || catMatch || kwMatch;
      }

      return categoryMatch && searchMatch;
    });

    renderServices(filtered);
  }

  // Category Tab Click Listeners
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      currentCategory = tab.getAttribute('data-category') || 'all';
      applyFilters();
    });
  });

  // Search Input Listener
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value;
      if (searchClearBtn) {
        searchClearBtn.style.display = currentSearchQuery.length > 0 ? 'flex' : 'none';
      }
      applyFilters();
    });
  }

  // Search Clear Button Listener
  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
      }
      currentSearchQuery = '';
      searchClearBtn.style.display = 'none';
      applyFilters();
    });
  }

  // Reset Button in Empty State
  if (resetFilterBtn) {
    resetFilterBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
      }
      currentSearchQuery = '';
      if (searchClearBtn) searchClearBtn.style.display = 'none';

      filterTabs.forEach(t => {
        const isAll = t.getAttribute('data-category') === 'all';
        t.classList.toggle('active', isAll);
        t.setAttribute('aria-selected', isAll ? 'true' : 'false');
      });
      currentCategory = 'all';

      applyFilters();
    });
  }

  /* ==========================================================================
     5. TRUST STATISTICS NUMBER COUNTER FOR SERVICES PAGE
     ========================================================================== */
  const statsSection = document.querySelector('.services-stats-card');
  if (statsSection && 'IntersectionObserver' in window) {
    let countersDone = false;
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersDone) {
          countersDone = true;
          const statNumbers = statsSection.querySelectorAll('.stat-number');
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

    statsObserver.observe(statsSection);
  }

  // Initial Render
  renderServices(servicesData);

  console.log('SchoolRoute Services & Products catalog initialized.');
});
