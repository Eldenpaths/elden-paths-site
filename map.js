// Elden Paths™: Working Tile Map Renderer

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
    drawTileMap();
  } catch (err) {
    console.error("Map loading error:", err);
    ctx.fillText("⚠️ Failed to load map data", 50, 50);
  }
});

async function preloadTileImages() {
  const terrainTypes = new Set(Object.values(tileMeta).map(t => t.terrain));
  const loadPromises = [];

  terrainTypes.forEach((type) => {
    const img = new Image();
    img.src = `${TILE_FOLDER}${type}_tile.png`;
    tileImages[type] = img;

    loadPromises.push(new Promise((resolve) => {
      img.onload = resolve;
      img.onerror = () => {
        console.warn("Missing tile image for:", type);
        resolve();
      };
    }));
  });

  return Promise.all(loadPromises);
}

function drawTileMap() {
  tileIndex.forEach((row, y) => {
    row.forEach((tileId, x) => {
      const meta = tileMeta[tileId];
      const terrain = meta ? meta.terrain : "plains";
      const img = tileImages[terrain];

      if (img) {
        ctx.drawImage(img, x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      } else {
        // fallback tile
        ctx.fillStyle = "#ccc";
        ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        ctx.strokeStyle = "#999";
        ctx.strokeRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      }
    });
  });
}
