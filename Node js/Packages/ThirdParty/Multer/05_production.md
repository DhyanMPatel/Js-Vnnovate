# 🚀 Production-Level Best Practices

## 1. Never Store Files in Project Root

### The Problem with Project Root Storage

**Why It's Dangerous:**
```bash
# ❌ BAD - Files in project root
my-app/
├── uploads/           # Vulnerable directory
├── node_modules/
├── src/
├── package.json
└── server.js
```

**Security Risks:**
- **Directory Traversal**: `../../../etc/passwd`
- **Code Execution**: Uploaded scripts can be executed
- **Version Control**: Files accidentally committed to Git
- **Deployment Issues**: Files lost during deployments
- **Server Exposure**: Direct access via web server

### Secure Directory Structure

**Production-Ready Structure:**
```bash
# ✅ GOOD - Secure file organization
/var/www/my-app/
├── current/           # Application code
│   ├── src/
│   ├── package.json
│   └── server.js
├── shared/            # Shared storage
│   ├── uploads/
│   │   ├── images/
│   │   ├── documents/
│   │   └── temp/
│   └── logs/
├── releases/          # Deployment history
└── backup/           # File backups
```

**Implementation:**
```js
const path = require('path');
const fs = require('fs');

class ProductionStorage {
  constructor() {
    this.baseDir = process.env.UPLOAD_DIR || '/var/www/uploads';
    this.directories = {
      images: path.join(this.baseDir, 'images'),
      documents: path.join(this.baseDir, 'documents'),
      temp: path.join(this.baseDir, 'temp'),
      quarantine: path.join(this.baseDir, 'quarantine')
    };
    
    this.initializeDirectories();
  }

  initializeDirectories() {
    Object.values(this.directories).forEach(dir => {
      fs.mkdirSync(dir, { recursive: true });
      // Secure permissions: owner read/write/execute, group/others read/execute
      fs.chmodSync(dir, 0o755);
    });
  }

  getStoragePath(fileType) {
    const dir = this.directories[fileType] || this.directories.temp;
    return dir;
  }

  generateSecurePath(fileType, filename) {
    const crypto = require('crypto');
    const ext = path.extname(filename);
    const hash = crypto.randomBytes(16).toString('hex');
    const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    
    return path.join(
      this.getStoragePath(fileType),
      date,
      `${hash}${ext}`
    );
  }
}

const productionStorage = new ProductionStorage();

const secureUpload = multer.diskStorage({
  destination: (req, file, cb) => {
    const fileType = getFileType(file.mimetype);
    const fullPath = productionStorage.generateSecurePath(fileType, file.originalname);
    const dir = path.dirname(fullPath);
    
    // Ensure date directory exists
    fs.mkdirSync(dir, { recursive: true });
    fs.chmodSync(dir, 0o755);
    
    cb(null, dir);
  },
  
  filename: (req, file, cb) => {
    const crypto = require('crypto');
    const ext = path.extname(file.originalname);
    const hash = crypto.randomBytes(16).toString('hex');
    
    cb(null, `${hash}${ext}`);
  }
});
```

---

## 2. Use Cloud Storage (AWS S3, GCS, Azure Blob)

### Why Cloud Storage is Essential

**Benefits Over Local Storage:**
- **Scalability**: Virtually unlimited storage
- **Durability**: 99.999999999% durability (S3)
- **Availability**: 99.99% uptime SLA
- **CDN Integration**: Global content delivery
- **Backup & Recovery**: Built-in redundancy
- **Cost Efficiency**: Pay-as-you-go pricing

### AWS S3 Integration

