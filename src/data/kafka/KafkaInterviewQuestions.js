const kafkaInterviewQuestions = {
  id: 'kafka-interview-questions',
  title: 'Common Interview Questions',
  description: '30 clean Kafka interview questions with practical real-world scenario-based answers',
  content: `
# Common Interview Questions

These are interview-ready Kafka questions with expanded answers for easy understanding.
Use them for self-practice and mock interviews.

## 1) What is Kafka, and where would you use it in real projects?
Kafka is a distributed event streaming platform. It helps systems publish events, store them durably, and process them in real time.  
You use Kafka when multiple services need the same data asynchronously.  
**Scenario:** In e-commerce, one \`order-created\` event can trigger payment, inventory update, notification, and analytics at the same time.

## 2) Explain Kafka architecture in simple terms.
Kafka has brokers (servers), topics (categories), partitions (scaling units), replicas (safety copies), producers (writers), and consumers (readers).  
Producers write to topic partitions, brokers store data, and consumers read with offsets.  
**Scenario:** \`orders\` topic with 6 partitions across 3 brokers handles checkout spikes through parallel processing.

## 3) What is the difference between topic and partition?
A topic is a logical stream name like \`orders\`; a partition is a physical split of that stream.  
Partitions are what actually enable parallel reads/writes.  
**Scenario:** \`payments\` topic with 12 partitions can be consumed in parallel by up to 12 consumers in one group.

## 4) Why do we use keys in Kafka messages?
Keys decide which partition a record goes to (hash-based routing).  
If you use the same key, related records stay in the same partition, so order is preserved for that key.  
**Scenario:** Using \`orderId\` ensures all updates for that order arrive in sequence.

## 5) Does Kafka guarantee message ordering?
Kafka guarantees ordering only inside one partition.  
There is no global ordering across all partitions in a topic.  
**Scenario:** For account transactions, key by \`accountId\` so all events for that account stay ordered.

## 6) What is consumer lag, and why is it important?
Consumer lag is the gap between latest produced offset and consumed offset.  
It shows whether consumers are keeping up with incoming data.  
**Scenario:** During a flash sale, rapidly increasing lag means consumers are slow and need scaling or optimization.

## 7) What are consumer groups?
A consumer group is a team of consumers that share topic partitions.  
In one group, each partition is assigned to only one consumer at a time.  
**Scenario:** In \`shipment-service\` group, three consumers can process three partitions without duplicate processing.

## 8) What happens if consumers are more than partitions?
Extra consumers remain idle because there are no free partitions to assign.  
Maximum parallelism per group is bounded by partition count.  
**Scenario:** 10 consumers for 4 partitions means only 4 active; 6 stay idle.

## 9) What is offset, and how is it used?
Offset is the position of a record within a partition.  
Consumers commit offsets to track processed progress and recover from failures.  
**Scenario:** If consumer crashes at offset 1020, it restarts from last committed offset, not from zero.

## 10) Auto commit vs manual commit: which is better?
Auto commit is simple but can acknowledge progress before business processing is safely complete.  
Manual commit gives control: commit only after processing succeeds.  
**Scenario:** In payments, manual commit after DB update avoids losing unprocessed transactions.

## 11) Explain At Most Once, At Least Once, Exactly Once.
- At Most Once: possible loss, no retries  
- At Least Once: retries, possible duplicates  
- Exactly Once: no duplicates/loss in supported transactional flow  
Choose based on business risk tolerance (loss vs duplicates vs complexity).  
**Scenario:** Metrics may use at-most-once, order processing often uses at-least-once, financial ledger updates prefer exactly-once patterns.

## 12) How does Kafka achieve fault tolerance?
Kafka replicates partitions across brokers (leader + followers).  
If leader fails, an in-sync replica becomes new leader automatically.  
**Scenario:** Broker outage does not stop checkout events because follower promotion keeps service running.

## 13) What is ISR in Kafka?
ISR means replicas that are sufficiently up-to-date with leader.  
Only ISR replicas are trusted for leader election in normal flow.  
**Scenario:** If one follower is lagging, it is excluded from ISR and not selected as new leader.

## 14) What is replication factor and how to choose it?
Replication factor is how many copies each partition has across brokers.  
Higher replication increases durability but adds storage and write overhead.  
**Scenario:** RF=3 is common production default; RF=1 is usually only for local development.

## 15) What are \`acks\` in producer config?
\`acks\` controls write confirmation durability:
- 0: no ack
- 1: leader ack
- all: all ISR ack  
Higher durability settings can increase write latency.  
**Scenario:** Critical order/payment events usually use \`acks=all\`; low-value telemetry may use faster settings.

## 16) Why use idempotent producer?
Retries can create duplicates when network is unstable.  
Idempotent producer ensures retries do not write duplicate records for the same send sequence.  
**Scenario:** Timeout during order event send triggers retry, but only one record is finally stored.

## 17) What is log retention in Kafka?
Retention decides how long (time) or how much (size) data is kept in topic logs.  
It enables replay and historical reprocessing within retention window.  
**Scenario:** Clickstream kept 3 days, audit trail kept 30+ days based on compliance need.

## 18) What is log compaction?
Compaction keeps latest record per key while removing older key versions gradually.  
Useful for state topics where current value matters most.  
**Scenario:** User profile stream keeps latest profile per \`userId\` for fast recovery/bootstrap.

## 19) What causes rebalancing and why can it hurt performance?
Rebalance happens when group membership changes or partition count changes.  
During rebalance, consumers pause and partition ownership is reassigned.  
**Scenario:** Frequent container restarts can cause rebalance storms and sudden lag spikes.

## 20) How do you scale Kafka consumers?
Scale by increasing partitions and consumer instances (up to partition count per group).  
Also improve processing code and downstream dependencies to reduce per-message time.  
**Scenario:** Rising invoice lag is handled by adding partitions plus more consumer pods.

## 21) How do you improve Kafka throughput?
Use larger batches, compression, efficient partitioning, and fast disk/network.  
Tune producer and broker configs based on workload profile.  
**Scenario:** Telemetry pipeline throughput improves significantly with compression + larger batch size.

## 22) How do you reduce Kafka latency?
For lower latency, reduce batch wait, use smaller batches, and optimize consumer processing path.  
Choose acknowledgment settings that match required durability.  
**Scenario:** Fraud-alert pipeline uses low \`linger.ms\` and optimized processing for near-real-time alerts.

## 23) How is Kafka used in microservices?
Kafka acts as an event backbone so services publish/subscribe without direct tight coupling.  
This improves resilience, team autonomy, and scalability.  
**Scenario:** \`user-registered\` event triggers email, CRM sync, rewards, and analytics independently.

## 24) Kafka vs RabbitMQ: when to choose which?
Kafka: high-throughput event streaming, replay, long retention.  
RabbitMQ: flexible queue routing, task/work queue patterns, quick request distribution.  
Kafka is better for event history + replay-heavy architectures. RabbitMQ is often better for classic task queues.  
**Scenario:** Real-time analytics event bus -> Kafka; short-lived background job queue -> RabbitMQ.

## 25) What is Kafka Connect and where is it used?
Kafka Connect moves data between Kafka and external systems using source/sink connectors.  
It reduces custom integration code and standardizes data pipelines.  
**Scenario:** Debezium source captures MySQL CDC to Kafka; sink connector writes to Elasticsearch.

## 26) What is Kafka Streams?
Kafka Streams is a Java library for continuous in-app stream processing.  
It supports transform, filter, aggregation, joins, and windowing.  
**Scenario:** Build real-time order-count-per-region updates every minute for operations dashboard.

## 27) How do you secure Kafka in production?
Use authentication (SASL/SSL), authorization (ACLs), and encryption (TLS).  
Also secure inter-broker communication and rotate credentials/certificates.  
**Scenario:** Only payment service principal can write to \`payments\`; traffic is encrypted end-to-end.

## 28) What should you monitor in Kafka?
Monitor lag, under-replicated partitions, broker resource usage, throughput, latency, and rebalance frequency.  
Use dashboards + alerts to catch issues before SLA impact.  
**Scenario:** Alert when lag crosses threshold and URP rises to prevent downstream outages.

## 29) How do you handle poison messages / processing failures?
Use retry with backoff for transient errors, and DLT/error topics for unrecoverable events.  
Never block the entire pipeline on one bad record.  
**Scenario:** Invalid order payload is sent to DLT for investigation while normal orders continue.

## 30) What is a good production topic design strategy?
Use clear domain-driven names, schema versioning/evolution policy, right partition count, retention rules, and ACLs.  
Design topics for ownership and long-term compatibility.  
**Scenario:** \`orders.created.v1\` and \`orders.updated.v1\` prevent breaking consumers during schema changes.

## Final Interview Tip
In Kafka interviews, always answer with:
1) concept, 2) trade-off, 3) real production scenario.  
That pattern makes your answers practical and senior-level.
`.replace(/^ /gm, '')
};

export default kafkaInterviewQuestions;
