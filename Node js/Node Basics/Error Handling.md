# Error Handling

- Error handling is a mandatory step in application development.
- A Node.js developer may work with both **synchronous** and **asynchronous** functions simultaneously.
- Handling errors in asynchronous functions is important because their behavior may vary, unlike synchronous functions.

## How to Handle Errors in Node?

- There are many approaches to handle errors in Node js like

  1. try-catch
  2. callback functions
  3. promises
  4. async-await

- **Note** : `Try-catch is synchronous` means that if an asynchronous function throws an error in a synchronous try/catch block, no error throws.

### 1. Using Try-Catch block

- The `try-catch block` can be used to handle errors thrown by a block of code.
- `Try-catch block` is synchronous. Meaning It can handle synchronous error only.

  ```js
  function dosomething() {
    throw new Error("a error is thrown from dosomething");
  }

  function init() {
    try {
      dosomething();
    } catch (e) {
      console.log(e);
    }
    console.log("After successful error handling");
  }
  init();
  ```

### 2. Using Callback functions

- A callback is a function `called at the completion` of a certain task
- It prevents any blocking and allows other code to be run in the meantime.
- Example :

  - The program does `not wait for the file reading` to complete and proceeds to print "**Program Ended**" while continuing to read the file. If any error occurs like the `file does not exist` in the system then the `error is printed after "Program Ended"`.

  ```js
  const fs = require("fs");

  fs.readFile("foo.txt", function (err, data) {
    if (err) {
      console.error(err);
    } else {
      console.log(data.toString());
    }
  });

  console.log("Program Ended");

  /// Output:

  // Program Ended
  // [Error: ENOENT: no such file or directory,
  // open 'C:\Users\User\Desktop\foo.txt'] {
  // errno: -4058,
  // code: 'ENOENT',
  // syscall: 'open',
  // path: 'C:\\Users\\User\\Desktop\\foo.txt'
  // }
  ```

### 3. Using promises and promise callbacks

- Promises are an **enhancement to Node.js callbacks**. When defining the callback, the value which is returned is called a **promise**.
- The key difference between a promise and a callback is the `return value`. There is `no concept of a return value in callbacks`.

- key points must know about promises

  - In order to use promises, the promise module must be installed and imported into the application.
  - The `.then` clause handles the output of the promise.
  - If an error occurs in any `.then` clause or if any of the promises above are rejects, it is passed to the immediate `.catch` clause.
  - In case of a promise is rejected, and there is no error handler then the program terminates.

  ```js
  const Promise = require("promise");
  const MongoClient = require("mongodb").MongoClient;
  const url = "mongodb://localhost/TestDB";
  MongoClient.connect(url)
    .then(function (err, db) {
      db.collection("Test").updateOne(
        {
          Name: "Joe",
        },
        {
          $set: {
            Name: "Beck",
          },
        }
      );
    })
    .catch((error) => alert(error.message));
  ```

  ```bash
  # Output

  # In this case we assume the url is wrong
  MongoError: failed to connect to server [localhost:27017]
  # error message may vary
  ```

### 4. Using async-await

- Async-await is a special syntax to work with promises in a simpler way that is easy to understand.
- Async-await can also be wrapped in a try-catch block for error handling.

  ```js
  async function f() {
    let response = await fetch("http://xyz.url");
  }
  // f() becomes a rejected promise
  f().catch(alert);
  ```

  ```bash
  # the url is wrong //
  TypeError: failed to fetch
  ```

## Advanced Error Handling for FAANG

### Why Advanced Error Handling Matters

- **Production Reliability**: Handle errors gracefully in production
- **User Experience**: Provide meaningful error messages to users
- **Debugging**: Comprehensive error tracking and logging
- **Monitoring**: Real-time error alerts and analytics
- **System Stability**: Prevent cascading failures

### Global Error Handling

#### 1. Process-Level Error Handlers

