# Microservices & Architecture in Node.js

## Microservices Fundamentals for FAANG

### Why Microservices Matter

- **Scalability**: Scale individual services independently
- **Resilience**: Failure isolation prevents system-wide outages
- **Team Autonomy**: Teams can develop and deploy independently
- **Technology Diversity**: Use the right tool for each service
- **Faster Deployment**: Smaller codebase = quicker deployments

## Microservices Design Patterns

### Service Discovery Pattern

```javascript
// Service Registry
class ServiceRegistry {
  constructor() {
    this.services = new Map();
    this.healthChecks = new Map();
    this.loadBalancers = new Map();
  }

  register(serviceName, instance) {
    if (!this.services.has(serviceName)) {
      this.services.set(serviceName, new Map());
    }

    const serviceInstances = this.services.get(serviceName);
    serviceInstances.set(instance.id, {
      ...instance,
      registeredAt: new Date(),
      lastHealthCheck: new Date(),
      healthStatus: "healthy",
    });

    console.log(`Service registered: ${serviceName} - ${instance.url}`);

    // Start health checking
    this.startHealthCheck(serviceName, instance.id);

    // Initialize load balancer for service
    this.initializeLoadBalancer(serviceName);
  }

  unregister(serviceName, instanceId) {
    const serviceInstances = this.services.get(serviceName);
    if (serviceInstances) {
      serviceInstances.delete(instanceId);
      console.log(`Service unregistered: ${serviceName} - ${instanceId}`);
    }
  }

  discover(serviceName, strategy = "round-robin") {
    const serviceInstances = this.services.get(serviceName);
    if (!serviceInstances || serviceInstances.size === 0) {
      throw new Error(`No healthy instances found for service: ${serviceName}`);
    }

    // Get only healthy instances
    const healthyInstances = Array.from(serviceInstances.values()).filter(
      (instance) => instance.healthStatus === "healthy"
    );

    if (healthyInstances.length === 0) {
      throw new Error(`No healthy instances found for service: ${serviceName}`);
    }

    // Load balance
    const loadBalancer = this.loadBalancers.get(serviceName);
    return loadBalancer
      ? loadBalancer.getNextInstance(healthyInstances)
      : healthyInstances[0];
  }

  initializeLoadBalancer(serviceName) {
    if (!this.loadBalancers.has(serviceName)) {
      this.loadBalancers.set(serviceName, new LoadBalancer("round-robin"));
    }
  }

  async startHealthCheck(serviceName, instanceId) {
    const checkInterval = setInterval(async () => {
      try {
        const serviceInstances = this.services.get(serviceName);
        const instance = serviceInstances.get(instanceId);

        if (!instance) {
          clearInterval(checkInterval);
          return;
        }

        // Perform health check
        const response = await fetch(`${instance.url}/health`, {
          method: "GET",
          timeout: 5000,
        });

        if (response.ok) {
          instance.healthStatus = "healthy";
          instance.lastHealthCheck = new Date();
        } else {
          instance.healthStatus = "unhealthy";
          console.warn(`Health check failed for ${serviceName}:${instanceId}`);
        }
      } catch (error) {
        const serviceInstances = this.services.get(serviceName);
        const instance = serviceInstances.get(instanceId);
        if (instance) {
          instance.healthStatus = "unhealthy";
          console.error(
            `Health check error for ${serviceName}:${instanceId}:`,
            error.message
          );
        }
      }
    }, 10000); // Check every 10 seconds

    this.healthChecks.set(`${serviceName}:${instanceId}`, checkInterval);
  }
}

// Load Balancer Implementation
class LoadBalancer {
  constructor(strategy = "round-robin") {
    this.strategy = strategy;
    this.currentIndex = 0;
    this.requestCounts = new Map();
  }

  getNextInstance(instances) {
    switch (this.strategy) {
      case "round-robin":
        return this.roundRobin(instances);
      case "least-connections":
        return this.leastConnections(instances);
      case "random":
        return this.random(instances);
      case "weighted":
        return this.weighted(instances);
      default:
        return this.roundRobin(instances);
    }
  }

  roundRobin(instances) {
    const instance = instances[this.currentIndex % instances.length];
    this.currentIndex++;
    return instance;
  }

  leastConnections(instances) {
    return instances.reduce((min, current) => {
      const currentConnections = this.requestCounts.get(current.id) || 0;
      const minConnections = this.requestCounts.get(min.id) || 0;
      return currentConnections < minConnections ? current : min;
    });
  }

  random(instances) {
    return instances[Math.floor(Math.random() * instances.length)];
  }

  weighted(instances) {
    // Implement weighted selection based on instance capacity
    const totalWeight = instances.reduce(
      (sum, instance) => sum + (instance.weight || 1),
      0
    );
    let random = Math.random() * totalWeight;

    for (const instance of instances) {
      random -= instance.weight || 1;
      if (random <= 0) {
        return instance;
      }
    }

    return instances[0];
  }

  incrementConnections(instanceId) {
    const current = this.requestCounts.get(instanceId) || 0;
    this.requestCounts.set(instanceId, current + 1);
  }

  decrementConnections(instanceId) {
    const current = this.requestCounts.get(instanceId) || 0;
    this.requestCounts.set(instanceId, Math.max(0, current - 1));
  }
}
```

