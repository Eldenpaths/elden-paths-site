let fogVisible = true;
let trailsVisible = true;
let topoVisible = false;

const mapEl = document.getElementById("map");

const baseMap = "assets/maps/parchment_map_tillamook.png";
const fogOverlay = "assets/maps/fog_overlay.png";
const trailOverlay = "assets/maps/trails_overlay.png";
const topoOverlay = "assets/maps/topo_overlay.png";

const layers = {
  base: baseMap,
  fog: fogOverlay,
  trails: trailOverlay,
  topo: topoOverlay,
};

function loadMap() {
  mapEl.style.backgroundImage = `url('${baseMap}')`;
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

loadMap();
