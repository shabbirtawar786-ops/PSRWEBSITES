// ===============================
//  IMAGE SLIDER / CAROUSEL
// ===============================
const track = document.getElementById("sliderTrack");
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

let index = 0;
const totalSlides = slides.length;

function updateSlider(newIndex) {
  index = (newIndex + totalSlides) % totalSlides;
  track.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach(dot => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

dots.forEach(dot => {
  dot.addEventListener("click", () => updateSlider(parseInt(dot.dataset.index)));
});

// Auto-slide
setInterval(() => updateSlider(index + 1), 5000);



//  LIGHTBOX (fullscreen view)
// ===============================
const lightbox = document.getElementById("lightbox");
const lbImage = document.getElementById("lbImage");
const lbPrev = document.getElementById("lbPrev");
const lbNext = document.getElementById("lbNext");
const lbClose = document.getElementById("lbClose");
const lbOverlay = document.getElementById("lbOverlay");

slides.forEach((slide, i) => {
  slide.addEventListener("click", () => openLightbox(i));
});

function openLightbox(i) {
  lightbox.classList.add("open");
  lbImage.src = slides[i].querySelector("img").src;
  lbImage.dataset.index = i;
}

function closeLightbox() {
  lightbox.classList.remove("open");
}

lbClose.addEventListener("click", closeLightbox);
lbOverlay.addEventListener("click", closeLightbox);

lbPrev.addEventListener("click", () => {
  let i = parseInt(lbImage.dataset.index);
  i = (i - 1 + totalSlides) % totalSlides;
  openLightbox(i);
});

lbNext.addEventListener("click", () => {
  let i = parseInt(lbImage.dataset.index);
  i = (i + 1) % totalSlides;
  openLightbox(i);
});



// AUTO YEAR UPDATE
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});


// ===============================
// DOT ALIGNMENT FIX (KEY CHANGE)
// ===============================
window.addEventListener("load", () => {
  const dotContainer = document.querySelector(".dots");
  if (dotContainer) {
    dotContainer.style.display = "flex";
    dotContainer.style.justifyContent = "center";
    dotContainer.style.alignItems = "center";
    dotContainer.style.gap = "8px";
    dotContainer.style.marginTop = "15px";
    dotContainer.style.position = "relative";
    dotContainer.style.bottom = "0"; // ensures dots stay below slider
  }
});


// ===============================
// NAVBAR FUNCTIONALITY
// ===============================
const hamburger2 = document.getElementById("navbar-hamburger");
const navLinks2 = document.getElementById("navbar-links");
const overlay2 = document.getElementById("menu-overlay");
const dropdownToggles2 = document.querySelectorAll(".dropdown-toggle");
const body2 = document.body;

if (hamburger2 && navLinks2 && overlay2) {
  hamburger2.addEventListener("click", () => {
    const isOpen = navLinks2.classList.toggle("open");
    overlay2.classList.toggle("show");
    body2.classList.toggle("no-scroll");
    hamburger2.innerHTML = isOpen
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });

  overlay2.addEventListener("click", () => {
    navLinks2.classList.remove("open");
    overlay2.classList.remove("show");
    body2.classList.remove("no-scroll");
    hamburger2.innerHTML = '<i class="fas fa-bars"></i>';
  });
}

dropdownToggles2.forEach(toggle => {
  toggle.addEventListener("click", (e) => {
    e.preventDefault();
    const parent = toggle.parentElement;
    parent.classList.toggle("open");

    const icon = toggle.querySelector(".dropdown-icon");
    if (icon) icon.classList.toggle("rotate");
  });
});

document.querySelectorAll('.dropdown-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks2.classList.remove('open');
    overlay2.classList.remove('show');
    body2.classList.remove('no-scroll');
    hamburger2.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

document.querySelectorAll('.dropdown-sub-toggle').forEach(toggle => {
  toggle.addEventListener('click', (e) => {
    if (window.innerWidth <= 700) {
      e.preventDefault();
      const parent = toggle.parentElement;
      parent.classList.toggle('open');
    }
  });
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



// === DEMO REQUEST MODAL ===
const modal = document.getElementById("demoModal");
const modalBox = modal.querySelector(".modal-box");
const modalClose = document.getElementById("modalClose");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalCancel = document.getElementById("modalCancel");
const demoForm = document.getElementById("demoForm");

const demoButtons = document.querySelectorAll("#requestDemoBtn, #requestDemoBtnBottom");

demoButtons.forEach(btn => {
  if (btn) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  }
});

function closeModal() {
  modal.classList.remove("open");
  document.body.style.overflow = "";
}

// Close only when clicking backdrop itself, not inside box
modal.addEventListener("click", (e) => {
  if (e.target === modal || e.target === modalBackdrop) {
    closeModal();
  }
});

[modalClose, modalCancel].forEach(el => {
  el.addEventListener("click", closeModal);
});

// Handle form submit
demoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("demoEmail").value.trim();

  if (!email) {
    alert("⚠️ Please enter your email before sending!");
    return;
  }

  alert("✅ Thank you! Your demo request has been submitted.");
  demoForm.reset();
  closeModal();
});
