# NPM Command

- In This File we know about NPM Commands for Global Packages and Local Packages

## Semantic Versioning

- Semantic Versioning is a `standard for versioning software` that's widely adopted in the npm ecosystem. It provides a clear and consistent way to communicate changes in a software package to users.

### Version Format

- A semantic version number consists of three parts separated by dots:

  - MAJOR: Incremented when there are incompatible API changes.
  - MINOR: Incremented when new functionality is added in a backwards-compatible manner.
  - PATCH: Incremented when bug fixes are made without affecting the API.

## Installing Packages

### Basic Installation Commands

```bash
# Install a package locally (default)
npm install <package-name>
npm i <package-name>

# Install as a dependency
npm install --save <package-name>
npm install -S <package-name>

# Install as a dev dependency
npm install --save-dev <package-name>
npm install -D <package-name>

# Install globally
npm install --global <package-name>
npm install -g <package-name>

# Install exact version
npm install <package-name>@1.2.3

# Install with version range
npm install <package-name>@"^1.2.0"  # Compatible with 1.x.x
npm install <package-name>"~1.2.0"   # Compatible with 1.2.x
npm install <package-name>">=1.2.0"  # Version 1.2.0 or higher
```

### Advanced Package Management for FAANG

#### Why Advanced Package Management Matters

- **Security**: Prevent vulnerable dependencies
- **Performance**: Optimize bundle size and load times
- **Reliability**: Ensure consistent builds across environments
- **Maintainability**: Keep dependencies up to date and clean
- **Collaboration**: Standardize team workflows

#### 1. Package Security Scanning

```bash
# Audit dependencies for vulnerabilities
npm audit

# Fix vulnerabilities automatically
npm audit fix

# Fix vulnerabilities forcefully (may break changes)
npm audit fix --force

# Check for known vulnerabilities
npm audit --audit-level moderate

# Generate security report
npm audit --json > security-report.json
```

#### 2. Dependency Analysis and Optimization

```bash
# Check for outdated packages
npm outdated

# Update packages to latest versions
npm update
npm up

# Update specific package
npm update <package-name>

# Check package sizes
npm ls --depth=0
npm list --depth=0

# Find unused dependencies
npx depcheck

# Analyze bundle size
npx webpack-bundle-analyzer dist/main.js
```

#### 3. Package Scripts for Development

```json
{
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint src/",
    "lint:fix": "eslint src/ --fix",
    "format": "prettier --write src/",
    "build": "webpack --mode production",
    "build:dev": "webpack --mode development",
    "clean": "rimraf dist/",
    "prebuild": "npm run clean && npm run lint",
    "postbuild": "npm run test",
    "security:audit": "npm audit",
    "security:fix": "npm audit fix",
    "deps:check": "npm outdated",
    "deps:update": "npm update",
    "precommit": "npm run lint && npm run test",
    "prepush": "npm run test:coverage"
  }
}
```

#### 4. Advanced NPM Configuration

```bash
# Configure npm registry
npm config set registry https://registry.npmjs.org/

# Set up private registry
npm config set registry https://npm.company.com/

# Configure authentication
npm config set //registry.npmjs.org/:_authToken $NPM_TOKEN

# Set default author
npm config set init-author-name "Your Name"
npm config set init-author-email "your.email@example.com"

# Configure cache
npm config set cache ~/.npm-cache

# Configure proxy
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080
```

#### 5. Package Publishing and Versioning

```bash
# Login to npm
npm login

# Publish a package
npm publish

# Publish with access level
npm publish --access public
npm publish --access restricted

# Version bumping
npm version patch    # 1.0.0 -> 1.0.1
npm version minor    # 1.0.1 -> 1.1.0
npm version major    # 1.1.0 -> 2.0.0
npm version prerelease  # 2.0.0 -> 2.0.1-rc.0

# Publish with tags
npm publish --tag beta
npm publish --tag latest

# Unpublish a package
npm unpublish <package-name>@<version>

# Deprecate a version
npm deprecate <package-name>@<version> "This version is deprecated"
```

#### 6. Workspaces for Monorepos

```json
{
  "name": "my-monorepo",
  "workspaces": ["packages/*", "apps/*"],
  "scripts": {
    "install:all": "npm install --workspaces",
    "build:all": "npm run build --workspaces",
    "test:all": "npm run test --workspaces",
    "clean:all": "npm run clean --workspaces"
  }
}
```

```bash
# Install dependencies for all workspaces
npm install --workspaces

# Run script in all workspaces
npm run build --workspaces

# Install package in specific workspace
npm install lodash --workspace=packages/shared

# Add dependency to specific workspace
npm install express --workspace=apps/api
```

#### 7. NPM Scripts Automation

