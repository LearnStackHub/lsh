const dockerfileBasics = {
  id: 'docker-dockerfile',
  title: 'Dockerfile (Most Important)',
  description:
    'Master Dockerfile instructions and production patterns with real-time scenarios, optimization tips, and common pitfalls.',
  content: `
# Dockerfile (MOST IMPORTANT)

If Docker is the engine, Dockerfile is the design blueprint.  
A good Dockerfile gives you fast builds, small images, safer deployments, and predictable runtime behavior.

A poor Dockerfile leads to:

- large images
- slow CI pipelines
- startup failures
- security risks
- difficult debugging

That is why Dockerfile is one of the most important topics in Docker interviews and real projects.

## What is Dockerfile?

A Dockerfile is a text file containing ordered instructions that Docker uses to build an image.

Each instruction creates one or more layers, and those layers impact:

- build speed
- image size
- cache reuse
- maintainability

## Basic Spring Boot example

\`\`\`dockerfile
FROM openjdk:17
WORKDIR /app
COPY target/app.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]
\`\`\`

This works, but in real projects we usually improve it with version pinning, smaller runtime images, and multi-stage builds.

## Why Dockerfile quality matters in real teams

Real-time scenario:
- team has 20 microservices
- each build takes 10+ minutes due to poor Dockerfile caching
- CI queue grows, release velocity drops

After Dockerfile optimization:
- dependency layers reused
- image size reduced
- build duration drops significantly

Result: faster releases and fewer deployment delays.

## Important instructions

### FROM

Defines the base image.

Example:
\`\`\`dockerfile
FROM eclipse-temurin:17-jre
\`\`\`

Best practice:
- use trusted base images
- pin explicit versions (avoid floating tags when possible)

Real-time scenario:
- using generic \`latest\` base breaks app after upstream change
- pinning version avoids unexpected runtime drift

### WORKDIR

Sets working directory for subsequent instructions.

Example:
\`\`\`dockerfile
WORKDIR /app
\`\`\`

Why useful:
- cleaner Dockerfile
- avoids repeated absolute paths

### COPY

Copies files from build context to image.

Example:
\`\`\`dockerfile
COPY target/app.jar app.jar
\`\`\`

Common mistake:
- wrong source path causes build failure or runtime missing file errors

### RUN

Executes commands during image build (not container runtime).

Example:
\`\`\`dockerfile
RUN apt-get update && apt-get install -y curl
\`\`\`

Use carefully:
- each RUN may create layers
- unnecessary RUN instructions can bloat images

### CMD vs ENTRYPOINT

- \`CMD\`: default command/args, easy to override
- \`ENTRYPOINT\`: fixed executable, preferred for app startup

Common pattern:
\`\`\`dockerfile
ENTRYPOINT ["java","-jar","app.jar"]
CMD ["--spring.profiles.active=prod"]
\`\`\`

This gives stable startup command with overridable defaults.

## Layering and cache strategy (very important)

Docker builds in order. If earlier layers change, later layers rebuild.

Bad pattern:
\`\`\`dockerfile
COPY . .
RUN mvn package
\`\`\`

Any small code change invalidates huge build portions.

Better pattern:
- copy dependency descriptors first
- resolve dependencies
- copy source later

This improves cache reuse dramatically.

## Real-time scenario: "Why is build suddenly slow?"

Cause:
- Dockerfile changed to copy full repo early
- cache invalidated every commit

Fix:
- reorganize Dockerfile by change frequency
- keep stable layers first

## .dockerignore (must use)

\`.dockerignore\` controls what files are sent into build context.

Without it:
- large, unnecessary files increase build time
- secrets can accidentally enter image context

Typical ignores:
- \`.git\`
- \`node_modules\`
- local logs
- IDE folders
- temporary files

Real-time security scenario:
- developer forgets to ignore \`.env\`
- secrets copied into build context/image layer

Prevention:
- enforce \`.dockerignore\` as standard practice.

## Multi-stage build (production standard)

Multi-stage builds separate build tools from runtime image.

Example concept:

1. Build stage: compile/package app
2. Runtime stage: copy only final artifact

Benefits:
- smaller final image
- fewer vulnerabilities
- faster pull/deploy

Real-time scenario:
- monolithic single-stage image is 1.5GB
- multi-stage optimization reduces it to 300MB
- deployment and startup become much faster

## Example multi-stage Spring Boot Dockerfile

\`\`\`dockerfile
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /build
COPY pom.xml .
RUN mvn -q -DskipTests dependency:go-offline
COPY src ./src
RUN mvn -q -DskipTests package

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /build/target/*.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]
\`\`\`

This pattern is widely used in production pipelines.

## Security best practices in Dockerfile

1. Use trusted and minimal base image
2. Avoid running as root when possible
3. Avoid embedding secrets
4. Keep runtime image minimal
5. Rebuild images regularly for patches

Real-time scenario:
- security scan finds high vulnerabilities in outdated base image
- updating base and rebuilding closes risk quickly

## Real-time scenario: Container starts then exits

Common Dockerfile causes:
- wrong ENTRYPOINT path
- jar not copied to expected location
- executable permission missing for script entrypoint

Fix workflow:
- inspect build logs
- inspect final image layers
- run container and check logs

Commands:
\`\`\`bash
docker logs <container-id>
docker run --rm -it <image> sh
\`\`\`

## Real-time scenario: App works locally but fails in production

Possible Dockerfile-related causes:
- environment-specific hardcoding
- missing OS package in runtime image
- wrong architecture/base image mismatch

Fix:
- keep Dockerfile environment-neutral
- test image in staging with production-like constraints
- pin known working base versions

## Readability and maintainability tips

A Dockerfile should be readable by team members during incidents.

Good practices:
- group related steps
- use clear WORKDIR
- avoid unnecessary complexity
- document non-obvious steps with short comments

Maintainable Dockerfiles reduce recovery time during failures.

## Common Dockerfile mistakes

1. Using \`latest\` blindly
2. Copying full project too early
3. Missing \`.dockerignore\`
4. Installing unnecessary packages
5. Storing secrets in image
6. Overusing root user
7. No multi-stage split for compiled apps

Avoiding these mistakes improves reliability and security quickly.

## Interview-ready answer format

If asked "What makes a good Dockerfile?", answer:

A good Dockerfile is secure, minimal, cache-efficient, and reproducible.  
It uses trusted base images, optimized layer ordering, .dockerignore, clear startup commands, and often multi-stage builds for smaller runtime artifacts.

If asked "CMD vs ENTRYPOINT?", answer with a scenario:

ENTRYPOINT fixes executable (for example Java app), CMD provides default runtime args that can be overridden for environments.

## Best practices checklist

- Use small trusted base image
- Pin versions
- Keep layers minimal and ordered for cache
- Use \`.dockerignore\`
- Prefer multi-stage builds
- Keep secrets out of image
- Use clear ENTRYPOINT/CMD pattern
- Test built image before push

## Final takeaway

Dockerfile is not just syntax; it is deployment architecture in text form.

If your Dockerfile is well designed, everything downstream improves:

- CI/CD speed
- image security posture
- runtime stability
- rollback predictability

Master Dockerfile deeply, and you will stand out in interviews and ship more reliable production systems.
`
};

export default dockerfileBasics;
