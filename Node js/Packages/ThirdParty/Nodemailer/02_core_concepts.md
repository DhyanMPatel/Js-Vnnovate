# 🏗️ Nodemailer Core Concepts

## 1. Transporters - The Email Delivery Engine

### What is a Transporter?

A **transporter** is Nodemailer's abstraction for an email delivery service. Think of it as your **mail carrier** - it knows how to deliver emails to different destinations.

### Simple Analogy
```
You write a letter → Put it in envelope → Give to mail carrier → Mail carrier delivers
Your app creates email → Nodemailer formats → Transporter sends → Recipient receives
```

### Transporter Types

| Transporter Type | Use Case | Example Providers |
|------------------|----------|-------------------|
| **SMTP** | Direct email sending, full control | Gmail, Outlook, custom SMTP |
| **SES** | AWS ecosystem, high volume | Amazon SES |
| **SendGrid** | Transactional email service | SendGrid API |
| **Mailgun** | Developer-focused email service | Mailgun API |
| **Test** | Development, testing | Ethereal.email, Mailtrap |

### Creating a Transporter

```js
const nodemailer = require('nodemailer');

// SMTP Transporter (most common)
const smtpTransporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password' // or OAuth2
  }
});

// AWS SES Transporter
const sesTransporter = nodemailer.createTransport({
  SES: new aws.SES({
    apiVersion: '2010-12-01',
    region: 'us-east-1'
  })
});

// SendGrid Transporter
const sendgridTransporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: 'apikey',
    pass: 'YOUR_SENDGRID_API_KEY'
  }
});
```

---

## 2. Email Message Structure

### Basic Email Anatomy

```
┌─────────────────────────────────────┐
│              HEADERS                 │
├─────────────────────────────────────┤
│  From: sender@example.com           │
│  To: recipient@example.com          │
│  Subject: Welcome to Our Service    │
│  Date: Mon, 01 Jan 2024 12:00:00    │
├─────────────────────────────────────┤
│              BODY                   │
├─────────────────────────────────────┤
│  [Text Version]                     │
│  Welcome to our service!            │
│                                     │
│  [HTML Version]                     │
│  <h1>Welcome!</h1>                  │
│  <p>Thanks for joining us.</p>      │
│                                     │
│  [Attachments]                      │
│  - welcome.pdf                      │
│  - logo.png                         │
└─────────────────────────────────────┘
```

### Message Object Structure

```js
const message = {
  // Required Headers
  from: 'Your Name <your-email@example.com>',
  to: 'recipient1@example.com, recipient2@example.com',
  subject: 'Important Update',
  
  // Optional Headers
  cc: 'cc-recipient@example.com',
  bcc: 'bcc-recipient@example.com',
  replyTo: 'support@example.com',
  inReplyTo: 'message-id@example.com',
  references: ['previous-message-id@example.com'],
  date: new Date(),
  
  // Body Content
  text: 'Plain text version for email clients that don\'t support HTML',
  html: '<h1>HTML Version</h1><p>Rich content with <strong>formatting</strong></p>',
  
  // Attachments
  attachments: [
    {
      filename: 'report.pdf',
      path: '/path/to/file.pdf'
    },
    {
      filename: 'logo.png',
      content: Buffer.from('...'),
      cid: 'logo@example.com' // for inline images
    }
  ],
  
  // Advanced Options
  priority: 'high', // 'high', 'normal', 'low'
  headers: {
    'X-Custom-Header': 'Custom Value',
    'X-Priority': '1'
  }
};
```

---

## 3. Authentication Methods

### 3.1 Username/Password (Basic Auth)

**Simple but less secure:**

```js
const transporter = nodemailer.createTransport({
  host: 'smtp.example.com',
  port: 587,
  auth: {
    user: 'username@example.com',
    pass: 'password'
  }
});
```

**When to use:**
- Development environments
- Internal systems
- When OAuth2 is not available

### 3.2 App Passwords (Recommended for Gmail/Outlook)

**More secure than regular passwords:**

```js
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'abcd efgh ijkl mnop' // 16-character app password
  }
});
```

**Why App Passwords:**
- Generated per application
- Can be revoked individually
- Doesn't expose main account password

### 3.3 OAuth2 (Most Secure)

**Production-ready authentication:**

