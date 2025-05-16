const rainCanvas = document.createElement("canvas");
rainCanvas.id = "rainCanvas";
rainCanvas.style.position = "fixed";
rainCanvas.style.top = "0";
rainCanvas.style.left = "0";
rainCanvas.style.width = "100vw";
rainCanvas.style.height = "100vh";
rainCanvas.style.pointerEvents = "none";
rainCanvas.style.zIndex = "9997";
document.body.appendChild(rainCanvas);

const rainCtx = rainCanvas.getContext("2d");
let rainDrops = [];

function initRain() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  rainCanvas.width = w;
  rainCanvas.height = h;

  rainDrops = Array.from({ length: 150 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    length: Math.random() * 20 + 10,
    speedY: Math.random() * 4 + 4,
    driftX: -1
  }));
}

function drawRain() {
  rainCtx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
  rainCtx.strokeStyle = "rgba(180,180,255,0.4)";
  rainCtx.lineWidth = 1;

  rainDrops.forEach(d => {
    rainCtx.beginPath();
    rainCtx.moveTo(d.x, d.y);
    rainCtx.lineTo(d.x + d.driftX, d.y + d.length);
    rainCtx.stroke();

    d.y += d.speedY;
    d.x += d.driftX;

    if (d.y > rainCanvas.height) {
      d.y = -d.length;
      d.x = Math.random() * rainCanvas.width;
    }
  });

  requestAnimationFrame(drawRain);
}

window.addEventListener("resize", initRain);
initRain();
drawRain();
