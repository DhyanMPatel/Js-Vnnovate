# 🔒 Security Best Practices with Nodemailer

## 1. Authentication Security

### 1.1 OAuth2 Implementation (Most Secure)

**Why OAuth2 over App Passwords?**
- No long-lived passwords in code
- Token-based with expiration
- Granular permissions
- Revocable access
- Audit trail

**Complete OAuth2 Setup for Gmail:**

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
  }

  async getTransporter() {
    try {
      const accessToken = await this.oauth2Client.getAccessToken();
      
      return nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.GMAIL_USER,
          clientId: process.env.GMAIL_CLIENT_ID,
          clientSecret: process.env.GMAIL_CLIENT_SECRET,
          refreshToken: process.env.GMAIL_REFRESH_TOKEN,
          accessToken: accessToken.token
        }
      });
    } catch (error) {
      console.error('OAuth2 token refresh failed:', error);
      throw new Error('Authentication failed');
    }
  }

  async sendEmail(message) {
    const transporter = await this.getTransporter();
    return await transporter.sendMail(message);
  }
}
```

**OAuth2 Token Refresh Strategy:**

```js
class TokenManager {
  constructor() {
    this.accessToken = null;
    this.tokenExpiry = null;
  }

  async getValidToken() {
    if (!this.isTokenValid()) {
      await this.refreshToken();
    }
    return this.accessToken;
  }

  isTokenValid() {
    return this.accessToken && 
           this.tokenExpiry && 
           Date.now() < this.tokenExpiry;
  }

  async refreshToken() {
    try {
      const response = await this.oauth2Client.getAccessToken();
      this.accessToken = response.token;
      this.tokenExpiry = Date.now() + (response.res.data.expires_in * 1000);
    } catch (error) {
      console.error('Token refresh failed:', error);
      throw error;
    }
  }
}
```

### 1.2 App Password Security

**When using App Passwords (Gmail/Outlook):**

```js
// Secure configuration management
class EmailConfig {
  constructor() {
    this.config = {
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
      }
    };
  }

  validateConfig() {
    const required = ['EMAIL_USER', 'EMAIL_APP_PASSWORD'];
    const missing = required.filter(key => !process.env[key]);
    
    if (missing.length > 0) {
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
  }
}

// Usage with validation
const emailConfig = new EmailConfig();
emailConfig.validateConfig();
const transporter = nodemailer.createTransport(emailConfig.config);
```

---

## 2. Environment Variables and Configuration Security

### 2.1 Environment Variable Management

**.env.example (never commit actual .env):**

```bash
# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your-app-password

# OAuth2 Configuration
GMAIL_CLIENT_ID=your-client-id
GMAIL_CLIENT_SECRET=your-client-secret
GMAIL_REFRESH_TOKEN=your-refresh-token
GMAIL_REDIRECT_URI=http://localhost:3000/auth/google/callback

# Alternative Providers
SENDGRID_API_KEY=your-sendgrid-key
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_REGION=us-east-1

# Security Settings
EMAIL_FROM_NAME=Your App Name
EMAIL_FROM_ADDRESS=noreply@yourapp.com
ALLOWED_DOMAINS=yourapp.com,anotherdomain.com
```

### 2.2 Configuration Validation

```js
class SecureEmailConfig {
  constructor() {
    this.validateEnvironment();
    this.config = this.buildConfig();
  }

  validateEnvironment() {
    const requiredVars = {
      production: ['EMAIL_SERVICE', 'EMAIL_USER', 'EMAIL_APP_PASSWORD'],
      development: ['EMAIL_SERVICE', 'EMAIL_USER']
    };

    const env = process.env.NODE_ENV || 'development';
    const required = requiredVars[env] || requiredVars.development;

    for (const varName of required) {
      if (!process.env[varName]) {
        throw new Error(`Required environment variable ${varName} is missing`);
      }
    }
  }

  buildConfig() {
    const baseConfig = {
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
      }
    };

