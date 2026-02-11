/**
 * Common Error Handler for Express.js
 * Production-ready error handling middleware for FAANG interviews
 *
 * Features:
 * - Structured error responses
 * - Error logging and monitoring
 * - Custom error classes
 * - Development vs Production handling
 * - Security-conscious error responses
 */

class AppError extends Error {
  constructor(message, statusCode, code = null, isOperational = true) {
    super(message);

    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;
    this.timestamp = new Date().toISOString();

    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  constructor(message, errors = []) {
    super(message, 400, "VALIDATION_ERROR");
    this.errors = errors;
  }
}

class NotFoundError extends AppError {
  constructor(resource = "Resource") {
    super(`${resource} not found`, 404, "NOT_FOUND");
  }
}

class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized access") {
    super(message, 401, "UNAUTHORIZED");
  }
}

class ForbiddenError extends AppError {
  constructor(message = "Access forbidden") {
    super(message, 403, "FORBIDDEN");
  }
}

class ConflictError extends AppError {
  constructor(message = "Resource conflict") {
    super(message, 409, "CONFLICT");
  }
}

class TooManyRequestsError extends AppError {
  constructor(message = "Too many requests") {
    super(message, 429, "TOO_MANY_REQUESTS");
  }
}

class DatabaseError extends AppError {
  constructor(message = "Database operation failed") {
    super(message, 500, "DATABASE_ERROR");
  }
}

class ExternalServiceError extends AppError {
  constructor(service = "External service", message = "Service unavailable") {
    super(`${service}: ${message}`, 502, "EXTERNAL_SERVICE_ERROR");
  }
}

/**
 * Async Error Wrapper
 * Wraps async route handlers to catch errors automatically
 */
const asyncErrorHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Error Logger
 * Comprehensive error logging for monitoring and debugging
 */
const logError = (err, req) => {
  const errorLog = {
    timestamp: new Date().toISOString(),
    requestId: req.id || "N/A",
    error: {
      name: err.name,
      message: err.message,
      code: err.code,
      statusCode: err.statusCode,
      stack: err.stack,
      isOperational: err.isOperational,
    },
    request: {
      method: req.method,
      url: req.originalUrl,
      ip: req.ip,
      userAgent: req.get("User-Agent"),
      headers: sanitizeHeaders(req.headers),
      body: sanitizeRequestBody(req.body),
      params: req.params,
      query: req.query,
    },
    user: req.user
      ? {
          id: req.user.id,
          email: req.user.email,
          role: req.user.role,
        }
      : null,
    environment: process.env.NODE_ENV || "development",
  };

  // Log to console (in production, use proper logging service)
  console.error("ERROR_LOG:", JSON.stringify(errorLog, null, 2));

  // In production, send to monitoring service
  if (process.env.NODE_ENV === "production") {
    // Example: Sentry.captureException(err);
    // Example: Winston.error(errorLog);
  }

  return errorLog;
};

/**
 * Sanitize headers for logging (remove sensitive data)
 */
const sanitizeHeaders = (headers) => {
  const sanitized = { ...headers };
  const sensitiveHeaders = ["authorization", "cookie", "x-api-key"];

  sensitiveHeaders.forEach((header) => {
    if (sanitized[header]) {
      sanitized[header] = "[REDACTED]";
    }
  });

  return sanitized;
};

/**
 * Sanitize request body for logging (remove sensitive fields)
 */
const sanitizeRequestBody = (body) => {
  if (!body || typeof body !== "object") return body;

  const sanitized = { ...body };
  const sensitiveFields = ["password", "token", "secret", "key", "creditCard"];

  sensitiveFields.forEach((field) => {
    if (sanitized[field]) {
      sanitized[field] = "[REDACTED]";
    }
  });

  return sanitized;
};

/**
 * Global Error Handler Middleware
 * Central error handling for all Express routes
 */
const globalErrorHandler = (err, req, res, next) => {
  // Log the error
  const errorLog = logError(err, req);

  // Handle specific error types
  let error = { ...err };
  error.message = err.message;

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
      value: e.value,
    }));
    error = new ValidationError("Validation failed", errors);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const value = Object.values(err.keyValue)[0];
    error = new ConflictError(`${field} '${value}' already exists`);
  }

  // Mongoose cast error (invalid ObjectId)
  if (err.name === "CastError") {
    error = new ValidationError(`Invalid ${err.path}: ${err.value}`);
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    error = new UnauthorizedError("Invalid authentication token");
  }

  if (err.name === "TokenExpiredError") {
    error = new UnauthorizedError("Authentication token expired");
  }

  // Syntax errors (invalid JSON)
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    error = new ValidationError("Invalid JSON format");
  }

  // Default error response structure
  const response = {
    success: false,
    error: {
      message: error.message || "Internal Server Error",
      code: error.code || "INTERNAL_ERROR",
      statusCode: error.statusCode || 500,
      timestamp: new Date().toISOString(),
      requestId: req.id || "N/A",
      path: req.originalUrl,
      method: req.method,
    },
  };

  // Add error details in development
  if (process.env.NODE_ENV === "development") {
    response.error.stack = error.stack;
    response.error.details = error.errors || null;
    response.error.originalError = {
      name: err.name,
      message: err.message,
    };
  }

  // Add specific error details for validation errors
  if (error instanceof ValidationError && error.errors) {
    response.error.errors = error.errors;
  }

  // Add retry information for rate limiting
  if (error.statusCode === 429) {
    response.error.retryAfter = err.retryAfter || 60;
  }

  res.status(error.statusCode || 500).json(response);
};

/**
 * 404 Not Found Handler
 * Handles requests to non-existent routes
 */
const notFoundHandler = (req, res, next) => {
  const error = new NotFoundError("Route");
  error.path = req.originalUrl;
  next(error);
};

/**
 * Error handling utilities
 */
const ErrorUtils = {
  // Create custom errors
  AppError,
  ValidationError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
  TooManyRequestsError,
  DatabaseError,
  ExternalServiceError,

  // Middleware
  asyncErrorHandler,
  globalErrorHandler,
  notFoundHandler,

  // Utilities
  logError,
  sanitizeHeaders,
  sanitizeRequestBody,
};

module.exports = ErrorUtils;
