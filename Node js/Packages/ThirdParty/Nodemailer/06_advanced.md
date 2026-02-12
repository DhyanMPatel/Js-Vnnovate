# 🎯 Advanced Nodemailer Concepts

## 1. Multi-Transport Setup and Failover

### 1.1 Smart Transport Selection

```js
class SmartEmailRouter {
  constructor() {
    this.transporters = {
      primary: this.createTransporter('primary'),
      secondary: this.createTransporter('secondary'),
      backup: this.createTransporter('backup')
    };
    
    this.providerHealth = {
      primary: { healthy: true, lastCheck: Date.now(), failureCount: 0 },
      secondary: { healthy: true, lastCheck: Date.now(), failureCount: 0 },
      backup: { healthy: true, lastCheck: Date.now(), failureCount: 0 }
    };
    
    this.circuitBreakers = {
      primary: new CircuitBreaker(5, 60000), // 5 failures, 1 minute timeout
      secondary: new CircuitBreaker(3, 120000), // 3 failures, 2 minute timeout
      backup: new CircuitBreaker(10, 30000) // 10 failures, 30 second timeout
    };
  }

  createTransporter(type) {
    const configs = {
      primary: {
        service: 'ses',
        auth: { user: process.env.AWS_ACCESS_KEY, pass: process.env.AWS_SECRET }
      },
      secondary: {
        service: 'sendgrid',
        auth: { user: 'apikey', pass: process.env.SENDGRID_API_KEY }
      },
      backup: {
        service: 'gmail',
        auth: { user: process.env.BACKUP_EMAIL, pass: process.env.BACKUP_PASSWORD }
      }
    };
    
    return nodemailer.createTransport(configs[type]);
  }

  async sendEmail(message, options = {}) {
    const strategy = options.strategy || 'primary-first';
    
    switch (strategy) {
      case 'primary-first':
        return await this.sendWithPrimaryFirst(message);
      case 'round-robin':
        return await this.sendWithRoundRobin(message);
      case 'load-balanced':
        return await this.sendWithLoadBalancing(message);
      default:
        return await this.sendWithPrimaryFirst(message);
    }
  }

  async sendWithPrimaryFirst(message) {
    const providers = ['primary', 'secondary', 'backup'];
    
    for (const provider of providers) {
      if (this.canUseProvider(provider)) {
        try {
          const result = await this.sendWithProvider(provider, message);
          this.recordSuccess(provider);
          return result;
        } catch (error) {
          this.recordFailure(provider, error);
          console.warn(`Provider ${provider} failed, trying next:`, error.message);
        }
      }
    }
    
    throw new Error('All email providers failed');
  }

  async sendWithRoundRobin(message) {
    const providers = this.getHealthyProviders();
    if (providers.length === 0) {
      throw new Error('No healthy providers available');
    }
    
    // Simple round-robin based on timestamp
    const providerIndex = Date.now() % providers.length;
    const selectedProvider = providers[providerIndex];
    
    try {
      const result = await this.sendWithProvider(selectedProvider, message);
      this.recordSuccess(selectedProvider);
      return result;
    } catch (error) {
      this.recordFailure(selectedProvider, error);
      // Try other providers
      return await this.sendWithPrimaryFirst(message);
    }
  }

  async sendWithLoadBalancing(message) {
    const providers = this.getHealthyProviders();
    if (providers.length === 0) {
      throw new Error('No healthy providers available');
    }
    
    // Select provider based on current load and performance
    const selectedProvider = this.selectProviderByLoad(providers);
    
    try {
      const result = await this.sendWithProvider(selectedProvider, message);
      this.recordSuccess(selectedProvider);
      return result;
    } catch (error) {
      this.recordFailure(selectedProvider, error);
      return await this.sendWithPrimaryFirst(message);
    }
  }

  canUseProvider(provider) {
    const health = this.providerHealth[provider];
    const circuitBreaker = this.circuitBreakers[provider];
    
    return health.healthy && !circuitBreaker.isOpen();
  }

  getHealthyProviders() {
    return Object.keys(this.providerHealth).filter(provider => 
      this.canUseProvider(provider)
    );
  }

  selectProviderByLoad(providers) {
    // Simple load balancing - in production, use actual metrics
    const providerScores = {
      primary: 0.9, // High capacity, low cost
      secondary: 0.7, // Medium capacity, medium cost
      backup: 0.3   // Low capacity, high cost
    };
    
    return providers.reduce((best, current) => 
      providerScores[current] > providerScores[best] ? current : best
    );
  }

  async sendWithProvider(provider, message) {
    const transporter = this.transporters[provider];
    const startTime = Date.now();
    
    try {
      const result = await transporter.sendMail({
        ...message,
        headers: {
          ...message.headers,
          'X-Email-Provider': provider,
          'X-Sent-At': new Date().toISOString()
        }
      });
      
      result.provider = provider;
      result.processingTime = Date.now() - startTime;
      
      return result;
    } catch (error) {
      error.provider = provider;
      error.processingTime = Date.now() - startTime;
      throw error;
    }
  }

  recordSuccess(provider) {
    this.providerHealth[provider].failureCount = 0;
    this.circuitBreakers[provider].recordSuccess();
  }

  recordFailure(provider, error) {
    this.providerHealth[provider].failureCount++;
    this.circuitBreakers[provider].recordFailure();
    
    // Mark as unhealthy if too many failures
    if (this.providerHealth[provider].failureCount >= 5) {
      this.providerHealth[provider].healthy = false;
      // Schedule health check recovery
      setTimeout(() => this.checkProviderHealth(provider), 60000);
    }
  }

  async checkProviderHealth(provider) {
    try {
      const transporter = this.transporters[provider];
      // Send a test email to verify connectivity
      await transporter.verify();
      this.providerHealth[provider].healthy = true;
      this.providerHealth[provider].failureCount = 0;
      console.log(`Provider ${provider} is healthy again`);
    } catch (error) {
      console.log(`Provider ${provider} still unhealthy:`, error.message);
      // Check again later
      setTimeout(() => this.checkProviderHealth(provider), 120000);
    }
  }
}

class CircuitBreaker {
  constructor(failureThreshold, timeout) {
    this.failureThreshold = failureThreshold;
    this.timeout = timeout;
    this.failureCount = 0;
    this.lastFailureTime = null;
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
  }

  isOpen() {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime > this.timeout) {
        this.state = 'HALF_OPEN';
        return false;
      }
      return true;
    }
    return false;
  }

  recordSuccess() {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }

  recordFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    
    if (this.failureCount >= this.failureThreshold) {
      this.state = 'OPEN';
    }
  }
}
```

