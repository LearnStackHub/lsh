const kafkaSecurity = {
   id: 'kafka-security',
   title: 'Security in Kafka',
   description: 'Beginner-friendly Kafka security guide covering authentication, authorization, ACLs, and encryption',
   content: `
 # Security in Kafka
 
 Kafka security ensures:
 - Only authorized users access data
 - Data is protected during transfer
 
 In simple words:
 - Who can access Kafka
 - What actions they can perform
 - How data is protected
 
 ## Kafka Security Flow
 \`\`\`
 Client
    |
    v
 Secure Connection (SSL/SASL)
    |
    v
 Authentication (Who are you?)
    |
    v
 Authorization (What can you do?)
    |
    v
 Encrypted Data Transfer
 \`\`\`
 
 ## 1) Authentication (Who Are You?)
 
 Kafka verifies identity of clients (producers, consumers, admin tools).
 
 ### SSL Authentication
 - Uses certificates
 - Strong and secure
 - Common in production
 
 ### SASL Authentication
 Supports multiple mechanisms:
 - PLAIN (username/password)
 - SCRAM (secure password hashing)
 - GSSAPI (Kerberos)
 
 Example:
 \`\`\`properties
 security.protocol=SASL_PLAINTEXT
 sasl.mechanism=PLAIN
 sasl.jaas.config=org.apache.kafka.common.security.plain.PlainLoginModule required \\
 username="user" password="pass";
 \`\`\`
 
 Simple idea:
 - Authentication = login system
 
 ## Security Protocols (Important)
 
 Kafka supports:
 
 - PLAINTEXT -> no security
 - SSL -> encryption + certificate auth
 - SASL_PLAINTEXT -> auth without encryption
 - SASL_SSL -> auth + encryption (recommended)
 
 ## 2) Authorization (What Can You Do?)
 
 Kafka uses ACLs (Access Control Lists).
 
 Controls:
 - Read access
 - Write access
 - Topic creation/deletion
 
 Example:
 \`\`\`bash
 kafka-acls --bootstrap-server localhost:9092 \\
   --add --allow-principal User:alice \\
   --operation Read --topic orders
 \`\`\`
 
 Simple idea:
 - Authorization = permission system
 
 ## 3) Encryption (Protect Data)
 
 Kafka uses TLS (modern SSL) for encryption.
 
 Why needed:
 - Prevent data interception
 - Secure communication between systems
 
 Flow:
 - Producer -> encrypted -> Kafka -> encrypted -> Consumer
 
 Simple idea:
 - Like HTTPS for APIs
 
 ## Inter-Broker Security
 
 Brokers also communicate with each other.
 
 - Must use secure protocols
 - Important for cluster safety
 
 ## Broker Configuration (Important)
 
 Security is mainly configured on Kafka server.
 
 Example:
 \`\`\`properties
 listeners=SASL_SSL://localhost:9092
 security.inter.broker.protocol=SASL_SSL
 \`\`\`
 
 ## Common Issues
 
 - Using PLAINTEXT in production
 - Incorrect ACL rules
 - Wrong SASL configuration
 - Certificate mismatch
 
 ## Easy Analogy
 
 Think of Kafka like a bank:
 
 - Authentication = login
 - Authorization = account permissions
 - Encryption = secure network channel
 
 ## Key Points to Remember
 
 - Authentication verifies identity
 - Authorization controls access
 - Encryption protects data
 - SASL and SSL provide security mechanisms
 - Use SASL_SSL for production systems
 
 ## Final Simple Line
 
 Kafka security ensures only authenticated and authorized users can access data, while encryption protects communication between clients and brokers.
 `.replace(/^ /gm, '')
 };
 
 export default kafkaSecurity;