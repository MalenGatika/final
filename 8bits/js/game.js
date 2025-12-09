// -------------------------------------
// SPACE MINI — Versión PRO con DOS NIVELES
// -------------------------------------

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// UI
const scoreUI = document.getElementById("score");
const livesUI = document.getElementById("lives");

let gameRunning = false;
let score = 0;
let lives = 3;
let level = 1;

// Sonidos
const shootSound = new Audio("../js/sounds/shoot.mp3");
const explodeSound = new Audio("../js/sounds/explode.mp3");

// -------------------------
// Fondo animado
// -------------------------
const stars = [];
for (let i = 0; i < 70; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2,
    speed: 0.5 + Math.random() * 1
  });
}

function drawStars() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  stars.forEach(s => {
    ctx.fillRect(s.x, s.y, s.size, s.size);
    s.y += s.speed;

    if (s.y > canvas.height) {
      s.y = 0;
      s.x = Math.random() * canvas.width;
    }
  });
}

// -------------------------
// Jugador
// -------------------------
const player = {
  x: canvas.width / 2 - 20,
  y: canvas.height - 60,
  width: 40,
  height: 20,
  speed: 6,
  dx: 0
};

function drawPlayer() {
  ctx.fillStyle = "#00ffff";
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function movePlayer() {
  player.x += player.dx;
  if (player.x < 0) player.x = 0;
  if (player.x + player.width > canvas.width)
    player.x = canvas.width - player.width;
}

// -------------------------
// Balas
// -------------------------
let bullets = [];

function shoot() {
  bullets.push({
    x: player.x + player.width / 2 - 2,
    y: player.y,
    width: 4,
    height: 12,
    speed: 7
  });

  shootSound.currentTime = 0;
  shootSound.play();
}

function drawBullets() {
  ctx.fillStyle = "#ff00c8";

  bullets.forEach((b, i) => {
    b.y -= b.speed;
    ctx.fillRect(b.x, b.y, b.width, b.height);

    if (b.y < 0) bullets.splice(i, 1);
  });
}

// -------------------------
// Enemigos
// -------------------------
let enemies = [];
let enemyDirection = 1;
let enemySpeed = 0.8;

const enemySize = 30;

function createEnemies(rows, cols, spacingX, spacingY, startY) {
  enemies = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      enemies.push({
        x: 40 + c * spacingX,
        y: startY + r * spacingY,
        width: enemySize,
        height: enemySize,
        alive: true
      });
    }
  }
}

function moveEnemies() {
  let edge = false;

  enemies.forEach(e => {
    if (!e.alive) return;

    e.x += enemySpeed * enemyDirection;

    if (e.x < 10 || e.x + e.width > canvas.width - 10) {
      edge = true;
    }
  });

  if (edge) {
    enemyDirection *= -1;
    enemies.forEach(e => (e.y += 20));
  }
}

function drawEnemies() {
  ctx.fillStyle = "#ffffff";

  enemies.forEach(e => {
    if (e.alive) {
      ctx.fillRect(e.x, e.y, e.width, e.height);
    }
  });
}

// -------------------------
// Explosiones
// -------------------------
let explosions = [];

function createExplosion(x, y) {
  explosions.push({
    x,
    y,
    size: 1,
    max: 12
  });

  explodeSound.currentTime = 0;
  explodeSound.play();
}

function drawExplosions() {
  ctx.fillStyle = "#ff4040";

  explosions.forEach((ex, i) => {
    ctx.beginPath();
    ctx.arc(ex.x, ex.y, ex.size, 0, Math.PI * 2);
    ctx.fill();

    ex.size += 1.5;

    if (ex.size > ex.max) explosions.splice(i, 1);
  });
}

// -------------------------
// Colisiones
// -------------------------
function checkCollisions() {
  bullets.forEach((b, bi) => {
    enemies.forEach(e => {
      if (
        e.alive &&
        b.x < e.x + e.width &&
        b.x + b.width > e.x &&
        b.y < e.y + e.height &&
        b.y + b.height > e.y
      ) {
        e.alive = false;
        bullets.splice(bi, 1);

        score += (level === 1 ? 100 : 150);
        scoreUI.textContent = "Puntaje: " + score;

        createExplosion(e.x + e.width / 2, e.y + e.height / 2);
      }
    });
  });
}

