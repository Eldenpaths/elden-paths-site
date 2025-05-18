// combat.js

function rollDice(sides) {
    return Math.floor(Math.random() * sides) + 1;
}

function performAttack(attacker, defender) {
    const attackRoll = rollDice(20) + attacker.str;
    const defenseRoll = rollDice(20) + defender.dex;

    let log = `🗡 ${attacker.name} rolls an attack: ${attackRoll}\n`;
    log += `🛡 ${defender.name} rolls defense: ${defenseRoll}\n`;

    if (attackRoll > defenseRoll) {
        const damage = rollDice(8) + attacker.str;
        defender.hp -= damage;
        log += `💥 Hit! ${attacker.name} deals ${damage} damage. ${defender.name} has ${defender.hp} HP left.\n`;
        if (defender.hp <= 0) {
            log += `☠️ ${defender.name} is defeated!\n`;
        }
    } else {
        log += `🌀 Miss! ${defender.name} deflects the blow.\n`;
    }

    return log;
}