```js
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

class S3StorageService {
  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION
    });
    
    this.bucket = process.env.S3_BUCKET;
    this.setupMulterS3();
  }

  setupMulterS3() {
    this.upload = multer({
      storage: multerS3({
        s3: this.s3,
        bucket: this.bucket,
        metadata: (req, file, cb) => {
          cb(null, {
            fieldName: file.fieldname,
            originalName: file.originalname,
            mimeType: file.mimetype,
            size: file.size,
            uploadedAt: new Date().toISOString(),
            userId: req.user?.id || 'anonymous'
          });
        },
        key: (req, file, cb) => {
          const key = this.generateS3Key(req, file);
          cb(null, key);
        },
        contentType: multerS3.AUTO_CONTENT_TYPE,
        cacheControl: 'max-age=31536000', // 1 year cache
        serverSideEncryption: 'AES256',
        acl: 'private'
      }),
      limits: {
        fileSize: 100 * 1024 * 1024, // 100MB
        files: 5
      },
      fileFilter: this.fileFilter.bind(this)
    });
  }

  generateS3Key(req, file) {
    const userId = req.user?.id || 'anonymous';
    const fileType = this.getFileType(file.mimetype);
    const date = new Date().toISOString().split('T')[0];
    const crypto = require('crypto');
    const hash = crypto.randomBytes(8).toString('hex');
    const ext = require('path').extname(file.originalname);
    
    return `uploads/${userId}/${fileType}/${date}/${hash}${ext}`;
  }

  getFileType(mimetype) {
    if (mimetype.startsWith('image/')) return 'images';
    if (mimetype.startsWith('video/')) return 'videos';
    if (mimetype.includes('pdf') || mimetype.includes('document')) return 'documents';
    return 'others';
  }

  async fileFilter(req, file, cb) {
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'application/pdf', 'application/msword',
      'video/mp4', 'video/quicktime'
    ];
    
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('File type not allowed'), false);
    }
    
    cb(null, true);
  }

  // Generate signed URL for secure access
  async getSignedUrl(key, expiresIn = 3600) {
    return await this.s3.getSignedUrl('getObject', {
      Bucket: this.bucket,
      Key: key,
      Expires: expiresIn
    });
  }

  // Copy file to different location
  async copyFile(sourceKey, destinationKey) {
    await this.s3.copyObject({
      Bucket: this.bucket,
      CopySource: `${this.bucket}/${sourceKey}`,
      Key: destinationKey
    }).promise();
  }

  // Delete file
  async deleteFile(key) {
    await this.s3.deleteObject({
      Bucket: this.bucket,
      Key: key
    }).promise();
  }
}

const s3Storage = new S3StorageService();

// Usage in routes
app.post('/upload', 
  authenticate,
  s3Storage.upload.single('file'),
  async (req, res) => {
    try {
      const file = req.file;
      
      // Save metadata to database
      const fileRecord = await File.create({
        userId: req.user.id,
        originalName: file.originalname,
        s3Key: file.key,
        s3Location: file.location,
        size: file.size,
        mimeType: file.mimetype,
        metadata: file.metadata
      });
      
      res.json({
        id: fileRecord.id,
        url: file.location,
        key: file.key,
        size: file.size
      });
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);
```

### Google Cloud Storage Integration

```js
const { Storage } = require('@google-cloud/storage');

class GCSStorageService {
  constructor() {
    this.storage = new Storage({
      projectId: process.env.GCP_PROJECT_ID,
      keyFilename: process.env.GCP_KEY_FILE
    });
    
    this.bucket = this.storage.bucket(process.env.GCS_BUCKET);
  }

  async uploadFile(buffer, filename, metadata) {
    const file = this.bucket.file(filename);
    
    const stream = file.createWriteStream({
      metadata: {
        contentType: metadata.contentType,
        metadata: metadata
      }
    });

    return new Promise((resolve, reject) => {
      stream.on('error', reject);
      stream.on('finish', () => {
        resolve({
          filename: file.name,
          publicUrl: `https://storage.googleapis.com/${this.bucket.name}/${file.name}`
        });
      });
      
      stream.end(buffer);
    });
  }

  async getSignedUrl(filename, expiresIn = 3600) {
    const options = {
      version: 'v4',
      action: 'read',
      expires: Date.now() + expiresIn * 1000
    };

    const [url] = await this.bucket.file(filename).getSignedUrl(options);
    return url;
  }
}
```

---

## 3. Use Presigned URLs

### What are Presigned URLs?

**Concept**: Temporary, authenticated URLs that allow direct uploads/downloads to cloud storage without exposing credentials.

**Benefits:**
- **Security**: No AWS credentials on client side
- **Scalability**: Direct uploads to S3, bypassing your server
- **Performance**: Faster uploads (direct to cloud)
- **Cost Efficiency**: Reduced server bandwidth usage

### Presigned URL Upload Implementation

```js
class PresignedUploadService {
  constructor() {
    this.s3 = new AWS.S3();
    this.bucket = process.env.S3_BUCKET;
    this.redis = Redis.createClient();
  }

