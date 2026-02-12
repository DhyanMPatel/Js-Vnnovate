# 🔒 Security Considerations

## 1. File Type Validation vs MIME Spoofing

### The MIME Spoofing Problem

**What is MIME Spoofing?**
Attackers can rename malicious files to appear as legitimate files:
- `malware.exe` → `malware.jpg`
- `script.php` → `script.png`
- `virus.scr` → `virus.pdf`

**Why Multer's Basic Validation Isn't Enough:**
```js
// ❌ VULNERABLE - Only checks extension
const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.jpg', '.png', '.gif'];
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (allowedExtensions.includes(ext)) {
    cb(null, true); // Allows malware.exe renamed to malware.jpg
  } else {
    cb(new Error('Invalid file type'), false);
  }
};
```

### Secure File Type Validation

**1. MIME Type + Extension Validation:**
```js
const secureFileFilter = async (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'image/gif'];
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
  
  // Check MIME type
  if (!allowedMimes.includes(file.mimetype)) {
    return cb(new Error('Invalid MIME type'), false);
  }
  
  // Check extension
  const ext = path.extname(file.originalname).toLowerCase();
  if (!allowedExtensions.includes(ext)) {
    return cb(new Error('Invalid file extension'), false);
  }
  
  cb(null, true);
};
```

**2. Content-Based Validation (Most Secure):**
```js
const fileSignatureFilter = async (req, file, cb) => {
  const allowedSignatures = {
    'image/jpeg': ['ffd8ff'],
    'image/png': ['89504e47'],
    'image/gif': ['47494638']
  };
  
  try {
    // Read file signature (first few bytes)
    const buffer = file.buffer;
    const signature = buffer.toString('hex', 0, 6);
    
    // Check if signature matches declared MIME type
    const validSignatures = allowedSignatures[file.mimetype] || [];
    const isValidSignature = validSignatures.some(sig => 
      signature.startsWith(sig)
    );
    
    if (!isValidSignature) {
      return cb(new Error('File content does not match declared type'), false);
    }
    
    cb(null, true);
  } catch (error) {
    cb(new Error('File validation failed'), false);
  }
};
```

**3. Using file-type Library (Recommended):**
```js
const fileType = require('file-type');

const advancedFileFilter = async (req, file, cb) => {
  try {
    // Detect actual file type from buffer
    const typeInfo = await fileType.fromBuffer(file.buffer);
    
    if (!typeInfo) {
      return cb(new Error('Unable to determine file type'), false);
    }
    
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    
    if (!allowedTypes.includes(typeInfo.mime)) {
      return cb(new Error('File type not allowed'), false);
    }
    
    // Verify that detected type matches declared type
    if (typeInfo.mime !== file.mimetype) {
      return cb(new Error('File type mismatch'), false);
    }
    
    cb(null, true);
  } catch (error) {
    cb(new Error('File validation error'), false);
  }
};
```

---

## 2. File Extension vs Actual Content Validation

### The Extension vs Content Mismatch

**Attack Scenarios:**
1. **Double Extension**: `image.jpg.php`
2. **Null Bytes**: `image.jpg\0.php`
3. **Unicode Exploits**: `image.jpg.php` (using similar Unicode characters)
4. **Case Manipulation**: `image.JPG` vs `image.jpg`

### Comprehensive Validation Strategy

