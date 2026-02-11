# FAANG Interview Preparation Guide - Node.js

## Interview Strategy Overview

### What FAANG Companies Look For

- **Problem-Solving Skills**: Ability to break down complex problems
- **System Design**: Understanding of scalable architectures
- **Code Quality**: Clean, maintainable, and efficient code
- **Communication**: Clear explanation of technical decisions
- **Cultural Fit**: Collaboration and continuous learning mindset

## Core Node.js Concepts (Must-Know)

### 1. Event Loop and Asynchronous Programming

```javascript
// Interview Question: Explain the event loop and demonstrate with code

// Event Loop Phases Demonstration
console.log("1. Start");

setTimeout(() => console.log("2. setTimeout (Timer)"), 0);

setImmediate(() => console.log("3. setImmediate (Check)"));

Promise.resolve().then(() => console.log("4. Promise (Microtask)"));

process.nextTick(() => console.log("5. nextTick (Microtask)"));

console.log("6. End");

// Output: 1, 6, 5, 4, 2, 3 (or 1, 6, 5, 4, 3, 2)

// Practical Example: Non-blocking I/O
import fs from "fs";

function processFiles(files) {
  return Promise.all(
    files.map(
      (file) =>
        new Promise((resolve, reject) => {
          fs.readFile(file, "utf8", (err, data) => {
            if (err) reject(err);
            else resolve(data);
          });
        })
    )
  );
}
```

### 2. Memory Management and Garbage Collection

```javascript
// Interview Question: How would you optimize memory usage in a Node.js application?

class MemoryOptimizedCache {
  constructor(maxSize = 1000) {
    this.cache = new Map();
    this.maxSize = maxSize;
    this.accessOrder = new Map(); // LRU tracking
  }

  get(key) {
    if (this.cache.has(key)) {
      // Update access order
      this.accessOrder.set(key, Date.now());
      return this.cache.get(key);
    }
    return null;
  }

  set(key, value) {
    if (this.cache.size >= this.maxSize) {
      // Remove least recently used item
      let oldestKey = null;
      let oldestTime = Date.now();

      for (const [k, time] of this.accessOrder) {
        if (time < oldestTime) {
          oldestTime = time;
          oldestKey = k;
        }
      }

      if (oldestKey) {
        this.cache.delete(oldestKey);
        this.accessOrder.delete(oldestKey);
      }
    }

    this.cache.set(key, value);
    this.accessOrder.set(key, Date.now());
  }

  // Memory leak detection
  getMemoryUsage() {
    const usage = process.memoryUsage();
    return {
      heapUsed: Math.round(usage.heapUsed / 1024 / 1024) + " MB",
      heapTotal: Math.round(usage.heapTotal / 1024 / 1024) + " MB",
      external: Math.round(usage.external / 1024 / 1024) + " MB",
      cacheSize: this.cache.size,
    };
  }
}
```

### 3. Streams and Backpressure

```javascript
// Interview Question: Implement a custom transform stream for data processing

import { Transform } from "stream";

class DataProcessor extends Transform {
  constructor(options = {}) {
    super({ objectMode: true });
    this.batchSize = options.batchSize || 100;
    this.buffer = [];
  }

  _transform(chunk, encoding, callback) {
    this.buffer.push(chunk);

    if (this.buffer.length >= this.batchSize) {
      this.processBatch();
    }

    callback();
  }

  _flush(callback) {
    if (this.buffer.length > 0) {
      this.processBatch();
    }
    callback();
  }

  processBatch() {
    // Process accumulated data
    const batch = this.buffer.splice(0, this.batchSize);
    const processed = batch.map((item) => this.transformItem(item));

    processed.forEach((item) => this.push(item));
  }

  transformItem(item) {
    // Custom transformation logic
    return {
      ...item,
      processed: true,
      timestamp: Date.now(),
    };
  }
}

// Usage with backpressure handling
async function processLargeFile(inputPath, outputPath) {
  const { createReadStream, createWriteStream } = await import("fs");

  const readStream = createReadStream(inputPath, { encoding: "utf8" });
  const writeStream = createWriteStream(outputPath);
  const processor = new DataProcessor({ batchSize: 50 });

  // Handle backpressure
  readStream.on("data", (chunk) => {
    const canWrite = processor.write(chunk);

    if (!canWrite) {
      readStream.pause();
      processor.once("drain", () => readStream.resume());
    }
  });

  processor.pipe(writeStream);

  return new Promise((resolve, reject) => {
    writeStream.on("finish", resolve);
    writeStream.on("error", reject);
    readStream.on("error", reject);
  });
}
```