    // Add security headers
    baseConfig.headers = {
      'X-Mailer': 'SecureApp',
      'X-Priority': '3'
    };

    return baseConfig;
  }

  // Rate limiting configuration
  getRateLimitConfig() {
    return {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: parseInt(process.env.EMAIL_RATE_LIMIT) || 100,
      message: 'Too many emails sent from this IP'
    };
  }
}
```

---

## 3. Preventing Credential Leaks

### 3.1 Secure Credential Storage

**Never hardcode credentials:**

```js
// ❌ BAD - Hardcoded credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'myapp@gmail.com',
    pass: 'abcd efgh ijkl mnop' // This will be exposed in git!
  }
});

// ✅ GOOD - Environment variables
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD
  }
});
```

### 3.2 Secret Management Services

**Using AWS Secrets Manager:**

```js
const AWS = require('aws-sdk');
const secretsManager = new AWS.SecretsManager();

class AWSSecretEmailConfig {
  async getSecret() {
    try {
      const secret = await secretsManager.getSecretValue({
        SecretId: process.env.EMAIL_SECRET_ARN
      }).promise();
      
      return JSON.parse(secret.SecretString);
    } catch (error) {
      console.error('Failed to retrieve email secrets:', error);
      throw error;
    }
  }

  async createTransporter() {
    const secrets = await this.getSecret();
    
    return nodemailer.createTransport({
      service: secrets.service,
      auth: {
        user: secrets.user,
        pass: secrets.password
      }
    });
  }
}
```

**Using HashiCorp Vault:**

```js
const vault = require('node-vault');

class VaultEmailConfig {
  constructor() {
    this.vaultClient = vault({
      url: process.env.VAULT_URL,
      token: process.env.VAULT_TOKEN
    });
  }

  async getEmailCredentials() {
    try {
      const result = await this.vaultClient.read('secret/email/config');
      return result.data;
    } catch (error) {
      console.error('Vault access failed:', error);
      throw error;
    }
  }
}
```

---

## 4. Spam Prevention and Rate Limiting

### 4.1 Rate Limiting Implementation

```js
const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const Redis = require('redis');

const redisClient = Redis.createClient();

