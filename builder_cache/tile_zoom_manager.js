
// Tile Zoom Manager: Reads zoom config and dynamically loads tile logic
let currentZoom = 'z1';

function loadZoomConfig(callback) {
  fetch('/builder_cache/tile_meta_zsync.json')
    .then(res => res.json())
    .then(config => {
      const zoomData = config.zoom_levels[currentZoom];
      if (!zoomData) {
        console.error('Invalid zoom level:', currentZoom);
        return;
      }

      console.log('Zoom:', currentZoom, 'Tile Size:', zoomData.tile_size);

      document.querySelectorAll('.tile').forEach(tile => {
        tile.style.width = zoomData.tile_size;
        tile.style.height = zoomData.tile_size;
        tile.style.opacity = 1;
        tile.style.fontSize = '0.7rem';
      });

      if (zoomData.fog_visible) {
        loadFogLayer(zoomData.load_mode);
      }

      if (zoomData.sketch_visible) {
        loadSketchLayer(currentZoom);
      }

      if (callback) callback();
    });
}

function loadFogLayer(dataSource) {
  fetch(`/builder_cache/${dataSource}`)
    .then(res => res.json())
    .then(data => {
      for (const id in data.tiles) {
        const el = document.querySelector(`[data-tile='${id}']`);
        if (el && data.tiles[id].fog) {
          el.style.opacity = 0.25;
        }
      }
    });
}

function loadSketchLayer(zoomLevel) {
  document.querySelectorAll('.tile').forEach(tile => {
    const tileId = tile.getAttribute('data-tile');
    const sketchPath = `/builder_cache/sketches/${zoomLevel}/${tileId}.png`;
    tile.style.backgroundImage = `url('${sketchPath}')`;
    tile.style.backgroundSize = 'cover';
    tile.style.backgroundPosition = 'center';
  });
}

function setZoom(level) {
  currentZoom = level;
  loadZoomConfig();
}
