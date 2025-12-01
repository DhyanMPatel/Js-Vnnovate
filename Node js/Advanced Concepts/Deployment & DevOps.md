# Deployment & DevOps in Node.js

## DevOps Fundamentals for FAANG

### Why DevOps Matters

- **Continuous Delivery**: Faster, more reliable deployments
- **Infrastructure as Code**: Reproducible environments
- **Automation**: Reduce manual errors and improve efficiency
- **Monitoring**: Proactive issue detection and resolution
- **Scalability**: Handle growing traffic and demand

## Docker Containerization

### Multi-Stage Docker Builds

```dockerfile
# Dockerfile.optimized
# Stage 1: Build dependencies
FROM node:18-alpine AS deps

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile --production=false

# Stage 2: Build application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Run build scripts
RUN yarn build

# Stage 3: Production runtime
FROM node:18-alpine AS runtime

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

WORKDIR /app

# Copy built application and production dependencies
COPY --from=deps --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/package.json ./package.json

# Security: Remove development dependencies
RUN npm prune --production

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node dist/healthcheck.js

# Security best practices
USER nodejs

EXPOSE 3000

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/index.js"]
```

### Docker Compose for Development

```yaml
# docker-compose.dev.yml
version: "3.8"

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
      - "9229:9229" # Debug port
    environment:
      - NODE_ENV=development
      - DEBUG=app:*
    volumes:
      - .:/app
      - /app/node_modules # Prevent overwriting node_modules
    depends_on:
      - postgres
      - redis
    networks:
      - app-network

  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=app_dev
      - POSTGRES_USER=dev
      - POSTGRES_PASSWORD=dev123
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./scripts/init-db.sql:/docker-entrypoint-initdb.d/init-db.sql
    networks:
      - app-network

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - app-network

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx/dev.conf:/etc/nginx/nginx.conf
    depends_on:
      - app
    networks:
      - app-network

volumes:
  postgres_data:
  redis_data:

networks:
  app-network:
    driver: bridge
```

## Kubernetes Deployment

### Kubernetes Manifests

```yaml
# k8s/namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: node-app

---
# k8s/configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
  namespace: node-app
data:
  NODE_ENV: "production"
  LOG_LEVEL: "info"
  REDIS_HOST: "redis-service"
  REDIS_PORT: "6379"

---
# k8s/secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
  namespace: node-app
type: Opaque
data:
  DATABASE_URL: <base64-encoded-database-url>
  JWT_SECRET: <base64-encoded-jwt-secret>

---
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: node-app
  namespace: node-app
  labels:
    app: node-app
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: node-app
  template:
    metadata:
      labels:
        app: node-app
    spec:
      containers:
        - name: node-app
          image: node-app:latest
          ports:
            - containerPort: 3000
          envFrom:
            - configMapRef:
                name: app-config
            - secretRef:
                name: app-secrets
          resources:
            requests:
              memory: "256Mi"
              cpu: "250m"
            limits:
              memory: "512Mi"
              cpu: "500m"
          livenessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 30
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /ready
              port: 3000
            initialDelaySeconds: 5
            periodSeconds: 5
          lifecycle:
            preStop:
              exec:
                command: ["/bin/sh", "-c", "node graceful-shutdown.js"]

---
# k8s/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: node-app-service
  namespace: node-app
spec:
  selector:
    app: node-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
  type: ClusterIP

---
# k8s/ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: node-app-ingress
  namespace: node-app
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/rate-limit: "100"
spec:
  tls:
    - hosts:
        - api.yourapp.com
      secretName: api-tls
  rules:
    - host: api.yourapp.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: node-app-service
                port:
                  number: 80

---
# k8s/hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: node-app-hpa
  namespace: node-app
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: node-app
  minReplicas: 3
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80
```

### Helm Chart for Application

