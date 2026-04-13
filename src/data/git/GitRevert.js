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
   **Short Answer:** Revert creates a new commit that reverses an earlier commit while preserving full history.  
   **Detailed Explanation:** Revert is the safest undo method for shared branches because it does not erase or rewrite existing commits. Instead, it adds a new commit that applies opposite changes of the selected commit. This keeps audit trail intact and avoids disrupting teammates who already pulled history. Interviewers often prefer hearing revert as default for production or team branches. It supports transparent debugging because both original mistake and correction remain visible. Mentioning this workflow shows collaborative awareness and release safety thinking. Revert is especially useful when bad code is already pushed and must be fixed without history rewrite risk.

2. **What does \`git reset --hard\` do?**  
   **Short Answer:** Hard reset moves branch pointer and discards staged and working changes to match target commit exactly.  
   **Detailed Explanation:** Hard reset is powerful but destructive because it rewinds branch history and removes local modifications not represented in target commit. It is fine for local cleanup when you are certain changes are disposable or backed up. On shared branches, it can create serious collaboration issues because history divergence requires force push and teammate recovery steps. Interviewers expect caution here, not fear but control. A good answer explains when it is acceptable, when it is dangerous, and why revert is safer on shared history. This demonstrates responsible source control practice and understanding of distributed workflows.

3. **Difference between \`reset --soft\`, \`--mixed\`, \`--hard\`?**  
   **Short Answer:** Soft keeps changes staged, mixed keeps changes unstaged, and hard discards changes completely.  
   **Detailed Explanation:** These modes differ by how much state they preserve after moving branch pointer. Soft reset is best when you want to rewrite commit history but keep all edits ready for recommit. Mixed reset unstages files while keeping content in working directory, useful for reorganizing commits. Hard reset wipes both staging and working area to match target commit exactly. Interviewers ask this to test practical undo judgment. A solid answer includes mental model of commit pointer, index, and working tree. Understanding those layers helps choose safe command behavior and avoid accidental data loss.

4. **When would you use \`git restore\`?**  
   **Short Answer:** Use restore for file-level undo, such as discarding local edits or unstaging files safely.  
   **Detailed Explanation:** Restore provides focused, modern syntax for manipulating file states without affecting branch history. It is commonly used to remove unwanted local edits in specific files or move staged files back to unstaged state. Compared with older overloaded checkout usage, restore improves command intent clarity. Interviewers like candidates who choose safer, readable commands for routine operations. Mention that restore is ideal before commit and should be used carefully when discarding edits because that action is irreversible unless recoverable from other history. This shows practical command selection and user-safety awareness.

5. **Can you undo a \`git push\`?**  
   **Short Answer:** Yes, but safest shared-branch undo is revert; force push should be reserved for coordinated exceptional cases.  
   **Detailed Explanation:** Once commits are pushed, they become part of shared remote history. You can technically rewrite that history with force push after reset or rebase, but this may break teammate branches and CI references. Safer approach is creating a revert commit that undoes bad changes while keeping timeline stable. Interviewers look for this team-safe mindset. Mention that force push can be acceptable on private feature branches where no one else depends on history, especially before pull request. Distinguishing branch context and collaboration impact demonstrates mature understanding of remote undo strategies and operational risk.

6. **What is \`git reflog\`?**  
   **Short Answer:** Reflog is a local movement history of HEAD and references, used to recover commits after mistakes.  
   **Detailed Explanation:** Reflog records where branch heads and HEAD pointed over time, even for operations that rewrite history. This makes it a recovery lifeline after accidental reset, branch deletion, or detached work loss. Unlike normal commit log, reflog is local and temporary, so it should be used quickly before cleanup expires old entries. Interviewers appreciate candidates who know recovery options rather than panic after mistakes. Mention practical flow: inspect reflog, locate desired commit, create branch at that reference. This demonstrates confidence and deeper Git troubleshooting capability beyond routine commands.

7. **How do you revert a merge commit?**  
   **Short Answer:** Reverting a merge requires specifying mainline parent so Git knows which side to treat as baseline.  
   **Detailed Explanation:** Merge commits have multiple parents, so revert needs extra context to decide which parent history should remain. Mainline option provides that context, usually selecting the branch into which merge was made. This operation can be confusing and risky if parent choice is wrong, so interviewers often use it to test conceptual depth. A safe answer includes caution: verify commit graph, test locally, and involve team if branch is shared. Mention that reverting merge does not erase history but creates a compensating commit. This shows careful handling of advanced undo scenarios.

8. **Why is “force push to main” a red flag?**  
   **Short Answer:** It rewrites shared history and can disrupt teammates, automation, and audit reliability.  
   **Detailed Explanation:** Main branch is typically source of truth for production and collaboration, so rewriting it breaks assumptions for everyone consuming that history. Team branches may diverge unexpectedly, pull requests become harder to reason about, and deployment pipelines may reference missing commit ids. Interviewers expect you to call this high-risk and policy-controlled. While force push has valid uses in isolated contexts, using it on protected shared branches should be exceptional and documented. A mature answer emphasizes prevention through branch protection and safe undo via revert. This demonstrates both technical caution and teamwork awareness.

9. **What is the safe default for freshers fixing a bad commit already on GitHub?**  
   **Short Answer:** Use revert on the bad commit and push the revert commit so history stays clear and safe.  
   **Detailed Explanation:** For beginners working on shared repositories, revert is the most reliable default because it avoids rewriting existing remote history. The process is straightforward: identify bad commit, create revert commit, run tests, and push. Teammates can pull normally without branch repair steps. Interviewers like this answer because it prioritizes collaboration safety and traceability. It also aligns with branch protection policies common in professional teams. Mentioning communication with reviewers and linking revert to incident context further strengthens answer quality. This approach keeps recovery transparent and minimizes additional operational risk.

10. **What is interactive rebase (\`git rebase -i\`)?**  
    **Short Answer:** Interactive rebase rewrites local commit sequence to edit, reorder, squash, or reword commits before sharing.  
    **Detailed Explanation:** Interactive rebase is a history editing tool used mainly on local branches before pushing or before opening pull requests. It helps transform messy incremental commits into clear logical units that reviewers can understand easily. Common actions include squashing related commits, correcting message quality, and dropping accidental commits. Interviewers expect you to acknowledge power and risk: rewritten commits get new ids, so rebasing already shared commits can break collaborators. A strong answer highlights responsible usage boundaries and benefits to review quality. Mastering interactive rebase reflects advanced but disciplined Git workflow capability.

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

