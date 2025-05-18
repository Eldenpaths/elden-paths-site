// loot.js

const lootTable = {
    forest: ["Worn Pelt", "Healing Herb", "Wooden Trinket"],
    ruins: ["Rusty Blade", "Ancient Coin", "Cursed Charm"],
    plains: ["Traveler's Boots", "Torn Map", "Old Canteen"],
    swamp: ["Swamp Slime", "Rotting Root", "Bog Pearl"],
    mountains: ["Stone Figurine", "Ore Chunk", "Troll Tooth"]
};

function rollLoot(terrain) {
    const pool = lootTable[terrain] || [];
    const roll = Math.floor(Math.random() * pool.length);
    return pool[roll] || "Nothing";
}
