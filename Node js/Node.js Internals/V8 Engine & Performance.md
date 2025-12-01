# V8 Engine & Performance Optimization

## V8 Engine Deep Dive for FAANG

### Why V8 Knowledge Matters

- **Performance Understanding**: Know how JavaScript executes in Node.js
- **Memory Management**: Optimize memory usage and prevent leaks
- **Debugging**: Understand execution and performance bottlenecks
- **Optimization**: Write code that leverages V8's optimizations
- **Advanced Debugging**: Use V8 tools for performance analysis

## V8 Engine Architecture

### 1. V8 Components Overview

```javascript
// Understanding V8's execution pipeline
/*
1. Parsing: JavaScript source → AST (Abstract Syntax Tree)
2. Ignition: AST → Bytecode (Interpreter)
3. TurboFan: Hot bytecode → Optimized machine code
4. Orinoco: Garbage collection
5. Liftoff: WebAssembly compilation
*/

// Example: Code that benefits from V8 optimization
class OptimizedArrayProcessor {
  constructor() {
    this.data = [];
  }

  // V8 can optimize this method due to monomorphic behavior
  addNumber(num) {
    // Always same type (number) → monomorphic
    this.data.push(num);
  }

  // This method is harder to optimize due to polymorphic behavior
  addMixed(value) {
    // Different types → polymorphic → slower
    this.data.push(value);
  }

  // Optimized processing with consistent types
  processNumbers() {
    let sum = 0; // Initialize with number type
    for (let i = 0; i < this.data.length; i++) {
      // V8 can optimize this loop
      sum += this.data[i]; // Always number + number
    }
    return sum;
  }
}

// Performance comparison
const processor = new OptimizedArrayProcessor();

// Fast - monomorphic
console.time("monomorphic");
for (let i = 0; i < 1000000; i++) {
  processor.addNumber(i);
}
console.timeEnd("monomorphic");

// Slow - polymorphic
console.time("polymorphic");
for (let i = 0; i < 1000000; i++) {
  processor.addMixed(i % 2 === 0 ? i : i.toString());
}
console.timeEnd("polymorphic");
```

### 2. Hidden Classes and Optimizations

```javascript
// Understanding V8's hidden classes
class User {
  constructor(name, age) {
    this.name = name; // Property 1
    this.age = age; // Property 2
  }
}

// Good: Same property order → same hidden class
function createUsersOptimized() {
  const users = [];
  for (let i = 0; i < 10000; i++) {
    users.push(new User(`User${i}`, 20 + (i % 50)));
  }
  return users;
}

// Bad: Different property order → multiple hidden classes
function createUsersUnoptimized() {
  const users = [];
  for (let i = 0; i < 10000; i++) {
    const user = {};
    if (i % 2 === 0) {
      user.name = `User${i}`;
      user.age = 20 + (i % 50);
    } else {
      user.age = 20 + (i % 50);
      user.name = `User${i}`;
    }
    users.push(user);
  }
  return users;
}

// Demonstrate performance difference
console.time("optimized");
const optimizedUsers = createUsersOptimized();
console.timeEnd("optimized");

console.time("unoptimized");
const unoptimizedUsers = createUsersUnoptimized();
console.timeEnd("unoptimized");
```

## Memory Management & Garbage Collection

### 1. Understanding V8 Memory Layout

