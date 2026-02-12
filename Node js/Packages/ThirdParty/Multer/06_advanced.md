# 🎯 Advanced Concepts

## 1. Custom Storage Engine

### Creating Custom Storage Engine

**Why Custom Storage?**
- Integration with proprietary storage systems
- Specialized processing requirements
- Custom metadata handling
- Unique security requirements
- Performance optimization

### Custom Storage Engine Implementation

```js
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class CustomStorageEngine {
  constructor(options = {}) {
    this.options = {
      destination: './uploads',
      filename: this.defaultFilename,
      metadataHandler: null,
      compressionEnabled: false,
      encryptionEnabled: false,
      encryptionKey: null,
      ...options
    };
    
    this.ensureDirectory();
  }

  // Required Multer methods
  _handleFile(req, file, cb) {
    this.processFile(req, file, cb);
  }

  _removeFile(req, file, cb) {
    this.deleteFile(file, cb);
  }

  async processFile(req, file, cb) {
    try {
      // Generate file path
      const filePath = this.generateFilePath(req, file);
      const dir = path.dirname(filePath);
      
      // Ensure directory exists
      await fs.promises.mkdir(dir, { recursive: true });
      
      // Process file stream
      const processedStream = await this.createProcessingStream(file);
      
      // Write file
      const writeStream = fs.createWriteStream(filePath);
      
      // Handle stream events
      processedStream.pipe(writeStream);
      
      writeStream.on('finish', async () => {
        try {
          // Post-processing
          const finalPath = await this.postProcess(filePath, file);
          
          // Generate file metadata
          const metadata = await this.generateMetadata(finalPath, file, req);
          
          // Store metadata if handler provided
          if (this.options.metadataHandler) {
            await this.options.metadataHandler(metadata);
          }
          
          cb(null, {
            path: finalPath,
            filename: path.basename(finalPath),
            size: file.size,
            metadata: metadata
          });
          
        } catch (error) {
          cb(error);
        }
      });
      
      writeStream.on('error', cb);
      processedStream.on('error', cb);
      
    } catch (error) {
      cb(error);
    }
  }

  async createProcessingStream(file) {
    let stream = file.stream;
    
    // Apply compression
    if (this.options.compressionEnabled) {
      stream = this.applyCompression(stream);
    }
    
    // Apply encryption
    if (this.options.encryptionEnabled) {
      stream = this.applyEncryption(stream);
    }
    
    return stream;
  }

  applyCompression(stream) {
    const zlib = require('zlib');
    return stream.pipe(zlib.createGzip());
  }

  applyEncryption(stream) {
    const crypto = require('crypto');
    const cipher = crypto.createCipher('aes-256-cbc', this.options.encryptionKey);
    return stream.pipe(cipher);
  }

  async postProcess(filePath, file) {
    // Image optimization
    if (file.mimetype.startsWith('image/')) {
      return await this.optimizeImage(filePath);
    }
    
    // Document processing
    if (file.mimetype.includes('pdf')) {
      return await this.processPDF(filePath);
    }
    
    return filePath;
  }

  async optimizeImage(filePath) {
    const sharp = require('sharp');
    const outputPath = filePath.replace(/(\.[^.]+)$/, '_optimized$1');
    
    await sharp(filePath)
      .jpeg({ quality: 85, progressive: true })
      .toFile(outputPath);
    
    // Replace original with optimized
    await fs.promises.unlink(filePath);
    await fs.promises.rename(outputPath, filePath);
    
    return filePath;
  }

  async processPDF(filePath) {
    // Extract metadata from PDF
    const pdf2json = require('pdf2json');
    
    return new Promise((resolve, reject) => {
      const pdfParser = new pdf2json();
      
      pdfParser.on('pdfParser_dataError', reject);
      pdfParser.on('pdfParser_dataReady', () => {
        resolve(filePath);
      });
      
      pdfParser.loadPDF(filePath);
    });
  }

  generateFilePath(req, file) {
    const filename = this.options.filename(req, file);
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return path.join(
      this.options.destination,
      req.user?.id || 'anonymous',
      year.toString(),
      month,
      day,
      filename
    );
  }

  defaultFilename(req, file) {
    const crypto = require('crypto');
    const ext = path.extname(file.originalname);
    const hash = crypto.randomBytes(16).toString('hex');
    const timestamp = Date.now();
    
    return `${timestamp}-${hash}${ext}`;
  }

  async generateMetadata(filePath, file, req) {
    const stats = await fs.promises.stat(filePath);
    
    return {
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: stats.size,
      uploadedAt: new Date(),
      uploadedBy: req.user?.id,
      path: filePath,
      checksum: await this.calculateChecksum(filePath),
      customFields: this.extractCustomFields(file)
    };
  }

  async calculateChecksum(filePath) {
    const crypto = require('crypto');
    const fileBuffer = await fs.promises.readFile(filePath);
    return crypto.createHash('sha256').update(fileBuffer).digest('hex');
  }

  extractCustomFields(file) {
    // Extract EXIF data from images
    if (file.mimetype.startsWith('image/')) {
      return this.extractExifData(file);
    }
    
    return {};
  }

  extractExifData(file) {
    // Implementation would use exif library
    return {
      camera: 'Unknown',
      date: new Date(),
      location: null
    };
  }

  async deleteFile(file, cb) {
    try {
      await fs.promises.unlink(file.path);
      cb(null);
    } catch (error) {
      cb(error);
    }
  }

  ensureDirectory() {
    fs.mkdirSync(this.options.destination, { recursive: true });
  }
}

// Usage with Multer
const customStorage = new CustomStorageEngine({
  destination: './custom-uploads',
  compressionEnabled: true,
  encryptionEnabled: true,
  encryptionKey: process.env.ENCRYPTION_KEY,
  metadataHandler: async (metadata) => {
    // Store metadata in database
    await FileMetadata.create(metadata);
  }
});

const upload = multer({ storage: customStorage });
```