```javascript
// scripts/deploy.js
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

class DeployManager {
  constructor() {
    this.packageJson = require("../package.json");
    this.version = this.packageJson.version;
  }

  async deploy() {
    console.log(`Starting deployment for version ${this.version}`);

    try {
      // Pre-deployment checks
      await this.runPreDeploymentChecks();

      // Build application
      await this.buildApplication();

      // Run tests
      await this.runTests();

      // Security audit
      await this.securityAudit();

      // Deploy
      await this.deployApplication();

      console.log("Deployment completed successfully");
    } catch (error) {
      console.error("Deployment failed:", error);
      process.exit(1);
    }
  }

  async runPreDeploymentChecks() {
    console.log("Running pre-deployment checks...");

    // Check if working directory is clean
    const gitStatus = execSync("git status --porcelain").toString();
    if (gitStatus) {
      throw new Error("Working directory is not clean");
    }

    // Check if on main branch
    const currentBranch = execSync("git rev-parse --abbrev-ref HEAD")
      .toString()
      .trim();
    if (currentBranch !== "main") {
      throw new Error("Not on main branch");
    }

    // Check for outdated dependencies
    const outdated = execSync("npm outdated --json").toString();
    if (outdated) {
      console.warn("Warning: Some dependencies are outdated");
    }
  }

  async buildApplication() {
    console.log("Building application...");
    execSync("npm run build", { stdio: "inherit" });
  }

  async runTests() {
    console.log("Running tests...");
    execSync("npm run test:coverage", { stdio: "inherit" });
  }

  async securityAudit() {
    console.log("Running security audit...");
    const auditResult = execSync("npm audit --json").toString();
    const audit = JSON.parse(auditResult);

    if (
      audit.vulnerabilities &&
      Object.keys(audit.vulnerabilities).length > 0
    ) {
      const highVulns = Object.values(audit.vulnerabilities).filter(
        (v) => v.severity === "high" || v.severity === "critical"
      );

      if (highVulns.length > 0) {
        throw new Error(
          `Found ${highVulns.length} high/critical vulnerabilities`
        );
      }
    }
  }

  async deployApplication() {
    console.log("Deploying application...");
    // Add your deployment logic here
    // Could be Docker, AWS, GCP, etc.
  }
}

// CLI interface
const command = process.argv[2];

if (command === "deploy") {
  const deployer = new DeployManager();
  deployer.deploy();
} else {
  console.log("Usage: node scripts/deploy.js deploy");
}
```

#### 8. Environment-Specific Package Management

```bash
# Install production dependencies only
npm ci --production

# Install with different package-lock.json
npm ci --package-lock-only

# Clean install (removes node_modules first)
npm ci

# Install with custom registry
npm install --registry https://npm.company.com/

# Install from package-lock.json only
npm ci --ignore-scripts
```

#### 9. Package Performance Optimization

```bash
# Analyze package size
npx size-limit

# Find large dependencies
npx npm-bundle

# Optimize dependencies
npx npm-check-updates -u

# Remove unused dependencies
npx depcheck

# Tree shaking analysis
npx webpack-bundle-analyzer
```

#### 10. CI/CD Integration

```yaml
# .github/workflows/npm-ci.yml
name: NPM CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [16.x, 18.x, 20.x]

    steps:
      - uses: actions/checkout@v3

      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run security audit
        run: npm audit --audit-level moderate

      - name: Check for outdated dependencies
        run: npm outdated || true

      - name: Run linting
        run: npm run lint

      - name: Run tests
        run: npm run test:coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info

  build:
    needs: test
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18.x"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build application
        run: npm run build

      - name: Analyze bundle size
        run: npm run analyze

      - name: Publish to NPM (if on main)
        if: github.ref == 'refs/heads/main'
        run: |
          npm config set //registry.npmjs.org/:_authToken ${{ secrets.NPM_TOKEN }}
          npm publish --access public
```

### FAANG Interview Questions on NPM

#### 1. "How do you handle security vulnerabilities in npm packages?"

```bash
# Answer: Use npm audit, npm audit fix, regular security scanning,
# dependency updates, and automated security checks in CI/CD.
```

#### 2. "What's the difference between npm install and npm ci?"

```bash
# Answer: npm install installs from package.json and updates package-lock.json,
# npm ci installs from package-lock.json for reproducible builds and is faster.
```

#### 3. "How do you optimize package size in a Node.js application?"

```bash
# Answer: Use tree shaking, remove unused dependencies, analyze bundle size,
# use production builds, and implement code splitting.
```

### NPM Best Practices for Production

#### 1. Security Checklist

- [ ] Regular security audits with npm audit
- [ ] Automated vulnerability scanning in CI/CD
- [ ] Use npm ci for reproducible builds
- [ ] Lock down dependency versions
- [ ] Review new dependencies before adding
- [ ] Use private registry for sensitive packages

#### 2. Performance Checklist

- [ ] Remove unused dependencies
- [ ] Optimize bundle size
- [ ] Use production builds
- [ ] Implement proper caching
- [ ] Monitor package performance
- [ ] Use CDN for static assets

#### 3. Reliability Checklist

- [ ] Use package-lock.json in version control
- [ ] Pin dependency versions
- [ ] Implement proper testing
- [ ] Use semantic versioning
- [ ] Document package usage
- [ ] Monitor package health

#### 4. Development Workflow Checklist

- [ ] Standardize npm scripts
- [ ] Use workspaces for monorepos
- [ ] Implement pre-commit hooks
- [ ] Use automated dependency updates
- [ ] Document package dependencies
- [ ] Use consistent package structure
