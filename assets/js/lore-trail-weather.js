// assets/js/lore-trail-weather.js

function showLorePopup(tileData, x, y) {
    const key = `${x}_${y}`;
    const tile = tileData[key];
    const lorePanel = document.getElementById("lorePanel");
    if (tile && lorePanel) {
        lorePanel.innerHTML = `<strong>${tile.name}</strong><br><em>${tile.terrain}</em><br><p>${tile.lore}</p>`;
        lorePanel.style.display = "block";
    }
}

function updatePlayerFogAndTrail(playerId, x, y, discovered) {
    const playersData = JSON.parse(localStorage.getItem("elden_all_players") || "{}");
    playersData[playerId] = { x, y, fog: discovered };
    localStorage.setItem("elden_all_players", JSON.stringify(playersData));
    console.log("Updated fog + trail state for:", playerId);
}

function updateTrailOverlay(trailList) {
    const trailLayer = document.getElementById("trail-overlay");
    if (!trailLayer) return;

    trailLayer.innerHTML = "";
    trailList.forEach(key => {
        const [x, y] = key.split("_").map(Number);
        const trail = document.createElement("div");
        trail.className = "trail-dot";
        trail.style.left = `${(x + 5) * 10}%`;
        trail.style.top = `${(y + 5) * 10}%`;
        trailLayer.appendChild(trail);
    });
}