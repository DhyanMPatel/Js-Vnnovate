# 🏗️ Multer Core Concepts

## 1. Multipart/Form-Data Deep Dive

### What is Multipart/Form-Data?

**Simple Explanation:**
Think of multipart/form-data like a **shipping container with multiple compartments**. Each compartment holds different items (text fields, files) with labels describing what's inside.

**Technical Explanation:**
Multipart/form-data is a MIME type that allows browsers to send multiple pieces of data in a single HTTP request. It's the standard way to upload files from web forms.

### HTTP Request Structure

```http
POST /api/upload HTTP/1.1
Host: example.com
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Length: 1234

------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="userId"

12345
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="username"

john_doe
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="avatar"; filename="profile.jpg"
Content-Type: image/jpeg

[Binary JPEG data here]
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="document"; filename="resume.pdf"
Content-Type: application/pdf

[Binary PDF data here]
------WebKitFormBoundary7MA4YWxkTrZu0gW--
```

**Key Components:**

| Component | Purpose | Example |
|-----------|---------|---------|
| **Boundary** | Separator between parts | `----WebKitFormBoundary7MA4YWxkTrZu0gW` |
| **Content-Disposition** | Metadata about the part | `form-data; name="avatar"; filename="profile.jpg"` |
| **Content-Type** | MIME type of the content | `image/jpeg` |
| **Binary Data** | Actual file content | `[Binary data]` |

### Browser File Upload Process

```html
<form action="/upload" method="post" enctype="multipart/form-data">
  <input type="text" name="username" />
  <input type="file" name="avatar" />
  <input type="file" name="documents" multiple />
  <button type="submit">Upload</button>
</form>
```

**What happens when you submit:**

1. **Browser reads form data** including files
2. **Creates multipart request** with boundaries
3. **Sends HTTP request** to server
4. **Server receives stream** of multipart data
5. **Multer parses stream** into individual parts
6. **Files are processed** and stored
7. **Request continues** to route handler

---

## 2. Multer in Express Middleware Chain

### Middleware Flow Diagram

```
HTTP Request
     ↓
Express Router
     ↓
Multer Middleware ← Intercepts multipart/form-data
     ↓
┌─────────────────────────────────────┐
│  Multer Processing Pipeline:        │
│  1. Detect multipart content        │
│  2. Parse boundary markers          │
│  3. Extract file metadata           │
│  4. Validate file filters           │
│  5. Store files using engine        │
│  6. Attach info to req object       │
└─────────────────────────────────────┘
     ↓
Route Handler ← Access req.file/req.files
     ↓
Business Logic ← Process uploaded files
     ↓
Response ← Return result to client
```

### Request Object Enhancement

**Before Multer:**
```js
app.post('/upload', (req, res) => {
  console.log(req.body); // Only text fields
  console.log(req.file); // undefined
  console.log(req.files); // undefined
});
```

**After Multer:**
```js
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('avatar'), (req, res) => {
  console.log(req.body); // Text fields
  console.log(req.file); // Single file object
  console.log(req.files); // undefined (single upload)
});

app.post('/upload-multiple', upload.array('photos', 5), (req, res) => {
  console.log(req.body); // Text fields
  console.log(req.file); // undefined (multiple upload)
  console.log(req.files); // Array of file objects
});
```

---

## 3. Storage Engines

### 3.1 DiskStorage

**Purpose**: Store files on the local file system

```js
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Dynamic destination based on request or file type
    const uploadPath = file.mimetype.startsWith('image/') ? 
      'uploads/images/' : 'uploads/documents/';
    
    // Ensure directory exists
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage: diskStorage });
```

**Use Cases:**
- Development environments
- Small applications
- Local file processing
- Temporary file storage

**Pros:**
- Simple to implement
- No external dependencies
- Fast local access
- Full control over file structure

**Cons:**
- Limited to single server
- Disk space management required
- No built-in redundancy
- Scaling challenges

### 3.2 MemoryStorage

**Purpose**: Store files in memory (RAM)

```js
const memoryStorage = multer.memoryStorage();

const upload = multer({ 
  storage: memoryStorage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

app.post('/upload', upload.single('file'), (req, res) => {
  // File is in req.file.buffer
  const fileBuffer = req.file.buffer;
  
  // Process file directly from memory
  processImage(fileBuffer);
  
  res.send('File processed from memory');
});
```