```js
const securityValidator = {
  // Clean filename to prevent directory traversal
  sanitizeFilename: (filename) => {
    // Remove path components
    const name = filename.replace(/^.*[\\\/]/, '');
    
    // Remove null bytes
    const cleanName = name.replace(/\0/g, '');
    
    // Remove dangerous characters
    const safeName = cleanName.replace(/[<>:"/\\|?*]/g, '_');
    
    // Limit length
    return safeName.substring(0, 255);
  },

  // Validate file extension
  validateExtension: (filename, allowedExtensions) => {
    const ext = path.extname(filename).toLowerCase();
    return allowedExtensions.includes(ext);
  },

  // Check for double extensions
  hasDoubleExtension: (filename) => {
    const parts = filename.split('.');
    return parts.length > 2;
  },

  // Comprehensive file validation
  validateFile: async (file, allowedTypes) => {
    const errors = [];
    
    // 1. Sanitize filename
    const safeFilename = securityValidator.sanitizeFilename(file.originalname);
    
    // 2. Check for double extensions
    if (securityValidator.hasDoubleExtension(file.originalname)) {
      errors.push('Double extension not allowed');
    }
    
    // 3. Validate extension
    const allowedExtensions = allowedTypes.map(type => 
      type.split('/')[1] === 'jpeg' ? '.jpg' : `.${type.split('/')[1]}`
    );
    
    if (!securityValidator.validateExtension(file.originalname, allowedExtensions)) {
      errors.push('File extension not allowed');
    }
    
    // 4. Validate MIME type
    if (!allowedTypes.includes(file.mimetype)) {
      errors.push('MIME type not allowed');
    }
    
    // 5. Validate actual content
    try {
      const typeInfo = await fileType.fromBuffer(file.buffer);
      
      if (!typeInfo || !allowedTypes.includes(typeInfo.mime)) {
        errors.push('File content type not allowed');
      }
      
      // Check for content/MIME mismatch
      if (typeInfo && typeInfo.mime !== file.mimetype) {
        errors.push('File content does not match declared type');
      }
    } catch (error) {
      errors.push('Unable to validate file content');
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      safeFilename
    };
  }
};

// Usage in Multer
const secureUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter: async (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const validation = await securityValidator.validateFile(file, allowedTypes);
    
    if (!validation.isValid) {
      return cb(new Error(validation.errors.join(', ')), false);
    }
    
    // Store safe filename for later use
    file.safeName = validation.safeFilename;
    cb(null, true);
  }
});
```

---

## 3. Preventing Malicious File Uploads

### Common Malicious File Types

| Category | Examples | Dangers |
|----------|----------|---------|
| **Executables** | `.exe`, `.scr`, `.bat`, `.com` | Code execution |
| **Scripts** | `.php`, `.js`, `.py`, `.rb` | Server-side execution |
| **Documents with Macros** | `.doc`, `.xls`, `.ppt` | Macro viruses |
| **Archives** | `.zip`, `.rar`, `.7z` | Hidden malicious files |
| **Configuration** | `.htaccess`, `.web.config` | Server configuration |

### Multi-Layer Security Approach