---

## 2. Streaming Uploads to S3 Using multer-s3

### Advanced S3 Streaming Configuration

```js
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { PassThrough } = require('stream');

class AdvancedS3Streaming {
  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION
    });
    
    this.bucket = process.env.S3_BUCKET;
    this.setupAdvancedMulter();
  }

  setupAdvancedMulter() {
    this.upload = multer({
      storage: multerS3({
        s3: this.s3,
        bucket: this.bucket,
        
        // Dynamic key generation
        key: (req, file, cb) => {
          const key = this.generateAdvancedKey(req, file);
          cb(null, key);
        },
        
        // Content type detection
        contentType: (req, file, cb) => {
          cb(null, file.mimetype);
        },
        
        // Metadata handling
        metadata: (req, file, cb) => {
          const metadata = this.generateMetadata(req, file);
          cb(null, metadata);
        },
        
        // Server-side encryption
        serverSideEncryption: 'AES256',
        
        // ACL configuration
        acl: (req, file, cb) => {
          const acl = this.determineACL(req, file);
          cb(null, acl);
        },
        
        // Cache control
        cacheControl: (req, file, cb) => {
          const cacheControl = this.determineCacheControl(file);
          cb(null, cacheControl);
        },
        
        // Content encoding
        contentEncoding: (req, file, cb) => {
          if (this.shouldCompress(file)) {
            cb(null, 'gzip');
          } else {
            cb(null, null);
          }
        },
        
        // Storage class
        storageClass: (req, file, cb) => {
          const storageClass = this.determineStorageClass(req, file);
          cb(null, storageClass);
        }
      }),
      
      // File filtering
      fileFilter: this.advancedFileFilter.bind(this),
      
      // Limits
      limits: {
        fileSize: 1024 * 1024 * 1024, // 1GB
        files: 10,
        fields: 20,
        fieldSize: 2 * 1024 * 1024 // 2MB
      }
    });
  }

  generateAdvancedKey(req, file) {
    const userId = req.user?.id || 'anonymous';
    const fileType = this.getFileType(file.mimetype);
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const crypto = require('crypto');
    const hash = crypto.randomBytes(8).toString('hex');
    const ext = require('path').extname(file.originalname);
    
    return `uploads/${userId}/${fileType}/${year}/${month}/${day}/${hash}${ext}`;
  }

  generateMetadata(req, file) {
    return {
      originalName: file.originalname,
      uploadedBy: req.user?.id,
      userAgent: req.get('User-Agent'),
      ip: req.ip,
      uploadTimestamp: new Date().toISOString(),
      version: '1.0',
      environment: process.env.NODE_ENV
    };
  }

  determineACL(req, file) {
    // Public for images, private for documents
    if (file.mimetype.startsWith('image/')) {
      return 'public-read';
    }
    return 'private';
  }

  determineCacheControl(file) {
    if (file.mimetype.startsWith('image/')) {
      return 'max-age=31536000, immutable'; // 1 year
    }
    return 'max-age=3600'; // 1 hour
  }

  shouldCompress(file) {
    const compressibleTypes = [
      'text/',
      'application/json',
      'application/javascript',
      'application/xml'
    ];
    
    return compressibleTypes.some(type => file.mimetype.startsWith(type));
  }

  determineStorageClass(req, file) {
    // Use STANDARD for frequent access, GLACIER for archives
    if (file.mimetype.startsWith('image/')) {
      return 'STANDARD';
    }
    
    const userTier = req.user?.tier || 'basic';
    if (userTier === 'enterprise') {
      return 'STANDARD_IA'; // Infrequent Access
    }
    
    return 'STANDARD';
  }

  async advancedFileFilter(req, file, cb) {
    // Basic MIME type check
    const allowedTypes = this.getAllowedTypes(req.user?.tier);
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('File type not allowed'), false);
    }
    
    // Content validation
    try {
      const isValid = await this.validateContent(file);
      if (!isValid) {
        return cb(new Error('File content validation failed'), false);
      }
    } catch (error) {
      return cb(new Error('Content validation error'), false);
    }
    
    cb(null, true);
  }

  getAllowedTypes(userTier) {
    const basicTypes = [
      'image/jpeg', 'image/png', 'image/gif',
      'application/pdf'
    ];
    
    const premiumTypes = [
      ...basicTypes,
      'video/mp4', 'video/quicktime',
      'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    const enterpriseTypes = [
      ...premiumTypes,
      'application/zip', 'application/x-rar-compressed'
    ];
    
    switch (userTier) {
      case 'enterprise': return enterpriseTypes;
      case 'premium': return premiumTypes;
      default: return basicTypes;
    }
  }

  async validateContent(file) {
    // Implement content validation logic
    return true;
  }

  getFileType(mimetype) {
    if (mimetype.startsWith('image/')) return 'images';
    if (mimetype.startsWith('video/')) return 'videos';
    if (mimetype.includes('pdf')) return 'documents';
    if (mimetype.includes('zip') || mimetype.includes('rar')) return 'archives';
    return 'others';
  }

  // Multipart upload for large files
  async createMultipartUpload(file, key) {
    const params = {
      Bucket: this.bucket,
      Key: key,
      ContentType: file.mimetype
    };
    
    return await this.s3.createMultipartUpload(params).promise();
  }

  async uploadPart(uploadId, key, partNumber, data) {
    const params = {
      Bucket: this.bucket,
      Key: key,
      PartNumber: partNumber,
      UploadId: uploadId,
      Body: data
    };
    
    return await this.s3.uploadPart(params).promise();
  }

  async completeMultipartUpload(uploadId, key, parts) {
    const params = {
      Bucket: this.bucket,
      Key: key,
      UploadId: uploadId,
      MultipartUpload: {
        Parts: parts
      }
    };
    
    return await this.s3.completeMultipartUpload(params).promise();
  }
}
```

