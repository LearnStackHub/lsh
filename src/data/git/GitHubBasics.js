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
   **Short Answer:** GitHub is a cloud platform for hosting Git repositories and enabling collaboration features around code.  
   **Detailed Explanation:** Git handles local version control, while GitHub provides remote hosting and team collaboration workflows on top of Git. It offers repository hosting, pull requests, reviews, issues, actions automation, release management, and access controls. Interviewers usually expect you to distinguish between Git tool and GitHub platform clearly. Mention that GitHub is widely used for backup, team development, open-source contribution, and portfolio visibility. A strong answer includes practical collaboration context, such as using pull requests and branch protection to maintain quality. This demonstrates understanding of both technical storage and workflow capabilities.

2. **What is \`origin\`?**  
   **Short Answer:** Origin is the default alias pointing to the main remote repository URL in your local clone.  
   **Detailed Explanation:** When you clone a repository, Git automatically creates a remote named origin that references the source URL. This alias makes commands shorter and easier, such as pushing branches or fetching updates. In interviews, explain that origin is only a name and can be changed; multiple remotes are possible for workflows like upstream and personal fork. Understanding remotes is important because collaboration depends on reliable synchronization between local and hosted repositories. Mentioning remote aliases and tracking relationships shows stronger practical experience than simply memorizing push commands.

3. **Difference between \`git fetch\` and \`git pull\`?**  
   **Short Answer:** Fetch updates remote-tracking data only, while pull updates and then integrates into your current branch.  
   **Detailed Explanation:** Fetch is a safe synchronization step because it downloads new remote commits without changing your working branch. You can inspect incoming changes before deciding how to integrate. Pull combines fetch and merge or rebase, so it directly modifies current branch state. Interviewers ask this to check safe workflow awareness. A mature answer highlights that fetch-first approach gives better control, especially before important merges. Pull is convenient but can surprise beginners if done without context. Understanding this difference helps avoid accidental conflicts and supports deliberate integration in collaborative projects.

4. **What does \`git push -u origin main\` do?**  
   **Short Answer:** It pushes local main branch and sets upstream tracking so future push and pull can run without full arguments.  
   **Detailed Explanation:** The first push of a new branch often needs explicit remote and branch names. Adding upstream option stores relationship between local branch and remote branch so later commands can infer target automatically. This improves daily workflow speed and reduces command errors. Interviewers appreciate candidates who understand branch tracking instead of blindly repeating command templates. Mention that tracking is especially useful when working with many feature branches. If tracking is wrong, push and pull may target unexpected branches, so verifying branch status remains important. This demonstrates practical command understanding and workflow reliability.

5. **What is \`git clone\`?**  
   **Short Answer:** Clone creates a complete local copy of a remote repository, including full commit history and remote linkage.  
   **Detailed Explanation:** Cloning is the standard onboarding action for existing projects. It downloads all commits and branch references needed for local development and automatically sets remote configuration for future synchronization. Interviewers often ask this to confirm understanding of project setup lifecycle. Mention that clone differs from downloading zip files because version history and collaboration metadata are preserved. Also mention authentication methods, such as HTTPS token or SSH key, depending on repository access policy. This demonstrates readiness for real team workflows where code changes must be versioned and synchronized properly.

6. **HTTPS vs SSH for GitHub?**  
   **Short Answer:** HTTPS uses tokens for authentication, while SSH uses key pairs and is usually smoother for frequent push operations.  
   **Detailed Explanation:** Both protocols are secure when configured correctly, but their developer experience differs. HTTPS is beginner-friendly and works in most network environments, though token handling may feel repetitive. SSH requires key setup initially but offers convenient credential-less push flow afterward. Interviewers look for practical tradeoff awareness, not protocol loyalty. You can mention organizational policy or firewall restrictions may influence choice. Also note that whichever method is used, secrets must be stored safely and rotated when needed. A clear, balanced answer reflects operational experience and security awareness in source control setup.

7. **What is a README on GitHub?**  
   **Short Answer:** README is the primary project entry document explaining purpose, setup, usage, and contribution guidance.  
   **Detailed Explanation:** On GitHub, README content appears prominently and serves as first impression for collaborators, recruiters, and open-source users. A strong README includes project overview, prerequisites, installation, run steps, examples, contribution rules, and contact or licensing notes. Interviewers may ask this to assess communication mindset, not only coding skill. Good documentation reduces onboarding friction and support burden. Mention that keeping README updated with current commands and environment requirements is essential as project evolves. This shows you understand maintainability and developer experience as part of engineering quality.

8. **What happens if push is “rejected”?**  
   **Short Answer:** Rejection usually means remote has newer commits, so you must sync, integrate, and then push again.  
   **Detailed Explanation:** Push rejection protects remote history from accidental overwrite when your local branch is behind. The correct response is to fetch or pull latest changes, resolve any conflicts, retest, and push updated branch. Interviewers expect you to avoid immediate force push on shared branches. Mention that force may be acceptable only in controlled private branch scenarios. This answer demonstrates collaboration safety and history integrity awareness. Handling rejections correctly is a daily skill in multi-developer repositories and directly impacts team productivity and trust in source control process.

9. **What is a fork?**  
   **Short Answer:** A fork is your personal server-side copy of another repository used for independent development and contribution.  
   **Detailed Explanation:** Forking lets contributors work freely without direct write access to original project. You can push branches to your fork and open pull requests back to upstream repository. This model is central to open-source collaboration and external contributions in large organizations. Interviewers value awareness of fork-specific concepts such as upstream remote synchronization and keeping fork current with original repository. Mentioning these operational details shows practical understanding, not only definition memory. Fork workflow also improves security by limiting direct access while still enabling broad participation and code review.

10. **Why use \`.gitignore\` before first push?**  
    **Short Answer:** Setting ignore rules early prevents accidental commits of generated files, local noise, and sensitive data.  
    **Detailed Explanation:** Early ignore configuration keeps repository clean from the beginning. Without it, build outputs, editor files, and secret configs may get committed and become hard to remove from full history. Interviewers appreciate candidates who treat this as proactive hygiene rather than afterthought cleanup. A clean repository improves review focus, reduces storage bloat, and lowers security risk. Mention that once secrets enter history, remediation is difficult and often requires history rewriting plus credential rotation. This demonstrates practical security and maintainability mindset expected in professional development teams.

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