## System Design Questions

### 1. Design a URL Shortener

```javascript
// Interview Question: Design a URL shortener service

class URLShortener {
  constructor() {
    this.urlMap = new Map();
    this.counter = 1000;
    this.base62 =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }

  // Generate short code
  generateShortCode() {
    this.counter++;
    return this.encodeBase62(this.counter);
  }

  encodeBase62(num) {
    if (num === 0) return "0";

    let result = "";
    while (num > 0) {
      result = this.base62[num % 62] + result;
      num = Math.floor(num / 62);
    }
    return result;
  }

  // Shorten URL
  async shortenURL(longURL) {
    // Validate URL
    if (!this.isValidURL(longURL)) {
      throw new Error("Invalid URL");
    }

    // Check if already exists
    for (const [shortCode, url] of this.urlMap) {
      if (url.longURL === longURL) {
        return { shortCode, longURL };
      }
    }

    // Generate new short code
    const shortCode = this.generateShortCode();

    this.urlMap.set(shortCode, {
      longURL,
      createdAt: new Date(),
      accessCount: 0,
    });

    return { shortCode, longURL };
  }

  // Expand URL
  async expandURL(shortCode) {
    const urlData = this.urlMap.get(shortCode);
    if (!urlData) {
      throw new Error("Short URL not found");
    }

    // Update access count
    urlData.accessCount++;

    return urlData.longURL;
  }

  isValidURL(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  // Analytics
  getAnalytics(shortCode) {
    const urlData = this.urlMap.get(shortCode);
    if (!urlData) {
      throw new Error("Short URL not found");
    }

    return {
      shortCode,
      longURL: urlData.longURL,
      createdAt: urlData.createdAt,
      accessCount: urlData.accessCount,
    };
  }
}

// REST API Implementation
import express from "express";

const app = express();
const shortener = new URLShortener();

app.use(express.json());

app.post("/shorten", async (req, res) => {
  try {
    const { longURL } = req.body;
    const result = await shortener.shortenURL(longURL);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/:shortCode", async (req, res) => {
  try {
    const { shortCode } = req.params;
    const longURL = await shortener.expandURL(shortCode);
    res.redirect(longURL);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

app.get("/analytics/:shortCode", async (req, res) => {
  try {
    const { shortCode } = req.params;
    const analytics = shortener.getAnalytics(shortCode);
    res.json(analytics);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});
```

### 2. Design a Rate Limiter

