/* ============================================================
   IRONVEIL — Steel & Concrete Co. | one.js
   All interactive functionality
   ============================================================ */

// ─── LOADER ───────────────────────────────────────────────
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
  }, 1400);
});
document.body.style.overflow = 'hidden';


// ─── NAVBAR SCROLL ────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});


// ─── ACTIVE NAV LINK ON SCROLL ────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const observerNav = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observerNav.observe(s));


// ─── HAMBURGER MENU ───────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  }
});


// ─── SMOOTH SCROLL FOR ALL ANCHOR LINKS ──────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


// ─── HERO BUTTON ACTIONS ──────────────────────────────────
document.getElementById('heroExplore').addEventListener('click', () => {
  document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
});
document.getElementById('heroProjects').addEventListener('click', () => {
  document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
});


// ─── COUNTER ANIMATION ────────────────────────────────────
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });

document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));


// ─── PRODUCT FILTER ───────────────────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    productCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !match);
      if (match) {
        card.style.animation = 'none';
        card.offsetHeight; // reflow
        card.style.animation = '';
      }
    });
  });
});


// ─── PRODUCT CARD INQUIRE BUTTONS ────────────────────────
document.querySelectorAll('.btn-card').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    const serviceSelect = document.getElementById('service');
    const cardTitle = btn.closest('.product-card').querySelector('h3').textContent;

    // Auto-select closest matching option
    const options = [...serviceSelect.options];
    const match = options.find(o => o.text.toLowerCase().includes('steel') && cardTitle.toLowerCase().includes('steel'))
      || options.find(o => o.text.toLowerCase().includes('concrete') && cardTitle.toLowerCase().includes('concrete'))
      || options.find(o => o.text.toLowerCase().includes('fabrication') && cardTitle.toLowerCase().includes('fabrication'));
    if (match) serviceSelect.value = match.value;

    // Highlight the form briefly
    setTimeout(() => {
      const form = document.getElementById('contactForm');
      form.style.outline = '2px solid var(--accent)';
      setTimeout(() => form.style.outline = '', 1200);
    }, 800);
  });
});


// ─── PROJECT CASE STUDY BUTTONS ──────────────────────────
document.querySelectorAll('.btn-ghost').forEach(btn => {
  btn.addEventListener('click', () => {
    // Simulate toast notification
    showToast('Case study coming soon — contact us for project details.');
  });
});

document.getElementById('viewAllProjects').addEventListener('click', () => {
  showToast('Full portfolio available on request. Scroll to contact us.');
  setTimeout(() => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  }, 1400);
});


// ─── ABOUT LEARN MORE ─────────────────────────────────────
document.getElementById('aboutLearn').addEventListener('click', () => {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});


// ─── TESTIMONIAL SLIDER ───────────────────────────────────
const testimonials = document.querySelectorAll('.testimonial');
const sliderDots = document.getElementById('sliderDots');
let currentSlide = 0;
let autoSlide;

// Build dots
testimonials.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.classList.add('dot-btn');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(i));
  sliderDots.appendChild(dot);
});

function goToSlide(index) {
  testimonials[currentSlide].classList.remove('active');
  document.querySelectorAll('.dot-btn')[currentSlide].classList.remove('active');

  currentSlide = (index + testimonials.length) % testimonials.length;

  testimonials[currentSlide].classList.add('active');
  document.querySelectorAll('.dot-btn')[currentSlide].classList.add('active');
}

document.getElementById('prevSlide').addEventListener('click', () => {
  goToSlide(currentSlide - 1);
  resetAuto();
});
document.getElementById('nextSlide').addEventListener('click', () => {
  goToSlide(currentSlide + 1);
  resetAuto();
});

function startAuto() {
  autoSlide = setInterval(() => goToSlide(currentSlide + 1), 5000);
}
function resetAuto() {
  clearInterval(autoSlide);
  startAuto();
}
startAuto();


