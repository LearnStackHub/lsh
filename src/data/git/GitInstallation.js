const gitInstallation = {
  id: 'git-installation',
  title: 'Git Installation & Setup',
  description: 'Step-by-step guide to install Git on Windows, Mac, and Linux, and verify the installation',
  courseTitle: 'Git & GitHub',
  sectionTitle: 'Git Basics',
  content: `
# Git Installation & Setup - Complete Guide

Before you can use Git, you need to install it on your computer. The installation process is different for Windows, Mac, and Linux. Let me walk you through each one.

## Installation Methods

### Method 1: Official Git Website (Recommended)

The easiest way is to download Git from the official website.

**Download Link:** [https://git-scm.com/downloads](https://git-scm.com/downloads)

The website automatically detects your operating system and shows the correct download.

---

## Windows Installation

### Step 1: Download Git for Windows

1. Go to [https://git-scm.com/download/win](https://git-scm.com/download/win)
2. Click the download button
3. The installer will download (usually named something like \`Git-2.x.x-64-bit.exe\`)

### Step 2: Run the Installer

1. Double-click the downloaded file
2. Click "Next" through the setup wizard
3. **Important settings to choose:**
   - **Editor**: Choose your preferred text editor (Notepad++, VS Code, etc.)
   - **Default branch name**: Leave as "main" (recommended)
   - **PATH environment**: Choose "Git from the command line and also from 3rd-party software"
   - **Line ending conversions**: Choose "Checkout Windows-style, commit Unix-style line endings"
   - **Terminal emulator**: Choose "Use Windows' default console window"
   - **Default behavior**: Choose "Git Credential Manager" for authentication

4. Click "Install" and wait for installation to complete

### Step 3: Verify Installation

Open **Command Prompt** or **PowerShell** and type:

\`\`\`bash
git --version
\`\`\`

You should see something like: \`git version 2.42.0\`

If you see a version number, Git is installed successfully!

---

## Mac Installation

### Method 1: Using Homebrew (Recommended)

If you have Homebrew installed:

\`\`\`bash
brew install git
\`\`\`

### Method 2: Using Official Installer

1. Go to [https://git-scm.com/download/mac](https://git-scm.com/download/mac)
2. Download the macOS installer
3. Open the downloaded \`.dmg\` file
4. Double-click the \`.pkg\` installer
5. Follow the installation wizard
6. Click "Install"

### Step 3: Verify Installation

Open **Terminal** and type:

\`\`\`bash
git --version
\`\`\`

You should see: \`git version 2.42.0\` (or similar)

---

## Linux Installation

### Ubuntu/Debian

\`\`\`bash
sudo apt update
sudo apt install git
\`\`\`

### Fedora/CentOS/RHEL

\`\`\`bash
sudo dnf install git
\`\`\`

### Arch Linux

\`\`\`bash
sudo pacman -S git
\`\`\`

### Verify Installation

Open terminal and type:

\`\`\`bash
git --version
\`\`\`

---

## Initial Git Configuration

After installation, you need to configure Git with your name and email. This information will be used in all your commits.

### Configure Your Identity

Open terminal (Command Prompt on Windows, Terminal on Mac/Linux) and run:

\`\`\`bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
\`\`\`

**Example:**
\`\`\`bash
git config --global user.name "Dattakumar"
git config --global user.email "dattudattakumar369@gmail.com"
\`\`\`

### Verify Configuration

Check your settings:

\`\`\`bash
git config --global user.name
git config --global user.email
\`\`\`

### View All Configuration

\`\`\`bash
git config --list
\`\`\`

---

## Additional Useful Configurations

### Set Default Branch Name

\`\`\`bash
git config --global init.defaultBranch main
\`\`\`

### Set Default Editor

**For VS Code:**
\`\`\`bash
git config --global core.editor "code --wait"
\`\`\`

**For Notepad++ (Windows):**
\`\`\`bash
git config --global core.editor "'C:/Program Files/Notepad++/notepad++.exe' -multiInst -notabbar -nosession -noPlugin"
\`\`\`

**For Nano (Linux/Mac):**
\`\`\`bash
git config --global core.editor "nano"
\`\`\`

### Enable Color Output

\`\`\`bash
git config --global color.ui auto
\`\`\`

---

## Testing Your Installation

Let's do a quick test to make sure everything works:

### Step 1: Create a Test Folder

\`\`\`bash
mkdir test-git
cd test-git
\`\`\`

### Step 2: Initialize Git

\`\`\`bash
git init
\`\`\`

You should see: \`Initialized empty Git repository in .../test-git/.git/\`

### Step 3: Create a Test File

\`\`\`bash
echo "Hello Git!" > test.txt
\`\`\`

### Step 4: Check Status

\`\`\`bash
git status
\`\`\`

You should see \`test.txt\` listed as an untracked file.

### Step 5: Add and Commit

\`\`\`bash
git add test.txt
git commit -m "First commit"
\`\`\`

If you see a commit message, everything is working!

### Step 6: Clean Up

\`\`\`bash
cd ..
rm -rf test-git  # On Windows: rmdir /s test-git
\`\`\`

---

## Troubleshooting

### "git: command not found"

**Windows:**
- Restart your terminal/Command Prompt
- Make sure you selected "Git from the command line" during installation
- Check if Git is in your PATH: \`echo %PATH%\`

**Mac/Linux:**
- Make sure Git is installed: \`which git\`
- If not found, reinstall Git

### "Permission Denied" Errors

**Mac/Linux:**
- Use \`sudo\` for installation commands
- Check file permissions

**Windows:**
- Run Command Prompt as Administrator

### Configuration Not Saving

- Make sure you're using \`--global\` flag
- Check if you have write permissions

---

## What's Next?

Now that Git is installed and configured, you're ready to:
1. Create your first repository
2. Make your first commit
3. Learn Git basics

---

## Summary

**Installation Complete!**

You've successfully:
- Installed Git on your system
- Configured your name and email
- Tested the installation
- Set up useful defaults

**Next Tutorial:** Git Basics - Creating Your First Repository

---

## 10 Important Git Installation Interview Questions

1. **How do you check if Git is already installed?**  
   Open a terminal and run **\`git --version\`**. If you see a version (e.g. \`git version 2.43\`), Git is installed. If you get “command not found,” install Git for your OS.

2. **What is the difference between Git and Git GUI tools?**  
   **Git** is the **command-line** program. GUIs (GitHub Desktop, IDE plugins) call the same Git underneath. **Interviews** still expect you to know basic **CLI** commands.

3. **Why set \`user.name\` and \`user.email\`?**  
   Every **commit** records **who** made it. Git uses **\`git config --global user.name "..."\`** and **\`user.email\`**. Use the **same email** as your GitHub account (or your company email) so commits **link** to your profile.

4. **What does \`--global\` mean in \`git config\`?**  
   Settings apply to **all repositories** on your machine (stored in your home directory). **Without** \`--global\`, config applies **only** to the **current** repo (useful for work vs personal on one PC).

5. **How do you see your Git configuration?**  
   **\`git config --list\`** shows all settings. **\`git config user.email\`** shows one value. Use this when debugging “wrong author on commits.”

6. **What is the default branch name—\`main\` or \`master\`?**  
   New Git versions often default to **\`main\`**. Older tutorials say **\`master\`**. Both are just **names**; teams pick one and stay consistent. You can set **\`init.defaultBranch\`** in config.

7. **On Windows, why use Git Bash vs PowerShell?**  
   **Git Bash** provides Unix-like commands and paths many tutorials assume. **PowerShell** works too with Git for Windows. Pick one terminal and learn **\`cd\`** into your project folder before running Git.

8. **What if \`git\` is not recognized after install?**  
   **PATH** is wrong or terminal wasn’t restarted. Re-run the installer with “Add Git to PATH,” or add **\`.../Git/cmd\`** manually to **PATH**, then **open a new** terminal.

9. **Should you install Git as administrator?**  
   On Windows, **admin** can help with PATH for all users. For learning, per-user install is fine. **Avoid** running every Git command as admin day-to-day.

10. **What’s the next step after installation?**  
    Run **\`git config --global --list\`**, create a test folder, **\`git init\`**, **\`git status\`**—confirm nothing errors. Then follow **[Git Basics](/tutorial/git-basics)**.

---

## Related tutorials — quick links (topic-wise)

| Topic | Tutorial link |
|-------|----------------|
| **What Git is (concepts)** | [Git Introduction](/tutorial/git-introduction) |
| **Next: first repo & commits** | [Git Basics](/tutorial/git-basics) |
| **Editor / IDE setup** | [Java Environment Setup](/tutorial/java-environment-setup) |
| **Project + build files** | [Maven Introduction](/tutorial/maven-introduction) |
| **SSH keys (later, for GitHub)** | [GitHub Security](/tutorial/github-security) |

## Enterprise-Ready Setup (After Basic Install)

Once Git works locally, add these quality-of-life settings:

\`\`\`bash
git config --global pull.rebase false
git config --global fetch.prune true
git config --global rerere.enabled true
git config --global core.autocrlf true   # Windows only
\`\`\`

- **fetch.prune** removes stale remote-tracking branches.
- **rerere** remembers conflict resolutions for repeated merges.
- Proper line-ending settings reduce cross-OS noise in commits.

## Verification Commands to Save

\`\`\`bash
git --version
git config --global --list
git config --show-origin --list
\`\`\`

If these commands look clean, your machine is ready for real team projects.

Ready to start using Git? Let's move forward!
`
};

export default gitInstallation;

