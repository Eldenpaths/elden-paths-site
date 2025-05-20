const tileImages = {};
const tileSize = 64;

function loadTileMeta(callback) {
  fetch("tile_meta.json")
    .then((response) => response.json())
    .then((data) => {
      window.tileMeta = data; // avoid declaring tileMeta twice
      callback();
    });
}

function loadTileImages(callback) {
  const types = new Set(Object.values(tileMeta));
  let loaded = 0;
  const total = types.size;

  types.forEach((filename) => {
    const img = new Image();
    img.src = `assets/img/tiles/${filename}`; // fixed: no extra `_tile.png`
    img.onload = () => {
      tileImages[filename] = img;
      loaded++;
      if (loaded === total) callback();
    };
    img.onerror = () => {
      console.warn("Missing tile image for:", filename);
    };
  });
}

