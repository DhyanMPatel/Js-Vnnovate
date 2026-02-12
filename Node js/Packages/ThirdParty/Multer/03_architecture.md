# 🏛️ Architecture & System Design

## 1. File Upload in Backend Architecture

### Where File Upload Fits in Modern Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Web Client    │    │   Mobile App    │    │  Third-party    │
│                 │    │                 │    │     API         │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                 │
                    ┌─────────────▼─────────────┐
                    │      API Gateway          │
                    │   (Authentication,        │
                    │    Rate Limiting,         │
                    │   Request Validation)     │
                    └─────────────┬─────────────┘
                                 │
                    ┌─────────────▼─────────────┐
                    │     Load Balancer         │
                    │   (Multiple Instances)    │
                    └─────────────┬─────────────┘
                                 │
          ┌──────────────────────┼──────────────────────┐
          │                      │                      │
┌─────────▼─────────┐  ┌─────────▼─────────┐  ┌─────────▼─────────┐
│   Upload Service  │  │   User Service   │  │  Product Service │
│   (Multer +       │  │   (User Data)    │  │ (Product Info)   │
│    Storage)       │  │                  │  │                  │
└─────────┬─────────┘  └─────────┬─────────┘  └─────────┬─────────┘
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                 │
                    ┌─────────────▼─────────────┐
                    │      Storage Layer        │
                    │  ┌─────────┬─────────┐    │
                    │  │   S3    │   CDN   │    │
                    │  │ (Files) │ (Cache) │    │
                    │  └─────────┴─────────┘    │
                    └─────────────┬─────────────┘
                                 │
                    ┌─────────────▼─────────────┐
                    │      Database              │
                    │   (Metadata,              │
                    │    File References)       │
                    └───────────────────────────┘
```

### Layered Architecture with Multer

**1. Presentation Layer (API Endpoints)**
```js
// api/routes/upload.js
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const uploadMiddleware = require('../middleware/upload');
const auth = require('../middleware/auth');

router.post('/profile', 
  auth.authenticate,
  uploadMiddleware.profileImage,
  uploadController.uploadProfile
);

router.post('/documents',
  auth.authenticate,
  uploadMiddleware.documents,
  uploadController.uploadDocuments
);
```

**2. Middleware Layer (Multer Configuration)**
```js
// middleware/upload.js
const multer = require('multer');
const path = require('path');

const profileImageUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/profiles/');
    },
    filename: (req, file, cb) => {
      const uniqueName = `${req.user.id}-${Date.now()}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    }
  }),
  fileFilter: require('../utils/fileFilters').imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

module.exports = {
  profileImage: profileImageUpload.single('avatar'),
  documents: multer({ storage: multer.memoryStorage() }).array('docs', 5)
};
```

**3. Controller Layer (Business Logic)**
```js
// controllers/uploadController.js
class UploadController {
  async uploadProfile(req, res) {
    try {
      const { file } = req;
      const userId = req.user.id;
      
      // Process image (resize, optimize)
      const processedImage = await this.imageService.processProfile(file);
      
      // Upload to cloud storage
      const cloudUrl = await this.storageService.upload(processedImage);
      
      // Update user profile
      await this.userService.updateProfile(userId, { avatar: cloudUrl });
      
      // Clean up temporary file
      await this.cleanupService.removeTemp(file.path);
      
      res.json({ 
        success: true, 
        avatar: cloudUrl 
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
```

**4. Service Layer (Core Business Logic)**
```js
// services/storageService.js
class StorageService {
  async upload(file, options = {}) {
    const { folder = 'general', isPublic = false } = options;
    
    // Generate unique key
    const key = `${folder}/${Date.now()}-${file.originalname}`;
    
    // Upload to S3
    const result = await this.s3.upload({
      Bucket: process.env.S3_BUCKET,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: isPublic ? 'public-read' : 'private'
    }).promise();
    
    return {
      url: result.Location,
      key: key,
      etag: result.ETag
    };
  }
}
```

---

## 2. Direct Server Upload vs Cloud Storage

### 2.1 Direct Server Upload (Traditional)

```
Client → Server (Multer) → Local Disk → Database → Response
```

**Implementation:**
```js
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: diskStorage });

app.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file;
  
  // Save file metadata to database
  const fileRecord = await File.create({
    originalName: file.originalname,
    filename: file.filename,
    path: file.path,
    size: file.size,
    mimetype: file.mimetype
  });
  
  res.json({ 
    id: fileRecord.id,
    url: `/files/${file.filename}`
  });
});
```

**Pros:**
- Simple implementation
- Fast for small files
- Full control over files
- No external dependencies

**Cons:**
- Limited server disk space
- Scaling challenges
- Single point of failure
- Manual backup required

### 2.2 Cloud Storage Upload (Modern)

```
Client → Server (Multer) → Memory → Cloud Storage → Database → Response
```

**Implementation:**
```js
const memoryStorage = multer.memoryStorage();
const upload = multer({ 
  storage: memoryStorage,
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB
});

app.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file;
  
  try {
    // Upload directly to S3
    const s3Result = await s3.upload({
      Bucket: process.env.S3_BUCKET,
      Key: `uploads/${Date.now()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype
    }).promise();
    
    // Save metadata to database
    const fileRecord = await File.create({
      originalName: file.originalname,
      s3Key: s3Result.Key,
      s3Url: s3Result.Location,
      size: file.size,
      mimetype: file.mimetype
    });
    
    res.json({ 
      id: fileRecord.id,
      url: s3Result.Location
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

**Pros:**
- Scalable storage
- Built-in redundancy
- CDN integration
- Pay-as-you-go pricing

**Cons:**
- Higher memory usage
- Network dependency
- Cost at scale
- Complexity

---

## 3. Microservices Architecture

### 3.1 Dedicated File Upload Service

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Service  │    │ Product Service │    │ Order Service   │
│                 │    │                 │    │                 │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                 │
                    ┌─────────────▼─────────────┐
                    │    API Gateway           │
                    │   (Request Routing)       │
                    └─────────────┬─────────────┘
                                 │
                    ┌─────────────▼─────────────┐
                    │   File Upload Service     │
                    │  ┌─────────────────────┐  │
                    │  │   Multer Middleware │  │
                    │  │   Storage Service    │  │
                    │  │   Processing Queue   │  │
                    │  └─────────────────────┘  │
                    └─────────────┬─────────────┘
                                 │
                    ┌─────────────▼─────────────┐
                    │      Shared Storage       │
                    │   (S3, MinIO, etc.)       │
                    └───────────────────────────┘
```

**File Upload Service Implementation:**
```js
// file-upload-service/src/app.js
const express = require('express');
const multer = require('multer');
const Redis = require('redis');

class FileUploadService {
  constructor() {
    this.app = express();
    this.redis = Redis.createClient();
    this.setupMiddleware();
    this.setupRoutes();
  }

  setupMiddleware() {
    // Memory storage for immediate cloud upload
    this.upload = multer({
      storage: multer.memoryStorage(),
      limits: { fileSize: 100 * 1024 * 1024 }
    });
  }

  setupRoutes() {
    this.app.post('/upload', 
      this.authenticate,
      this.upload.single('file'),
      this.handleUpload.bind(this)
    );
    
    this.app.get('/upload/:id/status', 
      this.authenticate,
      this.getUploadStatus.bind(this)
    );
  }

  async handleUpload(req, res) {
    const { file } = req;
    const { userId, service } = req.body;
    
    try {
      // Create upload record
      const uploadId = this.generateUploadId();
      
      // Store in Redis for tracking
      await this.redis.setex(
        `upload:${uploadId}`, 
        3600, // 1 hour
        JSON.stringify({
          status: 'processing',
          userId,
          service,
          originalName: file.originalname,
          size: file.size,
          mimeType: file.mimetype
        })
      );

      // Queue for processing
      await this.queueUpload(uploadId, file);
      
      res.json({ 
        uploadId,
        status: 'processing',
        message: 'File uploaded and queued for processing'
      });
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async queueUpload(uploadId, file) {
    // Add to processing queue
    await this.redis.lpush('upload-queue', JSON.stringify({
      uploadId,
      file: {
        originalname: file.originalname,
        buffer: file.buffer.toString('base64'),
        mimetype: file.mimetype,
        size: file.size
      }
    }));
  }
}
```

### 3.2 Inter-Service Communication

**Event-Driven File Processing:**
```js
// file-upload-service/src/processors.js
class FileProcessor {
  constructor() {
    this.s3 = new AWS.S3();
    this.eventBus = new EventBus();
  }

  async processUpload(jobData) {
    const { uploadId, file } = jobData;
    
    try {
      // Update status
      await this.updateStatus(uploadId, 'uploading');
      
      // Upload to S3
      const s3Result = await this.s3.upload({
        Bucket: process.env.S3_BUCKET,
        Key: `uploads/${uploadId}/${file.originalname}`,
        Body: Buffer.from(file.buffer, 'base64'),
        ContentType: file.mimetype
      }).promise();
      
      // Update status
      await this.updateStatus(uploadId, 'completed', {
        url: s3Result.Location,
        key: s3Result.Key
      });
      
      // Publish event
      await this.eventBus.publish('file.uploaded', {
        uploadId,
        service: jobData.service,
        userId: jobData.userId,
        fileUrl: s3Result.Location,
        metadata: {
          originalName: file.originalname,
          size: file.size,
          mimeType: file.mimeType
        }
      });
      
    } catch (error) {
      await this.updateStatus(uploadId, 'failed', { error: error.message });
      throw error;
    }
  }

  async updateStatus(uploadId, status, data = {}) {
    const existing = await this.redis.get(`upload:${uploadId}`);
    const uploadData = JSON.parse(existing);
    
    uploadData.status = status;
    uploadData.updatedAt = new Date().toISOString();
    Object.assign(uploadData, data);
    
    await this.redis.setex(`upload:${uploadId}`, 3600, JSON.stringify(uploadData));
  }
}
```

---

## 4. Synchronous vs Asynchronous Processing

### 4.1 Synchronous Processing (Simple)

```js
app.post('/upload-sync', upload.single('file'), async (req, res) => {
  const file = req.file;
  
  try {
    // Step 1: Upload to storage
    const storageResult = await storageService.upload(file);
    
    // Step 2: Process image (resize, compress)
    const processedImage = await imageService.process(storageResult.url);
    
    // Step 3: Generate thumbnails
    const thumbnails = await imageService.generateThumbnails(processedImage);
    
    // Step 4: Save to database
    const fileRecord = await database.save({
      original: storageResult,
      processed: processedImage,
      thumbnails: thumbnails
    });
    
    // Step 5: Return response
    res.json({ 
      success: true, 
      fileId: fileRecord.id,
      url: processedImage.url
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

**Pros:**
- Simple to understand
- Immediate feedback
- Easy debugging
- Consistent state

**Cons:**
- Poor user experience (long waits)
- Server blocking
- Timeout risks
- Not scalable

### 4.2 Asynchronous Processing (Production)

```js
app.post('/upload-async', upload.single('file'), async (req, res) => {
  const file = req.file;
  const { userId } = req.body;
  
  try {
    // Step 1: Quick validation and initial upload
    const uploadId = await fileService.createUploadRecord({
      userId,
      originalName: file.originalname,
      size: file.size,
      status: 'uploading'
    });
    
    // Step 2: Queue for processing
    await processingQueue.add('process-file', {
      uploadId,
      file: {
        buffer: file.buffer,
        originalname: file.originalname,
        mimetype: file.mimetype
      }
    });
    
    // Step 3: Immediate response
    res.json({
      success: true,
      uploadId,
      status: 'processing',
      estimatedTime: '30 seconds'
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Separate worker process
// workers/fileProcessor.js
const processingQueue = new Bull('file-processing');

processingQueue.process('process-file', async (job) => {
  const { uploadId, file } = job.data;
  
  try {
    // Update status
    await fileService.updateStatus(uploadId, 'processing');
    
    // Upload to cloud storage
    const storageResult = await cloudStorage.upload(file);
    
    // Process file
    const processedResult = await fileProcessor.process(storageResult);
    
    // Generate thumbnails
    const thumbnails = await thumbnailService.generate(processedResult);
    
    // Save to database
    await fileService.completeUpload(uploadId, {
      storage: storageResult,
      processed: processedResult,
      thumbnails: thumbnails
    });
    
    // Notify client
    await notificationService.notify(userId, {
      type: 'file_processed',
      uploadId,
      url: processedResult.url
    });
    
  } catch (error) {
    await fileService.updateStatus(uploadId, 'failed', { error: error.message });
    throw error;
  }
});
```

**Pros:**
- Better user experience
- Scalable processing
- Resilient to failures
- Resource optimization

**Cons:**
- More complex
- Status tracking required
- Eventual consistency
- Debugging challenges

---

## 5. Event-Driven Processing After Upload

### Event Architecture for File Processing

```
File Upload → Multer → Initial Storage → Event Published → Multiple Processors
     ↓              ↓              ↓                ↓                    ↓
   Client      Validation      S3/MinIO      Message Queue        Workers
     ↓              ↓              ↓                ↓                    ↓
  Response    Quick Check    File URL      Upload Event       Image Processing
                                                    ↓                    ↓
                                               Database              Thumbnails
                                                    ↓                    ↓
                                               Notifications         CDN Upload
```

### Implementation with Event Bus

```js
// services/eventDrivenFileService.js
class EventDrivenFileService {
  constructor() {
    this.eventBus = new EventBus();
    this.uploadQueue = new Bull('uploads');
    this.setupEventHandlers();
  }

  async handleUpload(req, res) {
    const { file } = req;
    const { userId, tags } = req.body;
    
    try {
      // Create upload record
      const upload = await this.createUploadRecord({
        userId,
        originalName: file.originalname,
        size: file.size,
        mimeType: file.mimetype,
        tags: JSON.parse(tags || '[]')
      });
      
      // Initial upload to temporary storage
      const tempResult = await this.tempStorage.upload(file);
      
      // Publish upload event
      await this.eventBus.publish('file.uploaded', {
        uploadId: upload.id,
        userId,
        tempFile: tempResult,
        metadata: {
          originalName: file.originalname,
          size: file.size,
          mimeType: file.mimetype,
          tags: upload.tags
        }
      });
      
      res.json({
        uploadId: upload.id,
        status: 'processing',
        message: 'File uploaded and queued for processing'
      });
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  setupEventHandlers() {
    // Image processing handler
    this.eventBus.subscribe('file.uploaded', async (event) => {
      if (this.isImage(event.metadata.mimeType)) {
        await this.imageQueue.add('process-image', event);
      }
    });
    
    // Document processing handler
    this.eventBus.subscribe('file.uploaded', async (event) => {
      if (this.isDocument(event.metadata.mimeType)) {
        await this.documentQueue.add('process-document', event);
      }
    });
    
    // Virus scanning handler
    this.eventBus.subscribe('file.uploaded', async (event) => {
      await this.securityQueue.add('scan-file', event);
    });
  }
}

// Image processing worker
class ImageProcessor {
  constructor() {
    this.imageQueue = new Bull('image-processing');
    this.s3 = new AWS.S3();
    this.setupProcessor();
  }

  async setupProcessor() {
    this.imageQueue.process('process-image', async (job) => {
      const { uploadId, tempFile, metadata } = job.data;
      
      try {
        // Download temporary file
        const fileBuffer = await this.downloadTempFile(tempFile);
        
        // Process image
        const processedImages = await this.processImages(fileBuffer, metadata);
        
        // Upload to permanent storage
        const uploadResults = await this.uploadImages(processedImages, uploadId);
        
        // Update database
        await this.updateUploadRecord(uploadId, {
          processedImages: uploadResults,
          status: 'completed'
        });
        
        // Cleanup temporary file
        await this.cleanupTempFile(tempFile);
        
        // Publish completion event
        await this.eventBus.publish('file.processed', {
          uploadId,
          images: uploadResults
        });
        
      } catch (error) {
        await this.updateUploadRecord(uploadId, {
          status: 'failed',
          error: error.message
        });
        throw error;
      }
    });
  }

  async processImages(buffer, metadata) {
    const sharp = require('sharp');
    const images = {};
    
    // Original image (optimized)
    images.original = await sharp(buffer)
      .jpeg({ quality: 85 })
      .toBuffer();
    
    // Thumbnail
    images.thumbnail = await sharp(buffer)
      .resize(200, 200, { fit: 'cover' })
      .jpeg({ quality: 80 })
      .toBuffer();
    
    // Medium size
    images.medium = await sharp(buffer)
      .resize(800, 600, { fit: 'inside' })
      .jpeg({ quality: 85 })
      .toBuffer();
    
    // Large size
    images.large = await sharp(buffer)
      .resize(1920, 1080, { fit: 'inside' })
      .jpeg({ quality: 90 })
      .toBuffer();
    
    return images;
  }
}
```

---

## 6. Queue-Based Heavy File Processing

### Queue Architecture for Large Files

```
Client Upload → Multer → Temporary Storage → Job Queue → Worker Pool → Final Storage
      ↓              ↓              ↓              ↓            ↓              ↓
   Form Data    File Buffer    Local Disk    Redis/RabbitMQ  Processors    S3/Cloud
      ↓              ↓              ↓              ↓            ↓              ↓
   Quick Job    Memory Check   Quick Save   Priority      Background    CDN Cache
   Creation      Size Limit     Validation   Queue         Processing    Distribution
```

### Implementation with Bull Queue

```js
// services/queueFileService.js
const Queue = require('bull');
const Redis = require('redis');

class QueueFileService {
  constructor() {
    this.redis = Redis.createClient();
    
    // Different queues for different file types
    this.queues = {
      images: new Queue('image-processing', { redis: this.redis }),
      documents: new Queue('document-processing', { redis: this.redis }),
      videos: new Queue('video-processing', { redis: this.redis }),
      bulk: new Queue('bulk-processing', { redis: this.redis })
    };
    
    this.setupProcessors();
  }

  async handleBulkUpload(req, res) {
    const files = req.files;
    const { userId, priority = 'normal' } = req.body;
    
    try {
      const uploadJobs = [];
      
      for (const file of files) {
        // Determine queue based on file type
        const queueType = this.getQueueType(file.mimetype);
        const queue = this.queues[queueType];
        
        // Create job
        const job = await queue.add('process-file', {
          uploadId: this.generateUploadId(),
          userId,
          file: {
            originalname: file.originalname,
            buffer: file.buffer,
            mimetype: file.mimetype,
            size: file.size
          }
        }, {
          priority: this.getPriority(priority),
          attempts: 3,
          backoff: 'exponential',
          removeOnComplete: 10,
          removeOnFail: 5
        });
        
        uploadJobs.push({
          originalName: file.originalname,
          jobId: job.id,
          queue: queueType
        });
      }
      
      res.json({
        message: 'Files queued for processing',
        jobs: uploadJobs,
        totalFiles: files.length
      });
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  setupProcessors() {
    // Image processing with concurrency control
    this.queues.images.process('process-file', 5, async (job) => {
      return await this.processImageFile(job);
    });
    
    // Document processing
    this.queues.documents.process('process-file', 3, async (job) => {
      return await this.processDocumentFile(job);
    });
    
    // Video processing (limited concurrency due to resource intensity)
    this.queues.videos.process('process-file', 1, async (job) => {
      return await this.processVideoFile(job);
    });
    
    // Bulk processing
    this.queues.bulk.process('process-file', 2, async (job) => {
      return await this.processBulkFile(job);
    });
    
    // Error handling
    Object.values(this.queues).forEach(queue => {
      queue.on('failed', (job, err) => {
        console.error(`Job ${job.id} failed:`, err);
        this.handleFailedJob(job, err);
      });
      
      queue.on('completed', (job, result) => {
        console.log(`Job ${job.id} completed`);
        this.handleCompletedJob(job, result);
      });
    });
  }

  async processImageFile(job) {
    const { uploadId, file, userId } = job.data;
    
    try {
      // Update job progress
      job.progress(10);
      
      // Validate image
      await this.validateImage(file.buffer);
      job.progress(20);
      
      // Process different sizes
      const sizes = await this.processImageSizes(file.buffer);
      job.progress(60);
      
      // Generate metadata
      const metadata = await this.extractImageMetadata(file.buffer);
      job.progress(80);
      
      // Upload to storage
      const results = await this.uploadToStorage(sizes, uploadId);
      job.progress(90);
      
      // Save to database
      await this.saveToDatabase(uploadId, {
        userId,
        originalName: file.originalname,
        sizes: results,
        metadata
      });
      
      job.progress(100);
      
      return {
        uploadId,
        status: 'completed',
        urls: results
      };
      
    } catch (error) {
      throw new Error(`Image processing failed: ${error.message}`);
    }
  }

  getQueueType(mimetype) {
    if (mimetype.startsWith('image/')) return 'images';
    if (mimetype.startsWith('video/')) return 'videos';
    if (this.isDocument(mimetype)) return 'documents';
    return 'bulk';
  }

  getPriority(priority) {
    const priorities = {
      low: 1,
      normal: 5,
      high: 10,
      urgent: 20
    };
    return priorities[priority] || 5;
  }
}
```

---

## Interview-Oriented Notes

**Architecture Topics to Master:**

1. **Layered Architecture**: Where Multer fits in the overall system
2. **Storage Strategies**: Direct server vs cloud storage trade-offs
3. **Microservices**: Dedicated file upload services
4. **Processing Patterns**: Sync vs async processing
5. **Event-Driven Systems**: Queue-based file processing

**Common Architecture Interview Questions:**

- "How would you design a scalable file upload system?"
- "Where does Multer fit in a microservices architecture?"
- "When would you use synchronous vs asynchronous file processing?"
- "How do you handle large file uploads without blocking the server?"
- "Design a file upload system for a social media platform"

**Key Architectural Decisions:**

- **Storage Choice**: Local disk for development, cloud for production
- **Processing Strategy**: Async for large files, sync for small files
- **Service Separation**: Dedicated upload service for scalability
- **Queue Usage**: Essential for heavy processing and bulk uploads
- **Event-Driven**: Enables multiple processors and loose coupling

**Production Considerations:**

- Always use cloud storage in production
- Implement async processing for files > 5MB
- Use queues for heavy processing tasks
- Monitor queue sizes and processing times
- Implement proper error handling and retry logic

[← Core Concepts](./02_core_concepts.md) | [Next → Security Considerations](./04_security.md)
