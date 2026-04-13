const gitBasics = {
  id: 'git-basics',
  title: 'Git Basics - First Repository',
  description: 'Learn the fundamental Git commands: init, add, commit, status, and log. Create your first repository and make your first commit.',
  courseTitle: 'Git & GitHub',
  sectionTitle: 'Git Basics',
  content: `
# Git Basics - Your First Repository

Now that Git is installed, let's create your first repository and learn the essential commands. This is where the magic happens!

## Understanding the Git Workflow

Before we dive in, let's understand the basic workflow:

1. **Initialize** a repository (\`git init\`)
2. **Add** files to staging area (\`git add\`)
3. **Commit** your changes (\`git commit\`)
4. **Check status** (\`git status\`)
5. **View history** (\`git log\`)

Think of it like this:
- **Working Directory**: Your project folder (where you write code)
- **Staging Area**: A waiting room (files ready to be committed)
- **Repository**: The history book (all your commits)

---

## Step 1: Create a Project Folder

Let's create a simple Java project to practice with:

\`\`\`bash
mkdir my-java-project
cd my-java-project
\`\`\`

---

## Step 2: Initialize Git Repository

This tells Git to start tracking this folder:

\`\`\`bash
git init
\`\`\`

**Output:**
\`\`\`
Initialized empty Git repository in /path/to/my-java-project/.git/
\`\`\`

A hidden \`.git\` folder is created. This folder contains all Git's tracking information. **Don't delete it!**

---

## Step 3: Create Some Files

Let's create a simple Java file:

\`\`\`bash
# Create a Java file
echo 'public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Git!");
    }
}' > HelloWorld.java
\`\`\`

Or create it manually in your editor.

---

## Step 4: Check Status

See what Git knows about your files:

\`\`\`bash
git status
\`\`\`

**Output:**
\`\`\`
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        HelloWorld.java

nothing added to commit but untracked files present (use "git add" to track)
\`\`\`

Git is telling you:
- You're on the \`main\` branch
- No commits yet
- \`HelloWorld.java\` is untracked (Git sees it but isn't tracking it)

---

## Step 5: Add Files to Staging Area

Before committing, you need to **stage** your files. This tells Git which files you want to include in the commit:

\`\`\`bash
git add HelloWorld.java
\`\`\`

**Or add all files:**
\`\`\`bash
git add .
\`\`\`

The \`.\` means "all files in current directory"

**Check status again:**
\`\`\`bash
git status
\`\`\`

**Output:**
\`\`\`
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   HelloWorld.java
\`\`\`

Now the file is **staged** (in the green area, ready to commit).

---

## Step 6: Make Your First Commit

A commit is like saving a snapshot of your code with a message:

\`\`\`bash
git commit -m "Add HelloWorld.java - first Java program"
\`\`\`

**Output:**
\`\`\`
[main (root-commit) abc1234] Add HelloWorld.java - first Java program
 1 file changed, 5 insertions(+)
 create mode 100644 HelloWorld.java
\`\`\`

Congratulations! You made your first commit! 🎉

---

## Step 7: View Commit History

See all your commits:

\`\`\`bash
git log
\`\`\`

**Output:**
\`\`\`
commit abc1234567890abcdef (HEAD -> main)
Author: Dattakumar <dattudattakumar369@gmail.com>
Date:   Mon Jan 15 2024 10:30:00 +0530

    Add HelloWorld.java - first Java program
\`\`\`

**Shorter version:**
\`\`\`bash
git log --oneline
\`\`\`

**Output:**
\`\`\`
abc1234 Add HelloWorld.java - first Java program
\`\`\`

---

## Making More Changes

Let's modify the file and commit again:

### Step 1: Edit the File

Change \`HelloWorld.java\` to:

\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Git!");
        System.out.println("This is my second commit!");
    }
}
\`\`\`

### Step 2: Check Status

\`\`\`bash
git status
\`\`\`

**Output:**
\`\`\`
On branch main
Changes not staged for commit:
  (use "git add <file>..." to include in what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   HelloWorld.java

no changes added to commit (use "git add" to stage and/or "git commit")
\`\`\`

Git sees the file is **modified** but not staged.

### Step 3: Stage and Commit

\`\`\`bash
git add HelloWorld.java
git commit -m "Add second print statement to HelloWorld"
\`\`\`

### Step 4: View History Again

\`\`\`bash
git log --oneline
\`\`\`

**Output:**
\`\`\`
def5678 Add second print statement to HelloWorld
abc1234 Add HelloWorld.java - first Java program
\`\`\`

You now have 2 commits!

---

## Understanding Git States

Files in Git can be in three states:

1. **Untracked**: Git sees the file but isn't tracking it
2. **Staged**: File is ready to be committed (in staging area)
3. **Committed**: File is saved in the repository

**Visual Flow:**
\`\`\`
Working Directory → git add → Staging Area → git commit → Repository
   (untracked)                    (staged)              (committed)
\`\`\`

---

## Common Git Commands Summary

| Command | Purpose | Example |
|---------|---------|---------|
| \`git init\` | Start tracking a folder | \`git init\` |
| \`git status\` | See what's changed | \`git status\` |
| \`git add\` | Stage files | \`git add file.java\` |
| \`git commit\` | Save a snapshot | \`git commit -m "message"\` |
| \`git log\` | View commit history | \`git log\` |
| \`git log --oneline\` | Compact history | \`git log --oneline\` |

---

## Best Practices

### 1. Commit Often
Make small, frequent commits rather than one big commit at the end.

### 2. Write Good Commit Messages
- Be descriptive: "Add user login functionality"
- Not vague: "Update code"
- Use present tense: "Add feature" not "Added feature"

### 3. Check Status Regularly
\`git status\` is your friend. Use it often!

### 4. Review Before Committing
Always check \`git status\` before committing to make sure you're committing the right files.

---

## Real-World Example

Let's say you're building a Java web application:

\`\`\`bash
# Day 1: Project setup
git init
git add .
git commit -m "Initial project setup with Maven"

# Day 2: Add database connection
# ... write code ...
git add src/main/java/DatabaseConnection.java
git commit -m "Add MySQL database connection class"

# Day 3: Add user model
# ... write code ...
git add src/main/java/User.java
git commit -m "Create User model class with getters and setters"

# Day 4: Add servlet
# ... write code ...
git add src/main/java/UserServlet.java
git commit -m "Add UserServlet for handling user requests"
\`\`\`

Each commit represents a logical unit of work.

---

## Summary

You've learned:
- How to initialize a Git repository
- How to stage files (\`git add\`)
- How to commit changes (\`git commit\`)
- How to check status (\`git status\`)
- How to view history (\`git log\`)

**Next Steps:**
- Learn about branches
- Connect to GitHub
- Work with remote repositories

---

## 10 Important Git Basics Interview Questions

1. **What is the difference between the working directory, staging area, and repository?**  
   **Short Answer:** Working directory is where you edit files, staging area is what you prepare for commit, and repository is the saved commit history.  
   **Detailed Explanation:** Think of Git like a three-step checkpoint system. The working directory is your active workspace where you create or modify files. Nothing is part of official history yet at this point. The staging area is a preparation layer where you choose exactly what should go into the next commit. This gives you control so unrelated edits do not get mixed together. The repository is the long-term history database where each commit is stored as a snapshot. In interviews, explain the flow clearly: you edit in working directory, move selected changes to staging, then commit to repository. This separation is a core concept that makes Git organized and reliable.

2. **What does \`git status\` tell you?**  
   **Short Answer:** It shows your current branch and the exact state of tracked, untracked, staged, and unstaged changes.  
   **Detailed Explanation:** The status command is the quickest health check of your repository. It tells you which branch you are on, whether your branch is ahead or behind remote, which files are untracked, which tracked files are modified but not staged, and which changes are already staged for the next commit. It also gives hints for common actions such as adding files, restoring files, or committing. Beginners often make mistakes because they skip this command and commit wrong files. In interviews, mention that running status before add, before commit, and before push is a professional habit. It reduces confusion and prevents accidental commits.

3. **What is staging? Why not commit directly?**  
   **Short Answer:** Staging lets you build clean, logical commits by selecting only the changes you want to include.  
   **Detailed Explanation:** If Git had only direct commit, every local edit would be bundled together, which creates messy history. Staging solves that by acting as a selection area before commit. For example, imagine you fixed a critical bug and also changed formatting in multiple files. With staging, you can include only the bug fix first, create one focused commit, then commit formatting separately. This makes review easier, rollback safer, and history more meaningful. Interviewers like candidates who understand commit quality, not just command syntax. You can describe staging as a quality control step between coding and committing, especially useful in team projects and pull request reviews.

4. **What makes a good commit message?**  
   **Short Answer:** A good commit message is clear, specific, and explains the intent of the change.  
   **Detailed Explanation:** A strong commit message has a short subject line that states what was done, usually in imperative style, followed by optional detail about why the change was needed. Good examples include meaningful context such as user impact, bug reason, or design choice. Weak messages like update or fix provide no value when reviewing history later. Interviewers often check whether you understand that commit messages are communication tools for teammates and your future self. In real projects, clear messages help during debugging, release notes, audits, and rollback decisions. A readable commit history is a sign of professional engineering discipline and good collaboration habits.

5. **What does \`git log\` show?**  
   **Short Answer:** It shows commit history including commit id, author, date, and commit message.  
   **Detailed Explanation:** The log command is your timeline viewer for repository history. Each entry includes commit hash, author identity, timestamp, and message, which together tell the story of how the code evolved. Compact variants like one-line output are useful for quick scanning, while full output is useful for deep investigation. During debugging, you can inspect recent commits to identify where a bug might have been introduced. During release work, log helps confirm which features are included. In interviews, mention that log is not just for reading history but also for selecting commits for actions like revert, comparison, or branch analysis. Understanding history navigation is an important Git skill.

6. **What is \`HEAD\`?**  
   **Short Answer:** HEAD is a pointer to your current checked-out commit, usually through the current branch name.  
   **Detailed Explanation:** HEAD represents your present position in Git history. Most of the time, HEAD points to a branch tip, which then points to the latest commit on that branch. When you make a new commit, that branch and HEAD move forward together. Sometimes HEAD points directly to a commit instead of a branch, called detached HEAD state. This is useful for temporary inspection but risky if you commit and then switch away without creating a branch. Interviewers ask this because understanding pointers explains many Git behaviors such as switching branches, resetting, rebasing, and recovering commits. If you understand HEAD, many confusing commands become much easier to reason about.

7. **What is \`.gitignore\`?**  
   **Short Answer:** It is a file that defines patterns for files and folders Git should ignore and not track.  
   **Detailed Explanation:** The ignore file prevents unnecessary or sensitive files from entering version control. Typical ignored content includes build outputs, temporary files, editor settings, logs, dependency caches, and secret configuration files. Without a proper ignore list, repositories become noisy, large, and risky, especially when secrets are accidentally committed. A good beginner practice is to set ignore rules early when starting a project, then verify ignored files are not staged. In interviews, mention practical examples such as ignoring generated class files, target directories, and local environment files. This shows you understand cleanliness, security, and repository hygiene, which are important in collaborative development and CI pipelines.

8. **Difference between \`git add .\` and \`git add -p\`?**  
   **Short Answer:** Add dot stages everything in scope, while add patch lets you selectively stage specific chunks.  
   **Detailed Explanation:** Add dot is convenient and fast, but it can accidentally stage unrelated changes if your working tree is mixed. Add patch is interactive and asks chunk by chunk whether each change should be staged. This allows you to create precise commits even when you edited many parts of a file for different reasons. For interview answers, highlight tradeoff: speed versus commit quality. In personal practice, add patch is excellent for clean pull requests because each commit can represent one clear intention. Teams value this during code review and rollback. Using selective staging demonstrates maturity in source control workflow and improves history readability over time.

9. **Can you change the last commit message?**  
   **Short Answer:** Yes, you can amend the latest commit, but avoid doing it after the commit is already shared.  
   **Detailed Explanation:** Git allows you to update the most recent commit message, and even include extra staged changes, using amend behavior. This is useful when you notice a typo, vague message, or a missed file immediately after commit. However, amendment rewrites commit identity, so it changes history. On local branches this is usually safe. On shared branches, rewriting published commits can disrupt teammates who already pulled that history. Interviewers expect you to mention this safety rule clearly. A good answer is that amend is excellent for local cleanup before push, but once pushed to shared remote branches, safer options like a new follow-up commit are preferred unless the team coordinates.

10. **What does \`git clone\` do vs \`git init\`?**  
    **Short Answer:** Init creates a new empty repository locally, while clone copies an existing repository and its full history.  
    **Detailed Explanation:** Initialization is used when starting a project from scratch in an existing folder. It creates repository metadata and begins tracking from your first commit onward. Cloning is used when joining an existing project, because it downloads code, branches, commit history, and remote linkage in one step. This distinction is frequently asked in beginner interviews. You can explain that init is for new local setup, while clone is for consuming an already hosted repository. Mention that clone also sets default remote information so push and pull workflows are immediately possible. Understanding this difference shows you know both project bootstrap scenarios and day to day collaborative setup.

---

## Related tutorials — quick links (topic-wise)

| Topic | Tutorial link |
|-------|----------------|
| **Git concepts overview** | [Git Introduction](/tutorial/git-introduction) |
| **Branches next** | [Git Branches](/tutorial/git-branches) |
| **Remotes & GitHub** | [GitHub Basics](/tutorial/github-basics) |
| **Java build output to ignore** | [Maven Project Structure](/tutorial/maven-project-structure) |
| **Team workflow** | [Git Workflow](/tutorial/git-workflow) |

## 30-Minute Practice Drill (Hands-on)

Use this quick routine to turn commands into muscle memory:

1. Create repo + first commit (\`git init\`, \`git add\`, \`git commit\`).
2. Edit the same file twice and create two separate commits with clear messages.
3. Add a second file, but stage only one file first; then commit the second file separately.
4. Run \`git log --oneline --graph\` and explain your history in plain words.
5. Create a \`.gitignore\` and verify ignored files are excluded from \`git status\`.

**Expected outcome:** You can clearly explain staging vs commit and produce clean commit history.

## Beginner Mistakes and Quick Fixes

- **Accidentally staged too much:** use \`git restore --staged <file>\`.
- **Wrong commit message:** use \`git commit --amend\` before pushing.
- **Forgot to track a new file:** check \`git status\` and run \`git add <file>\`.
- **Committed build/generated files:** update \`.gitignore\` and remove from index with \`git rm --cached <file>\`.

Keep practicing these commands - they're the foundation of everything in Git!

---

## Deep Theory: Git as Snapshot Graph, Not File Backup

Git fundamentals are graph theory plus content addressing:

- each commit is a snapshot node,
- edges represent parent relationships,
- branch names are movable pointers to graph tips.

Understanding this model is more important than memorizing commands.

### Staging Area Theory

The index is a deliberate snapshot constructor. It allows partial construction of the next commit state, which is why logical commit design is possible.

### Commit Quality Principle

A good commit is semantically atomic: one intent, one reversible unit. This property improves review quality, bisect effectiveness, and rollback safety.

### Why Freshers Struggle

Beginners see Git as "save files." Professionals use it as "model history." Once this mental shift happens, commands become predictable.
`
};

export default gitBasics;

