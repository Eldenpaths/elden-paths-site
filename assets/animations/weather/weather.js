
async function loadWeather(tileX, tileY) {
  const res = await fetch("weather.json");
  const data = await res.json();
  const key = `${tileX},${tileY}`;
  const type = data.tiles[key] || "clear";

  const weatherLayer = document.getElementById("weatherOverlay");
  if (!weatherLayer) return;

  const weatherMap = {
    "fog": "fog.gif",
    "rain": "rain.gif",
    "storm": "storm.gif",
    "snow": "snow.gif"
  };

  if (type === "clear") {
    weatherLayer.style.display = "none";
    weatherLayer.src = "";
    stopWeatherSound();
  } else {
    weatherLayer.style.display = "block";
    weatherLayer.src = `assets/animations/weather/${weatherMap[type]}`;
    playWeatherSound(type);
  }
}

function playWeatherSound(type) {
  stopWeatherSound();
  const audio = new Audio(`assets/sounds/weather/${type}.mp3`);
  audio.loop = true;
  audio.volume = 0.4;
  audio.id = "weatherSound";
  document.body.appendChild(audio);
  audio.play();
}

function stopWeatherSound() {
  const existing = document.getElementById("weatherSound");
  if (existing) {
    existing.pause();
    existing.remove();
  }
}
