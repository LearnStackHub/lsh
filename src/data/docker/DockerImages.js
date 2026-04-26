const dockerImages = {
  id: 'docker-images',
  title: 'Docker Images',
  description:
    'Master Docker images with real-world scenarios: layers, caching, tagging, optimization, security, and production usage.',
  content: `
# Docker Images

Docker images are the foundation of container-based development.  
If containers are the running processes, images are the packaged blueprint those processes come from.

Most Docker problems in real projects are actually image problems:

- image too large
- wrong base image
- poor tag strategy
- vulnerable dependencies
- inconsistent artifact between environments

So learning Docker images deeply is not optional. It is core to reliable deployment.

## What is an image?

A Docker image is an immutable, read-only template used to create containers.

It contains:
- application code
- runtime
- dependencies
- configuration

Think of it like a packaged runtime snapshot.

When you run \`docker run\`, Docker creates a container from the image and adds a writable container layer on top.

## Why images matter in real systems

In professional teams, image quality directly affects:

- build speed
- CI/CD performance
- deployment consistency
- vulnerability risk
- cloud cost (transfer/storage/startup)

Real-time scenario:
- Team ships a 1.8GB image for a simple API
- CI pipeline slows down, deployments take longer, cold starts become painful
- After optimizing Dockerfile and base image, size drops to 280MB and release speed improves significantly

This is why image hygiene is a practical engineering skill.

## Pre-built images from Docker Hub

Docker Hub provides ready-to-use images such as:
- \`nginx\`
- \`mysql\`
- \`openjdk\`
- \`redis\`

Pull image example:

\`\`\`bash
docker pull nginx
\`\`\`

You can also pull specific versions:

\`\`\`bash
docker pull nginx:1.27
\`\`\`

Using specific tags is safer than depending only on \`latest\`.

## Image Layers

Docker images are built in layers.

Each instruction in a Dockerfile can create a new layer.
Layers are cached and reused for fast builds.

## How layer caching works

Suppose Dockerfile is:

\`\`\`dockerfile
FROM openjdk:17
WORKDIR /app
COPY pom.xml .
RUN mvn -q -DskipTests dependency:go-offline
COPY target/app.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]
\`\`\`

If only \`app.jar\` changes, earlier layers may be reused from cache.  
This makes builds much faster.

### Real-time scenario: slow CI builds

Problem:
- Every build takes full time because cache is invalidated frequently

Cause:
- Dockerfile copies entire project too early (\`COPY . .\`)

Fix:
- copy stable files first
- keep frequently changing files in later layers

Result:
- faster incremental builds and lower CI cost

## Read-only structure

Image layers are read-only.
When you run a container, Docker adds a thin writable layer on top.

This explains an important behavior:
- data written inside container layer is ephemeral unless persisted via volumes

## Base image selection (critical decision)

Choosing base image is one of the most important architecture decisions.

Common patterns:
- \`openjdk:17\`: easy and familiar, but often heavier
- \`eclipse-temurin:17-jre\`: lighter runtime-focused option
- \`alpine\` variants: smaller footprint, but sometimes compatibility issues

### Real-time scenario: image works locally but fails in production

Cause:
- ultra-minimal base image misses required system libraries

Fix:
- use compatible runtime image
- test image in staging with production-like traffic

## Tagging images properly

Treat tags as release identifiers.

Good examples:
- \`myapp:1.0.0\`
- \`myapp:1.0.1\`
- \`myapp:staging\`
- \`myapp:prod-2026-04-26\`

Avoid relying only on \`latest\` in production.

### Real-time scenario: failed deployment rollback

If all deployments use \`latest\`, rollback becomes unclear.  
With semantic version tags, rollback is immediate and reliable.

## Useful commands

\`\`\`bash
docker images
docker image inspect nginx
docker rmi nginx
\`\`\`

Additional useful commands:

\`\`\`bash
docker history nginx
docker image ls --digests
docker image prune
\`\`\`

Why these help:
- \`history\`: inspect layer size and commands
- digests: immutable identity verification
- prune: cleanup dangling images

## Real-time scenario: disk space fills unexpectedly

Problem:
- developer machine or CI runner runs out of disk

Cause:
- many old/dangling images are kept

Fix:

\`\`\`bash
docker image prune -a
\`\`\`

Use with caution in shared environments.

## Image optimization techniques

### 1) Use smaller runtime base image

Choose only what app needs.

### 2) Multi-stage builds

Build in one stage, run in another:
- stage 1: compile/package
- stage 2: minimal runtime image

This removes build tools from final image.

### 3) Use .dockerignore

Exclude unnecessary files:
- \`.git\`
- local logs
- IDE folders
- build artifacts not needed

### 4) Keep layers clean

Combine related commands and remove temp files.

### Real-time scenario: vulnerability scanner reports hundreds of issues

Cause:
- bloated base image and unnecessary packages

Fix:
- use minimal trusted base image
- update dependencies
- rebuild and rescan

## Security perspective for Docker images

Images are software supply chain artifacts.  
Security must be integrated into image lifecycle.

Best practices:
- use official/trusted base images
- pin versions (avoid floating tags)
- scan images before push/deploy
- avoid embedding secrets in image layers
- rebuild regularly for security patches

Common mistake:
- copying \`.env\` with secrets into image

Fix:
- provide secrets at runtime through env injection or secret management

## Image immutability and deployment reliability

Immutability means image content should not change after build.  
Instead of changing a running container manually, rebuild and redeploy new image.

Benefits:
- predictable deployments
- auditable release process
- easier debugging and rollback

This is a core DevOps principle.

## Real-time scenario: "works in staging, fails in prod"

A frequent hidden cause is artifact mismatch:
- staging ran image A
- production accidentally pulled image B with same mutable tag

Fix:
- deploy by immutable version tags or digest
- record release image metadata in deployment logs

## Images in CI/CD workflow

Typical professional flow:

1. build image in CI
2. run tests using that image
3. tag with version + commit
4. push to registry
5. deploy same image to environments

This guarantees artifact consistency from pipeline to production.

## Image vs Container (interview + practical point)

**Image** = read-only template  
**Container** = runtime instance with writable layer

If asked in interview:
- image is build-time artifact
- container is runtime execution unit

Simple, precise, and correct.

## Common beginner mistakes with images

- Using only \`latest\` for everything
- Ignoring image size
- Copying entire repo blindly into image
- Not using \`.dockerignore\`
- Deleting images while containers still depend on them
- Not scanning images before release

Avoiding these mistakes makes your Docker workflow production-ready faster.

## Practical checklist before publishing an image

Before push/deploy, verify:

- correct tag and version
- image starts successfully
- ports/config behave as expected
- size is reasonable
- vulnerabilities reviewed
- no secrets in layers
- rollback tag available

This checklist saves many release-day surprises.

## Final takeaway

Docker images are much more than "something you build once."  
They are the core release artifact in containerized systems.

If you manage images well (layer strategy, tagging discipline, size optimization, and security checks), everything downstream improves:

- faster builds
- safer deployments
- easier rollbacks
- more stable environments

Master Docker images well, and the rest of Docker topics become easier and more reliable in real-world projects.

## Interview point

**Image** = template  
**Container** = running instance of template
`
};

export default dockerImages;
