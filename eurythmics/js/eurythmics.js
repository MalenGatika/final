// BASE DE CANCIONES
const tracks = [
  { name: "Original", file: "../../song/original.mp3" },
  { name: "Cover 1", file: "../../song/cover1.mp3" },
  { name: "Cover 2", file: "../../song/cover2.mp3" },
  { name: "Cover 3", file: "../../song/cover3.mp3" }
];

const mainPlayer = document.getElementById("mainPlayer");
const trackButtons = document.querySelectorAll("#trackButtons button");

trackButtons.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    mainPlayer.src = tracks[i].file;
    mainPlayer.play();
    setupVisualizer(mainPlayer);
  });
});

// VISUALIZADOR
const canvas = document.getElementById("audio-visualizer");
const ctx = canvas.getContext("2d");

let audioContext, analyser, dataArray;

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

  ctx.globalCompositeOperation = "lighter";
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const barWidth = (canvas.width / dataArray.length) * 1.6;
  let x = 0;

  for (let i = 0; i < dataArray.length; i++) {
    const barHeight = dataArray[i] * 0.7;
    // Colores synth-pop: morado a azul
    const hue = 240 - i * 2;

    ctx.fillStyle = `hsl(${hue}, 80%, 60%)`;
    ctx.shadowColor = `hsl(${hue}, 100%, 70%)`;
    ctx.shadowBlur = 20;

    ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
    ctx.shadowBlur = 0;
    x += barWidth + 1;
  }

  ctx.globalCompositeOperation = "source-over";
}
