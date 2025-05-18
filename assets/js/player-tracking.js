// assets/js/player-tracking.js

function savePlayerState(playerId, x, y, discoveredTiles) {
    const state = {
        id: playerId,
        x: x,
        y: y,
        fog: discoveredTiles
    };
    localStorage.setItem("elden_player_state", JSON.stringify(state));

    // Optional: Send this to a backend endpoint or save via GitHub API (requires server or manual updates)
    console.log("Saved player state locally:", state);
}

function loadPlayerState() {
    const data = localStorage.getItem("elden_player_state");
    if (data) {
        return JSON.parse(data);
    }
    return null;
}