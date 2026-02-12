# ⚡ Performance & Optimization

## 1. Storage Engine Performance Analysis

### 1.1 MemoryStorage vs DiskStorage Trade-offs

**MemoryStorage Performance Characteristics:**
```js
// MemoryStorage - Fastest but RAM limited
const memoryStorage = multer.memoryStorage();

// Performance Metrics:
// - Upload Speed: ~500MB/s (limited by network)
// - Latency: < 1ms (no I/O)
// - Memory Usage: 1:1 with file size
// - Concurrent Uploads: Limited by available RAM
// - Cleanup: Automatic on process exit
```

**DiskStorage Performance Characteristics:**
```js
// DiskStorage - Slower but scalable
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, '/tmp/uploads/'),
  filename: (req, file, cb) => cb(null, file.originalname)
});

// Performance Metrics:
// - Upload Speed: ~100-200MB/s (SSD), ~50-100MB/s (HDD)
// - Latency: 5-50ms (disk I/O)
// - Memory Usage: Minimal (streaming)
// - Concurrent Uploads: Limited by disk I/O
// - Cleanup: Manual required
```

**Performance Comparison Table:**

| Metric | MemoryStorage | DiskStorage | Impact |
|--------|---------------|-------------|---------|
| **Upload Speed** | 500MB/s | 100-200MB/s | 2.5-5x faster |
| **Memory Usage** | High | Low | Critical for large files |
| **Concurrent Users** | 10-50 | 100-500+ | Scalability difference |
| **Disk Space** | Not affected | Consumes space | Storage planning |
| **Recovery** | Lost on restart | Persistent | Data durability |

### 1.2 Hybrid Storage Strategy

**Intelligent Storage Selection:**
```js
class SmartStorageEngine {
  constructor() {
    this.memoryThreshold = 10 * 1024 * 1024; // 10MB
    this.memoryStorage = multer.memoryStorage();
    this.diskStorage = multer.diskStorage({
      destination: this.getOptimalDestination,
      filename: this.generateUniqueFilename
    });
  }

  getStorage(req, file) {
    // Use memory for small files, disk for large files
    if (file.size && file.size <= this.memoryThreshold) {
      return this.memoryStorage;
    }
    
    // Use memory for images that need immediate processing
    if (file.mimetype.startsWith('image/') && this.needsImmediateProcessing(file)) {
      return this.memoryStorage;
    }
    
    return this.diskStorage;
  }

  needsImmediateProcessing(file) {
    // Check if file needs real-time processing
    const immediateTypes = ['image/jpeg', 'image/png', 'image/webp'];
    return immediateTypes.includes(file.mimetype);
  }

  getOptimalDestination(req, file, cb) {
    // Distribute files across multiple disks for better I/O
    const diskIndex = this.getOptimalDisk();
    const path = `/uploads/disk${diskIndex}/${this.getDatePath()}`;
    
    fs.mkdirSync(path, { recursive: true });
    cb(null, path);
  }

  getOptimalDisk() {
    // Select disk with most available space
    const disks = ['/mnt/disk1', '/mnt/disk2', '/mnt/disk3'];
    let bestDisk = 0;
    let maxSpace = 0;
    
    for (let i = 0; i < disks.length; i++) {
      const space = this.getAvailableSpace(disks[i]);
      if (space > maxSpace) {
        maxSpace = space;
        bestDisk = i;
      }
    }
    
    return bestDisk;
  }
}
```

---

## 2. Streaming vs Buffering Performance

### 2.1 Streaming Uploads (Memory Efficient)

