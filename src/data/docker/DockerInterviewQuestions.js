const dockerInterviewQuestions = {
  id: 'docker-interview-questions',
  title: 'Docker Interview Questions',
  description:
    'Top 30 Docker interview questions with practical answers and real-time scenarios for fresher and experienced interviews.',
  content: `
# Docker Interview Questions (Top 30 with Real-time Scenarios)

This section gives top Docker interview questions with practical answers.  
Each answer includes a real-time scenario so you can explain concepts like an engineer, not like memorized notes.

## 1) What is Docker, and why is it used?
**Answer:** Docker is a containerization platform that packages code, runtime, and dependencies into portable containers.  
**Real-time scenario:** A Java API works in dev but fails in QA due to JDK mismatch. Docker image standardizes runtime.

## 2) What problem does Docker solve most directly?
**Answer:** It solves environment inconsistency ("works on my machine" problem).  
**Real-time scenario:** Team uses different OS versions; same Docker image ensures same behavior.

## 3) What is the difference between Docker Image and Container?
**Answer:** Image is a read-only template; container is a running instance with writable layer.  
**Real-time scenario:** One image powers multiple app containers during load testing.

## 4) What is Docker Engine?
**Answer:** Docker Engine includes daemon, REST API, and CLI for container lifecycle operations.  
**Real-time scenario:** CI pipeline uses Docker Engine to build and run test containers.

## 5) Docker CLI vs Docker Daemon?
**Answer:** CLI sends commands; daemon executes them (build, run, network, volume).  
**Real-time scenario:** Developer runs \`docker run\`; daemon actually starts container.

## 6) What is Docker Registry?
**Answer:** A registry stores Docker images for pull/push operations.  
**Real-time scenario:** Staging server pulls image from registry built by CI.

## 7) What is Docker Hub?
**Answer:** Docker Hub is a hosted image registry with public/private repos.  
**Real-time scenario:** Team publishes versioned app images for QA and production.

## 8) CMD vs ENTRYPOINT?
**Answer:** ENTRYPOINT defines executable; CMD provides defaults/arguments.  
**Real-time scenario:** Spring Boot container always runs Java (ENTRYPOINT) with profile passed via CMD.

## 9) EXPOSE vs -p?
**Answer:** EXPOSE is metadata; \`-p\` actually publishes container port to host.  
**Real-time scenario:** App has EXPOSE 8080 but remains unreachable without \`-p 8080:8080\`.

## 10) Why is container not accessible from browser?
**Answer:** Usually missing/wrong port mapping or wrong host port URL.  
**Real-time scenario:** App mapped on 8081, but tester checks 8080.

## 11) What is Docker Compose?
**Answer:** A tool to define and run multi-container apps using YAML config.  
**Real-time scenario:** App + DB + Redis start together with one command.

## 12) What is depends_on in Docker Compose?
**Answer:** Controls startup order, not service readiness.  
**Real-time scenario:** App starts after DB container, but DB still initializing; retry logic required.

## 13) What are Docker volumes?
**Answer:** Docker-managed persistent storage independent of container lifecycle.  
**Real-time scenario:** DB data survives container recreation.

## 14) Volume vs Bind Mount?
**Answer:** Volume is Docker-managed and portable; bind mount maps host path directly.  
**Real-time scenario:** Bind mount for local code sync; volume for production DB data.

## 15) What is a Docker network?
**Answer:** Networking layer for container communication and isolation.  
**Real-time scenario:** App resolves DB by service name within same network.

## 16) Why localhost fails for DB inside app container?
**Answer:** localhost inside container points to itself, not another container.  
**Real-time scenario:** \`jdbc:mysql://localhost\` fails, \`jdbc:mysql://db\` works in Compose.

## 17) Default bridge vs user-defined bridge network?
**Answer:** User-defined bridge supports better DNS/service discovery and isolation.  
**Real-time scenario:** Microservices communicate reliably by service names in custom network.

## 18) Why Docker is popular in microservices?
**Answer:** Service isolation, independent deployment, easy scaling, CI/CD-friendly artifacts.  
**Real-time scenario:** Payment service scales separately during peak traffic.

## 19) What is image layering and cache?
**Answer:** Dockerfile instructions create layers; unchanged layers are cached to speed builds.  
**Real-time scenario:** Dependency layers reused, reducing CI build time.

## 20) Why smaller images are preferred?
**Answer:** Faster pulls, smaller attack surface, reduced storage and deploy time.  
**Real-time scenario:** Optimized image reduces release rollout time across nodes.

## 21) What is multi-stage build?
**Answer:** Build artifact in one stage, copy only runtime output into final slim image.  
**Real-time scenario:** Maven tools stay out of final image, reducing size.

## 22) What is .dockerignore and why important?
**Answer:** Excludes unnecessary files from build context.  
**Real-time scenario:** Ignoring \`.git\` and node_modules speeds up Docker build.

## 23) Why avoid latest tag in production?
**Answer:** latest is mutable and bad for rollback traceability.  
**Real-time scenario:** Buggy latest deployed; no clear previous stable artifact.

## 24) How do you debug a failing container?
**Answer:** Use \`docker ps -a\`, \`docker logs\`, \`docker exec\`, \`docker inspect\`.  
**Real-time scenario:** Container exits due to missing env variable found via logs.

## 25) Why container exits immediately after start?
**Answer:** Main process ends, command wrong, config missing, app crash at startup.  
**Real-time scenario:** Wrong JAR path in ENTRYPOINT causes immediate exit.

## 26) What is Docker restart policy?
**Answer:** Policy controlling auto-restart behavior (\`no\`, \`on-failure\`, \`always\`, \`unless-stopped\`).  
**Real-time scenario:** API auto-recovers after host reboot with \`unless-stopped\`.

## 27) How should secrets be handled in Dockerized apps?
**Answer:** Inject secrets at runtime; never bake them into image layers.  
**Real-time scenario:** Team accidentally pushed image with credentials in config file.

## 28) What is container health check?
**Answer:** A test to mark service healthy/unhealthy beyond process alive status.  
**Real-time scenario:** API process starts, but health endpoint fails until DB migration completes.

## 29) How to connect Spring Boot container to MySQL container?
**Answer:** Keep both on same network and use DB service/container name in datasource URL.  
**Real-time scenario:** \`jdbc:mysql://mysql-db:3306/appdb\` works; localhost fails inside container.

## 30) What makes a Docker setup production-ready?
**Answer:** Versioned image strategy, restart policy, health checks, secure config, resource controls, logs, persistence, rollback plan.  
**Real-time scenario:** Team rolls back quickly from \`app:2.1.0\` to \`app:2.0.8\` during incident due to proper tagging.

## Quick interview tip

In Docker interviews, avoid only textbook definitions.  
For every answer, add:
- what failed in real project
- what root cause was
- how Docker concept solved it

That makes your answers stand out as practical and experience-oriented.
`
};

export default dockerInterviewQuestions;
