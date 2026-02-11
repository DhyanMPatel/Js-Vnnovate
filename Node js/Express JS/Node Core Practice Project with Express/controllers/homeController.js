/**
 * Home Controller - Express version
 */

function handleHome(req, res) {
  res.json({
    message: "Welcome to Node Core Project with Express",
    app: global.appName,
  });
}

export { handleHome };
