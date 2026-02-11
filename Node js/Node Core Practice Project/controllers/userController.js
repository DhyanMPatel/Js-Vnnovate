/**
 * Demonstrates:
 * → fs.readFile
 * → fs.writeFile
 * → Streams
 * → Buffer
 * → JSON parsing
 */

const { getUsers, saveUsers } = require("../utils/fileOps");

async function handleUsers(req, res) {
  const method = req.method;

  // GET /users
  if (method === "GET") {
    const users = await getUsers();
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(users));
  }

  // POST /users Or /create-user
  if (method === "POST") {
    let body = "";

    // Receive data chunk-by-chunk (Stream)
    req.on("data", (chunk) => {
      body += chunk; // data is stored in buffer chunks
    });

    req.on("end", async () => {
      try {
        const newUser = JSON.parse(body);
        const users = await getUsers();

        users.push({ id: Date.now(), ...newUser });
        await saveUsers(users);

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "User Added", data: newUser }));
      } catch (error) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ message: "Invalid JSON data", error: error.message })
        );
      }
    });
    return;
  }

  // Default
  res.writeHead(405, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Method Not Allowed" }));
}

module.exports = { handleUsers };
