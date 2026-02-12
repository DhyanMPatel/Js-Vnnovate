# 💻 Code Examples & Implementation Patterns

## 1. Basic Single File Upload

### 1.1 Simple Implementation

```js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// Initialize upload middleware
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Upload endpoint
app.post('/upload', upload.single('profileImage'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // File information
    const fileInfo = {
      originalName: req.file.originalname,
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
      mimetype: req.file.mimetype,
      uploadTime: new Date().toISOString()
    };

    // Generate public URL
    const publicUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    res.json({
      message: 'File uploaded successfully',
      file: fileInfo,
      url: publicUrl
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 1.2 HTML Form for Testing

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>File Upload Test</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
        }
        .upload-form {
            border: 2px dashed #ccc;
            padding: 20px;
            text-align: center;
            margin: 20px 0;
        }
        .file-input {
            margin: 20px 0;
        }
        .submit-btn {
            background: #007bff;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        .submit-btn:hover {
            background: #0056b3;
        }
        .result {
            margin-top: 20px;
            padding: 10px;
            border-radius: 5px;
        }
        .success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        .error {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
    </style>
</head>
<body>
    <h1>Single File Upload</h1>
    
    <form class="upload-form" action="/upload" method="post" enctype="multipart/form-data">
        <h3>Choose a file to upload</h3>
        <input type="file" name="profileImage" class="file-input" accept="image/*" required>
        <br>
        <button type="submit" class="submit-btn">Upload File</button>
    </form>
    
    <div id="result"></div>

    <script>
        const form = document.querySelector('.upload-form');
        const resultDiv = document.getElementById('result');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            
            try {
                const response = await fetch('/upload', {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    resultDiv.className = 'result success';
                    resultDiv.innerHTML = `
                        <h3>Upload Successful!</h3>
                        <p><strong>Original Name:</strong> ${data.file.originalName}</p>
                        <p><strong>File Size:</strong> ${(data.file.size / 1024).toFixed(2)} KB</p>
                        <p><strong>File Type:</strong> ${data.file.mimetype}</p>
                        <p><strong>Download URL:</strong> <a href="${data.url}" target="_blank">${data.url}</a></p>
                        ${data.file.mimetype.startsWith('image/') ? `<img src="${data.url}" style="max-width: 300px; margin-top: 10px;" alt="Uploaded image">` : ''}
                    `;
                } else {
                    resultDiv.className = 'result error';
                    resultDiv.innerHTML = `<h3>Upload Failed</h3><p>${data.error}</p>`;
                }
            } catch (error) {
                resultDiv.className = 'result error';
                resultDiv.innerHTML = `<h3>Network Error</h3><p>${error.message}</p>`;
            }
        });
    </script>
</body>
</html>
```

---

## 2. Multiple File Upload

### 2.1 Array Upload Implementation

