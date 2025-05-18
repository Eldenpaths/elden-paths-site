let fogVisible = true;
let trailsVisible = true;
let topoVisible = false;

const mapEl = document.getElementById("map");
const lorePanel = document.getElementById("lorePanel");

const baseMap = "assets/maps/parchment_map_tillamook.png";
const fogOverlay = "assets/maps/fog_overlay.png";
const trailOverlay = "assets/maps/trails_overlay.png";
const topoOverlay = "assets/maps/topo_overlay.png";

let tileData = {};

function loadMap() {
  mapEl.style.backgroundImage = `url('${baseMap}')`;
  fetch("assets/data/tile_index.json")
    .then(res => res.json())
    .then(data => {
      tileData = data;
      drawFogTiles();
    });
}

function toggleFog() {
  fogVisible = !fogVisible;
  drawFogTiles();
}

function toggleTrails() {
  trailsVisible = !trailsVisible;
  updateMap();
}

function toggleTopo() {
  topoVisible = !topoVisible;
  updateMap();
}

function updateMap() {
  let layersToShow = [`url('${baseMap}')`];
  if (topoVisible) layersToShow.push(`url('${topoOverlay}')`);
  if (trailsVisible) layersToShow.push(`url('${trailOverlay}')`);
  if (!fogVisible) mapEl.querySelectorAll(".fog-tile").forEach(el => el.style.display = "none");
  else mapEl.querySelectorAll(".fog-tile").forEach(el => el.style.display = "block");
  mapEl.style.backgroundImage = layersToShow.reverse().join(', ');
}

function handleMapClick(event) {
  const x = Math.floor((event.offsetX / mapEl.clientWidth) * 10) - 5;
  const y = Math.floor((event.offsetY / mapEl.clientHeight) * 10) - 5;
  const key = `${x}_${y}`;
  const tile = tileData[key];

  if (tile) {
    lorePanel.innerHTML = `<strong>${tile.name}</strong><br><em>${tile.terrain}</em><br><p>${tile.lore}</p>`;
    lorePanel.style.display = "block";
  } else {
    lorePanel.style.display = "none";
  }
}

function drawFogTiles() {
  const discovered = JSON.parse(localStorage.getItem("elden_discovered") || "[]");
  const size = 10;
  mapEl.querySelectorAll(".fog-tile").forEach(el => el.remove());

  for (let x = -5; x < 5; x++) {
    for (let y = -5; y < 5; y++) {
      const key = `${x}_${y}`;
      if (!discovered.includes(key)) {
        const fog = document.createElement("div");
        fog.className = "fog-tile";
        fog.style.position = "absolute";
        fog.style.left = `${(x + 5) * 10}%`;
        fog.style.top = `${(y + 5) * 10}%`;
        fog.style.width = "10%";
        fog.style.height = "10%";
        fog.style.background = "rgba(0,0,0,0.8)";
        fog.style.pointerEvents = "none";
        fog.style.zIndex = 5;
        mapEl.appendChild(fog);
      }
    }
  }
}

loadMap();
