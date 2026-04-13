const gitDeployment = {
  id: 'git-deployment',
  title: 'Git Deployment & CI/CD',
  description: 'Learn how to deploy applications using Git, set up CI/CD pipelines, GitHub Actions, and automate deployments.',
  courseTitle: 'Git & GitHub',
  sectionTitle: 'GitHub Basics',
  content: `
# Git Deployment & CI/CD

Deploying applications using Git is a common practice. Let's learn how to set up automated deployments, CI/CD pipelines, and use GitHub Actions for deployment.

## Understanding Deployment with Git

**Git-based deployment** means using Git to:
- Push code to servers
- Trigger automated builds
- Deploy applications
- Manage releases

## Deployment Strategies

### Manual Deployment

**Using Git Clone:**
\`\`\`bash
# On server
cd /var/www/myapp
git pull origin main
# Restart application
\`\`\`

**Using Git Archive:**
\`\`\`bash
# Create archive
git archive --format=tar --prefix=myapp/ main | gzip > deploy.tar.gz

# On server
tar -xzf deploy.tar.gz
# Deploy files
\`\`\`

### Automated Deployment with Hooks

**Post-Receive Hook:**

Create \`.git/hooks/post-receive\` on server:

\`\`\`bash
#!/bin/bash
cd /var/www/myapp
git --git-dir=/path/to/repo.git --work-tree=/var/www/myapp checkout -f main
# Build application
mvn clean package
# Restart service
systemctl restart myapp
\`\`\`

**Make it executable:**
\`\`\`bash
chmod +x .git/hooks/post-receive
\`\`\`

**Push to trigger:**
\`\`\`bash
git push production main
\`\`\`

## GitHub Actions for Deployment

GitHub Actions automates deployment workflows.

### Basic Deployment Workflow

Create \`.github/workflows/deploy.yml\`:

\`\`\`yaml
name: Deploy Application

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
      
    - name: Set up Java
      uses: actions/setup-java@v3
      with:
        java-version: '17'
        distribution: 'temurin'
        
    - name: Build with Maven
      run: mvn clean package
      
    - name: Deploy to server
      uses: appleboy/scp-action@master
      with:
        host: \${{ secrets.HOST }}
        username: \${{ secrets.USERNAME }}
        key: \${{ secrets.SSH_KEY }}
        source: "target/*.war"
        target: "/var/www/myapp"
        
    - name: Restart application
      uses: appleboy/ssh-action@master
      with:
        host: \${{ secrets.HOST }}
        username: \${{ secrets.USERNAME }}
        key: \${{ secrets.SSH_KEY }}
        script: |
          systemctl restart myapp
\`\`\`

### Setting Up Secrets

1. Go to repository **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add secrets:
   - \`HOST\`: Server IP or domain
   - \`USERNAME\`: SSH username
   - \`SSH_KEY\`: Private SSH key

## Deployment Environments

### Development Environment

**Deploy on every push to develop:**
\`\`\`yaml
on:
  push:
    branches:
      - develop
\`\`\`

### Staging Environment

**Deploy on pull request to main:**
\`\`\`yaml
on:
  pull_request:
    branches:
      - main
    types: [opened, synchronize, reopened]
\`\`\`

### Production Environment

**Deploy on release:**
\`\`\`yaml
on:
  release:
    types: [published]
\`\`\`

## Java Application Deployment

### Maven Build & Deploy

\`\`\`yaml
- name: Build WAR file
  run: mvn clean package -DskipTests
  
- name: Deploy WAR to Tomcat
  run: |
    scp target/myapp.war user@server:/opt/tomcat/webapps/
    ssh user@server "systemctl restart tomcat"
\`\`\`

### Gradle Build & Deploy

\`\`\`yaml
- name: Build JAR file
  run: ./gradlew build
  
- name: Deploy JAR
  run: |
    scp build/libs/myapp.jar user@server:/opt/myapp/
    ssh user@server "systemctl restart myapp"
\`\`\`

## Deployment to Cloud Platforms

### Deploy to AWS

**Using AWS CodeDeploy:**
\`\`\`yaml
- name: Deploy to AWS
  uses: aws-actions/configure-aws-credentials@v2
  with:
    aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY }}
    aws-secret-access-key: \${{ secrets.AWS_SECRET_KEY }}
    aws-region: us-east-1
    
- name: Deploy
  run: |
    aws deploy create-deployment
      --application-name myapp
      --deployment-group-name production
      --s3-location bucket=myapp-bucket,key=app.zip
\`\`\`

### Deploy to Heroku

**Using Heroku Deploy:**
\`\`\`yaml
- name: Deploy to Heroku
  uses: akhileshns/heroku-deploy@v3.12.12
  with:
    heroku_api_key: \${{ secrets.HEROKU_API_KEY }}
    heroku_app_name: "myapp"
    heroku_email: "your-email@example.com"
\`\`\`

### Deploy to Vercel/Netlify

**For static sites:**
\`\`\`yaml
- name: Deploy to Vercel
  uses: amondnet/vercel-action@v20
  with:
    vercel-token: \${{ secrets.VERCEL_TOKEN }}
    vercel-org-id: \${{ secrets.ORG_ID }}
    vercel-project-id: \${{ secrets.PROJECT_ID }}
\`\`\`

## Blue-Green Deployment

Deploy new version alongside old, then switch:

\`\`\`yaml
- name: Deploy to Blue Environment
  run: |
    # Deploy to blue
    scp app.war user@server:/opt/tomcat-blue/webapps/
    
- name: Health Check
  run: |
    # Check if blue is healthy
    curl -f http://server:8081/health || exit 1
    
- name: Switch to Blue
  run: |
    # Update load balancer to point to blue
    # Stop green
    ssh user@server "systemctl stop tomcat-green"
\`\`\`

## Rollback Strategy

### Automatic Rollback on Failure

\`\`\`yaml
- name: Deploy
  id: deploy
  run: ./deploy.sh
  
- name: Rollback on failure
  if: failure()
  run: |
    git checkout HEAD~1
    ./deploy.sh
    echo "Rolled back to previous version"
\`\`\`

### Manual Rollback

\`\`\`bash
# Find previous deployment
git log --oneline

# Checkout previous version
git checkout <previous-commit-hash>

# Redeploy
./deploy.sh
\`\`\`

## Deployment Best Practices

1. **Use tags for releases:**
   \`\`\`bash
   git tag -a v1.0.0 -m "Release version 1.0.0"
   git push origin v1.0.0
   \`\`\`

2. **Test before deploying:**
   - Run all tests
   - Check code quality
   - Verify security

3. **Deploy to staging first:**
   - Test in staging
   - Verify functionality
   - Then deploy to production

4. **Use feature flags:**
   - Enable features gradually
   - Easy to disable if issues

5. **Monitor after deployment:**
   - Check logs
   - Monitor metrics
   - Watch for errors

## Real-World Example

### Complete Java Web App Deployment

\`\`\`yaml
name: Deploy Java Web Application

on:
  push:
    branches: [main]
  release:
    types: [published]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up JDK 17
      uses: actions/setup-java@v3
      with:
        java-version: '17'
        distribution: 'temurin'
        cache: maven
        
    - name: Run tests
      run: mvn test
      
    - name: Build WAR
      run: mvn clean package -DskipTests
      
    - name: Deploy to staging
      if: github.ref == 'refs/heads/main'
      uses: appleboy/scp-action@master
      with:
        host: \${{ secrets.STAGING_HOST }}
        username: \${{ secrets.USERNAME }}
        key: \${{ secrets.SSH_KEY }}
        source: "target/*.war"
        target: "/opt/tomcat/webapps/"
        
    - name: Deploy to production
      if: github.event_name == 'release'
      uses: appleboy/scp-action@master
      with:
        host: \${{ secrets.PRODUCTION_HOST }}
        username: \${{ secrets.USERNAME }}
        key: \${{ secrets.SSH_KEY }}
        source: "target/*.war"
        target: "/opt/tomcat/webapps/"
        
    - name: Restart Tomcat
      uses: appleboy/ssh-action@master
      with:
        host: \${{ secrets.HOST }}
        username: \${{ secrets.USERNAME }}
        key: \${{ secrets.SSH_KEY }}
        script: systemctl restart tomcat
\`\`\`

## Summary

You've learned:
- Different deployment strategies
- Setting up GitHub Actions
- Deploying to various platforms
- Blue-green deployment
- Rollback strategies
- Best practices for deployment

---

## 10 Important Git + Deployment Interview Questions

1. **What is CI in GitHub Actions?**  
   **Short Answer:** CI is automated validation on code changes, usually running build and tests on push or pull request events.  
   **Detailed Explanation:** Continuous Integration means every meaningful code update is validated automatically through a repeatable pipeline. In GitHub Actions, a workflow can trigger on push, pull request, or other events and run steps like compile, unit tests, lint, and packaging. This gives fast feedback before code reaches protected branches. Interviewers expect you to emphasize risk reduction: CI catches integration problems early instead of after deployment. Mention that CI should be reliable, fast enough for developers, and required before merge in serious projects. A strong CI setup improves code quality, confidence, and team velocity over time.

2. **What is CD?**  
   **Short Answer:** CD automates releasing validated code to environments, either with approval gates or fully automatic deployment.  
   **Detailed Explanation:** Continuous Delivery and Continuous Deployment are related but different maturity levels. In delivery, code is always deployable and release may require manual approval. In deployment, release to production is automatic when pipeline conditions pass. Git-based triggers, branch rules, environment approvals, and quality checks determine when deployment happens. Interviewers value candidates who connect CD to business reliability: faster release cycles with fewer manual errors. Mention staged rollout and rollback planning as part of good CD design. Automation should not remove control; it should make release safer, repeatable, and observable across development, staging, and production environments.

3. **Why use secrets in GitHub Actions?**  
   **Short Answer:** Secrets keep credentials out of code and inject them securely at runtime.  
   **Detailed Explanation:** Deployment workflows often need sensitive values such as API keys, SSH private keys, cloud credentials, and tokens. Storing these directly in repository files is a serious security mistake because history is hard to clean and leaks spread quickly. GitHub Actions secrets provide encrypted storage and controlled runtime exposure. Values are masked in logs and can be scoped to repository, organization, or environment. In interviews, mention least privilege and rotation as best practices. Also note that secrets should be combined with restricted environments and branch protection for stronger release security. This demonstrates practical security awareness in CI CD pipelines.

4. **What is \`on: push\` vs \`on: pull_request\`?**  
   **Short Answer:** Push runs when commits are pushed, while pull request runs on PR lifecycle events for pre-merge validation.  
   **Detailed Explanation:** Workflow trigger choice controls when automation executes. Push trigger is useful for branch-based automation such as deploying from main or running branch checks after every commit. Pull request trigger is useful for code review workflow, validating proposed changes before merge. Many teams run heavy quality checks on pull requests and lighter tasks on push to balance speed and coverage. In interviews, mention that event selection should align with risk and resource cost. For example, production deployment should never run on every feature push, but test validation should run on pull requests targeting protected branches.

5. **How does Maven fit into a Java deploy pipeline?**  
   **Short Answer:** Maven builds and tests the Java project, producing artifacts that deployment steps publish to target environments.  
   **Detailed Explanation:** In Java pipelines, Maven typically handles dependency resolution, compilation, testing, and packaging. Common stages include clean build, test execution, and generation of deployable artifacts such as jar or war files. Those artifacts become the input for downstream deployment steps, like container image creation, upload to artifact repository, or direct transfer to servers. Interviewers often look for artifact-centric thinking: deploy the exact built artifact, not rebuilt code on server, to improve consistency. Mention that caching dependencies speeds CI and that failing tests should block release. This shows you understand both build integrity and deployment reliability in Java workflows.

6. **What is blue-green deployment (concept)?**  
   **Short Answer:** Blue-green uses two parallel environments so traffic can switch safely to a new version with fast rollback.  
   **Detailed Explanation:** In blue-green deployment, one environment serves live traffic while the other receives the new release. After verification checks pass, traffic is switched to the new environment. If issues appear, traffic can quickly switch back, minimizing downtime and user impact. Interviewers like this pattern because it demonstrates release risk management, not just automation skills. It requires strong health checks, environment parity, and traffic routing control. Mentioning rollback readiness is important: deployment is incomplete without recovery path. Blue-green is common in systems where availability is critical and release confidence must remain high during frequent updates.

7. **Why deploy from tags or releases?**  
   **Short Answer:** Tags provide immutable version points, making deployments traceable and repeatable.  
   **Detailed Explanation:** Deploying from tags or formal releases improves traceability because each deployment maps to a fixed commit identifier with version meaning. This makes audits, incident response, and rollback much easier compared to deploying from moving branch heads. Teams can document exactly what changed between versions and reproduce builds if needed. Interviewers appreciate this because it reflects release discipline. Tagged releases also improve communication across engineering, QA, and operations, since everyone references the same version label. For regulated or enterprise settings, immutable versioning is often mandatory for compliance and change management processes.

8. **What is artifact caching in CI?**  
   **Short Answer:** Artifact caching stores reusable build dependencies between runs to reduce pipeline time.  
   **Detailed Explanation:** CI jobs often repeat expensive dependency downloads and build preparation. Caching avoids this waste by reusing unchanged artifacts between runs. In Java projects, Maven local repository caching can significantly reduce build duration, improving developer feedback loop. Interviewers expect you to mention that cache keys should include dependency lock context so stale dependencies do not cause hidden issues. Caching improves speed but should not compromise correctness; clean rebuilds may still be needed in certain failures. A balanced explanation of performance and reliability demonstrates practical CI pipeline understanding and helps show you can optimize workflows responsibly.

9. **What can go wrong if you deploy \`main\` on every commit without tests?**  
   **Short Answer:** Unvalidated commits can break production quickly, causing outages and difficult recovery.  
   **Detailed Explanation:** Automatic deployment without quality gates is high risk because every commit becomes a potential incident. Even small mistakes can introduce build failures, runtime errors, performance regressions, or security vulnerabilities in live systems. Interviewers want candidates to connect this to business impact: downtime, user trust loss, emergency fixes, and slowed team productivity. Good deployment pipelines include test checks, review gates, environment validation, and rollback procedures before production promotion. Fast delivery is valuable, but safety controls are equally important. A professional answer highlights controlled automation rather than blind automation, with strong quality checks built into the delivery process.

10. **How does Git relate to deployment?**  
    **Short Answer:** Git provides versioned source truth, and deployment systems use Git events and commits to drive release automation.  
    **Detailed Explanation:** Deployment automation depends on Git as the canonical history of what changed, when, and by whom. Pipelines react to branch updates, tags, pull request merges, or releases and then build and deploy corresponding artifacts. This linkage creates traceability from production state back to source commits. Interviewers appreciate answers that emphasize governance: approvals, checks, and branch policies in Git directly influence deployment safety. Git alone does not deploy software, but it provides deterministic version control that makes CI CD reliable. Combining strong Git practices with automated pipelines enables repeatable releases, controlled rollouts, and faster incident diagnosis.

---

## Related tutorials — quick links (topic-wise)

| Topic | Tutorial link |
|-------|----------------|
| **GitHub Actions examples (this topic)** | [Git Deployment](/tutorial/git-deployment) |
| **Maven build commands** | [Maven Build Lifecycle](/tutorial/maven-build-lifecycle) |
| **Spring Boot deploy** | [Spring Boot Deployment](/tutorial/spring-boot-deployment) |
| **Workflow & branches** | [Git Workflow](/tutorial/git-workflow) |
| **HTTP basics (webhooks/APIs)** | [HTTP Introduction](/tutorial/http-introduction) |

## Deployment Readiness Checklist (Before Production)

- CI green on main branch
- Security checks pass (dependency and secret scanning)
- Version/tag created for traceability
- Rollback command documented and tested
- Health checks and smoke tests defined
- On-call owner identified for release window

## Rollback Runbook (Fast Recovery)

When a release fails:

1. Stop traffic or disable the risky feature flag.
2. Redeploy previous known-good artifact/tag.
3. Verify critical endpoints with smoke tests.
4. Announce status in team channel.
5. Open post-incident action items.

A reliable rollback process is as important as deployment automation.

Automated deployment saves time and reduces errors. Start with simple workflows and expand as needed!

---

## Deep Theory: Deployment as Controlled State Promotion

Deployment is the promotion of a software artifact across trust boundaries: source state to build state to runtime state.

### CI/CD Conceptual Pipeline

1. Integration validation: prove artifact correctness under automated checks.
2. Delivery validation: prove deployability under environment constraints.
3. Runtime validation: prove operational stability under live traffic.

Each stage reduces uncertainty before the next trust boundary is crossed.

### Why Git Is Central

Git commit identity provides traceability:

- what code is running,
- when it changed,
- who approved it,
- how to roll back.

Without this lineage, operational incidents become harder to diagnose and recover.

### Reliability Principle

A mature deployment system optimizes for reversible change, not just fast change.
`
};

export default gitDeployment;