---

## 2. Custom Transport Plugins

### 2.1 Creating a Custom Transport

```js
const EventEmitter = require('events');

class CustomTransport extends EventEmitter {
  constructor(options) {
    super();
    this.options = options;
    this.name = 'custom';
    this.version = '1.0.0';
  }

  // Required method: send mail
  send(mail, callback) {
    this.emit('sending', mail);
    
    const envelope = mail.message.getEnvelope();
    const message = mail.message.createReadStream();
    
    this.processEmail(envelope, message)
      .then(result => {
        this.emit('sent', result);
        callback(null, result);
      })
      .catch(error => {
        this.emit('error', error);
        callback(error);
      });
  }

  // Custom email processing logic
  async processEmail(envelope, messageStream) {
    // Example: Custom API integration
    const formData = new FormData();
    
    // Add envelope data
    formData.append('from', envelope.from);
    envelope.to.forEach(to => formData.append('to[]', to));
    
    // Add message content
    const messageBuffer = await this.streamToBuffer(messageStream);
    formData.append('message', messageBuffer, 'message.eml');
    
    // Add custom metadata
    if (this.options.metadata) {
      Object.entries(this.options.metadata).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }
    
    // Send to custom API
    const response = await fetch(this.options.apiUrl, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${this.options.apiKey}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Custom API error: ${response.status} ${response.statusText}`);
    }
    
    const result = await response.json();
    
    return {
      messageId: result.messageId,
      response: result,
      envelope: envelope
    };
  }

  // Helper method to convert stream to buffer
  streamToBuffer(stream) {
    return new Promise((resolve, reject) => {
      const chunks = [];
      stream.on('data', chunk => chunks.push(chunk));
      stream.on('end', () => resolve(Buffer.concat(chunks)));
      stream.on('error', reject);
    });
  }

  // Optional: verify connection
  verify(callback) {
    // Implement connection verification
    this.options.api.ping()
      .then(() => callback(null, true))
      .catch(error => callback(error));
  }
}

// Register the custom transport
nodemailer.createTransport('custom', {
  apiUrl: 'https://api.custom-email-service.com/send',
  apiKey: process.env.CUSTOM_EMAIL_API_KEY,
  metadata: {
    source: 'nodejs-app',
    version: '1.0.0'
  }
});
```

### 2.2 Slack Transport Plugin

```js
class SlackTransport extends EventEmitter {
  constructor(options) {
    super();
    this.options = options;
    this.name = 'slack';
    this.version = '1.0.0';
    this.webhook = new IncomingWebhook(options.webhookUrl);
  }

