
// EchoForge™ Region Seeding Engine

async function seedRegionFromAnchor(regionId, tileMetaPath = '/cloud/tile_meta.json') {
  const regionSeeds = await fetch('/cloud/world/region_seeds.json').then(r => r.json());
  const speciesTemplates = await fetch('/cloud/genetics/species_templates.json').then(r => r.json());
  const tileMeta = await fetch(tileMetaPath).then(r => r.json());

  const region = regionSeeds.regions.find(r => r.id === regionId);
  if (!region) {
    console.error("Region not found:", regionId);
    return;
  }

  const { tile_center, dominant_species, ambient_species, biome } = region;
  const [cx, cy] = tile_center.split('_').map(Number);

  const seededTiles = [];

  for (let dx = -3; dx <= 3; dx++) {
    for (let dy = -3; dy <= 3; dy++) {
      const tileId = `${cx + dx}_${cy + dy}`;
      const tile = tileMeta[tileId];
      if (!tile || tile.biome !== biome) continue;

      const tileSpawns = [];

      // Add dominant species
      for (const species of dominant_species) {
        const spec = speciesTemplates.species[species];
        if (!spec) continue;

        // Biome check
        if (!spec.preferred_biomes.includes(tile.biome)) continue;

        // Social check
        const groupSize = spec.social ? Math.floor(Math.random() * 4) + 3 : 1;
        for (let i = 0; i < groupSize; i++) {
          tileSpawns.push({ species, behavior_profile: spec.behavior_profile });
        }
      }

      // Add ambient species (sparser)
      for (const species of ambient_species) {
        const spec = speciesTemplates.species[species];
        if (!spec || !spec.preferred_biomes.includes(tile.biome)) continue;
        if (Math.random() < 0.4) {
          tileSpawns.push({ species, behavior_profile: spec.behavior_profile });
        }
      }

      // Simulate world memory update
      if (tileSpawns.length > 0) {
        seededTiles.push({ tile: tileId, spawns: tileSpawns });
      }
    }
  }

  console.log("Seeded region:", regionId, seededTiles);
  return seededTiles;
}

// Example:
// seedRegionFromAnchor("watchers_crown");