```javascript
import v8 from "v8";

class MemoryAnalyzer {
  constructor() {
    this.heapStats = v8.getHeapStatistics();
    this.heapSpaceStats = v8.getHeapSpaceStatistics();
  }

  getDetailedMemoryReport() {
    const usage = process.memoryUsage();
    const stats = v8.getHeapStatistics();
    const spaces = v8.getHeapSpaceStatistics();

    return {
      process: {
        rss: Math.round(usage.rss / 1024 / 1024) + " MB",
        heapTotal: Math.round(usage.heapTotal / 1024 / 1024) + " MB",
        heapUsed: Math.round(usage.heapUsed / 1024 / 1024) + " MB",
        external: Math.round(usage.external / 1024 / 1024) + " MB",
      },
      v8: {
        heapSizeLimit: Math.round(stats.heap_size_limit / 1024 / 1024) + " MB",
        totalHeapSize: Math.round(stats.total_heap_size / 1024 / 1024) + " MB",
        usedHeapSize: Math.round(stats.used_heap_size / 1024 / 1024) + " MB",
        heapSizeLimitPercentage:
          Math.round((stats.used_heap_size / stats.heap_size_limit) * 100) +
          "%",
      },
      spaces: spaces.map((space) => ({
        space_name: space.space_name,
        space_size: Math.round(space.space_size / 1024 / 1024) + " MB",
        space_used_size:
          Math.round(space.space_used_size / 1024 / 1024) + " MB",
        space_available_size:
          Math.round(space.space_available_size / 1024 / 1024) + " MB",
        physical_space_size:
          Math.round(space.physical_space_size / 1024 / 1024) + " MB",
      })),
    };
  }

  // Monitor memory usage over time
  startMemoryMonitoring(intervalMs = 5000) {
    this.monitoringInterval = setInterval(() => {
      const report = this.getDetailedMemoryReport();

      // Alert on high memory usage
      const heapUsedPercent = parseFloat(report.v8.heapSizeLimitPercentage);
      if (heapUsedPercent > 80) {
        console.warn(`⚠️ High memory usage: ${heapUsedPercent}%`);
      }

      console.log("Memory Report:", report);
    }, intervalMs);
  }

  stopMemoryMonitoring() {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }
  }

  // Force garbage collection (for debugging only)
  forceGC() {
    if (global.gc) {
      global.gc();
      console.log("🧹 Garbage collection forced");
    } else {
      console.warn("⚠️ Garbage collection not available. Run with --expose-gc");
    }
  }
}

// Usage
const memoryAnalyzer = new MemoryAnalyzer();
console.log("Initial Memory Report:", memoryAnalyzer.getDetailedMemoryReport());

// Start monitoring
memoryAnalyzer.startMemoryMonitoring(10000); // Every 10 seconds
```

### 2. Memory Leak Detection

