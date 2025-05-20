// Elden Paths™: Tile Map Loader
const TILE_FOLDER = "assets/img/tiles/";

let tileIndex = [];
let canvas, ctx;

window.addEventListener("load", async () => {
  canvas = document.getElementById("mapCanvas");
  ctx = canvas.getContext("2d");

  try {
    const [indexData] = await Promise.all([
      fetch("tile_index.json").then((res) => res.json()),
    ]);

    tileIndex = indexData;

    loadTileMeta(() => {
      loadTileImages(() => {
        drawTileMap();
      });
    });

  } catch (err) {
    console.error("Map loading error:", err);
    ctx.fillText("⚠️ Failed to load map data", 50, 50);
  }
});

function drawTileMap() {
  for (let y = 0; y < tileIndex.length; y++) {
    for (let x = 0; x < tileIndex[y].length; x++) {
      const type = tileIndex[y][x];
      const filename = tileMeta[type];
      const img = tileImages[filename];
      if (img) {
        ctx.drawImage(img, x * tileSize, y * tileSize, tileSize, tileSize);
      }
    }
  }
}
