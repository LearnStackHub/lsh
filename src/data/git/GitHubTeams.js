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
   **Short Answer:** A GitHub Team is a named group of organization members used for shared permissions, mentions, and collaboration routing.  
   **Detailed Explanation:** Teams simplify organization-level access control by grouping users according to role, product area, or function. Instead of assigning repository permissions one user at a time, maintainers grant access to a team and members inherit those permissions. Teams can also be mentioned in pull requests and issues, making review and communication more efficient. Interviewers ask this to evaluate whether you understand scalable collaboration beyond individual repositories. Mentioning permission management, review routing, and ownership visibility shows practical understanding. Team structures become especially important as organizations grow and require clear accountability boundaries.

2. **Why use teams instead of adding users per repo?**  
   **Short Answer:** Teams centralize access management so onboarding, role changes, and offboarding are faster and less error-prone.  
   **Detailed Explanation:** Managing users one by one across many repositories does not scale and often leads to inconsistent permissions. Teams provide reusable permission bundles tied to responsibilities. When a new developer joins, adding them to correct team grants all needed repository access immediately. When someone leaves, removing them from team revokes access consistently. Interviewers value this answer because it reflects operational efficiency and security hygiene. It also reduces administrative overhead and permission drift. In large organizations, team-based access is essential for governance, audit readiness, and smooth collaboration workflows.

3. **What are common permission levels on a repo?**  
   **Short Answer:** Typical levels are read, triage, write, maintain, and admin, each granting progressively more control.  
   **Detailed Explanation:** Repository permission levels define what actions users or teams can perform. Read allows code visibility, triage adds issue and pull request management, write allows branch pushes and contributions, maintain includes broader repository management, and admin grants full control including sensitive settings. Interviewers often expect candidates to connect this hierarchy with least-privilege principle. Assigning only necessary level protects repositories from accidental or unauthorized changes. Mention that permission reviews should happen regularly as responsibilities evolve. This demonstrates governance awareness and practical collaboration security in real-world organization setups.

4. **What are nested teams?**  
   **Short Answer:** Nested teams are parent-child team structures that organize large groups and can inherit access patterns.  
   **Detailed Explanation:** Nested teams support hierarchical organization models, such as engineering parent team with backend and frontend child teams. This structure improves discoverability and can simplify broad permission assignment in larger companies. Interviewers ask this to test understanding of scaling collaboration structures, not only basic team creation. Mention that inheritance behavior and visibility depend on organizational settings and policy. A good answer includes why nesting helps: easier governance, clearer ownership, and simpler communication routing. As repositories and teams grow, hierarchical design prevents flat permission chaos and improves administrative maintainability.

5. **How do teams relate to CODEOWNERS?**  
   **Short Answer:** CODEOWNERS can assign path ownership to teams, automatically requesting the right reviewers for relevant changes.  
   **Detailed Explanation:** Team integration with code ownership is a major productivity feature. Instead of naming individual reviewers for each file path, CODEOWNERS can map directories to team aliases, so pull requests trigger review requests automatically. This ensures domain experts review critical changes and reduces manual reviewer selection mistakes. Interviewers often look for this connection between governance and workflow automation. Mentioning path ownership also shows awareness of long-term maintainability, because team-level mappings survive individual role changes better than user-specific mappings. This approach improves review consistency, accountability, and throughput in multi-team repositories.

6. **What is organization vs personal account?**  
   **Short Answer:** Personal accounts are individual spaces, while organizations provide shared ownership, teams, and enterprise governance controls.  
   **Detailed Explanation:** Personal repositories are managed by one user and suitable for personal projects and experimentation. Organization accounts support collective ownership, centralized billing, team permissions, policy enforcement, and enterprise features such as SSO integration. Interviewers expect candidates to understand that company code should usually live in organizations for continuity and control. If an employee leaves, organization ownership remains stable, unlike personal account dependencies. Mentioning governance, onboarding, and access lifecycle management shows practical workplace awareness. This distinction is important for both security and operational reliability in professional development environments.

7. **Why separate teams by function (backend/frontend/QA)?**  
   **Short Answer:** Functional team separation creates clear ownership, focused reviews, and better accountability for different parts of the system.  
   **Detailed Explanation:** Grouping members by expertise helps route work and reviews to people with relevant domain knowledge. Backend teams review service logic, frontend teams review UI behavior, and QA teams focus on test quality and release confidence. Interviewers often assess whether you see organization design as part of engineering effectiveness. Functional separation also improves incident response because ownership boundaries are clear. Mention that cross-functional collaboration still matters, but default ownership mapping reduces confusion and review delays. This structure is especially helpful in larger products with many repositories and specialized components.

8. **What is team discussion (feature area)?**  
   **Short Answer:** Team discussions provide an asynchronous collaboration space for planning, decisions, announcements, and knowledge sharing.  
   **Detailed Explanation:** Not every decision fits inside one pull request conversation. Team discussion spaces help capture broader planning context, architecture decisions, and recurring questions in organized threads. Interviewers appreciate candidates who recognize communication tooling as part of collaboration quality. Documented discussions improve onboarding and reduce repeated explanations. They also create searchable history for why decisions were made, which is valuable when requirements change later. Mention that teams should still keep implementation-specific feedback in pull requests, while discussions handle wider coordination topics. This demonstrates thoughtful use of collaboration channels for engineering efficiency.

9. **How do fresher interviews phrase “collaboration on GitHub”?**  
   **Short Answer:** A strong fresher answer links teams, pull requests, branch protection, and role-based access into one clear collaboration model.  
   **Detailed Explanation:** Interviewers want a concise but structured explanation of how teams collaborate safely. You can say that repositories are owned by organization, contributors work through feature branches and pull requests, reviews are routed via teams or code owners, and branch protection ensures checks pass before merge. This demonstrates both process awareness and quality mindset. Add that permissions follow least privilege and are reviewed regularly. A response like this sounds practical and professional without overcomplication. It shows you understand how GitHub features combine into a reliable teamwork system rather than isolated tools.

10. **What mistake to avoid?**  
    **Short Answer:** Avoid giving broad admin access to everyone, because convenience today can become major security and governance risk later.  
    **Detailed Explanation:** Over-privileged access is a common mistake in growing teams. Granting admin rights broadly may seem faster initially, but it increases risk of accidental repository setting changes, policy bypass, and security exposure. Interviewers expect least-privilege awareness, especially in collaborative platforms like GitHub. Better approach is assigning role-appropriate permissions and escalating temporarily only when needed. Regular access audits and team-based permission management prevent privilege drift over time. Mentioning this demonstrates understanding that safe collaboration requires controls, not just trust. Strong teams optimize both speed and safety through thoughtful access governance.

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