```javascript
// Interview Question: Implement a distributed rate limiter

class RateLimiter {
  constructor(redisClient, options = {}) {
    this.redis = redisClient;
    this.windowMs = options.windowMs || 60000; // 1 minute
    this.maxRequests = options.maxRequests || 100;
  }

  async isAllowed(key) {
    const now = Date.now();
    const window = Math.ceil(now / 1000); // 1-second windows

    const redisKey = `rate_limit:${key}:${window}`;

    // Use Redis pipeline for atomic operations
    const pipeline = this.redis.multi();

    // Increment counter
    pipeline.incr(redisKey);

    // Set expiration
    pipeline.expire(redisKey, Math.ceil(this.windowMs / 1000));

    const results = await pipeline.exec();
    const count = results[0][1];

    return {
      allowed: count <= this.maxRequests,
      count,
      remaining: Math.max(0, this.maxRequests - count),
      resetTime: (window + 1) * 1000,
    };
  }

  // Sliding window implementation
  async isAllowedSliding(key) {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    const redisKey = `sliding_rate_limit:${key}`;

    // Remove old entries
    await this.redis.zremrangebyscore(redisKey, 0, windowStart);

    // Count current requests
    const count = await this.redis.zcard(redisKey);

    if (count >= this.maxRequests) {
      return {
        allowed: false,
        count,
        remaining: 0,
        resetTime: now + this.windowMs,
      };
    }

    // Add current request
    await this.redis.zadd(redisKey, now, `${now}-${Math.random()}`);
    await this.redis.expire(redisKey, Math.ceil(this.windowMs / 1000));

    return {
      allowed: true,
      count: count + 1,
      remaining: this.maxRequests - count - 1,
      resetTime: now + this.windowMs,
    };
  }
}

// Express middleware
function rateLimitMiddleware(limiter, keyGenerator) {
  return async (req, res, next) => {
    const key = keyGenerator(req);
    const result = await limiter.isAllowedSliding(key);

    // Set rate limit headers
    res.set({
      "X-RateLimit-Limit": limiter.maxRequests,
      "X-RateLimit-Remaining": result.remaining,
      "X-RateLimit-Reset": new Date(result.resetTime).toISOString(),
    });

    if (!result.allowed) {
      return res.status(429).json({
        error: "Too many requests",
        retryAfter: Math.ceil((result.resetTime - Date.now()) / 1000),
      });
    }

    next();
  };
}

// Usage
const limiter = new RateLimiter(redisClient, {
  windowMs: 60000,
  maxRequests: 100,
});

app.use(
  "/api/",
  rateLimitMiddleware(limiter, (req) => req.ip)
);
```

## Advanced Algorithm Questions

### 1. Implement a LRU Cache

```javascript
// Interview Question: Implement LRU Cache with O(1) operations

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) {
      return -1;
    }

    // Move to end (most recently used)
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);

    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      // Update existing
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // Remove least recently used (first item)
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    this.cache.set(key, value);
  }
}

// Alternative implementation with Doubly Linked List
class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LRUCacheAdvanced {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
    this.head = new Node(0, 0); // Dummy head
    this.tail = new Node(0, 0); // Dummy tail
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get(key) {
    if (!this.cache.has(key)) {
      return -1;
    }

    const node = this.cache.get(key);
    this.moveToHead(node);
    return node.value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      const node = this.cache.get(key);
      node.value = value;
      this.moveToHead(node);
    } else {
      const newNode = new Node(key, value);

      if (this.cache.size >= this.capacity) {
        const tail = this.removeTail();
        this.cache.delete(tail.key);
      }

      this.cache.set(key, newNode);
      this.addToHead(newNode);
    }
  }

  addToHead(node) {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
  }

  removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  moveToHead(node) {
    this.removeNode(node);
    this.addToHead(node);
  }

  removeTail() {
    const lastNode = this.tail.prev;
    this.removeNode(lastNode);
    return lastNode;
  }
}
```

### 2. Implement a Pub/Sub System

