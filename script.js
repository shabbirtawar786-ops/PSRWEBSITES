/* ==========================
   HERO SLIDER
   ========================== */
const slides = document.querySelectorAll('.hero-slide');
const sliderContainer = document.querySelector('.slider-container');
const dotsContainer = document.querySelector('.dots');
let currentSlide = 0;

// Create dots dynamically
slides.forEach((_, index) => {
  const dot = document.createElement('button');
  dot.addEventListener('click', () => goToSlide(index));
  dotsContainer.appendChild(dot);
});
const dots = dotsContainer.querySelectorAll('button');

function updateDots() {
  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentSlide].classList.add('active');
}

function showSlide(index) {
  sliderContainer.style.transform = `translateX(-${index * 100}%)`;
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

function goToSlide(index) {
  currentSlide = index;
  showSlide(currentSlide);
}

function openLink(url) {
  window.open(url, "_self");
}

// Initialize slider
showSlide(0);
let slideInterval = setInterval(nextSlide, 6000);

// Pause slider on mouse hover
const heroSlider = document.querySelector('.hero-slider');

heroSlider.addEventListener('mouseenter', () => {
  clearInterval(slideInterval);
});

heroSlider.addEventListener('mouseleave', () => {
  slideInterval = setInterval(nextSlide, 6000);
});




/* ==========================
   EMAIL JS FORM
   ========================== */
document.getElementById('emailForm')?.addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('userEmail').value.trim();
  const message = document.getElementById('message').value.trim();
  const statusDiv = document.getElementById('status');

  if (email === '' || message === '') {
    statusDiv.innerText = 'Please fill in all fields.';
    return;
  }

  statusDiv.innerText = 'Sending...';

  // Replace below with your EmailJS credentials
  emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
    from_email: email,
    message: message,
    to_email: 'shabbirtawar786@gmail.com'
  }, 'YOUR_PUBLIC_KEY')
    .then(() => {
      statusDiv.innerText = 'Message sent successfully!';
      document.getElementById('emailForm').reset();
    })
    .catch(() => {
      statusDiv.innerText = 'Failed to send message. Please try again.';
    });
});


/* ==========================
   SOCIAL BAR CLICK TRACKING
   ========================== */
document.querySelectorAll('.social-bar a').forEach(elem => {
  elem.addEventListener('click', () => {
    // Optional analytics tracking
    // console.log('Navigating to:', elem.href);
  });
});


/* ==========================
   COOKIE MODAL
   ========================== */
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
}

function getCookie(name) {
  const cname = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let c of ca) {
    while (c.charAt(0) === ' ') c = c.substring(1);
    if (c.indexOf(cname) === 0) return c.substring(cname.length);
  }
  return "";
}

window.onload = function () {
  if (!getCookie('cookiePrefs')) {
    document.getElementById('cookieModal')?.style.setProperty('display', 'flex');
  } else {
    document.getElementById('cookieModal')?.style.setProperty('display', 'none');
  }
};



/* ==========================
   BRAND SLIDER HOVER EFFECT
   ========================== */
const brandSlider = document.getElementById('brandSlider');
if (brandSlider) {
  brandSlider.addEventListener('mouseover', () => {
    brandSlider.style.animationPlayState = 'paused';
  });
  brandSlider.addEventListener('mouseout', () => {
    brandSlider.style.animationPlayState = 'running';
  });
}


// AUTO YEAR UPDATE
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

// Wait for DOM Hamburger Menu
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const overlay = document.querySelector(".menu-overlay");
  const dropdownToggles = document.querySelectorAll(".dropdown > a");
  const subDropdownToggles = document.querySelectorAll(".dropdown-sub-toggle");

  /* ------------------------------
     Hamburger Menu Toggle
  ------------------------------ */
  hamburger.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    overlay.classList.toggle("show", isOpen);
    document.body.classList.toggle("no-scroll", isOpen);
  });

  /* ------------------------------
     Overlay Close on Click
  ------------------------------ */
  overlay.addEventListener("click", () => {
    navLinks.classList.remove("open");
    overlay.classList.remove("show");
    document.body.classList.remove("no-scroll");
  });

  /* ------------------------------
     Dropdown Toggle (Mobile Only)
  ------------------------------ */
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener("click", e => {
      const parent = toggle.parentElement;
      const icon = toggle.querySelector(".dropdown-icon");

      // Only run on mobile
      if (window.innerWidth <= 700) {
        e.preventDefault();

        // Toggle the dropdown open/close
        parent.classList.toggle("open");
        if (icon) icon.classList.toggle("rotate");
      }
    });
  });

  /* ------------------------------
     Sub-Dropdown (Mobile Only)
  ------------------------------ */
  subDropdownToggles.forEach(subToggle => {
    subToggle.addEventListener("click", e => {
      const parent = subToggle.parentElement;

      if (window.innerWidth <= 700) {
        e.preventDefault();
        parent.classList.toggle("open");
      }
    });
  });

  /* ------------------------------
     Close mobile menu when resizing to desktop
  ------------------------------ */
  window.addEventListener("resize", () => {
    if (window.innerWidth > 700) {
      navLinks.classList.remove("open");
      overlay.classList.remove("show");
      document.body.classList.remove("no-scroll");
      document
        .querySelectorAll(".dropdown, .dropdown-sub")
        .forEach(el => el.classList.remove("open"));
    }
  });
});


