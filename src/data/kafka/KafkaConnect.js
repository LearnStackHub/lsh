const kafkaConnect = {
  id: 'kafka-connect',
  title: 'Kafka Connect',
  description: 'Beginner-friendly Kafka Connect guide with source/sink concepts and full Docker setup flow',
  content: `
# Kafka Connect

Kafka Connect is used to move data between Kafka and external systems automatically.

In simple words:
- No custom coding needed in most cases
- Configure connector -> data starts flowing

## Kafka Connect Flow
\`\`\`
External System -> Source Connector -> Kafka Topic -> Sink Connector -> External System
\`\`\`

## Kafka Connect Architecture
\`\`\`
Worker
  |
  +--> Connector (Source or Sink)
           |
           +--> Tasks (parallel execution units)
\`\`\`

- Worker: runtime process that executes connectors
- Connector: logical job configuration (for example MySQL source)
- Tasks: actual parallel units doing read/write work

## What Problem Does Kafka Connect Solve?

Without Kafka Connect:
- You write custom integration code
- Hard to maintain and monitor

With Kafka Connect:
- Configure connectors
- Kafka Connect handles data movement and offsets

## Standalone vs Distributed Mode

### Standalone mode
- Single worker process
- Easy for local development/testing
- Limited scalability/fault tolerance

### Distributed mode
- Multiple workers in a cluster
- Better scalability and availability
- Recommended for production

## 1) Source Connectors (Data -> Kafka)
Source connectors bring data from external systems into Kafka.

Example:
- MySQL -> Kafka
- New row inserted -> automatically published to Kafka topic

Common use cases:
- Database -> Kafka
- Logs -> Kafka
- APIs -> Kafka

Simple idea:
- Source connector = external producer into Kafka

## 2) Sink Connectors (Kafka -> Data)
Sink connectors move Kafka records to external systems.

Example:
- Kafka -> Elasticsearch
- Kafka events indexed automatically

Common use cases:
- Kafka -> Database
- Kafka -> Data warehouse
- Kafka -> Search engine

Simple idea:
- Sink connector = external consumer from Kafka

## Full Flow (Simple)
Database -> Source Connector -> Kafka Topic -> Sink Connector -> Elasticsearch

## Offset Management (Critical Concept)
Kafka Connect tracks progress automatically.

- Stores source/sink offsets in Kafka topics
- Prevents missed/duplicate processing during restart/failover
- Enables resumable pipelines

Important config:
- \`CONNECT_OFFSET_STORAGE_TOPIC\`

## Converters (Data Format)
Converters define how data is serialized/deserialized between external system and Kafka message format.

Common converters:
- \`StringConverter\`
- \`JSONConverter\`
- \`AvroConverter\`

Simple idea:
- External format <-> Converter <-> Kafka record format

## Connector Plugins
Connectors are plugin components, not always built-in.

- Install connector plugin jars in plugin path
- Restart worker if required

Important config:
- \`CONNECT_PLUGIN_PATH\`

Examples:
- Debezium MySQL source connector
- Elasticsearch sink connector

## Data Integration Use Cases

## 1) CDC (Change Data Capture)
Track DB row changes in real time.

Examples:
- Insert row -> Kafka event
- Update row -> Kafka event
- Delete row -> Kafka event

Useful for:
- Keeping systems in sync

## 2) ETL Streaming
Extract -> Transform -> Load in continuous mode.

Example:
- Extract from DB
- Transform using stream processing
- Load to warehouse/search/index

## 3) System Synchronization
Keep multiple systems updated from one event stream.

Example:
- DB updated -> Kafka event
- Kafka distributes to cache + search + analytics

## Source Connector Config Example
\`\`\`json
{
  "name": "mysql-source",
  "config": {
    "connector.class": "io.debezium.connector.mysql.MySqlConnector",
    "database.hostname": "localhost",
    "database.port": "3306",
    "database.user": "root",
    "database.password": "root",
    "database.server.name": "dbserver1"
  }
}
\`\`\`

Note:
- Debezium is a CDC platform built on top of Kafka Connect.

## Easy Analogy
Think of Kafka Connect like a pipeline:

- Source = water entering pipe
- Kafka = storage/distribution tank
- Sink = water delivered to destination

Fully automated flow after configuration.

## Key Points to Remember
- Source connector brings data into Kafka
- Sink connector sends data out of Kafka
- No custom integration code needed for common patterns
- Great for real-time data pipelines
- Strong for CDC, ETL, and system sync

## Final Simple Line
Kafka Connect is a plug-and-play tool that moves data between Kafka and external systems without writing custom integration code.

---

## Full Kafka Connect Setup (Docker + Config)

Goal:
- MySQL -> Kafka (source connector) -> Kafka topic -> optional sink

## Step 1: Start ZooKeeper, Kafka, and Connect
Create \`docker-compose.yml\`:

\`\`\`yaml
version: '3'

services:
  zookeeper:
    image: confluentinc/cp-zookeeper:7.5.0
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
    ports:
      - "2181:2181"

  kafka:
    image: confluentinc/cp-kafka:7.5.0
    depends_on:
      - zookeeper
    ports:
      - "9092:9092"
    environment:
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1

  connect:
    image: confluentinc/cp-kafka-connect:7.5.0
    depends_on:
      - kafka
    ports:
      - "8083:8083"
    environment:
      CONNECT_BOOTSTRAP_SERVERS: kafka:9092
      CONNECT_REST_PORT: 8083
      CONNECT_GROUP_ID: "connect-group"
      CONNECT_CONFIG_STORAGE_TOPIC: "connect-configs"
      CONNECT_OFFSET_STORAGE_TOPIC: "connect-offsets"
      CONNECT_STATUS_STORAGE_TOPIC: "connect-status"
      CONNECT_KEY_CONVERTER: org.apache.kafka.connect.storage.StringConverter
      CONNECT_VALUE_CONVERTER: org.apache.kafka.connect.storage.StringConverter
      CONNECT_PLUGIN_PATH: /usr/share/java
\`\`\`

Run:
\`\`\`bash
docker-compose up -d
\`\`\`

Services:
- Kafka: \`localhost:9092\`
- Kafka Connect REST: \`localhost:8083\`

Note:
- This setup uses ZooKeeper for simplicity.
- Modern Kafka also supports KRaft mode (without ZooKeeper).

## Step 2: Verify Kafka Connect
Open:
- \`http://localhost:8083\`

Expected response (example):
\`\`\`json
{
  "version": "...",
  "commit": "...",
  "kafka_cluster_id": "..."
}
\`\`\`

## Step 3: Add MySQL service
Add MySQL in same \`docker-compose.yml\`:

\`\`\`yaml
  mysql:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: testdb
    ports:
      - "3306:3306"
\`\`\`

Restart:
\`\`\`bash
docker-compose up -d
\`\`\`

## Step 4: Create table in MySQL
\`\`\`sql
CREATE DATABASE testdb;

USE testdb;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50)
);

INSERT INTO users(name) VALUES ('John');
\`\`\`

## Step 5: Create source connector (MySQL -> Kafka)
\`\`\`bash
curl -X POST http://localhost:8083/connectors \\
-H "Content-Type: application/json" \\
-d '{
  "name": "mysql-source",
  "config": {
    "connector.class": "io.debezium.connector.mysql.MySqlConnector",
    "database.hostname": "mysql",
    "database.port": "3306",
    "database.user": "root",
    "database.password": "root",
    "database.server.id": "1",
    "database.server.name": "dbserver1",
    "database.include.list": "testdb",
    "table.include.list": "testdb.users",
    "database.history.kafka.bootstrap.servers": "kafka:9092",
    "database.history.kafka.topic": "schema-changes"
  }
}'
\`\`\`

## Step 6: Check topics
\`\`\`bash
docker exec -it <kafka-container> kafka-topics --bootstrap-server localhost:9092 --list
\`\`\`

You should see topic like:
- \`dbserver1.testdb.users\`

## Step 7: Test real-time flow
Insert new row:

\`\`\`sql
INSERT INTO users(name) VALUES ('Alice');
\`\`\`

Read events:
\`\`\`bash
docker exec -it <kafka-container> kafka-console-consumer \\
  --bootstrap-server localhost:9092 \\
  --topic dbserver1.testdb.users \\
  --from-beginning
\`\`\`

Expected event sample:
\`\`\`json
{
  "payload": {
    "after": {
      "id": 2,
      "name": "Alice"
    }
  }
}
\`\`\`

## Step 8 (Optional): Add sink connector
Example targets:
- Elasticsearch
- PostgreSQL/MySQL sink
- Warehouse sink

## Very Important End-to-End Flow
MySQL -> Source Connector -> Kafka Topic -> Consumer/Sink

## What You Learned
- Kafka Connect runs as dedicated service
- Source connector pulls data into Kafka
- Data flows automatically after setup
- Real-time integration without writing pipeline code

## Real-World Example
E-commerce:
- User registers in MySQL
- Connector emits change event to Kafka
- Kafka distributes to analytics, notification, search

## Final Simple Line
Kafka Connect automates data pipelines between databases and Kafka so teams can build reliable integrations without custom connector code.
`
};

export default kafkaConnect;
