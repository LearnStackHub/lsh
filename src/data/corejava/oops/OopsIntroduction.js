const oopsIntroduction = {
  id: 'oops-introduction',
  title: 'Introduction to OOPs',
  description: 'Understanding Object-Oriented Programming — the backbone of Java',
  content: `
# Object-Oriented Programming (OOP)

Object-Oriented Programming (OOP) is a programming paradigm that organizes software design around objects rather than functions and logic. Core concepts like encapsulation, inheritance, polymorphism, and abstraction form the foundation of modern software development, enabling developers to build maintainable, scalable, and reusable code.

OOP principles provide a structured approach to modeling real-world entities and their relationships in software applications.

---

## Real-Time Scenarios: OOP in Daily Life

### Scenario 1: E-Commerce Shopping Cart (Amazon, Flipkart)

**Daily Life:** When you shop online, everything is an object:

\`\`\`java
// Real-world: Shopping on Amazon
class Product {
    private String name;
    private double price;
    private int stock;
    
    public void addToCart() { /* Add to cart logic */ }
    public void updatePrice(double newPrice) { /* Update price */ }
}

class ShoppingCart {
    private List<Product> items;
    private double totalAmount;
    
    public void addItem(Product product) { /* Add item */ }
    public void calculateTotal() { /* Calculate total */ }
    public void checkout() { /* Process payment */ }
}

// Usage in real application
Product laptop = new Product("Laptop", 50000, 10);
ShoppingCart cart = new ShoppingCart();
cart.addItem(laptop);
cart.checkout(); // Complete purchase
\`\`\`

**Why OOP?** Each concept (Product, Cart) is a self-contained object with its own data and behavior.

### Scenario 2: Social Media Platform (Facebook, Instagram)

**Daily Life:** Every feature uses OOP:

\`\`\`java
// Real-world: Social media post
class User {
    private String username;
    private String email;
    private List<Post> posts;
    
    public void createPost(String content) { /* Create post */ }
    public void likePost(Post post) { /* Like a post */ }
    public void commentOnPost(Post post, String comment) { /* Comment */ }
}

class Post {
    private String content;
    private User author;
    private int likes;
    private List<Comment> comments;
    
    public void addLike() { /* Increment likes */ }
    public void addComment(Comment comment) { /* Add comment */ }
}

// Usage
User john = new User("john_doe", "john@example.com");
Post myPost = john.createPost("Hello World!");
myPost.addLike(); // Someone liked the post
\`\`\`

**Why OOP?** User and Post are separate objects that interact with each other.

### Scenario 3: Banking Application (ATM, Online Banking)

**Daily Life:** Banking operations use OOP extensively:

\`\`\`java
// Real-world: Bank account operations
class BankAccount {
    private String accountNumber;
    private double balance;
    private String accountHolder;
    
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Deposited: $" + amount);
        }
    }
    
    public void withdraw(double amount) {
        if (amount > 0 && balance >= amount) {
            balance -= amount;
            System.out.println("Withdrawn: $" + amount);
        } else {
            System.out.println("Insufficient balance");
        }
    }
    
    public double getBalance() {
        return balance;
    }
}

// Usage: ATM transaction
BankAccount myAccount = new BankAccount("123456", 10000, "John Doe");
myAccount.withdraw(500); // ATM withdrawal
myAccount.deposit(2000); // Deposit check
\`\`\`

**Why OOP?** Account is an object that protects its data (balance) and provides controlled access.

### Scenario 4: Hospital Management System

**Daily Life:** Hospital systems use OOP for organization:

\`\`\`java
// Real-world: Patient management
class Patient {
    private String patientId;
    private String name;
    private int age;
    private List<Appointment> appointments;
    
    public void bookAppointment(Doctor doctor, Date date) { /* Book appointment */ }
    public void viewMedicalHistory() { /* View history */ }
}

class Doctor {
    private String doctorId;
    private String specialization;
    private List<Appointment> appointments;
    
    public void diagnosePatient(Patient patient) { /* Diagnose */ }
    public void prescribeMedicine(Patient patient, Medicine medicine) { /* Prescribe */ }
}

// Usage
Patient patient = new Patient("P001", "John", 35);
Doctor doctor = new Doctor("D001", "Cardiologist");
patient.bookAppointment(doctor, new Date());
\`\`\`

**Why OOP?** Patient and Doctor are separate objects that can interact while maintaining their own data.

### Scenario 5: Online Food Delivery (Swiggy, Zomato)

**Daily Life:** Food delivery apps use OOP:

\`\`\`java
// Real-world: Food ordering
class Restaurant {
    private String name;
    private String cuisine;
    private List<MenuItem> menu;
    
    public void addMenuItem(MenuItem item) { /* Add to menu */ }
    public void updateMenu() { /* Update menu */ }
}

class Order {
    private String orderId;
    private Restaurant restaurant;
    private List<MenuItem> items;
    private double totalAmount;
    
    public void addItem(MenuItem item) { /* Add item to order */ }
    public void calculateTotal() { /* Calculate total */ }
    public void placeOrder() { /* Place order */ }
}

// Usage
Restaurant restaurant = new Restaurant("Pizza Hut", "Italian");
Order myOrder = new Order();
myOrder.addItem(new MenuItem("Pizza", 299));
myOrder.placeOrder();
\`\`\`

**Why OOP?** Restaurant, Order, and MenuItem are separate objects that work together.

---

## What's the Big Deal About OOP?

Before OOP, we had **procedural programming**. You'd write a bunch of functions, pass data around, and hope everything worked. It was like cooking in a messy kitchen — ingredients everywhere, no organization.

OOP changed that. Instead of thinking about functions and data separately, we combine them into **objects**. An object is like a container that holds both data (what it knows) and methods (what it can do).

Think about a **Car**:
- It has data: color, speed, fuel level
- It has behaviors: start(), accelerate(), brake()

In OOP, we'd create a Car object that bundles all of this together. Clean, organized, and easy to work with.

---

## The Four Pillars of OOP

OOP is built on four fundamental principles that guide software design and implementation.

### 1. Encapsulation — Data Protection and Controlled Access

Encapsulation involves bundling data and methods that operate on that data within a single unit (class), while restricting direct access to internal implementation details. This principle ensures data integrity and provides controlled access through public methods.

**Bank Account Example:**
A bank account balance should not be directly modifiable by external code. Instead, access is controlled through methods like deposit() and withdraw(), which include validation logic.

\`\`\`java
public class BankAccount {
    private double balance;  // Hidden from outside
    
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }
    
    public double getBalance() {
        return balance;
    }
}
\`\`\`

The \`balance\` field is declared private, preventing direct external modification. External code cannot execute \`account.balance = 1000000\` and must use the provided methods. This design protects data integrity and enables validation logic.

**Enterprise Application Example:** In banking systems, account balances are encapsulated within account objects. Balance modifications occur only through validated transaction methods, ensuring audit trails and preventing unauthorized changes.

---

### 2. Inheritance — Code Reusability and Hierarchical Organization

Inheritance enables a class to acquire properties and methods from another class, promoting code reuse and establishing hierarchical relationships. Derived classes extend base classes, inheriting functionality while adding specialized features.

**E-Commerce Product Hierarchy:**
E-commerce platforms categorize products (Electronics, Clothing, Books) that share common attributes (name, price, description) but have unique properties. Inheritance eliminates code duplication by defining shared functionality in a base class:

\`\`\`java
class Product {
    String name;
    double price;
    
    void displayInfo() {
        System.out.println(name + " - $" + price);
    }
}

class Electronics extends Product {
    int warrantyMonths;
    
    void displayInfo() {
        super.displayInfo();
        System.out.println("Warranty: " + warrantyMonths + " months");
    }
}
\`\`\`

The \`Electronics\` class inherits all members from \`Product\` and can extend functionality with specialized properties and methods. This demonstrates inheritance: building specialized classes upon existing foundations.

**Enterprise Application Example:** In enterprise systems, inheritance creates taxonomies where base classes define common behavior (e.g., \`BaseEntity\` with id, createdAt) and derived classes add domain-specific functionality (e.g., \`User\`, \`Product\`, \`Order\`).

---

### 3. Polymorphism — One Interface, Multiple Implementations

Polymorphism allows objects of different types to be treated through the same interface, with each type providing its own implementation. This enables flexible, extensible code that can work with various implementations without modification.

**Payment Processing Example:**
E-commerce checkout systems process payments through a unified interface, but implementation varies by payment method:
- Credit card: Process card authorization and charge
- UPI: Generate payment QR code and verify transaction
- Cash on delivery: Confirm order without payment processing

The same \`processPayment()\` method call produces different behaviors based on the payment method type, demonstrating polymorphism.

\`\`\`java
interface PaymentMethod {
    void processPayment(double amount);
}

class CreditCard implements PaymentMethod {
    public void processPayment(double amount) {
        System.out.println("Charging $" + amount + " to credit card");
        // Validate card, charge it, etc.
    }
}

class UPI implements PaymentMethod {
    public void processPayment(double amount) {
        System.out.println("Processing $" + amount + " via UPI");
        // Generate QR, wait for confirmation, etc.
    }
}
\`\`\`

The checkout system operates through the \`PaymentMethod\` interface without knowing specific implementations. Calling \`processPayment()\` triggers the appropriate implementation based on the object type, demonstrating polymorphic behavior.

**Enterprise Application Example:** In payment gateway integrations, the same payment processing API handles multiple payment providers (Stripe, PayPal, Razorpay) through polymorphic interfaces, enabling easy provider switching without modifying business logic.

---

### 4. Abstraction — Simplifying Complex Systems

Abstraction focuses on essential features while hiding implementation complexity. Abstract classes and interfaces define contracts (what an object can do) without specifying how operations are performed internally.

**Automotive System Analogy:**
Drivers interact with vehicles through simple controls (start, accelerate, brake) without understanding internal mechanisms (engine combustion, transmission systems, electronic control units). The vehicle's interface abstracts away complexity.

\`\`\`java
abstract class Vehicle {
    abstract void start();
    abstract void stop();
    
    void honk() {
        System.out.println("Beep beep!");
    }
}

class Car extends Vehicle {
    void start() {
        // All the complex stuff happens here
        System.out.println("Car started");
    }
    
    void stop() {
        System.out.println("Car stopped");
    }
}
\`\`\`

Clients using the \`Car\` class invoke \`start()\` without understanding internal implementation details. The abstract \`Vehicle\` class defines the interface, while concrete implementations handle complexity.

**Enterprise System Example:** Database connection abstractions (JDBC, JPA) hide implementation details (connection pooling, SQL generation, transaction management) behind simple interfaces, enabling developers to work with databases without understanding low-level protocols.

---

## Why OOP Matters in Enterprise Development

OOP principles provide significant benefits for building maintainable, scalable software systems:

**1. Maintainability**
When code is organized into objects, it's easier to find and fix bugs. If there's a problem with payments, you know to look in the payment classes.

**2. Reusability**
Write once, use everywhere. That \`Product\` class? You can use it across your entire application.

**3. Teamwork**
In a team, different people can work on different classes without stepping on each other's toes. You work on \`PaymentService\`, I work on \`OrderService\`.

**4. Scalability**
Need to add a new payment method? Just create a new class that implements \`PaymentMethod\`. No need to touch existing code.

---

## A Common Mistake

Here's something I see beginners do: They learn about OOP and then try to make *everything* a class. Don't do that.

OOP is a tool, not a religion. Sometimes a simple function is all you need. Use OOP when it makes sense — when you have data and behavior that naturally belong together.

---

## Putting It All Together

Let me show you how these concepts work together in a real scenario — an e-commerce order system:

\`\`\`java
// Encapsulation: Order details are private
class Order {
    private String orderId;
    private double total;
    private String status;
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}

// Inheritance: Different order types
class ExpressOrder extends Order {
    private int deliveryHours;
}

// Polymorphism: Different shipping methods
interface ShippingMethod {
    void ship(Order order);
}

class StandardShipping implements ShippingMethod {
    public void ship(Order order) {
        System.out.println("Shipping in 5-7 days");
    }
}

class ExpressShipping implements ShippingMethod {
    public void ship(Order order) {
        System.out.println("Shipping in 1-2 days");
    }
}

// Abstraction: User just calls placeOrder()
class OrderService {
    public void placeOrder(Order order, ShippingMethod shipping) {
        // Validate order
        // Process payment
        // Update inventory
        shipping.ship(order);
        // Send confirmation email
    }
}
\`\`\`

See how clean that is? Each piece has a clear responsibility. That's the power of OOP.

---

## What's Next?

Now that you understand the concepts, it's time to dive deeper into each one. In the next lessons, we'll explore:
- **[Classes and Objects](/tutorial/classes-objects)** — Create and use objects
- **[Constructors](/tutorial/constructors)** — Initialize objects properly
- **[Inheritance](/tutorial/inheritance)** — Build on existing classes
- **[Polymorphism](/tutorial/polymorphism)** — One interface, many forms
- **[Encapsulation](/tutorial/encapsulation)** — Data hiding and access control
- **[Abstraction](/tutorial/abstraction)** — Hide complexity, show essentials
- **[Interfaces](/tutorial/interfaces)** — Define contracts for classes

**Prerequisites:**
- Learn [Java Introduction](/tutorial/java-introduction) basics
- Understand [Java Variables](/tutorial/java-variables) and [Java Methods](/tutorial/java-methods)

**Next Level:**
- Use OOPs in [Spring Framework](/tutorial/spring-framework-introduction)
- Build applications with [Spring Boot](/tutorial/spring-boot-introduction)

But before you move on, try to identify OOP concepts in apps you use daily. That Instagram post? It's probably an object with properties like image, caption, likes. The like button? Polymorphism — same button, different behavior for posts vs stories.

Once you start seeing OOP everywhere, you'll truly understand it.
`,
  code: `// Let's see OOP in action with a simple example
// We'll build a basic e-commerce product system

public class OOPDemo {
    public static void main(String[] args) {
        System.out.println("=== OOP Concepts Demo ===");
        System.out.println();
        
        // ENCAPSULATION
        // Notice how we use methods to interact with the product
        System.out.println("1. ENCAPSULATION");
        System.out.println("   Creating a product with controlled access...");
        
        String productName = "iPhone 15";
        double productPrice = 999.99;
        int productStock = 50;
        
        System.out.println("   Product: " + productName);
        System.out.println("   Price: $" + productPrice);
        System.out.println("   Stock: " + productStock);
        System.out.println();
        
        // INHERITANCE
        // Different product types share common properties
        System.out.println("2. INHERITANCE");
        System.out.println("   Product hierarchy:");
        System.out.println("   Product (base)");
        System.out.println("     |-- Electronics (has warranty)");
        System.out.println("     |-- Clothing (has size)");
        System.out.println("     |-- Books (has author)");
        System.out.println();
        
        // POLYMORPHISM
        // Same method name, different behavior
        System.out.println("3. POLYMORPHISM");
        System.out.println("   Payment processing:");
        System.out.println("   - CreditCard.pay() -> Charges card");
        System.out.println("   - UPI.pay() -> Generates QR code");
        System.out.println("   - Wallet.pay() -> Deducts from balance");
        System.out.println("   Same method, different implementations!");
        System.out.println();
        
        // ABSTRACTION
        // Hide complexity, show simplicity
        System.out.println("4. ABSTRACTION");
        System.out.println("   User clicks 'Place Order'");
        System.out.println("   Behind the scenes:");
        System.out.println("   - Validate cart");
        System.out.println("   - Check inventory");
        System.out.println("   - Process payment");
        System.out.println("   - Create shipment");
        System.out.println("   - Send email");
        System.out.println("   User just sees: 'Order Placed!'");
        System.out.println();
        
        // Summary
        System.out.println("=== Summary ===");
        System.out.println("Encapsulation = Protect your data");
        System.out.println("Inheritance = Reuse existing code");
        System.out.println("Polymorphism = Same action, different behavior");
        System.out.println("Abstraction = Hide the complexity");
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a simple Student class with encapsulation',
      hint: 'Make the fields private and provide getter/setter methods',
      starterCode: `public class Student {
    // Make these private
    private String name;
    private int age;
    private double gpa;
    
    // Constructor
    public Student(String name, int age) {
        this.name = name;
        this.age = age;
        this.gpa = 0.0;
    }
    
    // Getter for name
    public String getName() {
        return name;
    }
    
    // Setter for GPA with validation
    public void setGpa(double gpa) {
        if (gpa >= 0.0 && gpa <= 4.0) {
            this.gpa = gpa;
        } else {
            System.out.println("Invalid GPA! Must be between 0 and 4");
        }
    }
    
    // Add more getters and setters
    // Add a method to display student info
    
    public static void main(String[] args) {
        Student student = new Student("John", 20);
        student.setGpa(3.5);
        System.out.println("Student: " + student.getName());
    }
}`
    }
  ]
};

export default oopsIntroduction;
