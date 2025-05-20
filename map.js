// Elden Paths™: Working Tile Map Renderer

const TILE_FOLDER = "assets/img/tiles/";

let tileIndex = [];
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
    Object.assign(tileMeta, metaData); // uses the one declared in tile_renderer.js

    await preloadTileImages();
    drawTileMap();
  } catch (err) {
    console.error("Map loading error:", err);
    ctx.fillText("⚠️ Failed to load map data", 50, 50);
  }
});
