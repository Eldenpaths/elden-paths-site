import json
import os
from datetime import datetime, timedelta

# Load player data from file
def load_players(filename):
    if not os.path.exists(filename):
        print(f"⚠️ File not found: {filename}")
        return []
    with open(filename, 'r') as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            print("❌ Error parsing JSON.")
            return []

# Filter players active within the last N hours
def filter_active_players(players, hours=20):
    now = datetime.utcnow()
    threshold = now - timedelta(hours=hours)
    active_players = []
    for p in players:
        try:
            last_active = datetime.strptime(p['last_active'], "%Y-%m-%dT%H:%M:%SZ")
            if last_active >= threshold:
                active_players.append(p)
        except (KeyError, ValueError):
            continue  # Skip any malformed entries
    return active_players

# Nicely print a summary
def print_active_players(players):
    print(f"{'Username':<15} {'Location':<10} {'Last Active':<20} {'Status':<8} {'Pose':<10}")
    print('-' * 65)
    for p in players:
        print(f"{p.get('username','-'):<15} {p.get('current_tile','-'):<10} {p.get('last_active','-'):<20} {p.get('session_status','-'):<8} {p.get('pose','-'):<10}")

if __name__ == "__main__":
    # 🧭 Use consistent relative path for eldonpaths repo
    filename = os.path.join("path", "to", "eldonpaths", "players.json")  # <-- adjust as needed
    players = load_players(filename)
    active_players = filter_active_players(players, hours=20)
    print_active_players(active_players)
