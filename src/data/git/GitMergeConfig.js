const gitMergeConfig = {
  id: 'git-merge-config',
  title: 'Git Merge Configuration & Strategies',
  description: 'Learn about merge strategies, conflict resolution, merge configurations, and how to handle complex merge scenarios.',
  courseTitle: 'Git & GitHub',
  sectionTitle: 'GitHub Basics',
  content: `
# Git Merge Configuration & Strategies

Understanding merge configurations is crucial when working with teams. Different merge strategies help you handle different scenarios. Let's explore them.

## Understanding Merge Types

When you merge branches, Git uses different strategies depending on the situation:

### Fast-Forward Merge

This happens when your branch is directly ahead of the branch you're merging into. Git simply moves the pointer forward.

\`\`\`bash
# Example: main is at commit A, feature branch is at commit B
# main → A
# feature → A → B

git checkout main
git merge feature
# Result: main → A → B (fast-forward)
\`\`\`

**When it happens:**
- Your branch has all commits from main
- No one else has committed to main since you branched

**To force fast-forward (or fail if not possible):**
\`\`\`bash
git merge --ff-only feature
\`\`\`

**To prevent fast-forward (always create merge commit):**
\`\`\`bash
git merge --no-ff feature
\`\`\`

### Three-Way Merge

When both branches have diverged, Git creates a merge commit that combines both histories.

\`\`\`bash
# Example:
# main → A → C
# feature → A → B

git checkout main
git merge feature
# Result: main → A → C → D (merge commit)
#              ↘ B ↗
\`\`\`

**When it happens:**
- Both branches have new commits
- Git automatically creates a merge commit

## Merge Strategies

### Recursive Merge (Default)

This is Git's default strategy for merging two branches.

\`\`\`bash
git merge feature-branch
\`\`\`

**How it works:**
- Finds common ancestor
- Combines changes from both branches
- Creates merge commit if needed

### Ours Strategy

Keep your branch's version in case of conflicts.

\`\`\`bash
git merge -s ours feature-branch
\`\`\`

**Use case:** When you want to merge but keep all your changes, ignoring theirs.

### Theirs Strategy

Keep the other branch's version in case of conflicts.

\`\`\`bash
git merge -X theirs feature-branch
\`\`\`

**Use case:** When you want to accept all their changes.

### Octopus Merge

Merge multiple branches at once.

\`\`\`bash
git merge branch1 branch2 branch3
\`\`\`

**Use case:** When you need to combine multiple feature branches.

## Handling Merge Conflicts

When Git can't automatically merge, you get conflicts:

### Step 1: Identify Conflicts

\`\`\`bash
git merge feature-branch
\`\`\`

**Output:**
\`\`\`
Auto-merging UserService.java
CONFLICT (content): Merge conflict in UserService.java
Automatic merge failed; fix conflicts and then commit the result.
\`\`\`

### Step 2: View Conflict Markers

Open the conflicted file. You'll see:

\`\`\`java
<<<<<<< HEAD
// Your code (current branch)
public void login(String username) {
    // Your implementation
}
=======
// Their code (branch being merged)
public void login(String username, String password) {
    // Their implementation
}
>>>>>>> feature-branch
\`\`\`

### Step 3: Resolve Conflicts

Edit the file to keep what you want:

\`\`\`java
// Resolved version
public void login(String username, String password) {
    // Combined implementation
    if (validateCredentials(username, password)) {
        // Login logic
    }
}
\`\`\`

### Step 4: Mark as Resolved

\`\`\`bash
git add UserService.java
git commit -m "Merge feature-branch: resolve conflicts in UserService"
\`\`\`

## Merge Configuration Options

### Configure Default Merge Behavior

**Set default merge strategy:**
\`\`\`bash
git config --global merge.tool vimdiff
git config --global merge.ours.driver true
\`\`\`

**Always create merge commit:**
\`\`\`bash
git config --global merge.ff false
\`\`\`

**Allow fast-forward only:**
\`\`\`bash
git config --global merge.ff only
\`\`\`

### Configure Merge Tools

**List available merge tools:**
\`\`\`bash
git mergetool --tool-help
\`\`\`

**Set VS Code as merge tool:**
\`\`\`bash
git config --global merge.tool vscode
git config --global mergetool.vscode.cmd 'code --wait $MERGED'
\`\`\`

**Use merge tool:**
\`\`\`bash
git mergetool
\`\`\`

## Squash Merge

Combine all commits from a branch into one commit:

\`\`\`bash
git merge --squash feature-branch
git commit -m "Add complete feature implementation"
\`\`\`

**Benefits:**
- Cleaner history
- One commit per feature
- Easier to revert

**When to use:**
- Feature branches with many small commits
- Want clean linear history
- Preparing for release

## Rebase vs Merge

### Merge (Preserves History)

\`\`\`bash
git checkout main
git merge feature
\`\`\`

**Result:** Creates merge commit, preserves branch history

### Rebase (Linear History)

\`\`\`bash
git checkout feature
git rebase main
git checkout main
git merge feature  # Now fast-forward
\`\`\`

**Result:** Linear history, no merge commit

**When to use merge:**
- Working with shared branches
- Want to preserve exact history
- Public branches

**When to use rebase:**
- Personal feature branches
- Want clean linear history
- Before merging to main

## Merge Configuration in .gitconfig

You can configure merge behavior in your \`.gitconfig\` file:

\`\`\`ini
[merge]
    tool = vscode
    ff = false
    commit = true
    log = true

[mergetool "vscode"]
    cmd = code --wait $MERGED
    trustExitCode = true
\`\`\`

## Real-World Example: Java Project

Let's say you're merging a feature branch:

\`\`\`bash
# Start on main
git checkout main
git pull origin main

# Merge feature branch
git merge --no-ff feature-user-authentication

# If conflicts occur:
# 1. Edit conflicted files
# 2. Resolve conflicts
# 3. Stage resolved files
git add src/main/java/UserService.java
git commit -m "Merge feature-user-authentication: resolve conflicts"

# Push merged changes
git push origin main
\`\`\`

## Best Practices

1. **Always pull before merging:**
   \`\`\`bash
   git pull origin main
   \`\`\`

2. **Use --no-ff for feature merges:**
   \`\`\`bash
   git merge --no-ff feature
   \`\`\`

3. **Test after merging:**
   - Run your tests
   - Verify functionality
   - Check for issues

4. **Write clear merge commit messages:**
   \`\`\`bash
   git commit -m "Merge feature-login: Add user authentication"
   \`\`\`

5. **Resolve conflicts immediately:**
   - Don't leave conflicts unresolved
   - Test after resolving
   - Commit resolution quickly

## Summary

You've learned:
- Different merge types (fast-forward, three-way)
- Merge strategies (recursive, ours, theirs, octopus)
- How to handle merge conflicts
- Merge configuration options
- Squash merge vs regular merge
- Rebase vs merge
- Best practices for merging

---

## 10 Important Git Merge Interview Questions

1. **What is a three-way merge?**  
   Git finds a **common ancestor** commit and **two** tips (e.g. \`main\` and \`feature\`), then **combines** changes. If the **same lines** changed both sides → **conflict**.

2. **What is fast-forward vs no-fast-forward (\`--no-ff\`)?**  
   **Fast-forward:** simply moves the branch pointer—**no** merge commit. **\`--no-ff\`:** always creates a **merge commit** to **record** that a feature branch existed—clearer history for **release** archaeology.

3. **What does \`git merge --squash\` do?**  
   Applies **all** changes from a branch as **uncommitted** staged changes on your current branch—one **single** commit when you commit. **Flattens** feature commits; **different** from **GitHub squash merge** UI but similar idea.

4. **What is \`ours\` vs \`theirs\` during conflicts?**  
   In a merge, **“ours”** is usually **your current branch**, **“theirs”** is the **branch being merged** (can feel reversed during **rebase**—**be careful**). Prefer **manual** resolution over blind **\`--ours\`** unless you’re sure.

5. **How do you abort a bad merge?**  
   **\`git merge --abort\`** (if merge in progress). Returns you to **pre-merge** state—safe when you’re confused.

6. **What is \`git mergetool\`?**  
   Opens a **visual** diff/merge tool (Beyond Compare, VS Code) to resolve conflicts **faster** than raw text markers.

7. **Rebase vs merge (when to use which)?**  
   **Merge** preserves **true** parallel history. **Rebase** **replays** commits for a **linear** log—nice on **private** feature branches; **dangerous** if you **rebase shared** history others already pulled.

8. **What is an octopus merge?**  
   Merging **more than two** parents at once—**rare** manually; Git uses it internally in some cases. **Fresher:** know the **name**; you’ll mostly see **two-parent** merges.

9. **Why run tests after resolving conflicts?**  
   Conflict resolution can **drop** logic or **duplicate** lines. **Compile + tests** catch mistakes **before** push.

10. **What is \`.gitattributes\` for merges?**  
    Can set **merge strategies** per file type (e.g. **binary**, **union**). Advanced—**enterprises** use it for **generated** files.

---

## Related tutorials — quick links (topic-wise)

| Topic | Tutorial link |
|-------|----------------|
| **Branch basics** | [Git Branches](/tutorial/git-branches) |
| **Safe undo** | [Git Revert](/tutorial/git-revert) |
| **PR + merge policies** | [GitHub Pull Requests](/tutorial/github-pull-requests) |
| **Protected branches** | [Git Branch Protection](/tutorial/git-branch-protection) |
| **Daily habits** | [Git Workflow](/tutorial/git-workflow) |

Understanding merge configurations helps you work more effectively with teams and maintain clean project history!
`
};

export default gitMergeConfig;

