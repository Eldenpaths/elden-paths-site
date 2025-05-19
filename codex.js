function loadCategory(category) {
  const content = document.getElementById("codex-content");
  content.innerHTML = `<div class="codex-entry"><h2>${category}</h2><p>Loading entries for ${category}...</p></div>`;
  // Simulate load delay
  setTimeout(() => {
    content.innerHTML += `<div class="codex-entry"><p>📖 Entry 1 for ${category}</p></div>`;
    content.innerHTML += `<div class="codex-entry"><p>📖 Entry 2 for ${category}</p></div>`;
  }, 500);
}
