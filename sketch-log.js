document.addEventListener("DOMContentLoaded", () => {
  const container = document.createElement("div");
  container.id = "sketchLog";
  container.style.marginTop = "2em";

  const title = document.createElement("h2");
  title.textContent = "🖼️ Sketch Logbook";
  container.appendChild(title);

  const list = document.createElement("ul");
  list.id = "sketchLogList";
  list.style.paddingLeft = "1.5em";
  container.appendChild(list);

  const gameLog = document.getElementById("gameLog");
  if (gameLog) gameLog.after(container);

  let log = JSON.parse(localStorage.getItem("sketchLog") || "[]");
  log.forEach(entry => addSketch(entry.prompt, entry.image));

  const observer = new MutationObserver(() => {
    const prompt = window.generatedSketchPrompt;
    if (prompt) {
      generateImage(prompt).then(image => {
        const newEntry = { prompt, image };
        log.unshift(newEntry);
        localStorage.setItem("sketchLog", JSON.stringify(log));
        addSketch(prompt, image);
      });
      window.generatedSketchPrompt = null;
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  function addSketch(prompt, image) {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${prompt}</strong><br/>
      <img src="${image}" alt="Sketch" style="width:100%; max-width:400px; border:1px solid #ccc; margin-top:0.5em;" />`;
    list.prepend(li);
  }

  async function generateImage(prompt) {
    try {
      const response = await fetch("http://localhost:3001/generate-sketch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });
      const data = await response.json();
      return data.url || `https://placehold.co/400x200?text=Sketch+Error`;
    } catch (err) {
      console.error("Image generation error:", err);
      return `https://placehold.co/400x200?text=Sketch+Failed`;
    }
  }
});
