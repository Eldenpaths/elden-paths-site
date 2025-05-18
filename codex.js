// codex.js

async function unlockCodexEntry(enemyName) {
    const response = await fetch('unlocked_codex.json');
    const codex = await response.json();

    if (!codex.entries.includes(enemyName)) {
        codex.entries.push(enemyName);

        await fetch('unlocked_codex.json', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(codex, null, 2)
        });

        logToCombat(`📜 New Codex entry unlocked: ${enemyName}`);
    }
}
