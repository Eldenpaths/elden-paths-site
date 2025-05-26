# Weather Layer System (Safe & Smoothed)

Includes:
- `weather_logic.js`: Safeguarded fetch engine with fallback to AI smoothed weather
- `weather_layer.json`: Sample weather tiles with fog, rain, and sketch effects
- `MAX_CALLS_PER_DAY` limiter
- `WEATHER_API_ACTIVE` toggle switch
- Local caching and timestamp-based rate control

Hook into: maps_animated.html, sketch_manifest.json