// codex.js

async function loadCodex() {
  const res = await fetch('unlocked_codex.json');
  const data = await res.json();
  const container = document.getElementById('codexList');

  if (!data.entries || data.entries.length === 0) {
    container.innerHTML = "<p>No Codex entries unlocked yet.</p>";
    return;
  }

  data.entries.forEach(entry => {
    const div = document.createElement("div");
    div.className = "codex-entry";
    div.innerHTML = `
      <h3>${entry}</h3>
      <img src="assets/images/relics/${entry.replace(/\s+/g, '_').toLowerCase()}.png" onerror="this.style.display='none'">
      <p><em>Lore coming soon...</em></p>
      <hr/>
    `;
    container.appendChild(div);
  });
}

window.onload = loadCodex;
