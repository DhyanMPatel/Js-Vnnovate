# Security & Authentication in Node.js

## Security Fundamentals for FAANG

### Why Security Matters

- **Data Protection**: User data, API keys, sensitive information
- **Compliance**: GDPR, CCPA, industry regulations
- **Trust**: User confidence and brand reputation
- **Attack Prevention**: Common vulnerabilities and exploits

## Authentication vs Authorization

### Authentication (Who you are)

```javascript
// Password hashing with bcrypt
import bcrypt from "bcrypt";

class UserService {
  async register(username, password) {
    // Hash password with salt rounds (10-12 recommended)
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Store user with hashed password
    const user = {
      username,
      password: hashedPassword,
      createdAt: new Date(),
    };

    // Save to database
    return await this.saveUser(user);
  }

  async login(username, password) {
    const user = await this.findUserByUsername(username);
    if (!user) {
      throw new Error("User not found");
    }

    // Compare provided password with stored hash
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("Invalid password");
    }

    return user;
  }
}
```

### Authorization (What you can do)

```javascript
// Role-based access control (RBAC)
class AuthorizationMiddleware {
  static requireRole(roles) {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ error: "Authentication required" });
      }

      const userRole = req.user.role;
      const hasPermission = Array.isArray(roles)
        ? roles.includes(userRole)
        : userRole === roles;

      if (!hasPermission) {
        return res.status(403).json({
          error: "Insufficient permissions",
        });
      }

      next();
    };
  }

  static requireOwnership(resourceType) {
    return async (req, res, next) => {
      try {
        const resourceId = req.params.id;
        const userId = req.user.id;

        const resource = await this.getResource(resourceType, resourceId);

        if (!resource || resource.userId !== userId) {
          return res.status(403).json({
            error: "Access denied: not resource owner",
          });
        }

        req.resource = resource;
        next();
      } catch (error) {
        res.status(500).json({ error: "Authorization check failed" });
      }
    };
  }
}

// Usage in Express
app.get(
  "/admin/users",
  authenticateToken,
  AuthorizationMiddleware.requireRole(["admin", "super_admin"])
);

app.delete(
  "/posts/:id",
  authenticateToken,
  AuthorizationMiddleware.requireOwnership("post")
);
```

## JWT (JSON Web Tokens) Implementation

### JWT Structure and Security

```javascript
import jwt from "jsonwebtoken";
import crypto from "crypto";

class JWTService {
  constructor() {
    // Use environment variables for secrets
    this.accessTokenSecret = process.env.JWT_ACCESS_SECRET;
    this.refreshTokenSecret = process.env.JWT_REFRESH_SECRET;
    this.accessTokenExpiry = "15m";
    this.refreshTokenExpiry = "7d";
  }

  generateTokens(user) {
    const payload = {
      userId: user.id,
      username: user.username,
      role: user.role,
      // Add non-sensitive user data
    };

    const accessToken = jwt.sign(payload, this.accessTokenSecret, {
      expiresIn: this.accessTokenExpiry,
      issuer: "your-app",
      audience: "your-users",
    });

    const refreshToken = jwt.sign(
      { userId: user.id },
      this.refreshTokenSecret,
      { expiresIn: this.refreshTokenExpiry }
    );

    return { accessToken, refreshToken };
  }

  verifyAccessToken(token) {
    try {
      return jwt.verify(token, this.accessTokenSecret);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw new Error("Token expired");
      } else if (error.name === "JsonWebTokenError") {
        throw new Error("Invalid token");
      } else {
        throw new Error("Token verification failed");
      }
    }
  }

  async refreshTokens(refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, this.refreshTokenSecret);
      const user = await UserService.findById(decoded.userId);

      if (!user) {
        throw new Error("User not found");
      }

      return this.generateTokens(user);
    } catch (error) {
      throw new Error("Invalid refresh token");
    }
  }
}

// Token storage and revocation
class TokenStore {
  constructor() {
    // In production, use Redis for distributed token storage
    this.blacklistedTokens = new Set();
    this.refreshTokens = new Map(); // userId -> token
  }

  blacklistToken(token) {
    this.blacklistedTokens.add(token);
  }

  isTokenBlacklisted(token) {
    return this.blacklistedTokens.has(token);
  }

  storeRefreshToken(userId, token) {
    this.refreshTokens.set(userId, token);
  }

  revokeRefreshToken(userId) {
    this.refreshTokens.delete(userId);
  }
}
```