---

## 3. Handling Large Files (Video Uploads)

### Chunked Upload Implementation

```js
class ChunkedUploadHandler {
  constructor() {
    this.chunkSize = 5 * 1024 * 1024; // 5MB chunks
    this.maxFileSize = 2 * 1024 * 1024 * 1024; // 2GB
    this.uploads = new Map(); // Track ongoing uploads
  }

  async initiateChunkedUpload(req, res) {
    try {
      const { filename, fileSize, mimeType, checksum } = req.body;
      const userId = req.user.id;
      
      // Validate file size
      if (fileSize > this.maxFileSize) {
        return res.status(400).json({ error: 'File too large' });
      }
      
      // Generate upload ID
      const uploadId = this.generateUploadId();
      const totalChunks = Math.ceil(fileSize / this.chunkSize);
      
      // Store upload metadata
      this.uploads.set(uploadId, {
        userId,
        filename,
        fileSize,
        mimeType,
        checksum,
        totalChunks,
        uploadedChunks: new Set(),
        startTime: Date.now(),
        tempPath: path.join('./temp', uploadId)
      });
      
      // Create temporary directory
      await fs.promises.mkdir(`./temp/${uploadId}`, { recursive: true });
      
      res.json({
        uploadId,
        chunkSize: this.chunkSize,
        totalChunks
      });
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async uploadChunk(req, res) {
    try {
      const { uploadId, chunkIndex } = req.params;
      const chunk = req.file;
      
      const upload = this.uploads.get(uploadId);
      if (!upload) {
        return res.status(404).json({ error: 'Upload not found' });
      }
      
      // Validate chunk index
      if (chunkIndex < 0 || chunkIndex >= upload.totalChunks) {
        return res.status(400).json({ error: 'Invalid chunk index' });
      }
      
      // Save chunk to temporary file
      const chunkPath = path.join(upload.tempPath, `chunk-${chunkIndex}`);
      await fs.promises.writeFile(chunkPath, chunk.buffer);
      
      // Track uploaded chunk
      upload.uploadedChunks.add(parseInt(chunkIndex));
      
      // Check if all chunks are uploaded
      if (upload.uploadedChunks.size === upload.totalChunks) {
        const result = await this.assembleFile(uploadId);
        res.json({
          status: 'completed',
          fileId: result.fileId,
          url: result.url
        });
      } else {
        res.json({
          status: 'chunk_uploaded',
          uploadedChunks: upload.uploadedChunks.size,
          totalChunks: upload.totalChunks,
          progress: (upload.uploadedChunks.size / upload.totalChunks) * 100
        });
      }
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async assembleFile(uploadId) {
    const upload = this.uploads.get(uploadId);
    const outputPath = path.join('./uploads', upload.filename);
    
    // Create write stream for final file
    const writeStream = fs.createWriteStream(outputPath);
    
    // Read and combine chunks in order
    for (let i = 0; i < upload.totalChunks; i++) {
      const chunkPath = path.join(upload.tempPath, `chunk-${i}`);
      const chunkData = await fs.promises.readFile(chunkPath);
      writeStream.write(chunkData);
    }
    
    writeStream.end();
    
    // Wait for write to complete
    await new Promise((resolve, reject) => {
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });
    
    // Verify file integrity
    const isValid = await this.verifyFileIntegrity(outputPath, upload.checksum);
    if (!isValid) {
      throw new Error('File integrity check failed');
    }
    
    // Process final file (upload to S3, etc.)
    const result = await this.processFinalFile(outputPath, upload);
    
    // Cleanup temporary files
    await this.cleanupTempFiles(upload.tempPath);
    this.uploads.delete(uploadId);
    
    return result;
  }

  async verifyFileIntegrity(filePath, expectedChecksum) {
    const crypto = require('crypto');
    const fileBuffer = await fs.promises.readFile(filePath);
    const actualChecksum = crypto.createHash('sha256').update(fileBuffer).digest('hex');
    
    return actualChecksum === expectedChecksum;
  }

  async processFinalFile(filePath, upload) {
    // Upload to cloud storage
    const s3 = new AWS.S3();
    const key = `uploads/${upload.userId}/${Date.now()}-${upload.filename}`;
    
    const fileBuffer = await fs.promises.readFile(filePath);
    
    const result = await s3.upload({
      Bucket: process.env.S3_BUCKET,
      Key: key,
      Body: fileBuffer,
      ContentType: upload.mimeType,
      ACL: 'private'
    }).promise();
    
    // Save to database
    const fileRecord = await File.create({
      userId: upload.userId,
      originalName: upload.filename,
      s3Key: key,
      s3Location: result.Location,
      size: upload.fileSize,
      mimeType: upload.mimeType
    });
    
    // Cleanup local file
    await fs.promises.unlink(filePath);
    
    return {
      fileId: fileRecord.id,
      url: result.Location
    };
  }

  async cleanupTempFiles(tempPath) {
    try {
      await fs.promises.rm(tempPath, { recursive: true, force: true });
    } catch (error) {
      console.error('Failed to cleanup temp files:', error);
    }
  }

  generateUploadId() {
    return crypto.randomBytes(16).toString('hex');
  }
}

// Express routes for chunked upload
const chunkedHandler = new ChunkedUploadHandler();

app.post('/upload/chunked/initiate', authenticate, 
  chunkedHandler.initiateChunkedUpload.bind(chunkedHandler)
);

app.post('/upload/chunked/:uploadId/:chunkIndex',
  multer({ storage: multer.memoryStorage() }).single('chunk'),
  chunkedHandler.uploadChunk.bind(chunkedHandler)
);
```