**Use Cases:**
- Small files (< 10MB)
- Immediate processing
- Temporary storage
- Image processing pipelines

**Pros:**
- Fastest access (no I/O)
- Automatic cleanup
- Good for processing pipelines
- No disk space issues

**Cons:**
- Memory intensive
- Limited by RAM size
- Files lost on server restart
- Not suitable for large files

### 3.3 Custom Storage Engine

**Creating Custom Storage:**

```js
class CustomStorage {
  constructor(options) {
    this.options = options;
  }

  _handleFile(req, file, cb) {
    // Custom file handling logic
    // This is where you'd implement S3, Azure, etc.
    
    // Example: Upload to custom service
    this.uploadToCustomService(file)
      .then(result => {
        cb(null, {
          destination: result.path,
          filename: result.name,
          path: result.url,
          size: file.size
        });
      })
      .catch(cb);
  }

  _removeFile(req, file, cb) {
    // Cleanup logic
    this.deleteFromCustomService(file.path)
      .then(() => cb(null))
      .catch(cb);
  }
}

const customStorage = new CustomStorage({
  apiKey: 'your-api-key',
  bucket: 'your-bucket'
});

const upload = multer({ storage: customStorage });
```

---

## 4. File Upload Methods

### 4.1 Single File Upload

```js
// Accept single file with field name 'avatar'
app.post('/profile', upload.single('avatar'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  console.log('Uploaded file:', req.file);
  /*
  {
    fieldname: 'avatar',
    originalname: 'profile.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    size: 12345,
    destination: 'uploads/',
    filename: 'avatar-1234567890.jpg',
    path: 'uploads/avatar-1234567890.jpg'
  }
  */

  res.send('File uploaded successfully');
});
```

### 4.2 Multiple File Upload

```js
// Accept multiple files with same field name 'photos'
app.post('/gallery', upload.array('photos', 5), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send('No files uploaded.');
  }

  console.log('Uploaded files:', req.files);
  /*
  [
    {
      fieldname: 'photos',
      originalname: 'image1.jpg',
      // ... other properties
    },
    {
      fieldname: 'photos',
      originalname: 'image2.jpg',
      // ... other properties
    }
  ]
  */

  res.send(`${req.files.length} files uploaded`);
});
```

### 4.3 Mixed Field Upload

```js
// Accept different types of files
app.post('/documents', 
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'documents', maxCount: 3 },
    { name: 'signature', maxCount: 1 }
  ]), 
  (req, res) => {
    console.log('Avatar:', req.files.avatar);
    console.log('Documents:', req.files.documents);
    console.log('Signature:', req.files.signature);
    console.log('Text fields:', req.body);

    res.send('Files uploaded successfully');
  }
);
```

### 4.4 Any File Upload

```js
// Accept any files with any field names
app.post('/upload-any', upload.any(), (req, res) => {
  console.log('All files:', req.files);
  console.log('Text fields:', req.body);

  res.send('Files uploaded');
});
```

---

## 5. File Filtering and Validation

### 5.1 File Filter Function

```js
const fileFilter = (req, file, cb) => {
  // Check file type
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); // Accept file
  } else {
    cb(new Error('Only images are allowed!'), false); // Reject file
  }
};

const upload = multer({
  storage: diskStorage,
  fileFilter: fileFilter
});
```

### 5.2 Advanced File Validation

```js
const advancedFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
  
  // Check MIME type
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('Invalid file type'), false);
  }
  
  // Check file extension
  const ext = path.extname(file.originalname).toLowerCase();
  if (!allowedExtensions.includes(ext)) {
    return cb(new Error('Invalid file extension'), false);
  }
  
  // Check file size (preliminary)
  if (file.size > 5 * 1024 * 1024) { // 5MB
    return cb(new Error('File too large'), false);
  }
  
  cb(null, true);
};
```

### 5.3 Content-Based Validation

```js
const contentFilter = async (req, file, cb) => {
  // Read file header to verify actual content
  const buffer = file.buffer;
  
  // Check image signatures
  const isJPEG = buffer.toString('hex', 0, 4) === 'ffd8ffe0';
  const isPNG = buffer.toString('hex', 0, 8) === '89504e470d0a1a0a';
  
  if (!isJPEG && !isPNG) {
    return cb(new Error('File content does not match extension'), false);
  }
  
  cb(null, true);
};
```

