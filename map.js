<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Elden Paths™ World Map</title>
  <style>
    canvas {
      border: 1px solid black;
      display: block;
      margin: 20px auto;
    }
    .lore-popup, .hover-popup {
      position: absolute;
      background: #fff;
      padding: 10px;
      border: 1px solid #333;
      font-family: serif;
      max-width: 300px;
      box-shadow: 2px 2px 8px rgba(0,0,0,0.3);
      z-index: 10;
    }
    .lore-popup {
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
    }
    .hover-popup {
      pointer-events: none;
      font-size: 12px;
    }
  </style>
</head>
<body>

<h1 style="text-align:center; color:#fce5c0; font-family:Georgia, serif;">Welcome to Elden Paths™</h1>
<p style="text-align:center; color:#fce5c0;">Loading the world map and your adventure...</p>
<canvas id="mapCanvas" width="800" height="800">Map Canvas Active</canvas>

<div id="trail-legend" style="position:absolute;bottom:10px;left:10px;background:#eee;padding:10px;border:1px solid #333;">
  <b>Trail Legend:</b><br>
  <span style="color:brown">─</span> Historic Trail<br>
  <span style="color:green">─</span> Player-Made Trail<br>
  <span style="color:gray">─</span> Animal Path<br>
</div>

<script>
const canvas = document.getElementById('mapCanvas');
const ctx = canvas.getContext('2d');
const tileSize = 40;

let tile_index = {};
let tile_meta = {};
let trails = [];
let markers = {};
let player = { x: 0, y: 0 };

async function loadJSON(path) {
  const res = await fetch(path);
  return res.json();
}

async function loadData() {
  [tile_index, tile_meta, trails, markers, playerData] = await Promise.all([
    loadJSON('data/tile_index.json'),
    loadJSON('data/tile_meta.json'),
    loadJSON('data/trails.json'),
    loadJSON('data/tile_markers.json'),
    loadJSON('data/players.json')
  ]);
  player = Object.values(playerData)[0] || { x: 0, y: 0 };
  drawMap();
}

function drawMap() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const cols = canvas.width / tileSize;
  const rows = canvas.height / tileSize;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const key = `${x},${y}`;
      const known = tile_index[key]?.fog === false;
      const terrain = tile_meta[key]?.terrain || 'unknown';
      ctx.fillStyle = known ? terrainColor(terrain) : '#000';
      ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);

      // Marker icons
      if (known && markers[key]) {
        drawMarkerIcon(x, y, markers[key].type);
      }

      // Player highlight
      if (player.x === x && player.y === y) {
        ctx.strokeStyle = '#ff0';
        ctx.lineWidth = 2;
        ctx.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
      }
    }
  }

  drawTrails();
}

function drawMarkerIcon(x, y, type) {
  ctx.fillStyle = {
    city: '#2E8B57',
    relic: '#8B0000',
    quest: '#4169E1'
  }[type] || '#ccc';
  ctx.beginPath();
  ctx.arc(x * tileSize + tileSize/2, y * tileSize + tileSize/2, 6, 0, 2 * Math.PI);
  ctx.fill();
}

function terrainColor(type) {
  switch(type) {
    case 'forest': return '#228B22';
    case 'mountain': return '#888';
    case 'water': return '#1E90FF';
    case 'plains': return '#DAA520';
    default: return '#444';
  }
}

function drawTrails() {
  for (let trail of trails) {
    ctx.beginPath();
    for (let i = 0; i < trail.path.length - 1; i++) {
      const [x1, y1] = trail.path[i];
      const [x2, y2] = trail.path[i + 1];
      ctx.moveTo(x1 * tileSize + tileSize/2, y1 * tileSize + tileSize/2);
      ctx.lineTo(x2 * tileSize + tileSize/2, y2 * tileSize + tileSize/2);
    }
    switch(trail.type) {
      case 'historic': ctx.strokeStyle = 'brown'; break;
      case 'player': ctx.strokeStyle = 'green'; break;
      case 'animal': ctx.strokeStyle = 'gray'; break;
      default: ctx.strokeStyle = '#ccc';
    }
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

// Lore popup on click
canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((e.clientX - rect.left) / tileSize);
  const y = Math.floor((e.clientY - rect.top) / tileSize);
  const key = `${x},${y}`;
  const tile = tile_index[key];
  if (tile && tile.fog === false && tile.lore) {
    showLorePopup(tile.lore);
  }
});

function showLorePopup(text) {
  const popup = document.createElement('div');
  popup.className = 'lore-popup';
  popup.innerHTML = `<p>${text}</p>`;
  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 6000);
}

// Hover terrain/lore preview
let hoverPopup = null;

canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((e.clientX - rect.left) / tileSize);
  const y = Math.floor((e.clientY - rect.top) / tileSize);
  const key = `${x},${y}`;
  const tile = tile_index[key];
  const terrain = tile_meta[key]?.terrain;
  const lore = tile?.lore;

  if (hoverPopup) hoverPopup.remove();
  hoverPopup = document.createElement('div');
  hoverPopup.className = 'hover-popup';
  hoverPopup.style.left = `${e.clientX + 10}px`;
  hoverPopup.style.top = `${e.clientY + 10}px`;
  hoverPopup.innerHTML = `
    <b>(${x},${y})</b><br>
    ${terrain ? `Terrain: ${terrain}<br>` : ''}
    ${tile?.fog === false && lore ? `🧾 ${lore}` : ''}
  `;
  document.body.appendChild(hoverPopup);
});

canvas.addEventListener('mouseleave', () => {
  if (hoverPopup) hoverPopup.remove();
});

loadData();
</script>

</body>
</html>
