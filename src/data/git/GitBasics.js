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
   **Working directory:** files on disk as you edit them. **Staging area (index):** what you’ve marked with **\`git add\`** for the **next** commit. **Repository:** committed snapshots stored in **\`.git\`**.  
   **Flow:** edit → **add** → **commit**.

2. **What does \`git status\` tell you?**  
   Which branch you’re on, **untracked** files, **modified** files not staged, and **staged** files ready to commit. **Always** run it when you’re unsure what Git sees.

3. **What is staging? Why not commit directly?**  
   Staging lets you **choose** which hunks/files go into **one logical commit**. Example: fix a typo and a big feature in the same folder—you can **stage only** the typo for a small commit.

4. **What makes a good commit message?**  
   **Imperative, short subject** (e.g. “Add login validation”), optional body with **why**. Avoid vague messages like “fix” or “changes.” Future you (and reviewers) read the **log** like a diary.

5. **What does \`git log\` show?**  
   Commit history: hashes, authors, dates, messages. **\`git log --oneline\`** is a compact view. Use it to find a commit to **revert** or **cherry-pick**.

6. **What is \`HEAD\`?**  
   **HEAD** points to your **current commit** (usually the tip of your current **branch**). “Detached HEAD” means HEAD points **directly** to a commit—not wrong, but know what you’re doing.

7. **What is \`.gitignore\`?**  
   A file listing patterns for files Git **should not track** (\`target/\`, \`.class\`, \`node_modules/\`, IDE folders, secrets). **Never** commit passwords or **\`.env\`** with real keys.

8. **Difference between \`git add .\` and \`git add -p\`?**  
   **\`.\`** stages **everything** changed (risky if you mixed unrelated edits). **\`-p\`** (patch) lets you **interactively** stage parts of a file—**better** for clean commits.

9. **Can you change the last commit message?**  
   **\`git commit --amend\`** rewrites the **latest** commit (message and/or contents). **Warning:** if you already **pushed** that commit, amending rewrites history—coordinate with the team.

10. **What does \`git clone\` do vs \`git init\`?**  
    **\`git init\`** starts a **new** repo in an existing folder. **\`git clone <url>\`** **downloads** an existing remote repo with history. Freshers use **clone** daily when joining a team.

---

## Related tutorials — quick links (topic-wise)

| Topic | Tutorial link |
|-------|----------------|
| **Git concepts overview** | [Git Introduction](/tutorial/git-introduction) |
| **Branches next** | [Git Branches](/tutorial/git-branches) |
| **Remotes & GitHub** | [GitHub Basics](/tutorial/github-basics) |
| **Java build output to ignore** | [Maven Project Structure](/tutorial/maven-project-structure) |
| **Team workflow** | [Git Workflow](/tutorial/git-workflow) |

Keep practicing these commands - they're the foundation of everything in Git!
`
};

export default gitBasics;

