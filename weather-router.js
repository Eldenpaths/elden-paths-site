document.addEventListener("DOMContentLoaded", () => {
  // Example placeholder data — will be replaced by real tile_meta lookup
  const playerTile = "will_03_north";
  const tileMeta = {
    region: "Gravesport",
    weather: "fog"
  };

  const themeMap = {
    fog: "fog",
    snow: "snow",
    rain: "rain",
    heat: "heat",
    glow: "glow",
    clear: "default"
  };

  const overlayMap = {
    fog: "fog-overlay.js",
    snow: "snow-overlay.js",
    rain: "rain-overlay.js"
  };

  const theme = themeMap[tileMeta.weather] || "default";
  const overlay = overlayMap[tileMeta.weather];

  // Load theme (if not already handled by theme-toggle.js)
  const themeLink = document.getElementById("themeStylesheet");
  if (theme !== "default") {
    themeLink.href = `theme-${theme}.css`;
  }

  // Load overlay
  if (overlay) {
    const script = document.createElement("script");
    script.src = overlay;
    document.body.appendChild(script);
  }

  // Set a global sketch context variable
  window.sketchWeatherTag = tileMeta.weather;
});
