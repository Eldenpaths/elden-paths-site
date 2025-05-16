document.addEventListener("DOMContentLoaded", () => {
  // Ensure dependencies are available
  if (!window.getSketchPromptModifier) {
    console.warn("Sketch modifier not available yet.");
    return;
  }

  // Simulate player data (eventually pulled from players.json)
  const currentPlayer = {
    name: "Willa of Smoke",
    tile: "will_03_north",
    weather: window.sketchWeatherTag,
    region: window.regionName
  };

  // Build sketch prompt
  const base = `A traveler named ${currentPlayer.name}`;
  const setting = `in ${currentPlayer.region}`;
  const mood = getSketchPromptModifier();
  const fullPrompt = `${base}, ${setting}, surrounded by ${mood}.`;

  // Auto-display prompt in console
  console.log("🎨 Auto-Sketch Triggered:");
  console.log(fullPrompt);

  // Optional: display in DOM for dev view
  const log = document.getElementById("gameLog");
  if (log) {
    const div = document.createElement("div");
    div.textContent = `🖼️ Sketch Prompt: ${fullPrompt}`;
    log.prepend(div);
  }

  // Optional: send to backend / sketch system
  window.generatedSketchPrompt = fullPrompt;
});
