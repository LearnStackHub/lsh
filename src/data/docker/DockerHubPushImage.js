const dockerHubPushImage = {
  id: 'docker-hub-push-image',
  title: 'Docker Hub (Push Image)',
  description:
    'Learn how to tag, push, version, and manage Docker images in Docker Hub with real-world CI/CD and team scenarios.',
  content: `
# Docker Hub (Push Image)

In real software teams, building an image is only half the job.  
The next critical step is publishing that image to a registry so others can run the same artifact.

Docker Hub is the most common public registry and a standard learning point for interviews and real DevOps workflows.

This lesson explains not only "how to push," but also how to do it in a professional, production-safe way.

## Why Docker Hub matters in real projects

If an image exists only on your laptop, nobody else can reliably use it.  
By pushing to Docker Hub (or another registry), you make deployment reproducible.

Benefits:

- team members pull the exact same image
- CI/CD deploys the same tested artifact
- rollback is easier with version tags
- environments become consistent

Real-time scenario:
- Developer says "my local image works"
- QA cannot reproduce because image was never published
- Once image is pushed and tagged properly, QA pulls exact same version and issue becomes traceable

## Basic steps to push an image

\`\`\`bash
docker login
docker tag app username/app
docker push username/app
\`\`\`

This is correct, but in professional workflows you should include version tags and naming conventions.

## Complete professional push flow

### Step 1: Build image with local tag

\`\`\`bash
docker build -t app:1.0.0 .
\`\`\`

### Step 2: Login to Docker Hub

\`\`\`bash
docker login
\`\`\`

### Step 3: Tag image for Docker Hub namespace

\`\`\`bash
docker tag app:1.0.0 username/app:1.0.0
docker tag app:1.0.0 username/app:latest
\`\`\`

### Step 4: Push tags

\`\`\`bash
docker push username/app:1.0.0
docker push username/app:latest
\`\`\`

Now any teammate/server can pull the same version:

\`\`\`bash
docker pull username/app:1.0.0
\`\`\`

## Image naming convention

Standard format:

\`\`\`
<namespace>/<repository>:<tag>
\`\`\`

Example:

\`\`\`
dattu/springboot-app:1.3.2
\`\`\`

Where:
- \`namespace\` = Docker Hub username/org
- \`repository\` = image name
- \`tag\` = version/release label

## Why push images?

- Team members can pull and run same image
- CI/CD can deploy consistent artifacts
- Versioned releases become easier

## Real-time scenario 1: Team collaboration

A team has backend, QA, and DevOps members.

Old flow:
- backend shares source code
- each environment builds differently
- inconsistent behavior

Improved flow:
- backend pushes \`username/app:1.4.0\`
- QA and DevOps pull same tag
- all environments run exact same artifact

Result:
- fewer "works on my machine" issues
- faster release validation

## Real-time scenario 2: CI/CD release pipeline

Typical pipeline:

1. Commit merged to main
2. CI builds Docker image
3. Tests run against image
4. Image tagged with release version
5. Image pushed to Docker Hub/private registry
6. Deployment server pulls that tag

This is a core DevOps pattern and very common in interviews.

## Real-time scenario 3: Production rollback

Imagine version \`2.1.0\` is deployed and a bug is found.

Because older tags exist, rollback is simple:

\`\`\`bash
docker pull username/app:2.0.9
\`\`\`

Then deploy \`2.0.9\` quickly.

If only \`latest\` is used, rollback becomes risky and confusing.

## Public vs Private repos

- **Public**: anyone can pull
- **Private**: restricted access

### When to use public

- open-source projects
- learning/demo repositories
- shareable sample apps

### When to use private

- internal enterprise services
- proprietary business logic
- regulated/sensitive projects

For company projects, private repos are usually safer.

## Tagging strategy

Use meaningful tags:
- \`app:1.0.0\`
- \`app:staging\`
- \`app:prod-2026-04-25\`

## Better tag strategy (recommended)

Use multiple tag types carefully:

- **semantic version**: \`1.2.3\`
- **environment tag**: \`staging\`, \`prod\`
- **commit-based tag**: \`sha-9f3a12d\`

Best practice:
- treat \`latest\` as convenience, not source of truth
- deployments should use immutable version tag

## Verifying pushed images

After push:

\`\`\`bash
docker pull username/app:1.0.0
docker images
\`\`\`

You can also verify in Docker Hub UI:
- tag exists
- correct pushed time
- expected repository

## Common push errors and fixes

### Error 1: denied: requested access to the resource is denied

Cause:
- wrong repo name
- not logged in
- no permission to target namespace

Fix:
- run \`docker login\`
- confirm correct username/repo
- ensure repo exists under your namespace

### Error 2: image does not exist locally with the tag

Cause:
- trying to push tag not created

Fix:
- check local images:
\`\`\`bash
docker images
\`\`\`
- create correct tag again

### Error 3: unauthorized: incorrect username/password

Cause:
- wrong credentials or expired token

Fix:
- login again using valid credentials/access token

### Error 4: push is very slow

Cause:
- large image size
- slow network

Fix:
- optimize Dockerfile
- remove unnecessary layers/files
- use smaller base image when possible

### Error 5: accidentally pushed wrong image tag

Fix:
- do not reuse tag blindly
- push corrected version with new tag
- update deployment references immediately

## Security and compliance considerations

When pushing images publicly, be careful:

- never bake secrets into image
- avoid copying \`.env\` or credential files into build context
- scan image for vulnerabilities before push
- pin base image versions and patch regularly

Real-time incident example:
- team accidentally includes cloud credentials file in image layer
- pushed to public repo
- credentials exposed

Prevention:
- use \`.dockerignore\`
- review Dockerfile COPY commands
- run secret scanning checks in CI

## Docker Hub with organizations and teams

For growing teams, use Docker Hub organizations:

- central repository ownership
- role-based access (admin/write/read)
- easier lifecycle management across projects

This avoids dependency on a single developer personal account.

## Practical release checklist before push

Before pushing production-bound image, verify:

- app builds successfully
- tests pass
- image starts correctly
- expected port works
- tag naming is correct
- no secrets in image
- release notes/version mapping exists

This checklist prevents many last-minute failures.

## Interview-ready answer

If asked "How do you push an image to Docker Hub?" answer:

1. Build image locally
2. Login to Docker Hub
3. Tag image with namespace/repo/version
4. Push versioned tag
5. Pull and verify the same tag for deployment

If asked "Why not only use latest?" answer:

Because \`latest\` is mutable and poor for traceability.  
Versioned immutable tags are required for safe rollbacks and reproducible deployments.

## Final takeaway

Docker Hub is not just a storage place.  
It is a release management layer for containerized applications.

When you push images with discipline (correct tags, security checks, and verification), you enable reliable team collaboration, stable CI/CD pipelines, and safer production deployments.

Mastering this workflow is a key step from Docker beginner to production-ready engineer.
`
};

export default dockerHubPushImage;
