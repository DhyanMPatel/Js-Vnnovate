/**
 * BASIC NODE SERVER WITHOUT EXPRESS
 * → Handles routing, JSON parsing, headers, and responses
 * → Teaches built‑in modules: http, fs, path, url
 */

const http = require("http");
const { routerHandler } = require("./router");
const { logRequest } = require("./utils/logger");

// Global variable example
global.appName = "Node Core Practice App";

const server = http.createServer((req, res) => {
  logRequest(req); // Log every request

  // Basic route handler (similar to Express)
  routerHandler(req, res);
});

server.listen(5000, () => {
  console.log(`Server running on port 5000 — App: ${global.appName}`);
});