```javascript
// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);

  // Log to external service
  logError(error, "uncaughtException");

  // Graceful shutdown
  gracefulShutdown();
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);

  // Log to external service
  logError(reason, "unhandledRejection");

  // Continue running (don't crash the application)
});

// Handle warning events
process.on("warning", (warning) => {
  console.warn("Warning:", warning.name, warning.message);
  logWarning(warning);
});

// Graceful shutdown function
function gracefulShutdown() {
  console.log("Shutting down gracefully...");

  // Close database connections
  if (global.db) {
    global.db.close();
  }

  // Close server
  if (global.server) {
    global.server.close(() => {
      console.log("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
}
```

#### 2. Express Error Handling Middleware

```javascript
// Custom error class
class AppError extends Error {
  constructor(message, statusCode, code = null) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Async error wrapper
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Global error handler middleware
const globalErrorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error
  console.error(err);

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = "Resource not found";
    error = new AppError(message, 404, "CAST_ERROR");
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new AppError(message, 400, "DUPLICATE_FIELD");
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new AppError(message, 400, "VALIDATION_ERROR");
  }

  // JWT error
  if (err.name === "JsonWebTokenError") {
    const message = "Invalid token. Please log in again!";
    error = new AppError(message, 401, "INVALID_TOKEN");
  }

  // JWT expired error
  if (err.name === "TokenExpiredError") {
    const message = "Your token has expired! Please log in again.";
    error = new AppError(message, 401, "TOKEN_EXPIRED");
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Internal Server Error",
    code: error.code,
    stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
  });
};

// 404 handler
const notFound = (req, res, next) => {
  const error = new AppError(
    `Not found - ${req.originalUrl}`,
    404,
    "NOT_FOUND"
  );
  next(error);
};

// Usage in Express app
app.use(notFound);
app.use(globalErrorHandler);
```

### Circuit Breaker Pattern

#### 1. Circuit Breaker Implementation

```javascript
class CircuitBreaker {
  constructor(options = {}) {
    this.failureThreshold = options.failureThreshold || 5;
    this.resetTimeout = options.resetTimeout || 60000; // 1 minute
    this.monitoringPeriod = options.monitoringPeriod || 10000; // 10 seconds

    this.state = "CLOSED"; // CLOSED, OPEN, HALF_OPEN
    this.failureCount = 0;
    this.lastFailureTime = null;
    this.successCount = 0;
  }

  async execute(operation) {
    if (this.state === "OPEN") {
      if (Date.now() - this.lastFailureTime > this.resetTimeout) {
        this.state = "HALF_OPEN";
        this.successCount = 0;
      } else {
        throw new AppError(
          "Circuit breaker is OPEN",
          503,
          "CIRCUIT_BREAKER_OPEN"
        );
      }
    }

    try {
      const result = await operation();

      if (this.state === "HALF_OPEN") {
        this.successCount++;
        if (this.successCount >= 3) {
          this.reset();
        }
      } else {
        this.onSuccess();
      }

      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  onSuccess() {
    this.failureCount = 0;
    this.state = "CLOSED";
  }

  onFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();

    if (this.failureCount >= this.failureThreshold) {
      this.state = "OPEN";
    }
  }

  reset() {
    this.state = "CLOSED";
    this.failureCount = 0;
    this.successCount = 0;
    this.lastFailureTime = null;
  }

  getState() {
    return {
      state: this.state,
      failureCount: this.failureCount,
      lastFailureTime: this.lastFailureTime,
      successCount: this.successCount,
    };
  }
}

// Usage with external API calls
const apiCircuitBreaker = new CircuitBreaker({
  failureThreshold: 3,
  resetTimeout: 30000,
});

async function callExternalAPI(url) {
  return apiCircuitBreaker.execute(async () => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }
    return response.json();
  });
}
```

### Retry Mechanisms

#### 1. Exponential Backoff Retry