```yaml
# helm/node-app/Chart.yaml
apiVersion: v2
name: node-app
description: A Helm chart for Node.js application
type: application
version: 0.1.0
appVersion: "1.0.0"

# helm/node-app/values.yaml
replicaCount: 3

image:
  repository: node-app
  pullPolicy: IfNotPresent
  tag: "latest"

service:
  type: ClusterIP
  port: 80
  targetPort: 3000

ingress:
  enabled: true
  className: nginx
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
  hosts:
    - host: api.yourapp.com
      paths:
        - path: /
          pathType: Prefix
  tls:
    - secretName: api-tls
      hosts:
        - api.yourapp.com

autoscaling:
  enabled: true
  minReplicas: 3
  maxReplicas: 10
  targetCPUUtilizationPercentage: 70
  targetMemoryUtilizationPercentage: 80

resources:
  limits:
    cpu: 500m
    memory: 512Mi
  requests:
    cpu: 250m
    memory: 256Mi

# helm/node-app/templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "node-app.fullname" . }}
  labels:
    {{- include "node-app.labels" . | nindent 4 }}
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
      {{- include "node-app.selectorLabels" . | nindent 6 }}
  template:
    metadata:
      labels:
        {{- include "node-app.selectorLabels" . | nindent 8 }}
    spec:
      containers:
        - name: {{ .Chart.Name }}
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
          imagePullPolicy: {{ .Values.image.pullPolicy }}
          ports:
            - name: http
              containerPort: 3000
              protocol: TCP
          livenessProbe:
            httpGet:
              path: /health
              port: http
          readinessProbe:
            httpGet:
              path: /ready
              port: http
          resources:
            {{- toYaml .Values.resources | nindent 12 }}
```

## CI/CD Pipeline with GitHub Actions

### GitHub Actions Workflow

```yaml
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: test_db
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

      redis:
        image: redis:7
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 6379:6379

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run linting
        run: npm run lint

      - name: Run type checking
        run: npm run type-check

      - name: Run unit tests
        run: npm run test:unit
        env:
          NODE_ENV: test
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db
          REDIS_URL: redis://localhost:6379

      - name: Run integration tests
        run: npm run test:integration
        env:
          NODE_ENV: test
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db
          REDIS_URL: redis://localhost:6379

      - name: Upload coverage reports
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info

  security:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Run security audit
        run: npm audit --audit-level high

      - name: Run Snyk security scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}

  build:
    needs: [test, security]
    runs-on: ubuntu-latest
    if: github.event_name == 'push'

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2

      - name: Log in to Container Registry
        uses: docker/login-action@v2
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v4
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=ref,event=branch
            type=ref,event=pr
            type=sha,prefix={{branch}}-
            type=raw,value=latest,enable={{is_default_branch}}

      - name: Build and push Docker image
        uses: docker/build-push-action@v4
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

  deploy-staging:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/develop'
    environment: staging

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Configure kubectl
        uses: azure/k8s-set-context@v1
        with:
          method: kubeconfig
          kubeconfig: ${{ secrets.KUBE_CONFIG_STAGING }}

      - name: Deploy to staging
        run: |
          helm upgrade --install node-app-staging ./helm/node-app \
            --namespace staging \
            --create-namespace \
            --set image.tag=${{ github.sha }} \
            --set ingress.hosts[0].host=staging-api.yourapp.com \
            --wait

  deploy-production:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment: production

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Configure kubectl
        uses: azure/k8s-set-context@v1
        with:
          method: kubeconfig
          kubeconfig: ${{ secrets.KUBE_CONFIG_PRODUCTION }}

      - name: Deploy to production
        run: |
          helm upgrade --install node-app-prod ./helm/node-app \
            --namespace production \
            --create-namespace \
            --set image.tag=${{ github.sha }} \
            --set ingress.hosts[0].host=api.yourapp.com \
            --set replicaCount=5 \
            --wait

      - name: Run smoke tests
        run: |
          npm run test:smoke -- --baseUrl=https://api.yourapp.com
```

## Monitoring and Observability

### Prometheus and Grafana Setup

```yaml
# monitoring/prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - "alert_rules.yml"

alerting:
  alertmanagers:
    - static_configs:
        - targets:
            - alertmanager:9093

scrape_configs:
  - job_name: "node-app"
    static_configs:
      - targets: ["node-app:3000"]
    metrics_path: "/metrics"
    scrape_interval: 10s

  - job_name: "postgres"
    static_configs:
      - targets: ["postgres-exporter:9187"]

  - job_name: "redis"
    static_configs:
      - targets: ["redis-exporter:9121"]

  - job_name: "kubernetes-pods"
    kubernetes_sd_configs:
      - role: pod
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: true
```

### Custom Metrics in Node.js

