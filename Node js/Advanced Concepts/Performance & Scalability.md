# Performance & Scalability in Node.js

## Performance Fundamentals for FAANG

### Why Performance Matters

- **User Experience**: Faster response times = better user satisfaction
- **SEO Rankings**: Page speed is a ranking factor
- **Cost Efficiency**: Optimized code uses fewer resources
- **Scalability**: Better performance enables handling more users
- **Competitive Advantage**: Speed can be a key differentiator

## Memory Management & Garbage Collection

### Understanding V8 Memory Management

```javascript
// Memory monitoring and optimization
import v8 from "v8";

class MemoryMonitor {
  constructor() {
    this.heapStats = v8.getHeapStatistics();
    this.heapUsage = process.memoryUsage();
  }

  getMemoryReport() {
    const usage = process.memoryUsage();
    const stats = v8.getHeapStatistics();

    return {
      rss: Math.round(usage.rss / 1024 / 1024) + " MB", // Resident Set Size
      heapTotal: Math.round(usage.heapTotal / 1024 / 1024) + " MB",
      heapUsed: Math.round(usage.heapUsed / 1024 / 1024) + " MB",
      external: Math.round(usage.external / 1024 / 1024) + " MB",

      // V8 specific stats
      heapSizeLimit: Math.round(stats.heap_size_limit / 1024 / 1024) + " MB",
      totalHeapSize: Math.round(stats.total_heap_size / 1024 / 1024) + " MB",
      usedHeapSize: Math.round(stats.used_heap_size / 1024 / 1024) + " MB",
    };
  }

  // Force garbage collection (for debugging only)
  forceGC() {
    if (global.gc) {
      global.gc();
      console.log("Garbage collection forced");
    }
  }
}

// Memory leak detection
class MemoryLeakDetector {
  constructor() {
    this.objects = new Map();
    this.checkInterval = 30000; // 30 seconds
  }

  track(id, object) {
    this.objects.set(id, {
      object,
      createdAt: Date.now(),
      size: JSON.stringify(object).length,
    });
  }

  release(id) {
    this.objects.delete(id);
  }

  startMonitoring() {
    setInterval(() => {
      const now = Date.now();
      const oldObjects = [];

      this.objects.forEach((value, key) => {
        if (now - value.createdAt > 60000) {
          // Older than 1 minute
          oldObjects.push({ key, age: now - value.createdAt });
        }
      });

      if (oldObjects.length > 0) {
        console.warn("Potential memory leaks detected:", oldObjects);
      }
    }, this.checkInterval);
  }
}
```

### Memory Optimization Patterns

```javascript
// Object pooling for frequently created/destroyed objects
class ObjectPool {
  constructor(createFn, resetFn, maxSize = 100) {
    this.createFn = createFn;
    this.resetFn = resetFn;
    this.pool = [];
    this.maxSize = maxSize;
  }

  acquire() {
    if (this.pool.length > 0) {
      return this.pool.pop();
    }
    return this.createFn();
  }

  release(obj) {
    if (this.pool.length < this.maxSize) {
      this.resetFn(obj);
      this.pool.push(obj);
    }
  }
}

// Usage example for database connections
class ConnectionPool {
  constructor(config, maxConnections = 10) {
    this.config = config;
    this.maxConnections = maxConnections;
    this.pool = [];
    this.waitingQueue = [];
  }

  async acquire() {
    if (this.pool.length > 0) {
      return this.pool.pop();
    }

    if (this.getTotalConnections() < this.maxConnections) {
      return await this.createConnection();
    }

    // Wait for connection to be released
    return new Promise((resolve) => {
      this.waitingQueue.push(resolve);
    });
  }

  release(connection) {
    if (this.waitingQueue.length > 0) {
      const resolve = this.waitingQueue.shift();
      resolve(connection);
    } else {
      this.pool.push(connection);
    }
  }

  async createConnection() {
    // Create new database connection
    return new DatabaseConnection(this.config);
  }

  getTotalConnections() {
    return this.pool.length + this.waitingQueue.length;
  }
}
```