```js
class MalwareProtection {
  constructor() {
    this.virusScanner = new VirusScanner();
    this.contentAnalyzer = new ContentAnalyzer();
  }

  async scanFile(file) {
    const scanResults = {
      passed: true,
      threats: [],
      actions: []
    };

    // 1. Signature-based virus scanning
    const virusScan = await this.virusScanner.scan(file.buffer);
    if (virusScan.infected) {
      scanResults.passed = false;
      scanResults.threats.push(`Virus detected: ${virusScan.threat}`);
      scanResults.actions.push('QUARANTINE');
      return scanResults;
    }

    // 2. Content analysis for suspicious patterns
    const contentAnalysis = await this.contentAnalyzer.analyze(file.buffer);
    if (contentAnalysis.suspicious) {
      scanResults.passed = false;
      scanResults.threats.push(...contentAnalysis.threats);
      scanResults.actions.push('MANUAL_REVIEW');
    }

    // 3. Script content detection
    if (this.containsScripts(file.buffer, file.originalname)) {
      scanResults.passed = false;
      scanResults.threats.push('Script content detected');
      scanResults.actions.push('BLOCK');
    }

    // 4. Embedded file detection
    const embeddedFiles = this.detectEmbeddedFiles(file.buffer);
    if (embeddedFiles.length > 0) {
      scanResults.threats.push(`${embeddedFiles.length} embedded files found`);
      scanResults.actions.push('EXTRACT_AND_SCAN');
    }

    return scanResults;
  }

  containsScripts(buffer, filename) {
    const scriptPatterns = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /<%\s*.*?\s*%>/g,
      /<\?php\s*.*?\?>/gi,
      /javascript:/gi,
      /vbscript:/gi,
      /on\w+\s*=/gi
    ];

    const content = buffer.toString('utf8', 0, Math.min(buffer.length, 1024));
    
    return scriptPatterns.some(pattern => pattern.test(content));
  }

  detectEmbeddedFiles(buffer) {
    // Simple detection of embedded files in archives
    const zipSignatures = ['504b0304', '504b0506', '504b0708'];
    const rarSignatures = ['526172211a0700'];
    const signature = buffer.toString('hex', 0, 10);
    
    const embedded = [];
    
    if (zipSignatures.some(sig => signature.startsWith(sig))) {
      embedded.push('ZIP archive');
    }
    
    if (rarSignatures.some(sig => signature.startsWith(sig))) {
      embedded.push('RAR archive');
    }
    
    return embedded;
  }
}

// Integration with Multer
const malwareProtection = new MalwareProtection();

const secureUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter: async (req, file, cb) => {
    try {
      // Pre-validation
      const basicValidation = await securityValidator.validateFile(file, allowedTypes);
      if (!basicValidation.isValid) {
        return cb(new Error(basicValidation.errors.join(', ')), false);
      }

      // Malware scanning
      const scanResults = await malwareProtection.scanFile(file);
      if (!scanResults.passed) {
        // Log security incident
        await securityLogger.logIncident({
          type: 'MALICIOUS_UPLOAD',
          file: file.originalname,
          threats: scanResults.threats,
          ip: req.ip,
          userAgent: req.get('User-Agent')
        });
        
        return cb(new Error('File contains malicious content'), false);
      }

      cb(null, true);
    } catch (error) {
      cb(new Error('Security validation failed'), false);
    }
  }
});
```

---

## 4. Rate Limiting and Abuse Prevention

### Upload Rate Limiting

```js
const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');

class UploadRateLimiter {
  constructor() {
    this.redis = Redis.createClient();
    
    // Different limits for different user types
    this.limits = {
      anonymous: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 5, // 5 uploads
        message: 'Too many uploads. Please register to upload more.'
      },
      user: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 50, // 50 uploads
        message: 'Upload limit exceeded. Please try again later.'
      },
      premium: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 200, // 200 uploads
        message: 'Upload limit exceeded. Please try again later.'
      }
    };
  }

  getMiddleware(userType) {
    const limit = this.limits[userType] || this.limits.anonymous;
    
    return rateLimit({
      store: new RedisStore({
        sendCommand: (...args) => this.redis.call(...args)
      }),
      windowMs: limit.windowMs,
      max: limit.max,
      message: limit.message,
      keyGenerator: (req) => {
        return `upload:${req.ip}:${userType}`;
      },
      skip: (req) => {
        // Skip rate limiting for admin users
        return req.user?.role === 'admin';
      }
    });
  }

  // Size-based rate limiting
  getSizeBasedLimit(userType) {
    const sizeLimits = {
      anonymous: 100 * 1024 * 1024, // 100MB per 15 minutes
      user: 1024 * 1024 * 1024,    // 1GB per 15 minutes
      premium: 10 * 1024 * 1024 * 1024 // 10GB per 15 minutes
    };
    
    return sizeLimits[userType] || sizeLimits.anonymous;
  }

  async checkSizeLimit(req, file) {
    const userType = req.user?.type || 'anonymous';
    const limit = this.getSizeBasedLimit(userType);
    const key = `upload:size:${req.ip}:${userType}`;
    
    // Get current usage
    const currentUsage = await this.redis.get(key) || 0;
    const newUsage = parseInt(currentUsage) + file.size;
    
    if (newUsage > limit) {
      throw new Error(`Size limit exceeded. Maximum: ${limit / 1024 / 1024}MB`);
    }
    
    // Update usage with expiration
    await this.redis.setex(key, 900, newUsage.toString()); // 15 minutes
  }
}

// Usage
const uploadRateLimiter = new UploadRateLimiter();

app.post('/upload',
  uploadRateLimiter.getMiddleware('user'),
  async (req, res, next) => {
    try {
      await uploadRateLimiter.checkSizeLimit(req, req.file);
      next();
    } catch (error) {
      res.status(429).json({ error: error.message });
    }
  },
  secureUpload.single('file'),
  (req, res) => {
    res.json({ message: 'File uploaded successfully' });
  }
);
```

