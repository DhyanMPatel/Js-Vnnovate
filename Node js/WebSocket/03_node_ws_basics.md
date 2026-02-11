# 🧩 Node.js + ws Basics

Here we start using the `ws` npm package to build simple WebSocket servers and clients.

> `ws` is a popular, low-level WebSocket library for Node.js.

---

## 1. Installing ws

In a Node project:

```bash
npm install ws
```

We will later create actual project folders using this.

---

## 2. Minimal WebSocket Server (Node.js)

```js
const WebSocket = require("ws");

const PORT = 8080;
const server = new WebSocket.Server({ port: PORT });

server.on("connection", (socket) => {
  console.log("Client connected");

  // Send a welcome message
  socket.send(
    JSON.stringify({ type: "welcome", message: "Hello from server" })
  );

  // Handle incoming messages
  socket.on("message", (data) => {
    try {
      const msg = JSON.parse(data.toString());
      console.log("Received message", msg);
    } catch (err) {
      console.error("Invalid JSON", err);
    }
  });

  // Handle close
  socket.on("close", () => {
    console.log("Client disconnected");
  });

  // Handle error
  socket.on("error", (err) => {
    console.error("Socket error", err);
  });
});

console.log(`WebSocket server running on ws://localhost:${PORT}`);
```

---

## 3. Minimal WebSocket Client (Browser)

In a browser console or a small HTML file:

```js
const socket = new WebSocket("ws://localhost:8080");

socket.addEventListener("open", () => {
  console.log("Connected to server");
  socket.send(JSON.stringify({ type: "hello", text: "Hi server" }));
});

socket.addEventListener("message", (event) => {
  const msg = JSON.parse(event.data);
  console.log("Received from server", msg);
});

socket.addEventListener("close", () => {
  console.log("Disconnected from server");
});
```

---

## 4. Broadcasting to All Clients

A common pattern: chat or notifications.

```js
const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 8080 });

function broadcast(data, excludeSocket = null) {
  const message = JSON.stringify(data);
  for (const client of server.clients) {
    if (client.readyState === WebSocket.OPEN && client !== excludeSocket) {
      client.send(message);
    }
  }
}

server.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("message", (raw) => {
    const msg = JSON.parse(raw.toString());

    if (msg.type === "chat") {
      broadcast({ type: "chat", text: msg.text }, socket);
    }
  });
});
```

This is the core of a simple **broadcast chat server**.

---

## 5. Heartbeats (Ping/Pong)

To detect dead clients, we can implement a heartbeat.

```js
function heartbeat() {
  this.isAlive = true;
}

const server = new WebSocket.Server({ port: 8080 });

server.on("connection", (ws) => {
  ws.isAlive = true;
  ws.on("pong", heartbeat);
});

const interval = setInterval(() => {
  for (const ws of server.clients) {
    if (!ws.isAlive) {
      ws.terminate();
      continue;
    }

    ws.isAlive = false;
    ws.ping();
  }
}, 30000);

server.on("close", () => {
  clearInterval(interval);
});
```

This pattern is often used in production apps.

---

## Interview-Oriented Notes

Be ready to explain / show:

- Minimal `ws` server and browser client.
- How to broadcast to multiple clients.
- How to implement a simple heartbeat with ping/pong.

[← Protocol & Flow](./02_protocol_and_flow.md) | [Next: Scaling & Security →](./04_scaling_security.md)