---

## 4. Background Processing (Image Compression)

### Queue-Based Image Processing

```js
const Queue = require('bull');
const sharp = require('sharp');
const Redis = require('redis');

class ImageProcessingService {
  constructor() {
    this.redis = Redis.createClient();
    this.processingQueue = new Queue('image-processing', { redis: this.redis });
    this.setupProcessors();
  }

  setupProcessors() {
    // Image compression processor
    this.processingQueue.process('compress-image', 5, async (job) => {
      return await this.compressImage(job.data);
    });
    
    // Thumbnail generation processor
    this.processingQueue.process('generate-thumbnails', 3, async (job) => {
      return await this.generateThumbnails(job.data);
    });
    
    // Watermarking processor
    this.processingQueue.process('apply-watermark', 2, async (job) => {
      return await this.applyWatermark(job.data);
    });
    
    // Format conversion processor
    this.processingQueue.process('convert-format', 3, async (job) => {
      return await this.convertFormat(job.data);
    });
  }

  async queueImageProcessing(fileId, operations) {
    const jobs = [];
    
    for (const operation of operations) {
      const job = await this.processingQueue.add(
        operation.type,
        {
          fileId,
          ...operation.params
        },
        {
          priority: operation.priority || 5,
          attempts: 3,
          backoff: 'exponential'
        }
      );
      
      jobs.push(job);
    }
    
    return jobs;
  }

  async compressImage(data) {
    const { fileId, quality = 85, format = 'jpeg' } = data;
    
    try {
      // Get file from database
      const file = await File.findById(fileId);
      if (!file) throw new Error('File not found');
      
      // Download original from S3
      const s3 = new AWS.S3();
      const s3Object = await s3.getObject({
        Bucket: process.env.S3_BUCKET,
        Key: file.s3Key
      }).promise();
      
      // Process image
      let processedBuffer = await sharp(s3Object.Body)
        .jpeg({ quality, progressive: true })
        .toBuffer();
      
      // Upload compressed version
      const compressedKey = file.s3Key.replace(/(\.[^.]+)$/, '_compressed$1');
      
      await s3.upload({
        Bucket: process.env.S3_BUCKET,
        Key: compressedKey,
        Body: processedBuffer,
        ContentType: file.mimeType
      }).promise();
      
      // Update file record
      await File.findByIdAndUpdate(fileId, {
        $push: {
          processedVersions: {
            type: 'compressed',
            key: compressedKey,
            size: processedBuffer.length,
            quality: quality,
            createdAt: new Date()
          }
        }
      });
      
      return {
        success: true,
        compressedKey,
        originalSize: s3Object.ContentLength,
        compressedSize: processedBuffer.length,
        compressionRatio: (1 - processedBuffer.length / s3Object.ContentLength) * 100
      };
      
    } catch (error) {
      throw new Error(`Image compression failed: ${error.message}`);
    }
  }

  async generateThumbnails(data) {
    const { fileId, sizes = [150, 300, 600] } = data;
    
    try {
      const file = await File.findById(fileId);
      if (!file) throw new Error('File not found');
      
      const s3 = new AWS.S3();
      const s3Object = await s3.getObject({
        Bucket: process.env.S3_BUCKET,
        Key: file.s3Key
      }).promise();
      
      const thumbnails = [];
      
      for (const size of sizes) {
        const thumbnailBuffer = await sharp(s3Object.Body)
          .resize(size, size, { fit: 'cover' })
          .jpeg({ quality: 80 })
          .toBuffer();
        
        const thumbnailKey = file.s3Key.replace(/(\.[^.]+)$/, `_thumb_${size}$1`);
        
        await s3.upload({
          Bucket: process.env.S3_BUCKET,
          Key: thumbnailKey,
          Body: thumbnailBuffer,
          ContentType: file.mimeType
        }).promise();
        
        thumbnails.push({
          size,
          key: thumbnailKey,
          bytes: thumbnailBuffer.length
        });
      }
      
      // Update file record
      await File.findByIdAndUpdate(fileId, {
        $push: {
          processedVersions: {
            type: 'thumbnails',
            thumbnails: thumbnails,
            createdAt: new Date()
          }
        }
      });
      
      return { success: true, thumbnails };
      
    } catch (error) {
      throw new Error(`Thumbnail generation failed: ${error.message}`);
    }
  }

  async applyWatermark(data) {
    const { fileId, watermarkText, position = 'bottom-right' } = data;
    
    try {
      const file = await File.findById(fileId);
      if (!file) throw new Error('File not found');
      
      const s3 = new AWS.S3();
      const s3Object = await s3.getObject({
        Bucket: process.env.S3_BUCKET,
        Key: file.s3Key
      }).promise();
      
      // Create watermark
      const watermarkSvg = `
        <svg width="200" height="50" xmlns="http://www.w3.org/2000/svg">
          <text x="10" y="40" font-family="Arial" font-size="20" fill="white" opacity="0.7">
            ${watermarkText}
          </text>
        </svg>
      `;
      
      const watermarkBuffer = Buffer.from(watermarkSvg);
      
      // Apply watermark
      const watermarkedBuffer = await sharp(s3Object.Body)
        .composite([{ input: watermarkBuffer, gravity: position }])
        .jpeg({ quality: 90 })
        .toBuffer();
      
      // Upload watermarked version
      const watermarkedKey = file.s3Key.replace(/(\.[^.]+)$/, '_watermarked$1');
      
      await s3.upload({
        Bucket: process.env.S3_BUCKET,
        Key: watermarkedKey,
        Body: watermarkedBuffer,
        ContentType: file.mimeType
      }).promise();
      
      // Update file record
      await File.findByIdAndUpdate(fileId, {
        $push: {
          processedVersions: {
            type: 'watermarked',
            key: watermarkedKey,
            watermarkText,
            position,
            createdAt: new Date()
          }
        }
      });
      
      return { success: true, watermarkedKey };
      
    } catch (error) {
      throw new Error(`Watermark application failed: ${error.message}`);
    }
  }

  async convertFormat(data) {
    const { fileId, targetFormat } = data;
    
    try {
      const file = await File.findById(fileId);
      if (!file) throw new Error('File not found');
      
      const s3 = new AWS.S3();
      const s3Object = await s3.getObject({
        Bucket: process.env.S3_BUCKET,
        Key: file.s3Key
      }).promise();
      
      let convertedBuffer;
      let outputFormat;
      
      switch (targetFormat) {
        case 'png':
          convertedBuffer = await sharp(s3Object.Body).png().toBuffer();
          outputFormat = 'image/png';
          break;
        case 'webp':
          convertedBuffer = await sharp(s3Object.Body).webp().toBuffer();
          outputFormat = 'image/webp';
          break;
        case 'jpeg':
        default:
          convertedBuffer = await sharp(s3Object.Body).jpeg().toBuffer();
          outputFormat = 'image/jpeg';
          break;
      }
      
      // Upload converted version
      const convertedKey = file.s3Key.replace(/(\.[^.]+)$/, `.${targetFormat}`);
      
      await s3.upload({
        Bucket: process.env.S3_BUCKET,
        Key: convertedKey,
        Body: convertedBuffer,
        ContentType: outputFormat
      }).promise();
      
      // Update file record
      await File.findByIdAndUpdate(fileId, {
        $push: {
          processedVersions: {
            type: 'format_conversion',
            key: convertedKey,
            targetFormat,
            mimeType: outputFormat,
            createdAt: new Date()
          }
        }
      });
      
      return { success: true, convertedKey, outputFormat };
      
    } catch (error) {
      throw new Error(`Format conversion failed: ${error.message}`);
    }
  }
}
```

