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
   **Short Answer:** Two-factor authentication adds a second verification layer, greatly reducing account takeover risk from password compromise.  
   **Detailed Explanation:** Password reuse and phishing make password-only security insufficient for developer accounts. With two-factor authentication enabled, an attacker needs both password and second factor to access account, which significantly reduces unauthorized access probability. Interviewers often ask this to check security fundamentals in source control context. Mention that compromised GitHub accounts can expose private code, inject malicious changes, and leak secrets, so 2FA is critical operational control. Recovery codes and secure authenticator management are also important so legitimate users do not get locked out. A complete answer shows both preventive and practical account continuity awareness.

2. **What is a Personal Access Token (PAT)?**  
   **Short Answer:** A PAT is a revocable credential used for authenticated Git and API operations, replacing account password usage.  
   **Detailed Explanation:** Personal Access Tokens are scoped secrets that grant controlled permissions for operations like repository access and workflow updates. They are safer than passwords because they can expire, be rotated, and be revoked without changing account credentials. Interviewers expect awareness that tokens should follow least privilege and should never be stored in repository code or scripts. Mention that modern workflows often prefer fine-grained tokens with repository-level permissions. Proper token hygiene includes secure storage, periodic review, and immediate revocation on exposure. This demonstrates practical security discipline in daily GitHub usage.

3. **Why prefer SSH keys for Git?**  
   **Short Answer:** SSH keys provide strong key-based authentication and convenient repeated Git operations without exposing passwords or tokens.  
   **Detailed Explanation:** SSH authentication uses asymmetric cryptography where private key remains on your machine and only public key is shared with GitHub. This reduces credential exposure in command history and avoids embedding tokens in URLs. Interviewers appreciate candidates who mention passphrase protection and key lifecycle management, including removing old keys from lost devices. SSH is widely used in professional environments because it balances security and developer convenience for frequent push pull operations. A mature answer includes that HTTPS with properly managed tokens is also valid; preference depends on team standards and environment constraints.

4. **What should never be committed?**  
   **Short Answer:** Never commit secrets such as private keys, passwords, tokens, or environment files containing credentials.  
   **Detailed Explanation:** Source repositories are long-lived and often broadly accessible, so secret exposure can cause immediate and lasting security incidents. Common dangerous files include environment configs with live keys, cloud credentials, private certificates, and production passwords. Interviewers look for prevention strategy, not only list of sensitive items. Mention ignore files, secret scanning, pre-commit checks, and secure secret managers as layered controls. Also note that if exposure happens, remediation requires revoking credentials and cleaning history where needed. This demonstrates practical incident-aware security thinking expected in modern software teams.

5. **What is GitHub secret scanning?**  
   **Short Answer:** Secret scanning detects known credential patterns in repository content and alerts or blocks leaks.  
   **Detailed Explanation:** Secret scanning is an automated safety net that analyzes commits and pull requests for patterns matching API keys, tokens, and other sensitive strings. It can notify maintainers and, in some configurations, block pushes before secrets become part of history. Interviewers value candidates who frame it as defense in depth, not replacement for careful coding practices. Mention that detection coverage depends on pattern support and custom rules, so teams should still avoid hardcoding secrets by design. Combining scanning with secure secret management and review practices provides stronger repository security posture.

6. **What is Dependabot (high level)?**  
   **Short Answer:** Dependabot automatically identifies vulnerable dependencies and raises update pull requests to remediate risk.  
   **Detailed Explanation:** Dependency vulnerabilities are common supply-chain attack paths, so keeping libraries updated is a critical maintenance activity. Dependabot monitors dependency manifests, checks known advisories, and proposes version upgrades through pull requests. Interviewers expect you to connect this automation to secure SDLC practices. A strong answer notes that updates should still pass tests and be reviewed, since major version changes can break behavior. Dependabot does not replace architecture security but helps maintain baseline dependency hygiene continuously. Mentioning this shows awareness of security operations beyond code authoring.

7. **How do you revoke a leaked token?**  
   **Short Answer:** Revoke the token immediately, rotate dependent credentials, and audit systems that may have used it.  
   **Detailed Explanation:** Token leak response should be immediate and structured. First, disable or delete exposed token to stop further misuse. Second, rotate any downstream systems where that token granted access and update secure storage references. Third, investigate logs to assess potential abuse window and scope. Interviewers appreciate incident-response thinking with urgency and traceability. Also mention communication with team and documenting preventive actions like tighter scopes and expiration policies. This demonstrates practical security maturity and readiness to handle real-world credential incidents responsibly.

8. **What is least privilege for collaborators?**  
   **Short Answer:** Least privilege means granting each user only the minimum repository permissions required for their role.  
   **Detailed Explanation:** Over-permissioned access increases accidental and malicious risk. Least privilege reduces blast radius by limiting who can push, manage settings, or administer repositories. Interviewers look for role-based access awareness, such as giving read access to observers, write to contributors, and admin only to trusted maintainers. Regular permission audits are important because team roles change over time. Mentioning temporary elevated access for specific tasks and then revoking it shows operational discipline. This principle is foundational to secure collaboration and aligns with common compliance frameworks in enterprise environments.

9. **Why review SSH key and PAT list periodically?**  
   **Short Answer:** Periodic credential review removes stale access paths that attackers could exploit.  
   **Detailed Explanation:** Security posture weakens when old device keys and forgotten tokens remain active. Regular reviews help detect unused credentials, expired devices, and unnecessary scopes, then remove them before misuse occurs. Interviewers may ask this to evaluate operational security habits, not just one-time setup knowledge. Include frequency suggestion such as monthly or quarterly checks, especially in organizations with frequent role changes. This process complements 2FA and branch protections by reducing long-lived credential exposure. A strong answer highlights continuous governance rather than one-time security configuration.

10. **Interview summary line?**  
    **Short Answer:** Baseline secure GitHub setup combines strong authentication, safe credential handling, controlled access, and continuous dependency monitoring.  
    **Detailed Explanation:** A complete interview summary should combine people, process, and tooling controls. Start with account safety through two-factor authentication and trusted credential methods such as scoped tokens or SSH keys. Add repository hygiene by preventing secret commits and enabling automated scanning. Include access governance through least-privilege permissions, branch protection, and review requirements. Finally, mention dependency security automation and regular credential audits. This integrated answer demonstrates that security is an ongoing system, not a single setting. Interviewers usually appreciate this structured response because it reflects real-world operational thinking and practical implementation priorities.

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

