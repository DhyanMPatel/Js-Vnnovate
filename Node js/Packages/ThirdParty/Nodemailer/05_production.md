# 🚀 Production-Level Best Practices

## 1. Queue-Based Email Systems

### 1.1 Why Queues Matter in Production

**Without Queues:**
- API responses wait for email delivery
- Single email failure can crash the request
- No retry mechanism for failed emails
- Difficult to scale and monitor

**With Queues:**
- Instant API responses
- Automatic retry with exponential backoff
- Better error handling and monitoring
- Horizontal scaling capability

### 1.2 Bull Queue Implementation (Redis-based)

```js
const Queue = require('bull');
const Redis = require('redis');

// Production-ready queue configuration
const emailQueue = new Queue('email processing', {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD,
    db: 0,
    maxRetriesPerRequest: 3,
    retryDelayOnFailover: 100,
    lazyConnect: true
  },
  defaultJobOptions: {
    removeOnComplete: 50, // Keep last 50 completed jobs
    removeOnFail: 100,    // Keep last 100 failed jobs
    attempts: 3,          // Retry 3 times
    backoff: {
      type: 'exponential',
      delay: 2000         // Start with 2 second delay
    }
  }
});

// Queue event monitoring
emailQueue.on('completed', (job, result) => {
  console.log(`Email job ${job.id} completed:`, result.messageId);
});

emailQueue.on('failed', (job, err) => {
  console.error(`Email job ${job.id} failed:`, err.message);
  // Send alert to monitoring system
  alertingService.notifyEmailFailure(job, err);
});

emailQueue.on('stalled', (job) => {
  console.warn(`Email job ${job.id} stalled`);
});
```

### 1.3 Email Job Types and Priorities

```js
class EmailJobManager {
  constructor() {
    this.queues = {
      critical: new Queue('critical-emails', redisConfig),
      transactional: new Queue('transactional-emails', redisConfig),
      marketing: new Queue('marketing-emails', redisConfig),
      bulk: new Queue('bulk-emails', redisConfig)
    };
  }

  // Critical emails (2FA, password reset)
  async addCriticalEmail(data) {
    return await this.queues.critical.add('send', data, {
      priority: 10,
      delay: 0, // Send immediately
      attempts: 5, // More retries for critical emails
      backoff: { type: 'exponential', delay: 1000 }
    });
  }

  // Transactional emails (welcome, order confirmation)
  async addTransactionalEmail(data) {
    return await this.queues.transactional.add('send', data, {
      priority: 5,
      delay: 0,
      attempts: 3,
      backoff: { type: 'exponential', delay: 2000 }
    });
  }

  // Marketing emails (newsletters, promotions)
  async addMarketingEmail(data) {
    return await this.queues.marketing.add('send', data, {
      priority: 1,
      delay: data.scheduleDelay || 0, // Support scheduling
      attempts: 2,
      backoff: { type: 'fixed', delay: 30000 }
    });
  }

  // Bulk emails (reports, notifications)
  async addBulkEmail(data) {
    return await this.queues.bulk.add('send', data, {
      priority: 0,
      delay: data.scheduleDelay || 0,
      attempts: 1, // Usually no retries for bulk
      backoff: { type: 'fixed', delay: 60000 }
    });
  }
}
```

### 1.4 Queue Processors with Error Handling

```js
class EmailProcessor {
  constructor() {
    this.emailService = new EmailService();
    this.metrics = new EmailMetrics();
    this.circuitBreaker = new CircuitBreaker();
  }

  async processCriticalEmail(job) {
    const { type, payload, metadata } = job.data;
    
    try {
      // Circuit breaker check
      if (this.circuitBreaker.isOpen('critical')) {
        throw new Error('Circuit breaker is open for critical emails');
      }

      const result = await this.emailService.sendEmail(type, payload);
      
      // Record success metrics
      this.metrics.recordSuccess(type, 'critical', job.processedOn);
      
      // Update circuit breaker
      this.circuitBreaker.recordSuccess('critical');
      
      return {
        success: true,
        messageId: result.messageId,
        provider: result.provider,
        processedAt: new Date().toISOString()
      };
      
    } catch (error) {
      // Record failure metrics
      this.metrics.recordFailure(type, 'critical', error);
      
      // Update circuit breaker
      this.circuitBreaker.recordFailure('critical');
      
      // Determine if job should be retried
      if (this.shouldRetry(error, job.attemptsMade)) {
        throw error; // Re-throw to trigger retry
      }
      
      // Don't retry - mark as failed permanently
      return {
        success: false,
        error: error.message,
        permanentFailure: true
      };
    }
  }

  shouldRetry(error, attemptsMade) {
    // Don't retry authentication errors
    if (error.code === 'EAUTH') return false;
    
    // Don't retry invalid email addresses
    if (error.message.includes('Invalid address')) return false;
    
    // Retry network timeouts and temporary failures
    return attemptsMade < 3;
  }
}

// Register processors
const processor = new EmailProcessor();
emailQueue.process('critical', processor.processCriticalEmail.bind(processor));
```

