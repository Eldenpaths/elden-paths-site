const TILE_FOLDER = "assets/img/tiles/";
let tileIndex = [];
let canvas, ctx;

window.addEventListener("load", async () => {
  canvas = document.getElementById("mapCanvas");
  ctx = canvas.getContext("2d");

  try {
    const [indexData] = await Promise.all([
      fetch("tile_index.json").then((res) => res.json())
    ]);

    tileIndex = indexData;

    loadTileMeta(() => {
      preloadTileImages(() => {
        drawTileMap();
      });
    });
  } catch (err) {
    console.error("Map loading error:", err);
    ctx.fillText("⚠️ Failed to load map data", 50, 50);
  }
});

function preloadTileImages(callback) {
  loadTileImages(callback); // From tile_renderer.js
}

function drawTileMap() {
  tileIndex.forEach((row, y) => {
    row.forEach((type, x) => {
      const img = tileImages[type];
      if (img) {
        ctx.drawImage(img, x * 64, y * 64, 64, 64);
      }
    });
  });
}
