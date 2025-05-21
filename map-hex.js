
const canvas = document.getElementById("hexMap");
const ctx = canvas.getContext("2d");

let zoom = 1;
let offsetX = 0;
let offsetY = 0;
let dragging = false;
let dragStart = { x: 0, y: 0 };
let size = 30;

canvas.addEventListener("wheel", (e) => {
  e.preventDefault();
  zoom += e.deltaY * -0.001;
  zoom = Math.min(Math.max(0.5, zoom), 3);
  draw();
});
canvas.addEventListener("mousedown", (e) => {
  dragging = true;
  dragStart.x = e.clientX;
  dragStart.y = e.clientY;
});
canvas.addEventListener("mouseup", () => dragging = false);
canvas.addEventListener("mousemove", (e) => {
  if (dragging) {
    offsetX += (e.clientX - dragStart.x);
    offsetY += (e.clientY - dragStart.y);
    dragStart.x = e.clientX;
    dragStart.y = e.clientY;
    draw();
  }
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const range = 10;
  for (let q = -range; q <= range; q++) {
    for (let r = -range; r <= range; r++) {
      const { x, y } = hexToPixel(q, r, size * zoom);
      drawHex(ctx, x + canvas.width/2 + offsetX, y + canvas.height/2 + offsetY, size * zoom, "#334");
    }
  }
  // draw player
  const { x, y } = hexToPixel(0, 0, size * zoom);
  ctx.beginPath();
  ctx.arc(x + canvas.width/2 + offsetX, y + canvas.height/2 + offsetY, 6, 0, 2 * Math.PI);
  ctx.fillStyle = "#FFD700";
  ctx.fill();
}
draw();