```js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// Configure storage for multiple files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/gallery/';
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename with original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'image-' + uniqueSuffix + ext);
  }
});

// File filter for images only
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.'), false);
  }
};

// Configure upload for multiple files
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB per file
    files: 10 // Maximum 10 files
  }
});

// Multiple file upload endpoint
app.post('/upload-multiple', upload.array('galleryImages', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    // Process uploaded files
    const uploadedFiles = req.files.map(file => ({
      originalName: file.originalname,
      filename: file.filename,
      path: file.path,
      size: file.size,
      mimetype: file.mimetype,
      url: `${req.protocol}://${req.get('host')}/uploads/gallery/${file.filename}`
    }));

    // Calculate total size
    const totalSize = req.files.reduce((sum, file) => sum + file.size, 0);

    res.json({
      message: `${req.files.length} files uploaded successfully`,
      files: uploadedFiles,
      summary: {
        totalFiles: req.files.length,
        totalSize: totalSize,
        totalSizeMB: (totalSize / 1024 / 1024).toFixed(2),
        uploadTime: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Multiple upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Get gallery endpoint
app.get('/gallery', (req, res) => {
  const galleryDir = 'uploads/gallery/';
  
  try {
    if (!fs.existsSync(galleryDir)) {
      return res.json({ images: [] });
    }

    const files = fs.readdirSync(galleryDir)
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
      })
      .map(file => ({
        filename: file,
        url: `${req.protocol}://${req.get('host')}/uploads/gallery/${file}`,
        size: fs.statSync(path.join(galleryDir, file)).size
      }));

    res.json({ images: files });

  } catch (error) {
    console.error('Gallery error:', error);
    res.status(500).json({ error: 'Failed to load gallery' });
  }
});

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 2.2 Multiple Upload HTML Interface

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Multiple File Upload</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
        }
        .upload-area {
            border: 2px dashed #007bff;
            padding: 40px;
            text-align: center;
            margin: 20px 0;
            border-radius: 10px;
            background: #f8f9fa;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .upload-area:hover {
            background: #e9ecef;
            border-color: #0056b3;
        }
        .upload-area.dragover {
            background: #e3f2fd;
            border-color: #1976d2;
        }
        .file-input {
            display: none;
        }
        .file-list {
            margin: 20px 0;
        }
        .file-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            margin: 5px 0;
            background: #f8f9fa;
            border-radius: 5px;
            border: 1px solid #dee2e6;
        }
        .file-item button {
            background: #dc3545;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 3px;
            cursor: pointer;
        }
        .upload-btn {
            background: #28a745;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            margin-top: 20px;
        }
        .upload-btn:disabled {
            background: #6c757d;
            cursor: not-allowed;
        }
        .progress-bar {
            width: 100%;
            height: 20px;
            background: #e9ecef;
            border-radius: 10px;
            overflow: hidden;
            margin: 10px 0;
        }
        .progress-fill {
            height: 100%;
            background: #007bff;
            transition: width 0.3s ease;
        }
        .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 30px;
        }
        .gallery-item {
            border: 1px solid #dee2e6;
            border-radius: 8px;
            overflow: hidden;
        }
        .gallery-item img {
            width: 100%;
            height: 150px;
            object-fit: cover;
        }
        .gallery-info {
            padding: 10px;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <h1>Multiple File Upload Gallery</h1>
    
    <div class="upload-area" id="uploadArea">
        <h3>📁 Drop files here or click to select</h3>
        <p>Maximum 10 files, 10MB each</p>
        <input type="file" id="fileInput" class="file-input" multiple accept="image/*">
    </div>
    
    <div class="file-list" id="fileList"></div>
    
    <button class="upload-btn" id="uploadBtn" disabled>Upload Files</button>
    
    <div class="progress-bar" id="progressBar" style="display: none;">
        <div class="progress-fill" id="progressFill"></div>
    </div>
    
    <div id="result"></div>
    
    <h2>Gallery</h2>
    <div class="gallery" id="gallery"></div>

    <script>
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');
        const fileList = document.getElementById('fileList');
        const uploadBtn = document.getElementById('uploadBtn');
        const progressBar = document.getElementById('progressBar');
        const progressFill = document.getElementById('progressFill');
        const result = document.getElementById('result');
        const gallery = document.getElementById('gallery');
        
        let selectedFiles = [];

        // Click to upload
        uploadArea.addEventListener('click', () => fileInput.click());
        
        // File selection
        fileInput.addEventListener('change', (e) => {
            handleFiles(e.target.files);
        });
        
        // Drag and drop
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });
        
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });
        
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            handleFiles(e.dataTransfer.files);
        });
        
        function handleFiles(files) {
            const maxFiles = 10;
            const maxSize = 10 * 1024 * 1024; // 10MB
            
            for (let file of files) {
                if (selectedFiles.length >= maxFiles) {
                    alert('Maximum 10 files allowed');
                    break;
                }
                
                if (file.size > maxSize) {
                    alert(`${file.name} is too large (max 10MB)`);
                    continue;
                }
                
                if (!file.type.startsWith('image/')) {
                    alert(`${file.name} is not an image`);
                    continue;
                }
                
                selectedFiles.push(file);
            }
            
            updateFileList();
            uploadBtn.disabled = selectedFiles.length === 0;
        }
        
        function updateFileList() {
            fileList.innerHTML = '';
            
            selectedFiles.forEach((file, index) => {
                const fileItem = document.createElement('div');
                fileItem.className = 'file-item';
                
                fileItem.innerHTML = `
                    <span>${file.name} (${(file.size / 1024).toFixed(2)} KB)</span>
                    <button onclick="removeFile(${index})">Remove</button>
                `;
                
                fileList.appendChild(fileItem);
            });
        }
        
        function removeFile(index) {
            selectedFiles.splice(index, 1);
            updateFileList();
            uploadBtn.disabled = selectedFiles.length === 0;
        }
        
        // Upload files
        uploadBtn.addEventListener('click', uploadFiles);
        
        async function uploadFiles() {
            if (selectedFiles.length === 0) return;
            
            const formData = new FormData();
            selectedFiles.forEach(file => {
                formData.append('galleryImages', file);
            });
            
            uploadBtn.disabled = true;
            progressBar.style.display = 'block';
            result.innerHTML = '';
            
            try {
                const response = await fetch('/upload-multiple', {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    result.innerHTML = `
                        <div style="background: #d4edda; color: #155724; padding: 10px; border-radius: 5px; margin: 10px 0;">
                            <h3>✅ Upload Successful!</h3>
                            <p>${data.message}</p>
                            <p>Total size: ${data.summary.totalSizeMB} MB</p>
                        </div>
                    `;
                    
                    // Clear file list
                    selectedFiles = [];
                    updateFileList();
                    
                    // Reload gallery
                    loadGallery();
                } else {
                    result.innerHTML = `
                        <div style="background: #f8d7da; color: #721c24; padding: 10px; border-radius: 5px; margin: 10px 0;">
                            <h3>❌ Upload Failed</h3>
                            <p>${data.error}</p>
                        </div>
                    `;
                }
            } catch (error) {
                result.innerHTML = `
                    <div style="background: #f8d7da; color: #721c24; padding: 10px; border-radius: 5px; margin: 10px 0;">
                        <h3>❌ Network Error</h3>
                        <p>${error.message}</p>
                    </div>
                `;
            } finally {
                uploadBtn.disabled = false;
                progressBar.style.display = 'none';
                progressFill.style.width = '0%';
            }
        }
        
        // Load gallery
        async function loadGallery() {
            try {
                const response = await fetch('/gallery');
                const data = await response.json();
                
                gallery.innerHTML = '';
                
                data.images.forEach(image => {
                    const galleryItem = document.createElement('div');
                    galleryItem.className = 'gallery-item';
                    
                    galleryItem.innerHTML = `
                        <img src="${image.url}" alt="${image.filename}">
                        <div class="gallery-info">
                            <div>${image.filename}</div>
                            <div>${(image.size / 1024).toFixed(2)} KB</div>
                        </div>
                    `;
                    
                    gallery.appendChild(galleryItem);
                });
            } catch (error) {
                console.error('Failed to load gallery:', error);
            }
        }
        
        // Load gallery on page load
        loadGallery();
    </script>
</body>
</html>
```

---

## 3. File Filter Validation Example

### 3.1 Advanced File Validation

```js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// File type configurations
const FILE_TYPES = {
  images: {
    mimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
    extensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
    maxSize: 10 * 1024 * 1024 // 10MB
  },
  documents: {
    mimeTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    extensions: ['.pdf', '.doc', '.docx'],
    maxSize: 50 * 1024 * 1024 // 50MB
  },
  videos: {
    mimeTypes: ['video/mp4', 'video/avi', 'video/mov', 'video/wmv'],
    extensions: ['.mp4', '.avi', '.mov', '.wmv'],
    maxSize: 500 * 1024 * 1024 // 500MB
  }
};

// Advanced file filter
const createFileFilter = (allowedCategory) => {
  return (req, file, cb) => {
    const category = FILE_TYPES[allowedCategory];
    
    if (!category) {
      return cb(new Error('Invalid file category'), false);
    }
    
    // Check MIME type
    if (!category.mimeTypes.includes(file.mimetype)) {
      return cb(new Error(`Invalid file type. Allowed types: ${category.mimeTypes.join(', ')}`), false);
    }
    
    // Check file extension
    const ext = path.extname(file.originalname).toLowerCase();
    if (!category.extensions.includes(ext)) {
      return cb(new Error(`Invalid file extension. Allowed extensions: ${category.extensions.join(', ')}`), false);
    }
    
    cb(null, true);
  };
};

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const category = req.params.category || 'images';
    const uploadDir = `uploads/${category}/`;
    
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const category = req.params.category || 'images';
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const ext = path.extname(file.originalname);
    
    cb(null, `${category}-${timestamp}-${randomString}${ext}`);
  }
});

