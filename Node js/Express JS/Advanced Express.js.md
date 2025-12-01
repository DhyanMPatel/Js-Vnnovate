# Advanced Express.js Patterns

## Advanced Express.js for FAANG

### Why Advanced Express Matters

- **Production Readiness**: Build robust, scalable applications
- **Performance**: Optimize for high-traffic scenarios
- **Security**: Implement enterprise-level security patterns
- **Maintainability**: Write clean, modular, testable code
- **Scalability**: Design for horizontal scaling

## Advanced Middleware Patterns

### 1. Custom Middleware Composition

```javascript
// Middleware composition utilities
class MiddlewareComposer {
  static compose(...middlewares) {
    return (req, res, next) => {
      const execute = (index) => {
        if (index >= middlewares.length) {
          return next();
        }

        const middleware = middlewares[index];
        try {
          middleware(req, res, (error) => {
            if (error) return next(error);
            execute(index + 1);
          });
        } catch (error) {
          next(error);
        }
      };

      execute(0);
    };
  }

  static conditional(condition, middleware) {
    return (req, res, next) => {
      if (condition(req)) {
        middleware(req, res, next);
      } else {
        next();
      }
    };
  }

  static asyncWrapper(middleware) {
    return (req, res, next) => {
      Promise.resolve(middleware(req, res, next)).catch(next);
    };
  }
}

// Usage examples
const authMiddleware = require('./middleware/auth');
const validationMiddleware = require('./middleware/validation');
const rateLimitMiddleware = require('./middleware/rateLimit');

// Compose multiple middlewares
const protectedRoute = MiddlewareComposer.compose(
  rateLimitMiddleware,
  authMiddleware,
  validationMiddleware
);

// Conditional middleware
const adminOnly = MiddlewareComposer conditional(
  (req) => req.user?.role === 'admin',
  adminMiddleware
);

// Async error handling wrapper
app.get('/api/users', MiddlewareComposer.asyncWrapper(async (req, res) => {
  const users = await User.find();
  res.json(users);
}));
```

### 2. Request Validation Middleware

```javascript
import Joi from "joi";

class ValidationMiddleware {
  static validate(schema, property = "body") {
    return (req, res, next) => {
      const { error, value } = schema.validate(req[property], {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        const errors = error.details.map((detail) => ({
          field: detail.path.join("."),
          message: detail.message,
          value: detail.context.value,
        }));

        return res.status(400).json({
          error: "Validation failed",
          errors,
          timestamp: new Date().toISOString(),
        });
      }

      req[property] = value;
      next();
    };
  }

  static sanitizeInput(req, res, next) {
    // XSS prevention
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
  }
}

// Validation schemas
const userSchemas = {
  createUser: Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(8)
      .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"))
      .required(),
    profile: Joi.object({
      firstName: Joi.string().max(50),
      lastName: Joi.string().max(50),
      age: Joi.number().integer().min(13).max(120),
    }).optional(),
  }),

  updateUser: Joi.object({
    username: Joi.string().alphanum().min(3).max(30),
    email: Joi.string().email(),
    profile: Joi.object({
      firstName: Joi.string().max(50),
      lastName: Joi.string().max(50),
      age: Joi.number().integer().min(13).max(120),
    }),
  }).min(1),
};

// Usage
app.post(
  "/api/users",
  ValidationMiddleware.sanitizeInput,
  ValidationMiddleware.validate(userSchemas.createUser),
  createUserController
);

app.put(
  "/api/users/:id",
  ValidationMiddleware.sanitizeInput,
  ValidationMiddleware.validate(userSchemas.updateUser),
  updateUserController
);
```

### 3. Advanced Error Handling Middleware

