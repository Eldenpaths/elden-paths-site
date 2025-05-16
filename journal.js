document.addEventListener("DOMContentLoaded", () => {
  const journalForm = document.getElementById("journalForm");
  const journalInput = document.getElementById("journalInput");
  const journalEntries = document.getElementById("journalEntries");
  const exportBtn = document.getElementById("exportBtn");

  const entries = JSON.parse(localStorage.getItem("eldenJournal")) || [];

  const renderEntries = () => {
    journalEntries.innerHTML = "";
    entries.forEach((entry) => {
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

  exportBtn.addEventListener("click", () => {
    if (entries.length === 0) {
      alert("No journal entries to download.");
      return;
    }

    const blob = new Blob([entries.join("\n\n---\n\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "elden_journal.txt";
    a.click();

    URL.revokeObjectURL(url);
  });

  renderEntries();
});
