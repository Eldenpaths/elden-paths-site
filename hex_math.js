
function hexToPixel(q, r, size) {
  const x = size * (3/2 * q);
  const y = size * (Math.sqrt(3) * (r + q / 2));
  return { x, y };
}
function drawHex(ctx, x, y, size, fill) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = Math.PI / 180 * (60 * i - 30);
    const px = x + size * Math.cos(angle);
    const py = y + size * Math.sin(angle);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.strokeStyle = "#222";
  ctx.stroke();
}
