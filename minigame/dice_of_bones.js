function rollDiceOfBones() {
  const die1 = Math.ceil(Math.random() * 6);
  const die2 = Math.ceil(Math.random() * 6);
  const total = die1 + die2;
  let outcome = "";

  if (total === 2 || total === 12) {
    outcome = "⚠️ The Skull — You lose double!";
  } else if (total === 7) {
    outcome = "🎉 The Rattle — You win triple!";
  } else if (total >= 9) {
    outcome = "😊 Solid bones — you win!";
  } else if (total <= 3) {
    outcome = "☠️ Cracked bones — you lose!";
  } else {
    outcome = "🌀 Tide pulls — draw again.";
  }

  return {
    die1,
    die2,
    total,
    outcome
  };
}