```javascript
class RetryHandler {
  constructor(options = {}) {
    this.maxRetries = options.maxRetries || 3;
    this.initialDelay = options.initialDelay || 1000;
    this.maxDelay = options.maxDelay || 30000;
    this.backoffFactor = options.backoffFactor || 2;
    this.retryCondition = options.retryCondition || this.defaultRetryCondition;
  }

  async execute(operation, context = {}) {
    let lastError;

    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        const result = await operation();

        if (attempt > 0) {
          console.log(`Operation succeeded on attempt ${attempt + 1}`);
        }

        return result;
      } catch (error) {
        lastError = error;

        if (
          attempt === this.maxRetries ||
          !this.retryCondition(error, attempt)
        ) {
          throw error;
        }

        const delay = this.calculateDelay(attempt);
        console.log(`Attempt ${attempt + 1} failed, retrying in ${delay}ms...`);

        await this.sleep(delay);
      }
    }

    throw lastError;
  }

  defaultRetryCondition(error, attempt) {
    // Retry on network errors and 5xx server errors
    return (
      error.code === "ECONNRESET" ||
      error.code === "ENOTFOUND" ||
      error.code === "ECONNREFUSED" ||
      (error.response && error.response.status >= 500)
    );
  }

  calculateDelay(attempt) {
    const delay = this.initialDelay * Math.pow(this.backoffFactor, attempt);
    const jitter = Math.random() * 0.1 * delay; // Add 10% jitter
    return Math.min(delay + jitter, this.maxDelay);
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Usage
const retryHandler = new RetryHandler({
  maxRetries: 3,
  initialDelay: 1000,
  maxDelay: 10000,
});

async function unreliableOperation() {
  // Simulate operation that might fail
  if (Math.random() < 0.7) {
    throw new Error("Operation failed");
  }
  return "Success!";
}

// Execute with retry
retryHandler
  .execute(unreliableOperation)
  .then((result) => console.log(result))
  .catch((error) => console.error("All retries failed:", error.message));
```

### Error Monitoring & Logging

#### 1. Structured Error Logging

```javascript
class ErrorLogger {
  constructor(options = {}) {
    this.logLevel = options.logLevel || "info";
    this.logToFile = options.logToFile || false;
    this.logToConsole = options.logToConsole !== false;
    this.externalService = options.externalService; // Sentry, etc.
  }

  async logError(error, context = {}) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level: "error",
      message: error.message,
      stack: error.stack,
      code: error.code,
      statusCode: error.statusCode,
      context: {
        requestId: context.requestId,
        userId: context.userId,
        ip: context.ip,
        userAgent: context.userAgent,
        method: context.method,
        url: context.url,
        headers: context.headers,
        body: context.body,
        params: context.params,
        query: context.query,
      },
      system: {
        nodeVersion: process.version,
        platform: process.platform,
        memory: process.memoryUsage(),
        uptime: process.uptime(),
      },
    };

    // Log to console
    if (this.logToConsole) {
      console.error(JSON.stringify(logEntry, null, 2));
    }

    // Log to file
    if (this.logToFile) {
      await this.writeToFile(logEntry);
    }

    // Send to external service
    if (this.externalService) {
      await this.sendToExternalService(logEntry);
    }
  }

  async logWarning(warning, context = {}) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level: "warning",
      message: warning.message,
      stack: warning.stack,
      context,
      system: {
        nodeVersion: process.version,
        platform: process.platform,
      },
    };

    if (this.logToConsole) {
      console.warn(JSON.stringify(logEntry, null, 2));
    }

    if (this.logToFile) {
      await this.writeToFile(logEntry);
    }
  }

  async writeToFile(logEntry) {
    const fs = require("fs").promises;
    const path = require("path");

    const logDir = path.join(process.cwd(), "logs");
    const logFile = path.join(
      logDir,
      `errors-${new Date().toISOString().split("T")[0]}.log`
    );

    try {
      await fs.mkdir(logDir, { recursive: true });
      await fs.appendFile(logFile, JSON.stringify(logEntry) + "\n");
    } catch (error) {
      console.error("Failed to write log to file:", error);
    }
  }

  async sendToExternalService(logEntry) {
    try {
      // Example: Send to Sentry
      if (this.externalService === "sentry") {
        // Sentry.captureException(new Error(logEntry.message), {
        //   extra: logEntry
        // });
      }
    } catch (error) {
      console.error("Failed to send to external service:", error);
    }
  }
}

// Global error logger instance
const errorLogger = new ErrorLogger({
  logToFile: true,
  logToConsole: true,
  externalService: process.env.ERROR_SERVICE,
});

// Middleware to capture request context
const requestContextMiddleware = (req, res, next) => {
  req.requestId = generateRequestId();
  req.startTime = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - req.startTime;

    if (res.statusCode >= 400) {
      errorLogger.logError(new Error(`HTTP ${res.statusCode}`), {
        requestId: req.requestId,
        userId: req.user?.id,
        ip: req.ip,
        userAgent: req.get("User-Agent"),
        method: req.method,
        url: req.originalUrl,
        headers: req.headers,
        body: req.body,
        params: req.params,
        query: req.query,
        duration,
      });
    }
  });

  next();
};

function generateRequestId() {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
```

