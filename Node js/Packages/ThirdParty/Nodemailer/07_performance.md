# ⚡ Performance & Optimization

## 1. When NOT to Use Direct SMTP

### 1.1 Performance Bottlenecks of Direct SMTP

**Direct SMTP Issues:**
- **Connection overhead**: Each email requires TCP handshake, TLS negotiation, AUTH
- **Rate limiting**: ISPs limit connections per minute (Gmail: ~100/minute)
- **Single-threaded**: Node.js event loop blocked on network I/O
- **No built-in retry**: Manual implementation required
- **IP reputation management**: Your server IP needs warm-up

```js
// ❌ BAD - Direct SMTP for high volume
const slowEmailSender = async (recipients) => {
  const transporter = nodemailer.createTransport(smallSmtpConfig);
  
  for (const recipient of recipients) {
    // Each iteration: ~2-3 seconds for connection + send
    await transporter.sendMail({
      to: recipient,
      subject: 'Bulk Email',
      text: 'Content'
    });
  }
  // 1000 emails = 50+ minutes!
};

// ✅ GOOD - Queue-based for high volume
const fastEmailSender = async (recipients) => {
  // All emails queued in ~100ms
  const promises = recipients.map(recipient => 
    emailQueue.add('send', { recipient })
  );
  
  await Promise.all(promises);
  // 1000 emails queued in < 1 second!
};
```

### 1.2 Volume Thresholds for Different Approaches

| Email Volume | Recommended Approach | Why |
|--------------|---------------------|-----|
| **< 100/day** | Direct SMTP | Simple, low overhead |
| **100-1,000/day** | Queue + SMTP | Better reliability, basic scaling |
| **1,000-10,000/day** | Cloud Service (SES/SendGrid) | Professional deliverability |
| **10,000+/day** | Cloud Service + Queue | Enterprise scale, analytics |

### 1.3 Cost-Benefit Analysis

```js
class EmailCostAnalyzer {
  calculateCosts(volume, approach) {
    const costs = {
      directSMTP: {
        fixed: 0, // Free
        variable: 0, // Free but limited
        hidden: {
          serverMaintenance: 50, // $/month
          ipReputation: 100, // $/month for warm-up services
          developmentTime: 2000 // $/month for maintenance
        }
      },
      ses: {
        fixed: 0,
        variable: volume * 0.00010, // $0.10 per 1000 emails
        hidden: {
          developmentTime: 500 // Lower maintenance
        }
      },
      sendgrid: {
        fixed: 15, // Basic plan
        variable: Math.max(0, (volume - 100) * 0.00015), // Free 100/day
        hidden: {
          developmentTime: 300 // Lowest maintenance
        }
      }
    };
    
    const approachCosts = costs[approach];
    const totalVariable = approachCosts.variable || 0;
    const totalHidden = Object.values(approachCosts.hidden || {}).reduce((a, b) => a + b, 0);
    
    return {
      monthly: approachCosts.fixed + totalVariable + totalHidden,
      perEmail: (approachCosts.fixed + totalVariable + totalHidden) / volume,
      breakdown: approachCosts
    };
  }
  
  getRecommendation(volume) {
    if (volume < 100) return 'directSMTP';
    if (volume < 1000) return 'queueSMTP';
    if (volume < 10000) return 'ses';
    return 'sendgrid';
  }
}
```

---

## 2. Using Transactional Email Services

### 2.1 AWS SES Integration

