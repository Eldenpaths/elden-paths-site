document.addEventListener("DOMContentLoaded", () => {
  const voteForm = document.getElementById("voteForm");
  const confirmation = document.getElementById("confirmation");

  const voteKey = "eldenVoteChoice";
  const voteCountsKey = "eldenVoteCounts";

  // Initialize stored counts
  const voteOptions = ["expand_wilds", "fortify_vale", "free_trade", "unlock_class"];
  let voteCounts = JSON.parse(localStorage.getItem(voteCountsKey)) || {};

  voteOptions.forEach(option => {
    if (!(option in voteCounts)) {
      voteCounts[option] = 0;
    }
    document.getElementById(`${option}_count`).textContent = voteCounts[option];
  });

  // Handle vote submission
  voteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const choice = voteForm.vote.value;

    if (!localStorage.getItem(voteKey)) {
      localStorage.setItem(voteKey, choice);
      voteCounts[choice]++;
      localStorage.setItem(voteCountsKey, JSON.stringify(voteCounts));
      document.getElementById(`${choice}_count`).textContent = voteCounts[choice];
      confirmation.innerHTML = `✅ You voted for <strong>${choice.replaceAll('_', ' ')}</strong>. Your vote has been saved.`;
      confirmation.style.display = "block";
    } else {
      confirmation.innerHTML = `⚠️ You've already voted: <strong>${localStorage.getItem(voteKey).replaceAll('_', ' ')}</strong>. One vote per person.`;
      confirmation.style.display = "block";
    }
  });
});