  // Generate presigned upload URL
  async generateUploadUrl(userId, fileData) {
    const { filename, contentType, size } = fileData;
    
    // Validate request
    await this.validateUploadRequest(userId, fileData);
    
    // Generate unique key
    const key = await this.generateFileKey(userId, filename);
    
    // Create file record in database
    const fileRecord = await File.create({
      userId,
      originalName: filename,
      s3Key: key,
      contentType,
      size,
      status: 'pending',
      createdAt: new Date()
    });
    
    // Generate presigned URL
    const uploadParams = {
      Bucket: this.bucket,
      Key: key,
      ContentType: contentType,
      ContentLength: size,
      Expires: 3600, // 1 hour
      ACL: 'private',
      Metadata: {
        originalName: filename,
        userId: userId.toString(),
        fileId: fileRecord.id.toString()
      }
    };
    
    const uploadUrl = await this.s3.getSignedUrl('putObject', uploadParams);
    
    // Cache upload info for completion verification
    await this.redis.setex(
      `upload:${fileRecord.id}`,
      3600,
      JSON.stringify({
        key,
        expectedSize: size,
        contentType,
        userId
      })
    );
    
    return {
      uploadUrl,
      fileId: fileRecord.id,
      key,
      expiresIn: 3600
    };
  }

  // Handle upload completion
  async handleUploadComplete(fileId, userId) {
    try {
      // Verify upload info
      const uploadInfo = await this.redis.get(`upload:${fileId}`);
      if (!uploadInfo) {
        throw new Error('Upload session expired');
      }
      
      const { key, expectedSize, contentType } = JSON.parse(uploadInfo);
      
      // Verify file exists in S3
      const headObject = await this.s3.headObject({
        Bucket: this.bucket,
        Key: key
      }).promise();
      
      // Validate uploaded file
      if (headObject.ContentLength !== expectedSize) {
        throw new Error('File size mismatch');
      }
      
      if (headObject.ContentType !== contentType) {
        throw new Error('Content type mismatch');
      }
      
      // Update file record
      const fileRecord = await File.findByIdAndUpdate(
        fileId,
        {
          status: 'completed',
          size: headObject.ContentLength,
          etag: headObject.ETag,
          completedAt: new Date()
        },
        { new: true }
      );
      
      // Generate access URL
      const accessUrl = await this.generateAccessUrl(key);
      
      // Cleanup redis
      await this.redis.del(`upload:${fileId}`);
      
      return {
        file: fileRecord,
        accessUrl
      };
      
    } catch (error) {
      // Mark as failed
      await File.findByIdAndUpdate(fileId, {
        status: 'failed',
        error: error.message
      });
      
      throw error;
    }
  }

  async generateAccessUrl(key, expiresIn = 3600) {
    const params = {
      Bucket: this.bucket,
      Key: key,
      Expires: expiresIn
    };
    
    return await this.s3.getSignedUrl('getObject', params);
  }

  async generateFileKey(userId, filename) {
    const crypto = require('crypto');
    const ext = require('path').extname(filename);
    const hash = crypto.randomBytes(16).toString('hex');
    const date = new Date().toISOString().split('T')[0];
    
    return `uploads/${userId}/${date}/${hash}${ext}`;
  }

  async validateUploadRequest(userId, fileData) {
    // Check user upload limits
    const todayUploads = await File.countDocuments({
      userId,
      createdAt: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0))
      }
    });
    
    const dailyLimit = await this.getUserDailyLimit(userId);
    if (todayUploads >= dailyLimit) {
      throw new Error('Daily upload limit exceeded');
    }
    
    // Check file size limits
    const maxFileSize = await this.getUserMaxFileSize(userId);
    if (fileData.size > maxFileSize) {
      throw new Error(`File size exceeds limit of ${maxFileSize / 1024 / 1024}MB`);
    }
  }
}

// API endpoints
const presignedService = new PresignedUploadService();

