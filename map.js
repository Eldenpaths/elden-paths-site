// Elden Paths™: Map Loader
const TILE_FOLDER = "assets/img/tiles/";
let tileIndex = [];
let canvas, ctx;

window.addEventListener("load", async () => {
  canvas = document.getElementById("mapCanvas");
  ctx = canvas.getContext("2d");

  try {
    const indexData = await fetch("tile_index.json").then((res) => res.json());
    tileIndex = indexData;

    loadTileMeta(() => {
      preloadTileImages(() => {
        drawTileMap(); // <== important
      });
    });
  } catch (err) {
    console.error("Map loading error:", err);
    ctx.fillText("⚠️ Failed to load map data", 50, 50);
  }
});
