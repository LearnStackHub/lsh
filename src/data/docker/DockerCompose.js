const dockerCompose = {
  id: 'docker-compose',
  title: 'Docker Compose (Multi-Container)',
  description:
    'Master Docker Compose for real projects: run multi-container apps, manage environments, and troubleshoot production-like issues.',
  content: `
# Docker Compose (MULTI-CONTAINER)

In real projects, one container is rarely enough.  
Your application usually needs multiple services working together, for example:

- backend API
- database
- cache
- message broker
- worker service

Managing all these with long \`docker run\` commands becomes difficult very quickly.  
That is why Docker Compose is one of the most practical tools in day-to-day development and DevOps workflows.

## Compose Service Topology

\`\`\`diagram tree
{
  "label": "docker-compose.yml",
  "icon": "🗂️",
  "children": [
    {
      "label": "app service",
      "icon": "🚀",
      "description": "Builds and runs backend API",
      "children": [
        { "label": "ports", "icon": "🔌" },
        { "label": "environment", "icon": "⚙️" }
      ]
    },
    {
      "label": "db service",
      "icon": "🗄️",
      "description": "Runs MySQL/Postgres",
      "children": [
        { "label": "volume", "icon": "💾" },
        { "label": "healthcheck", "icon": "❤️" }
      ]
    },
    {
      "label": "network",
      "icon": "🌐",
      "description": "Internal service communication"
    }
  ]
}
\`\`\`

## Why Docker Compose is needed

Without Compose, you might run commands like:

\`\`\`bash
docker run -d --name db -e MYSQL_ROOT_PASSWORD=root mysql:8
docker run -d --name app -p 8080:8080 --link db myapp
\`\`\`

This approach has problems:

- hard to remember command combinations
- difficult for teammates to reproduce
- easy to miss env vars/volumes/networks
- painful to maintain across environments

Compose solves this by defining everything in one declarative file.

## Core idea

With Compose, you write infrastructure setup in \`docker-compose.yml\`:

- services
- ports
- volumes
- networks
- environment variables

Then run everything with one command:

\`\`\`bash
docker compose up
\`\`\`

This makes your setup repeatable, shareable, and version-controlled.

## Basic example

\`\`\`yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "8080:8080"
    depends_on:
      - db
  db:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: appdb
\`\`\`

This file tells Docker:

- build app service from current folder
- run MySQL database container
- expose app on port 8080
- start database before app

## Real-time scenario 1: Spring Boot + MySQL local development

A backend developer wants the entire stack with one command.

Compose flow:

1. Clone project
2. Run \`docker compose up --build\`
3. API and DB start together
4. Team member can test APIs immediately

This is much faster than manually installing MySQL and adjusting local configs.

## Full practical Compose file (backend + DB)

\`\`\`yaml
version: '3.8'

services:
  app:
    build: .
    container_name: springboot-app
    ports:
      - "8080:8080"
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://db:3306/appdb
      SPRING_DATASOURCE_USERNAME: root
      SPRING_DATASOURCE_PASSWORD: root
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: mysql:8
    container_name: mysql-db
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: appdb
    ports:
      - "3306:3306"
    volumes:
      - mysql-data:/var/lib/mysql
    restart: unless-stopped

volumes:
  mysql-data:
\`\`\`

## Important Compose concepts

### 1) Services

Each service is one container definition.  
Example: \`app\`, \`db\`, \`redis\`.

### 2) depends_on

Controls start order, not application readiness.  
Database may start first but still not be ready to accept connections.

### 3) Volumes

Used for persistence (especially databases).  
Without volume, data may be lost when container is recreated.

### 4) Networks

Compose creates a default network automatically.  
Services can communicate using service names:

- \`db\` for MySQL
- \`redis\` for cache

### 5) Environment variables

Can be set directly in file or loaded from \`.env\`.  
This keeps configuration flexible per environment.

## Most used commands

Common commands:

\`\`\`bash
docker compose up
docker compose up -d
docker compose up --build
docker compose ps
docker compose logs -f
docker compose restart
docker compose down
\`\`\`

### Command behavior quick notes

- \`up\`: create and start services
- \`up --build\`: rebuild image before starting
- \`ps\`: list service containers and status
- \`logs -f\`: stream logs (very useful in debugging)
- \`down\`: stop and remove containers/networks

## Real-time scenario 2: Feature branch testing

A developer creates a new feature branch and wants isolated testing.

With Compose:
- Pull branch
- Run \`docker compose up --build\`
- Validate full stack quickly
- Tear down using \`docker compose down\`

This is clean and reproducible.  
No need to leave orphaned local setups.

## Real-time scenario 3: QA environment parity

QA often says:
"Works in dev but not in QA."

Compose helps by making service setup consistent:

- same images
- same env contracts
- same port mapping
- same network model

This greatly reduces environment mismatch issues.

## Common errors and practical fixes

### Error 1: App cannot connect to DB at startup

Symptom:
- \`Communications link failure\`

Reason:
- DB container started, but MySQL not ready yet

Fix:
- add retry logic in app
- or use healthcheck + wait strategy

### Error 2: Access denied for MySQL user

Reason:
- credentials mismatch between app config and db service env vars

Fix:
- verify username/password in both places
- recreate stack after env changes:
\`\`\`bash
docker compose down
docker compose up --build
\`\`\`

### Error 3: Unknown host 'db'

Reason:
- app running outside Compose but using \`db\` hostname

Fix:
- inside Compose: use \`db\`
- outside Docker: use \`localhost\`

### Error 4: Port already allocated

Symptom:
- \`Bind for 0.0.0.0:8080 failed\`

Fix:
- stop conflicting process/container
- or remap host port:
\`\`\`yaml
ports:
  - "8081:8080"
\`\`\`

### Error 5: Data lost after restart

Reason:
- no persistent volume configured

Fix:
- add named volume for DB data path

## Health checks (strongly recommended)

Compose can include health checks for better reliability:

\`\`\`yaml
db:
  image: mysql:8
  healthcheck:
    test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
    interval: 10s
    timeout: 5s
    retries: 5
\`\`\`

Why this matters:
- improves service readiness visibility
- helps automation decide when a service is actually usable

## Environment management with .env

Instead of hardcoding values, keep environment-specific config in \`.env\`:

\`\`\`
MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=appdb
APP_PORT=8080
\`\`\`

Then reference in Compose:

\`\`\`yaml
environment:
  MYSQL_ROOT_PASSWORD: \${MYSQL_ROOT_PASSWORD}
ports:
  - "\${APP_PORT}:8080"
\`\`\`

Benefits:
- cleaner compose file
- easier environment switches
- safer config handling

## Multi-environment strategy

You can maintain:

- \`docker-compose.yml\` (base)
- \`docker-compose.dev.yml\`
- \`docker-compose.prod.yml\`

Example usage:

\`\`\`bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
\`\`\`

This is common in professional teams.

## Compose in CI/CD

Compose is useful not only for local development but also in pipelines.

Example CI use case:

1. Start dependent services (DB, cache) with Compose
2. Run integration tests
3. Tear down stack after tests

This gives realistic integration validation before deployment.

## Best practices for production-quality Compose usage

- Add persistent volume for DB
- Use health checks for critical services
- Keep secrets out of source-controlled files
- Use pinned image versions (avoid floating \`latest\` in production)
- Keep container names clear and meaningful
- Use restart policies thoughtfully
- Monitor logs regularly

## Interview-ready explanation

If asked "Why Docker Compose?" you can answer:

Docker Compose is used to define and run multi-container applications from a single YAML file.  
It improves reproducibility by version-controlling service configuration such as ports, env vars, networks, and volumes.  
With one command, teams can start, stop, and debug complete application stacks.

This answer shows practical understanding, not just syntax knowledge.

## Final takeaway

Docker Compose is one of the most valuable productivity tools in backend development.  
It turns complex multi-service setup into a predictable and shareable workflow.

If you master Compose well, you can:

- onboard faster in new projects
- debug environment issues quickly
- maintain cleaner dev/test setups
- simulate production-like behavior locally

For modern Spring Boot and microservice workflows, Compose is not optional knowledge.  
It is a core skill that directly improves delivery speed and reliability.
`
};

export default dockerCompose;
