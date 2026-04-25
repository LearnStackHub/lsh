const kafkaArchitecture = {
  id: 'kafka-architecture',
  title: 'Kafka Architecture',
  description: 'Beginner-friendly Kafka architecture explanation with simple flow, components, and real-world understanding',
  content: `
# Kafka Architecture

## What is Kafka Architecture?

Kafka architecture explains how Kafka is structured and how data moves inside the system.

In simple terms, it answers three questions:
- Who sends the data?
- Where is the data stored?
- Who reads the data?

---

## Basic Kafka Flow

\`\`\`
Producer
   |
   v
Kafka Topic (orders)
   |
   +--> Partition 0 (Broker 1)
   +--> Partition 1 (Broker 2)
   +--> Partition 2 (Broker 3)
   |
   v
Consumers
  - Payment Service
  - Inventory Service
  - Notification Service
\`\`\`

---

## Kafka Components (Simple Explanation)

---

## Kafka Cluster

A Kafka cluster is a group of Kafka servers working together.

Why we need a cluster:
- To handle large amounts of data
- To support high traffic
- To ensure the system continues working even if one server fails

If one broker goes down, other brokers continue serving requests.

---

## Brokers

A broker is a single Kafka server.

Responsibilities of a broker:
- Stores partition data on disk
- Accepts data from producers
- Serves data to consumers

Important points:
- Each broker has a unique ID
- Data is distributed across multiple brokers
- Adding more brokers improves scalability and fault tolerance

---

## ZooKeeper vs KRaft

### ZooKeeper (Old Approach)
Earlier, Kafka used ZooKeeper to:
- Manage cluster metadata
- Track brokers and topics
- Handle leader election

### KRaft (Modern Approach)

KRaft is the newer built-in metadata system in Kafka.

Advantages:
- No need for external ZooKeeper
- Simpler architecture
- Easier deployment and maintenance
- Better performance

---

## Topics

A topic is a named category where messages are stored.

Examples:
\`\`\`
orders
payments
notifications
\`\`\`

Producers write messages to topics.  
Consumers read messages from topics.

---

## Partitions (Very Important Concept)

A topic is divided into multiple partitions.

Why partitions are needed:
- To scale the system horizontally
- To allow parallel processing
- To distribute load across brokers

---

## Partition Example

Topic: \`orders\`  
Partitions: 3

\`\`\`
Partition 0 -> Order A
Partition 1 -> Order B
Partition 2 -> Order C
\`\`\`

Each partition can be processed independently.

This improves performance because multiple consumers can read data at the same time.

---

## Data Flow in Kafka

\`\`\`
Producer -> Topic -> Partition -> Broker -> Consumer
\`\`\`

Step-by-step:
1. Producer sends message to a topic
2. Topic stores message in a partition
3. Partition is stored inside a broker
4. Consumer reads the message

---

## Real-World Example (E-commerce System)

When a user places an order:

1. Order Service sends an event to Kafka (orders topic)
2. Kafka stores the event in partitions
3. Multiple services consume the event:
   - Payment Service processes payment
   - Inventory Service updates stock
   - Notification Service sends confirmation

Each service works independently.

---

## Why Kafka Architecture Works Well

Kafka architecture provides:

- Scalability (through partitions and brokers)
- Fault tolerance (through distributed storage)
- High performance (parallel processing)
- Loose coupling (independent services)

---

## Quick Recap

| Component | Meaning |
|----------|--------|
| Cluster | Group of Kafka servers |
| Broker | Single Kafka server |
| Topic | Category of messages |
| Partition | Split of topic for scaling |
| KRaft | Built-in metadata management |

---

## Final Understanding

Kafka architecture is designed to handle large-scale data by distributing it across multiple servers and allowing parallel processing.

It ensures that data flows efficiently from producers to consumers while maintaining performance and reliability.
`
};

export default kafkaArchitecture;