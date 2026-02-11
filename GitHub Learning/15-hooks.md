# Git Hooks: Complete Automation Guide

## 🎯 What are Git Hooks?

Git hooks are scripts that Git executes automatically before or after events such as commit, push, or receive. They're stored in the `.git/hooks` directory and enable automation of development workflows.

## 📁 Hook Types and Locations

### Client-Side Hooks

```bash
# Location: .git/hooks/
# Client hooks run on local operations

pre-commit        # Before commit message editor
prepare-commit-msg # Before commit message editor starts
commit-msg        # After commit message is created
post-commit       # After commit is created
pre-push          # Before git push
```

### Server-Side Hooks

```bash
# Location: /hooks/
# Server hooks run on remote operations

pre-receive       # Before receiving push
update            # Before updating refs
post-receive      # After receiving push
post-update       # After all refs updated
```

## 🛠️ Common Hook Implementations

### Pre-commit Hook

```bash
#!/bin/bash
# .git/hooks/pre-commit

echo "Running pre-commit checks..."

# 1. Run linting
npm run lint
if [ $? -ne 0 ]; then
    echo "❌ Linting failed. Please fix linting errors."
    exit 1
fi

# 2. Run tests
npm test
if [ $? -ne 0 ]; then
    echo "❌ Tests failed. Please fix failing tests."
    exit 1
fi

# 3. Check for large files
MAX_FILE_SIZE=10485760  # 10MB
large_files=$(find . -type f -not -path "./.git/*" -size +$MAX_FILE_SIZE)

if [ ! -z "$large_files" ]; then
    echo "❌ Large files detected:"
    echo "$large_files"
    echo "Please use Git LFS for large files."
    exit 1
fi

# 4. Check for secrets
if git diff --cached --name-only | xargs grep -l "password\|secret\|token\|api_key"; then
    echo "❌ Potential secrets detected in staged files."
    exit 1
fi

echo "✅ All pre-commit checks passed!"
exit 0
```

### Commit Message Hook

```bash
#!/bin/bash
# .git/hooks/commit-msg

commit_regex='^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .{1,50}'
msg_file=$1

if ! grep -qE "$commit_regex" "$msg_file"; then
    echo "❌ Invalid commit message format."
    echo "Expected format: type(scope): description"
    echo "Types: feat, fix, docs, style, refactor, test, chore"
    echo "Example: feat(auth): Add user login functionality"
    exit 1
fi

# Check message length
if [ $(wc -c < "$msg_file") -gt 72 ]; then
    echo "❌ Commit message too long (max 72 characters)."
    exit 1
fi

exit 0
```

### Pre-push Hook

```bash
#!/bin/bash
# .git/hooks/pre-push

echo "Running pre-push checks..."

# 1. Check if main branch is being pushed
if [[ $(git rev-parse --abbrev-ref HEAD) == "main" ]]; then
    echo "⚠️  Pushing to main branch. Are you sure? (y/N)"
    read -r response
    if [[ ! $response =~ ^[Yy]$ ]]; then
        echo "Push cancelled."
        exit 1
    fi
fi

# 2. Run full test suite
npm run test:full
if [ $? -ne 0 ]; then
    echo "❌ Full test suite failed."
    exit 1
fi

# 3. Check for unmerged conflicts
if git ls-files -u | grep -q .; then
    echo "❌ Merge conflicts detected. Please resolve conflicts first."
    exit 1
fi

echo "✅ Pre-push checks passed!"
exit 0
```

🚀 Advanced Hook Examples
Automated Version Bumping

```bash
#!/bin/bash
# .git/hooks/post-commit

# Increment version based on commit type
commit_msg=$(git log -1 --pretty=%B)

if [[ $commit_msg =~ ^feat: ]]; then
    npm version minor --no-git-tag-version
elif [[ $commit_msg =~ ^fix: ]]; then
    npm version patch --no-git-tag-version
fi

git add package.json package-lock.json
git commit -m "chore: Update version"
```

