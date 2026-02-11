# 🔍 WebSocket Protocol & Flow

This file focuses on **theory**: handshake, frames, ping/pong, and closing connections.

---

## 1. Handshake

### 1.1 Client → Server (HTTP Request)

A WebSocket starts as an HTTP request:

```http
GET /chat HTTP/1.1
Host: example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13
Origin: https://example.com
```

Important headers:

- `Upgrade: websocket` – ask server to switch protocol.
- `Connection: Upgrade` – indicates connection upgrade.
- `Sec-WebSocket-Key` – random base64 value for security.
- `Sec-WebSocket-Version` – protocol version (usually `13`).

### 1.2 Server → Client (HTTP Response)

If server accepts:

```http
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```

- Status `101` means protocol switch.
- `Sec-WebSocket-Accept` is computed from `Sec-WebSocket-Key`.

After this, the connection is no longer HTTP; it’s WebSocket.

---

## 2. Frames & Messages

WebSocket data is sent as **frames**:

- **Text frames** – UTF-8 text (JSON, strings, etc.).
- **Binary frames** – arbitrary binary data (images, protobuf, etc.).
- **Control frames** – ping, pong, close.

Most Node.js apps using `ws` will work with **text frames** containing JSON.

Example JSON payload:

```json
{
  "type": "chat",
  "user": "Dhyan",
  "text": "Hello there!"
}
```

---

## 3. Ping / Pong (Keep-Alive)

- `ping` frame: usually from server → client.
- `pong` frame: response from client.

Usage:

- Detect dead connections (client browser closed, network lost).
- Trigger timeouts and cleanup.

The `ws` library has built-in helpers to send ping/pong.

---

## 4. Closing Connections

Either side can send a **close** frame with an optional code + reason.

Common close codes (just awareness):

- `1000` – Normal closure.
- `1001` – Going away (server shutdown, page navigation).
- `1006` – Abnormal closure (no close frame received).

In Node.js (`ws`), you’ll typically call:

```js
socket.close(1000, "Going away");
```

The other side receives a `close` event.

---

## 5. Limitations & Considerations

- Requires **stateful connections** on server (unlike pure stateless HTTP).
- Load balancers and proxies must support WebSockets.
- Need strategies for:
  - Handling many concurrent connections.
  - Recovering from dropped connections.
  - Upgrading/downgrading features for clients that don’t support WebSockets.

---

## Interview-Oriented Notes

You don’t need to memorize wire-level details, but you should know:

- It starts as an HTTP `GET` with `Upgrade: websocket`.
- After `101 Switching Protocols`, you have a persistent TCP-based channel.
- There are different frame types (text, binary, control).
- Ping/pong are for health checks; close codes indicate reasons.

[← WebSocket Basics](./01_basics.md) | [Next: Node.js + ws Basics →](./03_node_ws_basics.md)
