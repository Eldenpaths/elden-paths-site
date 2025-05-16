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
  sketchLog.forEach(p => appendToLog(p));

  // Hook into global sketch prompt
  const observer = new MutationObserver(() => {
    if (window.generatedSketchPrompt) {
      const prompt = window.generatedSketchPrompt;
      if (!sketchLog.includes(prompt)) {
        sketchLog.unshift(prompt);
        localStorage.setItem("sketchLog", JSON.stringify(sketchLog));
        appendToLog(prompt);
      }
      window.generatedSketchPrompt = null;
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  function appendToLog(prompt) {
    const li = document.createElement("li");
    li.textContent = prompt;
    logList.prepend(li);
  }
});
