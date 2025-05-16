document.addEventListener("DOMContentLoaded", () => {
  // Placeholder: replace with dynamic tile lookup later
  const playerTile = "will_03_north";

  // Example tile metadata
  const tileMetaData = {
    "will_03_north": { region: "Gravesport", weather: "fog" },
    "auber_rim_east": { region: "Auber Rim", weather: "snow" },
    "watchers_pass": { region: "Watcher’s Crown", weather: "clear" },
    "sunspire_south": { region: "Desert Frontier", weather: "heat" },
    "glowstone_depths": { region: "Ancient Depths", weather: "glow" },
    "rainfall_hollow": { region: "Coastal Valley", weather: "rain" }
  };

  const currentTile = tileMetaData[playerTile] || { region: "Unknown", weather: "clear" };
  const currentWeather = currentTile.weather || "clear";

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
    rain: "rain-overlay.js",
    heat: "heat-overlay.js",
    glow: "magic-overlay.js"
  };

  const selectedTheme = themeMap[currentWeather] || "default";
  const overlayScript = overlayMap[currentWeather];

  // ✅ Apply Theme (if not already handled by dropdown)
  const themeLink = document.getElementById("themeStylesheet");
  if (themeLink && selectedTheme !== "default") {
    themeLink.href = `
