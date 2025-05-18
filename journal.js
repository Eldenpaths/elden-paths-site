// journal.js

async function logToJournal(playerId, message) {
    const response = await fetch('player_journal.json');
    const journal = await response.json();
    if (!journal[playerId]) {
        journal[playerId] = [];
    }
    journal[playerId].push({ entry: message, timestamp: new Date().toISOString() });

    await fetch('player_journal.json', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(journal, null, 2)
    });
}
