const dockerBuildRun = {
  id: 'docker-build-run-custom-image',
  title: 'Build & Run Custom Image',
  description:
    'Build and run a custom Docker image for Spring Boot with production-style steps, debugging workflow, and real-world scenarios.',
  content: `
# Build & Run Custom Image

Building and running a custom image is where Docker becomes truly useful for real projects.  
This is the stage where your source code is converted into a portable artifact that can run the same way in local, staging, and production.

Most beginners only memorize two commands:

\`\`\`bash
docker build -t app .
docker run app
\`\`\`

But in real teams, build and run decisions affect:

- deployment reliability
- startup speed
- troubleshooting effort
- production stability

This lesson gives you the practical way to build and run custom images, including real-time scenarios and common failures.

## The basic idea

When you run \`docker build\`, Docker reads your \`Dockerfile\` and creates an image layer by layer.  
When you run \`docker run\`, Docker creates a container from that image and starts the configured process.

Simple definition:

- **Build** = create image
- **Run** = start container from image

## Prerequisites before build

For a Spring Boot project:

1. Application code is complete
2. JAR is generated
3. Dockerfile exists
4. Build context is correct (run command from project root)

Build JAR first:

\`\`\`bash
mvn clean package
\`\`\`

If this step fails, Docker build will also fail because expected artifact is missing.

## Build image (core command)

\`\`\`bash
docker build -t springboot-app .
\`\`\`

What this means:

- \`docker build\`: build command
- \`-t springboot-app\`: tag image name
- \`.\`: current directory as build context

## Why build context matters

The final \`.\` is not optional in practice.  
It tells Docker which files can be used during build.

Real-time scenario:
- Your Dockerfile has \`COPY target/app.jar app.jar\`
- You run build from wrong folder
- Docker cannot find \`target/app.jar\`

Error appears:
- file not found in build context

Fix:
- run build from the project root
- confirm JAR path inside Dockerfile

## Tagging strategy (important in teams)

Do not rely only on a single image name.

Recommended tags:

\`\`\`bash
docker build -t springboot-app:1.0.0 .
docker build -t springboot-app:latest .
\`\`\`

Why this helps:
- \`latest\` is convenient for local use
- version tags are critical for rollback and traceability

Real-time scenario:
- Version 1.0.3 fails in production
- Team quickly rolls back to 1.0.2
- This is only possible when tags are properly maintained

## Run container (basic)

\`\`\`bash
docker run -p 8080:8080 springboot-app
\`\`\`

This maps:
- host port 8080 -> container port 8080

Without \`-p\`, app runs but is not reachable from browser/Postman.

## Run container (production-style options)

A more realistic run command:

\`\`\`bash
docker run -d --name springboot-app \\
  -p 8080:8080 \\
  --restart unless-stopped \\
  springboot-app:1.0.0
\`\`\`

Explanation:
- \`-d\`: detached mode
- \`--name\`: readable container name
- \`--restart unless-stopped\`: auto restart policy
- tagged version image for controlled deployment

## Real project flow (recommended sequence)

1. Build Spring Boot JAR (\`mvn clean package\`)
2. Build image using Dockerfile
3. Run container with port mapping and name
4. Check container and logs
5. Test API endpoint using Postman/browser
6. Push tagged image to registry if needed

## Verify each stage

### Verify image

\`\`\`bash
docker images
\`\`\`

### Verify running container

\`\`\`bash
docker ps
\`\`\`

### Verify logs

\`\`\`bash
docker logs <container-id>
\`\`\`

### Verify API

Example:
\`\`\`
http://localhost:8080/actuator/health
\`\`\`
or your application endpoint.

## Real-time scenario 1: New developer onboarding

Problem:
- New teammate clones repo
- Local Java setup is different
- App fails during first run

Solution with image build/run:

1. Teammate builds JAR
2. Builds image from repo Dockerfile
3. Runs container with documented command

Result:
- Same runtime behavior across laptops
- Faster onboarding

## Real-time scenario 2: CI build artifact promotion

Pipeline pattern:

1. CI builds image from commit
2. Runs tests against container
3. Tags image with commit SHA/release
4. Pushes to registry
5. Deployment pulls exact tag

Why this is powerful:
- No "works locally but fails in prod"
- Image tested in CI is the same image deployed

## Real-time scenario 3: Spring Boot API launch day

Your team plans a feature release at 6 PM:

- Build image: \`springboot-app:2.4.0\`
- Deploy container
- Monitor logs
- Rollback quickly if needed

If startup fails, you immediately inspect logs:

\`\`\`bash
docker logs springboot-app
\`\`\`

Typical findings:
- missing env variable
- DB host mismatch
- incorrect profile active

## Environment variables while running

Many runtime values should not be hardcoded in image.

Example:

\`\`\`bash
docker run -d --name springboot-app \\
  -p 8080:8080 \\
  -e SPRING_PROFILES_ACTIVE=prod \\
  -e DB_HOST=db \\
  springboot-app:1.0.0
\`\`\`

This keeps image reusable across environments.

## Common mistakes and practical fixes

### 1) Wrong JAR path in Dockerfile

Symptom:
- build fails at COPY step

Fix:
- ensure artifact name matches actual \`target/*.jar\`
- verify with:
\`\`\`bash
ls target
\`\`\`

### 2) Wrong port mapping

Symptom:
- app starts, but browser cannot connect

Fix:
- map host and container ports correctly
- check with \`docker ps\`

### 3) Missing runtime dependencies

Symptom:
- container exits immediately

Fix:
- inspect logs
- verify Java/base image compatibility

### 4) Container name conflict

Symptom:
\`Conflict. The container name is already in use.\`

Fix:
\`\`\`bash
docker rm -f springboot-app
\`\`\`
Then run again.

### 5) Port already in use

Symptom:
\`Bind for 0.0.0.0:8080 failed: port is already allocated\`

Fix options:
- stop old process/container
- or run on different host port:
\`\`\`bash
docker run -p 8081:8080 springboot-app
\`\`\`

### 6) App cannot connect to database

Symptom:
- startup DB connection errors

Fix:
- if DB is in Docker network, use service/container name
- if DB is local host machine, use correct host strategy for your platform

## Useful cleanup commands

\`\`\`bash
docker stop springboot-app
docker rm springboot-app
docker rmi springboot-app:1.0.0
\`\`\`

Use carefully in shared environments.

## Build optimization tips

For faster builds in repeated development:

- keep stable layers first (base image, dependencies)
- copy source later
- use \`.dockerignore\` to reduce context size

Real impact:
- lower CI build time
- faster developer feedback cycles

## Production habits to adopt early

- Always use versioned tags
- Store configuration outside image
- Keep images small and focused
- Enable restart policy
- Monitor container logs after deployment
- Document exact build/run commands in project README

These habits convert Docker usage from "local experiment" to "production-ready workflow."

## Interview-ready summary

If asked "How do you build and run a custom Docker image for a Spring Boot app?", answer:

1. Build JAR using Maven
2. Build image from Dockerfile with tag
3. Run container with proper port mapping and env vars
4. Verify with \`docker ps\` and \`docker logs\`
5. Use version tags for deployment and rollback

This shows both command knowledge and real-world maturity.

## Final takeaway

Building and running custom images is not just two commands.  
It is the center of modern deployment flow.

When done correctly, it gives you:

- consistent runtime behavior
- safer releases
- easier debugging
- cleaner collaboration between dev and ops

Master this workflow once, and every Spring Boot or microservice deployment becomes far more predictable.
`
};

export default dockerBuildRun;