```js
const AWS = require('aws-sdk');

class OptimizedSESService {
  constructor() {
    this.ses = new AWS.SES({
      region: process.env.AWS_REGION,
      maxRetries: 3,
      retryDelayOptions: {
        customBackoff: (retryCount) => Math.pow(2, retryCount) * 100
      }
    });
    
    // Connection pool for multiple concurrent requests
    this.rateLimiter = new RateLimiter({
      tokensPerInterval: 14, // SES limit
      interval: 'second'
    });
  }

  async sendBulkEmails(messages) {
    // Batch processing for SES (max 50 per batch)
    const batchSize = 50;
    const batches = this.chunkArray(messages, batchSize);
    
    const results = [];
    
    for (const batch of batches) {
      try {
        // Wait for rate limiter
        await this.rateLimiter.removeTokens(batch.length);
        
        const batchResult = await this.sendBatch(batch);
        results.push(...batchResult);
        
      } catch (error) {
        console.error('Batch failed:', error);
        // Handle batch failure - retry individual emails
        const individualResults = await this.retryIndividually(batch);
        results.push(...individualResults);
      }
    }
    
    return results;
  }

  async sendBatch(messages) {
    const params = {
      Source: messages[0].from,
      Destinations: messages.map(m => m.to),
      Message: {
        Subject: { Data: messages[0].subject },
        Body: {
          Html: { Data: messages[0].html },
          Text: { Data: messages[0].text }
        }
      }
    };
    
    const result = await this.ses.sendBulkEmail(params).promise();
    
    return result.Status.map((status, index) => ({
      messageId: status.MessageId,
      recipient: messages[index].to,
      status: status.Status,
      error: status.Error
    }));
  }

  async retryIndividually(messages) {
    const results = [];
    
    for (const message of messages) {
      try {
        await this.rateLimiter.removeTokens(1);
        
        const params = {
          Source: message.from,
          Destination: { ToAddresses: [message.to] },
          Message: {
            Subject: { Data: message.subject },
            Body: {
              Html: { Data: message.html },
              Text: { Data: message.text }
            }
          }
        };
        
        const result = await this.ses.sendEmail(params).promise();
        
        results.push({
          messageId: result.MessageId,
          recipient: message.to,
          status: 'Success'
        });
        
      } catch (error) {
        results.push({
          recipient: message.to,
          status: 'Failed',
          error: error.message
        });
      }
    }
    
    return results;
  }

  chunkArray(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }
}
```

### 2.2 SendGrid API Optimization

```js
const sgMail = require('@sendgrid/mail');

class OptimizedSendGridService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    // Personalization for batch sending
    this.batchSize = 1000; // SendGrid personalization limit
  }

  async sendPersonalizedBatch(templateData) {
    const { templateId, from, subject, personalizations } = templateData;
    
    // Split into batches if needed
    const batches = this.chunkArray(personalizations, this.batchSize);
    const results = [];
    
    for (const batch of batches) {
      const msg = {
        from,
        subject,
        templateId,
        personalization: batch,
        batchId: this.generateBatchId()
      };
      
      try {
        const response = await sgMail.send(msg, false);
        results.push({
          batchId: msg.batchId,
          sentCount: batch.length,
          messageId: response.headers['x-message-id']
        });
        
        // Wait between batches to respect rate limits
        if (batches.length > 1) {
          await this.sleep(1000); // 1 second between batches
        }
        
      } catch (error) {
        console.error('SendGrid batch failed:', error);
        
        // Retry individual emails in batch
        const individualResults = await this.retryBatchIndividually(batch, templateData);
        results.push(...individualResults);
      }
    }
    
    return results;
  }

  async sendWithSchedule(message, sendAt) {
    const scheduledMessage = {
      ...message,
      sendAt: this.calculateSendAt(sendAt),
      batchId: this.generateBatchId()
    };
    
    return await sgMail.send(scheduledMessage);
  }

  calculateSendAt(sendAt) {
    // SendGrid expects Unix timestamp
    if (sendAt instanceof Date) {
      return Math.floor(sendAt.getTime() / 1000);
    }
    
    if (typeof sendAt === 'string') {
      const date = new Date(sendAt);
      return Math.floor(date.getTime() / 1000);
    }
    
    if (typeof sendAt === 'number') {
      // Assume it's minutes from now
      return Math.floor((Date.now() + (sendAt * 60 * 1000)) / 1000);
    }
    
    throw new Error('Invalid sendAt format');
  }

  async retryBatchIndividually(batch, templateData) {
    const results = [];
    
    for (const personalization of batch) {
      try {
        const msg = {
          ...templateData,
          personalization: [personalization]
        };
        
        await sgMail.send(msg);
        results.push({
          recipient: personalization.to[0].email,
          status: 'Success'
        });
        
        // Small delay between individual sends
        await this.sleep(100);
        
      } catch (error) {
        results.push({
          recipient: personalization.to[0].email,
          status: 'Failed',
          error: error.message
        });
      }
    }
    
    return results;
  }

  generateBatchId() {
    return `batch_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  chunkArray(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }
}
```

---

## 3. Caching Transporters

### 3.1 Transporter Pool Management

```js
class TransporterCache {
  constructor(maxSize = 10) {
    this.cache = new Map();
    this.maxSize = maxSize;
    this.accessTimes = new Map();
    this.creationTimes = new Map();
    this.maxAge = 30 * 60 * 1000; // 30 minutes
  }

