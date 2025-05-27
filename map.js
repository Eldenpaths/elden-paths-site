// map.js - Handles player movement and fog updates

function loadPlayerState() {
  return JSON.parse(localStorage.getItem("player_state"));
}

function savePlayerState(state) {
  localStorage.setItem("player_state", JSON.stringify(state));
}

function moveToTile(tileId) {
  const state = loadPlayerState();
  state.tile = tileId;

  if (!state.fog.includes(tileId)) {
    state.fog.push(tileId);
    console.log(`🌫️ Fog cleared at ${tileId}`);
    if (typeof triggerSketch === "function") {
      triggerSketch(tileId); // sketch or render trigger
    }
  }

  savePlayerState(state);
  updateTrailbox(state);
}

function updateTrailbox(state) {
  document.querySelector(".trailbox").innerHTML = `
    <h2>Trailbox</h2>
    <p><strong>Name:</strong> ${state.name}</p>
    <p><strong>Tile:</strong> ${state.tile}</p>
    <p><strong>Gear:</strong> ${state.gear.join(", ")}</p>
    <p><strong>Status:</strong> 🧭 Fog ${state.fog.includes(state.tile) ? "cleared" : "thick"}.</p>
  `;
}
