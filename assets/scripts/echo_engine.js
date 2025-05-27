
const log = document.getElementById('log');
const input = document.getElementById('prompt');

function submitPrompt() {
  const text = input.value.trim();
  if (text.length > 0) {
    log.innerHTML += `\n> ${text}\n`;
    log.scrollTop = log.scrollHeight;

    const trailEcho = {
      tile: "A3",
      player: "Echo Wanderer",
      prompt: text,
      timestamp: new Date().toISOString()
    };

    // Simulated response – replace with GPT/API call if needed
    setTimeout(() => {
      const result = `🧠 (system): A soft hum answers your words, as if something ancient is waking...`;
      log.innerHTML += result + "\n";
      log.scrollTop = log.scrollHeight;
      trailEcho.result = result;

      // Append to echo_log.json (local emulation)
      fetch("echo_log.json")
        .then(res => res.json())
        .then(data => {
          data.entries.push(trailEcho);
          return fetch("echo_log.json", {
            method: "POST",
            body: JSON.stringify(data, null, 2),
            headers: { "Content-Type": "application/json" }
          });
        });
    }, 800);

    input.value = "";
  }
}
