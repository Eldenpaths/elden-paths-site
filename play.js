function submitCommand() {
  const input = document.getElementById("commandInput");
  const note = document.getElementById("sketchNote");
  const value = input.value.toLowerCase().trim();
  if (value === "go north") {
    note.textContent = "You head northward into the mist…";
    document.getElementById("sketchImage").src = "assets/img/north.png";
  } else if (value === "attack") {
    note.textContent = "You ready your blade for combat.";
    document.getElementById("sketchImage").src = "assets/img/attack.png";
  } else {
    note.textContent = `Command not recognized: ${value}`;
  }
  input.value = "";
}
