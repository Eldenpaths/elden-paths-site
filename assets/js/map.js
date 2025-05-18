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
    });
}

function toggleFog() {
  fogVisible = !fogVisible;
  updateMap();
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
  if (fogVisible) layersToShow.push(`url('${fogOverlay}')`);
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

loadMap();
