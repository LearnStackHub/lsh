const dockerVolumes = {
  id: 'docker-volumes',
  title: 'Docker Volumes (Data Persistence)',
  description:
    'Master Docker data persistence with volumes, bind mounts, backup strategies, and real-world incident scenarios.',
  content: `
# Docker Volumes (Data Persistence)

In Docker, application containers are disposable by design.  
That is a great property for deployments, but it creates a critical question:

Where should persistent data live?

This is where Docker volumes become essential.

If you are running databases, uploaded files, logs, or any stateful service, understanding volumes is mandatory for production-safe Docker usage.

## Problem

Container writable layer is temporary.  
When container is removed, data can be lost.

Real-time scenario:
- MySQL container runs for a week
- developer removes container and recreates it
- all data disappears because it lived only in container writable layer

This is one of the most common beginner mistakes.

## Why data is lost without persistence

Every container gets a writable layer above image layers.  
That writable layer is tied to container lifecycle, not application lifecycle.

So if container is deleted, that layer is deleted too.

Key principle:
- containers should be replaceable
- persistent data should live outside container writable layer

## What is a Docker volume?

A Docker volume is Docker-managed persistent storage that exists independently of container lifecycle.

Benefits:
- survives container removal/recreation
- easier data portability within Docker environment
- cleaner separation of runtime and state

## Create volume

\`\`\`bash
docker volume create mydata
\`\`\`

List volumes:

\`\`\`bash
docker volume ls
\`\`\`

Inspect volume:

\`\`\`bash
docker volume inspect mydata
\`\`\`

## Use volume

\`\`\`bash
docker run -d -v mydata:/var/lib/mysql mysql
\`\`\`

Now MySQL data is stored in \`mydata\`, not in ephemeral container layer.

## Real-time scenario 1: Database recovery after container recreation

Situation:
- DB container crashes
- operations team recreates container

If volume is configured:
- data remains intact
- service recovers quickly

If volume is not configured:
- data is lost
- incident escalates immediately

This is why persistent storage design is a first-class production concern.

## Types of container storage

### 1) Named volumes

Example:
\`\`\`bash
-v mydata:/var/lib/mysql
\`\`\`

Best for:
- databases
- production stateful services
- Docker-managed persistence

### 2) Anonymous volumes

Example:
\`\`\`bash
-v /var/lib/mysql
\`\`\`

Docker generates a random volume name.  
Useful sometimes, but harder to manage long-term.

### 3) Bind mounts

Example:
\`\`\`bash
-v /host/path:/container/path
\`\`\`

Best for:
- local development
- source-code live sync
- explicit host file control

## Volumes vs Bind Mounts

| Type | Managed by Docker | Host path explicit | Portable |
|---|---|---|---|
| Volume | Yes | No | Better |
| Bind mount | No | Yes | Host-dependent |

## Practical trade-off: volume vs bind mount

### Use volumes when:

- running stateful production workloads
- you need Docker-managed portability
- you want cleaner host independence

### Use bind mounts when:

- developing code locally
- you want instant source changes reflected in container
- you need direct host visibility/editing

Real-time scenario:
- development team uses bind mounts for hot-reload
- production team uses named volumes for database durability

This is a healthy split.

## Real-time scenario 2: Source code accidentally overwritten

With bind mounts, host files directly map into container.  
If container process writes unexpectedly, host files may be modified.

Fix:
- use bind mounts carefully in dev only
- avoid broad writable mounts in production
- use read-only mounts when applicable

## Real-time scenario 3: Permission denied on mounted directory

Common in Linux environments:
- container user ID differs from host file ownership
- mounted path exists but app cannot write

Fix approaches:
- align UID/GID strategy
- adjust host directory permissions
- use Docker-managed volumes where possible

## Volume lifecycle commands

Useful commands:

\`\`\`bash
docker volume ls
docker volume inspect mydata
docker volume rm mydata
docker volume prune
\`\`\`

Important:
- do not remove active production volumes blindly
- always verify dependencies before pruning

## Backup and restore strategy (critical production topic)

Persistence is incomplete without backup.

Best practice:
- schedule regular DB backups
- store backups outside Docker host
- test restore process periodically

Simple pattern:
- run backup container/job that reads from volume
- push backup archive to secure remote storage

Real-time scenario:
- host disk corruption happens
- volume exists but underlying disk damaged
- only off-host backup can recover business data

Volume is not backup.  
Volume gives persistence across container lifecycle, not disaster recovery by itself.

## Multi-container apps and volumes

In compose setups, volumes are usually declared at bottom:

\`\`\`yaml
volumes:
  mysql-data:
\`\`\`

Then mounted in service:

\`\`\`yaml
services:
  db:
    volumes:
      - mysql-data:/var/lib/mysql
\`\`\`

This creates clean, repeatable infrastructure-as-code storage setup.

## Performance considerations

Storage performance affects application behavior.

Consider:
- DB I/O patterns
- filesystem latency
- underlying host disk type (SSD vs HDD)

Real-time scenario:
- high write load on DB
- slow host storage causes API latency spikes

Fix direction:
- use faster storage
- tune DB config
- monitor disk throughput and queue metrics

## Security considerations for persistent storage

Production volume usage should follow security hygiene:

- avoid mounting sensitive host paths unnecessarily
- limit write access where possible
- protect backup artifacts
- enforce least-privilege runtime access
- never store secrets in world-readable mounted directories

Real-time incident:
- logs with sensitive tokens written to mounted public path

Prevention:
- sanitize logs
- secure mount path permissions
- centralize sensitive logs with access control

## Data migration and portability

Volumes can help in migrations:

- export data from old environment
- import into new environment
- reattach services with minimal change

But portability still depends on:
- storage driver compatibility
- application-level backup format
- host/platform constraints

Always validate migration process in staging first.

## Common mistakes with Docker persistence

1. Running DB without volume
2. Assuming volume = backup
3. Using bind mounts in production without controls
4. Deleting volumes during cleanup scripts accidentally
5. Ignoring permissions and ownership models

Avoiding these mistakes prevents many costly outages.

## Practical production checklist for volumes

Before production rollout, verify:

- persistent services use named volumes
- backup process exists and is tested
- restore drill completed at least once
- mount permissions are correct
- no unnecessary host path exposure
- monitoring exists for disk usage and I/O

## Interview-ready answer

If asked "Why are Docker volumes needed?", answer:

Docker volumes are needed because container writable layers are ephemeral.  
Volumes store state outside container lifecycle, so data persists across container recreation.  
They are especially important for databases and stateful services.

If asked "Volume vs bind mount?", answer:

Volumes are Docker-managed and better for production persistence.  
Bind mounts map explicit host paths and are commonly used for local development and code sync.

## When to use which

- Use **volumes** for databases and production-safe persistence
- Use **bind mounts** for local development and live code sync

## Final takeaway

Containers should be disposable. Data should not be.

Docker volumes give that separation.  
When combined with backup strategy, permission hygiene, and proper monitoring, they create a reliable foundation for stateful workloads in Docker environments.

Master this concept early, and your production Docker deployments become significantly safer.
`
};

export default dockerVolumes;
