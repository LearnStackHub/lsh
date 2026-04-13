const abstraction = {
  id: 'abstraction',
  title: 'Abstraction',
  description: 'Hiding complexity and showing only what matters',
  content: `
# Abstraction - Hiding Complexity and Showing Only What Matters

Abstraction is a fundamental object-oriented programming principle that simplifies complex systems by hiding implementation details and exposing only essential features to users. Abstraction allows developers to work with high-level concepts without needing to understand low-level implementation complexities. In Java, abstraction is achieved through abstract classes and interfaces, enabling developers to define contracts that classes must follow while hiding the specific implementation details.

Abstraction is essential for building maintainable, scalable software systems. Enterprise applications use abstraction to create flexible architectures where implementation details can change without affecting dependent code. Database frameworks abstract SQL complexity, UI frameworks abstract rendering details, and API frameworks abstract protocol implementations. Understanding abstraction is crucial for designing robust software architectures.

**Abstraction Benefits:**
- **Simplifies Complexity**: Hides implementation details from users
- **Enables Flexibility**: Allows implementation changes without affecting dependent code
- **Improves Maintainability**: Separates interface from implementation
- **Promotes Reusability**: Abstract interfaces can be implemented by multiple classes
- **Reduces Coupling**: Dependent code works with abstractions, not concrete implementations

---

## Why Abstraction Matters

Imagine if every time you used a TV remote, you had to understand the infrared signal encoding, the circuit board design, and the communication protocol. You'd never watch TV!

In programming:
- Users of your code don't need to know implementation details
- You can change the "how" without affecting the "what"
- Code becomes easier to understand and use

---

## Two Ways to Achieve Abstraction

### 1. Abstract Classes
Partial abstraction — can have both abstract and concrete methods.

### 2. Interfaces
Full abstraction — all methods are abstract (before Java 8).

---

## Abstract Classes

An abstract class is a class that:
- Cannot be instantiated directly
- Can have abstract methods (no body)
- Can have concrete methods (with body)
- Can have constructors, fields, etc.

\`\`\`java
abstract class Animal {
    String name;
    
    // Constructor
    Animal(String name) {
        this.name = name;
    }
    
    // Abstract method - no body, must be implemented by subclass
    abstract void makeSound();
    
    // Concrete method - has body, can be inherited as-is
    void sleep() {
        System.out.println(name + " is sleeping");
    }
}
\`\`\`

### Using Abstract Classes

\`\`\`java
// Can't do this:
Animal animal = new Animal("Generic");  // ERROR! Cannot instantiate abstract class

// Must create a concrete subclass:
class Dog extends Animal {
    Dog(String name) {
        super(name);
    }
    
    @Override
    void makeSound() {
        System.out.println(name + " says Woof!");
    }
}

// Now you can use it:
Animal myDog = new Dog("Buddy");
myDog.makeSound();  // Buddy says Woof!
myDog.sleep();      // Buddy is sleeping
\`\`\`

---

## Abstract Methods

An abstract method:
- Has no body (just a declaration)
- Must be implemented by non-abstract subclasses
- Forces subclasses to provide specific behavior

\`\`\`java
abstract class Shape {
    // Every shape MUST define how to calculate area
    abstract double getArea();
    
    // Every shape MUST define how to draw itself
    abstract void draw();
}

class Circle extends Shape {
    double radius;
    
    Circle(double radius) {
        this.radius = radius;
    }
    
    @Override
    double getArea() {
        return Math.PI * radius * radius;
    }
    
    @Override
    void draw() {
        System.out.println("Drawing a circle");
    }
}
\`\`\`

---

## When to Use Abstract Classes

Use abstract classes when:
- You want to share code among related classes
- You expect subclasses to have common methods/fields
- You want to declare non-public members
- You want to provide a partial implementation

---

## Real-World Example: Database Connection

\`\`\`java
abstract class DatabaseConnection {
    protected String host;
    protected int port;
    protected String database;
    
    // Common constructor
    DatabaseConnection(String host, int port, String database) {
        this.host = host;
        this.port = port;
        this.database = database;
    }
    
    // Abstract - each database connects differently
    abstract void connect();
    abstract void disconnect();
    abstract void executeQuery(String query);
    
    // Concrete - common logging
    void log(String message) {
        System.out.println("[DB] " + message);
    }
}

class MySQLConnection extends DatabaseConnection {
    MySQLConnection(String host, int port, String database) {
        super(host, port, database);
    }
    
    @Override
    void connect() {
        log("Connecting to MySQL at " + host + ":" + port);
        // MySQL-specific connection logic
    }
    
    @Override
    void disconnect() {
        log("Disconnecting from MySQL");
    }
    
    @Override
    void executeQuery(String query) {
        log("Executing MySQL query: " + query);
    }
}

class PostgreSQLConnection extends DatabaseConnection {
    PostgreSQLConnection(String host, int port, String database) {
        super(host, port, database);
    }
    
    @Override
    void connect() {
        log("Connecting to PostgreSQL at " + host + ":" + port);
        // PostgreSQL-specific connection logic
    }
    
    @Override
    void disconnect() {
        log("Disconnecting from PostgreSQL");
    }
    
    @Override
    void executeQuery(String query) {
        log("Executing PostgreSQL query: " + query);
    }
}
\`\`\`

The application code doesn't care which database it's using:

\`\`\`java
DatabaseConnection db = new MySQLConnection("localhost", 3306, "myapp");
db.connect();
db.executeQuery("SELECT * FROM users");
db.disconnect();

// Switch to PostgreSQL? Just change one line:
DatabaseConnection db = new PostgreSQLConnection("localhost", 5432, "myapp");
// Rest of the code stays the same!
\`\`\`

---

## Abstract Class vs Concrete Class

| Abstract Class | Concrete Class |
|----------------|----------------|
| Cannot be instantiated | Can be instantiated |
| Can have abstract methods | All methods must have body |
| Meant to be extended | Can be final |
| Provides a template | Provides full implementation |

---

## Key Points

1. **Abstract classes can't be instantiated** — They're templates, not finished products
2. **Abstract methods have no body** — Subclasses must implement them
3. **A class with any abstract method must be abstract** — You can't have half-baked objects
4. **Abstract classes can have constructors** — Called by subclass constructors
5. **You can have an abstract class with no abstract methods** — Just to prevent instantiation

---

## 10 Important Abstraction Interview Questions

### 1. What is abstraction in OOP?
**Short Answer:** Abstraction hides implementation details and exposes only the essential behavior contract.
**Detailed Explanation:** In object-oriented programming, abstraction helps developers focus on what an object can do instead of how it does it internally. This reduces cognitive load and makes code easier to use, test, and extend. In Java, abstraction is commonly implemented using abstract classes and interfaces. Both allow you to define a stable contract while letting concrete classes provide specific behavior. In this tutorial page, abstraction is shown as a practical design tool, not just a theory term. Interviewers expect candidates to connect abstraction with maintainability and change tolerance. A good answer explains that abstraction protects callers from internal complexity and supports cleaner architecture over time.

### 2. Abstract class vs interface—when choose which?
**Short Answer:** Use abstract class for shared state and base behavior, and interface for flexible contracts across types.
**Detailed Explanation:** Abstract classes are useful when related types share common fields or reusable logic that should live in one base implementation. Interfaces are better for defining capabilities that different classes can implement regardless of inheritance hierarchy. Because Java allows implementing multiple interfaces but extending only one class, interfaces are often preferred for broad contracts. In this tutorial context, both mechanisms are presented as complementary, not competing. Interviewers usually look for decision reasoning rather than memorized differences. A strong answer should mention maintainability, reuse needs, and design flexibility, showing that your choice depends on domain requirements and expected future variation.

### 3. Can you instantiate an abstract class?
**Short Answer:** No, abstract classes cannot be instantiated directly and must be completed by concrete subclasses.
**Detailed Explanation:** An abstract class represents an incomplete blueprint, so Java does not allow creating objects from it directly. You must create a concrete subclass that implements required abstract methods before instantiation. This rule enforces contract completion and prevents partially defined behavior from entering runtime. On this page, examples show abstract base types defining common structure while subclasses provide actual behavior. Interviewers ask this simple question to check clarity on core language semantics and design intent. A complete answer can also mention that abstract classes may contain both abstract and concrete methods, which is why they are useful for combining shared logic with mandatory specialization.

### 4. What is a pure abstract class vs interface with defaults?
**Short Answer:** A pure abstract class has only abstract methods, while interfaces with defaults can now provide shared behavior too.
**Detailed Explanation:** Historically, interfaces defined only method signatures, while abstract classes handled shared logic. Modern Java added default methods to interfaces, so they can now include limited reusable behavior. This makes interface-based design more powerful, especially for capability-style contracts. Still, abstract classes remain valuable when shared state, constructors, or stronger inheritance structure is needed. In this tutorial interview context, the key idea is understanding evolution of Java design tools. Strong answers show that defaults reduce some abstract class usage, but do not replace abstract classes entirely. Each construct has distinct strengths, and good engineers choose based on real design needs.

### 5. Scenario: payment processing—how does abstraction help?
**Short Answer:** Abstraction lets payment logic depend on a stable gateway contract while implementations stay replaceable.
**Detailed Explanation:** In payment systems, abstraction allows business code to call a common payment interface without knowing whether the provider is Stripe, PayPal, bank transfer, or a test double. This decoupling makes provider replacement easier, improves testing, and keeps business flows stable even when integrations change. On this tutorial page, this scenario demonstrates why abstraction matters in production systems, not only exam questions. Interviewers value answers that mention practical outcomes like easier mocking, reduced vendor lock-in, and safer refactoring. A strong explanation shows that abstraction supports both flexibility and reliability by separating payment contract from provider-specific implementation details.

### 6. How does abstraction relate to layered architecture?
**Short Answer:** Abstraction defines clean contracts between layers so upper layers do not depend on low-level details.
**Detailed Explanation:** Layered architecture works best when each layer exposes a narrow, stable interface and hides internal implementation complexity. For example, service layers should not depend directly on SQL details, and controllers should not care about repository internals. Abstraction is the mechanism that enforces these boundaries. In this tutorial context, interviewers expect you to connect abstraction to architecture quality, not only class diagrams. Good answers explain that strong abstraction reduces coupling, limits ripple effects, and improves test isolation. When abstraction leaks, upper layers become tied to lower-level details, making code harder to change and increasing defect risk during feature evolution.

### 7. What is leaking abstraction?
**Short Answer:** Leaking abstraction happens when internal implementation details escape through higher-level contracts.
**Detailed Explanation:** An abstraction leak occurs when callers are forced to understand lower-level mechanics that should have been hidden. Examples include raw SQL exceptions reaching UI code or transport-specific errors exposed from domain services. This breaks layering and makes systems harder to maintain because every layer starts depending on internals. In this tutorial page, abstraction is meant to simplify usage, so leaks indicate poor boundary design. Interviewers appreciate candidates who identify leaks as design smell and propose boundary translation strategies, such as mapping technical failures into domain-level outcomes. A strong answer shows that preventing leaks is essential for clean architecture and long-term maintainability.

### 8. Are \`abstract\` methods \`virtual\` by default?
**Short Answer:** Yes, Java instance methods are virtual by default, so abstract methods are naturally overridden in subclasses.
**Detailed Explanation:** In Java, non-static, non-final instance methods use dynamic dispatch by default. That means method calls are resolved at runtime based on the concrete object type. Abstract methods rely on this behavior because subclasses provide the actual implementation that executes. This question checks language fundamentals connected to abstraction mechanics. In the context of this tutorial, understanding virtual dispatch helps explain why polymorphism works cleanly with abstract base types and interfaces. A strong interview answer should state that Java does not require a special virtual keyword for normal instance methods, while also noting that final methods cannot be overridden.

### 9. How do sealed classes relate to abstraction (newer Java)?
**Short Answer:** Sealed classes restrict who can extend an abstraction, giving stronger control over type hierarchies.
**Detailed Explanation:** Sealed classes allow you to explicitly define which classes are permitted to extend or implement a type. This improves abstraction control by preventing uncontrolled subtype creation. It is especially useful in domain models where allowed variants are finite, such as workflow states or expression trees. In modern Java, this also supports safer exhaustive pattern handling because the compiler knows possible subtypes. For interview answers, connect sealed types with intentional domain modeling and stronger invariants. In this tutorial context, sealed classes are an advanced extension of abstraction principles, helping teams design clearer, safer hierarchies without giving up object-oriented flexibility.

### 10. Why too much abstraction hurts?
**Short Answer:** Excess abstraction adds unnecessary indirection, making code harder to understand and maintain.
**Detailed Explanation:** Abstraction is valuable only when it solves real variation or complexity. If introduced too early, it creates extra layers, confusing names, and harder debugging paths without practical benefit. This is a common beginner mistake: building generic interfaces before there is a real second implementation need. In this tutorial and interview context, mature design means balancing flexibility with simplicity. Good engineers apply abstraction where change is expected and keep code concrete where behavior is stable. A strong answer shows awareness of trade-offs and mentions iterative refactoring. You should introduce abstractions when evidence appears, not only because abstraction is considered a good practice in theory.

---

## Deep Theory: What Abstraction Really Solves

Abstraction is a complexity-control mechanism. In object-oriented design, systems fail not because classes cannot be written, but because behavior is tightly coupled to concrete details. Abstraction separates:

- what the system promises (contract),
- from how each implementation fulfills that promise (mechanism).

This separation lets large systems evolve without forcing global rewrites.

### Conceptual Model

Think in layers:

1. Contract layer: stable operations expected by callers.
2. Policy layer: shared rules that apply to all implementations.
3. Implementation layer: provider-specific logic.

In Java, abstract classes and interfaces encode this model. Abstract classes are useful when you need both shared state/logic and mandatory specialized behavior.

### Why It Matters in Architecture

Without abstraction, service code directly depends on concrete classes, creating ripple effects when business rules change. With abstraction, change is localized:

- New implementation added: caller code often unchanged.
- Existing implementation replaced: integration impact minimized.
- Testing improved: mock/fake implementations become straightforward.

### Common Misunderstanding

Abstraction is not "hiding code"; it is "stabilizing contracts under change." A good abstraction is judged by long-term maintainability, not by fewer lines today.

### Trade-offs

- Too little abstraction: duplication and tight coupling.
- Too much abstraction: indirection overhead and cognitive load.

Good engineers introduce abstraction where variation is expected and keep it concrete where variation is unlikely.

`,
  code: `// Abstraction Demo

public class AbstractionDemo {
    public static void main(String[] args) {
        System.out.println("=== Abstraction Demo ===\\n");
        
        // 1. BASIC ABSTRACT CLASS
        System.out.println("1. BASIC ABSTRACT CLASS");
        System.out.println("   ---------------------");
        
        // Animal animal = new Animal("Generic");  // ERROR! Can't instantiate
        
        Animal dog = new Dog("Buddy");
        Animal cat = new Cat("Whiskers");
        
        dog.makeSound();  // Abstract method - implemented by Dog
        dog.sleep();      // Concrete method - inherited from Animal
        
        cat.makeSound();
        cat.sleep();
        System.out.println();
        
        // 2. SHAPE HIERARCHY
        System.out.println("2. SHAPE HIERARCHY");
        System.out.println("   ----------------");
        
        Shape[] shapes = {
            new Circle(5),
            new Rectangle(4, 6),
            new Triangle(3, 4)
        };
        
        for (Shape shape : shapes) {
            shape.draw();
            System.out.println("   Area: " + String.format("%.2f", shape.getArea()));
            System.out.println("   Perimeter: " + String.format("%.2f", shape.getPerimeter()));
            System.out.println();
        }
        
        // 3. TEMPLATE METHOD PATTERN
        System.out.println("3. TEMPLATE METHOD PATTERN");
        System.out.println("   ------------------------");
        
        DataProcessor csvProcessor = new CSVProcessor();
        DataProcessor jsonProcessor = new JSONProcessor();
        
        System.out.println("Processing CSV:");
        csvProcessor.process();
        
        System.out.println("\\nProcessing JSON:");
        jsonProcessor.process();
        System.out.println();
        
        // 4. REAL-WORLD EXAMPLE - Payment
        System.out.println("4. REAL-WORLD EXAMPLE - Payment System");
        System.out.println("   ------------------------------------");
        
        PaymentMethod[] payments = {
            new CreditCard("Dattu p", "1234567890123456"),
            new BankTransfer("Jane Doe", "ACC123456"),
            new DigitalWallet("Bob", "bob@wallet.com")
        };
        
        for (PaymentMethod payment : payments) {
            payment.pay(100.00);
            System.out.println();
        }
        
        // 5. ABSTRACT CLASS WITH CONSTRUCTOR
        System.out.println("5. ABSTRACT CLASS WITH CONSTRUCTOR");
        System.out.println("   ---------------------------------");
        
        Employee manager = new Manager("Alice", "M001", 80000, 20000);
        Employee developer = new Developer("Bob", "D001", 70000, "Java");
        
        manager.displayInfo();
        developer.displayInfo();
    }
}

// Basic abstract class
abstract class Animal {
    protected String name;
    
    Animal(String name) {
        this.name = name;
    }
    
    // Abstract method - must be implemented
    abstract void makeSound();
    
    // Concrete method - can be inherited
    void sleep() {
        System.out.println("   " + name + " is sleeping... Zzz");
    }
}

class Dog extends Animal {
    Dog(String name) {
        super(name);
    }
    
    @Override
    void makeSound() {
        System.out.println("   " + name + " says: Woof! Woof!");
    }
}

class Cat extends Animal {
    Cat(String name) {
        super(name);
    }
    
    @Override
    void makeSound() {
        System.out.println("   " + name + " says: Meow!");
    }
}

// Shape hierarchy
abstract class Shape {
    abstract void draw();
    abstract double getArea();
    abstract double getPerimeter();
}

class Circle extends Shape {
    private double radius;
    
    Circle(double radius) {
        this.radius = radius;
    }
    
    @Override
    void draw() {
        System.out.println("   Drawing Circle (radius: " + radius + ")");
    }
    
    @Override
    double getArea() {
        return Math.PI * radius * radius;
    }
    
    @Override
    double getPerimeter() {
        return 2 * Math.PI * radius;
    }
}

class Rectangle extends Shape {
    private double width, height;
    
    Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }
    
    @Override
    void draw() {
        System.out.println("   Drawing Rectangle (" + width + " x " + height + ")");
    }
    
    @Override
    double getArea() {
        return width * height;
    }
    
    @Override
    double getPerimeter() {
        return 2 * (width + height);
    }
}

class Triangle extends Shape {
    private double base, height;
    
    Triangle(double base, double height) {
        this.base = base;
        this.height = height;
    }
    
    @Override
    void draw() {
        System.out.println("   Drawing Triangle (base: " + base + ", height: " + height + ")");
    }
    
    @Override
    double getArea() {
        return 0.5 * base * height;
    }
    
    @Override
    double getPerimeter() {
        // Assuming right triangle
        double hypotenuse = Math.sqrt(base * base + height * height);
        return base + height + hypotenuse;
    }
}

// Template Method Pattern
abstract class DataProcessor {
    // Template method - defines the algorithm
    final void process() {
        readData();
        processData();
        writeData();
    }
    
    // Abstract methods - subclasses provide implementation
    abstract void readData();
    abstract void processData();
    abstract void writeData();
}

class CSVProcessor extends DataProcessor {
    @Override
    void readData() {
        System.out.println("   Reading CSV file...");
    }
    
    @Override
    void processData() {
        System.out.println("   Parsing CSV data...");
    }
    
    @Override
    void writeData() {
        System.out.println("   Writing processed CSV...");
    }
}

class JSONProcessor extends DataProcessor {
    @Override
    void readData() {
        System.out.println("   Reading JSON file...");
    }
    
    @Override
    void processData() {
        System.out.println("   Parsing JSON data...");
    }
    
    @Override
    void writeData() {
        System.out.println("   Writing processed JSON...");
    }
}

// Payment system
abstract class PaymentMethod {
    protected String ownerName;
    
    PaymentMethod(String ownerName) {
        this.ownerName = ownerName;
    }
    
    abstract void pay(double amount);
    
    void printReceipt(double amount) {
        System.out.println("   Receipt: $" + amount + " paid by " + ownerName);
    }
}

class CreditCard extends PaymentMethod {
    private String cardNumber;
    
    CreditCard(String ownerName, String cardNumber) {
        super(ownerName);
        this.cardNumber = cardNumber;
    }
    
    @Override
    void pay(double amount) {
        System.out.println("   💳 Credit Card Payment");
        System.out.println("   Card: ****" + cardNumber.substring(12));
        printReceipt(amount);
    }
}

class BankTransfer extends PaymentMethod {
    private String accountNumber;
    
    BankTransfer(String ownerName, String accountNumber) {
        super(ownerName);
        this.accountNumber = accountNumber;
    }
    
    @Override
    void pay(double amount) {
        System.out.println("   🏦 Bank Transfer");
        System.out.println("   Account: " + accountNumber);
        printReceipt(amount);
    }
}

class DigitalWallet extends PaymentMethod {
    private String email;
    
    DigitalWallet(String ownerName, String email) {
        super(ownerName);
        this.email = email;
    }
    
    @Override
    void pay(double amount) {
        System.out.println("   📱 Digital Wallet Payment");
        System.out.println("   Email: " + email);
        printReceipt(amount);
    }
}

// Employee hierarchy
abstract class Employee {
    protected String name;
    protected String id;
    protected double baseSalary;
    
    Employee(String name, String id, double baseSalary) {
        this.name = name;
        this.id = id;
        this.baseSalary = baseSalary;
    }
    
    abstract double calculateSalary();
    
    void displayInfo() {
        System.out.println("   " + getClass().getSimpleName() + ": " + name + 
                          " (" + id + ") - Salary: $" + calculateSalary());
    }
}

class Manager extends Employee {
    private double bonus;
    
    Manager(String name, String id, double baseSalary, double bonus) {
        super(name, id, baseSalary);
        this.bonus = bonus;
    }
    
    @Override
    double calculateSalary() {
        return baseSalary + bonus;
    }
}

class Developer extends Employee {
    private String specialization;
    
    Developer(String name, String id, double baseSalary, String specialization) {
        super(name, id, baseSalary);
        this.specialization = specialization;
    }
    
    @Override
    double calculateSalary() {
        return baseSalary;  // Could add skill-based bonus
    }
}`,
  practiceQuestions: [
    {
      question: 'Create an abstract Vehicle class with Car and Motorcycle subclasses',
      hint: 'Include abstract methods for start, stop, and fuel consumption',
      starterCode: `public class VehicleDemo {
    public static void main(String[] args) {
        System.out.println("=== Vehicle Abstraction ===\\n");
        
        Vehicle[] vehicles = {
            new Car("Toyota Camry", 4, 30),
            new Motorcycle("Harley Davidson", "Cruiser", 45),
            new Car("Honda Civic", 4, 35)
        };
        
        for (Vehicle vehicle : vehicles) {
            System.out.println("Vehicle: " + vehicle.getName());
            vehicle.start();
            vehicle.accelerate();
            System.out.println("Fuel efficiency: " + vehicle.getFuelEfficiency() + " mpg");
            vehicle.stop();
            System.out.println();
        }
    }
}

abstract class Vehicle {
    protected String name;
    
    Vehicle(String name) {
        this.name = name;
    }
    
    String getName() {
        return name;
    }
    
    // Abstract methods
    abstract void start();
    abstract void stop();
    abstract void accelerate();
    abstract double getFuelEfficiency();
}

class Car extends Vehicle {
    private int doors;
    private double mpg;
    
    Car(String name, int doors, double mpg) {
        super(name);
        this.doors = doors;
        this.mpg = mpg;
    }
    
    @Override
    void start() {
        System.out.println("   🚗 " + name + " engine started (keyless ignition)");
    }
    
    @Override
    void stop() {
        System.out.println("   🚗 " + name + " engine stopped");
    }
    
    @Override
    void accelerate() {
        System.out.println("   🚗 " + name + " accelerating smoothly...");
    }
    
    @Override
    double getFuelEfficiency() {
        return mpg;
    }
}

class Motorcycle extends Vehicle {
    private String type;
    private double mpg;
    
    Motorcycle(String name, String type, double mpg) {
        super(name);
        this.type = type;
        this.mpg = mpg;
    }
    
    @Override
    void start() {
        System.out.println("   🏍️ " + name + " (" + type + ") roars to life!");
    }
    
    @Override
    void stop() {
        System.out.println("   🏍️ " + name + " engine stopped");
    }
    
    @Override
    void accelerate() {
        System.out.println("   🏍️ " + name + " accelerating with a roar!");
    }
    
    @Override
    double getFuelEfficiency() {
        return mpg;
    }
}`
    }
  ]
};

export default abstraction;
