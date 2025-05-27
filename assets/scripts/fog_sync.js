
// Example: load fog info and visually update the world map
fetch('/builder_cache/tile_index.json')
  .then(res => res.json())
  .then(data => {
    const tiles = data.tiles;
    for (const id in tiles) {
      const fogged = tiles[id].fog;
      const el = document.querySelector(`[data-tile='${id}']`);
      if (el) {
        el.style.opacity = fogged ? 0.25 : 1;
        el.title = fogged ? "Fogged" : "Revealed";
      }
    }
  });