### API Gateway Pattern

```javascript
import express from "express";
import http from "http";
import { CircuitBreaker } from "./circuit-breaker";

class APIGateway {
  constructor() {
    this.app = express();
    this.serviceRegistry = new ServiceRegistry();
    this.circuitBreakers = new Map();
    this.rateLimiters = new Map();
    this.requestLogger = new RequestLogger();

    this.setupMiddleware();
    this.setupRoutes();
  }

  setupMiddleware() {
    // Request logging
    this.app.use(this.requestLogger.middleware());

    // Rate limiting
    this.app.use(this.rateLimitMiddleware());

    // Request/response transformation
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // CORS handling
    this.app.use(this.corsMiddleware());
  }

  setupRoutes() {
    // Service registration endpoint
    this.app.post("/admin/register-service", async (req, res) => {
      try {
        const { serviceName, instance } = req.body;
        this.serviceRegistry.register(serviceName, instance);
        res.json({ success: true, message: "Service registered" });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Dynamic service routing
    this.app.use("/api/:service/*", async (req, res, next) => {
      try {
        const serviceName = req.params.service;
        const path = req.params[0]; // Rest of the path

        // Discover service instance
        const instance = this.serviceRegistry.discover(serviceName);

        // Get or create circuit breaker
        const circuitBreaker = this.getCircuitBreaker(serviceName);

        // Forward request
        const response = await circuitBreaker.execute(async () => {
          return this.forwardRequest(instance, req, path);
        });

        // Forward response
        res.status(response.status);
        response.headers.forEach((value, key) => {
          res.set(key, value);
        });
        res.send(response.data);
      } catch (error) {
        next(error);
      }
    });

    // Health check endpoint
    this.app.get("/health", (req, res) => {
      const services = {};

      this.serviceRegistry.services.forEach((instances, serviceName) => {
        services[serviceName] = {
          instances: instances.size,
          healthy: Array.from(instances.values()).filter(
            (i) => i.healthStatus === "healthy"
          ).length,
        };
      });

      res.json({
        status: "healthy",
        timestamp: new Date().toISOString(),
        services,
      });
    });
  }

  async forwardRequest(instance, req, path) {
    const url = `${instance.url}/${path}`;
    const method = req.method.toLowerCase();

    const options = {
      method,
      headers: { ...req.headers },
      body:
        method !== "get" && method !== "head"
          ? JSON.stringify(req.body)
          : undefined,
    };

    // Remove host header to avoid conflicts
    delete options.headers.host;

    const response = await fetch(url, options);
    const data = await response.json().catch(() => response.text());

    return {
      status: response.status,
      headers: response.headers,
      data,
    };
  }

  getCircuitBreaker(serviceName) {
    if (!this.circuitBreakers.has(serviceName)) {
      this.circuitBreakers.set(
        serviceName,
        new CircuitBreaker({
          failureThreshold: 5,
          resetTimeout: 60000,
          monitoringPeriod: 10000,
        })
      );
    }
    return this.circuitBreakers.get(serviceName);
  }

  rateLimitMiddleware() {
    return (req, res, next) => {
      const key = req.ip + ":" + req.path;
      const limiter = this.getRateLimiter(key);

      if (!limiter.allowRequest()) {
        return res.status(429).json({
          error: "Rate limit exceeded",
          retryAfter: limiter.getRetryAfter(),
        });
      }

      next();
    };
  }

  getRateLimiter(key) {
    if (!this.rateLimiters.has(key)) {
      this.rateLimiters.set(
        key,
        new RateLimiter({
          windowMs: 60000, // 1 minute
          maxRequests: 100,
        })
      );
    }
    return this.rateLimiters.get(key);
  }

  corsMiddleware() {
    return (req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      );
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );

      if (req.method === "OPTIONS") {
        res.sendStatus(200);
      } else {
        next();
      }
    };
  }

  start(port = 3000) {
    this.server = this.app.listen(port, () => {
      console.log(`API Gateway running on port ${port}`);
    });
  }
}

// Circuit Breaker Implementation
class CircuitBreaker {
  constructor(options = {}) {
    this.failureThreshold = options.failureThreshold || 5;
    this.resetTimeout = options.resetTimeout || 60000;
    this.monitoringPeriod = options.monitoringPeriod || 10000;

    this.state = "CLOSED"; // CLOSED, OPEN, HALF_OPEN
    this.failureCount = 0;
    this.lastFailureTime = null;
    this.successCount = 0;

    this.startMonitoring();
  }

  async execute(operation) {
    if (this.state === "OPEN") {
      if (this.shouldAttemptReset()) {
        this.state = "HALF_OPEN";
        this.successCount = 0;
      } else {
        throw new Error("Circuit breaker is OPEN");
      }
    }

    try {
      const result = await operation();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  onSuccess() {
    this.failureCount = 0;

    if (this.state === "HALF_OPEN") {
      this.successCount++;
      if (this.successCount >= 3) {
        // Require 3 successes to close
        this.state = "CLOSED";
        console.log("Circuit breaker CLOSED");
      }
    }
  }

  onFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();

    if (this.failureCount >= this.failureThreshold) {
      this.state = "OPEN";
      console.log("Circuit breaker OPENED");
    }
  }

  shouldAttemptReset() {
    return Date.now() - this.lastFailureTime >= this.resetTimeout;
  }

  startMonitoring() {
    setInterval(() => {
      // Reset failure count over time
      if (this.state === "CLOSED" && this.failureCount > 0) {
        this.failureCount = Math.max(0, this.failureCount - 1);
      }
    }, this.monitoringPeriod);
  }
}
```

