# Sketch Settings System

This file controls sketch rendering behavior for all players and system-wide logic.

## Options:
- **auto**: Smart switching based on terrain, importance, or throttling
- **grayscale**: B&W mode for speed
- **full**: Highest quality rendering, slower
- **low_power**: Emergency fallback

## Use In:
- sketch_engine.js
- sketch_request.html
- play.html (per-player toggle)
- sketch_manifest.json (per-tile overrides)