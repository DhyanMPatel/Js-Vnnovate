# Express JS

### What is Express.js

- Express js is a `minimal and flexible` Node.js **framework** that provides a **robust set of features** to develop web and mobile applications.

- Simplifies `server-side coding` by **providing a layer** of fundamental web application features.
  1. `Built on Node.js` for **fast** and **scalable** server-side development.
  2. Simplifies `routing` and `middleware` handling for web applications.
  3. Supports building `REST APIs`, `real-time applications`, and `single-page applications`.
  4. Provides a `lightweight structure` for flexible and efficient server-side development.

#### Example

- the bellow example show how to handle Sever in Express JS

  ```js
  const express = require("express");

  const app = express();

  // Define a Route
  app.get("/", (req, res) => {
    res.send("Welcome to Express JS");
  });

  // Start the Server
  app.listen(3000, () => {
    console.log("Server is Running on http://localhost:3000 port...");
  });
  ```

### Need of Express.js

- **Simplifies Server Creation**: Helps in `quickly setting up and running a web server` without the need for complex coding.

- **Routing Management**: Provides a `powerful routing mechanism` to handle URLs and HTTP methods effectively.

- **Middleware Support**: Allows the `use of middleware functions to handle requests, responses`, and any middle operations, making code **module** and **maintainable**.

- **API Development**: Facilitates the creation of `RESTful APIs with ease`, allowing for the development of scalable and maintainable web applications.

- **Community and Plugins**: Provides access to a vast community of developers and plugins, making it easier to find solutions and extend functionality.

### Installing Express.js

- installation process of Express js in Node js project

  ```bash
  # If install Express permanently (inside Dependencies)
  npm install express
  #   OR
  npm install --save express

  # If install Express temporarily (inside DevDependencies)
  npm install --save-dev nodemon
  #   OR
  npm install nodemon --save-dev
  ```

  ```javascript
  // Then you can require express package
  const express = require("express");
  const app = express();
  ```

### Adding Middleware

- `Middleware` are the functions which are executed before the request reaches the route.
- `app.use()` is used to add middleware.

  ```js
  app.use((req, res, next) => {
    console.log("Middleware");
    next();
  });

  // Middleware can be route specific
  app.use("/route", (req, res, next) => {
    console.log("Middleware");
    res.send("Middleware 1 can pass response"); // If i write this then it will not execute bellow code
    next();
  });
  ```

  - `next()` is used to pass control to the next middleware function. `next()` is optional.
  - `res.send()` is work as `res.write()` and `res.writeHead()` because **res.send() automatically set Header**.

- **Note** : Most specific Middleware set first and least specific MiddleWare set at last. Because `Middleware` are executed in the order they are defined.

### Advanced Express.js for FAANG

### Why Advanced Express Knowledge Matters

- **Production Applications**: Build enterprise-grade applications
- **Performance**: Optimize for high-traffic scenarios
- **Security**: Implement robust security measures
- **Scalability**: Design for horizontal scaling
- **Maintainability**: Write clean, modular code

### Advanced Middleware Patterns

#### 1. Authentication Middleware

```javascript
// JWT Authentication Middleware
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      error: "Access token required",
      code: "TOKEN_MISSING",
    });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        error: "Invalid or expired token",
        code: "TOKEN_INVALID",
      });
    }

    req.user = user;
    next();
  });
};

// Role-based Authorization Middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: "Authentication required",
        code: "AUTH_REQUIRED",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: "Insufficient permissions",
        code: "INSUFFICIENT_PERMISSIONS",
        required: roles,
        current: req.user.role,
      });
    }

    next();
  };
};

// Usage
app.get("/admin/users", authenticateToken, authorize("admin"), getUsers);
app.get("/api/profile", authenticateToken, getProfile);
```

#### 2. Request Validation Middleware

```javascript
const Joi = require("joi");

// Generic validation middleware
const validate = (schema, property = "body") => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
        value: detail.context?.value,
      }));

      return res.status(400).json({
        error: "Validation failed",
        message: "Invalid input data",
        errors,
        timestamp: new Date().toISOString(),
      });
    }

    req[property] = value;
    next();
  };
};

// Validation schemas
const userSchemas = {
  register: Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(8)
      .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"))
      .required(),
    firstName: Joi.string().max(50),
    lastName: Joi.string().max(50),
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),

  updateProfile: Joi.object({
    firstName: Joi.string().max(50),
    lastName: Joi.string().max(50),
    bio: Joi.string().max(500),
    avatar: Joi.string().uri(),
  }).min(1),
};

// Usage
app.post("/api/auth/register", validate(userSchemas.register), registerUser);
app.post("/api/auth/login", validate(userSchemas.login), loginUser);
app.put(
  "/api/users/profile",
  authenticateToken,
  validate(userSchemas.updateProfile),
  updateProfile
);
```

