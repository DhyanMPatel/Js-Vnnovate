# 🎓 Interview Questions & Answers

## 1. Beginner Level Questions (0-2 years experience)

### Q1. What is Multer and why is it needed in Node.js?

**Answer:**
Multer is a Node.js middleware for handling `multipart/form-data`, which is primarily used for uploading files. It's built on top of busboy for fast parsing of form data.

**Key points:**
- Express.js doesn't handle file uploads by default
- Multer processes multipart form data and makes files available in `req.file` or `req.files`
- It provides storage engines (disk, memory, custom)
- Includes built-in validation and security features
- Simplifies complex file upload handling

**Why it's needed:**
```js
// Without Multer - Complex manual parsing
app.post('/upload', (req, res) => {
  // req has no file information - need manual multipart parsing
  res.send('Cannot handle files');
});

// With Multer - Simple file handling
const upload = multer({ dest: 'uploads/' });
app.post('/upload', upload.single('file'), (req, res) => {
  // req.file contains uploaded file information
  res.json({ file: req.file });
});
```

### Q2. What is multipart/form-data?

**Answer:**
Multipart/form-data is a MIME type that allows browsers to send multiple pieces of data (both text and binary files) in a single HTTP request. It's the standard way to upload files from web forms.

**How it works:**
```
POST /upload HTTP/1.1
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="username"

john_doe
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="avatar"; filename="profile.jpg"
Content-Type: image/jpeg

[binary image data]
------WebKitFormBoundary7MA4YWxkTrZu0gW--
```

**Key components:**
- **Boundary**: Unique separator between parts
- **Content-Disposition**: Metadata about each part
- **Content-Type**: MIME type of the content
- **Binary Data**: Actual file content

### Q3. What's the difference between req.file and req.files?

**Answer:**
Both objects contain uploaded file information, but they're used in different scenarios:

**req.file:**
- Used with `upload.single('fieldName')`
- Contains single file object
- Used when uploading one file

```js
app.post('/profile', upload.single('avatar'), (req, res) => {
  console.log(req.file); // Single file object
  // {
  //   fieldname: 'avatar',
  //   originalname: 'profile.jpg',
  //   encoding: '7bit',
  //   mimetype: 'image/jpeg',
  //   size: 12345,
  //   destination: 'uploads/',
  //   filename: 'avatar-1234567890.jpg',
  //   path: 'uploads/avatar-1234567890.jpg'
  // }
});
```

**req.files:**
- Used with `upload.array('fieldName')` or `upload.fields()`
- Contains array of file objects or object with arrays
- Used when uploading multiple files

```js
app.post('/gallery', upload.array('photos', 5), (req, res) => {
  console.log(req.files); // Array of file objects
  // [
  //   { fieldname: 'photos', originalname: 'image1.jpg', ... },
  //   { fieldname: 'photos', originalname: 'image2.jpg', ... }
  // ]
});

app.post('/mixed', upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'documents', maxCount: 3 }
]), (req, res) => {
  console.log(req.files.avatar); // Array with 1 item
  console.log(req.files.documents); // Array with up to 3 items
});
```

### Q4. How do you configure Multer for basic file uploads?

**Answer:**
Basic Multer configuration involves setting up storage and limits:

```js
const multer = require('multer');
const path = require('path');

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Upload directory
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Create upload middleware
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Use in route
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send('File uploaded successfully');
});
```

### Q5. What are the main storage engines in Multer?

**Answer:**
Multer provides two built-in storage engines:

**1. DiskStorage:**
- Stores files on the local file system
- Provides full control over destination and filename
- Persistent storage (survives server restart)

```js
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
```

**2. MemoryStorage:**
- Stores files in memory (RAM)
- Files are available as buffers
- Automatically cleaned up when response is sent
- Good for temporary processing

```js
const memoryStorage = multer.memoryStorage();
const upload = multer({ storage: memoryStorage });

app.post('/upload', upload.single('file'), (req, res) => {
  const fileBuffer = req.file.buffer; // File as buffer
  // Process file immediately
});
```

**Custom Storage Engines:**
- You can create custom storage engines for cloud storage, databases, etc.
- Must implement `_handleFile` and `_removeFile` methods

---

## 2. Mid-Level Questions (2-4 years experience)

### Q6. How would you implement file validation and security in Multer?

**Answer:**
File validation and security should be implemented at multiple levels:

**1. File Filter Validation:**
```js
const fileFilter = (req, file, cb) => {
  // Check MIME type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('Invalid file type'), false);
  }
  
  // Check file extension
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (!allowedExtensions.includes(ext)) {
    return cb(new Error('Invalid file extension'), false);
  }
  
  cb(null, true);
};

const upload = multer({
  storage: diskStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  }
});
```

**2. Content-Based Validation:**
```js
const validateFileContent = async (filePath, mimetype) => {
  const buffer = fs.readFileSync(filePath);
  const signature = buffer.subarray(0, 12).toString('hex');
  
  const signatures = {
    'image/jpeg': ['ffd8ffe0', 'ffd8ffe1'],
    'image/png': ['89504e470d0a1a0a'],
    'image/gif': ['474946383961']
  };
  
  const validSignatures = signatures[mimetype];
  return validSignatures && validSignatures.some(sig => signature.startsWith(sig));
};
```

**3. Security Measures:**
```js
const secureUpload = multer({
  storage: diskStorage,
  fileFilter: (req, file, cb) => {
    // Sanitize filename
    file.originalname = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    
    // Check for path traversal
    if (file.originalname.includes('..')) {
      return cb(new Error('Invalid filename'), false);
    }
    
    cb(null, true);
  },
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 5
  }
});
```

### Q7. How would you handle large file uploads without blocking the server?

**Answer:**
For large files, use streaming and asynchronous processing:

**1. Streaming Upload:**
```js
const { pipeline } = require('stream/promises');

app.post('/upload-large', upload.single('file'), async (req, res) => {
  try {
    // Stream file directly to cloud storage
    const readStream = fs.createReadStream(req.file.path);
    const s3Stream = s3.upload({
      Bucket: 'my-bucket',
      Key: `uploads/${req.file.filename}`,
      Body: readStream
    });
    
    await pipeline(readStream, s3Stream);
    
    // Remove temporary file
    fs.unlinkSync(req.file.path);
    
    res.json({ message: 'Large file uploaded successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

**2. Memory Storage for Processing:**
```js
const memoryUpload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB
});