```javascript
class MemoryLeakDetector {
  constructor() {
    this.snapshots = new Map();
    this.objectTracker = new Map();
  }

  // Track object creation
  trackObject(id, object) {
    this.objectTracker.set(id, {
      created: Date.now(),
      object,
      stackTrace: new Error().stack,
    });
  }

  // Release object tracking
  releaseObject(id) {
    this.objectTracker.delete(id);
  }

  // Take memory snapshot
  takeSnapshot(name) {
    const usage = process.memoryUsage();
    const v8Stats = v8.getHeapStatistics();

    this.snapshots.set(name, {
      timestamp: Date.now(),
      process: usage,
      v8: v8Stats,
      trackedObjects: this.objectTracker.size,
    });

    console.log(`📸 Memory snapshot '${name}' taken`);
  }

  // Compare snapshots for leak detection
  compareSnapshots(snapshot1, snapshot2) {
    const snap1 = this.snapshots.get(snapshot1);
    const snap2 = this.snapshots.get(snapshot2);

    if (!snap1 || !snap2) {
      throw new Error("Snapshots not found");
    }

    const heapIncrease = snap2.v8.used_heap_size - snap1.v8.used_heap_size;
    const timeDiff = snap2.timestamp - snap1.timestamp;

    return {
      timeDiff: Math.round(timeDiff / 1000) + "s",
      heapIncrease: Math.round(heapIncrease / 1024 / 1024) + " MB",
      heapGrowthRate: Math.round((heapIncrease / timeDiff) * 1000) + " KB/s",
      trackedObjectsDiff: snap2.trackedObjects - snap1.trackedObjects,
    };
  }

  // Find potential leaks
  findPotentialLeaks() {
    const now = Date.now();
    const leaks = [];

    for (const [id, info] of this.objectTracker) {
      const age = now - info.created;
      if (age > 60000) {
        // Objects older than 1 minute
        leaks.push({
          id,
          age: Math.round(age / 1000) + "s",
          stackTrace: info.stackTrace,
        });
      }
    }

    return leaks;
  }
}

// Example usage with potential leak
class DataProcessor {
  constructor() {
    this.cache = new Map();
    this.leakDetector = new MemoryLeakDetector();
  }

  // This method could cause a memory leak
  processDataWithLeak(data) {
    const id = `data_${Date.now()}_${Math.random()}`;
    const processedData = this.heavyProcessing(data);

    // Track object
    this.leakDetector.trackObject(id, processedData);

    // Store in cache (never cleaned up)
    this.cache.set(id, processedData);

    return processedData;
  }

  // Fixed version without leak
  processDataFixed(data) {
    const id = `data_${Date.now()}_${Math.random()}`;
    const processedData = this.heavyProcessing(data);

    // Track object
    this.leakDetector.trackObject(id, processedData);

    // Store in cache with size limit
    if (this.cache.size > 1000) {
      // Remove oldest entry
      const oldestKey = this.cache.keys().next().value;
      const oldestValue = this.cache.get(oldestKey);
      this.leakDetector.releaseObject(oldestKey);
      this.cache.delete(oldestKey);
    }

    this.cache.set(id, processedData);

    return processedData;
  }

  heavyProcessing(data) {
    // Simulate heavy processing
    return Array(1000)
      .fill(0)
      .map((_, i) => ({
        id: i,
        data: data + "_" + i,
        timestamp: Date.now(),
        metadata: {
          processed: true,
          checksum: Math.random().toString(36),
        },
      }));
  }
}

// Demonstration
const processor = new DataProcessor();

// Take initial snapshot
processor.leakDetector.takeSnapshot("initial");

// Simulate data processing with leak
setInterval(() => {
  processor.processDataWithLeak("test_data");
}, 100);

// Check for leaks periodically
setInterval(() => {
  const leaks = processor.leakDetector.findPotentialLeaks();
  if (leaks.length > 0) {
    console.warn(`🚨 Found ${leaks.length} potential memory leaks`);
  }
}, 5000);
```

### 3. Optimizing Memory Usage

```javascript
class MemoryOptimizer {
  // Use object pooling for frequently created objects
  static createObjectPool(createFn, resetFn, maxSize = 100) {
    const pool = [];

    return {
      acquire() {
        if (pool.length > 0) {
          return pool.pop();
        }
        return createFn();
      },

      release(obj) {
        if (pool.length < maxSize) {
          resetFn(obj);
          pool.push(obj);
        }
      },

      size() {
        return pool.length;
      },
    };
  }

  // Efficient array operations
  static processLargeArray(array, chunkSize = 1000) {
    const results = [];

    for (let i = 0; i < array.length; i += chunkSize) {
      const chunk = array.slice(i, i + chunkSize);

      // Process chunk to avoid holding large arrays in memory
      const processedChunk = chunk.map((item) => {
        // Process item
        return item * 2; // Example processing
      });

      results.push(...processedChunk);

      // Allow garbage collection between chunks
      if (i % (chunkSize * 10) === 0) {
        // Optional: Force GC in development
        if (global.gc) {
          global.gc();
        }
      }
    }

    return results;
  }

  // Stream processing for large datasets
  static async processLargeFile(filePath, processor) {
    const { createReadStream } = await import("fs");
    const { Transform } = await import("stream");

    return new Promise((resolve, reject) => {
      let result = [];
      let chunkCount = 0;

      const transformStream = new Transform({
        objectMode: true,
        transform(chunk, encoding, callback) {
          try {
            // Process chunk
            const processed = processor(chunk);
            result.push(processed);
            chunkCount++;

            // Allow garbage collection periodically
            if (chunkCount % 100 === 0) {
              setImmediate(callback);
            } else {
              callback(null, processed);
            }
          } catch (error) {
            callback(error);
          }
        },

        flush(callback) {
          callback(null, result);
        },
      });

      const readStream = createReadStream(filePath, {
        encoding: "utf8",
        highWaterMark: 1024, // Small chunks to reduce memory usage
      });

      readStream
        .pipe(transformStream)
        .on("data", (data) => {
          // Process data in chunks
        })
        .on("end", () => {
          resolve(result);
        })
        .on("error", reject);
    });
  }
}

// Example: Object pool for frequently created objects
const vectorPool = MemoryOptimizer.createObjectPool(
  () => ({ x: 0, y: 0, z: 0 }),
  (obj) => {
    obj.x = 0;
    obj.y = 0;
    obj.z = 0;
  },
  1000
);

// Usage in performance-critical code
function processVectors(vectors) {
  const results = [];

  for (const vector of vectors) {
    const tempVector = vectorPool.acquire();

    // Use the pooled object
    tempVector.x = vector.x * 2;
    tempVector.y = vector.y * 2;
    tempVector.z = vector.z * 2;

    results.push({ ...tempVector });

    // Return to pool
    vectorPool.release(tempVector);
  }

  return results;
}
```

