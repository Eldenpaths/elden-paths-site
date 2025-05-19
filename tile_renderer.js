window.addEventListener('load', () => {
  fetch('tile_index.json')
    .then(res => res.json())
    .then(tileIndex => {
      fetch('tile_meta.json')
        .then(res => res.json())
        .then(tileMeta => {
          const canvas = document.getElementById('mapCanvas');
          const ctx = canvas.getContext('2d');
          const tileSize = 256;

          for (let y = 0; y < 2; y++) {
            for (let x = 0; x < 2; x++) {
              const key = `${x},${y}`;
              const tileType = tileIndex[key];
              const tilePath = tileMeta[tileType];

              if (tilePath) {
                const img = new Image();
                img.onload = () => {
                  ctx.drawImage(img, x * tileSize, y * tileSize, tileSize, tileSize);
                };
                img.src = tilePath;
              } else {
                console.warn(`No tile path for key ${key} with type "${tileType}"`);
              }
            }
          }
        })
        .catch(err => {
          console.error('Error loading tile_meta.json:', err);
        });
    })
    .catch(err => {
      console.error('Error loading tile_index.json:', err);
    });
});
