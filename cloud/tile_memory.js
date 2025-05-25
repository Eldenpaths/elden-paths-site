
// EchoForge™ Tile Memory Engine

async function updateTileMemory(tileId, updates = {}) {
  const memory = await fetch('/cloud/tile_memory.json')
    .then(res => res.json())
    .catch(() => ({}));

  const tile = memory[tileId] || {
    burned: false,
    last_blood: null,
    plant_growth: [],
    structure_events: [],
    history_log: []
  };

  // Apply updates
  if (updates.burned !== undefined) tile.burned = updates.burned;
  if (updates.last_blood) tile.last_blood = updates.last_blood;
  if (updates.plant_growth) tile.plant_growth.push(...updates.plant_growth);
  if (updates.structure_event) tile.structure_events.push(updates.structure_event);
  if (updates.log_entry) tile.history_log.push(updates.log_entry);

  // Save
  memory[tileId] = tile;

  // Simulate write back
  console.log("Updated tile memory:", tileId, tile);

  // TODO: POST back to server to update tile_memory.json
}

// Example:
// updateTileMemory("36_22", {
//   burned: true,
//   last_blood: new Date().toISOString(),
//   plant_growth: ["ash sprouts"],
//   structure_event: "collapsed shed",
//   log_entry: "set fire during player_003 ambush"
// });