Branch Name Validation

```bash
#!/bin/bash
# .git/hooks/pre-push

current_branch=$(git rev-parse --abbrev-ref HEAD)
branch_pattern='^(feature|bugfix|hotfix|release|docs)/[a-z0-9-]+$'

if [[ ! $current_branch =~ $branch_pattern ]]; then
    echo "❌ Invalid branch name: $current_branch"
    echo "Expected format: type/description"
    echo "Types: feature, bugfix, hotfix, release, docs"
    exit 1
fi
```

Dependency Security Check

```bash
#!/bin/bash
# .git/hooks/pre-push

echo "Running security audit..."

# Check for known vulnerabilities
npm audit --audit-level moderate
if [ $? -ne 0 ]; then
    echo "❌ Security vulnerabilities found."
    echo "Run 'npm audit fix' to resolve."
    exit 1
fi

# Check for outdated dependencies
if npm outdated | grep -q .; then
    echo "⚠️  Outdated dependencies found."
    echo "Consider updating: npm update"
fi
```

🔄 Hook Management
Installing Hooks

```bash
# 1. Make hooks executable
chmod +x .git/hooks/pre-commit
chmod +x .git/hooks/commit-msg
chmod +x .git/hooks/pre-push

# 2. Copy hooks to team members
git add .git/hooks/
git commit -m "Add Git hooks"

# 3. Use a hooks directory
mkdir .githooks
# Store hooks in .githooks/
git config core.hooksPath .githooks
```

Hook Distribution Script

```bash
#!/bin/bash
# install-hooks.sh

HOOKS_DIR=".githooks"
TARGET_DIR=".git/hooks"

echo "Installing Git hooks..."

# Create target directory if it doesn't exist
mkdir -p "$TARGET_DIR"

# Copy all hooks and make executable
for hook in "$HOOKS_DIR"/*; do
    if [ -f "$hook" ]; then
        cp "$hook" "$TARGET_DIR/"
        chmod +x "$TARGET_DIR/$(basename "$hook")"
        echo "✅ Installed $(basename "$hook")"
    fi
done

echo "Git hooks installed successfully!"
```

Hook Bypassing

```bash
# Bypass hooks when needed
git commit --no-verify -m "Emergency commit"
git push --no-verify origin main

# Use with caution!
```

🎯 Best Practices
Hook Design Principles

```markdown
## ✅ Do's

- Keep hooks fast and efficient
- Provide clear error messages
- Make hooks idempotent
- Test hooks thoroughly
- Document hook behavior

## ❌ Don'ts

- Make hooks too slow
- Block legitimate commits
- Use hooks for complex logic
- Assume hook execution order
- Skip hooks without reason
```

Performance Optimization

```bash
# Use caching for expensive operations
# Run checks only on changed files
# Parallelize independent checks
# Use appropriate exit codes

# Example: Check only staged files
staged_files=$(git diff --cached --name-only)
for file in $staged_files; do
    if [[ $file == *.js ]]; then
        eslint "$file"
    fi
done
```

🎯 FAANG Interview Focus
Key Hook Concepts
Hook types and their execution order
Common use cases for automation
Performance considerations for large teams
Hook distribution strategies
Bypassing hooks when necessary
Sample Interview Questions
"What Git hooks would you use for a team project?"
"How do you distribute hooks to team members?"
"What are the performance implications of hooks?"
"When would you bypass Git hooks?"
Sample Answers
Team Hooks: pre-commit (lint/test), commit-msg (format), pre-push (security)
Distribution: Store in repo, use core.hooksPath, installation scripts
Performance: Keep fast, check only changed files, parallel execution
Bypass: Emergency fixes, debugging, with --no-verify flag
📚 External Resources
[Git Hooks Documentation](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)
[Hook Examples](https://githooks.com/)
[GitHub Actions vs Git Hooks](https://docs.github.com/en/actions/tutorials)
