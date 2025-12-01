# Advanced Streams & Asynchronous Programming

## Streams in Node.js

### What are Streams?

Streams are collections of data — just like arrays or strings — but they're not all loaded into memory at once. This makes them perfect for handling large amounts of data or data that's coming from an external source.

### Why Streams Matter for FAANG

- **Memory Efficiency**: Process large files without loading entire content into memory
- **Time Efficiency**: Start processing data as soon as it's available
- **Composability**: Chain multiple stream operations together
- **Real-world Use**: File uploads, video streaming, data processing pipelines

## Types of Streams

### 1. Readable Streams

```javascript
import { createReadStream } from "fs";
import { createServer } from "http";

// File reading with streams
const readableStream = createReadStream("./large-file.txt", {
  encoding: "utf8",
  highWaterMark: 1024, // 1KB chunks
});

readableStream.on("data", (chunk) => {
  console.log("Received chunk:", chunk.length, "bytes");
  console.log("Content:", chunk.substring(0, 100));
});

readableStream.on("end", () => {
  console.log("File reading completed");
});

readableStream.on("error", (err) => {
  console.error("Error:", err);
});

// HTTP request as readable stream
const server = createServer((req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    console.log("Request body:", body);
    res.end("Data received");
  });
});

server.listen(3000);
```

### 2. Writable Streams

```javascript
import { createWriteStream } from "fs";

const writableStream = createWriteStream("./output.txt");

writableStream.write("First chunk\n");
writableStream.write("Second chunk\n");
writableStream.write("Third chunk\n");

writableStream.on("finish", () => {
  console.log("Writing completed");
});

writableStream.on("error", (err) => {
  console.error("Error:", err);
});

writableStream.end(); // Signal the end of writing

// Handling backpressure
function writeWithBackpressure(stream, data) {
  const canWrite = stream.write(data);

  if (!canWrite) {
    // Wait for drain event before writing more
    stream.once("drain", () => {
      console.log("Drained, can write more");
      writeWithBackpressure(stream, data);
    });
  }
}
```

### 3. Transform Streams

```javascript
import { Transform } from "stream";

// Custom transform stream to uppercase text
class UppercaseTransform extends Transform {
  _transform(chunk, encoding, callback) {
    const uppercased = chunk.toString().toUpperCase();
    this.push(uppercased);
    callback();
  }
}

// Usage
import { createReadStream, createWriteStream } from "fs";

const readable = createReadStream("./input.txt");
const writable = createWriteStream("./output.txt");
const uppercase = new UppercaseTransform();

readable.pipe(uppercase).pipe(writable);

// Another example: CSV to JSON transform
class CsvToJsonTransform extends Transform {
  constructor(options) {
    super(options);
    this.headers = null;
    this.isFirstLine = true;
  }

  _transform(chunk, encoding, callback) {
    const line = chunk.toString().trim();

    if (this.isFirstLine) {
      this.headers = line.split(",");
      this.isFirstLine = false;
      callback();
    } else {
      const values = line.split(",");
      const obj = this.headers.reduce((acc, header, index) => {
        acc[header] = values[index];
        return acc;
      }, {});

      this.push(JSON.stringify(obj) + "\n");
      callback();
    }
  }
}
```

### 4. Duplex Streams

```javascript
import { Duplex } from "stream";

// Custom duplex stream for encryption/decryption
class CryptoDuplex extends Duplex {
  constructor(options) {
    super(options);
    // Add your encryption logic here
  }

  _write(chunk, encoding, callback) {
    // Encrypt data and push to readable side
    const encrypted = encrypt(chunk); // Implement encrypt function
    this.push(encrypted);
    callback();
  }

  _read(size) {
    // Implement reading logic
  }
}
```

## Stream Pipeline

### Using pipe() method

```javascript
import { createReadStream, createWriteStream } from "fs";
import { createGzip, createGunzip } from "zlib";
import { pipeline } from "stream/promises";

// Compressing a file
async function compressFile(inputPath, outputPath) {
  const readable = createReadStream(inputPath);
  const gzip = createGzip();
  const writable = createWriteStream(outputPath);

  readable.pipe(gzip).pipe(writable);

  return new Promise((resolve, reject) => {
    writable.on("finish", resolve);
    writable.on("error", reject);
  });
}

// Using pipeline (better error handling)
async function compressWithPipeline(inputPath, outputPath) {
  try {
    await pipeline(
      createReadStream(inputPath),
      createGzip(),
      createWriteStream(outputPath)
    );
    console.log("File compressed successfully");
  } catch (err) {
    console.error("Compression failed:", err);
  }
}
```

## Async Iterators with Streams

### Modern approach to stream processing

```javascript
import { createReadStream } from "fs";

async function processFileStream() {
  const readable = createReadStream("./large-file.txt", { encoding: "utf8" });

  try {
    for await (const chunk of readable) {
      console.log("Processing chunk:", chunk.length, "bytes");
      // Process each chunk
      await processChunk(chunk); // Async processing
    }
    console.log("Stream processing completed");
  } catch (err) {
    console.error("Stream error:", err);
  }
}

// Custom async iterator
class AsyncStreamProcessor {
  constructor(stream) {
    this.stream = stream;
  }

  async *[Symbol.asyncIterator]() {
    for await (const chunk of this.stream) {
      // Transform chunk
      yield chunk.toString().toUpperCase();
    }
  }
}

// Usage
const processor = new AsyncStreamProcessor(createReadStream("./data.txt"));
for await (const chunk of processor) {
  console.log("Processed:", chunk);
}
```

## Worker Threads for CPU-Intensive Tasks

### Why Worker Threads?

