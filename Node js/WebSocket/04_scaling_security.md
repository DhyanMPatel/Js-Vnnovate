# ⚡ Scaling & Security for WebSockets

WebSockets introduce **stateful** connections and require careful handling in production.

---

## 1. Scaling WebSocket Servers

### 1.1 Single Node Process

- Suitable for small apps, dev, prototypes.
- All clients connect to one Node process.

Limitations:

- Limited by single process CPU/memory.
- No horizontal scaling.

### 1.2 Multiple Processes / Servers

To scale, you usually:

- Run multiple Node processes or containers.
- Put a **load balancer** in front.
- Share state between processes using:
  - Redis pub/sub
  - Message queues
  - Shared in-memory stores

For chat/broadcast:

- Publish events to Redis.
- Each process subscribes and broadcasts to its own clients.

---

## 2. Security Considerations

### 2.1 Authentication

Common strategies:

- **JWT in query string / headers** during handshake.
- **Cookie/session** based auth if same origin.

Example (conceptual):

```js
const server = new WebSocket.Server({
  noServer: true,
});

httpServer.on("upgrade", (req, socket, head) => {
  // Check auth before accepting
  const token = extractTokenFromRequest(req);
  const user = verifyTokenOrNull(token);

  if (!user) {
    socket.destroy();
    return;
  }

  server.handleUpgrade(req, socket, head, (ws) => {
    ws.user = user; // attach to socket
    server.emit("connection", ws, req);
  });
});
```

### 2.2 Authorization

Within message handlers:

- Check user roles/permissions before handling a message.

```js
ws.on("message", (raw) => {
  const msg = JSON.parse(raw.toString());

  if (msg.type === "adminAction" && !ws.user.isAdmin) {
    ws.send(JSON.stringify({ error: "Not authorized" }));
    return;
  }

  // handle message
});
```

### 2.3 Input Validation

- Never trust incoming messages.
- Validate JSON shape, sizes, message rates.

---

## 3. Rate Limiting & Abuse Protection

- Track messages per connection per time window.
- Disconnect or throttle abusive clients.

Conceptual example:

```js
const LIMIT = 50; // 50 messages
const WINDOW_MS = 10000; // per 10 seconds

server.on("connection", (ws) => {
  ws.msgCount = 0;
  ws.windowStart = Date.now();

  ws.on("message", () => {
    const now = Date.now();
    if (now - ws.windowStart > WINDOW_MS) {
      ws.windowStart = now;
      ws.msgCount = 0;
    }

    ws.msgCount++;

    if (ws.msgCount > LIMIT) {
      ws.send(JSON.stringify({ error: "Rate limit exceeded" }));
      ws.close(1008, "Rate limit");
      return;
    }

    // handle message normally
  });
});
```

---

## 4. Observability

Track:

- Number of active connections.
- Connection churn (connects/disconnects per minute).
- Message throughput.
- Errors and disconnect reasons.

This is similar to DB/HTTP monitoring, but focused on long-lived connections.

---

## Interview-Oriented Notes

Be able to discuss:

- How to scale WebSockets (multiple processes, Redis pub/sub).
- How to authenticate WebSocket connections.
- How to protect against abuse (rate limiting, validation).
- How WebSockets fit into a microservices architecture.

[← Node.js + ws Basics](./03_node_ws_basics.md) | [Next: Practical Projects Overview →](./05_practical_projects.md)
