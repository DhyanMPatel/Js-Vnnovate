# GitHub Issues & Project Management

## 🎯 GitHub Issues Overview

GitHub Issues is a powerful project management tool that helps teams track bugs, features, tasks, and ideas. It's the foundation of GitHub's project management capabilities.

### Issue Types

- **Bug Reports**: Problems that need fixing
- **Feature Requests**: New functionality to add
- **Tasks**: Work items to complete
- **Discussions**: Questions and ideas
- **Epics**: Large work items broken into smaller issues

## 📝 Creating Effective Issues

### Issue Template Structure

Create `.github/ISSUE_TEMPLATE/bug_report.md`:

```markdown
---
name: Bug Report
about: Create a report to help us improve
title: ""
labels: bug
assignees: ""
---

## 🐛 Bug Description

A clear and concise description of what the bug is.

## 🔄 Steps to Reproduce

1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## 🎯 Expected Behavior

A clear and concise description of what you expected to happen.

## 📸 Screenshots

If applicable, add screenshots to help explain your problem.

## 🖥️ Environment

- OS: [e.g. Windows 10, macOS 12.0]
- Browser: [e.g. Chrome, Safari]
- Version: [e.g. 1.2.3]

## 📋 Additional Context

Add any other context about the problem here.
```

### Feature Request Template

Create `.github/ISSUE_TEMPLATE/feature_request.md`:

```markdown
---
name: Feature Request
about: Suggest an idea for this project
title: ""
labels: enhancement
assignees: ""
---

## 🚀 Feature Description

A clear and concise description of the feature you'd like to see.

## 💡 Motivation

Explain why this feature would be useful and what problem it solves.

## 📝 Proposed Solution

If you have a specific solution in mind, describe it here.

## 🔄 Alternatives Considered

Describe any alternative solutions or features you've considered.

## 📚 Additional Context

Add any other context, mockups, or examples about the feature request.
```

## 🏷️ Issue Labels and Categories

### Standard Labels

```bash
# Type Labels
bug          # Bug reports
enhancement  # Feature requests
documentation # Documentation issues
question     # User questions

# Priority Labels
priority/low     # Low priority
priority/medium  # Medium priority
priority/high    # High priority
priority/critical # Critical priority

# Status Labels
status/new       # New issue
status/in-progress # Being worked on
status/review    # Ready for review
status/done      # Completed

# Component Labels
component/frontend  # Frontend issues
component/backend   # Backend issues
component/api       # API issues
component/database  # Database issues
```

### Label Configuration

```yaml
# .github/labels.yml
labels:
  - name: bug
    color: d73a4a
    description: Something isn't working

  - name: enhancement
    color: a2eeef
    description: New feature or request

  - name: documentation
    color: 0075ca
    description: Improvements or additions to documentation

  - name: good first issue
    color: 7057ff
    description: Good for newcomers
```

## 📊 GitHub Projects (Classic & New)

### Project Boards Overview

GitHub Projects provides Kanban-style boards to visualize and manage work.

#### Classic Project Boards

```markdown
## Classic Project Columns

- **To Do**: Backlog items
- **In Progress**: Currently being worked on
- **In Review**: Ready for code review
- **Done**: Completed items
```

#### New GitHub Projects (Beta)

```yaml
# Project Configuration
name: "Sprint Planning"
visibility: public
description: "Track sprint progress and deliverables"

# Views
views:
  - name: "Board View"
    type: board
  - name: "Table View"
    type: table
  - name: "Roadmap"
    type: timeline
```

## 🔄 Issue Management Workflow

### Issue Lifecycle

```
Created → Triage → Assigned → In Progress → Review → Done → Closed
```

### Detailed Workflow

```bash
# 1. Issue Creation
- User creates issue with template
- Auto-assign labels based on content
- Set initial priority

# 2. Triage
- Team lead reviews issue
- Assign to appropriate team member
- Set milestone and priority
- Add to project board

# 3. Development
- Developer creates feature branch
- Links commits to issue (#123)
- Updates issue status

# 4. Review
- Create pull request
- Link PR to issue
- Code review process

# 5. Completion
- Merge pull request
- Close issue automatically
- Update project board
```

## 🔗 Advanced Issue Features

### Issue References and Links

```markdown
# Referencing Issues

- Fixes #123 # Automatically closes issue when PR merges
- Closes #456 # Same as fixes
- Resolves #789 # Same as closes
- Related to #101112

# Cross-repository references

- owner/repo#123
- Fixes other-org/other-repo#456
```

### Issue Templates with Configuration

Create `.github/ISSUE_TEMPLATE/config.yml`:

```yaml
blank_issues_enabled: true
contact_links:
  - name: 📚 Documentation
    url: https://docs.example.com
    about: Check our documentation first

  - name: 💬 Community Forum
    url: https://community.example.com
    about: Ask questions on our community forum

  - name: 🐛 Report Security Issue
    url: mailto:security@example.com
    about: Report security vulnerabilities privately
```

### Milestones and Releases

```bash
# Creating Milestones
- Create milestone for version (v1.2.0)
- Set due date and description
- Assign issues to milestone

# Tracking Progress
- GitHub shows milestone progress
- % complete based on closed issues
- Release notes from milestone
```

## 📈 Project Analytics and Reporting

### Issue Metrics

```bash
# Key Metrics to Track
- Time to first response
- Time to resolution
- Bug fix rate
- Feature completion rate
- Team velocity

# GitHub Insights
- Contributors tab shows activity
- Pulse shows recent activity
- Graphs show contribution trends
```

### Custom Dashboards

