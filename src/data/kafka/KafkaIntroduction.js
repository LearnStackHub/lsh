const kafkaIntroduction = {
   id: 'kafka-introduction',
   title: 'Introduction to Kafka',
   description:
     'Learn Apache Kafka from basics with simple explanations, real examples, Kafka flow, use cases, and comparison with traditional message brokers.',
  content: `
 # Introduction to Kafka
 
 ## What is Apache Kafka?
 
 Apache Kafka is a distributed event streaming platform.
 
 In simple words, Kafka helps applications send data, store data safely, and process data in real time.
 
 Kafka is mostly used when one application creates data and another application needs to use that data immediately.
 
 For example, in an e-commerce application:
 
 - Order Service creates an order
 - Payment Service processes the payment
 - Inventory Service updates stock
 - Notification Service sends email or SMS
 
 Instead of connecting all these services directly, Kafka acts as a middle layer between them.
 
 ## Simple Definition
 
 Kafka is a system that allows applications to publish events, store those events, and allow other applications to read them when needed.

## Install Kafka (Quick Start)

If you are learning Kafka for the first time, use Docker because setup is faster and easier.

## Option A: Install with Docker (Recommended)

### 1) Start ZooKeeper
\`\`\`bash
docker run -d --name zookeeper -p 2181:2181 zookeeper
\`\`\`

### 2) Start Kafka broker
\`\`\`bash
docker run -d --name kafka -p 9092:9092 \\
-e KAFKA_ZOOKEEPER_CONNECT=host.docker.internal:2181 \\
-e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 \\
-e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \\
confluentinc/cp-kafka
\`\`\`

### 3) Verify running containers
\`\`\`bash
docker ps
\`\`\`

You should see both \`zookeeper\` and \`kafka\` containers running.

### 4) Create a test topic
\`\`\`bash
docker exec -it kafka kafka-topics --bootstrap-server localhost:9092 --create --topic test-topic --partitions 1 --replication-factor 1
\`\`\`

### 5) List topics
\`\`\`bash
docker exec -it kafka kafka-topics --bootstrap-server localhost:9092 --list
\`\`\`

If \`test-topic\` appears, Kafka is installed correctly.

## Option B: Install Kafka Manually

### Prerequisites
- Java 17+ installed
- Kafka binary download

### Steps
1. Download Kafka from Apache Kafka official site  
2. Extract zip/tar file  
3. Start ZooKeeper  
4. Start Kafka broker  
5. Create a test topic and verify

Note:
- Older Kafka setups use ZooKeeper.
- Newer Kafka versions support KRaft mode (no ZooKeeper).
- For beginners, ZooKeeper-based local setup is still common in tutorials.
 
 ## Why Kafka is Needed
 
 In modern applications, many services need to communicate with each other.
 
 Without Kafka, services usually call each other directly.
 
 Example:
 
 \`\`\`
 Order Service -> Payment Service -> Inventory Service -> Notification Service
 \`\`\`
 
 This creates a problem.
 
 If Payment Service is down, the Order Service may fail.
 
 If Notification Service is slow, the complete order flow may become slow.
 
 This is called tight coupling.
 
 Kafka solves this problem by allowing services to communicate asynchronously.
 
 ## How Kafka Helps
 
 With Kafka, the Order Service does not directly call Payment, Inventory, or Notification services.
 
 Instead, it sends an event to Kafka.
 
 Example:
 
 \`\`\`
 Order Service -> Kafka Topic: order-created
 \`\`\`
 
 Then other services read the event from Kafka.
 
 \`\`\`
 Payment Service reads from Kafka
 Inventory Service reads from Kafka
 Notification Service reads from Kafka
 \`\`\`
 
 Now each service works independently.
 
 If Notification Service is down, the order and payment flow can still continue.
 
 When Notification Service comes back, it can read pending messages from Kafka.
 
 ## Real-Life Example
 
 Imagine a user places an order on an online shopping website.
 
 Step-by-step flow:
 
 1. User places an order
 2. Order Service creates the order
 3. Order Service sends an order-created event to Kafka
 4. Payment Service reads the event and processes payment
 5. Inventory Service reads the event and reduces stock
 6. Notification Service reads the event and sends email or SMS
 
 Kafka makes this communication reliable and scalable.
 
 ## Kafka Event Flow
 
 \`\`\`
 User Places Order
         |
         v
 Order Service
         |
         v
 Kafka Topic: order-created
         |
         |--------------------|
         |                    |
         v                    v
 Payment Service       Inventory Service
         |
         v
 Notification Service
 \`\`\`
 
 ## Is Kafka Only a Queue?
 
 No.
 
 Kafka is more than a normal queue.
 
 Kafka can work like:
 
 - A messaging system
 - A durable storage system
 - A real-time streaming platform
 
 This is why Kafka is widely used in microservices and real-time systems.
 
 ## Why Kafka is Popular
 
 Kafka is popular because it provides:
 
 1. High performance
 2. Durable storage
 3. Loose coupling between services
 4. Real-time processing
 5. Replay of old events
 6. Horizontal scalability
 
 ## High Performance
 
 Kafka can handle a very large number of messages per second.
 
 It is designed for high-throughput systems.
 
 Kafka is fast because:
 
 - It writes data sequentially
 - It uses batching
 - It uses partitions
 - It supports parallel processing
 
 This makes Kafka useful for large applications like banking, e-commerce, analytics, and streaming platforms.
 
 ## Durable Storage
 
 Kafka stores messages in logs.
 
 A log is like a history of events.
 
 Kafka does not delete a message immediately after one consumer reads it.
 
 Messages stay in Kafka based on retention settings.
 
 For example:
 
 - Keep messages for 7 days
 - Keep messages for 30 days
 - Keep messages until storage reaches a size limit
 
 This helps in replaying old events when needed.
 
 ## Example of Durable Storage
 
 Suppose a consumer had a bug and processed data incorrectly.
 
 Because Kafka stores old events, we can fix the bug and reprocess old messages.
 
 This is one of the biggest advantages of Kafka.
 
 ## Decoupling Between Services
 
 Decoupling means services do not directly depend on each other.
 
 Without Kafka:
 
 \`\`\`
 Order Service directly calls Payment Service
 Payment Service directly calls Inventory Service
 Inventory Service directly calls Notification Service
 \`\`\`
 
 If one service fails, the full flow may fail.
 
 With Kafka:
 
 \`\`\`
 Order Service sends event to Kafka
 Payment Service reads from Kafka
 Inventory Service reads from Kafka
 Notification Service reads from Kafka
 \`\`\`
 
 Now services are independent.
 
 This makes the system easier to maintain and scale.
 
 ## Real-Time Processing
 
 Kafka is used for real-time data processing.
 
 This means data can be processed immediately when it is created.
 
 Examples:
 
 - Fraud detection
 - Live dashboards
 - User activity tracking
 - Payment monitoring
 - Log processing
 - Real-time notifications
 
 ## Kafka vs Traditional Message Brokers
 
 Traditional message brokers usually work like queues.
 
 A message is sent, consumed, and then removed.
 
 Kafka works differently.
 
 Kafka stores events in logs and allows consumers to read them based on their own progress.
 
 | Feature | Kafka | Traditional Message Broker |
 |---|---|---|
 | Storage | Log-based storage | Queue-based storage |
 | Message after reading | Usually retained based on policy | Usually removed after acknowledgment |
 | Replay support | Yes | Limited or no |
 | Scaling | Partition-based scaling | Depends on broker |
 | Best use case | Event streaming and real-time systems | Simple task queues |
 
 ## Simple Difference
 
 Traditional broker:
 
 \`\`\`
 Send message -> Process message -> Delete message
 \`\`\`
 
 Kafka:
 
 \`\`\`
 Send event -> Store event -> Process event -> Keep event for retention
 \`\`\`
 
 ## Basic Kafka Terms
 
 ## Producer
 
 A producer is an application that sends messages to Kafka.
 
 Example:
 
 \`\`\`
 Order Service sends order-created event
 \`\`\`
 
 ## Consumer
 
 A consumer is an application that reads messages from Kafka.
 
 Example:
 
 \`\`\`
 Payment Service reads order-created event
 \`\`\`
 
 ## Topic
 
 A topic is a category or name where messages are stored.
 
 Examples:
 
 \`\`\`
 orders
 payments
 notifications
 user-activity
 \`\`\`
 
 ## Partition
 
 A topic can be divided into multiple partitions.
 
 Partitions help Kafka scale.
 
 If a topic has more partitions, multiple consumers can process data in parallel.
 
 ## Offset
 
 An offset is the position of a message inside a partition.
 
 Kafka uses offsets to track which message a consumer has already read.
 
 ## Broker
 
 A broker is a Kafka server.
 
 Kafka runs as a cluster of brokers.
 
 ## Cluster
 
 A Kafka cluster is a group of Kafka brokers working together.
 
 ## Simple Kafka Architecture
 
 \`\`\`
 Producer -> Kafka Topic -> Consumer
 \`\`\`
 
 Detailed view:
 
 \`\`\`
 Producer
    |
    v
 Kafka Cluster
    |
    |-- Topic: orders
    |      |-- Partition 0
    |      |-- Partition 1
    |      |-- Partition 2
    |
    v
 Consumer Group
 \`\`\`
 
 ## Why Partitions Are Important
 
 Partitions allow Kafka to process data in parallel.
 
 Example:
 
 If the orders topic has 3 partitions, Kafka can allow 3 consumers in the same group to process data at the same time.
 
 \`\`\`
 Partition 0 -> Consumer 1
 Partition 1 -> Consumer 2
 Partition 2 -> Consumer 3
 \`\`\`
 
 This improves performance.
 
 ## Kafka Ordering
 
 Kafka guarantees message order only inside a partition.
 
 Example:
 
 \`\`\`
 Partition 0:
 Order 1 -> Order 2 -> Order 3
 \`\`\`
 
 The order is maintained inside the same partition.
 
 But Kafka does not guarantee global ordering across all partitions.
 
 ## Why Offsets Are Important
 
 Offsets help consumers remember their progress.
 
 Example:
 
 \`\`\`
 Offset 0 -> Order A
 Offset 1 -> Order B
 Offset 2 -> Order C
 \`\`\`
 
 If the consumer already processed offset 1, next time it can continue from offset 2.
 
 This helps during failures and restarts.
 
 ## Where Kafka is Used
 
 Kafka is commonly used in:
 
 1. Microservices communication
 2. Real-time analytics
 3. Log aggregation
 4. Payment systems
 5. Fraud detection
 6. Notification systems
 7. Data pipelines
 8. User activity tracking
 9. Audit systems
 10. Event-driven applications
 
 ## Example Use Case: Notification System
 
 Suppose a user places an order.
 
 Order Service sends an event:
 
 \`\`\`
 order-created
 \`\`\`
 
 Notification Service reads the event and sends:
 
 \`\`\`
 Order confirmation email
 Order confirmation SMS
 \`\`\`
 
 Even if Notification Service is temporarily down, Kafka stores the event.
 
 When the service starts again, it can continue processing.
 
 ## Example Use Case: Analytics
 
 Suppose users are clicking products on an e-commerce website.
 
 Each click can be sent to Kafka.
 
 \`\`\`
 User clicked product
 User added product to cart
 User searched keyword
 User completed purchase
 \`\`\`
 
 Analytics service reads this data and creates live dashboards.
 
 ## When to Use Kafka
 
 Use Kafka when:
 
 - You need real-time data processing
 - Multiple services need the same data
 - You need high throughput
 - You need event replay
 - You need asynchronous communication
 - You are building microservices
 - You need durable event storage
 
 ## When Not to Use Kafka
 
 Kafka is powerful, but it is not always required.
 
 Do not use Kafka for every small application.
 
 Kafka may not be needed when:
 
 - The application is simple
 - There is very low traffic
 - Direct API calls are enough
 - There is no need for replay
 - There is no real-time processing requirement
 
 For simple CRUD applications, Kafka may add unnecessary complexity.
 
 ## Key Idea to Remember
 
 Kafka is not just a queue.
 
 Kafka is a distributed event streaming platform.
 
 It helps applications:
 
 - Send events
 - Store events
 - Process events
 - Replay events
 - Scale communication between services
 
 ## Final Simple Definition
 
 Kafka is a high-performance distributed system that allows applications to send, store, and process events in real time.
 
 ## Quick Revision
 
 - Kafka is used for event streaming
 - Producers send messages to Kafka
 - Consumers read messages from Kafka
 - Topics store messages
 - Partitions help Kafka scale
 - Offsets track consumer progress
 - Kafka stores events based on retention settings
 - Kafka helps services communicate without direct dependency
- Kafka is useful for microservices and real-time systems
 `.replace(/^ /gm, '')
 };
 
 export default kafkaIntroduction;