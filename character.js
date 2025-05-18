// character.js

let player = {
    name: "Warden",
    str: 3,
    dex: 2,
    hp: 20,
    maxHp: 20,
    xp: 0,
    level: 1
};

function gainXP(amount) {
    player.xp += amount;
    const xpToLevel = player.level * 10;

    if (player.xp >= xpToLevel) {
        player.level++;
        player.maxHp += 5;
        player.hp = player.maxHp;
        player.str++;
        player.dex++;
        logToCombat(`⭐ ${player.name} leveled up to Level ${player.level}! Stats increased.`);
    }
}

function logToCombat(text) {
    const logBox = document.getElementById("combatLog");
    if (logBox) {
        logBox.innerText += `\n${text}`;
    }
}
