/**
 * Basic custom routing without Express
 * → Understand how frameworks internally work
 */

const fs = require("fs");
const path = require("path");
const { handleHome } = require("./controllers/homeController");
const { handleUsers } = require("./controllers/userController");

function routerHandler(req, res) {
  const { url, method } = req;

  if (url === "/" && method === "GET") return handleHome(req, res);

  if (url.startsWith("/users")) return handleUsers(req, res);

  if (url === "/api/register" && method === "POST")
    return handleUsers(req, res);

  if (url === "/create-user" && method === "GET") {
    const filePath = path.join(__dirname, "public", "create-user.html");

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "Error loading page" }));
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      return res.end(data);
    });
    return;
  }

  // Fallback route
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Route Not Found" }));
}

module.exports = { routerHandler };
