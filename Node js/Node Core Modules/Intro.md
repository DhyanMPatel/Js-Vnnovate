# Node Core Modules

## HTTP Module

- Node.js includes a powerful `built-in HTTP module` that enables to **create HTTP servers** and **make HTTP requests**.

- **Purpose**: Create HTTP servers and handle requests and responses comes from clients.
- **Key Methods**:

  - `http.createServer((req, res) => {...})`: Creates a server.
  - `req`: Request object (URL, method, headers).
  - `res`: Response object (set headers, send data).

- **Syntax** :

  - You can explicitly use function call or anonymous function or Arrow function.

  ```js
  import http from "http";
  const server = http.createServer(requestListener);

  server.listen(port, callback);
  ```

  - The `requestListener` is a function which receive `request` and `response` objects. request and response objects are `built-in` provided by Node.js.

- **Example**:

  ```js
  import http from "http";

  const explicitFunction = (req, res) => {
    res.writeHeader(200, { "Content-Type": "text/plain" });
    res.end("Hello, Node.js!");
  };

  const explicitServer = http.createServer(explicitFunction); // Explicit function call

  const anonymousServer = http.createServer(function (req, res) {
    // Anonymous function
    res.writeHeader(200, { "Content-Type": "text/plain" });
    res.end("Hello, Node.js!");
  });

  const arrowServer = http.createServer((req, res) => {
    // Arrow function
    res.writeHeader(200, { "Content-Type": "text/plain" });
    res.end("Hello, Node.js!");
  });

  explicitServer.listen(3001, () =>
    console.log("Server on http://localhost:3001")
  );
  anonymousServer.listen(3002, () =>
    console.log("Server on http://localhost:3002")
  );
  arrowServer.listen(3000, () =>
    console.log("Server on http://localhost:3000")
  );
  ```

- **Use Case**: Build REST APIs or serve static content.

### Request and Response Object

- **Request Object**:

  - `req.url`: URL of the request.
  - `req.method`: HTTP method (GET, POST, etc).
  - `req.headers`: Request headers.
  - `req.query`: Query parameters (e.g., `?name=John`).
  - `req.body`: Request body (for POST/PUT requests).
  - `req.on("data", (chunk) => {...})`: Listen for data events. parameters are `event name` and `callback function`.

- **Response Object**:
  - `res.writeHead`: Set response headers (but less flexible). parameters are `status code` and `headers`.
  - `res.setHeader`: Set response headers (more flexible). parameters are `header name` and `header value`.
  - `res.write`: Send data to the client.
  - `res.end`: End the response.
  - `res.statusCode`: Set HTTP status code.

## Advanced HTTP Patterns for FAANG

### Why Advanced HTTP Knowledge Matters

- **Performance**: Optimize for high-concurrency scenarios
- **Security**: Implement secure HTTP handling
- **Scalability**: Design for production workloads
- **Reliability**: Handle edge cases and errors gracefully
- **Standards**: Follow HTTP best practices

### Advanced HTTP Server Implementation

#### 1. HTTP/2 Support

```javascript
import http2 from "http2";
import fs from "fs";

// HTTP/2 server with SSL
const server = http2.createSecureServer(
  {
    key: fs.readFileSync("server-key.pem"),
    cert: fs.readFileSync("server-cert.pem"),
  },
  (req, res) => {
    const stream = req.stream;

    if (req.url === "/") {
      // Server push for CSS and JS
      stream.pushStream({ ":path": "/styles.css" }, (pushStream) => {
        pushStream.respond({ "content-type": "text/css" });
        pushStream.end("body { background: #f0f0f0; }");
      });

      res.writeHead(200, { "content-type": "text/html" });
      res.end(
        '<html><head><link rel="stylesheet" href="/styles.css"></head><body>Hello HTTP/2!</body></html>'
      );
    } else {
      res.writeHead(404);
      res.end("Not Found");
    }
  }
);

server.listen(8443, () => {
  console.log("HTTP/2 server running on https://localhost:8443");
});
```

#### 2. Connection Pooling and Keep-Alive