## Caching Strategies

### Multi-Level Caching Architecture

```javascript
import Redis from "redis";
import NodeCache from "node-cache";

class CacheManager {
  constructor() {
    // L1: In-memory cache (fastest, limited size)
    this.l1Cache = new NodeCache({
      stdTTL: 300, // 5 minutes
      checkperiod: 60, // Check for expired keys every minute
      useClones: false,
    });

    // L2: Redis cache (shared across instances)
    this.l2Cache = Redis.createClient({
      url: process.env.REDIS_URL,
    });

    this.l2Cache.connect();
  }

  async get(key) {
    // Try L1 cache first
    let value = this.l1Cache.get(key);
    if (value !== undefined) {
      return value;
    }

    // Try L2 cache
    try {
      value = await this.l2Cache.get(key);
      if (value !== null) {
        const parsedValue = JSON.parse(value);
        // Store in L1 for faster access
        this.l1Cache.set(key, parsedValue);
        return parsedValue;
      }
    } catch (error) {
      console.error("Redis cache error:", error);
    }

    return null;
  }

  async set(key, value, ttl = 300) {
    // Set in both caches
    this.l1Cache.set(key, value, ttl);

    try {
      await this.l2Cache.setEx(key, ttl, JSON.stringify(value));
    } catch (error) {
      console.error("Redis cache set error:", error);
    }
  }

  async invalidate(pattern) {
    // Invalidate from both caches
    const keys = this.l1Cache.keys();
    const matchingKeys = keys.filter((key) => key.includes(pattern));
    this.l1Cache.del(matchingKeys);

    try {
      const redisKeys = await this.l2Cache.keys(`*${pattern}*`);
      if (redisKeys.length > 0) {
        await this.l2Cache.del(redisKeys);
      }
    } catch (error) {
      console.error("Redis cache invalidation error:", error);
    }
  }
}

// Cache-Aside Pattern Implementation
class UserService {
  constructor() {
    this.cache = new CacheManager();
    this.db = new DatabaseService();
  }

  async getUserById(id) {
    const cacheKey = `user:${id}`;

    // Try cache first
    let user = await this.cache.get(cacheKey);
    if (user) {
      console.log("Cache hit for user:", id);
      return user;
    }

    // Cache miss - fetch from database
    console.log("Cache miss for user:", id);
    user = await this.db.findUserById(id);

    if (user) {
      // Cache the result
      await this.cache.set(cacheKey, user, 600); // 10 minutes
    }

    return user;
  }

  async updateUser(id, userData) {
    // Update database
    const updatedUser = await this.db.updateUser(id, userData);

    // Invalidate cache
    await this.cache.invalidate(`user:${id}`);

    return updatedUser;
  }
}
```

### Write-Through and Write-Behind Caching

```javascript
class WriteThroughCache {
  constructor(cache, database) {
    this.cache = cache;
    this.database = database;
  }

  async set(key, value) {
    // Write to cache immediately
    await this.cache.set(key, value);

    // Write to database
    await this.database.set(key, value);
  }

  async get(key) {
    // Try cache first
    let value = await this.cache.get(key);
    if (value !== null) {
      return value;
    }

    // Fallback to database
    value = await this.database.get(key);
    if (value !== null) {
      await this.cache.set(key, value);
    }

    return value;
  }
}

class WriteBehindCache {
  constructor(cache, database) {
    this.cache = cache;
    this.database = database;
    this.writeQueue = [];
    this.batchSize = 100;
    this.flushInterval = 5000; // 5 seconds

    this.startBatchProcessor();
  }

  async set(key, value) {
    // Write to cache immediately
    await this.cache.set(key, value);

    // Queue for database write
    this.writeQueue.push({ key, value, timestamp: Date.now() });

    // Process batch if queue is full
    if (this.writeQueue.length >= this.batchSize) {
      await this.flushBatch();
    }
  }

  async flushBatch() {
    if (this.writeQueue.length === 0) return;

    const batch = this.writeQueue.splice(0, this.batchSize);

    try {
      await this.database.batchSet(batch);
      console.log(`Flushed batch of ${batch.length} items to database`);
    } catch (error) {
      // Re-queue failed items
      this.writeQueue.unshift(...batch);
      console.error("Batch flush failed:", error);
    }
  }

  startBatchProcessor() {
    setInterval(() => {
      if (this.writeQueue.length > 0) {
        this.flushBatch();
      }
    }, this.flushInterval);
  }
}
```

