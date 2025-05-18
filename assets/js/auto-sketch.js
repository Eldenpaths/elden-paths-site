// assets/js/auto-sketch.js
function triggerSketchForTile(x, y) {
    const tileId = `tile_${x}_${y}`;
    console.log("Sketch triggered for:", tileId);

    const sketchContainer = document.getElementById("sketch-output");
    if (sketchContainer) {
        sketchContainer.innerHTML = `<img src="assets/sketches/${tileId}.png" alt="Sketch of (${x},${y})" style="width:100%; border: 2px solid #ccc;" />`;
    }
}