// ─── CONTACT FORM ─────────────────────────────────────────
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

function validateField(id, errorId, condition, message) {
  const field = document.getElementById(id);
  const error = document.getElementById(errorId);
  if (!condition) {
    field.classList.add('error');
    error.textContent = message;
    return false;
  }
  field.classList.remove('error');
  error.textContent = '';
  return true;
}

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validName    = validateField('name',    'nameError',    name.length >= 2,        'Please enter your full name.');
  const validEmail   = validateField('email',   'emailError',   emailRegex.test(email),  'Please enter a valid email.');
  const validMessage = validateField('message', 'messageError', message.length >= 10,    'Message must be at least 10 characters.');

  if (!validName || !validEmail || !validMessage) return;

  const submitBtn = document.getElementById('submitBtn');
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  // Simulate API call
  setTimeout(() => {
    contactForm.reset();
    formSuccess.classList.add('show');
    submitBtn.textContent = 'Send Message';
    submitBtn.disabled = false;
    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  }, 1200);
});

// Real-time validation clear on input
['name', 'email', 'message'].forEach(id => {
  document.getElementById(id).addEventListener('input', () => {
    document.getElementById(id).classList.remove('error');
    const errEl = document.getElementById(id + 'Error');
    if (errEl) errEl.textContent = '';
  });
});


// ─── MODAL ────────────────────────────────────────────────
const modalOverlay = document.getElementById('modalOverlay');
const modalClose   = document.getElementById('modalClose');
const modalSubmit  = document.getElementById('modalSubmit');

function openModal() { modalOverlay.classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeModal() { modalOverlay.classList.remove('open'); document.body.style.overflow = ''; }

document.getElementById('navCta').addEventListener('click', openModal);
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });

document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

modalSubmit.addEventListener('click', () => {
  modalSubmit.textContent = 'Submitting...';
  modalSubmit.disabled = true;
  setTimeout(() => {
    closeModal();
    showToast('Quote request received. Our team will contact you shortly.');
    modalSubmit.textContent = 'Submit Request';
    modalSubmit.disabled = false;
  }, 1000);
});


// ─── BACK TO TOP ──────────────────────────────────────────
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 600);
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// ─── SCROLL REVEAL ────────────────────────────────────────
const revealElements = document.querySelectorAll(
  '.product-card, .project-card, .pillar, .about-text, .contact-info, .contact-form, .stat, .about-img-block'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${i * 0.05}s`;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(el => revealObserver.observe(el));


// ─── TOAST NOTIFICATION ───────────────────────────────────
function showToast(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;

  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '90px',
    right: '32px',
    background: '#1f1f1a',
    border: '1px solid #2e2e28',
    borderLeft: '3px solid #d4a017',
    color: '#e8e4d8',
    padding: '14px 20px',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.85rem',
    maxWidth: '320px',
    zIndex: '3000',
    opacity: '0',
    transform: 'translateX(20px)',
    transition: 'all 0.3s ease',
    borderRadius: '2px',
    lineHeight: '1.5',
  });

  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(0)';
  });
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}


// ─── PARALLAX ON HERO BG TEXT ─────────────────────────────
const heroBgText = document.querySelector('.hero-bg-text');
window.addEventListener('scroll', () => {
  if (heroBgText) {
    const scrollY = window.scrollY;
    heroBgText.style.transform = `translateY(calc(-50% + ${scrollY * 0.2}px))`;
  }
}, { passive: true });


// ─── TICKER PAUSE ON HOVER ────────────────────────────────
const tickerTrack = document.querySelector('.ticker-track');
const ticker = document.querySelector('.ticker');
if (ticker && tickerTrack) {
  ticker.addEventListener('mouseenter', () => { tickerTrack.style.animationPlayState = 'paused'; });
  ticker.addEventListener('mouseleave', () => { tickerTrack.style.animationPlayState = 'running'; });
}