```javascript
import http from "http";

// HTTP client with connection pooling
class HTTPClient {
  constructor(options = {}) {
    this.maxSockets = options.maxSockets || 10;
    this.keepAlive = options.keepAlive !== false;
    this.timeout = options.timeout || 30000;

    // Configure agent for connection pooling
    this.agent = new http.Agent({
      keepAlive: this.keepAlive,
      maxSockets: this.maxSockets,
      timeout: this.timeout,
    });
  }

  async request(options) {
    return new Promise((resolve, reject) => {
      const req = http.request(
        {
          ...options,
          agent: this.agent,
        },
        (res) => {
          let data = "";

          res.on("data", (chunk) => {
            data += chunk;
          });

          res.on("end", () => {
            resolve({
              statusCode: res.statusCode,
              headers: res.headers,
              data: data,
            });
          });
        }
      );

      req.on("error", reject);
      req.setTimeout(this.timeout, () => {
        req.destroy();
        reject(new Error("Request timeout"));
      });

      if (options.body) {
        req.write(options.body);
      }

      req.end();
    });
  }

  // Close all connections
  close() {
    this.agent.destroy();
  }
}

// Usage
const client = new HTTPClient({
  maxSockets: 20,
  keepAlive: true,
  timeout: 15000,
});

// Make multiple requests efficiently
async function makeRequests() {
  const requests = [];

  for (let i = 0; i < 100; i++) {
    requests.push(
      client.request({
        hostname: "api.example.com",
        path: "/data",
        method: "GET",
      })
    );
  }

  try {
    const responses = await Promise.all(requests);
    console.log(`Completed ${responses.length} requests`);
  } catch (error) {
    console.error("Request failed:", error);
  } finally {
    client.close();
  }
}
```

#### 3. Advanced Request/Response Handling

```javascript
import http from "http";
import { URL } from "url";

// Advanced HTTP server with middleware support
class AdvancedHTTPServer {
  constructor(options = {}) {
    this.middlewares = [];
    this.routes = new Map();
    this.errorHandlers = [];
    this.options = options;
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  get(path, handler) {
    this.addRoute("GET", path, handler);
  }

  post(path, handler) {
    this.addRoute("POST", path, handler);
  }

  put(path, handler) {
    this.addRoute("PUT", path, handler);
  }

  delete(path, handler) {
    this.addRoute("DELETE", path, handler);
  }

  addRoute(method, path, handler) {
    const key = `${method}:${path}`;
    this.routes.set(key, handler);
  }

  onError(handler) {
    this.errorHandlers.push(handler);
  }

  async handleRequest(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const method = req.method;
    const pathname = url.pathname;

    // Create enhanced request/response objects
    const enhancedReq = {
      ...req,
      url,
      pathname,
      query: Object.fromEntries(url.searchParams),
      params: {},
      body: null,
    };

    const enhancedRes = {
      ...res,
      json: (data, statusCode = 200) => {
        res.writeHead(statusCode, { "Content-Type": "application/json" });
        res.end(JSON.stringify(data));
      },
      status: (code) => {
        res.statusCode = code;
        return enhancedRes;
      },
      set: (name, value) => {
        res.setHeader(name, value);
        return enhancedRes;
      },
    };

    try {
      // Parse request body for POST/PUT requests
      if (method === "POST" || method === "PUT") {
        enhancedReq.body = await this.parseRequestBody(req);
      }

      // Execute middlewares
      await this.executeMiddlewares(enhancedReq, enhancedRes);

      // Find and execute route handler
      const routeKey = `${method}:${pathname}`;
      const handler = this.routes.get(routeKey);

      if (handler) {
        await handler(enhancedReq, enhancedRes);
      } else {
        enhancedRes.status(404).json({ error: "Not Found" });
      }
    } catch (error) {
      await this.handleError(error, enhancedReq, enhancedRes);
    }
  }

  async executeMiddlewares(req, res) {
    for (const middleware of this.middlewares) {
      await new Promise((resolve, reject) => {
        middleware(req, res, (error) => {
          if (error) reject(error);
          else resolve();
        });
      });
    }
  }

  async handleError(error, req, res) {
    for (const handler of this.errorHandlers) {
      try {
        await handler(error, req, res);
        return; // Error handled, stop processing
      } catch (handlerError) {
        console.error("Error in error handler:", handlerError);
      }
    }

    // Default error handling
    console.error("Unhandled error:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }

  parseRequestBody(req) {
    return new Promise((resolve, reject) => {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        try {
          const contentType = req.headers["content-type"];

          if (contentType?.includes("application/json")) {
            resolve(JSON.parse(body));
          } else if (
            contentType?.includes("application/x-www-form-urlencoded")
          ) {
            const params = new URLSearchParams(body);
            resolve(Object.fromEntries(params));
          } else {
            resolve(body);
          }
        } catch (error) {
          reject(error);
        }
      });

      req.on("error", reject);
    });
  }

  listen(port, callback) {
    const server = http.createServer((req, res) => {
      this.handleRequest(req, res);
    });

    return server.listen(port, callback);
  }
}

// Usage example
const server = new AdvancedHTTPServer();

// Add middleware for logging
server.use((req, res, next) => {
  console.log(`${req.method} ${req.pathname} - ${new Date().toISOString()}`);
  next();
});

// Add middleware for CORS
server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  next();
});

// Add routes
server.get("/api/users", async (req, res) => {
  const users = await getUsersFromDatabase();
  res.json(users);
});

server.post("/api/users", async (req, res) => {
  const user = await createUser(req.body);
  res.status(201).json(user);
});

// Add error handler
server.onError((error, req, res) => {
  console.error("Request error:", error);
  res.status(500).json({ error: "Something went wrong" });
});

server.listen(3000, () => {
  console.log("Advanced HTTP server running on port 3000");
});
```

