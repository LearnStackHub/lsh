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
   **Short Answer:** A three-way merge compares both branch tips and their common ancestor to combine changes safely.  
   **Detailed Explanation:** Three-way merge is the standard integration model when branches have diverged. Git uses the common base commit to understand what changed independently on each side, then attempts to apply both sets of changes into one result. If modifications do not overlap, merge is automatic. If they do overlap, conflict markers are produced for manual resolution. Interviewers ask this to confirm conceptual understanding beyond command memorization. A strong answer explains why base commit matters and how Git determines conflict. This knowledge helps developers resolve merges confidently and avoid confusion during pull request integration.

2. **What is fast-forward vs no-fast-forward (\`--no-ff\`)?**  
   **Short Answer:** Fast-forward moves pointer without merge commit, while no-fast-forward always records an explicit merge commit.  
   **Detailed Explanation:** Fast-forward occurs when target branch has no unique commits since branching, so Git can simply advance pointer. No-fast-forward forces merge commit even when fast-forward is possible, preserving branch context. Teams choose based on history style and audit needs. Interviewers often expect you to mention tradeoff: fast-forward gives clean linear history, while no-fast-forward makes feature integration points more visible. Neither is universally correct. Mature teams standardize one policy so history remains predictable. Mentioning policy consistency and review clarity demonstrates practical project experience, not only command familiarity.

3. **What does \`git merge --squash\` do?**  
   **Short Answer:** It combines all branch changes into staged state so you can create one consolidated commit.  
   **Detailed Explanation:** Squash merge applies the final diff from source branch onto target branch without preserving individual commit history from that branch. After squash, you create one new commit manually. This is useful when feature branch has many small work-in-progress commits and team wants clean main history. In interviews, mention downside too: detailed internal progression of feature branch is not preserved in main branch timeline. That may reduce traceability of intermediate decisions. Teams using squash should write strong pull request descriptions and commit messages to preserve context. Understanding this balance reflects practical merge strategy awareness.

4. **What is \`ours\` vs \`theirs\` during conflicts?**  
   **Short Answer:** Ours means current branch version, and theirs means incoming branch version during merge conflict resolution.  
   **Detailed Explanation:** Conflict labels are context-dependent and often misunderstood by beginners. During merge, ours refers to checked-out branch and theirs refers to merged branch. During rebase contexts, interpretation can feel reversed because replay direction differs. Interviewers value caution here: blind acceptance of one side can silently drop important logic. Good practice is reading both changes, understanding business intent, and producing a combined correct result where needed. Mention that automated options are useful for generated files or known preference patterns, but manual review remains safest for core logic files. This shows responsible conflict-handling mindset.

5. **How do you abort a bad merge?**  
   **Short Answer:** Use merge abort command to return repository to pre-merge state if merge is in progress.  
   **Detailed Explanation:** When conflicts become messy or you realize the merge should not continue yet, aborting is safer than forcing uncertain resolutions. Merge abort restores index and working tree to the state before merge started, allowing you to retry later with cleaner preparation. In interviews, mention that abort works only while merge process is active. This command is valuable for beginners who are still learning conflict resolution and want to avoid accidental incorrect commits. Good workflow includes pulling latest changes, syncing branches, and then retrying merge after understanding the conflict context properly.

6. **What is \`git mergetool\`?**  
   **Short Answer:** It launches a configured visual merge tool to help resolve conflicts more clearly and efficiently.  
   **Detailed Explanation:** Mergetool integrates external graphical or editor-based conflict resolvers with Git. Instead of manually editing conflict markers in plain text, developers can compare base, local, and incoming versions side by side and choose final result interactively. Interviewers like hearing this because it shows practical productivity awareness in real-world conflict-heavy repositories. However, tool assistance does not replace understanding; developers still must validate resulting logic and run tests. Mention that configuring a standard team tool can reduce confusion and speed onboarding. This demonstrates both technical and collaboration-oriented thinking.

7. **Rebase vs merge (when to use which)?**  
   **Short Answer:** Merge is safer for shared history; rebase is cleaner for private branch cleanup before integration.  
   **Detailed Explanation:** Merge keeps original commit graph intact and is straightforward for collaboration because commit identities remain unchanged. Rebase rewrites commits by replaying them on a new base, producing linear history but changing commit hashes. Interviewers expect safety rule awareness: do not rebase shared public history unless team explicitly coordinates. Rebase is powerful for polishing local feature branch before creating pull request, while merge is preferred when preserving exact timeline matters. A balanced answer shows you understand tradeoffs instead of treating one method as always superior. Team policy and repository standards should guide final choice.

8. **What is an octopus merge?**  
   **Short Answer:** It is a merge that combines more than two branches in one merge commit.  
   **Detailed Explanation:** Octopus merge supports integrating multiple branches simultaneously, creating a commit with several parents. It is less common in day-to-day feature workflows because conflict handling becomes complex and less readable. Interviewers usually ask this as conceptual awareness rather than expected frequent use. You can mention it may be useful for batching independent topic branches that do not conflict. In most modern teams, sequential pull request merges remain preferred for review clarity and easier rollback. Showing this practical perspective demonstrates that you know advanced terms while still applying sensible workflow discipline.

9. **Why run tests after resolving conflicts?**  
   **Short Answer:** Because conflict resolution is manual and can introduce subtle bugs even when merge appears successful.  
   **Detailed Explanation:** A conflict-free file is not always a correct file. During manual resolution, developers may accidentally remove required logic, duplicate calls, break imports, or violate assumptions in nearby code. Running tests and at least a build check after conflict resolution confirms behavior remains correct. Interviewers appreciate candidates who treat merge as code change requiring validation, not just text operation. This mindset reduces post-merge defects and protects main branch stability. Mentioning test execution and quick smoke verification after conflict resolution demonstrates strong engineering hygiene and reliability awareness.

10. **What is \`.gitattributes\` for merges?**  
    **Short Answer:** It defines file-specific behavior, including merge strategy rules for certain paths and file types.  
    **Detailed Explanation:** Gitattributes lets teams customize how Git treats files during diff, merge, and normalization operations. For merge workflows, it can specify custom strategies for generated files, lock-step files, binaries, or language-specific cases where default line-based merge is not ideal. Interviewers rarely expect deep syntax, but they appreciate awareness that merge behavior is configurable at repository policy level. This is especially useful in enterprise repositories with mixed file types and large teams. Mentioning gitattributes shows broader Git maturity and understanding that good merge outcomes depend on both workflow habits and repository configuration design.

---

## Related tutorials — quick links (topic-wise)

| Topic | Tutorial link |
|-------|----------------|
| **Branch basics** | [Git Branches](/tutorial/git-branches) |
| **Safe undo** | [Git Revert](/tutorial/git-revert) |
| **PR + merge policies** | [GitHub Pull Requests](/tutorial/github-pull-requests) |
| **Protected branches** | [Git Branch Protection](/tutorial/git-branch-protection) |
| **Daily habits** | [Git Workflow](/tutorial/git-workflow) |

## Conflict Resolution Playbook (Practical)

When a merge conflict appears, use this flow:

1. Read both sides and identify business intent (not only syntax).
2. Resolve the smallest conflicted file first.
3. Build + run tests immediately after key resolutions.
4. Use \`git diff\` to verify final merged content.
5. Commit with a clear message describing what was kept and why.

## Choosing a Merge Style by Team Goal

- **Need audit trail of feature branches:** use \`--no-ff\`
- **Need very clean main history:** use squash merge
- **Need exact branch history preserved:** use standard merge commits
- **Need strict linear history:** use rebase workflow + protected branch rules

Pick one standard per repository to keep history predictable and review-friendly.

Understanding merge configurations helps you work more effectively with teams and maintain clean project history!
`
};

export default gitMergeConfig;