  send(mail, callback) {
    const message = mail.data;
    
    // Convert email to Slack message format
    const slackMessage = this.emailToSlackMessage(message);
    
    this.webhook.send(slackMessage)
      .then(result => {
        callback(null, {
          messageId: `slack-${Date.now()}`,
          response: result
        });
      })
      .catch(error => {
        callback(error);
      });
  }

  emailToSlackMessage(email) {
    const blocks = [];
    
    // Header
    blocks.push({
      type: 'header',
      text: {
        type: 'plain_text',
        text: email.subject || 'No Subject'
      }
    });
    
    // From/To information
    blocks.push({
      type: 'section',
      fields: [
        {
          type: 'mrkdwn',
          text: `*From:*\n${email.from}`
        },
        {
          type: 'mrkdwn',
          text: `*To:*\n${Array.isArray(email.to) ? email.to.join(', ') : email.to}`
        }
      ]
    });
    
    // Message content
    if (email.text) {
      blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: email.text.length > 3000 ? 
            email.text.substring(0, 3000) + '...\n*Message truncated*' : 
            email.text
        }
      });
    }
    
    // Attachments as files
    if (email.attachments && email.attachments.length > 0) {
      const attachmentList = email.attachments
        .map(att => `• ${att.filename || 'unnamed'}`)
        .join('\n');
      
      blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Attachments:*\n${attachmentList}`
        }
      });
    }
    
    return {
      username: this.options.botName || 'Email Bot',
      icon_emoji: this.options.iconEmoji || ':email:',
      channel: this.options.channel || '#alerts',
      blocks: blocks
    };
  }
}

// Usage
const slackTransporter = nodemailer.createTransport(new SlackTransport({
  webhookUrl: process.env.SLACK_WEBHOOK_URL,
  channel: '#email-alerts',
  botName: 'Email Notifier'
}));
```

---

## 3. Streaming Attachments and Large Files

### 3.1 Streaming Large Attachments

```js
const fs = require('fs');
const { pipeline } = require('stream/promises');
const archiver = require('archiver');

class StreamingEmailService {
  constructor() {
    this.transporter = nodemailer.createTransport(/* config */);
  }

  async sendEmailWithLargeAttachments(message, attachments) {
    // Create temporary directory for large files
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'email-'));
    
    try {
      // Process large attachments
      const processedAttachments = await this.processAttachments(attachments, tempDir);
      
      const emailMessage = {
        ...message,
        attachments: processedAttachments
      };
      
      return await this.transporter.sendMail(emailMessage);
      
    } finally {
      // Clean up temporary files
      await fs.rm(tempDir, { recursive: true, force: true });
    }
  }

  async processAttachments(attachments, tempDir) {
    const processed = [];
    
    for (const attachment of attachments) {
      if (attachment.path) {
        // Handle file path attachments
        const stats = await fs.stat(attachment.path);
        
        if (stats.size > 25 * 1024 * 1024) { // 25MB threshold
          // Large file - create streaming attachment
          const streamAttachment = await this.createStreamAttachment(
            attachment.path, 
            attachment.filename, 
            tempDir
          );
          processed.push(streamAttachment);
        } else {
          // Small file - regular attachment
          processed.push(attachment);
        }
      } else if (attachment.stream) {
        // Handle stream attachments
        const streamAttachment = await this.processStreamAttachment(
          attachment.stream, 
          attachment.filename, 
          tempDir
        );
        processed.push(streamAttachment);
      } else {
        // Regular attachment
        processed.push(attachment);
      }
    }
    
    return processed;
  }

  async createStreamAttachment(filePath, filename, tempDir) {
    const tempFilePath = path.join(tempDir, filename);
    
    // Create a compressed version for large files
    if (this.shouldCompress(filePath)) {
      const compressedPath = await this.compressFile(filePath, tempDir);
      return {
        filename: `${filename}.zip`,
        path: compressedPath,
        contentType: 'application/zip'
      };
    }
    
    // Stream the file in chunks
    const readStream = fs.createReadStream(filePath);
    const writeStream = fs.createWriteStream(tempFilePath);
    
    await pipeline(readStream, writeStream);
    
    return {
      filename: filename,
      path: tempFilePath,
      contentType: await this.getMimeType(filePath)
    };
  }

  async processStreamAttachment(stream, filename, tempDir) {
    const tempFilePath = path.join(tempDir, filename);
    const writeStream = fs.createWriteStream(tempFilePath);
    
    await pipeline(stream, writeStream);
    
    return {
      filename: filename,
      path: tempFilePath
    };
  }

  async compressFile(filePath, tempDir) {
    const filename = path.basename(filePath);
    const compressedPath = path.join(tempDir, `${filename}.zip`);
    
    const output = fs.createWriteStream(compressedPath);
    const archive = archiver('zip', { zlib: { level: 9 } });
    
    archive.pipe(output);
    archive.file(filePath, { name: filename });
    await archive.finalize();
    
    return compressedPath;
  }

  shouldCompress(filePath) {
    const compressibleExtensions = ['.txt', '.csv', '.json', '.xml', '.log'];
    const ext = path.extname(filePath).toLowerCase();
    return compressibleExtensions.includes(ext);
  }

  async getMimeType(filePath) {
    const mime = require('mime-types');
    return mime.lookup(filePath) || 'application/octet-stream';
  }
}
```

### 3.2 Dynamic Attachment Generation

```js
const PDFDocument = require('pdfkit');
const ExcelJS = require('exceljs');

class DynamicAttachmentGenerator {
  async generatePDFAttachment(data, filename) {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument();
      const chunks = [];
      
      doc.on('data', chunk => chunks.push(chunk));
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(chunks);
        resolve({
          filename: filename,
          content: pdfBuffer,
          contentType: 'application/pdf'
        });
      });
      
      doc.on('error', reject);
      
      // Generate PDF content
      this.generatePDFContent(doc, data);
      doc.end();
    });
  }

  generatePDFContent(doc, data) {
    // Add content to PDF
    doc.fontSize(20).text('Report', 100, 100);
    doc.fontSize(12).text(`Generated: ${new Date().toLocaleString()}`, 100, 130);
    
    // Add table data
    let yPosition = 180;
    data.rows.forEach(row => {
      doc.text(`${row.id}: ${row.name} - ${row.value}`, 100, yPosition);
      yPosition += 20;
    });
  }

  async generateExcelAttachment(data, filename) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Report');
    
    // Add headers
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Name', key: 'name', width: 30 },
      { header: 'Value', key: 'value', width: 15 },
      { header: 'Date', key: 'date', width: 15 }
    ];
    
    // Add data
    worksheet.addRows(data.rows);
    
    // Style the header row
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFE6E6FA' }
    };
    
    const buffer = await workbook.xlsx.writeBuffer();
    
    return {
      filename: filename,
      content: buffer,
      contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    };
  }

  async generateReportAttachment(reportData) {
    const attachments = [];
    
    // Generate PDF version
    const pdfAttachment = await this.generatePDFAttachment(
      reportData, 
      `report-${Date.now()}.pdf`
    );
    attachments.push(pdfAttachment);
    
    // Generate Excel version
    const excelAttachment = await this.generateExcelAttachment(
      reportData, 
      `report-${Date.now()}.xlsx`
    );
    attachments.push(excelAttachment);
    
    return attachments;
  }
}
```

---

## 4. Inline Images and CID Handling

### 4.1 Advanced Inline Image Management

```js
class InlineImageManager {
  constructor() {
    this.imageCache = new Map();
    this.uploadService = new ImageUploadService();
  }

  async processInlineImages(htmlContent, localImages = {}) {
    const processedHtml = await this.replaceImageCIDs(htmlContent, localImages);
    return processedHtml;
  }

  async replaceImageCIDs(html, localImages) {
    // Find all img tags with src starting with "cid:"
    const imgRegex = /<img[^>]+src="cid:([^"]+)"[^>]*>/g;
    let processedHtml = html;
    const matches = [...html.matchAll(imgRegex)];
    
    for (const match of matches) {
      const cid = match[1];
      const fullImgTag = match[0];
      
      try {
        // Get or upload the image
        const imageData = await this.getImageForCid(cid, localImages);
        
        // Replace cid: with actual URL
        const newImgTag = fullImgTag.replace(
          `src="cid:${cid}"`,
          `src="${imageData.url}"` +
          ` data-original-cid="${cid}"` +
          ` alt="${imageData.alt || ''}"`
        );
        
        processedHtml = processedHtml.replace(fullImgTag, newImgTag);
        
      } catch (error) {
        console.warn(`Failed to process image CID ${cid}:`, error.message);
        // Remove the broken image
        processedHtml = processedHtml.replace(fullImgTag, '');
      }
    }
    
    return processedHtml;
  }

  async getImageForCid(cid, localImages) {
    // Check cache first
    if (this.imageCache.has(cid)) {
      return this.imageCache.get(cid);
    }
    
    // Check if it's a local image
    if (localImages[cid]) {
      const imageData = await this.processLocalImage(localImages[cid], cid);
      this.imageCache.set(cid, imageData);
      return imageData;
    }
    
    // Check if it's a built-in image
    const builtInImage = this.getBuiltInImage(cid);
    if (builtInImage) {
      this.imageCache.set(cid, builtInImage);
      return builtInImage;
    }
    
    throw new Error(`Image not found for CID: ${cid}`);
  }

  async processLocalImage(imagePath, cid) {
    const fs = require('fs').promises;
    const path = require('path');
    
    // Read the image file
    const imageBuffer = await fs.readFile(imagePath);
    const ext = path.extname(imagePath).toLowerCase();
    
    // Upload to CDN or hosting service
    const uploadedUrl = await this.uploadService.uploadImage(imageBuffer, {
      filename: `${cid}${ext}`,
      folder: 'email-images'
    });
    
    return {
      url: uploadedUrl,
      alt: cid,
      size: imageBuffer.length,
      type: this.getMimeType(ext)
    };
  }

  getBuiltInImage(cid) {
    const builtInImages = {
      'logo': {
        url: 'https://cdn.yourapp.com/logo.png',
        alt: 'Company Logo',
        type: 'image/png'
      },
      'header-banner': {
        url: 'https://cdn.yourapp.com/email-header.jpg',
        alt: 'Email Header',
        type: 'image/jpeg'
      },
      'signature': {
        url: 'https://cdn.yourapp.com/signature.png',
        alt: 'Signature',
        type: 'image/png'
      }
    };
    
    return builtInImages[cid] || null;
  }

  getMimeType(extension) {
    const mimeTypes = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
      '.webp': 'image/webp'
    };
    
    return mimeTypes[extension] || 'image/jpeg';
  }

  // Create email message with inline images
  async createEmailWithInlineImages(baseMessage, localImages = {}) {
    const processedHtml = await this.processInlineImages(
      baseMessage.html, 
      localImages
    );
    
    // Create attachments for local images (fallback for email clients that don't load external images)
    const attachments = await this.createImageAttachments(localImages);
    
    return {
      ...baseMessage,
      html: processedHtml,
      attachments: [
        ...(baseMessage.attachments || []),
        ...attachments
      ]
    };
  }

  async createImageAttachments(localImages) {
    const attachments = [];
    const fs = require('fs').promises;
    
    for (const [cid, imagePath] of Object.entries(localImages)) {
      try {
        const imageBuffer = await fs.readFile(imagePath);
        const ext = require('path').extname(imagePath);
        
        attachments.push({
          filename: `${cid}${ext}`,
          content: imageBuffer,
          cid: cid, // This makes it available as cid:filename in HTML
          contentType: this.getMimeType(ext)
        });
      } catch (error) {
        console.warn(`Failed to create attachment for ${cid}:`, error.message);
      }
    }
    
    return attachments;
  }
}
```

### 4.2 Responsive Image Handling

```js
class ResponsiveImageHandler {
  generateResponsiveImageHtml(imageData, options = {}) {
    const {
      src,
      alt = '',
      width = '100%',
      height = 'auto',
      maxWidth = '600px',
      loading = 'lazy'
    } = imageData;
    
    return `
      <div style="max-width: ${maxWidth}; margin: 0 auto;">
        <img 
          src="${src}" 
          alt="${alt}"
          width="${width}"
          height="${height}"
          style="max-width: 100%; height: auto; display: block;"
          loading="${loading}"
          border="0"
        />
      </div>
    `;
  }

  generatePictureHtml(sources, fallbackSrc, alt = '') {
    const sourceTags = sources.map(source => {
      const mediaQuery = source.mediaQuery ? `media="${source.mediaQuery}"` : '';
      return `<source srcset="${source.srcset}" ${mediaQuery}>`;
    }).join('\n    ');
    
    return `
      <picture>
    ${sourceTags}
        <img src="${fallbackSrc}" alt="${alt}" style="max-width: 100%; height: auto;">
      </picture>
    `;
  }

  // Generate responsive email template with images
  generateResponsiveEmailTemplate(content, images = {}) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Responsive Email</title>
        <style>
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .responsive-img {
            max-width: 100%;
            height: auto;
            display: block;
          }
          @media screen and (max-width: 480px) {
            .container {
              padding: 10px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          ${content}
        </div>
      </body>
      </html>
    `;
  }
}
```

---

## 5. HTML + Text Fallback Strategies

### 5.1 Advanced HTML to Text Conversion

```js
const TurndownService = require('turndown');
const { JSDOM } = require('jsdom');

