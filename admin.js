document.addEventListener("DOMContentLoaded", () => {
  const counts = JSON.parse(localStorage.getItem("eldenVoteCounts")) || {
    expand_wilds: 0,
    fortify_vale: 0,
    free_trade: 0,
    unlock_class: 0
  };

  for (const key in counts) {
    const el = document.getElementById(`${key}_count`);
    if (el) el.textContent = counts[key];
  }

  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const leader = sorted[0];
  const display = leader[1] > 0 ? leader[0].replaceAll("_", " ") : "No votes yet";

  document.getElementById("leadingVote").textContent = display;
});
