window.generateWorldSketch = async function(type, name, options = {}) {
  const region = window.regionName || "Unknown";
  const weather = window.sketchWeatherTag || "clear";
  const details = options.details || "";
  const player = window.currentPlayerName || "Player";
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

  const newEntry = {
    type,
    name,
    prompt,
    image,
    createdAt: new Date().toISOString(),
    createdBy: player
  };

  const sketchLog = JSON.parse(localStorage.getItem("worldSketches") || "{}");
  sketchLog[seed] = newEntry;
  localStorage.setItem("worldSketches", JSON.stringify(sketchLog));

  const log = document.getElementById("gameLog");
  if (log) {
    const div = document.createElement("div");
    div.innerHTML = `📍 <strong>${type.toUpperCase()}: ${name}</strong><br/>
      <img src="${image}" style="max-width:100%; margin-top:0.5em; border:1px solid #ccc;" />`;
    log.prepend(div);
  }

  return image;
};