#### 3. Rate Limiting Middleware

```javascript
const rateLimit = require("express-rate-limit");

// Different rate limits for different endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    error: "Too many authentication attempts",
    message: "Please try again later",
    retryAfter: "15 minutes",
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.ip, // Use IP as key
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, // 100 requests per 15 minutes
  message: {
    error: "Rate limit exceeded",
    message: "Too many requests, please try again later",
  },
  keyGenerator: (req) => {
    // Different limits for authenticated vs anonymous users
    return req.user ? `user:${req.user.id}` : `ip:${req.ip}`;
  },
});

// Usage
app.post("/api/auth/login", authLimiter, loginUser);
app.post("/api/auth/register", authLimiter, registerUser);
app.use("/api/", apiLimiter); // Apply to all API routes
```

#### 4. Security Middleware

```javascript
const helmet = require("helmet");
const cors = require("cors");

// Security headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"],
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
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [
      "http://localhost:3000",
    ];

    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Input sanitization
const sanitizeInput = (req, res, next) => {
  const sanitizeString = (str) => {
    if (typeof str !== "string") return str;
    return str.replace(
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      ""
    );
  };

  const sanitizeObject = (obj) => {
    if (typeof obj !== "object" || obj === null) return obj;

    const sanitized = Array.isArray(obj) ? [] : {};

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === "string") {
          sanitized[key] = sanitizeString(obj[key]);
        } else if (typeof obj[key] === "object") {
          sanitized[key] = sanitizeObject(obj[key]);
        } else {
          sanitized[key] = obj[key];
        }
      }
    }

    return sanitized;
  };

  // Sanitize request body, query, and params
  if (req.body) req.body = sanitizeObject(req.body);
  if (req.query) req.query = sanitizeObject(req.query);
  if (req.params) req.params = sanitizeObject(req.params);

  next();
};

app.use(sanitizeInput);
```

### Advanced Routing Patterns

#### 1. Route Composition

```javascript
// Route chaining for better organization
app
  .route("/api/users")
  .get(authenticateToken, getUsers)
  .post(validate(userSchemas.register), registerUser);

app
  .route("/api/users/:id")
  .get(authenticateToken, getUserById)
  .put(authenticateToken, validate(userSchemas.updateProfile), updateUser)
  .delete(authenticateToken, authorize("admin"), deleteUser);

// Nested routes
app.use("/api/users/:userId/posts", authenticateToken, postRoutes);
```

#### 2. Route Parameters and Validation

```javascript
// Parameter middleware for validation
app.param("id", async (req, res, next, id) => {
  // Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: "Invalid ID format",
      code: "INVALID_ID",
    });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        error: "User not found",
        code: "USER_NOT_FOUND",
      });
    }

    req.userFromParam = user;
    next();
  } catch (error) {
    next(error);
  }
});

// Usage in routes
app.get("/api/users/:id", authenticateToken, (req, res) => {
  res.json(req.userFromParam);
});
```

### Error Handling

#### 1. Custom Error Classes

```javascript
class AppError extends Error {
  constructor(message, statusCode, code = null) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  constructor(message, errors) {
    super(message, 400, "VALIDATION_ERROR");
    this.errors = errors;
  }
}

class NotFoundError extends AppError {
  constructor(resource) {
    super(`${resource} not found`, 404, "NOT_FOUND");
  }
}

class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401, "UNAUTHORIZED");
  }
}
```

#### 2. Global Error Handler

```javascript
const globalErrorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error
  console.error("Error:", {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get("User-Agent"),
    userId: req.user?.id,
    timestamp: new Date().toISOString(),
  });

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ValidationError(message, err.errors);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    error = new AppError(`${field} already exists`, 400, "DUPLICATE_FIELD");
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    error = new UnauthorizedError("Invalid token");
  }

  if (err.name === "TokenExpiredError") {
    error = new UnauthorizedError("Token expired");
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Internal Server Error",
    code: error.code,
    ...(process.env.NODE_ENV === "development" && {
      stack: error.stack,
      details: error.errors,
    }),
  });
};

// 404 handler
const notFound = (req, res, next) => {
  const error = new NotFoundError("Route");
  next(error);
};

// Apply error handlers
app.use(notFound);
app.use(globalErrorHandler);
```

