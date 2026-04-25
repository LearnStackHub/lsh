const kafkaApis = {
  id: 'kafka-apis',
  title: 'Kafka APIs',
  description: 'Beginner-friendly guide to Producer, Consumer, Admin, and Streams APIs with full Spring Boot working example',
  content: `
# Kafka APIs

Kafka provides different APIs to interact with the system.

In simple words:
- APIs are tools to send, read, manage, and process data in Kafka.

## Kafka APIs Overview
\`\`\`
Producer API  -> Send data
Consumer API  -> Read data
Admin API     -> Manage Kafka cluster
Streams API   -> Process data in real-time
\`\`\`

Important:
- All APIs interact with Kafka brokers.
- Practical data path: Producer -> Broker -> Topic Partition -> Consumer

## 1) Producer API
Used to send data to Kafka topics.

What it does:
- Publish messages
- Choose topic/partition
- Configure retries, acknowledgments, batching

Producer sends data to Kafka brokers, and brokers persist data in topic partitions.

Example:
\`\`\`java
ProducerRecord<String, String> record =
    new ProducerRecord<>("orders", "Order Created");

producer.send(record);
\`\`\`

Simple idea:
- Producer API = sending data to Kafka

## 2) Consumer API
Used to read data from Kafka topics.

What it does:
- Subscribe to topics
- Poll/read records
- Process data
- Commit offsets

Example:
\`\`\`java
consumer.subscribe(Arrays.asList("orders"));

ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));

for (ConsumerRecord<String, String> record : records) {
    System.out.println(record.value());
}
\`\`\`

Simple idea:
- Consumer API = reading data from Kafka

Poll note:
- Kafka consumers internally fetch data using a poll loop.
- Spring Kafka (\`@KafkaListener\`) abstracts that polling complexity.

## 3) Admin API
Used to manage Kafka cluster resources.

What it does:
- Create/delete topics
- Increase partition count
- Read metadata and configs

Example:
\`\`\`java
adminClient.createTopics(List.of(
    new NewTopic("orders", 3, (short) 2)
));
\`\`\`

Simple idea:
- Admin API = managing Kafka setup

Real-world use cases:
- Increase partition count as traffic grows
- Update configs for performance/reliability tuning
- Inspect cluster metadata for troubleshooting

## 4) Streams API
Used to build real-time stream processing apps.

What it does:
- Filter
- Transform
- Aggregate
- Route processed streams

Example:
\`\`\`java
KStream<String, String> stream = builder.stream("orders");

stream
    .filter((key, value) -> value.contains("Order"))
    .to("filtered-orders");
\`\`\`

Simple idea:
- Streams API = processing data continuously

Important:
- Streams API is continuous processing (always-on), not one-time batch processing.

## Full Flow (Simple)
- Producer -> Kafka -> Consumer
- Admin -> manages cluster/topic setup
- Streams -> processes/derives new streams

## Easy Analogy
Think Kafka like a restaurant:

- Producer API -> chef preparing food
- Consumer API -> customer receiving food
- Admin API -> manager organizing kitchen
- Streams API -> chef transforming dishes in real-time

## Key Points to Remember
- Producer API sends data
- Consumer API reads data
- Admin API manages Kafka
- Streams API processes data

## Serialization (Important Concept)
Kafka transmits data as bytes.

- Serializer: object -> bytes (producer side)
- Deserializer: bytes -> object (consumer side)

Common serializers:
- \`StringSerializer\`
- \`StringDeserializer\`

## Final Simple Line
Kafka APIs together provide everything needed to send, read, manage, and process real-time data.

## Error Handling (Production Note)
- Producer retries handle transient send failures
- Consumer retry/error handlers can reprocess temporary failures
- Unrecoverable messages can be routed to a Dead Letter Topic (DLT)

---

## Kafka Setup + Full Working Code (Beginner Friendly)

## Step 1: Start Kafka using Docker
Install Docker, then run:

\`\`\`bash
docker run -d --name zookeeper -p 2181:2181 zookeeper
\`\`\`

\`\`\`bash
docker run -d --name kafka -p 9092:9092 \\
-e KAFKA_ZOOKEEPER_CONNECT=localhost:2181 \\
-e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 \\
-e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \\
confluentinc/cp-kafka
\`\`\`

Kafka will be available at:
- \`localhost:9092\`

Note:
- Modern Kafka versions support KRaft mode (no ZooKeeper).
- This setup uses ZooKeeper for beginner-friendly compatibility.

## Step 2: Create Spring Boot project
Add dependencies in \`pom.xml\`:

\`\`\`xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter</artifactId>
    </dependency>

    <dependency>
        <groupId>org.springframework.kafka</groupId>
        <artifactId>spring-kafka</artifactId>
    </dependency>
</dependencies>
\`\`\`

## Step 3: Configure Kafka
\`application.properties\`

\`\`\`properties
spring.kafka.bootstrap-servers=localhost:9092

# Producer
spring.kafka.producer.key-serializer=org.apache.kafka.common.serialization.StringSerializer
spring.kafka.producer.value-serializer=org.apache.kafka.common.serialization.StringSerializer

# Consumer
spring.kafka.consumer.group-id=my-group
spring.kafka.consumer.auto-offset-reset=earliest
spring.kafka.consumer.key-deserializer=org.apache.kafka.common.serialization.StringDeserializer
spring.kafka.consumer.value-deserializer=org.apache.kafka.common.serialization.StringDeserializer
\`\`\`

## Step 4: Create topic config
\`\`\`java
import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class KafkaConfig {

    @Bean
    public NewTopic topic() {
        return new NewTopic("orders", 3, (short) 1);
    }
}
\`\`\`

Topic details:
- Name: \`orders\`
- Partitions: \`3\`

## Step 5: Producer service
\`\`\`java
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducerService {

    private final KafkaTemplate<String, String> kafkaTemplate;

    public KafkaProducerService(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendMessage(String message) {
        kafkaTemplate.send("orders", message);
        System.out.println("Sent: " + message);
    }
}
\`\`\`

## Step 6: Consumer service
\`\`\`java
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumerService {

    @KafkaListener(topics = "orders", groupId = "my-group")
    public void consume(String message) {
        System.out.println("Received: " + message);
    }
}
\`\`\`

## Step 7: REST API to trigger producer
\`\`\`java
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class KafkaController {

    private final KafkaProducerService producer;

    public KafkaController(KafkaProducerService producer) {
        this.producer = producer;
    }

    @PostMapping("/send")
    public String send(@RequestParam String message) {
        producer.sendMessage(message);
        return "Message Sent";
    }
}
\`\`\`

## Step 8: Run Spring Boot app
\`\`\`bash
mvn spring-boot:run
\`\`\`

## Step 9: Test API
\`\`\`
POST http://localhost:8080/api/send?message=HelloKafka
\`\`\`

Expected console output:
\`\`\`
Sent: HelloKafka
Received: HelloKafka
\`\`\`

What you learned:
- Producer sends message
- Kafka stores and routes message
- Consumer receives message
- Topic used: \`orders\`
- Consumer group used: \`my-group\`

## Real Understanding (Final)
- API call triggers producer
- Producer sends event to Kafka topic
- Kafka stores and delivers event
- Consumer reads and processes event
`
};

export default kafkaApis;
