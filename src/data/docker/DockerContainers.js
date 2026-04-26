const dockerContainers = {
  id: 'docker-containers',
  title: 'Docker Containers',
  description:
    'Understand Docker containers deeply: lifecycle, runtime behavior, production usage, debugging workflow, and real-time scenarios.',
  content: `
# Docker Containers

A Docker container is the runtime unit of containerization.  
If Docker image is a blueprint, a container is the live running instance created from that blueprint.

Many learners understand Docker images but still get confused when debugging real container problems.  
This chapter focuses on what actually happens when containers run in development and production.

## What is a container in practical terms

A container is an isolated process that includes:

- your application runtime
- your app code/package
- app-level dependencies
- filesystem layer for runtime writes

Containers share the host OS kernel but run in isolated namespaces.  
That makes them lightweight compared to virtual machines.

Simple comparison:

- Virtual machine: full guest OS
- Container: isolated process with packaged runtime

## Why containers are important in real projects

In modern teams, containers solve practical problems:

- consistent app behavior across laptops
- predictable deployment artifacts
- faster CI/CD execution
- easier scaling of microservices

Real-time scenario:
- backend API works on developer machine
- same API fails in QA due to Java version mismatch
- containerized runtime removes this mismatch

This is why containers became core to DevOps workflows.

## Run a container (basic)

\`\`\`bash
docker run -d -p 8080:80 nginx
\`\`\`

What this command does:

- \`docker run\`: creates and starts a container
- \`-d\`: detached mode (run in background)
- \`-p 8080:80\`: host port 8080 -> container port 80
- \`nginx\`: image used to create container

## Container lifecycle (very important)

A container goes through lifecycle states:

\`\`\`
created -> running -> stopped -> removed
\`\`\`

Understanding these states helps in troubleshooting.

- **Created**: container metadata exists but process not fully running yet
- **Running**: main process is active
- **Stopped**: process exited or was stopped manually
- **Removed**: container metadata deleted

## Common lifecycle commands

\`\`\`bash
docker ps
docker ps -a
docker stop <container-id>
docker start <container-id>
docker restart <container-id>
docker rm <container-id>
\`\`\`

Use \`docker ps\` for running containers.  
Use \`docker ps -a\` to include stopped containers.

## Image vs Container (important interview question)

| Item | Image | Container |
|---|---|---|
| Nature | Blueprint/template | Running instance |
| Writable | No (read-only) | Yes (writable layer) |
| State | Static | Dynamic |
| Created by | \`docker build\` | \`docker run\` |

## What happens when container starts

When container starts:

1. Docker creates writable layer over image
2. Network interface is attached
3. Defined command (\`CMD\` or \`ENTRYPOINT\`) starts
4. Container remains alive only while main process runs

Critical point:
- If main process exits, container stops

This explains why some containers "start and immediately exit."

## Real-time scenario 1: Spring Boot container exits immediately

Symptom:
- Container appears in \`docker ps -a\` as \`Exited\`

Common causes:
- wrong jar path
- wrong entrypoint command
- missing environment variable

Fix workflow:

\`\`\`bash
docker logs <container-id>
\`\`\`

Then correct Dockerfile/run config and recreate container.

## Real-time scenario 2: API not reachable

Symptom:
- Container shows running
- Browser/Postman cannot access API

Likely causes:
- missing \`-p\` mapping
- wrong mapped host port
- app listening on different internal port

Fix checklist:
- check \`docker ps\` PORTS column
- verify app internal server port
- run again with correct mapping

Example:

\`\`\`bash
docker run -d -p 8080:8080 my-spring-app
\`\`\`

## Real-time scenario 3: Database data disappears

Symptom:
- MySQL container removed/recreated
- old data missing

Reason:
- container writable layer is ephemeral
- no persistent volume configured

Fix:
- use named volume for DB data:

\`\`\`bash
docker run -d --name mysql-db -v mysql-data:/var/lib/mysql mysql:8
\`\`\`

## Interactive debugging commands

For real incident debugging, these commands are essential:

\`\`\`bash
docker logs <container-id>
docker exec -it <container-id> bash
docker inspect <container-id>
docker stats
\`\`\`

### Why each command matters

- \`logs\`: startup/runtime error visibility
- \`exec\`: inspect files/env vars inside container
- \`inspect\`: full metadata (network, mounts, config)
- \`stats\`: CPU/memory usage monitoring

## Foreground vs detached container usage

### Foreground mode

\`\`\`bash
docker run --rm my-app
\`\`\`

Useful for:
- quick manual testing
- seeing logs directly in terminal

### Detached mode

\`\`\`bash
docker run -d --name my-app my-app:1.0.0
\`\`\`

Useful for:
- background services
- long-running APIs
- production-like behavior

## Restart behavior and resilience

In production-like setups, container restart policy is important:

\`\`\`bash
docker run -d --restart unless-stopped my-app
\`\`\`

Options:
- \`no\`
- \`on-failure\`
- \`always\`
- \`unless-stopped\`

This helps container recover from temporary crashes.

## Container naming and management discipline

Avoid random container IDs in team workflows.  
Use readable names:

\`\`\`bash
docker run -d --name user-service myapp
\`\`\`

Why:
- easier logs/debugging
- easier scripting
- clearer operations handoff

## Common mistakes beginners make

- Removing image while container still exists
- Forgetting \`-p\` (port mapping), then app is unreachable
- Running too many detached containers without cleanup
- Hardcoding environment settings in image
- Using \`latest\` everywhere without version tags
- Ignoring stopped containers until disk fills

## Container cleanup strategy

Use cleanup commands intentionally:

\`\`\`bash
docker stop <container-id>
docker rm <container-id>
docker container prune
\`\`\`

### When to use \`docker container prune\`

- local development cleanup
- after experiments

Do not run blindly on shared machines without checking impact.

## Containers in CI/CD pipelines

Containers are central to modern CI/CD:

1. Build container image in CI
2. Run tests inside container
3. Push image to registry
4. Deploy same image to staging/prod

Benefit:
- consistent executable artifact across all environments

## Containers in microservices architecture

In microservices, each service is containerized independently:

- auth-service container
- order-service container
- payment-service container

This allows:
- independent scaling
- separate deployment cycles
- better fault isolation

Container runtime behavior directly affects system reliability.

## Security considerations for containers

Containerization improves packaging, but security practices are still required:

- use trusted base images
- avoid running as root where possible
- keep secrets outside image layers
- scan images for vulnerabilities
- limit exposed ports

Real-time scenario:
- internal admin service exposed to public due to unnecessary port mapping

Fix:
- map only required ports
- keep internal-only services on private network

## Interview-ready explanation

If asked "What is a Docker container?", answer:

A Docker container is an isolated runtime instance of a Docker image.  
It includes the application and its dependencies, runs as a process on the host kernel, and can be created, started, stopped, and removed through Docker lifecycle commands.

If asked "Why container exits immediately?", answer:

Because container lifetime is tied to its main process.  
If the entry command exits, container stops.

These are strong practical interview answers.

## Final takeaway

Containers are not just "small VMs."  
They are controlled, isolated runtime units that power modern deployment workflows.

Once you understand lifecycle, logs, networking, and persistence behavior, you can:

- debug faster
- deploy safer
- collaborate better with DevOps teams
- run production-like environments on your local system

Mastering containers is the foundation for advanced Docker topics like Compose, orchestration, and scalable microservices delivery.

`
};

export default dockerContainers;
