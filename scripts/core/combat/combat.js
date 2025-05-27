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
  player.combat_state = "engaged";

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

  // Final HP sync back to player object
  player.hp = Math.max(playerHP, 0);
  enemy.hp = Math.max(enemyHP, 0);

  if (player.hp <= 0) {
    player.combat_state = "defeated";
    player.wounds ??= [];
    player.wounds.push("knocked unconscious");

    player.death_count = (player.death_count || 0) + 1;
    combatLog.push(`☠️ ${player.name} is defeated!`);
  } else {
    player.combat_state = "idle";
    combatLog.push(`🏆 ${player.name} is victorious!`);
  }

  // Save updated state (if needed)
  if (typeof savePlayerState === "function") {
    savePlayerState(player); // Hook to your save system
  }

  const result = {
    playerFinalHP: player.hp,
    enemyFinalHP: enemy.hp,
    outcome: player.hp > 0 ? "Victory" : "Defeat",
    log: combatLog
  };

  return result;
}
