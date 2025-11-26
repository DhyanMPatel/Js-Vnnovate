/**
 * Home Controller
 */

function handleHome(req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      message: "Welcome to Node Core Project",
      app: global.appName,
    })
  );
}

module.exports = { handleHome };
