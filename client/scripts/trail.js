
// EchoForge™ Trail System - Player Travel Tracking

async function logPlayerTrail(tileId, playerName) {
  const trails = await fetch('/cloud/trails.json')
    .then(res => res.json())
    .catch(() => ({}));

  const now = new Date().toISOString();
  const trail = trails[tileId] || {
    strength: 0,
    players: [],
    last_visited: now
  };

  // Update strength and players
  trail.strength += 1;
  if (!trail.players.includes(playerName)) {
    trail.players.push(playerName);
  }
  trail.last_visited = now;

  trails[tileId] = trail;

  // Simulate backend update
  console.log("Updated trail:", tileId, trail);

  // TODO: POST trails.json back to server
}

// Example:
// logPlayerTrail("36_22", "Wanderer");