## Performance Profiling & Debugging

### 1. CPU Profiling

```javascript
import { performance } from "perf_hooks";

class PerformanceProfiler {
  constructor() {
    this.profiles = new Map();
    this.currentProfile = null;
  }

  // Start profiling a function
  startProfile(name) {
    this.currentProfile = {
      name,
      startTime: performance.now(),
      startCpuUsage: process.cpuUsage(),
      samples: [],
    };

    // Set up sampling interval
    this.samplingInterval = setInterval(() => {
      if (this.currentProfile) {
        const cpuUsage = process.cpuUsage(this.currentProfile.startCpuUsage);
        this.currentProfile.samples.push({
          timestamp: performance.now(),
          cpuUsage: cpuUsage.user + cpuUsage.system,
          memoryUsage: process.memoryUsage(),
        });
      }
    }, 100); // Sample every 100ms
  }

  // Stop profiling and return results
  endProfile() {
    if (!this.currentProfile) {
      throw new Error("No active profile");
    }

    clearInterval(this.samplingInterval);

    const endTime = performance.now();
    const totalCpuUsage = process.cpuUsage(this.currentProfile.startCpuUsage);

    const profile = {
      ...this.currentProfile,
      endTime,
      duration: endTime - this.currentProfile.startTime,
      totalCpuUsage: totalCpuUsage.user + totalCpuUsage.system,
      averageCpuUsage: this.calculateAverageCpuUsage(),
      peakMemoryUsage: this.getPeakMemoryUsage(),
    };

    this.profiles.set(profile.name, profile);
    this.currentProfile = null;

    return profile;
  }

  calculateAverageCpuUsage() {
    if (this.currentProfile.samples.length === 0) return 0;

    const total = this.currentProfile.samples.reduce(
      (sum, sample) => sum + sample.cpuUsage,
      0
    );

    return total / this.currentProfile.samples.length;
  }

  getPeakMemoryUsage() {
    if (this.currentProfile.samples.length === 0) return 0;

    return Math.max(
      ...this.currentProfile.samples.map(
        (sample) => sample.memoryUsage.heapUsed
      )
    );
  }

  // Profile a function automatically
  async profileFunction(name, fn, ...args) {
    this.startProfile(name);

    try {
      const result = await fn(...args);
      const profile = this.endProfile();

      return {
        result,
        profile,
      };
    } catch (error) {
      this.endProfile(); // Clean up even on error
      throw error;
    }
  }

  // Get all profiles
  getProfiles() {
    return Array.from(this.profiles.values());
  }

  // Compare two profiles
  compareProfiles(name1, name2) {
    const profile1 = this.profiles.get(name1);
    const profile2 = this.profiles.get(name2);

    if (!profile1 || !profile2) {
      throw new Error("Profiles not found");
    }

    return {
      durationDiff: profile2.duration - profile1.duration,
      cpuUsageDiff: profile2.totalCpuUsage - profile1.totalCpuUsage,
      memoryDiff: profile2.peakMemoryUsage - profile1.peakMemoryUsage,
      speedImprovement:
        (
          ((profile1.duration - profile2.duration) / profile1.duration) *
          100
        ).toFixed(2) + "%",
    };
  }
}

// Usage examples
const profiler = new PerformanceProfiler();

// Profile different implementations
async function testArrayImplementations() {
  const data = Array(100000)
    .fill(0)
    .map((_, i) => i);

  // Test 1: For loop
  const test1 = await profiler.profileFunction("forLoop", () => {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i];
    }
    return sum;
  });

  // Test 2: forEach
  const test2 = await profiler.profileFunction("forEach", () => {
    let sum = 0;
    data.forEach((item) => (sum += item));
    return sum;
  });

  // Test 3: reduce
  const test3 = await profiler.profileFunction("reduce", () => {
    return data.reduce((sum, item) => sum + item, 0);
  });

  console.log("Performance comparison:");
  console.log("For loop:", test1.profile);
  console.log("forEach:", test2.profile);
  console.log("reduce:", test3.profile);

  // Compare performance
  console.log(
    "forEach vs forLoop:",
    profiler.compareProfiles("forEach", "forLoop")
  );
  console.log(
    "reduce vs forLoop:",
    profiler.compareProfiles("reduce", "forLoop")
  );
}
```

