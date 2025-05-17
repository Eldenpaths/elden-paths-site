window.generateNpcPortrait = async function(npcName) {
  const region = window.regionName || "Unknown";
  const weather = window.sketchWeatherTag || "clear";

  const prompt = `Portrait of a fantasy NPC named ${npcName}, appearing in ${region}, surrounded by ${weather} conditions, realistic, fantasy style`;

  try {
    const response = await fetch("http://localhost:3001/generate-sketch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();
    const imageUrl = data.url || `https://placehold.co/400x200?text=Sketch+Error`;

    // Save to NPC registry in localStorage
    const npcLog = JSON.parse(localStorage.getItem("npcPortraits") || "{}");
    npcLog[npcName] = { prompt, image: imageUrl };
    localStorage.setItem("npcPortraits", JSON.stringify(npcLog));

    // Optionally display in log
    const gameLog = document.getElementById("gameLog");
    if (gameLog) {
      const div = document.createElement("div");
      div.innerHTML = `<strong>🧍 New NPC: ${npcName}</strong><br/>
        <img src="${imageUrl}" alt="${npcName}" style="width:100%; max-width:300px; border:1px solid #ccc; margin-top:0.5em;" />`;
      gameLog.prepend(div);
    }

    return imageUrl;
  } catch (err) {
    console.error("NPC portrait generation failed:", err);
    return `https://placehold.co/400x200?text=Failed+to+Sketch`;
  }
};
