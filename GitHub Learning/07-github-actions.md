# GitHub Actions: Complete CI/CD Guide

## 🎯 What are GitHub Actions?

GitHub Actions is a CI/CD platform that allows you to automate your software development workflows directly in your GitHub repository. You can build, test, and deploy your code automatically.

## 🔄 Workflow Basics

### Workflow Structure

```yaml
# .github/workflows/main.yml
name: CI/CD Pipeline
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: npm ci
      - run: npm test
```

### Key Components

- **Workflows**: Automated processes defined in YAML files
- **Events**: Triggers that start workflows (push, PR, schedule)
- **Jobs**: Series of steps that execute on runners
- **Steps**: Individual tasks within a job
- **Actions**: Reusable commands combined into steps
- **Runners**: Machines that execute workflows

## 🚀 Common Workflow Patterns

### 1. Continuous Integration

```yaml
name: CI
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [16, 18, 20]

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Run linting
        run: npm run lint

      - name: Check code coverage
        run: npm run test:coverage

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
```

### 2. Continuous Deployment

```yaml
name: Deploy to Production
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build application
        run: npm run build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: "--prod"
```

### 3. Docker Build and Push

```yaml
name: Docker Build and Push
on:
  push:
    branches: [main]

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2

      - name: Login to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build and push
        uses: docker/build-push-action@v4
        with:
          context: .
          push: true
          tags: username/repository:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max
```

## 🔧 Advanced Features

### Environment Variables and Secrets

```yaml
name: Secure Workflow
on: [push]

jobs:
  secure-job:
    runs-on: ubuntu-latest
    env:
      NODE_ENV: production
      API_URL: ${{ secrets.API_URL }}

    steps:
      - name: Use environment variables
        run: |
          echo "Node environment: $NODE_ENV"
          echo "API URL: $API_URL"

      - name: Use secrets
        run: |
          curl -H "Authorization: Bearer ${{ secrets.API_TOKEN }}" \
               "$API_URL/data"
```

### Conditional Execution

```yaml
name: Conditional Workflow
on: [push, pull_request]

jobs:
  conditional:
    runs-on: ubuntu-latest
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'

    steps:
      - name: Run only on main branch push
        run: echo "This runs only on main branch push"

      - name: Run based on file changes
        if: contains(github.event.head_commit.modified, 'package.json')
        run: echo "package.json was modified"
```

### Matrix Builds

```yaml
name: Matrix Strategy
on: [push]

jobs:
  matrix-test:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        node-version: [16, 18, 20]
        include:
          - os: ubuntu-latest
            node-version: 20
            is-main: true
        exclude:
          - os: windows-latest
            node-version: 16

    steps:
      - name: Test on ${{ matrix.os }} with Node ${{ matrix.node-version }}
        run: |
          echo "Testing on ${{ matrix.os }}"
          echo "Node version: ${{ matrix.node-version }}"
          echo "Is main: ${{ matrix.is-main }}"
```

## 📋 Workflow Triggers

### Event Types

```yaml
# Push to branches
on:
  push:
    branches: [main, develop]
    tags: ['v*']

# Pull requests
on:
  pull_request:
    branches: [main]
    types: [opened, synchronize, reopened]

# Scheduled runs
on:
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM

# Manual dispatch
on:
  workflow_dispatch:
    inputs:
      environment:
        description: 'Environment to deploy'
        required: true
        default: 'staging'

# Multiple events
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:
```

## 🛠️ Popular Actions

### Setup Actions

```yaml
- uses: actions/checkout@v3 # Checkout repository
- uses: actions/setup-node@v3 # Setup Node.js
- uses: actions/setup-python@v4 # Setup Python
- uses: docker/setup-buildx-action@v2 # Setup Docker
```

### Testing Actions

```yaml
- uses: actions/upload-artifact@v3 # Upload test results
- uses: codecov/codecov-action@v3 # Upload coverage
- uses: dorny/test-reporter@v1 # Publish test results
```

### Deployment Actions

```yaml
- uses: peaceiris/actions-gh-pages@v3 # Deploy to GitHub Pages
- uses: amondnet/vercel-action@v20 # Deploy to Vercel
- uses: aws-actions/configure-aws-credentials@v2 # AWS deployment
```

## 🎯 Best Practices

### Workflow Organization

```yaml
# Use descriptive names
name: Run Tests and Deploy

# Use proper triggers
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

# Use environment-specific jobs
jobs:
  test:
    runs-on: ubuntu-latest
    # Test configuration

  build:
    needs: test
    runs-on: ubuntu-latest
    # Build configuration

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    # Deploy configuration
```

### Security Best Practices

```yaml
# Don't expose secrets in logs
- name: Use secret safely
  run: |
    echo "::add-mask::${{ secrets.SECRET_TOKEN }}"
    curl -H "Authorization: Bearer ${{ secrets.SECRET_TOKEN }}" api.example.com

# Use pinned action versions
- uses: actions/checkout@v3  # Pinned version
# NOT: uses: actions/checkout  # Latest version (risky)

# Limit permissions
permissions:
  contents: read
  pull-requests: read
```

### Performance Optimization

```yaml
# Use caching
- name: Cache npm dependencies
  uses: actions/cache@v3
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-node-

# Use parallel jobs
jobs:
  test:
    strategy:
      matrix:
        component: [frontend, backend, api]
    runs-on: ubuntu-latest
    steps:
      - name: Test ${{ matrix.component }}
        run: npm run test:${{ matrix.component }}
```

## 🚀 Real-World Examples

### Node.js Application Pipeline

```yaml
name: Node.js CI/CD
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run linting
        run: npm run lint

      - name: Run tests
        run: npm run test:coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v3

  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Run security audit
        run: npm audit --audit-level high

      - name: Run Snyk security scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}

  deploy:
    needs: [test, security]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build application
        run: npm run build

      - name: Deploy to production
        run: |
          echo "Deploying to production..."
          # Your deployment script here
```

## 🎯 FAANG Interview Focus

### Key Concepts to Know

- **Workflow triggers** and events
- **Job dependencies** and matrix strategies
- **Secrets management** and security
- **Caching strategies** for performance
- **Common use cases** (CI, CD, testing, deployment)

### Sample Interview Questions

1. "How would you set up a CI/CD pipeline for a Node.js application?"
2. "What's the difference between `on.push` and `on.pull_request`?"
3. "How do you handle secrets in GitHub Actions?"
4. "Describe a complex workflow you've created"

### Sample Answers

- **CI/CD Pipeline**: Test → Build → Security Scan → Deploy
- **Triggers**: Push triggers on commits, PR triggers on reviews
- **Secrets**: Use repository secrets, mask in logs, limit permissions
- **Complex Workflow**: Multi-stage deployment with matrix builds

## 📚 External Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Awesome GitHub Actions](https://github.com/sdras/awesome-actions)
- [GitHub Actions Marketplace](https://github.com/marketplace?type=actions)
- [Actions Learning Lab](https://github.com/skills/learn-github-actions)