app.post('/upload/request', authenticate, async (req, res) => {
  try {
    const { filename, contentType, size } = req.body;
    const userId = req.user.id;
    
    const uploadData = await presignedService.generateUploadUrl(userId, {
      filename,
      contentType,
      size
    });
    
    res.json(uploadData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/upload/complete', authenticate, async (req, res) => {
  try {
    const { fileId } = req.body;
    const userId = req.user.id;
    
    const result = await presignedService.handleUploadComplete(fileId, userId);
    
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
```

---

## 4. Stream Uploads Instead of Buffering

### Why Streaming is Better

**Buffering Problems:**
- High memory usage
- Limited file size
- Server blocking
- Poor scalability

**Streaming Benefits:**
- Low memory footprint
- Unlimited file size
- Non-blocking I/O
- Better performance

### Streaming Implementation with Multer

```js
const { PassThrough } = require('stream');
const crypto = require('crypto');

class StreamingUploadService {
  constructor() {
    this.s3 = new AWS.S3();
    this.bucket = process.env.S3_BUCKET;
  }

  // Custom storage engine for streaming
  createStreamStorage() {
    return {
      _handleFile: (req, file, cb) => {
        this.handleFileStream(req, file, cb);
      },
      
      _removeFile: (req, file, cb) => {
        this.removeFileStream(file, cb);
      }
    };
  }

  async handleFileStream(req, file, cb) {
    try {
      const key = this.generateStreamKey(req, file);
      
      // Create S3 upload stream
      const passThrough = new PassThrough();
      const uploadStream = this.s3.upload({
        Bucket: this.bucket,
        Key: key,
        Body: passThrough,
        ContentType: file.mimetype,
        ACL: 'private'
      });
      
      // Pipe file stream to S3
      file.stream.pipe(passThrough);
      
      // Handle upload completion
      uploadStream.send((err, data) => {
        if (err) {
          return cb(err);
        }
        
        cb(null, {
          key,
          location: data.Location,
          etag: data.ETag,
          bucket: data.Bucket
        });
      });
      
    } catch (error) {
      cb(error);
    }
  }

  generateStreamKey(req, file) {
    const userId = req.user?.id || 'anonymous';
    const hash = crypto.randomBytes(8).toString('hex');
    const ext = require('path').extname(file.originalname);
    const timestamp = Date.now();
    
    return `streams/${userId}/${timestamp}-${hash}${ext}`;
  }

  async removeFileStream(file, cb) {
    try {
      await this.s3.deleteObject({
        Bucket: this.bucket,
        Key: file.key
      }).promise();
      cb(null);
    } catch (error) {
      cb(error);
    }
  }
}

// Usage
const streamingService = new StreamingUploadService();
const streamUpload = multer({ 
  storage: streamingService.createStreamStorage(),
  limits: {
    fileSize: 1024 * 1024 * 1024 // 1GB
  }
});

app.post('/upload-stream',
  authenticate,
  streamUpload.single('file'),
  async (req, res) => {
    try {
      const file = req.file;
      
      // Save file metadata
      const fileRecord = await File.create({
        userId: req.user.id,
        originalName: req.file.originalname,
        s3Key: file.key,
        s3Location: file.location,
        size: req.file.size,
        mimeType: req.file.mimetype,
        uploadType: 'streaming'
      });
      
      res.json({
        id: fileRecord.id,
        location: file.location,
        size: req.file.size
      });
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);
```

---

## 5. Implement Retry Mechanism

### Why Retry is Important

**Common Failure Scenarios:**
- Network interruptions
- S3 temporary failures
- Rate limiting
- Server timeouts
- Database connection issues

### Exponential Backoff Retry

```js
class RetryableUploadService {
  constructor() {
    this.s3 = new AWS.S3();
    this.maxRetries = 3;
    this.baseDelay = 1000; // 1 second
  }

  async uploadWithRetry(params, attempt = 1) {
    try {
      const result = await this.s3.upload(params).promise();
      return result;
    } catch (error) {
      if (attempt >= this.maxRetries || !this.isRetryableError(error)) {
        throw error;
      }
      
      const delay = this.calculateDelay(attempt);
      console.log(`Upload failed, retrying in ${delay}ms (attempt ${attempt})`);
      
      await this.sleep(delay);
      return this.uploadWithRetry(params, attempt + 1);
    }
  }

  isRetryableError(error) {
    const retryableCodes = [
      'NetworkingError',
      'TimeoutError',
      'RequestTimeout',
      'ServiceUnavailable',
      'SlowDown',
      'RequestLimitExceeded'
    ];
    
    return retryableCodes.includes(error.code) || 
           error.statusCode >= 500 ||
           error.statusCode === 429; // Rate limiting
  }

  calculateDelay(attempt) {
    // Exponential backoff with jitter
    const exponentialDelay = this.baseDelay * Math.pow(2, attempt - 1);
    const jitter = Math.random() * 0.1 * exponentialDelay;
    return Math.floor(exponentialDelay + jitter);
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Queue-based retry for failed uploads
  async retryFailedUpload(fileId) {
    const fileRecord = await File.findById(fileId);
    
    if (!fileRecord || fileRecord.status !== 'failed') {
      throw new Error('Invalid file for retry');
    }
    
    try {
      // Get file content from temporary storage
      const fileBuffer = await this.getTempFile(fileRecord.tempPath);
      
      // Retry upload
      const result = await this.uploadWithRetry({
        Bucket: process.env.S3_BUCKET,
        Key: fileRecord.s3Key,
        Body: fileBuffer,
        ContentType: fileRecord.mimeType,
        ACL: 'private'
      });
      
      // Update file record
      await File.findByIdAndUpdate(fileId, {
        status: 'completed',
        s3Location: result.Location,
        etag: result.ETag,
        completedAt: new Date(),
        retryCount: (fileRecord.retryCount || 0) + 1
      });
      
      // Cleanup temporary file
      await this.cleanupTempFile(fileRecord.tempPath);
      
      return result;
      
    } catch (error) {
      // Update failure count
      await File.findByIdAndUpdate(fileId, {
        $inc: { retryCount: 1 },
        lastError: error.message,
        lastRetryAt: new Date()
      });
      
      throw error;
    }
  }
}

// Bull queue for retry processing
const Queue = require('bull');
const retryQueue = new Queue('upload-retries');

retryQueue.process('retry-upload', async (job) => {
  const { fileId } = job.data;
  const retryService = new RetryableUploadService();
  
  try {
    await retryService.retryFailedUpload(fileId);
    console.log(`Successfully retried upload for file ${fileId}`);
  } catch (error) {
    console.error(`Retry failed for file ${fileId}:`, error);
    throw error;
  }
});

// Add failed uploads to retry queue
const scheduleRetry = async (fileId, delay = 0) => {
  await retryQueue.add('retry-upload', { fileId }, {
    delay: delay,
    attempts: 3,
    backoff: 'exponential'
  });
};
```

---

## 6. Logging and Monitoring

### Comprehensive Upload Logging

```js
const winston = require('winston');
const { ElasticsearchTransport } = require('winston-elasticsearch');

class UploadLogger {
  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ 
          filename: 'logs/upload-error.log', 
          level: 'error' 
        }),
        new winston.transports.File({ 
          filename: 'logs/upload.log' 
        }),
        new ElasticsearchTransport({
          level: 'info',
          clientOpts: {
            node: process.env.ELASTICSEARCH_URL
          },
          index: 'upload-logs'
        })
      ]
    });
  }

  logUploadStart(req, file) {
    this.logger.info('Upload started', {
      type: 'upload_start',
      userId: req.user?.id,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      file: {
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size
      },
      timestamp: new Date()
    });
  }

  logUploadSuccess(req, file, result) {
    this.logger.info('Upload completed', {
      type: 'upload_success',
      userId: req.user?.id,
      file: {
        originalName: file.originalname,
        size: file.size,
        location: result.location,
        key: result.key
      },
      processingTime: Date.now() - req.startTime,
      timestamp: new Date()
    });
  }

  logUploadError(req, file, error) {
    this.logger.error('Upload failed', {
      type: 'upload_error',
      userId: req.user?.id,
      file: {
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size
      },
      error: {
        message: error.message,
        stack: error.stack,
        code: error.code
      },
      timestamp: new Date()
    });
  }

  logSecurityIncident(req, file, incident) {
    this.logger.warn('Security incident', {
      type: 'security_incident',
      userId: req.user?.id,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      file: {
        originalName: file.originalname,
        mimeType: file.mimetype
      },
      incident: {
        type: incident.type,
        details: incident.details,
        severity: incident.severity
      },
      timestamp: new Date()
    });
  }
}

// Metrics collection
class UploadMetrics {
  constructor() {
    this.prometheus = require('prom-client');
    
    // Create metrics
    this.uploadCounter = new this.prometheus.Counter({
      name: 'uploads_total',
      help: 'Total number of uploads',
      labelNames: ['status', 'file_type', 'user_type']
    });
    
    this.uploadDuration = new this.prometheus.Histogram({
      name: 'upload_duration_seconds',
      help: 'Upload duration in seconds',
      labelNames: ['file_type'],
      buckets: [0.1, 0.5, 1, 2, 5, 10, 30]
    });
    
    this.uploadSize = new this.prometheus.Histogram({
      name: 'upload_size_bytes',
      help: 'Upload size in bytes',
      labelNames: ['file_type'],
      buckets: [1024, 10240, 102400, 1048576, 10485760, 104857600]
    });
    
    this.activeUploads = new this.prometheus.Gauge({
      name: 'active_uploads',
      help: 'Number of active uploads'
    });
  }

  recordUploadStart(req, file) {
    this.activeUploads.inc();
    req.startTime = Date.now();
  }

  recordUploadSuccess(req, file) {
    const duration = (Date.now() - req.startTime) / 1000;
    const fileType = this.getFileType(file.mimetype);
    const userType = req.user?.type || 'anonymous';
    
    this.uploadCounter.inc({
      status: 'success',
      file_type: fileType,
      user_type: userType
    });
    
    this.uploadDuration.observe(fileType, duration);
    this.uploadSize.observe(fileType, file.size);
    this.activeUploads.dec();
  }

  recordUploadError(req, file) {
    const fileType = this.getFileType(file.mimetype);
    const userType = req.user?.type || 'anonymous';
    
    this.uploadCounter.inc({
      status: 'error',
      file_type: fileType,
      user_type: userType
    });
    
    this.activeUploads.dec();
  }

  getFileType(mimetype) {
    if (mimetype.startsWith('image/')) return 'image';
    if (mimetype.startsWith('video/')) return 'video';
    if (mimetype.includes('pdf')) return 'pdf';
    return 'other';
  }
}

// Middleware for logging and metrics
const uploadLogger = new UploadLogger();
const uploadMetrics = new UploadMetrics();

const uploadMiddleware = (req, res, next) => {
  uploadLogger.logUploadStart(req, req.file);
  uploadMetrics.recordUploadStart(req, req.file);
  
  // Override res.json to log responses
  const originalJson = res.json;
  res.json = function(data) {
    if (res.statusCode >= 400) {
      uploadLogger.logUploadError(req, req.file, new Error(data.error || 'Upload failed'));
      uploadMetrics.recordUploadError(req, req.file);
    } else {
      uploadLogger.logUploadSuccess(req, req.file, data);
      uploadMetrics.recordUploadSuccess(req, req.file);
    }
    return originalJson.call(this, data);
  };
  
  next();
};
```

---

## 7. Centralized Upload Service

### Microservice Architecture

```js
// upload-service/src/app.js
class UploadService {
  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
    this.setupMonitoring();
  }

  setupMiddleware() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(helmet());
    
    // Authentication middleware
    this.app.use(this.authenticate.bind(this));
    
    // Rate limiting
    this.app.use(this.rateLimiter());
    
    // Request logging
    this.app.use(this.requestLogger());
  }

  setupRoutes() {
    // Health check
    this.app.get('/health', (req, res) => {
      res.json({ status: 'healthy', timestamp: new Date() });
    });
    
    // Upload endpoints
    this.app.post('/upload/single', 
      this.validateUpload,
      this.upload.single('file'),
      this.handleSingleUpload.bind(this)
    );
    
    this.app.post('/upload/multiple',
      this.validateUpload,
      this.upload.array('files', 10),
      this.handleMultipleUpload.bind(this)
    );
    
    // Presigned URL endpoints
    this.app.post('/upload/presigned',
      this.validatePresignedRequest,
      this.generatePresignedUrl.bind(this)
    );
    
    // File management endpoints
    this.app.get('/files/:id', this.getFile.bind(this));
    this.app.delete('/files/:id', this.deleteFile.bind(this));
    this.app.get('/files', this.listFiles.bind(this));
  }

  async handleSingleUpload(req, res) {
    try {
      const file = req.file;
      const userId = req.user.id;
      
      // Process file (validation, virus scan, etc.)
      const processedFile = await this.processFile(file, userId);
      
      // Store metadata
      const fileRecord = await this.saveFileMetadata(processedFile, userId);
      
      // Publish events
      await this.eventBus.publish('file.uploaded', {
        fileId: fileRecord.id,
        userId,
        fileUrl: processedFile.url
      });
      
      res.json({
        id: fileRecord.id,
        url: processedFile.url,
        size: file.size,
        mimeType: file.mimetype
      });
      
    } catch (error) {
      this.logger.error('Single upload failed', { error, userId: req.user.id });
      res.status(500).json({ error: error.message });
    }
  }

  async processFile(file, userId) {
    // 1. Security validation
    await this.securityValidator.validate(file);
    
    // 2. Virus scanning
    await this.virusScanner.scan(file.buffer);
    
    // 3. Image processing (if applicable)
    if (file.mimetype.startsWith('image/')) {
      const processedImages = await this.imageProcessor.process(file);
      return processedImages;
    }
    
    // 4. Upload to cloud storage
    const storageResult = await this.storageService.upload(file, userId);
    
    return storageResult;
  }

  // Service discovery and registration
  async registerWithServiceRegistry() {
    const registry = new ServiceRegistry();
    
    await registry.register({
      name: 'upload-service',
      version: '1.0.0',
      port: process.env.PORT,
      health: '/health',
      endpoints: [
        '/upload/single',
        '/upload/multiple',
        '/upload/presigned',
        '/files/:id'
      ]
    });
  }
}