### Advanced Abuse Detection

```js
class AbuseDetector {
  constructor() {
    this.redis = Redis.createClient();
    this.suspiciousPatterns = new Map();
  }

  async detectAbuse(req, file) {
    const indicators = [];
    const score = 0;

    // 1. Rapid successive uploads
    const rapidUploads = await this.checkRapidUploads(req.ip);
    if (rapidUploads) {
      indicators.push('Rapid successive uploads');
      score += 30;
    }

    // 2. Similar file names (potential automation)
    const similarNames = await this.checkSimilarFileNames(req.ip, file.originalname);
    if (similarNames) {
      indicators.push('Similar file names detected');
      score += 20;
    }

    // 3. File size anomalies
    const sizeAnomaly = this.checkSizeAnomaly(file.size);
    if (sizeAnomaly) {
      indicators.push('Unusual file size pattern');
      score += 15;
    }

    // 4. Geographic anomalies
    const geoAnomaly = await this.checkGeographicAnomaly(req.ip);
    if (geoAnomaly) {
      indicators.push('Geographic anomaly detected');
      score += 25;
    }

    // 5. User agent analysis
    const uaAnomaly = this.analyzeUserAgent(req.get('User-Agent'));
    if (uaAnomaly) {
      indicators.push('Suspicious user agent');
      score += 10;
    }

    return {
      isSuspicious: score > 50,
      score,
      indicators
    };
  }

  async checkRapidUploads(ip) {
    const key = `uploads:rapid:${ip}`;
    const now = Date.now();
    const window = 60 * 1000; // 1 minute
    
    // Add current upload
    await this.redis.zadd(key, now, now.toString());
    
    // Remove old entries
    await this.redis.zremrangebyscore(key, 0, now - window);
    
    // Count recent uploads
    const count = await this.redis.zcard(key);
    
    return count > 10; // More than 10 uploads in 1 minute
  }

  async checkSimilarFileNames(ip, filename) {
    const key = `uploads:names:${ip}`;
    const normalized = filename.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Get recent filenames
    const recentNames = await this.redis.lrange(key, 0, 9);
    
    // Check for similarity (simple pattern matching)
    const similar = recentNames.some(name => {
      const existing = name.toLowerCase().replace(/[^a-z0-9]/g, '');
      return this.calculateSimilarity(normalized, existing) > 0.8;
    });
    
    // Add current filename
    await this.redis.lpush(key, filename);
    await this.redis.ltrim(key, 0, 9); // Keep last 10
    
    return similar;
  }

  calculateSimilarity(str1, str2) {
    // Simple Levenshtein distance similarity
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const distance = this.levenshteinDistance(longer, shorter);
    return (longer.length - distance) / longer.length;
  }

  levenshteinDistance(str1, str2) {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
  }
}
```

---

## 5. Virus Scanning Integration

### ClamAV Integration

