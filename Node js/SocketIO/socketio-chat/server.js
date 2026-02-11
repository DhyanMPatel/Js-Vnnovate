const path = require("path");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  console.log("Client connected", socket.id);

  socket.on("chat:join", (username, ack) => {
    socket.username = username || `User-${socket.id.slice(0, 4)}`;
    socket.join("global");
    io.to("global").emit("chat:system", `${socket.username} joined the chat`);
    if (ack) ack({ status: "ok", username: socket.username });
  });

  socket.on("chat:message", (text) => {
    if (!socket.username) return;
    const payload = {
      user: socket.username,
      text,
      timestamp: Date.now(),
    };
    io.to("global").emit("chat:message", payload);
  });

  socket.on("disconnect", () => {
    if (!socket.username) return;
    io.to("global").emit("chat:system", `${socket.username} left the chat`);
  });
});

server.listen(PORT, () => {
  console.log(`Socket.IO chat server listening on http://localhost:${PORT}`);
});