class EmailContentProcessor {
  constructor() {
    this.turndownService = new TurndownService({
      headingStyle: 'atx',
      bulletListMarker: '-',
      codeBlockStyle: 'fenced',
      fence: '```'
    });
    
    // Custom rules for better email text conversion
    this.setupCustomRules();
  }

  setupCustomRules() {
    // Convert tables to structured text
    this.turndownService.addRule('table', {
      filter: 'table',
      replacement: (content, node) => {
        const rows = Array.from(node.querySelectorAll('tr'));
        let tableText = '\n';
        
        rows.forEach((row, index) => {
          const cells = Array.from(row.querySelectorAll('td, th'));
          const cellTexts = cells.map(cell => cell.textContent.trim());
          tableText += cellTexts.join(' | ') + '\n';
          
          // Add separator after header row
          if (index === 0 && row.querySelector('th')) {
            const separator = cells.map(() => '---').join(' | ');
            tableText += separator + '\n';
          }
        });
        
        return tableText + '\n';
      }
    });

    // Handle email-specific elements
    this.turndownService.addRule('email-link', {
      filter: (node) => {
        return node.nodeName === 'A' && node.textContent.includes('unsubscribe');
      },
      replacement: (content, node) => {
        return `[Unsubscribe: ${node.href}]`;
      }
    });
  }