  async getTransporter(config) {
    const key = this.generateKey(config);
    
    // Check cache
    if (this.cache.has(key)) {
      const transporter = this.cache.get(key);
      
      // Check if still valid
      if (this.isTransporterValid(key)) {
        this.updateAccessTime(key);
        return transporter;
      } else {
        // Remove expired transporter
        this.removeTransporter(key);
      }
    }
    
    // Create new transporter
    const transporter = await this.createTransporter(config);
    this.addTransporter(key, transporter, config);
    
    return transporter;
  }

  generateKey(config) {
    // Create unique key from config
    const keyData = {
      service: config.service,
      host: config.host,
      port: config.port,
      user: config.auth?.user
    };
    
    return Buffer.from(JSON.stringify(keyData)).toString('base64');
  }

  async createTransporter(config) {
    const transporter = nodemailer.createTransport(config);
    
    // Verify connection
    await transporter.verify();
    
    return transporter;
  }

  addTransporter(key, transporter, config) {
    // Remove oldest if at capacity
    if (this.cache.size >= this.maxSize) {
      this.evictOldest();
    }
    
    this.cache.set(key, transporter);
    this.accessTimes.set(key, Date.now());
    this.creationTimes.set(key, Date.now());
    
    // Set up cleanup timer
    setTimeout(() => {
      if (this.cache.has(key)) {
        this.removeTransporter(key);
      }
    }, this.maxAge);
  }

  isTransporterValid(key) {
    const creationTime = this.creationTimes.get(key);
    return Date.now() - creationTime < this.maxAge;
  }

  updateAccessTime(key) {
    this.accessTimes.set(key, Date.now());
  }

  removeTransporter(key) {
    this.cache.delete(key);
    this.accessTimes.delete(key);
    this.creationTimes.delete(key);
  }

  evictOldest() {
    let oldestKey = null;
    let oldestTime = Date.now();
    
    for (const [key, time] of this.accessTimes) {
      if (time < oldestTime) {
        oldestTime = time;
        oldestKey = key;
      }
    }
    
    if (oldestKey) {
      this.removeTransporter(oldestKey);
    }
  }

  // Cleanup expired transporters
  cleanup() {
    const now = Date.now();
    const expiredKeys = [];
    
    for (const [key, creationTime] of this.creationTimes) {
      if (now - creationTime > this.maxAge) {
        expiredKeys.push(key);
      }
    }
    
    expiredKeys.forEach(key => this.removeTransporter(key));
    
    return expiredKeys.length;
  }

  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      hitRate: this.calculateHitRate(),
      memoryUsage: this.estimateMemoryUsage()
    };
  }

  calculateHitRate() {
    // Implementation would track hits/misses
    return 0.85; // Example
  }

  estimateMemoryUsage() {
    // Rough estimation
    return this.cache.size * 1024 * 1024; // ~1MB per transporter
  }
}

// Global transporter cache instance
const transporterCache = new TransporterCache();

// Usage in email service
class CachedEmailService {
  async sendEmail(message, providerConfig) {
    const transporter = await transporterCache.getTransporter(providerConfig);
    return await transporter.sendMail(message);
  }
}
```

### 3.2 Connection Reuse and Keep-Alive

```js
class PersistentEmailService {
  constructor() {
    this.transporters = new Map();
    this.heartbeatInterval = 5 * 60 * 1000; // 5 minutes
    this.startHeartbeat();
  }