```javascript
// src/metrics.js
import client from "prom-client";

// Create a Registry
const register = new client.Registry();

// Add default metrics
client.collectDefaultMetrics({ register });

// Custom metrics
const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10],
});

const httpRequestTotal = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"],
});

const activeConnections = new client.Gauge({
  name: "active_connections",
  help: "Number of active connections",
});

const databaseConnections = new client.Gauge({
  name: "database_connections_active",
  help: "Number of active database connections",
});

const businessMetrics = {
  userRegistrations: new client.Counter({
    name: "user_registrations_total",
    help: "Total number of user registrations",
  }),

  ordersProcessed: new client.Counter({
    name: "orders_processed_total",
    help: "Total number of orders processed",
    labelNames: ["status"],
  }),

  revenueTotal: new client.Gauge({
    name: "revenue_total",
    help: "Total revenue generated",
  }),
};

// Register all metrics
register.registerMetric(httpRequestDuration);
register.registerMetric(httpRequestTotal);
register.registerMetric(activeConnections);
register.registerMetric(databaseConnections);
Object.values(businessMetrics).forEach((metric) => {
  register.registerMetric(metric);
});

// Middleware for Express
export function metricsMiddleware(req, res, next) {
  const start = Date.now();

  res.on("finish", () => {
    const duration = (Date.now() - start) / 1000;
    const labels = {
      method: req.method,
      route: req.route?.path || req.path,
      status_code: res.statusCode,
    };

    httpRequestDuration.observe(labels, duration);
    httpRequestTotal.inc(labels);
  });

  next();
}

// Update connection metrics
export function updateConnectionMetrics(active, dbConnections) {
  activeConnections.set(active);
  databaseConnections.set(dbConnections);
}

// Export register and metrics
export { register, businessMetrics, httpRequestDuration, httpRequestTotal };

// src/app.js
import express from "express";
import { metricsMiddleware, register } from "./metrics";

const app = express();

// Apply metrics middleware
app.use(metricsMiddleware);

// Metrics endpoint
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

// Update business metrics
app.post("/api/users", (req, res) => {
  // User creation logic
  businessMetrics.userRegistrations.inc();
  res.status(201).json({ user: "created" });
});
```

### Structured Logging with Winston

```javascript
// src/logger.js
import winston from "winston";
import "winston-daily-rotate-file";

// Custom format for structured logging
const customFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json(),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    return JSON.stringify({
      timestamp,
      level,
      message,
      ...meta,
      service: "node-app",
      version: process.env.APP_VERSION || "1.0.0",
    });
  })
);

// Create logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: customFormat,
  defaultMeta: {
    service: "node-app",
  },
  transports: [
    // Console transport for development
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),

    // File transport with rotation
    new winston.transports.DailyRotateFile({
      filename: "logs/application-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "14d",
      level: "info",
    }),

    // Error file transport
    new winston.transports.DailyRotateFile({
      filename: "logs/error-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "30d",
      level: "error",
    }),
  ],
});

// Request logging middleware
export function requestLogger(req, res, next) {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;

    logger.info("HTTP Request", {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration,
      userAgent: req.get("User-Agent"),
      ip: req.ip,
      userId: req.user?.id,
    });
  });

  next();
}

// Error logging middleware
export function errorLogger(err, req, res, next) {
  logger.error("Application Error", {
    error: err.message,
    stack: err.stack,
    method: req.method,
    url: req.url,
    userId: req.user?.id,
    body: req.body,
    query: req.query,
  });

  next(err);
}

export default logger;
```

## Health Checks and Graceful Shutdown

### Health Check Implementation

