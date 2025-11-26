/**
 * Express Routes
 * → Same functionality as Node Core router but using Express Router
 */

import express from "express";
import { handleHome } from "./controllers/homeController.js";
import { handleUsers } from "./controllers/userController.js";
import path from "path";
import { fileURLToPath } from "url";

// Get current directory path in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// GET / - Home
router.get("/", handleHome);

// GET /users - List users
router.get("/users", handleUsers);

// POST /users - Add user (JSON)
router.post("/users", handleUsers);

// POST /api/register - Add user (from HTML form)
router.post("/api/register", handleUsers);

// GET /create-user - Serve HTML form
router.get("/create-user", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "create-user.html"));
});

export { router };