  async processEmailContent(htmlContent, customTextContent = null) {
    // Use custom text if provided, otherwise convert from HTML
    const textContent = customTextContent || await this.convertHtmlToText(htmlContent);
    
    // Validate and optimize both versions
    const optimizedHtml = this.optimizeHtml(htmlContent);
    const optimizedText = this.optimizeText(textContent);
    
    return {
      html: optimizedHtml,
      text: optimizedText,
      hasBoth: true
    };
  }

  async convertHtmlToText(html) {
    try {
      // Clean up HTML first
      const cleanedHtml = this.preprocessHtml(html);
      
      // Convert to markdown then plain text
      const markdown = this.turndownService.turndown(cleanedHtml);
      
      // Convert markdown to plain text
      return this.markdownToText(markdown);
    } catch (error) {
      console.warn('HTML to text conversion failed:', error.message);
      // Fallback to basic text extraction
      return this.extractBasicText(html);
    }
  }

  preprocessHtml(html) {
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Remove script tags
    document.querySelectorAll('script').forEach(script => script.remove());
    
    // Remove style tags
    document.querySelectorAll('style').forEach(style => style.remove());
    
    // Add alt text to images without it
    document.querySelectorAll('img:not([alt])').forEach(img => {
      img.setAttribute('alt', 'Image');
    });
    
    // Convert data attributes to readable text where appropriate
    document.querySelectorAll('[data-action]').forEach(element => {
      const action = element.getAttribute('data-action');
      if (action && !element.textContent.includes(action)) {
        element.textContent += ` [${action}]`;
      }
    });
    
    return document.body.innerHTML;
  }

