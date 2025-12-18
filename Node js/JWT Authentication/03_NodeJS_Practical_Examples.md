# Node.js Practical JWT Examples (Express)

## Libraries

Common library:

- `jsonwebtoken`

## Example 1: Sign an access token

```javascript
import jwt from "jsonwebtoken";

export function signAccessToken(user) {
  const payload = {
    sub: user.id,
    role: user.role,
  };

  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    algorithm: "HS256",
    expiresIn: "15m",
    issuer: "your-app",
    audience: "your-users",
  });
}
```

## Example 2: Verify token middleware

```javascript
import jwt from "jsonwebtoken";

export function authenticateAccessToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length)
    : null;

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET, {
      algorithms: ["HS256"],
      issuer: "your-app",
      audience: "your-users",
    });

    req.user = {
      id: decoded.sub,
      role: decoded.role,
    };

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
```

## Example 3: Authorization middleware (RBAC)

```javascript
export function requireRole(allowedRoles) {
  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Forbidden" });
    }

    next();
  };
}
```

## Example 4: Minimal Express routes (login + protected)

This is a minimal structure for interviews. In a real app, replace `fakeUserDb`.

```javascript
import express from "express";
import dotenv from "dotenv";
import { signAccessToken } from "./signAccessToken.js";
import { authenticateAccessToken } from "./authMiddleware.js";

dotenv.config();

const app = express();
app.use(express.json());

const fakeUserDb = new Map([
  ["dhyan", { id: "user_1", username: "dhyan", password: "123", role: "user" }],
  [
    "admin",
    { id: "user_2", username: "admin", password: "123", role: "admin" },
  ],
]);

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = fakeUserDb.get(username);
  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const accessToken = signAccessToken(user);
  return res.json({ accessToken });
});

app.get("/me", authenticateAccessToken, (req, res) => {
  return res.json({ user: req.user });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

## How to call protected APIs

- Login:
  - `POST /login` with JSON body `{ "username": "dhyan", "password": "123" }`
- Use access token:
  - `Authorization: Bearer <token>` on `/me`

## What to explain in interviews (while coding)

- You are using **short-lived access tokens**.
- You verify:
  - signature
  - `exp`
  - `issuer` + `audience`
  - algorithm allowlist
- You attach decoded identity to `req.user`.
- You separate:
  - authentication middleware
  - authorization middleware