## Rate Limiting & Throttling

### Advanced Rate Limiting Implementation

```javascript
import Redis from "redis";

class RateLimiter {
  constructor(redisClient) {
    this.redis = redisClient;
    this.defaultLimits = {
      windowMs: 15 * 60 * 1000, // 15 minutes
      maxRequests: 100,
    };
  }

  async isAllowed(key, options = {}) {
    const { windowMs, maxRequests } = { ...this.defaultLimits, ...options };
    const window = Math.ceil(windowMs / 1000); // Convert to seconds

    const redisKey = `rate_limit:${key}`;
    const now = Math.floor(Date.now() / 1000);

    // Use Redis sliding window algorithm
    const pipeline = this.redis.multi();

    // Remove expired entries
    pipeline.zRemRangeByScore(redisKey, 0, now - window);

    // Count current requests
    pipeline.zCard(redisKey);

    // Add current request
    pipeline.zAdd(redisKey, { score: now, value: `${now}-${Math.random()}` });

    // Set expiration
    pipeline.expire(redisKey, window);

    const results = await pipeline.exec();
    const requestCount = results[1][1];

    return {
      allowed: requestCount < maxRequests,
      remaining: Math.max(0, maxRequests - requestCount),
      resetTime: now + window,
    };
  }

  // Middleware factory
  middleware(options = {}) {
    return async (req, res, next) => {
      const key = this.getKey(req);
      const result = await this.isAllowed(key, options);

      // Set rate limit headers
      res.set({
        "X-RateLimit-Limit":
          options.maxRequests || this.defaultLimits.maxRequests,
        "X-RateLimit-Remaining": result.remaining,
        "X-RateLimit-Reset": new Date(result.resetTime * 1000).toISOString(),
      });

      if (!result.allowed) {
        return res.status(429).json({
          error: "Too many requests",
          retryAfter: Math.ceil(result.resetTime - Date.now() / 1000),
        });
      }

      next();
    };
  }

  getKey(req) {
    // Use IP address, or user ID if authenticated
    return req.user?.id || req.ip;
  }
}

// Usage in Express
const redisClient = Redis.createClient({ url: process.env.REDIS_URL });
const rateLimiter = new RateLimiter(redisClient);

app.use(
  "/api/",
  rateLimiter.middleware({
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 1000, // Limit each IP to 1000 requests per window
  })
);

// Stricter limits for sensitive endpoints
app.post(
  "/api/login",
  rateLimiter.middleware({
    windowMs: 15 * 60 * 1000,
    maxRequests: 5,
  }),
  loginHandler
);
```

## Connection Pooling & Database Optimization

### Advanced Database Connection Pooling

