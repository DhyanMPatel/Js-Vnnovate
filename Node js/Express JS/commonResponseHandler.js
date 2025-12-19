/**
 * Common Response Handler for Express.js
 * Production-ready response handling middleware for FAANG interviews
 *
 * Features:
 * - Standardized API responses
 * - Response formatting and structure
 * - Pagination support
 * - Response caching headers
 * - Content negotiation
 * - Response compression
 * - Security headers
 * - Performance monitoring
 */

class ResponseHandler {
  constructor() {
    this.defaultHeaders = {
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "X-XSS-Protection": "1; mode=block",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    };
  }

  /**
   * Set common response headers
   */
  setCommonHeaders(res, additionalHeaders = {}) {
    Object.entries(this.defaultHeaders).forEach(([key, value]) => {
      res.set(key, value);
    });

    Object.entries(additionalHeaders).forEach(([key, value]) => {
      res.set(key, value);
    });
  }

  /**
   * Success response with data
   */
  success(res, data, options = {}) {
    const {
      statusCode = 200,
      message = "Success",
      headers = {},
      cache = false,
      cacheTime = 300,
    } = options;

    this.setCommonHeaders(res, headers);

    if (cache) {
      res.set("Cache-Control", `public, max-age=${cacheTime}`);
      res.set("ETag", this.generateETag(data));
    }

    const response = {
      success: true,
      data,
      message,
      timestamp: new Date().toISOString(),
      requestId: res.req?.id || "N/A",
    };

    // Add metadata if provided
    if (options.metadata) {
      response.metadata = options.metadata;
    }

    res.status(statusCode).json(response);
  }

  /**
   * Success response with pagination
   */
  successWithPagination(res, data, pagination, options = {}) {
    const {
      statusCode = 200,
      message = "Data retrieved successfully",
      headers = {},
    } = options;

    this.setCommonHeaders(res, headers);

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
        hasNext: pagination.hasNext || false,
        hasPrev: pagination.hasPrev || false,
      },
      timestamp: new Date().toISOString(),
      requestId: res.req?.id || "N/A",
    };

    // Add pagination links
    if (pagination.links) {
      response.pagination.links = pagination.links;
    }

    res.status(statusCode).json(response);
  }

  /**
   * Success response for created resource
   */
  created(res, data, options = {}) {
    const {
      message = "Resource created successfully",
      location = null,
      headers = {},
    } = options;

    this.setCommonHeaders(res, headers);

    if (location) {
      res.set("Location", location);
    }

    const response = {
      success: true,
      data,
      message,
      timestamp: new Date().toISOString(),
      requestId: res.req?.id || "N/A",
    };

    res.status(201).json(response);
  }

  /**
   * Success response for accepted request
   */
  accepted(res, data, options = {}) {
    const { message = "Request accepted for processing", headers = {} } =
      options;

    this.setCommonHeaders(res, headers);

    const response = {
      success: true,
      data,
      message,
      timestamp: new Date().toISOString(),
      requestId: res.req?.id || "N/A",
    };

    res.status(202).json(response);
  }

  /**
   * Success response with no content
   */
  noContent(res, options = {}) {
    const { headers = {} } = options;

    this.setCommonHeaders(res, headers);
    res.status(204).end();
  }

  /**
   * Error response (for consistency with error handler)
   */
  error(res, error, options = {}) {
    const { statusCode = 500, code = "INTERNAL_ERROR", headers = {} } = options;

    this.setCommonHeaders(res, headers);

    const response = {
      success: false,
      error: {
        message: error.message || "Internal Server Error",
        code,
        timestamp: new Date().toISOString(),
        requestId: res.req?.id || "N/A",
      },
    };

    // Add error details in development
    if (process.env.NODE_ENV === "development") {
      response.error.stack = error.stack;
      response.error.details = error.details || null;
    }

    res.status(statusCode).json(response);
  }

  /**
   * Validation error response
   */
  validationError(res, errors, options = {}) {
    const {
      message = "Validation failed",
      statusCode = 400,
      headers = {},
    } = options;

    this.setCommonHeaders(res, headers);

    const response = {
      success: false,
      error: {
        message,
        code: "VALIDATION_ERROR",
        errors: Array.isArray(errors) ? errors : [errors],
        timestamp: new Date().toISOString(),
        requestId: res.req?.id || "N/A",
      },
    };

    res.status(statusCode).json(response);
  }

  /**
   * Not found error response
   */
  notFound(res, message = "Resource not found", options = {}) {
    const { headers = {} } = options;

    this.error(res, new Error(message), {
      statusCode: 404,
      code: "NOT_FOUND",
      headers,
    });
  }

  /**
   * Unauthorized error response
   */
  unauthorized(res, message = "Unauthorized", options = {}) {
    const { headers = {} } = options;

    this.setCommonHeaders(res, headers);
    res.set("WWW-Authenticate", "Bearer");

    this.error(res, new Error(message), {
      statusCode: 401,
      code: "UNAUTHORIZED",
      headers,
    });
  }

  /**
   * Forbidden error response
   */
  forbidden(res, message = "Access forbidden", options = {}) {
    const { headers = {} } = options;

    this.error(res, new Error(message), {
      statusCode: 403,
      code: "FORBIDDEN",
      headers,
    });
  }

  /**
   * Conflict error response
   */
  conflict(res, message = "Resource conflict", options = {}) {
    const { headers = {} } = options;

    this.error(res, new Error(message), {
      statusCode: 409,
      code: "CONFLICT",
      headers,
    });
  }

  /**
   * Too many requests error response
   */
  tooManyRequests(res, message = "Too many requests", options = {}) {
    const { retryAfter = 60, headers = {} } = options;

    this.setCommonHeaders(res, headers);
    res.set("Retry-After", retryAfter.toString());

    this.error(res, new Error(message), {
      statusCode: 429,
      code: "TOO_MANY_REQUESTS",
      headers,
    });
  }

  /**
   * Server error response
   */
  serverError(res, message = "Internal Server Error", options = {}) {
    const { headers = {} } = options;

    this.error(res, new Error(message), {
      statusCode: 500,
      code: "INTERNAL_SERVER_ERROR",
      headers,
    });
  }

  /**
   * File download response
   */
  download(res, filePath, options = {}) {
    const {
      filename = null,
      headers = {},
      contentType = "application/octet-stream",
    } = options;

    this.setCommonHeaders(res, headers);
    res.set("Content-Type", contentType);

    if (filename) {
      res.set("Content-Disposition", `attachment; filename="${filename}"`);
    }

    res.download(filePath, filename, (err) => {
      if (err) {
        this.serverError(res, "File download failed");
      }
    });
  }

  /**
   * Stream response
   */
  stream(res, stream, options = {}) {
    const {
      contentType = "application/octet-stream",
      filename = null,
      headers = {},
    } = options;

    this.setCommonHeaders(res, headers);
    res.set("Content-Type", contentType);

    if (filename) {
      res.set("Content-Disposition", `attachment; filename="${filename}"`);
    }

    stream.on("error", (err) => {
      this.serverError(res, "Stream error occurred");
    });

    stream.pipe(res);
  }

  /**
   * Generate ETag for caching
   */
  generateETag(data) {
    const crypto = require("crypto");
    const dataString = JSON.stringify(data);
    return crypto.createHash("md5").update(dataString).digest("hex");
  }

  /**
   * Set CORS headers
   */
  setCorsHeaders(
    res,
    origin = "*",
    methods = "GET, POST, PUT, DELETE, OPTIONS",
    headers = "Content-Type, Authorization"
  ) {
    res.set("Access-Control-Allow-Origin", origin);
    res.set("Access-Control-Allow-Methods", methods);
    res.set("Access-Control-Allow-Headers", headers);
    res.set("Access-Control-Allow-Credentials", "true");
  }

  /**
   * Handle CORS preflight requests
   */
  handleCors(req, res, next) {
    if (req.method === "OPTIONS") {
      this.setCorsHeaders(res);
      res.status(200).end();
    } else {
      this.setCorsHeaders(res);
      next();
    }
  }
}

