// map.js – Elden Paths™ Movement + Fog + Sketch System

function loadPlayerState() {
  return JSON.parse(localStorage.getItem("player_state"));
}

function savePlayerState(state) {
  localStorage.setItem("player_state", JSON.stringify(state));
}

function moveToTile(tileId) {
  const state = loadPlayerState();
  state.tile = tileId;

  // 🔍 Fog of Discovery
  if (!state.fog.includes(tileId)) {
    state.fog.push(tileId);
    console.log(`🌫️ Fog cleared at ${tileId}`);
    if (typeof triggerSketch === "function") {
      triggerSketch(tileId);
    }
  }

  savePlayerState(state);
  updateTrailbox(state);
}

function updateTrailbox(state) {
  const box = document.querySelector(".trailbox");
  if (!box) return;

  box.innerHTML = `
    <h2>Trailbox</h2>
    <p><strong>Name:</strong> ${state.name}</p>
    <p><strong>Tile:</strong> ${state.tile}</p>
    <p><strong>Gear:</strong> ${state.gear.join(", ") || "None"}</p>
    <p><strong>Status:</strong> 🧭 Fog ${state.fog.includes(state.tile) ? "cleared" : "thick"}.</p>
  `;
}

// 🖼️ Sketch placeholder
function triggerSketch(tileId) {
  console.log(`🖼️ Checking for sketch at tile ${tileId}...`);

  const sketchExists = false; // Replace later with real check

  if (sketchExists) {
    console.log(`✅ Sketch already exists for ${tileId}.`);
    // Future: load image or render overlay
  } else {
    console.log(`🎨 No sketch found. Flagging tile ${tileId} for generation.`);
    // Future: add to generation queue or backend ping
  }
}
