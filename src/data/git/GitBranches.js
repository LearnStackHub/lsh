const gitBranches = {
  id: 'git-branches',
  title: 'Git Branches - Working with Branches',
  description: 'Learn how to create, switch, merge, and delete branches. Understand branching strategy for collaborative development.',
  courseTitle: 'Git & GitHub',
  sectionTitle: 'Git Basics',
  content: `
# Git Branches - Working with Branches

Branches are one of Git's most powerful features. They let you work on different features or experiments without affecting your main code. Think of branches as parallel universes for your code.

## What is a Branch?

A **branch** is like a separate timeline for your code. You can create a branch to:
- Work on a new feature
- Fix a bug
- Experiment with new ideas
- Work on different versions

All without affecting your main code!

## Why Use Branches?

**Without branches:**
- You're afraid to experiment (might break working code)
- Can't work on multiple features at once
- Hard to collaborate with others
- Risky to make changes

**With branches:**
- Experiment safely
- Work on multiple features simultaneously
- Easy collaboration
- Isolated changes

---

## Understanding the Main Branch

When you initialize a Git repository, you automatically get a **main** branch (or **master** in older Git versions). This is your primary branch - usually where your stable, working code lives.

---

## Creating Your First Branch

Let's create a branch to work on a new feature:

\`\`\`bash
git branch feature-login
\`\`\`

This creates a new branch called \`feature-login\` but doesn't switch to it yet.

**List all branches:**
\`\`\`bash
git branch
\`\`\`

**Output:**
\`\`\`
  feature-login
* main
\`\`\`

The \`*\` shows you're currently on the \`main\` branch.

---

## Switching Between Branches

To switch to your new branch:

\`\`\`bash
git checkout feature-login
\`\`\`

**Or use the newer command:**
\`\`\`bash
git switch feature-login
\`\`\`

**Check which branch you're on:**
\`\`\`bash
git branch
\`\`\`

**Output:**
\`\`\`
* feature-login
  main
\`\`\`

Now you're on \`feature-login\`!

---

## Creating and Switching in One Command

You can create and switch to a branch at the same time:

\`\`\`bash
git checkout -b feature-login
\`\`\`

**Or:**
\`\`\`bash
git switch -c feature-login
\`\`\`

---

## Working on a Branch

Now you can make changes safely:

\`\`\`bash
# Create a new file for login feature
echo 'public class LoginService {
    public boolean authenticate(String username, String password) {
        // Login logic here
        return true;
    }
}' > LoginService.java

# Stage and commit
git add LoginService.java
git commit -m "Add LoginService class"
\`\`\`

These changes are **only on the feature-login branch**, not on main!

---

## Viewing Branch History

See commits on current branch:

\`\`\`bash
git log --oneline
\`\`\`

**See all branches:**
\`\`\`bash
git log --oneline --all --graph
\`\`\`

This shows a visual representation of all branches.

---

## Merging Branches

Once your feature is complete, you want to merge it back into main:

### Step 1: Switch to Main Branch

\`\`\`bash
git switch main
\`\`\`

### Step 2: Merge the Feature Branch

\`\`\`bash
git merge feature-login
\`\`\`

**Output:**
\`\`\`
Updating abc1234..def5678
Fast-forward
 LoginService.java | 5 +++++
 1 file changed, 5 insertions(+)
 create mode 100644 LoginService.java
\`\`\`

Your feature is now in main! 🎉

---

## Deleting Branches

After merging, you can delete the feature branch:

\`\`\`bash
git branch -d feature-login
\`\`\`

**Force delete (if not merged):**
\`\`\`bash
git branch -D feature-login
\`\`\`

---

## Common Branching Workflow

Here's a typical workflow:

\`\`\`bash
# Start on main
git checkout main

# Create feature branch
git checkout -b feature-user-profile

# Work on feature
# ... make changes ...
git add .
git commit -m "Add user profile page"

# More work
# ... make changes ...
git add .
git commit -m "Add profile picture upload"

# Switch back to main
git checkout main

# Merge feature
git merge feature-user-profile

# Delete feature branch
git branch -d feature-user-profile
\`\`\`

---

## Branch Naming Conventions

Good branch names are descriptive:

**Good examples:**
- \`feature-user-login\`
- \`bugfix-payment-error\`
- \`hotfix-security-patch\`
- \`experiment-new-algorithm\`

**Bad examples (avoid these):**
- \`branch1\`
- \`test\`
- \`new-feature\`
- \`fix\`

---

## Real-World Example: Java Web Application

Let's say you're building an e-commerce site:

\`\`\`bash
# Main branch has working code
git checkout main

# Create branch for shopping cart feature
git checkout -b feature-shopping-cart

# Work on shopping cart
# ... create Cart.java, CartServlet.java ...
git add .
git commit -m "Add shopping cart functionality"

# Create branch for payment (from main)
git checkout main
git checkout -b feature-payment

# Work on payment
# ... create PaymentService.java ...
git add .
git commit -m "Add payment processing"

# Merge shopping cart
git checkout main
git merge feature-shopping-cart

# Merge payment
git merge feature-payment

# Clean up
git branch -d feature-shopping-cart
git branch -d feature-payment
\`\`\`

---

## Branch Commands Summary

| Command | Purpose |
|---------|---------|
| \`git branch\` | List all branches |
| \`git branch <name>\` | Create a branch |
| \`git checkout <name>\` | Switch to branch |
| \`git switch <name>\` | Switch to branch (newer) |
| \`git checkout -b <name>\` | Create and switch |
| \`git switch -c <name>\` | Create and switch (newer) |
| \`git merge <name>\` | Merge branch into current |
| \`git branch -d <name>\` | Delete branch |
| \`git branch -D <name>\` | Force delete branch |

---

## Best Practices

1. **Keep main stable**: Only merge working, tested code
2. **Use descriptive names**: Know what each branch is for
3. **Delete merged branches**: Keep your branch list clean
4. **One feature per branch**: Don't mix multiple features
5. **Merge often**: Don't let branches get too far behind main

---

## Summary

You've learned:
- What branches are and why they're useful
- How to create and switch branches
- How to merge branches
- How to delete branches
- Best practices for branching

**Next Steps:**
- Learn about remote repositories (GitHub)
- Understand pull requests
- Learn advanced merging strategies

---

## 10 Important Git Branches Interview Questions

1. **What is a branch in Git?**  
   **Short Answer:** A branch is a movable pointer to a commit line, letting you work in isolation without disturbing other work.  
   **Detailed Explanation:** In Git, a branch is not a full copy of files but a lightweight reference to the latest commit in a line of development. When you commit on that branch, the pointer moves forward. This design makes branching fast and cheap, which is why teams create many short-lived feature branches. Main usually contains stable code, while feature branches are used for new work, bug fixes, or experiments. Interviewers expect you to explain branch purpose in collaboration: parallel development with controlled integration. Understanding branches is fundamental to pull requests, merges, release workflows, and conflict management in team projects.

2. **How do you create and switch branches?**  
   **Short Answer:** You can create with branch command and switch with switch command, or do both together with create-and-switch options.  
   **Detailed Explanation:** Branch creation and switching are basic daily operations. You can create a branch first, then switch to it, or create and switch in one step. Modern Git encourages switch for readability, while older tutorials use checkout. In interviews, mention that command choice is less important than safe workflow: always start from updated base branch, create a clearly named feature branch, commit changes there, and only merge through review. This shows practical discipline. Also mention verifying current branch before committing, because many beginner mistakes happen by committing directly to main or wrong feature branch due to lack of branch awareness.

3. **What is \`git merge\`?**  
   **Short Answer:** Merge combines changes from another branch into your current branch.  
   **Detailed Explanation:** Merge integrates two development lines so both sets of commits are represented in one branch. If current branch has not diverged, Git may fast-forward by moving pointer ahead. If both branches have unique commits, Git creates a merge commit joining histories. In interviews, explain that merge is about integration, not copying files manually. Also mention good practice: update target branch first, run tests after merge, and resolve conflicts carefully before pushing. Teams often merge feature branches into main through pull requests, where merge strategy is controlled by repository policy. A clear merge explanation shows readiness for collaborative development.

4. **What is a fast-forward merge?**  
   **Short Answer:** It is a merge where Git only moves the branch pointer forward because no divergent commits exist.  
   **Detailed Explanation:** Fast-forward merge happens when target branch is directly behind source branch. Since there is no split history to reconcile, Git simply advances the pointer and does not create an extra merge commit. This keeps history linear and simple. However, some teams disable fast-forward for feature branches to preserve branch context through explicit merge commits. Interviewers appreciate when you mention both behavior and policy choice. The key concept is that fast-forward is possible only when target has not advanced independently. Understanding this helps explain why same merge command sometimes creates a merge commit and sometimes does not.

5. **What is a merge conflict?**  
   **Short Answer:** A merge conflict occurs when Git cannot automatically decide how to combine overlapping changes from different branches.  
   **Detailed Explanation:** Conflicts usually happen when two branches edit the same lines or one side modifies a file that the other side deleted. Git marks conflict regions and pauses merge so a human can choose final code. Good conflict resolution requires understanding intent of both changes, not just removing markers. After editing, you stage resolved files and complete merge. In interviews, mention that running tests afterward is essential because manual resolution can introduce logical errors. Also mention prevention habits: frequent synchronization with main and smaller pull requests reduce conflict size. This demonstrates both technical and workflow maturity.

6. **How do you delete a branch safely?**  
   **Short Answer:** Use safe delete after merge so Git prevents accidental loss of unmerged branch work.  
   **Detailed Explanation:** Safe branch deletion checks whether the branch is fully merged before removal. If not merged, Git blocks deletion to protect potentially valuable commits. Force deletion skips this guard and should be used carefully, typically for abandoned local experiments. In interviews, explain that branch cleanup is good hygiene because it keeps branch lists understandable and reduces confusion. Also note local and remote deletion are separate actions in team workflows. Mature teams regularly remove merged branches after pull request completion. This keeps repository navigation clear and reduces the chance that developers continue work on outdated or already integrated branches.

7. **What is \`git branch -a\`?**  
   **Short Answer:** It lists all local branches and remote-tracking branches in one view.  
   **Detailed Explanation:** This command helps you understand branch availability across local repository and connected remotes. Local branches are ones you can directly commit to, while remote-tracking branches reflect the latest known state of remote branches. Interviewers ask this to see if you understand distributed workflow fundamentals. Knowing what exists remotely helps when creating tracking branches, cleaning stale branches, or checking if a teammate has already pushed a feature line. It is especially useful in large repositories where many branches are active. Good branch awareness prevents mistakes like working from outdated references or duplicating branch names.

8. **Why use short-lived feature branches?**  
   **Short Answer:** Short-lived branches reduce drift, simplify reviews, and make integration safer and faster.  
   **Detailed Explanation:** The longer a branch lives, the more the base branch changes, increasing conflict risk and integration difficulty. Short-lived feature branches keep change sets focused and easier to review. They also improve feedback speed because pull requests are smaller and can be merged quickly. In interviews, mention that short branches support continuous integration habits and reduce large risky merges at the end of a sprint. This approach is common in modern workflows, including trunk-based development variants. Teams that keep branches small usually produce cleaner history and have fewer painful merge sessions, especially in fast-moving codebases.

9. **What is \`HEAD\` on a branch?**  
   **Short Answer:** HEAD indicates your current checkout position and normally points to the active branch tip.  
   **Detailed Explanation:** HEAD is Git's current context pointer. In normal branch work, HEAD references a branch, and that branch references the latest commit. When you switch branches, HEAD moves to the selected branch. If HEAD points directly to a commit, you are in detached state. Interviewers ask this because many operations, such as reset, merge, and checkout behavior, are easier to understand with correct pointer model. Mentioning detached HEAD and safe recovery by creating a branch from that point shows practical knowledge. Clear pointer understanding helps avoid accidental lost work and improves command confidence.

10. **Difference between merge and rebase (conceptual)?**  
    **Short Answer:** Merge combines histories as they are, while rebase rewrites commit sequence to create a cleaner linear history.  
    **Detailed Explanation:** Merge preserves true branch structure by creating a merge commit when needed, so you can see when parallel work converged. Rebase takes commits from one branch and reapplies them on top of another base, which produces a straighter history but changes commit ids. In interviews, stress safety rule: rebasing local private branches is common, rebasing shared published branches can disrupt teammates. Teams choose strategy based on traceability and history preferences. Knowing both tools and when to use each is important. Good engineers optimize for clarity and collaboration, not only pretty commit graphs.

---

## Related tutorials — quick links (topic-wise)

| Topic | Tutorial link |
|-------|----------------|
| **Staging & commits** | [Git Basics](/tutorial/git-basics) |
| **Merge strategies & conflicts** | [Git Merge Config](/tutorial/git-merge-config) |
| **Undo mistakes** | [Git Revert](/tutorial/git-revert) |
| **PRs from branches** | [GitHub Pull Requests](/tutorial/github-pull-requests) |
| **Daily team habits** | [Git Workflow](/tutorial/git-workflow) |

## Branch Naming Standard (Team Friendly)

Use predictable names so automation and humans both understand intent:

- \`feature/<ticket>-<short-name>\` (e.g., \`feature/JIRA-214-login-api\`)
- \`bugfix/<ticket>-<short-name>\`
- \`hotfix/<ticket>-<short-name>\`
- \`release/<version>\`

This improves traceability from commits to tickets and makes release notes easier.

## Branch Hygiene Checklist

- Rebase/merge from \`main\` regularly to reduce conflict spikes
- Keep PR size small (single concern)
- Delete merged branches quickly
- Avoid long-lived feature branches unless required
- Open draft PRs early for feedback

Branches are essential for professional development - master them!

---

## Deep Theory: Branches as Isolated Lines of Evolution

A branch is not a folder copy; it is a named reference to a commit trajectory. Branching enables parallel hypothesis development while preserving integration control.

### Theoretical Value

Branches reduce coupling between concurrent tasks. Work can evolve independently until integration criteria are met.

### Merge Implication

Branch divergence accumulates semantic distance. The longer branches live, the harder integration becomes. This is why modern workflows prefer short-lived branches with frequent synchronization.

### Organizational Meaning

Branch strategy reflects team coordination model:

- feature branches optimize review isolation,
- long-lived integration branches optimize release orchestration,
- trunk-centric models optimize flow speed.
`
};

export default gitBranches;

