const http = require("http");
const path = require("path");
const fs = require("fs");
const WebSocket = require("ws");

const PORT = process.env.PORT || 8090;

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

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("Client connected to ticker");
  ws.send(JSON.stringify({ type: "info", text: "Subscribed to live ticker" }));
});

// Simulate ticker updates
const symbols = ["AAPL", "GOOG", "MSFT", "TSLA"];

function randomPrice(base) {
  const change = (Math.random() - 0.5) * 2; // -1 to +1
  return +(base + change).toFixed(2);
}

let prices = {
  AAPL: 185.0,
  GOOG: 140.0,
  MSFT: 335.0,
  TSLA: 250.0,
};

setInterval(() => {
  for (const symbol of symbols) {
    prices[symbol] = randomPrice(prices[symbol]);
  }

  const payload = {
    type: "ticker",
    timestamp: Date.now(),
    prices,
  };

  const message = JSON.stringify(payload);

  for (const client of wss.clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  }
}, 1000);

server.listen(PORT, () => {
  console.log(`Live ticker server at http://localhost:${PORT}`);
});