```javascript
import { Pool as PgPool } from "pg";

class DatabaseManager {
  constructor(config) {
    this.config = config;
    this.pools = new Map();
    this.queryCache = new Map();
  }

  getPool(database = "default") {
    if (!this.pools.has(database)) {
      const pool = new PgPool({
        ...this.config,
        max: 20, // Maximum connections
        min: 5, // Minimum connections
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,

        // Connection retry settings
        retries: 3,
        retryDelayMillis: 200,

        // Query timeout
        query_timeout: 30000,

        // SSL for production
        ssl:
          process.env.NODE_ENV === "production"
            ? {
                rejectUnauthorized: false,
              }
            : false,
      });

      // Pool event listeners
      pool.on("connect", (client) => {
        console.log("New database connection established");
      });

      pool.on("error", (err, client) => {
        console.error("Database pool error:", err);
      });

      this.pools.set(database, pool);
    }

    return this.pools.get(database);
  }

  async query(database, text, params) {
    const pool = this.getPool(database);
    const start = Date.now();

    try {
      const result = await pool.query(text, params);
      const duration = Date.now() - start;

      // Log slow queries
      if (duration > 1000) {
        console.warn("Slow query detected:", {
          query: text,
          duration: `${duration}ms`,
          params,
        });
      }

      return result;
    } catch (error) {
      console.error("Database query error:", {
        query: text,
        error: error.message,
      });
      throw error;
    }
  }

  // Transaction helper
  async transaction(database, callback) {
    const pool = this.getPool(database);
    const client = await pool.connect();

    try {
      await client.query("BEGIN");
      const result = await callback(client);
      await client.query("COMMIT");
      return result;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  // Query optimization
  async optimizedQuery(database, text, params, cacheKey = null, ttl = 300) {
    // Check cache first
    if (cacheKey) {
      const cached = await this.cache.get(cacheKey);
      if (cached) {
        return cached;
      }
    }

    // Execute query
    const result = await this.query(database, text, params);

    // Cache result
    if (cacheKey) {
      await this.cache.set(cacheKey, result, ttl);
    }

    return result;
  }
}
```

## Clustering & Horizontal Scaling

### Node.js Clustering for Multi-Core Utilization

```javascript
import cluster from "cluster";
import os from "os";

class ClusterManager {
  constructor(app, options = {}) {
    this.app = app;
    this.options = {
      workers: os.cpus().length,
      restartDelay: 5000,
      maxRestarts: 10,
      ...options,
    };

    this.workerRestarts = new Map();
    this.setupGracefulShutdown();
  }

  start() {
    if (cluster.isMaster) {
      this.startMaster();
    } else {
      this.startWorker();
    }
  }

  startMaster() {
    console.log(`Master ${process.pid} is running`);

    // Fork workers
    for (let i = 0; i < this.options.workers; i++) {
      this.forkWorker();
    }

    // Handle worker events
    cluster.on("exit", (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died (${code || signal})`);
      this.handleWorkerExit(worker);
    });

    cluster.on("online", (worker) => {
      console.log(`Worker ${worker.process.pid} is online`);
    });

    cluster.on("disconnect", (worker) => {
      console.log(`Worker ${worker.process.pid} disconnected`);
    });
  }

  forkWorker() {
    const worker = cluster.fork();

    // Track restarts
    const restartCount = this.workerRestarts.get(worker.id) || 0;
    this.workerRestarts.set(worker.id, restartCount);

    // Handle worker messages
    worker.on("message", (message) => {
      this.handleWorkerMessage(worker, message);
    });
  }

  handleWorkerExit(worker) {
    const restartCount = this.workerRestarts.get(worker.id) || 0;

    if (restartCount < this.options.maxRestarts) {
      console.log(`Restarting worker (restart #${restartCount + 1})`);
      setTimeout(() => {
        this.forkWorker();
      }, this.options.restartDelay);
    } else {
      console.error(`Worker ${worker.id} exceeded max restarts`);
      process.exit(1);
    }
  }

  handleWorkerMessage(worker, message) {
    switch (message.type) {
      case "log":
        console.log(`Worker ${worker.id}:`, message.data);
        break;
      case "error":
        console.error(`Worker ${worker.id} error:`, message.data);
        break;
      case "restart":
        worker.kill("SIGTERM");
        break;
    }
  }

  startWorker() {
    console.log(`Worker ${process.pid} started`);

    // Start the application
    this.app.listen(process.env.PORT || 3000, () => {
      console.log(
        `Worker ${process.pid} listening on port ${process.env.PORT || 3000}`
      );
    });

    // Handle worker shutdown
    process.on("SIGTERM", () => {
      console.log(`Worker ${process.pid} received SIGTERM`);
      process.exit(0);
    });

    process.on("SIGINT", () => {
      console.log(`Worker ${process.pid} received SIGINT`);
      process.exit(0);
    });
  }

  setupGracefulShutdown() {
    process.on("SIGTERM", () => {
      console.log("Master received SIGTERM, shutting down gracefully");

      // Shutdown all workers
      Object.values(cluster.workers).forEach((worker) => {
        worker.kill("SIGTERM");
      });

      // Force exit after timeout
      setTimeout(() => {
        process.exit(0);
      }, 10000);
    });
  }
}