```js
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

class VirusScanner {
  constructor() {
    this.clamscan = require('clamscan');
    this.scanner = null;
    this.initScanner();
  }

  async initScanner() {
    try {
      this.scanner = await this.clamscan.init({
        removeInfected: false, // Don't remove, just quarantine
        quarantineInfected: true,
        scanLog: '/var/log/clamav/scan.log',
        debugMode: false,
        clamscan: {
          path: '/usr/bin/clamscan',
          db: '/var/lib/clamav',
          scanArchives: true,
          active: true
        }
      });
    } catch (error) {
      console.error('Failed to initialize virus scanner:', error);
    }
  }

  async scanFile(buffer, filename) {
    if (!this.scanner) {
      return { infected: false, viruses: [] };
    }

    try {
      // Create temporary file
      const tempPath = path.join('/tmp', `scan-${Date.now()}-${filename}`);
      fs.writeFileSync(tempPath, buffer);

      // Scan file
      const scanResult = await this.scanner.scanFile(tempPath);
      
      // Clean up temporary file
      fs.unlinkSync(tempPath);

      return {
        infected: scanResult.isInfected,
        viruses: scanResult.viruses || [],
        file: scanResult.file
      };
      
    } catch (error) {
      console.error('Virus scan failed:', error);
      return { infected: false, viruses: [], error: error.message };
    }
  }

  async scanWithClamAV(buffer) {
    return new Promise((resolve) => {
      const tempFile = `/tmp/scan-${Date.now()}`;
      fs.writeFileSync(tempFile, buffer);

      exec(`clamscan --no-summary ${tempFile}`, (error, stdout, stderr) => {
        fs.unlinkSync(tempFile);
        
        if (error) {
          if (error.message.includes('FOUND')) {
            const virus = error.message.split('FOUND')[1].trim();
            resolve({ infected: true, virus });
          } else {
            resolve({ infected: false, error: error.message });
          }
        } else {
          resolve({ infected: false });
        }
      });
    });
  }
}

// Integration with Multer
const virusScanner = new VirusScanner();

const secureUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter: async (req, file, cb) => {
    try {
      // Basic validation first
      const basicValidation = await securityValidator.validateFile(file, allowedTypes);
      if (!basicValidation.isValid) {
        return cb(new Error(basicValidation.errors.join(', ')), false);
      }

      // Virus scanning
      const scanResult = await virusScanner.scanFile(file.buffer, file.originalname);
      
      if (scanResult.infected) {
        // Log security incident
        await securityLogger.logIncident({
          type: 'VIRUS_DETECTED',
          file: file.originalname,
          virus: scanResult.viruses.join(', '),
          ip: req.ip,
          timestamp: new Date()
        });
        
        return cb(new Error('File contains virus'), false);
      }

      cb(null, true);
    } catch (error) {
      cb(new Error('Security scan failed'), false);
    }
  }
});
```

---

## 6. Temporary File Cleanup

### Automatic Cleanup Strategy

```js
const fs = require('fs');
const path = require('path');
const cron = require('node-cron');

class TempFileManager {
  constructor() {
    this.tempDirectories = [
      './uploads/temp',
      './uploads/processing',
      './uploads/quarantine'
    ];
    this.maxAge = 24 * 60 * 60 * 1000; // 24 hours
    this.setupCleanupSchedule();
  }

  setupCleanupSchedule() {
    // Run cleanup every hour
    cron.schedule('0 * * * *', async () => {
      await this.cleanupTempFiles();
    });
  }

  async cleanupTempFiles() {
    const now = Date.now();
    let totalCleaned = 0;

    for (const dir of this.tempDirectories) {
      try {
        const files = await fs.promises.readdir(dir);
        
        for (const file of files) {
          const filePath = path.join(dir, file);
          const stats = await fs.promises.stat(filePath);
          
          // Remove files older than maxAge
          if (now - stats.mtime.getTime() > this.maxAge) {
            await fs.promises.unlink(filePath);
            totalCleaned++;
            
            console.log(`Cleaned up old file: ${filePath}`);
          }
        }
      } catch (error) {
        console.error(`Error cleaning directory ${dir}:`, error);
      }
    }

    console.log(`Cleanup completed. Removed ${totalCleaned} files.`);
    
    // Log cleanup metrics
    await this.logCleanupMetrics(totalCleaned);
  }

  async logCleanupMetrics(cleanedCount) {
    // Send metrics to monitoring system
    await metricsService.gauge('temp_files.cleaned', cleanedCount);
    await metricsService.increment('temp_files.cleanup_runs');
  }

  // Manual cleanup for specific files
  async cleanupFile(filePath) {
    try {
      await fs.promises.unlink(filePath);
      return true;
    } catch (error) {
      console.error(`Failed to cleanup file ${filePath}:`, error);
      return false;
    }
  }

  // Cleanup on application shutdown
  async gracefulShutdown() {
    console.log('Performing final cleanup before shutdown...');
    await this.cleanupTempFiles();
  }
}

// Usage
const tempManager = new TempFileManager();

// Graceful shutdown
process.on('SIGTERM', async () => {
  await tempManager.gracefulShutdown();
  process.exit(0);
});

process.on('SIGINT', async () => {
  await tempManager.gracefulShutdown();
  process.exit(0);
});
```

