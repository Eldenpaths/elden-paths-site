// update_tile_index.js
const fs = require('fs');
const path = require('path');

const [,, tileId, playerName] = process.argv;

if (!tileId || !playerName) {
  console.error("Usage: node update_tile_index.js <tile_id> <player_name>");
  process.exit(1);
}

const filePath = path.join(__dirname, '..', 'tile_index.json');

let tileIndex = {};
if (fs.existsSync(filePath)) {
  tileIndex = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

if (!tileIndex[tileId]) {
  tileIndex[tileId] = { biome: "unknown", terrain: "unknown", fog_cleared: true, dropped_gear: [], visited_by: [] };
}

if (!tileIndex[tileId].visited_by) {
  tileIndex[tileId].visited_by = [];
}

if (!tileIndex[tileId].visited_by.includes(playerName)) {
  tileIndex[tileId].visited_by.push(playerName);
}

fs.writeFileSync(filePath, JSON.stringify(tileIndex, null, 2), 'utf-8');
console.log(`✅ Updated tile ${tileId} with visitor ${playerName}`);