// Global email rate limiting
const emailRateLimit = rateLimit({
  store: new RedisStore({
    client: redisClient,
    prefix: 'rl:email:'
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 emails per windowMs
  message: {
    error: 'Too many emails sent. Please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Per-user rate limiting
const perUserRateLimit = rateLimit({
  store: new RedisStore({
    client: redisClient,
    keyGenerator: (req) => `user:${req.user?.id || req.ip}`,
    prefix: 'rl:user_email:'
  }),
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50, // 50 emails per user per hour
  skip: (req) => !req.user // Skip for unauthenticated requests
});

// Apply to email endpoints
app.post('/send-email', emailRateLimit, perUserRateLimit, async (req, res) => {
  // Email sending logic
});
```

### 4.2 Content Validation and Spam Prevention

```js
class EmailContentValidator {
  constructor() {
    this.blockedDomains = ['spammy.com', 'blocked.org'];
    this.suspiciousPatterns = [
      /click here/i,
      /free money/i,
      /guaranteed winner/i,
      /act now/i
    ];
  }

  validateEmail(message) {
    const errors = [];

    // Validate sender domain
    if (this.isBlockedDomain(message.from)) {
      errors.push('Sender domain is blocked');
    }

    // Check for suspicious content
    const content = `${message.subject} ${message.text} ${message.html}`;
    for (const pattern of this.suspiciousPatterns) {
      if (pattern.test(content)) {
        errors.push('Suspicious content detected');
        break;
      }
    }

    // Validate recipient count
    const recipientCount = this.countRecipients(message);
    if (recipientCount > 50) {
      errors.push('Too many recipients');
    }

    // Check for excessive links
    const linkCount = this.countLinks(message.html);
    if (linkCount > 10) {
      errors.push('Too many links in email');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  isBlockedDomain(email) {
    const domain = email.split('@')[1];
    return this.blockedDomains.includes(domain);
  }

  countRecipients(message) {
    const recipients = [
      ...(message.to || []),
      ...(message.cc || []),
      ...(message.bcc || [])
    ];
    return recipients.length;
  }

  countLinks(html) {
    const linkRegex = /<a[^>]+href=/gi;
    const matches = html.match(linkRegex);
    return matches ? matches.length : 0;
  }
}
```

---

## 5. Email Authentication (SPF, DKIM, DMARC)

### 5.1 DKIM Implementation

```js
const dkim = require('nodemailer-dkim');

class DKIMEmailService {
  constructor() {
    this.dkimOptions = {
      domainName: process.env.DOMAIN_NAME,
      keySelector: process.env.DKIM_SELECTOR,
      privateKey: process.env.DKIM_PRIVATE_KEY
    };
  }

  createTransporter() {
    const transporter = nodemailer.createTransport({
      service: 'ses',
      auth: {
        user: process.env.AWS_ACCESS_KEY_ID,
        pass: process.env.AWS_SECRET_ACCESS_KEY
      }
    });

    // Add DKIM signing
    transporter.use('stream', dkim.signer(this.dkimOptions));
    
    return transporter;
  }

  async sendSignedEmail(message) {
    const transporter = this.createTransporter();
    
    const signedMessage = {
      ...message,
      headers: {
        ...message.headers,
        'X-DKIM-Signature': 'auto' // Will be added by DKIM signer
      }
    };

    return await transporter.sendMail(signedMessage);
  }
}
```

### 5.2 SPF and DMARC Configuration

**SPF Record (DNS Setup):**
```
v=spf1 include:_spf.google.com ~all
```

**DMARC Record (DNS Setup):**
```
v=DMARC1; p=quarantine; rua=mailto:dmarc@yourdomain.com; ruf=mailto:dmarc@yourdomain.com
```

---

## 6. Input Validation and Sanitization

### 6.1 Email Address Validation

```js
const validator = require('validator');

class EmailValidator {
  static validateEmail(email) {
    if (!email || typeof email !== 'string') {
      return { valid: false, error: 'Email is required' };
    }

    if (!validator.isEmail(email)) {
      return { valid: false, error: 'Invalid email format' };
    }

    // Check for suspicious patterns
    if (this.isSuspiciousEmail(email)) {
      return { valid: false, error: 'Suspicious email address' };
    }

    return { valid: true };
  }

  static isSuspiciousEmail(email) {
    const suspiciousPatterns = [
      /^[0-9]+@/, // Numbers only before @
      /.*\+\d+@/, // Plus with numbers (temporary emails)
      /.*(temp|throwaway|disposable).*/i // Disposable email keywords
    ];

    return suspiciousPatterns.some(pattern => pattern.test(email));
  }

  static validateRecipientList(recipients) {
    if (!Array.isArray(recipients)) {
      recipients = [recipients];
    }

    const results = recipients.map(email => this.validateEmail(email));
    const invalidEmails = results.filter(r => !r.valid);

    if (invalidEmails.length > 0) {
      return {
        valid: false,
        errors: invalidEmails.map(r => r.error)
      };
    }

    return { valid: true, validatedEmails: recipients };
  }
}
```

### 6.2 Content Sanitization

```js
const DOMPurify = require('isomorphic-dompurify');
const validator = require('validator');

class EmailSanitizer {
  static sanitizeHtml(html) {
    // Remove dangerous HTML elements and attributes
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [
        'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'ul', 'ol', 'li', 'a', 'img', 'table', 'tr', 'td', 'th', 'thead', 'tbody'
      ],
      ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'style'],
      ALLOW_DATA_ATTR: false
    });
  }

  static sanitizeText(text) {
    if (!text || typeof text !== 'string') {
      return '';
    }

    // Remove potentially dangerous content
    return validator.escape(text.trim());
  }

  static sanitizeMessage(message) {
    const sanitized = { ...message };

    if (sanitized.html) {
      sanitized.html = this.sanitizeHtml(sanitized.html);
    }

    if (sanitized.text) {
      sanitized.text = this.sanitizeText(sanitized.text);
    }

    if (sanitized.subject) {
      sanitized.subject = this.sanitizeText(sanitized.subject);
    }

    // Validate recipient emails
    const recipientValidation = EmailValidator.validateRecipientList(sanitized.to);
    if (!recipientValidation.valid) {
      throw new Error(`Invalid recipients: ${recipientValidation.errors.join(', ')}`);
    }

    return sanitized;
  }
}
```

---

## 7. Security Headers and Metadata

### 7.1 Security Headers

```js
class SecureEmailHeaders {
  static addSecurityHeaders(message) {
    return {
      ...message,
      headers: {
        ...message.headers,
        // Security headers
        'X-Mailer': 'SecureApp v1.0',
        'X-Priority': '3',
        'X-MSMail-Priority': 'Normal',
        
        // Tracking and authentication
        'Message-ID': this.generateMessageId(),
        'Date': new Date().toUTCString(),
        
        // Anti-spam headers
        'X-AntiAbuse': 'This email was sent by a verified user',
        'X-Auth-User': message.authUser || 'system',
        
        // Compliance headers
        'List-Unsubscribe': this.generateUnsubscribeHeader(message),
        'Feedback-ID': this.generateFeedbackId(message)
      }
    };
  }

  static generateMessageId() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2);
    return `<${timestamp}.${random}@${process.env.DOMAIN_NAME}>`;
  }

  static generateUnsubscribeHeader(message) {
    const unsubscribeUrl = `${process.env.BASE_URL}/unsubscribe?email=${encodeURIComponent(message.to)}`;
    return `<${unsubscribeUrl}>`;
  }

  static generateFeedbackId(message) {
    return `${process.env.DOMAIN_NAME}:campaign:${message.campaignId || 'unknown'}`;
  }
}
```

---

## 8. Audit Logging and Monitoring

### 8.1 Security Event Logging

```js
class SecurityLogger {
  static logEmailAttempt(data) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      event: 'email_send_attempt',
      userId: data.userId,
      userEmail: data.userEmail,
      recipientEmail: data.recipientEmail,
      ipAddress: data.ipAddress,
      userAgent: data.userAgent,
      emailType: data.emailType,
      provider: data.provider,
      success: data.success,
      error: data.error || null,
      messageId: data.messageId || null
    };

    // Log to secure logging system
    console.log(JSON.stringify(logEntry));
    
    // Send to security monitoring
    this.sendToSecurityMonitor(logEntry);
  }

  static logSuspiciousActivity(data) {
    const alert = {
      timestamp: new Date().toISOString(),
      alert: 'suspicious_email_activity',
      severity: 'high',
      details: data,
      requiresReview: true
    };

    console.error(JSON.stringify(alert));
    // Trigger security team notification
  }

  static sendToSecurityMonitor(logEntry) {
    // Integration with security monitoring systems
    // Example: Splunk, ELK, Datadog, etc.
  }
}
```

---

## Interview-Oriented Notes

**Security Topics to Master:**

1. **OAuth2 vs App Passwords**: When and why to use each
2. **Environment Variables**: Proper management and validation
3. **Rate Limiting**: Preventing abuse and spam
4. **Content Validation**: Input sanitization and security
5. **Email Authentication**: SPF, DKIM, DMARC implementation
6. **Audit Logging**: Security monitoring and compliance

**Common Security Interview Questions:**

- "How would you secure email credentials in production?"
- "What's the difference between OAuth2 and app passwords for email?"
- "How do you prevent your email service from being used for spam?"
- "What are SPF, DKIM, and DMARC and why are they important?"

**Security Best Practices:**

- Never commit credentials to version control
- Use OAuth2 for production authentication
- Implement rate limiting and content validation
- Set up proper email authentication (SPF/DKIM/DMARC)
- Log all email attempts for security monitoring
- Validate and sanitize all email content

[← Architecture](./03_architecture.md) | [Next → Production Best Practices](./05_production.md)
