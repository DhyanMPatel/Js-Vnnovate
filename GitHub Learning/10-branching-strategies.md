# Branching Strategies: Complete Guide

## 🎯 Why Branching Strategies Matter

Branching strategies define how teams organize development work, manage releases, and collaborate effectively. The right strategy prevents conflicts, ensures code quality, and enables smooth deployment processes.

## 🌳 Git Flow

### Overview

Git Flow is a comprehensive branching model designed for projects with scheduled releases.

### Main Branches

```bash
main     # Production-ready code
develop  # Integration branch for features
```

### Supporting Branches

```bash
feature/*     # New features
release/*     # Release preparation
hotfix/*      # Emergency fixes to production
bugfix/*      # Bug fixes for develop branch
```

### Git Flow Workflow

```bash
# 1. Start new feature
git checkout develop
git pull origin develop
git checkout -b feature/user-authentication

# 2. Develop feature
# Make commits...
git add .
git commit -m "feat: Add user authentication"

# 3. Finish feature
git checkout develop
git merge feature/user-authentication
git branch -d feature/user-authentication
git push origin develop

# 4. Create release
git checkout -b release/v1.2.0 develop
# Update version numbers, docs...
git commit -m "chore: Prepare for v1.2.0 release"

# 5. Finish release
git checkout main
git merge --no-ff release/v1.2.0
git tag -a v1.2.0 -m "Release version 1.2.0"
git checkout develop
git merge --no-ff release/v1.2.0
git branch -d release/v1.2.0

# 6. Hotfix (if needed)
git checkout -b hotfix/critical-bug main
# Fix bug...
git checkout main
git merge --no-ff hotfix/critical-bug
git tag -a v1.2.1 -m "Hotfix v1.2.1"
git checkout develop
git merge --no-ff hotfix/critical-bug
git branch -d hotfix/critical-bug
```

### Pros and Cons

```markdown
## ✅ Pros

- Clear separation of code
- Scheduled releases
- Parallel development
- Easy hotfixes

## ❌ Cons

- Complex for small teams
- Many branches to manage
- Overhead for simple projects
- Steeper learning curve
```

## 🚀 GitHub Flow

### Overview

GitHub Flow is a simpler model focused on continuous deployment with a single main branch.

### Branch Structure

```bash
main          # Always deployable
feature/*     # Feature branches
```

### GitHub Flow Workflow

```bash
# 1. Create feature branch
git checkout main
git pull origin main
git checkout -b feature/payment-system

# 2. Develop and test
# Make changes...
git add .
git commit -m "feat: Add payment processing"

# 3. Create pull request
git push origin feature/payment-system
# Create PR on GitHub

# 4. Code review and testing
# Automated tests run
# Team reviews code
# Deploy to staging for testing

# 5. Merge to main
git checkout main
git merge --no-ff feature/payment-system
git push origin main

# 6. Deploy immediately
# Automated deployment to production
```

### Pros and Cons

```markdown
## ✅ Pros

- Simple and easy to understand
- Continuous deployment ready
- Fewer branches to manage
- Fast feedback loop

## ❌ Cons

- Less structured for releases
- No dedicated integration branch
- Requires robust automation
- Main branch must always be stable
```

## 🔄 GitLab Flow

### Overview

GitLab Flow combines benefits of Git Flow and GitHub Flow with environment branches.

### Branch Structure

```bash
main          # Production code
pre-production # Staging environment
production    # Production environment
feature/*     # Feature branches
```

### GitLab Flow Workflow

```bash
# 1. Feature development (same as GitHub Flow)
git checkout main
git checkout -b feature/new-dashboard
# Develop...
git push origin feature/new-dashboard
# Create merge request

# 2. Merge to main
git checkout main
git merge feature/new-dashboard
git push origin main

# 3. Deploy through environments
git checkout pre-production
git merge main
git push origin pre-production
# Deploy to staging

# 4. Production deployment
git checkout production
git merge pre-production
git push origin production
# Deploy to production
```

## 🎯 Choosing the Right Strategy

### Decision Matrix

| Team Size        | Release Cadence | Complexity | Recommended Strategy |
| ---------------- | --------------- | ---------- | -------------------- |
| 1-5 developers   | Continuous      | Low        | GitHub Flow          |
| 5-20 developers  | Scheduled       | Medium     | GitLab Flow          |
| 10+ developers   | Scheduled       | High       | Git Flow             |
| Large enterprise | Multiple        | High       | Custom Git Flow      |

### Strategy Selection Guide

```markdown
## Choose GitHub Flow if:

- Small team (1-5 developers)
- Continuous deployment
- Simple project structure
- Fast iteration needed

## Choose GitLab Flow if:

- Medium team (5-20 developers)
- Multiple environments
- Need for staging
- Regular releases

## Choose Git Flow if:

- Large team (10+ developers)
- Scheduled releases
- Complex project
- Need for hotfixes
```

## 🛠️ Advanced Branching Techniques

### Feature Flags

