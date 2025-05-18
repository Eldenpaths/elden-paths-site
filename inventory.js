// inventory.js with equipment slots

let inventory = [];
let equippedWeapon = null;
let equippedArmor = null;

function addItemToInventory(item) {
    inventory.push(item);
    updateInventoryUI();
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
        li.textContent = item;
        li.style.cursor = "pointer";
        li.onclick = () => equipItem(item);
        container.appendChild(li);
    });

    updateEquipmentUI();
}

function updateEquipmentUI() {
    document.getElementById("equippedWeapon").textContent = equippedWeapon || "(None)";
    document.getElementById("equippedArmor").textContent = equippedArmor || "(None)";
}

function equipItem(item) {
    if (item.toLowerCase().includes("armor") || item.toLowerCase().includes("robe")) {
        equippedArmor = item;
    } else {
        equippedWeapon = item;
    }
    updateEquipmentUI();
}
