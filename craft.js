<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Elden Paths™ — Crafting</title>
  <link id="themeStylesheet" rel="stylesheet" href="style.css" />
  <script defer src="craft.js"></script>
  <script defer src="theme-toggle.js"></script>
</head>
<body>
  <div class="container">
    <div style="text-align:right; margin-bottom: 1em;">
      <label for="themeSelect">🎨 Theme:</label>
      <select id="themeSelect">
        <option value="default">Parchment</option>
        <option value="dark">Dark Mode</option>
        <option value="frazetta">Frazetta Mode</option>
        <option value="snow">Winter Fog</option>
      </select>
    </div>

    <h1>🛠 Crafting Station</h1>
    <form id="craftForm">
      <label for="tool">Crafting Tool or Station:</label>
      <select id="tool" required>
        <option value="">-- Select One --</option>
        <option value="forge">Forge 🔥</option>
        <option value="workbench">Workbench 🪵</option>
        <option value="alchemy">Alchemy Table ⚗️</option>
      </select>

      <label for="materials">Materials (comma-separated):</label>
      <input type="text" id="materials" placeholder="e.g., iron, leather, coal" required />

      <button type="submit">Craft Item</button>
    </form>

    <div id="craftResult" style="margin-top: 1em;"></div>

    <hr/>

    <h2>📦 Crafted Items</h2>
    <ul id="craftedList"></ul>
  </div>
</body>
</html>
