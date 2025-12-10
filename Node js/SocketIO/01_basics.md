# 🏗️ Socket.IO Basics

## What is Socket.IO?

- A **library** for real-time communication.
- Works on top of WebSockets **and** other transports (fallbacks).
- Provides:
  - Event-based API (`socket.emit`, `socket.on`).
  - Automatic reconnection.
  - Rooms and namespaces.

### Socket.IO vs raw WebSocket (ws)

| Aspect            | ws (raw WebSocket)    | Socket.IO                         |
| ----------------- | --------------------- | --------------------------------- |
| Abstraction level | Low-level protocol    | Higher-level event system         |
| API               | `send` / `message`    | `emit` / `on` with event names    |
| Reconnection      | Manual                | Built-in                          |
| Rooms/namespaces  | Manual implementation | Built-in                          |
| Fallback          | WebSocket only        | WebSocket + long polling fallback |

You can say: **“Socket.IO is to WebSockets what Express is to HTTP”** – adds convenience.

---

## Minimal Socket.IO Server (Node.js)

```bash
npm install socket.io
```

```js
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "*", // adjust for production
  },
});

io.on("connection", (socket) => {
  console.log("Client connected", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Socket.IO server running on http://localhost:3000");
});
```

---

## Minimal Socket.IO Client (Browser)

Include client library (CDN example):

```html
<script src="https://cdn.socket.io/4.7.2/socket.io.min.js"></script>
<script>
  const socket = io("http://localhost:3000");

  socket.on("connect", () => {
    console.log("Connected", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected");
  });
</script>
```

---

## Event-Based Messaging

Unlike raw WebSockets (one `message` event), Socket.IO uses **named events**:

```js
// server
io.on("connection", (socket) => {
  socket.on("chat:message", (text) => {
    console.log("chat message", text);
  });
});

// client
socket.emit("chat:message", "Hello from client");
```

This makes your protocol easier to organize.

---

## Interview-Oriented Notes

Be ready to answer:

- What Socket.IO is and how it relates to WebSockets.
- Why you’d choose Socket.IO instead of raw `ws` for some projects.
- Basic connection and event model (`io.on('connection')`, `socket.on`, `socket.emit`).

[← Back to Intro](./intro.md) | [Next: Socket.IO Features →](./02_features.md)