```javascript
class ErrorHandler {
  static handleAsync(fn) {
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }

  static errorHandler(err, req, res, next) {
    // Log error details
    console.error('Error occurred:', {
      message: err.message,
      stack: err.stack,
      url: req.url,
      method: req.method,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      timestamp: new Date().toISOString(),
      userId: req.user?.id
    });

    // Determine error type and status
    let status = 500;
    let message = 'Internal Server Error';
    let details = null;

    if (err.name === 'ValidationError') {
      status = 400;
      message = 'Validation Error';
      details = err.details;
    } else if (err.name === 'CastError') {
      status = 400;
      message = 'Invalid ID format';
    } else if (err.code === 11000) {
      status = 409;
      message = 'Duplicate resource';
      details = {
        field: Object.keys(err.keyValue)[0],
        value: Object.values(err.keyValue)[0]
      };
    } else if (err.name === 'JsonWebTokenError') {
      status = 401;
      message = 'Invalid token';
    } else if (err.name === 'TokenExpiredError') {
      status = 401;
      message = 'Token expired';
    } else if (err.status) {
      status = err.status;
      message = err.message;
    }

    // Development vs Production response
    const response = {
      error: message,
      status,
      timestamp: new Date().toISOString(),
      path: req.url,
      method: req.method
    };

    if (process.env.NODE_ENV === 'development') {
      response.stack = err.stack;
      if (details) response.details = details;
    }

    res.status(status).json(response);
  }

  static notFoundHandler(req, res, next) {
    const error = new Error(`Route ${req.originalUrl} not found`);
    error.status = 404;
    next(error);
  }

  static asyncErrorLogger(err, req, res, next) {
    // Log to external service (Sentry, etc.)
    if (process.env.SENTRY_DSN) {
      // Sentry.captureException(err);
    }

    // Log to file/database
    await this.logErrorToFile(err, req);

    next(err);
  }

  static async logErrorToFile(err, req) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      error: {
        name: err.name,
        message: err.message,
        stack: err.stack
      },
      request: {
        method: req.method,
        url: req.url,
        headers: req.headers,
        body: req.body,
        params: req.params,
        query: req.query,
        ip: req.ip,
        userAgent: req.get('User-Agent')
      },
      user: req.user ? {
        id: req.user.id,
        email: req.user.email
      } : null
    };

    // Write to log file or database
    // await fs.appendFile('errors.log', JSON.stringify(logEntry) + '\n');
  }
}

// Usage
app.use(ErrorHandler.notFoundHandler);
app.use(ErrorHandler.asyncErrorLogger);
app.use(ErrorHandler.errorHandler);

// Route handlers with async error handling
app.get('/api/users/:id', ErrorHandler.handleAsync(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new Error('User not found');
  }
  res.json(user);
}));
```

## Advanced Routing Patterns

### 1. Route Composition and Nesting

```javascript
class RouteBuilder {
  constructor() {
    this.routes = [];
    this.middlewares = [];
  }

  use(...middlewares) {
    this.middlewares.push(...middlewares);
    return this;
  }

  get(path, ...handlers) {
    this.addRoute("GET", path, handlers);
    return this;
  }

  post(path, ...handlers) {
    this.addRoute("POST", path, handlers);
    return this;
  }

  put(path, ...handlers) {
    this.addRoute("PUT", path, handlers);
    return this;
  }

  delete(path, ...handlers) {
    this.addRoute("DELETE", path, handlers);
    return this;
  }

  addRoute(method, path, handlers) {
    this.routes.push({
      method,
      path,
      handlers: [...this.middlewares, ...handlers],
    });
  }

  apply(router) {
    this.routes.forEach(({ method, path, handlers }) => {
      router[method.toLowerCase()](path, ...handlers);
    });
  }
}

// Resource-based routing
class ResourceRouter {
  constructor(resourceName, controller) {
    this.resourceName = resourceName;
    this.controller = controller;
    this.router = express.Router();
    this.setupRoutes();
  }

  setupRoutes() {
    const builder = new RouteBuilder();

    // Standard CRUD routes
    builder
      .get("/", this.controller.getAll)
      .get("/:id", this.controller.getById)
      .post("/", this.controller.create)
      .put("/:id", this.controller.update)
      .delete("/:id", this.controller.delete);

    // Apply to router
    builder.apply(this.router);
  }

  // Custom routes
  custom(method, path, ...handlers) {
    this.router[method.toLowerCase()](path, ...handlers);
    return this;
  }

  // Nested resources
  nested(nestedResourceName, nestedController) {
    const nestedRouter = new ResourceRouter(
      nestedResourceName,
      nestedController
    ).router;

    this.router.use(
      `/:${this.resourceName}Id/${nestedResourceName}`,
      this.validateParentId(this.resourceName),
      nestedRouter
    );

    return this;
  }

  validateParentId(resourceName) {
    return async (req, res, next) => {
      const parentId = req.params[`${resourceName}Id`];
      const parent = await this.controller.findById(parentId);

      if (!parent) {
        return res.status(404).json({
          error: `${resourceName} not found`,
        });
      }

      req.parent = parent;
      next();
    };
  }

  getRouter() {
    return this.router;
  }
}

// Usage
const userController = require("./controllers/userController");
const postController = require("./controllers/postController");

// User resource with nested posts
const userRoutes = new ResourceRouter("users", userController)
  .nested("posts", postController)
  .custom("get", "/:id/profile", userController.getProfile)
  .custom("post", "/:id/avatar", uploadMiddleware, userController.uploadAvatar)
  .getRouter();

app.use("/api", userRoutes);
```

