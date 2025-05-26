// combat.js - Core Combat Loop for Elden Paths

function rollDie(sides = 20) {
  return Math.floor(Math.random() * sides) + 1;
}

function resolveCombat(player, enemy) {
  const combatLog = [];

  let round = 1;
  let playerHP = player.hp;
  let enemyHP = enemy.hp;

  combatLog.push(`⚔️ Combat begins between ${player.name} and ${enemy.name}`);

  while (playerHP > 0 && enemyHP > 0) {
    combatLog.push(`--- Round ${round} ---`);

    // Player's attack
    const playerRoll = rollDie(20);
    if (playerRoll >= enemy.ac) {
      const dmg = rollDie(player.weapon.dmg) + player.weapon.mod;
      enemyHP -= dmg;
      combatLog.push(`🗡️ ${player.name} hits for ${dmg} (roll ${playerRoll}) → Enemy HP: ${Math.max(enemyHP, 0)}`);
    } else {
      combatLog.push(`🔁 ${player.name} misses (roll ${playerRoll})`);
    }

    if (enemyHP <= 0) break;

    // Enemy's attack
    const enemyRoll = rollDie(20);
    if (enemyRoll >= player.ac) {
      const dmg = rollDie(enemy.weapon.dmg) + enemy.weapon.mod;
      playerHP -= dmg;
      combatLog.push(`💥 ${enemy.name} hits for ${dmg} (roll ${enemyRoll}) → Player HP: ${Math.max(playerHP, 0)}`);
    } else {
      combatLog.push(`🛡️ ${enemy.name} misses (roll ${enemyRoll})`);
    }

    round++;
  }

  const result = {
    playerFinalHP: Math.max(playerHP, 0),
    enemyFinalHP: Math.max(enemyHP, 0),
    outcome: playerHP > 0 ? "Victory" : "Defeat",
    log: combatLog
  };

  return result;
}

// Example usage
/*
const player = {
  name: "Ash",
  hp: 20,
  ac: 12,
  weapon: { dmg: 6, mod: 2 }
};

const enemy = {
  name: "Bograt",
  hp: 12,
  ac: 10,
  weapon: { dmg: 4, mod: 1 }
};

const battle = resolveCombat(player, enemy);
console.log(battle.log.join("\n"));
console.log("Outcome:", battle.outcome);
*/