  async getTransporter(config) {
    const key = this.generateKey(config);
    
    if (!this.transporters.has(key)) {
      const transporter = nodemailer.createTransport({
        ...config,
        // Connection pooling options
        pool: true,
        maxConnections: 5,
        maxMessages: 100,
        rateDelta: 1000,
        rateLimit: 5
      });
      
      // Set up event listeners
      transporter.on('idle', () => {
        console.log(`Transporter ${key} is idle`);
      });
      
      transporter.on('error', (error) => {
        console.error(`Transporter ${key} error:`, error);
        this.removeTransporter(key);
      });
      
      this.transporters.set(key, {
        instance: transporter,
        lastUsed: Date.now(),
        config: config
      });
    }
    
    const transporterInfo = this.transporters.get(key);
    transporterInfo.lastUsed = Date.now();
    
    return transporterInfo.instance;
  }

  async sendEmail(message, config) {
    const transporter = await this.getTransporter(config);
    
    try {
      const result = await transporter.sendMail(message);
      return result;
    } catch (error) {
      // If connection fails, remove and retry
      if (this.isConnectionError(error)) {
        const key = this.generateKey(config);
        this.removeTransporter(key);
        
        // Retry with new connection
        const newTransporter = await this.getTransporter(config);
        return await newTransporter.sendMail(message);
      }
      
      throw error;
    }
  }

  isConnectionError(error) {
    const connectionErrors = [
      'ECONNREFUSED',
      'ECONNRESET',
      'ETIMEDOUT',
      'ENOTFOUND'
    ];
    
    return connectionErrors.includes(error.code);
  }

  removeTransporter(key) {
    if (this.transporters.has(key)) {
      const transporterInfo = this.transporters.get(key);
      transporterInfo.instance.close(); // Close connection
      this.transporters.delete(key);
    }
  }

  startHeartbeat() {
    setInterval(() => {
      this.performHeartbeat();
    }, this.heartbeatInterval);
  }

  async performHeartbeat() {
    const now = Date.now();
    const staleThreshold = 30 * 60 * 1000; // 30 minutes
    
    for (const [key, transporterInfo] of this.transporters) {
      if (now - transporterInfo.lastUsed > staleThreshold) {
        console.log(`Removing stale transporter: ${key}`);
        this.removeTransporter(key);
        continue;
      }
      
      // Verify connection is still alive
      try {
        await transporterInfo.instance.verify();
      } catch (error) {
        console.warn(`Transporter ${key} heartbeat failed:`, error.message);
        this.removeTransporter(key);
      }
    }
  }

  generateKey(config) {
    return Buffer.from(JSON.stringify({
      service: config.service,
      host: config.host,
      port: config.port,
      user: config.auth?.user
    })).toString('base64');
  }

  async shutdown() {
    console.log('Shutting down email service...');
    
    for (const [key, transporterInfo] of this.transporters) {
      try {
        transporterInfo.instance.close();
      } catch (error) {
        console.error(`Error closing transporter ${key}:`, error);
      }
    }
    
    this.transporters.clear();
  }
}
```

---

## 4. Memory Management

### 4.1 Streaming Large Email Lists

```js
const fs = require('fs');
const { Transform } = require('stream');

class StreamingEmailProcessor {
  constructor() {
    this.batchSize = 100;
    this.maxConcurrentBatches = 5;
  }

  async processLargeEmailList(filePath, emailTemplate) {
    return new Promise((resolve, reject) => {
      const results = [];
      let currentBatch = [];
      let activeBatches = 0;
      let totalProcessed = 0;
      
      const emailStream = fs.createReadStream(filePath)
        .pipe(this.parseEmailStream())
        .pipe(new Transform({
          objectMode: true,
          transform: async (emailData, encoding, callback) => {
            currentBatch.push(emailData);
            
            if (currentBatch.length >= this.batchSize) {
              const batch = currentBatch.splice(0, this.batchSize);
              
              // Wait if too many concurrent batches
              if (activeBatches >= this.maxConcurrentBatches) {
                await this.waitForSlot();
              }
              
              activeBatches++;
              
              // Process batch asynchronously
              this.processBatch(batch, emailTemplate)
                .then(batchResults => {
                  results.push(...batchResults);
                  totalProcessed += batchResults.length;
                  activeBatches--;
                  callback();
                })
                .catch(error => {
                  console.error('Batch processing failed:', error);
                  activeBatches--;
                  callback(error);
                });
            } else {
              callback();
            }
          },
          
          flush: async (callback) => {
            // Process remaining emails
            if (currentBatch.length > 0) {
              try {
                const batchResults = await this.processBatch(currentBatch, emailTemplate);
                results.push(...batchResults);
                totalProcessed += batchResults.length;
              } catch (error) {
                console.error('Final batch processing failed:', error);
              }
            }
            
            // Wait for all active batches to complete
            while (activeBatches > 0) {
              await this.sleep(100);
            }
            
            callback(null, {
              totalProcessed,
              results
            });
          }
        }));
      
      emailStream.on('error', reject);
      emailStream.on('end', () => {
        resolve({
          totalProcessed,
          results
        });
      });
    });
  }

