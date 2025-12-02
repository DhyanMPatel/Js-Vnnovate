# Advanced Git Operations

## 🔄 Git Reset

### Theory

`git reset` moves the current branch pointer to a different commit. It has three modes:

- **Soft**: Moves HEAD, keeps changes staged
- **Mixed** (default): Moves HEAD, unstages changes
- **Hard**: Moves HEAD, deletes all changes

### Commands

```bash
# Soft reset - keep changes staged
git reset --soft HEAD~1

# Mixed reset - unstages changes
git reset HEAD~1

# Hard reset - DANGEROUS - deletes changes
git reset --hard HEAD~1

# Reset specific file
git reset HEAD filename.txt

# Reset to specific commit
git reset --hard 9a8b7c6d
```

### Use Cases

- **Soft**: Fix last commit message
- **Mixed**: Unstage files for selective commit
- **Hard**: Discard all local changes (use with caution!)

## ⏪ Git Revert

### Theory

`git revert` creates a new commit that undoes previous changes. It's safer than reset because it preserves history.

### Commands

```bash
# Revert last commit
git revert HEAD

# Revert specific commit
git revert 9a8b7c6d

# Revert without creating commit (just stage changes)
git revert --no-commit HEAD

# Revert multiple commits
git revert HEAD~3..HEAD
```

### Use Cases

- Undo problematic commits in shared branches
- Maintain complete history
- Team collaboration scenarios

## 🍒 Git Cherry-pick

### Theory

`git cherry-pick` applies specific commits from one branch to another.

### Commands

```bash
# Cherry-pick single commit
git cherry-pick 9a8b7c6d

# Cherry-pick without committing
git cherry-pick --no-commit 9a8b7c6d

# Cherry-pick multiple commits
git cherry-pick 9a8b7c6d..f1e2d3c4

# Cherry-pick with edits
git cherry-pick --edit 9a8b7c6d

# Continue after conflicts
git cherry-pick --continue

# Abort cherry-pick
git cherry-pick --abort
```

### Use Cases

- Apply hotfixes to multiple branches
- Backport features to release branches
- Selective commit sharing

## 📋 Git Reflog

### Theory

`git reflog` (reference log) tracks all movements of HEAD. It's your safety net for recovering lost commits.

### Commands

```bash
# Show reflog
git reflog

# Show detailed reflog
git reflog --show-sigature

# Show reflog for specific branch
git reflog main

# Recover lost commit
git checkout HEAD@{2}

# Reset to reflog point
git reset --hard HEAD@{5}
```

### Use Cases

- Recover accidentally deleted commits
- Find lost work after hard reset
- Track branch movements
- Undo git reflog operations

## 🔍 Git Bisect

### Theory

`git bisect` uses binary search to find the commit that introduced a bug.

### Commands

```bash
# Start bisect
git bisect start

# Mark current as bad
git bisect bad

# Mark known good commit
git bisect good 9a8b7c6d

# Git will checkout commits, mark as good/bad
git bisect good  # if this version works
git bisect bad   # if this version has the bug

# End bisect
git bisect reset

# Skip problematic commits
git bisect skip
```

### Use Cases

- Find bug-introducing commits
- Debug regression issues
- Automated testing integration

## 📝 Best Practices

### Reset vs Revert

```bash
# Use REVERT for shared branches
git revert HEAD

# Use RESET for local branches
git reset --soft HEAD~1
```

### Safety First

```bash
# Always check status before destructive operations
git status

# Create backup branch before major changes
git branch backup-branch

# Use reflog to recover if needed
git reflog
```

### Common Workflows

#### Fix Last Commit Message

```bash
git commit --amend -m "New message"
# OR
git reset --soft HEAD~1
git commit -m "New message"
```

#### Undo Local Changes

```bash
# Unstage all files
git reset HEAD

# Discard all changes
git reset --hard HEAD

# Discard specific file changes
git checkout -- filename.txt
```

#### Move Commit to Different Branch

```bash
# On branch A with commit to move
git checkout -b temp-branch 9a8b7c6d
git reset --hard HEAD~1  # remove commit from branch A
git checkout target-branch
git cherry-pick 9a8b7c6d  # apply to target branch
```

## ⚠️ Warnings

- **Never force push to shared branches** after rewriting history
- **Always communicate** with team before using reset on shared branches
- **Backup important work** before destructive operations
- **Use reflog** as your safety net

## 🎯 FAANG Interview Tips

- Know when to use `reset` vs `revert`
- Understand how to recover lost commits
- Explain cherry-pick use cases
- Demonstrate bisect for debugging
- Show awareness of safety practices
