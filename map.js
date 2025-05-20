<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Elden Paths™ World Map</title>
  <style>
    canvas { border: 1px solid black; display: block; margin: 20px auto; }
    .lore-popup {
      position: absolute;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #fff;
      padding: 12px 16px;
      border: 2px solid #333;
      font-family: serif;
      max-width: 300px;
      box-shadow: 2px 2px 8px rgba(0,0,0,0.3);
      z-index: 10;
    }
  </style>
</head>
<body>

<canvas id="mapCanvas" width="800" height="800"></canvas>

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

let player = { x: 5, y: 5 };

let tile_index = {}; // will be filled with Fog data
let tile_meta = {};  // terrain info
let trails = [];     // trail segments

function loadJSON(path) {
  return fetch(path).then(res => res.json());
}

async function loadData() {
  [tile_index, tile_meta, trails] = await Promise.all([
    loadJSON('data/tile_index.json'),
    loadJSON('data/tile_meta.json'),
    loadJSON('data/trails.json')
  ]);
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

loadData();
</script>

</body>
</html>
