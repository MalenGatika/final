// MAIN.JS — Funciones generales del sitio

// -----------------------------------------------------
// Mobile Navigation Toggle
// -----------------------------------------------------
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("hidden");
    navMenu.classList.toggle("flex");
  });
}

// -----------------------------------------------------
// Smooth Scroll para links internos
// -----------------------------------------------------
const smoothLinks = document.querySelectorAll('a[href^="#"]');

smoothLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// -----------------------------------------------------
// Efecto fade-in al hacer scroll
// -----------------------------------------------------
const fadeElements = document.querySelectorAll(".fade-in");

const appearOnScroll = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("opacity-100", "translate-y-0");
      }
    });
  },
  { threshold: 0.2 }
);

fadeElements.forEach((el) => {
  el.classList.add(
    "opacity-0",
    "translate-y-6",
    "transition-all",
    "duration-700"
  );
  appearOnScroll.observe(el);
});

// -----------------------------------------------------
// Menú desplegable "Artistas" (desktop + mobile)
// -----------------------------------------------------

// Desktop
// Desktop
if (artistasBtn && artistasMenu) {
  artistasBtn.addEventListener("mouseenter", () => {
    artistasMenu.classList.remove("hidden", "pointer-events-none");
  });
  artistasBtn.addEventListener("mouseleave", () => {
    artistasMenu.classList.add("hidden", "pointer-events-none");
  });
  artistasMenu.addEventListener("mouseenter", () => {
    artistasMenu.classList.remove("hidden", "pointer-events-none");
  });
  artistasMenu.addEventListener("mouseleave", () => {
    artistasMenu.classList.add("hidden", "pointer-events-none");
  });
}


// Mobile
const artistasMobileBtn = document.getElementById("artistasMobileBtn");
const artistasMobileMenu = document.getElementById("artistasMobileMenu");

if (artistasMobileBtn && artistasMobileMenu) {
  artistasMobileBtn.addEventListener("click", () => {
    artistasMobileMenu.classList.toggle("hidden");
    artistasMobileMenu.classList.toggle("flex");
  });
}