### Error Recovery Strategies

#### 1. Graceful Degradation

```javascript
class GracefulDegradation {
  constructor() {
    this.fallbackStrategies = new Map();
  }

  registerFallback(operationName, fallbackFunction) {
    this.fallbackStrategies.set(operationName, fallbackFunction);
  }

  async executeWithFallback(operationName, primaryFunction, ...args) {
    try {
      return await primaryFunction(...args);
    } catch (error) {
      console.warn(`Primary operation ${operationName} failed:`, error.message);

      const fallback = this.fallbackStrategies.get(operationName);
      if (fallback) {
        console.log(`Executing fallback for ${operationName}`);
        try {
          return await fallback(...args);
        } catch (fallbackError) {
          console.error(
            `Fallback for ${operationName} also failed:`,
            fallbackError.message
          );
          throw new AppError(
            `Both primary and fallback failed for ${operationName}`,
            500
          );
        }
      } else {
        throw error;
      }
    }
  }
}

// Usage example
const degradation = new GracefulDegradation();

// Register fallback strategies
degradation.registerFallback("databaseQuery", async (...args) => {
  // Fallback to cache or mock data
  console.log("Using cached data as fallback");
  return { data: [], source: "cache" };
});

degradation.registerFallback("externalAPI", async (...args) => {
  // Fallback to mock API response
  console.log("Using mock API response as fallback");
  return { status: "mock", data: null };
});

// Execute with fallback
async function getUserData(userId) {
  return degradation.executeWithFallback(
    "databaseQuery",
    async () => {
      // Primary database operation
      return await User.findById(userId);
    },
    userId
  );
}
```

### Production Error Handling Checklist

#### 1. Pre-Deployment Checklist

- [ ] Global error handlers implemented
- [ ] Uncaught exception handlers set up
- [ ] Unhandled rejection handlers set up
- [ ] Graceful shutdown procedures
- [ ] Error logging configured
- [ ] Monitoring services integrated
- [ ] Circuit breakers implemented for external services
- [ ] Retry mechanisms configured
- [ ] Fallback strategies defined
- [ ] Error testing completed

#### 2. Runtime Monitoring

- [ ] Error rate monitoring
- [ ] Performance metrics tracking
- [ ] Alert thresholds configured
- [ ] Dashboard for error visualization
- [ ] Automated error reporting
- [ ] Log rotation and cleanup

### FAANG Interview Questions on Error Handling

#### 1. "How would you handle errors in a microservices architecture?"

```javascript
// Answer: Use circuit breakers, retry mechanisms, centralized error logging,
// graceful degradation, and service mesh for distributed error handling.
```

#### 2. "What's the difference between uncaught exceptions and unhandled rejections?"

```javascript
// Answer: Uncaught exceptions are synchronous errors not caught by try-catch,
// unhandled rejections are rejected promises without .catch() handlers.
// Both can crash the application if not handled properly.
```

#### 3. "How would you implement error handling for a high-traffic API?"

```javascript
// Answer: Use global error handlers, structured logging, monitoring,
// rate limiting, circuit breakers, and graceful degradation strategies.
```

# Note : Now know about Architecture Diagram

[Node Architecture Diagram to handle task async](../Node%20Architecture/Architecture_Diagram.md)
