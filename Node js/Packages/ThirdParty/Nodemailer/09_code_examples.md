# 💻 Code Examples

## 1. Basic Example - Getting Started

### 1.1 Simple Email Sending

```js
const nodemailer = require('nodemailer');

// Create transporter with Gmail (using app password)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password' // 16-character app password
  }
});

// Send email function
async function sendBasicEmail() {
  try {
    const info = await transporter.sendMail({
      from: '"Your Name" <your-email@gmail.com>',
      to: 'recipient@example.com',
      subject: 'Hello from Nodemailer! 👋',
      text: 'This is a plain text email.',
      html: '<h1>Hello!</h1><p>This is an <b>HTML</b> email.</p>'
    });

    console.log('Email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

// Usage
sendBasicEmail()
  .then(() => console.log('Done!'))
  .catch(error => console.error('Failed:', error));
```

### 1.2 Email with Attachments

```js
async function sendEmailWithAttachments() {
  const mailOptions = {
    from: 'sender@example.com',
    to: 'recipient@example.com',
    subject: 'Email with Attachments',
    html: '<h1>Please find attached files</h1>',
    
    attachments: [
      // File from disk
      {
        filename: 'report.pdf',
        path: '/path/to/report.pdf'
      },
      
      // Buffer attachment
      {
        filename: 'data.json',
        content: Buffer.from(JSON.stringify({ data: 'example' })),
        contentType: 'application/json'
      },
      
      // Stream attachment
      {
        filename: 'image.png',
        content: fs.createReadStream('/path/to/image.png')
      },
      
      // Inline image with CID
      {
        filename: 'logo.png',
        path: '/path/to/logo.png',
        cid: 'logo@example.com' // Same CID as in HTML
      }
    ]
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
}
```

### 1.3 Multiple Recipients

```js
async function sendToMultipleRecipients() {
  const mailOptions = {
    from: 'sender@example.com',
    
    // Multiple recipients
    to: [
      'user1@example.com',
      'user2@example.com',
      'User Name <user3@example.com>'
    ].join(', '),
    
    // CC recipients
    cc: 'manager@example.com',
    
    // BCC recipients (hidden from other recipients)
    bcc: 'archive@example.com',
    
    subject: 'Team Update',
    html: '<h1>Team Update</h1><p>This email goes to multiple recipients.</p>'
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
}
```

---

## 2. Production-Ready Example

### 2.1 Complete Email Service Class