```markdown
## Project Dashboard Metrics

### 🎯 Sprint Goals

- Total issues: 15
- Completed: 12 (80%)
- In Progress: 3
- Blocked: 0

### 📊 Team Performance

- Average response time: 2.3 hours
- Average resolution time: 3.5 days
- Bug fix rate: 95%

### 🔥 Hot Issues

- #123: Critical bug in production
- #456: Feature request from enterprise client
- #789: Security vulnerability
```

## 🤖 Automation with GitHub Actions

### Auto-label Issues

```yaml
name: Auto-label Issues
on:
  issues:
    types: [opened]

jobs:
  auto-label:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Auto-label based on content
        uses: actions/github-script@v6
        with:
          script: |
            const issue = context.payload.issue;
            const labels = [];

            if (issue.body.includes('bug') || issue.title.includes('bug')) {
              labels.push('bug');
            }
            if (issue.body.includes('feature') || issue.title.includes('feature')) {
              labels.push('enhancement');
            }

            if (labels.length > 0) {
              github.rest.issues.addLabels({
                owner: context.repo.owner,
                repo: context.repo.repo,
                issue_number: issue.number,
                labels: labels
              });
            }
```

### Auto-assign Issues

```yaml
name: Auto-assign Issues
on:
  issues:
    types: [opened]

jobs:
  auto-assign:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/github-script@v6
        with:
          script: |
            const issue = context.payload.issue;
            const assignees = ['team-lead', 'senior-dev'];

            github.rest.issues.addAssignees({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: issue.number,
              assignees: assignees
            });
```

### Auto-move to Project Board

```yaml
name: Move to Project Board
on:
  issues:
    types: [opened]

jobs:
  move-to-project:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/github-script@v6
        with:
          script: |
            const issue = context.payload.issue;
            const project_id = 'PROJECT_ID';
            const column_id = 'COLUMN_ID';

            github.rest.projects.createCard({
              column_id: column_id,
              content_id: issue.id,
              content_type: 'Issue'
            });
```

## 🎯 Best Practices

### Issue Writing Guidelines

```markdown
## ✅ Do's

- Use descriptive titles
- Provide clear reproduction steps
- Include environment details
- Add screenshots when helpful
- Search existing issues first

## ❌ Don'ts

- Create vague issues like "It doesn't work"
- Skip reproduction steps
- Ignore issue templates
- Open multiple issues for same problem
- Use inappropriate labels
```

### Team Collaboration

```bash
# Regular Issue Reviews
- Weekly issue triage meetings
- Priority assessment sessions
- Sprint planning with issue selection
- Retrospectives with issue analysis

# Communication Guidelines
- Use @mentions to notify team members
- Link related issues and PRs
- Update issue status regularly
- Close issues with resolution notes
```

### Project Management Tips

```markdown
## 📋 Sprint Planning

1. Review backlog issues
2. Select issues for sprint
3. Assign to team members
4. Set sprint goals
5. Create sprint board

## 🔄 Daily Standups

- Check project board updates
- Identify blockers
- Coordinate dependencies
- Adjust priorities

## 📊 Sprint Review

- Review completed issues
- Analyze velocity metrics
- Identify improvement areas
- Plan next sprint
```

## 🚀 Advanced Workflows

### Dependency Management

```markdown
## Issue Dependencies

- Use "blocks" relationships
- Create issue hierarchies
- Track cross-team dependencies
- Visualize dependency graphs

## Example Hierarchy

# Epic: User Authentication System

├── #123: Implement login page
├── #124: Add password reset
├── #125: Implement two-factor auth
└── #126: Add social login options
```

### Release Management

```bash
# Release Workflow
1. Create release milestone
2. Assign issues to milestone
3. Complete development
4. Quality assurance testing
5. Create release tag
6. Generate release notes
7. Deploy to production
8. Close milestone
```

### Integration with External Tools

````markdown
## Popular Integrations

- **Jira**: Sync issues with Jira tickets
- **Slack**: Notify team of issue updates
- **Zendesk**: Link support tickets to issues
- **Trello**: Sync with Trello boards
- **Asana**: Integrate with Asana projects

## API Integration Example

```javascript
// GitHub API for issue management
const octokit = require("@octokit/rest")();

// Create issue
const issue = await octokit.issues.create({
  owner: "org",
  repo: "repo",
  title: "New feature request",
  body: "Detailed description...",
  labels: ["enhancement", "frontend"],
});

// Update issue
await octokit.issues.update({
  owner: "org",
  repo: "repo",
  issue_number: 123,
  state: "closed",
  labels: ["completed"],
});
```
````

## 🎯 FAANG Interview Focus

### Key Concepts

- **Issue tracking** and lifecycle management
- **Project boards** and visualization
- **Automation** with GitHub Actions
- **Team collaboration** workflows
- **Metrics and reporting**

### Sample Questions

1. "How do you organize issues for a large team?"
2. "Describe your issue triage process"
3. "How do you track sprint progress?"
4. "What automation do you use for issue management?"

### Sample Answers

- **Organization**: Use labels, milestones, and project boards
- **Triage**: Regular reviews, priority assessment, assignment
- **Progress**: Project boards, burndown charts, velocity tracking
- **Automation**: Auto-labeling, assignment, and status updates

## 📚 External Resources

- [GitHub Issues Documentation](https://docs.github.com/en/issues)
- [GitHub Projects Guide](https://docs.github.com/en/issues/planning-and-tracking-with-projects)
- [GitHub Actions for Issues](https://github.com/marketplace?type=actions&category=issue-management)
- [Project Management Best Practices](https://github.com/features/project-management)
