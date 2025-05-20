const tileImages = {};
const TILE_SIZE = 64;
let tileMeta = {};

function loadTileMeta(callback) {
  fetch("tile_meta.json")
    .then(response => response.json())
    .then(data => {
      Object.assign(tileMeta, data);
      callback();
    });
}

function preloadTileImages(callback) {
  const types = new Set(Object.values(tileMeta));
  let loaded = 0;
  const total = types.size;

  types.forEach(type => {
    const img = new Image();
    img.src = `assets/img/tiles/${type}`;
    img.onload = () => {
      tileImages[type] = img;
      loaded++;
      if (loaded === total) callback();
    };
    img.onerror = () => {
      console.warn(`⚠️ Missing tile image for: ${type}`);
      loaded++;
      if (loaded === total) callback();
    };
  });
}

function drawTileMap() {
  for (let y = 0; y < tileIndex.length; y++) {
    for (let x = 0; x < tileIndex[y].length; x++) {
      const tileType = tileIndex[y][x];
      const tileName = tileMeta[tileType];
      const tileImg = tileImages[tileName];
      if (tileImg) {
        ctx.drawImage(tileImg, x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      }
    }
  }
}
