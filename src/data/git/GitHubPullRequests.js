const githubPullRequests = {
  id: 'github-pull-requests',
  title: 'GitHub Pull Requests - Collaboration',
  description: 'Learn how to create pull requests, review code, merge changes, and collaborate effectively on GitHub.',
  courseTitle: 'Git & GitHub',
  sectionTitle: 'GitHub Basics',
  content: `
# GitHub Pull Requests - Collaboration Made Easy

Pull Requests (PRs) are how teams collaborate on GitHub. They let you:
- Propose changes to a project
- Review code before merging
- Discuss changes
- Merge code safely

Think of a Pull Request as saying: **"Hey, I made some changes. Can you review them and merge if they look good?"**

---

## What is a Pull Request?

A **Pull Request** (PR) is a way to:
1. Show your changes to others
2. Get feedback before merging
3. Discuss the code
4. Merge changes into the main branch

It's like a **code review request**.

---

## Why Use Pull Requests?

**Benefits:**
- **Code Review**: Others can check your code
- **Discussion**: Talk about changes before merging
- **Quality**: Catch bugs before they reach main
- **Learning**: See how others code
- **Documentation**: PRs document what changed and why

---

## Creating Your First Pull Request

### Scenario: Adding a Feature

Let's say you want to add a login feature to a project:

### Step 1: Fork or Clone the Repository

**If it's your own project:**
\`\`\`bash
git clone https://github.com/yourusername/project.git
cd project
\`\`\`

**If it's someone else's project:**
1. Click "Fork" on GitHub (creates your copy)
2. Clone your fork:
\`\`\`bash
git clone https://github.com/yourusername/project.git
\`\`\`

### Step 2: Create a Feature Branch

\`\`\`bash
git checkout -b feature-user-login
\`\`\`

### Step 3: Make Your Changes

\`\`\`bash
# Create login service
echo 'public class LoginService {
    public boolean login(String username, String password) {
        // Login logic
        return true;
    }
}' > LoginService.java

# Stage and commit
git add LoginService.java
git commit -m "Add LoginService class for user authentication"
\`\`\`

### Step 4: Push Your Branch

\`\`\`bash
git push -u origin feature-user-login
\`\`\`

### Step 5: Create Pull Request on GitHub

1. Go to your repository on GitHub
2. You'll see a banner: **"feature-user-login had recent pushes"**
3. Click **"Compare & pull request"**
4. Fill in the PR:
   - **Title**: "Add user login functionality"
   - **Description**: Explain what you did and why
5. Click **"Create pull request"**

---

## Writing a Good Pull Request

### Good PR Title:
**Good examples:**
- "Add user login functionality"
- "Fix payment calculation bug"
- "Update README with installation instructions"

**Bad examples (avoid these):**
- "Changes"
- "Update"
- "Fix"

### Good PR Description:

\`\`\`markdown
## What Changed
- Added LoginService class for user authentication
- Implemented username/password validation
- Added unit tests

## Why
Users need to log in to access the application. This PR adds the core login functionality.

## Testing
- Tested with valid credentials ✓
- Tested with invalid credentials ✓
- All unit tests pass ✓
\`\`\`

---

## Reviewing a Pull Request

When someone creates a PR, you can:

### 1. View Changes
- See all files that changed
- See line-by-line differences
- See additions (green) and deletions (red)

### 2. Add Comments
- Click on a line number
- Add a comment
- Ask questions or suggest improvements

### 3. Approve or Request Changes
- **Approve**: Code looks good, ready to merge
- **Request changes**: Needs fixes before merging
- **Comment**: Just adding feedback

---

## Merging a Pull Request

Once the PR is approved:

1. Click **"Merge pull request"**
2. Choose merge type:
   - **Create a merge commit**: Keeps PR history
   - **Squash and merge**: Combines all commits into one
   - **Rebase and merge**: Clean linear history
3. Click **"Confirm merge"**
4. Delete the branch (optional but recommended)

---

## Responding to PR Feedback

If someone requests changes:

### Step 1: Make the Changes

\`\`\`bash
# Switch to your branch
git checkout feature-user-login

# Make the requested changes
# ... edit files ...

# Commit the fixes
git add .
git commit -m "Address PR feedback: improve error handling"
\`\`\`

### Step 2: Push the Updates

\`\`\`bash
git push
\`\`\`

The PR automatically updates with your new commits!

### Step 3: Respond to Comments

On GitHub, reply to comments:
- "Thanks, I've fixed that!"
- "Good catch, updated!"
- "I'll address this in a follow-up PR"

---

## Real-World Workflow Example

Let's say you're working on a Java web application:

\`\`\`bash
# 1. Get latest code
git checkout main
git pull origin main

# 2. Create feature branch
git checkout -b feature-shopping-cart

# 3. Work on feature
# ... create Cart.java, CartServlet.java ...
git add .
git commit -m "Add shopping cart functionality"

# 4. Push branch
git push -u origin feature-shopping-cart

# 5. Create PR on GitHub
# (Fill in title, description, request reviewers)

# 6. Address feedback
# ... make changes ...
git add .
git commit -m "Fix PR feedback: improve cart validation"
git push

# 7. After approval, merge on GitHub
# 8. Clean up locally
git checkout main
git pull origin main
git branch -d feature-shopping-cart
\`\`\`

---

## Best Practices for Pull Requests

### 1. Keep PRs Small
- One feature per PR
- Easier to review
- Faster to merge

### 2. Write Clear Descriptions
- What changed?
- Why?
- How to test?

### 3. Request Reviewers
- Ask specific people
- Tag relevant team members

### 4. Respond to Feedback
- Be open to suggestions
- Address all comments
- Ask questions if unclear

### 5. Keep PRs Updated
- Rebase on main regularly
- Resolve conflicts quickly

---

## Common PR Scenarios

### Scenario 1: Adding a New Feature

1. Create feature branch
2. Implement feature
3. Add tests
4. Create PR
5. Get review
6. Merge

### Scenario 2: Fixing a Bug

1. Create bugfix branch: \`bugfix-payment-error\`
2. Fix the bug
3. Add test to prevent regression
4. Create PR
5. Merge quickly (if urgent)

### Scenario 3: Updating Documentation

1. Create docs branch
2. Update README/docs
3. Create PR
4. Usually quick to merge

---

## Pull Request Commands

| Action | Command |
|--------|---------|
| Create branch | \`git checkout -b feature-name\` |
| Push branch | \`git push -u origin feature-name\` |
| Update PR | \`git push\` (after committing) |
| Sync with main | \`git pull origin main\` |

---

## Summary

You've learned:
- What Pull Requests are
- How to create a PR
- How to review PRs
- How to merge PRs
- How to respond to feedback
- Best practices for collaboration

**Next Steps:**
- Practice creating PRs
- Learn about code review best practices
- Explore GitHub's collaboration features

---

## 10 Important Pull Request Interview Questions

1. **What is a Pull Request (PR)?**  
   A **request to merge** one branch into another (often **feature → main**) with **discussion**, **diff**, **checks**, and **reviews** on GitHub. It’s the main **quality gate** in team development.

2. **Why not push directly to \`main\`?**  
   **\`main\`** should stay **deployable**. PRs force **review**, **CI tests**, and **conversation** before merge—reduces **breaking production**.

3. **What is a draft PR?**  
   Signals **work in progress**—reviewers know it’s **not** ready to merge. Good for **early feedback** on direction.

4. **What do reviewers look for?**  
   **Correctness**, **tests**, **readability**, **security** (no secrets), **performance** hot spots, and **style** per team guidelines. **Comments** should be **specific** and **kind**.

5. **What is CI on a PR?**  
   **Continuous Integration** runs automated **build/test** (e.g. GitHub Actions + **\`mvn test\`**) on every push. **Green checks** give confidence before merge.

6. **How do you update a PR after feedback?**  
   Commit on the **same branch** and **push**—GitHub **updates** the PR automatically. Prefer **small follow-up commits** or **squash** per team rules.

7. **What is merge vs squash merge vs rebase merge?**  
   **Merge:** preserves branch topology with a merge commit. **Squash:** one commit on target—clean history, loses per-commit detail on main. **Rebase:** replays commits linearly—**policy** varies by team.

8. **What is a CODEOWNERS file?**  
   Auto-requests **review** from the right people for paths (e.g. **\`*.java\`** → backend team). Part of **scale** collaboration.

9. **How do you handle merge conflicts on a PR?**  
   **Pull** or **merge** target branch into your feature branch (or **rebase** onto target), **resolve** conflicts locally, **push**—PR updates.

10. **What closes an issue from a PR?**  
    In the PR description or a commit message: **\`Fixes #42\`**—GitHub **links** and can **auto-close** the issue when merged.

---

## Related tutorials — quick links (topic-wise)

| Topic | Tutorial link |
|-------|----------------|
| **Clone & remotes** | [GitHub Basics](/tutorial/github-basics) |
| **Feature branches** | [Git Branches](/tutorial/git-branches) |
| **Team branching models** | [Git Workflow](/tutorial/git-workflow) |
| **Protected main & rules** | [Git Branch Protection](/tutorial/git-branch-protection) |
| **SDLC / delivery context** | [SDLC Introduction](/tutorial/sdlc-introduction) |

Pull Requests are essential for professional development - master them!
`
};

export default githubPullRequests;

