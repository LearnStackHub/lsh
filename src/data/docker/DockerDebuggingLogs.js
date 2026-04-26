const dockerDebuggingLogs = {
  id: 'docker-debugging-logs',
  title: 'Debugging & Logs',
  description:
    'Learn a production-style Docker debugging workflow using logs, inspect, exec, metrics, and real-time incident scenarios.',
  content: `
# Debugging & Logs

Docker is powerful, but every real project eventually hits runtime issues:

- container starts and stops immediately
- API runs but returns 500
- database connection fails
- memory spikes and random restarts

The difference between beginners and professionals is not avoiding issues, but debugging them quickly and systematically.

This lesson gives you a practical Docker troubleshooting playbook with real-time scenarios and command-based diagnosis.

## Why Docker debugging needs a system

When production is unstable, random guessing wastes time.  
A proper workflow helps you identify root cause in minutes:

1. confirm container state
2. inspect logs
3. validate config and environment
4. verify network/dependencies
5. apply fix and re-test

This step-by-step approach is used in real DevOps and SRE workflows.

## Basic debug commands (must know)

\`\`\`bash
docker logs <container>
docker exec -it <container> bash
\`\`\`

These two commands alone solve many incidents:

- \`docker logs\`: what went wrong
- \`docker exec\`: verify inside runtime container

## Extended command toolkit

For complete debugging, use:

\`\`\`bash
docker ps -a
docker inspect <container>
docker stats
docker top <container>
docker events
\`\`\`

### What each command helps with

- \`ps -a\`: running/stopped status and exit codes
- \`inspect\`: config, mounts, networks, env vars
- \`stats\`: CPU/memory usage in real time
- \`top\`: processes inside container
- \`events\`: container lifecycle activity timeline

## Real-world troubleshooting flow

1. Check container status: \`docker ps -a\`
2. Read logs for startup errors
3. Enter container using \`docker exec\`
4. Validate env vars, files, and app command
5. Restart after fix

This order works because it narrows the problem from "container failed" to specific root cause.

## Real-time scenario 1: Container exits immediately

### Symptom

- Container appears in \`Exited\` state seconds after startup

### First checks

\`\`\`bash
docker ps -a
docker logs <container>
\`\`\`

### Typical root causes

- wrong entrypoint/CMD
- missing app artifact
- runtime exception on startup
- invalid profile/config

### Practical fix

- correct Dockerfile command
- verify copied files:
\`\`\`bash
docker exec -it <container> ls /app
\`\`\`
- restart container and re-check logs

## Real-time scenario 2: API is running but unreachable

### Symptom

- Container is running
- Browser/Postman cannot access API

### Likely causes

- port mapping missing
- wrong host port
- app listening on different internal port

### Debug steps

\`\`\`bash
docker ps
docker inspect <container>
\`\`\`

Check \`Ports\` and app server configuration.

## Real-time scenario 3: Spring Boot cannot connect to MySQL

### Symptom

- startup log shows DB connection failure
- errors like \`Communications link failure\` or \`Unknown host db\`

### Diagnosis

- verify DB container is running
- verify app and DB are on same Docker network
- verify DB host uses service/container name in Docker context

Useful checks:

\`\`\`bash
docker ps
docker inspect <app-container>
docker logs <db-container>
\`\`\`

### Fix patterns

- if app in Docker network, use \`db\` (service name), not \`localhost\`
- ensure credentials match between app env and DB env
- add retry/health check if DB readiness is delayed

## Real-time scenario 4: App keeps restarting

### Symptom

- Container restarts repeatedly

### Common causes

- health check failing
- app crashing after boot
- low memory causing OOM kill

### Debug steps

\`\`\`bash
docker logs <container>
docker inspect <container>
docker stats
\`\`\`

Look for:
- OutOfMemory messages
- repeated crash stack traces
- health status transitions

### Fix patterns

- increase memory limit if too low
- optimize JVM memory flags
- fix startup dependency ordering

## Interpreting logs correctly

Many developers read logs but miss signal quality.

Good log reading approach:

1. start from first error, not last line
2. identify root exception class
3. map error to config/runtime context
4. confirm fix with fresh container run

Avoid this mistake:
- patching symptom without fixing root cause

## Using docker exec for inside-container validation

\`docker exec -it <container> bash\` lets you verify actual runtime conditions:

- environment variables
- file paths
- permissions
- running process

Inside container checks:

\`\`\`bash
env
ls -la /app
cat /app/application.properties
ps -ef
\`\`\`

This is very useful when "everything looks correct in source code" but runtime behavior differs.

## Debugging environment variable issues

Real incident:
- app fails because required env var is empty

Check:

\`\`\`bash
docker inspect <container>
\`\`\`

Look under \`Config.Env\`.

Then verify in shell:

\`\`\`bash
docker exec -it <container> env
\`\`\`

If variable missing, update run/compose file and recreate container.

## Debugging volume and file problems

Common issue:
- config file expected at runtime not found

Checks:

- verify volume mount path in \`docker inspect\`
- verify file exists inside container using \`exec\`
- check file permissions

Example symptom:
- app fails to load \`application-prod.yml\`

Fix:
- mount correct host directory
- verify correct working directory in Dockerfile

## Debugging network problems

Network errors are common in multi-container projects.

Checklist:

1. Are both containers running?
2. Are both containers in same network?
3. Is service hostname correct?
4. Is target port open?

Use:

\`\`\`bash
docker inspect <container>
\`\`\`

Then inspect network section and container aliases.

## Monitoring resource usage

When APIs slow down or restart randomly, check runtime metrics:

\`\`\`bash
docker stats
\`\`\`

Watch for:
- high CPU saturation
- memory near limit
- abnormal spikes

Real-time scenario:
- traffic increases during peak hour
- container memory spikes
- JVM gets killed

Fix options:
- tune app memory
- increase resource limits
- scale horizontally

## Logging best practices for production

To make future debugging easier:

- keep logs structured and readable
- include request IDs/correlation IDs
- avoid suppressing stack traces
- separate application logs from access logs
- centralize logs (ELK, Loki, CloudWatch, etc.)

Without proper logs, incidents take much longer to resolve.

## Incident response mini playbook

When production issue appears:

1. Confirm impact and affected service
2. Check container state (\`ps -a\`)
3. Capture logs immediately
4. Compare with last working deployment
5. Roll back if needed
6. Apply fix and monitor
7. Document root cause and prevention

This process is used in mature teams to reduce mean time to recovery (MTTR).

## Common reasons app is not starting

- Wrong entrypoint/CMD
- Missing config or env variable
- Port already in use
- DB dependency unavailable

## Extra useful commands

\`\`\`bash
docker inspect <container>
docker stats
\`\`\`

## Interview-ready response

If asked "How do you debug a failed Docker container?", answer:

First I check container status with \`docker ps -a\`, then inspect logs using \`docker logs\`.  
If needed, I enter the container with \`docker exec\` to verify environment variables, files, and process behavior.  
For deeper analysis I use \`docker inspect\` for runtime config and \`docker stats\` for resource pressure.

This answer demonstrates practical, production-oriented thinking.

## Final takeaway

Docker debugging is not about memorizing random commands.  
It is about following a reliable sequence:

- state -> logs -> runtime config -> dependency check -> resource check -> fix validation

When you adopt this method, you can handle most real Docker incidents confidently, whether in local development, QA, or production support.
`
};

export default dockerDebuggingLogs;
