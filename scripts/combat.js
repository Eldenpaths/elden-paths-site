
// Basic Combat Engine for Elden Paths
// Uses d20 for hit, dX for damage, and terrain bonuses

function rollDice(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

// Basic terrain modifier system
const terrainBonuses = {
  forest: { defense: 2 },
  mountain: { defense: 1 },
  swamp: { defense: -1 },
  grassland: { defense: 0 },
  river: { defense: -2 },
  coastal: { defense: 0 },
  lake: { defense: 1 },
  desert: { defense: -1 },
  cliff: { defense: 2 },
  volcanic: { defense: -2 }
};

function simulateCombat(player, enemy, terrainType) {
  const playerRoll = rollDice(20);
  const enemyRoll = rollDice(20);

  const terrainBonus = terrainBonuses[terrainType] || { defense: 0 };

  const playerAttack = playerRoll + (player.attack || 0);
  const enemyDefense = enemy.defense + terrainBonus.defense;

  let result = `Player rolls ${playerRoll} +${player.attack || 0} = ${playerAttack}\n`;
  result += `Enemy defense is ${enemy.defense} + ${terrainBonus.defense} (terrain) = ${enemyDefense}\n`;

  if (playerAttack >= enemyDefense) {
    const damage = rollDice(player.weapon.damage);
    enemy.hp -= damage;
    result += `HIT! Enemy takes ${damage} damage. Remaining HP: ${enemy.hp}\n`;
  } else {
    result += "MISS! No damage dealt.\n";
  }

  return result;
}

// Example usage:
const player = { attack: 4, weapon: { name: "Iron Sword", damage: 8 } };
const enemy = { defense: 12, hp: 20 };
const terrain = "forest";

console.log(simulateCombat(player, enemy, terrain));
