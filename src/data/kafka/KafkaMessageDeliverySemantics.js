const kafkaMessageDeliverySemantics = {
  id: 'kafka-message-delivery-semantics',
  title: 'Message Delivery Semantics in Kafka',
  description: 'Simple explanation of At Most Once, At Least Once, and Exactly Once delivery guarantees',
  content: `
# Message Delivery Semantics in Kafka

This defines how reliably messages are delivered from Producer to Consumer.

In simple words:
- Can messages be lost?
- Can messages be duplicated?
- Can messages be processed exactly once?

## Delivery Types Overview
\`\`\`
Producer -> Kafka -> Consumer

At Most Once  : possible loss, no duplicates
At Least Once : no loss, duplicates possible
Exactly Once  : no loss, no duplicates (in supported flows)
\`\`\`

## 1) At Most Once (Fast but Risky)

Message is processed at most one time.

What happens:
- Offset is committed before processing
- If failure occurs, message may be lost
- Duplicate processing does not happen

Example:
- Read -> Commit -> Crash before processing -> Message lost

When to use:
- Logs
- Metrics
- Non-critical data

Use this when losing some data is acceptable.

## 2) At Least Once (Reliable but Duplicate Possible)

Message is processed at least one time.

What happens:
- Offset is committed after processing
- If failure occurs before commit, message is retried
- Duplicate processing can happen

Example:
- Read -> Process -> Crash before commit -> Reprocessed again

When to use:
- Orders
- Payments (with duplicate handling)
- Critical business events

Use this when data loss is not acceptable.

## 3) Exactly Once (Best but Complex)

Message is processed exactly once in supported Kafka flows.

How it works:
- Idempotent producer avoids duplicate writes
- Kafka transactions ensure atomic read-process-write

Important:
- Works best within Kafka ecosystem
- External systems must also handle idempotency

Example:
- Read -> Process -> Write -> Commit (as one transaction)

When to use:
- Financial systems
- Banking operations
- Critical workflows

Trade-off:
- Highest correctness
- More complexity

## Technical Mapping

| Type | How it is achieved |
|------|-------------------|
| At Most Once | Auto commit before processing |
| At Least Once | Commit after processing |
| Exactly Once | Idempotent producer + transactions |

## Simple Comparison Table

| Type | Data Loss | Duplicates | Speed |
|------|----------|------------|-------|
| At Most Once | Possible | No | Fast |
| At Least Once | No | Possible | Medium |
| Exactly Once | No | No | Slower |

## Easy Analogy

Think of sending a parcel:

- At Most Once -> send once, if lost, it is gone
- At Least Once -> keep sending until delivered, may deliver twice
- Exactly Once -> delivered perfectly once

## Real Flow Understanding

Producer -> Kafka -> Consumer

- At Most Once -> commit early, no retry
- At Least Once -> retry until success
- Exactly Once -> retry + duplicate control + transaction

## Key Points to Remember

- At most once = fast but risky
- At least once = reliable but duplicates possible
- Exactly once = strongest guarantee but complex
- Consumer commit strategy is critical
- Exactly once requires proper configuration

## Final Simple Line

Kafka provides flexible delivery guarantees so you can choose between speed, reliability, and correctness based on your use case.
`.replace(/^ /gm, '')
};

export default kafkaMessageDeliverySemantics;