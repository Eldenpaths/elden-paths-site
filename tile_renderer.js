function drawTileMap() {
  const canvas = document.getElementById("mapCanvas");
  const ctx = canvas.getContext("2d");

  if (!window.tileIndex || !window.tileImages) {
    console.warn("Missing tileIndex or tileImages");
    return;
  }

  for (let y = 0; y < tileIndex.length; y++) {
    for (let x = 0; x < tileIndex[y].length; x++) {
      const type = tileIndex[y][x]; // e.g., "forest"
      const img = tileImages[type];
      if (img) {
        ctx.drawImage(img, x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      }
    }
  }
}
