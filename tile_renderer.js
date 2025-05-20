const tileImages = {};
const TILE_SIZE = 64;
let tileMeta = {};

// Load tile metadata from JSON
function loadTileMeta(callback) {
  fetch("tile_meta.json")
    .then((response) => response.json())
    .then((data) => {
      Object.assign(tileMeta, data);
      callback();
    });
}

// Load tile images based on metadata types
function preloadTileImages(callback) {
  const types = new Set(Object.values(tileMeta));
  let loaded = 0;
  const total = types.size;

  types.forEach((type) => {
    const img = new Image();
    img.src = `assets/img/tiles/${type}_tile.png`;

    img.onload = () => {
      tileImages[type] = img;
      loaded++;
      if (loaded === total) callback();
    };

    img.onerror = () => {
      console.warn(`⚠️ Missing tile image for: ${type}_tile.png`);
      loaded++;
      if (loaded === total) callback();
    };
  });
}

// Render map using loaded tiles
function drawTileMap() {
  for (let y = 0; y < tileIndex.length; y++) {
    for (let x = 0; x < tileIndex[y].length; x++) {
      const type = tileIndex[y][x];
      const img = tileImages[type];
      if (img) {
        ctx.drawImage(img, x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      }
    }
  }
}

// Make these functions globally accessible
window.preloadTileImages = preloadTileImages;
window.loadTileMeta = loadTileMeta;