### 2. Advanced Debugging Techniques

```javascript
import { inspect } from 'util';

class AdvancedDebugger {
  constructor() {
    this.breakpoints = new Map();
    this.traceEnabled = false;
    this.callStack = [];
  }

  // Set breakpoint conditionally
  setBreakpoint(name, condition) {
    this.breakpoints.set(name, condition);
  }

  // Check if breakpoint should trigger
  checkBreakpoint(name, context) {
    const condition = this.breakpoints.get(name);
    if (condition && condition(context)) {
      this.triggerBreakpoint(name, context);
    }
  }

  triggerBreakpoint(name, context) {
    console.log(`🛑 Breakpoint hit: ${name}`);
    console.log('Context:', inspect(context, { depth: 3 }));

    // In development, you could launch debugger here
    if (process.env.NODE_ENV === 'development') {
      debugger; // Launches Chrome DevTools debugger
    }
  }

  // Enable function call tracing
  enableTracing() {
    this.traceEnabled = true;

    // Wrap console methods to add call stack info
    const originalLog = console.log;
    console.log = (...args) => {
      if (this.traceEnabled) {
        const stack = new Error().stack;
        this.callStack.push({
          timestamp: Date.now(),
          method: 'log',
          args,
          stack: stack.split('\n').slice(2, 5)
        });
      }
      originalLog.apply(console, args);
    };
  }

  // Get call stack trace
  getCallStack() {
    return this.callStack.slice(-10); // Last 10 calls
  }

  // Clear call stack
  clearCallStack() {
    this.callStack = [];
  }

  // Deep object inspection
  deepInspect(obj, maxDepth = 3) {
    return inspect(obj, {
      depth: maxDepth,
      colors: true,
      showHidden: true,
      getters: true
    });
  }

  // Monitor object changes
  watchObject(obj, name) {
    return new Proxy(obj, {
      get(target, prop, receiver) {
        const value = Reflect.get(target, prop, receiver);
        console.log(`🔍 GET ${name}.${prop} =`, value);
        return value;
      },

      set(target, prop, value, receiver) {
        console.log(`🔍 SET ${name}.${prop} =`, value);
        return Reflect.set(target, prop, value, receiver);
      }
    });
  }

  // Memory leak detection
  detectMemoryLeaks() {
    const initialMemory = process.memoryUsage();

    return {
      check() {
        const currentMemory = process.memoryUsage();
        const heapGrowth = currentMemory.heapUsed - initialMemory.heapUsed;

        if (heapGrowth > 50 * 1024 * 1024) { // 50MB growth
          console.warn(`🚨 Potential memory leak detected: ${Math.round(heapGrowth / 1024 / 1024)}MB growth`);
          return true;
        }

        return false;
      }
    };
  }
}

// Usage examples
const debugger = new AdvancedDebugger();

// Set conditional breakpoint
debugger.setBreakpoint('userCreation', (context) => {
  return context.user.email.includes('test');
});

// Enable tracing
debugger.enableTracing();

// Watch object for changes
const user = { name: 'John', email: 'john@example.com' };
const watchedUser = debugger.watchObject(user, 'user');

// Function with debugging
function createUser(userData) {
  debugger.checkBreakpoint('userCreation', { user: userData });

  // Create user logic
  const newUser = { ...userData, id: Date.now(), createdAt: new Date() };

  console.log('User created:', newUser);

  return newUser;
}

// Test the debugging
createUser({ name: 'Test User', email: 'test@example.com' });
```