### Performance Optimization

#### 1. Compression Middleware

```javascript
const compression = require("compression");

app.use(
  compression({
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) {
        return false;
      }
      return compression.filter(req, res);
    },
    level: 6,
    threshold: 1024,
  })
);
```

#### 2. Response Caching

```javascript
const NodeCache = require("node-cache");

const cache = new NodeCache({
  stdTTL: 300, // 5 minutes
  checkperiod: 60,
});

const cacheMiddleware = (duration = 300) => {
  return (req, res, next) => {
    const key = req.originalUrl;
    const cached = cache.get(key);

    if (cached) {
      res.set("X-Cache", "HIT");
      return res.json(cached);
    }

    // Override res.json to cache response
    const originalJson = res.json;
    res.json = function (data) {
      cache.set(key, data, duration);
      res.set("X-Cache", "MISS");
      return originalJson.call(this, data);
    };

    next();
  };
};

// Usage
app.get("/api/users", authenticateToken, cacheMiddleware(600), getUsers);
```

### Request Logging and Monitoring

#### 1. Request Logger Middleware

```javascript
const morgan = require("morgan");

// Custom format for request logging
morgan.token("id", (req) => req.id);
morgan.token("user", (req) => req.user?.id || "anonymous");

const requestFormat =
  ":id :method :url :status :res[content-length] - :response-time ms - :user - :user-agent";

// Generate unique request ID
const requestId = (req, res, next) => {
  req.id = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  next();
};

app.use(requestId);
app.use(morgan(requestFormat));

// Performance monitoring
const performanceMonitor = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;

    // Log slow requests
    if (duration > 1000) {
      console.warn(
        `Slow request: ${req.method} ${req.originalUrl} took ${duration}ms`
      );
    }

    // Store metrics (could send to monitoring service)
    // metrics.record('request_duration', duration, {
    //   method: req.method,
    //   route: req.route?.path,
    //   status: res.statusCode
    // });
  });

  next();
};

app.use(performanceMonitor);
```

### FAANG Interview Questions on Express

#### 1. "How would you implement authentication middleware in Express?"

```javascript
// Answer: Use JWT tokens, create authentication middleware that verifies tokens,
// implement role-based authorization, handle token refresh, and secure endpoints.
```

#### 2. "What are the best practices for Express error handling?"

```javascript
// Answer: Use custom error classes, global error handlers, proper HTTP status codes,
// structured logging, error monitoring services, and graceful error responses.
```

#### 3. "How would you optimize Express application performance?"

```javascript
// Answer: Use compression, caching middleware, connection pooling, clustering,
// response compression, static file serving, and performance monitoring.
```

### Express.js Best Practices for Production

#### 1. Security Checklist

- [ ] Use helmet for security headers
- [ ] Implement proper CORS configuration
- [ ] Sanitize all user inputs
- [ ] Use rate limiting
- [ ] Implement authentication and authorization
- [ ] Use HTTPS in production
- [ ] Validate all incoming data
- [ ] Implement proper session management

#### 2. Performance Checklist

- [ ] Enable response compression
- [ ] Implement caching strategies
- [ ] Use clustering for CPU-intensive tasks
- [ ] Optimize database queries
- [ ] Use connection pooling
- [ ] Monitor application performance
- [ ] Implement proper logging
- [ ] Use CDN for static assets

#### 3. Reliability Checklist

- [ ] Implement comprehensive error handling
- [ ] Use health check endpoints
- [ ] Implement graceful shutdown
- [ ] Use proper logging and monitoring
- [ ] Implement circuit breakers for external services
- [ ] Use retry mechanisms for failed requests
- [ ] Implement backup and recovery strategies
- [ ] Use environment-specific configurations

### [Assignment 2 (use of `middleware`, `routes`, `Serve Static files` such as **.js**, **.css**, etc.) ](./Assignement%202/ReadMe.md)

### Sending Response

### Express DeepDive

### Handling Routes

### Wrap up

- This is a whole summery of Learning Basic Express js

![Basic Express Wrap up](./Basic%20Express%20wrap%20up.png)

## Note :

- Go Back to Improved Development

[Improved Development Workflow and Debugging](../../ImprovedDevelopment/intro.md)

- Go Next Topic is Working with Dynamic Content & Adding Template Engines

[Dynamic Content & Template](../Dynamic%20Content%20&%20Template%20Engine/intro.md)
