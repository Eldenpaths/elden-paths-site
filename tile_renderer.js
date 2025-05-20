const TILE_FOLDER = "assets/img/tiles/";
const tileImages = {};
const tileMeta = {}; // Only declare here

function loadTileMeta(callback) {
  fetch("tile_meta.json")
    .then((response) => response.json())
    .then((data) => {
      Object.assign(tileMeta, data);
      callback();
    });
}

function preloadTileImages(callback) {
  const types = new Set(Object.values(tileMeta));
  let loaded = 0;
  const total = types.size;

  types.forEach((filename) => {
    const img = new Image();
    img.src = `${TILE_FOLDER}${filename}`;
    img.onload = () => {
      tileImages[filename] = img;
      loaded++;
      if (loaded === total) callback();
    };
    img.onerror = () => {
      console.warn(`⚠️ Missing tile image for: ${filename}`);
      loaded++;
      if (loaded === total) callback();
    };
  });
}

function drawTileMap() {
  for (let y = 0; y < tileIndex.length; y++) {
    for (let x = 0; x < tileIndex[y].length; x++) {
      const type = tileIndex[y][x];
      const filename = tileMeta[type];
      const img = tileImages[filename];
      if (img) {
        ctx.drawImage(img, x * 64, y * 64, 64, 64);
      }
    }
  }
}

