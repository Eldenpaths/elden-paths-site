// save_load.js - Player Save/Load System

function savePlayerState(state = {}) {
  const defaultState = {
    name: "Unnamed",
    tile: "2_3", // Update to match your actual starting tile
    hp: 20,
    xp: 0,
    gear: [],
    wounds: [],
    coin: 10,
    fog: [] // ✅ NEW: Track explored tiles for Fog of Discovery
  };
  const finalState = { ...defaultState, ...state };
  localStorage.setItem("player_state", JSON.stringify(finalState));
  console.log("✅ Player state saved.");
}

function loadPlayerState() {
  const raw = localStorage.getItem("player_state");
  if (!raw) {
    console.log("⚠️ No saved state found. Returning default.");
    return {
      name: "Unnamed",
      tile: "2_3",
      hp: 20,
      xp: 0,
      gear: [],
      wounds: [],
      coin: 10,
      fog: [] // ✅ NEW: Default fog state on cold load
    };
  }
  const parsed = JSON.parse(raw);

  // ✅ Patch older saves missing fog
  parsed.fog ??= [];

  console.log("✅ Player state loaded:", parsed);
  return parsed;
}

// Optional helper to display basic state in UI
function displayPlayerState(targetId = "playerStatus") {
  const state = loadPlayerState();
  const el = document.getElementById(targetId);
  if (!el) return;
  el.innerHTML = `
    <strong>${state.name}</strong><br>
    Tile: ${state.tile}<br>
    HP: ${state.hp} | XP: ${state.xp}<br>
    Coin: ${state.coin}<br>
    Gear: ${state.gear.join(", ") || "None"}<br>
    Wounds: ${state.wounds.join(", ") || "None"}<br>
    Fog: ${state.fog.length} tiles cleared
  `;
}
