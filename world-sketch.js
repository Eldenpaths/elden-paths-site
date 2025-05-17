window.generateWorldSketch = async function(type, name, options = {}) {
  const region = window.regionName || "Unknown";
  const weather = window.sketchWeatherTag || "clear";
  const details = options.details || "";
  const seed = `${type}-${name}`.toLowerCase().replace(/\s+/g, "-");

  const prompt = {
    structure: `A detailed fantasy structure named ${name}, located in ${region}, under ${weather} conditions. ${details}`,
    relic: `A discovered relic called ${name}, in ${region}, surrounded by ${weather} effects. ${details}`,
    scene: `A cinematic moment: ${name}, happening in ${region} during ${weather}. ${details}`,
    terrain: `A landscape view of ${name}, showing terrain in ${region}, with ${weather} present. ${details}`
  }[type];

  const response = await fetch("http://localhost:3001/generate-sketch", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  const data = await response.json();
  const image = data.url || `https://placehold.co/400x200?text=Sketch+Error`;

  // Log it (optional — hook this into tile system or codex)
  const sketchLog = JSON.parse(localStorage.getItem("worldSketches") || "{}");
  sketchLog[seed] = { type, name, prompt, image };
  localStorage.setItem("worldSketches", JSON.stringify(sketchLog));

  // Display if in play mode
  const log = document.getElementById("gameLog");
  if (log) {
    const div = document.createElement("div");
    div.innerHTML = `📍 <strong>${type.toUpperCase()}: ${name}</strong><br/>
      <img src="${image}" style="max-width:100%; margin-top:0.5em; border:1px solid #ccc;" />`;
    log.prepend(div);
  }

  return image;
};
