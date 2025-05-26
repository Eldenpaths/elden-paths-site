# Codex Entry Layer

This JSON defines lore-linked codex entries bound to tiles. Used for:
- Map click lore pops
- Echo sketch generation
- Epoch tagging and keyword search

Each entry includes:
- Tile ID (e.g., tile_112_117)
- Title + epoch
- Descriptive lore
- Sketch prompt
- Tags for filtering

Hook into: maps_animated.html, sketch_manifest.json, and codex.html (optional)