## Cluster vs Worker Threads

### 1. Understanding the Difference

```javascript
import { fork } from "child_process";
import { Worker, isMainThread, parentPort, workerData } from "worker_threads";

class ConcurrencyManager {
  constructor() {
    this.workers = new Map();
    this.clusters = new Map();
  }

  // CPU-intensive task using Worker Threads
  async runWithWorkerThread(scriptPath, data) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(scriptPath, {
        workerData: data,
      });

      const timeout = setTimeout(() => {
        worker.terminate();
        reject(new Error("Worker timeout"));
      }, 30000); // 30 second timeout

      worker.on("message", (result) => {
        clearTimeout(timeout);
        resolve(result);
      });

      worker.on("error", (error) => {
        clearTimeout(timeout);
        reject(error);
      });

      worker.on("exit", (code) => {
        clearTimeout(timeout);
        if (code !== 0) {
          reject(new Error(`Worker stopped with exit code ${code}`));
        }
      });
    });
  }

  // I/O-bound task using Cluster
  async runWithCluster(scriptPath, data) {
    return new Promise((resolve, reject) => {
      const worker = fork(scriptPath);

      worker.send(data);

      const timeout = setTimeout(() => {
        worker.kill();
        reject(new Error("Cluster worker timeout"));
      }, 30000);

      worker.on("message", (result) => {
        clearTimeout(timeout);
        resolve(result);
      });

      worker.on("error", (error) => {
        clearTimeout(timeout);
        reject(error);
      });

      worker.on("exit", (code) => {
        clearTimeout(timeout);
        if (code !== 0) {
          reject(new Error(`Cluster worker stopped with exit code ${code}`));
        }
      });
    });
  }

  // Worker pool for CPU-intensive tasks
  createWorkerPool(scriptPath, poolSize = 4) {
    const pool = {
      workers: [],
      available: [],
      busy: [],
      taskQueue: [],

      init() {
        for (let i = 0; i < poolSize; i++) {
          const worker = new Worker(scriptPath);

          worker.on("message", (result) => {
            const task = worker.currentTask;
            if (task) {
              task.resolve(result);
              worker.currentTask = null;
              this.busy.splice(this.busy.indexOf(worker), 1);
              this.available.push(worker);
              this.processNextTask();
            }
          });

          worker.on("error", (error) => {
            const task = worker.currentTask;
            if (task) {
              task.reject(error);
              worker.currentTask = null;
              this.busy.splice(this.busy.indexOf(worker), 1);
              this.available.push(worker);
              this.processNextTask();
            }
          });

          this.workers.push(worker);
          this.available.push(worker);
        }
      },

      execute(data) {
        return new Promise((resolve, reject) => {
          this.taskQueue.push({ data, resolve, reject });
          this.processNextTask();
        });
      },

      processNextTask() {
        if (this.available.length === 0 || this.taskQueue.length === 0) {
          return;
        }

        const worker = this.available.shift();
        const task = this.taskQueue.shift();

        worker.currentTask = task;
        this.busy.push(worker);

        worker.postMessage(task.data);
      },

      destroy() {
        this.workers.forEach((worker) => worker.terminate());
      },
    };

    pool.init();
    return pool;
  }
}

// CPU-intensive task worker (workerThread.js)
if (!isMainThread) {
  const { workerData } = require("worker_threads");

  function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  }

  function heavyCalculation(data) {
    const { number, iterations } = data;
    let result = 0;

    for (let i = 0; i < iterations; i++) {
      result += fibonacci(number % 30); // Keep it manageable
    }

    return {
      input: data,
      result,
      workerId: require("worker_threads").threadId,
    };
  }

  const result = heavyCalculation(workerData);
  parentPort.postMessage(result);
}

// I/O-bound task worker (clusterWorker.js)
if (require.main === module) {
  process.on("message", async (data) => {
    const { urls } = data;
    const results = [];

    // Simulate I/O operations
    for (const url of urls) {
      // Simulate network request
      await new Promise((resolve) =>
        setTimeout(resolve, 100 + Math.random() * 200)
      );

      results.push({
        url,
        status: 200,
        data: `Response from ${url}`,
        timestamp: Date.now(),
      });
    }

    process.send(results);
    process.exit(0);
  });
}

// Usage comparison
async function compareConcurrencyModels() {
  const manager = new ConcurrencyManager();

  // CPU-intensive task
  console.time("Worker Thread (CPU)");
  const cpuResult = await manager.runWithWorkerThread("./workerThread.js", {
    number: 35,
    iterations: 1000,
  });
  console.timeEnd("Worker Thread (CPU)");

  // I/O-intensive task
  console.time("Cluster (I/O)");
  const ioResult = await manager.runWithCluster("./clusterWorker.js", {
    urls: ["http://api1.com", "http://api2.com", "http://api3.com"],
  });
  console.timeEnd("Cluster (I/O)");

  console.log("CPU Result:", cpuResult);
  console.log("I/O Result:", ioResult);
}
```