### 2. Advanced Route Parameters

```javascript
class ParameterHandler {
  static asyncParam(paramName, fetchFunction) {
    return async (req, res, next, id) => {
      try {
        const resource = await fetchFunction(id);
        if (!resource) {
          return res.status(404).json({
            error: `${paramName} not found`,
          });
        }

        req[paramName] = resource;
        next();
      } catch (error) {
        next(error);
      }
    };
  }

  static uuidParam(paramName) {
    return this.asyncParam(paramName, async (id) => {
      // Validate UUID format
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(id)) {
        throw new Error("Invalid UUID format");
      }

      // Fetch resource by UUID
      const resource = await User.findById(id);
      return resource;
    });
  }

  static slugParam(paramName, model) {
    return this.asyncParam(paramName, async (slug) => {
      // Validate slug format
      const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
      if (!slugRegex.test(slug)) {
        throw new Error("Invalid slug format");
      }

      const resource = await model.findOne({ slug });
      return resource;
    });
  }
}

// Usage
app.param("userId", ParameterHandler.uuidParam("user"));
app.param("postSlug", ParameterHandler.slugParam("post", Post));

app.get("/api/users/:userId/posts/:postSlug", (req, res) => {
  const { user, post } = req;
  res.json({ user, post });
});
```

## File Upload Handling

### 1. Advanced File Upload with Multer

```javascript
import multer from "multer";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

class FileUploadHandler {
  constructor(options = {}) {
    this.uploadDir = options.uploadDir || "uploads";
    this.maxFileSize = options.maxFileSize || 5 * 1024 * 1024; // 5MB
    this.allowedTypes = options.allowedTypes || [
      "image/jpeg",
      "image/png",
      "image/gif",
    ];
    this.ensureUploadDir();
  }

  async ensureUploadDir() {
    try {
      await fs.access(this.uploadDir);
    } catch {
      await fs.mkdir(this.uploadDir, { recursive: true });
    }
  }

  getStorage() {
    return multer.diskStorage({
      destination: async (req, file, cb) => {
        const userDir = path.join(this.uploadDir, req.user?.id || "anonymous");
        await fs.mkdir(userDir, { recursive: true });
        cb(null, userDir);
      },
      filename: (req, file, cb) => {
        const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
      },
    });
  }

  getFileFilter() {
    return (req, file, cb) => {
      if (this.allowedTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error(`File type ${file.mimetype} not allowed`), false);
      }
    };
  }

  getUploadMiddleware() {
    return multer({
      storage: this.getStorage(),
      limits: {
        fileSize: this.maxFileSize,
        files: 10, // Max 10 files
      },
      fileFilter: this.getFileFilter(),
    });
  }

  // Single file upload
  single(fieldName) {
    return this.getUploadMiddleware().single(fieldName);
  }

  // Multiple files upload
  multiple(fieldName, maxCount = 5) {
    return this.getUploadMiddleware().array(fieldName, maxCount);
  }

  // Multiple fields with different names
  fields(fields) {
    return this.getUploadMiddleware().fields(fields);
  }

  // Process uploaded files
  async processFiles(req, res, next) {
    if (!req.files && !req.file) {
      return next();
    }

    try {
      const files = req.files || [req.file];
      const processedFiles = [];

      for (const file of files) {
        // Generate thumbnails for images
        if (file.mimetype.startsWith("image/")) {
          const thumbnail = await this.generateThumbnail(file);
          file.thumbnail = thumbnail;
        }

        // Add file metadata
        file.metadata = await this.extractMetadata(file);

        // Save file info to database
        const fileRecord = await FileModel.create({
          originalName: file.originalname,
          filename: file.filename,
          mimetype: file.mimetype,
          size: file.size,
          path: file.path,
          uploadedBy: req.user?.id,
          metadata: file.metadata,
        });

        processedFiles.push({
          ...file,
          databaseRecord: fileRecord,
        });
      }

      req.processedFiles = processedFiles;
      next();
    } catch (error) {
      // Clean up uploaded files on error
      await this.cleanupFiles(req.files || [req.file]);
      next(error);
    }
  }

  async generateThumbnail(file) {
    // Implementation for generating thumbnails
    // Use sharp or jimp library
    return {
      filename: `thumb_${file.filename}`,
      path: path.join(path.dirname(file.path), `thumb_${file.filename}`),
    };
  }

  async extractMetadata(file) {
    const metadata = {
      size: file.size,
      mimetype: file.mimetype,
      uploadedAt: new Date(),
    };

    // Extract image metadata
    if (file.mimetype.startsWith("image/")) {
      // Use sharp or other library to get image dimensions
      // const imageInfo = await sharp(file.path).metadata();
      // metadata.width = imageInfo.width;
      // metadata.height = imageInfo.height;
    }

    return metadata;
  }

  async cleanupFiles(files) {
    if (!files) return;

    const fileArray = Array.isArray(files) ? files : [files];

    for (const file of fileArray) {
      try {
        await fs.unlink(file.path);
        if (file.thumbnail) {
          await fs.unlink(file.thumbnail.path);
        }
      } catch (error) {
        console.error("Error cleaning up file:", error);
      }
    }
  }
}

// Usage
const fileUpload = new FileUploadHandler({
  uploadDir: "uploads",
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: ["image/jpeg", "image/png", "application/pdf"],
});

// Single file upload
app.post(
  "/api/upload/avatar",
  authMiddleware,
  fileUpload.single("avatar"),
  fileUpload.processFiles,
  async (req, res) => {
    const uploadedFile = req.processedFiles[0];
    res.json({
      message: "File uploaded successfully",
      file: {
        id: uploadedFile.databaseRecord.id,
        originalName: uploadedFile.originalname,
        size: uploadedFile.size,
        thumbnail: uploadedFile.thumbnail,
      },
    });
  }
);

// Multiple files upload
app.post(
  "/api/upload/documents",
  authMiddleware,
  fileUpload.multiple("documents", 5),
  fileUpload.processFiles,
  async (req, res) => {
    const uploadedFiles = req.processedFiles;
    res.json({
      message: `${uploadedFiles.length} files uploaded successfully`,
      files: uploadedFiles.map((file) => ({
        id: file.databaseRecord.id,
        originalName: file.originalname,
        size: file.size,
      })),
    });
  }
);
```

