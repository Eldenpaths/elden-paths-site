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

function terrainColor(type