---

## 2. Retry Mechanisms and Error Recovery

### 2.1 Exponential Backoff Strategy

```js
class RetryStrategy {
  static calculateDelay(attempt, baseDelay = 2000, maxDelay = 300000) {
    // Exponential backoff: 2s, 4s, 8s, 16s, 32s, etc.
    const exponentialDelay = baseDelay * Math.pow(2, attempt);
    
    // Add jitter to prevent thundering herd
    const jitter = Math.random() * 1000;
    
    // Cap at maximum delay
    return Math.min(exponentialDelay + jitter, maxDelay);
  }

  static shouldRetry(error, attempt, maxAttempts = 3) {
    if (attempt >= maxAttempts) return false;
    
    // Don't retry these errors
    const nonRetryableErrors = [
      'EAUTH',           // Authentication failed
      'EENVELOPE',       // Invalid envelope
      'EMESSAGE',        // Message format error
      'ECONNECTION',     // Connection refused (usually permanent)
      'ESOCKET'          // Socket error (usually permanent)
    ];
    
    return !nonRetryableErrors.includes(error.code);
  }

  static getRetryDelay(error, attempt) {
    // Different delays for different error types
    if (error.code === 'ETIMEDOUT') {
      return this.calculateDelay(attempt, 5000, 600000); // Longer delays for timeouts
    }
    
    if (error.code === 'ECONNRESET') {
      return this.calculateDelay(attempt, 3000, 300000); // Medium delays for connection resets
    }
    
    return this.calculateDelay(attempt); // Default exponential backoff
  }
}
```

### 2.2 Dead Letter Queue (DLQ) Implementation

```js
class DeadLetterQueue {
  constructor() {
    this.dlq = new Queue('email-dlq', redisConfig);
    this.setupDLQProcessor();
  }

  async addToDLQ(originalJob, error, attemptsMade) {
    const dlqJob = {
      originalJobId: originalJob.id,
      originalData: originalJob.data,
      error: {
        message: error.message,
        code: error.code,
        stack: error.stack
      },
      attemptsMade,
      failedAt: new Date().toISOString(),
      nextRetryAt: this.calculateNextRetry(error, attemptsMade)
    };

    await this.dlq.add('failed-email', dlqJob, {
      delay: dlqJob.nextRetryAt ? dlqJob.nextRetryAt - Date.now() : 0
    });

    // Notify monitoring system
    await this.notifyDLQAddition(dlqJob);
  }

  calculateNextRetry(error, attemptsMade) {
    // Some errors might be retryable after a longer delay
    if (error.code === 'ETIMEDOUT' && attemptsMade < 5) {
      return Date.now() + (3600000 * Math.pow(2, attemptsMade - 3)); // Hours
    }
    
    return null; // No retry scheduled
  }

  setupDLQProcessor() {
    this.dlq.process('failed-email', async (job) => {
      const { originalData, error, attemptsMade } = job.data;
      
      console.log(`Processing DLQ job ${job.id} for original job ${originalData.originalJobId}`);
      
      try {
        // Attempt to send the email again
        const result = await this.emailService.sendEmail(originalData.type, originalData.payload);
        
        // Log successful recovery
        await this.logDLQRecovery(job.id, result);
        
        return { success: true, recovered: true };
        
      } catch (retryError) {
        // If it fails again, put it back in DLQ with longer delay
        await this.addToDLQ(job.data, retryError, attemptsMade + 1);
        
        throw retryError;
      }
    });
  }
}
```

---

## 3. Logging and Monitoring

### 3.1 Structured Logging Implementation

