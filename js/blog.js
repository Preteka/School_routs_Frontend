/**
 * SCHOOLROUTE — BLOG JAVASCRIPT
 * Dynamic rendering, live search, multi-category filtering, and newsletter handling
 * Vanilla JavaScript (No Frameworks)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Set document title
  document.title = "Blog | SchoolRoute";

  /* ==========================================================================
     1. BLOG POSTS DATA REPOSITORY
     ========================================================================== */
  const blogPosts = [
    {
      id: "school-bus-safety",
      category: "Safety",
      title: "7 Ways to Make School Bus Journeys Safer",
      excerpt: "Simple safety practices that schools and parents can use to create safer and more organized student transportation.",
      image: "assets/images/blog/blog-safety.jpg",
      author: "SchoolRoute Team",
      date: "September 12, 2026"
    },
    {
      id: "gps-school-transportation",
      category: "Technology",
      title: "How GPS Tracking Is Changing School Transportation",
      excerpt: "Discover how real-time location technology gives parents and schools better visibility throughout the daily bus journey.",
      image: "assets/images/blog/blog-gps-tracking.jpg",
      author: "SchoolRoute Team",
      date: "September 8, 2026"
    },
    {
      id: "parent-guide-bus-tracking",
      category: "Parents",
      title: "A Parent’s Guide to School Bus Tracking",
      excerpt: "Learn how transportation tracking can help parents stay informed about pickup, travel, and arrival times.",
      image: "assets/images/blog/blog-parent-tracking.jpg",
      author: "SchoolRoute Team",
      date: "September 4, 2026"
    },
    {
      id: "student-boarding-updates",
      category: "Student Monitoring",
      title: "Why Student Boarding Updates Matter",
      excerpt: "Better boarding and drop-off visibility can help parents and schools maintain a clearer record of student journeys.",
      image: "assets/images/blog/blog-student-monitoring.jpg",
      author: "SchoolRoute Team",
      date: "August 29, 2026"
    },
    {
      id: "smarter-routes-school-transport",
      category: "Route Management",
      title: "How Smarter Routes Can Improve School Transportation",
      excerpt: "Explore how organized route planning can reduce unnecessary delays and create a smoother daily transportation experience.",
      image: "assets/images/blog/blog-route-management.jpg",
      author: "SchoolRoute Team",
      date: "August 22, 2026"
    },
    {
      id: "connected-school-transport-system",
      category: "School Transportation",
      title: "Building a More Connected School Transport System",
      excerpt: "See how communication, route visibility, monitoring, and digital tools can work together to improve school transportation.",
      image: "assets/images/blog/blog-school-transport.jpg",
      author: "SchoolRoute Team",
      date: "August 15, 2026"
    },
    {
      id: "digital-transportation-management",
      category: "Technology",
      title: "From Paper Records to Digital Transportation Management",
      excerpt: "Learn how digital tools can simplify transportation records, notifications, payments, and parent communication.",
      image: "assets/images/blog/blog-digital-management.jpg",
      author: "SchoolRoute Team",
      date: "August 8, 2026"
    },
    {
      id: "what-parents-look-for-school-transport",
      category: "Safety",
      title: "What Parents Should Look for in a School Transport Service",
      excerpt: "A practical checklist covering driver verification, journey monitoring, communication, and student safety.",
      image: "assets/images/blog/blog-driver-safety.jpg",
      author: "SchoolRoute Team",
      date: "August 1, 2026"
    },
    {
      id: "future-smarter-school-transportation",
      category: "School Updates",
      title: "What’s Next for Smarter School Transportation?",
      excerpt: "An overview of how connected technology can help schools create more visible and efficient transportation experiences.",
      image: "assets/images/blog/blog-future-transport.jpg",
      author: "SchoolRoute Team",
      date: "July 25, 2026"
    }
  ];

  /* ==========================================================================
     2. DOM ELEMENTS
     ========================================================================== */
  const blogGrid = document.getElementById('blog-grid');
  const emptyState = document.getElementById('blog-empty-state');
  const searchInput = document.getElementById('blog-search-input');
  const searchClearBtn = document.getElementById('blog-search-clear');
  const categoryBtns = document.querySelectorAll('.category-btn');
  const countNumEl = document.getElementById('blog-count-num');
  const countTextEl = document.getElementById('blog-count-text');
  const clearFiltersBtn = document.getElementById('clear-filters-btn');
  const newsletterForm = document.getElementById('blog-newsletter-form');
  const newsletterSuccess = document.getElementById('newsletter-success-msg');

  let currentCategory = 'All';
  let searchQuery = '';

  /* ==========================================================================
     3. RENDER BLOG CARDS
     ========================================================================== */
  function renderBlogCards() {
    if (!blogGrid) return;

    // Filter posts based on category and search query
    const filteredPosts = blogPosts.filter(post => {
      const matchesCategory = (currentCategory === 'All') || (post.category.toLowerCase() === currentCategory.toLowerCase());
      
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = !query || 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });

    // Update Counter
    if (countNumEl) {
      countNumEl.textContent = filteredPosts.length;
    }
    if (countTextEl) {
      countTextEl.textContent = filteredPosts.length === 1 ? 'Article' : 'Articles';
    }

    // Toggle Empty State
    if (filteredPosts.length === 0) {
      blogGrid.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      return;
    } else {
      if (emptyState) emptyState.style.display = 'none';
    }

    // Generate Card HTML
    const cardsHtml = filteredPosts.map((post, index) => {
      const delay = (index % 3) * 100;
      return `
        <article class="blog-card fade-in-up is-visible" style="--anim-delay: ${delay}ms;" data-id="${post.id}">
          <div class="bcard-image-wrap">
            <img src="${post.image}" alt="${escapeHtml(post.title)}" class="bcard-img" loading="${index < 3 ? 'eager' : 'lazy'}" width="400" height="250" onerror="this.onerror=null; this.src='assets/images/blog/blog-hero.jpg';">
          </div>
          <div class="bcard-content">
            <span class="bcard-category-badge">${escapeHtml(post.category)}</span>
            <h3 class="bcard-title">
              <a href="blog-detail.html?id=${encodeURIComponent(post.id)}" class="bcard-title-link">${escapeHtml(post.title)}</a>
            </h3>
            <p class="bcard-excerpt">${escapeHtml(post.excerpt)}</p>
            <div class="bcard-meta">
              <span class="bcard-author">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                ${escapeHtml(post.author)}
              </span>
              <span class="bcard-date">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                ${escapeHtml(post.date)}
              </span>
            </div>
            <a href="blog-detail.html?id=${encodeURIComponent(post.id)}" class="bcard-read-link" aria-label="Read article: ${escapeHtml(post.title)}">
              <span>Read Article</span>
              <span class="btn-arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </article>
      `;
    }).join('');

    blogGrid.innerHTML = cardsHtml;
  }

  // Helper function to escape HTML special characters
  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /* ==========================================================================
     4. SEARCH & CATEGORY FILTER EVENT LISTENERS
     ========================================================================== */
  // Live Search Input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      if (searchClearBtn) {
        searchClearBtn.style.display = searchQuery.length > 0 ? 'flex' : 'none';
      }
      renderBlogCards();
    });
  }

  // Clear Search Input Button
  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        searchQuery = '';
        searchClearBtn.style.display = 'none';
        searchInput.focus();
      }
      renderBlogCards();
    });
  }

  // Category Filter Buttons
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      currentCategory = btn.getAttribute('data-category') || 'All';
      renderBlogCards();
    });
  });

  // Clear All Filters Button (From Empty State)
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', () => {
      currentCategory = 'All';
      searchQuery = '';
      if (searchInput) {
        searchInput.value = '';
        if (searchClearBtn) searchClearBtn.style.display = 'none';
      }
      categoryBtns.forEach(b => {
        const isAll = b.getAttribute('data-category') === 'All';
        b.classList.toggle('active', isAll);
        b.setAttribute('aria-selected', isAll ? 'true' : 'false');
      });
      renderBlogCards();
    });
  }

  /* ==========================================================================
     5. NEWSLETTER FORM HANDLER
     ========================================================================== */
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletter-email');
      if (!emailInput || !emailInput.value.trim() || !emailInput.checkValidity()) {
        if (emailInput) emailInput.focus();
        return;
      }

      // Show success toast feedback
      if (newsletterSuccess) {
        newsletterSuccess.style.display = 'inline-flex';
        emailInput.value = '';
        setTimeout(() => {
          newsletterSuccess.style.display = 'none';
        }, 5000);
      }
    });
  }

  /* ==========================================================================
     6. SCROLL REVEAL OBSERVER
     ========================================================================== */
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.fade-in-up');
    if (!revealElements.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
      });

      revealElements.forEach(el => observer.observe(el));
    } else {
      revealElements.forEach(el => el.classList.add('is-visible'));
    }
  }

  // Initial render and animations
  renderBlogCards();
  initScrollReveal();
});
