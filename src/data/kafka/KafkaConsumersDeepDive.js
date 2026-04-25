const kafkaConsumersDeepDive = {
   id: 'kafka-consumers-deep-dive',
   title: 'Kafka Consumers Deep Dive',
   description: 'Simple deep dive into consumer groups, offset tracking, commit strategies, and rebalancing',
   content: `
 # Kafka Consumers Deep Dive
 
 A consumer is responsible for reading and processing messages from Kafka topics.
 
 In simple words:
 - Consumer = data reader
 
 ## Consumer Flow Diagram
 \`\`\`
 Consumer
    |
    v
 Broker
    |
    v
 Topic Partition
    |
    v
 Process Message
    |
    v
 Commit Offset
    |
    v
 Continue Reading
 \`\`\`
 
 ## Consumer Groups (Very Important)
 A consumer group is a set of consumers working together.
 
 Why needed:
 - To share workload
 - To process data faster
 
 ### Simple Example
 Topic has 3 partitions.
 
 Consumer Group:
 - Consumer 1 -> Partition 1
 - Consumer 2 -> Partition 2
 - Consumer 3 -> Partition 3
 
 Result:
 - Work is divided
 - No duplicate processing inside same group
 
 Important rules:
 - One partition is assigned to only one consumer in a group
 - One consumer can read multiple partitions
 - If consumers are more than partitions, extra consumers remain idle
 
 ## Offset Management
 Offset is a number that represents the position of the next message to read.
 
 ### Example
 Partition data:
 \`\`\`
 0 -> Order A
 1 -> Order B
 2 -> Order C
 \`\`\`
 
 If consumer processed message 1:
 - Next offset = 2
 
 Offsets are stored per partition and per consumer group.
 
 This allows:
 - Different consumer groups to read same data independently
 
 ## Auto Commit vs Manual Commit
 
 ### Auto Commit
 Kafka updates offset automatically at intervals.
 
 Pros:
 - Easy setup
 - Less code
 
 Risk:
 - If consumer crashes after reading but before processing completes,
   offset may move forward
 - This can lead to data loss
 
 ### Manual Commit
 Application commits offset only after successful processing.
 
 Pros:
 - Full control
 - Safer in production
 
 Typical flow:
 1. Read message
 2. Process message
 3. Commit offset
 
 This reduces data loss risk and gives better control over duplicates.
 
 Simple rule:
 - Beginners -> Auto commit
 - Production -> Manual commit
 
 ## auto.offset.reset (Important)
 Controls behavior when no offset is found.
 
 Options:
 - earliest -> read from beginning
 - latest -> read only new messages
 
 ## Rebalancing (Important Concept)
 Rebalancing happens when:
 - New consumer joins group
 - Existing consumer leaves/crashes
 - Topic partition count changes
 
 What Kafka does:
 - Redistributes partitions among consumers
 
 ### Example
 Partitions: P1, P2
 
 Before:
 \`\`\`
 C1 -> P1
 C2 -> P2
 \`\`\`
 
 After new consumer joins:
 \`\`\`
 C1 -> P1
 C2 -> P2
 C3 -> idle
 \`\`\`
 
 ## Impact of Rebalancing
 - Temporary pause in processing
 - Partition reassignment
 - In-flight messages may be reprocessed
 
 ## Full Flow (Simple)
 Consumer -> Broker -> Topic Partition -> Process -> Commit Offset -> Continue
 
 ## Easy Analogy
 Think of reading a book:
 
 - Consumer = Reader
 - Partition = Chapter
 - Offset = Page number
 - Consumer Group = Multiple readers sharing chapters
 - Commit = Bookmark
 
 ## Key Points to Remember
 - Consumer reads data from broker
 - Consumer group shares workload
 - Offset tracks reading position
 - Offsets are stored per group
 - Manual commit gives better control
 - Rebalancing redistributes work
 
 ## Final Simple Line
 Kafka consumers read data, track progress using offsets, and scale processing using consumer groups.
 `.replace(/^ /gm, '')
 };
 
 export default kafkaConsumersDeepDive;