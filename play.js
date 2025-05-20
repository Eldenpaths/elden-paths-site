function initGame() {
  console.log("Game started from play.js");

  // You can add gameplay setup or trigger rendering here
  // Example: drawTileMap(); — if you've defined this in map.js

  const canvas = document.getElementById("mapCanvas");
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#c0a060";
  ctx.fillRect(100, 100, 200, 100);
  ctx.fillStyle = "#000";
  ctx.fillText("Map Canvas Active", 120, 150);
}
