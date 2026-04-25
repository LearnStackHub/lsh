const kafkaStreams = {
    id: 'kafka-streams',
    title: 'Kafka Streams',
    description: 'Beginner-friendly Kafka Streams guide with stateless/stateful processing, windowing, and real-time examples',
    content: `
  # Kafka Streams
  
  Apache Kafka Streams is a library used to process data in real time.
  
  In simple words:
  - Read data -> Process it -> Send new data
  
  Important:
  - Kafka Streams runs inside your application
  - No separate cluster like Spark or Flink is required
  
  ## Kafka Streams Flow
  \`\`\`
  Input Topic
     |
     v
  Kafka Streams Processing (inside app)
     |
     v
  Output Topic
  \`\`\`
  
  ## Stream Processing Basics
  Kafka Streams continuously processes incoming records.
  
  Real flow:
  - Input Topic -> Process -> Output Topic
  
  Example:
  \`\`\`java
  KStream<String, String> stream = builder.stream("orders");
  
  stream
      .mapValues(value -> value.toUpperCase())
      .to("processed-orders");
  \`\`\`
  
  What happens:
  - Reads from \`orders\`
  - Converts values to uppercase
  - Writes to \`processed-orders\`
  
  Simple idea:
  - Streams = continuous data transformation
  
  ## Stateless vs Stateful Processing
  
  ## Stateless (Simple)
  - No stored history needed
  - Each event processed independently
  
  Example:
  \`\`\`java
  stream.filter((key, value) -> value.contains("Order"));
  \`\`\`
  
  Use cases:
  - Filtering logs
  - Simple transformations
  
  ## Stateful (Advanced)
  - Uses local state store
  - Processing depends on previous events
  
  Example:
  \`\`\`java
  stream
      .groupByKey()
      .count()
      .toStream()
      .to("order-count");
  \`\`\`
  
  Important:
  - State is stored locally (disk)
  - Backed up by Kafka changelog topics for recovery
  
  Use cases:
  - Aggregations
  - Counting
  - Joins
  
  ## Windowing (Time-Based Processing)
  
  Windowing groups records based on time.
  
  ### Example
  Count orders every 10 seconds
  
  \`\`\`java
  stream
      .groupByKey()
      .windowedBy(TimeWindows.ofSizeWithNoGrace(Duration.ofSeconds(10)))
      .count()
      .toStream();
  \`\`\`
  
  ### Window Types
  - Tumbling window -> fixed time intervals
  - Sliding window -> overlapping intervals
  - Session window -> based on activity gaps
  
  Use cases:
  - Dashboards
  - Rate calculations
  - Alerts
  
  ## Parallel Processing (Scaling)
  
  Kafka Streams scales using partitions.
  
  - Each partition is processed independently
  - Multiple instances can run in parallel
  
  More partitions -> more parallelism
  
  ## Fault Tolerance
  
  Kafka Streams is fault tolerant.
  
  If application crashes:
  - State is restored from Kafka changelog topics
  - Processing resumes automatically
  
  ## Real-Time Data Processing Use Cases
  
  Kafka Streams is used for:
  
  - Fraud detection
  - Real-time counters
  - Alerts and monitoring
  - Live dashboards
  
  ## Full Real Flow (Very Important)
  
  Producer -> Kafka Topic -> Streams Processing -> New Topic -> Consumer
  
  ## Easy Analogy
  
  Think of a water filter system:
  
  - Input = raw data
  - Streams = filter
  - Output = processed data
  
  Process runs continuously.
  
  ## Key Points to Remember
  
  - Kafka Streams runs inside application
  - No separate processing system required
  - Stateless = independent processing
  - Stateful = uses stored data
  - Windowing = time-based grouping
  - Scales using partitions
  - Fault tolerant with state recovery
  
  ## Final Simple Line
  
  Kafka Streams allows applications to process and transform data continuously in real time using a lightweight, scalable library.
  `.replace(/^  /gm, '')
  };
  
  export default kafkaStreams;