const magicCanvas = document.createElement("canvas");
magicCanvas.id = "magicCanvas";
magicCanvas.style.position = "fixed";
magicCanvas.style.top = "0";
magicCanvas.style.left = "0";
magicCanvas.style.width = "100vw";
magicCanvas.style.height = "100vh";
magicCanvas.style.pointerEvents = "none";
magicCanvas.style.zIndex = "9995";
document.body.appendChild(magicCanvas);

const magicCtx = magicCanvas.getContext("2d");
let particles = [];

function initMagic() {
  magicCanvas.width = window.innerWidth;
  magicCanvas.height = window.innerHeight;
  particles = Array.from({ length: 75 }, () => ({
    x: Math.random() * magicCanvas.width,
    y: Math.random() * magicCanvas.height,
    size: Math.random() * 2 + 1,
    speedY: Math.random() * 0.3 + 0.1,
    glow: `rgba(${150 + Math.random()*100}, ${50 + Math.random()*100}, 255, 0.6)`
  }));
}

function drawMagic() {
  magicCtx.clearRect(0, 0, magicCanvas.width, magicCanvas.height);
  particles.forEach(p => {
    magicCtx.beginPath();
    magicCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    magicCtx.fillStyle = p.glow;
    magicCtx.fill();
    p.y -= p.speedY;
    if (p.y < -p.size) p.y = magicCanvas.height + p.size;
  });
  requestAnimationFrame(drawMagic);
}

window.addEventListener("resize", initMagic);
initMagic();
drawMagic();