```js
const nodemailer = require('nodemailer');
const EventEmitter = require('events');

class ProductionEmailService extends EventEmitter {
  constructor(config) {
    super();
    this.config = config;
    this.transporter = null;
    this.isInitialized = false;
    this.metrics = {
      sent: 0,
      failed: 0,
      totalProcessingTime: 0
    };
  }

  async initialize() {
    try {
      // Validate configuration
      this.validateConfig();
      
      // Create transporter
      this.transporter = nodemailer.createTransport(this.config);
      
      // Verify connection
      await this.transporter.verify();
      
      // Set up event listeners
      this.setupEventListeners();
      
      this.isInitialized = true;
      this.emit('initialized');
      
      console.log('Email service initialized successfully');
    } catch (error) {
      this.emit('error', error);
      throw new Error(`Failed to initialize email service: ${error.message}`);
    }
  }

  validateConfig() {
    const required = ['auth.user', 'auth.pass'];
    const missing = required.filter(path => !this.getNestedValue(this.config, path));
    
    if (missing.length > 0) {
      throw new Error(`Missing required configuration: ${missing.join(', ')}`);
    }
  }

  getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  setupEventListeners() {
    // Log transporter events if available
    if (this.transporter.on) {
      this.transporter.on('idle', () => {
        console.log('Email transporter is idle');
      });
    }
  }

  async sendEmail(options) {
    if (!this.isInitialized) {
      await this.initialize();
    }

    const startTime = Date.now();
    
    try {
      // Validate email options
      this.validateEmailOptions(options);
      
      // Add default headers
      const mailOptions = this.addDefaultHeaders(options);
      
      // Send email
      const result = await this.transporter.sendMail(mailOptions);
      
      // Update metrics
      const processingTime = Date.now() - startTime;
      this.updateMetrics('sent', processingTime);
      
      // Log success
      console.log(`Email sent successfully to ${options.to}`);
      
      // Emit success event
      this.emit('sent', {
        messageId: result.messageId,
        recipient: options.to,
        processingTime
      });
      
      return result;
      
    } catch (error) {
      // Update metrics
      const processingTime = Date.now() - startTime;
      this.updateMetrics('failed', processingTime);
      
      // Log error
      console.error(`Failed to send email to ${options.to}:`, error);
      
      // Emit error event
      this.emit('error', {
        recipient: options.to,
        error: error.message,
        processingTime
      });
      
      throw error;
    }
  }

  validateEmailOptions(options) {
    if (!options.to) {
      throw new Error('Recipient (to) is required');
    }
    
    if (!options.subject) {
      throw new Error('Subject is required');
    }
    
    if (!options.text && !options.html) {
      throw new Error('Either text or html content is required');
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const recipients = Array.isArray(options.to) ? options.to : [options.to];
    
    for (const recipient of recipients) {
      const email = recipient.includes('<') ? 
        recipient.match(/<(.+)>/)?.[1] : recipient;
      
      if (!email || !emailRegex.test(email)) {
        throw new Error(`Invalid email address: ${recipient}`);
      }
    }
  }

  addDefaultHeaders(options) {
    return {
      ...options,
      headers: {
        'X-Mailer': 'ProductionEmailService v1.0',
        'X-Priority': options.priority || '3',
        'Date': new Date().toUTCString(),
        ...options.headers
      }
    };
  }

  updateMetrics(type, processingTime) {
    this.metrics[type]++;
    this.metrics.totalProcessingTime += processingTime;
  }

  getMetrics() {
    const avgProcessingTime = this.metrics.sent > 0 ? 
      this.metrics.totalProcessingTime / this.metrics.sent : 0;
    
    return {
      ...this.metrics,
      averageProcessingTime: avgProcessingTime,
      successRate: this.metrics.sent / (this.metrics.sent + this.metrics.failed) * 100
    };
  }

  async sendBulkEmails(emailList) {
    const results = [];
    const promises = emailList.map(async (emailOptions, index) => {
      try {
        const result = await this.sendEmail(emailOptions);
        results.push({ index, success: true, result });
      } catch (error) {
        results.push({ index, success: false, error: error.message });
      }
    });

    await Promise.all(promises);
    return results;
  }

  async close() {
    if (this.transporter && this.transporter.close) {
      this.transporter.close();
    }
    this.isInitialized = false;
    console.log('Email service closed');
  }
}

// Usage example
const emailService = new ProductionEmailService({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  pool: true,
  maxConnections: 5,
  maxMessages: 100
});

// Send an email
emailService.sendEmail({
  to: 'user@example.com',
  subject: 'Welcome!',
  html: '<h1>Welcome to our service</h1>',
  priority: 'high'
});
```

---

## 3. OAuth2 Example

### 3.1 Complete OAuth2 Setup

