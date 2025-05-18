// encounters.js

const encounterTable = {
    forest: ["Wolf Pack", "Treant", "Bandits"],
    swamp: ["Leech Hag", "Bog Fiend"],
    plains: ["Rogue Knight", "Wild Elk"],
    ruins: ["Undead Scout", "Haunted Armor"],
    mountains: ["Rock Troll", "Snow Wraith"]
};

function getRandomEncounter(terrain) {
    const options = encounterTable[terrain];
    if (!options) return null;
    const roll = Math.floor(Math.random() * options.length);
    return options[roll];
}

function checkForEncounter(terrain) {
    const chance = Math.random();
    if (chance < 0.5) return null;
    return getRandomEncounter(terrain);
}
