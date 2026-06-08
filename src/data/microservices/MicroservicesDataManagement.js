const microservicesDataManagement = {
  id: 'microservices-data-management',
  title: 'Microservices Data Management',
  description: 'Learn microservices data management with database per service, distributed transactions, eventual consistency, Saga pattern, CQRS basics, and realtime order-payment-inventory examples.',
  content: `
# Microservices Data Management with Saga and Realtime Examples

Data management is one of the hardest parts of microservices. In a monolith, one database transaction can update many tables. In microservices, each service should own its own database.

---

## Database Per Service

\`\`\`
User Service      -> user_db
Product Service   -> product_db
Order Service     -> order_db
Payment Service   -> payment_db
Inventory Service -> inventory_db
\`\`\`

Each service owns its schema. Other services should not directly read or write that database.

---

## Why Not One Shared Database?

| Shared Database Problem | Result |
|---|---|
| One service changes table | Other services break |
| All teams depend on same schema | Slow delivery |
| Database becomes integration layer | Tight coupling |
| Hard to scale one module independently | Performance issues |

Microservices prefer API or event-based integration instead of direct table access.

---

## Realtime Problem: Place Order

Order placement touches multiple services:

1. Order Service creates order
2. Inventory Service reserves stock
3. Payment Service collects money
4. Notification Service sends confirmation

You cannot easily wrap all these in one local database transaction because each service owns a different database.

---

## Saga Pattern

Saga is a pattern for managing distributed transactions using a sequence of local transactions and compensating actions.

\`\`\`
Create Order
    |
    v
Reserve Inventory
    |
    v
Collect Payment
    |
    v
Confirm Order
\`\`\`

If payment fails:

\`\`\`
Payment Failed
    |
    v
Cancel Order
    |
    v
Release Inventory
\`\`\`

---

## Orchestration vs Choreography

| Pattern | How It Works | Example |
|---|---|---|
| Orchestration | One service controls the flow | Order Service tells others what to do |
| Choreography | Services react to events | Inventory listens to OrderCreated |

For freshers, orchestration is easier to understand. Choreography is more decoupled but harder to trace.

---

## Eventual Consistency

Eventual consistency means data may not be updated everywhere immediately, but it becomes consistent after some time.

Example:

- Order created now
- Email sent after 2 seconds
- Analytics dashboard updated after 5 seconds

That is acceptable if the business does not need instant consistency.

---

## Data Management Mistakes

| Mistake | Better Approach |
|---|---|
| Sharing database between services | Database per service |
| Using distributed transactions everywhere | Saga pattern |
| Expecting instant consistency for every flow | Eventual consistency where acceptable |
| No compensation logic | Add cancel/refund/release actions |
| Joining tables across service databases | API composition or read model |

## Interview Answer

In microservices, each service should own its database. Distributed transactions are handled using patterns like Saga. Instead of one global transaction, each service performs a local transaction and publishes events or calls the next service. If a later step fails, compensating actions are used.
`,
  code: `// Compensation examples in a Saga flow
// Payment failed -> cancel order
// Order cancelled -> release inventory
// Refund completed -> notify customer`
};

export default microservicesDataManagement;
