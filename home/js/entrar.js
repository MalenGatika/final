document.addEventListener("DOMContentLoaded", () => {
  const entrar = document.getElementById("entrar");

  function fadeAndGo() {
    document.body.style.transition = "opacity 0.8s";
    document.body.style.opacity = "0";

    setTimeout(() => {
      window.location.href = "home/index.html"; 
    }, 800);
  }

  entrar.addEventListener("click", fadeAndGo);
});
