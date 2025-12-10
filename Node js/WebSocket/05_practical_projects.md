# 🏆 Practical WebSocket Project Ideas (with ws)

This file describes multiple **project patterns** you can implement using `ws`.

We will create at least one real project in this folder to show experience.

---

## 1. Project: Simple Chat Server

- Tech: Node.js + `ws`, browser client.
- Features:
  - Multiple clients connect.
  - Messages are broadcast to everyone.
  - Server assigns random username or accepts from client.

Key concepts:

- Broadcasting.
- Basic message routing by `type`.

---

## 2. Project: Live Ticker / Notifications

- Tech: Node.js + `ws`, simulated random data.
- Features:
  - Server pushes updates periodically (e.g. fake stock prices).
  - Clients display live updates in UI.

Key concepts:

- Server-initiated messages.
- Periodic tasks (setInterval) with WebSockets.

---

## 3. Project: Collaborative Counter

- Tech: Node.js + `ws`.
- Features:
  - All clients see the same counter value.
  - When one client increments, all others update.

Key concepts:

- Shared state on the server.
- Broadcasting state changes.

---

## Real Project Implementation in This Repo

We will implement at least one real Node.js project in this folder:

- `simple-chat-ws/`
  - `package.json`
  - `server.js`
  - `public/index.html` (simple client)

Possibly a second small project (e.g. `live-ticker-ws/`) if needed.

[← Scaling & Security](./04_scaling_security.md) | [Next: Projects Folder (code) – see subdirectories]
