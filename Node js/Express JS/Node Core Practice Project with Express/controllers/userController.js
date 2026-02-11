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
      return;
    } catch (error) {
      res.status(500).json({ message: "Error fetching users" });
      return;
    }
  }

  if (method === "POST" && req.params.id) {
    try {
      const { message } = req.body;
      const file = req.file;

      let users = await getUsers();

      let UpdatedUser = users.find((user) => user.id == req.params.id);

      UpdatedUser = {
        ...UpdatedUser,
        message: message,
        file: {
          name: file.originalname,
          path: file.path,
        },
      };

      const updatedUsers = users.map((user) => {
        if (user.id == UpdatedUser.id) {
          return UpdatedUser;
        }
        return user
      });

      await saveUsers(updatedUsers);

      res.json({ message: "User Updated", data: UpdatedUser });
      return;
    } catch (error) {
      res.status(400).json({ message: "Invalid data", error: error.message });
      return;
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
      return;
    } catch (error) {
      res.status(400).json({ message: "Invalid data", error: error.message });
      return;
    }
  }
}

export { handleUsers };