### Middleware Implementation

```javascript
// Authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  // Check if token is blacklisted
  if (tokenStore.isTokenBlacklisted(token)) {
    return res.status(401).json({ error: "Token revoked" });
  }

  try {
    const decoded = jwtService.verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
}

// Rate limiting middleware
import rateLimit from "express-rate-limit";

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per window
  message: "Too many authentication attempts, please try again later",
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply to auth routes
app.post("/login", authLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;

    // Input validation
    if (!username || !password) {
      return res.status(400).json({
        error: "Username and password required",
      });
    }

    const user = await userService.login(username, password);
    const tokens = jwtService.generateTokens(user);

    // Store refresh token
    tokenStore.storeRefreshToken(user.id, tokens.refreshToken);

    // Set secure HTTP-only cookies for refresh token
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      accessToken: tokens.accessToken,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});
```

## OAuth 2.0 Implementation with Passport.js

### Google OAuth Strategy

```javascript
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

// Google OAuth configuration
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
  scope: ['profile', 'email']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Find or create user
    let user = await UserService.findByGoogleId(profile.id);

    if (!user) {
      user = await UserService.createOAuthUser({
        googleId: profile.id,
        email: profile.emails[0].value,
        username: profile.displayName,
        avatar: profile.photos[0].value,
        provider: 'google'
      });
    }

    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

// JWT strategy for API authentication
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_ACCESS_SECRET
}, async (payload, done) => {
  try {
    const user = await UserService.findById(payload.userId);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
}));

// Serialize/deserialize user for sessions
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserService.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
}));
```

### OAuth Routes Implementation

```javascript
// Google authentication routes
app.get("/auth/google", passport.authenticate("google", { session: false }));

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  async (req, res) => {
    try {
      const tokens = jwtService.generateTokens(req.user);

      // Store refresh token
      tokenStore.storeRefreshToken(req.user.id, tokens.refreshToken);

      // Redirect to frontend with tokens
      res.redirect(
        `${process.env.FRONTEND_URL}/auth/callback?token=${tokens.accessToken}`
      );
    } catch (error) {
      res.redirect("/login?error=auth_failed");
    }
  }
);

// Protected API routes
app.get(
  "/api/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      user: {
        id: req.user.id,
        username: req.user.username,
        email: req.user.email,
        role: req.user.role,
      },
    });
  }
);
```

## Security Headers and CORS

### Helmet.js for Security Headers

```javascript
import helmet from "helmet";
import cors from "cors";

// Security middleware configuration
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:"],
        scriptSrc: ["'self'"],
        connectSrc: ["'self'", process.env.API_URL],
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
  })
);

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
```

## Input Validation and Sanitization

### Comprehensive Input Validation

```javascript
import { body, param, query, validationResult } from "express-validator";
import { sanitize } from "express-validator";

// User registration validation
const userRegistrationValidation = [
  body("username")
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can only contain letters, numbers, and underscores")
    .escape(), // Sanitize input

  body("email").isEmail().withMessage("Valid email required").normalizeEmail(), // Normalize email format

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage(
      "Password must contain uppercase, lowercase, number, and special character"
    ),

  // Custom validation
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match");
    }
    return true;
  }),
];

// Validation middleware
function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: "Validation failed",
      details: errors.array(),
    });
  }
  next();
}

// Usage
app.post(
  "/register",
  userRegistrationValidation,
  validateRequest,
  async (req, res) => {
    // Process registration
  }
);
```

### SQL Injection Prevention

```javascript
// Using parameterized queries with PostgreSQL
import { Pool } from "pg";

class DatabaseService {
  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      // SSL configuration for production
      ssl:
        process.env.NODE_ENV === "production"
          ? {
              rejectUnauthorized: false,
            }
          : false,
    });
  }

  async findUserByEmail(email) {
    const query = "SELECT * FROM users WHERE email = $1";
    const values = [email]; // Parameterized query prevents SQL injection

    try {
      const result = await this.pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw new Error("Database query failed");
    }
  }

  async createUser(userData) {
    const query = `
      INSERT INTO users (username, email, password_hash, created_at) 
      VALUES ($1, $2, $3, $4) 
      RETURNING id, username, email, created_at
    `;
    const values = [
      userData.username,
      userData.email,
      userData.passwordHash,
      new Date(),
    ];

    try {
      const result = await this.pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      if (error.code === "23505") {
        // Unique violation
        throw new Error("User already exists");
      }
      throw new Error("User creation failed");
    }
  }
}
```