## Performance Optimization

### 1. Caching Middleware

```javascript
import NodeCache from "node-cache";
import crypto from "crypto";

class CacheMiddleware {
  constructor(options = {}) {
    this.cache = new NodeCache({
      stdTTL: options.ttl || 300, // 5 minutes default
      checkperiod: options.checkPeriod || 60,
      useClones: false,
    });

    this.keyPrefix = options.keyPrefix || "cache:";
  }

  generateKey(req) {
    const keyData = {
      method: req.method,
      url: req.originalUrl,
      query: req.query,
      // Include user ID for personalized caching
      userId: req.user?.id || "anonymous",
    };

    return (
      this.keyPrefix +
      crypto.createHash("md5").update(JSON.stringify(keyData)).digest("hex")
    );
  }

  middleware(options = {}) {
    const ttl = options.ttl;
    const keyGenerator = options.keyGenerator || this.generateKey.bind(this);

    return async (req, res, next) => {
      // Skip cache for non-GET requests
      if (req.method !== "GET") {
        return next();
      }

      const key = keyGenerator(req);
      const cached = this.cache.get(key);

      if (cached) {
        // Set cache headers
        res.set("X-Cache", "HIT");
        res.set("X-Cache-Key", key);
        return res.json(cached);
      }

      // Override res.json to cache response
      const originalJson = res.json;
      res.json = function (data) {
        // Cache the response
        this.cache.set(key, data, ttl);

        // Set cache headers
        res.set("X-Cache", "MISS");
        res.set("X-Cache-Key", key);
        res.set("X-Cache-TTL", ttl || this.cache.options.stdTTL);

        return originalJson.call(this, data);
      }.bind(this);

      next();
    };
  }

  // Cache invalidation
  invalidate(pattern) {
    if (typeof pattern === "string") {
      this.cache.del(pattern);
    } else if (pattern instanceof RegExp) {
      const keys = this.cache.keys();
      const matchingKeys = keys.filter((key) => pattern.test(key));
      this.cache.del(matchingKeys);
    }
  }

  // Cache statistics
  getStats() {
    return this.cache.getStats();
  }

  // Clear all cache
  clear() {
    this.cache.flushAll();
  }
}

// Usage
const cache = new CacheMiddleware({ ttl: 600 }); // 10 minutes

// Apply caching to routes
app.get(
  "/api/users",
  authMiddleware,
  cache.middleware({ ttl: 300 }), // 5 minutes
  userController.getAll
);

app.get(
  "/api/posts/:id",
  cache.middleware({
    ttl: 1800, // 30 minutes
    keyGenerator: (req) => `post:${req.params.id}`,
  }),
  postController.getById
);

// Cache invalidation on updates
app.put("/api/posts/:id", authMiddleware, async (req, res, next) => {
  // Update post
  const updatedPost = await postController.update(req, res, next);

  // Invalidate cache
  cache.invalidate(new RegExp(`post:${req.params.id}`));

  res.json(updatedPost);
});
```

