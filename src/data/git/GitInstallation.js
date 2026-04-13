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
   **Short Answer:** Run git version command in terminal; if a version appears, Git is installed correctly.  
   **Detailed Explanation:** The standard verification method after installation is checking version output from terminal. If the command returns a valid version string, Git executable is available in your shell path and ready to use. If command is not recognized, either installation failed or environment path is not configured. In interviews, mention that opening a new terminal session is often required after install so path changes apply. Also explain that verification should be done in the same shell you plan to use daily, such as PowerShell, Command Prompt, or Bash. This confirms practical readiness, not just that installer completed.

2. **What is the difference between Git and Git GUI tools?**  
   **Short Answer:** Git is the core version-control engine, while GUI tools are interfaces built on top of Git commands.  
   **Detailed Explanation:** GUI clients make common operations easier through buttons and visual flows, but the underlying version control logic still comes from Git itself. That means commit history, branches, merges, and remotes behave the same whether you use terminal or UI. Interviewers usually expect command-line familiarity because it shows deeper understanding and works in any environment, including servers and CI pipelines. A good answer says GUIs improve convenience, especially for beginners, but core concepts remain command-based. Knowing both is valuable: CLI for precision and troubleshooting, GUI for quick visualization and daily usability.

3. **Why set \`user.name\` and \`user.email\`?**  
   **Short Answer:** These values identify commit authorship, so every commit is correctly attributed to you.  
   **Detailed Explanation:** Git stores author name and email metadata in each commit object. Without proper configuration, commits may appear under incorrect identity, making collaboration and audit history confusing. In professional teams, accurate authorship supports accountability, review communication, release tracing, and compliance requirements. Interviewers often expect candidates to know both global and repository-specific identity setup, especially when using separate work and personal accounts. Mentioning this distinction shows practical experience. Proper identity configuration should be one of the first steps after installation, before creating repositories, so all future commits carry correct attribution from day one.

4. **What does \`--global\` mean in \`git config\`?**  
   **Short Answer:** Global means the setting applies to all repositories on your machine for that user account.  
   **Detailed Explanation:** Git configuration can exist at multiple levels: system, global user, and local repository. Global level is ideal for preferences you want everywhere, such as your default name, email, editor, and color output. Local configuration overrides global values for a specific project, useful when project requirements differ. In interviews, explaining precedence order demonstrates strong fundamentals. You can describe global as personal defaults and local as project-specific customization. This distinction matters in real work, especially when one machine is used for multiple organizations with different policies or identities. Proper scope selection avoids accidental misconfiguration.

5. **How do you see your Git configuration?**  
   **Short Answer:** Use config list and targeted config queries to inspect active values and troubleshoot setup issues.  
   **Detailed Explanation:** Configuration inspection is important when Git behaves unexpectedly, such as wrong author, incorrect editor, or pull strategy confusion. Listing all values gives broad visibility, while querying one key confirms precise settings. In advanced troubleshooting, showing value origin helps identify whether a setting comes from system, global, or local config. Interviewers appreciate candidates who know how to debug environment issues instead of reinstalling blindly. A practical answer includes verifying configuration immediately after setting it and rechecking before first commit in a new machine setup. This prevents repeated mistakes and saves team onboarding time.

6. **What is the default branch name—\`main\` or \`master\`?**  
   **Short Answer:** Modern setups generally use main, while older repos may still use master depending on historical defaults.  
   **Detailed Explanation:** Branch naming default changed in many tools to main, but older repositories and legacy tutorials may still reference master. Technically, both names work because branch names are conventions, not functional differences. Interviewers look for adaptability: you should recognize either branch and follow project standards. Good practice is setting default branch preference in your local Git configuration to avoid creating inconsistent branch names in new repositories. In team settings, consistency matters more than personal preference because scripts, CI, and documentation often depend on expected branch names. Clear branch naming avoids onboarding and automation confusion.

7. **On Windows, why use Git Bash vs PowerShell?**  
   **Short Answer:** Git Bash offers Unix-style behavior many tutorials use, while PowerShell integrates better with native Windows workflows.  
   **Detailed Explanation:** Both terminals can run Git, but they differ in command syntax, path style, and ecosystem familiarity. Git Bash is useful when following cross-platform tutorials that assume Unix commands. PowerShell is excellent for Windows-native scripting and system administration tasks. Interviewers may ask this to assess practical tool awareness rather than preference. A strong answer is that you can work effectively in either shell as long as you understand navigation, path handling, and environment behavior. Team consistency can also matter, especially for onboarding docs and scripts. Choose one primary shell and be comfortable with the other when needed.

8. **What if \`git\` is not recognized after install?**  
   **Short Answer:** Usually the path is not set or terminal session is stale, so restart shell and verify executable path configuration.  
   **Detailed Explanation:** Command-not-recognized issues are typically environment setup problems rather than Git functionality bugs. The shell cannot locate Git binary because install path was not added or current session has not refreshed environment variables. Restarting terminal is first fix, followed by checking path entries and reinstalling with command-line integration option if needed. Interviewers like candidates who follow systematic troubleshooting: verify install location, verify path, then retest. Mention that corporate endpoint policies can also restrict installation paths. This shows practical awareness of real machine setup constraints beyond ideal tutorial environments.

9. **Should you install Git as administrator?**  
   **Short Answer:** Administrator install may help system-wide setup, but daily Git use should generally run as normal user.  
   **Detailed Explanation:** Installing with elevated privileges can configure tools for all users on a machine and reduce permission issues in shared environments. However, running routine Git operations as administrator is unnecessary and increases risk of unintended system-level changes. In interviews, emphasize principle of least privilege: use admin only when required, then operate normally for development work. Per-user installation is often sufficient for personal machines and learning setups. Knowing this balance demonstrates security awareness and practical system administration judgment. Teams value developers who avoid over-privileged workflows while still understanding when elevated access is justified.

10. **What’s the next step after installation?**  
    **Short Answer:** Configure identity, verify setup with a small test repository, and confirm basic add, commit, and status flow works.  
    **Detailed Explanation:** Installation is only the starting point; the real validation is completing an end-to-end mini workflow. After setting name and email, create a test folder, initialize repository, create a file, stage it, commit, and inspect history. This confirms your shell, Git config, and filesystem permissions are all functioning correctly. Interviewers appreciate candidates who verify through practical workflow rather than assuming success after installer completion. Mentioning this sequence shows readiness for real project work. Once the local flow is successful, you can proceed to remote setup with confidence and fewer setup-related interruptions.

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

