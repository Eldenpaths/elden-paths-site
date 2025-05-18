// inventory.js

let inventory = [];

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
        container.appendChild(li);
    });
}

function toggleInventory() {
    const inv = document.getElementById("inventoryPanel");
    inv.style.display = inv.style.display === "none" ? "block" : "none";
}
