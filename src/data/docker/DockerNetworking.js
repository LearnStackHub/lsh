const dockerNetworking = {
  id: 'docker-networking',
  title: 'Docker Networking',
  description:
    'Understand Docker networking deeply with bridge networks, service discovery, isolation patterns, and real-world troubleshooting scenarios.',
  content: `
# Docker Networking

Docker networking is one of the most important practical topics in containerized development.  
In most real projects, your app does not run alone. It communicates with databases, caches, queues, gateways, and other services.

If networking is not configured correctly, containers may start successfully but your application still fails at runtime.

This chapter explains Docker networking in a real-world, production-oriented way.

## Why Docker networking?

To allow containers to talk to each other safely and predictably.

That one line is true, but in real systems networking has three goals:

1. **Connectivity** - services can communicate
2. **Isolation** - unrelated services stay separated
3. **Control** - only required ports are exposed externally

If you understand these three goals, Docker networking becomes much easier to reason about.

## Default bridge network

Docker creates a default bridge network. Containers can communicate by IP, but custom networks are better.

## Why custom networks are preferred

Although the default bridge works, custom user-defined bridge networks give better behavior:

- automatic DNS-based name resolution
- cleaner service isolation
- easier maintenance in multi-container systems

In real projects, using container IP addresses manually is fragile because IPs can change when containers restart.

## Docker network drivers (foundation)

Docker supports multiple network drivers, but beginners should first master these:

### 1) bridge

- default for standalone containers
- good for local multi-container communication on same host

### 2) host

- container shares host network stack
- high performance, less isolation
- Linux-focused usage pattern

### 3) none

- no networking
- useful for strict isolation/testing cases

In advanced setups, teams also use overlay/macvlan, especially with orchestrators, but bridge is the core learning path.

## Create bridge network

\`\`\`bash
docker network create app-net
\`\`\`

You can inspect it:

\`\`\`bash
docker network inspect app-net
\`\`\`

## Run containers on same network

\`\`\`bash
docker run -d --name mysql --network app-net mysql
docker run -d --name app --network app-net springboot-app
\`\`\`

Now app container can use \`mysql\` as hostname.

## Why service name resolution works

In user-defined bridge networks, Docker provides internal DNS.  
That means containers can find each other by name without hardcoding IP addresses.

This is extremely useful in real projects where containers restart frequently.

## Spring Boot + MySQL connection idea

\`\`\`
spring.datasource.url=jdbc:mysql://mysql:3306/appdb
\`\`\`

Notice:
- host is \`mysql\` (container/service name)
- not \`localhost\` inside the containerized app context

## The localhost confusion (very common)

Real-time scenario:
- Developer runs Spring Boot container
- Uses \`localhost:3306\` for DB
- Connection fails

Why:
- inside app container, \`localhost\` points to app container itself, not DB container

Fix:
- use DB container/service name on same Docker network

## Exposing ports vs internal communication

Many beginners think every container port must be exposed with \`-p\`.  
That is not true.

- Internal service-to-service traffic inside same Docker network does not need host port mapping.
- Host/browser access needs port mapping.

Real example:
- app -> db communication: no host mapping required
- browser -> app access: host mapping required (for example, \`-p 8080:8080\`)

## Real-time scenario 1: App starts, DB connection fails

Symptoms:
- app logs show database connection timeout
- both containers appear running

Root causes can include:
- different networks
- wrong DB host name
- DB still initializing

Debug flow:

1. Check container status:
\`\`\`bash
docker ps
\`\`\`

2. Check networks attached:
\`\`\`bash
docker inspect <app-container>
docker inspect <db-container>
\`\`\`

3. Confirm both are on same network and app config host is correct

4. Check DB logs:
\`\`\`bash
docker logs <db-container>
\`\`\`

## Real-time scenario 2: Service accidentally exposed publicly

Problem:
- database mapped to host port 3306 in shared environment
- unexpected external access attempt detected

Fix pattern:
- avoid mapping DB port externally unless needed
- keep DB internal to Docker network when possible
- expose only application/API entry points

This is a security best practice.

## Real-time scenario 3: Microservice communication failure

In a multi-service setup:
- user-service calls order-service
- order-service hostname not resolved

Cause:
- services launched on separate networks
- typo in service name

Fix:
- attach both services to same network
- use exact service/container names
- verify with network inspect

## Docker Compose networking behavior

Compose automatically creates a project network.  
All services in same Compose file can communicate by service name.

Example:
- service name \`db\` can be used directly by \`app\`

This is why Compose is convenient for full-stack local environments.

Compose benefit:
- less manual network management
- predictable service discovery

## Network isolation patterns for real projects

A practical architecture pattern:

- \`frontend-net\` for frontend + gateway
- \`backend-net\` for API + DB + cache

Gateway can connect to both, DB only to backend network.

Benefit:
- reduced attack surface
- cleaner separation of responsibilities
- better security posture

## Useful Docker networking commands

\`\`\`bash
docker network ls
docker network inspect app-net
docker network connect app-net <container>
docker network disconnect app-net <container>
docker network rm app-net
\`\`\`

What they help with:
- list networks
- inspect network members and settings
- attach/detach containers dynamically
- cleanup unused networks

## Debugging checklist for networking issues

When containers cannot talk, follow this order:

1. Is target container running?
2. Are both containers on same network?
3. Is hostname/service name correct?
4. Is target service actually listening on expected port?
5. Is app config pointing to correct host and port?
6. Is issue startup-order/readiness related?

This checklist prevents random trial-and-error debugging.

## DNS and naming best practices

- Use clear container/service names (\`user-api\`, \`mysql-db\`, \`redis-cache\`)
- Avoid changing names frequently
- Keep names consistent across environments

Stable naming improves reliability and team readability.

## Performance considerations

For most applications, bridge networking is sufficient.  
If ultra-low latency networking is required, host networking may be considered, but with caution due to reduced isolation.

Real-world guidance:
- optimize architecture before forcing advanced network modes
- prioritize clarity and security for most enterprise apps

## Security best practices for Docker networking

- expose only required ports
- keep internal services private to internal networks
- separate workloads by network where needed
- avoid unnecessary \`--network host\` usage
- monitor traffic and logs for unusual patterns

Networking mistakes are common sources of accidental exposure.

## Interview-ready answer

If asked "How do Docker containers communicate?" you can answer:

Containers communicate through Docker networks.  
In user-defined bridge networks, Docker provides internal DNS so containers can reach each other by name.  
For external access, ports must be explicitly published using host-to-container mapping.

This is concise and technically strong.

## Key interview point

If two containers are in same user-defined bridge network, they can resolve each other by container name.

## Final takeaway

Docker networking is the invisible backbone of multi-container applications.  
When configured well, services communicate reliably and securely.  
When configured poorly, even correctly built containers fail at runtime.

Mastering networks, service names, and isolation patterns will make your Docker-based applications far more stable in development and production.
`
};

export default dockerNetworking;