## Inter-Service Communication

### Message Queue Implementation

```javascript
import EventEmitter from "events";

class MessageQueue extends EventEmitter {
  constructor() {
    super();
    this.queues = new Map();
    this.consumers = new Map();
    this.dlq = new Map(); // Dead letter queue
  }

  // Create queue
  createQueue(name, options = {}) {
    const queue = {
      name,
      messages: [],
      maxSize: options.maxSize || 1000,
      retryAttempts: options.retryAttempts || 3,
      retryDelay: options.retryDelay || 5000,
      ttl: options.ttl || 3600000, // 1 hour
      deadLetterQueue: options.deadLetterQueue,
    };

    this.queues.set(name, queue);
    console.log(`Queue created: ${name}`);
    return queue;
  }

  // Publish message
  async publish(queueName, message, options = {}) {
    const queue = this.queues.get(queueName);
    if (!queue) {
      throw new Error(`Queue not found: ${queueName}`);
    }

    const enrichedMessage = {
      id: this.generateMessageId(),
      payload: message,
      timestamp: Date.now(),
      attempts: 0,
      priority: options.priority || 0,
      delayUntil: options.delay ? Date.now() + options.delay : 0,
    };

    // Check queue size
    if (queue.messages.length >= queue.maxSize) {
      // Remove oldest message or reject
      const removed = queue.messages.shift();
      console.warn(`Queue full, removed message: ${removed.id}`);
    }

    // Insert message maintaining priority order
    this.insertMessageByPriority(queue, enrichedMessage);

    // Notify consumers
    this.notifyConsumers(queueName);

    console.log(`Message published to ${queueName}: ${enrichedMessage.id}`);
    return enrichedMessage.id;
  }

  insertMessageByPriority(queue, message) {
    // Insert message in priority order (higher priority first)
    let insertIndex = queue.messages.length;
    for (let i = 0; i < queue.messages.length; i++) {
      if (queue.messages[i].priority < message.priority) {
        insertIndex = i;
        break;
      }
    }
    queue.messages.splice(insertIndex, 0, message);
  }

  // Subscribe to queue
  subscribe(queueName, callback, options = {}) {
    if (!this.consumers.has(queueName)) {
      this.consumers.set(queueName, []);
    }

    const consumer = {
      id: this.generateConsumerId(),
      callback,
      options,
      isProcessing: false,
      processedCount: 0,
      errorCount: 0,
    };

    this.consumers.get(queueName).push(consumer);

    // Start consuming if auto-start
    if (options.autoStart !== false) {
      this.startConsumer(queueName, consumer);
    }

    console.log(`Consumer subscribed to ${queueName}: ${consumer.id}`);
    return consumer.id;
  }

  async startConsumer(queueName, consumer) {
    const queue = this.queues.get(queueName);
    if (!queue) return;

    while (true) {
      try {
        // Get next message
        const message = this.getNextMessage(queue);
        if (!message) {
          await this.sleep(100); // Wait for messages
          continue;
        }

        // Check delay
        if (message.delayUntil > Date.now()) {
          await this.sleep(message.delayUntil - Date.now());
          continue;
        }

        // Check TTL
        if (message.timestamp + queue.ttl < Date.now()) {
          console.warn(`Message expired: ${message.id}`);
          this.moveToDLQ(queueName, message, "expired");
          continue;
        }

        consumer.isProcessing = true;

        try {
          // Process message
          await consumer.callback(message.payload, message);

          // Success
          consumer.processedCount++;
          console.log(
            `Message processed: ${message.id} by consumer: ${consumer.id}`
          );
        } catch (error) {
          consumer.errorCount++;
          console.error(`Message processing failed: ${message.id}`, error);

          // Retry logic
          message.attempts++;
          if (message.attempts < queue.retryAttempts) {
            console.log(
              `Retrying message: ${message.id} (attempt ${message.attempts})`
            );
            message.delayUntil = Date.now() + queue.retryDelay;
            this.insertMessageByPriority(queue, message);
          } else {
            // Move to dead letter queue
            this.moveToDLQ(queueName, message, "max_attempts_reached");
          }
        } finally {
          consumer.isProcessing = false;
        }
      } catch (error) {
        console.error(`Consumer error: ${consumer.id}`, error);
        await this.sleep(1000); // Back off on error
      }
    }
  }

  getNextMessage(queue) {
    return queue.messages.length > 0 ? queue.messages.shift() : null;
  }

  moveToDLQ(queueName, message, reason) {
    if (!this.dlq.has(queueName)) {
      this.dlq.set(queueName, []);
    }

    const dlqMessage = {
      ...message,
      originalQueue: queueName,
      deadLetterReason: reason,
      deadLetterTimestamp: Date.now(),
    };

    this.dlq.get(queueName).push(dlqMessage);
    console.log(`Message moved to DLQ: ${message.id} - ${reason}`);
  }

  notifyConsumers(queueName) {
    const consumers = this.consumers.get(queueName);
    if (consumers) {
      consumers.forEach((consumer) => {
        if (!consumer.isProcessing) {
          // Wake up consumer (in real implementation, use proper async notification)
          this.emit("message_available", {
            queueName,
            consumerId: consumer.id,
          });
        }
      });
    }
  }

  // Utility methods
  generateMessageId() {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  generateConsumerId() {
    return `consumer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Get queue statistics
  getQueueStats(queueName) {
    const queue = this.queues.get(queueName);
    const consumers = this.consumers.get(queueName) || [];
    const dlqMessages = this.dlq.get(queueName) || [];

    return {
      name: queueName,
      queueSize: queue.messages.length,
      activeConsumers: consumers.filter((c) => c.isProcessing).length,
      totalConsumers: consumers.length,
      deadLetterQueueSize: dlqMessages.length,
      processedMessages: consumers.reduce(
        (sum, c) => sum + c.processedCount,
        0
      ),
      errorMessages: consumers.reduce((sum, c) => sum + c.errorCount, 0),
    };
  }
}
```

### Event-Driven Architecture

```javascript
// Event Bus Implementation
class EventBus {
  constructor() {
    this.handlers = new Map();
    this.middlewares = [];
    this.eventStore = new EventStore();
  }