// Usage
import express from "express";
const app = express();

// Your Express app setup
app.get("/", (req, res) => {
  res.json({
    message: "Hello from cluster!",
    pid: process.pid,
    uptime: process.uptime(),
  });
});

// Start cluster
const clusterManager = new ClusterManager(app);
clusterManager.start();
```

## Performance Monitoring & Profiling

### Comprehensive Performance Monitoring

```javascript
import { performance } from "perf_hooks";
import { promisify } from "util";

class PerformanceMonitor {
  constructor() {
    this.metrics = new Map();
    this.slowQueries = [];
    this.requestTimes = [];
    this.thresholds = {
      slowQuery: 1000, // 1 second
      slowRequest: 500, // 500ms
      memoryWarning: 500 * 1024 * 1024, // 500MB
    };
  }

  // Request timing middleware
  requestTimer() {
    return (req, res, next) => {
      const start = performance.now();

      res.on("finish", () => {
        const duration = performance.now() - start;
        this.recordRequestTime(req, res, duration);
      });

      next();
    };
  }

  recordRequestTime(req, res, duration) {
    const metric = {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration,
      timestamp: Date.now(),
      userAgent: req.get("User-Agent"),
      ip: req.ip,
    };

    this.requestTimes.push(metric);

    // Alert on slow requests
    if (duration > this.thresholds.slowRequest) {
      console.warn("Slow request detected:", metric);
    }

    // Keep only recent requests (last 1000)
    if (this.requestTimes.length > 1000) {
      this.requestTimes = this.requestTimes.slice(-1000);
    }
  }

  // Database query monitoring
  async monitorQuery(queryFn, queryName) {
    const start = performance.now();

    try {
      const result = await queryFn();
      const duration = performance.now() - start;

      this.recordQueryMetric(queryName, duration, true);

      return result;
    } catch (error) {
      const duration = performance.now() - start;
      this.recordQueryMetric(queryName, duration, false, error);
      throw error;
    }
  }

  recordQueryMetric(queryName, duration, success, error = null) {
    const metric = {
      query: queryName,
      duration,
      success,
      error: error?.message,
      timestamp: Date.now(),
    };

    if (!this.metrics.has(queryName)) {
      this.metrics.set(queryName, []);
    }

    this.metrics.get(queryName).push(metric);

    // Alert on slow queries
    if (duration > this.thresholds.slowQuery) {
      this.slowQueries.push(metric);
      console.warn("Slow query detected:", metric);
    }

    // Keep only recent metrics (last 100 per query)
    const queryMetrics = this.metrics.get(queryName);
    if (queryMetrics.length > 100) {
      this.metrics.set(queryName, queryMetrics.slice(-100));
    }
  }

  // Memory monitoring
  startMemoryMonitoring(interval = 30000) {
    setInterval(() => {
      const usage = process.memoryUsage();

      if (usage.heapUsed > this.thresholds.memoryWarning) {
        console.warn("High memory usage detected:", {
          heapUsed: Math.round(usage.heapUsed / 1024 / 1024) + " MB",
          heapTotal: Math.round(usage.heapTotal / 1024 / 1024) + " MB",
          rss: Math.round(usage.rss / 1024 / 1024) + " MB",
        });
      }
    }, interval);
  }

