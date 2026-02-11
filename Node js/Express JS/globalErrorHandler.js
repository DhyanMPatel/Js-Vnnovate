/**
 * Global Error Handler for Express.js
 * Comprehensive error handling middleware for production applications
 *
 * Features:
 * - Centralized error handling
 * - Structured error responses
 * - Comprehensive logging
 * - Error classification
 * - Development vs Production modes
 * - Security-conscious error responses
 * - Performance monitoring
 * - External service integration
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

/**
 * Error severity levels
 */
const ErrorSeverity = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  CRITICAL: "critical",
};

/**
 * Error categories
 */
const ErrorCategory = {
  VALIDATION: "validation",
  AUTHENTICATION: "authentication",
  AUTHORIZATION: "authorization",
  DATABASE: "database",
  EXTERNAL_SERVICE: "external_service",
  SYSTEM: "system",
  BUSINESS_LOGIC: "business_logic",
  NETWORK: "network",
};

/**
 * Global Error Handler Class
 */
class GlobalErrorHandler {
  constructor(options = {}) {
    this.options = {
      logToFile: options.logToFile || false,
      logFilePath: options.logFilePath || "./logs/errors.log",
      enableConsoleLog: options.enableConsoleLog !== false,
      enableExternalLogging: options.enableExternalLogging || false,
      externalLogger: options.externalLogger || null,
      environment: options.environment || process.env.NODE_ENV || "development",
      maxLogFileSize: options.maxLogFileSize || 10 * 1024 * 1024, // 10MB
      maxLogFiles: options.maxLogFiles || 5,
      sanitizeErrors: options.sanitizeErrors !== false,
      ...options,
    };

    this.initializeLogger();
  }

  /**
   * Initialize logging system
   */
  initializeLogger() {
    if (this.options.logToFile) {
      this.ensureLogDirectory();
    }
  }

  /**
   * Ensure log directory exists
   */
  ensureLogDirectory() {
    const logDir = path.dirname(this.options.logFilePath);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
  }

  /**
   * Classify error based on type and properties
   */
  classifyError(error) {
    const classification = {
      severity: ErrorSeverity.MEDIUM,
      category: ErrorCategory.SYSTEM,
      isOperational: false,
      shouldRetry: false,
      retryDelay: null,
    };

    // Validation errors
    if (error.name === "ValidationError" || error.code === "VALIDATION_ERROR") {
      classification.severity = ErrorSeverity.LOW;
      classification.category = ErrorCategory.VALIDATION;
      classification.isOperational = true;
    }

    // Authentication errors
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError" ||
      error.code === "UNAUTHORIZED" ||
      error.code === "AUTHENTICATION_ERROR"
    ) {
      classification.severity = ErrorSeverity.MEDIUM;
      classification.category = ErrorCategory.AUTHENTICATION;
      classification.isOperational = true;
    }

    // Authorization errors
    if (error.code === "FORBIDDEN" || error.code === "AUTHORIZATION_ERROR") {
      classification.severity = ErrorSeverity.MEDIUM;
      classification.category = ErrorCategory.AUTHORIZATION;
      classification.isOperational = true;
    }

    // Database errors
    if (
      error.name === "MongoError" ||
      error.name === "MongooseError" ||
      error.code === "DATABASE_ERROR"
    ) {
      classification.severity = ErrorSeverity.HIGH;
      classification.category = ErrorCategory.DATABASE;
      classification.shouldRetry = true;
      classification.retryDelay = 1000;
    }

    // External service errors
    if (
      error.code === "EXTERNAL_SERVICE_ERROR" ||
      error.code === "ECONNREFUSED" ||
      error.code === "ETIMEDOUT"
    ) {
      classification.severity = ErrorSeverity.HIGH;
      classification.category = ErrorCategory.EXTERNAL_SERVICE;
      classification.shouldRetry = true;
      classification.retryDelay = 2000;
    }

    // Network errors
    if (error.code === "ENOTFOUND" || error.code === "ECONNRESET") {
      classification.severity = ErrorSeverity.MEDIUM;
      classification.category = ErrorCategory.NETWORK;
      classification.shouldRetry = true;
      classification.retryDelay = 1500;
    }

    // System errors
    if (error.code === "ENOENT" || error.code === "EACCES") {
      classification.severity = ErrorSeverity.CRITICAL;
      classification.category = ErrorCategory.SYSTEM;
      classification.isOperational = false;
    }

    // Business logic errors
    if (error.code === "BUSINESS_ERROR" || error.code === "CONFLICT") {
      classification.severity = ErrorSeverity.LOW;
      classification.category = ErrorCategory.BUSINESS_LOGIC;
      classification.isOperational = true;
    }