app.post('/upload-process', memoryUpload.single('file'), async (req, res) => {
  try {
    // Process file directly from memory
    const processedBuffer = await processImage(req.file.buffer);
    
    // Upload processed result
    const result = await uploadToS3(processedBuffer);
    
    res.json({ url: result.Location });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

**3. Queue-Based Processing:**
```js
const Queue = require('bull');
const uploadQueue = new Queue('file processing');

app.post('/upload-queue', upload.single('file'), async (req, res) => {
  // Add to processing queue
  await uploadQueue.add('process-file', {
    filePath: req.file.path,
    originalName: req.file.originalname
  });
  
  res.json({ message: 'File queued for processing' });
});

// Worker process
uploadQueue.process('process-file', async (job) => {
  const { filePath, originalName } = job.data;
  
  // Process file
  const processedPath = await processFile(filePath);
  
  // Upload to cloud
  await uploadToCloud(processedPath);
  
  // Cleanup
  fs.unlinkSync(filePath);
  fs.unlinkSync(processedPath);
});
```

### Q8. How would you integrate Multer with cloud storage like AWS S3?

**Answer:**
Integration with S3 can be done in multiple ways:

**1. Direct S3 Upload:**
```js
const AWS = require('aws-sdk');
const multer = require('multer');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

// Memory storage for immediate S3 upload
const upload = multer({ storage: multer.memoryStorage() });

app.post('/upload-s3', upload.single('file'), async (req, res) => {
  try {
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: `uploads/${Date.now()}-${req.file.originalname}`,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
      ACL: 'public-read'
    };
    
    const result = await s3.upload(params).promise();
    
    res.json({ 
      message: 'File uploaded to S3',
      url: result.Location,
      key: result.Key
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

**2. Presigned URL Approach:**
```js
// Generate presigned URL for client-side upload
app.get('/presigned-url', async (req, res) => {
  const { fileName, fileType } = req.query;
  
  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: `uploads/${fileName}`,
    Expires: 3600, // 1 hour
    ContentType: fileType
  };
  
  try {
    const url = await s3.getSignedUrlPromise('putObject', params);
    res.json({ uploadUrl: url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Client uploads directly to S3 using the presigned URL
```

**3. Custom S3 Storage Engine:**
```js
class S3Storage {
  constructor(options) {
    this.s3 = new AWS.S3(options.s3);
    this.bucket = options.bucket;
  }

  _handleFile(req, file, cb) {
    const params = {
      Bucket: this.bucket,
      Key: `${Date.now()}-${file.originalname}`,
      Body: file.stream,
      ContentType: file.mimetype
    };

    this.s3.upload(params, (err, result) => {
      if (err) return cb(err);
      
      cb(null, {
        key: result.Key,
        location: result.Location,
        etag: result.ETag,
        bucket: result.Bucket
      });
    });
  }

  _removeFile(req, file, cb) {
    this.s3.deleteObject({
      Bucket: this.bucket,
      Key: file.key
    }, cb);
  }
}

const s3Storage = new S3Storage({
  s3: { region: 'us-east-1' },
  bucket: 'my-upload-bucket'
});

const upload = multer({ storage: s3Storage });
```

### Q9. How would you implement error handling for file uploads?

**Answer:**
Comprehensive error handling should cover multiple scenarios:

**1. Multer-Specific Errors:**
```js
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    switch (error.code) {
      case 'LIMIT_FILE_SIZE':
        return res.status(400).json({ 
          error: 'File too large',
          maxSize: '10MB'
        });
      case 'LIMIT_FILE_COUNT':
        return res.status(400).json({ 
          error: 'Too many files',
          maxFiles: 5
        });
      case 'LIMIT_UNEXPECTED_FILE':
        return res.status(400).json({ 
          error: 'Unexpected file field',
          expectedField: 'file'
        });
      default:
        return res.status(400).json({ 
          error: 'Upload error',
          details: error.message
        });
    }
  }
  next();
});
```

**2. File Validation Errors:**
```js
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png'];
  
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error('Invalid file type');
    error.code = 'INVALID_FILE_TYPE';
    error.allowedTypes = allowedTypes;
    return cb(error, false);
  }
  
  cb(null, true);
};
```

**3. Storage Errors:**
```js
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    // Try to process file
    const result = await processFile(req.file);
    res.json(result);
    
  } catch (error) {
    // Cleanup uploaded file on error
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }
    
    console.error('Upload processing error:', error);
    res.status(500).json({ 
      error: 'File processing failed',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});
```

**4. Global Error Handler:**
```js
class UploadErrorHandler {
  static handle(error, req, res, next) {
    const errorResponse = {
      timestamp: new Date().toISOString(),
      path: req.path,
      method: req.method
    };
    
    if (error instanceof multer.MulterError) {
      errorResponse.error = 'Multer error';
      errorResponse.code = error.code;
      errorResponse.message = this.getMulterErrorMessage(error);
      return res.status(400).json(errorResponse);
    }
    
    if (error.code === 'INVALID_FILE_TYPE') {
      errorResponse.error = 'Validation error';
      errorResponse.message = error.message;
      errorResponse.allowedTypes = error.allowedTypes;
      return res.status(400).json(errorResponse);
    }
    
    // Log unexpected errors
    console.error('Unexpected upload error:', error);
    
    errorResponse.error = 'Internal server error';
    errorResponse.message = 'An unexpected error occurred';
    res.status(500).json(errorResponse);
  }
  
  static getMulterErrorMessage(error) {
    const messages = {
      'LIMIT_FILE_SIZE': 'File size exceeds maximum allowed limit',
      'LIMIT_FILE_COUNT': 'Number of files exceeds maximum allowed limit',
      'LIMIT_UNEXPECTED_FILE': 'Unexpected file field received',
      'LIMIT_FIELD_KEY': 'Field name too long',
      'LIMIT_FIELD_VALUE': 'Field value too long',
      'LIMIT_FIELD_COUNT': 'Too many fields',
      'LIMIT_PART_COUNT': 'Too many parts'
    };
    
    return messages[error.code] || error.message;
  }
}

app.use(UploadErrorHandler.handle);
```

### Q10. How would you implement progress tracking for file uploads?

**Answer:**
Progress tracking can be implemented using several approaches:

**1. Basic Progress with Multer Events:**
```js
const progress = new Map();

const progressMiddleware = (req, res, next) => {
  const contentLength = parseInt(req.headers['content-length']);
  const uploadId = Date.now().toString();
  
  progress.set(uploadId, {
    loaded: 0,
    total: contentLength,
    progress: 0
  });
  
  // Track upload progress
  req.on('data', (chunk) => {
    const upload = progress.get(uploadId);
    upload.loaded += chunk.length;
    upload.progress = Math.round((upload.loaded / upload.total) * 100);
  });
  
  req.uploadId = uploadId;
  next();
};

// Get progress endpoint
app.get('/upload-progress/:uploadId', (req, res) => {
  const upload = progress.get(req.params.uploadId);
  if (!upload) {
    return res.status(404).json({ error: 'Upload not found' });
  }
  res.json(upload);
});
```

**2. WebSocket Real-time Progress:**
```js
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

const uploadProgress = new Map();

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const { type, uploadId } = JSON.parse(message);
    
    if (type === 'subscribe' && uploadId) {
      // Send progress updates
      const interval = setInterval(() => {
        const progress = uploadProgress.get(uploadId);
        if (progress) {
          ws.send(JSON.stringify({
            type: 'progress',
            uploadId,
            ...progress
          }));
          
          if (progress.progress >= 100) {
            clearInterval(interval);
          }
        }
      }, 1000);
    }
  });
});

// Update progress during upload
const trackProgress = (uploadId, loaded, total) => {
  uploadProgress.set(uploadId, {
    loaded,
    total,
    progress: Math.round((loaded / total) * 100),
    timestamp: Date.now()
  });
};
```

**3. Advanced Progress with Streaming:**
```js
const { Transform } = require('stream');

class ProgressTracker extends Transform {
  constructor(uploadId, totalSize) {
    super();
    this.uploadId = uploadId;
    this.totalSize = totalSize;
    this.loaded = 0;
  }
  
