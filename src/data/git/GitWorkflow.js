const gitWorkflow = {
  id: 'git-workflow',
  title: 'Git Workflow - Best Practices',
  description: 'Learn professional Git workflows including feature branch workflow, Git Flow, and collaboration best practices.',
  courseTitle: 'Git & GitHub',
  sectionTitle: 'GitHub Basics',
  content: `
# Git Workflow - Best Practices

A good Git workflow helps teams work together smoothly. Let's learn the most common workflows used in professional development.

---

## Feature Branch Workflow

This is the most common workflow. Perfect for small to medium teams.

### How It Works:

1. **Main branch** = Production-ready code
2. **Feature branches** = New features being developed
3. **Pull Requests** = Code review before merging

### Workflow Steps:

\`\`\`bash
# 1. Start from main
git checkout main
git pull origin main

# 2. Create feature branch
git checkout -b feature-user-profile

# 3. Work on feature
# ... make changes ...
git add .
git commit -m "Add user profile page"

# 4. Push branch
git push -u origin feature-user-profile

# 5. Create Pull Request on GitHub
# 6. Get code review
# 7. Address feedback
git add .
git commit -m "Fix PR feedback"
git push

# 8. After approval, merge on GitHub
# 9. Update local main
git checkout main
git pull origin main
git branch -d feature-user-profile
\`\`\`

**Benefits:**
- Simple and easy to understand
- Good for most projects
- Clear separation of features

---

## Git Flow Workflow

More structured workflow for larger projects with releases.

### Branch Types:

- **main**: Production code
- **develop**: Integration branch
- **feature/**: New features
- **release/**: Preparing releases
- **hotfix/**: Urgent production fixes

### Workflow:

\`\`\`bash
# Feature development
git checkout develop
git checkout -b feature/shopping-cart
# ... work on feature ...
git checkout develop
git merge feature/shopping-cart

# Release preparation
git checkout -b release/1.0.0
# ... fix bugs, update version ...
git checkout main
git merge release/1.0.0
git tag v1.0.0

# Hotfix (urgent production fix)
git checkout main
git checkout -b hotfix/payment-bug
# ... fix bug ...
git checkout main
git merge hotfix/payment-bug
git checkout develop
git merge hotfix/payment-bug
\`\`\`

**When to use:**
- Large projects
- Regular releases
- Need for versioning

---

## Forking Workflow

Common for open source projects.

### How It Works:

1. **Fork** the original repository (creates your copy)
2. **Clone** your fork
3. **Work** on your fork
4. **Pull Request** to original repository

### Workflow:

\`\`\`bash
# 1. Fork repository on GitHub (click Fork button)

# 2. Clone your fork
git clone https://github.com/yourusername/project.git

# 3. Add original as upstream
git remote add upstream https://github.com/originalowner/project.git

# 4. Create feature branch
git checkout -b feature-new-feature

# 5. Work and commit
git add .
git commit -m "Add new feature"

# 6. Push to your fork
git push -u origin feature-new-feature

# 7. Create PR to original repository

# 8. Keep your fork updated
git checkout main
git fetch upstream
git merge upstream/main
git push origin main
\`\`\`

**When to use:**
- Contributing to open source
- You don't have write access
- Want to experiment freely

---

## Daily Workflow Example

Here's what a typical day looks like:

### Morning: Start Work

\`\`\`bash
# Get latest code
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/add-product-search
\`\`\`

### During Day: Make Changes

\`\`\`bash
# Make changes
# ... write code ...

# Commit frequently
git add .
git commit -m "Add search input field"

# More changes
git add .
git commit -m "Implement search functionality"

# Push to backup
git push
\`\`\`

### End of Day: Wrap Up

\`\`\`bash
# Push final changes
git push

# Create Pull Request on GitHub
# (Or continue tomorrow)
\`\`\`

---

## Commit Message Best Practices

Good commit messages help everyone understand changes:

### Format:

\`\`\`bash
git commit -m "Type: Short description

Longer explanation if needed
- What changed
- Why it changed
- Any breaking changes"
\`\`\`

### Types:

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation
- **style**: Formatting
- **refactor**: Code restructuring
- **test**: Adding tests
- **chore**: Maintenance

### Examples:

**Good commit messages:**
\`\`\`bash
git commit -m "feat: Add user login functionality

- Implement LoginService class
- Add authentication endpoint
- Include unit tests"
\`\`\`

**Bad commit messages (avoid these):**
\`\`\`bash
git commit -m "update"
git commit -m "fix"
git commit -m "changes"
\`\`\`

---

## Handling Merge Conflicts

When two people change the same code:

### Step 1: Pull Latest Changes

\`\`\`bash
git checkout main
git pull origin main
\`\`\`

### Step 2: Merge into Your Branch

\`\`\`bash
git checkout feature-your-branch
git merge main
\`\`\`

### Step 3: Resolve Conflicts

Git will show conflicts:
\`\`\`
<<<<<<< HEAD
Your code
=======
Their code
>>>>>>> main
\`\`\`

Edit the file to resolve:
- Keep your code?
- Keep their code?
- Combine both?
- Write new code?

### Step 4: Mark as Resolved

\`\`\`bash
git add conflicted-file.java
git commit -m "Resolve merge conflicts"
\`\`\`

---

## Real-World Java Project Example

Let's see a complete workflow for a Java web application:

\`\`\`bash
# Project: E-Commerce Application

# Day 1: Setup
git clone https://github.com/team/ecommerce.git
cd ecommerce
git checkout -b feature/product-catalog

# Day 2: Add Product Model
echo 'public class Product { }' > Product.java
git add Product.java
git commit -m "feat: Add Product model class"

# Day 3: Add Product Service
echo 'public class ProductService { }' > ProductService.java
git add ProductService.java
git commit -m "feat: Add ProductService for business logic"

# Day 4: Add Product Servlet
echo 'public class ProductServlet extends HttpServlet { }' > ProductServlet.java
git add ProductServlet.java
git commit -m "feat: Add ProductServlet for handling requests"

# Day 5: Push and Create PR
git push -u origin feature/product-catalog
# Create PR on GitHub

# Day 6: Address Review Feedback
# ... make changes ...
git add .
git commit -m "fix: Address PR feedback - improve error handling"
git push

# Day 7: After Merge
git checkout main
git pull origin main
git branch -d feature/product-catalog
\`\`\`

---

## Best Practices Summary

### 1. Commit Often
- Small, logical commits
- Easier to understand
- Easier to revert if needed

### 2. Write Good Messages
- Clear and descriptive
- Explain what and why
- Use conventional format

### 3. Use Branches
- One feature per branch
- Keep main stable
- Easy to experiment

### 4. Pull Before Push
- Get latest changes
- Avoid conflicts
- Stay in sync

### 5. Review Before Merging
- Use Pull Requests
- Get feedback
- Maintain quality

### 6. Keep Branches Clean
- Delete merged branches
- Regular cleanup
- Clear branch names

---

## Common Mistakes to Avoid

**Don't commit directly to main**
Instead, use feature branches

**Don't make large, infrequent commits**
Instead, make small, frequent commits

**Don't write vague commit messages**
Instead, write clear, descriptive messages

**Don't forget to pull before pushing**
Always pull first to get the latest changes

**Don't mix multiple features in one branch**
Keep one feature per branch

---

## Summary

You've learned:
- Feature Branch Workflow
- Git Flow Workflow
- Forking Workflow
- Daily workflow practices
- Commit message best practices
- Handling merge conflicts
- Common mistakes to avoid

**Next Steps:**
- Practice these workflows
- Find what works for your team
- Establish team conventions

---

## 10 Important Git Workflow Interview Questions

1. **What is Git Flow at a high level?**  
   **Short Answer:** Git Flow is a structured branching model with dedicated branch types for feature, release, and hotfix management.  
   **Detailed Explanation:** Git Flow separates development concerns into long-lived and short-lived branches. Main typically represents production state, develop is integration branch, feature branches hold active work, release branches prepare versions, and hotfix branches handle urgent production bugs. This model provides clear release control and is useful in organizations with scheduled release cycles and formal QA phases. Interviewers may ask this to test whether you understand workflow complexity tradeoffs. You should mention that Git Flow can feel heavy for fast-moving teams, but still valuable in regulated or large enterprise environments. Choosing workflow should match team size, release process, and governance needs.

2. **What is trunk-based development?**  
   **Short Answer:** Trunk-based development centers around frequent integration to one primary branch with very short-lived branches.  
   **Detailed Explanation:** Trunk-based workflow emphasizes small, continuous integration steps to reduce merge complexity and improve delivery speed. Developers either commit directly to trunk with safeguards or use very short feature branches that merge quickly through pull requests. Strong automated testing and branch protection are essential because integration happens frequently. Interviewers value candidates who connect this model to reduced long-lived divergence and faster feedback. Mention feature flags as a common companion for incomplete work. This approach works well for teams pursuing continuous delivery, but it requires discipline in test quality and code review responsiveness to remain stable.

3. **What is a feature branch workflow?**  
   **Short Answer:** Each change is developed on its own branch and merged through pull request review into the main branch.  
   **Detailed Explanation:** Feature branch workflow is the most common modern team approach because it balances isolation and collaboration. Developers branch from main, implement one scoped change, push branch, and open pull request for review and CI checks. After approval, branch is merged and typically deleted. Interviewers like this pattern because it is simple, scalable, and compatible with branch protection. Mentioning benefits such as clean review context, safer experimentation, and easier rollback shows practical understanding. It is often preferred over heavier models for small and medium teams with frequent delivery cadence and strong CI support.

4. **What is forking workflow?**  
   **Short Answer:** Forking workflow lets contributors work in their own repository copy and submit changes back via pull requests.  
   **Detailed Explanation:** In forking model, contributors do not push directly to original repository. Instead, they create personal fork, clone it locally, and open pull requests to upstream project. This provides security and permission control, especially for open-source communities where many contributors are external. Interviewers often expect awareness that upstream sync and fork maintenance are part of daily operations in this model. Mention that forking protects project integrity while enabling broad participation. It is less common for internal teams with shared write access but remains standard in public collaboration scenarios and large community-driven projects.

5. **Why “pull before push”?**  
   **Short Answer:** Pulling first syncs your branch with latest remote changes and reduces push rejection and conflict surprises.  
   **Detailed Explanation:** Shared branches evolve quickly, so pushing without syncing can fail or create avoidable conflicts. Pulling first updates your local view and gives you chance to resolve conflicts before publishing. This keeps branch history cleaner and prevents last-minute panic in collaborative work. Interviewers value this as a professional habit rather than optional step. You can also mention fetch plus explicit merge or rebase for safer visibility before integration. The core idea is that proactive synchronization reduces disruption and supports smoother team velocity. Small daily discipline here prevents many common Git workflow frustrations.

6. **What makes a good commit in a workflow?**  
   **Short Answer:** Good workflow commits are small, logical, and clearly described so others can review and recover changes easily.  
   **Detailed Explanation:** A high-quality commit represents one clear intention, such as fixing a bug or adding a focused capability. When commits are too large or mixed, reviews become slow and rollback becomes risky. Clear messages explain context and improve future debugging, release notes, and historical understanding. Interviewers often assess whether you think about team readability, not just personal speed. Mention atomicity, descriptive messages, and predictable structure. Even when teams use squash merge, commit hygiene during development still improves local troubleshooting and review iterations. Commit quality is foundational to healthy workflow outcomes.

7. **How do workflows relate to CI/CD?**  
   **Short Answer:** Workflow rules determine when automation runs and what quality gates must pass before code can ship.  
   **Detailed Explanation:** Git workflow and CI CD are tightly connected. Branching strategy, pull request rules, required checks, and merge policies define how code moves from development to release. For example, pull requests may run test pipelines, while merge to main may trigger staging or production deployment. Interviewers look for understanding that workflow is not only developer preference but release governance mechanism. Strong workflows reduce failed deployments by enforcing validation and review earlier. Mention branch protection and environment approvals as integration points between source control and delivery automation. This shows end-to-end thinking from commit to production.

8. **What is environment branching (concept)?**  
   **Short Answer:** Environment branching maps specific branches to deployment environments like staging and production.  
   **Detailed Explanation:** Some teams align branches with runtime environments, such as develop for integration testing and main for production. This can simplify deployment mapping, but it may also increase merge overhead if many long-lived environment branches diverge. Interviewers appreciate candidates who know alternatives, like deploying from tags or single main branch with feature flags. A balanced answer explains that environment mapping should match release complexity, compliance needs, and team maturity. The goal is predictable promotion flow with minimal manual confusion. Understanding multiple approaches shows flexibility and practical architecture awareness rather than rigid workflow dogma.

9. **Who should resolve merge conflicts—the author or reviewer?**  
   **Short Answer:** Usually the pull request author resolves conflicts because they best understand the intent of their changes.  
   **Detailed Explanation:** Conflict resolution is not just syntactic cleanup; it requires understanding feature behavior and design intent. The author usually has best context to make correct integration decisions, so they should resolve conflicts and rerun tests before re-requesting review. Reviewers can assist when domain ownership overlaps or conflict is complex, but final responsibility typically remains with author. Interviewers look for ownership mindset and collaboration awareness in this answer. Mentioning retesting after conflict resolution is important because manually merged code can introduce subtle bugs. This reflects production-safe engineering habits and team accountability.

10. **How do you choose a workflow?**  
    **Short Answer:** Choose workflow based on team scale, release frequency, compliance requirements, and automation maturity.  
    **Detailed Explanation:** There is no universal best workflow. Small product teams with continuous delivery often prefer feature branches with quick merges or trunk-based practices. Enterprises with formal release approvals may choose Git Flow style separation. Interviewers want you to justify choices using constraints, not trends. A strong answer includes how branch protection, CI reliability, reviewer capacity, and incident tolerance influence workflow design. Mention that teams should document conventions and revisit them as project grows. This shows pragmatic thinking and adaptability, both valued in real engineering environments where process must evolve with product and organization.

---

## Related tutorials — quick links (topic-wise)

| Topic | Tutorial link |
|-------|----------------|
| **Branches & merge** | [Git Branches](/tutorial/git-branches) |
| **PR mechanics** | [GitHub Pull Requests](/tutorial/github-pull-requests) |
| **Repo & remote basics** | [GitHub Basics](/tutorial/github-basics) |
| **Automation & deploy** | [Git Deployment](/tutorial/git-deployment) |
| **Software lifecycle** | [SDLC Introduction](/tutorial/sdlc-introduction) |

## Team Workflow Contract (What to Standardize)

Document these repo-level conventions so everyone works the same way:

- Branch naming pattern (\`feature/\`, \`bugfix/\`, \`hotfix/\`)
- PR size target (for example, < 400 changed lines when possible)
- Required checks before merge (build, tests, lint, security)
- Commit message format (\`feat:\`, \`fix:\`, \`docs:\` etc.)
- Merge strategy (squash vs merge commit vs rebase)

Consistency reduces onboarding time and production mistakes.

## Weekly Workflow Health Review

Track these signals:

- PR review turnaround time
- Number of stale branches older than 14 days
- Reopened bugs linked to recent merges
- Failed CI rate on default branch

Use metrics to improve process instead of adding random rules.

A good workflow makes development smoother and more professional!
`
};

export default gitWorkflow;

