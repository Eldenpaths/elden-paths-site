function initGame() {
  const root = document.getElementById('game-root');
  const canvas = document.getElementById('mapCanvas');
  const ctx = canvas.getContext('2d');

  // Just a test: draw background
  ctx.fillStyle = '#f0e6d2';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw test text
  ctx.fillStyle = '#333';
  ctx.font = '20px Garamond';
  ctx.fillText('Welcome to Elden Paths', 50, 100);

  // Show feedback
  root.innerHTML += "<p>🗺️ Game initialized from <strong>play.js</strong>.</p>";
}
