document.addEventListener("DOMContentLoaded", () => {
  const vinilo = document.getElementById("vinilo");
  const entrar = document.getElementById("entrar");

  function fadeAndGo() {
    document.body.style.transition = "opacity 0.8s";
    document.body.style.opacity = "0";

    setTimeout(() => {
      window.location.href = "/home/index.html";
    }, 800);
  }

  vinilo.addEventListener("click", fadeAndGo);
  entrar.addEventListener("click", fadeAndGo);
});
