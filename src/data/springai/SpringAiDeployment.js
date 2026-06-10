import makeSpringAiTopic from './topicHelpers.js';

const topic = makeSpringAiTopic(
  'spring-ai-deployment',
  'Spring AI Production Deployment',
  'Docker, timeouts, monitoring, and cost control — because AI APIs are slow and expensive.',
  'Production means handling slow models and surprise bills',
  'Your CRUD API returns in 50ms. OpenAI might take 8 seconds. In production you need timeouts, fallback messages, Docker secrets for API keys, and dashboards that track latency and token usage per day.',
  ['Dockerize a Spring AI app with env-based API key', 'Set request timeout on model calls', 'Track tokens and cost per endpoint', 'Return user-friendly fallback when provider fails'],
  {
    title: 'Customer support AI going live for 10,000 users',
    body: 'OpenAI has an outage at 2 AM. Your app should return "Support assistant is busy, try again" — not a 500 with stack trace. Finance asks why the bill doubled — you need token logs per feature.',
    checks: ['OPENAI_API_KEY via Docker -e or K8s secret', 'Timeout at 30s with CompletableFuture or WebClient settings', 'Metrics: p95 latency, error rate, tokens/day', 'Fallback string in GlobalExceptionHandler']
  },
  [
    { title: 'Docker', body: 'Same JAR deploy; pass API key at runtime.' },
    { title: 'Latency', body: 'AI is slow — set expectations in UI and timeouts in code.' },
    { title: 'Cost', body: 'max-tokens, rate limits, smaller models for simple tasks.' },
    { title: 'Observability', body: 'Log model name, latency, request id — debug without PII.' }
  ],
  `
# Spring AI Production Deployment

Deploying Spring Boot with AI is deploying Spring Boot **plus** three extra worries: **latency**, **cost**, and **provider outages**.

## Production Checklist

| Area | What to check |
|------|---------------|
| Docker | Externalize API keys |
| Kubernetes | Use secrets and resource limits |
| Monitoring | Track latency, errors, request count |
| Cost | Track tokens and model usage |
| Logging | Use correlation ids |
| Observability | Know which prompt/model/version produced an answer |

## Cost Optimization

- Use smaller models for simple tasks
- Keep prompts short
- Cache repeated answers where safe
- Limit max tokens
- Use RAG topK carefully

---

## Deep Production Deployment Plan

AI endpoints are slower and costlier than normal CRUD APIs. Production planning must include timeout, retry, fallback, logging, and cost tracking.

## Dockerfile

\`\`\`dockerfile
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY target/spring-ai-course-tutor-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
\`\`\`

## Docker Run

\`\`\`bash
docker run -p 8080:8080 \\
  -e OPENAI_API_KEY=your_api_key_here \\
  spring-ai-course-tutor
\`\`\`

## Production Settings

| Concern | What to do |
|---------|------------|
| API key | use environment variable or secrets manager |
| Cost | limit max tokens and rate limit users |
| Latency | set timeout and show loading state |
| Failure | return fallback response |
| Logs | log request id, model, latency, not private prompt |
| Monitoring | track success, errors, token usage, slow calls |

## Fallback Message

\`\`\`java
public String fallbackAnswer() {
    return "AI tutor is taking longer than expected. Please try again in a few seconds.";
}
\`\`\`

## Real-Time Production Mistake

Many beginners deploy AI APIs without rate limiting. One user can refresh repeatedly and create a big bill. Always protect expensive endpoints.

---

## application-prod.properties

\`\`\`properties
spring.ai.openai.api-key=\${OPENAI_API_KEY}
spring.ai.openai.chat.options.model=gpt-4o-mini
spring.ai.openai.chat.options.temperature=0.2
spring.ai.openai.chat.options.max-tokens=700

server.shutdown=graceful

management.endpoints.web.exposure.include=health,info,metrics
management.endpoint.health.show-details=when_authorized
\`\`\`

Activate with \`spring.profiles.active=prod\`. In Kubernetes or Docker, inject \`OPENAI_API_KEY\` from a secret — same placeholder pattern as local \`application.properties\`.

## GlobalExceptionHandler for AI failures

\`\`\`java
@RestControllerAdvice
public class AiGlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<AiErrorResponse> handleAiFailure(Exception ex) {
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                .body(new AiErrorResponse(
                        "AI service is temporarily unavailable. Please retry.",
                        ex.getClass().getSimpleName()
                ));
    }
}

record AiErrorResponse(String message, String reason) {}
\`\`\`

## Kubernetes secret (example)

\`\`\`yaml
apiVersion: v1
kind: Secret
metadata:
  name: openai-api-key
type: Opaque
stringData:
  OPENAI_API_KEY: replace-me
\`\`\`

Mount as env var in deployment — never bake keys into Docker images.

## Monitoring checklist

| Metric | Why |
|--------|-----|
| p95 latency per AI endpoint | Models are slow — set SLAs |
| Error rate by provider | Detect outages early |
| Tokens per day per feature | Finance visibility |
| Requests per user | Detect abuse |

### Test with cURL (health check after deploy)

\`\`\`bash
curl http://localhost:8080/actuator/health
\`\`\`

Expected:

\`\`\`json
{
  "status": "UP"
}
\`\`\`

### Test AI endpoint with timeout fallback

Simulate provider failure (wrong key or disconnected network). Your API should return:

\`\`\`json
{
  "message": "AI service is temporarily unavailable. Please retry.",
  "reason": "..."
}
\`\`\`

Not a raw stack trace.

### Test with Postman — production smoke test

\`\`\`text
GET http://localhost:8080/actuator/health
\`\`\`

Then:

\`\`\`text
POST http://localhost:8080/api/tutor/ask
Content-Type: application/json
\`\`\`

\`\`\`json
{
  "question": "What is the difference between @Component and @Service?",
  "topic": "Spring Boot"
}
\`\`\`

Track response time in Postman — if it exceeds your SLA (e.g. 30s), tune timeout and show a loading state in the UI.

`
);

export default topic;
