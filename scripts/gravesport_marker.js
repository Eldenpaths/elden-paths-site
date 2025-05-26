// gravesport_marker.js
// Adds clickable vendor marker to map if tile is discovered

function showGravesportMarker(tileId = "tile_0512") {
  const fogData = JSON.parse(localStorage.getItem("fog_of_discovery") || "{}");
  if (!fogData[tileId]) return; // Marker hidden if tile not yet discovered

  const marker = document.createElement("div");
  marker.className = "map-marker vendor-marker";
  marker.title = "Mira Saltbite's Stall";
  marker.style.position = "absolute";
  marker.style.left = "320px"; // Adjust to match tile coords
  marker.style.top = "540px";
  marker.innerHTML = "🪙";

  marker.onclick = () => {
    window.open("/encounters/ui/trade_window_mira_hooked.html", "_blank");
  };

  document.getElementById("mapContainer").appendChild(marker);
}

document.addEventListener("DOMContentLoaded", () => {
  showGravesportMarker();
});