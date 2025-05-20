// Elden Paths™: Working Tile Map Renderer

const TILE_SIZE = 64;
const TILE_FOLDER = "assets/img/tiles/";

let tileIndex = [];
let tileMeta = {};
let tileImages = {};
let canvas, ctx;

window.addEventListener("load", async () => {
  canvas = document.getElementById("mapCanvas");
  ctx = canvas.getContext("2d");

  try {
    const [indexData, metaData] = await Promise.all([
      fetch("tile_index.json").then((res) => res.json()),
      fetch("tile_meta.json").then((res) => res.json())
    ]);

    tileIndex = indexData;
    tileMeta = metaData;

    await preloadTileImages();
    drawTileMap();
  } catch (err) {
    console.error("Map loading error:", err);
    ctx.fillText("⚠️ Failed to load map data", 50, 50);
  }
});

async function preloadTileImages() {
  for (const key in tileMeta) {
    const img = new Image();
    img.src = TILE_FOLDER + tileMeta[key];
    tileImages[key] = img;
    await new Promise((res) => {
      img.onload = res;
      img.onerror = () => {
        console.warn(`⚠️ Missing tile image for: ${tileMeta[key]}`);
        res();
      };
    });
  }
}

function drawTileMap() {
  for (let y = 0; y < tileIndex.length; y++) {
    for (let x = 0; x < tileIndex[y].length; x++) {
      const tileType = tileIndex[y][x];
      const img = tileImages[tileType];
      if (img) {
        ctx.drawImage(img, x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      }
    }
  }
}
