const dockerArchitecture = {
  id: 'docker-architecture',
  title: 'Docker Architecture',
  description:
    'Understand Docker architecture in depth with Docker Engine, CLI, Daemon, Registry, and real-world deployment scenarios.',
  content: `
# Docker Architecture

Docker architecture is the backbone of how containers are built, shipped, and run.  
Most beginners learn Docker commands first, but once you understand architecture, debugging becomes easier, deployment becomes smoother, and interview answers become much stronger.

This lesson explains each Docker component with practical real-time scenarios from development and production teams.

## Architecture Flow Diagram

\`\`\`diagram flow
{
  "steps": [
    { "icon": "👨‍💻", "label": "Developer runs docker command" },
    { "icon": "💻", "label": "Docker CLI sends API request" },
    { "icon": "⚙️", "label": "Docker Daemon processes request" },
    { "icon": "📦", "label": "Image found locally or pulled" },
    { "icon": "🧱", "label": "Container is created and started" }
  ]
}
\`\`\`

## Why Docker architecture is important

Suppose your Spring Boot app works on your laptop, but fails in staging.  
Without architecture knowledge, you only try random fixes.  
With architecture knowledge, you can ask:

- Did image build correctly?
- Did daemon receive the right build context?
- Is the correct image tag pulled from registry?
- Is runtime network/volume configured correctly?

That is exactly why architecture matters in real projects.

## Core Docker components

### 1) Docker Engine

Docker Engine is the platform that makes containerization possible.  
It includes:

- Docker Daemon (\`dockerd\`)
- Docker REST API
- Docker CLI client

Think of Engine as the full runtime ecosystem.

### 2) Docker Daemon (\`dockerd\`)

Daemon is the background server process that does the real work:

- builds images
- runs containers
- creates networks
- mounts volumes
- manages container lifecycle

When you run a command in terminal, the daemon is the component that actually executes it.

### 3) Docker CLI

Docker CLI is the command interface developers use:

\`\`\`bash
docker build -t myapp .
docker run -p 8080:8080 myapp
\`\`\`

CLI does not run containers directly.  
It sends requests to daemon through Docker API.

### 4) Docker Registry

A registry stores images so teams and servers can pull the same artifact.

Common registries:
- Docker Hub
- GitHub Container Registry
- AWS ECR
- Azure Container Registry

In enterprise teams, private registries are common to protect internal images.

### 5) Docker Objects

Docker architecture manages multiple object types:

- **Images**: immutable templates
- **Containers**: running instances
- **Volumes**: persistent data storage
- **Networks**: container communication channels

Understanding these objects prevents most beginner-level production bugs.

## End-to-end flow (developer to running container)

\`\`\`
Developer -> Docker CLI -> Docker Daemon -> Image -> Container
                              |
                              -> Docker Registry (if pull/push required)
\`\`\`

### Step-by-step real flow

1. Developer runs \`docker run nginx\`
2. CLI sends API request to daemon
3. Daemon checks local image cache
4. If image missing, daemon pulls from registry
5. Daemon creates container from image
6. Network and filesystem layers are attached
7. Container starts and process runs

This flow is exactly what happens in local environments, CI pipelines, and cloud servers.

## Real-time scenario 1: "Works on my machine"

Team setup:
- Developer A uses Java 17
- Developer B has Java 21
- MySQL version differs in QA

Result:
- App behaves differently across environments

Docker solution:
- Same base image
- Same app artifact
- Same startup command
- Same dependency/runtime stack

Architecture takeaway: image consistency removes environment drift.

## Real-time scenario 2: CI/CD deployment pipeline

In a real DevOps pipeline:

1. Code pushed to Git
2. CI server builds image using Docker daemon
3. Image pushed to private registry
4. Deployment server pulls exact image tag
5. Container starts in staging/production

Because image is immutable, production runs what CI built.  
This improves traceability and rollback.

## Local image cache vs remote registry

### Local cache

Fast for development.  
If image exists locally, no network pull is needed.

### Remote registry

Required for sharing images between machines.  
Production servers usually pull from registry, not from developer laptop.

Best practice:
- Use semantic tags (\`1.0.0\`, \`1.0.1\`)
- Avoid relying only on \`latest\` in production

## How Docker networking fits architecture

By default, containers are isolated.  
They communicate through Docker networks.

Example:
- Spring Boot container name: \`app\`
- MySQL container name: \`db\`
- App URL: \`jdbc:mysql://db:3306/appdb\`

Architecture insight:
- Container-to-container traffic uses service names on the same network
- Browser-to-container traffic needs port mapping

Without this understanding, people often use wrong hostnames and get connection errors.

## How volumes fit architecture

Containers are ephemeral by design.  
If database data is inside container writable layer and container is removed, data is lost.

Volumes solve this:

\`\`\`bash
docker volume create mysql-data
\`\`\`

Then mount:

\`\`\`yaml
volumes:
  - mysql-data:/var/lib/mysql
\`\`\`

Architecture insight:
- container lifecycle and data lifecycle must be separated
- app containers can be recreated safely
- data remains persistent in volumes

## Security view of Docker architecture

In production, architecture is also about risk control.

Important practices:
- Use trusted base images
- Scan images for vulnerabilities
- Avoid running as root user inside containers
- Keep secrets out of image layers
- Use private registry for internal services

Real scenario:
- A team hardcodes DB password in Dockerfile
- Password becomes part of image history
- Anyone with image access can inspect it

Better approach:
- Use runtime env vars or secret manager

## Common architecture-related errors and root causes

### Error: Cannot connect to Docker daemon

Message:
\`Cannot connect to the Docker daemon\`

Cause:
- daemon not running

Fix:
- Start Docker Desktop or daemon service

### Error: Image not found

Message:
\`pull access denied\` or \`repository does not exist\`

Cause:
- wrong image name/tag
- missing registry login

Fix:
- verify image tag
- run \`docker login\`

### Error: Container starts then exits

Cause:
- main process finished
- wrong entrypoint/command

Fix:
- inspect logs
\`\`\`bash
docker logs <container-id>
\`\`\`

### Error: App cannot reach DB

Cause:
- wrong host (\`localhost\` vs service name)
- different network
- DB not ready

Fix:
- use service name (example: \`db\`)
- verify same network
- add healthcheck/retry strategy

## Docker architecture in microservices systems

In microservices, each service is packaged independently:

- auth-service image
- order-service image
- payment-service image
- notification-service image

Each container can be scaled or deployed separately.  
This is one of Docker's biggest architectural advantages.

When combined with orchestrators like Kubernetes, the same container principles continue at larger scale.

## Interview-ready explanation (short version)

If asked "Explain Docker architecture," answer like this:

Docker architecture is client-server based.  
Developer uses Docker CLI, which sends requests to Docker Daemon via API.  
Daemon builds images and runs containers.  
Images are pulled from or pushed to registries like Docker Hub.  
Containers run as isolated processes, while networks and volumes provide communication and persistence.

This answer is simple, correct, and practical.

## Practical checklist for real projects

Before saying Docker setup is production-ready, verify:

- image builds reproducibly
- correct tag pushed to registry
- container starts with expected command
- ports mapped correctly
- service-to-service DNS works
- volume persistence verified
- logs and restart policy configured

This checklist comes directly from architecture understanding, not command memorization.

## Final takeaway

Docker architecture is not just theory.  
It directly impacts:

- development speed
- deployment reliability
- debugging quality
- production stability

Once you understand how CLI, daemon, image, registry, container, network, and volume work together, Docker becomes predictable.  
That is the point where teams move from "trial and error Docker usage" to professional containerized delivery.
`
};

export default dockerArchitecture;