```js
const winston = require('winston');
const { ElasticsearchTransport } = require('winston-elasticsearch');

class EmailLogger {
  constructor() {
    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
      ),
      defaultMeta: {
        service: 'email-service',
        version: process.env.APP_VERSION || '1.0.0'
      },
      transports: [
        // Console for development
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          )
        }),
        
        // File for production
        new winston.transports.File({
          filename: 'logs/email-error.log',
          level: 'error',
          maxsize: 10485760, // 10MB
          maxFiles: 5
        }),
        
        // Elasticsearch for centralized logging
        new ElasticsearchTransport({
          level: 'info',
          clientOpts: {
            node: process.env.ELASTICSEARCH_URL
          },
          index: 'email-service-logs'
        })
      ]
    });
  }

  logEmailSent(data) {
    this.logger.info('Email sent successfully', {
      event: 'email_sent',
      messageId: data.messageId,
      provider: data.provider,
      recipient: data.recipient,
      type: data.type,
      processingTime: data.processingTime,
      queueWaitTime: data.queueWaitTime
    });
  }

  logEmailFailed(data) {
    this.logger.error('Email sending failed', {
      event: 'email_failed',
      jobId: data.jobId,
      recipient: data.recipient,
      type: data.type,
      error: {
        message: data.error.message,
        code: data.error.code,
        stack: data.error.stack
      },
      attemptsMade: data.attemptsMade,
      provider: data.provider
    });
  }

  logQueueMetrics(data) {
    this.logger.info('Queue metrics', {
      event: 'queue_metrics',
      queueName: data.queueName,
      active: data.active,
      waiting: data.waiting,
      completed: data.completed,
      failed: data.failed,
      delayed: data.delayed
    });
  }
}
```

### 3.2 Metrics Collection and Monitoring

```js
const prometheus = require('prom-client');

class EmailMetrics {
  constructor() {
    this.setupMetrics();
  }

  setupMetrics() {
    // Counter for total emails sent
    this.emailsSentTotal = new prometheus.Counter({
      name: 'emails_sent_total',
      help: 'Total number of emails sent',
      labelNames: ['provider', 'type', 'status']
    });

    // Histogram for email processing time
    this.emailProcessingDuration = new prometheus.Histogram({
      name: 'email_processing_duration_seconds',
      help: 'Time spent processing emails',
      labelNames: ['provider', 'type'],
      buckets: [0.1, 0.5, 1, 2, 5, 10, 30]
    });

    // Gauge for queue sizes
    this.queueSize = new prometheus.Gauge({
      name: 'email_queue_size',
      help: 'Current queue size',
      labelNames: ['queue_name']
    });

    // Counter for email failures
    this.emailFailuresTotal = new prometheus.Counter({
      name: 'email_failures_total',
      help: 'Total number of email failures',
      labelNames: ['provider', 'type', 'error_code']
    });
  }

  recordEmailSent(provider, type, processingTime) {
    this.emailsSentTotal.inc({ provider, type, status: 'success' });
    this.emailProcessingDuration.observe({ provider, type }, processingTime);
  }

  recordEmailFailure(provider, type, errorCode) {
    this.emailFailuresTotal.inc({ provider, type, error_code: errorCode });
    this.emailsSentTotal.inc({ provider, type, status: 'failed' });
  }

  updateQueueSize(queueName, size) {
    this.queueSize.set({ queue_name: queueName }, size);
  }

  // Get metrics for Prometheus scraping
  getMetrics() {
    return prometheus.register.metrics();
  }
}

// Express endpoint for metrics
app.get('/metrics', (req, res) => {
  res.set('Content-Type', prometheus.register.contentType);
  res.end(metrics.getMetrics());
});
```

### 3.3 Health Checks and Status Monitoring

