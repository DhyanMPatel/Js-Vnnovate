# ⚡ Socket.IO Scaling & Security

Socket.IO shares many concerns with raw WebSockets but provides helpers and patterns.

---

## 1. Scaling Socket.IO

### 1.1 Multiple Node Processes

- Run multiple Node instances.
- Use a load balancer (Nginx, cloud LB).
- For broadcasting across instances, use **adapters**.

Example: Redis adapter

```bash
npm install @socket.io/redis-adapter ioredis
```

```js
const { createAdapter } = require("@socket.io/redis-adapter");
const { createClient } = require("ioredis");

const pubClient = createClient({ host: "localhost", port: 6379 });
const subClient = pubClient.duplicate();

io.adapter(createAdapter(pubClient, subClient));
```

Now `io.to("room1").emit(...)` works across multiple instances.

---

## 2. Authentication

Common pattern: use **middleware**.

```js
io.use((socket, next) => {
  const token = socket.handshake.auth?.token;
  const user = verifyTokenOrNull(token);

  if (!user) {
    return next(new Error("Unauthorized"));
  }

  socket.user = user;
  next();
});

io.on("connection", (socket) => {
  console.log("User connected", socket.user.id);
});
```

Client:

```js
const socket = io("http://localhost:3000", {
  auth: {
    token: "JWT_OR_SESSION_TOKEN",
  },
});
```

---

## 3. Authorization & Validation

Inside event handlers:

- Check `socket.user` roles/permissions.
- Validate message payloads (types, lengths, allowed values).

```js
socket.on("room:join", (roomName) => {
  if (!socket.user) return;
  if (!isSafeRoomName(roomName)) return;

  socket.join(roomName);
});
```

---

## 4. Rate Limiting & Abuse

- Track events per socket.
- Disconnect abusive clients.

Pattern is similar to the one you used with `ws`.

---

## Interview-Oriented Notes

Be able to answer:

- How to scale Socket.IO with multiple instances (Redis adapter).
- How to authenticate connections using middleware.
- How to protect against abuse (validation, rate limiting).

[← Socket.IO Features](./02_features.md) | [Next: Practical Projects →](./04_practical_projects.md)