```js
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'your-email@gmail.com',
    clientId: 'YOUR_CLIENT_ID',
    clientSecret: 'YOUR_CLIENT_SECRET',
    refreshToken: 'REFRESH_TOKEN',
    accessToken: 'ACCESS_TOKEN'
  }
});
```

**OAuth2 Flow:**
1. User consents to app access
2. Get authorization code
3. Exchange code for tokens
4. Use refresh token for long-term access

---

## 4. Email Providers Deep Dive

### 4.1 Gmail/Google Workspace

**Configuration:**
```js
{
  service: 'gmail',
  auth: {
    user: 'you@gmail.com',
    pass: 'app-password' // or OAuth2
  }
}
```

**Pros:**
- Free tier available
- Reliable infrastructure
- Good deliverability

**Cons:**
- Sending limits (100/day for free, 2000/day for workspace)
- Requires app passwords for 2FA accounts
- Not designed for bulk marketing

### 4.2 Microsoft 365/Outlook

**Configuration:**
```js
{
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  auth: {
    user: 'you@outlook.com',
    pass: 'app-password'
  }
}
```

**Pros:**
- Business-focused
- Good integration with Microsoft ecosystem
- Higher sending limits than Gmail

**Cons:**
- More complex setup
- OAuth2 recommended but complex

### 4.3 Amazon SES

**Configuration:**
```js
const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'us-east-1' });

const transporter = nodemailer.createTransport({
  SES: ses
});
```

**Pros:**
- Very cost-effective at scale
- High deliverability
- Built-in analytics
- Scalable to millions of emails

**Cons:**
- AWS ecosystem required
- Initial setup complexity
- Sandbox mode for new accounts

### 4.4 SendGrid

**Configuration:**
```js
{
  service: 'SendGrid',
  auth: {
    user: 'apikey',
    pass: 'YOUR_SENDGRID_API_KEY'
  }
}
```

**Pros:**
- Developer-friendly API
- Good deliverability tools
- Template management
- Analytics and tracking

**Cons:**
- Can be expensive at scale
- Vendor lock-in

---

## 5. Message Priorities and Headers

### Priority Levels

```js
// High Priority (Urgent)
{
  priority: 'high',
  headers: {
    'X-Priority': '1',
    'X-MSMail-Priority': 'High'
  }
}

// Normal Priority (Default)
{
  priority: 'normal'
}

// Low Priority (Bulk)
{
  priority: 'low',
  headers: {
    'X-Priority': '5',
    'X-MSMail-Priority': 'Low'
  }
}
```

### Custom Headers

```js
{
  headers: {
    'X-Campaign-ID': 'welcome-series-001',
    'X-Customer-Type': 'premium',
    'List-Unsubscribe': '<https://example.com/unsubscribe?user=123>'
  }
}
```

---

## 6. Error Handling and Validation

### Common Error Types

```js
try {
  await transporter.sendMail(message);
} catch (error) {
  if (error.code === 'EAUTH') {
    console.log('Authentication failed');
  } else if (error.code === 'ECONNECTION') {
    console.log('Connection to SMTP server failed');
  } else if (error.code === 'EMESSAGE') {
    console.log('Message format error');
  } else {
    console.log('Unknown error:', error);
  }
}
```

### Message Validation

Nodemailer automatically validates:
- Email address format
- Required fields (from, to, subject)
- Attachment file existence
- Header format

---

## Interview-Oriented Notes

**Core Concepts to Master:**

1. **Transporters**: Different types and when to use each
2. **Message Structure**: Headers, body, attachments
3. **Authentication**: Password vs App Password vs OAuth2
4. **Email Providers**: Trade-offs between different services
5. **Error Handling**: Common error codes and resolution

**Common Interview Questions:**

- "What's the difference between SMTP and SES transporters?"
- "Why would you use OAuth2 instead of app passwords?"
- "How do you handle email attachments in Nodemailer?"
- "What makes Gmail different from SendGrid for email sending?"

**Key Points:**

- Transporters are the delivery mechanism
- Message objects contain headers, content, and attachments
- OAuth2 is most secure, app passwords are practical compromise
- Different providers optimize for different use cases

[← Introduction](./01_introduction.md) | [Next → Architecture & System Design](./03_architecture.md)
