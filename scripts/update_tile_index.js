// update_tile_index.js
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/tile_index.json');

function updateTile(tileId, playerName) {
  const now = new Date().toISOString();

  // Load current index
  let tileData = {};
  if (fs.existsSync(filePath)) {
    tileData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }

  // Ensure tile exists
  if (!tileData[tileId]) {
    tileData[tileId] = {
      biome: "unknown",
      terrain: "unknown",
      fog_cleared: false,
      dropped_gear: [],
      visits: 0,
      discovered_by: [],
      last_seen: null
    };
  }

  const tile = tileData[tileId];
  tile.visits += 1;
  tile.last_seen = now;
  tile.fog_cleared = true;

  if (!tile.discovered_by.includes(playerName)) {
    tile.discovered_by.push(playerName);
  }

  // Save updated index
  fs.writeFileSync(filePath, JSON.stringify(tileData, null, 2));
  console.log(`✅ Updated ${tileId} for player ${playerName}`);
}

// CLI usage
if (require.main === module) {
  const [tileId, playerName] = process.argv.slice(2);
  if (!tileId || !playerName) {
    console.error("Usage: node update_tile_index.js <tileId> <playerName>");
    process.exit(1);
  }
  updateTile(tileId, playerName);
}
