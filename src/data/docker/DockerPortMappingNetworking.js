const dockerPortMappingNetworking = {
  id: 'docker-port-mapping-networking',
  title: 'Port Mapping & Networking',
  description:
    'Master Docker port mapping and networking boundaries with real-world scenarios, troubleshooting workflows, and security-aware best practices.',
  content: `
# Port Mapping & Networking

Port mapping is one of the first Docker concepts beginners use, but many runtime issues still happen because the concept is only partially understood.

In real projects, your container may be running correctly, but API still appears "down" from browser or Postman.  
Most of the time, the root cause is incorrect port mapping or misunderstanding of network boundaries.

This lesson explains port mapping deeply using practical scenarios.

## Port Mapping Visual

\`\`\`diagram flow
{
  "steps": [
    { "icon": "🌍", "label": "Browser calls localhost:8080" },
    { "icon": "🖥️", "label": "Host receives request on 8080" },
    { "icon": "🔁", "label": "Docker forwards using -p mapping" },
    { "icon": "🧱", "label": "Container receives on internal port 80" },
    { "icon": "📨", "label": "Response returns to browser" }
  ]
}
\`\`\`

## What is port mapping?

Port mapping connects a host machine port to a container port.

\`\`\`bash
docker run -p 8080:80 nginx
\`\`\`

This means:
- Host port: 8080
- Container port: 80

So when you open \`http://localhost:8080\`, traffic is forwarded to container port 80.

## Why this mapping exists

Containers run in isolated network namespaces.  
Your laptop and the container do not automatically share the same network endpoints.

Port mapping acts as a controlled gateway:

- from host/network outside
- into container service port

Without this explicit mapping, the containerized service remains internal.

## Internal vs External ports

- **Internal**: port where app listens inside container
- **External**: port exposed on your laptop/server

Real example:
- Spring Boot runs at \`server.port=8080\` inside container
- You expose it with \`-p 9090:8080\`

Then:
- browser URL = \`http://localhost:9090\`
- app still listens on \`8080\` internally

## Port mapping syntax patterns

### Basic host-to-container mapping

\`\`\`bash
docker run -p 8080:80 nginx
\`\`\`

### Multiple mapped ports

\`\`\`bash
docker run -p 8080:8080 -p 9000:9000 myapp
\`\`\`

### Bind to specific host interface

\`\`\`bash
docker run -p 127.0.0.1:8080:80 nginx
\`\`\`

This restricts exposure to localhost only (safer in many dev setups).

## Why APIs are not accessible without mapping

Containers are isolated by default.
Without \`-p\`, your app may run inside container but is unreachable from browser.

## Real-time scenario 1: Container is running, API not reachable

Symptom:
- \`docker ps\` shows container running
- \`http://localhost:8080\` fails

Likely causes:
- no \`-p\` mapping provided
- wrong host port used in URL
- app listens on different internal port

Fix checklist:

1. Check running container ports
2. Verify app internal server port
3. Re-run with correct mapping

Example fix:
\`\`\`bash
docker run -d -p 8080:8080 my-spring-app
\`\`\`

## Real-time scenario 2: Port conflict during startup

Error:
\`Bind for 0.0.0.0:8080 failed: port is already allocated\`

Cause:
- another process/container already uses host port 8080

Fix options:
- stop conflicting process/container
- use alternate host port:
\`\`\`bash
docker run -d -p 8081:8080 my-spring-app
\`\`\`

## Real-time scenario 3: Works locally, fails on server

Situation:
- locally app reachable on mapped port
- on cloud VM, app unreachable

Possible causes:
- host firewall blocks port
- cloud security group does not allow ingress
- container bound only to localhost

Fix direction:
- verify host firewall rules
- verify cloud inbound rule
- verify binding config and mapped ports

This is common in first-time deployments.

## Port mapping vs container-to-container communication

Important rule:

- **Service-to-service inside same Docker network** -> usually no host port mapping needed
- **Browser/client outside Docker network** -> host mapping required

Example:
- app talks to db using internal hostname \`db:3306\` (no host mapping needed for this link)
- user browser accesses app via \`localhost:8080\` (host mapping needed)

Beginners often expose DB port unnecessarily when only internal communication is needed.

## Security best practice: expose only what is needed

Do not publish every container port.

Safer pattern:
- expose API gateway/backend endpoint
- keep DB/cache internal if external access is not needed

Real-time security scenario:
- MySQL published on \`0.0.0.0:3306\` on shared server
- unintended external scan finds open database port

Better approach:
- keep DB private in Docker network
- expose DB port only when explicitly required (and protected)

## Docker Compose and port mapping

Compose syntax:

\`\`\`yaml
services:
  app:
    ports:
      - "8080:8080"
\`\`\`

This has same meaning as \`docker run -p 8080:8080\`.

For DB service, decide intentionally:

- include \`"3306:3306"\` only if host access needed
- otherwise omit ports and keep DB internal

## Debugging mapped ports effectively

### Command 1: list container ports

\`\`\`bash
docker ps
\`\`\`

### Command 2: inspect detailed bindings

\`\`\`bash
docker inspect <container-id>
\`\`\`

Look for \`NetworkSettings.Ports\`.

### Command 3: check app logs

\`\`\`bash
docker logs <container-id>
\`\`\`

Sometimes mapping is correct, but app failed to start internally.

## Common mistakes and how to avoid them

### Mistake 1: assuming host and container ports must be same

Not required. You can map differently.

### Mistake 2: using wrong URL after custom mapping

If mapped \`8081:8080\`, URL must use \`8081\`, not \`8080\`.

### Mistake 3: exposing sensitive services unnecessarily

Avoid publishing DB, Redis, admin tools by default.

### Mistake 4: confusing localhost inside container vs host machine

Inside container, \`localhost\` points to that container itself.

### Mistake 5: forgetting environment differences

Laptop success does not guarantee server reachability due to firewalls/security groups.

## Real-time scenario 4: frontend cannot call backend

Setup:
- frontend on host browser
- backend in container mapped at \`8080\`

Issue:
- frontend configured to call wrong port

Fix:
- use exact mapped host port in frontend config
- ensure CORS is configured correctly if needed

Port mapping and CORS are separate concerns, but often appear together in troubleshooting.

## Real-time scenario 5: reverse proxy with multiple services

In production-like setups:
- Nginx container listens on 80/443
- routes traffic to internal services

Only proxy ports are exposed publicly.  
Backend service ports stay internal.

This pattern improves security and architecture clarity.

## Practical port strategy for teams

Adopt a predictable convention:

- 8080 for backend API
- 3000 for frontend dev server
- 5432/3306 internal DB access
- avoid random port choices across team

Document mappings in README so onboarding becomes faster.

## Interview-ready explanation

If asked "What is Docker port mapping?", answer:

Docker port mapping publishes a container port to a host port using \`-p host:container\`.  
It is required when external clients need access to services running inside isolated containers.

If asked "Why app is not reachable even when container is running?", mention:

- missing or wrong port mapping
- port conflicts
- app not listening on expected internal port
- firewall/network restrictions

This is a strong practical answer.

## Check mapped ports

\`\`\`bash
docker ps
\`\`\`

## Final takeaway

Port mapping is the bridge between container isolation and real client access.  
When you understand internal vs external ports, host binding, and exposure strategy, many Docker runtime issues become easy to diagnose.

Master this topic early, and your local development, team debugging, and production deployments become much smoother and safer.
`
};

export default dockerPortMappingNetworking;