---

## 7. Avoiding Public Directory Exposure

### Secure Directory Structure

```js
const secureStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Never use public directories for uploads
    const safeDirectories = {
      'image': '/var/www/uploads/images',
      'document': '/var/www/uploads/documents',
      'temp': '/var/www/uploads/temp'
    };
    
    const fileType = this.getFileType(file.mimetype);
    const uploadDir = safeDirectories[fileType] || safeDirectories.temp;
    
    // Ensure directory exists with proper permissions
    fs.mkdirSync(uploadDir, { recursive: true });
    fs.chmodSync(uploadDir, 0o750); // rwxr-x---
    
    cb(null, uploadDir);
  },
  
  filename: (req, file, cb) => {
    // Generate secure filename
    const crypto = require('crypto');
    const uniqueSuffix = crypto.randomBytes(16).toString('hex');
    const ext = path.extname(file.originalname);
    const safeName = `${uniqueSuffix}${ext}`;
    
    cb(null, safeName);
  }
});

// Secure file serving middleware
const serveFile = (req, res) => {
  const { fileId } = req.params;
  const { userId } = req.user;
  
  // Verify user has permission to access this file
  const fileRecord = await getFileRecord(fileId);
  
  if (!fileRecord || fileRecord.userId !== userId) {
    return res.status(403).json({ error: 'Access denied' });
  }
  
  // Check if file exists
  const filePath = path.join(fileRecord.directory, fileRecord.filename);
  
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }
  
  // Set security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Content-Security-Policy', "default-src 'none'");
  
  // Serve file with proper MIME type
  res.sendFile(filePath);
};
```

### Nginx Configuration for Secure File Serving

```nginx
# /etc/nginx/sites-available/secure-uploads
server {
    listen 80;
    server_name your-domain.com;
    
    # Block access to upload directories
    location ~* ^/uploads/ {
        deny all;
        return 404;
    }
    
    # Secure file serving through application
    location /files/ {
        # Proxy to Node.js application for authentication
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        
        # Security headers
        add_header X-Content-Type-Options nosniff;
        add_header X-Frame-Options DENY;
        add_header X-XSS-Protection "1; mode=block";
    }
    
    # Prevent directory listing
    location ~* /\. {
        deny all;
    }
}
```

---

## 8. Secure Cloud Storage Access (S3 Signed URLs)

### Presigned URL Upload Strategy