### 2. Compression and Optimization

```javascript
import compression from "compression";
import helmet from "helmet";

class PerformanceMiddleware {
  static compression() {
    return compression({
      filter: (req, res) => {
        if (req.headers["x-no-compression"]) {
          return false;
        }
        return compression.filter(req, res);
      },
      level: 6,
      threshold: 1024, // Only compress responses larger than 1KB
      windowBits: 15,
      memLevel: 8,
    });
  }

  static security() {
    return helmet({
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
    });
  }

  static rateLimit(options = {}) {
    const rateLimit = require("express-rate-limit");

    return rateLimit({
      windowMs: options.windowMs || 15 * 60 * 1000, // 15 minutes
      max: options.max || 100, // Limit each IP to 100 requests per windowMs
      message: {
        error: "Too many requests",
        retryAfter: Math.ceil(options.windowMs / 1000),
      },
      standardHeaders: true,
      legacyHeaders: false,
      keyGenerator: (req) => {
        return req.ip + (req.user?.id || "");
      },
      handler: (req, res) => {
        res.status(429).json({
          error: "Too many requests",
          retryAfter: Math.ceil(options.windowMs / 1000),
        });
      },
    });
  }

  static slowDown(options = {}) {
    const slowDown = require("express-slow-down");

    return slowDown({
      windowMs: options.windowMs || 15 * 60 * 1000,
      delayAfter: options.delayAfter || 50,
      delayMs: options.delayMs || 500,
      maxDelay: options.maxDelay || 20000,
      keyGenerator: (req) => req.ip + (req.user?.id || ""),
    });
  }
}

// Apply performance middleware
app.use(PerformanceMiddleware.compression());
app.use(PerformanceMiddleware.security());

// Different rate limits for different routes
const publicLimiter = PerformanceMiddleware.rateLimit({ max: 100 });
const authLimiter = PerformanceMiddleware.rateLimit({ max: 20 });
const uploadLimiter = PerformanceMiddleware.rateLimit({ max: 5 });

app.use("/api/", publicLimiter);
app.use("/api/auth", authLimiter);
app.use("/api/upload", uploadLimiter);
```

## Advanced Express.js Interview Questions

### 1. "How would you implement a middleware that measures response time?"

```javascript
const responseTimeMiddleware = (req, res, next) => {
  const startTime = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - startTime;
    console.log(`${req.method} ${req.url} - ${res.statusCode} - ${duration}ms`);

    // Store metrics for monitoring
    // metrics.record('response_time', duration, {
    //   method: req.method,
    //   route: req.route?.path,
    //   status: res.statusCode
    // });
  });

  next();
};
```

### 2. "How would you handle concurrent requests safely in Express?"

```javascript
class ConcurrencyController {
  constructor(maxConcurrent = 10) {
    this.maxConcurrent = maxConcurrent;
    this.currentRequests = 0;
    this.queue = [];
  }

  middleware() {
    return (req, res, next) => {
      if (this.currentRequests < this.maxConcurrent) {
        this.processRequest(req, res, next);
      } else {
        this.queue.push({ req, res, next });
      }
    };
  }

  processRequest(req, res, next) {
    this.currentRequests++;

    res.on("finish", () => {
      this.currentRequests--;
      this.processNext();
    });

    next();
  }

  processNext() {
    if (this.queue.length > 0 && this.currentRequests < this.maxConcurrent) {
      const { req, res, next } = this.queue.shift();
      this.processRequest(req, res, next);
    }
  }
}
```

## Key Takeaways for FAANG

### Advanced Express Patterns

- **Middleware Composition**: Chain and combine middlewares effectively
- **Error Handling**: Comprehensive error handling with proper logging
- **Validation**: Input validation and sanitization for security
- **File Upload**: Secure and efficient file handling
- **Performance**: Caching, compression, and rate limiting

### Best Practices

- Use async/await with proper error handling
- Implement comprehensive logging and monitoring
- Validate and sanitize all inputs
- Use middleware for cross-cutting concerns
- Implement proper security headers

### External Resources

- **Express.js Documentation**: https://expressjs.com/
- **Middleware Guide**: https://expressjs.com/en/guide/using-middleware.html
- **Security Best Practices**: https://expressjs.com/en/advanced/security-best-practices.html
- **Performance Tuning**: https://expressjs.com/en/advanced/performance.html