## Fs Module

- **Purpose**: Read, write, and manage files and directories.
- **Key Methods**:
  - `fs.readFile`/`fs.promises.readFile`: Read files (async). parameters are `file name`, `encoding` and `callback function`.
  - `fs.writeFile`/`fs.promises.writeFile`: Write files. parameters are `file name`, `data`, `encoding` and `callback function`.
  - `fs.readdir`: List directory contents.
  - `fs.mkdir`: Create directories.
- **Example**:
  ```js
  import fs from "fs/promises";
  async function readFileAsync() {
    try {
      const data = await fs.readFile("message.txt", "utf8");
      console.log(data);
    } catch (err) {
      console.error("Error:", err.message);
    }
  }
  readFileAsync();
  ```
- **Use Case**: Read config files, log data, or serve static files.

## Advanced File System Operations

### 1. Stream-based File Operations

```javascript
import fs from "fs";
import { pipeline } from "stream/promises";
import { Transform } from "stream";

// Stream-based file processing
class FileProcessor {
  static async processLargeFile(inputPath, outputPath, processor) {
    const readStream = fs.createReadStream(inputPath);
    const writeStream = fs.createWriteStream(outputPath);

    // Create transform stream for processing
    const transformStream = new Transform({
      transform(chunk, encoding, callback) {
        try {
          const processed = processor(chunk.toString());
          callback(null, processed);
        } catch (error) {
          callback(error);
        }
      },
    });

    try {
      await pipeline(readStream, transformStream, writeStream);
      console.log("File processed successfully");
    } catch (error) {
      console.error("File processing failed:", error);
    }
  }

  static async copyFileWithProgress(sourcePath, targetPath) {
    const readStream = fs.createReadStream(sourcePath);
    const writeStream = fs.createWriteStream(targetPath);

    const stats = await fs.promises.stat(sourcePath);
    const totalSize = stats.size;
    let copiedSize = 0;

    const progressStream = new Transform({
      transform(chunk, encoding, callback) {
        copiedSize += chunk.length;
        const progress = ((copiedSize / totalSize) * 100).toFixed(2);
        process.stdout.write(`\rProgress: ${progress}%`);
        callback(null, chunk);
      },
    });

    await pipeline(readStream, progressStream, writeStream);
    console.log("\nFile copied successfully");
  }
}

// Usage
await FileProcessor.processLargeFile("input.txt", "output.txt", (data) =>
  data.toUpperCase()
);

await FileProcessor.copyFileWithProgress("large-file.zip", "backup.zip");
```

### 2. Advanced File Watching

