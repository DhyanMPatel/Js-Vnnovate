# Express.js Handlers: Basic to Advanced Learning Guide

## Learning Path Overview

This guide takes you from basic Express.js error/response handling to production-ready handlers suitable for FAANG interviews. Each level builds upon the previous one.

---

## Level 1: Basic Express.js Handling

### 1.1 Basic Error Handling

```javascript
const express = require("express");
const app = express();

// Basic route without error handling
app.get("/api/users", (req, res) => {
  // This will crash if User.find() fails
  const users = User.find();
  res.json(users);
});

// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});
```

**Problems with this approach:**

- No async error handling
- Generic error messages
- No logging structure
- No error classification

### 1.2 Basic Response Handling

```javascript
// Basic responses
app.get("/api/users", (req, res) => {
  res.json({ users: [] }); // Inconsistent structure
});

app.post("/api/users", (req, res) => {
  res.status(201).json({ message: "User created" }); // Different structure
});
```

**Problems with this approach:**

- Inconsistent response format
- No metadata
- No error handling
- Hard to maintain

---

## Level 2: Intermediate Handling

### 2.1 Better Error Handling

```javascript
// Simple async error wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Better error handling
app.get(
  "/api/users",
  asyncHandler(async (req, res) => {
    try {
      const users = await User.find();
      res.json({ success: true, data: users });
    } catch (error) {
      next(error);
    }
  })
);

// Improved error middleware
app.use((err, req, res, next) => {
  console.error("Error:", {
    message: err.message,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString(),
  });

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    error: message,
    timestamp: new Date().toISOString(),
  });
});
```

**Improvements:**

- Async error handling
- Better logging
- Consistent error format
- Status code handling

### 2.2 Better Response Handling

```javascript
// Response helper functions
const sendSuccess = (res, data, message = "Success", statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  });
};

const sendError = (res, message, statusCode = 500) => {
  res.status(statusCode).json({
    success: false,
    error: message,
    timestamp: new Date().toISOString(),
  });
};

// Usage
app.get(
  "/api/users",
  asyncHandler(async (req, res) => {
    const users = await User.find();
    sendSuccess(res, users, "Users retrieved successfully");
  })
);
```

**Improvements:**

- Consistent response format
- Helper functions
- Timestamps
- Success/error structure

---

## Level 3: Advanced Handling

### 3.1 Custom Error Classes

```javascript
// Custom error classes
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  constructor(message) {
    super(message, 400);
    this.name = "ValidationError";
  }
}

class NotFoundError extends AppError {
  constructor(resource = "Resource") {
    super(`${resource} not found`, 404);
    this.name = "NotFoundError";
  }
}

// Usage
app.get(
  "/api/users/:id",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new NotFoundError("User");
    }
    sendSuccess(res, user);
  })
);
```

### 3.2 Advanced Response Handling

```javascript
// Response handler class
class ResponseHandler {
  static success(res, data, options = {}) {
    const response = {
      success: true,
      data,
      message: options.message || "Success",
      timestamp: new Date().toISOString(),
    };

    if (options.metadata) {
      response.metadata = options.metadata;
    }

    res.status(options.statusCode || 200).json(response);
  }

  static created(res, data, options = {}) {
    this.success(res, data, {
      ...options,
      statusCode: 201,
      message: options.message || "Resource created",
    });
  }

  static paginated(res, data, pagination, options = {}) {
    const response = {
      success: true,
      data,
      message: options.message || "Data retrieved",
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total: pagination.total,
        totalPages: Math.ceil(pagination.total / pagination.limit),
      },
      timestamp: new Date().toISOString(),
    };

    res.status(200).json(response);
  }
}
```

---

## Level 4: Production-Ready Handlers

### 4.1 Comprehensive Error Handling

```javascript
// Production error handler (from commonErrorHandler.js)
const globalErrorHandler = (err, req, res, next) => {
  // Comprehensive logging
  const errorLog = {
    timestamp: new Date().toISOString(),
    requestId: req.id,
    error: {
      name: err.name,
      message: err.message,
      stack: err.stack,
    },
    request: {
      method: req.method,
      url: req.originalUrl,
      ip: req.ip,
      userAgent: req.get("User-Agent"),
    },
    user: req.user?.id || null,
  };

  console.error("ERROR_LOG:", JSON.stringify(errorLog, null, 2));

  // Handle specific error types
  let error = { ...err };
  error.message = err.message;

  if (err.name === "ValidationError") {
    error.statusCode = 400;
    error.code = "VALIDATION_ERROR";
  }

  if (err.code === 11000) {
    error.statusCode = 409;
    error.code = "DUPLICATE_FIELD";
  }

  // Development vs Production response
  const response = {
    success: false,
    error: {
      message: error.message || "Internal Server Error",
      code: error.code || "INTERNAL_ERROR",
      statusCode: error.statusCode || 500,
      timestamp: new Date().toISOString(),
      requestId: req.id,
      path: req.originalUrl,
    },
  };

  if (process.env.NODE_ENV === "development") {
    response.error.stack = error.stack;
  }

  res.status(error.statusCode || 500).json(response);
};
```

### 4.2 Advanced Response Handling

