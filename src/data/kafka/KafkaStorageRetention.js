const kafkaStorageRetention = {
   id: 'kafka-storage-retention',
   title: 'Kafka Storage and Retention',
   description: 'Simple explanation of Kafka log storage, retention policies, and log compaction with examples',
   content: `
 # Kafka Storage and Retention
 
 This explains how Kafka stores data and how long it keeps it.
 
 In simple words:
 - Kafka stores data as a log
 - Data is not deleted immediately
 - It can be replayed while retained
 
 ## Storage and Retention Diagram
 \`\`\`
 Producer
    |
    v
 Broker
    |
    v
 Partition Log (append-only)
    |
    +--> Log Segments
    |
    +--> Retention Policy (time/size)
    |
    +--> Optional Compaction (latest value per key)
    |
    v
 Consumer
 \`\`\`
 
 ## Log-Based Storage (Core Concept)
 
 Kafka stores messages in an append-only log.
 
 What this means:
 - New messages are added at the end
 - Existing messages are not updated
 - Messages are immutable
 
 ### Example
 Partition log:
 \`\`\`
 0 -> Order A
 1 -> Order B
 2 -> Order C
 \`\`\`
 
 New message:
 \`\`\`
 3 -> Order D
 \`\`\`
 
 Key behavior:
 - Only append
 - No immediate delete or update
 
 ## Log Segments (Important)
 
 Each partition log is divided into smaller files called segments.
 
 Why segments:
 - Efficient storage
 - Easy deletion
 - Better disk management
 
 Kafka deletes data at segment level, not individual messages.
 
 ## Retention Policies (Time / Size)
 
 Kafka removes old data based on retention rules.
 
 ### Time-Based Retention
 
 Example:
 - Retention = 7 days
 - Data older than 7 days is removed
 
 ### Size-Based Retention
 
 Example:
 - Max size = 10 GB
 - When limit is reached, oldest segments are deleted
 
 Important:
 - Kafka deletes entire segments, not single records
 
 ## Log Compaction (Very Important)
 
 Compaction keeps the latest value for each key.
 
 ### Example
 Messages:
 \`\`\`
 user1 -> John
 user2 -> Alice
 user1 -> Mike
 \`\`\`
 
 After compaction:
 \`\`\`
 user1 -> Mike
 user2 -> Alice
 \`\`\`
 
 Important points:
 - Latest value per key is retained
 - Old records may still exist temporarily
 - Cleanup happens in background
 
 ## Retention vs Compaction
 
 | Feature | Retention | Compaction |
 |--------|-----------|------------|
 | Based on | Time/Size | Key |
 | Deletes | Old data | Old versions of same key |
 | Use case | Event history | Latest state |
 
 ## Kafka Configurations (Important)
 
 \`\`\`
 log.retention.hours=168
 log.retention.bytes=1073741824
 log.cleanup.policy=delete
 log.cleanup.policy=compact
 \`\`\`
 
 ## Full Flow (Simple)
 
 Producer -> Broker -> Partition Log -> Segments -> Retention/Compaction -> Consumer
 
 ## Easy Analogy
 
 Think of a bank system:
 
 - Log = transaction history
 - Append = new transaction added
 - Retention = old records removed after time
 - Compaction = keep latest balance per account
 
 ## Key Points to Remember
 
 - Kafka uses append-only logs
 - Data is immutable
 - Logs are divided into segments
 - Retention deletes old segments
 - Compaction keeps latest value per key
 - Data can be replayed while retained
 
 ## Final Simple Line
 
 Kafka stores data as an append-only log, manages it using retention policies, and optionally compacts it to retain only the latest state per key.
 `.replace(/^ /gm, '')
 };
 
 export default kafkaStorageRetention;