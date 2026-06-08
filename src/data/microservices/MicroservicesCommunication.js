const microservicesCommunication = {
  id: 'microservices-communication',
  title: 'Microservices Communication Patterns',
  description: 'Learn synchronous and asynchronous microservices communication with REST APIs, messaging, events, retries, idempotency, request flow diagrams, and realtime order-service examples.',
  content: `
# Microservices Communication Patterns with Realtime Examples

Microservices must communicate because one business flow often needs data or action from another service. The two main styles are **synchronous communication** and **asynchronous communication**.

---

## 1. Synchronous Communication

In synchronous communication, Service A calls Service B and waits for the response.

\`\`\`
Order Service
    |
    | HTTP GET /products/101
    v
Product Service
    |
    v
Response with product details
\`\`\`

Use synchronous calls when the caller needs the response immediately.

Examples:

- Order Service needs product price before creating order
- API Gateway needs user authentication result
- Payment Service needs fraud check result before approving payment

---

## 2. Asynchronous Communication

In asynchronous communication, one service publishes an event and does not wait for all consumers.

\`\`\`
Order Service
    |
    | publishes OrderCreated event
    v
Message Broker
    |
    +-- Notification Service sends email
    +-- Analytics Service updates dashboard
    +-- Loyalty Service adds points
\`\`\`

Use async events when the work can happen after the main transaction.

---

## REST vs Messaging

| Need | Better Choice |
|---|---|
| Immediate response needed | REST / HTTP |
| Fire-and-forget event | Kafka / RabbitMQ |
| Query another service | REST |
| Notify many services | Event |
| Reduce coupling | Messaging |
| Simple beginner project | REST first |

---

## Realtime Order Flow

\`\`\`
Customer clicks Place Order
        |
        v
Order Service validates cart
        |
        +-- REST call to Product Service
        +-- REST call to Payment Service
        |
        v
Order saved
        |
        v
OrderCreated event published
        |
        +-- Notification Service
        +-- Reporting Service
\`\`\`

---

## Idempotency

Idempotency means the same request can be safely processed more than once without creating duplicate results.

Example problem:

Customer clicks Pay. Network timeout happens. Frontend retries. Without idempotency, Payment Service may charge twice.

Solution:

- client sends idempotency key
- Payment Service stores processed key
- duplicate request returns previous result

---

## Retry Rule

Retries are useful only for temporary failures.

Retry:

- network timeout
- temporary 503 response
- connection reset

Do not blindly retry:

- invalid request
- authentication failure
- insufficient balance
- duplicate order

---

## Communication Mistakes

| Mistake | Better Approach |
|---|---|
| Calling 5 services for one API response | Cache, compose carefully, or redesign |
| Using events for immediate required data | Use synchronous API |
| Retrying payment without idempotency | Add idempotency key |
| No timeout | Always set timeout |
| No fallback | Return safe degraded response |

## Fresher Interview Answer

Microservices communicate using synchronous APIs such as REST when an immediate response is required, and asynchronous messaging such as Kafka or RabbitMQ when services can react to events independently. We should use timeouts, retries, idempotency, and circuit breakers to avoid cascading failures.
`,
  code: `// Example decision:
// Product price required now -> REST call
// Send email after order -> event/message`
};

export default microservicesCommunication;