```javascript
import fs from "fs";
import path from "path";

class FileWatcher {
  constructor(watchPath, options = {}) {
    this.watchPath = watchPath;
    this.options = {
      recursive: true,
      persistent: true,
      ...options,
    };
    this.watchers = new Map();
    this.listeners = new Map();
  }

  start() {
    this.watchDirectory(this.watchPath);
  }

  watchDirectory(dirPath) {
    if (this.watchers.has(dirPath)) return;

    const watcher = fs.watch(dirPath, this.options, (eventType, filename) => {
      if (filename) {
        const fullPath = path.join(dirPath, filename);
        this.handleEvent(eventType, fullPath);
      }
    });

    this.watchers.set(dirPath, watcher);

    // Watch subdirectories if recursive
    if (this.options.recursive) {
      this.watchSubdirectories(dirPath);
    }
  }

  watchSubdirectories(dirPath) {
    try {
      const entries = fs.readdirSync(dirPath, { withFileTypes: true });

      for (const entry of entries) {
        if (entry.isDirectory()) {
          const subDirPath = path.join(dirPath, entry.name);
          this.watchDirectory(subDirPath);
        }
      }
    } catch (error) {
      console.error("Error watching subdirectories:", error);
    }
  }

  handleEvent(eventType, fullPath) {
    const listeners = this.listeners.get(eventType) || [];

    for (const listener of listeners) {
      try {
        listener(fullPath, eventType);
      } catch (error) {
        console.error("Error in file event listener:", error);
      }
    }
  }

  on(eventType, listener) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, []);
    }
    this.listeners.get(eventType).push(listener);
  }

  stop() {
    for (const watcher of this.watchers.values()) {
      watcher.close();
    }
    this.watchers.clear();
    this.listeners.clear();
  }
}

// Usage
const watcher = new FileWatcher("./src", { recursive: true });

watcher.on("change", (filepath) => {
  console.log(`File changed: ${filepath}`);
  // Trigger rebuild, reload, etc.
});

watcher.on("rename", (filepath) => {
  console.log(`File renamed/moved: ${filepath}`);
});

watcher.start();
```

## Path Module

