/**
 * Logging requests manually (timestamp + method + URL) - Express version
 * → Same functionality as Node Core Project but designed as Express middleware
 */

function logRequest(req, res, next) {
  const time = new Date().toISOString();
  console.log(`[${time}] ${req.method} ${req.url}`);
  next(); // Continue to next middleware/route
}

// Export as both function and middleware
export { logRequest };