```javascript
// Production response handler (from commonResponseHandler.js)
class ResponseHandler {
  constructor() {
    this.defaultHeaders = {
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "X-XSS-Protection": "1; mode=block",
    };
  }

  setCommonHeaders(res, additionalHeaders = {}) {
    Object.entries(this.defaultHeaders).forEach(([key, value]) => {
      res.set(key, value);
    });
    Object.entries(additionalHeaders).forEach(([key, value]) => {
      res.set(key, value);
    });
  }

  success(res, data, options = {}) {
    const { statusCode = 200, message = "Success", headers = {} } = options;

    this.setCommonHeaders(res, headers);

    const response = {
      success: true,
      data,
      message,
      timestamp: new Date().toISOString(),
      requestId: res.req?.id || "N/A",
    };

    res.status(statusCode).json(response);
  }

  successWithPagination(res, data, pagination, options = {}) {
    const { statusCode = 200, message = "Data retrieved" } = options;

    this.setCommonHeaders(res);

    const response = {
      success: true,
      data,
      message,
      pagination: {
        page: pagination.page || 1,
        limit: pagination.limit || 10,
        total: pagination.total || 0,
        totalPages: Math.ceil(
          (pagination.total || 0) / (pagination.limit || 10)
        ),
        hasNext: pagination.page * pagination.limit < pagination.total,
        hasPrev: pagination.page > 1,
      },
      timestamp: new Date().toISOString(),
      requestId: res.req?.id || "N/A",
    };

    res.status(statusCode).json(response);
  }
}
```

---

## Level 5: Enterprise-Grade Handlers (FAANG Level)

### 5.1 Middleware Integration

```javascript
// Request ID middleware
const requestId = (req, res, next) => {
  req.id = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  res.set("X-Request-ID", req.id);
  next();
};

// Response middleware factory
const createResponseMiddleware = () => {
  const responseHandler = new ResponseHandler();

  return (req, res, next) => {
    // Attach response methods to res
    res.success = (data, opts) => responseHandler.success(res, data, opts);
    res.successWithPagination = (data, pagination, opts) =>
      responseHandler.successWithPagination(res, data, pagination, opts);
    res.created = (data, opts) => responseHandler.created(res, data, opts);
    res.error = (error, opts) => responseHandler.error(res, error, opts);
    res.validationError = (errors, opts) =>
      responseHandler.validationError(res, errors, opts);

    next();
  };
};

// Application setup
app.use(requestId);
app.use(createResponseMiddleware());
app.use(ErrorUtils.notFoundHandler);
app.use(ErrorUtils.globalErrorHandler);
```

### 5.2 Advanced Features

```javascript
// Rate limiting integration
const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: {
      message: "Too many requests",
      code: "RATE_LIMIT_EXCEEDED",
      retryAfter: 900,
    },
  },
});

// Caching middleware
const cacheMiddleware = (duration = 300) => {
  return (req, res, next) => {
    const key = req.originalUrl;
    const cached = cache.get(key);

    if (cached) {
      return res.success(cached, {
        headers: { "X-Cache": "HIT" },
      });
    }

    const originalJson = res.json;
    res.json = function (data) {
      cache.set(key, data, duration);
      res.set("X-Cache", "MISS");
      return originalJson.call(this, data);
    };

    next();
  };
};

// Usage with all features
app.get(
  "/api/users",
  apiLimiter,
  cacheMiddleware(600),
  ErrorUtils.asyncErrorHandler(async (req, res) => {
    const users = await User.find();
    res.success(users, {
      message: "Users retrieved successfully",
      cache: true,
      cacheTime: 600,
    });
  })
);
```

---

## Migration Path

### From Basic to Advanced

1. **Start with Level 1**: Understand basic Express patterns
2. **Move to Level 2**: Add async error handling and consistent responses
3. **Progress to Level 3**: Implement custom error classes and response helpers
4. **Reach Level 4**: Use production-ready handlers with logging and security
5. **Achieve Level 5**: Integrate enterprise features (rate limiting, caching, monitoring)

### Implementation Steps

```javascript
// Step 1: Basic setup
const express = require("express");
const app = express();

// Step 2: Add middleware
app.use(express.json());
app.use(requestId);

// Step 3: Add response middleware
app.use(createResponseMiddleware());

// Step 4: Add error handlers
app.use(ErrorUtils.notFoundHandler);
app.use(ErrorUtils.globalErrorHandler);

// Step 5: Implement routes with proper error handling
app.get(
  "/api/users",
  ErrorUtils.asyncErrorHandler(async (req, res) => {
    const users = await User.find();
    res.success(users);
  })
);
```

---

## Interview Preparation Checklist

### Basic Concepts (Must Know)

- [ ] Express middleware chain
- [ ] Error handling middleware
- [ ] Async/await error handling
- [ ] HTTP status codes
- [ ] JSON responses

### Intermediate Concepts (Should Know)

- [ ] Custom error classes
- [ ] Response formatting
- [ ] Request validation
- [ ] Logging and debugging
- [ ] Security headers

### Advanced Concepts (Good to Know)

- [ ] Rate limiting
- [ ] Response caching
- [ ] Request tracing
- [ ] Error monitoring
- [ ] Performance optimization

### Expert Concepts (FAANG Level)

- [ ] Distributed tracing
- [ ] Circuit breakers
- [ ] Graceful degradation
- [ ] Error aggregation
- [ ] Real-time monitoring

---

## Practice Exercises

### Exercise 1: Basic Error Handling

Create a simple Express app with basic error handling for a user API.

### Exercise 2: Custom Errors

Implement custom error classes for different scenarios (validation, not found, etc.).

### Exercise 3: Response Formatting

Create consistent response formats for success and error cases.

### Exercise 4: Production Setup

Integrate logging, security headers, and rate limiting.

### Exercise 5: Advanced Features

Add caching, monitoring, and distributed tracing.

This progression will help you understand each concept thoroughly before moving to more complex implementations.
