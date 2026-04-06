const interfaces = {
  id: 'interfaces',
  title: 'Interfaces',
  description: 'Defining contracts for classes to follow',
  content: `
# Interfaces - Defining Contracts for Classes

Interfaces in Java define contracts that classes must implement, specifying what methods a class must provide without dictating how those methods are implemented. Interfaces enable polymorphism, allow multiple inheritance-like behavior, and promote loose coupling between components. An interface acts as a blueprint that guarantees certain capabilities, enabling code to work with any class that implements the interface.

Enterprise applications extensively use interfaces for dependency injection, plugin architectures, API design, and creating flexible, testable code. Spring Framework uses interfaces extensively for dependency injection, database frameworks define interfaces for data access, and API libraries use interfaces for client implementations. Understanding interfaces is essential for building extensible, maintainable software systems.

**Interface Benefits:**
- **Multiple Inheritance**: Classes can implement multiple interfaces
- **Polymorphism**: Enables treating different implementations uniformly
- **Loose Coupling**: Code depends on interfaces, not concrete classes
- **Testability**: Easy to create mock implementations for testing
- **Extensibility**: New implementations can be added without modifying existing code

---

## What is an Interface?

An interface defines:
- What methods a class must have
- But NOT how those methods work

\`\`\`java
interface Drawable {
    void draw();  // Any class implementing Drawable MUST have a draw() method
}
\`\`\`

---

## Implementing an Interface

\`\`\`java
interface Drawable {
    void draw();
}

class Circle implements Drawable {
    @Override
    public void draw() {
        System.out.println("Drawing a circle");
    }
}

class Rectangle implements Drawable {
    @Override
    public void draw() {
        System.out.println("Drawing a rectangle");
    }
}
\`\`\`

Now both Circle and Rectangle are "Drawable" — they can be used anywhere a Drawable is expected.

---

## Why Use Interfaces?

### 1. Multiple Inheritance
Java doesn't allow extending multiple classes, but you CAN implement multiple interfaces:

\`\`\`java
interface Flyable {
    void fly();
}

interface Swimmable {
    void swim();
}

class Duck implements Flyable, Swimmable {
    @Override
    public void fly() {
        System.out.println("Duck is flying");
    }
    
    @Override
    public void swim() {
        System.out.println("Duck is swimming");
    }
}
\`\`\`

### 2. Loose Coupling
Code depends on interfaces, not concrete classes:

\`\`\`java
// Bad - tightly coupled to specific class
void processPayment(CreditCardPayment payment) { }

// Good - loosely coupled to interface
void processPayment(PaymentMethod payment) { }
\`\`\`

### 3. Polymorphism
Different classes, same interface:

\`\`\`java
Drawable[] shapes = {new Circle(), new Rectangle(), new Triangle()};
for (Drawable shape : shapes) {
    shape.draw();  // Each draws differently
}
\`\`\`

---

## Interface Features

### Constants
All variables in interfaces are implicitly \`public static final\`:

\`\`\`java
interface Config {
    int MAX_SIZE = 100;        // public static final
    String VERSION = "1.0";    // public static final
}
\`\`\`

### Default Methods (Java 8+)
Interfaces can have methods with implementation:

\`\`\`java
interface Vehicle {
    void start();
    
    default void honk() {
        System.out.println("Beep beep!");
    }
}

class Car implements Vehicle {
    @Override
    public void start() {
        System.out.println("Car starting");
    }
    // honk() is inherited with default implementation
}
\`\`\`

### Static Methods (Java 8+)
Interfaces can have static utility methods:

\`\`\`java
interface MathUtils {
    static int add(int a, int b) {
        return a + b;
    }
}

// Usage:
int sum = MathUtils.add(5, 3);
\`\`\`

### Private Methods (Java 9+)
Helper methods for default methods:

\`\`\`java
interface Logger {
    default void logInfo(String msg) {
        log("INFO", msg);
    }
    
    default void logError(String msg) {
        log("ERROR", msg);
    }
    
    private void log(String level, String msg) {
        System.out.println("[" + level + "] " + msg);
    }
}
\`\`\`

---

## Interface vs Abstract Class

| Feature | Interface | Abstract Class |
|---------|-----------|----------------|
| Multiple inheritance | Yes | No |
| Constructor | No | Yes |
| Instance variables | No (only constants) | Yes |
| Access modifiers | public only | Any |
| Default methods | Yes (Java 8+) | Yes |
| When to use | Define a contract | Share code among related classes |

**Rule of thumb:**
- Use **interface** when unrelated classes need common behavior
- Use **abstract class** when related classes share code

---

## Functional Interfaces (Java 8+)

An interface with exactly ONE abstract method:

\`\`\`java
@FunctionalInterface
interface Calculator {
    int calculate(int a, int b);
}

// Can be used with lambda expressions:
Calculator add = (a, b) -> a + b;
Calculator multiply = (a, b) -> a * b;

System.out.println(add.calculate(5, 3));      // 8
System.out.println(multiply.calculate(5, 3)); // 15
\`\`\`

---

## Real-World Example: Plugin System

\`\`\`java
interface Plugin {
    String getName();
    void initialize();
    void execute();
    void shutdown();
}

class LoggingPlugin implements Plugin {
    @Override
    public String getName() { return "Logging Plugin"; }
    
    @Override
    public void initialize() {
        System.out.println("Logging initialized");
    }
    
    @Override
    public void execute() {
        System.out.println("Logging active...");
    }
    
    @Override
    public void shutdown() {
        System.out.println("Logging shutdown");
    }
}

class SecurityPlugin implements Plugin {
    @Override
    public String getName() { return "Security Plugin"; }
    
    @Override
    public void initialize() {
        System.out.println("Security checks enabled");
    }
    
    @Override
    public void execute() {
        System.out.println("Scanning for threats...");
    }
    
    @Override
    public void shutdown() {
        System.out.println("Security disabled");
    }
}

// Plugin manager doesn't care about specific plugins
class PluginManager {
    private List<Plugin> plugins = new ArrayList<>();
    
    void register(Plugin plugin) {
        plugins.add(plugin);
        plugin.initialize();
    }
    
    void runAll() {
        for (Plugin plugin : plugins) {
            System.out.println("Running: " + plugin.getName());
            plugin.execute();
        }
    }
}
\`\`\`

Add a new plugin? Just implement the interface. No changes to PluginManager needed!

---

## Common Java Interfaces

| Interface | Purpose |
|-----------|---------|
| Comparable | Natural ordering |
| Comparator | Custom ordering |
| Runnable | Thread execution |
| Callable | Thread with return value |
| Serializable | Object serialization |
| Cloneable | Object cloning |
| Iterable | For-each loop support |

---

## 10 Important Interfaces Interview Questions

### 1. What can interfaces contain since Java 8?
**Answer:** \`default\` methods, \`static\` methods, private methods—interfaces evolve without breaking implementors as easily.
Still no instance fields (only \`public static final\` constants).

### 2. Can a class implement multiple interfaces?
**Answer:** Yes—Java supports multiple interface inheritance; resolve conflicts by overriding defaults explicitly.
Diamond problem handled by compiler rules.

### 3. What is a marker interface?
**Answer:** Empty interface signaling capability—\`Serializable\`, \`Cloneable\`—behavior provided by JVM/reflection conventions.
Consider annotations as modern alternative for metadata.

### 4. How does \`implements\` differ from \`extends\`?
**Answer:** \`implements\` lists interfaces; \`extends\` for one superclass—class can extend one class and implement many interfaces.
Order: extends first, then implements.

### 5. Scenario: repository layer—why define \`UserRepository\` interface?
**Answer:** Services depend on interface; JPA or in-memory implementations swap for tests and different environments.
Core Spring pattern.

### 6. What is functional interface?
**Answer:** Single abstract method interface—target for lambdas; \`@FunctionalInterface\` documents intent.
\`Comparator\`, \`Runnable\` examples.

### 7. Can interfaces extend other interfaces?
**Answer:** Yes—inheritance chains combine contracts; implementors must satisfy all abstract methods.
Combine small interfaces (Interface Segregation).

### 8. What happens if two defaults conflict?
**Answer:** Concrete class must override the conflicting method—compiler error until resolved.
Design default methods carefully in library upgrades.

### 9. Are interface methods implicitly \`public\`?
**Answer:** Yes—abstract methods are public; before Java 9, no private methods allowed.
Package-private not applicable to interface methods historically.

### 10. Why prefer small interfaces?
**Answer:** Interface Segregation Principle—clients shouldn’t depend on methods they don’t use—easier mocking and evolution.
Fat interfaces resist change.
---

## Topic-Focused Practice for Interfaces

### Real-World Scenarios

1. Build one mini exercise focused on **contract-based design** and explain why your chosen approach is correct.
2. Add a second variation where **multiple interface implementation** changes the expected output or system behavior.
3. Document one production caution related to **default methods** and how you would monitor it.

### Page-Specific Interview Questions

1. In Interfaces, how do you decide between approaches related to **contract-based design** when requirements conflict?
2. What debugging steps would you follow if **multiple interface implementation** behaves differently in development vs production?
3. Which performance or maintainability risks are introduced by **default methods**, and how would you reduce them?
4. What is one real incident where misunderstanding **contract-based design** can cause bugs or outages?
5. If you had to teach this topic to a fresher, how would you explain **multiple interface implementation** with a simple example?

### Implementation Checklist

- Verify functional correctness with at least two valid and two invalid input cases.
- Add one code example that highlights **contract-based design** and one that highlights **multiple interface implementation**.
- Record typical errors around **default methods** and add prevention notes in your project docs.
- Revisit related lessons and connect this concept to a complete end-to-end workflow.

`,
  code: `// Interfaces Demo

import java.util.ArrayList;
import java.util.List;

public class InterfacesDemo {
    public static void main(String[] args) {
        System.out.println("=== Interfaces Demo ===\\n");
        
        // 1. BASIC INTERFACE
        System.out.println("1. BASIC INTERFACE");
        System.out.println("   ----------------");
        
        Drawable[] shapes = {
            new Circle(5),
            new Rectangle(4, 6),
            new Triangle(3, 4)
        };
        
        for (Drawable shape : shapes) {
            shape.draw();
        }
        System.out.println();
        
        // 2. MULTIPLE INTERFACES
        System.out.println("2. MULTIPLE INTERFACES");
        System.out.println("   --------------------");
        
        Duck duck = new Duck("Donald");
        duck.fly();
        duck.swim();
        duck.walk();
        System.out.println();
        
        // 3. DEFAULT METHODS
        System.out.println("3. DEFAULT METHODS");
        System.out.println("   ----------------");
        
        Vehicle car = new Car("Toyota");
        Vehicle bike = new Motorcycle("Harley");
        
        car.start();
        car.honk();  // Default method
        
        bike.start();
        bike.honk();  // Overridden default method
        System.out.println();
        
        // 4. INTERFACE AS TYPE
        System.out.println("4. INTERFACE AS TYPE (Polymorphism)");
        System.out.println("   ----------------------------------");
        
        PaymentProcessor processor = new PaymentProcessor();
        
        processor.processPayment(new CreditCardPayment("1234567890123456"));
        processor.processPayment(new PayPalPayment("user@email.com"));
        processor.processPayment(new CryptoPayment("0xABC123"));
        System.out.println();
        
        // 5. FUNCTIONAL INTERFACE
        System.out.println("5. FUNCTIONAL INTERFACE (Lambda)");
        System.out.println("   ------------------------------");
        
        Calculator add = (a, b) -> a + b;
        Calculator subtract = (a, b) -> a - b;
        Calculator multiply = (a, b) -> a * b;
        
        System.out.println("   5 + 3 = " + add.calculate(5, 3));
        System.out.println("   5 - 3 = " + subtract.calculate(5, 3));
        System.out.println("   5 * 3 = " + multiply.calculate(5, 3));
        System.out.println();
        
        // 6. REAL-WORLD EXAMPLE - Plugin System
        System.out.println("6. REAL-WORLD EXAMPLE - Plugin System");
        System.out.println("   ------------------------------------");
        
        PluginManager manager = new PluginManager();
        manager.register(new LoggingPlugin());
        manager.register(new SecurityPlugin());
        manager.register(new CachePlugin());
        
        System.out.println("\\n   Running all plugins:");
        manager.runAll();
    }
}

// Basic interface
interface Drawable {
    void draw();
}

class Circle implements Drawable {
    private double radius;
    
    Circle(double radius) {
        this.radius = radius;
    }
    
    @Override
    public void draw() {
        System.out.println("   Drawing Circle (radius: " + radius + ")");
    }
}

class Rectangle implements Drawable {
    private double width, height;
    
    Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }
    
    @Override
    public void draw() {
        System.out.println("   Drawing Rectangle (" + width + " x " + height + ")");
    }
}

class Triangle implements Drawable {
    private double base, height;
    
    Triangle(double base, double height) {
        this.base = base;
        this.height = height;
    }
    
    @Override
    public void draw() {
        System.out.println("   Drawing Triangle (base: " + base + ")");
    }
}

// Multiple interfaces
interface Flyable {
    void fly();
}

interface Swimmable {
    void swim();
}

interface Walkable {
    void walk();
}

class Duck implements Flyable, Swimmable, Walkable {
    private String name;
    
    Duck(String name) {
        this.name = name;
    }
    
    @Override
    public void fly() {
        System.out.println("   " + name + " is flying! 🦆");
    }
    
    @Override
    public void swim() {
        System.out.println("   " + name + " is swimming! 🏊");
    }
    
    @Override
    public void walk() {
        System.out.println("   " + name + " is walking! 🚶");
    }
}

// Interface with default method
interface Vehicle {
    void start();
    
    default void honk() {
        System.out.println("   Beep beep! 📢");
    }
}

class Car implements Vehicle {
    private String brand;
    
    Car(String brand) {
        this.brand = brand;
    }
    
    @Override
    public void start() {
        System.out.println("   " + brand + " car starting... 🚗");
    }
}

class Motorcycle implements Vehicle {
    private String brand;
    
    Motorcycle(String brand) {
        this.brand = brand;
    }
    
    @Override
    public void start() {
        System.out.println("   " + brand + " motorcycle roaring... 🏍️");
    }
    
    @Override
    public void honk() {
        System.out.println("   HONK HONK! 📯");  // Override default
    }
}

// Payment interface
interface Payable {
    void pay(double amount);
    String getPaymentMethod();
}

class CreditCardPayment implements Payable {
    private String cardNumber;
    
    CreditCardPayment(String cardNumber) {
        this.cardNumber = cardNumber;
    }
    
    @Override
    public void pay(double amount) {
        System.out.println("   💳 Paid $" + amount + " via Credit Card ****" + 
                          cardNumber.substring(12));
    }
    
    @Override
    public String getPaymentMethod() {
        return "Credit Card";
    }
}

class PayPalPayment implements Payable {
    private String email;
    
    PayPalPayment(String email) {
        this.email = email;
    }
    
    @Override
    public void pay(double amount) {
        System.out.println("   🅿️ Paid $" + amount + " via PayPal (" + email + ")");
    }
    
    @Override
    public String getPaymentMethod() {
        return "PayPal";
    }
}

class CryptoPayment implements Payable {
    private String wallet;
    
    CryptoPayment(String wallet) {
        this.wallet = wallet;
    }
    
    @Override
    public void pay(double amount) {
        System.out.println("   ₿ Paid $" + amount + " via Crypto (" + wallet + ")");
    }
    
    @Override
    public String getPaymentMethod() {
        return "Cryptocurrency";
    }
}

class PaymentProcessor {
    void processPayment(Payable payment) {
        System.out.println("   Processing " + payment.getPaymentMethod() + "...");
        payment.pay(100.00);
    }
}

// Functional interface
@FunctionalInterface
interface Calculator {
    int calculate(int a, int b);
}

// Plugin system
interface Plugin {
    String getName();
    void initialize();
    void execute();
}

class LoggingPlugin implements Plugin {
    @Override
    public String getName() { return "Logging"; }
    
    @Override
    public void initialize() {
        System.out.println("   📝 Logging plugin initialized");
    }
    
    @Override
    public void execute() {
        System.out.println("   📝 Logging: Recording activity...");
    }
}

class SecurityPlugin implements Plugin {
    @Override
    public String getName() { return "Security"; }
    
    @Override
    public void initialize() {
        System.out.println("   🔒 Security plugin initialized");
    }
    
    @Override
    public void execute() {
        System.out.println("   🔒 Security: Scanning for threats...");
    }
}

class CachePlugin implements Plugin {
    @Override
    public String getName() { return "Cache"; }
    
    @Override
    public void initialize() {
        System.out.println("   💾 Cache plugin initialized");
    }
    
    @Override
    public void execute() {
        System.out.println("   💾 Cache: Optimizing data access...");
    }
}

class PluginManager {
    private List<Plugin> plugins = new ArrayList<>();
    
    void register(Plugin plugin) {
        plugins.add(plugin);
        plugin.initialize();
    }
    
    void runAll() {
        for (Plugin plugin : plugins) {
            plugin.execute();
        }
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a messaging system using interfaces',
      hint: 'Create MessageSender interface with Email, SMS, and Push implementations',
      starterCode: `import java.util.ArrayList;
import java.util.List;

public class MessagingDemo {
    public static void main(String[] args) {
        System.out.println("=== Messaging System ===\\n");
        
        // Create message senders
        MessageSender email = new EmailSender("smtp.gmail.com");
        MessageSender sms = new SMSSender("Twilio");
        MessageSender push = new PushSender("Firebase");
        
        // Send messages
        email.send("user@example.com", "Welcome!", "Thanks for signing up!");
        sms.send("+1234567890", "OTP", "Your code is 123456");
        push.send("device123", "Alert", "You have a new message!");
        
        System.out.println("\\n--- Bulk Messaging ---");
        
        // Bulk messaging using interface
        List<MessageSender> senders = new ArrayList<>();
        senders.add(email);
        senders.add(sms);
        senders.add(push);
        
        for (MessageSender sender : senders) {
            sender.send("recipient", "Bulk Test", "This is a test message");
        }
    }
}

interface MessageSender {
    void send(String to, String subject, String body);
    
    default void sendWithRetry(String to, String subject, String body, int retries) {
        for (int i = 0; i < retries; i++) {
            try {
                send(to, subject, body);
                return;
            } catch (Exception e) {
                System.out.println("Retry " + (i + 1) + "...");
            }
        }
    }
}

class EmailSender implements MessageSender {
    private String smtpServer;
    
    EmailSender(String smtpServer) {
        this.smtpServer = smtpServer;
    }
    
    @Override
    public void send(String to, String subject, String body) {
        System.out.println("📧 Email via " + smtpServer);
        System.out.println("   To: " + to);
        System.out.println("   Subject: " + subject);
        System.out.println("   Body: " + body);
    }
}

class SMSSender implements MessageSender {
    private String provider;
    
    SMSSender(String provider) {
        this.provider = provider;
    }
    
    @Override
    public void send(String to, String subject, String body) {
        System.out.println("📱 SMS via " + provider);
        System.out.println("   To: " + to);
        System.out.println("   Message: " + body);
    }
}

class PushSender implements MessageSender {
    private String service;
    
    PushSender(String service) {
        this.service = service;
    }
    
    @Override
    public void send(String to, String subject, String body) {
        System.out.println("🔔 Push via " + service);
        System.out.println("   Device: " + to);
        System.out.println("   Title: " + subject);
        System.out.println("   Body: " + body);
    }
}`
    }
  ]
};

export default interfaces;