  // Subscribe to events
  on(eventType, handler, options = {}) {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, []);
    }

    const wrappedHandler = {
      id: this.generateHandlerId(),
      handler,
      options,
      callCount: 0,
      errorCount: 0,
    };

    this.handlers.get(eventType).push(wrappedHandler);
    return wrappedHandler.id;
  }

  // Publish event
  async publish(event) {
    const enrichedEvent = {
      id: this.generateEventId(),
      type: event.type,
      data: event.data,
      timestamp: Date.now(),
      source: event.source || "unknown",
      correlationId: event.correlationId || this.generateCorrelationId(),
      causationId: event.causationId,
    };

    try {
      // Store event
      await this.eventStore.store(enrichedEvent);

      // Apply middlewares
      let processedEvent = enrichedEvent;
      for (const middleware of this.middlewares) {
        processedEvent = await middleware(processedEvent);
      }

      // Notify handlers
      await this.notifyHandlers(processedEvent);

      console.log(
        `Event published: ${processedEvent.type} - ${processedEvent.id}`
      );
      return processedEvent.id;
    } catch (error) {
      console.error(`Failed to publish event: ${event.type}`, error);
      throw error;
    }
  }

  async notifyHandlers(event) {
    const handlers = this.handlers.get(event.type) || [];
    const promises = handlers.map(async (wrappedHandler) => {
      try {
        await wrappedHandler.handler(event);
        wrappedHandler.callCount++;
      } catch (error) {
        wrappedHandler.errorCount++;
        console.error(`Event handler error: ${event.type}`, error);

        // Retry logic
        if (wrappedHandler.options.retryOnError !== false) {
          setTimeout(() => {
            this.notifyHandlers(event);
          }, 1000);
        }
      }
    });

    await Promise.allSettled(promises);
  }

  // Add middleware
  use(middleware) {
    this.middlewares.push(middleware);
  }

  // Event replay for debugging/testing
  async replayEvents(eventType, fromTimestamp) {
    const events = await this.eventStore.getEvents(eventType, fromTimestamp);

    for (const event of events) {
      await this.notifyHandlers(event);
    }
  }

  generateEventId() {
    return `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  generateHandlerId() {
    return `hdl_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  generateCorrelationId() {
    return `corr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Event Store Implementation
class EventStore {
  constructor() {
    this.events = [];
    this.snapshots = new Map();
  }

  async store(event) {
    this.events.push(event);

    // Create snapshot periodically
    if (this.events.length % 100 === 0) {
      await this.createSnapshot();
    }
  }

  async getEvents(eventType, fromTimestamp) {
    return this.events.filter(
      (event) => event.type === eventType && event.timestamp >= fromTimestamp
    );
  }

  async getEventsForAggregate(aggregateId, fromVersion = 0) {
    return this.events.filter(
      (event) =>
        event.data.aggregateId === aggregateId &&
        event.data.version > fromVersion
    );
  }

  async createSnapshot() {
    // Create snapshot of current state
    const snapshot = {
      timestamp: Date.now(),
      eventCount: this.events.length,
      events: [...this.events],
    };

    this.snapshots.set(snapshot.timestamp, snapshot);
    console.log(`Event snapshot created: ${snapshot.eventCount} events`);
  }
}

// Domain Events Example
class UserEvents {
  static USER_CREATED = "user.created";
  static USER_UPDATED = "user.updated";
  static USER_DELETED = "user.deleted";
  static USER_LOGIN = "user.login";
  static USER_LOGOUT = "user.logout";
}

// Event Sourcing Example
class UserAggregate {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.id = null;
    this.username = null;
    this.email = null;
    this.version = 0;
    this.uncommittedEvents = [];
  }

  static async create(userData, eventBus) {
    const user = new UserAggregate(eventBus);

    // Apply creation event
    const event = {
      type: UserEvents.USER_CREATED,
      data: {
        aggregateId: userData.id,
        ...userData,
        version: 1,
      },
    };

    await user.applyEvent(event);
    return user;
  }

  async applyEvent(event) {
    // Update state based on event
    switch (event.type) {
      case UserEvents.USER_CREATED:
        this.id = event.data.aggregateId;
        this.username = event.data.username;
        this.email = event.data.email;
        break;

      case UserEvents.USER_UPDATED:
        if (event.data.username) this.username = event.data.username;
        if (event.data.email) this.email = event.data.email;
        break;

      case UserEvents.USER_DELETED:
        this.deleted = true;
        break;
    }

    this.version = event.data.version;
    this.uncommittedEvents.push(event);
  }

  async update(updateData) {
    const event = {
      type: UserEvents.USER_UPDATED,
      data: {
        aggregateId: this.id,
        ...updateData,
        version: this.version + 1,
      },
    };

    await this.applyEvent(event);
  }

  async delete() {
    const event = {
      type: UserEvents.USER_DELETED,
      data: {
        aggregateId: this.id,
        version: this.version + 1,
      },
    };

    await this.applyEvent(event);
  }

  async commit() {
    // Publish uncommitted events
    for (const event of this.uncommittedEvents) {
      await this.eventBus.publish(event);
    }

    this.uncommittedEvents = [];
  }
}
```

## Service Mesh and Communication Patterns

### Service Communication Client

```javascript
class ServiceClient {
  constructor(serviceRegistry, options = {}) {
    this.serviceRegistry = serviceRegistry;
    this.timeout = options.timeout || 5000;
    this.retries = options.retries || 3;
    this.circuitBreaker = new CircuitBreaker();
  }

  async call(serviceName, endpoint, options = {}) {
    const requestOptions = {
      method: options.method || "GET",
      headers: options.headers || {},
      body: options.body ? JSON.stringify(options.body) : undefined,
      timeout: options.timeout || this.timeout,
    };

    let lastError;

    for (let attempt = 0; attempt <= this.retries; attempt++) {
      try {
        // Discover service instance
        const instance = this.serviceRegistry.discover(serviceName);
        const url = `${instance.url}${endpoint}`;

        // Make request with circuit breaker
        const response = await this.circuitBreaker.execute(async () => {
          return fetch(url, requestOptions);
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
      } catch (error) {
        lastError = error;

        if (attempt < this.retries) {
          // Exponential backoff
          const delay = Math.pow(2, attempt) * 1000;
          await this.sleep(delay);
        }
      }
    }

    throw lastError;
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Distributed Tracing
class DistributedTracing {
  constructor() {
    this.traces = new Map();
    this.spans = new Map();
  }

  createTrace(operationName) {
    const trace = {
      id: this.generateTraceId(),
      operationName,
      startTime: Date.now(),
      spans: [],
    };

    this.traces.set(trace.id, trace);
    return trace.id;
  }

  createSpan(traceId, operationName, parentSpanId = null) {
    const span = {
      id: this.generateSpanId(),
      traceId,
      parentSpanId,
      operationName,
      startTime: Date.now(),
      tags: {},
      logs: [],
    };

    this.spans.set(span.id, span);

    const trace = this.traces.get(traceId);
    if (trace) {
      trace.spans.push(span);
    }

    return span.id;
  }

  finishSpan(spanId, error = null) {
    const span = this.spans.get(spanId);
    if (span) {
      span.endTime = Date.now();
      span.duration = span.endTime - span.startTime;
      span.error = error;
    }
  }

  addTag(spanId, key, value) {
    const span = this.spans.get(spanId);
    if (span) {
      span.tags[key] = value;
    }
  }

  addLog(spanId, level, message) {
    const span = this.spans.get(spanId);
    if (span) {
      span.logs.push({
        timestamp: Date.now(),
        level,
        message,
      });
    }
  }

  generateTraceId() {
    return Math.random().toString(36).substr(2, 16);
  }

  generateSpanId() {
    return Math.random().toString(36).substr(2, 8);
  }
}
```

## Deployment and Orchestration

### Docker Configuration for Microservices

```dockerfile
# Dockerfile for Node.js Microservice
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Copy built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

USER nodejs

EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

CMD ["node", "dist/index.js"]
```

### Docker Compose for Microservices

```yaml
# docker-compose.yml
version: "3.8"

services:
  # API Gateway
  api-gateway:
    build: ./api-gateway
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - REDIS_URL=redis://redis:6379
    depends_on:
      - redis
      - user-service
      - order-service
    networks:
      - microservices

  # User Service
  user-service:
    build: ./user-service
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:password@postgres:5432/users
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis
    deploy:
      replicas: 3
    networks:
      - microservices

  # Order Service
  order-service:
    build: ./order-service
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://order:password@postgres:5432/orders
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis
    deploy:
      replicas: 2
    networks:
      - microservices

  # Message Queue
  message-queue:
    build: ./message-queue
    ports:
      - "5672:5672"
    networks:
      - microservices

  # Redis for caching
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - microservices

  # PostgreSQL
  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=admin
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=microservices
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - microservices

  # Monitoring
  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml
    networks:
      - microservices

  grafana:
    image: grafana/grafana
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana_data:/var/lib/grafana
    networks:
      - microservices

volumes:
  redis_data:
  postgres_data:
  grafana_data:

networks:
  microservices:
    driver: bridge
```

## Key Microservices Takeaways for FAANG

### Design Principles

- **Single Responsibility**: Each service does one thing well
- **Loose Coupling**: Services communicate through APIs/events
- **High Cohesion**: Related functionality grouped together
- **Failure Isolation**: One service failure doesn't cascade
- **Independent Deployment**: Services can be deployed independently

### Communication Patterns

- **Synchronous**: REST/GraphQL for request-response
- **Asynchronous**: Message queues for event-driven communication
- **Event Sourcing**: Capture all changes as events
- **CQRS**: Separate read and write models

### Operational Concerns

- **Service Discovery**: Dynamic service registration and discovery
- **Load Balancing**: Distribute load across service instances
- **Circuit Breaking**: Prevent cascading failures
- **Distributed Tracing**: Track requests across services
- **Monitoring**: Observe service health and performance

## External Microservices Resources

- **Microservices Patterns**: https://microservices.io/patterns/
- **Node.js Microservices**: https://nodejs.org/en/docs/guides/dont-block-the-event-loop/
- **Docker Best Practices**: https://docs.docker.com/develop/dev-best-practices/
- **Kubernetes Documentation**: https://kubernetes.io/docs/
- **Service Mesh (Istio)**: https://istio.io/docs/