- **True Parallelism**: Unlike the event loop, worker threads run on separate CPU cores
- **CPU-Bound Operations**: Perfect for heavy computations, image processing, data analysis
- **Non-Blocking**: Main thread remains responsive while workers handle heavy tasks

### Basic Worker Thread Implementation

```javascript
// main.js
import { Worker } from "worker_threads";

function runWorker(data) {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./worker.js", {
      workerData: data,
    });

    worker.on("message", resolve);
    worker.on("error", reject);
    worker.on("exit", (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
}

// Usage
async function processLargeDataset() {
  const data = generateLargeDataset(); // Your data
  const result = await runWorker(data);
  console.log("Processed result:", result);
}

// worker.js
import { workerData, parentPort } from "worker_threads";

// CPU-intensive processing
function heavyComputation(data) {
  // Example: Prime number calculation
  const primes = [];
  for (let num = 2; num < data.limit; num++) {
    let isPrime = true;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) primes.push(num);
  }
  return primes;
}

const result = heavyComputation(workerData);
parentPort.postMessage(result);
```

### Worker Pool Pattern

```javascript
// workerPool.js
import { Worker } from "worker_threads";
import os from "os";

class WorkerPool {
  constructor(workerPath, size = os.cpus().length) {
    this.workers = [];
    this.availableWorkers = [];
    this.tasks = [];

    // Create workers
    for (let i = 0; i < size; i++) {
      const worker = new Worker(workerPath);
      this.workers.push(worker);
      this.availableWorkers.push(worker);
    }
  }

  async execute(taskData) {
    return new Promise((resolve, reject) => {
      this.tasks.push({ taskData, resolve, reject });
      this.processTasks();
    });
  }

  processTasks() {
    if (this.availableWorkers.length === 0 || this.tasks.length === 0) {
      return;
    }

    const worker = this.availableWorkers.pop();
    const { taskData, resolve, reject } = this.tasks.shift();

    worker.once("message", (result) => {
      this.availableWorkers.push(worker);
      resolve(result);
      this.processTasks(); // Process next task
    });

    worker.once("error", reject);
    worker.postMessage(taskData);
  }

  destroy() {
    this.workers.forEach((worker) => worker.terminate());
  }
}

// Usage
const pool = new WorkerPool("./worker.js");

async function processMultipleTasks() {
  const tasks = [1, 2, 3, 4, 5].map((n) => ({ number: n }));
  const results = await Promise.all(tasks.map((task) => pool.execute(task)));
  console.log("All results:", results);
  pool.destroy();
}
```

## Advanced Error Handling in Streams

### Comprehensive Error Management

```javascript
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";

async function robustStreamProcessing() {
  try {
    await pipeline(
      createReadStream("./input.txt"),
      new TransformStream(),
      createWriteStream("./output.txt")
    );
    console.log("Pipeline completed successfully");
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error("Input file not found");
    } else if (error.code === "EACCES") {
      console.error("Permission denied");
    } else {
      console.error("Stream error:", error);
    }
  }
}

// Custom error handling stream
class ErrorHandlingTransform extends Transform {
  constructor(options) {
    super(options);
    this.errorCount = 0;
    this.maxErrors = 10;
  }

  _transform(chunk, encoding, callback) {
    try {
      // Process chunk
      const processed = this.processChunk(chunk);
      this.push(processed);
      callback();
    } catch (err) {
      this.errorCount++;

      if (this.errorCount > this.maxErrors) {
        callback(new Error("Too many processing errors"));
        return;
      }

      // Log error but continue processing
      console.error("Processing error:", err.message);
      callback();
    }
  }

  processChunk(chunk) {
    // Your processing logic
    return chunk;
  }
}
```

## Performance Optimization

### Memory Management

```javascript
import { createReadStream } from "fs";

// Configure highWaterMark for optimal performance
const optimizedStream = createReadStream("./large-file.txt", {
  encoding: "utf8",
  highWaterMark: 64 * 1024, // 64KB chunks (optimal for most use cases)
});

// Monitor memory usage
function monitorMemory() {
  const used = process.memoryUsage();
  console.log("Memory Usage:");
  for (let key in used) {
    console.log(`${key}: ${Math.round(used[key] / 1024 / 1024)} MB`);
  }
}

// Set up monitoring
setInterval(monitorMemory, 5000);
```

## Real-World Example: File Upload Processor

```javascript
import { createServer } from "http";
import { createWriteStream } from "fs";
import { pipeline } from "stream/promises";

const server = createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/upload") {
    const filename = `upload-${Date.now()}.data`;
    const writable = createWriteStream(`./uploads/${filename}`);

    try {
      await pipeline(req, writable);

      // Process uploaded file with worker thread
      const result = await processFileWithWorker(filename);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          success: true,
          filename,
          result,
        })
      );
    } catch (err) {
      console.error("Upload failed:", err);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          success: false,
          error: err.message,
        })
      );
    }
  }
});

server.listen(3000, () => {
  console.log("File upload server running on port 3000");
});
```

## Key Takeaways for FAANG Interviews

1. **Memory Efficiency**: Streams allow processing large datasets without memory overflow
2. **Backpressure Handling**: Always handle cases where consumer can't keep up with producer
3. **Error Propagation**: Use pipeline() for proper error handling in stream chains
4. **Parallel Processing**: Worker Threads enable true CPU parallelism
5. **Resource Management**: Always clean up streams and workers to prevent memory leaks

## External Resources to Study

- **Node.js Stream Documentation**: https://nodejs.org/api/stream.html
- **Worker Threads Guide**: https://nodejs.org/api/worker_threads.html
- **Stream Handbook**: https://github.com/substack/stream-handbook
- **Backpressure Explained**: https://nodejs.org/en/docs/guides/backpressuring-in-streams/