// Docker configuration
// Dockerfile
/*
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

USER node

CMD ["npm", "start"]
*/

// docker-compose.yml
/*
version: '3.8'

services:
  upload-service:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
      - AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
      - S3_BUCKET=${S3_BUCKET}
      - REDIS_URL=${REDIS_URL}
    depends_on:
      - redis
      - elasticsearch
    
  redis:
    image: redis:6-alpine
    ports:
      - "6379:6379"
    
  elasticsearch:
    image: elasticsearch:7.14.0
    environment:
      - discovery.type=single-node
    ports:
      - "9200:9200"
*/
```

---

## 8. Metadata Storage in Database

### Database Schema Design

```js
// models/File.js
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  // Basic file information
  originalName: {
    type: String,
    required: true,
    maxlength: 255
  },
  filename: {
    type: String,
    required: true,
    unique: true
  },
  mimeType: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true,
    min: 0
  },
  
  // Storage information
  storageProvider: {
    type: String,
    enum: ['s3', 'gcs', 'azure', 'local'],
    required: true
  },
  storageKey: {
    type: String,
    required: true
  },
  storageUrl: {
    type: String,
    required: true
  },
  
  // Ownership and access
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    index: true
  },
  
  // Access control
  isPublic: {
    type: Boolean,
    default: false
  },
  accessLevel: {
    type: String,
    enum: ['private', 'team', 'organization', 'public'],
    default: 'private'
  },
  permissions: [{
    userId: mongoose.Schema.Types.ObjectId,
    level: {
      type: String,
      enum: ['read', 'write', 'admin']
    }
  }],
  
  // Processing status
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending',
    index: true
  },
  processingSteps: [{
    step: String,
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed']
    },
    startedAt: Date,
    completedAt: Date,
    error: String
  }],
  
  // File metadata
  metadata: {
    width: Number,
    height: Number,
    duration: Number, // for videos
    pages: Number,   // for documents
    encoding: String,
    checksum: String
  },
  
  // Image-specific data
  image: {
    thumbnails: [{
      size: String, // 'small', 'medium', 'large'
      url: String,
      width: Number,
      height: Number
    }],
    dominantColors: [String],
    exif: mongoose.Schema.Types.Mixed
  },
  
  // Video-specific data
  video: {
    duration: Number,
    bitrate: Number,
    fps: Number,
    resolution: {
      width: Number,
      height: Number
    },
    thumbnails: [{
      timestamp: Number,
      url: String
    }],
    streams: [{
      type: String, // 'video', 'audio'
      codec: String,
      bitrate: Number
    }]
  },
  
  // Document-specific data
  document: {
    pageCount: Number,
    wordCount: Number,
    extractedText: String,
    language: String
  },
  
  // Security and compliance
  virusScan: {
    scanned: Boolean,
    scannedAt: Date,
    result: {
      type: String,
      enum: ['clean', 'infected', 'suspicious']
    },
    threats: [String]
  },
  
  // Usage analytics
  downloadCount: {
    type: Number,
    default: 0
  },
  lastAccessedAt: Date,
  
  // Versioning
  version: {
    type: Number,
    default: 1
  },
  parentFile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File'
  },
  
  // Tags and categorization
  tags: [{
    type: String,
    index: true
  }],
  category: {
    type: String,
    index: true
  },
  
  // Soft delete
  isDeleted: {
    type: Boolean,
    default: false,
    index: true
  },
  deletedAt: Date,
  deletedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: Date
}, {
  timestamps: true
});

