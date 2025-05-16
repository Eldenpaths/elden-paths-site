// Snow Overlay
const snowCanvas = document.createElement("canvas");
snowCanvas.id = "snowCanvas";
snowCanvas.style.position = "fixed";
snowCanvas.style.top = "0";
snowCanvas.style.left = "0";
snowCanvas.style.width = "100vw";
snowCanvas.style.height = "100vh";
snowCanvas.style.pointerEvents = "none";
snowCanvas.style.zIndex = "9999";
document.body.appendChild(snowCanvas);

const ctx = snowCanvas.getContext("2d");
let snowflakes = [];

function initSnowflakes() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  snowCanvas.width = width;
  snowCanvas.height = height;

  snowflakes = Array.from({ length: 100 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 3 + 1,
    speedY: Math.random() * 1 + 0.5,
    driftX: (Math.random() - 0.5) * 0.5
  }));
}

function drawSnowflakes() {
  ctx.clearRect(0, 0, snowCanvas.width, snowCanvas.height);
  ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
  snowflakes.forEach(flake => {
    ctx.beginPath();
    ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
    ctx.fill();
    flake.y += flake.speedY;
    flake.x += flake.driftX;

    if (flake.y > snowCanvas.height) flake.y = -flake.radius;
    if (flake.x > snowCanvas.width) flake.x = 0;
    if (flake.x < 0) flake.x = snowCanvas.width;
  });

  requestAnimationFrame(drawSnowflakes);
}

window.addEventListener("resize", initSnowflakes);
initSnowflakes();
drawSnowflakes();
