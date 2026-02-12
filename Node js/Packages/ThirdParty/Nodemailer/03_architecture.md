# 🏛️ Architecture & System Design with Nodemailer

## 1. Nodemailer in Backend Architecture

### Where Email Service Fits

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Web Client    │    │   Mobile App    │    │  Internal Tool  │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                 │
                    ┌─────────────▼─────────────┐
                    │      API Gateway          │
                    │   (Express/Fastify)       │
                    └─────────────┬─────────────┘
                                 │
          ┌──────────────────────┼──────────────────────┐
          │                      │                      │
┌─────────▼─────────┐  ┌─────────▼─────────┐  ┌─────────▼─────────┐
│   User Service    │  │   Order Service   │  │  Notification     │
│   (Auth, Profile) │  │   (Processing)    │  │  Service          │
└─────────┬─────────┘  └─────────┬─────────┘  └─────────┬─────────┘
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                 │
                    ┌─────────────▼─────────────┐
                    │     Email Service         │
                    │   (Nodemailer + Queue)    │
                    └─────────────┬─────────────┘
                                 │
          ┌──────────────────────┼──────────────────────┐
          │                      │                      │
┌─────────▼─────────┐  ┌─────────▼─────────┐  ┌─────────▼─────────┐
│     Gmail SMTP    │  │   AWS SES         │  │   SendGrid API    │
└───────────────────┘  └───────────────────┘  └───────────────────┘
```

### Microservices Email Architecture

**Pattern 1: Dedicated Email Service**

```js
// email-service/src/emailService.js
class EmailService {
  constructor() {
    this.transporters = {
      transactional: this.createTransporter('ses'),
      marketing: this.createTransporter('sendgrid'),
      internal: this.createTransporter('gmail')
    };
  }

  async sendEmail(type, message) {
    const transporter = this.transporters[type];
    return await transporter.sendMail(message);
  }

  // Other services call this via HTTP/gRPC/message queue
  async handleEmailRequest(request) {
    const { type, message, priority } = request;
    
    if (priority === 'high') {
      return await this.sendEmail(type, message);
    } else {
      await this.queueEmail(type, message);
      return { queued: true };
    }
  }
}
```

**Pattern 2: Email as Shared Library**

```js
// shared-packages/email/src/index.js
class EmailProvider {
  constructor(config) {
    this.transporter = nodemailer.createTransport(config);
  }

  // Used across multiple microservices
  async sendWelcomeEmail(user) {
    await this.transporter.sendMail({
      to: user.email,
      subject: 'Welcome!',
      template: 'welcome',
      data: { user }
    });
  }
}

