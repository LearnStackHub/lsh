const springCloudELK = {
  id: 'spring-cloud-elk',
  title: 'Centralized Logging with ELK Stack',
  description: 'Learn how to implement centralized logging in microservices with ELK Stack - Elasticsearch, Logstash, Kibana, structured logging, log correlation, and dashboards',
  content: `
# Centralized Logging with ELK Stack

In microservices, logs are scattered across multiple services. Finding logs for a specific request is difficult. Centralized logging solves this problem.

Let me explain what ELK Stack is and how to use it for centralized logging.

---

## Why Centralized Logging is Needed

**The Problem:**

You have 10 microservices, each with its own log files:
- user-service.log
- product-service.log
- order-service.log
- payment-service.log
- And 6 more...

When a user reports an issue:
- Which service had the problem?
- Need to check 10 different log files
- No correlation between logs
- Hard to debug issues
- Time-consuming

**The Solution:**

Centralized logging. All services send logs to one place (Elasticsearch). You can:
- Search all logs in one place
- Filter by service, time, trace ID
- Correlate logs from multiple services
- Create dashboards and visualizations
- Analyze patterns

---

## Logs in Distributed Systems

### Challenges

**Multiple Services:**
- Logs from 10+ services
- Different log formats
- Different locations

**High Volume:**
- Thousands of requests per second
- Millions of log entries per day
- Need efficient storage and search

**Correlation:**
- Need to find all logs for one request
- Trace ID helps correlate
- But logs are in different files

**Different Formats:**
- Some services use JSON
- Some use plain text
- Hard to parse and search

### Solution

**Structured Logging:**
- Use JSON format
- Consistent structure
- Easy to parse

**Include Trace ID:**
- Add trace ID to all logs
- Correlate logs by trace ID
- See complete request flow

**Centralized Storage:**
- Send all logs to Elasticsearch
- Search and filter easily
- Create visualizations

---

## Structured Logging

Instead of plain text logs, use structured JSON logs.

### Plain Text Logs (Bad)

\`\`\`
2024-01-15 10:30:45 INFO UserService - User created: 123
\`\`\`

**Problems:**
- Hard to parse
- Can't filter by fields
- Limited search capabilities

### Structured JSON Logs (Good)

\`\`\`json
{
  "timestamp": "2024-01-15T10:30:45Z",
  "level": "INFO",
  "service": "user-service",
  "traceId": "abc123",
  "spanId": "def456",
  "message": "User created",
  "userId": 123,
  "action": "CREATE_USER"
}
\`\`\`

**Benefits:**
- Easy to parse
- Can filter by any field
- Better for analysis
- Consistent structure

---

## ELK Stack

ELK Stack consists of three components:

### Elasticsearch

**What It Is:**
- Search and analytics engine
- Stores and indexes logs
- Fast search capabilities

**How It Works:**
- Stores logs as documents
- Indexes for fast search
- Distributed and scalable

### Logstash

**What It Is:**
- Data processing pipeline
- Collects, transforms, and sends logs

**How It Works:**
- Input: Receives logs (file, TCP, HTTP, etc.)
- Filter: Transforms logs (parse, add fields, etc.)
- Output: Sends to Elasticsearch

### Kibana

**What It Is:**
- Visualization tool
- Creates dashboards and visualizations

**How It Works:**
- Connects to Elasticsearch
- Creates visualizations
- Builds dashboards
- Searches and filters logs

---

## Elasticsearch Basics

### Index

Collection of documents (like a database).

**Example:**
- \`logs-2024-01-15\`
- \`logs-2024-01-16\`

**Benefits:**
- Easy to delete old logs
- Better performance
- Easier management

### Document

Single log entry. JSON object.

**Example:**
\`\`\`json
{
  "timestamp": "2024-01-15T10:30:45Z",
  "level": "INFO",
  "service": "user-service",
  "message": "User created"
}
\`\`\`

### Mapping

Schema definition. Defines fields and their types.

**Example:**
\`\`\`json
{
  "properties": {
    "timestamp": { "type": "date" },
    "level": { "type": "keyword" },
    "service": { "type": "keyword" },
    "message": { "type": "text" }
  }
}
\`\`\`

---

## Logstash Pipeline

Logstash has three stages: Input, Filter, Output.

### Input

Where logs come from.

**Types:**
- File: Read from log files
- TCP: Receive via TCP
- HTTP: Receive via HTTP
- Beats: Receive from Filebeat, etc.

**Example:**
\`\`\`
input {
  tcp {
    port => 5000
    codec => json
  }
}
\`\`\`

### Filter

Transform logs.

**Operations:**
- Parse JSON
- Add fields
- Remove fields
- Modify values

**Example:**
\`\`\`
filter {
  if [service] == "user-service" {
    mutate {
      add_field => { "environment" => "production" }
    }
  }
}
\`\`\`

### Output

Where to send logs.

**Example:**
\`\`\`
output {
  elasticsearch {
    hosts => ["http://localhost:9200"]
    index => "logs-%{+YYYY.MM.dd}"
  }
}
\`\`\`

### Complete Logstash Config

\`\`\`
input {
  tcp {
    port => 5000
    codec => json
  }
}

filter {
  if [service] == "user-service" {
    mutate {
      add_field => { "environment" => "production" }
    }
  }
  
  date {
    match => [ "timestamp", "ISO8601" ]
  }
}

output {
  elasticsearch {
    hosts => ["http://localhost:9200"]
    index => "logs-%{+YYYY.MM.dd}"
  }
}
\`\`\`

---

## Sending Logs from Spring Boot

### Step 1: Add Dependency

\`\`\`xml
<dependency>
    <groupId>net.logstash.logback</groupId>
    <artifactId>logstash-logback-encoder</artifactId>
    <version>7.2</version>
</dependency>
\`\`\`

### Step 2: Configure Logback

Create \`logback-spring.xml\`:

\`\`\`xml
<configuration>
    <include resource="org/springframework/boot/logging/logback/defaults.xml"/>
    
    <appender name="STASH" class="net.logstash.logback.appender.LogstashTcpSocketAppender">
        <destination>localhost:5000</destination>
        <encoder class="net.logstash.logback.encoder.LoggingEventCompositeJsonEncoder">
            <providers>
                <timestamp/>
                <version/>
                <logLevel/>
                <message/>
                <mdc/>
                <stackTrace/>
                <pattern>
                    <pattern>
                        {
                            "service": "user-service",
                            "traceId": "%mdc{traceId}",
                            "spanId": "%mdc{spanId}"
                        }
                    </pattern>
                </pattern>
            </providers>
        </encoder>
    </appender>
    
    <root level="INFO">
        <appender-ref ref="STASH" />
        <appender-ref ref="CONSOLE" />
    </root>
</configuration>
\`\`\`

**Explanation:**
- STASH appender sends logs to Logstash (port 5000)
- Encoder formats logs as JSON
- Includes trace ID and span ID from MDC (Sleuth adds these)

### Step 3: Logs Are Sent Automatically

Your application logs are automatically sent to Logstash, which forwards them to Elasticsearch.

---

## Kibana Dashboards

### Step 1: Access Kibana

Visit: http://localhost:5601

### Step 2: Create Index Pattern

1. Go to Management → Index Patterns
2. Create index pattern: \`logs-*\`
3. Select timestamp field: \`@timestamp\`

### Step 3: Create Visualizations

**Line Chart - Errors Over Time:**
1. Go to Visualize
2. Create line chart
3. Y-axis: Count
4. X-axis: Date histogram
5. Filter: level = ERROR

**Pie Chart - Errors by Service:**
1. Create pie chart
2. Slice by: service
3. Filter: level = ERROR

**Table - Top Error Messages:**
1. Create data table
2. Rows: message.keyword
3. Sort by: Count (descending)
4. Filter: level = ERROR

### Step 4: Create Dashboard

1. Go to Dashboard
2. Add visualizations
3. Arrange and save

---

## Correlating Logs with Trace IDs

### Search by Trace ID

In Kibana, search by trace ID:

\`\`\`
traceId:abc123
\`\`\`

You'll see all logs for that request across all services.

### Example

**User Service logs:**
\`\`\`json
{
  "timestamp": "2024-01-15T10:30:45Z",
  "service": "user-service",
  "traceId": "abc123",
  "message": "Received request"
}
\`\`\`

**Product Service logs:**
\`\`\`json
{
  "timestamp": "2024-01-15T10:30:46Z",
  "service": "product-service",
  "traceId": "abc123",
  "message": "Received request from user service"
}
\`\`\`

**Search: traceId:abc123**

Shows both logs together, giving you the complete request flow.

---

## Log Indexing Strategies

### Daily Indices

Create one index per day:
- \`logs-2024-01-15\`
- \`logs-2024-01-16\`
- \`logs-2024-01-17\`

**Benefits:**
- Easy to delete old logs
- Better performance
- Easier management

**Configuration:**

\`\`\`
output {
  elasticsearch {
    hosts => ["http://localhost:9200"]
    index => "logs-%{+YYYY.MM.dd}"
  }
}
\`\`\`

### Weekly Indices

Create one index per week:
- \`logs-2024-week-01\`
- \`logs-2024-week-02\`

**When to Use:**
- Lower log volume
- Longer retention needed

---

## Log Retention Policies

Delete old logs to save space.

### Delete by Age

\`\`\`bash
# Delete logs older than 30 days
curl -X DELETE "http://localhost:9200/logs-*/_query" -H 'Content-Type: application/json' -d'
{
  "query": {
    "range": {
      "@timestamp": {
        "lt": "now-30d"
      }
    }
  }
}'
\`\`\`

### Index Lifecycle Management

Use Elasticsearch Index Lifecycle Management (ILM) to automate:

1. Create policy
2. Apply to index template
3. Automatically deletes old indices

---

## Real-World Example

Complete setup:

**1. Run ELK Stack:**

\`\`\`bash
# Elasticsearch
docker run -d -p 9200:9200 -p 9300:9300 elasticsearch:7.17.0

# Logstash
docker run -d -p 5000:5000 logstash:7.17.0

# Kibana
docker run -d -p 5601:5601 kibana:7.17.0
\`\`\`

**2. Configure Logstash:**

\`\`\`
input {
  tcp {
    port => 5000
    codec => json
  }
}

output {
  elasticsearch {
    hosts => ["http://localhost:9200"]
    index => "logs-%{+YYYY.MM.dd}"
  }
}
\`\`\`

**3. Configure Spring Boot:**

\`\`\`xml
<dependency>
    <groupId>net.logstash.logback</groupId>
    <artifactId>logstash-logback-encoder</artifactId>
    <version>7.2</version>
</dependency>
\`\`\`

\`\`\`xml
<appender name="STASH" class="net.logstash.logback.appender.LogstashTcpSocketAppender">
    <destination>localhost:5000</destination>
    <encoder class="net.logstash.logback.encoder.LoggingEventCompositeJsonEncoder">
        <providers>
            <timestamp/>
            <logLevel/>
            <message/>
            <mdc/>
        </providers>
    </encoder>
</appender>
\`\`\`

**4. View in Kibana:**

- Go to http://localhost:5601
- Create index pattern: \`logs-*\`
- Search and visualize logs

---

## Best Practices

### 1. Use Structured Logging

Always use JSON format for logs. Makes parsing and searching easier.

### 2. Include Trace ID

Always include trace ID in logs. Enables correlation across services.

### 3. Set Appropriate Log Levels

- ERROR: Errors that need attention
- WARN: Warnings
- INFO: Important events
- DEBUG: Debug information (disable in production)

### 4. Index by Date

Use daily indices for better performance and easier management.

### 5. Set Retention Policies

Delete old logs to save space. Keep logs for 30-90 days typically.

### 6. Monitor Log Volume

Monitor how many logs you're generating. Too many can overwhelm Elasticsearch.

---

## Summary

Centralized logging with ELK Stack provides:

**Key Components:**
- Elasticsearch: Stores and indexes logs
- Logstash: Collects and processes logs
- Kibana: Visualizes and searches logs

**Benefits:**
- Search all logs in one place
- Correlate logs by trace ID
- Create dashboards and visualizations
- Analyze patterns
- Debug issues faster

**What's Next?**

Now that you understand centralized logging:

1. Learn [Distributed Tracing](/tutorial/spring-cloud-distributed-tracing) to add trace IDs
2. Set up [Config Server](/tutorial/spring-cloud-config-server) for configuration
3. Master [Service Discovery](/tutorial/spring-cloud-eureka) for service location
4. Use [API Gateway](/tutorial/spring-cloud-api-gateway) for routing
`,
  code: `// Logback Configuration (logback-spring.xml)
<configuration>
    <include resource="org/springframework/boot/logging/logback/defaults.xml"/>
    
    <appender name="STASH" class="net.logstash.logback.appender.LogstashTcpSocketAppender">
        <destination>localhost:5000</destination>
        <encoder class="net.logstash.logback.encoder.LoggingEventCompositeJsonEncoder">
            <providers>
                <timestamp/>
                <version/>
                <logLevel/>
                <message/>
                <mdc/>
                <stackTrace/>
                <pattern>
                    <pattern>
                        {
                            "service": "user-service",
                            "traceId": "%mdc{traceId}",
                            "spanId": "%mdc{spanId}"
                        }
                    </pattern>
                </pattern>
            </providers>
        </encoder>
    </appender>
    
    <root level="INFO">
        <appender-ref ref="STASH" />
        <appender-ref ref="CONSOLE" />
    </root>
</configuration>

// Logstash Configuration (logstash.conf)
input {
  tcp {
    port => 5000
    codec => json
  }
}

filter {
  date {
    match => [ "timestamp", "ISO8601" ]
  }
}

output {
  elasticsearch {
    hosts => ["http://localhost:9200"]
    index => "logs-%{+YYYY.MM.dd}"
  }
}`
};

export default springCloudELK;