```javascript
// Interview Question: Implement a publish-subscribe system

class PubSubSystem {
  constructor() {
    this.subscriptions = new Map(); // topic -> Set of subscribers
    this.messageQueue = []; // For message persistence
    this.subscribers = new Map(); // subscriberId -> subscriber info
  }

  // Subscribe to a topic
  subscribe(topic, callback, options = {}) {
    const subscriberId = this.generateSubscriberId();

    if (!this.subscriptions.has(topic)) {
      this.subscriptions.set(topic, new Set());
    }

    const subscriber = {
      id: subscriberId,
      callback,
      options,
      messageCount: 0,
      createdAt: Date.now(),
    };

    this.subscriptions.get(topic).add(subscriber);
    this.subscribers.set(subscriberId, subscriber);

    // Send retained messages if requested
    if (options.receiveRetained) {
      this.sendRetainedMessages(topic, subscriber);
    }

    return subscriberId;
  }

  // Unsubscribe from a topic
  unsubscribe(subscriberId) {
    const subscriber = this.subscribers.get(subscriberId);
    if (!subscriber) return false;

    // Remove from all topics
    for (const [topic, subscribers] of this.subscriptions) {
      if (subscribers.has(subscriber)) {
        subscribers.delete(subscriber);
      }
    }

    this.subscribers.delete(subscriberId);
    return true;
  }

  // Publish message to topic
  async publish(topic, message, options = {}) {
    const subscribers = this.subscriptions.get(topic);
    if (!subscribers || subscribers.size === 0) {
      return 0;
    }

    const enrichedMessage = {
      id: this.generateMessageId(),
      topic,
      payload: message,
      timestamp: Date.now(),
      retained: options.retained || false,
      qos: options.qos || 0,
    };

    // Store retained message
    if (options.retained) {
      this.storeRetainedMessage(topic, enrichedMessage);
    }

    // Deliver to subscribers
    const deliveryPromises = [];

    for (const subscriber of subscribers) {
      if (this.shouldDeliver(subscriber, enrichedMessage)) {
        deliveryPromises.push(this.deliverMessage(subscriber, enrichedMessage));
      }
    }

    // Wait for all deliveries (for QoS > 0)
    if (options.qos > 0) {
      await Promise.allSettled(deliveryPromises);
    }

    return subscribers.size;
  }

  // Deliver message to subscriber
  async deliverMessage(subscriber, message) {
    try {
      await subscriber.callback(message);
      subscriber.messageCount++;
    } catch (error) {
      console.error(`Delivery failed for subscriber ${subscriber.id}:`, error);

      // Handle QoS and retry logic
      if (message.qos > 0) {
        // Retry logic for QoS 1/2
        return this.retryDelivery(subscriber, message);
      }
    }
  }

  // Pattern-based subscription (wildcards)
  subscribePattern(pattern, callback, options = {}) {
    const subscriberId = this.generateSubscriberId();

    const subscriber = {
      id: subscriberId,
      callback,
      pattern,
      options,
      messageCount: 0,
      createdAt: Date.now(),
    };

    this.subscribers.set(subscriberId, subscriber);

    return subscriberId;
  }

  // Pattern matching for topics
  matchPattern(pattern, topic) {
    const patternParts = pattern.split("/");
    const topicParts = topic.split("/");

    if (patternParts.length !== topicParts.length) {
      return false;
    }

    for (let i = 0; i < patternParts.length; i++) {
      const patternPart = patternParts[i];
      const topicPart = topicParts[i];

      if (patternPart === "#") {
        return true; // Multi-level wildcard
      }

      if (patternPart !== "+" && patternPart !== topicPart) {
        return false;
      }
    }

    return true;
  }

  // Utility methods
  generateSubscriberId() {
    return `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  generateMessageId() {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  shouldDeliver(subscriber, message) {
    // Check if subscriber wants to receive this message
    if (
      subscriber.options.maxMessages &&
      subscriber.messageCount >= subscriber.options.maxMessages
    ) {
      return false;
    }

    return true;
  }

  storeRetainedMessage(topic, message) {
    // Store retained messages in a separate map
    if (!this.retainedMessages) {
      this.retainedMessages = new Map();
    }
    this.retainedMessages.set(topic, message);
  }

  sendRetainedMessages(topic, subscriber) {
    if (!this.retainedMessages) return;

    for (const [retainedTopic, message] of this.retainedMessages) {
      if (this.matchPattern(topic, retainedTopic)) {
        this.deliverMessage(subscriber, message);
      }
    }
  }
}
```

## Behavioral Questions

### Common FAANG Behavioral Questions

#### 1. "Tell me about a challenging technical problem you solved"

**Structure your answer using STAR method:**

**Situation**: "We were experiencing frequent database timeouts during peak traffic hours, affecting user experience and causing lost revenue."

**Task**: "I was tasked with identifying the root cause and implementing a solution to improve database performance and reliability."

**Action**:

- "I implemented comprehensive monitoring using Prometheus to track query performance and connection pool metrics"
- "I identified that certain queries were causing connection pool exhaustion due to inefficient query patterns"
- "I implemented query optimization, added proper indexing, and introduced a Redis caching layer for frequently accessed data"
- "I also implemented circuit breakers and retry logic to handle temporary database issues gracefully"

**Result**: "Database timeouts were reduced by 95%, average response time improved from 2 seconds to 200ms, and the system could handle 3x more concurrent users without performance degradation."

#### 2. "How do you approach system design?"

**Key points to cover:**

- Requirements gathering and constraints analysis
- Component identification and service decomposition
- Data flow and API design
- Scalability and reliability considerations
- Technology selection rationale
- Monitoring and operational concerns

#### 3. "How do you ensure code quality in your team?"

**Best practices to mention:**

- Code reviews with clear guidelines
- Automated testing (unit, integration, E2E)
- Static code analysis and linting
- CI/CD pipelines with quality gates
- Pair programming and knowledge sharing
- Documentation and architectural decision records

## Mock Interview Scenarios

### Scenario 1: Design a Real-time Chat System

```javascript
// Key components to discuss:
// 1. WebSocket connections management
// 2. Message routing and delivery
// 3. Presence management
// 4. Message persistence
// 5. Scalability considerations