```javascript
// src/healthcheck.js
import http from 'http';
import { performance } from 'perf_hooks';

class HealthChecker {
  constructor() {
    this.checks = new Map();
    this.startTime = Date.now();
  }

  // Add health check
  addCheck(name, checkFunction) {
    this.checks.set(name, checkFunction);
  }

  // Run all health checks
  async runChecks() {
    const results = {};
    let overall = 'healthy';

    for (const [name, checkFunction] of this.checks) {
      const startTime = performance.now();

      try {
        const result = await Promise.race([
          checkFunction(),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Health check timeout')), 5000)
          )
        ]);

        const duration = performance.now() - startTime;
        results[name] = {
          status: 'healthy',
          duration: Math.round(duration),
          ...result
        };
      } catch (error) {
        const duration = performance.now() - startTime;
        results[name] = {
          status: 'unhealthy',
          duration: Math.round(duration),
          error: error.message
        };
        overall = 'unhealthy';
      }
    }

    return {
      status: overall,
      timestamp: new Date().toISOString(),
      uptime: Date.now() - this.startTime,
      checks: results
    };
  }

  // Create health check server
  createServer(port = 3001) {
    return http.createServer(async (req, res) => {
      if (req.url === '/health') {
        try {
          const health = await this.runChecks();
          const statusCode = health.status === 'healthy' ? 200 : 503;

          res.writeHead(statusCode, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(health, null, 2));
        } catch (error) {
          res.writeHead(503, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            status: 'unhealthy',
            error: error.message
          }));
        }
      } else if (req.url === '/ready') {
        // Readiness check (can be different from liveness)
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          status: 'ready',
          timestamp: new Date().toISOString()
        }));
      } else {
        res.writeHead(404);
        res.end('Not Found');
      }
    }).listen(port);
  }
}

// Usage example
const healthChecker = new HealthChecker();

// Database health check
healthChecker.addCheck('database', async () => {
  const result = await db.query('SELECT 1');
  return { database: 'connected', queryTime: result.queryTime };
});

// Redis health check
healthChecker.addCheck('redis', async () => {
  await redis.ping();
  return { redis: 'connected' };
});

// External API health check
healthChecker.addCheck('external-api', async () => {
  const response = await fetch('https://api.external.com/health');
  return { externalApi: 'available', status: response.status });
});

// Memory usage check
healthChecker.addCheck('memory', async () => {
  const usage = process.memoryUsage();
  const heapUsedMB = Math.round(usage.heapUsed / 1024 / 1024);
  const heapTotalMB = Math.round(usage.heapTotal / 1024 / 1024);

  return {
    heapUsed: `${heapUsedMB}MB`,
    heapTotal: `${heapTotalMB}MB`,
    usagePercent: Math.round((heapUsedMB / heapTotalMB) * 100)
  };
});

export default healthChecker;
```

### Graceful Shutdown Implementation

```javascript
// src/graceful-shutdown.js
import logger from "./logger";

class GracefulShutdown {
  constructor() {
    this.shuttingDown = false;
    this.connections = new Set();
    this.cleanupTasks = [];
  }

  // Register cleanup task
  addCleanupTask(task) {
    this.cleanupTasks.push(task);
  }

  // Track active connections
  trackConnection(connection) {
    this.connections.add(connection);

    connection.on("close", () => {
      this.connections.delete(connection);
    });
  }

  // Initiate graceful shutdown
  async shutdown(signal) {
    if (this.shuttingDown) {
      logger.warn("Shutdown already in progress");
      return;
    }

    this.shuttingDown = true;
    logger.info(`Received ${signal}, starting graceful shutdown`);

    try {
      // Stop accepting new connections
      if (this.server) {
        this.server.close(() => {
          logger.info("HTTP server closed");
        });
      }

      // Wait for active connections to finish (with timeout)
      const connectionTimeout = setTimeout(() => {
        logger.warn("Force closing remaining connections");
        this.connections.forEach((conn) => conn.destroy());
      }, 30000); // 30 seconds timeout

      // Wait for all connections to close
      while (this.connections.size > 0) {
        logger.info(
          `Waiting for ${this.connections.size} connections to close`
        );
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      clearTimeout(connectionTimeout);
      logger.info("All connections closed");

      // Run cleanup tasks
      for (const task of this.cleanupTasks) {
        try {
          await task();
          logger.info("Cleanup task completed");
        } catch (error) {
          logger.error("Cleanup task failed:", error);
        }
      }

      logger.info("Graceful shutdown completed");
      process.exit(0);
    } catch (error) {
      logger.error("Error during shutdown:", error);
      process.exit(1);
    }
  }

  // Setup signal handlers
  setupHandlers(server) {
    this.server = server;

    // Track connections
    server.on("connection", (connection) => {
      this.trackConnection(connection);
    });

    // Handle shutdown signals
    const signals = ["SIGTERM", "SIGINT", "SIGUSR2"];
    signals.forEach((signal) => {
      process.on(signal, () => this.shutdown(signal));
    });

    // Handle uncaught exceptions
    process.on("uncaughtException", (error) => {
      logger.error("Uncaught exception:", error);
      this.shutdown("uncaughtException");
    });

    // Handle unhandled rejections
    process.on("unhandledRejection", (reason, promise) => {
      logger.error("Unhandled rejection at:", promise, "reason:", reason);
      this.shutdown("unhandledRejection");
    });
  }
}

export default GracefulShutdown;

// Usage in main app
import GracefulShutdown from "./graceful-shutdown";
import db from "./database";
import redis from "./redis";

const gracefulShutdown = new GracefulShutdown();

// Add cleanup tasks
gracefulShutdown.addCleanupTask(async () => {
  await db.close();
  logger.info("Database connections closed");
});

gracefulShutdown.addCleanupTask(async () => {
  await redis.quit();
  logger.info("Redis connections closed");
});

// Setup handlers
gracefulShutdown.setupHandlers(server);
```

