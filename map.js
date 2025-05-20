// Elden Paths™: Tile Map Loader

const TILE_FOLDER = "assets/img/tiles/";
const TILE_SIZE = 64;

let tileIndex = [];
const tileMeta = {};
const tileImages = {};
let canvas, ctx;

window.addEventListener("load", async () => {
  canvas = document.getElementById("mapCanvas");
  ctx = canvas.getContext("2d");

  try {
    const [indexData, metaData] = await Promise.all([
      fetch("tile_index.json").then(res => res.json()),
      fetch("tile_meta.json").then(res => res.json())
    ]);

    tileIndex = indexData;
    Object.assign(tileMeta, metaData);

    await preloadTileImages();
    drawTileMap();
  } catch (err) {
    console.error("Map loading error:", err);
    ctx.fillText("⚠️ Failed to load map data", 50, 50);
  }
});

function preloadTileImages() {
  return new Promise((resolve) => {
    const types = Object.keys(tileMeta);
    let loaded = 0;

    types.forEach(type => {
      const img = new Image();
      img.src = `${TILE_FOLDER}${tileMeta[type]}`;
      img.onload = () => {
        tileImages[type] = img;
        loaded++;
        if (loaded === types.length) resolve();
      };
      img.onerror = () => {
        console.warn(`⚠️ Missing tile image for: ${tileMeta[type]}`);
        loaded++;
        if (loaded === types.length) resolve();
      };
    });
  });
}

function drawTileMap() {
  for (let y = 0; y < tileIndex.length; y++) {
    for (let x = 0; x < tileIndex[y].length; x++) {
      const type = tileIndex[y][x];
      const img = tileImages[type];
      if (img) ctx.drawImage(img, x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }
  }
}