// Dynamic upload middleware
const createUploadMiddleware = (category) => {
  const config = FILE_TYPES[category];
  
  if (!config) {
    throw new Error(`Unknown category: ${category}`);
  }
  
  return multer({
    storage: storage,
    fileFilter: createFileFilter(category),
    limits: {
      fileSize: config.maxSize,
      files: 10
    }
  });
};

// Category-based upload endpoints
app.post('/upload/:category', (req, res, next) => {
  try {
    const upload = createUploadMiddleware(req.params.category);
    upload.single('file')(req, res, next);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}, (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const category = req.params.category;
    const config = FILE_TYPES[category];
    
    res.json({
      message: 'File uploaded successfully',
      category: category,
      file: {
        originalName: req.file.originalname,
        filename: req.file.filename,
        path: req.file.path,
        size: req.file.size,
        sizeMB: (req.file.size / 1024 / 1024).toFixed(2),
        mimetype: req.file.mimetype,
        url: `${req.protocol}://${req.get('host')}/uploads/${category}/${req.file.filename}`
      },
      validation: {
        maxSizeMB: (config.maxSize / 1024 / 1024).toFixed(2),
        allowedTypes: config.mimeTypes,
        allowedExtensions: config.extensions
      }
    });
    
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Get supported file types
app.get('/file-types', (req, res) => {
  const fileTypes = {};
  
  Object.keys(FILE_TYPES).forEach(category => {
    fileTypes[category] = {
      mimeTypes: FILE_TYPES[category].mimeTypes,
      extensions: FILE_TYPES[category].extensions,
      maxSizeMB: (FILE_TYPES[category].maxSize / 1024 / 1024).toFixed(2)
    };
  });
  
  res.json(fileTypes);
});

// Content-based validation (advanced security)
const validateFileContent = async (filePath, mimetype) => {
  const buffer = fs.readFileSync(filePath);
  const firstBytes = buffer.subarray(0, 12).toString('hex');
  
  // File signatures
  const signatures = {
    'image/jpeg': ['ffd8ffe0', 'ffd8ffe1', 'ffd8ffe8'],
    'image/png': ['89504e470d0a1a0a'],
    'image/gif': ['474946383961', '474946383761'],
    'application/pdf': ['255044462d'],
    'video/mp4': ['667479704d5341'], // ftypMSA
    'video/avi': ['52494646'] // RIFF
  };
  
  const validSignatures = signatures[mimetype];
  if (!validSignatures) {
    return true; // Skip validation for unknown types
  }
  
  return validSignatures.some(sig => firstBytes.startsWith(sig));
};

// Advanced upload with content validation
app.post('/upload-secure/:category', (req, res, next) => {
  try {
    const upload = createUploadMiddleware(req.params.category);
    upload.single('file')(req, res, next);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    // Validate file content
    const isValidContent = await validateFileContent(req.file.path, req.file.mimetype);
    
    if (!isValidContent) {
      // Remove invalid file
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'File content does not match its type' });
    }
    
    res.json({
      message: 'File uploaded and validated successfully',
      file: {
        originalName: req.file.originalname,
        filename: req.file.filename,
        size: req.file.size,
        mimetype: req.file.mimetype,
        contentValidated: true
      }
    });
    
  } catch (error) {
    console.error('Secure upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large' });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ error: 'Too many files' });
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ error: 'Unexpected file field' });
    }
  }
  
  res.status(500).json({ error: error.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Available endpoints:');
  console.log('  POST /upload/images - Upload images');
  console.log('  POST /upload/documents - Upload documents');
  console.log('  POST /upload/videos - Upload videos');
  console.log('  POST /upload-secure/:category - Upload with content validation');
  console.log('  GET /file-types - Get supported file types');
});
```

---

## 4. Production-Ready S3 Upload

### 4.1 AWS S3 Integration

```js
const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB limit
  },
  fileFilter: (req, file, cb) => {
    // Basic file type validation
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'application/pdf', 'text/plain',
      'video/mp4'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  }
});

