document.addEventListener('DOMContentLoaded', () => {
  fetch('data/inventory.json')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('inventory');
      data.items.forEach(item => {
        const div = document.createElement('div');
        div.textContent = `${item.name} (x${item.quantity})`;
        container.appendChild(div);
      });
    });
});