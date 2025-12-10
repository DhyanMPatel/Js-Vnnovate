const http = require("http");
const path = require("path");
const fs = require("fs");
const WebSocket = require("ws");

const PORT = process.env.PORT || 8080;

// Simple HTTP server to serve the static client
const server = http.createServer((req, res) => {
  const url = req.url === "/" ? "/index.html" : req.url;
  const filePath = path.join(__dirname, "public", url);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    const ext = path.extname(filePath);
    const type = ext === ".html" ? "text/html" : "text/javascript";
    res.writeHead(200, { "Content-Type": type });
    res.end(data);
  });
});

// Attach WebSocket server to HTTP server
const wss = new WebSocket.Server({ server });

let nextId = 1;

function broadcast(data) {
  const message = JSON.stringify(data);
  for (const client of wss.clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  }
}

wss.on("connection", (ws) => {
  const userId = nextId++;

  console.log(`Client ${userId} connected`);

  ws.send(
    JSON.stringify({
      type: "system",
      text: `Welcome! You are user #${userId}`,
    })
  );

  broadcast({
    type: "system",
    text: `User #${userId} joined the chat`,
  });

  ws.on("message", (raw) => {
    let msg;
    try {
      msg = JSON.parse(raw.toString());
    } catch (e) {
      ws.send(JSON.stringify({ type: "error", text: "Invalid JSON" }));
      return;
    }

    if (msg.type === "chat" && typeof msg.text === "string") {
      const payload = {
        type: "chat",
        userId,
        text: msg.text,
        timestamp: Date.now(),
      };
      broadcast(payload);
    }
  });

  ws.on("close", () => {
    console.log(`Client ${userId} disconnected`);
    broadcast({
      type: "system",
      text: `User #${userId} left the chat`,
    });
  });
});

server.listen(PORT, () => {
  console.log(`HTTP/WebSocket server listening at http://localhost:${PORT}`);
});
