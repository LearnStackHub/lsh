const gitBranchProtection = {
  id: 'git-branch-protection',
  title: 'Branch Protection & Private/Public Branches',
  description: 'Learn about branch protection rules, private vs public branches, and how to secure your repository branches.',
  courseTitle: 'Git & GitHub',
  sectionTitle: 'GitHub Basics',
  content: `
# Branch Protection & Private/Public Branches

Protecting your branches is essential for maintaining code quality and preventing accidental changes. Let's learn how to set up branch protection and understand the difference between private and public branches.

## Understanding Branch Visibility

### Public Branches

**Public branches** are visible to everyone who has access to the repository. Anyone can see:
- Branch name
- Commits
- Code changes
- History

**When to use:**
- Main/master branch (production code)
- Release branches
- Documentation branches
- Open source projects

### Private Branches

**Private branches** are only visible to repository collaborators. They're useful for:
- Experimental features
- Security-sensitive work
- Work in progress
- Internal testing

**Note:** In GitHub, branches themselves aren't private - repository visibility controls access. But you can control who can push to branches.

## Branch Protection Rules

Branch protection prevents accidental or malicious changes to important branches.

### Setting Up Branch Protection on GitHub

1. Go to your repository on GitHub
2. Click **Settings** → **Branches**
3. Under **Branch protection rules**, click **Add rule**
4. Enter branch name pattern (e.g., \`main\` or \`*\`)
5. Configure protection options

### Protection Options

#### Require Pull Request Reviews

**Before merging:**
- Require a minimum number of approvals
- Dismiss stale reviews when new commits are pushed
- Require review from code owners

**Configuration:**
- **Required number of reviewers:** 1-6
- **Dismiss stale pull request approvals:** Yes/No
- **Require review from Code Owners:** Yes/No

**Example:**
- Require 2 approvals before merging to main
- Dismiss reviews if new commits are added
- Require review from code owners

#### Require Status Checks

**Before merging:**
- Require branches to be up to date
- Require status checks to pass

**Common status checks:**
- CI/CD pipeline
- Automated tests
- Code quality checks
- Security scans

**Example:**
\`\`\`
Require status checks to pass before merging
✓ build
✓ test
✓ lint
\`\`\`

#### Require Conversation Resolution

**Before merging:**
- All comments must be resolved
- All discussions must be addressed

**Use case:** Ensures all feedback is addressed before merging.

#### Require Signed Commits

**Before merging:**
- All commits must be signed
- Prevents unauthorized commits

**How to sign commits:**
\`\`\`bash
# Generate GPG key
gpg --gen-key

# Configure Git
git config --global user.signingkey YOUR_KEY_ID
git config --global commit.gpgsign true

# Sign commits
git commit -S -m "Signed commit message"
\`\`\`

#### Require Linear History

**Before merging:**
- No merge commits allowed
- Must use rebase or squash merge

**Result:** Clean, linear history

#### Restrict Who Can Push

**Before merging:**
- Only specific people/teams can push
- Prevents direct pushes to protected branch

**Configuration:**
- Allow specific users
- Allow specific teams
- Allow administrators

#### Allow Force Pushes

**Warning:** Generally not recommended for main branch

**When allowed:**
- Only specific people
- Only after pull request reviews

#### Allow Deletions

**Warning:** Generally not recommended

**When allowed:**
- Only administrators
- Only after reviews

## Branch Protection Example

### Protecting Main Branch

**Settings:**
\`\`\`
Branch name pattern: main

Protection rules:
✓ Require a pull request before merging
  - Required approvals: 2
  - Dismiss stale reviews: Yes
  - Require review from Code Owners: Yes

✓ Require status checks to pass
  - build
  - test
  - security-scan

✓ Require conversation resolution before merging
✓ Require signed commits
✓ Require linear history
✓ Do not allow bypassing the above settings
✓ Restrict pushes that create matching branches
\`\`\`

## Code Owners

Code owners automatically request reviews from specific people for certain files.

### Creating CODEOWNERS File

Create \`.github/CODEOWNERS\` in your repository:

\`\`\`
# Global owners
* @team-leads

# Java files
*.java @java-team

# Database files
*.sql @database-team

# Configuration files
*.properties @devops-team
config/ @devops-team

# Documentation
docs/ @documentation-team
README.md @project-maintainer
\`\`\`

**Syntax:**
- \`*\` = all files
- \`*.java\` = all Java files
- \`path/\` = all files in directory
- \`@username\` = GitHub username
- \`@team-name\` = GitHub team

## Private vs Public Repository

### Public Repository

**Characteristics:**
- Visible to everyone on GitHub
- Anyone can view code
- Anyone can fork
- Free for unlimited public repos

**Use cases:**
- Open source projects
- Portfolio projects
- Learning projects
- Public documentation

### Private Repository

**Characteristics:**
- Only visible to collaborators
- Access controlled by owner
- Can be made public later
- Free for individuals (unlimited)
- Paid for organizations

**Use cases:**
- Commercial projects
- Internal tools
- Proprietary code
- Client projects

## Changing Repository Visibility

### Make Private Repository Public

1. Go to repository **Settings**
2. Scroll to **Danger Zone**
3. Click **Change visibility**
4. Select **Make public**
5. Type repository name to confirm

**Warning:** All code becomes publicly visible!

### Make Public Repository Private

1. Go to repository **Settings**
2. Scroll to **Danger Zone**
3. Click **Change visibility**
4. Select **Make private**
5. Confirm the change

**Note:** Existing forks remain public.

## Branch Protection Best Practices

1. **Always protect main branch:**
   - Require PR reviews
   - Require status checks
   - Prevent direct pushes

2. **Use code owners:**
   - Automate review assignments
   - Ensure experts review their areas

3. **Require status checks:**
   - Run tests before merging
   - Check code quality
   - Verify security

4. **Limit who can bypass:**
   - Only administrators
   - Only in emergencies

5. **Protect release branches:**
   - Same rules as main
   - Prevent accidental changes

## Real-World Example

### Java Web Application

**Repository structure:**
\`\`\`
Repository: ecommerce-app (Private)

Branches:
- main (Protected)
  - Require 2 approvals
  - Require CI to pass
  - Require signed commits
  
- develop (Protected)
  - Require 1 approval
  - Require tests to pass
  
- feature/* (Unprotected)
  - Anyone can push
  - No restrictions
  
- release/* (Protected)
  - Require 2 approvals
  - Require all checks
\`\`\`

**CODEOWNERS file:**
\`\`\`
# Backend Java code
src/main/java/**/*.java @backend-team

# Frontend code
src/main/webapp/** @frontend-team

# Database
src/main/resources/db/** @database-team

# Configuration
src/main/resources/application.properties @devops-team
\`\`\`

## Summary

You've learned:
- Difference between public and private branches
- How to set up branch protection rules
- Code owners and review requirements
- Status checks and requirements
- Best practices for branch protection
- Repository visibility settings

---

## 10 Important Branch Protection Interview Questions

1. **Why protect \`main\`?**  
   **\`main\`** is usually **production** or **release** source. Protection **blocks** direct pushes, **requires** PRs, **reviews**, and **CI**—so **one person** can’t break everyone.

2. **What is a required pull request review?**  
   Merging to \`main\` needs **N approvals** from people **not** the author (depending on rules). **Catches** bugs and **shares** knowledge.

3. **What are required status checks?**  
   GitHub **blocks merge** until **CI** jobs (build, test, lint) **pass**. Links **quality** to **merge button**.

4. **What is signed commit requirement?**  
   Commits must be **GPG/SSH signed** so GitHub can **verify** identity—**stronger** audit for regulated teams.

5. **What is \`CODEOWNERS\`?**  
   File defining **who must review** which paths. **Auto-assigns** reviewers when PRs touch those files.

6. **Can admins bypass branch protection?**  
   Often **yes** unless **“include administrators”** is enabled. **Policy** question—good teams **don’t** bypass casually.

7. **What is the difference between private repo and protected branch?**  
   **Private** = **who** can see the repo. **Protected branch** = **who** can **push/merge** to **specific** branches. You can have **public** repo with **protected** \`main\`.

8. **Why require linear history?**  
   Some teams **disallow merge commits**—only **squash** or **rebase** merges—for a **straight** \`main\` log (**easier** \`git bisect\`).

9. **What is deployment branch protection?**  
   Rules tie **environment** deploy approvals to **branch** or **environment** protection—**extra** gates for **production**.

10. **What should a fresher remember in interviews?**  
    “**Protected main + PR + CI + review** reduces risk and is **standard** in industry.”

---

## Related tutorials — quick links (topic-wise)

| Topic | Tutorial link |
|-------|----------------|
| **Pull requests** | [GitHub Pull Requests](/tutorial/github-pull-requests) |
| **Team permissions** | [GitHub Teams](/tutorial/github-teams) |
| **Account & repo security** | [GitHub Security](/tutorial/github-security) |
| **Workflow context** | [Git Workflow](/tutorial/git-workflow) |
| **CI/CD pipelines** | [Git Deployment](/tutorial/git-deployment) |

## Production Baseline Policy (Recommended)

Use this baseline for most teams:

- Protect \`main\` and \`release/*\`
- Require PR + at least 2 approvals
- Require CI checks: build, test, lint, security scan
- Require branch up-to-date before merge
- Restrict force-push and deletion to admins only
- Enable "include administrators" for strict governance

This gives strong quality gates without excessive process overhead.

## Real Interview Scenario

**Question:** "A bug reached production even though branch protection exists. What likely failed?"

**Strong answer:** Rules may be incomplete: missing required checks, admin bypass enabled, stale approvals not dismissed, or CODEOWNERS not enforced. Fix by tightening merge prerequisites and auditing branch rule settings regularly.

Protecting your branches ensures code quality and prevents accidental changes to important code!
`
};

export default gitBranchProtection;