```js
const { google } = require('googleapis');
const nodemailer = require('nodemailer');

class OAuth2EmailService {
  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      process.env.GMAIL_REDIRECT_URI
    );
    
    this.oauth2Client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN
    });
    
    this.transporter = null;
  }

  async getTransporter() {
    try {
      // Get access token
      const { token } = await this.oauth2Client.getAccessToken();
      
      // Create transporter with OAuth2
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.GMAIL_USER,
          clientId: process.env.GMAIL_CLIENT_ID,
          clientSecret: process.env.GMAIL_CLIENT_SECRET,
          refreshToken: process.env.GMAIL_REFRESH_TOKEN,
          accessToken: token
        }
      });
      
      return this.transporter;
    } catch (error) {
      console.error('Failed to create OAuth2 transporter:', error);
      throw new Error('OAuth2 authentication failed');
    }
  }

  async sendEmail(mailOptions) {
    const transporter = await this.getTransporter();
    
    try {
      const result = await transporter.sendMail(mailOptions);
      console.log('OAuth2 email sent successfully');
      return result;
    } catch (error) {
      console.error('OAuth2 email sending failed:', error);
      
      // If token expired, refresh and retry
      if (error.message.includes('invalid_token')) {
        await this.refreshToken();
        const newTransporter = await this.getTransporter();
        return await newTransporter.sendMail(mailOptions);
      }
      
      throw error;
    }
  }

  async refreshToken() {
    try {
      const { credentials } = await this.oauth2Client.refreshAccessToken();
      console.log('OAuth2 token refreshed successfully');
      return credentials;
    } catch (error) {
      console.error('Failed to refresh OAuth2 token:', error);
      throw error;
    }
  }

  // Helper method to get OAuth2 URL for user consent
  getAuthUrl(scopes = ['https://www.googleapis.com/auth/gmail.send']) {
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent'
    });
  }

  // Exchange authorization code for tokens
  async getTokens(code) {
    try {
      const { tokens } = await this.oauth2Client.getToken(code);
      this.oauth2Client.setCredentials(tokens);
      return tokens;
    } catch (error) {
      console.error('Failed to get tokens:', error);
      throw error;
    }
  }
}

// Usage
const oauth2Service = new OAuth2EmailService();

// Send email with OAuth2
oauth2Service.sendEmail({
  from: process.env.GMAIL_USER,
  to: 'recipient@example.com',
  subject: 'OAuth2 Test Email',
  html: '<h1>This email was sent using OAuth2!</h1>'
});
```

### 3.2 OAuth2 Setup Helper

```js
const express = require('express');
const app = express();

// OAuth2 setup endpoints
app.get('/auth/gmail', (req, res) => {
  const authUrl = oauth2Service.getAuthUrl();
  res.redirect(authUrl);
});

app.get('/auth/gmail/callback', async (req, res) => {
  try {
    const { code } = req.query;
    const tokens = await oauth2Service.getTokens(code);
    
    // Save refresh token securely (database, environment variables, etc.)
    console.log('Refresh token:', tokens.refresh_token);
    
    res.send('Authentication successful! You can now send emails.');
  } catch (error) {
    res.status(500).send('Authentication failed: ' + error.message);
  }
});

// Start server
app.listen(3000, () => {
  console.log('OAuth2 setup server running on port 3000');
  console.log('Visit http://localhost:3000/auth/gmail to authenticate');
});
```

---

## 4. Queue-Based Example

### 4.1 Bull Queue Implementation