## V8 Interview Questions

### 1. "Explain how V8 optimizes JavaScript code"

```javascript
// Answer: V8 uses Just-In-Time (JIT) compilation with multiple tiers
// 1. Ignition interpreter for quick startup
// 2. TurboFan optimizing compiler for hot code
// 3. Hidden classes for fast property access
// 4. Inline caching for method calls

// Example of code that V8 can optimize well
class OptimizedCounter {
  constructor() {
    this.count = 0; // Same type, same hidden class
  }

  increment() {
    this.count++; // Monomorphic property access
    return this.count;
  }
}
```

### 2. "How would you detect and fix memory leaks in Node.js?"

```javascript
// Answer: Use heap snapshots, track object references, analyze GC patterns
// Implementation shown in MemoryLeakDetector class above
```

### 3. "When would you use Worker Threads vs Cluster?"

```javascript
// Answer:
// Worker Threads: CPU-intensive tasks, true parallelism, shared memory
// Cluster: I/O-bound tasks, process isolation, load distribution
```

## Key Takeaways for FAANG

### V8 Engine Mastery

- **Hidden Classes**: Understand how V8 optimizes object property access
- **Memory Management**: Know garbage collection algorithms and patterns
- **Performance Profiling**: Use V8 tools for optimization
- **Debugging**: Advanced debugging techniques for production issues

### Performance Optimization

- **Code Patterns**: Write V8-friendly code (monomorphic, consistent types)
- **Memory Efficiency**: Prevent leaks, use object pooling
- **Concurrency**: Choose between Worker Threads and Cluster appropriately
- **Profiling**: Regular performance monitoring and optimization

### External Resources

- **V8 Documentation**: https://v8.dev/docs
- **Node.js Performance**: https://nodejs.org/en/docs/guides/simple-profiling/
- **Chrome DevTools**: https://developers.google.com/web/tools/chrome-devtools
- **Memory Debugging**: https://nodejs.org/en/docs/guides/debugging-getting-started/