```js
class EmailServiceHealthCheck {
  constructor() {
    this.emailService = new EmailService();
    this.redisClient = Redis.createClient();
  }

  async performHealthCheck() {
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      checks: {}
    };

    try {
      // Check Redis connection
      health.checks.redis = await this.checkRedis();
      
      // Check email providers
      health.checks.providers = await this.checkEmailProviders();
      
      // Check queue status
      health.checks.queues = await this.checkQueueStatus();
      
      // Check memory usage
      health.checks.memory = this.checkMemoryUsage();
      
      // Determine overall status
      const failedChecks = Object.values(health.checks)
        .filter(check => check.status !== 'healthy');
      
      if (failedChecks.length > 0) {
        health.status = 'degraded';
        if (failedChecks.some(check => check.status === 'unhealthy')) {
          health.status = 'unhealthy';
        }
      }
      
    } catch (error) {
      health.status = 'unhealthy';
      health.error = error.message;
    }

    return health;
  }

  async checkRedis() {
    try {
      const start = Date.now();
      await this.redisClient.ping();
      const latency = Date.now() - start;
      
      return {
        status: 'healthy',
        latency: `${latency}ms`
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: error.message
      };
    }
  }

  async checkEmailProviders() {
    const providers = {};
    
    for (const [name, config] of Object.entries(this.emailService.providers)) {
      try {
        // Send a test email to verify connectivity
        const testResult = await this.emailService.testProvider(name);
        providers[name] = {
          status: 'healthy',
          latency: testResult.latency
        };
      } catch (error) {
        providers[name] = {
          status: 'unhealthy',
          error: error.message
        };
      }
    }
    
    return providers;
  }

  async checkQueueStatus() {
    const queues = {};
    
    for (const [name, queue] of Object.entries(this.emailService.queues)) {
      try {
        const counts = await queue.getJobCounts();
        queues[name] = {
          status: 'healthy',
          active: counts.active,
          waiting: counts.waiting,
          completed: counts.completed,
          failed: counts.failed
        };
      } catch (error) {
        queues[name] = {
          status: 'unhealthy',
          error: error.message
        };
      }
    }
    
    return queues;
  }

  checkMemoryUsage() {
    const usage = process.memoryUsage();
    const totalMemory = require('os').totalmem();
    
    return {
      status: 'healthy',
      heapUsed: `${Math.round(usage.heapUsed / 1024 / 1024)}MB`,
      heapTotal: `${Math.round(usage.heapTotal / 1024 / 1024)}MB`,
      external: `${Math.round(usage.external / 1024 / 1024)}MB`,
      systemMemoryUsage: `${Math.round((usage.heapUsed / totalMemory) * 100)}%`
    };
  }
}

// Health check endpoint
app.get('/health', async (req, res) => {
  const healthCheck = new EmailServiceHealthCheck();
  const health = await healthCheck.performHealthCheck();
  
  const statusCode = health.status === 'healthy' ? 200 : 
                    health.status === 'degraded' ? 200 : 503;
  
  res.status(statusCode).json(health);
});
```

---

## 4. Email Templates and Template Engines

### 4.1 Handlebars Template Integration

```js
const Handlebars = require('handlebars');
const fs = require('fs').promises;
const path = require('path');

class EmailTemplateService {
  constructor() {
    this.templates = new Map();
    this.partials = new Map();
    this.helpers = new Map();
    this.registerDefaultHelpers();
  }

  async loadTemplates() {
    const templateDir = path.join(__dirname, '../templates');
    
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

  registerDefaultHelpers() {
    // Date formatting helper
    Handlebars.registerHelper('formatDate', (date, format) => {
      const options = {
        short: { year: 'numeric', month: 'short', day: 'numeric' },
        long: { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
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
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim();
  }
}
```

### 4.2 Template Examples

**Welcome Email Template (templates/welcome.hbs):**
```handlebars
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Welcome to {{appName}}</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #007bff; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .button { display: inline-block; padding: 12px 24px; background: #28a745; color: white; text-decoration: none; border-radius: 4px; }
        .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to {{appName}}!</h1>
        </div>
        <div class="content">
            <p>Hi {{user.firstName}},</p>
            <p>Thank you for joining {{appName}}! We're excited to have you on board.</p>
            
            {{#if user.isPremium}}
            <p>You've signed up for our Premium plan with access to all features.</p>
            {{else}}
            <p>You're currently on our Free plan. <a href="{{url '/pricing'}}">Upgrade to Premium</a> to unlock all features.</p>
            {{/if}}
            
            <p style="text-align: center; margin: 30px 0;">
                <a href="{{url '/dashboard'}}" class="button">Get Started</a>
            </p>
            
            <p>If you have any questions, feel free to <a href="{{url '/contact'}}">contact our support team</a>.</p>
        </div>
        <div class="footer">
            <p>&copy; {{formatDate currentDate 'year'}} {{companyName}}. All rights reserved.</p>
            <p><a href="{{url '/unsubscribe'}}">Unsubscribe</a> | <a href="{{url '/preferences'}}">Email Preferences</a></p>
        </div>
    </div>
</body>
</html>
```

