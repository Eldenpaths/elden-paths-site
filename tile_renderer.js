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
      fetch("tile_meta.json").then((res) => res.json()),
    ]);

    tileIndex = indexData;
    tileMeta = metaData;

    await preloadTileImages();
    drawMap();
  } catch (err) {
    console.error("Failed to load map:", err);
    ctx.fillText("⚠️ Map Load Failed", 50, 50);
  }
});

async function preloadTileImages() {
  const terrainTypes = new Set(Object.values(tileMeta));
  const loadPromises = [];

  terrainTypes.forEach((terrain) => {
    const img = new Image();
    img.src = `${TILE_FOLDER}${terrain}_tile.png`;
    tileImages[terrain] = img;

    loadPromises.push(new Promise((resolve) => {
      img.onload = resolve;
      img.onerror = () => {
        console.warn("Missing tile image for:", terrain);
        resolve();
      };
    }));
  });

  return Promise.all(loadPromises);
}

function drawMap() {
  for (let y = 0; y < tileIndex.length; y++) {
    for (let x = 0; x < tileIndex[y].length; x++) {
      const tileId = tileIndex[y][x];
      const terrain = tileMeta[tileId];
      const img = tileImages[terrain];

      if (img) {
        ctx.drawImage(img, x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      } else {
        ctx.fillStyle = "#e3dccc";
        ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        ctx.strokeStyle = "#999";
        ctx.strokeRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      }
    }
  }
}