  _transform(chunk, encoding, callback) {
    this.loaded += chunk.length;
    const progress = Math.round((this.loaded / this.totalSize) * 100);
    
    // Broadcast progress
    broadcastProgress(this.uploadId, {
      loaded: this.loaded,
      total: this.totalSize,
      progress
    });
    
    callback(null, chunk);
  }
}

app.post('/upload-with-progress', upload.single('file'), async (req, res) => {
  const uploadId = generateUploadId();
  const tracker = new ProgressTracker(uploadId, req.file.size);
  
  // Pipe file through progress tracker
  const fileStream = fs.createReadStream(req.file.path);
  fileStream.pipe(tracker);
  
  // Handle upload completion
  tracker.on('finish', () => {
    broadcastProgress(uploadId, { progress: 100, complete: true });
  });
  
  res.json({ uploadId });
});
```

---

## 3. Senior Level Questions (4-5+ years experience)

### Q11. Design a scalable file upload architecture for a high-traffic application

**Answer:**
A scalable file upload architecture should handle high volume, provide reliability, and ensure security:

**Architecture Components:**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Web Client    │    │   Mobile App    │    │  Third-party    │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                 │
                    ┌─────────────▼─────────────┐
                    │      API Gateway          │
                    │   (Rate Limiting, Auth)    │
                    └─────────────┬─────────────┘
                                 │
          ┌──────────────────────┼──────────────────────┐
          │                      │                      │
┌─────────▼─────────┐  ┌─────────▼─────────┐  ┌─────────▼─────────┐
│   Upload Service  │  │   Progress API   │  │  Metadata DB     │
│   (Multer +       │  │   (WebSocket)    │  │   (PostgreSQL)   │
│    Validation)    │  │                  │  │                  │
└─────────┬─────────┘  └───────────────────┘  └───────────────────┘
          │
          └──────────────────────┐
                                 │
                    ┌─────────────▼─────────────┐
                    │      Message Queue        │
                    │   (Redis/RabbitMQ)        │
                    └─────────────┬─────────────┘
                                 │
          ┌──────────────────────┼──────────────────────┐
          │                      │                      │
┌─────────▼─────────┐  ┌─────────▼─────────┐  ┌─────────▼─────────┐
│  Image Processor  │  │  Virus Scanner   │  │  Storage Service  │
│   (Workers)       │  │   (Workers)      │  │   (S3/Cloud)      │
└───────────────────┘  └───────────────────┘  └───────────────────┘
```

**Implementation:**

```js
// Upload Service
class ScalableUploadService {
  constructor() {
    this.redis = Redis.createClient();
    this.s3 = new AWS.S3();
    this.uploadQueue = new Bull('uploads');
    this.setupWorkers();
  }

  async handleUpload(req, res) {
    const uploadId = this.generateUploadId();
    const userId = req.user.id;
    
    try {
      // Create upload record
      await this.createUploadRecord(uploadId, {
        userId,
        status: 'uploading',
        startTime: Date.now()
      });
      
      // Upload to temporary storage
      const tempResult = await this.uploadToTemp(req.file);
      
      // Queue for processing
      await this.uploadQueue.add('process-file', {
        uploadId,
        userId,
        tempPath: tempResult.path,
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size
      });
      
      res.json({
        uploadId,
        status: 'processing',
        message: 'File uploaded and queued for processing'
      });
      
    } catch (error) {
      await this.updateUploadStatus(uploadId, 'failed', { error: error.message });
      res.status(500).json({ error: error.message });
    }
  }

  setupWorkers() {
    // Image processing workers
    this.uploadQueue.process('process-file', 5, async (job) => {
      const { uploadId, tempPath, mimetype } = job.data;
      
      try {
        await this.updateUploadStatus(uploadId, 'processing');
        
        // Virus scanning
        const scanResult = await this.scanFile(tempPath);
        if (!scanResult.clean) {
          throw new Error('File failed security scan');
        }
        
        // Process based on file type
        let processedResult;
        if (mimetype.startsWith('image/')) {
          processedResult = await this.processImage(tempPath);
        } else {
          processedResult = await this.moveToPermanentStorage(tempPath);
        }
        
        // Update database
        await this.completeUpload(uploadId, processedResult);
        
        // Cleanup
        await this.cleanupTempFile(tempPath);
        
        return { success: true, url: processedResult.url };
        
      } catch (error) {
        await this.updateUploadStatus(uploadId, 'failed', { error: error.message });
        throw error;
      }
    });
  }

  async processImage(tempPath) {
    const sharp = require('sharp');
    
    // Generate multiple sizes
    const sizes = {
      thumbnail: { width: 200, height: 200 },
      medium: { width: 800, height: 600 },
      large: { width: 1920, height: 1080 }
    };
    
    const results = {};
    
    for (const [sizeName, dimensions] of Object.entries(sizes)) {
      const buffer = await sharp(tempPath)
        .resize(dimensions.width, dimensions.height, { fit: 'inside' })
        .jpeg({ quality: 85 })
        .toBuffer();
      
      const key = `images/${sizeName}/${Date.now()}.jpg`;
      const s3Result = await this.s3.upload({
        Bucket: process.env.S3_BUCKET,
        Key: key,
        Body: buffer,
        ContentType: 'image/jpeg'
      }).promise();
      
      results[sizeName] = {
        url: s3Result.Location,
        key: s3Result.Key,
        size: buffer.length
      };
    }
    
    return results;
  }
}

// Load Balancer Configuration
const uploadService = new ScalableUploadService();

// Health check for load balancer
app.get('/health', async (req, res) => {
  try {
    // Check Redis connection
    await uploadService.redis.ping();
    
    // Check S3 connectivity
    await uploadService.s3.headBucket({ Bucket: process.env.S3_BUCKET }).promise();
    
    // Check queue status
    const activeJobs = await uploadService.uploadQueue.getActiveCount();
    
    res.json({
      status: 'healthy',
      services: {
        redis: 'connected',
        s3: 'connected',
        queue: `active jobs: ${activeJobs}`
      }
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      error: error.message
    });
  }
});
```

**Key Features:**
- **Horizontal Scaling**: Multiple upload service instances
- **Asynchronous Processing**: Queue-based file processing
- **Fault Tolerance**: Error handling and retry mechanisms
- **Security**: Virus scanning and content validation
- **Monitoring**: Health checks and metrics
- **Load Balancing**: Distribute uploads across instances

### Q12. How would you prevent malicious file uploads and implement comprehensive security?

**Answer:**
Comprehensive file upload security requires multiple layers of protection:

