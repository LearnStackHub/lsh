const kafkaWithSpringBoot = {
    id: 'kafka-with-spring-boot',
    title: 'Kafka with Spring Boot',
    description:
      'End-to-end Spring Boot Kafka tutorial with Docker setup, producer, consumer, REST API, testing steps, and common connection errors with fixes',
    content: `
  # Kafka with Spring Boot
  
  This tutorial explains how to connect Spring Boot with Kafka from start to finish.
  
  In this example:
  
  - Spring Boot REST API receives a message
  - Producer sends the message to Kafka
  - Kafka stores the message in a topic
  - Consumer reads the message from Kafka
  - Output is printed in the console
  
  ## Project Flow
  
  \`\`\`
  REST API
     |
     v
  Spring Boot Producer
     |
     v
  Kafka Broker
     |
     v
  Topic: orders
     |
     v
  Spring Boot Consumer
  \`\`\`
  
  ## Step 1: Start Kafka Using Docker
  
  Create a file named:
  
  \`\`\`
  docker-compose.yml
  \`\`\`
  
  Add this code:
  
  \`\`\`yaml
  version: '3.8'
  
  services:
    zookeeper:
      image: confluentinc/cp-zookeeper:7.5.0
      container_name: zookeeper
      ports:
        - "2181:2181"
      environment:
        ZOOKEEPER_CLIENT_PORT: 2181
  
    kafka:
      image: confluentinc/cp-kafka:7.5.0
      container_name: kafka
      depends_on:
        - zookeeper
      ports:
        - "9092:9092"
      environment:
        KAFKA_BROKER_ID: 1
        KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
        KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092
        KAFKA_LISTENERS: PLAINTEXT://0.0.0.0:9092
        KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
  \`\`\`
  
  Run Kafka:
  
  \`\`\`bash
  docker-compose up -d
  \`\`\`
  
  Check containers:
  
  \`\`\`bash
  docker ps
  \`\`\`
  
  Kafka should run on:
  
  \`\`\`
  localhost:9092
  \`\`\`

  ## Alternative: Run Kafka Manually (Without Docker)

  If you do not want Docker, you can run Kafka directly from downloaded binaries.

  ### Prerequisites
  - Java 17+ installed
  - Kafka binary downloaded from Apache Kafka site

  ### 1) Extract Kafka
  Extract the downloaded archive, for example:

  \`\`\`
  C:\\tools\\kafka
  \`\`\`

  ### 2) Open two terminals in Kafka folder
  You will run ZooKeeper in one terminal and Kafka broker in another.

  ### 3) Start ZooKeeper
  For Windows:

  \`\`\`bash
  .\\bin\\windows\\zookeeper-server-start.bat .\\config\\zookeeper.properties
  \`\`\`

  For macOS/Linux:

  \`\`\`bash
  ./bin/zookeeper-server-start.sh ./config/zookeeper.properties
  \`\`\`

  ### 4) Start Kafka Broker
  For Windows:

  \`\`\`bash
  .\\bin\\windows\\kafka-server-start.bat .\\config\\server.properties
  \`\`\`

  For macOS/Linux:

  \`\`\`bash
  ./bin/kafka-server-start.sh ./config/server.properties
  \`\`\`

  ### 5) Create Topic
  For Windows:

  \`\`\`bash
  .\\bin\\windows\\kafka-topics.bat --bootstrap-server localhost:9092 --create --topic orders --partitions 3 --replication-factor 1
  \`\`\`

  For macOS/Linux:

  \`\`\`bash
  ./bin/kafka-topics.sh --bootstrap-server localhost:9092 --create --topic orders --partitions 3 --replication-factor 1
  \`\`\`

  ### 6) Verify Topic
  For Windows:

  \`\`\`bash
  .\\bin\\windows\\kafka-topics.bat --bootstrap-server localhost:9092 --list
  \`\`\`

  For macOS/Linux:

  \`\`\`bash
  ./bin/kafka-topics.sh --bootstrap-server localhost:9092 --list
  \`\`\`

  If you see \`orders\` in list, Kafka manual setup is ready.
  
  ## Step 2: Create Spring Boot Project
  
  Project structure:
  
  \`\`\`
  kafka-demo
   └── src
       └── main
           ├── java
           │   └── com.example.kafkademo
           │       ├── KafkaDemoApplication.java
           │       ├── config
           │       │   └── KafkaTopicConfig.java
           │       ├── controller
           │       │   └── KafkaController.java
           │       └── service
           │           ├── KafkaProducerService.java
           │           └── KafkaConsumerService.java
           └── resources
               └── application.properties
  \`\`\`
  
  ## Step 3: pom.xml
  
  \`\`\`xml
  <project xmlns="http://maven.apache.org/POM/4.0.0"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  
      <modelVersion>4.0.0</modelVersion>
  
      <parent>
          <groupId>org.springframework.boot</groupId>
          <artifactId>spring-boot-starter-parent</artifactId>
          <version>3.2.5</version>
          <relativePath/>
      </parent>
  
      <groupId>com.example</groupId>
      <artifactId>kafka-demo</artifactId>
      <version>0.0.1-SNAPSHOT</version>
  
      <properties>
          <java.version>17</java.version>
      </properties>
  
      <dependencies>
  
          <dependency>
              <groupId>org.springframework.boot</groupId>
              <artifactId>spring-boot-starter-web</artifactId>
          </dependency>
  
          <dependency>
              <groupId>org.springframework.kafka</groupId>
              <artifactId>spring-kafka</artifactId>
          </dependency>
  
      </dependencies>
  
      <build>
          <plugins>
              <plugin>
                  <groupId>org.springframework.boot</groupId>
                  <artifactId>spring-boot-maven-plugin</artifactId>
              </plugin>
          </plugins>
      </build>
  
  </project>
  \`\`\`
  
  ## Step 4: application.properties
  
  \`\`\`properties
  server.port=8080
  
  spring.kafka.bootstrap-servers=localhost:9092
  
  spring.kafka.consumer.group-id=order-group
  spring.kafka.consumer.auto-offset-reset=earliest
  
  spring.kafka.producer.key-serializer=org.apache.kafka.common.serialization.StringSerializer
  spring.kafka.producer.value-serializer=org.apache.kafka.common.serialization.StringSerializer
  
  spring.kafka.consumer.key-deserializer=org.apache.kafka.common.serialization.StringDeserializer
  spring.kafka.consumer.value-deserializer=org.apache.kafka.common.serialization.StringDeserializer
  \`\`\`
  
  ## Step 5: Main Class
  
  \`\`\`java
  package com.example.kafkademo;
  
  import org.springframework.boot.SpringApplication;
  import org.springframework.boot.autoconfigure.SpringBootApplication;
  
  @SpringBootApplication
  public class KafkaDemoApplication {
  
      public static void main(String[] args) {
          SpringApplication.run(KafkaDemoApplication.class, args);
      }
  }
  \`\`\`
  
  ## Step 6: Kafka Topic Config
  
  \`\`\`java
  package com.example.kafkademo.config;
  
  import org.apache.kafka.clients.admin.NewTopic;
  import org.springframework.context.annotation.Bean;
  import org.springframework.context.annotation.Configuration;
  
  @Configuration
  public class KafkaTopicConfig {
  
      @Bean
      public NewTopic ordersTopic() {
          return new NewTopic("orders", 3, (short) 1);
      }
  }
  \`\`\`
  
  ## Step 7: Producer Service
  
  \`\`\`java
  package com.example.kafkademo.service;
  
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
          System.out.println("Message sent to Kafka: " + message);
      }
  }
  \`\`\`
  
  ## Step 8: Consumer Service
  
  \`\`\`java
  package com.example.kafkademo.service;
  
  import org.springframework.kafka.annotation.KafkaListener;
  import org.springframework.stereotype.Service;
  
  @Service
  public class KafkaConsumerService {
  
      @KafkaListener(topics = "orders", groupId = "order-group")
      public void consume(String message) {
          System.out.println("Message received from Kafka: " + message);
      }
  }
  \`\`\`
  
  ## Step 9: REST Controller
  
  \`\`\`java
  package com.example.kafkademo.controller;
  
  import com.example.kafkademo.service.KafkaProducerService;
  import org.springframework.web.bind.annotation.GetMapping;
  import org.springframework.web.bind.annotation.RequestParam;
  import org.springframework.web.bind.annotation.RestController;
  
  @RestController
  public class KafkaController {
  
      private final KafkaProducerService producerService;
  
      public KafkaController(KafkaProducerService producerService) {
          this.producerService = producerService;
      }
  
      @GetMapping("/send")
      public String sendMessage(@RequestParam String message) {
          producerService.sendMessage(message);
          return "Message sent successfully: " + message;
      }
  }
  \`\`\`
  
  ## Step 10: Run Spring Boot Application
  
  Run:
  
  \`\`\`bash
  mvn spring-boot:run
  \`\`\`
  
  Test in browser or Postman:
  
  \`\`\`
  http://localhost:8080/send?message=HelloKafka
  \`\`\`
  
  Expected console output:
  
  \`\`\`
  Message sent to Kafka: HelloKafka
  Message received from Kafka: HelloKafka
  \`\`\`
  
  ## Step 11: Verify Topic Manually
  
  Check topic list:
  
  \`\`\`bash
  docker exec -it kafka kafka-topics --bootstrap-server localhost:9092 --list
  \`\`\`
  
  Expected:
  
  \`\`\`
  orders
  \`\`\`
  
  Consume manually:
  
  \`\`\`bash
  docker exec -it kafka kafka-console-consumer \\
    --bootstrap-server localhost:9092 \\
    --topic orders \\
    --from-beginning
  \`\`\`
  
  Produce manually:
  
  \`\`\`bash
  docker exec -it kafka kafka-console-producer \\
    --bootstrap-server localhost:9092 \\
    --topic orders
  \`\`\`
  
  Type:
  
  \`\`\`
  Testing from console
  \`\`\`
  
  Spring Boot consumer should receive it.
  
  ## Common Errors and Fixes
  
  ## Error 1: Connection to node -1 could not be established
  
  Error:
  
  \`\`\`
  Connection to node -1 (localhost/127.0.0.1:9092) could not be established
  \`\`\`
  
  Reason:
  
  Kafka is not running or wrong bootstrap server.
  
  Fix:
  
  \`\`\`bash
  docker ps
  \`\`\`
  
  Check Kafka container is running.
  
  Also verify:
  
  \`\`\`properties
  spring.kafka.bootstrap-servers=localhost:9092
  \`\`\`
  
  ## Error 2: Topic not found
  
  Error:
  
  \`\`\`
  UNKNOWN_TOPIC_OR_PARTITION
  \`\`\`
  
  Reason:
  
  Topic is not created.
  
  Fix:
  
  Either allow Spring Boot to create topic using NewTopic bean or create manually:
  
  \`\`\`bash
  docker exec -it kafka kafka-topics \\
    --bootstrap-server localhost:9092 \\
    --create \\
    --topic orders \\
    --partitions 3 \\
    --replication-factor 1
  \`\`\`
  
  ## Error 3: No resolvable bootstrap urls
  
  Error:
  
  \`\`\`
  No resolvable bootstrap urls given in bootstrap.servers
  \`\`\`
  
  Reason:
  
  Wrong Kafka server configuration.
  
  Fix:
  
  Use:
  
  \`\`\`properties
  spring.kafka.bootstrap-servers=localhost:9092
  \`\`\`
  
  Do not leave it empty.
  
  ## Error 4: Serialization error
  
  Error:
  
  \`\`\`
  SerializationException
  \`\`\`
  
  Reason:
  
  Producer serializer and message type do not match.
  
  Fix:
  
  For string messages, use:
  
  \`\`\`properties
  spring.kafka.producer.key-serializer=org.apache.kafka.common.serialization.StringSerializer
  spring.kafka.producer.value-serializer=org.apache.kafka.common.serialization.StringSerializer
  \`\`\`
  
  For consumer:
  
  \`\`\`properties
  spring.kafka.consumer.key-deserializer=org.apache.kafka.common.serialization.StringDeserializer
  spring.kafka.consumer.value-deserializer=org.apache.kafka.common.serialization.StringDeserializer
  \`\`\`
  
  ## Error 5: Consumer not receiving messages
  
  Possible reasons:
  
  1. Wrong topic name
  2. Wrong consumer group
  3. Message already consumed
  4. auto-offset-reset is latest
  
  Fix:
  
  Use:
  
  \`\`\`properties
  spring.kafka.consumer.auto-offset-reset=earliest
  \`\`\`
  
  Also check topic name:
  
  \`\`\`java
  @KafkaListener(topics = "orders", groupId = "order-group")
  \`\`\`
  
  ## Error 6: Docker Kafka starts but Spring Boot cannot connect
  
  Reason:
  
  Wrong advertised listener.
  
  Fix:
  
  Use this in docker-compose:
  
  \`\`\`yaml
  KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092
  \`\`\`
  
  For Spring Boot running outside Docker, localhost is correct.
  
  If Spring Boot also runs inside Docker, use:
  
  \`\`\`
  kafka:9092
  \`\`\`
  
  ## Error 7: Port already in use
  
  Error:
  
  \`\`\`
  Port 9092 is already allocated
  \`\`\`
  
  Reason:
  
  Another Kafka instance is already running.
  
  Fix:
  
  Stop old container:
  
  \`\`\`bash
  docker stop kafka
  docker rm kafka
  \`\`\`
  
  Then restart:
  
  \`\`\`bash
  docker-compose up -d
  \`\`\`
  
  ## Error 8: Replication factor larger than available brokers
  
  Error:
  
  \`\`\`
  Replication factor: 3 larger than available brokers: 1
  \`\`\`
  
  Reason:
  
  You are running only one Kafka broker but topic expects replication factor 3.
  
  Fix:
  
  Use:
  
  \`\`\`java
  return new NewTopic("orders", 3, (short) 1);
  \`\`\`
  
  For local setup, replication factor should be 1.
  
  ## Error 9: Group authorization failed
  
  Error:
  
  \`\`\`
  GROUP_AUTHORIZATION_FAILED
  \`\`\`
  
  Reason:
  
  Kafka security ACLs are enabled and group permission is missing.
  
  Fix:
  
  Give group access or disable ACLs in local setup.
  
  ## Error 10: Message sent but consumer output not visible
  
  Reason:
  
  Consumer may not be running or logs are not visible.
  
  Fix:
  
  Check application console.
  
  Also test manually:
  
  \`\`\`bash
  docker exec -it kafka kafka-console-consumer \\
    --bootstrap-server localhost:9092 \\
    --topic orders \\
    --from-beginning
  \`\`\`
  
  ## Final Understanding
  
  In this setup:
  
  1. User calls REST API
  2. Controller receives request
  3. Producer sends message to Kafka topic
  4. Kafka stores message in orders topic
  5. Consumer listens to orders topic
  6. Consumer receives and processes message
  
  ## Key Points to Remember
  
  - Kafka must be running before Spring Boot starts
  - Producer sends messages using KafkaTemplate
  - Consumer reads messages using @KafkaListener
  - Topic stores messages
  - Consumer group manages message consumption
  - Serialization must match message type
  - Local Kafka usually uses replication factor 1
  - Most connection errors happen because Kafka is not running or advertised listener is wrong
  
  ## Final Simple Line
  
  Spring Boot with Kafka allows applications to communicate asynchronously by sending messages to Kafka topics and consuming them through listener-based consumers.
  `.replace(/^  /gm, '')
  };
  
  export default kafkaWithSpringBoot;