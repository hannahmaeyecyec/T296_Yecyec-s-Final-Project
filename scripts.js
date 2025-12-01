// Smooth Scrolling & Animations 
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all features
  initScrollAnimations();
  initFormValidation();
  initCharacterCounter();
  initBackToTop();
  initThemeToggle();
  initNavigation();
  initTooltips();
});

// SCROLL ANIMATIONS
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all animate-on-scroll elements
  document.querySelectorAll(
    '.fade-in, .slide-up, .animate-left, .animate-right, .highlight-card, ' +
    '.service-card, .project-card, .testimonial-card, .edu-item, .skill-item, ' +
    '.achievement-item, .contact-card'
  ).forEach(el => {
    observer.observe(el);
  });
}

// FORM VALIDATION & SUBMISSION 
function initFormValidation() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  // Real-time validation
  const inputs = contactForm.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        validateField(input);
      }
    });
  });

  // Form submission
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      submitForm();
    }
  });
}

// Validate individual field
function validateField(field) {
  const errorId = field.id + 'Error';
  const errorElement = document.getElementById(errorId);
  let isValid = true;
  let errorMsg = '';

  if (field.id === 'name') {
    if (field.value.trim().length < 2) {
      isValid = false;
      errorMsg = 'Name must be at least 2 characters';
    }
  } else if (field.id === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(field.value)) {
      isValid = false;
      errorMsg = 'Please enter a valid email address';
    }
  } else if (field.id === 'subject') {
    if (field.value.trim().length < 3) {
      isValid = false;
      errorMsg = 'Subject must be at least 3 characters';
    }
  } else if (field.id === 'message') {
    if (field.value.trim().length < 10) {
      isValid = false;
      errorMsg = 'Message must be at least 10 characters';
    } else if (field.value.length > 500) {
      isValid = false;
      errorMsg = 'Message cannot exceed 500 characters';
    }
  }

  if (errorElement) {
    if (!isValid) {
      field.classList.add('error');
      errorElement.textContent = errorMsg;
    } else {
      field.classList.remove('error');
      errorElement.textContent = '';
    }
  }

  return isValid;
}

// Validate entire form
function validateForm() {
  const contactForm = document.getElementById('contactForm');
  const fields = ['name', 'email', 'subject', 'message'];
  let isFormValid = true;

  fields.forEach(fieldId => {
    const field = document.getElementById(fieldId);
    if (field && !validateField(field)) {
      isFormValid = false;
    }
  });

  return isFormValid;
}

// Submit form
function submitForm() {
  const contactForm = document.getElementById('contactForm');
  const successMessage = document.getElementById('successMessage');
  const errorMessage = document.getElementById('errorMessage');
  const errorText = document.getElementById('errorText');

  // Get form data
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value
  };

  // Simulate form submission (in real app, send to server)
  console.log('Form submitted:', formData);

  // Show success message
  successMessage.style.display = 'flex';
  errorMessage.style.display = 'none';

  // Reset form
  contactForm.reset();
  document.getElementById('charCount').textContent = '0';

  // Hide success message after 5 seconds
  setTimeout(() => {
    successMessage.style.display = 'none';
  }, 5000);

  // Optional: Scroll to message
  successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// CHARACTER COUNTER
function initCharacterCounter() {
  const messageField = document.getElementById('message');
  const charCount = document.getElementById('charCount');

  if (messageField && charCount) {
    messageField.addEventListener('input', () => {
      const count = messageField.value.length;
      charCount.textContent = Math.min(count, 500);

      if (count > 500) {
        messageField.value = messageField.value.substring(0, 500);
        charCount.textContent = '500';
      }
    });
  }
}

