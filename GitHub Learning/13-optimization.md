# Git Repository Optimization & Performance

## 🎯 Why Optimization Matters

Optimizing Git repositories improves performance, reduces storage requirements, and enhances developer experience. This is crucial for large projects and teams.

## 📊 Repository Analysis

### Repository Size Analysis

```bash
# Check repository size
git count-objects -vH
# Output: size-pack: 45.2 MiB, size-garbage: 12.1 MiB

# Check largest files
git rev-list --objects --all | git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | sed -n 's/^blob //p' | sort -nrk2 | head -10

# Check directory sizes
du -sh .git/objects/*
```

### Performance Metrics

```bash
# Measure command performance
time git status
time git log --oneline -10
time git diff HEAD~1

# Check repository health
git fsck --full
git gc --prune=now --aggressive
```

## 🗑️ Garbage Collection

### Basic Garbage Collection

```bash
# Standard garbage collection
git gc

# Aggressive garbage collection (takes longer)
git gc --aggressive

# Prune unreachable objects
git prune --expire=now

# Clean up loose objects
git gc --prune=now
```

### Scheduled Maintenance

```bash
#!/bin/bash
# maintenance.sh - Weekly repository maintenance

echo "Starting repository maintenance..."

# 1. Cleanup unnecessary files
git clean -fd

# 2. Compress loose objects
git gc --auto

# 3. Remove old reflogs
git reflog expire --expire=1.month --all

# 4. Repack repository
git repack -ad

# 5. Prune unreachable objects
git prune

echo "Maintenance completed!"
```

## 📦 Large File Handling

### Git LFS (Large File Storage)

```bash
# Install Git LFS
# macOS: brew install git-lfs
# Ubuntu: sudo apt install git-lfs

# Initialize LFS
git lfs install

# Track large files
git lfs track "*.zip"
git lfs track "*.pdf"
git lfs track "*.mp4"

# Add .gitattributes
git add .gitattributes
git commit -m "Add LFS tracking"

# Push large files
git add large-file.zip
git commit -m "Add large file"
git push origin main
```

### LFS Configuration

```bash
# .gitlfsconfig
[lfs]
    # Basic authentication
    url = https://github.com/user/repo.git/info/lfs

    # Custom storage
    [lfs "custom"]
        url = https://storage.example.com
        access = basic
```

### Migrating Existing Large Files

```bash
# Find large files (>10MB)
find . -type f -size +10M -not -path "./.git/*"

# Migrate to LFS
git lfs migrate import --include="*.zip,*.pdf,*.mp4"

# Rewrite history (destructive!)
git lfs migrate import --everything --include="*.zip"
```

## 🚀 Shallow and Partial Clones

### Shallow Clones

```bash
# Clone with limited history
git clone --depth 1 https://github.com/user/repo.git

# Clone with specific depth
git clone --depth 10 https://github.com/user/repo.git

# Shallow clone for specific branch
git clone --depth 1 --branch develop https://github.com/user/repo.git

# Update shallow clone
git fetch --depth 1
```

### Partial Clones (Blobless and Treeless)

```bash
# Blobless clone (no file contents)
git clone --filter=blob:none https://github.com/user/repo.git

# Treeless clone (no directory trees)
git clone --filter=tree:0 https://github.com/user/repo.git

# Sparse checkout (specific directories)
git clone --filter=blob:none --sparse https://github.com/user/repo.git
cd repo
git sparse-checkout set src docs
```

### Sparse Checkout Configuration

```bash
# Enable sparse checkout
git config core.sparseCheckout true

# Define directories to include
echo "src/" >> .git/info/sparse-checkout
echo "docs/" >> .git/info/sparse-checkout
echo "tests/" >> .git/info/sparse-checkout

# Update working directory
git read-tree -mu HEAD
```

## 🔧 Repository Optimization Techniques

### Pack File Optimization

```bash
# Repack with delta compression
git repack -ad

# Create optimized pack
git repack -a -d --depth=250 --window=250

# Check pack efficiency
git verify-pack -v .git/objects/pack/*.idx
```

### Object Database Optimization

```bash
# Remove duplicate objects
git repack -ad

# Optimize for server
git config pack.windowMemory 512m
git config pack.depth 50
git config pack.deltaCacheSize 512m

# Optimize for client
git config pack.windowMemory 128m
git config pack.depth 10
git config pack.deltaCacheSize 128m
```

### Branch Optimization

```bash
# Remove stale branches
git branch -d old-branch
git push origin --delete old-branch

# Clean up remote tracking branches
git remote prune origin

# Archive old branches
git tag archive/old-branch old-branch
git branch -d old-branch
```

## 📈 Performance Monitoring

### Repository Health Check

