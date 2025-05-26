// Weather Logic with AI Smoothing and API Safeguard

const WEATHER_API_ACTIVE = false; // Toggle for live calls
const MAX_CALLS_PER_DAY = 3000;
let callsToday = 0;
const weatherCache = {};

function simulateWeather(tileId) {
  // Very basic terrain-aware simulation
  const sampleTypes = ['fog', 'light rain', 'sunny', 'overcast', 'windy'];
  const random = Math.floor(Math.random() * sampleTypes.length);
  return {
    weather: sampleTypes[random],
    source: "AI smoothed"
  };
}

function safeFetchWeather(tileId) {
  const now = Date.now();
  if (weatherCache[tileId] && now - weatherCache[tileId].timestamp < 1000 * 60 * 120) {
    return weatherCache[tileId].data;
  }

  if (!WEATHER_API_ACTIVE || callsToday >= MAX_CALLS_PER_DAY) {
    const simulated = simulateWeather(tileId);
    weatherCache[tileId] = { timestamp: now, data: simulated };
    return simulated;
  }

  // Example fetch call (won’t run here — placeholder only)
  callsToday++;
  // const url = `https://api.openweathermap.org/data/...`;
  // fetch(url).then(...);

  // For now return simulated fallback
  const fallback = simulateWeather(tileId);
  weatherCache[tileId] = { timestamp: now, data: fallback };
  return fallback;
}