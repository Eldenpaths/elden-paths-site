document.addEventListener("DOMContentLoaded", () => {
  const journalForm = document.getElementById("journalForm");
  const journalInput = document.getElementById("journalInput");
  const journalEntries = document.getElementById("journalEntries");

  const entries = JSON.parse(localStorage.getItem("eldenJournal")) || [];

  const renderEntries = () => {
    journalEntries.innerHTML = "";
    entries.forEach((entry, index) => {
      const entryDiv = document.createElement("div");
      entryDiv.className = "journal-entry";
      entryDiv.textContent = entry;
      journalEntries.appendChild(entryDiv);
    });
  };

  journalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newEntry = journalInput.value.trim();
    if (newEntry) {
      entries.push(newEntry);
      localStorage.setItem("eldenJournal", JSON.stringify(entries));
      journalInput.value = "";
      renderEntries();
    }
  });

  renderEntries();
});
