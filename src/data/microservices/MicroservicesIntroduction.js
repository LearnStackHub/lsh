const microservicesIntroduction = {
  id: 'microservices-introduction',
  title: 'Microservices Introduction for Freshers',
  description: 'Learn microservices architecture from scratch with realtime examples, monolith comparison, service boundaries, database ownership, APIs, deployment, and Java backend project context.',
  content: `
# Microservices Introduction for Freshers with Realtime Examples

Microservices is an architecture style where one large application is split into small, independent services. Each service owns one business capability, has its own codebase, can be deployed separately, and communicates with other services through APIs or events.

Spring Cloud is not the same as microservices. **Microservices is the architecture idea. Spring Cloud is a Spring-based toolkit that helps implement that idea.**

---

## Microservices vs Spring Cloud

| Topic | Meaning | Example |
|---|---|---|
| Microservices | Architecture style | User Service, Order Service, Payment Service |
| Spring Cloud | Java/Spring toolkit | Eureka, Config Server, Gateway, OpenFeign |
| Spring Boot | Service framework | Build one REST microservice |
| Docker/Kubernetes | Runtime/deployment tools | Package and run service instances |

If someone asks "Do you know microservices?", they are asking about service design, boundaries, communication, data ownership, fault tolerance, deployment, monitoring, and scaling. If they ask "Do you know Spring Cloud?", they are asking about tools used to build Java microservices.

---

## Realtime Example: E-Commerce Application

In a monolith, all modules live inside one application:

\`\`\`
E-Commerce Monolith
        |
        +-- user module
        +-- product module
        +-- cart module
        +-- order module
        +-- payment module
        +-- notification module
        |
        v
One codebase, one deployment, often one database
\`\`\`

In microservices, the same business is split by capability:

\`\`\`
Frontend / Mobile App
        |
        v
API Gateway
        |
        +-- User Service        -> user_db
        +-- Product Service     -> product_db
        +-- Cart Service        -> cart_db
        +-- Order Service       -> order_db
        +-- Payment Service     -> payment_db
        +-- Notification Service-> notification queue/email provider
\`\`\`

This split helps teams deploy and scale services independently.

---

## Why Companies Use Microservices

Companies use microservices when one application becomes too large for one team, one deployment, or one database model.

| Business Problem | Microservices Benefit |
|---|---|
| Product catalog gets heavy traffic | Scale Product Service only |
| Payment code changes frequently | Deploy Payment Service independently |
| One bug breaks full monolith | Failure is isolated to one service |
| Teams block each other | Each team owns a service |
| Different modules need different databases | Each service can own its database |

---

## When Not to Use Microservices

Microservices are powerful, but they are not always the right starting point.

Do not start with microservices when:

- the application is small
- one developer or a very small team owns everything
- deployment automation is weak
- monitoring and logs are not ready
- the domain boundaries are unclear
- the team cannot handle distributed system failures

For many fresher projects, a modular monolith is better first. Move to microservices when independent scaling and deployment become real needs.

---

## Fresher Interview Definition

Microservices is an architecture style where an application is divided into small independent services. Each service owns a specific business capability, communicates through APIs or messaging, has independent deployment, and usually owns its own database.

---

## What You Will Learn in This Track

1. Microservices fundamentals
2. Monolith vs microservices
3. Service boundaries and domain decomposition
4. Synchronous and asynchronous communication
5. Database per service and consistency patterns
6. Fault tolerance and observability
7. Security basics
8. A realtime Java microservices project

## Next Step

Continue with [Microservices Architecture](/microservices/architecture) to understand how services are designed before writing code.
`,
  code: `// Microservices is an architecture style, not one Java annotation.
// A User Service, Order Service, and Payment Service can each be separate Spring Boot apps.`
};

export default microservicesIntroduction;