// Indexes for performance
fileSchema.index({ userId: 1, createdAt: -1 });
fileSchema.index({ organizationId: 1, createdAt: -1 });
fileSchema.index({ status: 1, createdAt: -1 });
fileSchema.index({ mimeType: 1 });
fileSchema.index({ tags: 1 });
fileSchema.index({ 'storageKey': 1 });

// Virtual fields
fileSchema.virtual('isExpired').get(function() {
  return this.expiresAt && this.expiresAt < new Date();
});

fileSchema.virtual('publicUrl').get(function() {
  if (this.isPublic) {
    return this.storageUrl;
  }
  return null;
});

// Methods
fileSchema.methods.generatePresignedUrl = async function(expiresIn = 3600) {
  if (this.storageProvider === 's3') {
    const s3 = new AWS.S3();
    return await s3.getSignedUrl('getObject', {
      Bucket: process.env.S3_BUCKET,
      Key: this.storageKey,
      Expires: expiresIn
    });
  }
  // Add other providers...
};

fileSchema.methods.canAccess = function(userId, requiredLevel = 'read') {
  // Owner has full access
  if (this.userId.toString() === userId.toString()) {
    return true;
  }
  
  // Check explicit permissions
  const permission = this.permissions.find(p => 
    p.userId.toString() === userId.toString()
  );
  
  if (permission) {
    const levels = ['read', 'write', 'admin'];
    return levels.indexOf(permission.level) >= levels.indexOf(requiredLevel);
  }
  
  // Check organization access
  if (this.organizationId && this.accessLevel === 'organization') {
    // Check if user is member of organization
    return this.checkOrganizationMembership(userId, this.organizationId);
  }
  
  return false;
};