- **Purpose**: Handle file paths cross-platform (e.g., Windows uses `\`, Unix uses `/`).
- **Key Methods**:
  - `path.join`: Combine path segments.
  - `path.resolve`: Get absolute path. /// Or `fileURLToPath(import.meta.url)`
  - `path.dirname`: Get directory of a file.
- **Example**:
  ```js
  import path from "path";
  import { fileURLToPath } from "url";
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(__dirname, "message.txt");
  ```
- `Use Case`: Ensure paths work across operating systems.

## URL Module

- Purpose: Parse and format URLs.
- Key Methods:
  - `url.parse`: Break down a URL into components (host, path, query).
  - `new URL`: Modern way to parse URLs (ES Modules).
- Example:
  ```js
  import { URL } from "url";

  const myURL = new URL("http://example.com:3000/path?name=John");
  console.log(myURL.pathname); // /path
  console.log(myURL.searchParams.get("name"));
  ```
- **Use Case**: Handle query parameters in APIs.

## Events Module

- Purpose: Create event-driven systems using EventEmitter.
- Key Methods:
  - `on`: Listen for events.
  - `emit`: Trigger events.
- Example:

  ```js
  import { EventEmitter } from "events";

  const emitter = new EventEmitter();
  emitter.on("greet", (name) => console.log(`Hello, ${name}!`));
  emitter.emit("greet", "Node.js");
  ```

- **Use Case**: Build real-time apps (e.g., chat systems).

## Advanced Event Handling

### 1. Custom Event Emitter with Error Handling

```javascript
import { EventEmitter } from "events";

class SafeEventEmitter extends EventEmitter {
  constructor(options = {}) {
    super(options);
    this.maxListeners = options.maxListeners || 10;
    this.errorHandler = options.errorHandler || this.defaultErrorHandler;
  }

  emit(eventName, ...args) {
    try {
      return super.emit(eventName, ...args);
    } catch (error) {
      this.errorHandler(error, eventName, args);
      return false;
    }
  }

  defaultErrorHandler(error, eventName, args) {
    console.error(`Error in event handler for ${eventName}:`, error);
  }

  on(eventName, listener) {
    // Check for potential memory leaks
    if (this.listenerCount(eventName) >= this.maxListeners) {
      console.warn(
        `Possible memory leak detected: ${this.listenerCount(
          eventName
        )} listeners for ${eventName}`
      );
    }

    return super.on(eventName, listener);
  }

  once(eventName, listener) {
    const wrappedListener = (...args) => {
      try {
        listener(...args);
      } catch (error) {
        this.errorHandler(error, eventName, args);
      }
    };

    return super.once(eventName, wrappedListener);
  }
}

// Usage
const emitter = new SafeEventEmitter({
  maxListeners: 5,
  errorHandler: (error, eventName) => {
    console.error(`Custom error handler: ${eventName} - ${error.message}`);
  },
});

emitter.on("data", (data) => {
  if (data === "error") {
    throw new Error("Data processing error");
  }
  console.log("Processed:", data);
});

emitter.emit("data", "test");
emitter.emit("data", "error"); // Error caught and handled
```

## OS Module

- Purpose: Access operating system information.
- Key Methods:
  - `os.cpus`: Get CPU info.
  - `os.totalmem`: Get total memory.
  - `os.platform`: Get OS type (e.g., 'linux', 'win32').
- Example:
  ```js
  import os from "os";
  console.log("CPUs:", os.cpus().length);
  console.log("Total Memory:", os.totalmem() / 1024 / 1024, "MB");
  ```
- **Use Case**: Monitor server resources.

## System Resource Monitoring

### 1. Advanced System Monitoring

```javascript
import os from "os";
import fs from "fs";
import { performance } from "perf_hooks";

class SystemMonitor {
  constructor() {
    this.startTime = performance.now();
    this.metrics = {
      cpu: [],
      memory: [],
      disk: [],
      network: [],
    };
  }

  getCPUUsage() {
    const cpus = os.cpus();
    let totalIdle = 0;
    let totalTick = 0;

    cpus.forEach((cpu) => {
      for (const type in cpu.times) {
        totalTick += cpu.times[type];
      }
      totalIdle += cpu.times.idle;
    });

    return {
      total: totalTick,
      idle: totalIdle,
      cores: cpus.length,
      model: cpus[0].model,
      speed: cpus[0].speed,
    };
  }

  getMemoryUsage() {
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;

    return {
      total: totalMem,
      free: freeMem,
      used: usedMem,
      usage: ((usedMem / totalMem) * 100).toFixed(2),
      heap: process.memoryUsage(),
    };
  }

  async getDiskUsage(path = "/") {
    try {
      const stats = await fs.promises.stat(path);
      return {
        path,
        available: stats.size || 0,
        timestamp: Date.now(),
      };
    } catch (error) {
      return { path, error: error.message };
    }
  }

  getNetworkInterfaces() {
    const interfaces = os.networkInterfaces();
    const result = {};

    for (const [name, configs] of Object.entries(interfaces)) {
      result[name] = configs.map((config) => ({
        address: config.address,
        netmask: config.netmask,
        family: config.family,
        mac: config.mac,
        internal: config.internal,
      }));
    }

    return result;
  }

  startMonitoring(intervalMs = 5000) {
    this.monitoringInterval = setInterval(() => {
      this.collectMetrics();
    }, intervalMs);
  }

  collectMetrics() {
    const timestamp = Date.now();

    this.metrics.cpu.push({
      timestamp,
      ...this.getCPUUsage(),
    });

    this.metrics.memory.push({
      timestamp,
      ...this.getMemoryUsage(),
    });

    // Keep only last 100 entries
    Object.keys(this.metrics).forEach((key) => {
      if (this.metrics[key].length > 100) {
        this.metrics[key].shift();
      }
    });
  }

  stopMonitoring() {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
    }
  }

  getReport() {
    const uptime = performance.now() - this.startTime;

    return {
      uptime: Math.floor(uptime / 1000),
      system: {
        platform: os.platform(),
        arch: os.arch(),
        hostname: os.hostname(),
        release: os.release(),
      },
      current: {
        cpu: this.getCPUUsage(),
        memory: this.getMemoryUsage(),
        network: this.getNetworkInterfaces(),
      },
      averages: {
        cpu: this.calculateAverageCPU(),
        memory: this.calculateAverageMemory(),
      },
    };
  }

  calculateAverageCPU() {
    if (this.metrics.cpu.length < 2) return null;

    const latest = this.metrics.cpu[this.metrics.cpu.length - 1];
    const previous = this.metrics.cpu[this.metrics.cpu.length - 2];

    const idleDiff = latest.idle - previous.idle;
    const totalDiff = latest.total - previous.total;

    return {
      usage: (((totalDiff - idleDiff) / totalDiff) * 100).toFixed(2),
      cores: latest.cores,
    };
  }

  calculateAverageMemory() {
    if (this.metrics.memory.length === 0) return null;

    const latest = this.metrics.memory[this.metrics.memory.length - 1];

    return {
      usage: latest.usage,
      total: latest.total,
      used: latest.used,
    };
  }
}

// Usage
const monitor = new SystemMonitor();
monitor.startMonitoring(2000); // Monitor every 2 seconds

// Get current report
setInterval(() => {
  const report = monitor.getReport();
  console.log("System Report:", JSON.stringify(report, null, 2));
}, 10000);
```

# Note : Now learn Basic Concept of Node

[Basic Concept like module, Global Objects](../Node%20Basics/module.md)