---

## Interview-Oriented Notes

**Advanced Concepts to Master:**

1. **Custom Storage Engines**: Building specialized storage solutions
2. **S3 Streaming**: Advanced cloud storage integration
3. **Chunked Uploads**: Handling large files efficiently
4. **Background Processing**: Queue-based image/video processing
5. **Performance Optimization**: Memory and CPU efficiency

**Common Advanced Interview Questions:**

- "How would you implement a custom storage engine for Multer?"
- "How do you handle video uploads with chunked uploads?"
- "Design an image processing pipeline with background jobs"
- "How do you implement streaming uploads to S3?"
- "How would you handle file format conversion on the fly?"

**Key Advanced Principles:**

- **Modular Design**: Separate concerns with custom engines
- **Scalability**: Use chunking and background processing
- **Performance**: Stream processing and efficient algorithms
- **Reliability**: Error handling and retry mechanisms
- **Flexibility**: Support multiple formats and processing options

**Production Advanced Features:**

- ✅ Custom storage engines
- ✅ Streaming S3 uploads
- ✅ Chunked file uploads
- ✅ Background image processing
- ✅ Format conversion
- ✅ Watermarking and thumbnails
- ✅ Queue-based processing
- ✅ Error handling and recovery

[← Production Best Practices](./05_production.md) | [Next → Performance & Optimization](./07_performance.md)