```js
const Queue = require('bull');
const Redis = require('redis');

class QueueEmailService {
  constructor() {
    this.emailQueue = new Queue('email processing', {
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6379
      }
    });
    
    this.transporter = nodemailer.createTransport({
      service: 'ses',
      auth: {
        user: process.env.AWS_ACCESS_KEY,
        pass: process.env.AWS_SECRET
      }
    });
    
    this.setupQueueProcessors();
  }

  setupQueueProcessors() {
    // Process regular emails
    this.emailQueue.process('send-email', 5, async (job) => {
      return await this.processEmail(job);
    });

    // Process bulk emails
    this.emailQueue.process('send-bulk', 2, async (job) => {
      return await this.processBulkEmail(job);
    });

    // Handle failed jobs
    this.emailQueue.on('failed', (job, err) => {
      console.error(`Job ${job.id} failed:`, err);
      
      // Add to dead letter queue after 3 failures
      if (job.attemptsMade >= 3) {
        this.addToDeadLetterQueue(job);
      }
    });

    // Handle completed jobs
    this.emailQueue.on('completed', (job, result) => {
      console.log(`Job ${job.id} completed:`, result.messageId);
    });
  }

  async sendEmail(mailOptions, options = {}) {
    const job = await this.emailQueue.add('send-email', mailOptions, {
      attempts: 3,
      backoff: 'exponential',
      delay: options.delay || 0,
      priority: options.priority || 'normal',
      removeOnComplete: 10,
      removeOnFail: 5
    });

    return {
      jobId: job.id,
      queued: true,
      message: 'Email queued for processing'
    };
  }

  async sendBulkEmail(emailList, options = {}) {
    const job = await this.emailQueue.add('send-bulk', {
      emails: emailList,
      options
    }, {
      attempts: 2,
      backoff: 'fixed',
      delay: options.delay || 0,
      priority: 'low'
    });

    return {
      jobId: job.id,
      queued: true,
      emailCount: emailList.length
    };
  }

  async processEmail(job) {
    const { data } = job;
    const startTime = Date.now();
    
    try {
      const result = await this.transporter.sendMail(data);
      
      return {
        success: true,
        messageId: result.messageId,
        processingTime: Date.now() - startTime,
        recipient: data.to
      };
    } catch (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }

  async processBulkEmail(job) {
    const { emails, options } = job.data;
    const results = [];
    
    for (const emailOptions of emails) {
      try {
        const result = await this.transporter.sendMail(emailOptions);
        results.push({
          success: true,
          recipient: emailOptions.to,
          messageId: result.messageId
        });
        
        // Rate limiting - wait between emails
        if (options.delayBetween) {
          await this.sleep(options.delayBetween);
        }
        
      } catch (error) {
        results.push({
          success: false,
          recipient: emailOptions.to,
          error: error.message
        });
      }
    }
    
    return {
      total: emails.length,
      successful: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
      results
    };
  }

  async addToDeadLetterQueue(job) {
    const deadLetterQueue = new Queue('email-dlq');
    
    await deadLetterQueue.add('failed-email', {
      originalJobId: job.id,
      originalData: job.data,
      error: job.failedReason,
      attemptsMade: job.attemptsMade,
      failedAt: new Date().toISOString()
    });
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getQueueStats() {
    const waiting = await this.emailQueue.getWaiting();
    const active = await this.emailQueue.getActive();
    const completed = await this.emailQueue.getCompleted();
    const failed = await this.emailQueue.getFailed();

    return {
      waiting: waiting.length,
      active: active.length,
      completed: completed.length,
      failed: failed.length
    };
  }
}

// Usage
const queueEmailService = new QueueEmailService();

// Queue single email
await queueEmailService.sendEmail({
  from: 'sender@example.com',
  to: 'recipient@example.com',
  subject: 'Queued Email',
  html: '<h1>This email is processed by a queue!</h1>'
});

// Queue bulk emails
const emailList = [
  { to: 'user1@example.com', subject: 'Bulk Email 1', html: '<p>Content 1</p>' },
  { to: 'user2@example.com', subject: 'Bulk Email 2', html: '<p>Content 2</p>' }
];

await queueEmailService.sendBulkEmail(emailList, {
  delayBetween: 1000 // 1 second between emails
});
```

---

## 5. Template-Based Example

### 5.1 Handlebars Template Service

