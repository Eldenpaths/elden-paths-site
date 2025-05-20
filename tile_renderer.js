const tileImages = {};
const tileSize = 64;

function loadTileMeta(callback) {
  fetch("tile_meta.json")
    .then(response => response.json())
    .then(data => {
      Object.assign(tileMeta, data);
      callback();
    });
}

function loadTileImages(callback) {
  const types = new Set(Object.values(tileMeta));
  let loaded = 0;
  const total = types.size;

  types.forEach(type => {
    const img = new Image();
    img.src = `assets/img/tiles/${type}_tile.png`;
    img.onload = () => {
      tileImages[type] = img;
      loaded++;
      if (loaded === total) callback();
    };
    img.onerror = () => {
      console.warn("Missing tile image for:", `${type}_tile.png`);
      loaded++;
      if (loaded === total) callback();
    };
  });
}

function drawTiles(context) {
  const keys = Object.keys(tileMeta);
  keys.forEach(key => {
    const [x, y] = key.split(",").map(Number);
    const type = tileMeta[key];
    const img = tileImages[type];
    if (img) {
      context.drawImage(img, x * tileSize, y * tileSize, tileSize, tileSize);
    }
  });
}

window.addEventListener("load", () => {
  const canvas = document.getElementById("mapCanvas");
  const context = canvas.getContext("2d");

  loadTileMeta(() => {
    loadTileImages(() => {
      drawTiles(context);
    });
  });
});