module.exports = mongoose.model('File', fileSchema);
```

---

## Interview-Oriented Notes

**Production Best Practices to Master:**

1. **Cloud Storage**: Never use local storage in production
2. **Presigned URLs**: Secure direct uploads to cloud storage
3. **Streaming**: Handle large files without memory issues
4. **Retry Logic**: Handle transient failures gracefully
5. **Monitoring**: Comprehensive logging and metrics
6. **Database Design**: Proper metadata storage and indexing

**Common Production Interview Questions:**

- "Why shouldn't you store files in the project root?"
- "How do presigned URLs improve security and performance?"
- "When would you use streaming vs buffering for uploads?"
- "How do you handle upload failures and retries?"
- "Design a scalable file upload architecture for a SaaS platform"

**Key Production Principles:**

- **Security First**: Validate, scan, and secure all uploads
- **Scalability**: Use cloud storage and distributed processing
- **Reliability**: Implement retry mechanisms and error handling
- **Monitoring**: Track performance, errors, and usage metrics
- **Performance**: Use streaming and caching for optimal speed

**Production Deployment Checklist:**

- ✅ Cloud storage integration (S3/GCS/Azure)
- ✅ Presigned URL generation
- ✅ Streaming upload support
- ✅ Retry mechanism with exponential backoff
- ✅ Comprehensive logging and monitoring
- ✅ Database metadata storage
- ✅ Security validation and virus scanning
- ✅ Rate limiting and abuse prevention
- ✅ File cleanup and expiration

[← Security Considerations](./04_security.md) | [Next → Advanced Concepts](./06_advanced.md)
