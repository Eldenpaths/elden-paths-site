document.addEventListener("DOMContentLoaded", () => {
  const logContainer = document.createElement("div");
  logContainer.id = "sketchLog";
  logContainer.style.marginTop = "2em";

  const logTitle = document.createElement("h2");
  logTitle.textContent = "🖼️ Sketch Logbook";
  logContainer.appendChild(logTitle);

  const logList = document.createElement("ul");
  logList.id = "sketchLogList";
  logList.style.paddingLeft = "1.5em";
  logContainer.appendChild(logList);

  const logOutput = document.getElementById("gameLog");
  if (logOutput) {
    logOutput.after(logContainer);
  }

  // Load saved log
  const sketchLog = JSON.parse(localStorage.getItem("sketchLog") || "[]");
  sketchLog.forEach(p => appendToLog(p.prompt, p.image));

  // Watch for new generated sketches
  const observer = new MutationObserver(() => {
    const prompt = window.generatedSketchPrompt;
    if (prompt) {
      const fakeImage = generateSketchImage(prompt); // Placeholder
      sketchLog.unshift({ prompt, image: fakeImage });
      localStorage.setItem("sketchLog", JSON.stringify(sketchLog));
      appendToLog(prompt, fakeImage);
      window.generatedSketchPrompt = null;
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  function appendToLog(prompt, image) {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${prompt}</strong><br/><img src="${image}" alt="Sketch" style="width:100%; max-width:400px; border:1px solid #ccc; margin-top:0.5em;" />`;
    logList.prepend(li);
  }

  // Replace this with real sketch logic later
  function generateSketchImage(prompt) {
    const seed = encodeURIComponent(prompt).slice(0, 20);
    return `https://placehold.co/400x200?text=${seed}`;
  }
});

