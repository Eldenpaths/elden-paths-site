const fogCanvas = document.createElement("canvas");
fogCanvas.id = "fogCanvas";
fogCanvas.style.position = "fixed";
fogCanvas.style.top = "0";
fogCanvas.style.left = "0";
fogCanvas.style.width = "100vw";
fogCanvas.style.height = "100vh";
fogCanvas.style.pointerEvents = "none";
fogCanvas.style.zIndex = "9998";
document.body.appendChild(fogCanvas);

const fogCtx = fogCanvas.getContext("2d");
let fogPuffs = [];

function initFog() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  fogCanvas.width = w;
  fogCanvas.height = h;

  fogPuffs = Array.from({ length: 30 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    radius: Math.random() * 200 + 100,
    speedX: Math.random() * 0.5 - 0.25,
    opacity: Math.random() * 0.15 + 0.05
  }));
}

function drawFog() {
  fogCtx.clearRect(0, 0, fogCan
