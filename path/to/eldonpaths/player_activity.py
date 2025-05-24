import json
from datetime import datetime, timedelta

def load_players(filename):
    with open(filename, 'r') as f:
        return json.load(f)

def filter_active_players(players, hours=20):
    now = datetime.utcnow()
    threshold = now - timedelta(hours=hours)
    active_players = []
    for p in players:
        last_active = datetime.strptime(p['last_active'], "%Y-%m-%dT%H:%M:%SZ")
        if last_active >= threshold:
            active_players.append(p)
    return active_players

def print_active_players(players):
    print(f"{'Username':<15} {'Location':<10} {'Last Active':<20} {'Status':<8} {'Pose':<10}")
    print('-'*65)
    for p in players:
        print(f"{p['username']:<15} {p['current_tile']:<10} {p['last_active']:<20} {p['session_status']:<8} {p['pose']:<10}")

if __name__ == "__main__":
    filename = "players.json"  # Change path if needed
    players = load_players(filename)
    active_players = filter_active_players(players, hours=20)
    print_active_players(active_players)
