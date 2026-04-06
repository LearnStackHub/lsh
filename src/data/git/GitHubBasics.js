const githubBasics = {
  id: 'github-basics',
  title: 'GitHub Basics - Remote Repositories',
  description: 'Learn how to connect your local Git repository to GitHub, push and pull changes, and collaborate with others.',
  courseTitle: 'Git & GitHub',
  sectionTitle: 'GitHub Basics',
  content: `
# GitHub Basics - Remote Repositories

GitHub is like a cloud storage for your code. It hosts your Git repositories online so you can:
- Backup your code
- Share it with others
- Collaborate on projects
- Showcase your work

Think of it as **Git** (the tool) + **GitHub** (the platform).

---

## What is GitHub?

**GitHub** is a website that hosts Git repositories. It's the most popular platform for:
- Open source projects
- Code collaboration
- Portfolio showcase
- Team development

**Key Features:**
- Free public repositories
- Private repositories (free for individuals)
- Issue tracking
- Pull requests
- Code reviews
- GitHub Pages (host websites)

---

## Creating a GitHub Account

1. Go to [https://github.com](https://github.com)
2. Click "Sign up"
3. Enter your email, password, and username
4. Verify your email
5. Complete the setup

**Choose a good username:**
- Professional (for work)
- Memorable
- Not too long
- Available (GitHub will check)

---

## Creating Your First Repository

### Step 1: Create Repository on GitHub

1. Click the **"+"** icon in the top right
2. Select **"New repository"**
3. Fill in the details:
   - **Repository name**: \`my-java-project\`
   - **Description**: "My first Java project with Git"
   - **Visibility**: Public or Private
   - **Initialize**: Don't check "Add a README" (we'll push existing code)
4. Click **"Create repository"**

### Step 2: Copy the Repository URL

GitHub will show you the repository URL. It looks like:
\`\`\`
https://github.com/yourusername/my-java-project.git
\`\`\`

Copy this URL - you'll need it!

---

## Connecting Local Repository to GitHub

Now let's connect your local Git repository to GitHub:

### Step 1: Add Remote

In your local project folder:

\`\`\`bash
git remote add origin https://github.com/yourusername/my-java-project.git
\`\`\`

**Verify it was added:**
\`\`\`bash
git remote -v
\`\`\`

**Output:**
\`\`\`
origin  https://github.com/yourusername/my-java-project.git (fetch)
origin  https://github.com/yourusername/my-java-project.git (push)
\`\`\`

\`origin\` is the default name for your remote repository.

---

## Pushing to GitHub

Now let's upload your code to GitHub:

### Step 1: Make Sure You Have Commits

\`\`\`bash
git log --oneline
\`\`\`

You should see at least one commit.

### Step 2: Push to GitHub

\`\`\`bash
git push -u origin main
\`\`\`

**What this does:**
- \`push\`: Upload your commits
- \`-u\`: Set upstream (so future pushes are easier)
- \`origin\`: The remote repository
- \`main\`: The branch to push

**First time?** GitHub will ask for authentication:
- Username: Your GitHub username
- Password: Use a **Personal Access Token** (not your password)

---

## Creating a Personal Access Token

GitHub requires tokens for authentication:

1. Go to GitHub → Settings → Developer settings
2. Click "Personal access tokens" → "Tokens (classic)"
3. Click "Generate new token"
4. Give it a name: "My Computer"
5. Select scopes: Check **"repo"** (full control)
6. Click "Generate token"
7. **Copy the token immediately** (you won't see it again!)

**Use this token as your password when pushing.**

---

## After First Push

Refresh your GitHub repository page. You should see:
- Your files
- Commit history
- Branch information

Your code is now on GitHub! 🎉

---

## Pulling from GitHub

To download changes from GitHub:

\`\`\`bash
git pull origin main
\`\`\`

This downloads and merges changes from GitHub into your local repository.

---

## Making Changes and Pushing

### Workflow:

\`\`\`bash
# 1. Make changes to your code
# ... edit files ...

# 2. Check what changed
git status

# 3. Stage changes
git add .

# 4. Commit
git commit -m "Add new feature"

# 5. Push to GitHub
git push
\`\`\`

After the first push with \`-u\`, you can just use \`git push\`!

---

## Cloning a Repository

To get a copy of someone else's repository (or your own on another computer):

\`\`\`bash
git clone https://github.com/username/repository-name.git
\`\`\`

This:
- Downloads the repository
- Creates a local copy
- Sets up the remote automatically

**Example:**
\`\`\`bash
git clone https://github.com/Dattakumar369/learnstackhub.git
cd learnstackhub
\`\`\`

---

## Viewing Remote Information

**See all remotes:**
\`\`\`bash
git remote -v
\`\`\`

**See remote URL:**
\`\`\`bash
git remote get-url origin
\`\`\`

**Change remote URL:**
\`\`\`bash
git remote set-url origin https://github.com/newusername/newrepo.git
\`\`\`

---

## Real-World Example

Let's say you're working on a Java project:

\`\`\`bash
# Day 1: Create local project
mkdir ecommerce-app
cd ecommerce-app
git init
echo 'public class App { }' > App.java
git add .
git commit -m "Initial project setup"

# Create GitHub repository (on website)
# Then connect:
git remote add origin https://github.com/yourusername/ecommerce-app.git
git push -u origin main

# Day 2: Work on feature
# ... make changes ...
git add .
git commit -m "Add product catalog"
git push

# Day 3: Work on another computer
git clone https://github.com/yourusername/ecommerce-app.git
cd ecommerce-app
# ... make changes ...
git add .
git commit -m "Add shopping cart"
git push
\`\`\`

---

## Common GitHub Commands

| Command | Purpose |
|---------|---------|
| \`git remote add origin <url>\` | Connect to GitHub |
| \`git push -u origin main\` | First push |
| \`git push\` | Push changes |
| \`git pull\` | Download changes |
| \`git clone <url>\` | Copy repository |
| \`git remote -v\` | View remotes |
| \`git fetch\` | Download without merging |

---

## Best Practices

1. **Push regularly**: Don't lose work - push often
2. **Pull before push**: Get latest changes first
3. **Write good commits**: Clear messages help everyone
4. **Use branches**: Don't push directly to main
5. **Keep tokens safe**: Don't share your access token

---

## Troubleshooting

### "Authentication failed"
- Use Personal Access Token, not password
- Check token has "repo" scope

### "Repository not found"
- Check repository name is correct
- Verify you have access

### "Updates were rejected"
- Someone else pushed changes
- Pull first: \`git pull\`, then push

---

## Summary

You've learned:
- What GitHub is and why it's useful
- How to create a GitHub repository
- How to connect local and remote repositories
- How to push and pull changes
- How to clone repositories

**Next Steps:**
- Learn about pull requests
- Understand collaboration workflows
- Explore GitHub features (Issues, Projects, etc.)

---

## 10 Important GitHub Basics Interview Questions

1. **What is GitHub?**  
   **GitHub** is a **hosting platform** for Git repositories: **backup**, **collaboration**, **issues**, **pull requests**, **Actions (CI)**. **Git** is local; **GitHub** is the **remote** most teams use.

2. **What is \`origin\`?**  
   The default **name** for your **primary remote** URL (\`git@github.com:user/repo.git\` or HTTPS). **\`git push origin main\`** sends commits to that remote.

3. **Difference between \`git fetch\` and \`git pull\`?**  
   **\`fetch\`** downloads new commits to **remote-tracking** branches **without** merging into your branch. **\`pull\`** is typically **fetch + merge** (or rebase)—updates **your** current branch.  
   **Safe learning:** \`git fetch\` then \`git log origin/main\` then merge when you understand.

4. **What does \`git push -u origin main\` do?**  
   Pushes **\`main\`** and sets **upstream** tracking so later you can type just **\`git push\`** / **\`git pull\`**. **\`-u\`** remembers the pairing.

5. **What is \`git clone\`?**  
   Copies a remote repo **with full history** into a new folder. This is how you **start** on an existing team project. **HTTPS** needs token/password; **SSH** needs a key.

6. **HTTPS vs SSH for GitHub?**  
   **HTTPS:** simpler start, uses **personal access token** instead of password. **SSH:** \`git@github.com:...\` URLs, key-based—no typing token each push once set up.

7. **What is a README on GitHub?**  
   **\`README.md\`** is shown on the repo home page—explain **how to run** the project, prerequisites (Java 17, Maven), and **contribution** rules.

8. **What happens if push is “rejected”?**  
   Remote has commits you don’t (**someone else pushed**). **Fix:** \`git pull\` (or \`fetch\` + merge/rebase), **resolve conflicts**, then **push** again—never **force push** to **shared** \`main\` without permission.

9. **What is a fork?**  
   Your **copy** of someone else’s repo under **your** GitHub account—used for **open source** contributions or when you **don’t** have write access to the original.

10. **Why use \`.gitignore\` before first push?**  
    Stops committing **build folders** (\`target/\`), **secrets**, and IDE junk. Easier to set **early** than to **purge** secrets from history later.

---

## Related tutorials — quick links (topic-wise)

| Topic | Tutorial link |
|-------|----------------|
| **Local Git first** | [Git Basics](/tutorial/git-basics) |
| **Branches on remotes** | [Git Branches](/tutorial/git-branches) |
| **Code review flow** | [GitHub Pull Requests](/tutorial/github-pull-requests) |
| **Secure account & tokens** | [GitHub Security](/tutorial/github-security) |
| **REST APIs (GitHub is HTTP-based)** | [REST API Fundamentals](/tutorial/rest-api-fundamentals) |

## Remote Collaboration Checklist (Daily Use)

Before opening a PR, do this every time:

1. \`git fetch origin\` and sync your branch with target branch.
2. Run tests locally.
3. Push latest commits and verify CI status on GitHub.
4. Add a PR description: what changed, why, and how tested.
5. Link issue/ticket IDs for traceability.

This improves review speed and reduces back-and-forth comments.

## HTTPS vs SSH: Quick Decision

- **Use HTTPS + PAT** if you are a beginner or restricted corporate environment.
- **Use SSH** if you want smoother frequent pushes and key-based auth.
- In both cases, never hardcode tokens/keys in repository files.

Your code is now safely backed up and shareable on GitHub!
`
};

export default githubBasics;