```bash
# Feature flag implementation
const featureFlags = {
  newDashboard: process.env.ENABLE_NEW_DASHBOARD === 'true',
  paymentSystem: process.env.ENABLE_PAYMENT === 'true'
};

// In code
if (featureFlags.newDashboard) {
  renderNewDashboard();
} else {
  renderOldDashboard();
}
```

### Branch by Abstraction

```bash
# Create abstraction layer
git checkout -b refactor/database-abstraction

# Old implementation
class OldDatabase {
  connect() { /* old code */ }
}

# New abstraction
interface DatabaseInterface {
  connect(): void;
}

class NewDatabase implements DatabaseInterface {
  connect() { /* new code */ }
}

# Switch implementations gradually
const db = featureFlags.newDatabase ? new NewDatabase() : new OldDatabase();
```

### Release Branch Management

```bash
# Create release branch
git checkout -b release/v2.0.0 main

# Update version files
echo "2.0.0" > VERSION
npm version 2.0.0 --no-git-tag-version

# Update changelog
git log --oneline v1.0.0..HEAD > CHANGELOG.md

git add VERSION package.json CHANGELOG.md
git commit -m "chore: Prepare for v2.0.0 release"

# Create release
git tag -a v2.0.0 -m "Release v2.0.0"
git push origin release/v2.0.0
git push origin v2.0.0
```

## 📊 Branching Best Practices

### Naming Conventions

```bash
# Feature branches
feature/user-authentication
feature/payment-integration
feature/dashboard-redesign

# Bug fix branches
bugfix/login-error
bugfix/memory-leak
bugfix/api-timeout

# Hotfix branches
hotfix/security-vulnerability
hotfix/critical-bug-fix
hotfix/emergency-patch

# Release branches
release/v1.2.0
release/v2.0.0-beta
release/v3.0.0-rc1

# Environment branches
staging
production
development
```

### Branch Hygiene

```bash
# Before creating branch
git checkout main
git pull origin main
git status  # Clean working directory

# Branch creation
git checkout -b feature/new-feature

# During development
git add .
git commit -m "feat: Implement feature logic"
git pull origin main  # Sync with main regularly

# Before merging
git checkout main
git pull origin main
git checkout feature/new-feature
git rebase main  # Update with latest changes

# After merging
git branch -d feature/new-feature
git push origin --delete feature/new-feature
```

### Commit Message Standards

```bash
# Format: type(scope): description
feat(auth): Add user authentication
fix(api): Resolve timeout issue
docs(readme): Update installation guide
style(css): Fix button alignment
refactor(utils): Simplify validation logic
test(auth): Add unit tests for login
chore(deps): Update dependencies
```

## 🔧 Automation and Tools

### Branch Protection Rules

```yaml
# .github/branch-protection.yml
protection_rules:
  main:
    required_status_checks:
      strict: true
      contexts:
        - CI/CD Pipeline
        - Code Coverage
        - Security Scan
    enforce_admins: false
    required_pull_request_reviews:
      required_approving_review_count: 2
      dismiss_stale_reviews: true
      require_code_owner_reviews: true
    restrictions:
      users: []
      teams: ["core-team"]
```

### Automated Branch Cleanup

```yaml
name: Branch Cleanup
on:
  pull_request:
    types: [closed]

jobs:
  cleanup:
    runs-on: ubuntu-latest
    steps:
      - name: Delete merged branch
        if: github.event.pull_request.merged == true
        uses: actions/github-script@v6
        with:
          script: |
            github.rest.git.deleteRef({
              owner: context.repo.owner,
              repo: context.repo.repo,
              ref: `heads/${context.payload.pull_request.head.ref}`
            });
```

### Release Automation

```yaml
name: Release Pipeline
on:
  push:
    tags: ["v*"]

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build and test
        run: |
          npm ci
          npm test
          npm run build

      - name: Create release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
          draft: false
          prerelease: false
```

## 🎯 FAANG Interview Focus

### Key Concepts

- **Branch selection criteria** for different scenarios
- **Merge strategies** and their implications
- **Release management** and deployment
- **Team coordination** and conflict resolution
- **Automation** for branch management

### Sample Questions

1. "When would you choose Git Flow over GitHub Flow?"
2. "How do you handle hotfixes in continuous deployment?"
3. "Describe your branch naming conventions"
4. "How do you prevent merge conflicts in large teams?"

### Sample Answers

- **Git Flow vs GitHub Flow**: Git Flow for scheduled releases, GitHub Flow for continuous deployment
- **Hotfixes**: Create hotfix branch from production, merge to main and develop
- **Naming**: Use type/scope format (feature/auth, bugfix/api)
- **Conflict Prevention**: Regular pulls, small commits, clear ownership

## 📚 External Resources

- [Git Flow Documentation](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
- [GitHub Flow Guide](https://guides.github.com/introduction/flow/)
- [GitLab Flow Explanation](https://docs.gitlab.com/ee/topics/gitlab_flow.html)
- [Branching Strategies Comparison](https://nvie.com/posts/a-successful-git-branching-model/)