**1. Multi-Layer Validation:**
```js
class SecureFileValidator {
  constructor() {
    this.allowedMimeTypes = new Set([
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'application/pdf',
      'text/plain'
    ]);
    
    this.malwareSignatures = new Set([
      '504b0304', // ZIP (can contain executables)
      'd0cf11e0', // Microsoft Office documents with macros
      // Add more signatures
    ]);
  }

  async validateFile(file, filePath) {
    const validationResults = {
      isValid: true,
      errors: [],
      warnings: []
    };

    // Layer 1: MIME type validation
    if (!this.allowedMimeTypes.has(file.mimetype)) {
      validationResults.errors.push('Invalid MIME type');
      validationResults.isValid = false;
    }

    // Layer 2: File extension validation
    const ext = path.extname(file.originalname).toLowerCase();
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.pdf', '.txt'];
    if (!allowedExtensions.includes(ext)) {
      validationResults.errors.push('Invalid file extension');
      validationResults.isValid = false;
    }

    // Layer 3: File signature validation
    const signatureValidation = await this.validateFileSignature(filePath, file.mimetype);
    if (!signatureValidation.isValid) {
      validationResults.errors.push('File signature does not match MIME type');
      validationResults.isValid = false;
    }

    // Layer 4: Content analysis
    const contentAnalysis = await this.analyzeContent(filePath, file.mimetype);
    if (contentAnalysis.hasSuspiciousContent) {
      validationResults.errors.push('Suspicious content detected');
      validationResults.isValid = false;
    }

    // Layer 5: Virus scanning
    const virusScan = await this.scanForMalware(filePath);
    if (!virusScan.clean) {
      validationResults.errors.push('Malware detected');
      validationResults.isValid = false;
    }

    // Layer 6: Metadata validation
    const metadataValidation = this.validateMetadata(file);
    if (!metadataValidation.isValid) {
      validationResults.warnings.push('Suspicious metadata');
    }

    return validationResults;
  }

  async validateFileSignature(filePath, expectedMime) {
    const buffer = fs.readFileSync(filePath);
    const signature = buffer.subarray(0, 12).toString('hex');
    
    const signatures = {
      'image/jpeg': ['ffd8ffe0', 'ffd8ffe1', 'ffd8ffe8'],
      'image/png': ['89504e470d0a1a0a'],
      'image/gif': ['474946383961', '474946383761'],
      'application/pdf': ['255044462d']
    };
    
    const validSignatures = signatures[expectedMime];
    return {
      isValid: validSignatures && validSignatures.some(sig => signature.startsWith(sig)),
      detectedSignature: signature
    };
  }

  async analyzeContent(filePath, mimetype) {
    const buffer = fs.readFileSync(filePath);
    const content = buffer.toString('utf8', 0, Math.min(1024, buffer.length));
    
    const suspiciousPatterns = [
      /<script/i,
      /javascript:/i,
      /vbscript:/i,
      /onload=/i,
      /onerror=/i,
      /eval\(/i,
      /exec\(/i
    ];
    
    const hasSuspiciousContent = suspiciousPatterns.some(pattern => pattern.test(content));
    
    // Check for embedded executables in images
    if (mimetype.startsWith('image/')) {
      const hasEmbeddedFiles = this.checkForEmbeddedFiles(buffer);
      return { hasSuspiciousContent: hasSuspiciousContent || hasEmbeddedFiles };
    }
    
    return { hasSuspiciousContent };
  }

  async scanForMalware(filePath) {
    // Integrate with actual antivirus software
    // For demo: ClamAV integration
    const { exec } = require('child_process');
    const { promisify } = require('util');
    const execAsync = promisify(exec);
    
    try {
      const { stdout } = await execAsync(`clamscan --no-summary ${filePath}`);
      const clean = stdout.includes('OK');
      
      return {
        clean,
        scanResult: stdout
      };
    } catch (error) {
      return {
        clean: false,
        error: error.message
      };
    }
  }
}
```

**2. Secure Upload Middleware:**
```js
const secureUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      // Upload to quarantine directory first
      const quarantineDir = 'uploads/quarantine/';
      fs.mkdirSync(quarantineDir, { recursive: true });
      cb(null, quarantineDir);
    },
    filename: (req, file, cb) => {
      // Generate secure filename
      const timestamp = Date.now();
      const random = crypto.randomBytes(16).toString('hex');
      const ext = path.extname(file.originalname);
      cb(null, `${timestamp}_${random}${ext}`);
    }
  }),
  fileFilter: async (req, file, cb) => {
    try {
      // Create temporary file for validation
      const tempPath = path.join('temp', file.originalname);
      fs.writeFileSync(tempPath, file.buffer);
      
      // Validate file
      const validator = new SecureFileValidator();
      const validation = await validator.validateFile(file, tempPath);
      
      // Clean up temp file
      fs.unlinkSync(tempPath);
      
      if (validation.isValid) {
        req.fileValidation = validation;
        cb(null, true);
      } else {
        cb(new Error(`File validation failed: ${validation.errors.join(', ')}`), false);
      }
    } catch (error) {
      cb(error, false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
    files: 5,
    fieldSize: 1024 * 1024 // 1MB field size
  }
});
```

**3. Rate Limiting and Abuse Prevention:**
```js
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');

// IP-based rate limiting
const uploadRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 uploads per window
  message: 'Too many upload attempts',
  standardHeaders: true,
  legacyHeaders: false
});

// User-based rate limiting
const userUploadLimit = rateLimit({
  keyGenerator: (req) => req.user?.id || req.ip,
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50, // 50 uploads per hour per user
  message: 'User upload limit exceeded'
});

// Slow down suspicious requests
const uploadSlowDown = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 50, // Allow 50 requests at full speed
  delayMs: 500 // Add 500ms delay after 50 requests
});

app.post('/secure-upload', 
  uploadRateLimit,
  userUploadLimit,
  uploadSlowDown,
  secureUpload.single('file'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      
      // Move from quarantine to permanent storage
      const permanentPath = req.file.path.replace('quarantine', 'secure');
      fs.mkdirSync(path.dirname(permanentPath), { recursive: true });
      fs.renameSync(req.file.path, permanentPath);
      
      res.json({
        message: 'File uploaded securely',
        file: {
          originalName: req.file.originalname,
          filename: req.file.filename,
          size: req.file.size,
          validation: req.fileValidation
        }
      });
      
    } catch (error) {
      // Cleanup on error
      if (req.file && req.file.path) {
        fs.unlinkSync(req.file.path);
      }
      res.status(500).json({ error: error.message });
    }
  }
);
```

### Q13. How would you handle millions of file uploads daily with high availability?

**Answer:**
Handling millions of daily uploads requires a distributed, fault-tolerant architecture:

**Architecture Design:**
```
┌─────────────────────────────────────────────────────────────────┐
│                        Global Load Balancer                    │
│                    (GeoDNS + Health Checks)                    │
└─────────────────┬───────────────────────────────────────────────┘
                  │
    ┌─────────────┼─────────────┐
    │             │             │
┌───▼───┐    ┌───▼───┐    ┌───▼───┐
│  US   │    │  EU   │    │  APAC │
│Region │    │Region │    │Region │
└───┬───┘    └───┬───┘    └───┬───┘
    │            │            │
┌───▼────────────────▼────────────────▼───┐
│           Regional Load Balancers        │
└───┬────────────────┬────────────────┬───┘
    │                │                │
┌───▼───┐        ┌───▼───┐        ┌───▼───┐
│Upload │        │Upload │        │Upload │
│Service│        │Service│        │Service│
│Cluster│        │Cluster│        │Cluster│
└───┬───┘        └───┬───┘        └───┬───┘
    │                │                │
    └────────┬───────┴───────┬────────┘
             │               │
    ┌────────▼────────┐ ┌───▼─────────────┐
    │   Global Queue   │ │  Distributed    │
    │   (Kafka/Redis)  │ │  Storage       │
    └────────┬────────┘ │  (Multi-region  │
             │          │   S3/CDN)       │
    ┌────────▼────────┐ └────────────────┘
    │  Processing     │
    │  Workers        │
    │  (Auto-scaling) │
    └─────────────────┘
```