**Order Confirmation Template (templates/order-confirmation.hbs):**
```handlebars
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Order Confirmation #{{order.id}}</title>
</head>
<body>
    <div class="container">
        <h1>Order Confirmed!</h1>
        <p>Thank you for your order, {{customer.firstName}}.</p>
        
        <h2>Order Details</h2>
        <p><strong>Order ID:</strong> #{{order.id}}</p>
        <p><strong>Order Date:</strong> {{formatDate order.date 'long'}}</p>
        <p><strong>Payment Method:</strong> {{order.paymentMethod}}</p>
        
        <h2>Items</h2>
        <table>
            {{#each order.items}}
            <tr>
                <td>{{this.name}}</td>
                <td>{{this.quantity}}x</td>
                <td>{{formatCurrency this.price}}</td>
            </tr>
            {{/each}}
            <tr>
                <td colspan="2"><strong>Total:</strong></td>
                <td><strong>{{formatCurrency order.total}}</strong></td>
            </tr>
        </table>
        
        <h2>Shipping Address</h2>
        <p>
            {{customer.firstName}} {{customer.lastName}}<br>
            {{customer.address.street}}<br>
            {{customer.address.city}}, {{customer.address.state}} {{customer.address.zip}}
        </p>
        
        {{#if order.trackingNumber}}
        <h2>Tracking Information</h2>
        <p>Your order has been shipped! Tracking number: {{order.trackingNumber}}</p>
        <p><a href="{{order.trackingUrl}}">Track your package</a></p>
        {{/if}}
    </div>
</body>
</html>
```

---

## 5. Email Testing Strategies

### 5.1 Test Email Configuration

```js
class EmailTestService {
  constructor() {
    this.testTransporters = {
      // Ethereal for testing
      ethereal: nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: process.env.ETHEREAL_USER,
          pass: process.env.ETHEREAL_PASS
        }
      }),
      
      // Mailtrap for testing
      mailtrap: nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: process.env.MAILTRAP_USER,
          pass: process.env.MAILTRAP_PASS
        }
      })
    };
  }

  async sendTestEmail(provider, message) {
    const transporter = this.testTransporters[provider];
    if (!transporter) {
      throw new Error(`Test provider ${provider} not found`);
    }

    const testMessage = {
      ...message,
      subject: `[TEST] ${message.subject}`,
      headers: {
        ...message.headers,
        'X-Test-Environment': 'true'
      }
    };

    const result = await transporter.sendMail(testMessage);
    
    // Log test URL for Ethereal
    if (provider === 'ethereal') {
      console.log('Test email URL:', nodemailer.getTestMessageUrl(result));
    }

    return result;
  }

  async validateEmailTemplate(templateName, data) {
    try {
      const templateService = new EmailTemplateService();
      await templateService.loadTemplates();
      
      const rendered = await templateService.renderTemplate(templateName, data);
      
      return {
        valid: true,
        html: rendered.html,
        text: rendered.text,
        issues: this.validateHtmlContent(rendered.html)
      };
    } catch (error) {
      return {
        valid: false,
        error: error.message
      };
    }
  }

  validateHtmlContent(html) {
    const issues = [];
    
    // Check for required elements
    if (!html.includes('<!DOCTYPE html>')) {
      issues.push('Missing DOCTYPE declaration');
    }
    
    if (!html.includes('<title>')) {
      issues.push('Missing title tag');
    }
    
    // Check for unsubscribe link (required for marketing emails)
    if (!html.includes('unsubscribe')) {
      issues.push('Missing unsubscribe link');
    }
    
    // Check for plain text fallback
    if (!html.includes('text/plain')) {
      issues.push('Consider adding plain text version');
    }
    
    return issues;
  }
}
```

### 5.2 Automated Email Testing

