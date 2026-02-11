# Common Handlers Usage Guide

## Overview

This guide demonstrates how to use the Common Error Handler and Common Response Handler for Express.js applications. These handlers are designed for production-ready applications and FAANG interview preparation.

## Installation and Setup

### 1. Import the handlers

```javascript
const express = require("express");
const { ErrorUtils } = require("./commonErrorHandler");
const { createResponseMiddleware } = require("./commonResponseHandler");

const app = express();
```

### 2. Apply middleware

```javascript
// Apply response middleware first (before routes)
app.use(createResponseMiddleware());

// Apply error handlers at the end (after all routes)
app.use(ErrorUtils.notFoundHandler);
app.use(ErrorUtils.globalErrorHandler);
```

## Complete Example

```javascript
const express = require("express");
const { ErrorUtils } = require("./commonErrorHandler");
const { createResponseMiddleware } = require("./commonResponseHandler");

const app = express();

// Middleware
app.use(express.json());
app.use(createResponseMiddleware()); // Response handler middleware

// Request ID middleware
app.use((req, res, next) => {
  req.id = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  next();
});

// Routes with error handling
app.get(
  "/api/users",
  ErrorUtils.asyncErrorHandler(async (req, res) => {
    try {
      const users = await User.find();
      res.success(users, {
        message: "Users retrieved successfully",
        cache: true,
        cacheTime: 300,
      });
    } catch (error) {
      throw new ErrorUtils.DatabaseError("Failed to fetch users");
    }
  })
);

app.get(
  "/api/users/:id",
  ErrorUtils.asyncErrorHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ErrorUtils.ValidationError("Invalid user ID format");
    }

    const user = await User.findById(id);
    if (!user) {
      throw new ErrorUtils.NotFoundError("User");
    }

    res.success(user, {
      message: "User retrieved successfully",
    });
  })
);

app.post(
  "/api/users",
  ErrorUtils.asyncErrorHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      throw new ErrorUtils.ValidationError(
        "Username, email, and password are required"
      );
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ErrorUtils.ConflictError("User with this email already exists");
    }

    const user = new User({ username, email, password });
    await user.save();

    res.created(user, {
      message: "User created successfully",
      location: `/api/users/${user._id}`,
    });
  })
);

app.get(
  "/api/users/paginated",
  ErrorUtils.asyncErrorHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments();

    const pagination = {
      page,
      limit,
      total,
      hasNext: page * limit < total,
      hasPrev: page > 1,
    };

    res.successWithPagination(users, pagination, {
      message: "Users retrieved successfully",
    });
  })
);

// Protected route example
app.get(
  "/api/profile",
  ErrorUtils.asyncErrorHandler(async (req, res) => {
    // Assume authentication middleware sets req.user
    if (!req.user) {
      throw new ErrorUtils.UnauthorizedError("Authentication required");
    }

    res.success(req.user, {
      message: "Profile retrieved successfully",
    });
  })
);

// File download example
app.get(
  "/api/download/:filename",
  ErrorUtils.asyncErrorHandler(async (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, "downloads", filename);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      throw new ErrorUtils.NotFoundError("File");
    }

    res.download(filePath, {
      filename: `download_${filename}`,
      contentType: "application/pdf",
    });
  })
);

// Error handling middleware
app.use(ErrorUtils.notFoundHandler);
app.use(ErrorUtils.globalErrorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## Response Examples

### Success Response

```json
{
  "success": true,
  "data": {
    "id": "64a1b2c3d4e5f6789012345",
    "username": "johndoe",
    "email": "john@example.com"
  },
  "message": "User retrieved successfully",
  "timestamp": "2024-07-20T10:30:00.000Z",
  "requestId": "req_1721478600_abc123def"
}
```

### Paginated Response

```json
{
  "success": true,
  "data": [
    { "id": "1", "username": "user1" },
    { "id": "2", "username": "user2" }
  ],
  "message": "Users retrieved successfully",
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3,
    "hasNext": true,
    "hasPrev": false
  },
  "timestamp": "2024-07-20T10:30:00.000Z",
  "requestId": "req_1721478600_abc123def"
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "message": "User not found",
    "code": "NOT_FOUND",
    "statusCode": 404,
    "timestamp": "2024-07-20T10:30:00.000Z",
    "requestId": "req_1721478600_abc123def",
    "path": "/api/users/invalidid",
    "method": "GET"
  }
}
```

### Validation Error Response

```json
{
  "success": false,
  "error": {
    "message": "Validation failed",
    "code": "VALIDATION_ERROR",
    "errors": [
      {
        "field": "email",
        "message": "Email is required",
        "value": null
      },
      {
        "field": "password",
        "message": "Password must be at least 8 characters",
        "value": "123"
      }
    ],
    "timestamp": "2024-07-20T10:30:00.000Z",
    "requestId": "req_1721478600_abc123def"
  }
}
```

## Custom Error Classes

### Using Custom Errors

```javascript
// Validation Error
throw new ErrorUtils.ValidationError("Invalid input data", [
  { field: "email", message: "Email is invalid", value: "invalid-email" },
]);