**Implementation:**

```js
// Global Upload Service
class GlobalUploadService {
  constructor() {
    this.regions = ['us-east-1', 'eu-west-1', 'ap-southeast-1'];
    this.currentRegion = process.env.AWS_REGION;
    this.globalQueue = new KafkaProducer({
      topic: 'global-uploads',
      brokers: process.env.KAFKA_BROKERS.split(',')
    });
    this.distributedCache = new RedisCluster({
      nodes: this.getRedisNodes()
    });
  }

  async handleGlobalUpload(req, res) {
    const uploadId = this.generateGlobalUploadId();
    const userId = req.user.id;
    const userRegion = this.getUserRegion(userId);
    
    try {
      // Route to nearest region
      if (userRegion !== this.currentRegion) {
        return await this.proxyToRegion(req, res, userRegion);
      }
      
      // Create global upload record
      const uploadRecord = {
        uploadId,
        userId,
        region: this.currentRegion,
        status: 'initiated',
        timestamp: Date.now(),
        clientInfo: {
          ip: req.ip,
          userAgent: req.headers['user-agent'],
          geoLocation: req.geoLocation
        }
      };
      
      await this.distributedCache.setex(
        `upload:${uploadId}`,
        3600, // 1 hour TTL
        JSON.stringify(uploadRecord)
      );
      
      // Upload to regional storage
      const uploadResult = await this.uploadToRegionalStorage(req.file, uploadId);
      
      // Queue for global processing
      await this.globalQueue.send({
        topic: 'global-uploads',
        messages: [{
          key: uploadId,
          value: JSON.stringify({
            uploadId,
            userId,
            region: this.currentRegion,
            filePath: uploadResult.path,
            metadata: uploadResult.metadata
          })
        }]
      });
      
      res.json({
        uploadId,
        region: this.currentRegion,
        status: 'uploaded',
        message: 'File uploaded to regional storage'
      });
      
    } catch (error) {
      await this.updateGlobalStatus(uploadId, 'failed', { error: error.message });
      res.status(500).json({ error: error.message });
    }
  }

  async uploadToRegionalStorage(file, uploadId) {
    // Use regional S3 bucket
    const regionalBucket = `uploads-${this.currentRegion}`;
    
    const params = {
      Bucket: regionalBucket,
      Key: `${uploadId}/${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
      StorageClass: 'INTELLIGENT_TIERING',
      ServerSideEncryption: 'AES256',
      Metadata: {
        originalName: file.originalname,
        uploadId: uploadId,
        region: this.currentRegion
      }
    };
    
    const result = await this.s3.upload(params).promise();
    
    // Create CDN distribution
    const cdnUrl = `https://cdn.example.com/${uploadId}/${file.originalname}`;
    
    return {
      path: result.Key,
      url: result.Location,
      cdnUrl,
      bucket: regionalBucket,
      metadata: {
        size: file.size,
        etag: result.ETag,
        lastModified: new Date().toISOString()
      }
    };
  }

  getUserRegion(userId) {
    // Get user's preferred region from database or geo-location
    return this.distributedCache.get(`user:${userId}:region`) || 'us-east-1';
  }

  async proxyToRegion(req, res, targetRegion) {
    const regionalEndpoint = `https://upload-${targetRegion}.example.com`;
    
    try {
      const response = await fetch(`${regionalEndpoint}${req.path}`, {
        method: req.method,
        headers: req.headers,
        body: req.body
      });
      
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      res.status(502).json({ error: 'Regional service unavailable' });
    }
  }
}

// Auto-scaling Worker Pool
class AutoScalingWorkerPool {
  constructor() {
    this.minWorkers = 10;
    this.maxWorkers = 100;
    this.currentWorkers = this.minWorkers;
    this.queueSize = 0;
    this.processingTime = [];
    this.monitoringInterval = 30000; // 30 seconds
    this.startAutoScaling();
  }

  startAutoScaling() {
    setInterval(async () => {
      await this.adjustWorkerCount();
    }, this.monitoringInterval);
  }

  async adjustWorkerCount() {
    const queue = await this.getQueueMetrics();
    const performance = await this.getPerformanceMetrics();
    
    // Scaling decisions
    if (queue.pendingJobs > 100 && this.currentWorkers < this.maxWorkers) {
      // Scale up
      const newWorkers = Math.min(
        this.currentWorkers + 10,
        this.maxWorkers,
        queue.pendingJobs / 10
      );
      await this.scaleWorkers(newWorkers);
    } else if (queue.pendingJobs < 10 && this.currentWorkers > this.minWorkers) {
      // Scale down
      const newWorkers = Math.max(
        this.currentWorkers - 5,
        this.minWorkers
      );
      await this.scaleWorkers(newWorkers);
    }
  }

  async scaleWorkers(targetCount) {
    const diff = targetCount - this.currentWorkers;
    
    if (diff > 0) {
      // Scale up - launch new instances
      for (let i = 0; i < diff; i++) {
        await this.launchWorkerInstance();
      }
    } else if (diff < 0) {
      // Scale down - gracefully shut down instances
      await this.shutdownWorkerInstances(Math.abs(diff));
    }
    
    this.currentWorkers = targetCount;
    console.log(`Scaled workers to ${targetCount}`);
  }

  async launchWorkerInstance() {
    // Launch new container/VM with worker code
    const instance = await this.cloudProvider.runInstance({
      image: 'upload-worker:latest',
      instanceType: 't3.medium',
      userData: this.generateWorkerScript()
    });
    
    return instance;
  }
}

// Multi-region Storage Manager
class MultiRegionStorageManager {
  constructor() {
    this.regions = ['us-east-1', 'eu-west-1', 'ap-southeast-1'];
    this.replicationFactor = 3; // Replicate to 3 regions
  }

  async storeWithReplication(file, uploadId) {
    const primaryRegion = this.selectOptimalRegion();
    const backupRegions = this.selectBackupRegions(primaryRegion);
    
    const results = {
      primary: null,
      replicas: []
    };
    
    try {
      // Upload to primary region
      results.primary = await this.uploadToRegion(file, uploadId, primaryRegion);
      
      // Replicate to backup regions asynchronously
      const replicationPromises = backupRegions.map(region => 
        this.uploadToRegion(file, uploadId, region)
      );
      
      const replicaResults = await Promise.allSettled(replicationPromises);
      results.replicas = replicaResults.map((result, index) => ({
        region: backupRegions[index],
        success: result.status === 'fulfilled',
        data: result.status === 'fulfilled' ? result.value : null,
        error: result.status === 'rejected' ? result.reason : null
      }));
      
      return results;
      
    } catch (error) {
      console.error('Primary storage failed:', error);
      
      // Try backup regions if primary fails
      const fallbackResult = await this.uploadToRegion(file, uploadId, backupRegions[0]);
      results.primary = fallbackResult;
      results.fallback = true;
      
      return results;
    }
  }

  selectOptimalRegion() {
    // Select region based on:
    // 1. Geographic proximity to user
    // 2. Current load
    // 3. Health status
    // 4. Cost optimization
    
    return this.regions[0]; // Simplified
  }