**Streaming Implementation:**
```js
const stream = require('stream');
const { pipeline } = require('stream/promises');

class StreamingUploadHandler {
  constructor() {
    this.uploadStreams = new Map();
  }

  async handleStreamingUpload(req, res) {
    const uploadId = this.generateUploadId();
    const fileSize = parseInt(req.headers['content-length']);
    
    // Create writable stream to cloud storage
    const cloudStream = this.createCloudStream(uploadId);
    
    // Track upload progress
    this.trackUploadProgress(uploadId, fileSize);
    
    try {
      // Pipe request directly to cloud storage
      await pipeline(
        req, // Incoming request stream
        this.createProgressTracker(uploadId, fileSize),
        cloudStream
      );
      
      res.json({
        uploadId,
        status: 'completed',
        url: cloudStream.url
      });
      
    } catch (error) {
      this.handleUploadError(uploadId, error);
      res.status(500).json({ error: error.message });
    }
  }

  createProgressTracker(uploadId, totalSize) {
    let uploadedBytes = 0;
    
    return new stream.Transform({
      transform(chunk, encoding, callback) {
        uploadedBytes += chunk.length;
        const progress = (uploadedBytes / totalSize) * 100;
        
        // Broadcast progress via WebSocket
        this.broadcastProgress(uploadId, progress, uploadedBytes);
        
        callback(null, chunk);
      }
    });
  }
}
```

**Streaming Benefits:**
- **Memory Usage**: Constant regardless of file size
- **Upload Speed**: Direct to destination, no intermediate storage
- **Scalability**: Can handle unlimited file sizes
- **Real-time Progress**: Immediate feedback to users

### 2.2 Buffered Uploads (Simple but Limited)

**Buffered Implementation:**
```js
// Traditional buffered upload (memory intensive)
const bufferedUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB limit
  }
});

app.post('/upload-buffered', bufferedUpload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    
    // Process entire file from memory
    const processedBuffer = await this.processBuffer(file.buffer);
    
    // Upload to cloud storage
    const result = await this.uploadBuffer(processedBuffer);
    
    res.json({ url: result.url });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

**Buffering Limitations:**
- **Memory Constraints**: Limited by available RAM
- **Block Processing**: Must wait for entire file
- **Scalability Issues**: Poor with large files or concurrent uploads
- **Risk of Crashes**: Memory exhaustion can crash server

---

## 3. High Concurrency Handling

### 3.1 Connection Pooling and Load Distribution

**Connection Pool Implementation:**
```js
class UploadConnectionPool {
  constructor(options = {}) {
    this.maxConnections = options.maxConnections || 100;
    this.activeConnections = 0;
    this.queue = [];
    this.connections = new Map();
  }

  async acquireConnection(uploadId) {
    return new Promise((resolve, reject) => {
      if (this.activeConnections < this.maxConnections) {
        this.activeConnections++;
        const connection = this.createConnection(uploadId);
        this.connections.set(uploadId, connection);
        resolve(connection);
      } else {
        // Queue the request
        this.queue.push({ uploadId, resolve, reject });
        
        // Set timeout to prevent indefinite waiting
        setTimeout(() => {
          const index = this.queue.findIndex(item => item.uploadId === uploadId);
          if (index !== -1) {
            this.queue.splice(index, 1);
            reject(new Error('Connection acquisition timeout'));
          }
        }, 30000);
      }
    });
  }

  releaseConnection(uploadId) {
    const connection = this.connections.get(uploadId);
    if (connection) {
      connection.cleanup();
      this.connections.delete(uploadId);
      this.activeConnections--;
      
      // Process next in queue
      if (this.queue.length > 0) {
        const next = this.queue.shift();
        this.activeConnections++;
        const newConnection = this.createConnection(next.uploadId);
        this.connections.set(next.uploadId, newConnection);
        next.resolve(newConnection);
      }
    }
  }

  createConnection(uploadId) {
    return {
      id: uploadId,
      startTime: Date.now(),
      uploadStream: null,
      cleanup: () => {
        // Cleanup resources
        if (this.uploadStream) {
          this.uploadStream.destroy();
        }
      }
    };
  }

  getStats() {
    return {
      activeConnections: this.activeConnections,
      maxConnections: this.maxConnections,
      queueLength: this.queue.length,
      utilization: (this.activeConnections / this.maxConnections) * 100
    };
  }
}
```

### 3.2 Rate Limiting and Throttling

**Intelligent Rate Limiting:**
```js
class UploadRateLimiter {
  constructor(options = {}) {
    this.windows = new Map(); // Sliding windows per user/IP
    this.globalLimits = {
      requestsPerSecond: options.globalRPS || 1000,
      bytesPerSecond: options.globalBPS || 1024 * 1024 * 1024, // 1GB/s
      maxConcurrent: options.maxConcurrent || 500
    };
    this.userLimits = {
      requestsPerMinute: options.userRPM || 60,
      bytesPerHour: options.userBPH || 1024 * 1024 * 1024, // 1GB/hour
      maxConcurrent: options.userMaxConcurrent || 5
    };
  }

