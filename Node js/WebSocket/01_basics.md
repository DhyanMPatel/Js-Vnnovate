# 🏗️ WebSocket Basics

## What is WebSocket?

- A **full-duplex**, **persistent** communication channel between client and server.
- Built on top of TCP.
- Starts as an HTTP(S) request, then **upgrades** to the WebSocket protocol.
- Allows **server → client** messages without the client polling.

### WebSocket vs HTTP/REST

| Aspect     | HTTP/REST                     | WebSocket                               |
| ---------- | ----------------------------- | --------------------------------------- |
| Connection | Request/response, short-lived | Long-lived persistent connection        |
| Direction  | Client → Server               | Client ↔ Server (bidirectional)         |
| Latency    | Higher (headers, new TCP)     | Lower (reused connection, small frames) |
| Use Cases  | CRUD APIs, documents          | Chat, live dashboards, games, trading   |

You **still** use REST/GraphQL for normal APIs; WebSockets are for **real-time** features.

---

## High-Level Flow

1. Client sends an HTTP request with `Upgrade: websocket` header.
2. Server responds with `101 Switching Protocols` if it agrees.
3. TCP connection is now a WebSocket connection.
4. Client and server send **frames** (messages) to each other until one side closes.

Example WebSocket URL:

- `ws://localhost:8080` – plain WebSocket.
- `wss://example.com/socket` – WebSocket over TLS (secure).

---

## Typical Use Cases

- **Chat applications** (one-to-one, group chat, support chat).
- **Notifications** (live updates, toasts, in-app alerts).
- **Live dashboards** (metrics, stock prices, IoT sensor data).
- **Multiplayer games** (position updates, events).
- **Collaborative editing** (e.g. shared document cursors).

In interviews, mention:

- Where WebSockets shine.
- When plain HTTP/GraphQL subscriptions/Server-Sent Events might be simpler.

---

## Simple Conceptual Example

Imagine a basic chat between browser and Node server.

1. Browser connects via `ws://localhost:8080`.
2. Each message is a small JSON object (e.g. `{ type: "chat", text: "Hi" }`).
3. Server broadcasts messages to all connected clients.

We’ll implement this with the `ws` package in later files.

---

## Interview-Oriented Notes

You should be able to explain:

- What problem WebSockets solve vs polling/long-polling.
- Why persistent connections are useful for real-time apps.
- Basic handshake idea (HTTP → WebSocket).

[← Back to Intro](./intro.md) | [Next: Protocol & Flow →](./02_protocol_and_flow.md)
