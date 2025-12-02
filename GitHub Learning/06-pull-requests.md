# Pull Requests: Complete Guide for FAANG Preparation

## 🎯 What is a Pull Request?

A Pull Request (PR) is a mechanism to propose changes and request someone to review and integrate them into another branch. It's the cornerstone of collaborative development.

## 🔄 Pull Request Workflow

### Basic PR Process

```bash
# 1. Create feature branch
git checkout -b feature/user-authentication

# 2. Make changes and commit
git add .
git commit -m "feat: Add user authentication"

# 3. Push to remote
git push origin feature/user-authentication

# 4. Create PR on GitHub
# - Go to repository on GitHub
# - Click "New pull request"
# - Select base branch (main) and compare branch (feature/user-authentication)
# - Fill PR template
# - Click "Create pull request"
```

### Complete PR Lifecycle

```
Development → Testing → PR Creation → Code Review → Feedback → Changes → Approval → Merge → Deployment
```

## 📝 Writing Effective PRs

### PR Title Best Practices

```bash
# Good PR Titles
feat: Add user authentication system
fix: Resolve memory leak in data processing
docs: Update API documentation
refactor: Optimize database queries
chore: Update dependencies

# Bad PR Titles
Fixed stuff
Changes
Update
Bug fix
```

### PR Description Template

```markdown
## 🎯 Purpose

Brief description of what this PR accomplishes.

## 🔄 Changes Made

- [ ] Added user authentication module
- [ ] Implemented JWT token validation
- [ ] Created login/logout endpoints
- [ ] Added password encryption

## 🧪 Testing

- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Performance tests conducted

## 📋 Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests added/updated

## 🔗 Related Issues

Closes #123
Related to #456

## 📸 Screenshots (if applicable)

[Attach screenshots for UI changes]

## ⚠️ Breaking Changes

[Note any breaking changes and migration steps]
```

## 🔍 Code Review Process

### Reviewer Responsibilities

```bash
# 1. Review the code changes
git checkout main
git pull origin main
git checkout feature/user-authentication
git diff main...feature/user-authentication

# 2. Test locally
npm install
npm test
npm run dev

# 3. Leave constructive feedback
# - Code quality issues
# - Performance concerns
# - Security vulnerabilities
# - Missing edge cases
# - Documentation gaps
```

### Types of Review Comments

```markdown
# Required Changes (Must Fix)

🚨 **Critical**: Security vulnerability in authentication
🔧 **Must Fix**: Missing error handling for null values

# Suggestions (Nice to Have)

💡 **Suggestion**: Consider using async/await for better readability
🎨 **Style**: Follow naming convention for variables

# Questions (Clarification Needed)

❓ **Question**: Why did you choose this approach over alternative X?
🤔 **Clarification**: Can you explain this complex logic?

# Positive Feedback

✅ **Great**: Excellent error handling implementation!
👏 **Nice Work**: Clean, well-documented code
```

## 🛠️ Advanced PR Features

### Draft Pull Requests

```bash
# Create draft PR for early feedback
git push origin feature/user-authentication
# On GitHub: Click "Create pull request" → "Create draft pull request"

# Convert to ready for review when complete
# On GitHub: "Ready for review" → "Create pull request"
```

### PR Templates

Create `.github/pull_request_template.md`:

```markdown
## 🎯 Description

<!-- Describe your changes in detail -->

## 🔄 Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## 🧪 Testing

<!-- Describe how you tested your changes -->

## 📋 Checklist

- [ ] My code follows the style guidelines
- [ ] I have performed self-review
- [ ] I have commented my code
- [ ] I have made corresponding changes to the documentation
```

### Automated Checks

Create `.github/workflows/pr-checks.yml`:

```yaml
name: PR Checks
on: [pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: "16"
      - run: npm ci
      - run: npm test
      - run: npm run lint
      - run: npm run build
```

## 🔄 PR Management Strategies

### Squash and Merge

```bash
# Clean up commit history
# All commits in PR become one commit
# Good for: Main branch cleanliness
git checkout main
git merge --squash feature/user-authentication
git commit -m "feat: Add user authentication system"
```

### Merge Commit

