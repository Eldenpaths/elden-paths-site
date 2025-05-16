const heatCanvas = document.createElement("canvas");
heatCanvas.id = "heatCanvas";
heatCanvas.style.position = "fixed";
heatCanvas.style.top = "0";
heatCanvas.style.left = "0";
heatCanvas.style.width = "100vw";
heatCanvas.style.height = "100vh";
heatCanvas.style.pointerEvents = "none";
heatCanvas.style.zIndex = "9996";
document.body.appendChild(heatCanvas);

const heatCtx = heatCanvas.getContext("2d");
let heatWaves = [];

function initHeat() {
  heatCanvas.width = window.innerWidth;
  heatCanvas.height = window.innerHeight;
  heatWaves = Array.from({ length: 50 }, () => ({
    x: Math.random() * heatCanvas.width,
    y: Math.random() * heatCanvas.height,
    w: 20 + Math.random() * 40,
    h: 2,
    offset: 0,
    speed: Math.random() * 1 + 0.5
  }));
}

function drawHeat() {
  heatCtx.clearRect(0, 0, heatCanvas.width, heatCanvas.height);
  heatCtx.strokeStyle = "rgba(255,255,255,0.07)";
  heatWaves.forEach(wave => {
    wave.offset += wave.speed;
    heatCtx.beginPath();
    heatCtx.moveTo(wave.x, wave.y + Math.sin(wave.offset) * 3);
    heatCtx.lineTo(wave.x + wave.w, wave.y + Math.sin(wave.offset + 1) * 3);
    heatCtx.stroke();

    wave.y += 0.2;
    if (wave.y > heatCanvas.height) {
      wave.y = -wave.h;
      wave.x = Math.random() * heatCanvas.width;
    }
  });
  requestAnimationFrame(drawHeat);
}

window.addEventListener("resize", initHeat);
initHeat();
drawHeat();