  markdownToText(markdown) {
    return markdown
      // Remove markdown formatting
      .replace(/\*\*(.*?)\*\*/g, '$1') // Bold
      .replace(/\*(.*?)\*/g, '$1')     // Italic
      .replace(/`(.*?)`/g, '$1')       // Inline code
      .replace(/#{1,6}\s/g, '')        // Headers
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Links
      .replace(/^\s*[-*+]\s/gm, '• ')  // List items
      .replace(/^\s*\d+\.\s/gm, '• ')  // Numbered lists
      .replace(/\n{3,}/g, '\n\n')      // Multiple newlines
      .trim();
  }

  extractBasicText(html) {
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Remove script and style elements
    document.querySelectorAll('script, style').forEach(el => el.remove());
    
    // Get text content
    let text = document.body.textContent || '';
    
    // Clean up whitespace
    text = text.replace(/\s+/g, ' ').trim();
    
    // Add basic structure
    return `Email content:\n${text}`;
  }

  optimizeHtml(html) {
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Add responsive meta tag if missing
    if (!document.querySelector('meta[name="viewport"]')) {
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1.0';
      document.head.appendChild(meta);
    }
    
    // Ensure proper DOCTYPE
    if (!html.startsWith('<!DOCTYPE')) {
      return '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
    }
    
    return document.documentElement.outerHTML;
  }

  optimizeText(text) {
    // Ensure text has proper structure
    if (!text.includes('\n')) {
      // Add line breaks for readability
      text = text.replace(/([.!?])\s+/g, '$1\n');
    }
    
    // Add unsubscribe link if missing
    if (!text.toLowerCase().includes('unsubscribe')) {
      text += '\n\n---\nTo unsubscribe from these emails, please visit our preferences page.';
    }
    
    return text.trim();
  }

  // Validate email content
  validateEmailContent(html, text) {
    const issues = [];
    
    // HTML validation
    if (!html.includes('<!DOCTYPE')) {
      issues.push('HTML missing DOCTYPE declaration');
    }
    
    if (!html.includes('<title>')) {
      issues.push('HTML missing title tag');
    }
    
    // Text validation
    if (!text || text.length < 10) {
      issues.push('Text content too short or missing');
    }
    
    // Content comparison
    const htmlText = this.extractBasicText(html);
    const similarity = this.calculateSimilarity(htmlText, text);
    
    if (similarity < 0.3) {
      issues.push('HTML and text content are too different');
    }
    
    return {
      isValid: issues.length === 0,
      issues: issues,
      similarity: similarity
    };
  }

  calculateSimilarity(text1, text2) {
    const words1 = new Set(text1.toLowerCase().split(/\s+/));
    const words2 = new Set(text2.toLowerCase().split(/\s+/));
    
    const intersection = new Set([...words1].filter(x => words2.has(x)));
    const union = new Set([...words1, ...words2]);
    
    return intersection.size / union.size;
  }
}
```

---

## 6. Localization and Multi-Language Support

### 6.1 Multi-Language Email Templates

```js
const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const ICU = require('i18next-icu');

class LocalizationService {
  constructor() {
    this.initialized = false;
    this.supportedLanguages = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'zh'];
  }