class ChatServer {
  constructor() {
    this.rooms = new Map(); // roomId -> Set of connections
    this.users = new Map(); // userId -> user info
    this.messageStore = new MessageStore();
  }

  handleConnection(ws, userId) {
    // Register user
    this.users.set(userId, {
      id: userId,
      ws,
      joinedRooms: new Set(),
      lastSeen: Date.now(),
    });

    // Handle incoming messages
    ws.on("message", async (data) => {
      const message = JSON.parse(data);
      await this.handleMessage(userId, message);
    });

    // Handle disconnection
    ws.on("close", () => {
      this.handleDisconnection(userId);
    });
  }

  async handleMessage(userId, message) {
    switch (message.type) {
      case "join_room":
        await this.joinRoom(userId, message.roomId);
        break;
      case "leave_room":
        await this.leaveRoom(userId, message.roomId);
        break;
      case "send_message":
        await this.sendMessage(userId, message);
        break;
      case "typing":
        await this.broadcastTyping(userId, message);
        break;
    }
  }

  async sendMessage(userId, message) {
    const user = this.users.get(userId);
    if (!user) return;

    const enrichedMessage = {
      id: this.generateMessageId(),
      userId,
      roomId: message.roomId,
      content: message.content,
      timestamp: Date.now(),
      type: message.type || "text",
    };

    // Store message
    await this.messageStore.store(enrichedMessage);

    // Broadcast to room members
    const room = this.rooms.get(message.roomId);
    if (room) {
      const payload = JSON.stringify(enrichedMessage);

      for (const member of room) {
        if (member.ws.readyState === 1) {
          // WebSocket.OPEN
          member.ws.send(payload);
        }
      }
    }
  }
}
```

### Scenario 2: Implement a Distributed Task Queue

```javascript
// Discuss: Worker threads, message queues, load balancing, fault tolerance

class DistributedTaskQueue {
  constructor(redisClient) {
    this.redis = redisClient;
    this.workers = new Map();
    this.taskHandlers = new Map();
  }

  // Register task handler
  registerHandler(taskType, handler) {
    this.taskHandlers.set(taskType, handler);
  }

  // Add worker
  addWorker(workerId, concurrency = 1) {
    const worker = {
      id: workerId,
      concurrency,
      running: 0,
      processing: new Set(),
    };

    this.workers.set(workerId, worker);

    // Start processing tasks
    for (let i = 0; i < concurrency; i++) {
      this.startWorkerLoop(workerId);
    }
  }

  // Enqueue task
  async enqueue(taskType, payload, options = {}) {
    const task = {
      id: this.generateTaskId(),
      type: taskType,
      payload,
      attempts: 0,
      maxAttempts: options.maxAttempts || 3,
      delay: options.delay || 0,
      priority: options.priority || 0,
      createdAt: Date.now(),
      scheduledAt: Date.now() + (options.delay || 0),
    };

    const queueKey = this.getQueueKey(taskType);
    await this.redis.zadd(queueKey, task.scheduledAt, JSON.stringify(task));

    return task.id;
  }

