/**
 * User Controller - Express version
 * → Demonstrates Express simplified request/response handling
 */

import { getUsers, saveUsers } from "../utils/fileOps.js";

async function handleUsers(req, res) {
  const method = req.method;

  // GET /users
  if (method === "GET") {
    try {
      const users = await getUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users" });
    }
  }

  // POST /users or /api/register
  if (method === "POST") {
    try {
      const newUser = req.body; // Express already parsed JSON
      const users = await getUsers();

      users.push({ id: Date.now(), ...newUser });
      await saveUsers(users);

      res.status(201).json({ message: "User Added", data: newUser });
    } catch (error) {
      res.status(400).json({ message: "Invalid data", error: error.message });
    }
  }
}

export { handleUsers };
