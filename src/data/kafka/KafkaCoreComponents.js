const kafkaCoreComponents = {
   id: 'kafka-core-components',
   title: 'Kafka Core Components',
   description: 'Simple explanation of producers, consumers, consumer groups, and offsets with examples',
   content: `
 # Kafka Core Components
 
 These are the main parts of Kafka that make the system work.
 
 In simple words:
 - Who sends data
 - Where data is stored
 - Who reads data
 - How Kafka tracks progress
 
 ## Core Components Flow
 \`\`\`
 Producer
    |
    v
 Broker (Kafka Server)
    |
    v
 Topic (Partitions)
    |
    v
 Consumer Group
    |
    v
 Consumer
    |
    v
 Offset Tracking (per partition)
 \`\`\`
 
 ## Producers (Data Senders)
 A producer is an application that sends data to Kafka.
 
 Examples:
 - Order Service sends -> "Order Placed"
 - Payment Service sends -> "Payment Completed"
 
 Producer job:
 - Write messages to Kafka topics through brokers
 
 ## Consumers (Data Readers)
 A consumer is an application that reads data from Kafka.
 
 Examples:
 - Notification Service reads -> sends SMS/Email
 - Analytics Service reads -> updates dashboard
 
 Consumer job:
 - Read and process topic data
 
 ## Consumer Groups (Very Important)
 A consumer group is a team of consumers working together.
 
 Why it is needed:
 - To share workload
 - To process data faster
 
 ### Simple Example
 Topic has 3 partitions.
 
 Consumer Group:
 - Consumer 1 -> Partition 1
 - Consumer 2 -> Partition 2
 - Consumer 3 -> Partition 3
 
 What happens:
 - Work is divided automatically
 - No duplication inside the same consumer group
 
 Important rules:
 - One partition is assigned to only one consumer in the same group
 - One consumer can read multiple partitions
 - If consumers are more than partitions, extra consumers remain idle
 
 ## Offsets (Tracking System)
 An offset is a number that tells which message has already been read.
 
 ### Example
 Partition data:
 \`\`\`
 0 -> Order A
 1 -> Order B
 2 -> Order C
 \`\`\`
 
 If consumer has read up to message 1:
 - Offset = 1
 
 Next read starts from:
 - 2
 
 Offsets are maintained per partition and per consumer group.
 
 Why offsets are important:
 - Track progress
 - Avoid reprocessing
 - Help recovery after failure/restart
 
 ## Full Flow (Very Simple)
 Producer -> Broker -> Topic (Partitions) -> Consumer Group -> Consumer
 
 ## Easy Analogy
 Think Kafka like a YouTube playlist:
 
 - Producer = Upload video
 - Kafka = Platform
 - Consumer = Viewer
 - Consumer Group = Multiple viewers sharing videos
 - Offset = Last watched position
 
 ## Key Points to Remember
 - Producer sends data
 - Broker stores data
 - Topics are divided into partitions
 - Consumer Group shares workload
 - Offset tracks progress
 
 ## Final Simple Line
 Kafka works by sending data (Producer), storing it in partitions, processing it using consumer groups, and tracking progress using offsets.
 `.replace(/^ /gm, '')
 };
 
 export default kafkaCoreComponents;