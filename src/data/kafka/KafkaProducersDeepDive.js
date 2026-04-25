const kafkaProducersDeepDive = {
   id: 'kafka-producers-deep-dive',
   title: 'Kafka Producers Deep Dive',
   description: 'Simple deep dive into producer configs, ack settings, batching, compression, retries, and idempotence',
   content: `
 # Kafka Producers Deep Dive
 
 A Producer is responsible for sending data (messages) to Kafka topics.
 
 In simple words:
 - Producer = data sender
 
 ## Producer Flow Diagram
 \`\`\`
 Producer App
    |
    v
 Apply Config (retries, linger.ms, batch.size, acks)
    |
    v
 Partition Selection (key-based or round-robin)
    |
    v
 Send to Broker
    |
    v
 Topic Partition (stored in broker)
    |
    v
 Ack Received?
    |
    +--> Yes: Success
    |
    +--> No: Retry (based on config)
 \`\`\`
 
 ## Producer Configuration (Important Settings)
 These settings control how producer sends messages.
 
 ### retries
 How many times producer retries if sending fails.
 
 Example:
 - \`retries = 3\` -> producer retries up to 3 times.
 
 ### linger.ms
 How long producer waits before sending messages.
 
 - Small value -> low latency
 - Higher value -> better batching and throughput
 
 ### batch.size
 Maximum size of one batch.
 
 - Larger batch -> better throughput
 - Smaller batch -> faster sending for low traffic
 
 ### delivery.timeout.ms
 Maximum time allowed for successful delivery.
 
 If exceeded, message send fails.
 
 ## Partition Selection
 Kafka decides which partition to send message to.
 
 - If key is present -> hash-based partitioning
 - If no key -> round-robin or sticky partitioning
 
 This affects ordering and load distribution.
 
 ## Acknowledgment Settings (acks)
 
 ### acks = 0
 - No confirmation
 - Fastest
 - Risk of data loss
 
 ### acks = 1
 - Leader confirms write
 - Balanced performance and reliability
 
 ### acks = all (or -1)
 - Leader waits for all in-sync replicas (ISR)
 - Strongest durability
 - Higher latency
 
 ## Batching and Compression
 
 Batching groups multiple messages together.
 
 Benefits:
 - Fewer network calls
 - Better throughput
 
 Compression reduces message size.
 
 Common types:
 - gzip
 - snappy
 - lz4
 - zstd
 
 Benefits:
 - Reduced network usage
 - Improved throughput
 
 ## Idempotent Producers (Very Important)
 
 Retries can create duplicate messages.
 
 Without idempotence:
 - Same message may be written multiple times
 
 With idempotence:
 - Kafka ensures no duplicate writes during retries
 - Order is preserved within partition
 
 Enable idempotence:
 \`\`\`
 enable.idempotence=true
 \`\`\`
 
 ## Throughput vs Latency Trade-off
 
 - Larger batches -> high throughput, higher latency
 - Smaller batches -> low latency, lower throughput
 
 Choose based on use case.
 
 ## Full Flow (Simple)
 Producer -> Broker -> Topic Partition -> Acknowledgment -> Retry (if needed)
 
 ## Easy Analogy
 
 Think of sending parcels:
 
 - Producer = sender
 - Batch = multiple parcels sent together
 - acks = delivery confirmation
 - retries = resend on failure
 - idempotence = avoid duplicate delivery
 
 ## Key Points to Remember
 
 - Producer sends data to Kafka via broker
 - Partition selection controls data distribution
 - acks controls reliability
 - Batching and compression improve throughput
 - Idempotence prevents duplicate writes
 - Trade-off exists between latency and throughput
 
 ## Final Simple Line
 
 Kafka producers send data efficiently by batching records, control reliability using acknowledgments, and prevent duplicates using idempotence.
 `.replace(/^ /gm, '')
 };
 
 export default kafkaProducersDeepDive;