## Session Management

### Secure Session Configuration

```javascript
import session from "express-session";
import connectRedis from "connect-redis";
import Redis from "redis";

// Redis client for session store
const redisClient = Redis.createClient({
  url: process.env.REDIS_URL,
});

const RedisStore = connectRedis(session);

// Session configuration
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
    name: "sessionId", // Avoid default session name
  })
);

// Session middleware for API routes
function requireSession(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Session required" });
  }
  next();
}
```

## Security Testing and Auditing

### Security Testing with Jest

```javascript
import request from "supertest";
import app from "../app";

describe("Security Tests", () => {
  describe("Authentication", () => {
    test("should reject login with SQL injection attempt", async () => {
      const maliciousInput = "admin'; DROP TABLE users; --";

      const response = await request(app).post("/login").send({
        username: maliciousInput,
        password: "password",
      });

      expect(response.status).toBe(401);
      // Verify database still exists
      const users = await DatabaseService.getAllUsers();
      expect(users).toBeDefined();
    });

    test("should reject XSS attempts in user input", async () => {
      const xssPayload = '<script>alert("XSS")</script>';

      const response = await request(app).post("/register").send({
        username: xssPayload,
        email: "test@example.com",
        password: "ValidPass123!",
      });

      expect(response.status).toBe(400);
      // Verify script tags are sanitized
      expect(response.body.details[0].value).not.toContain("<script>");
    });
  });

  describe("Authorization", () => {
    test("should prevent unauthorized access to admin routes", async () => {
      const userToken = await getRegularUserToken();

      const response = await request(app)
        .get("/admin/users")
        .set("Authorization", `Bearer ${userToken}`);

      expect(response.status).toBe(403);
    });
  });
});
```

## Security Monitoring and Logging

### Security Event Logging

```javascript
import winston from "winston";

// Security logger configuration
const securityLogger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "security.log" }),
    new winston.transports.Console(),
  ],
});

// Security monitoring middleware
function securityMonitor(req, res, next) {
  const startTime = Date.now();

  // Log suspicious activity
  if (req.body && typeof req.body === "object") {
    const suspiciousPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+\s*=/i,
      /union.*select/i,
      /drop.*table/i,
    ];

    const bodyString = JSON.stringify(req.body);
    const isSuspicious = suspiciousPatterns.some((pattern) =>
      pattern.test(bodyString)
    );

    if (isSuspicious) {
      securityLogger.warn("Suspicious request detected", {
        ip: req.ip,
        userAgent: req.get("User-Agent"),
        body: req.body,
        timestamp: new Date().toISOString(),
      });
    }
  }

  // Monitor response time
  res.on("finish", () => {
    const duration = Date.now() - startTime;

    if (duration > 5000) {
      // Slow requests
      securityLogger.info("Slow request detected", {
        method: req.method,
        url: req.url,
        duration,
        ip: req.ip,
      });
    }
  });

  next();
}

app.use(securityMonitor);
```

## Key Security Checklist for FAANG

### Authentication & Authorization

- [ ] Strong password hashing (bcrypt with 12+ rounds)
- [ ] JWT with proper expiration and refresh tokens
- [ ] Role-based access control (RBAC)
- [ ] OAuth 2.0 for third-party authentication
- [ ] Secure session management

### Input Validation & Sanitization

- [ ] Server-side validation for all inputs
- [ ] XSS prevention with proper escaping
- [ ] SQL injection prevention with parameterized queries
- [ ] File upload validation and scanning
- [ ] Rate limiting on sensitive endpoints

### Headers & CORS

- [ ] Security headers with Helmet.js
- [ ] Proper CORS configuration
- [ ] HTTPS enforcement in production
- [ ] Secure cookie settings
- [ ] CSP headers to prevent XSS

### Monitoring & Logging

- [ ] Security event logging
- [ ] Failed authentication monitoring
- [ ] Anomaly detection
- [ ] Regular security audits
- [ ] Penetration testing

## External Security Resources

- **OWASP Node.js Guide**: https://owasp.org/www-project-nodejs-goat/
- **Node.js Security Best Practices**: https://github.com/goldbergyoni/nodebestpractices#security
- **Passport.js Documentation**: http://www.passportjs.org/docs/
- **JWT Handbook**: https://jwt.io/introduction
- **NIST Cybersecurity Framework**: For enterprise security standards