```bash
#!/bin/bash
# health-check.sh - Repository health monitoring

echo "=== Repository Health Check ==="

# 1. Repository size
echo "Repository size:"
du -sh .git

# 2. Number of objects
echo "Objects count:"
git count-objects -v

# 3. Pack files
echo "Pack files:"
ls -la .git/objects/pack/

# 4. Largest files
echo "Largest files:"
git rev-list --objects --all | git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | sed -n 's/^blob //p' | sort -nrk2 | head -5

# 5. Branch count
echo "Branch count:"
git branch -a | wc -l

# 6. Tags
echo "Tag count:"
git tag | wc -l
```

### Performance Benchmarking

```bash
#!/bin/bash
# benchmark.sh - Performance benchmarking

echo "=== Git Performance Benchmark ==="

# 1. Status performance
echo "git status:"
time git status

# 2. Log performance
echo "git log (last 100):"
time git log --oneline -100

# 3. Diff performance
echo "git diff (last commit):"
time git diff HEAD~1

# 4. Checkout performance
echo "git checkout main:"
time git checkout main

# 5. Clone performance (test)
echo "Clone test:"
time git clone --depth 1 .git test-clone
rm -rf test-clone
```

## 🛠️ Advanced Optimization

### Git Daemon Configuration

```bash
# Optimize Git daemon for large repositories
git config daemon.uploadpack true
git config daemon.uploadarch true

# Enable fast hash
git config core.preloadindex true
git config core.fscache true
git config gc.auto 256
```

### HTTP Optimization

```bash
# HTTP post buffer size
git config http.postBuffer 524288000

# HTTP low speed limit
git config http.lowSpeedLimit 0
git config http.lowSpeedTime 999999

# HTTP compression
git config http.compression true
```

### SSH Optimization

```bash
# SSH connection reuse
git config core.sshCommand "ssh -o ControlMaster=auto -o ControlPath=/tmp/%r@%h:%p -o ControlPersist=600"

# SSH compression
git config core.compression 9
```

## 📊 Repository Cleanup Strategies

### Historical Cleanup

```bash
# Remove sensitive data from history
git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch sensitive-file.txt' --prune-empty --tag-name-filter cat -- --all

# Remove large binaries
git filter-branch --tree-filter 'rm -f large-file.bin' --prune-empty --tag-name-filter cat -- --all

# Clean up after filter-branch
rm -rf .git/refs/original/
git reflog expire --expire=now --all
git gc --prune=now
```

### Branch History Cleanup

```bash
# Squash merge commits
git rebase -i --root

# Remove specific commits
git rebase -i HEAD~5
# Mark commits as 'drop'

# Rewrite history with new author
git filter-branch --env-filter '
    export GIT_AUTHOR_NAME="New Name"
    export GIT_AUTHOR_EMAIL="new.email@example.com"
    export GIT_COMMITTER_NAME="New Name"
    export GIT_COMMITTER_EMAIL="new.email@example.com"
' -- --all
```

## 🎯 Best Practices

### Repository Structure

```markdown
## ✅ Do's

- Use .gitignore effectively
- Implement LFS for large files
- Regular garbage collection
- Monitor repository size
- Use shallow clones for CI/CD

## ❌ Don'ts

- Commit large binaries directly
- Ignore repository size growth
- Store build artifacts in repo
- Use force push without care
- Skip regular maintenance
```

### Performance Guidelines

```bash
# For large repositories
git config core.preloadindex true
git config core.fscache true
git config gc.auto 256

# For slow networks
git config core.compression 9
git config pack.windowMemory 512m

# For CI/CD
git clone --depth 1 --filter=blob:none
git sparse-checkout set src
```

## 🎯 FAANG Interview Focus

### Key Optimization Concepts

- **Repository size management** and cleanup
- **Large file handling** with Git LFS
- **Performance tuning** for different scenarios
- **Shallow and partial clones** for efficiency
- **Garbage collection** and maintenance

### Sample Interview Questions

1. "How would you optimize a large Git repository?"
2. "What is Git LFS and when would you use it?"
3. "How do you handle large files in Git?"
4. "Describe your repository maintenance strategy"

### Sample Answers

- **Optimization**: LFS, garbage collection, shallow clones, sparse checkout
- **Git LFS**: Large file storage, tracks pointers instead of files
- **Large files**: LFS, .gitignore, external storage, compression
- **Maintenance**: Regular GC, monitoring, cleanup scripts, automation

## 📚 External Resources

- [Git LFS Documentation](https://git-lfs.github.com/)
- [Git Performance Tuning](https://git-scm.com/docs/Performance)
- [Repository Cleanup Guide](https://help.github.com/en/articles/removing-sensitive-data-from-a-repository)
- [Git Internals Documentation](https://git-scm.com/book/en/v2/Git-Internals-Plumbing-and-Porcelain)
