# dm-whispers
A bridge between Discord DMs and WebSockets

## What's Here
- `src/index.ts`: Entrypoint.
- `monitor.html`: A basic implementation of a WebSocket listener.
- `nodemon.json`, `tsconfig.json`: Basic config files for NodeMon and TypeScript, respectively.

## What's Not Here
- `src/secrets.json`: Secrets for Discord, in the following format:
  ```json
  {
    "discord": {
      "token": "<Discord bot API token>",
      "clientId": "<Discord bot client ID>"
    }
  }
  ```

## Payloads
Currently a minimal implementation designed for expansion, the server sends the user ID, user name, and the message text
for every message received to every WebSocket client connected.  This connection is unencrypted, so the provided
proof of concept should only be used locally.

### From Discord to WebSocket
```json
{
  "id": "<user ID as a string>",
  "name": "<user name>",
  "message": "<message text>"
}
```

### From WebSocket to Discord
```json
{
  "id": "<user ID to message>",
  "message": "<message text>"
}
```