  selectBackupRegions(primaryRegion) {
    return this.regions
      .filter(region => region !== primaryRegion)
      .slice(0, this.replicationFactor - 1);
  }
}
```

**Key Features:**
- **Geo-distribution**: Route uploads to nearest region
- **Auto-scaling**: Dynamically adjust worker instances
- **Multi-region storage**: Replicate files across regions
- **Fault tolerance**: Graceful degradation and failover
- **Load balancing**: Distribute traffic globally
- **Monitoring**: Real-time metrics and health checks

---

## 4. System Design Questions

### Q14. Design a file upload system for Instagram-like platform

**Answer:**
Instagram's file upload system needs to handle millions of images/videos daily with real-time processing:

**Requirements:**
- 100M+ daily uploads
- Multiple file formats (photos, videos, stories)
- Real-time processing and filters
- Global CDN distribution
- High availability and low latency
- Content moderation and safety

**Architecture:**
```
┌─────────────────────────────────────────────────────────────────┐
│                        Mobile Apps                            │
│                    (iOS, Android, Web)                        │
└─────────────────┬───────────────────────────────────────────────┘
                  │
    ┌─────────────┼─────────────┐
    │             │             │
┌───▼───┐    ┌───▼───┐    ┌───▼───┐
│  US   │    │  EU   │    │  APAC │
│  CDN  │    │  CDN  │    │  CDN  │
└───┬───┘    └───┬───┘    └───┬───┘
    │            │            │
    └────────────┼────────────┘
                 │
    ┌────────────▼────────────┐
    │   Global Load Balancer   │
    └────────────┬────────────┘
                 │
    ┌────────────▼────────────┐
    │   API Gateway           │
    │ (Auth, Rate Limiting)   │
    └────────────┬────────────┘
                 │
    ┌────────────▼────────────┐
    │   Upload Service        │
    │   (Multer + Validation) │
    └────────────┬────────────┘
                 │
    ┌────────────▼────────────┐
    │   Message Queue         │
    │   (Kafka Topics)        │
    │  ┌─────────────────────┐│
    │  │ image-uploads      ││
    │  │ video-uploads      ││
    │  │ story-uploads      ││
    │  │ profile-uploads    ││
    │  └─────────────────────┘│
    └────────────┬────────────┘
                 │
    ┌────────────▼────────────┐
    │   Processing Workers    │
    │  ┌─────────────────────┐│
    │  │ Image Processing   ││
    │  │ Video Transcoding  ││
    │  │ Content Moderation ││
    │  │ Metadata Extraction││
    │  └─────────────────────┘│
    └────────────┬────────────┘
                 │
    ┌────────────▼────────────┐
    │   Storage Layer         │
    │  ┌─────────────────────┐│
    │  │ Original Files     ││
    │  │ Processed Images   ││
    │  │ Thumbnails         ││
    │  │ Videos             ││
    │  │ Stories            ││
    │  └─────────────────────┘│
    └────────────┬────────────┘
                 │
    ┌────────────▼────────────┐
    │   CDN Edge Locations   │
    │   (Fast Delivery)      │
    └────────────────────────┘
```

**Implementation:**

```js
// Instagram-style Upload Service
class InstagramUploadService {
  constructor() {
    this.s3 = new AWS.S3();
    this.kafka = new Kafka();
    this.redis = Redis.createClient();
    this.imageProcessor = new ImageProcessor();
    this.videoProcessor = new VideoProcessor();
    this.contentModerator = new ContentModerator();
  }

  async handleMediaUpload(req, res) {
    const { mediaType, caption, location } = req.body;
    const file = req.file;
    const userId = req.user.id;
    
    try {
      // Create post record
      const postId = await this.createPostRecord({
        userId,
        mediaType,
        caption,
        location,
        status: 'uploading'
      });
      
      // Generate unique file paths
      const filePaths = this.generateFilePaths(postId, file.originalname, mediaType);
      
      // Upload original to S3
      const originalUpload = await this.uploadOriginal(file, filePaths.original);
      
      // Queue for processing based on media type
      await this.queueForProcessing({
        postId,
        userId,
        mediaType,
        originalPath: filePaths.original,
        processedPaths: filePaths.processed,
        metadata: {
          caption,
          location,
          uploadTime: new Date().toISOString(),
          deviceInfo: req.headers['user-agent']
        }
      });
      
      res.json({
        postId,
        status: 'processing',
        message: 'Media uploaded and queued for processing'
      });
      
    } catch (error) {
      console.error('Upload failed:', error);
      res.status(500).json({ error: 'Upload failed' });
    }
  }

  generateFilePaths(postId, originalName, mediaType) {
    const timestamp = Date.now();
    const ext = path.extname(originalName);
    const baseName = `${postId}_${timestamp}`;
    
    if (mediaType === 'image') {
      return {
        original: `originals/images/${baseName}${ext}`,
        processed: {
          large: `processed/images/large/${baseName}.jpg`,
          medium: `processed/images/medium/${baseName}.jpg`,
          thumbnail: `processed/images/thumbnail/${baseName}.jpg`
        }
      };
    } else if (mediaType === 'video') {
      return {
        original: `originals/videos/${baseName}${ext}`,
        processed: {
          hd: `processed/videos/hd/${baseName}.mp4`,
          sd: `processed/videos/sd/${baseName}.mp4`,
          thumbnail: `processed/videos/thumbnail/${baseName}.jpg`,
          preview: `processed/videos/preview/${baseName}.mp4`
        }
      };
    }
  }

  async queueForProcessing(mediaData) {
    const topic = mediaData.mediaType === 'image' ? 'image-uploads' : 'video-uploads';
    
    await this.kafka.producer.send({
      topic,
      messages: [{
        key: mediaData.postId,
        value: JSON.stringify(mediaData)
      }]
    });
  }
}

// Image Processing Worker
class InstagramImageProcessor {
  constructor() {
    this.sharp = require('sharp');
    this.s3 = new AWS.S3();
  }

  async processImage(message) {
    const { postId, originalPath, processedPaths, metadata } = JSON.parse(message.value);
    
    try {
      // Download original image
      const originalBuffer = await this.downloadFromS3(originalPath);
      
      // Process different sizes
      const sizes = {
        large: { width: 1080, height: 1080, quality: 85 },
        medium: { width: 640, height: 640, quality: 85 },
        thumbnail: { width: 150, height: 150, quality: 80 }
      };
      
      const results = {};
      
      for (const [sizeName, config] of Object.entries(sizes)) {
        const processedBuffer = await this.sharp(originalBuffer)
          .resize(config.width, config.height, {
            fit: 'cover',
            position: 'center'
          })
          .jpeg({ quality: config.quality })
          .toBuffer();
        
        // Upload processed image
        await this.s3.upload({
          Bucket: process.env.S3_BUCKET,
          Key: processedPaths[sizeName],
          Body: processedBuffer,
          ContentType: 'image/jpeg'
        }).promise();
        
        results[sizeName] = {
          size: processedBuffer.length,
          dimensions: config,
          url: `https://cdn.instagram.com/${processedPaths[sizeName]}`
        };
      }
      
      // Extract metadata
      const imageMetadata = await this.extractMetadata(originalBuffer);
      
      // Update post record
      await this.updatePostRecord(postId, {
        status: 'completed',
        processedImages: results,
        metadata: { ...metadata, ...imageMetadata }
      });
      
      // Notify user's followers
      await this.notifyFollowers(postId);
      
    } catch (error) {
      await this.updatePostRecord(postId, {
        status: 'failed',
        error: error.message
      });
      throw error;
    }
  }