  // Worker processing loop
  async startWorkerLoop(workerId) {
    const worker = this.workers.get(workerId);

    while (true) {
      try {
        // Get next task
        const task = await this.getNextTask();

        if (task) {
          worker.running++;
          worker.processing.add(task.id);

          try {
            // Process task
            const handler = this.taskHandlers.get(task.type);
            if (!handler) {
              throw new Error(`No handler for task type: ${task.type}`);
            }

            await handler(task.payload);

            // Mark as completed
            await this.markTaskCompleted(task);
          } catch (error) {
            // Handle task failure
            await this.handleTaskFailure(task, error);
          } finally {
            worker.running--;
            worker.processing.delete(task.id);
          }
        } else {
          // No tasks available, wait
          await this.sleep(1000);
        }
      } catch (error) {
        console.error(`Worker ${workerId} error:`, error);
        await this.sleep(5000); // Back off on error
      }
    }
  }

  async getNextTask() {
    const now = Date.now();

    // Get all queue keys
    const queueKeys = Array.from(this.taskHandlers.keys()).map((type) =>
      this.getQueueKey(type)
    );

    if (queueKeys.length === 0) return null;

    // Get earliest task across all queues
    const result = await this.redis
      .multi()
      .zunionstore("temp_queue", queueKeys.length, ...queueKeys)
      .zrangebyscore("temp_queue", 0, now, "LIMIT", 0, 1)
      .zremrangebyrank("temp_queue", 0, 0)
      .del("temp_queue")
      .exec();

    if (result[1][1].length > 0) {
      return JSON.parse(result[1][1][0]);
    }

    return null;
  }
}
```

## Preparation Checklist

### Technical Skills

- [ ] **Node.js Fundamentals**: Event loop, streams, buffers, modules
- [ ] **Asynchronous Programming**: Promises, async/await, error handling
- [ ] **Memory Management**: Garbage collection, memory leaks, optimization
- [ ] **WebSockets**: Real-time communication implementation
- [ ] **Security**: Authentication, authorization, common vulnerabilities
- [ ] **Performance**: Profiling, optimization, caching strategies
- [ ] **Testing**: Unit, integration, E2E testing approaches
- [ ] **Database**: SQL and NoSQL, connection pooling, transactions
- [ ] **System Design**: Scalability patterns, microservices, load balancing

### Problem-Solving Practice

- [ ] **Data Structures**: Arrays, objects, maps, sets, linked lists, trees
- [ ] **Algorithms**: Sorting, searching, graph algorithms, dynamic programming
- [ ] **System Design**: URL shortener, rate limiter, chat system, task queue
- [ ] **Concurrency**: Race conditions, deadlocks, synchronization
- [ ] **Network Protocols**: HTTP, TCP, WebSockets, message queues

### Soft Skills

- [ ] **Communication**: Clear technical explanations
- [ ] **Problem Decomposition**: Break down complex problems
- [ ] **Trade-off Analysis**: Technical decision justification
- [ ] **Collaboration**: Team experience and conflict resolution
- [ ] **Learning**: Continuous improvement and adaptation

## Day Before Interview

### Final Preparation

1. **Review Key Concepts**: Focus on event loop, streams, and async patterns
2. **Practice Coding**: Complete 2-3 medium difficulty problems
3. **System Design**: Practice explaining a system you've built
4. **Behavioral Stories**: Prepare 3-5 STAR method examples
5. **Rest**: Get good sleep and stay hydrated

### Interview Day Tips

- Arrive 10 minutes early for virtual interviews
- Have a notebook and pen ready
- Test your technical setup (camera, microphone, internet)
- Think aloud during problem-solving
- Ask clarifying questions
- Be honest about what you don't know

## Additional Resources

### Practice Platforms

- **LeetCode**: Focus on medium difficulty problems
- **HackerRank**: System design and coding challenges
- **Pramp**: Mock interviews with peers
- **Interviewing.io**: Anonymous technical interviews

### Learning Resources

- **Node.js Documentation**: https://nodejs.org/docs/
- **System Design Primer**: https://github.com/donnemartin/system-design-primer
- **Exponent**: Practice system design interviews
- **FAANG Interview Courses**: Specialized interview preparation

### Community

- **Reddit**: r/cscareerquestions, r/learnprogramming
- **Discord**: Programming interview communities
- **Meetup**: Local tech meetups and study groups
- **LinkedIn**: Connect with FAANG engineers

Remember: FAANG interviews are not just about getting the right answer, but demonstrating your thought process, problem-solving approach, and ability to communicate effectively. Good luck!
