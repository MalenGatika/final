document.addEventListener("DOMContentLoaded", () => {
  const sounds = [
    { nombre: "Game Boy – Jump", archivo: "gb_jump.mp3" },
    { nombre: "NES – Coin", archivo: "nes_coin.mp3" },
    { nombre: "Atari – Explosion", archivo: "atari_explosion.mp3" },
    { nombre: "PC Speaker – Beep", archivo: "pc_beep.mp3" }
  ];

  const contenedor = document.getElementById("soundGrid");

  sounds.forEach(s => {
    const div = document.createElement("div");
    div.className =
      "p-6 border border-white/20 rounded-xl hover:bg-white/10 transition flex items-center justify-between";

    div.innerHTML = `
      <div>
        <h3 class="font-semibold text-xl">${s.nombre}</h3>
        <p class="opacity-70 text-sm">Click para reproducir</p>
      </div>

      <button class="play-btn p-3 rounded-full border border-white/30 hover:bg-white/20 transition">
        <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z"/>
        </svg>
      </button>
    `;

    const audio = new Audio(`./audio/${s.archivo}`);

    // Al hacer click en TODO el bloque
    div.addEventListener("click", () => {
      audio.currentTime = 0;
      audio.play();
    });

    contenedor.appendChild(div);
  });
});
