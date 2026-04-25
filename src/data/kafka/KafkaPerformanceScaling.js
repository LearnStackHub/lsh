const kafkaPerformanceScaling = {
    id: 'kafka-performance-scaling',
    title: 'Kafka Performance and Scaling',
    description: 'Simple guide to Kafka horizontal scaling, partition scaling, throughput optimization, and latency tuning',
    content: `
  # Kafka Performance and Scaling
  
  This explains how Kafka handles large traffic and how we can make it faster.
  
  In simple words:
  - How to increase speed
  - How to handle more data
  - How to reduce delay
  
  ## Performance and Scaling Diagram
  \`\`\`
  Producers
     |
     v
  Brokers (Cluster Scaling)
     |
     v
  Partitions (Parallel Processing)
     |
     v
  Consumers
     |
     v
  Throughput and Latency Optimization
  \`\`\`
  
  ## Horizontal Scaling
  Horizontal scaling means adding more Kafka brokers.
  
  ### Example
  Before:
  - 1 broker handles all traffic
  
  After:
  - 3 brokers share load and storage
  
  Benefits:
  - Load distribution
  - Higher capacity
  - Better fault tolerance
  
  Simple idea:
  - More brokers = more capacity
  
  ## Partition Scaling
  Partitions enable parallel processing.
  
  ### Example
  Topic: \`orders\`
  
  - 1 partition -> 1 consumer -> limited throughput
  - 3 partitions -> 3 consumers -> parallel processing
  
  Important:
  - One partition is handled by one consumer in a group
  - If consumers > partitions, extra consumers remain idle
  
  ## Partition Balance (Important)
  If partitioning is not balanced:
  - One partition may receive most data
  - This creates a hotspot and slows down system
  
  Proper key design is important for even distribution.
  
  ## Throughput Optimization
  
  Throughput = messages processed per second
  
  ### Producer-side tuning
  
  \`\`\`
  linger.ms
  batch.size
  compression.type
  acks
  \`\`\`
  
  - Larger batches -> higher throughput
  - Compression -> smaller payload -> faster transfer
  
  ### Broker-side factors
  - Disk performance (very important)
  - Sequential writes make Kafka fast
  - SSD gives better performance than HDD
  
  ### Consumer-side factors
  - Consumer speed
  - Number of consumers
  - Parallel processing
  
  ## Consumer Lag (Critical Concept)
  
  Lag = messages not yet consumed
  
  Example:
  - Produced = 1000 messages
  - Consumed = 800 messages
  - Lag = 200
  
  High lag means:
  - Consumers are slow
  - System is falling behind
  
  ## Latency Tuning
  
  Latency = time taken to process one message
  
  To reduce latency:
  - Smaller batch sizes
  - Lower \`linger.ms\`
  - Faster acknowledgment settings
  
  ## Replication Impact
  
  Replication factor affects performance:
  
  - Higher replication -> safer data
  - But slower writes (more acknowledgments needed)
  
  ## Important Trade-off
  
  | Goal | Tuning Direction |
  |------|-----------------|
  | High throughput | Larger batches, compression |
  | Low latency | Smaller batches, faster sends |
  | High durability | Higher replication, acks=all |
  
  ## Full Flow (Simple)
  
  Producer -> Broker -> Partitions -> Consumers -> Throughput
  
  ## Easy Analogy
  
  Think of a delivery system:
  
  - Brokers = Warehouses
  - Partitions = Delivery routes
  - Consumers = Delivery workers
  - Batching = Sending multiple packages together
  
  Balanced routes and enough workers increase delivery speed.
  
  ## Key Points to Remember
  
  - Add brokers for horizontal scaling
  - Use partitions for parallel processing
  - Balance partition keys to avoid hotspots
  - Monitor consumer lag
  - Disk performance matters
  - Throughput and latency are trade-offs
  
  ## Final Simple Line
  
  Kafka achieves high performance by scaling brokers, distributing data across partitions, optimizing producers and consumers, and balancing throughput with latency.
  `.replace(/^  /gm, '')
  };
  
  export default kafkaPerformanceScaling;