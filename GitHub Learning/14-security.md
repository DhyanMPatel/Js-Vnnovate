# GitHub Security: Complete Guide

## 🎯 Why Security Matters

GitHub security protects your code, intellectual property, and development infrastructure. Understanding security practices is essential for FAANG interviews and professional development.

## 🔐 SSH Key Management

### SSH Key Generation

```bash
# Generate new SSH key (Ed25519 recommended)
ssh-keygen -t ed25519 -C "your.email@example.com"

# Or RSA for legacy systems
ssh-keygen -t rsa -b 4096 -C "your.email@example.com"

# Add passphrase for extra security
# Enter passphrase when prompted
```

### SSH Key Configuration

```bash
# Start SSH agent
eval "$(ssh-agent -s)"

# Add SSH key to agent
ssh-add ~/.ssh/id_ed25519

# Test SSH connection
ssh -T git@github.com

# Output: Hi username! You've successfully authenticated...
```

### Multiple SSH Keys

```bash
# Create SSH config file
touch ~/.ssh/config

# Add multiple key configurations
# ~/.ssh/config
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/personal_key
  IdentitiesOnly yes

Host github-work
  HostName github.com
  User git
  IdentityFile ~/.ssh/work_key
  IdentitiesOnly yes
```

## 🔑 Personal Access Tokens (PATs)

### Creating PATs

```bash
# Via GitHub Web:
# 1. Settings > Developer settings > Personal access tokens
# 2. Generate new token
# 3. Select scopes (permissions)
# 4. Generate token
# 5. Copy token immediately (won't show again)

# Token scopes for different purposes:
# - repo: Full repository access
# - repo:status: Access commit status
# - repo_deployment: Access deployment status
# - public_repo: Access public repos only
# - gist: Manage gists
# - read:org: Read org membership
```

### Using PATs with Git

```bash
# Configure credential helper
git config --global credential.helper store

# Use token as password
# Username: your-github-username
# Password: your-personal-access-token

# Or embed in URL (not recommended for security)
git clone https://username:token@github.com/user/repo.git
```

### Token Management Best Practices

```bash
# Store tokens securely
# Use environment variables
export GITHUB_TOKEN="your-token-here"

# Use credential manager
git config --global credential.helper osxkeychain  # macOS
git config --global credential.helper manager     # Windows
git config --global credential.helper libsecret   # Linux

# Rotate tokens regularly
# Set expiration dates
# Use different tokens for different purposes
```

## 📝 Commit Signing with GPG

### GPG Key Setup

```bash
# Install GPG
# macOS: brew install gnupg
# Ubuntu: sudo apt install gnupg

# Generate GPG key
gpg --full-generate-key

# Choose:
# - RSA and RSA (default)
# - 4096 bits
# - Key expiration (no expiration or 2 years)
# - Real name and email
# - Strong passphrase

# List GPG keys
gpg --list-secret-keys --keyid-format LONG

# Export public key
gpg --armor --export your-key-id
```

### Configure Git for Signing

```bash
# Configure Git to use GPG key
git config --global user.signingkey your-key-id
git config --global commit.gpgsign true
git config --global tag.gpgsign true

# Configure GPG program
git config --global gpg.program gpg

# Test signing
git commit -m "Test signed commit"
```

### GitHub GPG Integration

```bash
# Copy GPG public key
gpg --armor --export your-key-id

# Add to GitHub:
# 1. Settings > SSH and GPG keys
# 2. New GPG key
# 3. Paste public key
# 4. Add GPG key

# Verify signed commits on GitHub
# Look for "Verified" badge next to commits
```

## 🛡️ Repository Security Settings

### Branch Protection Rules

```yaml
# Branch protection via GitHub UI or API
# Settings > Branches > Add rule

# Required settings:
- Require pull request reviews before merging
- Require status checks to pass before merging
- Require branches to be up to date before merging
- Require conversation resolution before merging

# Optional settings:
- Require signed commits
- Limit who can push to matching branches
- Allow force pushes
- Allow deletions
```

### Code Security Features

```bash
# Enable security features:
# 1. Settings > Code security and analysis

# Features to enable:
- Dependabot alerts (dependency vulnerability scanning)
- Dependabot security updates (automatic PRs)
- Code scanning (GitHub Advanced Security)
- Secret scanning (detect leaked secrets)
- CodeQL (advanced code analysis)
```

### Dependabot Configuration

