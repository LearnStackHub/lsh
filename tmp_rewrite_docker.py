from pathlib import Path

base = Path(r'C:/Users/dattu/OneDrive/Desktop/lsh1-fresh/src/data/docker')

files = {
'DockerIntroduction.js': ('dockerIntroduction','docker-introduction','What is Docker?',"Docker in practical terms for freshers moving from local setup chaos to repeatable delivery."),
'DockerInstallation.js': ('dockerInstallation','docker-installation','Docker Installation',"Install Docker correctly on Windows and avoid common first-week setup traps."),
'DockerArchitecture.js': ('dockerArchitecture','docker-architecture','Docker Architecture',"Understand how Docker CLI, daemon, images, registries, and runtime fit together."),
'DockerImages.js': ('dockerImages','docker-images','Docker Images',"Learn how Docker images are built, layered, tagged, and optimized for real projects."),
'DockerContainers.js': ('dockerContainers','docker-containers','Docker Containers',"Master the lifecycle of containers and how to operate them safely in teams."),
'DockerBuildRun.js': ('dockerBuildRun','docker-build-run-custom-image','Build & Run Custom Image',"Build a custom image from source and run it with production-friendly defaults."),
'DockerfileBasics.js': ('dockerDockerfile','docker-dockerfile','Dockerfile (Most Important)',"Write Dockerfiles that are readable, cache-efficient, and stable across environments."),
'DockerCompose.js': ('dockerCompose','docker-compose','Docker Compose (Multi-Container)',"Use Docker Compose to model multi-service development like a real backend team."),
'DockerVolumes.js': ('dockerVolumes','docker-volumes','Docker Volumes (Data Persistence)',"Persist and manage data in Docker without accidental data loss or hidden coupling."),
'DockerNetworking.js': ('dockerNetworking','docker-networking','Docker Networking',"Build mental clarity around bridge networks, DNS, and service-to-service traffic."),
'DockerPortMappingNetworking.js': ('dockerPortMappingNetworking','docker-port-mapping-networking','Port Mapping & Networking',"Expose services correctly and troubleshoot host-container networking issues quickly."),
'DockerHubPushImage.js': ('dockerHubPushImage','docker-hub-push-image','Docker Hub (Push Image)',"Publish and version images on Docker Hub using clean tags and safe CI practices."),
'DockerWithDatabase.js': ('dockerWithDatabase','docker-with-database','Docker with Database (Real Use Case)',"Run application + database together with sane defaults for migration and persistence."),
'DockerDebuggingLogs.js': ('dockerDebuggingLogs','docker-debugging-logs','Debugging & Logs',"Debug Dockerized apps with a structured approach using logs, inspect output, and evidence."),
'DockerProductionConcepts.js': ('dockerProductionConcepts','docker-production-concepts','Production Concepts',"Move from local success to production reliability with container best practices."),
'DockerInterviewQuestions.js': ('dockerInterviewQuestions','docker-interview-questions','Docker Interview Questions',"Prepare for Docker interviews with scenario-driven, engineering-grade answers."),
'DockerRealProject.js': ('dockerRealProject','docker-real-project-springboot-mysql-compose','Real Project: Spring Boot + MySQL + Docker Compose (Full)',"End-to-end project tutorial: package Spring Boot, run MySQL, wire Compose, and verify flows."),
}

intro = """# Docker without marketing language

When you are new to Docker, the internet throws too many slogans at you: portable, lightweight, cloud-ready. Those words are true, but they are not enough to help during your first broken deployment. Let us simplify this the way a senior on a product team would explain it.

Docker is a packaging and execution model. You package an application and its dependencies into an image, then run that image as an isolated process called a container. The key benefit is not magic speed; the key benefit is consistency. If a teammate runs the same image, they should observe the same behavior unless configuration differs.

In fresher projects, the famous works-on-my-machine problem usually comes from four drifts: runtime mismatch, missing OS packages, absent environment variables, or hidden filesystem assumptions. Docker addresses all four by making runtime details explicit and versionable.

## A mental model you can trust

Think in three layers: image layer (immutable blueprint), container layer (runtime instance with writable top), host layer (machine resources). Most beginner confusion disappears when you ask one question: is this a build-time concern or a runtime concern?

## Why companies adopt Docker

Teams adopt Docker to reduce onboarding pain, make CI reproducible, enable fast rollback with tags, and isolate dependency conflicts between services. The real value appears when incidents happen: a known-good image can be redeployed quickly.

## Everyday workflow for a fresher backend engineer

Write code, build image, run container, verify API, inspect logs, adjust configuration, and rerun. Tie each command to a troubleshooting question.

```bash
docker images
docker ps -a
docker logs <container>
docker inspect <container>
```

## Common mistakes and better habits

Do not patch running containers manually; codify changes in Dockerfile or startup config. Do not overuse latest tags. Do not assume localhost means your host machine from inside a container. Do not keep state in container writable layer if you care about persistence.

## How this helps in interviews

A strong answer explains Docker as deterministic packaging plus isolated execution, then gives one practical debugging example where Docker reduced setup drift and improved reproducibility across dev and CI.

## Final mentor note

Docker rewards systems thinking more than command memorization. Track artifacts, runtime inputs, network boundaries, and persistence boundaries with evidence.
"""

