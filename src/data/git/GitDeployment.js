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
   **Continuous Integration:** on **push/PR**, a **workflow** runs **build and tests** (e.g. \`mvn test\`). **Fast feedback** before merge.

2. **What is CD?**  
   **Continuous Delivery/Deployment:** **after** merge (or tag), **automatically** deploy to **staging/production**—often gated by **approvals** or **branch** (\`main\` only).

3. **Why use secrets in GitHub Actions?**  
   **Never** put passwords or SSH keys in YAML. **Repository/Environment secrets** inject values at **runtime**—**masked** in logs.

4. **What is \`on: push\` vs \`on: pull_request\`?**  
   **push** runs when branches update; **pull_request** runs on **PR** events—typical for **CI on PRs** before merge.

5. **How does Maven fit into a Java deploy pipeline?**  
   **\`mvn clean verify\`** or **\`mvn package\`** produces **JAR/WAR**; next step **copies** artifact to server, **Docker** build, or **cloud** deploy.

6. **What is blue-green deployment (concept)?**  
   Two **environments** (blue/green); **switch traffic** to the new version **instantly**—**rollback** by switching back. **Interview** buzzword tied to **zero-downtime**.

7. **Why deploy from tags or releases?**  
   **Immutable** version markers (\`v1.2.0\`) tie **deployed** bits to **exact** source—**audit** and **rollback** clarity.

8. **What is artifact caching in CI?**  
   Cache **\`~/.m2\`** between runs to **speed** Maven builds—**faster** PR checks.

9. **What can go wrong if you deploy \`main\` on every commit without tests?**  
   **Broken** code reaches users. **Always** run **tests** and **use** branch protection.

10. **How does Git relate to deployment?**  
    Git **stores** the **version** of code; pipelines **react** to Git **events**. **“Git is source of truth; CI/CD is automation on top.”**

---

## Related tutorials — quick links (topic-wise)

| Topic | Tutorial link |
|-------|----------------|
| **GitHub Actions examples (this topic)** | [Git Deployment](/tutorial/git-deployment) |
| **Maven build commands** | [Maven Build Lifecycle](/tutorial/maven-build-lifecycle) |
| **Spring Boot deploy** | [Spring Boot Deployment](/tutorial/spring-boot-deployment) |
| **Workflow & branches** | [Git Workflow](/tutorial/git-workflow) |
| **HTTP basics (webhooks/APIs)** | [HTTP Introduction](/tutorial/http-introduction) |

Automated deployment saves time and reduces errors. Start with simple workflows and expand as needed!
`
};

export default gitDeployment;