  async checkLimits(identifier, fileSize) {
    const now = Date.now();
    const window = this.getOrCreateWindow(identifier, now);
    
    // Check global limits
    if (this.globalActiveConnections >= this.globalLimits.maxConcurrent) {
      throw new Error('Server at capacity - please try again');
    }
    
    // Check user-specific limits
    if (window.concurrentUploads >= this.userLimits.maxConcurrent) {
      throw new Error('Too many concurrent uploads');
    }
    
    // Check rate limits
    if (this.isRateLimited(window, now)) {
      const waitTime = this.calculateWaitTime(window, now);
      throw new Error(`Rate limit exceeded. Wait ${waitTime}ms`);
    }
    
    // Check data transfer limits
    if (window.bytesThisHour + fileSize > this.userLimits.bytesPerHour) {
      throw new Error('Data transfer limit exceeded');
    }
    
    // Record this upload
    this.recordUpload(window, fileSize, now);
  }

  getOrCreateWindow(identifier, now) {
    if (!this.windows.has(identifier)) {
      this.windows.set(identifier, {
        requests: [], // Timestamps of requests
        bytesThisHour: 0,
        hourStart: now,
        concurrentUploads: 0,
        lastMinuteRequests: 0,
        minuteStart: now
      });
    }
    return this.windows.get(identifier);
  }

  isRateLimited(window, now) {
    // Clean old requests (older than 1 minute)
    window.requests = window.requests.filter(timestamp => 
      now - timestamp < 60000
    );
    
    // Reset hour counter if needed
    if (now - window.hourStart > 3600000) {
      window.bytesThisHour = 0;
      window.hourStart = now;
    }
    
    return window.requests.length >= this.userLimits.requestsPerMinute;
  }

  calculateWaitTime(window, now) {
    if (window.requests.length === 0) return 0;
    
    const oldestRequest = Math.min(...window.requests);
    const timeToWait = 60000 - (now - oldestRequest);
    
    return Math.max(0, timeToWait);
  }

  recordUpload(window, fileSize, now) {
    window.requests.push(now);
    window.bytesThisHour += fileSize;
    window.concurrentUploads++;
  }

  releaseUpload(identifier) {
    const window = this.windows.get(identifier);
    if (window) {
      window.concurrentUploads--;
    }
  }
}
```

---

## 4. Horizontal Scaling Considerations

### 4.1 Stateless Upload Architecture

**Stateless Upload Server:**
```js
class StatelessUploadServer {
  constructor() {
    this.redis = Redis.createClient();
    this.s3 = new AWS.S3();
    this.clusterId = process.env.CLUSTER_ID || 'default';
  }

  async handleUpload(req, res) {
    const uploadId = this.generateUploadId();
    const nodeId = this.clusterId;
    
    try {
      // Create upload record in Redis (shared state)
      await this.createUploadRecord(uploadId, {
        nodeId,
        status: 'started',
        startTime: Date.now(),
        clientIP: req.ip,
        userAgent: req.headers['user-agent']
      });
      
      // Stream directly to S3 (stateless storage)
      const uploadResult = await this.streamToS3(req, uploadId);
      
      // Update shared state
      await this.updateUploadRecord(uploadId, {
        status: 'completed',
        endTime: Date.now(),
        s3Key: uploadResult.key,
        size: uploadResult.size
      });
      
      res.json({
        uploadId,
        url: uploadResult.location,
        status: 'completed'
      });
      
    } catch (error) {
      await this.updateUploadRecord(uploadId, {
        status: 'failed',
        error: error.message
      });
      
      res.status(500).json({ error: error.message });
    }
  }

