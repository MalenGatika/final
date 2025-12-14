// --------------------------------------------------
// DATOS DE KATE BUSH
// --------------------------------------------------

const songData = {
  title: "Running Up That Hill",
  artist: "Kate Bush",
  versions: [
    { name: "Original (Kate Bush)", file: "./audios/kate.mp3" },
    { name: "Meg Myers", file: "./audios/cover1.mp3" },
    { name: "Placebo", file: "./audios/cover2.mp3" },
    { name: "Chromatics", file: "./audios/cover3.mp3" }
  ]
};

// --------------------------------------------------
// AL CARGAR LA PÁGINA
// --------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {

  // Título y artista
  document.getElementById("songTitle").textContent = songData.title;
  document.getElementById("songArtist").textContent = songData.artist;

  // Reproductor principal
  const mainPlayer = document.getElementById("mainPlayer");
  mainPlayer.src = songData.versions[0].file;

  // Botones de versiones
  document.querySelectorAll(".versionBtn").forEach((btn, i) => {
    btn.textContent = songData.versions[i].name;
    btn.addEventListener("click", () => {
      mainPlayer.src = songData.versions[i].file;
      mainPlayer.play();
      setupVisualizer(mainPlayer);
    });
  });

  // Visualizador
  mainPlayer.addEventListener("play", () => {
    setupVisualizer(mainPlayer);
    if (audioContext && audioContext.state === "suspended") {
      audioContext.resume();
    }
  });

  // Mini juego
  setupGame(songData.versions);

  // Efecto neón
  neonifyButtons();
});


// --------------------------------------------------
// MINI–JUEGO “Adiviná la versión”
// --------------------------------------------------

function setupGame(versions) {
  const gamePlayer = document.getElementById("gamePlayer");
  const gameOptions = document.getElementById("gameOptions");
  const gameResult = document.getElementById("gameResult");

  const correctIndex = Math.floor(Math.random() * versions.length);
  gamePlayer.src = versions[correctIndex].file;

  gameOptions.innerHTML = "";

  versions.forEach((v, i) => {
    const btn = document.createElement("button");
    btn.textContent = v.name;
    btn.className = "btn-primary p-2 rounded-xl";
    btn.onclick = () => {
      gameResult.textContent =
        i === correctIndex ? "¡Correcto!" : "Nope, probá otra vez.";
    };
    gameOptions.appendChild(btn);
  });
}


// --------------------------------------------------
// VISUALIZADOR NEÓN
// --------------------------------------------------

const canvas = document.getElementById("audio-visualizer");
const ctx = canvas.getContext("2d");

let audioContext;
let analyser;
let dataArray;

function setupVisualizer(audioElement) {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  analyser = audioContext.createAnalyser();
  analyser.fftSize = 256;

  const source = audioContext.createMediaElementSource(audioElement);
  source.connect(analyser);
  analyser.connect(audioContext.destination);

  dataArray = new Uint8Array(analyser.frequencyBinCount);

  visualize();
}

function visualize() {
  requestAnimationFrame(visualize);
  if (!analyser) return;

  analyser.getByteFrequencyData(dataArray);

  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "lighter";

  const barWidth = (canvas.width / dataArray.length) * 1.6;
  let x = 0;

  dataArray.forEach((value, i) => {
    const barHeight = value * 0.7;
    const hue = i * 3;

    ctx.fillStyle = `hsl(${hue}, 80%, 60%)`;
    ctx.shadowColor = `hsl(${hue}, 100%, 70%)`;
    ctx.shadowBlur = 20;

    ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
    ctx.shadowBlur = 0;

    x += barWidth + 1;
  });

  ctx.globalCompositeOperation = "source-over";
}


// --------------------------------------------------
// EFECTO NEÓN
// --------------------------------------------------

function neonifyButtons() {
  document.querySelectorAll(".btn-primary").forEach(btn => {
    btn.style.boxShadow = "0 0 12px rgba(255, 0, 150, 0.7)";
    btn.style.transition = "0.25s";

    btn.addEventListener("mouseenter", () => {
      btn.style.boxShadow =
        "0 0 20px rgba(255, 0, 150, 1), 0 0 35px rgba(255, 0, 150, 0.9)";
      btn.style.transform = "scale(1.05)";
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.boxShadow = "0 0 12px rgba(255, 0, 150, 0.7)";
      btn.style.transform = "scale(1)";
    });
  });
}
