// Glyph Motion System - Animated Ink Layer Engine
const canvas = document.getElementById('mapCanvas');
const ctx = canvas.getContext('2d');

function animateGlyph(x, y, type) {
  ctx.save();
  ctx.translate(x, y);
  ctx.globalAlpha = 0.5;
  ctx.strokeStyle = '#3a2d1f';
  ctx.lineWidth = 1.5;

  switch(type) {
    case 'sword_clash':
      ctx.beginPath();
      ctx.moveTo(-3, -3);
      ctx.lineTo(3, 3);
      ctx.moveTo(3, -3);
      ctx.lineTo(-3, 3);
      ctx.stroke();
      break;
    case 'mist':
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI * 2);
      ctx.stroke();
      break;
    case 'bind_glyph':
      ctx.beginPath();
      ctx.moveTo(0, -4);
      ctx.lineTo(0, 4);
      ctx.moveTo(-4, 0);
      ctx.lineTo(4, 0);
      ctx.stroke();
      break;
  }

  ctx.restore();
}