```js
const Handlebars = require('handlebars');
const fs = require('fs').promises;
const path = require('path');

class TemplateEmailService {
  constructor() {
    this.templates = new Map();
    this.partials = new Map();
    this.transporter = nodemailer.createTransport(/* config */);
  }

  async loadTemplates() {
    const templateDir = path.join(__dirname, 'templates');
    
    // Load main templates
    const templateFiles = await fs.readdir(templateDir);
    for (const file of templateFiles) {
      if (file.endsWith('.hbs')) {
        const templateName = path.basename(file, '.hbs');
        const templateContent = await fs.readFile(path.join(templateDir, file), 'utf8');
        this.templates.set(templateName, Handlebars.compile(templateContent));
      }
    }
    
    // Load partials
    const partialsDir = path.join(templateDir, 'partials');
    try {
      const partialFiles = await fs.readdir(partialsDir);
      for (const file of partialFiles) {
        if (file.endsWith('.hbs')) {
          const partialName = path.basename(file, '.hbs');
          const partialContent = await fs.readFile(path.join(partialsDir, file), 'utf8');
          Handlebars.registerPartial(partialName, partialContent);
          this.partials.set(partialName, partialContent);
        }
      }
    } catch (error) {
      // Partials directory might not exist
      console.log('No partials directory found');
    }
  }

  registerHelpers() {
    // Date formatting helper
    Handlebars.registerHelper('formatDate', (date, format) => {
      const options = {
        short: { year: 'numeric', month: 'short', day: 'numeric' },
        long: { year: 'numeric', month: 'long', day: 'numeric' }
      };
      return new Date(date).toLocaleDateString('en-US', options[format] || options.short);
    });

    // Currency formatting helper
    Handlebars.registerHelper('formatCurrency', (amount, currency = 'USD') => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
      }).format(amount);
    });

    // Conditional helper
    Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
      return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    });

    // URL helper
    Handlebars.registerHelper('url', (path) => {
      return `${process.env.BASE_URL}${path}`;
    });
  }

  async renderTemplate(templateName, data) {
    if (!this.templates.has(templateName)) {
      throw new Error(`Template ${templateName} not found`);
    }

    const template = this.templates.get(templateName);
    
    try {
      const html = template(data);
      
      // Generate text version (basic HTML to text conversion)
      const text = this.htmlToText(html);
      
      return { html, text };
    } catch (error) {
      throw new Error(`Template rendering failed: ${error.message}`);
    }
  }

  htmlToText(html) {
    return html
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/\s+/g, ' ') // Replace multiple spaces
      .trim();
  }

  async sendTemplatedEmail(templateName, to, data, options = {}) {
    try {
      // Load templates if not already loaded
      if (this.templates.size === 0) {
        await this.loadTemplates();
        this.registerHelpers();
      }
      
      // Render template
      const { html, text } = await this.renderTemplate(templateName, {
        ...data,
        baseUrl: process.env.BASE_URL
      });
      
      // Send email
      const mailOptions = {
        from: options.from || process.env.DEFAULT_FROM,
        to: to,
        subject: options.subject || data.subject,
        html: html,
        text: text,
        ...options
      };
      
      const result = await this.transporter.sendMail(mailOptions);
      
      return {
        success: true,
        messageId: result.messageId,
        template: templateName,
        recipient: to
      };
      
    } catch (error) {
      console.error(`Failed to send templated email ${templateName}:`, error);
      throw error;
    }
  }

  async sendWelcomeEmail(userEmail, userData) {
    return await this.sendTemplatedEmail('welcome', userEmail, {
      user: userData,
      appName: process.env.APP_NAME,
      currentDate: new Date()
    });
  }

  async sendOrderConfirmation(userEmail, orderData) {
    return await this.sendTemplatedEmail('order-confirmation', userEmail, {
      customer: orderData.customer,
      order: orderData.order,
      currentDate: new Date()
    });
  }
}

// Usage
const templateService = new TemplateEmailService();

// Send welcome email
await templateService.sendWelcomeEmail('newuser@example.com', {
  firstName: 'John',
  lastName: 'Doe',
  isPremium: true
});

// Send order confirmation
await templateService.sendOrderConfirmation('customer@example.com', {
  customer: {
    firstName: 'Jane',
    lastName: 'Smith'
  },
  order: {
    id: '12345',
    items: [
      { name: 'Product 1', price: 29.99, quantity: 2 },
      { name: 'Product 2', price: 49.99, quantity: 1 }
    ],
    total: 109.97
  }
});
```

### 5.2 Template Example Files

**templates/welcome.hbs:**
```handlebars
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Welcome to {{appName}}!</title>
</head>
<body>
    <h1>Welcome {{user.firstName}}!</h1>
    
    <p>Thank you for joining {{appName}}. We're excited to have you on board.</p>
    
    {{#if user.isPremium}}
    <p>You've signed up for our Premium plan with access to all features.</p>
    {{else}}
    <p>You're currently on our Free plan. <a href="{{url '/upgrade'}}">Upgrade to Premium</a> to unlock all features.</p>
    {{/if}}
    
    <p><a href="{{url '/dashboard'}}">Get Started</a></p>
    
    <p>Best regards,<br>The {{appName}} Team</p>
</body>
</html>
```