// BACK TO TOP BUTTON 
function initBackToTop() {
  const backToTop = document.getElementById('back-to-top');
  if (!backToTop) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop.style.display = 'flex';
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
      setTimeout(() => {
        backToTop.style.display = 'none';
      }, 300);
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// THEME TOGGLE (Light/Dark Mode) 
function initThemeToggle() {
  // Check for saved theme preference or system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  
  document.body.classList.remove('light', 'dark');
  document.body.classList.add(initialTheme);

  // Get or create theme toggle button
  let themeToggle = document.getElementById('themeToggle');
  
  if (!themeToggle) {
    themeToggle = document.createElement('button');
    themeToggle.id = 'themeToggle';
    themeToggle.className = 'theme-toggle';
    themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    const headerInner = document.querySelector('.header-inner');
    if (headerInner) {
      headerInner.appendChild(themeToggle);
    }
  }

  // Update icon based on current theme
  const icon = themeToggle.querySelector('i');
  if (initialTheme === 'dark') {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }

  // Toggle theme on click
  themeToggle.addEventListener('click', (e) => {
    e.preventDefault();
    const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.body.classList.remove(currentTheme);
    document.body.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);

    // Update icon
    const newIcon = themeToggle.querySelector('i');
    if (newTheme === 'dark') {
      newIcon.classList.remove('fa-moon');
      newIcon.classList.add('fa-sun');
    } else {
      newIcon.classList.remove('fa-sun');
      newIcon.classList.add('fa-moon');
    }
  });

  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
    if (!localStorage.getItem('theme')) {
      const theme = e.matches ? 'dark' : 'light';
      document.body.classList.remove('light', 'dark');
      document.body.classList.add(theme);
    }
  });
}

// NAVIGATION ACTIVE STATE 
function initNavigation() {
  const navLinks = document.querySelectorAll('.main-nav a');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Update active state on click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
}

// TOOLTIPS
function initTooltips() {
  document.querySelectorAll('[title]').forEach(element => {
    element.style.cursor = 'help';
  });
}

// SMOOTH REVEAL ON PAGE LOAD
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease-in';
    document.body.style.opacity = '1';
  }, 100);
});

// PARALLAX EFFECT (Optional) 
window.addEventListener('scroll', () => {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  parallaxElements.forEach(element => {
    const speed = element.getAttribute('data-parallax') || 0.5;
    element.style.transform = `translateY(${window.scrollY * speed}px)`;
  });
});

// KEYBOARD SHORTCUTS
document.addEventListener('keydown', (e) => {
  // Alt + H: Go to home
  if (e.altKey && e.key === 'h') {
    window.location.href = 'index.html';
  }
  // Alt + C: Go to contact
  if (e.altKey && e.key === 'c') {
    window.location.href = 'contact.html';
  }
  // Escape: Close any modals/menus
  if (e.key === 'Escape') {
    closeAllModals();
  }
});

function closeAllModals() {
  document.querySelectorAll('.modal.active').forEach(modal => {
    modal.classList.remove('active');
  });
}

// LAZY LOADING IMAGES 
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// MOBILE MENU TOGGLE (if needed)
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.main-nav');

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('active');
      menuBtn.classList.toggle('active');
    });

    // Close menu on link click
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuBtn.classList.remove('active');
      });
    });
  }
}

// COPY TO CLIPBOARD
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showNotification('Copied to clipboard!', 'success');
  }).catch(() => {
    showNotification('Failed to copy', 'error');
  });
}

// Show temporary notification
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 25px;
    background: ${type === 'success' ? '#10b981' : '#ef4444'};
    color: white;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    z-index: 10000;
    animation: slideInRight 0.3s ease;
  `;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ADD CSS FOR ANIMATIONS 
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from { transform: translateX(400px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(400px); opacity: 0; }
  }

  .visible {
    animation: fadeInUp 0.6s ease forwards !important;
  }

  input.error, textarea.error {
    border-color: #ef4444 !important;
    background-color: rgba(239, 68, 68, 0.05) !important;
  }

  .error-message {
    color: #ef4444;
    font-size: 12px;
    margin-top: 4px;
    display: block;
  }

  .success-message, .error-message-box {
    display: none;
    gap: 10px;
    align-items: center;
    padding: 12px 16px;
    border-radius: 10px;
    font-size: 14px;
    margin-top: 16px;
  }

  .success-message {
    background-color: #d1fae5;
    color: #065f46;
    border: 1px solid #6ee7b7;
  }

  .error-message-box {
    background-color: #fee2e2;
    color: #991b1b;
    border: 1px solid #fca5a5;
  }

  .char-count {
    display: block;
    font-size: 12px;
    color: #9ca3af;
    margin-top: 4px;
  }

  .theme-toggle {
    background: none;
    border: none;
    color: inherit;
    font-size: 1.4rem;
    cursor: pointer;
    transition: 0.3s ease;
    padding: 8px;
  }

  .theme-toggle:hover {
    transform: scale(1.15);
  }

  @media (max-width: 768px) {
    .notification {
      left: 20px !important;
      right: 20px !important;
    }
  }
`;
document.head.appendChild(style);

// Initialize mobile menu if needed
document.addEventListener('DOMContentLoaded', initMobileMenu);

console.log('✨ Hannah\'s Portfolio - JavaScript initialized successfully!');
