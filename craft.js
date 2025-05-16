document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("craftForm");
  const tool = document.getElementById("tool");
  const materials = document.getElementById("materials");
  const result = document.getElementById("craftResult");
  const craftedList = document.getElementById("craftedList");

  let craftedItems = JSON.parse(localStorage.getItem("eldenCrafted")) || [];

  const renderCrafted = () => {
    craftedList.innerHTML = "";
    craftedItems.forEach((item, i) => {
      const li = document.createElement("li");
      li.textContent = item;
      craftedList.appendChild(li);
    });
  };

  const craftLogic = (tool, mats) => {
    const base = mats.join(" + ");
    switch (tool) {
      case "forge":
        return `Forged: ${base.toUpperCase()}`;
      case "workbench":
        return `Assembled: ${base}`;
      case "alchemy":
        return `Brewed: ${base.replaceAll(" ", "_")}`;
      default:
        return `Crafted: ${base}`;
    }
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const toolValue = tool.value;
    const mats = materials.value.split(",").map(m => m.trim()).filter(Boolean);

    if (!toolValue || mats.length === 0) return;

    const crafted = craftLogic(toolValue, mats);
    craftedItems.push(crafted);
    localStorage.setItem("eldenCrafted", JSON.stringify(craftedItems));

    result.innerHTML = `✅ <strong>${crafted}</strong> added to your items.`;
    materials.value = "";
    tool.value = "";
    renderCrafted();
  });

  renderCrafted();
});
