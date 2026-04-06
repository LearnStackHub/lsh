const serialization = {
  id: 'serialization',
  title: 'Serialization in Java',
  description: 'Learn how to convert objects to byte streams and vice versa',
  content: `
# Serialization in Java

Serialization is the process of converting an object's state into a byte stream, and deserialization is the reverse process of recreating the object from the byte stream.

## Why Serialization?

- **Persistence**: Save object state to file/database
- **Network Transfer**: Send objects over network
- **Caching**: Store objects in memory/disk cache
- **Deep Copy**: Create exact copy of objects

## How to Make a Class Serializable

\`\`\`java
import java.io.Serializable;

public class User implements Serializable {
    private static final long serialVersionUID = 1L;
    
    private String name;
    private String email;
    // transient fields are not serialized
    private transient String password;
}
\`\`\`

## Key Concepts

| Concept | Description |
|---------|-------------|
| Serializable | Marker interface for serialization |
| serialVersionUID | Version control for serialized class |
| transient | Fields excluded from serialization |
| ObjectOutputStream | Writes objects to stream |
| ObjectInputStream | Reads objects from stream |

## 🏢 Real-Time Project Example: E-Commerce Session Management

\`\`\`java
// Real-Time: Shopping Cart Serialization
// Used for session persistence in e-commerce

public class CartSerialization {
    public static void main(String[] args) {
        System.out.println("🛒 SHOPPING CART SERIALIZATION");
        System.out.println("================================");
        
        // Why serialize shopping cart?
        System.out.println("\\n📋 USE CASES:");
        System.out.println("─".repeat(50));
        System.out.println("1. Save cart when user logs out");
        System.out.println("2. Restore cart when user returns");
        System.out.println("3. Share cart across server instances");
        System.out.println("4. Cache cart in Redis/Memcached");
        
        // Serializable Cart class
        System.out.println("\\n📦 SERIALIZABLE SHOPPING CART:");
        System.out.println("─".repeat(50));
        
        System.out.println("\\nimport java.io.Serializable;");
        System.out.println("import java.util.List;");
        System.out.println("\\npublic class ShoppingCart implements Serializable {");
        System.out.println("    private static final long serialVersionUID = 1L;");
        System.out.println("    ");
        System.out.println("    private String cartId;");
        System.out.println("    private String customerId;");
        System.out.println("    private List<CartItem> items;");
        System.out.println("    private double totalAmount;");
        System.out.println("    private LocalDateTime createdAt;");
        System.out.println("    ");
        System.out.println("    // transient - not saved (recalculated)");
        System.out.println("    private transient double discount;");
        System.out.println("    ");
        System.out.println("    // getters, setters...");
        System.out.println("}");
        
        System.out.println("\\npublic class CartItem implements Serializable {");
        System.out.println("    private static final long serialVersionUID = 1L;");
        System.out.println("    ");
        System.out.println("    private String productId;");
        System.out.println("    private String productName;");
        System.out.println("    private int quantity;");
        System.out.println("    private double price;");
        System.out.println("}");
        
        // Serialization process
        System.out.println("\\n💾 SERIALIZATION PROCESS:");
        System.out.println("─".repeat(50));
        
        System.out.println("\\n// Save cart to file");
        System.out.println("public void saveCart(ShoppingCart cart) {");
        System.out.println("    try (ObjectOutputStream oos = new ObjectOutputStream(");
        System.out.println("            new FileOutputStream(\\"cart_\\" + cart.getCartId() + \\".ser\\"))) {");
        System.out.println("        oos.writeObject(cart);");
        System.out.println("        System.out.println(\\"Cart saved successfully!\\");");
        System.out.println("    } catch (IOException e) {");
        System.out.println("        e.printStackTrace();");
        System.out.println("    }");
        System.out.println("}");
        
        System.out.println("\\n// Load cart from file");
        System.out.println("public ShoppingCart loadCart(String cartId) {");
        System.out.println("    try (ObjectInputStream ois = new ObjectInputStream(");
        System.out.println("            new FileInputStream(\\"cart_\\" + cartId + \\".ser\\"))) {");
        System.out.println("        return (ShoppingCart) ois.readObject();");
        System.out.println("    } catch (IOException | ClassNotFoundException e) {");
        System.out.println("        return null;");
        System.out.println("    }");
        System.out.println("}");
        
        // Visualization
        System.out.println("\\n📊 SERIALIZATION FLOW:");
        System.out.println("┌─────────────────────────────────────────────────┐");
        System.out.println("│                                                 │");
        System.out.println("│  ShoppingCart Object                            │");
        System.out.println("│  ┌─────────────────────────────────────────┐   │");
        System.out.println("│  │ cartId: CART-001                        │   │");
        System.out.println("│  │ customerId: CUST-123                    │   │");
        System.out.println("│  │ items: [iPhone, AirPods]                │   │");
        System.out.println("│  │ totalAmount: $1249.98                   │   │");
        System.out.println("│  │ discount: $50 (transient - NOT saved)   │   │");
        System.out.println("│  └─────────────────────────────────────────┘   │");
        System.out.println("│                     │                           │");
        System.out.println("│                     ▼ serialize                 │");
        System.out.println("│  ┌─────────────────────────────────────────┐   │");
        System.out.println("│  │ Byte Stream: AC ED 00 05 73 72 00 0C... │   │");
        System.out.println("│  └─────────────────────────────────────────┘   │");
        System.out.println("│                     │                           │");
        System.out.println("│                     ▼ save to                   │");
        System.out.println("│  ┌─────────────────────────────────────────┐   │");
        System.out.println("│  │ 📁 cart_CART-001.ser                    │   │");
        System.out.println("│  │    (or Redis, Database, Network)        │   │");
        System.out.println("│  └─────────────────────────────────────────┘   │");
        System.out.println("│                                                 │");
        System.out.println("└─────────────────────────────────────────────────┘");
    }
}
\`\`\`

## 🏦 Real-Time Project Example: Banking Transaction Logging

\`\`\`java
// Real-Time: Transaction Serialization
// Used for audit logs and recovery

public class TransactionSerialization {
    public static void main(String[] args) {
        System.out.println("🏦 TRANSACTION SERIALIZATION");
        System.out.println("=============================");
        
        // Transaction class
        System.out.println("\\n📋 SERIALIZABLE TRANSACTION:");
        System.out.println("─".repeat(50));
        
        System.out.println("\\npublic class Transaction implements Serializable {");
        System.out.println("    private static final long serialVersionUID = 2L;");
        System.out.println("    ");
        System.out.println("    private String transactionId;");
        System.out.println("    private String accountNumber;");
        System.out.println("    private TransactionType type;");
        System.out.println("    private double amount;");
        System.out.println("    private LocalDateTime timestamp;");
        System.out.println("    private String description;");
        System.out.println("    ");
        System.out.println("    // Sensitive data - NOT serialized");
        System.out.println("    private transient String cvv;");
        System.out.println("    private transient String pin;");
        System.out.println("}");
        
        // Use cases
        System.out.println("\\n📊 BANKING USE CASES:");
        System.out.println("─".repeat(50));
        
        System.out.println("\\n1️⃣ AUDIT LOG PERSISTENCE");
        System.out.println("   • Serialize all transactions to file");
        System.out.println("   • Required for regulatory compliance");
        System.out.println("   • Can replay transactions for recovery");
        
        System.out.println("\\n2️⃣ DISTRIBUTED TRANSACTION");
        System.out.println("   • Serialize transaction object");
        System.out.println("   • Send to other bank's server");
        System.out.println("   • Deserialize and process");
        
        System.out.println("\\n3️⃣ MESSAGE QUEUE");
        System.out.println("   • Serialize transaction");
        System.out.println("   • Put in Kafka/RabbitMQ");
        System.out.println("   • Consumer deserializes and processes");
        
        // Security considerations
        System.out.println("\\n🔒 SECURITY WITH TRANSIENT:");
        System.out.println("─".repeat(50));
        
        System.out.println("\\n// Sensitive fields marked transient");
        System.out.println("private transient String cvv;      // Never saved");
        System.out.println("private transient String pin;      // Never saved");
        System.out.println("private transient String password; // Never saved");
        
        System.out.println("\\nBenefits:");
        System.out.println("   • Sensitive data never written to disk");
        System.out.println("   • Prevents data leakage in logs");
        System.out.println("   • Compliant with PCI-DSS");
    }
}
\`\`\`

## 🌐 Real-Time Project Example: Distributed Caching

\`\`\`java
// Real-Time: Redis Cache Serialization
// Used in microservices architecture

public class CacheSerialization {
    public static void main(String[] args) {
        System.out.println("🌐 DISTRIBUTED CACHE SERIALIZATION");
        System.out.println("====================================");
        
        // Cache architecture
        System.out.println("\\n📊 CACHE ARCHITECTURE:");
        System.out.println("─".repeat(50));
        
        System.out.println("\\n┌─────────────────────────────────────────────────┐");
        System.out.println("│              MICROSERVICES                       │");
        System.out.println("│                                                 │");
        System.out.println("│  Service A ──┐                                  │");
        System.out.println("│              │    ┌─────────────────┐           │");
        System.out.println("│  Service B ──┼───►│  REDIS CACHE    │           │");
        System.out.println("│              │    │  (Serialized    │           │");
        System.out.println("│  Service C ──┘    │   Objects)      │           │");
        System.out.println("│                   └─────────────────┘           │");
        System.out.println("│                                                 │");
        System.out.println("└─────────────────────────────────────────────────┘");
        
        // Caching user session
        System.out.println("\\n📦 CACHING USER SESSION:");
        System.out.println("─".repeat(50));
        
        System.out.println("\\npublic class UserSession implements Serializable {");
        System.out.println("    private static final long serialVersionUID = 1L;");
        System.out.println("    ");
        System.out.println("    private String sessionId;");
        System.out.println("    private String userId;");
        System.out.println("    private String userName;");
        System.out.println("    private List<String> roles;");
        System.out.println("    private LocalDateTime loginTime;");
        System.out.println("    private LocalDateTime lastActivity;");
        System.out.println("}");
        
        System.out.println("\\n// Cache operations");
        System.out.println("public class SessionCache {");
        System.out.println("    private Jedis redis;");
        System.out.println("    ");
        System.out.println("    public void saveSession(UserSession session) {");
        System.out.println("        byte[] serialized = serialize(session);");
        System.out.println("        redis.setex(");
        System.out.println("            session.getSessionId().getBytes(),");
        System.out.println("            3600, // 1 hour TTL");
        System.out.println("            serialized");
        System.out.println("        );");
        System.out.println("    }");
        System.out.println("    ");
        System.out.println("    public UserSession getSession(String sessionId) {");
        System.out.println("        byte[] data = redis.get(sessionId.getBytes());");
        System.out.println("        return deserialize(data);");
        System.out.println("    }");
        System.out.println("}");
        
        // Performance comparison
        System.out.println("\\n📈 SERIALIZATION FORMATS:");
        System.out.println("─".repeat(50));
        
        System.out.println("\\n| Format        | Speed  | Size   | Readability |");
        System.out.println("|---------------|--------|--------|-------------|");
        System.out.println("| Java Native   | Medium | Large  | No          |");
        System.out.println("| JSON          | Fast   | Medium | Yes         |");
        System.out.println("| Protocol Buf  | Fastest| Small  | No          |");
        System.out.println("| Kryo          | Fast   | Small  | No          |");
        
        System.out.println("\\n💡 Industry Choice:");
        System.out.println("   • Netflix: Protocol Buffers");
        System.out.println("   • Twitter: Thrift");
        System.out.println("   • LinkedIn: Avro");
        System.out.println("   • Most APIs: JSON");
    }
}
\`\`\`

## serialVersionUID Importance

\`\`\`java
// Version control for serialized classes
private static final long serialVersionUID = 1L;
\`\`\`

| Scenario | Without UID | With UID |
|----------|-------------|----------|
| Class unchanged | Works | Works |
| Field added | May fail | Works (new field = default) |
| Field removed | May fail | Works (old field ignored) |
| Class structure changed | Fails | Controlled behavior |

## Best Practices

| Practice | Description |
|----------|-------------|
| Always define serialVersionUID | Prevents version conflicts |
| Use transient for sensitive data | Security compliance |
| Implement Externalizable for control | Custom serialization |
| Consider JSON for APIs | Human-readable, cross-platform |
| Validate deserialized data | Prevent security vulnerabilities |

> **Industry Insight**: Netflix uses Protocol Buffers for internal service communication (faster, smaller). Amazon uses Java serialization for session management in their distributed systems. Most REST APIs use JSON serialization (Jackson library) for cross-platform compatibility.

---

## 10 Important Serialization Interview Questions

### 1. What is Java serialization?
**Answer:** Converting object graphs to bytes via \`ObjectOutputStream\`—deserialization reconstructs objects—uses class metadata and \`serialVersionUID\`.
Security-sensitive—validate inputs.

### 2. What is \`serialVersionUID\`?
**Answer:** Version fingerprint—mismatch causes \`InvalidClassException\`—declare explicitly to control compatibility across releases.
Don’t rely on generated default across machines.

### 3. What does \`transient\` mean?
**Answer:** Field skipped from default serialization—recompute on deserialization or mark non-serializable collaborators.
Secrets must be transient.

### 4. Scenario: microservices—do teams use Java serialization for APIs?
**Answer:** Rare—JSON/Protobuf preferred—Java serialization couples JVM versions and classes—security risks (gadget chains).
Only trusted networks if used.

### 5. What is \`Externalizable\`?
**Answer:** Custom read/write control—performance and evolution—more work than \`Serializable\` defaults.
Advanced use cases.

### 6. Serialization vs JSON (Jackson)?
**Answer:** JSON human-readable cross-language; Java serialization preserves Java-only object graph and types—different interoperability and security models.
REST APIs almost always JSON.

### 7. What is deserialization attack?
**Answer:** Malicious bytes instantiate dangerous classes—gadget chains—use allowlists, avoid blind deserialization, prefer signing.
OWASP guidance critical.

### 8. Parent class serialization rules?
**Answer:** Non-serializable superclass must have accessible no-arg constructor for deserialization subclass—careful hierarchy design.
Inheritance complicates.

### 9. \`readObject\` / \`writeObject\` hooks?
**Answer:** Customize serialization for class—validate invariants, substitute proxies—careful with security.
Used in libraries.

### 10. Performance concerns?
**Answer:** Slow, verbose bytes—use faster formats when possible—Kryo/Protobuf for internal high-throughput—measure.
GC pressure from large graphs.
---

## Topic-Focused Practice for Serialization in Java

### Real-World Scenarios

1. Build one mini exercise focused on **object state persistence** and explain why your chosen approach is correct.
2. Add a second variation where **serialVersionUID compatibility** changes the expected output or system behavior.
3. Document one production caution related to **transient fields** and how you would monitor it.

### Page-Specific Interview Questions

1. In Serialization in Java, how do you decide between approaches related to **object state persistence** when requirements conflict?
2. What debugging steps would you follow if **serialVersionUID compatibility** behaves differently in development vs production?
3. Which performance or maintainability risks are introduced by **transient fields**, and how would you reduce them?
4. What is one real incident where misunderstanding **object state persistence** can cause bugs or outages?
5. If you had to teach this topic to a fresher, how would you explain **serialVersionUID compatibility** with a simple example?

### Implementation Checklist

- Verify functional correctness with at least two valid and two invalid input cases.
- Add one code example that highlights **object state persistence** and one that highlights **serialVersionUID compatibility**.
- Record typical errors around **transient fields** and add prevention notes in your project docs.
- Revisit related lessons and connect this concept to a complete end-to-end workflow.

`,
  code: `// Real-Time: Complete Serialization Demo
// E-Commerce order persistence

public class SerializationDemo {
    public static void main(String[] args) {
        System.out.println("╔════════════════════════════════════════════════╗");
        System.out.println("║    💾 SERIALIZATION DEMONSTRATION              ║");
        System.out.println("╚════════════════════════════════════════════════╝");
        
        // ═══════════════════════════════════════════════════
        // PART 1: Basic Serialization
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("📦 PART 1: BASIC SERIALIZATION");
        System.out.println("═".repeat(50));
        
        System.out.println("\\n// Serializable Order class");
        System.out.println("public class Order implements Serializable {");
        System.out.println("    private static final long serialVersionUID = 1L;");
        System.out.println("    ");
        System.out.println("    private String orderId;");
        System.out.println("    private String customerId;");
        System.out.println("    private List<OrderItem> items;");
        System.out.println("    private double totalAmount;");
        System.out.println("    private OrderStatus status;");
        System.out.println("    private LocalDateTime orderDate;");
        System.out.println("    ");
        System.out.println("    // Transient - not serialized");
        System.out.println("    private transient PaymentDetails payment;");
        System.out.println("}");
        
        // Create sample order
        System.out.println("\\n📋 Sample Order:");
        System.out.println("─".repeat(50));
        System.out.println("Order ID: ORD-2024-001");
        System.out.println("Customer: CUST-12345");
        System.out.println("Items:");
        System.out.println("  - iPhone 15 Pro x 1 = $999.99");
        System.out.println("  - AirPods Pro x 1 = $249.99");
        System.out.println("Total: $1249.98");
        System.out.println("Status: CONFIRMED");
        System.out.println("Payment: [TRANSIENT - Not Saved]");
        
        // ═══════════════════════════════════════════════════
        // PART 2: Serialization Code
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("💾 PART 2: SERIALIZATION CODE");
        System.out.println("═".repeat(50));
        
        System.out.println("\\n// Serialize order to file");
        System.out.println("public void saveOrder(Order order) throws IOException {");
        System.out.println("    String filename = \\"orders/\\" + order.getOrderId() + \\".ser\\";");
        System.out.println("    ");
        System.out.println("    try (FileOutputStream fos = new FileOutputStream(filename);");
        System.out.println("         ObjectOutputStream oos = new ObjectOutputStream(fos)) {");
        System.out.println("        ");
        System.out.println("        oos.writeObject(order);");
        System.out.println("        System.out.println(\\"Order saved: \\" + filename);");
        System.out.println("    }");
        System.out.println("}");
        
        System.out.println("\\n📋 Execution:");
        System.out.println("─".repeat(50));
        System.out.println("[Serializer] Converting Order to bytes...");
        System.out.println("[Serializer] Writing orderId: ORD-2024-001");
        System.out.println("[Serializer] Writing customerId: CUST-12345");
        System.out.println("[Serializer] Writing items: 2 items");
        System.out.println("[Serializer] Writing totalAmount: 1249.98");
        System.out.println("[Serializer] Writing status: CONFIRMED");
        System.out.println("[Serializer] Skipping payment (transient)");
        System.out.println("[Serializer] Saved to: orders/ORD-2024-001.ser");
        System.out.println("[Serializer] File size: 1.2 KB");
        
        // ═══════════════════════════════════════════════════
        // PART 3: Deserialization Code
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("📂 PART 3: DESERIALIZATION CODE");
        System.out.println("═".repeat(50));
        
        System.out.println("\\n// Deserialize order from file");
        System.out.println("public Order loadOrder(String orderId) ");
        System.out.println("        throws IOException, ClassNotFoundException {");
        System.out.println("    ");
        System.out.println("    String filename = \\"orders/\\" + orderId + \\".ser\\";");
        System.out.println("    ");
        System.out.println("    try (FileInputStream fis = new FileInputStream(filename);");
        System.out.println("         ObjectInputStream ois = new ObjectInputStream(fis)) {");
        System.out.println("        ");
        System.out.println("        Order order = (Order) ois.readObject();");
        System.out.println("        System.out.println(\\"Order loaded: \\" + orderId);");
        System.out.println("        return order;");
        System.out.println("    }");
        System.out.println("}");
        
        System.out.println("\\n📋 Execution:");
        System.out.println("─".repeat(50));
        System.out.println("[Deserializer] Reading from: orders/ORD-2024-001.ser");
        System.out.println("[Deserializer] Reading orderId: ORD-2024-001");
        System.out.println("[Deserializer] Reading customerId: CUST-12345");
        System.out.println("[Deserializer] Reading items: 2 items");
        System.out.println("[Deserializer] Reading totalAmount: 1249.98");
        System.out.println("[Deserializer] Reading status: CONFIRMED");
        System.out.println("[Deserializer] payment = null (transient)");
        System.out.println("[Deserializer] Order reconstructed successfully");
        
        // ═══════════════════════════════════════════════════
        // PART 4: Transient Fields
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("🔒 PART 4: TRANSIENT FIELDS");
        System.out.println("═".repeat(50));
        
        System.out.println("\\n// Fields marked transient are NOT serialized");
        System.out.println("public class User implements Serializable {");
        System.out.println("    private String username;        // Serialized");
        System.out.println("    private String email;           // Serialized");
        System.out.println("    private transient String password; // Not serialized");
        System.out.println("    private transient String ssn;      // Not serialized");
        System.out.println("}");
        
        System.out.println("\\n📋 Transient Use Cases:");
        System.out.println("─".repeat(50));
        System.out.println("• Passwords and PINs");
        System.out.println("• Credit card CVV");
        System.out.println("• Session tokens");
        System.out.println("• Calculated/derived values");
        System.out.println("• Database connections");
        System.out.println("• Thread references");
        
        // ═══════════════════════════════════════════════════
        // PART 5: serialVersionUID
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("🔢 PART 5: serialVersionUID");
        System.out.println("═".repeat(50));
        
        System.out.println("\\n// Version control for serialized classes");
        System.out.println("private static final long serialVersionUID = 1L;");
        
        System.out.println("\\n📋 Why It's Important:");
        System.out.println("─".repeat(50));
        System.out.println("\\nScenario: Class changes after serialization");
        System.out.println("\\nVersion 1 (serialized):");
        System.out.println("  class Order { String orderId; double amount; }");
        System.out.println("\\nVersion 2 (current):");
        System.out.println("  class Order { String orderId; double amount; String status; }");
        
        System.out.println("\\nWithout serialVersionUID:");
        System.out.println("   InvalidClassException: local class incompatible");
        
        System.out.println("\\nWith serialVersionUID = 1L:");
        System.out.println("   Deserialization succeeds");
        System.out.println("   New field 'status' = null (default)");
        
        // ═══════════════════════════════════════════════════
        // PART 6: Real-World Example
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("🌐 PART 6: REAL-WORLD USAGE");
        System.out.println("═".repeat(50));
        
        System.out.println("\\n// Redis Cache Example");
        System.out.println("public class OrderCache {");
        System.out.println("    private RedisTemplate<String, byte[]> redis;");
        System.out.println("    ");
        System.out.println("    public void cacheOrder(Order order) {");
        System.out.println("        byte[] serialized = SerializationUtils.serialize(order);");
        System.out.println("        redis.opsForValue().set(");
        System.out.println("            \\"order:\\" + order.getOrderId(),");
        System.out.println("            serialized,");
        System.out.println("            Duration.ofHours(24)");
        System.out.println("        );");
        System.out.println("    }");
        System.out.println("    ");
        System.out.println("    public Order getOrder(String orderId) {");
        System.out.println("        byte[] data = redis.opsForValue().get(\\"order:\\" + orderId);");
        System.out.println("        return SerializationUtils.deserialize(data);");
        System.out.println("    }");
        System.out.println("}");
        
        System.out.println("\\n📊 Cache Flow:");
        System.out.println("┌─────────────────────────────────────────────────┐");
        System.out.println("│ Order Object → Serialize → Redis Cache          │");
        System.out.println("│                                                 │");
        System.out.println("│ Redis Cache → Deserialize → Order Object        │");
        System.out.println("└─────────────────────────────────────────────────┘");
        
        // ═══════════════════════════════════════════════════
        // SUMMARY
        // ═══════════════════════════════════════════════════
        System.out.println("\\n" + "═".repeat(50));
        System.out.println("📋 SERIALIZATION SUMMARY");
        System.out.println("═".repeat(50));
        
        System.out.println("\\n| Aspect           | Details                      |");
        System.out.println("|------------------|------------------------------|");
        System.out.println("| Interface        | java.io.Serializable         |");
        System.out.println("| Write class      | ObjectOutputStream           |");
        System.out.println("| Read class       | ObjectInputStream            |");
        System.out.println("| Skip fields      | transient keyword            |");
        System.out.println("| Version control  | serialVersionUID             |");
        
        System.out.println("\\n🏆 Best Practices:");
        System.out.println("   1. Always define serialVersionUID");
        System.out.println("   2. Mark sensitive fields as transient");
        System.out.println("   3. Consider JSON for cross-platform");
        System.out.println("   4. Validate deserialized data");
        System.out.println("   5. Use try-with-resources for streams");
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a serializable Employee class and demonstrate saving/loading employee data',
      hint: 'Include fields like id, name, salary (serialized) and password (transient). Show serialization and deserialization.',
      starterCode: `public class EmployeeSerialization {
    public static void main(String[] args) {
        // Create Employee class with serialVersionUID
        // Include transient password field
        // Serialize employee to file
        // Deserialize and show that password is null
    }
}`
    }
  ]
};

export default serialization;