  async createUploadRecord(uploadId, data) {
    const key = `upload:${uploadId}`;
    await this.redis.hset(key, data);
    await this.redis.expire(key, 3600); // 1 hour TTL
  }

  async streamToS3(req, uploadId) {
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: `uploads/${uploadId}/${Date.now()}`,
      Body: req, // Stream the request directly
      ContentType: req.headers['content-type']
    };

    return await this.s3.upload(params).promise();
  }
}
```

### 4.2 Load Balancer Configuration

**NGINX Configuration for Upload Load Balancing:**
```nginx
upstream upload_servers {
    least_conn;
    server upload1.internal:3000 max_fails=3 fail_timeout=30s;
    server upload2.internal:3000 max_fails=3 fail_timeout=30s;
    server upload3.internal:3000 max_fails=3 fail_timeout=30s;
}

server {
    listen 80;
    server_name uploads.example.com;

    # Increase client body size for large uploads
    client_max_body_size 1G;
    
    # Increase timeout for slow uploads
    proxy_connect_timeout 300s;
    proxy_send_timeout 300s;
    proxy_read_timeout 300s;

    location /upload {
        # Enable request buffering to disk
        request_body_buffer_size 128k;
        client_body_buffer_size 128k;
        client_body_temp_path /tmp/nginx_upload_temp;
        
        # Proxy to upload servers
        proxy_pass http://upload_servers;
        
        # Preserve important headers
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Content-Length $content_length;
        proxy_set_header Content-Type $content_type;
        
        # Disable request buffering for streaming uploads
        proxy_request_buffering off;
    }

    # Health check endpoint
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}
```

---

## 5. Memory and CPU Optimization

### 5.1 Memory Management Strategies

**Memory Pool for Upload Processing:**
```js
class UploadMemoryPool {
  constructor(options = {}) {
    this.poolSize = options.poolSize || 100 * 1024 * 1024; // 100MB
    this.chunkSize = options.chunkSize || 64 * 1024; // 64KB
    this.buffers = [];
    this.allocated = new Map();
    this.initializePool();
  }

  initializePool() {
    const bufferCount = Math.floor(this.poolSize / this.chunkSize);
    
    for (let i = 0; i < bufferCount; i++) {
      this.buffers.push(Buffer.allocUnsafe(this.chunkSize));
    }
  }

  acquireBuffer(uploadId) {
    if (this.buffers.length === 0) {
      // Pool exhausted, create temporary buffer
      return {
        buffer: Buffer.allocUnsafe(this.chunkSize),
        isTemporary: true,
        uploadId
      };
    }
    
    const buffer = this.buffers.pop();
    this.allocated.set(uploadId, buffer);
    
    return {
      buffer,
      isTemporary: false,
      uploadId
    };
  }

  releaseBuffer(uploadId) {
    const allocated = this.allocated.get(uploadId);
    if (allocated && !allocated.isTemporary) {
      // Clear buffer data
      allocated.fill(0);
      this.buffers.push(allocated);
      this.allocated.delete(uploadId);
    }
  }

  getPoolStats() {
    return {
      totalBuffers: Math.floor(this.poolSize / this.chunkSize),
      availableBuffers: this.buffers.length,
      allocatedBuffers: this.allocated.size,
      utilization: ((this.allocated.size / (this.buffers.length + this.allocated.size)) * 100).toFixed(2) + '%'
    };
  }
}
```

### 5.2 CPU Optimization for File Processing

**Worker Thread Pool for Image Processing:**
```js
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

class ImageProcessingPool {
  constructor(options = {}) {
    this.maxWorkers = options.maxWorkers || require('os').cpus().length;
    this.workers = [];
    this.taskQueue = [];
    this.activeWorkers = 0;
    this.initializeWorkers();
  }

  initializeWorkers() {
    for (let i = 0; i < this.maxWorkers; i++) {
      const worker = new Worker(__filename, {
        workerData: { workerId: i }
      });
      
      worker.on('message', (result) => {
        this.handleWorkerResult(worker, result);
      });
      
      worker.on('error', (error) => {
        this.handleWorkerError(worker, error);
      });
      
      this.workers.push({
        worker,
        busy: false,
        taskId: null
      });
    }
  }

