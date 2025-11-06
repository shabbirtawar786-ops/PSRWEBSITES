/* =====================================================
   PSR COMPUTERS — script.js (optimized build)
   Behavior: Hover dropdown desktop, click dropdown mobile
   ===================================================== */

/* ---------- HERO SLIDER ---------- */
const slides = document.querySelectorAll('.hero-slide');
const sliderContainer = document.querySelector('.slider-container');
const dotsContainer = document.querySelector('.dots');
let currentSlide = 0;

// Create dots dynamically
slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
});
const dots = dotsContainer.querySelectorAll('button');

function updateDots() {
  dots.forEach(dot => dot.classList.remove('active'));
  if (dots[currentSlide]) dots[currentSlide].classList.add('active');
}
function showSlide(i) {
  sliderContainer.style.transform = `translateX(-${i * 100}%)`;
  updateDots();
}
function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}
function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}
function goToSlide(i) {
  currentSlide = i;
  showSlide(currentSlide);
}
function openLink(url) {
  window.open(url, '_self');
}

// Initialize slider
showSlide(0);
let slideInterval = setInterval(nextSlide, 6000);
const heroSlider = document.querySelector('.hero-slider');
if (heroSlider) {
  heroSlider.addEventListener('mouseenter', () => clearInterval(slideInterval));
  heroSlider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 6000);
  });
}

/* ---------- EMAILJS FORM ---------- */
document.getElementById('emailForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('userEmail').value.trim();
  const message = document.getElementById('message').value.trim();
  const statusDiv = document.getElementById('status');

  if (!email || !message) {
    statusDiv.innerText = 'Please fill in all fields.';
    return;
  }

  statusDiv.innerText = 'Sending...';

  // Replace with actual EmailJS credentials when ready
  emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
      from_email: email,
      message,
      to_email: 'shabbirtawar786@gmail.com'
    }, 'YOUR_PUBLIC_KEY')
    .then(() => {
      statusDiv.innerText = 'Message sent successfully!';
      e.target.reset();
    })
    .catch(() => {
      statusDiv.innerText = 'Failed to send message. Please try again.';
    });
});

/* ---------- SOCIAL BAR CLICK TRACKING ---------- */
document.querySelectorAll('.social-bar a').forEach(a =>
  a.addEventListener('click', () => {
    // Optional analytics hook
  })
);

/* ---------- COOKIE MODAL ---------- */
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + days * 86400000);
  document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
}
function getCookie(name) {
  const cname = name + '=';
  return document.cookie.split(';').map(c => c.trim()).find(c => c.startsWith(cname))?.substring(cname.length) || '';
}

document.addEventListener('DOMContentLoaded', () => {
  const cookieModal = document.getElementById('cookieModal');
  const saveBtn = document.getElementById('cookieSave');
  const acceptBtn = document.getElementById('cookieAccept');
  const analytics = document.getElementById('analyticsCookie');
  const marketing = document.getElementById('marketingCookie');

  if (cookieModal && !getCookie('cookiePrefs')) {
    cookieModal.style.display = 'flex';
  }

  const savePrefs = () => {
    const prefs = {
      analytics: analytics?.checked || false,
      marketing: marketing?.checked || false
    };
    setCookie('cookiePrefs', JSON.stringify(prefs), 365);
    cookieModal.style.display = 'none';
  };

  saveBtn?.addEventListener('click', savePrefs);
  acceptBtn?.addEventListener('click', () => {
    setCookie('cookiePrefs', '{"analytics":true,"marketing":true}', 365);
    cookieModal.style.display = 'none';
  });
});

/* ---------- BRAND SLIDER ---------- */
const brandSlider = document.getElementById('brandSlider');
if (brandSlider) {
  brandSlider.addEventListener('mouseover', () => brandSlider.style.animationPlayState = 'paused');
  brandSlider.addEventListener('mouseout', () => brandSlider.style.animationPlayState = 'running');
}

/* ---------- AUTO YEAR ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});

/* ---------- NAVBAR / DROPDOWN / OVERLAY ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const overlay = document.querySelector('.menu-overlay');
  const dropdownToggles = document.querySelectorAll('.dropdown > a');
  const subDropdownToggles = document.querySelectorAll('.dropdown-sub-toggle');

  // Hamburger toggle
  hamburger?.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    overlay.classList.toggle('show', open);
    document.body.classList.toggle('no-scroll', open);
    hamburger.setAttribute('aria-expanded', open);
  });

  // Overlay close
  overlay?.addEventListener('click', () => {
    navLinks.classList.remove('open');
    overlay.classList.remove('show');
    document.body.classList.remove('no-scroll');
    hamburger?.setAttribute('aria-expanded', 'false');
  });

  /* ------------------------------
     Dropdown Toggle (Desktop + Mobile)
     Keeps dropdown open when clicked
  ------------------------------ */
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', e => {
      const parent = toggle.parentElement;
      const icon = toggle.querySelector('.dropdown-icon');
      e.preventDefault();

      // Toggle open/close
      const isOpen = parent.classList.toggle('open');
      if (icon) icon.classList.toggle('rotate', isOpen);

      // Close all other dropdowns
      document.querySelectorAll('.dropdown').forEach(other => {
        if (other !== parent) {
          other.classList.remove('open');
          const otherIcon = other.querySelector('.dropdown-icon');
          if (otherIcon) otherIcon.classList.remove('rotate');
        }
      });

      // Stop propagation so outside click doesn’t close immediately
      e.stopPropagation();
    });
  });

  // Sub-dropdown toggle (Mobile + Desktop)
  subDropdownToggles.forEach(subToggle => {
    subToggle.addEventListener('click', e => {
      const parent = subToggle.parentElement;
      const icon = subToggle.querySelector('.sub-icon');
      e.preventDefault();
      const isOpen = parent.classList.toggle('open');
      if (icon) icon.classList.toggle('rotate', isOpen);
      e.stopPropagation();
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', e => {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
      document.querySelectorAll('.dropdown-icon').forEach(i => i.classList.remove('rotate'));
    }
  });

  // Close mobile menu on resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 700) {
      navLinks.classList.remove('open');
      overlay.classList.remove('show');
      document.body.classList.remove('no-scroll');
      hamburger?.setAttribute('aria-expanded', 'false');
    }
  });
});

// about section 

document.addEventListener("scroll", () => {
  document.querySelectorAll(".about-us-section").forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < window.innerHeight - 150) {
      sec.classList.add("visible");
    }
  });
});


// PARALLAX BACKGROUND SCROLL EFFECT
window.addEventListener("scroll", () => {
  document.querySelectorAll(".about-us-section").forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      sec.classList.add("parallax-active");
    } else {
      sec.classList.remove("parallax-active");
    }
  });
});


// FADE-IN FOR SECTION DIVIDERS
const dividers = document.querySelectorAll(".section-divider");
window.addEventListener("scroll", () => {
  dividers.forEach(div => {
    const rect = div.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      div.style.opacity = "1";
      div.style.transform = "translateY(0)";
    } else {
      div.style.opacity = "0";
      div.style.transform = "translateY(40px)";
    }
  });
});
