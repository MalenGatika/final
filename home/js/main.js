// -----------------------------------------------------
// Mobile Navigation Toggle (simple y robusto)
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
// Fade-in al hacer scroll
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
// Menú "Artistas" desktop
// -----------------------------------------------------
const artistasBtn = document.getElementById("artistasBtn");
const artistasMenu = document.getElementById("artistasMenu");

if (artistasBtn && artistasMenu) {
  artistasBtn.addEventListener("mouseenter", () => {
    artistasMenu.classList.remove("hidden");
  });

  artistasBtn.addEventListener("mouseleave", () => {
    artistasMenu.classList.add("hidden");
  });

  artistasMenu.addEventListener("mouseenter", () => {
    artistasMenu.classList.remove("hidden");
  });

  artistasMenu.addEventListener("mouseleave", () => {
    artistasMenu.classList.add("hidden");
  });
}

// -----------------------------------------------------
// Artistas mobile
// -----------------------------------------------------
const artistasMobileBtn = document.getElementById("artistasMobileBtn");
const artistasMobileMenu = document.getElementById("artistasMobileMenu");

if (artistasMobileBtn && artistasMobileMenu) {
  artistasMobileBtn.addEventListener("click", () => {
    artistasMobileMenu.classList.toggle("hidden");
    artistasMobileMenu.classList.toggle("flex");
  });
}
