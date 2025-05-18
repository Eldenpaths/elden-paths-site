// terrain_utils.js

async function fetchTerrainForPlayer(playerId) {
    const playerData = await fetch('players.json').then(res => res.json());
    const tileMeta = await fetch('tile_meta.json').then(res => res.json());

    const tileId = playerData[playerId].tile;
    const terrain = tileMeta.tiles[tileId]?.terrain || "unknown";

    return terrain;
}
