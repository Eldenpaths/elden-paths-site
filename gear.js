async function loadGear() {
  const res = await fetch('../data/gear.json');
  const gearData = await res.json();

  const container = document.getElementById('gear-container');
  container.innerHTML = '';

  Object.entries(gearData).forEach(([slot, item]) => {
    const div = document.createElement('div');
    div.className = 'gear-slot';
    div.innerHTML = `<strong>${slot}</strong>: ${item.name} (Durability: ${item.durability}, Weight: ${item.weight})`;
    container.appendChild(div);
  });
}

loadGear();