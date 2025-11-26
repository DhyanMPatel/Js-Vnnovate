/**
 * NODE CORE PRACTICE PROJECT WITH EXPRESS
 * → Same functionality as Node Core Project but using Express.js
 * → Demonstrates Express routing, middleware, and simplified responses
 */

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { router } from "./routes.js";
import { logRequest } from "./utils/logger.js";

// Get current directory path in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// Global variable example
global.appName = "Node Core Practice App with Express";

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static(path.join(__dirname, "public"))); // Serve static files
app.use(logRequest); // Custom logging middleware

// Routes
app.use("/", router);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} — App: ${global.appName}`);
});