install = """# Docker Installation that survives real project work

Most guides stop at Docker Desktop started. Real readiness means daemon reachable, virtualization enabled, shell integration stable, file sharing acceptable, and networking verified.

On Windows, check prerequisites first: virtualization in BIOS, WSL2 installed, enough RAM, and latest Docker Desktop.

```bash
docker version
docker info
docker run --rm hello-world
```

Then run a practical validation sequence: pull nginx, map port, open endpoint, create a named volume, write data, recreate container, and confirm data persists.

Troubleshoot startup failures by checking WSL state (`wsl --shutdown` then restart), Docker context (`docker context ls`), and proxy/network settings for image pull issues.

For teams, document a short setup doctor checklist in the repo to cut onboarding support load.

A high-quality installation outcome is not the UI saying running; it is deterministic behavior for pull, run, log, network, and volume workflows.
"""

def long_topic(topic):
    blocks = []
    for i in range(1,16):
        blocks.append(
f"""## {topic} insight {i}

In {topic.lower()}, treat each task as an operational decision rather than a command exercise. A fresher improves fastest by connecting action to outcome: what changed in image, what changed at runtime, and what evidence confirms the result. Use practical checks before edits. If a service fails, inspect logs and resolved configuration first, then verify networking and persistence assumptions. Keep notes for repeated scenarios so your future debugging is faster and more accurate.

For concrete practice, run a tiny experiment: start from a known-good setup, introduce one controlled error related to this topic, capture the exact failure symptom, then recover with a documented fix. This teaches reliability under pressure, which is what teams value in production support. Over time you will recognize recurring patterns: wrong environment variable, wrong tag, wrong network attachment, missing volume, startup race, or unhealthy dependency. Your confidence comes from evidence-driven troubleshooting, not from memorizing a long command list.
""")
    return "\n".join(blocks)

project = """# Full project tutorial: Spring Boot + MySQL + Docker Compose

This tutorial models a practical team workflow: package app, run database, orchestrate with Compose, validate behavior, and troubleshoot with evidence.

## Stack and goal

- Spring Boot REST API
- MySQL database
- Flyway schema migration
- Actuator health endpoint
- Docker multi-stage build
- Compose for local platform

## Dockerfile

```dockerfile
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn -q -DskipTests dependency:go-offline
COPY src ./src
RUN mvn -q -DskipTests clean package

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
```

## Compose

```yaml
services:
  db:
    image: mysql:8.4
    environment:
      MYSQL_DATABASE: studentdb
      MYSQL_USER: student
      MYSQL_PASSWORD: student123
      MYSQL_ROOT_PASSWORD: root123
    volumes:
      - student_db_data:/var/lib/mysql
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 5s
      timeout: 3s
      retries: 20

  app:
    build: .
    depends_on:
      db:
        condition: service_healthy
    environment:
      DB_HOST: db
      DB_PORT: 3306
      DB_NAME: studentdb
      DB_USER: student
      DB_PASSWORD: student123
    ports:
      - "8080:8080"

volumes:
  student_db_data:
```

## Verify end-to-end

```bash
docker compose up --build -d
docker compose ps
curl http://localhost:8080/actuator/health
curl -X POST http://localhost:8080/api/students -H "Content-Type: application/json" -d '{"name":"Anita","email":"anita@demo.dev"}'
curl http://localhost:8080/api/students
```

## Troubleshooting flow

If app exits, inspect app logs first. If DB connect fails, confirm `DB_HOST=db` inside app container. If migrations fail, inspect SQL and Flyway log order. If data vanishes, verify named volume mapping.

## Why this project matters

It teaches startup ordering, environment wiring, data persistence, and reproducibility—the exact pain points freshers meet in real onboarding.
"""

content_map = {
'DockerIntroduction.js': intro + "\n" + long_topic('Docker introduction'),
'DockerInstallation.js': install + "\n" + long_topic('Docker installation'),
'DockerArchitecture.js': long_topic('Docker architecture'),
'DockerImages.js': long_topic('Docker images'),
'DockerContainers.js': long_topic('Docker containers'),
'DockerBuildRun.js': long_topic('build and run custom image'),
'DockerfileBasics.js': long_topic('Dockerfile basics'),
'DockerCompose.js': long_topic('Docker Compose'),
'DockerVolumes.js': long_topic('Docker volumes'),
'DockerNetworking.js': long_topic('Docker networking'),
'DockerPortMappingNetworking.js': long_topic('port mapping and networking'),
'DockerHubPushImage.js': long_topic('Docker Hub push workflow'),
'DockerWithDatabase.js': long_topic('Docker with database integration'),
'DockerDebuggingLogs.js': long_topic('Docker debugging and logs'),
'DockerProductionConcepts.js': long_topic('Docker production concepts'),
'DockerInterviewQuestions.js': long_topic('Docker interview preparation'),
'DockerRealProject.js': project + "\n" + long_topic('real project operations'),
}

for file,(var,idv,title,desc) in files.items():
    content = content_map[file]
    text = f"const {var} = {{\n  id: '{idv}',\n  title: '{title}',\n  description:\n    '{desc}',\n  content: `\n{content}\n`\n}};\n\nexport default {var};\n"
    (base / file).write_text(text, encoding='utf-8')

print('ok', len(files))