  async processImage(imageBuffer, options = {}) {
    return new Promise((resolve, reject) => {
      const task = {
        id: this.generateTaskId(),
        imageBuffer,
        options,
        resolve,
        reject,
        timestamp: Date.now()
      };
      
      this.taskQueue.push(task);
      this.processNextTask();
    });
  }

  processNextTask() {
    if (this.taskQueue.length === 0) return;
    
    const availableWorker = this.workers.find(w => !w.busy);
    if (!availableWorker) return;
    
    const task = this.taskQueue.shift();
    availableWorker.busy = true;
    availableWorker.taskId = task.id;
    this.activeWorkers++;
    
    availableWorker.worker.postMessage({
      taskId: task.id,
      imageBuffer: task.imageBuffer,
      options: task.options
    });
  }

  handleWorkerResult(worker, result) {
    const task = this.taskQueue.find(t => t.id === result.taskId) ||
                  this.getPendingTask(result.taskId);
    
    if (task) {
      if (result.error) {
        task.reject(new Error(result.error));
      } else {
        task.resolve(result.processedImage);
      }
    }
    
    worker.busy = false;
    worker.taskId = null;
    this.activeWorkers--;
    
    // Process next task
    this.processNextTask();
  }

  getPoolStats() {
    return {
      totalWorkers: this.maxWorkers,
      activeWorkers: this.activeWorkers,
      queuedTasks: this.taskQueue.length,
      utilization: (this.activeWorkers / this.maxWorkers * 100).toFixed(2) + '%'
    };
  }
}

// Worker thread implementation
if (!isMainThread) {
  const sharp = require('sharp');
  
  parentPort.on('message', async (data) => {
    try {
      const { taskId, imageBuffer, options } = data;
      
      let processedImage = sharp(imageBuffer);
      
      // Apply processing options
      if (options.resize) {
        processedImage = processedImage.resize(options.resize.width, options.resize.height, {
          fit: options.resize.fit || 'cover'
        });
      }
      
      if (options.format) {
        switch (options.format) {
          case 'jpeg':
            processedImage = processedImage.jpeg({ quality: options.quality || 85 });
            break;
          case 'png':
            processedImage = processedImage.png({ compressionLevel: options.compression || 6 });
            break;
          case 'webp':
            processedImage = processedImage.webp({ quality: options.quality || 85 });
            break;
        }
      }
      
      const resultBuffer = await processedImage.toBuffer();
      
      parentPort.postMessage({
        taskId,
        processedImage: resultBuffer,
        originalSize: imageBuffer.length,
        processedSize: resultBuffer.length
      });
      
    } catch (error) {
      parentPort.postMessage({
        taskId: data.taskId,
        error: error.message
      });
    }
  });
}
```

---

## 6. Monitoring and Performance Metrics

### 6.1 Real-time Performance Monitoring

**Performance Metrics Collector:**
```js
class UploadPerformanceMonitor {
  constructor() {
    this.metrics = {
      uploads: {
        total: 0,
        successful: 0,
        failed: 0,
        active: 0
      },
      performance: {
        avgUploadTime: 0,
        avgProcessingTime: 0,
        totalBytesTransferred: 0,
        peakConcurrentUploads: 0
      },
      resources: {
        memoryUsage: 0,
        cpuUsage: 0,
        diskUsage: 0,
        networkBandwidth: 0
      }
    };
    
    this.uploadTimes = [];
    this.processingTimes = [];
    this.startMonitoring();
  }

  startMonitoring() {
    // Collect system metrics every 5 seconds
    setInterval(() => {
      this.collectSystemMetrics();
    }, 5000);
    
    // Calculate averages every minute
    setInterval(() => {
      this.calculateAverages();
    }, 60000);
  }

  recordUploadStart(uploadId, fileSize) {
    this.metrics.uploads.total++;
    this.metrics.uploads.active++;
    this.metrics.performance.totalBytesTransferred += fileSize;
    
    if (this.metrics.uploads.active > this.metrics.performance.peakConcurrentUploads) {
      this.metrics.performance.peakConcurrentUploads = this.metrics.uploads.active;
    }
  }

