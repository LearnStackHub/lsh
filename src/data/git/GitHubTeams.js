const githubTeams = {
  id: 'github-teams',
  title: 'GitHub Teams & Collaboration',
  description: 'Learn how to create teams, manage team permissions, collaborate effectively, and organize repositories with teams.',
  courseTitle: 'Git & GitHub',
  sectionTitle: 'GitHub Basics',
  content: `
# GitHub Teams & Collaboration

Teams help organize collaborators and manage permissions efficiently. Let's learn how to create teams, assign permissions, and collaborate effectively.

## What are GitHub Teams?

**Teams** are groups of organization members that can be granted access to repositories. They help:
- Organize people by role or project
- Manage permissions in bulk
- Simplify collaboration
- Control access to repositories

## Creating Teams

### In an Organization

1. Go to your **Organization** page
2. Click **Teams** tab
3. Click **New team**
4. Fill in details:
   - **Team name:** e.g., "Backend Developers"
   - **Description:** What the team does
   - **Team visibility:** Public or Private
5. Click **Create team**

### Team Visibility

**Public teams:**
- Visible to all organization members
- Anyone can see team members
- Good for general teams

**Private teams:**
- Only visible to team members
- Hidden from other members
- Good for sensitive projects

## Team Roles

### Team Member Roles

**Member:**
- Regular team member
- Has team permissions
- Can be assigned to repositories

**Maintainer:**
- Can manage team settings
- Can add/remove members
- Can change team permissions

**Organization Owner:**
- Full control over organization
- Can manage all teams
- Highest level of access

## Adding Members to Teams

### Method 1: From Team Page

1. Go to team page
2. Click **Members** tab
3. Click **Add a member**
4. Search for username
5. Click **Add** next to user

### Method 2: From User Profile

1. Go to user's profile in organization
2. Click **Add to team**
3. Select team(s)
4. Click **Add**

### Method 3: Invite by Email

1. Go to team page
2. Click **Members** tab
3. Click **Invite a member**
4. Enter email address
5. User receives invitation

## Team Permissions

### Repository Access Levels

**None:**
- No access to repository
- Default for new teams

**Read:**
- Can view code
- Can clone repository
- Cannot make changes

**Triage:**
- Read access
- Can manage issues and pull requests
- Cannot push code

**Write:**
- Can push code
- Can create branches
- Can merge pull requests (if allowed)

**Maintain:**
- Write access
- Can manage repository settings
- Can manage webhooks

**Admin:**
- Full repository access
- Can delete repository
- Highest repository permission

### Setting Team Permissions

1. Go to repository → **Settings** → **Collaborators and teams**
2. Click **Add teams**
3. Search for team
4. Select permission level
5. Click **Add [team name] to this repository**

## Team Discussions

Teams can have discussions for:
- Planning
- Questions
- Updates
- General communication

### Creating Team Discussion

1. Go to team page
2. Click **Discussions** tab
3. Click **New discussion**
4. Choose category:
   - **Announcements:** Important updates
   - **General:** General discussion
   - **Ideas:** Suggestions
   - **Polls:** Voting
   - **Q&A:** Questions and answers
5. Write your discussion
6. Click **Start discussion**

## Team Code Review

### Requesting Team Review

When creating a pull request:

1. Click **Reviewers** on the right
2. Type team name (e.g., @backend-team)
3. Select team
4. Team members will be notified

**Note:** Any team member can approve, but you can require specific number of approvals.

## Organizing Teams

### By Role

**Example structure:**
- **Backend Team:** Java developers
- **Frontend Team:** React developers
- **DevOps Team:** Infrastructure
- **QA Team:** Testers
- **Design Team:** UI/UX designers

### By Project

**Example structure:**
- **E-Commerce Team:** E-commerce project
- **Mobile App Team:** Mobile application
- **API Team:** API development

### By Feature

**Example structure:**
- **Authentication Team:** Login/security features
- **Payment Team:** Payment processing
- **Search Team:** Search functionality

## Nested Teams (Parent-Child)

Organize teams hierarchically:

**Example:**
\`\`\`
Engineering (Parent)
├── Backend Team (Child)
│   ├── Java Team
│   └── Node.js Team
├── Frontend Team (Child)
│   ├── React Team
│   └── Vue Team
└── DevOps Team (Child)
\`\`\`

### Creating Nested Teams

1. Create parent team (e.g., "Engineering")
2. Create child team (e.g., "Backend Team")
3. Go to child team → **Settings**
4. Under **Parent team**, select parent team
5. Click **Save**

**Benefits:**
- Child teams inherit parent permissions
- Easier to manage large organizations
- Clear hierarchy

## Team Notifications

### Managing Team Notifications

1. Go to team page
2. Click **Settings**
3. Configure notifications:
   - **Team mentions:** When team is @mentioned
   - **Team discussions:** New discussions
   - **Repository activity:** Team repository updates

## Real-World Example

### Java Development Team Structure

**Organization:** TechCorp

**Teams:**
\`\`\`
Engineering (Parent)
├── Backend Team
│   ├── Java Developers
│   └── Database Team
├── Frontend Team
└── DevOps Team

Product (Parent)
├── Product Managers
└── Designers

QA (Parent)
├── Manual Testers
└── Automation Testers
\`\`\`

**Repository Access:**
- **ecommerce-backend:** Backend Team (Write), QA Team (Read)
- **ecommerce-frontend:** Frontend Team (Write), QA Team (Read)
- **ecommerce-api:** Backend Team (Write), Frontend Team (Read)

**Workflow:**
1. Backend developer creates feature branch
2. Creates pull request
3. Requests review from @backend-team
4. Backend team reviews
5. QA team tests
6. Merged to main

## Best Practices

1. **Organize by function:**
   - Group people by what they do
   - Clear team names
   - Logical structure

2. **Use nested teams:**
   - For large organizations
   - Clear hierarchy
   - Inherit permissions

3. **Set appropriate permissions:**
   - Don't give more access than needed
   - Review permissions regularly
   - Use least privilege principle

4. **Use team discussions:**
   - Keep communication organized
   - Document decisions
   - Share updates

5. **Regular team reviews:**
   - Remove inactive members
   - Update permissions
   - Adjust team structure

## Summary

You've learned:
- How to create and manage teams
- Team roles and permissions
- Adding members to teams
- Setting repository permissions
- Team discussions and collaboration
- Organizing teams effectively
- Nested team structures

---

## 10 Important GitHub Teams Interview Questions

1. **What is a GitHub Team?**  
   A **group of users** with a **name** (e.g. \`@acme/backend\`) used to **grant** repo access and **mention** in PRs/issues—**scalable** permission management.

2. **Why use teams instead of adding users per repo?**  
   **Onboarding:** add person **once** to team → inherits **all** repos that team can access. **Offboarding:** remove from team.

3. **What are common permission levels on a repo?**  
   **Read** (clone), **Triage** (issues), **Write** (push branches), **Maintain**, **Admin** (settings). **Principle of least privilege.**

4. **What are nested teams?**  
   **Parent/child** teams for **org charts**—child can **inherit** parent permissions (depending on org settings). **Large** companies use this.

5. **How do teams relate to CODEOWNERS?**  
   **CODEOWNERS** can list **\`@org/team-name\`** so **entire team** is requested for review on **path** changes.

6. **What is organization vs personal account?**  
   **Org** owns **shared** repos, **teams**, **SSO/SAML** (Enterprise). **Personal** repos are **yours**—companies use **orgs** for **work**.

7. **Why separate teams by function (backend/frontend/QA)?**  
   **Clear ownership** of directories and **services**—reviews go to **people who know** that area.

8. **What is team discussion (feature area)?**  
   **Async** communication space for a team—**document** decisions that aren’t a single PR comment thread.

9. **How do fresher interviews phrase “collaboration on GitHub”?**  
   “We use **orgs**, **teams**, **branch protection**, and **PR reviews** so **access** and **quality** are **structured**.”

10. **What mistake to avoid?**  
    Giving **everyone** **admin** “to move faster”—creates **security** and **accidental** settings changes.

---

## Related tutorials — quick links (topic-wise)

| Topic | Tutorial link |
|-------|----------------|
| **PR & review flow** | [GitHub Pull Requests](/tutorial/github-pull-requests) |
| **Branch rules** | [Git Branch Protection](/tutorial/git-branch-protection) |
| **Account hardening** | [GitHub Security](/tutorial/github-security) |
| **Workflow** | [Git Workflow](/tutorial/git-workflow) |
| **SDLC context** | [SDLC Introduction](/tutorial/sdlc-introduction) |

## Suggested Team Topology (Example)

For a typical product org:

- \`platform-team\` (CI/CD, infrastructure)
- \`backend-team\` (APIs, database services)
- \`frontend-team\` (UI, accessibility)
- \`qa-team\` (test strategy, release sign-off)
- \`security-team\` (policies, secret handling)

Map each team to repository paths with CODEOWNERS for automatic review routing.

## Monthly Team Access Audit Checklist

- Remove inactive users.
- Review admin permissions.
- Validate team-to-repo access is still needed.
- Confirm CODEOWNERS is aligned with actual ownership.
- Check branch protection still matches team structure.

This prevents permission drift as organization size grows.

Teams make collaboration easier and permissions management simpler. Use them to organize your organization effectively!
`
};

export default githubTeams;