    return classification;
  }

  /**
   * Sanitize error for logging (remove sensitive information)
   */
  sanitizeError(error, req) {
    if (!this.options.sanitizeErrors) {
      return error;
    }

    const sanitized = { ...error };

    // Remove sensitive headers
    if (req.headers) {
      const sensitiveHeaders = [
        "authorization",
        "cookie",
        "x-api-key",
        "x-auth-token",
      ];
      sanitized.headers = { ...req.headers };
      sensitiveHeaders.forEach((header) => {
        if (sanitized.headers[header]) {
          sanitized.headers[header] = "[REDACTED]";
        }
      });
    }

    // Remove sensitive body fields
    if (req.body) {
      const sensitiveFields = [
        "password",
        "token",
        "secret",
        "key",
        "creditCard",
        "ssn",
      ];
      sanitized.body = { ...req.body };
      sensitiveFields.forEach((field) => {
        if (sanitized.body[field]) {
          sanitized.body[field] = "[REDACTED]";
        }
      });
    }

    return sanitized;
  }

  /**
   * Create error log entry
   */
  createErrorLogEntry(error, req) {
    const classification = this.classifyError(error);
    const sanitizedError = this.sanitizeError(error, req);

    const logEntry = {
      id: this.generateErrorId(),
      timestamp: new Date().toISOString(),
      severity: classification.severity,
      category: classification.category,
      isOperational: classification.isOperational,
      shouldRetry: classification.shouldRetry,
      retryDelay: classification.retryDelay,

      error: {
        name: error.name,
        message: error.message,
        code: error.code,
        statusCode: error.statusCode,
        stack:
          this.options.environment === "development" ? error.stack : undefined,
        details: error.details || undefined,
      },

      request: {
        id: req.id || "N/A",
        method: req.method,
        url: req.originalUrl,
        path: req.path,
        query: req.query,
        params: req.params,
        ip: req.ip,
        userAgent: req.get("User-Agent"),
        headers: sanitizedError.headers,
        body: sanitizedError.body,
      },

      user: req.user
        ? {
            id: req.user.id,
            email: req.user.email,
            role: req.user.role,
          }
        : null,

      environment: this.options.environment,
      server: {
        hostname: require("os").hostname(),
        pid: process.pid,
        memory: process.memoryUsage(),
        uptime: process.uptime(),
      },
    };

    return logEntry;
  }

  /**
   * Generate unique error ID
   */
  generateErrorId() {
    return `err_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`;
  }

  /**
   * Log error to file
   */
  async logToFile(logEntry) {
    if (!this.options.logToFile) return;

    try {
      const logLine = JSON.stringify(logEntry) + "\n";

      // Check file size and rotate if necessary
      await this.rotateLogFileIfNeeded();

      fs.appendFileSync(this.options.logFilePath, logLine);
    } catch (logError) {
      console.error("Failed to write error to file:", logError);
    }
  }

  /**
   * Rotate log file if it exceeds maximum size
   */
  async rotateLogFileIfNeeded() {
    try {
      const stats = fs.statSync(this.options.logFilePath);

      if (stats.size > this.options.maxLogFileSize) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const rotatedFile = this.options.logFilePath.replace(
          ".log",
          `_${timestamp}.log`
        );

        fs.renameSync(this.options.logFilePath, rotatedFile);

        // Clean up old log files
        await this.cleanupOldLogFiles();
      }
    } catch (error) {
      // File doesn't exist or other error, continue
    }
  }

  /**
   * Clean up old log files
   */
  async cleanupOldLogFiles() {
    try {
      const logDir = path.dirname(this.options.logFilePath);
      const logFileName = path.basename(this.options.logFilePath, ".log");
      const files = fs.readdirSync(logDir);

      const logFiles = files
        .filter(
          (file) =>
            file.startsWith(logFileName) &&
            file !== path.basename(this.options.logFilePath)
        )
        .map((file) => ({
          name: file,
          path: path.join(logDir, file),
          mtime: fs.statSync(path.join(logDir, file)).mtime,
        }))
        .sort((a, b) => b.mtime - a.mtime);

      // Remove excess log files
      if (logFiles.length > this.options.maxLogFiles) {
        const filesToDelete = logFiles.slice(this.options.maxLogFiles);
        filesToDelete.forEach((file) => {
          fs.unlinkSync(file.path);
        });
      }
    } catch (error) {
      console.error("Failed to cleanup old log files:", error);
    }
  }

  /**
   * Log error to console
   */
  logToConsole(logEntry) {
    if (!this.options.enableConsoleLog) return;

    const colors = {
      [ErrorSeverity.LOW]: "\x1b[36m", // Cyan
      [ErrorSeverity.MEDIUM]: "\x1b[33m", // Yellow
      [ErrorSeverity.HIGH]: "\x1b[31m", // Red
      [ErrorSeverity.CRITICAL]: "\x1b[35m", // Magenta
    };

    const reset = "\x1b[0m";
    const color = colors[logEntry.severity] || "";

    console.error(
      `${color}[${logEntry.severity.toUpperCase()}]${reset} ` +
        `${logEntry.timestamp} - ${logEntry.error.message} ` +
        `(${logEntry.request.method} ${logEntry.request.url}) ` +
        `[${logEntry.id}]`
    );

    if (this.options.environment === "development") {
      console.error("Stack:", logEntry.error.stack);
    }
  }

  /**
   * Log error to external service
   */
  async logToExternalService(logEntry) {
    if (!this.options.enableExternalLogging || !this.options.externalLogger) {
      return;
    }

    try {
      // Example: Sentry, DataDog, New Relic integration
      if (typeof this.options.externalLogger.captureException === "function") {
        this.options.externalLogger.captureException(
          new Error(logEntry.error.message),
          {
            tags: {
              severity: logEntry.severity,
              category: logEntry.category,
            },
            extra: logEntry,
          }
        );
      }
    } catch (error) {
      console.error("Failed to log to external service:", error);
    }
  }

  /**
   * Create user-friendly error response
   */
  createErrorResponse(error, req, classification) {
    const response = {
      success: false,
      error: {
        id: this.generateErrorId(),
        message: this.getErrorMessage(error),
        code: error.code || "INTERNAL_ERROR",
        statusCode: this.getStatusCode(error),
        timestamp: new Date().toISOString(),
        requestId: req.id || "N/A",
        path: req.originalUrl,
        method: req.method,
      },
    };

    // Add retry information for retryable errors
    if (classification.shouldRetry && classification.retryDelay) {
      response.error.retry = {
        shouldRetry: true,
        delay: classification.retryDelay,
        maxRetries: 3,
      };
    }

    // Add validation errors
    if (error.errors && Array.isArray(error.errors)) {
      response.error.errors = error.errors;
    }

    // Add development details
    if (this.options.environment === "development") {
      response.error.stack = error.stack;
      response.error.details = error.details;
      response.error.classification = {
        severity: classification.severity,
        category: classification.category,
        isOperational: classification.isOperational,
      };
    }

    return response;
  }

  /**
   * Get appropriate error message
   */
  getErrorMessage(error) {
    // In production, use generic messages for system errors
    if (this.options.environment === "production" && !error.isOperational) {
      return "An unexpected error occurred. Please try again later.";
    }

    return error.message || "Internal Server Error";
  }

  /**
   * Get appropriate status code
   */
  getStatusCode(error) {
    if (error.statusCode) return error.statusCode;

    // Default status codes based on error type
    const statusCodeMap = {
      ValidationError: 400,
      UnauthorizedError: 401,
      ForbiddenError: 403,
      NotFoundError: 404,
      ConflictError: 409,
      TooManyRequestsError: 429,
      DatabaseError: 500,
      ExternalServiceError: 502,
      BusinessError: 422,
    };

    return statusCodeMap[error.name] || 500;
  }

  /**
   * Main error handling middleware
   */
  async handleError(error, req, res, next) {
    try {
      // Create log entry
      const logEntry = this.createErrorLogEntry(error, req);
      const classification = this.classifyError(error);

      // Log error
      await Promise.all([
        this.logToFile(logEntry),
        this.logToConsole(logEntry),
        this.logToExternalService(logEntry),
      ]);

      // Create error response
      const errorResponse = this.createErrorResponse(
        error,
        req,
        classification
      );

      // Send response
      res.status(errorResponse.error.statusCode).json(errorResponse);

      // Trigger alerts for critical errors
      if (classification.severity === ErrorSeverity.CRITICAL) {
        await this.triggerCriticalErrorAlert(logEntry);
      }
    } catch (handlingError) {
      // Fallback error handling
      console.error("Error in error handler:", handlingError);
      res.status(500).json({
        success: false,
        error: {
          message: "Internal Server Error",
          code: "INTERNAL_ERROR",
          timestamp: new Date().toISOString(),
        },
      });
    }
  }

  /**
   * Trigger alerts for critical errors
   */
  async triggerCriticalErrorAlert(logEntry) {
    try {
      // Example: Send email, Slack notification, SMS, etc.
      console.error("CRITICAL ERROR ALERT:", {
        id: logEntry.id,
        message: logEntry.error.message,
        url: logEntry.request.url,
        user: logEntry.user?.id,
        timestamp: logEntry.timestamp,
      });

      // Integration with alerting systems
      // await this.sendSlackAlert(logEntry);
      // await this.sendEmailAlert(logEntry);
    } catch (error) {
      console.error("Failed to send critical error alert:", error);
    }
  }

  /**
   * Get error statistics
   */
  async getErrorStatistics(timeRange = "24h") {
    // This would typically read from a database or log aggregation system
    return {
      totalErrors: 0,
      errorsByCategory: {},
      errorsBySeverity: {},
      topErrors: [],
      errorRate: 0,
    };
  }
}

/**
 * Create global error handler instance
 */
const createGlobalErrorHandler = (options = {}) => {
  const handler = new GlobalErrorHandler(options);

  return (err, req, res, next) => {
    handler.handleError(err, req, res, next);
  };
};

/**
 * 404 Not Found Handler
 */
const createNotFoundHandler = (options = {}) => {
  const message = options.message || "Route not found";
  const code = options.code || "NOT_FOUND";

  return (req, res, next) => {
    const error = new Error(message);
    error.statusCode = 404;
    error.code = code;
    error.isOperational = true;
    next(error);
  };
};

/**
 * Async error wrapper utility
 */
const asyncErrorHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = {
  GlobalErrorHandler,
  createGlobalErrorHandler,
  createNotFoundHandler,
  asyncErrorHandler,
  ErrorSeverity,
  ErrorCategory,
};