  parseEmailStream() {
    return new Transform({
      objectMode: true,
      transform(chunk, encoding, callback) {
        const lines = chunk.toString().split('\n');
        
        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed && trimmed.includes('@')) {
            // Parse CSV or JSON line
            const emailData = this.parseEmailLine(trimmed);
            if (emailData) {
              this.push(emailData);
            }
          }
        }
        
        callback();
      }
    });
  }

  parseEmailLine(line) {
    try {
      // Try JSON first
      if (line.startsWith('{')) {
        return JSON.parse(line);
      }
      
      // Try CSV (email,name)
      const parts = line.split(',').map(p => p.trim());
      if (parts.length >= 1 && parts[0].includes('@')) {
        return {
          email: parts[0],
          name: parts[1] || '',
          data: parts.slice(2)
        };
      }
      
      // Just email
      if (line.includes('@')) {
        return { email: line };
      }
      
    } catch (error) {
      console.warn('Failed to parse email line:', line);
    }
    
    return null;
  }

  async processBatch(batch, template) {
    const emails = batch.map(emailData => ({
      to: emailData.email,
      ...template,
      // Personalize template
      subject: this personalizeTemplate(template.subject, emailData),
      html: this personalizeTemplate(template.html, emailData),
      text: this personalizeTemplate(template.text, emailData)
    }));
    
    // Send batch using preferred service
    return await this.emailService.sendBatch(emails);
  }

  personalizeTemplate(template, data) {
    return template
      .replace(/\{\{email\}\}/g, data.email)
      .replace(/\{\{name\}\}/g, data.name || 'there')
      .replace(/\{\{data\}\}/g, data.data ? data.data.join(', ') : '');
  }

  async waitForSlot() {
    while (activeBatches >= this.maxConcurrentBatches) {
      await this.sleep(100);
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

### 4.2 Memory-Efficient Attachment Handling

```js
const { createReadStream, createWriteStream } = require('fs');
const { pipeline } = require('stream/promises');
const zlib = require('zlib');

class MemoryEfficientAttachmentHandler {
  constructor() {
    this.maxMemorySize = 50 * 1024 * 1024; // 50MB
    this.tempDir = require('os').tmpdir();
  }

  async processAttachments(attachments) {
    const processed = [];
    
    for (const attachment of attachments) {
      const processedAttachment = await this.processAttachment(attachment);
      processed.push(processedAttachment);
    }
    
    return processed;
  }

  async processAttachment(attachment) {
    // Check attachment size
    const size = await this.getAttachmentSize(attachment);
    
    if (size <= this.maxMemorySize) {
      // Small attachment - keep in memory
      return await this.processInMemory(attachment);
    } else {
      // Large attachment - stream to disk
      return await this.processAsStream(attachment);
    }
  }

  async getAttachmentSize(attachment) {
    if (attachment.path) {
      const stats = await fs.promises.stat(attachment.path);
      return stats.size;
    }
    
    if (attachment.content) {
      if (Buffer.isBuffer(attachment.content)) {
        return attachment.content.length;
      }
      return Buffer.byteLength(attachment.content, 'utf8');
    }
    
    if (attachment.stream) {
      // For streams, we need to process as stream
      return Infinity;
    }
    
    return 0;
  }

  async processInMemory(attachment) {
    if (attachment.path) {
      const content = await fs.promises.readFile(attachment.path);
      return {
        filename: attachment.filename,
        content: content,
        contentType: attachment.contentType
      };
    }
    
    return attachment;
  }

  async processAsStream(attachment) {
    const tempFile = await this.createTempFile(attachment.filename);
    
    if (attachment.path) {
      // Copy file to temp location with compression
      await this.compressFile(attachment.path, tempFile);
      
      return {
        filename: `${attachment.filename}.gz`,
        path: tempFile,
        contentType: 'application/gzip'
      };
    }
    
    if (attachment.stream) {
      // Stream directly to temp file
      const writeStream = createWriteStream(tempFile);
      await pipeline(attachment.stream, zlib.createGzip(), writeStream);
      
      return {
        filename: `${attachment.filename}.gz`,
        path: tempFile,
        contentType: 'application/gzip'
      };
    }
    
    if (attachment.content) {
      // Write content to temp file with compression
      const contentStream = require('stream').Readable.from([attachment.content]);
      const writeStream = createWriteStream(tempFile);
      
      await pipeline(contentStream, zlib.createGzip(), writeStream);
      
      return {
        filename: `${attachment.filename}.gz`,
        path: tempFile,
        contentType: 'application/gzip'
      };
    }
    
    throw new Error('Unsupported attachment format');
  }

  async createTempFile(filename) {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    const tempFilename = `email_${timestamp}_${random}_${filename}`;
    return path.join(this.tempDir, tempFilename);
  }

  async compressFile(inputPath, outputPath) {
    const readStream = createReadStream(inputPath);
    const writeStream = createWriteStream(outputPath);
    
    await pipeline(readStream, zlib.createGzip(), writeStream);
  }

  async cleanupTempFiles() {
    try {
      const files = await fs.promises.readdir(this.tempDir);
      const tempFiles = files.filter(file => file.startsWith('email_'));
      
      for (const file of tempFiles) {
        const filePath = path.join(this.tempDir, file);
        const stats = await fs.promises.stat(filePath);
        
        // Remove files older than 1 hour
        if (Date.now() - stats.mtime.getTime() > 60 * 60 * 1000) {
          await fs.promises.unlink(filePath);
        }
      }
    } catch (error) {
      console.warn('Cleanup failed:', error.message);
    }
  }
}
```

---

## 5. Performance Monitoring and Metrics

### 5.1 Real-time Performance Metrics

```js
class EmailPerformanceMonitor {
  constructor() {
    this.metrics = {
      sent: 0,
      failed: 0,
      totalProcessingTime: 0,
      averageProcessingTime: 0,
      throughput: 0,
      errorRate: 0
    };
    
    this.startTime = Date.now();
    this.windowSize = 60000; // 1 minute window
    this.currentWindow = [];
    
    // Start monitoring
    this.startMonitoring();
  }

  recordEmailSent(processingTime, provider) {
    const now = Date.now();
    
    this.metrics.sent++;
    this.metrics.totalProcessingTime += processingTime;
    this.metrics.averageProcessingTime = this.metrics.totalProcessingTime / this.metrics.sent;
    
    this.currentWindow.push({
      timestamp: now,
      processingTime,
      provider,
      status: 'success'
    });
    
    this.updateMetrics();
  }

  recordEmailFailed(processingTime, provider, error) {
    const now = Date.now();
    
    this.metrics.failed++;
    this.metrics.totalProcessingTime += processingTime;
    
    this.currentWindow.push({
      timestamp: now,
      processingTime,
      provider,
      status: 'failed',
      error: error.message
    });
    
    this.updateMetrics();
  }

  updateMetrics() {
    const now = Date.now();
    
    // Clean old entries outside window
    this.currentWindow = this.currentWindow.filter(
      entry => now - entry.timestamp < this.windowSize
    );
    
    // Calculate throughput (emails per second in current window)
    const windowDuration = this.windowSize / 1000; // Convert to seconds
    this.metrics.throughput = this.currentWindow.length / windowDuration;
    
    // Calculate error rate in current window
    const recentEmails = this.currentWindow.length;
    const recentFailures = this.currentWindow.filter(e => e.status === 'failed').length;
    this.metrics.errorRate = recentEmails > 0 ? recentFailures / recentEmails : 0;
    
    // Calculate average processing time in current window
    if (this.currentWindow.length > 0) {
      const totalTime = this.currentWindow.reduce((sum, entry) => sum + entry.processingTime, 0);
      this.metrics.averageProcessingTime = totalTime / this.currentWindow.length;
    }
  }

  getMetrics() {
    return {
      ...this.metrics,
      uptime: Date.now() - this.startTime,
      currentWindowEmails: this.currentWindow.length,
      providerBreakdown: this.getProviderBreakdown(),
      performanceGrade: this.calculatePerformanceGrade()
    };
  }

  getProviderBreakdown() {
    const breakdown = {};
    
    for (const entry of this.currentWindow) {
      if (!breakdown[entry.provider]) {
        breakdown[entry.provider] = {
          sent: 0,
          failed: 0,
          avgProcessingTime: 0
        };
      }
      
      if (entry.status === 'success') {
        breakdown[entry.provider].sent++;
      } else {
        breakdown[entry.provider].failed++;
      }
    }
    
    // Calculate averages
    for (const provider of Object.keys(breakdown)) {
      const providerEntries = this.currentWindow.filter(e => e.provider === provider);
      const totalTime = providerEntries.reduce((sum, entry) => sum + entry.processingTime, 0);
      breakdown[provider].avgProcessingTime = totalTime / providerEntries.length;
    }
    
    return breakdown;
  }

  calculatePerformanceGrade() {
    const { throughput, errorRate, averageProcessingTime } = this.metrics;
    
    let score = 100;
    
    // Penalize high error rate
    score -= errorRate * 100;
    
    // Penalize low throughput
    if (throughput < 10) score -= 50;
    else if (throughput < 50) score -= 25;
    else if (throughput < 100) score -= 10;
    
    // Penalize high processing time
    if (averageProcessingTime > 5000) score -= 30; // > 5 seconds
    else if (averageProcessingTime > 2000) score -= 15; // > 2 seconds
    else if (averageProcessingTime > 1000) score -= 5; // > 1 second
    
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  }

  startMonitoring() {
    // Update metrics every second
    setInterval(() => {
      this.updateMetrics();
    }, 1000);
    
    // Log performance every minute
    setInterval(() => {
      this.logPerformance();
    }, 60000);
  }

  logPerformance() {
    const metrics = this.getMetrics();
    
    console.log('Email Performance Metrics:', {
      grade: metrics.performanceGrade,
      throughput: `${metrics.throughput.toFixed(2)} emails/sec`,
      errorRate: `${(metrics.errorRate * 100).toFixed(2)}%`,
      avgProcessingTime: `${metrics.averageProcessingTime.toFixed(0)}ms`,
      uptime: `${Math.floor(metrics.uptime / 1000 / 60)} minutes`
    });
    
    // Alert if performance is poor
    if (metrics.performanceGrade === 'D' || metrics.performanceGrade === 'F') {
      this.sendPerformanceAlert(metrics);
    }
  }

  sendPerformanceAlert(metrics) {
    // Send alert to monitoring system
    console.error('PERFORMANCE ALERT:', {
      grade: metrics.performanceGrade,
      errorRate: metrics.errorRate,
      throughput: metrics.throughput
    });
  }
}
```

---

## Interview-Oriented Notes

**Performance Topics to Master:**

1. **Direct SMTP Limitations**: When to avoid it, volume thresholds
2. **Cloud Services**: SES, SendGrid optimization techniques
3. **Caching Strategies**: Transporter pools, connection reuse
4. **Memory Management**: Streaming, large file handling
5. **Monitoring**: Real-time metrics, performance grading

**Common Performance Interview Questions:**

- "When would you not use direct SMTP and why?"
- "How do you optimize email sending for high volume?"
- "What are the memory considerations when sending large attachments?"
- "How do you monitor email service performance?"
- "What's your approach to connection pooling for email transporters?"

**Key Performance Insights:**

- Direct SMTP is only suitable for low volume (<100/day)
- Cloud services provide better deliverability and scaling
- Connection pooling and caching significantly improve performance
- Streaming is essential for large email lists and attachments
- Real-time monitoring helps identify performance issues early

[← Advanced Concepts](./06_advanced.md) | [Next → Service Comparisons](./08_comparisons.md)