```js
const { expect } = require('chai');
const { describe, it, beforeEach, afterEach } = require('mocha');

describe('Email Service Integration Tests', () => {
  let emailService;
  let testService;

  beforeEach(async () => {
    emailService = new EmailService();
    testService = new EmailTestService();
    await emailService.initialize();
  });

  afterEach(async () => {
    await emailService.cleanup();
  });

  describe('Welcome Email', () => {
    it('should send welcome email successfully', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        isPremium: false
      };

      const result = await testService.sendTestEmail('ethereal', {
        to: 'test@example.com',
        template: 'welcome',
        data: { user: userData }
      });

      expect(result.messageId).to.exist;
      expect(result.accepted).to.include('test@example.com');
    });

    it('should render welcome template correctly', async () => {
      const userData = {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        isPremium: true
      };

      const validation = await testService.validateEmailTemplate('welcome', {
        user: userData,
        appName: 'TestApp',
        currentDate: new Date(),
        companyName: 'Test Company'
      });

      expect(validation.valid).to.be.true;
      expect(validation.html).to.include('Jane Smith');
      expect(validation.html).to.include('Premium plan');
      expect(validation.issues).to.be.empty;
    });
  });

  describe('Rate Limiting', () => {
    it('should enforce rate limits', async () => {
      const promises = [];
      
      // Send 10 emails rapidly (should exceed rate limit)
      for (let i = 0; i < 10; i++) {
        promises.push(
          emailService.sendEmail('welcome', {
            user: { email: `test${i}@example.com`, firstName: 'Test' }
          })
        );
      }

      const results = await Promise.allSettled(promises);
      const failures = results.filter(r => r.status === 'rejected');
      
      expect(failures.length).to.be.greaterThan(0);
      expect(failures[0].reason.message).to.include('rate limit');
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid email addresses', async () => {
      try {
        await emailService.sendEmail('welcome', {
          user: { email: 'invalid-email', firstName: 'Test' }
        });
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).to.include('Invalid email');
      }
    });

    it('should handle missing template gracefully', async () => {
      try {
        await emailService.sendEmail('nonexistent-template', {
          user: { email: 'test@example.com', firstName: 'Test' }
        });
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).to.include('Template not found');
      }
    });
  });
});
```

---

## 6. Scalability Considerations

### 6.1 Horizontal Scaling with Multiple Workers

```js
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  
  // Fork workers based on CPU count
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  // Handle worker exits
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork(); // Replace the dead worker
  });
  
} else {
  // Worker process
  const emailProcessor = new EmailProcessor();
  
  // Each worker processes from all queues
  emailProcessor.start();
  
  console.log(`Worker ${process.pid} started`);
}
```

### 6.2 Database Connection Pooling

```js
const { Pool } = require('pg');

class DatabaseService {
  constructor() {
    this.pool = new Pool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      max: 20, // Maximum number of connections
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });
  }

  async logEmailSent(emailData) {
    const client = await this.pool.connect();
    try {
      await client.query(`
        INSERT INTO email_logs (message_id, recipient, type, provider, status, sent_at)
        VALUES ($1, $2, $3, $4, $5, $6)
      `, [
        emailData.messageId,
        emailData.recipient,
        emailData.type,
        emailData.provider,
        'sent',
        new Date()
      ]);
    } finally {
      client.release();
    }
  }

  async getEmailStats(dateRange) {
    const client = await this.pool.connect();
    try {
      const result = await client.query(`
        SELECT 
          provider,
          type,
          COUNT(*) as total_sent,
          COUNT(CASE WHEN status = 'sent' THEN 1 END) as successful,
          COUNT(CASE WHEN status = 'failed' THEN 1 END) as failed
        FROM email_logs 
        WHERE sent_at >= $1 AND sent_at <= $2
        GROUP BY provider, type
        ORDER BY total_sent DESC
      `, [dateRange.start, dateRange.end]);
      
      return result.rows;
    } finally {
      client.release();
    }
  }
}
```

---

## Interview-Oriented Notes

**Production Topics to Master:**

1. **Queue Systems**: Bull, Redis, job priorities, retry mechanisms
2. **Monitoring**: Logging, metrics, health checks, alerting
3. **Templates**: Handlebars, template inheritance, helpers
4. **Testing**: Unit tests, integration tests, email validation
5. **Scaling**: Horizontal scaling, connection pooling, load balancing

**Common Production Interview Questions:**

- "How would you handle email failures in production?"
- "What's your approach to email queue management?"
- "How do you monitor email deliverability and performance?"
- "How would you scale an email service to handle millions of emails?"

**Key Production Practices:**

- Always use queues for non-critical emails
- Implement comprehensive logging and monitoring
- Use template engines for consistent branding
- Test emails thoroughly before production deployment
- Plan for horizontal scaling from the start

[← Security](./04_security.md) | [Next → Advanced Concepts](./06_advanced.md)