## Environment Configuration Management

### Environment-Specific Configuration

```javascript
// src/config/index.js
import dotenv from "dotenv";
import path from "path";

// Load environment variables
dotenv.config();

const env = process.env.NODE_ENV || "development";

const baseConfig = {
  env,
  port: process.env.PORT || 3000,
  host: process.env.HOST || "0.0.0.0",

  // Database
  database: {
    url: process.env.DATABASE_URL,
    pool: {
      min: parseInt(process.env.DB_POOL_MIN) || 2,
      max: parseInt(process.env.DB_POOL_MAX) || 10,
      idle: parseInt(process.env.DB_POOL_IDLE) || 10000,
    },
  },

  // Redis
  redis: {
    url: process.env.REDIS_URL || "redis://localhost:6379",
    keyPrefix: process.env.REDIS_KEY_PREFIX || "app:",
    ttl: parseInt(process.env.REDIS_TTL) || 3600,
  },

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || "15m",
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  },

  // Logging
  logging: {
    level: process.env.LOG_LEVEL || "info",
    format: process.env.LOG_FORMAT || "json",
  },

  // CORS
  cors: {
    origin: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:3000"],
    credentials: process.env.CORS_CREDENTIALS === "true",
  },

  // Rate limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW) || 900000, // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX) || 100,
  },
};

// Environment-specific configurations
const envConfigs = {
  development: {
    ...baseConfig,
    logging: {
      ...baseConfig.logging,
      level: "debug",
      format: "simple",
    },
    cors: {
      ...baseConfig.cors,
      origin: ["http://localhost:3000", "http://localhost:3001"],
    },
  },

  test: {
    ...baseConfig,
    database: {
      ...baseConfig.database,
      url: process.env.TEST_DATABASE_URL || "sqlite::memory:",
    },
    logging: {
      ...baseConfig.logging,
      level: "error",
    },
    rateLimit: {
      ...baseConfig.rateLimit,
      max: 1000, // Higher limit for tests
    },
  },

  staging: {
    ...baseConfig,
    logging: {
      ...baseConfig.logging,
      level: "info",
    },
  },

  production: {
    ...baseConfig,
    logging: {
      ...baseConfig.logging,
      level: "warn",
    },
    cors: {
      ...baseConfig.cors,
      origin: process.env.CORS_ORIGIN?.split(",") || [],
    },
    rateLimit: {
      ...baseConfig.rateLimit,
      windowMs: 900000,
      max: 50,
    },
  },
};

// Validate required environment variables
function validateConfig(config) {
  const required = ["DATABASE_URL", "JWT_SECRET"];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }

  return config;
}

// Export merged configuration
const config = validateConfig(envConfigs[env] || baseConfig);
export default config;
```

## Key DevOps Takeaways for FAANG

### Containerization

- Use multi-stage builds for optimized Docker images
- Implement proper health checks and graceful shutdown
- Use non-root users for security
- Optimize layer caching and image size

### Kubernetes

- Implement proper resource limits and requests
- Use liveness and readiness probes
- Configure horizontal pod autoscaling
- Use Helm for templated deployments

### CI/CD

- Automate testing, building, and deployment
- Use environment-specific configurations
- Implement proper secrets management
- Monitor deployment success and rollback on failure

### Monitoring

- Implement comprehensive metrics collection
- Use structured logging for better observability
- Set up proper alerting and notification
- Monitor business metrics, not just infrastructure

## External DevOps Resources

- **Docker Best Practices**: https://docs.docker.com/develop/dev-best-practices/
- **Kubernetes Documentation**: https://kubernetes.io/docs/
- **Helm Guide**: https://helm.sh/docs/
- **Prometheus Monitoring**: https://prometheus.io/docs/
- **GitHub Actions**: https://docs.github.com/en/actions
