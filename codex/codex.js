
async function loadCodex(type) {
  const fileMap = {
    creatures: '../assets/data/codex_creatures.json',
    factions: '../assets/data/codex_factions.json',
    relics: '../assets/data/codex_relics.json',
    locations: '../assets/data/codex_locations.json'
  };

  const file = fileMap[type];
  if (!file) return;

  try {
    const res = await fetch(file);
    const data = await res.json();
    const container = document.getElementById('codex-content');
    container.innerHTML = '';

    for (const entry of data) {
      const div = document.createElement('div');
      div.className = 'codex-entry';
      div.innerHTML = `<h2>${entry.name}</h2><p>${entry.description}</p>`;
      container.appendChild(div);
    }
  } catch (err) {
    console.error('Error loading codex:', err);
    document.getElementById('codex-content').innerHTML = '<p>Error loading codex data.</p>';
  }
}
