const dockerWithDatabase = {
  id: 'docker-with-database',
  title: 'Docker with Database (Real Use Case)',
  description:
    'Connect Spring Boot and MySQL containers using production-aware networking, configuration, persistence, and troubleshooting patterns.',
  content: `
# Docker with Database (Real Use Case)

Running application code in Docker is easy.  
Running application + database reliably is where real engineering begins.

In real projects, most Docker-related runtime issues happen at the app-database integration layer:

- wrong hostname
- startup timing issues
- credential mismatch
- missing persistent data
- network isolation problems

This chapter focuses on practical, production-minded setup using Spring Boot + MySQL as the real use case.

## Runtime Interaction Diagram

\`\`\`diagram flow
{
  "steps": [
    { "icon": "👤", "label": "User sends API request" },
    { "icon": "🚀", "label": "Spring Boot container handles endpoint" },
    { "icon": "🌐", "label": "Service resolves DB host by name" },
    { "icon": "🗄️", "label": "MySQL container executes query" },
    { "icon": "📤", "label": "API returns response" }
  ]
}
\`\`\`

## Why this topic is critical

A backend app is only useful if database connectivity is stable.

You can have:
- valid Docker image
- healthy container
- correct API code

Yet still fail because DB integration is broken.

That is why "Docker with Database" is an interview favorite and a real-world must-know topic.

## Core architecture

Typical flow:

\`\`\`
Client -> Spring Boot Container -> MySQL Container
\`\`\`

Key rule:
- container-to-container communication should happen through Docker network and service/container name
- not through \`localhost\` inside app container

## Run MySQL container (basic)

\`\`\`bash
docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root mysql
\`\`\`

This works for simple testing, but production-like setup needs better controls.

## Better production-style command

\`\`\`bash
docker run -d --name mysql-db --network app-net \\
  -e MYSQL_ROOT_PASSWORD=root \\
  -e MYSQL_DATABASE=appdb \\
  -v mysql-data:/var/lib/mysql \\
  mysql
\`\`\`

Why this is better:
- named container for clear operations
- user-defined network for clean service discovery
- persistent volume for data durability
- explicit database initialization

## Connect Spring Boot -> MySQL container

### Use container name as host (important)

Use container name as host:

\`\`\`
spring.datasource.url=jdbc:mysql://mysql-db:3306/appdb
spring.datasource.username=root
spring.datasource.password=root
\`\`\`

If app is inside Docker network, hostname should be \`mysql-db\` (or service name in Compose), not \`localhost\`.

## Why localhost fails inside containers

Real-time scenario:
- app container tries \`jdbc:mysql://localhost:3306/appdb\`
- connection fails

Reason:
- inside app container, \`localhost\` points to app container itself
- MySQL runs in separate container

Fix:
- use DB container/service name on same network

## Real-time scenario 1: App starts before DB is ready

Symptoms:
- startup failure
- \`Communications link failure\`
- app exits/restarts

Cause:
- container start order != service readiness

Important:
- \`depends_on\` helps order in Compose but does not guarantee DB readiness

Fix strategies:
- add app retry logic
- add DB health check
- delay app startup until DB health is confirmed

## Real-time scenario 2: Access denied for user

Error:
\`Access denied for user 'root'\`

Common causes:
- password mismatch between app and DB env vars
- DB initialized with old credentials from existing volume

Fix:
- verify credentials in app config + container env
- if initialization mismatch exists, recreate DB volume carefully (only if data reset is acceptable)

## Real-time scenario 3: Unknown host mysql-db

Cause:
- app and DB containers not in same network
- or wrong hostname in datasource URL

Debug steps:

1. Check container status:
\`\`\`bash
docker ps
\`\`\`

2. Inspect network membership:
\`\`\`bash
docker inspect <app-container>
docker inspect mysql-db
\`\`\`

3. Ensure same network and correct host name

## Real-time scenario 4: Data lost after container recreation

Cause:
- MySQL data stored in ephemeral container layer
- no named volume

Fix:
- mount volume \`mysql-data:/var/lib/mysql\`
- back up critical data regularly

This is a common production outage pattern when persistence is ignored.

## Real-time scenario 5: App works locally, fails on server

Potential causes:
- firewall/security group blocks app port
- DB service exposed differently
- env file mismatch between local and server

Fix direction:
- validate deployment environment variables
- validate mapped ports
- validate network and service naming consistency

## Docker Compose model (recommended for full stack)

A better way to run app + DB together:

\`\`\`yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://db:3306/appdb
      SPRING_DATASOURCE_USERNAME: root
      SPRING_DATASOURCE_PASSWORD: root
    depends_on:
      - db

  db:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: appdb
    volumes:
      - mysql-data:/var/lib/mysql

volumes:
  mysql-data:
\`\`\`

Here app can use \`db\` as hostname because Compose creates internal DNS for service names.

## Configuration hygiene

In real production workflows:

- keep non-secret config in env or compose variables
- avoid hardcoding credentials in source files
- keep profile-specific configs separated

Good practice:
- local: safe defaults
- staging/prod: injected configuration

## Persistence and backup mindset

Volume gives persistence across container recreation, but it is not a full backup strategy.

Production-safe approach:
- use named volume for live data
- schedule database backups
- store backups outside container host
- test restore process

Real incident pattern:
- host fails
- volume inaccessible
- no off-host backup

Result: major data loss.

## Security considerations

Database containers need stricter controls:

- expose DB port only when necessary
- avoid public-wide port exposure in cloud
- rotate credentials
- use least-privilege DB users for app (not always root)
- secure backup storage

For learning, root user is common. For production, application-specific DB user is better.

## Observability and debugging workflow

When integration fails:

1. Check app logs
\`\`\`bash
docker logs <app-container>
\`\`\`

2. Check DB logs
\`\`\`bash
docker logs mysql-db
\`\`\`

3. Inspect configuration/env/network
\`\`\`bash
docker inspect <app-container>
\`\`\`

4. Validate DB readiness and credentials

This systematic flow saves time during incidents.

## Performance considerations

DB-in-container performance depends on:

- host disk throughput
- storage driver behavior
- DB configuration
- workload pattern

For heavy production workloads, teams often move from single-host container DB to managed database services or dedicated clustered setups.

Still, containerized DB is excellent for development, staging, learning, and many moderate workloads when configured correctly.

## Typical issues

- App uses \`localhost\` instead of container name
- MySQL not ready when app starts
- Missing network or wrong credentials

Additional high-frequency issues:
- data loss due to missing volume
- wrong environment profile in deployment
- DB initialization conflicts with existing volume data

## Production-ready checklist

Before saying your Docker DB integration is solid, verify:

- app and DB are on same network
- datasource host uses service/container name
- credentials are managed correctly
- DB persistence uses named volume
- backup and restore strategy exists
- health/readiness behavior is tested
- logs are monitored for startup failures

## Interview-ready explanation

If asked "How do you connect Spring Boot container to MySQL container?", answer:

Run both containers on the same Docker network and configure Spring datasource host as the MySQL container/service name, not localhost.  
Use environment variables for credentials and a named volume for MySQL persistence.  
Handle startup readiness to avoid initial connection failures.

This answer shows practical experience, not just syntax memory.

## Final takeaway

Docker + database integration is where container fundamentals become real engineering practice.

When you get networking, readiness, credentials, persistence, and troubleshooting right, your backend stack becomes stable and production-friendly.

Master this topic thoroughly, and you will handle both interview questions and real project incidents with confidence.
`
};

export default dockerWithDatabase;
