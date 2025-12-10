# 🏆 Practical Socket.IO Projects

Here are project patterns you can implement with Socket.IO.

We will implement at least one real project in this folder.

---

## 1. Realtime Chat (to parallel ws chat)

- Features:
  - User joins with a name.
  - Broadcast chat messages to a room.
  - System messages for join/leave.
- Concepts:
  - Rooms (`room = "global"` or multiple rooms).
  - Named events (`chat:message`, `system:message`).

---

## 2. Notifications / Activity Feed

- Features:
  - Server pushes notifications for certain users.
  - Use per-user rooms (`room = userId`).
- Concepts:
  - Private rooms, server-initiated events.

---

## 3. Game Lobby / Presence

- Features:
  - Show list of online users.
  - Users join/leave lobbies.

---

## Real Project in This Repo

We’ll create:

- `socketio-chat/`
  - `package.json`
  - `server.js`
  - `public/index.html`

This will be similar to `simple-chat-ws` but using Socket.IO.

[← Scaling & Security](./03_scaling_security.md) | [Next: socketio-chat project (code in subfolder)]
