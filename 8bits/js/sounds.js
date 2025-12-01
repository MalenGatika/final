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
      "p-6 border border-white/20 rounded-xl hover:bg-white/10 cursor-pointer transition";

    div.innerHTML = `
      <h3 class="font-semibold text-xl mb-2">${s.nombre}</h3>
      <p class="opacity-70 text-sm">Click para reproducir</p>
    `;

    const audio = new Audio(`./audio/${s.archivo}`);

    div.addEventListener("click", () => {
      audio.currentTime = 0;
      audio.play();
    });

    contenedor.appendChild(div);
  });
});