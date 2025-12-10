# 🔧 Socket.IO Features

Key features you should know for real projects and interviews.

---

## 1. Rooms

Rooms allow grouping sockets.

```js
io.on("connection", (socket) => {
  socket.join("room1");

  socket.on("chat:message", (text) => {
    // Send only to clients in room1
    io.to("room1").emit("chat:message", {
      userId: socket.id,
      text,
    });
  });
});
```

Use cases:

- Per-chat-room broadcasting.
- Per-user private room (`room = userId`).

---

## 2. Namespaces

Namespaces segment your connection space.

```js
const adminNamespace = io.of("/admin");

adminNamespace.on("connection", (socket) => {
  console.log("Admin connected", socket.id);
});
```

Clients connect with:

```js
const adminSocket = io("http://localhost:3000/admin");
```

Use cases:

- Admin vs public clients.
- Different features per namespace.

---

## 3. Acknowledgements

Socket.IO supports **ack callbacks** to confirm delivery/processing.

```js
// client
socket.emit("chat:message", "Hello", (response) => {
  console.log("Server ack:", response.status);
});

// server
io.on("connection", (socket) => {
  socket.on("chat:message", (text, callback) => {
    // Process message...
    callback({ status: "ok" });
  });
});
```

Useful for:

- Client knowing if an operation succeeded.
- implementing request/response patterns.

---

## 4. Reconnection

By default, Socket.IO clients automatically try to reconnect.

Config example:

```js
const socket = io("http://localhost:3000", {
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});
```

Events:

- `reconnect_attempt`
- `reconnect`
- `reconnect_failed`

This gives a better user experience than raw WebSockets.

---

## Interview-Oriented Notes

You should be able to mention:

- Rooms and namespaces: why and how.
- Event-based design and acknowledgements.
- Auto reconnection as a benefit over plain WebSockets.

[← Socket.IO Basics](./01_basics.md) | [Next: Scaling & Security →](./03_scaling_security.md)
