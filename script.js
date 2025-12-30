// ============================================================
// Portfolio Website - JavaScript Functionality
// Features: Smooth Scrolling, Mobile Menu Toggle, Interactions
// ============================================================

// ============================================================
// 1. MOBILE MENU TOGGLE
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('nav ul');
  const navLinks = document.querySelectorAll('nav a');

  // Toggle mobile menu
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navMenu.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    const isClickInsideNav = navMenu && navMenu.contains(event.target);
    const isClickOnToggle = menuToggle && menuToggle.contains(event.target);

    if (!isClickInsideNav && !isClickOnToggle && navMenu) {
      navMenu.classList.remove('active');
      if (menuToggle) menuToggle.classList.remove('active');
    }
  });
});

// ============================================================
// 2. SMOOTH SCROLLING
// ============================================================

function smoothScroll(target, duration = 1000) {
  const targetElement = document.querySelector(target);
  if (!targetElement) return;

  const targetPosition = targetElement.offsetTop;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let start = null;

  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const run = ease(progress, startPosition, distance, duration);

    window.scrollTo(0, run);

    if (progress < duration) {
      window.requestAnimationFrame(step);
    }
  });
}

// Easing function for smooth scroll
function ease(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-(c / 2) * (t * (t - 2) - 1)) + b;
}

// Add smooth scroll to navigation links
document.addEventListener('DOMContentLoaded', function() {
  const scrollLinks = document.querySelectorAll('a[href^="#"]');

  scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        smoothScroll(href, 800);
      }
    });
  });
});

// ============================================================
// 3. ACTIVE NAVIGATION HIGHLIGHT
// ============================================================

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  window.addEventListener('scroll', function() {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', updateActiveNav);

// ============================================================
// 4. SCROLL ANIMATIONS (Fade-in on scroll)
// ============================================================

function observeElements() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with data-animate attribute
  const animateElements = document.querySelectorAll('[data-animate]');
  animateElements.forEach(element => {
    observer.observe(element);
  });
}

document.addEventListener('DOMContentLoaded', observeElements);

// ============================================================
// 5. HEADER SCROLL EFFECT
// ============================================================

function headerScrollEffect() {
  const header = document.querySelector('header');
  if (!header) return;

  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

document.addEventListener('DOMContentLoaded', headerScrollEffect);

// ============================================================
// 6. PROJECT FILTER (if applicable)
// ============================================================

function initProjectFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');

      const filterValue = this.getAttribute('data-filter');

      // Filter projects
      projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.classList.add('active');
          card.style.display = 'block';
        } else {
          card.classList.remove('active');
          card.style.display = 'none';
        }
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', initProjectFilter);

// ============================================================
// 7. TESTIMONIAL CAROUSEL / SLIDER
// ============================================================

function initTestimonialSlider() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  let currentSlide = 0;

  if (slides.length === 0) return;

  function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[currentSlide].classList.add('active');
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);

  // Auto-rotate testimonials every 5 seconds
  if (slides.length > 1) {
    setInterval(nextSlide, 5000);
  }

  showSlide(currentSlide);
}

document.addEventListener('DOMContentLoaded', initTestimonialSlider);

// ============================================================
// 8. FORM VALIDATION & SUBMISSION
// ============================================================

function initFormHandler() {
  const form = document.querySelector('form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form fields
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;

    // Basic validation
    inputs.forEach(input => {
      if (input.value.trim() === '') {
        input.classList.add('error');
        isValid = false;
      } else {
        input.classList.remove('error');
      }

      // Email validation
      if (input.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
          input.classList.add('error');
          isValid = false;
        }
      }
    });

    if (isValid) {
      // Show success message
      const successMsg = document.createElement('div');
      successMsg.className = 'success-message';
      successMsg.textContent = 'Message sent successfully!';
      form.appendChild(successMsg);

      // Clear form
      form.reset();

      // Remove success message after 3 seconds
      setTimeout(() => {
        successMsg.remove();
      }, 3000);
    }
  });
}

document.addEventListener('DOMContentLoaded', initFormHandler);

// ============================================================
// 9. BACK TO TOP BUTTON
// ============================================================

function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', function(e) {
    e.preventDefault();
    smoothScroll('body', 800);
  });
}

document.addEventListener('DOMContentLoaded', initBackToTop);

// ============================================================
// 10. MODAL / LIGHTBOX FUNCTIONALITY
// ============================================================

function initModals() {
  const modalTriggers = document.querySelectorAll('[data-modal]');
  const modals = document.querySelectorAll('.modal');
  const closeButtons = document.querySelectorAll('.modal-close');

  // Open modal
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      const modalId = this.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close modal
  closeButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      this.closest('.modal').classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  });

  // Close modal when clicking outside
  modals.forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        this.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  });

  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      modals.forEach(modal => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      });
    }
  });
}

document.addEventListener('DOMContentLoaded', initModals);

// ============================================================
// 11. COUNTER ANIMATION
// ============================================================

function initCounters() {
  const counters = document.querySelectorAll('[data-count]');

  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    let start = null;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !counter.classList.contains('counted')) {
          counter.classList.add('counted');

          function count(timestamp) {
            if (!start) start = timestamp;
            const progress = (timestamp - start) / duration;

            if (progress < 1) {
              const current = Math.floor(target * progress);
              counter.textContent = current;
              requestAnimationFrame(count);
            } else {
              counter.textContent = target;
            }
          }

          requestAnimationFrame(count);
          observer.unobserve(counter);
        }
      });
    });

    observer.observe(counter);
  });
}

document.addEventListener('DOMContentLoaded', initCounters);

// ============================================================
// 12. THEME TOGGLE (Dark Mode)
// ============================================================

function initThemeToggle() {
  const themeToggle = document.querySelector('.theme-toggle');
  const htmlElement = document.documentElement;

  if (!themeToggle) return;

  // Load saved theme preference
  const savedTheme = localStorage.getItem('theme') || 'light';
  htmlElement.setAttribute('data-theme', savedTheme);
  updateThemeToggleIcon(savedTheme);

  themeToggle.addEventListener('click', function() {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggleIcon(newTheme);
  });

  function updateThemeToggleIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (icon) {
      icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
  }
}

document.addEventListener('DOMContentLoaded', initThemeToggle);

// ============================================================
// 13. LAZY LOADING IMAGES
// ============================================================

function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute('data-src');
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    images.forEach(img => {
      img.src = img.getAttribute('data-src');
      img.removeAttribute('data-src');
    });
  }
}

document.addEventListener('DOMContentLoaded', initLazyLoading);

// ============================================================
// 14. SMOOTH HASH NAVIGATION
// ============================================================

window.addEventListener('hashchange', function() {
  const target = window.location.hash;
  if (target) {
    smoothScroll(target, 800);
  }
});

// ============================================================
// 15. UTILITY FUNCTIONS
// ============================================================

// Debounce function for performance optimization
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Add ripple effect to buttons
function initRippleEffect() {
  const buttons = document.querySelectorAll('button, a.btn');

  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');

      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });
}

document.addEventListener('DOMContentLoaded', initRippleEffect);

// ============================================================
// Initialization Complete
// ============================================================

console.log('Portfolio JavaScript loaded successfully!');
