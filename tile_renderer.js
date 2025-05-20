const tileMeta = {};
const tileImages = {};
const tileSize = 64;

function loadTileMeta(callback) {
  fetch("tile_meta.json")
    .then((response) => response.json())
    .then((data) => {
      Object.assign(tileMeta, data);
      callback();
    });
}

function loadTileImages(callback) {
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
