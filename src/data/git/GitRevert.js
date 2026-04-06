const gitRevert = {
  id: 'git-revert',
  title: 'Git Revert & Undo Changes',
  description: 'Learn how to revert commits, undo changes, reset branches, and recover from mistakes in Git.',
  courseTitle: 'Git & GitHub',
  sectionTitle: 'GitHub Basics',
  content: `
# Git Revert & Undo Changes

Mistakes happen. Git provides several ways to undo changes and revert commits. Let's learn the different methods and when to use each.

## Understanding Undo Operations

Git offers different commands for undoing changes:
- **git revert:** Creates new commit that undoes changes
- **git reset:** Moves branch pointer (destructive)
- **git restore:** Restores files from index or working tree
- **git checkout:** Switch branches or restore files

## Git Revert

**git revert** creates a new commit that undoes the changes from a previous commit. This is the safest way to undo changes.

### Reverting a Single Commit

\`\`\`bash
# Revert the last commit
git revert HEAD

# Revert a specific commit
git revert abc1234
\`\`\`

**What happens:**
- Git creates a new commit
- New commit undoes the changes
- History is preserved
- Safe for shared branches

### Reverting Multiple Commits

\`\`\`bash
# Revert a range of commits
git revert HEAD~3..HEAD

# Revert without creating commits (just changes)
git revert --no-commit HEAD~3..HEAD
git commit -m "Revert last 3 commits"
\`\`\`

### Reverting a Merge Commit

\`\`\`bash
# Revert a merge commit
git revert -m 1 abc1234
\`\`\`

**-m 1** specifies which parent to revert to (usually 1 for main branch).

## Git Reset

**git reset** moves the branch pointer. **Warning:** Can be destructive!

### Types of Reset

#### Soft Reset

**Moves pointer, keeps changes staged:**
\`\`\`bash
git reset --soft HEAD~1
\`\`\`

**Use case:** Undo commit but keep changes ready to commit again.

#### Mixed Reset (Default)

**Moves pointer, unstages changes:**
\`\`\`bash
git reset HEAD~1
# or
git reset --mixed HEAD~1
\`\`\`

**Use case:** Undo commit and unstage, but keep changes in working directory.

#### Hard Reset

**Moves pointer, discards all changes:**
\`\`\`bash
git reset --hard HEAD~1
\`\`\`

**Warning:** This permanently deletes changes!

**Use case:** Completely undo commit and discard changes.

### Reset Examples

**Undo last commit, keep changes:**
\`\`\`bash
git reset --soft HEAD~1
# Changes are staged, ready to recommit
\`\`\`

**Undo last commit, unstage changes:**
\`\`\`bash
git reset HEAD~1
# Changes are in working directory, not staged
\`\`\`

**Undo last commit, discard changes:**
\`\`\`bash
git reset --hard HEAD~1
# All changes are gone!
\`\`\`

## Git Restore

**git restore** restores files from the index or working tree. Safer than reset for individual files.

### Restore File from Index

**Unstage a file:**
\`\`\`bash
git restore --staged file.java
\`\`\`

### Restore File from Working Tree

**Discard changes in working directory:**
\`\`\`bash
git restore file.java
\`\`\`

**Warning:** This discards uncommitted changes!

### Restore from Specific Commit

\`\`\`bash
git restore --source=HEAD~2 file.java
\`\`\`

## Undoing Different Scenarios

### Scenario 1: Undo Uncommitted Changes

**Discard all uncommitted changes:**
\`\`\`bash
git restore .
# or
git checkout -- .
\`\`\`

**Discard specific file:**
\`\`\`bash
git restore file.java
\`\`\`

### Scenario 2: Unstage Files

**Unstage all files:**
\`\`\`bash
git restore --staged .
# or
git reset HEAD
\`\`\`

**Unstage specific file:**
\`\`\`bash
git restore --staged file.java
\`\`\`

### Scenario 3: Undo Last Commit

**Keep changes (recommended):**
\`\`\`bash
git reset --soft HEAD~1
\`\`\`

**Discard changes:**
\`\`\`bash
git reset --hard HEAD~1
\`\`\`

### Scenario 4: Undo Committed Changes (Shared Branch)

**Use revert (safe):**
\`\`\`bash
git revert HEAD
git push origin main
\`\`\`

**Don't use reset on shared branches!**

### Scenario 5: Undo Multiple Commits

**Revert (safe):**
\`\`\`bash
git revert HEAD~3..HEAD
\`\`\`

**Reset (only if not pushed):**
\`\`\`bash
git reset --hard HEAD~3
\`\`\`

## Recovering Lost Commits

### Using Reflog

**Git keeps a log of all HEAD movements:**

\`\`\`bash
# View reflog
git reflog

# Output:
# abc1234 HEAD@{0}: commit: Latest commit
# def5678 HEAD@{1}: commit: Previous commit
# ghi9012 HEAD@{2}: reset: moving to HEAD~1
\`\`\`

**Recover lost commit:**
\`\`\`bash
# Find commit in reflog
git reflog

# Recover it
git checkout def5678
# Create new branch from it
git checkout -b recovered-branch
\`\`\`

### Recovering Deleted Branch

\`\`\`bash
# Find branch in reflog
git reflog | grep deleted-branch

# Recover it
git checkout -b recovered-branch HEAD@{n}
\`\`\`

## Undoing on Remote

### If Not Pushed Yet

**Safe to use reset:**
\`\`\`bash
git reset --hard HEAD~1
# No one else has seen these commits
\`\`\`

### If Already Pushed

**Must use revert:**
\`\`\`bash
git revert HEAD
git push origin main
\`\`\`

**Or force push (dangerous, only if you're sure):**
\`\`\`bash
git reset --hard HEAD~1
git push --force origin main
\`\`\`

**Warning:** Force push rewrites history. Only use if:
- You're the only one working on the branch
- You've coordinated with your team
- You understand the consequences

## Real-World Examples

### Example 1: Accidentally Committed Wrong File

\`\`\`bash
# Undo last commit, keep changes
git reset --soft HEAD~1

# Remove wrong file
git restore --staged wrong-file.java

# Add correct files
git add correct-file.java

# Commit again
git commit -m "Add correct file"
\`\`\`

### Example 2: Need to Undo Bad Commit on Main

\`\`\`bash
# Revert the bad commit
git revert abc1234

# Push the revert
git push origin main
\`\`\`

### Example 3: Discard All Local Changes

\`\`\`bash
# Discard all uncommitted changes
git restore .

# Or
git checkout -- .
\`\`\`

### Example 4: Undo Merge

\`\`\`bash
# Revert merge commit
git revert -m 1 merge-commit-hash

# Or reset if not pushed
git reset --hard HEAD~1
\`\`\`

## Best Practices

1. **Use revert for shared branches:**
   - Preserves history
   - Safe for others
   - Can be undone

2. **Use reset only for local branches:**
   - Before pushing
   - When working alone
   - For cleaning up

3. **Always check before force push:**
   - Verify no one else is using branch
   - Coordinate with team
   - Understand consequences

4. **Use reflog to recover:**
   - Git keeps history
   - Can recover lost commits
   - Check reflog before panicking

5. **Test before undoing:**
   - Make sure you want to undo
   - Understand what will happen
   - Have a backup plan

## Summary

You've learned:
- How to use git revert (safe undo)
- How to use git reset (destructive undo)
- How to use git restore (file-level undo)
- Different undo scenarios
- Recovering lost commits with reflog
- Undoing on remote repositories
- Best practices for undoing changes

---

## 10 Important Git Revert / Reset Interview Questions

1. **What does \`git revert\` do?**  
   Creates a **new commit** that **undoes** a previous commit’s changes—**history stays**; **safe** for **shared** branches because you **don’t** rewrite old commits.

2. **What does \`git reset --hard\` do?**  
   Moves **branch pointer** and **discards** working tree changes to match that commit—**destructive**. **Never** on **pushed shared** history without team agreement.

3. **Difference between \`reset --soft\`, \`--mixed\`, \`--hard\`?**  
   **soft:** move HEAD, **keep** staging + working changes. **mixed (default):** move HEAD, **unstage**, keep working files. **hard:** **wipe** staging and working tree to match commit.

4. **When would you use \`git restore\`?**  
   **Discard** local changes in a file (**before commit**) or **restore** from index—**safer** mental model than some **checkout** uses in modern Git.

5. **Can you undo a \`git push\`?**  
   Technically **\`git push --force\`** can **rewrite** remote history—**dangerous** if others **pulled**. Prefer **\`git revert\`** on shared branches.

6. **What is \`git reflog\`?**  
   **Local** log of **where HEAD moved**—helps **recover** “lost” commits after reset **if** you haven’t garbage-collected. **Lifeline** when you mess up **locally**.

7. **How do you revert a merge commit?**  
   **\`git revert -m 1 <merge-commit>\`** (choose **mainline parent**)—**tricky**; read docs or ask **senior** first. Wrong **\-m** picks wrong parent tree.

8. **Why is “force push to main” a red flag?**  
   **Rewrites** **public** history—teammates’ branches **break**, **CI** tags may **misalign**. **Policy** usually **forbids** except **admin** maintenance.

9. **What is the safe default for freshers fixing a bad commit already on GitHub?**  
   **\`git revert <bad-commit>\`** and **push**—transparent undo everyone can **understand**.

10. **What is interactive rebase (\`git rebase -i\`)?**  
    **Rewrite** your **local** commit series (squash, reword, reorder)—**powerful** for **clean** history **before** PR; **do not** rebase **others’** commits.

---

## Related tutorials — quick links (topic-wise)

| Topic | Tutorial link |
|-------|----------------|
| **Commits & history** | [Git Basics](/tutorial/git-basics) |
| **Merge & conflicts** | [Git Merge Config](/tutorial/git-merge-config) |
| **Branch safety** | [Git Branches](/tutorial/git-branches) |
| **After bad deploy** | [Git Deployment](/tutorial/git-deployment) |
| **Protected history policies** | [Git Branch Protection](/tutorial/git-branch-protection) |

## Undo Decision Matrix (Use the Right Tool)

Use this quick selector:

- **Need to undo on shared branch:** \`git revert\`
- **Need to unstage file only:** \`git restore --staged <file>\`
- **Need to discard local file edits:** \`git restore <file>\`
- **Need to rewrite local unpushed history:** \`git reset --soft|--mixed|--hard\`

If branch is already pushed and teammates are using it, default to **revert**.

## Incident Example: Bad Commit in Production

1. Identify bad commit hash via \`git log --oneline\`.
2. Run \`git revert <hash>\` on protected release branch.
3. Push and trigger deployment pipeline.
4. Open a follow-up issue for root cause and prevention.

This pattern keeps history transparent and team-safe.

Remember: When in doubt, use revert. It's safer and preserves history!
`
};

export default gitRevert;