---

## 6. Limits and Constraints

### 6.1 File Size Limits

```js
const upload = multer({
  storage: diskStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB per file
    files: 5, // Maximum 5 files
    fields: 10, // Maximum 10 fields
    fieldNameSize: 100, // Max field name size
    fieldSize: 1024 * 1024, // Max field value size
  }
});
```

### 6.2 Dynamic Limits Based on User

```js
const dynamicLimits = async (req) => {
  const user = await getUserById(req.body.userId);
  
  return {
    fileSize: user.plan === 'premium' ? 50 * 1024 * 1024 : 10 * 1024 * 1024,
    files: user.plan === 'premium' ? 20 : 5
  };
};

app.post('/upload', async (req, res, next) => {
  const limits = await dynamicLimits(req);
  
  const upload = multer({
    storage: diskStorage,
    limits: limits
  });
  
  upload.single('file')(req, res, next);
}, (req, res) => {
  res.send('File uploaded with dynamic limits');
});
```

---

## 7. Error Handling

### 7.1 Multer Error Types

```js
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    // Multer-specific errors
    switch (error.code) {
      case 'LIMIT_FILE_SIZE':
        return res.status(400).json({ error: 'File too large' });
      case 'LIMIT_FILE_COUNT':
        return res.status(400).json({ error: 'Too many files' });
      case 'LIMIT_UNEXPECTED_FILE':
        return res.status(400).json({ error: 'Unexpected file field' });
      default:
        return res.status(400).json({ error: 'Upload error: ' + error.message });
    }
  } else if (error) {
    // Other errors
    return res.status(500).json({ error: 'Server error: ' + error.message });
  }
  
  next();
});
```

### 7.2 Custom Error Handling

```js
const uploadWithCustomErrors = multer({
  storage: diskStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/jpeg') {
      const error = new Error('Only JPEG images are allowed');
      error.code = 'INVALID_FILE_TYPE';
      return cb(error, false);
    }
    cb(null, true);
  }
});

app.post('/upload', uploadWithCustomErrors.single('image'), (req, res) => {
  res.send('File uploaded successfully');
});
```

---

## 8. File Object Structure

### Complete File Object

```js
{
  fieldname: 'avatar',           // Form field name
  originalname: 'profile.jpg',   // Original file name
  encoding: '7bit',              // Encoding type
  mimetype: 'image/jpeg',        // MIME type
  size: 123456,                  // File size in bytes
  destination: 'uploads/',       // Storage destination
  filename: 'avatar-123456.jpg', // Generated filename
  path: 'uploads/avatar-123456.jpg' // Full file path
}
```

### Accessing File Information

```js
app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  
  console.log('File name:', file.originalname);
  console.log('File size:', file.size, 'bytes');
  console.log('File type:', file.mimetype);
  console.log('Storage path:', file.path);
  
  // Generate public URL
  const publicUrl = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
  
  res.json({
    message: 'File uploaded successfully',
    file: {
      name: file.originalname,
      size: file.size,
      type: file.mimetype,
      url: publicUrl
    }
  });
});
```

---

## Interview-Oriented Notes

**Core Concepts to Master:**

1. **Multipart Protocol**: How browsers send files to servers
2. **Middleware Integration**: Where Multer fits in Express
3. **Storage Engines**: Disk vs Memory vs Custom storage
4. **Upload Methods**: single(), array(), fields(), any()
5. **File Validation**: Filtering and security considerations

**Common Interview Questions:**

- "What is multipart/form-data and why is it needed for file uploads?"
- "How does Multer integrate with Express middleware?"
- "What's the difference between DiskStorage and MemoryStorage?"
- "How would you validate uploaded files for security?"
- "When would you use custom storage engines?"

**Key Implementation Points:**

- Multer parses multipart streams using busboy
- Files are attached to req.file or req.files
- Storage engines determine where and how files are saved
- File filters provide security and validation
- Limits prevent resource abuse and DoS attacks

**Practical Knowledge:**

- Always validate file types and sizes
- Use appropriate storage for your use case
- Handle errors gracefully
- Consider security implications
- Plan for cleanup and maintenance

[← Introduction](./01_introduction.md) | [Next → Architecture & System Design](./03_architecture.md)
