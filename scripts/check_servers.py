import a2s
import json
import os

# Load server list from ServerGrid.json
with open('ServerGrid.json', 'r') as f:
    grid = json.load(f)

def query_server(ip, port, name):
    try:
        info = a2s.info((ip, port))
        return {
            "Name": name,
            "State": "online",
            "Players": info.player_count,
            "MaxPlayers": info.max_players
        }
    except Exception as e:
        print(f"Error querying {ip}:{port} - {e}")
        return {
            "Name": name,
            "State": "offline",
            "Players": 0,
            "MaxPlayers": 0
        }

status_list = []
for server in grid['servers']:
    ip = server['ip']
    port = server['port']
    name = server['name'].split(' ')[0]
    result = query_server(ip, port, name)
    status_list.append(result)

# Ensure docs directory exists
os.makedirs("docs", exist_ok=True)
with open("docs/server_status.json", "w") as f:
    json.dump(status_list, f, indent=2)