  async extractMetadata(imageBuffer) {
    const metadata = await this.sharp(imageBuffer).metadata();
    
    return {
      width: metadata.width,
      height: metadata.height,
      format: metadata.format,
      size: metadata.size,
      hasAlpha: metadata.hasAlpha,
      orientation: metadata.orientation,
      colorSpace: metadata.space
    };
  }
}

// Content Moderation
class ContentModerator {
  constructor() {
    this.aiModeration = new AIModerationService();
    this.humanReviewQueue = new Bull('human-review');
  }

  async moderateContent(postId, mediaUrl, caption) {
    const moderationResults = {
      postId,
      automated: {},
      humanReview: false,
      approved: false
    };
    
    try {
      // AI-based moderation
      const aiResults = await this.aiModeration.analyze({
        image: mediaUrl,
        text: caption
      });
      
      moderationResults.automated = aiResults;
      
      // Check for policy violations
      if (aiResults.violationScore > 0.7) {
        moderationResults.humanReview = true;
        await this.queueForHumanReview(postId, aiResults);
      } else if (aiResults.violationScore < 0.3) {
        moderationResults.approved = true;
        await this.approvePost(postId);
      } else {
        // Gray area - queue for human review
        moderationResults.humanReview = true;
        await this.queueForHumanReview(postId, aiResults);
      }
      
      return moderationResults;
      
    } catch (error) {
      console.error('Moderation failed:', error);
      // Default to human review on error
      moderationResults.humanReview = true;
      await this.queueForHumanReview(postId, { error: error.message });
      return moderationResults;
    }
  }
}
```

**Key Features:**
- **Multi-format support**: Images, videos, stories
- **Real-time processing**: Multiple image sizes and video transcoding
- **Content moderation**: AI + human review
- **Global CDN**: Fast delivery worldwide
- **Scalable architecture**: Auto-scaling workers
- **Social features**: Notifications, feeds integration

### Q15. Design a document storage system for a SaaS platform like Dropbox

**Answer:**
A SaaS document storage system needs secure file management, versioning, and collaboration:

**Requirements:**
- Multi-tenant architecture
- File versioning and history
- Real-time collaboration
- Security and encryption
- Sync across devices
- Search and indexing
- Backup and disaster recovery

**Architecture:**
```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Applications                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │   Web App   │  │ Desktop App │  │ Mobile App  │              │
│  └─────────────┘  └─────────────┘  └─────────────┘              │
└─────────────────┬───────────────────────────────────────────────┘
                  │
    ┌─────────────┼─────────────┐
    │             │             │
┌───▼───┐    ┌───▼───┐    ┌───▼───┐
│  Sync │    │  Sync │    │  Sync │
│Service│    │Service│    │Service│
└───┬───┘    └───┬───┘    └───┬───┘
    │            │            │
    └────────────┼────────────┘
                 │
    ┌────────────▼────────────┐
    │   API Gateway           │
    │ (Multi-tenant Auth)     │
    └────────────┬────────────┘
                 │
    ┌────────────▼────────────┐
    │   File Service          │
    │  ┌─────────────────────┐│
    │  │ Upload Handler      ││
    │  │ Version Manager     ││
    │  │ Permission Service  ││
    │  │ Search Indexer      ││
    │  └─────────────────────┘│
    └────────────┬────────────┘
                 │
    ┌────────────▼────────────┐
    │   Storage Layer         │
    │  ┌─────────────────────┐│
    │  │ Primary Storage     ││
    │  │ (Multi-region S3)   ││
    │  │ Version History     ││
    │  │ Backup Storage      ││
    │  └─────────────────────┘│
    └────────────┬────────────┘
                 │
    ┌────────────▼────────────┐
    │   Database Layer        │
    │  ┌─────────────────────┐│
    │  │ User Management     ││
    │  │ File Metadata       ││
    │  │ Permissions         ││
    │  │ Audit Logs          ││
    │  └─────────────────────┘│
    └─────────────────────────┘
```

**Implementation:**

```js
// SaaS File Storage Service
class SaaSFileStorageService {
  constructor() {
    this.s3 = new AWS.S3();
    this.dynamodb = new AWS.DynamoDB();
    this.elasticsearch = new ElasticsearchClient();
    this.encryptionService = new EncryptionService();
    this.auditLogger = new AuditLogger();
  }

