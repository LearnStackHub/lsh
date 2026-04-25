const kafkaTopicsPartitions = {
  id: 'kafka-topics-partitions',
  title: 'Kafka Topics and Partitions',
  description: 'Simple explanation of topic creation, partitioning strategy, ordering, and key-based partitioning',
  content: `
# Kafka Topics and Partitions

This section explains how Kafka stores and organizes data.

In simple words:
- Where messages go
- How Kafka handles large data efficiently

## Topics and Partitions Diagram
\`\`\`
Producer
   |
   v
Broker
   |
   v
Topic: orders
   |
   +--> Partition 0 (Leader + Replicas)
   +--> Partition 1 (Leader + Replicas)
   +--> Partition 2 (Leader + Replicas)
   |
   v
Consumers
\`\`\`

## Topic Creation
A topic is like a category where messages are stored.

When creating a topic, we define:
- Partitions -> How many parts data is divided into
- Replication Factor -> Number of copies per partition
- Retention -> How long data is stored

### Simple Example
Topic: \`orders\`

- Partitions = 3
- Replication = 2
- Retention = 7 days

What this means:
- Data is split into 3 partitions
- Each partition has 2 copies (leader + replica)
- Data is stored for 7 days

## Partitioning Strategy
Partitioning decides how messages are distributed across partitions.

Why it matters:
- Better performance
- Parallel processing
- Load balancing

How to choose partition count:
- High traffic -> more partitions
- More consumers -> more partitions
- Need more throughput -> increase partitions

Important note:
- Too many partitions can increase overhead (memory, CPU, rebalancing)

## Message Ordering (Very Important)
Kafka guarantees ordering only inside a single partition.

### Example
Partition 1:
\`\`\`
A -> B -> C  (Order maintained)
\`\`\`

Partition 2:
\`\`\`
D -> E -> F  (Order maintained)
\`\`\`

Across partitions:
\`\`\`
A, D, B, E  (Global order not guaranteed)
\`\`\`

Key points:
- Ordering is guaranteed per partition
- Ordering is preserved for the same key

## Key-Based Partitioning
Kafka can use a message key to decide partition.

Rule:
- Same key -> same partition (if partition count is unchanged)

### Example
Key = \`user123\`

Events:
- Login
- Order
- Payment

All events with key \`user123\` go to the same partition.

Benefits:
- Order is preserved for that key
- Easier tracking and debugging

How it works:
\`\`\`
partition = hash(key) % number_of_partitions
\`\`\`

Important:
- If partition count changes, key-to-partition mapping may change

## What Happens Without a Key?
If no key is provided:
- Kafka distributes messages across partitions (round-robin or sticky partitioning)
- Ordering is not guaranteed for related events

## Full Flow (Simple)
Producer -> Broker -> Topic (Partitions) -> Consumer

## Easy Analogy
Think of bank transactions:

- Topic = Bank
- Partition = Branches
- Key = Account Number

Same account number goes to the same branch, so transaction order is preserved.

## Key Points to Remember
- Topic = category of messages
- Partitions = split data for scaling
- Each partition has replicas for safety
- Ordering is guaranteed only inside a partition
- Key controls partition routing
- Too many partitions can create overhead

## Final Simple Line
Kafka uses topics and partitions to store and process large volumes of data efficiently while maintaining ordering where needed.
`
};

export default kafkaTopicsPartitions;