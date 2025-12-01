document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");

  btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });
});