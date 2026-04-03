const gitIntroduction = {
  id: 'git-introduction',
  title: 'Introduction to Git',
  description: 'Learn what Git is, why it\'s essential for developers, and how it helps manage code versions',
  courseTitle: 'Git & GitHub',
  sectionTitle: 'Git Basics',
  content: `
# Introduction to Git - Version Control System

Software development requires tracking code changes, collaborating with teams, and maintaining project history. Developers need to revert changes, experiment with features, and merge contributions from multiple team members. Git provides these capabilities through distributed version control.

## What is Git?

**Git** is a **distributed version control system** that tracks changes in source code over time. Git maintains a complete history of modifications, enabling developers to revert to previous versions, compare changes, and collaborate effectively across distributed teams.

### Why Version Control is Essential

**Development Challenges Without Version Control:**

**Without Git:**
- You save your code as \`project_v1.java\`, \`project_v2.java\`, \`project_v2_final.java\`, \`project_v2_final_really_final.java\`
- You lose track of what changed in each version
- Working with a team becomes a nightmare
- You accidentally delete important code and can't recover it

**With Git:**
- One project folder, Git tracks all changes
- You can see exactly what changed and when
- Multiple people can work on the same code
- You can always go back to any previous version

## Key Concepts

### Repository (Repo)
A **repository** is like a folder that Git watches. It contains all your project files and Git's history of changes.

### Commit
A **commit** is like a snapshot of your code at a specific point in time. It's like taking a photo of your code and saving it with a message describing what changed.

### Branch
A **branch** is like a parallel universe for your code. You can create a branch to try new features without affecting your main code.

### Remote
A **remote** is a copy of your repository stored somewhere else (like GitHub). It's like a backup in the cloud that your team can access.

## Git Workflow Overview

**Standard Development Workflow:**

1. **Initialize** a Git repository in your project folder
2. **Add** files you want to track
3. **Commit** your changes with a message
4. **Push** to a remote repository (like GitHub)
5. **Pull** changes from others
6. **Branch** to work on new features

## Real-World Development Workflow Example

The following example demonstrates Git usage in a typical Java web application development scenario:

\`\`\`bash
# Day 1: You create the project
git init
git add .
git commit -m "Initial project setup"

# Day 2: You add user login feature
git add .
git commit -m "Add user login functionality"

# Day 3: You add database connection
git add .
git commit -m "Add MySQL database connection"

# Day 4: Something breaks! You can go back
git log  # See all your commits
git checkout <previous-commit-id>  # Go back in time
\`\`\`

## Benefits of Using Git

1. **Version History**: See every change you've ever made
2. **Collaboration**: Multiple developers can work together seamlessly
3. **Backup**: Your code is safe in multiple places
4. **Experimentation**: Try new things without fear - you can always go back
5. **Documentation**: Commit messages document what and why you changed things

## Git vs GitHub

**Git** is the tool that runs on your computer. It's the version control system.

**GitHub** is a website that hosts Git repositories online. It's like Dropbox for code, but much more powerful.

- **Git** = The tool (runs on your computer)
- **GitHub** = The platform (hosts your code online)

## Common Git Commands (Quick Reference)

Don't worry if these don't make sense yet - we'll cover each one in detail:

- \`git init\` - Start tracking a folder
- \`git add\` - Stage files for commit
- \`git commit\` - Save a snapshot
- \`git push\` - Upload to GitHub
- \`git pull\` - Download from GitHub
- \`git branch\` - Create or list branches
- \`git merge\` - Combine branches
- \`git status\` - See what's changed

## When Should You Use Git?

**Always!** Seriously, use Git for:
- Any coding project (even small ones)
- School assignments
- Personal projects
- Team projects
- Open source contributions

Even if you're working alone, Git helps you:
- Track your progress
- Experiment safely
- Keep a backup
- Document your work

## Getting Started

In the next tutorials, we'll cover:
1. Installing Git on your computer
2. Creating your first repository
3. Making your first commit
4. Working with GitHub
5. Collaborating with others

## Summary

Git is an essential tool for every developer. It helps you:
- Track changes in your code
- Work with teams
- Experiment safely
- Keep backups
- Document your work

Git serves as both a safety mechanism for code recovery and a collaboration platform for team development. Its version control capabilities are essential for professional software development, enabling developers to maintain code history, collaborate effectively, and manage project evolution systematically.

---

## 10 Important Git Introduction Interview Questions

1. **What is Git in simple words?**  
   Git is a **version control** tool that runs on your computer. It remembers **every saved snapshot (commit)** of your project so you can **see history**, **compare changes**, **undo mistakes**, and **work in parallel** with others without emailing ZIP files.  
   **Interview one-liner:** “Git is a **distributed version control system** for tracking source code history.”

2. **What is the difference between Git and GitHub?**  
   **Git** is the **engine** (commands like \`git commit\`, \`git merge\`)—you can use it with **no** internet. **GitHub** is a **website** that **hosts** Git repositories online (backup, issues, pull requests).  
   **Analogy:** Git is **MS Word**; GitHub is **OneDrive** where you store and share the document—plus team features.

3. **What does “distributed” version control mean?**  
   Every clone of the repo carries the **full history** locally. You can commit **offline**; later you **push** to share. Older “centralized” tools depended on **one server** for almost every operation.  
   **Why it matters:** Faster work, branches are cheap, and you still have history if the remote goes down.

4. **What is a repository?**  
   A **folder** where Git stores your **files** plus a hidden **\`.git\`** directory with **all commits, branches, and metadata**.  
   **Fresher tip:** Until you \`git init\` (or clone), it’s just a normal folder—Git is not tracking it yet.

5. **What is a commit?**  
   A commit is a **snapshot** of the project at one moment, with a **message** explaining *why* the change happened. It has a unique **hash** (ID).  
   **Good habit:** Small, logical commits (one feature or fix per commit when possible)—easier to review and revert.

6. **What is a branch?**  
   A branch is a **movable pointer** to a line of commits—usually used for a **feature** or **bugfix** so \`main\` stays stable.  
   **Interview:** “Branches let teams work in parallel and merge when code is ready.”

7. **What is a remote?**  
   A **remote** (often named \`origin\`) is a **URL** pointing to another copy of the repo—typically on **GitHub**, GitLab, or Bitbucket. \`git push\` / \`git pull\` sync your machine with that remote.

8. **Why should a fresher use Git even on solo projects?**  
   You get **undo**, **experimentation** on branches, a **timeline** of your learning, and the **same habits** companies expect. It also backs up your work once you push to a remote.

9. **What is the basic Git workflow in one sequence?**  
   **Modify files** → **\`git status\`** (see changes) → **\`git add\`** (stage) → **\`git commit\`** (save snapshot) → **\`git push\`** (share, when using a remote).  
   You’ll practice each step in the next tutorials.

10. **Is Git only for Java?**  
    **No.** Git tracks **any** text-based project (Java, Python, web, docs). Your job uses Git for **whatever** stack the team has.

---

## Related tutorials — quick links (topic-wise)

These fit **version control + starting a dev career** alongside this page:

| Topic | Tutorial link |
|-------|----------------|
| **SDLC & how teams ship software** | [SDLC Introduction](/tutorial/sdlc-introduction) |
| **Next: install Git** | [Git Installation](/tutorial/git-installation) |
| **Build tool (clone → build)** | [Maven Introduction](/tutorial/maven-introduction) |
| **JDK & PATH (before coding)** | [Java Environment Setup](/tutorial/java-environment-setup) |
| **Typical Java app structure** | [Spring Boot Project Setup](/tutorial/spring-boot-project-setup) |
| **Hosting code online** | [GitHub Basics](/tutorial/github-basics) |

---

**Next Steps:**
- Install Git on your computer
- Create your first repository
- Make your first commit

Ready to dive in? Let's move to the next tutorial!
`
};

export default gitIntroduction;