// -------------------------
// GAME OVER
// -------------------------
function checkGameOver() {
  for (let e of enemies) {
    if (e.alive && e.y + e.height >= player.y) {
      endGame();
      return;
    }
  }
}

function endGame() {
  gameRunning = false;

  document.getElementById("gameOverScreen").classList.add("active");
  document.getElementById("finalScore").textContent =
    "Tu puntaje final fue: " + score;
}

// -------------------------
// WIN CHECK
// -------------------------
function checkWin() {
  const allDead = enemies.every(e => !e.alive);

  if (allDead) {

    // Pasar al nivel 2
    if (level === 1) {
      level = 2;
      startLevel2();
      return;
    }

    // Victoria final del juego
    gameRunning = false;

    document.getElementById("winScreen").classList.add("active");
    document.getElementById("winScore").textContent =
      "Puntaje total: " + score;
  }
}

// -------------------------
// Loop principal
// -------------------------
function update() {
  if (!gameRunning) return;

  drawStars();
  movePlayer();
  moveEnemies();

  drawPlayer();
  drawBullets();
  drawEnemies();
  drawExplosions();

  checkCollisions();
  checkGameOver();
  checkWin();

  requestAnimationFrame(update);
}

// -------------------------
// Controles
// -------------------------
document.addEventListener("keydown", (e) => {
  if (!gameRunning) return;

  if (e.key === "ArrowLeft") player.dx = -player.speed;
  if (e.key === "ArrowRight") player.dx = player.speed;
  if (e.key === " " || e.key === "Spacebar") shoot();
});

document.addEventListener("keyup", () => {
  player.dx = 0;
});

// -------------------------
// INICIO — NIVEL 1
// -------------------------
document.getElementById("startBtn").onclick = () => {
  document.getElementById("startScreen").classList.remove("active");

  score = 0;
  lives = 3;
  level = 1;

  scoreUI.textContent = "Puntaje: 0";
  livesUI.textContent = "Vidas: 3";

  enemySpeed = 0.8;
  enemyDirection = 1;

  createEnemies(4, 6, 60, 40, 40);

  gameRunning = true;
  update();
};

// -------------------------
// NIVEL 2
// -------------------------
function startLevel2() {
  enemySpeed = 1.5;
  enemyDirection = 1;

  createEnemies(5, 8, 50, 35, 30);

  scoreUI.textContent = "Puntaje: " + score + " (Nivel 2)";
  livesUI.textContent = "Vidas: " + lives;

  gameRunning = true;
  update();
}

// -------------------------
// REINICIAR
// -------------------------
document.getElementById("restartBtn").onclick = () => {
  document.getElementById("gameOverScreen").classList.remove("active");

  score = 0;
  lives = 3;
  level = 1;

  scoreUI.textContent = "Puntaje: 0";
  livesUI.textContent = "Vidas: 3";

  enemySpeed = 0.8;
  enemyDirection = 1;

  createEnemies(4, 6, 60, 40, 40);

  gameRunning = true;
  update();
};
document.getElementById("winRestart").onclick = () => {
  document.getElementById("winScreen").classList.remove("active");

  score = 0;
  lives = 3;
  level = 1;

  scoreUI.textContent = "Puntaje: 0";
  livesUI.textContent = "Vidas: 3";

  enemySpeed = 0.8;
  enemyDirection = 1;
  bullets = [];
  explosions = [];

  createEnemies(4, 6, 60, 40, 40);

  gameRunning = true;
  update();
};

document.getElementById("btnLeft").addEventListener("touchstart", () => {
  if (!gameRunning) return;
  player.dx = -player.speed;
});

document.getElementById("btnRight").addEventListener("touchstart", () => {
  if (!gameRunning) return;
  player.dx = player.speed;
});

document.getElementById("btnShoot").addEventListener("touchstart", () => {
  if (!gameRunning) return;
  shoot();
});

document.getElementById("btnLeft").addEventListener("touchend", () => {
  player.dx = 0;
});
document.getElementById("btnRight").addEventListener("touchend", () => {
  player.dx = 0;
});