/**
 * Response middleware factory
 */
const createResponseMiddleware = (options = {}) => {
  const responseHandler = new ResponseHandler();

  return (req, res, next) => {
    // Attach response handler methods to res object
    res.success = (data, opts) => responseHandler.success(res, data, opts);
    res.successWithPagination = (data, pagination, opts) =>
      responseHandler.successWithPagination(res, data, pagination, opts);
    res.created = (data, opts) => responseHandler.created(res, data, opts);
    res.accepted = (data, opts) => responseHandler.accepted(res, data, opts);
    res.noContent = (opts) => responseHandler.noContent(res, opts);
    res.error = (error, opts) => responseHandler.error(res, error, opts);
    res.validationError = (errors, opts) =>
      responseHandler.validationError(res, errors, opts);
    res.notFound = (message, opts) =>
      responseHandler.notFound(res, message, opts);
    res.unauthorized = (message, opts) =>
      responseHandler.unauthorized(res, message, opts);
    res.forbidden = (message, opts) =>
      responseHandler.forbidden(res, message, opts);
    res.conflict = (message, opts) =>
      responseHandler.conflict(res, message, opts);
    res.tooManyRequests = (message, opts) =>
      responseHandler.tooManyRequests(res, message, opts);
    res.serverError = (message, opts) =>
      responseHandler.serverError(res, message, opts);
    res.download = (filePath, opts) =>
      responseHandler.download(res, filePath, opts);
    res.stream = (stream, opts) => responseHandler.stream(res, stream, opts);

    next();
  };
};

/**
 * Response utilities
 */
const ResponseUtils = {
  ResponseHandler,
  createResponseMiddleware,

  // Helper functions
  formatPagination: (page, limit, total) => ({
    page: parseInt(page) || 1,
    limit: parseInt(limit) || 10,
    total,
    totalPages: Math.ceil(total / limit),
    hasNext: page * limit < total,
    hasPrev: page > 1,
    links: {
      self: `/api/resource?page=${page}&limit=${limit}`,
      first: `/api/resource?page=1&limit=${limit}`,
      last: `/api/resource?page=${Math.ceil(total / limit)}&limit=${limit}`,
      prev: page > 1 ? `/api/resource?page=${page - 1}&limit=${limit}` : null,
      next:
        page * limit < total
          ? `/api/resource?page=${page + 1}&limit=${limit}`
          : null,
    },
  }),

  sanitizeResponse: (data, removeFields = []) => {
    if (Array.isArray(data)) {
      return data.map((item) => sanitizeResponse(item, removeFields));
    }

    if (typeof data === "object" && data !== null) {
      const sanitized = { ...data };
      removeFields.forEach((field) => delete sanitized[field]);
      return sanitized;
    }

    return data;
  },
};

module.exports = ResponseUtils;