```yaml
# .github/dependabot.yml
version: 2
updates:
  # Enable version updates for npm
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
    open-pull-requests-limit: 5
    reviewers:
      - "security-team"
    assignees:
      - "maintainer"

  # Enable version updates for Docker
  - package-ecosystem: "docker"
    directory: "/"
    schedule:
      interval: "weekly"
```

## 🔒 Security Best Practices

### Repository Access Control

```bash
# Team and permission management
# Settings > Collaborators & teams

# Permission levels:
- Read: Can view, clone, and comment
- Triage: Can manage issues and PRs
- Write: Can push to repository
- Maintain: Can manage repository settings
- Admin: Full control including deletion

# Best practices:
- Grant minimum necessary permissions
- Use teams for group access
- Regularly review access permissions
- Enable two-factor authentication requirement
```

### Two-Factor Authentication (2FA)

```bash
# Enable 2FA for your account:
# Settings > Security > Two-factor authentication

# Methods:
- SMS (less secure)
- Authenticator app (recommended)
- Security keys (most secure)

# Require 2FA for organization:
# Organization settings > Security > Authentication
```

### Secret Management

```bash
# GitHub Secrets for Actions
# Repository > Settings > Secrets and variables > Actions

# Add repository secrets:
- API keys
- Database credentials
- Service account tokens
- Encryption keys

# Use in workflows:
env:
  DATABASE_URL: ${{ secrets.DATABASE_URL }}
  API_KEY: ${{ secrets.API_KEY }}

# Environment-specific secrets:
# - Environment secrets override repository secrets
# - Use staging/production environments
```

## 🔍 Security Scanning and Monitoring

### Code Scanning Setup

```yaml
# .github/workflows/code-scanning.yml
name: "Code Scanning"
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  schedule:
    - cron: "0 0 * * 1" # Weekly

jobs:
  CodeQL-Build:
    runs-on: ubuntu-latest
    permissions:
      actions: read
      contents: read
      security-events: write

    strategy:
      fail-fast: false
      matrix:
        language: ["javascript", "python"]

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Initialize CodeQL
        uses: github/codeql-action/init@v2
        with:
          languages: ${{ matrix.language }}

      - name: Autobuild
        uses: github/codeql-action/autobuild@v2

      - name: Perform CodeQL Analysis
        uses: github/codeql-action/analyze@v2
```

### Secret Scanning

```bash
# Secret scanning automatically detects:
- API keys
- Database credentials
- Authentication tokens
- Private keys
- Certificates

# Custom patterns via API:
# Create custom secret scanning patterns
# Monitor for specific credential formats
```

## 🚨 Incident Response

### Security Incident Workflow

```markdown
## 1. Detection

- Monitor security alerts
- Review dependabot alerts
- Check code scanning results
- Monitor unusual activity

## 2. Assessment

- Determine impact scope
- Identify affected systems
- Assess data exposure risk
- Document findings

## 3. Response

- Rotate compromised credentials
- Patch vulnerabilities
- Revoke access if needed
- Communicate with stakeholders

## 4. Recovery

- Verify fixes
- Update security practices
- Document lessons learned
- Improve monitoring
```

### Emergency Procedures

```bash
# Compromised credentials:
1. Rotate GitHub personal access tokens
2. Revoke SSH keys
3. Change passwords
4. Review repository access logs

# Repository compromise:
1. Change repository visibility if needed
2. Review recent commits
3. Revert malicious changes
4. Enable additional security measures

# Dependency vulnerabilities:
1. Update affected packages
2. Test thoroughly
3. Deploy fixes
4. Monitor for issues
```

## 🎯 FAANG Interview Focus

### Key Security Concepts

- **SSH key management** and best practices
- **Personal access tokens** vs SSH keys
- **Commit signing** with GPG
- **Repository security** settings
- **Two-factor authentication** importance
- **Secret management** in CI/CD

### Sample Interview Questions

1. "How do you secure your GitHub account?"
2. "What's the difference between SSH keys and PATs?"
3. "Why should you sign commits?"
4. "How do you handle secrets in GitHub Actions?"

### Sample Answers

- **Account Security**: 2FA, SSH keys, PAT rotation, strong passwords
- **SSH vs PAT**: SSH for local access, PAT for API/automation
- **Commit Signing**: Verify author identity, prevent tampering
- **Secrets**: Use GitHub Secrets, environment variables, no hardcoded secrets

## 📚 External Resources

- [GitHub Security Documentation](https://docs.github.com/en/security)
- [SSH Key Management Guide](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
- [GPG Commit Signing](https://docs.github.com/en/authentication/managing-commit-signature-verification)
- [Dependabot Documentation](https://docs.github.com/en/code-security/dependabot)
