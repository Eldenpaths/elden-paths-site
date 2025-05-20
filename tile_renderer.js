const tileImages = {};
const tileSize = 64;

function loadTileMeta(callback) {
  fetch("tile_meta.json")
    .then((response) => response.json())
    .then((data) => {
      Object.assign(tileMeta, data); // DON'T re-declare tileMeta!
      callback();
    });
}

function loadTileImages(callback) {
  const types = new Set(Object.values(tileMeta));
  let loaded = 0;
  const total = types.size;

  types.forEach((type) => {
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
      const type = tileIndex[y][x];
      const img = tileImages[tileMeta[type]];
      if (img) ctx.drawImage(img, x * tileSize, y * tileSize, tileSize, tileSize);
    }
  }
}

