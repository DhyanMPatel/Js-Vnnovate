# Advanced Merge and Rebase Strategies

## 🔄 Git Merge Deep Dive

### Merge Types

#### Fast-Forward Merge

```bash
# When main hasn't moved forward
git checkout feature
git merge main  # Fast-forward
```

#### 3-Way Merge (Recursive)

```bash
# When both branches have diverged
git checkout main
git merge feature  # Creates merge commit
```

#### Squash Merge

```bash
# Combine all commits into one
git merge --squash feature
git commit -m "Combined feature changes"
```

### Merge Strategies

```bash
# Specify merge strategy
git merge -s recursive feature
git merge -s octopus feature1 feature2
git merge -s ours feature  # Keep our version

# Resolve conflicts automatically
git merge -X theirs feature  # Keep incoming changes
git merge -X ours feature    # Keep current changes
```

## 🎯 Git Rebase Masterclass

### Rebase Basics

```bash
# Rebase current branch onto main
git checkout feature
git rebase main

# Interactive rebase
git rebase -i HEAD~3

# Rebase specific commit
git rebase --onto main feature~2 feature
```

### Interactive Rebase Commands

When you run `git rebase -i`, you'll see these options:

```
pick = use commit
reword = use commit, but edit commit message
edit = use commit, but stop for amending
squash = use commit, but meld into previous commit
fixup = like squash, but discard commit message
drop = remove commit
```

### Interactive Rebase Examples

```bash
# Reorder commits
git rebase -i HEAD~3
# Change order: move commit 2 before commit 1

# Combine commits
git rebase -i HEAD~3
# squash commit 2 into commit 1

# Edit commit message
git rebase -i HEAD~3
# reword commit 1

# Split commit
git rebase -i HEAD~1
# edit, then git reset HEAD^, make multiple commits
```

## ⚔️ Merge vs Rebase: When to Use Which

### Use Merge When:

- Preserving exact history is important
- Working with shared/public branches
- Need to show when features were integrated
- Team prefers merge commits

```bash
# Good for main branch
git checkout main
git merge feature-branch
```

### Use Rebase When:

- Clean linear history is preferred
- Working on feature branches
- Before merging to main
- Synchronizing with upstream changes

```bash
# Good for feature branches
git checkout feature
git rebase main
# Then merge to main
git checkout main
git merge feature  # Fast-forward
```

## 🛠️ Advanced Rebase Techniques

### Rebase onto Different Branch

```bash
# Move commits from old-branch to new-branch
git rebase --onto new-branch old-branch feature-branch
```

### Continue After Conflicts

```bash
git rebase main
# Resolve conflicts
git add .
git rebase --continue
# OR
git rebase --abort  # Cancel rebase
```

### Rebase with Preserved Merges

```bash
# Keep merge commits during rebase
git rebase -p --onto main upstream-branch
```

## 🔄 Cherry-pick vs Rebase

### Cherry-pick for Selective Commits

```bash
# Apply specific commits
git cherry-pick 9a8b7c6d f1e2d3c4
```

### Rebase for Branch Movement

```bash
# Move entire branch
git rebase main
```

## 📊 Merge Strategies Comparison

| Strategy     | History    | Use Case            | Complexity |
| ------------ | ---------- | ------------------- | ---------- |
| Fast-forward | Linear     | Simple updates      | Low        |
| 3-way merge  | Non-linear | Feature integration | Medium     |
| Squash       | Linear     | Clean history       | Low        |
| Rebase       | Linear     | Feature development | High       |
| Cherry-pick  | Selective  | Hotfixes            | Medium     |

## 🎯 Real-World Scenarios

### Scenario 1: Feature Development

```bash
# Start feature
git checkout -b feature
# Make commits...
git checkout main
git pull  # Update main
git checkout feature
git rebase main  # Sync with latest main
# Continue development...
```

### Scenario 2: Hotfix to Release

```bash
# Create hotfix from release
git checkout -b hotfix release-1.0
# Fix issue...
git checkout release-1.0
git merge hotfix  # Fast-forward
git checkout main
git merge release-1.0  # Merge to main
```

### Scenario 3: Team Collaboration

```bash
# Before merging feature
git checkout feature
git rebase -i HEAD~5  # Clean up commits
git checkout main
git merge --no-ff feature  # Create merge commit
```

## ⚠️ Golden Rules

### Rebase Rules

1. **Never rebase public/shared branches**
2. **Never force push to shared branches**
3. **Always communicate before rewriting history**
4. **Use rebase only on your local branches**

### Merge Best Practices

1. **Use meaningful commit messages**
2. **Resolve conflicts carefully**
3. **Test after merging**
4. **Document merge decisions**

## 🚀 Professional Workflow

```bash
# 1. Update main
git checkout main
git pull origin main

# 2. Update feature
git checkout feature
git rebase main

# 3. Test and fix if needed
# Run tests...

# 4. Merge to main
git checkout main
git merge --no-ff feature
git push origin main

# 5. Clean up
git branch -d feature
git push origin --delete feature
```

## 🎯 FAANG Interview Questions

### Common Questions

- "Explain the difference between merge and rebase"
- "When would you use interactive rebase?"
- "How do you handle merge conflicts?"
- "What's the danger of rebasing shared branches?"

### Sample Answers

- **Merge vs Rebase**: Merge preserves history, rebase rewrites it
- **Interactive Rebase**: Clean up commits before sharing
- **Conflicts**: Use merge tools, communicate with team
- **Danger**: Breaks collaboration, loses history

## 📚 External Resources

- [Pro Git Book - Rewriting History](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History)
- [GitHub Rebase Documentation](https://docs.github.com/en/pull-requests/committing-changes-to-your-project/using-git-rebase-on-pull-requests)
- [Atlassian Git Tutorial](https://www.atlassian.com/git/tutorials/merging-vs-rebasing)