  recordUploadComplete(uploadId, uploadTime, processingTime = 0) {
    this.metrics.uploads.successful++;
    this.metrics.uploads.active--;
    this.uploadTimes.push(uploadTime);
    
    if (processingTime > 0) {
      this.processingTimes.push(processingTime);
    }
    
    // Keep only last 1000 measurements for rolling average
    if (this.uploadTimes.length > 1000) {
      this.uploadTimes.shift();
    }
    
    if (this.processingTimes.length > 1000) {
      this.processingTimes.shift();
    }
  }

  recordUploadFailure(uploadId, error) {
    this.metrics.uploads.failed++;
    this.metrics.uploads.active--;
    
    // Log error for analysis
    console.error(`Upload ${uploadId} failed:`, error);
  }

  collectSystemMetrics() {
    const memUsage = process.memoryUsage();
    const cpuUsage = process.cpuUsage();
    
    this.metrics.resources.memoryUsage = {
      rss: memUsage.rss,
      heapUsed: memUsage.heapUsed,
      heapTotal: memUsage.heapTotal,
      external: memUsage.external
    };
    
    this.metrics.resources.cpuUsage = {
      user: cpuUsage.user,
      system: cpuUsage.system
    };
  }

  calculateAverages() {
    if (this.uploadTimes.length > 0) {
      this.metrics.performance.avgUploadTime = 
        this.uploadTimes.reduce((a, b) => a + b, 0) / this.uploadTimes.length;
    }
    
    if (this.processingTimes.length > 0) {
      this.metrics.performance.avgProcessingTime = 
        this.processingTimes.reduce((a, b) => a + b, 0) / this.processingTimes.length;
    }
  }

  getMetrics() {
    return {
      ...this.metrics,
      successRate: this.metrics.uploads.total > 0 
        ? (this.metrics.uploads.successful / this.metrics.uploads.total * 100).toFixed(2) + '%'
        : '0%',
      avgUploadSpeed: this.metrics.performance.avgUploadTime > 0
        ? (this.metrics.performance.totalBytesTransferred / this.metrics.performance.avgUploadTime / 1024 / 1024).toFixed(2) + ' MB/s'
        : '0 MB/s'
    };
  }

  getHealthStatus() {
    const metrics = this.getMetrics();
    const health = {
      status: 'healthy',
      issues: []
    };
    
    // Check memory usage
    if (metrics.resources.memoryUsage.heapUsed / metrics.resources.memoryUsage.heapTotal > 0.9) {
      health.status = 'critical';
      health.issues.push('High memory usage');
    }
    
    // Check failure rate
    const failureRate = parseFloat(metrics.successRate);
    if (failureRate < 95) {
      health.status = 'degraded';
      health.issues.push('High failure rate');
    }
    
    // Check average upload time
    if (metrics.performance.avgUploadTime > 30000) { // 30 seconds
      health.status = 'degraded';
      health.issues.push('Slow upload speeds');
    }
    
    return health;
  }
}
```

### 6.2 Performance Optimization Alerts

**Alert System for Performance Issues:**
```js
class PerformanceAlertSystem {
  constructor(monitor, notificationService) {
    this.monitor = monitor;
    this.notificationService = notificationService;
    this.thresholds = {
      maxMemoryUsage: 0.85, // 85%
      maxFailureRate: 0.05, // 5%
      maxAvgUploadTime: 20000, // 20 seconds
      maxConcurrentUploads: 1000,
      minDiskSpace: 10 * 1024 * 1024 * 1024 // 10GB
    };
    
    this.alertCooldowns = new Map();
    this.startMonitoring();
  }

  startMonitoring() {
    setInterval(() => {
      this.checkPerformanceThresholds();
    }, 10000); // Check every 10 seconds
  }

