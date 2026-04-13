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
   **Short Answer:** Main is protected to prevent unsafe direct changes and ensure every merge passes review and quality checks.  
   **Detailed Explanation:** In most teams, main represents deployable code, so uncontrolled direct pushes are a major risk. Branch protection adds policy gates before code can enter this branch. Typical gates include pull request requirement, minimum reviewer approvals, passing CI checks, and resolved conversations. These rules reduce accidental bugs, improve code quality, and enforce shared responsibility instead of one-person decisions. Interviewers often look for the idea that protection is not only technical but process governance. It creates a reliable path to production and helps teams scale safely. In short, protecting main turns risky manual behavior into consistent, enforceable engineering discipline.

2. **What is a required pull request review?**  
   **Short Answer:** It is a rule that blocks merge until a pull request receives the required number of approvals.  
   **Detailed Explanation:** Required review enforces peer validation before code is accepted. Instead of pushing directly, developers open pull requests and request feedback from teammates or code owners. The branch rule can define how many approvals are needed and whether stale approvals are dismissed after new commits. This prevents old reviews from approving changed code without recheck. In interviews, mention two benefits: defect detection and knowledge sharing. Reviews catch logic issues early and spread understanding across the team. It also builds accountability because the change is discussed and validated publicly. For production branches, required review is one of the most important protection settings.

3. **What are required status checks?**  
   **Short Answer:** They are automated checks like build and tests that must pass before a branch can be merged.  
   **Detailed Explanation:** Status checks connect your CI pipeline to branch policy. When enabled, merge stays blocked until selected checks report success, such as build, unit tests, lint, security scans, or integration tests. This prevents unverified code from entering protected branches. A key point for interviews is that required checks create objective, repeatable quality gates and reduce dependence on manual judgment alone. They also encourage healthy development habits because developers run and fix tests before requesting merge. Teams often combine status checks with review requirements for stronger reliability. Together, these controls significantly reduce broken main branches and production regressions.

4. **What is signed commit requirement?**  
   **Short Answer:** It enforces that commits are cryptographically signed so the author identity can be verified.  
   **Detailed Explanation:** Commit signing adds authenticity to repository history. Without signatures, commit identity can be spoofed by changing local config. With signed commits, GitHub can verify that the commit was produced by a trusted key associated with that account. This matters in regulated environments where auditability and provenance are critical. In interviews, explain that signing does not guarantee code quality, but it improves trust and traceability in who authored changes. Combined with branch protection, it strengthens supply chain security posture. Organizations with strict compliance often require signed commits on important branches to reduce impersonation and unauthorized changes in source history.

5. **What is \`CODEOWNERS\`?**  
   **Short Answer:** It is a repository file that maps paths to responsible people or teams for automatic review assignment.  
   **Detailed Explanation:** CODEOWNERS helps formalize ownership by directory or file pattern. When a pull request modifies matching paths, GitHub automatically requests review from listed owners. This ensures changes are reviewed by domain experts, not random reviewers. For example, backend team can own service files while DevOps team owns deployment config. In interviews, mention that CODEOWNERS improves accountability, review speed, and consistency, especially in larger repositories. It also works well with branch rules that require code owner review before merge. This setup prevents critical files from being changed without appropriate oversight and keeps architectural boundaries healthier over time.

6. **Can admins bypass branch protection?**  
   **Short Answer:** Yes in many setups, unless the rule explicitly applies to administrators too.  
   **Detailed Explanation:** By default, some branch protection policies allow administrators to bypass restrictions for emergencies. However, if the team enables rules that include administrators, even admins must follow the same review and check process. Interviewers want you to recognize this as a governance decision: flexibility versus strict control. Bypass can unblock urgent incidents but overuse weakens trust in process. Mature teams document when bypass is acceptable and audit such actions. Mentioning this balance shows practical understanding. The safest production approach is to minimize bypass usage and rely on normal pull request flow whenever possible, even for senior contributors.

7. **What is the difference between private repo and protected branch?**  
   **Short Answer:** Private repository controls visibility, while protected branch controls change permissions and merge conditions on specific branches.  
   **Detailed Explanation:** Repository privacy and branch protection solve different problems. Privacy decides who can view and access repository contents at all. Branch protection decides how critical branches may be modified by authorized users. You can have a private repository with weak branch rules, or a public repository with very strict branch rules. In interviews, explain that privacy is access scope, protection is change governance. Many teams mistakenly think private alone is secure enough, but internal mistakes can still happen without branch controls. Strong workflows combine both: controlled visibility plus merge gates like reviews, checks, and restrictions on direct pushes for key branches.

8. **Why require linear history?**  
   **Short Answer:** Linear history keeps commit flow simple, making debugging and release tracing easier.  
   **Detailed Explanation:** Linear history means main branch advances in a straight sequence without merge commit branches. Teams enforce this by using squash or rebase-based merges. The primary benefit is readability: commit timelines are simpler to scan, bisect, and audit. It can also make cherry-picking and rollback planning easier because history has fewer branching points. In interviews, mention tradeoff too: linear history may hide branch topology details that merge commits preserve. Different teams choose based on preferences and compliance needs. Showing this balanced view demonstrates mature understanding. The key point is that linear policy aims to improve maintainability and operational clarity, not just aesthetics.

9. **What is deployment branch protection?**  
   **Short Answer:** It adds extra safeguards so only approved, policy-compliant branch updates can trigger deployment to sensitive environments.  
   **Detailed Explanation:** Deployment branch protection connects source control policy with runtime risk control. For production environments, teams often require specific branches, successful checks, manual approvals, or environment protection rules before deployment jobs can proceed. This ensures not every push can trigger production release. In interviews, explain that this approach reduces accidental deployments and creates an auditable release path. It is especially useful in regulated domains where approvals and traceability are mandatory. Combined with branch protection, deployment guards provide end-to-end safety from code change to release execution. The result is fewer incidents and higher confidence in release governance.

10. **What should a fresher remember in interviews?**  
    **Short Answer:** Remember the core formula: protected main, pull requests, reviews, and required CI checks before merge.  
    **Detailed Explanation:** A strong fresher answer should communicate process clarity, not just command memory. Start by saying main branch should be protected from direct pushes. Then explain that all changes should come through pull requests where peers review code. Add that automated checks such as tests and build must pass before merge. Mention optional controls like code owners, signed commits, and administrator restrictions for stronger governance. This structure shows you understand how modern teams prevent defects and manage risk. Interviewers value candidates who link GitHub features to practical team outcomes like quality, traceability, and safer production releases.

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

---

## Deep Theory: Branch Protection as Governance Layer

Branch protection converts repository usage from trust-based behavior to policy-enforced behavior.

### Control Objectives

- prevent unsafe direct modification of critical branches,
- require multi-party validation for change acceptance,
- couple code integration to objective quality signals.

### Why This Is Architectural, Not Administrative

In scaled teams, branch protection is part of socio-technical system design. It encodes reliability rules into tooling so process quality does not depend on individual discipline alone.

### Core Principle

Merge rights should represent validated change readiness, not merely write access. Protected branches operationalize this principle.
`
};

export default gitBranchProtection;