  // Performance reports
  getPerformanceReport() {
    const report = {
      timestamp: new Date().toISOString(),
      memory: process.memoryUsage(),
      uptime: process.uptime(),

      // Request statistics
      requests: {
        total: this.requestTimes.length,
        averageTime: this.calculateAverage(
          this.requestTimes.map((r) => r.duration)
        ),
        slowRequests: this.requestTimes.filter(
          (r) => r.duration > this.thresholds.slowRequest
        ).length,
        errorRate: this.calculateErrorRate(),
      },

      // Query statistics
      queries: this.getQueryStatistics(),

      // Slow queries
      slowQueries: this.slowQueries.slice(-10), // Last 10 slow queries
    };

    return report;
  }

  calculateAverage(values) {
    if (values.length === 0) return 0;
    return values.reduce((sum, val) => sum + val, 0) / values.length;
  }

  calculateErrorRate() {
    if (this.requestTimes.length === 0) return 0;
    const errors = this.requestTimes.filter((r) => r.statusCode >= 400).length;
    return (errors / this.requestTimes.length) * 100;
  }

  getQueryStatistics() {
    const stats = {};

    this.metrics.forEach((metrics, queryName) => {
      const durations = metrics.map((m) => m.duration);
      const successCount = metrics.filter((m) => m.success).length;

      stats[queryName] = {
        total: metrics.length,
        successRate: (successCount / metrics.length) * 100,
        averageTime: this.calculateAverage(durations),
        maxTime: Math.max(...durations),
        minTime: Math.min(...durations),
      };
    });

    return stats;
  }
}

// Usage example
const perfMonitor = new PerformanceMonitor();

// Apply middleware
app.use(perfMonitor.requestTimer());

// Monitor database queries
async function getUserById(id) {
  return await perfMonitor.monitorQuery(
    () => db.query("SELECT * FROM users WHERE id = $1", [id]),
    "getUserById"
  );
}

// Start memory monitoring
perfMonitor.startMemoryMonitoring();

// Performance endpoint
app.get("/admin/performance", (req, res) => {
  const report = perfMonitor.getPerformanceReport();
  res.json(report);
});
```

## Load Balancing with Nginx

### Nginx Configuration for Node.js

```nginx
# nginx.conf
upstream nodejs_backend {
    # Round-robin load balancing
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;
    server 127.0.0.1:3002;

    # Health check
    keepalive 32;
}

server {
    listen 80;
    server_name your-domain.com;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=login:10m rate=1r/s;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Static files
    location /static/ {
        root /var/www;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # API routes with rate limiting
    location /api/ {
        limit_req zone=api burst=20 nodelay;

        proxy_pass http://nodejs_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Login endpoint with stricter rate limiting
    location /api/login {
        limit_req zone=login burst=5 nodelay;

        proxy_pass http://nodejs_backend;
        # ... same proxy settings
    }

    # WebSocket support
    location /socket.io/ {
        proxy_pass http://nodejs_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Key Performance Takeaways for FAANG

### Memory Management

- Monitor heap usage and garbage collection patterns
- Implement object pooling for frequently created objects
- Use streams for large data processing
- Detect and fix memory leaks early

### Caching Strategy

- Implement multi-level caching (memory + Redis)
- Use cache-aside pattern for read-heavy workloads
- Consider write-behind caching for write-heavy scenarios
- Implement cache invalidation strategies

### Database Optimization

- Use connection pooling effectively
- Implement query caching
- Monitor and optimize slow queries
- Use transactions appropriately

### Scalability

- Implement clustering for multi-core utilization
- Use load balancers for horizontal scaling
- Design for stateless applications
- Implement proper monitoring and alerting

## External Performance Resources

- **Node.js Performance Guide**: https://nodejs.org/en/docs/guides/simple-profiling/
- **V8 Performance Tips**: https://github.com/theturtle32/WebAssembly-NodeJS-Performance
- **Redis Caching Best Practices**: https://redis.io/docs/manual/programming/
- **Nginx Load Balancing**: https://nginx.org/en/docs/http/load_balancing.html
- **PM2 Process Management**: https://pm2.keymetrics.io/docs/usage/cluster-mode/