  async initialize() {
    await i18next
      .use(Backend)
      .use(ICU)
      .init({
        lng: 'en',
        fallbackLng: 'en',
        supportedLngs: this.supportedLanguages,
        
        backend: {
          loadPath: './locales/{{lng}}/{{ns}}.json'
        },
        
        interpolation: {
          escapeValue: false
        },
        
        detection: {
          order: ['header', 'querystring'],
          lookupHeader: 'accept-language',
          lookupQuerystring: 'lang'
        }
      });
    
    this.initialized = true;
  }

  t(key, options = {}) {
    if (!this.initialized) {
      console.warn('LocalizationService not initialized');
      return key;
    }
    
    return i18next.t(key, options);
  }

  async createLocalizedEmail(templateName, data, language = 'en') {
    await this.initialize();
    
    // Change language for this email
    await i18next.changeLanguage(language);
    
    // Get localized template data
    const localizedData = {
      ...data,
      t: (key, options) => this.t(key, options),
      locale: language,
      rtl: this.isRTL(language),
      dateFormat: this.getDateFormat(language),
      currencyFormat: this.getCurrencyFormat(language)
    };
    
    // Load and render template
    const templateService = new EmailTemplateService();
    await templateService.loadTemplates();
    
    const result = await templateService.renderTemplate(templateName, localizedData);
    
    // Add language-specific headers
    result.headers = {
      'Content-Language': language,
      'X-Email-Language': language
    };
    
    return result;
  }

  isRTL(language) {
    const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
    return rtlLanguages.includes(language);
  }

  getDateFormat(language) {
    const formats = {
      'en': 'MM/DD/YYYY',
      'es': 'DD/MM/YYYY',
      'fr': 'DD/MM/YYYY',
      'de': 'DD.MM.YYYY',
      'ja': 'YYYY/MM/DD',
      'zh': 'YYYY/MM/DD'
    };
    
    return formats[language] || formats['en'];
  }

  getCurrencyFormat(language) {
    const formats = {
      'en': { style: 'currency', currency: 'USD' },
      'es': { style: 'currency', currency: 'EUR' },
      'fr': { style: 'currency', currency: 'EUR' },
      'de': { style: 'currency', currency: 'EUR' },
      'ja': { style: 'currency', currency: 'JPY' },
      'zh': { style: 'currency', currency: 'CNY' }
    };
    
    return formats[language] || formats['en'];
  }

  detectLanguageFromRequest(req) {
    // Try various methods to detect user's language preference
    const headerLanguage = req.headers['accept-language'];
    const queryLanguage = req.query.lang;
    const userLanguage = req.user?.language;
    
    return queryLanguage || userLanguage || this.parseAcceptLanguage(headerLanguage) || 'en';
  }

