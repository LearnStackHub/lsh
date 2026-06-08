const microservicesResilienceObservability = {
  id: 'microservices-resilience-observability',
  title: 'Microservices Resilience and Observability',
  description: 'Learn microservices resilience and observability with timeout, retry, circuit breaker, rate limiting, logs, metrics, tracing, alerts, and realtime production debugging examples.',
  content: `
# Microservices Resilience and Observability with Production Examples

In microservices, failure is normal. A service may be slow, unavailable, overloaded, or returning errors. A strong microservices system must handle failure gracefully and provide enough visibility to debug problems.

---

## Resilience Patterns

| Pattern | Purpose |
|---|---|
| Timeout | Stop waiting forever |
| Retry | Try again for temporary failure |
| Circuit Breaker | Stop calling a failing service |
| Rate Limiter | Protect service from too many requests |
| Bulkhead | Isolate resources so one failure does not block all |
| Fallback | Return safe alternate response |

---

## Realtime Failure Example

\`\`\`
Order Service
    |
    | calls Payment Service
    v
Payment Service is slow
    |
    v
Order API threads start waiting
    |
    v
Order Service becomes slow
    |
    v
API Gateway also becomes slow
\`\`\`

This is called cascading failure.

---

## Circuit Breaker Flow

\`\`\`
Closed state
    |
    | too many failures
    v
Open state
    |
    | wait duration
    v
Half-open state
    |
    | test calls succeed
    v
Closed again
\`\`\`

Circuit breaker protects your service from repeatedly calling a failing downstream system.

---

## Observability: Logs, Metrics, Traces

| Signal | Answers |
|---|---|
| Logs | What happened? |
| Metrics | How many, how fast, how much error? |
| Traces | Which services did this request pass through? |

You need all three.

Example production question:

> Customer says order API is slow.

Debug flow:

1. Check metrics: API latency increased.
2. Check traces: Payment Service span takes 3 seconds.
3. Check logs: Payment provider timeout.
4. Apply fix: timeout + fallback + alert.

---

## What to Log

Good logs:

- request ID / trace ID
- order ID or user ID where safe
- service name
- error reason
- duration

Avoid logging:

- passwords
- card numbers
- tokens
- full personal data

---

## Fresher Interview Answer

Microservices need resilience because one service failure can affect other services. We use timeout, retry, circuit breaker, rate limiter, and fallback to prevent cascading failure. For debugging, we use logs, metrics, and distributed tracing.
`,
  code: `// Production rule:
// Every remote call should have timeout.
// Retry only safe temporary failures.
// Circuit breaker protects the caller.
// Tracing helps find the slow service.`
};

export default microservicesResilienceObservability;