// user-service/index.js
const emailProvider = new EmailProvider(sesConfig);
await emailProvider.sendWelcomeEmail(createdUser);
```

---

## 2. Synchronous vs Asynchronous Email Sending

### 2.1 Synchronous (Direct) Sending

**When to use:**
- User registration confirmation
- Password reset requests
- Two-factor authentication codes
- Real-time notifications

```js
// Direct blocking approach
app.post('/register', async (req, res) => {
  try {
    const user = await userService.create(req.body);
    
    // Blocking - user waits for email to be sent
    await emailService.sendWelcomeEmail(user);
    
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

**Pros:**
- Immediate feedback on delivery
- Simpler error handling
- User gets confirmation quickly

**Cons:**
- Slower API response times
- Potential for timeouts
- Not scalable for bulk emails

### 2.2 Asynchronous (Queue-based) Sending

**When to use:**
- Marketing campaigns
- Daily/weekly reports
- Bulk notifications
- Non-critical updates

```js
// Queue-based non-blocking approach
app.post('/register', async (req, res) => {
  try {
    const user = await userService.create(req.body);
    
    // Non-blocking - immediate response
    await emailQueue.add('welcome', { userId: user.id });
    
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// email-processor.js
emailQueue.process('welcome', async (job) => {
  const user = await userService.findById(job.data.userId);
  await emailService.sendWelcomeEmail(user);
});
```

**Pros:**
- Fast API responses
- Better scalability
- Retry mechanisms built-in
- Load balancing

**Cons:**
- Delayed delivery
- More complex infrastructure
- Need monitoring systems

---

## 3. Event-Driven Email Architecture

### 3.1 Event-Based Email Triggers

```js
// event-bus.js
class EventBus {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
}

// email-service.js
eventBus.on('user.registered', async (user) => {
  await emailService.sendWelcomeEmail(user);
});

eventBus.on('order.completed', async (order) => {
  await emailService.sendOrderConfirmation(order);
});

eventBus.on('payment.failed', async (payment) => {
  await emailService.sendPaymentFailure(payment);
});

// user-service.js
const newUser = await userService.create(userData);
eventBus.emit('user.registered', newUser);
```

### 3.2 Message Queue Integration

**Using Bull Queue with Redis:**

```js
// email-queue.js
const Queue = require('bull');
const emailQueue = new Queue('email processing', 'redis://localhost:6379');

// Define email jobs
emailQueue.process('welcome', async (job) => {
  const { userId } = job.data;
  const user = await User.findById(userId);
  return await emailService.sendWelcomeEmail(user);
});

emailQueue.process('password-reset', async (job) => {
  const { userId, token } = job.data;
  const user = await User.findById(userId);
  return await emailService.sendPasswordReset(user, token);
});

// Add jobs to queue
const addEmailJob = (type, data, options = {}) => {
  return emailQueue.add(type, data, {
    attempts: 3,
    backoff: 'exponential',
    delay: options.delay || 0,
    priority: options.priority || 'normal'
  });
};
```

**Using RabbitMQ:**

```js
// rabbitmq-email-publisher.js
const amqp = require('amqplib');

class EmailPublisher {
  async publishEmail(type, payload) {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    
    const queue = `email_${type}`;
    await channel.assertQueue(queue, { durable: true });
    
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(payload)), {
      persistent: true,
      priority: payload.priority || 5
    });
    
    await channel.close();
    await connection.close();
  }
}

// rabbitmq-email-consumer.js
const emailConsumer = {
  async consumeWelcomeEmail() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    
    await channel.assertQueue('email_welcome', { durable: true });
    channel.consume('email_welcome', async (msg) => {
      if (msg) {
        const payload = JSON.parse(msg.content.toString());
        await emailService.sendWelcomeEmail(payload);
        channel.ack(msg);
      }
    });
  }
};
```

---

## 4. Multi-Transport Strategy

### 4.1 Provider Selection Logic

```js
class EmailRouter {
  constructor() {
    this.transporters = {
      gmail: nodemailer.createTransport(gmailConfig),
      ses: nodemailer.createTransport(sesConfig),
      sendgrid: nodemailer.createTransport(sendgridConfig)
    };
    
    this.providerRules = {
      transactional: ['ses', 'sendgrid'],
      marketing: ['sendgrid'],
      internal: ['gmail'],
      bulk: ['ses']
    };
  }

  selectProvider(type, priority, volume) {
    const providers = this.providerRules[type] || ['ses'];
    
    // Load balancing logic
    if (volume > 1000) {
      return this.transporters.ses; // Use SES for high volume
    }
    
    if (priority === 'high') {
      return this.transporters.sendgrid; // Use SendGrid for critical emails
    }
    
    // Round-robin for normal priority
    return this.transporters[providers[0]];
  }

  async sendEmail(type, message, priority = 'normal', volume = 1) {
    const transporter = this.selectProvider(type, priority, volume);
    
    try {
      return await transporter.sendMail(message);
    } catch (error) {
      // Fallback logic
      return await this.handleFailure(type, message, error);
    }
  }

  async handleFailure(type, message, error) {
    // Try alternative provider
    const fallbackTransporter = this.getFallbackProvider(type);
    if (fallbackTransporter) {
      return await fallbackTransporter.sendMail(message);
    }
    throw error;
  }
}
```

---

## 5. Email Service Architecture Patterns

### 5.1 Single Service Pattern

```
┌─────────────────────────────────────┐
│        Email Service                │
├─────────────────────────────────────┤
│  ┌─────────────┐ ┌─────────────────┐ │
│  │   HTTP API  │ │   Queue Worker  │ │
│  │             │ │                 │ │
│  │ /send       │ │ Process jobs    │ │
│  │ /template   │ │ Retry failed    │ │
│  │ /status     │ │ Log results     │ │
│  └─────────────┘ └─────────────────┘ │
├─────────────────────────────────────┤
│        Nodemailer Layer             │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ │
│  │  Gmail  │ │   SES   │ │SendGrid │ │
│  └─────────┘ └─────────┘ └─────────┘ │
└─────────────────────────────────────┘
```

### 5.2 Microservices Pattern

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Transactional  │    │   Marketing     │    │   Internal      │
│   Email Service │    │  Email Service  │    │  Email Service  │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                 │
                    ┌─────────────▼─────────────┐
                    │    Email Gateway          │
                    │  (Load Balancer, Router)  │
                    └─────────────┬─────────────┘
                                 │
                    ┌─────────────▼─────────────┐
                    │      Provider Layer       │
                    │  (Gmail, SES, SendGrid)   │
                    └───────────────────────────┘
```

---

## 6. Scaling Considerations

### 6.1 Horizontal Scaling

```js
// Cluster-based email processing
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  // Master process distributes jobs
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  // Worker processes emails
  emailQueue.process('*', async (job) => {
    const emailService = new EmailService();
    return await emailService.processJob(job);
  });
}
```

### 6.2 Connection Pooling

```js
class TransporterPool {
  constructor(config, maxSize = 10) {
    this.config = config;
    this.maxSize = maxSize;
    this.pool = [];
    this.waiting = [];
  }

  async getTransporter() {
    if (this.pool.length > 0) {
      return this.pool.pop();
    }
    
    if (this.pool.length < this.maxSize) {
      return nodemailer.createTransport(this.config);
    }
    
    // Wait for available transporter
    return new Promise(resolve => {
      this.waiting.push(resolve);
    });
  }

  releaseTransporter(transporter) {
    if (this.waiting.length > 0) {
      const resolve = this.waiting.shift();
      resolve(transporter);
    } else {
      this.pool.push(transporter);
    }
  }
}
```

---

## 7. Monitoring and Observability

### 7.1 Metrics Collection

```js
class EmailMetrics {
  constructor() {
    this.metrics = {
      sent: 0,
      failed: 0,
      queued: 0,
      processingTime: [],
      providerStats: {}
    };
  }

  recordSent(provider, processingTime) {
    this.metrics.sent++;
    this.metrics.processingTime.push(processingTime);
    
    if (!this.metrics.providerStats[provider]) {
      this.metrics.providerStats[provider] = { sent: 0, failed: 0 };
    }
    this.metrics.providerStats[provider].sent++;
  }

  recordFailed(provider, error) {
    this.metrics.failed++;
    
    if (!this.metrics.providerStats[provider]) {
      this.metrics.providerStats[provider] = { sent: 0, failed: 0 };
    }
    this.metrics.providerStats[provider].failed++;
  }

  getStats() {
    const avgProcessingTime = this.metrics.processingTime.reduce((a, b) => a + b, 0) 
      / this.metrics.processingTime.length;
    
    return {
      ...this.metrics,
      successRate: (this.metrics.sent / (this.metrics.sent + this.metrics.failed)) * 100,
      avgProcessingTime
    };
  }
}
```

---

## Interview-Oriented Notes

**Architecture Patterns to Understand:**

1. **Service Design**: Monolithic vs microservices email service
2. **Queue Integration**: Bull, RabbitMQ, Kafka for email processing
3. **Event-Driven**: Using events to trigger email sending
4. **Multi-Provider**: Load balancing and failover strategies
5. **Scaling**: Horizontal scaling and connection pooling

**Common Interview Questions:**

- "How would you design an email service for a SaaS platform?"
- "When would you use queues vs direct email sending?"
- "How do you handle email provider failures?"
- "What's the difference between transactional and marketing email architecture?"

**Key Architectural Decisions:**

- Sync vs async based on email criticality
- Multi-provider strategy for reliability
- Queue-based processing for scalability
- Event-driven architecture for loose coupling

[← Core Concepts](./02_core_concepts.md) | [Next → Security Best Practices](./04_security.md)