```js
const AWS = require('aws-sdk');
const crypto = require('crypto');

class SecureS3Uploader {
  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION
    });
    
    this.bucket = process.env.S3_BUCKET;
  }

  // Generate presigned URL for direct upload
  async generateUploadUrl(userId, filename, contentType, maxSize) {
    const key = `uploads/${userId}/${Date.now()}-${crypto.randomBytes(8).toString('hex')}-${filename}`;
    
    const params = {
      Bucket: this.bucket,
      Key: key,
      ContentType: contentType,
      ContentLength: maxSize,
      Expires: 3600, // 1 hour
      ACL: 'private'
    };
    
    try {
      const uploadUrl = await this.s3.getSignedUrl('putObject', params);
      
      // Store file metadata in database
      await this.createFileRecord({
        userId,
        key,
        originalName: filename,
        contentType,
        maxSize,
        status: 'pending',
        createdAt: new Date()
      });
      
      return {
        uploadUrl,
        key,
        expiresIn: 3600
      };
    } catch (error) {
      throw new Error(`Failed to generate upload URL: ${error.message}`);
    }
  }

  // Handle upload completion callback
  async handleUploadComplete(userId, key) {
    try {
      // Verify file exists in S3
      const headObject = await this.s3.headObject({
        Bucket: this.bucket,
        Key: key
      }).promise();
      
      // Update file record
      await this.updateFileRecord(key, {
        status: 'completed',
        size: headObject.ContentLength,
        etag: headObject.ETag,
        completedAt: new Date()
      });
      
      // Generate access URL (if needed)
      const accessUrl = await this.generateAccessUrl(key);
      
      return {
        status: 'completed',
        size: headObject.ContentLength,
        accessUrl
      };
    } catch (error) {
      await this.updateFileRecord(key, {
        status: 'failed',
        error: error.message
      });
      throw error;
    }
  }

  // Generate secure access URL
  async generateAccessUrl(key, expiresIn = 3600) {
    const params = {
      Bucket: this.bucket,
      Key: key,
      Expires: expiresIn
    };
    
    return await this.s3.getSignedUrl('getObject', params);
  }

  // Validate uploaded file
  async validateUploadedFile(key, expectedMetadata) {
    try {
      const headObject = await this.s3.headObject({
        Bucket: this.bucket,
        Key: key
      }).promise();
      
      // Check file size
      if (headObject.ContentLength > expectedMetadata.maxSize) {
        await this.deleteFile(key);
        throw new Error('File size exceeds limit');
      }
      
      // Check content type
      if (headObject.ContentType !== expectedMetadata.contentType) {
        await this.deleteFile(key);
        throw new Error('Content type mismatch');
      }
      
      return true;
    } catch (error) {
      throw new Error(`File validation failed: ${error.message}`);
    }
  }

  async deleteFile(key) {
    await this.s3.deleteObject({
      Bucket: this.bucket,
      Key: key
    }).promise();
  }
}

// API endpoints for presigned URL upload
const s3Uploader = new SecureS3Uploader();

app.post('/upload/request', authenticate, async (req, res) => {
  try {
    const { filename, contentType, maxSize } = req.body;
    const userId = req.user.id;
    
    // Validate request
    const validation = await securityValidator.validateUploadRequest({
      filename,
      contentType,
      maxSize,
      userId
    });
    
    if (!validation.isValid) {
      return res.status(400).json({ error: validation.error });
    }
    
    // Generate upload URL
    const uploadData = await s3Uploader.generateUploadUrl(
      userId, 
      filename, 
      contentType, 
      maxSize
    );
    
    res.json(uploadData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/upload/complete', authenticate, async (req, res) => {
  try {
    const { key } = req.body;
    const userId = req.user.id;
    
    // Verify ownership
    const fileRecord = await getFileRecord(key);
    if (!fileRecord || fileRecord.userId !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    // Handle completion
    const result = await s3Uploader.handleUploadComplete(userId, key);
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

---

## Interview-Oriented Notes

**Security Topics to Master:**

1. **File Validation**: MIME type, extension, and content validation
2. **Malware Prevention**: Virus scanning and content analysis
3. **Rate Limiting**: Preventing abuse and DoS attacks
4. **Access Control**: Secure file serving and permissions
5. **Storage Security**: Cloud storage with presigned URLs

**Common Security Interview Questions:**

- "How do you prevent malicious file uploads?"
- "What is MIME spoofing and how do you prevent it?"
- "How would you implement virus scanning for uploads?"
- "Why should you never store uploads in public directories?"
- "How do presigned URLs improve upload security?"

**Key Security Principles:**

- **Never trust client-provided data**
- **Always validate file content, not just extensions**
- **Implement multiple layers of security**
- **Use cloud storage with proper access controls**
- **Monitor and log all upload activities**

**Production Security Checklist:**

- ✅ Content-based file validation
- ✅ Virus scanning integration
- ✅ Rate limiting and abuse detection
- ✅ Secure storage with access controls
- ✅ Temporary file cleanup
- ✅ Security incident logging
- ✅ Regular security audits

[← Architecture & System Design](./03_architecture.md) | [Next → Production Best Practices](./05_production.md)