  parseAcceptLanguage(header) {
    if (!header) return null;
    
    const languages = header.split(',').map(lang => {
      const [code, quality] = lang.trim().split(';q=');
      return {
        code: code.split('-')[0],
        quality: quality ? parseFloat(quality) : 1.0
      };
    });
    
    // Sort by quality and return the best supported language
    languages.sort((a, b) => b.quality - a.quality);
    
    for (const lang of languages) {
      if (this.supportedLanguages.includes(lang.code)) {
        return lang.code;
      }
    }
    
    return null;
  }
}
```

### 6.2 Localized Template Example

**locales/en/email.json:**
```json
{
  "welcome": {
    "subject": "Welcome to {{appName}}!",
    "greeting": "Hi {{firstName}},",
    "body": "Thank you for joining {{appName}}! We're excited to have you on board.",
    "cta": "Get Started",
    "premiumInfo": {
      "with": "You've signed up for our Premium plan with access to all features.",
      "without": "You're currently on our Free plan. Upgrade to Premium to unlock all features."
    },
    "footer": {
      "copyright": "© {{year}} {{companyName}}. All rights reserved.",
      "unsubscribe": "Unsubscribe",
      "preferences": "Email Preferences"
    }
  },
  "order": {
    "subject": "Order Confirmation #{{orderId}}",
    "greeting": "Thank you for your order, {{firstName}}.",
    "details": "Order Details",
    "items": "Items",
    "total": "Total",
    "shipping": "Shipping Address",
    "tracking": "Tracking Information",
    "trackPackage": "Track your package"
  }
}
```

**locales/es/email.json:**
```json
{
  "welcome": {
    "subject": "¡Bienvenido a {{appName}}!",
    "greeting": "Hola {{firstName}},",
    "body": "¡Gracias por unirte a {{appName}}! Estamos emocionados de tenerte a bordo.",
    "cta": "Comenzar",
    "premiumInfo": {
      "with": "Te has suscrito a nuestro plan Premium con acceso a todas las funciones.",
      "without": "Actualmente estás en nuestro plan Gratuito. Actualiza a Premium para desbloquear todas las funciones."
    },
    "footer": {
      "copyright": "© {{year}} {{companyName}}. Todos los derechos reservados.",
      "unsubscribe": "Cancelar suscripción",
      "preferences": "Preferencias de correo electrónico"
    }
  },
  "order": {
    "subject": "Confirmación de Pedido #{{orderId}}",
    "greeting": "Gracias por tu pedido, {{firstName}}.",
    "details": "Detalles del Pedido",
    "items": "Artículos",
    "total": "Total",
    "shipping": "Dirección de Envío",
    "tracking": "Información de Seguimiento",
    "trackPackage": "Rastrear tu paquete"
  }
}
```

**Localized Template (templates/welcome-localized.hbs):**
```handlebars
<!DOCTYPE html>
<html{{#if rtl}} dir="rtl"{{/if}}>
<head>
    <meta charset="utf-8">
    <title>{{t 'welcome.subject' appName=appName}}</title>
    <style>
        body { 
            font-family: {{#if rtl}}'Tahoma', 'Arial', sans-serif{{else}}'Arial', sans-serif{{/if}}; 
            line-height: 1.6; 
            color: #333; 
            direction: {{#if rtl}}rtl{{else}}ltr{{/if}};
        }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #007bff; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; {{#if rtl}}text-align: right;{{/if}} }
        .button { 
            display: inline-block; 
            padding: 12px 24px; 
            background: #28a745; 
            color: white; 
            text-decoration: none; 
            border-radius: 4px;
            {{#if rtl}}float: left;{{else}}float: right;{{/if}}
        }
        .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
        .rtl-fix { clear: both; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>{{t 'welcome.subject' appName=appName}}</h1>
        </div>
        <div class="content">
            <p>{{t 'welcome.greeting' firstName=user.firstName}}</p>
            <p>{{t 'welcome.body' appName=appName}}</p>
            
            {{#if user.isPremium}}
            <p>{{t 'welcome.premiumInfo.with'}}</p>
            {{else}}
            <p>{{t 'welcome.premiumInfo.without'}}</p>
            {{/if}}
            
            <p style="text-align: center; margin: 30px 0;">
                <a href="{{url '/dashboard'}}" class="button">{{t 'welcome.cta'}}</a>
            </p>
            <div class="rtl-fix"></div>
            
            <p>{{t 'common.contactSupport'}}</p>
        </div>
        <div class="footer">
            <p>{{t 'welcome.footer.copyright' year=currentYear companyName=companyName}}</p>
            <p>
                <a href="{{url '/unsubscribe'}}">{{t 'welcome.footer.unsubscribe'}}</a> | 
                <a href="{{url '/preferences'}}">{{t 'welcome.footer.preferences'}}</a>
            </p>
        </div>
    </div>
</body>
</html>
```

---

## Interview-Oriented Notes

**Advanced Topics to Master:**

1. **Multi-Transport**: Failover strategies, circuit breakers, load balancing
2. **Custom Transports**: Creating plugins, extending Nodemailer
3. **Streaming**: Large files, dynamic content generation
4. **Inline Images**: CID handling, responsive images, fallbacks
5. **Localization**: Multi-language support, RTL languages, cultural considerations

**Common Advanced Interview Questions:**

- "How would you implement email provider failover in production?"
- "Can you create a custom Nodemailer transport for a proprietary API?"
- "How do you handle large attachments efficiently?"
- "What's your approach to inline images and email client compatibility?"
- "How would you implement multi-language email support?"

**Key Advanced Concepts:**

- Smart routing with circuit breakers for reliability
- Custom transports for proprietary email services
- Streaming for memory-efficient large file handling
- CID management for inline images with fallbacks
- Localization with proper RTL and cultural considerations

[← Production Best Practices](./05_production.md) | [Next → Performance & Optimization](./07_performance.md)
