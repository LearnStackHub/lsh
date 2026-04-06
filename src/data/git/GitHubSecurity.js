const githubSecurity = {
  id: 'github-security',
  title: 'GitHub Security - 2FA, Tokens & Settings',
  description: 'Learn about two-factor authentication, personal access tokens, SSH keys, and GitHub security settings.',
  courseTitle: 'Git & GitHub',
  sectionTitle: 'GitHub Basics',
  content: `
# GitHub Security - 2FA, Tokens & Settings

Security is crucial when working with code repositories. Let's learn about two-factor authentication, token management, and GitHub security settings.

## Two-Factor Authentication (2FA)

Two-factor authentication adds an extra layer of security to your GitHub account.

### Why Enable 2FA?

**Benefits:**
- Protects your account even if password is compromised
- Required for many GitHub features
- Industry best practice
- Protects your code and repositories

### Setting Up 2FA

1. Go to GitHub → **Settings** → **Password and authentication**
2. Click **Enable two-factor authentication**
3. Choose authentication method:
   - **Mobile app** (recommended)
   - **SMS** (less secure)

### Using Mobile App (TOTP)

**Recommended method using apps like Google Authenticator or Authy:**

1. **Download authenticator app:**
   - Google Authenticator
   - Microsoft Authenticator
   - Authy
   - 1Password

2. **Scan QR code:**
   - Open authenticator app
   - Scan QR code shown by GitHub
   - Enter 6-digit code to verify

3. **Save recovery codes:**
   - GitHub provides recovery codes
   - Save them securely
   - Use if you lose access to authenticator

### Using SMS

**Less secure but easier:**

1. Enter your phone number
2. GitHub sends verification code
3. Enter code to verify

**Note:** SMS can be intercepted, so mobile app is preferred.

### Recovery Codes

**If you lose access to 2FA:**

1. Use one of your recovery codes
2. Or contact GitHub support
3. Keep recovery codes safe!

**To view recovery codes:**
- GitHub → Settings → Password and authentication
- Click **View recovery codes**

## Personal Access Tokens (PAT)

Personal Access Tokens are used instead of passwords for Git operations.

### Creating a Personal Access Token

1. Go to GitHub → **Settings** → **Developer settings**
2. Click **Personal access tokens** → **Tokens (classic)**
3. Click **Generate new token** → **Generate new token (classic)**
4. Fill in details:
   - **Note:** Describe what token is for (e.g., "My Laptop")
   - **Expiration:** Choose expiration date
   - **Scopes:** Select permissions needed

### Token Scopes

**Common scopes:**

- **repo** (Full control of private repositories)
  - Read/write access to code
  - Access to private repos
  - Most common for development

- **workflow** (Update GitHub Action workflows)
  - Modify workflow files
  - For CI/CD

- **read:org** (Read org membership)
  - View organization membership

- **admin:org** (Full control of org)
  - Manage organization settings

**For basic Git operations, select:**
- ✓ repo (all)
- ✓ workflow (if using GitHub Actions)

### Using Personal Access Token

**When pushing to GitHub:**

\`\`\`bash
git push origin main
\`\`\`

**GitHub will prompt:**
- Username: Your GitHub username
- Password: **Paste your token** (not your password!)

**Or configure in URL:**
\`\`\`bash
git remote set-url origin https://YOUR_TOKEN@github.com/username/repo.git
\`\`\`

**Note:** Token will be visible in Git config. Use SSH instead for better security.

### Fine-Grained Personal Access Tokens

**Newer, more secure option:**

1. Go to **Settings** → **Developer settings** → **Personal access tokens** → **Fine-grained tokens**
2. Click **Generate new token**
3. Configure:
   - **Repository access:** Specific repos or all
   - **Permissions:** Granular control
   - **Expiration:** Set expiration

**Benefits:**
- More granular permissions
- Repository-specific access
- Better security

## SSH Keys

SSH keys are more secure than tokens for Git operations.

### Generating SSH Key

\`\`\`bash
ssh-keygen -t ed25519 -C "your_email@example.com"
\`\`\`

**Or use RSA (if ed25519 not supported):**
\`\`\`bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
\`\`\`

**Follow prompts:**
- Press Enter to accept default location
- Enter passphrase (recommended) or leave empty

### Adding SSH Key to GitHub

1. **Copy public key:**
   \`\`\`bash
   # Windows
   type C:\\Users\\YourName\\.ssh\\id_ed25519.pub
   
   # Mac/Linux
   cat ~/.ssh/id_ed25519.pub
   \`\`\`

2. **Add to GitHub:**
   - Go to **Settings** → **SSH and GPG keys**
   - Click **New SSH key**
   - Paste public key
   - Give it a title (e.g., "My Laptop")
   - Click **Add SSH key**

### Using SSH with Git

**Change remote URL to SSH:**
\`\`\`bash
git remote set-url origin git@github.com:username/repo.git
\`\`\`

**Now push without entering credentials:**
\`\`\`bash
git push origin main
\`\`\`

## GitHub Security Settings

### Account Security

**Settings → Password and authentication:**

- **Change password:** Update regularly
- **Two-factor authentication:** Enable 2FA
- **SSH keys:** Manage SSH keys
- **Personal access tokens:** Manage tokens
- **Sessions:** View active sessions

### Repository Security

**Repository → Settings → Security:**

- **Security policy:** Add SECURITY.md
- **Dependency graph:** View dependencies
- **Dependabot alerts:** Security alerts
- **Code scanning:** Automated security scanning
- **Secret scanning:** Detect exposed secrets

### Organization Security

**Organization → Settings → Security:**

- **Require 2FA:** Force all members to use 2FA
- **SSH certificate authorities:** Manage SSH CAs
- **OAuth apps:** Manage OAuth applications
- **Personal access tokens:** Control token usage

## Secret Scanning

GitHub automatically scans for exposed secrets.

### Supported Secrets

- API keys
- Passwords
- Tokens
- Private keys
- Database credentials

### If Secret is Exposed

1. **GitHub will alert you**
2. **Immediately rotate the secret:**
   - Generate new API key
   - Update in application
   - Revoke old key

3. **Remove from Git history:**
   \`\`\`bash
   # Use git filter-branch or BFG Repo-Cleaner
   git filter-branch --force --index-filter \\
     "git rm --cached --ignore-unmatch file-with-secret" \\
     --prune-empty --tag-name-filter cat -- --all
   \`\`\`

## Best Practices

1. **Always use 2FA:**
   - Enable on all accounts
   - Use authenticator app
   - Save recovery codes

2. **Use SSH keys:**
   - More secure than tokens
   - No password needed
   - Use passphrase for extra security

3. **Rotate tokens regularly:**
   - Set expiration dates
   - Revoke unused tokens
   - Use fine-grained tokens

4. **Never commit secrets:**
   - Use environment variables
   - Use GitHub Secrets
   - Use .gitignore

5. **Review access regularly:**
   - Check active sessions
   - Remove unused SSH keys
   - Revoke old tokens

## Real-World Example

### Setting Up Secure Development Environment

\`\`\`bash
# 1. Generate SSH key
ssh-keygen -t ed25519 -C "dattudattakumar369@gmail.com"
# Enter passphrase when prompted

# 2. Add SSH key to ssh-agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# 3. Copy public key
cat ~/.ssh/id_ed25519.pub
# Copy output and add to GitHub

# 4. Test SSH connection
ssh -T git@github.com
# Should see: "Hi username! You've successfully authenticated..."

# 5. Configure Git to use SSH
git remote set-url origin git@github.com:username/repo.git

# 6. Now push without credentials
git push origin main
\`\`\`

## Summary

You've learned:
- How to set up two-factor authentication
- Creating and using personal access tokens
- Setting up SSH keys
- GitHub security settings
- Secret scanning and protection
- Security best practices

---

## 10 Important GitHub Security Interview Questions

1. **Why enable 2FA on GitHub?**  
   Password leaks happen; **2FA** blocks account takeover even if password is stolen. **Required** by many **employers** and **open source** foundations.

2. **What is a Personal Access Token (PAT)?**  
   **Password substitute** for **HTTPS Git** and **API** calls—**scoped** (repo, workflow, etc.) and **revocable**. **Never** commit PATs to a repo.

3. **Why prefer SSH keys for Git?**  
   **Key pair** (\`id_ed25519\`): private key stays on your machine; GitHub stores **public** key. **No** token in URL for each push once configured.

4. **What should never be committed?**  
   **\`.env\`** with secrets, **private keys**, **cloud** credentials, **database** passwords. Use **\`.gitignore\`** + **secret scanning** (GitHub can **block** pushes).

5. **What is GitHub secret scanning?**  
   Detects **known secret patterns** in pushes and can **alert** or **block**—helps **prevent** credential leaks.

6. **What is Dependabot (high level)?**  
   **Automated PRs** to bump **vulnerable** dependencies—**security** maintenance for **Maven** \`pom.xml\`, npm, etc.

7. **How do you revoke a leaked token?**  
   GitHub **Settings → Developer settings → Tokens** → **delete** immediately; **rotate** any systems using it; **audit** repo access.

8. **What is least privilege for collaborators?**  
   Give **read**/**triage**/**write**/**admin** **only** as needed. **Fewer** admins = **smaller** blast radius.

9. **Why review SSH key and PAT list periodically?**  
   Remove **old** laptops’ keys and **unused** tokens—stale credentials are **attack** surface.

10. **Interview summary line?**  
    “**2FA + PAT/SSH + no secrets in Git + Dependabot** is the baseline **secure** GitHub setup.”

---

## Related tutorials — quick links (topic-wise)

| Topic | Tutorial link |
|-------|----------------|
| **HTTPS & TLS** | [HTTPS Security](/tutorial/https-security) |
| **Auth concepts (APIs)** | [Authentication & Authorization](/tutorial/authentication-authorization) |
| **API hardening** | [API Security Best Practices](/tutorial/api-security-best-practices) |
| **Using GitHub** | [GitHub Basics](/tutorial/github-basics) |
| **Org permissions** | [GitHub Teams](/tutorial/github-teams) |

## If a Secret Leaks: Response Plan

If a token or key is exposed in a commit:

1. Revoke token/key immediately in GitHub or cloud provider.
2. Rotate credentials in all dependent systems.
3. Remove secret from codebase and history remediation process if required.
4. Force new deployment with clean credentials.
5. Record incident and prevention action items.

Speed matters more than blame in security events.

## Security Baseline for Student/Team Projects

- Enable 2FA for all maintainers.
- Use fine-grained PATs with expiration.
- Prefer SSH keys with passphrases.
- Enable secret scanning and Dependabot alerts.
- Review collaborator/admin access monthly.

Securing your GitHub account protects your code and your reputation. Take security seriously!
`
};

export default githubSecurity;