```bash
# Preserve PR's commit history
# Good for: Detailed change tracking
git checkout main
git merge --no-ff feature/user-authentication
```

### Rebase and Merge

```bash
# Linear history, updated commits
# Good for: Clean project history
git checkout feature/user-authentication
git rebase main
git checkout main
git merge feature/user-authentication  # Fast-forward
```

## 🎯 Best Practices

### Before Creating PR

```bash
# 1. Ensure branch is up to date
git checkout main
git pull origin main
git checkout feature/user-authentication
git rebase main

# 2. Clean commit history
git rebase -i HEAD~3  # squash, reword, reorder

# 3. Run all tests
npm test
npm run lint
npm run build

# 4. Check coverage
npm run test:coverage

# 5. Documentation updated
# - README.md
# - API docs
# - Code comments
```

### During Review

```bash
# 1. Respond to feedback promptly
# 2. Be open to suggestions
# 3. Explain complex decisions
# 4. Update PR based on feedback
# 5. Thank reviewers for their time
```

### After Merge

```bash
# 1. Delete feature branch
git branch -d feature/user-authentication
git push origin --delete feature/user-authentication

# 2. Update local main
git checkout main
git pull origin main

# 3. Notify team
# - Update documentation
# - Announce in team chat
# - Update project board
```

## 🚀 Advanced PR Techniques

### PR Dependencies

```markdown
# In PR description:

Depends on: #123 (must be merged first)
Blocks: #456 (this PR blocks other work)
```

### PR with Multiple Commits

```bash
# Review individual commits
git log main..feature/user-authentication --oneline

# Checkout specific commit for testing
git checkout <commit-hash>

# Cherry-pick specific changes
git cherry-pick <commit-hash>
```

### Emergency PR (Hotfix)

```bash
# 1. Create hotfix branch from main
git checkout -b hotfix/critical-bug main

# 2. Make minimal fix
git add .
git commit -m "fix: Critical security vulnerability"

# 3. Push and create PR
git push origin hotfix/critical-bug
# Create PR with "urgent" label

# 4. Fast-track review and merge
# 5. Tag and release
git tag -a v1.2.1 -m "Hotfix for security vulnerability"
git push origin v1.2.1
```

## 📊 PR Metrics and Analytics

### Key Metrics to Track

```bash
# PR Size (lines of code)
git diff --stat main...feature/user-authentication

# PR Age (time open)
# Check on GitHub: "X days old"

# Review Time
# Track how long reviews take

# Merge Frequency
# Number of PRs merged per week

# Bug Rate
# Bugs introduced vs bugs fixed
```

### Quality Gates

```yaml
# In PR workflow
- name: Check PR size
  run: |
    CHANGES=$(git diff --stat HEAD~1 | tail -1 | awk '{print $1}')
    if [ $CHANGES -gt 500 ]; then
      echo "PR too large: $CHANGES lines"
      exit 1
    fi

- name: Check test coverage
  run: |
    COVERAGE=$(npm run test:coverage | grep "All files" | awk '{print $NF}' | sed 's/%//')
    if (( $(echo "$COVERAGE < 80" | bc -l) )); then
      echo "Coverage too low: $COVERAGE%"
      exit 1
    fi
```

## 🎯 FAANG Interview Focus

### Common PR Questions

1. "Describe your pull request workflow"
2. "How do you handle PR conflicts?"
3. "What makes a good PR description?"
4. "How do you review code effectively?"

### Key Skills to Demonstrate

- **Systematic approach** to PR creation
- **Constructive feedback** in code reviews
- **Quality focus** with testing and documentation
- **Collaboration skills** in handling feedback
- **Technical knowledge** of merge strategies

### Sample Answer Framework

```
1. Preparation (branch hygiene, testing)
2. Creation (clear title, detailed description)
3. Review (respond to feedback, iterate)
4. Merge (appropriate strategy, cleanup)
5. Follow-up (documentation, communication)
```

## 📚 External Resources

- [GitHub Pull Request Documentation](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests)
- [Google's Code Review Guidelines](https://google.github.io/eng-practices/review/)
- [Facebook's Phabricator Guide](https://www.phabricator.com/)
- [Atlassian Code Review Best Practices](https://www.atlassian.com/agile/code-review/best-practices)
