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
      const image = getSketchImage(prompt); // Placeholder now, upgrade later
      const newEntry = { prompt, image };
      log.unshift(newEntry);
      localStorage.setItem("sketchLog", JSON.stringify(log));
      addSketch(prompt, image);
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

  // 🛠 Replace this later with real sketch API
  function getSketchImage(prompt) {
    const seed = encodeURIComponent(prompt).slice(0, 16);
    return `https://placehold.co/400x200?text=${seed}`;
  }
});
