// inventory.js with rarity, types, and stat bonuses

let inventory = [];
let equippedWeapon = null;
let equippedArmor = null;

const rarityColors = {
    common: "#aaaaaa",
    uncommon: "#3cb043",
    rare: "#3498db",
    epic: "#9b59b6",
    relic: "#f1c40f"
};

function addItemToInventory(itemName) {
    const item = generateItem(itemName);
    inventory.push(item);
    updateInventoryUI();
}

function generateItem(name) {
    const rarities = ["common", "uncommon", "rare", "epic", "relic"];
    const roll = Math.random();
    const rarity = roll < 0.6 ? "common"
                  : roll < 0.8 ? "uncommon"
                  : roll < 0.93 ? "rare"
                  : roll < 0.99 ? "epic"
                  : "relic";

    let type = "misc";
    if (name.toLowerCase().includes("blade") || name.toLowerCase().includes("sword") || name.toLowerCase().includes("axe")) {
        type = "weapon";
    } else if (name.toLowerCase().includes("armor") || name.toLowerCase().includes("robe") || name.toLowerCase().includes("shield")) {
        type = "armor";
    }

    return { name, rarity, type };
}

function updateInventoryUI() {
    const container = document.getElementById("inventoryList");
    if (!container) return;
    container.innerHTML = "";

    if (inventory.length === 0) {
        container.innerHTML = "<p>(Empty)</p>";
        return;
    }

    inventory.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = item.name + " [" + item.rarity + "]";
        li.style.color = rarityColors[item.rarity] || "#000";
        li.style.cursor = "pointer";
        li.onclick = () => equipItem(item);
        container.appendChild(li);
    });

    updateEquipmentUI();
}

function updateEquipmentUI() {
    document.getElementById("equippedWeapon").textContent = equippedWeapon ? equippedWeapon.name + " (" + equippedWeapon.rarity + ")" : "(None)";
    document.getElementById("equippedArmor").textContent = equippedArmor ? equippedArmor.name + " (" + equippedArmor.rarity + ")" : "(None)";
}

function equipItem(item) {
    if (item.type === "armor") {
        equippedArmor = item;
    } else if (item.type === "weapon") {
        equippedWeapon = item;
    }
    updateEquipmentUI();
}
