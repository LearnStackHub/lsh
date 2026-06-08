const microservicesArchitecture = {
  id: 'microservices-architecture',
  title: 'Microservices Architecture Design',
  description: 'Learn microservices architecture design with monolith comparison, service boundaries, API Gateway, service discovery, database ownership, realtime e-commerce decomposition, and fresher interview examples.',
  content: `
# Microservices Architecture Design with Realtime Business Boundaries

Microservices architecture is not about creating many small projects randomly. The main skill is deciding **where one service ends and another service begins**.

---

## Architecture Building Blocks

\`\`\`
Client
  |
  v
API Gateway
  |
  +-- User Service
  +-- Product Service
  +-- Order Service
  +-- Payment Service
  +-- Notification Service
  |
  v
Each service owns its data and deployment
\`\`\`

| Component | Responsibility |
|---|---|
| API Gateway | Single entry point, routing, authentication, rate limiting |
| Service | Owns one business capability |
| Database per service | Prevents hidden coupling |
| Message broker | Async communication for events |
| Observability | Logs, metrics, tracing, alerts |
| Deployment platform | Docker, Kubernetes, cloud runtime |

---

## Service Boundary Rule

A good microservice boundary follows business language.

Bad split:

\`\`\`
Controller Service
Service Layer Service
Repository Service
\`\`\`

This is not microservices. This is a technical-layer split.

Good split:

\`\`\`
User Service
Order Service
Payment Service
Inventory Service
\`\`\`

This is a business-capability split.

---

## Realtime Decomposition Example

Requirement:

> Customer places an order for a product. Payment must be completed. Inventory should reduce. Customer should receive notification.

Possible services:

| Service | Owns | Main APIs |
|---|---|---|
| User Service | customer profile | GET /users/{id} |
| Product Service | catalog and price | GET /products/{id} |
| Order Service | order lifecycle | POST /orders |
| Payment Service | payment transaction | POST /payments |
| Inventory Service | stock count | POST /inventory/reserve |
| Notification Service | email/SMS | consumes OrderCreated event |

---

## Request Flow

\`\`\`
POST /orders
    |
    v
API Gateway
    |
    v
Order Service
    |
    +-- calls Product Service for price
    +-- calls Inventory Service to reserve stock
    +-- calls Payment Service to collect money
    +-- publishes OrderCreated event
    |
    v
Notification Service sends email
\`\`\`

---

## Architecture Decisions Fresher Must Explain

### Why API Gateway?

Without gateway, frontend must know every service URL. With gateway, frontend calls one base URL and gateway routes internally.

### Why database per service?

If all services share one database, they become tightly coupled. One table change can break many services.

### Why events?

Some work does not need to block the user. Sending email can happen after order creation through an event.

### Why observability?

In microservices, one request crosses many services. Without logs, metrics, and tracing, debugging becomes guesswork.

---

## Common Architecture Mistakes

| Mistake | Problem |
|---|---|
| Creating one service per table | Too many tiny services |
| Sharing one database between all services | Hidden coupling |
| Calling many services inside one request | Slow and fragile API |
| No fallback for failed downstream service | Cascading failure |
| No tracing | Hard to debug production issues |
| No API versioning | Breaking clients during changes |

## Interview Answer Pattern

When explaining microservices architecture, always cover:

1. service boundaries
2. communication
3. database ownership
4. failure handling
5. observability
6. deployment independence
`,
  code: `// Architecture is a design decision first.
// Tools like Spring Cloud, Docker, and Kubernetes come after boundaries are clear.`
};

export default microservicesArchitecture;