  async uploadDocument(req, res) {
    const { folderId, description, tags } = req.body;
    const file = req.file;
    const tenantId = req.tenant.id;
    const userId = req.user.id;
    
    try {
      // Check tenant storage limits
      await this.checkStorageLimits(tenantId, file.size);
      
      // Check user permissions
      await this.checkFolderPermissions(tenantId, userId, folderId, 'write');
      
      // Generate file metadata
      const fileId = this.generateFileId();
      const version = 1;
      const encryptionKey = await this.encryptionService.generateKey();
      
      // Encrypt file content
      const encryptedBuffer = await this.encryptionService.encrypt(file.buffer, encryptionKey);
      
      // Upload to storage with tenant isolation
      const storageKey = `tenants/${tenantId}/files/${fileId}/v${version}/${file.originalname}`;
      
      const uploadResult = await this.s3.upload({
        Bucket: process.env.STORAGE_BUCKET,
        Key: storageKey,
        Body: encryptedBuffer,
        ServerSideEncryption: 'aws:kms',
        Metadata: {
          tenantId,
          userId,
          originalName: file.originalname,
          mimeType: file.mimetype,
          version: version.toString(),
          encryptionKeyId: encryptionKey.keyId
        }
      }).promise();
      
      // Save file metadata to database
      const fileMetadata = {
        fileId,
        tenantId,
        userId,
        folderId,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        version,
        storageKey,
        s3VersionId: uploadResult.VersionId,
        encryptionKeyId: encryptionKey.keyId,
        description,
        tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'active'
      };
      
      await this.saveFileMetadata(fileMetadata);
      
      // Index for search
      await this.indexFile(fileMetadata);
      
      // Log audit event
      await this.auditLogger.log({
        tenantId,
        userId,
        action: 'file_uploaded',
        resourceId: fileId,
        metadata: {
          fileName: file.originalname,
          size: file.size,
          folderId
        }
      });
      
      // Trigger sync to other devices
      await this.triggerFileSync(tenantId, userId, {
        type: 'file_uploaded',
        fileId,
        version
      });
      
      res.json({
        fileId,
        version,
        url: uploadResult.Location,
        message: 'Document uploaded successfully'
      });
      
    } catch (error) {
      console.error('Document upload failed:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async createFileVersion(req, res) {
    const { fileId } = req.params;
    const file = req.file;
    const tenantId = req.tenant.id;
    const userId = req.user.id;
    
    try {
      // Get current file metadata
      const currentMetadata = await this.getFileMetadata(fileId, tenantId);
      
      // Check permissions
      await this.checkFilePermissions(tenantId, userId, fileId, 'write');
      
      // Create new version
      const newVersion = currentMetadata.version + 1;
      const encryptionKey = await this.encryptionService.generateKey();
      
      // Encrypt and upload new version
      const encryptedBuffer = await this.encryptionService.encrypt(file.buffer, encryptionKey);
      
      const versionKey = `tenants/${tenantId}/files/${fileId}/v${newVersion}/${file.originalname}`;
      
      await this.s3.upload({
        Bucket: process.env.STORAGE_BUCKET,
        Key: versionKey,
        Body: encryptedBuffer,
        ServerSideEncryption: 'aws:kms',
        Metadata: {
          tenantId,
          userId,
          originalName: file.originalname,
          mimeType: file.mimetype,
          version: newVersion.toString(),
          parentId: fileId
        }
      }).promise();
      
      // Update file metadata
      const updatedMetadata = {
        ...currentMetadata,
        version: newVersion,
        size: file.size,
        updatedAt: new Date().toISOString(),
        lastModifiedBy: userId
      };
      
      await this.updateFileMetadata(fileId, tenantId, updatedMetadata);
      
      // Save version history
      await this.saveVersionHistory({
        fileId,
        tenantId,
        version: newVersion,
        userId,
        storageKey: versionKey,
        size: file.size,
        changes: req.body.changes || '',
        createdAt: new Date().toISOString()
      });
      
      res.json({
        fileId,
        version: newVersion,
        message: 'New version created successfully'
      });
      
    } catch (error) {
      console.error('Version creation failed:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async searchFiles(req, res) {
    const { query, folderId, tags, dateRange, fileType } = req.query;
    const tenantId = req.tenant.id;
    const userId = req.user.id;
    
    try {
      // Build Elasticsearch query
      const searchQuery = {
        index: `files_${tenantId}`,
        body: {
          query: {
            bool: {
              must: [
                { term: { tenantId } },
                { term: { status: 'active' } }
              ],
              filter: []
            }
          },
          sort: [
            { updatedAt: { order: 'desc' } }
          ],
          highlight: {
            fields: {
              originalName: {},
              description: {},
              content: {}
            }
          }
        }
      };
      
      // Add text search
      if (query) {
        searchQuery.body.query.bool.must.push({
          multi_match: {
            query,
            fields: ['originalName^3', 'description^2', 'content', 'tags^2'],
            fuzziness: 'AUTO'
          }
        });
      }
      
      // Add filters
      if (folderId) {
        searchQuery.body.query.bool.filter.push({
          term: { folderId }
        });
      }
      
      if (tags) {
        const tagList = tags.split(',');
        searchQuery.body.query.bool.filter.push({
          terms: { tags: tagList }
        });
      }
      
      if (fileType) {
        searchQuery.body.query.bool.filter.push({
          term: { mimeType: fileType }
        });
      }
      
      if (dateRange) {
        const [start, end] = dateRange.split(',');
        searchQuery.body.query.bool.filter.push({
          range: {
            updatedAt: {
              gte: start,
              lte: end
            }
          }
        });
      }
      
      // Execute search
      const searchResult = await this.elasticsearch.search(searchQuery);
      
      // Filter results based on user permissions
      const accessibleFiles = await this.filterAccessibleFiles(
        searchResult.body.hits.hits,
        tenantId,
        userId
      );
      
      res.json({
        files: accessibleFiles,
        total: searchResult.body.hits.total.value,
        took: searchResult.body.took
      });
      
    } catch (error) {
      console.error('Search failed:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async syncFileChanges(req, res) {
    const { lastSyncTime, deviceId } = req.body;
    const tenantId = req.tenant.id;
    const userId = req.user.id;
    
    try {
      // Get changes since last sync
      const changes = await this.getFileChanges(tenantId, userId, lastSyncTime);
      
      // Get user's accessible files
      const accessibleFiles = await this.getAccessibleFiles(tenantId, userId);
      
      // Filter changes based on accessibility
      const filteredChanges = changes.filter(change => 
        accessibleFiles.includes(change.fileId)
      );
      
      res.json({
        changes: filteredChanges,
        syncTime: new Date().toISOString(),
        deviceId
      });
      
    } catch (error) {
      console.error('Sync failed:', error);
      res.status(500).json({ error: error.message });
    }
  }
}

// Multi-tenant Permission Service
class PermissionService {
  constructor() {
    this.db = new Database();
  }

  async checkFolderPermissions(tenantId, userId, folderId, permission) {
    // Check if user has permission on folder
    const userPermission = await this.db.query(`
      SELECT p.permission 
      FROM permissions p 
      JOIN user_permissions up ON p.id = up.permission_id 
      WHERE up.user_id = $1 
      AND up.tenant_id = $2 
      AND (p.resource_id = $3 OR p.resource_id = 'root')
      AND p.permission = $4
    `, [userId, tenantId, folderId, permission]);
    
    if (userPermission.rows.length === 0) {
      throw new Error('Insufficient permissions');
    }
    
    return true;
  }

  async checkFilePermissions(tenantId, userId, fileId, permission) {
    // Get file's folder
    const file = await this.db.query(`
      SELECT folder_id 
      FROM files 
      WHERE id = $1 AND tenant_id = $2
    `, [fileId, tenantId]);
    
    if (file.rows.length === 0) {
      throw new Error('File not found');
    }
    
    // Check folder permissions
    return await this.checkFolderPermissions(
      tenantId, 
      userId, 
      file.rows[0].folder_id, 
      permission
    );
  }

  async getAccessibleFiles(tenantId, userId) {
    const result = await this.db.query(`
      SELECT DISTINCT f.id 
      FROM files f 
      JOIN permissions p ON (f.folder_id = p.resource_id OR p.resource_id = 'root')
      JOIN user_permissions up ON p.id = up.permission_id 
      WHERE up.user_id = $1 
      AND up.tenant_id = $2 
      AND f.status = 'active'
      AND p.permission IN ('read', 'write', 'admin')
    `, [userId, tenantId]);
    
    return result.rows.map(row => row.id);
  }
}
```

**Key Features:**
- **Multi-tenant isolation**: Separate storage per tenant
- **Version control**: File versioning and history
- **Encryption**: End-to-end encryption for sensitive files
- **Permissions**: Granular access control
- **Search**: Full-text search with metadata
- **Sync**: Real-time synchronization across devices
- **Audit**: Complete audit trail for compliance

---

## Interview-Oriented Notes

**Senior-Level Topics to Master:**

1. **Scalable Architecture**: Multi-region, auto-scaling systems
2. **Security**: Comprehensive file security and validation
3. **Performance**: Optimization for high-volume uploads
4. **System Design**: End-to-end file upload systems
5. **Cloud Integration**: S3, CDN, and managed services
6. **Data Management**: Versioning, backup, and disaster recovery

**Key Interview Preparation Points:**

- Understand the complete file upload pipeline
- Know different storage strategies and trade-offs
- Be able to design scalable architectures
- Understand security implications and solutions
- Know how to handle failures and edge cases
- Be familiar with cloud services and patterns

**Practical Experience:**

- Implement real file upload systems
- Work with cloud storage services
- Handle security vulnerabilities
- Optimize for performance and scalability
- Design fault-tolerant systems
- Monitor and maintain production systems

**Communication Skills:**

- Explain complex concepts clearly
- Justify architectural decisions
- Discuss trade-offs and alternatives
- Address security and performance concerns
- Provide real-world examples and experiences

[← Code Examples](./09_code_examples.md) | [Next → Real-World Case Study](./11_case_study.md)