// Not Found Error
throw new ErrorUtils.NotFoundError("Product");

// Unauthorized Error
throw new ErrorUtils.UnauthorizedError("Invalid token");

// Forbidden Error
throw new ErrorUtils.ForbiddenError("Admin access required");

// Conflict Error
throw new ErrorUtils.ConflictError("Email already exists");

// Database Error
throw new ErrorUtils.DatabaseError("Connection failed");

// External Service Error
throw new ErrorUtils.ExternalServiceError(
  "Payment Gateway",
  "Service unavailable"
);
```

### Creating Custom Errors

```javascript
class CustomBusinessError extends ErrorUtils.AppError {
  constructor(message, details = null) {
    super(message, 422, "BUSINESS_ERROR");
    this.details = details;
  }
}

// Usage
throw new CustomBusinessError("Insufficient balance", {
  currentBalance: 100,
  requiredAmount: 200,
});
```

## Advanced Features

### Response Caching

```javascript
app.get("/api/public-data", (req, res) => {
  const data = getPublicData();

  res.success(data, {
    cache: true,
    cacheTime: 3600, // 1 hour
    headers: {
      "X-Cache-Tags": "public-data,latest",
    },
  });
});
```

### File Streaming

```javascript
const fs = require("fs");
const path = require("path");

app.get("/api/stream/:filename", (req, res) => {
  const filePath = path.join(__dirname, "files", req.params.filename);
  const stream = fs.createReadStream(filePath);

  res.stream(stream, {
    contentType: "video/mp4",
    filename: req.params.filename,
  });
});
```

### CORS Handling

```javascript
const { ResponseHandler } = require("./commonResponseHandler");
const responseHandler = new ResponseHandler();

app.use((req, res, next) => {
  responseHandler.handleCors(req, res, next);
});
```

## Best Practices for FAANG Interviews

### 1. Error Handling

- Always use structured error responses
- Log errors comprehensively
- Never expose sensitive information in production
- Use appropriate HTTP status codes

### 2. Response Formatting

- Maintain consistent response structure
- Include timestamps and request IDs
- Provide meaningful messages
- Support pagination for list endpoints

### 3. Security

- Sanitize error messages
- Implement rate limiting
- Use security headers
- Validate all inputs

### 4. Performance

- Implement caching where appropriate
- Use compression for large responses
- Monitor response times
- Handle file uploads/downloads efficiently

### 5. Monitoring

- Include request IDs for tracing
- Log response times
- Track error rates
- Monitor API usage patterns

## Integration with Existing Code

### Adding to Existing Express App

```javascript
// In your main app file
const express = require("express");
const { ErrorUtils } = require("./commonErrorHandler");
const { createResponseMiddleware } = require("./commonResponseHandler");

const app = express();

// Existing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add response middleware
app.use(createResponseMiddleware());

// Add request ID middleware
app.use((req, res, next) => {
  req.id = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  next();
});

// Your existing routes
// ... existing routes ...

// Add error handlers at the end
app.use(ErrorUtils.notFoundHandler);
app.use(ErrorUtils.globalErrorHandler);
```

### Migrating Existing Routes

```javascript
// Before (basic Express)
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// After (with common handlers)
app.get(
  "/api/users",
  ErrorUtils.asyncErrorHandler(async (req, res) => {
    const users = await User.find();
    res.success(users, {
      message: "Users retrieved successfully",
    });
  })
);
```

This comprehensive setup provides production-ready error handling and response formatting suitable for FAANG-level applications and interviews.