  async checkPerformanceThresholds() {
    const metrics = this.monitor.getMetrics();
    const now = Date.now();
    
    // Check memory usage
    const memoryUsage = metrics.resources.memoryUsage.heapUsed / metrics.resources.memoryUsage.heapTotal;
    if (memoryUsage > this.thresholds.maxMemoryUsage) {
      await this.sendAlert('high_memory_usage', {
        current: (memoryUsage * 100).toFixed(2) + '%',
        threshold: (this.thresholds.maxMemoryUsage * 100) + '%',
        recommendation: 'Consider scaling up or optimizing memory usage'
      }, now);
    }
    
    // Check failure rate
    const failureRate = 1 - (parseFloat(metrics.successRate) / 100);
    if (failureRate > this.thresholds.maxFailureRate) {
      await this.sendAlert('high_failure_rate', {
        current: (failureRate * 100).toFixed(2) + '%',
        threshold: (this.thresholds.maxFailureRate * 100) + '%',
        recommendation: 'Check upload logs for common error patterns'
      }, now);
    }
    
    // Check average upload time
    if (metrics.performance.avgUploadTime > this.thresholds.maxAvgUploadTime) {
      await this.sendAlert('slow_upload_speeds', {
        current: (metrics.performance.avgUploadTime / 1000).toFixed(2) + 's',
        threshold: (this.thresholds.maxAvgUploadTime / 1000) + 's',
        recommendation: 'Check network bandwidth and server resources'
      }, now);
    }
    
    // Check concurrent uploads
    if (metrics.uploads.active > this.thresholds.maxConcurrentUploads) {
      await this.sendAlert('high_concurrent_uploads', {
        current: metrics.uploads.active,
        threshold: this.thresholds.maxConcurrentUploads,
        recommendation: 'Consider scaling horizontally or implementing rate limiting'
      }, now);
    }
  }

  async sendAlert(alertType, data, timestamp) {
    const cooldownKey = alertType;
    const lastAlert = this.alertCooldowns.get(cooldownKey);
    
    // Prevent alert spam (cooldown period: 5 minutes)
    if (lastAlert && timestamp - lastAlert < 300000) {
      return;
    }
    
    this.alertCooldowns.set(cooldownKey, timestamp);
    
    const alert = {
      type: alertType,
      severity: this.getAlertSeverity(alertType),
      timestamp: new Date(timestamp).toISOString(),
      data,
      service: 'upload-service'
    };
    
    try {
      await this.notificationService.sendAlert(alert);
      console.warn('Performance alert sent:', alert);
    } catch (error) {
      console.error('Failed to send alert:', error);
    }
  }

  getAlertSeverity(alertType) {
    const severities = {
      'high_memory_usage': 'critical',
      'high_failure_rate': 'critical',
      'slow_upload_speeds': 'warning',
      'high_concurrent_uploads': 'warning'
    };
    
    return severities[alertType] || 'info';
  }
}
```

---

## Interview-Oriented Notes

**Performance Topics to Master:**

1. **Storage Engine Selection**: Memory vs Disk vs Hybrid strategies
2. **Streaming vs Buffering**: When to use each approach
3. **Concurrency Management**: Connection pooling and rate limiting
4. **Horizontal Scaling**: Stateless architecture and load balancing
5. **Resource Optimization**: Memory pools and worker threads
6. **Monitoring**: Real-time metrics and alerting systems

**Common Performance Interview Questions:**

- "How would you optimize file upload performance for high traffic?"
- "What's the difference between streaming and buffered uploads?"
- "How do you handle memory management for large file uploads?"
- "Design a scalable upload system that can handle 10,000 concurrent uploads"
- "How would you monitor and optimize upload performance in production?"

**Key Performance Optimization Techniques:**

- Use streaming for files > 10MB to minimize memory usage
- Implement connection pooling to manage concurrent uploads
- Apply rate limiting to prevent resource exhaustion
- Use worker threads for CPU-intensive processing
- Monitor key metrics and set up automated alerts
- Design stateless architecture for horizontal scaling

**Production Performance Considerations:**

- Always measure before optimizing
- Consider the full pipeline: network → server → storage
- Implement proper monitoring and alerting
- Plan for horizontal scaling from the start
- Use appropriate storage for different file types and sizes
- Implement circuit breakers and graceful degradation

[← Production Best Practices](./05_production.md) | [Next → Comparisons](./08_comparisons.md)
