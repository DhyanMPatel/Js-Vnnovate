# Git Conflict Resolution: Professional Guide

## 🔥 Understanding Conflicts

### What Causes Conflicts?

Conflicts occur when Git can't automatically merge changes because:

- Same lines were modified in both branches
- File deleted in one branch, modified in another
- Binary files with conflicting changes
- Complex merge scenarios

### Conflict Markers

```bash
<<<<<<< HEAD
# Your changes (current branch)
=======
# Their changes (incoming branch)
>>>>>>> feature-branch
```

## 🛠️ Conflict Resolution Strategies

### Strategy 1: Manual Resolution

```bash
# 1. Start merge
git merge feature-branch

# 2. Check status
git status
# Output: Unmerged paths: file.txt

# 3. Open conflicted file
# Resolve conflicts manually

# 4. Stage resolved file
git add file.txt

# 5. Complete merge
git commit
```

### Strategy 2: Using Merge Tools

```bash
# Configure merge tool
git config --global merge.tool vscode
git config --global mergetool.vscode.cmd 'code --wait $MERGED'

# Launch merge tool
git mergetool

# Continue after resolving
git commit
```

### Strategy 3: Accept One Side

```bash
# Accept current changes (ours)
git checkout --ours file.txt
git add file.txt

# Accept incoming changes (theirs)
git checkout --theirs file.txt
git add file.txt

# Accept all ours for all conflicts
git merge -X ours feature-branch
```

## 🎯 Advanced Conflict Resolution

### Binary File Conflicts

```bash
# Check which version to keep
git show HEAD:file.exe > file-current.exe
git show feature-branch:file.exe > file-feature.exe
# Test both versions...
git add file.exe  # Add the correct one
```

### Delete vs Modify Conflicts

```bash
# File deleted in current, modified in feature
# Options:
git rm file.txt        # Accept deletion
git add file.txt       # Keep modified version
```

### Multiple File Conflicts

```bash
# See all conflicts
git diff --name-only --diff-filter=U

# Resolve all at once (careful!)
git checkout --theirs .
git add .
```

## 🔄 Different Conflict Scenarios

### Scenario 1: Simple Line Conflict

```bash
# Before:
<<<<<<< HEAD
console.log("Hello World");
=======
console.log("Hello Universe");
>>>>>>> feature-branch

# After resolution:
console.log("Hello Universe");
```

### Scenario 2: Complex Function Conflict

```bash
<<<<<<< HEAD
function calculateTotal(items) {
    return items.reduce((sum, item) => sum + item.price, 0);
}
=======
function calculateTotal(items, tax = 0.1) {
    const subtotal = items.reduce((sum, item) => sum + item.price, 0);
    return subtotal * (1 + tax);
}
>>>>>>> feature-branch

# Resolved version:
function calculateTotal(items, tax = 0.1) {
    const subtotal = items.reduce((sum, item) => sum + item.price, 0);
    return subtotal * (1 + tax);
}
```

### Scenario 3: Import/Require Conflicts

```bash
<<<<<<< HEAD
import { utils } from './helpers';
=======
import { utils, constants } from './helpers';
import { logger } from './logger';
>>>>>>> feature-branch

# Resolved:
import { utils, constants } from './helpers';
import { logger } from './logger';
```

## 🚀 Prevention Strategies

### Before Merging

```bash
# 1. Update branches
git checkout main
git pull origin main
git checkout feature
git rebase main

# 2. Check for conflicts early
git merge main --no-commit

# 3. Use diff to see potential conflicts
git diff main...feature

# 4. Run tests before merging
npm test
```

### During Development

```bash
# 1. Pull frequently
git pull origin main

# 2. Commit small changes
git add .
git commit -m "Small incremental change"

# 3. Use feature branches
git checkout -b new-feature
```

### Team Coordination

```bash
# 1. Communicate about file changes
# 2. Use code reviews early
# 3. Establish file ownership
# 4. Schedule merge windows
```

## 🛡️ Professional Conflict Resolution Workflow

### Step-by-Step Process

```bash
# 1. Prepare for merge
git status
git add .
git commit -m "WIP: Current state"

# 2. Create backup branch
git branch backup-before-merge

# 3. Attempt merge
git merge feature-branch

# 4. If conflicts:
git status  # See what's conflicted
git diff     # See conflict details

# 5. Resolve conflicts
# Open each conflicted file and resolve

# 6. Verify resolution
git status  # Should show "Changes to be committed"
git diff --cached  # Review resolved changes

# 7. Complete merge
git commit -m "Merge feature-branch: Resolved conflicts"

# 8. Test thoroughly
npm test
# Manual testing...

# 9. Clean up if needed
git branch -d backup-before-merge
```

### Emergency Recovery

```bash
# If things go wrong:
git merge --abort  # Cancel merge, return to pre-merge state

# Or use backup branch:
git reset --hard backup-before-merge
```

## 🎯 Best Practices

### Do's

✅ **Communicate** with team before large merges  
✅ **Test** thoroughly after resolving conflicts  
✅ **Use merge tools** for complex conflicts  
✅ **Commit frequently** to reduce conflict scope  
✅ **Review changes** carefully before committing

### Don'ts

❌ **Force push** after resolving conflicts  
❌ **Ignore conflicts** - resolve them properly  
❌ **Merge without testing**  
❌ **Delete branches** before verifying merge  
❌ **Work on same files** without coordination

## 🔧 Advanced Tools and Techniques

### Using VS Code for Conflicts

```bash
# Configure VS Code as default merge tool
git config --global merge.tool vscode
git config --global mergetool.vscode.cmd 'code --wait $MERGED'
git config --global mergetool.prompt false

# Launch VS Code merge tool
git mergetool
```

### Git Merge Strategies

```bash
# Recursive strategy with patience
git merge -s recursive -X patience feature-branch

# Ours strategy (keep current changes)
git merge -s ours feature-branch

# Subtree strategy for subdirectories
git merge -s subtree feature-branch
```

### Pre-merge Checks

```bash
# Check for potential conflicts
git merge-tree $(git merge-base main feature) main feature

# See what would be merged
git diff main...feature --name-only

# Check for conflicting changes in specific files
git diff main...feature -- src/components/Button.js
```

## 🎯 FAANG Interview Scenarios

### Common Interview Questions

1. "How do you handle merge conflicts in a team environment?"
2. "What's your process for resolving complex conflicts?"
3. "How do you prevent conflicts from happening?"
4. "Describe a time you had a difficult conflict to resolve."

### Sample Answers

- **Process**: Communicate, backup, resolve systematically, test
- **Prevention**: Frequent pulls, small commits, coordination
- **Tools**: VS Code, git mergetool, diff tools
- **Recovery**: git merge --abort, backup branches

## 📚 External Resources

- [Git Conflict Resolution Guide](https://git-scm.com/book/en/v2/Git-Tools-Advanced-Merging)
- [VS Code Merge Conflict Resolution](https://code.visualstudio.com/docs/sourcecontrol/merge-conflicts)
- [Atlassian Conflict Resolution](https://www.atlassian.com/git/tutorials/using-branches/merge-conflicts)