**templates/order-confirmation.hbs:**
```handlebars
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Order Confirmation #{{order.id}}</title>
</head>
<body>
    <h1>Order Confirmed!</h1>
    
    <p>Thank you for your order, {{customer.firstName}}.</p>
    
    <h2>Order Details</h2>
    <p><strong>Order ID:</strong> #{{order.id}}</p>
    <p><strong>Date:</strong> {{formatDate currentDate 'long'}}</p>
    
    <h3>Items</h3>
    <table>
        <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
        </tr>
        {{#each order.items}}
        <tr>
            <td>{{this.name}}</td>
            <td>{{this.quantity}}</td>
            <td>{{formatCurrency this.price}}</td>
        </tr>
        {{/each}}
        <tr>
            <td colspan="2"><strong>Total:</strong></td>
            <td><strong>{{formatCurrency order.total}}</strong></td>
        </tr>
    </table>
</body>
</html>
```

---

## 6. Error Handling and Retry Example

### 6.1 Robust Error Handling

```js
class RobustEmailService {
  constructor() {
    this.transporter = nodemailer.createTransport(/* config */);
    this.retryConfig = {
      maxRetries: 3,
      baseDelay: 1000,
      maxDelay: 30000
    };
  }

  async sendEmailWithRetry(mailOptions) {
    let lastError;
    
    for (let attempt = 1; attempt <= this.retryConfig.maxRetries; attempt++) {
      try {
        const result = await this.sendEmailWithValidation(mailOptions);
        
        if (attempt > 1) {
          console.log(`Email sent successfully after ${attempt} attempts`);
        }
        
        return result;
        
      } catch (error) {
        lastError = error;
        
        console.warn(`Email send attempt ${attempt} failed:`, error.message);
        
        // Don't retry certain errors
        if (this.isNonRetryableError(error)) {
          throw error;
        }
        
        // If not the last attempt, wait before retrying
        if (attempt < this.retryConfig.maxRetries) {
          const delay = this.calculateRetryDelay(attempt);
          console.log(`Retrying in ${delay}ms...`);
          await this.sleep(delay);
        }
      }
    }
    
    // All retries failed
    throw new Error(`Email sending failed after ${this.retryConfig.maxRetries} attempts. Last error: ${lastError.message}`);
  }

  async sendEmailWithValidation(mailOptions) {
    // Validate email options
    this.validateEmailOptions(mailOptions);
    
    // Add tracking headers
    const enhancedOptions = this.addTrackingHeaders(mailOptions);
    
    // Send email
    const result = await this.transporter.sendMail(enhancedOptions);
    
    // Validate result
    if (!result.messageId) {
      throw new Error('Email sent but no message ID received');
    }
    
    return result;
  }

  validateEmailOptions(mailOptions) {
    const errors = [];
    
    if (!mailOptions.to) {
      errors.push('Recipient (to) is required');
    }
    
    if (!mailOptions.subject) {
      errors.push('Subject is required');
    }
    
    if (!mailOptions.text && !mailOptions.html) {
      errors.push('Either text or html content is required');
    }
    
    // Validate email addresses
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validateEmail = (email) => {
      const cleanEmail = email.includes('<') ? 
        email.match(/<(.+)>/)?.[1] : email;
      return cleanEmail && emailRegex.test(cleanEmail);
    };
    
    const recipients = Array.isArray(mailOptions.to) ? mailOptions.to : [mailOptions.to];
    for (const recipient of recipients) {
      if (!validateEmail(recipient)) {
        errors.push(`Invalid email address: ${recipient}`);
      }
    }
    
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }
  }

  addTrackingHeaders(mailOptions) {
    return {
      ...mailOptions,
      headers: {
        'X-Mailer': 'RobustEmailService v1.0',
        'X-Attempt-Count': '1',
        'X-Request-ID': this.generateRequestId(),
        ...mailOptions.headers
      }
    };
  }

  isNonRetryableError(error) {
    const nonRetryableCodes = [
      'EAUTH',           // Authentication failed
      'EENVELOPE',       // Invalid envelope
      'EMESSAGE',        // Message format error
      'ECONNECTION',     // Connection refused
      'ESOCKET'          // Socket error
    ];
    
    const nonRetryableMessages = [
      'Invalid address',
      'Authentication failed',
      'Message too large',
      'Spam detected'
    ];
    
    return nonRetryableCodes.includes(error.code) ||
           nonRetryableMessages.some(msg => error.message.includes(msg));
  }

  calculateRetryDelay(attempt) {
    // Exponential backoff with jitter
    const exponentialDelay = this.retryConfig.baseDelay * Math.pow(2, attempt - 1);
    const jitter = Math.random() * 1000; // Add up to 1 second of jitter
    
    return Math.min(exponentialDelay + jitter, this.retryConfig.maxDelay);
  }

  generateRequestId() {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async sendBulkEmailsWithRetry(emailList) {
    const results = [];
    
    // Process emails in parallel with concurrency limit
    const concurrencyLimit = 5;
    const chunks = this.chunkArray(emailList, concurrencyLimit);
    
    for (const chunk of chunks) {
      const chunkPromises = chunk.map(async (emailOptions, index) => {
        try {
          const result = await this.sendEmailWithRetry(emailOptions);
          return { index, success: true, result };
        } catch (error) {
          return { 
            index, 
            success: false, 
            error: error.message,
            recipient: emailOptions.to 
          };
        }
      });
      
      const chunkResults = await Promise.all(chunkPromises);
      results.push(...chunkResults);
      
      // Small delay between chunks to avoid overwhelming the server
      if (chunks.indexOf(chunk) < chunks.length - 1) {
        await this.sleep(500);
      }
    }
    
    return this.summarizeResults(results, emailList);
  }

  chunkArray(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }

  summarizeResults(results, originalList) {
    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);
    
    return {
      total: originalList.length,
      successful: successful.length,
      failed: failed.length,
      successRate: (successful.length / originalList.length) * 100,
      results: results.map((result, index) => ({
        ...result,
        originalEmail: originalList[index]
      }))
    };
  }
}

// Usage
const robustService = new RobustEmailService();

// Send single email with retry
try {
  await robustService.sendEmailWithRetry({
    to: 'user@example.com',
    subject: 'Robust Email Test',
    html: '<h1>This email has robust error handling!</h1>'
  });
} catch (error) {
  console.error('Email ultimately failed:', error);
}

// Send bulk emails with retry
const emailList = [
  { to: 'user1@example.com', subject: 'Bulk Email 1', html: '<p>Content 1</p>' },
  { to: 'user2@example.com', subject: 'Bulk Email 2', html: '<p>Content 2</p>' }
];

const bulkResults = await robustService.sendBulkEmailsWithRetry(emailList);
console.log(`Bulk email results: ${bulkResults.successful}/${bulkResults.total} successful`);
```

---

## Interview-Oriented Notes

**Code Examples to Understand:**

1. **Basic Setup**: Simple transporter creation and email sending
2. **Production Service**: Complete class with error handling, metrics, and validation
3. **OAuth2**: Secure authentication implementation
4. **Queue Integration**: Bull queue for scalable email processing
5. **Template System**: Handlebars integration for dynamic content
6. **Error Handling**: Retry logic and comprehensive error management

**Key Code Patterns:**

- Transporter creation and configuration
- Async/await error handling patterns
- Queue job processing with Bull
- Template rendering with Handlebars
- Retry mechanisms with exponential backoff
- Validation and sanitization patterns

**Common Interview Code Questions:**

- "Show me how to send an email with Nodemailer"
- "How would you implement OAuth2 authentication?"
- "Write a queue-based email processing system"
- "How do you handle email sending failures?"
- "Show me a template-based email system"

[← Service Comparisons](./08_comparisons.md) | [Next → Interview Questions](./10_interview_questions.md)