// Upload to S3 function
const uploadToS3 = async (file, folder = 'uploads') => {
  const fileExtension = path.extname(file.originalname);
  const fileName = `${uuidv4()}${fileExtension}`;
  const key = `${folder}/${fileName}`;
  
  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read', // Make file publicly accessible
    Metadata: {
      originalName: file.originalname,
      uploadTime: new Date().toISOString()
    }
  };
  
  try {
    const result = await s3.upload(params).promise();
    
    return {
      key: key,
      url: result.Location,
      etag: result.ETag,
      bucket: result.Bucket
    };
  } catch (error) {
    throw new Error(`S3 upload failed: ${error.message}`);
  }
};

// Single file upload to S3
app.post('/upload-s3', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    // Determine folder based on file type
    let folder = 'uploads';
    if (req.file.mimetype.startsWith('image/')) {
      folder = 'images';
    } else if (req.file.mimetype === 'application/pdf') {
      folder = 'documents';
    } else if (req.file.mimetype.startsWith('video/')) {
      folder = 'videos';
    }
    
    // Upload to S3
    const s3Result = await uploadToS3(req.file, folder);
    
    // Save file metadata to database (example)
    const fileMetadata = {
      id: uuidv4(),
      originalName: req.file.originalname,
      s3Key: s3Result.key,
      s3Url: s3Result.url,
      size: req.file.size,
      mimetype: req.file.mimetype,
      folder: folder,
      uploadedAt: new Date(),
      uploadedBy: req.user?.id || 'anonymous' // Assuming authentication
    };
    
    // await saveFileMetadata(fileMetadata);
    
    res.json({
      message: 'File uploaded successfully to S3',
      file: {
        id: fileMetadata.id,
        originalName: fileMetadata.originalName,
        url: s3Result.url,
        size: req.file.size,
        mimetype: req.file.mimetype,
        folder: folder
      },
      s3: {
        key: s3Result.key,
        etag: s3Result.etag,
        bucket: s3Result.bucket
      }
    });
    
  } catch (error) {
    console.error('S3 upload error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Multiple files upload to S3
app.post('/upload-multiple-s3', upload.array('files', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }
    
    const uploadPromises = req.files.map(async (file) => {
      let folder = 'uploads';
      if (file.mimetype.startsWith('image/')) {
        folder = 'images';
      } else if (file.mimetype === 'application/pdf') {
        folder = 'documents';
      } else if (file.mimetype.startsWith('video/')) {
        folder = 'videos';
      }
      
      return await uploadToS3(file, folder);
    });
    
    const s3Results = await Promise.all(uploadPromises);
    
    const uploadedFiles = req.files.map((file, index) => ({
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      url: s3Results[index].url,
      key: s3Results[index].key
    }));
    
    res.json({
      message: `${req.files.length} files uploaded successfully to S3`,
      files: uploadedFiles,
      summary: {
        totalFiles: req.files.length,
        totalSize: req.files.reduce((sum, file) => sum + file.size, 0)
      }
    });
    
  } catch (error) {
    console.error('Multiple S3 upload error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Generate presigned URL for direct upload
app.get('/presigned-url', async (req, res) => {
  try {
    const { fileName, fileType, folder = 'uploads' } = req.query;
    
    if (!fileName || !fileType) {
      return res.status(400).json({ error: 'fileName and fileType are required' });
    }
    
    const fileExtension = path.extname(fileName);
    const uniqueFileName = `${uuidv4()}${fileExtension}`;
    const key = `${folder}/${uniqueFileName}`;
    
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: key,
      Expires: 3600, // URL expires in 1 hour
      ContentType: fileType,
      ACL: 'public-read'
    };
    
    const uploadUrl = await s3.getSignedUrlPromise('putObject', params);
    
    res.json({
      uploadUrl: uploadUrl,
      key: key,
      fileUrl: `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
    });
    
  } catch (error) {
    console.error('Presigned URL error:', error);
    res.status(500).json({ error: error.message });
  }
});

// List files in S3 bucket
app.get('/files', async (req, res) => {
  try {
    const { folder = '', maxKeys = 50 } = req.query;
    
    const params = {
      Bucket: process.env.S3_BUCKET,
      Prefix: folder,
      MaxKeys: parseInt(maxKeys)
    };
    
    const result = await s3.listObjectsV2(params).promise();
    
    const files = result.Contents.map(object => ({
      key: object.Key,
      size: object.Size,
      lastModified: object.LastModified,
      url: `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${object.Key}`
    }));
    
    res.json({
      files: files,
      count: files.length,
      isTruncated: result.IsTruncated,
      nextContinuationToken: result.NextContinuationToken
    });
    
  } catch (error) {
    console.error('List files error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete file from S3
app.delete('/files/:key(*)', async (req, res) => {
  try {
    const key = req.params.key;
    
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: key
    };
    
    await s3.deleteObject(params).promise();
    
    res.json({
      message: 'File deleted successfully',
      key: key
    });
    
  } catch (error) {
    console.error('Delete file error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/health', async (req, res) => {
  try {
    // Check S3 connectivity
    await s3.headBucket({ Bucket: process.env.S3_BUCKET }).promise();
    
    res.json({
      status: 'healthy',
      s3: 'connected',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      s3: 'disconnected',
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`S3 Upload Server running on port ${PORT}`);
  console.log('Available endpoints:');
  console.log('  POST /upload-s3 - Upload single file to S3');
  console.log('  POST /upload-multiple-s3 - Upload multiple files to S3');
  console.log('  GET  /presigned-url - Get presigned URL for direct upload');
  console.log('  GET  /files - List files in S3 bucket');
  console.log('  DELETE /files/:key - Delete file from S3');
  console.log('  GET  /health - Health check');
});
```

### 4.2 Environment Configuration

```bash
# .env file
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
S3_BUCKET=your-upload-bucket-name
PORT=3000
```

### 4.3 Package Dependencies

```json
{
  "name": "multer-s3-upload",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.18.2",
    "multer": "^1.4.5-lts.1",
    "aws-sdk": "^2.1467.0",
    "uuid": "^9.0.1",
    "dotenv": "^16.3.1"
  }
}
```

---

## 5. Streaming Upload Example

### 5.1 Streaming to Cloud Storage

```js
const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const { PassThrough } = require('stream');
const path = require('path');

const app = express();

// Configure AWS
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

// Streaming upload configuration
const streamingUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 1024 // 1GB
  }
});

// Progress tracking
class UploadProgressTracker {
  constructor() {
    this.uploads = new Map();
  }

  startUpload(uploadId, totalSize) {
    this.uploads.set(uploadId, {
      totalSize,
      uploadedSize: 0,
      startTime: Date.now(),
      lastUpdate: Date.now()
    });
  }

  updateProgress(uploadId, chunkSize) {
    const upload = this.uploads.get(uploadId);
    if (upload) {
      upload.uploadedSize += chunkSize;
      upload.lastUpdate = Date.now();
    }
  }

  getProgress(uploadId) {
    const upload = this.uploads.get(uploadId);
    if (!upload) return null;

    const progress = (upload.uploadedSize / upload.totalSize) * 100;
    const elapsedTime = Date.now() - upload.startTime;
    const speed = upload.uploadedSize / (elapsedTime / 1000); // bytes per second
    const remainingTime = speed > 0 ? (upload.totalSize - upload.uploadedSize) / speed : 0;

    return {
      progress: Math.round(progress),
      uploadedSize: upload.uploadedSize,
      totalSize: upload.totalSize,
      speed: Math.round(speed / 1024), // KB per second
      remainingTime: Math.round(remainingTime),
      elapsedTime: Math.round(elapsedTime / 1000)
    };
  }

  completeUpload(uploadId) {
    const upload = this.uploads.get(uploadId);
    if (upload) {
      upload.completed = true;
      upload.endTime = Date.now();
    }
  }

  cleanup(uploadId) {
    setTimeout(() => {
      this.uploads.delete(uploadId);
    }, 60000); // Clean up after 1 minute
  }
}

const progressTracker = new UploadProgressTracker();

// Create progress tracking stream
const createProgressStream = (uploadId, totalSize) => {
  const progressStream = new PassThrough();
  
  progressTracker.startUpload(uploadId, totalSize);
  
  progressStream.on('data', (chunk) => {
    progressTracker.updateProgress(uploadId, chunk.length);
  });
  
  progressStream.on('end', () => {
    progressTracker.completeUpload(uploadId);
    progressTracker.cleanup(uploadId);
  });
  
  return progressStream;
};

// Streaming upload endpoint
app.post('/upload-streaming', streamingUpload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const uploadId = `upload_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const fileExtension = path.extname(req.file.originalname);
    const key = `streaming-uploads/${uploadId}${fileExtension}`;
    
    // Create progress tracking stream
    const progressStream = createProgressStream(uploadId, req.file.size);
    
    // Upload parameters
    const uploadParams = {
      Bucket: process.env.S3_BUCKET,
      Key: key,
      Body: progressStream,
      ContentType: req.file.mimetype,
      ContentLength: req.file.size
    };
    
    // Start streaming to S3
    const s3Upload = s3.upload(uploadParams);
    
    // Pipe the file buffer through progress stream to S3
    progressStream.end(req.file.buffer);
    
    try {
      const result = await s3Upload.promise();
      
      res.json({
        message: 'File uploaded successfully via streaming',
        uploadId: uploadId,
        file: {
          originalName: req.file.originalname,
          size: req.file.size,
          url: result.Location,
          key: result.Key
        }
      });
      
    } catch (uploadError) {
      console.error('S3 streaming upload error:', uploadError);
      res.status(500).json({ error: 'Upload failed' });
    }
    
  } catch (error) {
    console.error('Streaming upload error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get upload progress
app.get('/upload-progress/:uploadId', (req, res) => {
  const { uploadId } = req.params;
  const progress = progressTracker.getProgress(uploadId);
  
  if (!progress) {
    return res.status(404).json({ error: 'Upload not found' });
  }
  
  res.json({
    uploadId: uploadId,
    ...progress
  });
});

// WebSocket for real-time progress updates
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('WebSocket client connected');
  
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    
    if (data.type === 'subscribe' && data.uploadId) {
      // Send progress updates every second
      const progressInterval = setInterval(() => {
        const progress = progressTracker.getProgress(data.uploadId);
        
        if (progress) {
          ws.send(JSON.stringify({
            type: 'progress',
            uploadId: data.uploadId,
            ...progress
          }));
          
          // Clear interval when upload is complete
          if (progress.progress === 100) {
            clearInterval(progressInterval);
          }
        } else {
          clearInterval(progressInterval);
          ws.send(JSON.stringify({
            type: 'error',
            message: 'Upload not found'
          }));
        }
      }, 1000);
    }
  });
  
  ws.on('close', () => {
    console.log('WebSocket client disconnected');
  });
});

// Client-side streaming upload example
app.get('/streaming-client', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>Streaming Upload with Progress</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; }
        .progress-container { margin: 20px 0; }
        .progress-bar { 
            width: 100%; 
            height: 20px; 
            background: #f0f0f0; 
            border-radius: 10px; 
            overflow: hidden; 
        }
        .progress-fill { 
            height: 100%; 
            background: #007bff; 
            transition: width 0.3s ease; 
            width: 0%; 
        }
        .stats { 
            display: grid; 
            grid-template-columns: repeat(4, 1fr); 
            gap: 10px; 
            margin: 20px 0; 
        }
        .stat { 
            text-align: center; 
            padding: 10px; 
            background: #f8f9fa; 
            border-radius: 5px; 
        }
    </style>
</head>
<body>
    <h1>Streaming File Upload</h1>
    
    <input type="file" id="fileInput">
    <button onclick="uploadFile()">Upload</button>
    
    <div class="progress-container">
        <div class="progress-bar">
            <div class="progress-fill" id="progressFill"></div>
        </div>
        <div id="progressText">0%</div>
    </div>
    
    <div class="stats">
        <div class="stat">
            <div>Speed</div>
            <div id="speed">0 KB/s</div>
        </div>
        <div class="stat">
            <div>Uploaded</div>
            <div id="uploaded">0 MB</div>
        </div>
        <div class="stat">
            <div>Total</div>
            <div id="totalSize">0 MB</div>
        </div>
        <div class="stat">
            <div>Time Left</div>
            <div id="timeLeft">0s</div>
        </div>
    </div>
    
    <div id="result"></div>

    <script>
        let ws;
        let currentUploadId;
        
        function connectWebSocket() {
            ws = new WebSocket('ws://localhost:8080');
            
            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);
                
                if (data.type === 'progress') {
                    updateProgress(data);
                } else if (data.type === 'error') {
                    console.error(data.message);
                }
            };
        }
        
        function updateProgress(data) {
            document.getElementById('progressFill').style.width = data.progress + '%';
            document.getElementById('progressText').textContent = data.progress + '%';
            document.getElementById('speed').textContent = data.speed + ' KB/s';
            document.getElementById('uploaded').textContent = (data.uploadedSize / 1024 / 1024).toFixed(2) + ' MB';
            document.getElementById('totalSize').textContent = (data.totalSize / 1024 / 1024).toFixed(2) + ' MB';
            document.getElementById('timeLeft').textContent = data.remainingTime + 's';
        }
        
        async function uploadFile() {
            const fileInput = document.getElementById('fileInput');
            const file = fileInput.files[0];
            
            if (!file) {
                alert('Please select a file');
                return;
            }
            
            connectWebSocket();
            
            const formData = new FormData();
            formData.append('file', file);
            
            try {
                const response = await fetch('/upload-streaming', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                
                if (response.ok) {
                    currentUploadId = result.uploadId;
                    
                    // Subscribe to progress updates
                    ws.send(JSON.stringify({
                        type: 'subscribe',
                        uploadId: currentUploadId
                    }));
                    
                    document.getElementById('result').innerHTML = \`
                        <div style="background: #d4edda; color: #155724; padding: 10px; border-radius: 5px;">
                            <h3>Upload Complete!</h3>
                            <p>File URL: <a href="\${result.file.url}" target="_blank">\${result.file.url}</a></p>
                        </div>
                    \`;
                } else {
                    document.getElementById('result').innerHTML = \`
                        <div style="background: #f8d7da; color: #721c24; padding: 10px; border-radius: 5px;">
                            <h3>Upload Failed</h3>
                            <p>\${result.error}</p>
                        </div>
                    \`;
                }
            } catch (error) {
                console.error('Upload error:', error);
                document.getElementById('result').innerHTML = \`
                    <div style="background: #f8d7da; color: #721c24; padding: 10px; border-radius: 5px;">
                        <h3>Network Error</h3>
                        <p>\${error.message}</p>
                    </div>
                \`;
            }
        }
    </script>
</body>
</html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Streaming Upload Server running on port ${PORT}`);
  console.log(`WebSocket server running on port 8080`);
});
```

---

## 6. Secure Upload Middleware

### 6.1 Comprehensive Security Implementation

```js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const rateLimit = require('express-rate-limit');

const app = express();

// Security configurations
const SECURITY_CONFIG = {
  maxFileSize: 50 * 1024 * 1024, // 50MB
  maxFiles: 5,
  allowedMimeTypes: [
    'image/jpeg', 'image/png', 'image/gif', 'image/webp',
    'application/pdf',
    'text/plain',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ],
  allowedExtensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.pdf', '.txt', '.docx'],
  scanFiles: true, // Enable virus scanning
  quarantineInfected: true,
  rateLimitWindow: 15 * 60 * 1000, // 15 minutes
  rateLimitMax: 100 // 100 uploads per window
};

// Rate limiting
const uploadRateLimit = rateLimit({
  windowMs: SECURITY_CONFIG.rateLimitWindow,
  max: SECURITY_CONFIG.rateLimitMax,
  message: 'Too many upload attempts. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false
});

// Virus scanning (simplified example)
const scanFile = async (filePath) => {
  // In production, integrate with actual antivirus software
  // For demo purposes, we'll use a simple signature check
  
  return new Promise((resolve) => {
    const buffer = fs.readFileSync(filePath);
    const hash = crypto.createHash('sha256').update(buffer).digest('hex');
    
    // Simulated malware signatures (in production, use real virus database)
    const malwareSignatures = [
      'e3b0c44298fc1c149afbf4c8996fb924', // Example signature
      // Add real malware signatures here
    ];
    
    const isInfected = malwareSignatures.includes(hash);
    
    setTimeout(() => {
      resolve({
        clean: !isInfected,
        signature: hash,
        infected: isInfected
      });
    }, 100); // Simulate scan time
  });
};

// Advanced file validation
const validateFile = async (file) => {
  const errors = [];
  
  // Check MIME type
  if (!SECURITY_CONFIG.allowedMimeTypes.includes(file.mimetype)) {
    errors.push(`Invalid MIME type: ${file.mimetype}`);
  }
  
  // Check file extension
  const ext = path.extname(file.originalname).toLowerCase();
  if (!SECURITY_CONFIG.allowedExtensions.includes(ext)) {
    errors.push(`Invalid file extension: ${ext}`);
  }
  
  // Check file signature (magic numbers)
  const buffer = fs.readFileSync(file.path);
  const signature = buffer.subarray(0, 12).toString('hex');
  
  const signatures = {
    'image/jpeg': ['ffd8ffe0', 'ffd8ffe1', 'ffd8ffe8'],
    'image/png': ['89504e470d0a1a0a'],
    'image/gif': ['474946383961', '474946383761'],
    'application/pdf': ['255044462d']
  };
  
  const validSignatures = signatures[file.mimetype];
  if (validSignatures && !validSignatures.some(sig => signature.startsWith(sig))) {
    errors.push('File signature does not match MIME type');
  }
  
  // Check for embedded scripts in images
  if (file.mimetype.startsWith('image/')) {
    const content = buffer.toString('utf8', 0, Math.min(1024, buffer.length));
    if (content.includes('<script') || content.includes('javascript:')) {
      errors.push('Potential script content detected in image');
    }
  }
  
  // Virus scanning
  if (SECURITY_CONFIG.scanFiles) {
    const scanResult = await scanFile(file.path);
    if (!scanResult.clean) {
      errors.push('File failed security scan');
      
      if (SECURITY_CONFIG.quarantineInfected) {
        const quarantinePath = file.path.replace('uploads', 'quarantine');
        fs.mkdirSync(path.dirname(quarantinePath), { recursive: true });
        fs.renameSync(file.path, quarantinePath);
      }
    }
  }
  
  return {
    valid: errors.length === 0,
    errors: errors,
    scanResult: SECURITY_CONFIG.scanFiles ? await scanFile(file.path) : null
  };
};

// Secure storage configuration
const secureStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/secure/';
    const quarantineDir = 'uploads/quarantine/';
    
    // Ensure directories exist
    fs.mkdirSync(uploadDir, { recursive: true });
    fs.mkdirSync(quarantineDir, { recursive: true });
    
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate secure filename
    const timestamp = Date.now();
    const random = crypto.randomBytes(16).toString('hex');
    const ext = path.extname(file.originalname);
    const safeName = `${timestamp}_${random}${ext}`;
    
    cb(null, safeName);
  }
});

// Secure file filter
const secureFileFilter = (req, file, cb) => {
  // Basic checks before upload
  if (!SECURITY_CONFIG.allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error(`File type not allowed: ${file.mimetype}`), false);
  }
  
  const ext = path.extname(file.originalname).toLowerCase();
  if (!SECURITY_CONFIG.allowedExtensions.includes(ext)) {
    return cb(new Error(`File extension not allowed: ${ext}`), false);
  }
  
  // Check filename for suspicious patterns
  const suspiciousPatterns = [
    /\.\./,  // Directory traversal
    /[<>:"|?*]/, // Invalid characters
    /^(con|prn|aux|nul|com[1-9]|lpt[1-9])$/i // Windows reserved names
  ];
  
  if (suspiciousPatterns.some(pattern => pattern.test(file.originalname))) {
    return cb(new Error('Invalid filename'), false);
  }
  
  cb(null, true);
};

// Secure upload middleware
const secureUpload = multer({
  storage: secureStorage,
  fileFilter: secureFileFilter,
  limits: {
    fileSize: SECURITY_CONFIG.maxFileSize,
    files: SECURITY_CONFIG.maxFiles,
    fields: 20,
    fieldNameSize: 100,
    fieldSize: 1024 * 1024 // 1MB
  }
});

// Security middleware
const addSecurityHeaders = (req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
};

// Apply security middleware
app.use(addSecurityHeaders);

// Secure upload endpoint
app.post('/secure-upload', uploadRateLimit, secureUpload.array('files', 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }
    
    const validationResults = [];
    const uploadedFiles = [];
    
    for (const file of req.files) {
      const validation = await validateFile(file);
      
      if (validation.valid) {
        uploadedFiles.push({
          originalName: file.originalname,
          filename: file.filename,
          size: file.size,
          mimetype: file.mimetype,
          url: `${req.protocol}://${req.get('host')}/uploads/secure/${file.filename}`,
          scanResult: validation.scanResult
        });
      } else {
        // Remove invalid file
        try {
          fs.unlinkSync(file.path);
        } catch (unlinkError) {
          console.error('Failed to remove invalid file:', unlinkError);
        }
      }
      
      validationResults.push({
        originalName: file.originalname,
        valid: validation.valid,
        errors: validation.errors,
        scanResult: validation.scanResult
      });
    }
    
    if (uploadedFiles.length === 0) {
      return res.status(400).json({ 
        error: 'No valid files were uploaded',
        validationResults: validationResults
      });
    }
    
    res.json({
      message: `${uploadedFiles.length} file(s) uploaded successfully`,
      uploadedFiles: uploadedFiles,
      validationResults: validationResults,
      security: {
        scanned: SECURITY_CONFIG.scanFiles,
        rateLimited: true,
        headersApplied: true
      }
    });
    
  } catch (error) {
    console.error('Secure upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Get security configuration
app.get('/security-config', (req, res) => {
  res.json({
    maxFileSizeMB: (SECURITY_CONFIG.maxFileSize / 1024 / 1024).toFixed(2),
    maxFiles: SECURITY_CONFIG.maxFiles,
    allowedMimeTypes: SECURITY_CONFIG.allowedMimeTypes,
    allowedExtensions: SECURITY_CONFIG.allowedExtensions,
    scanFiles: SECURITY_CONFIG.scanFiles,
    rateLimit: {
      windowMs: SECURITY_CONFIG.rateLimitWindow / 1000 / 60, // minutes
      maxRequests: SECURITY_CONFIG.rateLimitMax
    }
  });
});

// Security audit log
app.get('/security-audit', (req, res) => {
  // In production, this would read from a secure audit log
  const auditLog = [
    {
      timestamp: new Date().toISOString(),
      event: 'upload_attempt',
      ip: req.ip,
      userAgent: req.headers['user-agent']
    }
  ];
  
  res.json(auditLog);
});

// Serve uploaded files with security headers
app.use('/uploads', (req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  next();
}, express.static('uploads'));

// Error handling
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    let message = 'Upload error';
    
    switch (error.code) {
      case 'LIMIT_FILE_SIZE':
        message = 'File too large';
        break;
      case 'LIMIT_FILE_COUNT':
        message = 'Too many files';
        break;
      case 'LIMIT_UNEXPECTED_FILE':
        message = 'Unexpected file field';
        break;
      default:
        message = error.message;
    }
    
    return res.status(400).json({ error: message });
  }
  
  res.status(500).json({ error: error.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Secure Upload Server running on port ${PORT}`);
  console.log('Security features enabled:');
  console.log('- File type validation');
  console.log('- Content scanning');
  console.log('- Rate limiting');
  console.log('- Secure headers');
  console.log('- Filename sanitization');
});
```

---

## Interview-Oriented Notes

**Code Examples to Master:**

1. **Basic Upload**: Single file with validation
2. **Multiple Upload**: Array upload with gallery
3. **Advanced Validation**: Content-based file validation
4. **Cloud Integration**: S3 upload with presigned URLs
5. **Streaming**: Large file handling with progress
6. **Security**: Comprehensive security implementation

**Key Implementation Patterns:**

- Always validate files on both client and server
- Use appropriate storage for different use cases
- Implement proper error handling and cleanup
- Add progress tracking for large files
- Use cloud storage for production applications
- Implement security measures against malicious uploads

**Production Best Practices:**

- Never trust file extensions or MIME types alone
- Always scan uploaded files for malware
- Implement rate limiting to prevent abuse
- Use secure filename generation
- Store files outside the web root
- Implement proper cleanup and maintenance

**Common Interview Code Questions:**

- "Implement a secure file upload system"
- "How would you handle large file uploads?"
- "Show me how to integrate Multer with S3"
- "Implement file validation and virus scanning"
- "Create a progress tracking system for uploads"

[← Comparisons](./08_comparisons.md) | [Next → Interview Questions](./10_interview_questions.md)
