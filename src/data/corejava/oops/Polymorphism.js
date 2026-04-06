const polymorphism = {
  id: 'polymorphism',
  title: 'Polymorphism',
  description: 'One interface, many implementations',
  content: `
# Polymorphism - One Interface, Many Implementations

Polymorphism is a fundamental object-oriented programming concept that enables objects of different types to be treated through the same interface. The term derives from Greek: "poly" (many) + "morph" (form), meaning "many forms." In Java, polymorphism allows the same method call to produce different behaviors depending on the actual object type at runtime.

Polymorphism is essential for building flexible, extensible software systems. It enables developers to write code that works with base class types while automatically utilizing derived class implementations. Enterprise applications extensively use polymorphism for plugin architectures, framework design, and creating maintainable code that can be extended without modification.

---

## Two Types of Polymorphism

### 1. Compile-Time (Static) Polymorphism
Decided at compile time. Achieved through **method overloading**.

### 2. Runtime (Dynamic) Polymorphism
Decided at runtime. Achieved through **method overriding**.

---

## Method Overloading (Compile-Time)

Same method name, different parameters:

\`\`\`java
public class Calculator {
    // Same name, different parameters
    int add(int a, int b) {
        return a + b;
    }
    
    int add(int a, int b, int c) {
        return a + b + c;
    }
    
    double add(double a, double b) {
        return a + b;
    }
}

Calculator calc = new Calculator();
calc.add(5, 3);        // Calls first method
calc.add(5, 3, 2);     // Calls second method
calc.add(5.5, 3.3);    // Calls third method
\`\`\`

**The compiler decides which method to call based on the arguments.**

---

## Method Overriding (Runtime)

Child class provides its own implementation of a parent method:

\`\`\`java
class Animal {
    void makeSound() {
        System.out.println("Some sound");
    }
}

class Dog extends Animal {
    @Override
    void makeSound() {
        System.out.println("Woof!");
    }
}

class Cat extends Animal {
    @Override
    void makeSound() {
        System.out.println("Meow!");
    }
}
\`\`\`

**The JVM decides which method to call based on the actual object type at runtime.**

---

## The Magic of Runtime Polymorphism

\`\`\`java
Animal myPet;

myPet = new Dog();
myPet.makeSound();  // Output: Woof!

myPet = new Cat();
myPet.makeSound();  // Output: Meow!
\`\`\`

The variable type is \`Animal\`, but the actual behavior depends on the object it references. This is **dynamic method dispatch**.

---

## Why Polymorphism Matters

### Without Polymorphism (Ugly Code)

\`\`\`java
void processAnimal(Object animal) {
    if (animal instanceof Dog) {
        ((Dog) animal).makeSound();
    } else if (animal instanceof Cat) {
        ((Cat) animal).makeSound();
    } else if (animal instanceof Bird) {
        ((Bird) animal).makeSound();
    }
    // Add more else-if for each new animal type... 😫
}
\`\`\`

### With Polymorphism (Clean Code)

\`\`\`java
void processAnimal(Animal animal) {
    animal.makeSound();  // Works for ANY animal!
}
\`\`\`

Add a new animal type? Just create a new class. No changes needed to \`processAnimal\`.

---

## Polymorphism with Arrays/Collections

\`\`\`java
Animal[] zoo = new Animal[3];
zoo[0] = new Dog();
zoo[1] = new Cat();
zoo[2] = new Bird();

for (Animal animal : zoo) {
    animal.makeSound();  // Each makes its own sound!
}
\`\`\`

Output:
\`\`\`
Woof!
Meow!
Tweet!
\`\`\`

---

## Upcasting and Downcasting

### Upcasting (Automatic)
Child to parent — always safe:

\`\`\`java
Dog dog = new Dog();
Animal animal = dog;  // Upcasting - automatic
\`\`\`

### Downcasting (Manual)
Parent to child — requires explicit cast:

\`\`\`java
Animal animal = new Dog();
Dog dog = (Dog) animal;  // Downcasting - manual

// Be careful!
Animal animal2 = new Cat();
Dog dog2 = (Dog) animal2;  // ClassCastException! Cat is not a Dog
\`\`\`

### Safe Downcasting with instanceof

\`\`\`java
if (animal instanceof Dog) {
    Dog dog = (Dog) animal;
    dog.fetch();  // Dog-specific method
}
\`\`\`

---

## Real-World Example: Payment System

\`\`\`java
abstract class Payment {
    protected double amount;
    
    public Payment(double amount) {
        this.amount = amount;
    }
    
    abstract void processPayment();
}

class CreditCardPayment extends Payment {
    private String cardNumber;
    
    public CreditCardPayment(double amount, String cardNumber) {
        super(amount);
        this.cardNumber = cardNumber;
    }
    
    @Override
    void processPayment() {
        System.out.println("Processing credit card payment of $" + amount);
        System.out.println("Card: ****" + cardNumber.substring(12));
    }
}

class PayPalPayment extends Payment {
    private String email;
    
    public PayPalPayment(double amount, String email) {
        super(amount);
        this.email = email;
    }
    
    @Override
    void processPayment() {
        System.out.println("Processing PayPal payment of $" + amount);
        System.out.println("Account: " + email);
    }
}

class CryptoPayment extends Payment {
    private String walletAddress;
    
    public CryptoPayment(double amount, String walletAddress) {
        super(amount);
        this.walletAddress = walletAddress;
    }
    
    @Override
    void processPayment() {
        System.out.println("Processing crypto payment of $" + amount);
        System.out.println("Wallet: " + walletAddress.substring(0, 10) + "...");
    }
}

// Usage - polymorphism in action!
class PaymentProcessor {
    void process(Payment payment) {
        payment.processPayment();  // Works for ANY payment type!
    }
}
\`\`\`

Add a new payment method (Apple Pay, Google Pay)? Just create a new class. The \`PaymentProcessor\` doesn't need to change!

---

## Overloading vs Overriding

| Aspect | Overloading | Overriding |
|--------|-------------|------------|
| When | Compile-time | Runtime |
| Where | Same class | Parent-child |
| Parameters | Must differ | Must be same |
| Return type | Can differ | Same or covariant |
| Access | Can differ | Same or wider |
| Keyword | None | @Override |

---

## 10 Important Polymorphism Interview Questions

### 1. What is compile-time vs runtime polymorphism?
**Answer:** Overloading resolves at compile time; overriding resolves at runtime via virtual method dispatch on the actual object type.
Interviewers love this distinction.

### 2. How does JVM invoke virtual methods?
**Answer:** Dynamic dispatch using class metadata—late binding allows subclass implementations to run through superclass references.
Performance is optimized by JIT inline caches.

### 3. What is upcasting and why is it safe?
**Answer:** Assign subclass reference to superclass type—callers use abstract contracts; downcasting needs \`instanceof\` checks.
Enables APIs accepting \`List<Shape>\` processing \`Circle\`, \`Square\`.

### 4. Can polymorphism apply to static methods or fields?
**Answer:** No virtual dispatch for statics—hidden by class; fields are not polymorphic—avoid “overriding” fields—use accessors.
Common trick question.

### 5. Scenario: plugin architecture—how does polymorphism help?
**Answer:** Core code depends on interfaces; plugins supply implementations discovered at runtime (SPI, DI containers).
Open/Closed principle in action.

### 6. What is double dispatch?
**Answer:** Technique to route operations based on two polymorphic types—visitor pattern solves expression problem.
Advanced OOP topic for senior roles.

### 7. How do generics interact with polymorphism?
**Answer:** Generics are invariant (\`List<String>\` not subtype of \`List<Object>\`) to preserve type safety—use wildcards for flexibility.
PECS principle guides bounds.

### 8. What is covariant return types in overriding?
**Answer:** Overriding method may return subtype of original return—allowed since Java 5.
Improves API precision in hierarchies.

### 9. Why is polymorphism hard with \`equals\` and \`hashCode\`?
**Answer:** Symmetric equality across inheritance requires careful design—often use \`Composition\` or \`canEqual\` pattern.
Broken contracts break hash-based collections.

### 10. What’s a performance consideration with polymorphic megamorphic call sites?
**Answer:** Too many implementation types can defeat inline caches—rare in business apps, relevant in language runtimes.
Profile before optimizing dispatch.
---

## Topic-Focused Practice for Polymorphism

### Real-World Scenarios

1. Build one mini exercise focused on **runtime method dispatch** and explain why your chosen approach is correct.
2. Add a second variation where **upcasting** changes the expected output or system behavior.
3. Document one production caution related to **extensible design** and how you would monitor it.

### Page-Specific Interview Questions

1. In Polymorphism, how do you decide between approaches related to **runtime method dispatch** when requirements conflict?
2. What debugging steps would you follow if **upcasting** behaves differently in development vs production?
3. Which performance or maintainability risks are introduced by **extensible design**, and how would you reduce them?
4. What is one real incident where misunderstanding **runtime method dispatch** can cause bugs or outages?
5. If you had to teach this topic to a fresher, how would you explain **upcasting** with a simple example?

### Implementation Checklist

- Verify functional correctness with at least two valid and two invalid input cases.
- Add one code example that highlights **runtime method dispatch** and one that highlights **upcasting**.
- Record typical errors around **extensible design** and add prevention notes in your project docs.
- Revisit related lessons and connect this concept to a complete end-to-end workflow.

`,
  code: `// Polymorphism Demo

public class PolymorphismDemo {
    public static void main(String[] args) {
        System.out.println("=== Polymorphism Demo ===\\n");
        
        // 1. METHOD OVERLOADING (Compile-time)
        System.out.println("1. METHOD OVERLOADING (Compile-time Polymorphism)");
        System.out.println("   -----------------------------------------------");
        
        Calculator calc = new Calculator();
        System.out.println("   add(5, 3) = " + calc.add(5, 3));
        System.out.println("   add(5, 3, 2) = " + calc.add(5, 3, 2));
        System.out.println("   add(5.5, 3.3) = " + calc.add(5.5, 3.3));
        System.out.println("   add(\"Hello\", \"World\") = " + calc.add("Hello", "World"));
        System.out.println();
        
        // 2. METHOD OVERRIDING (Runtime)
        System.out.println("2. METHOD OVERRIDING (Runtime Polymorphism)");
        System.out.println("   -----------------------------------------");
        
        Shape[] shapes = new Shape[3];
        shapes[0] = new Circle(5);
        shapes[1] = new Rectangle(4, 6);
        shapes[2] = new Triangle(3, 4);
        
        for (Shape shape : shapes) {
            shape.draw();
            System.out.println("      Area: " + String.format("%.2f", shape.getArea()));
        }
        System.out.println();
        
        // 3. DYNAMIC METHOD DISPATCH
        System.out.println("3. DYNAMIC METHOD DISPATCH");
        System.out.println("   ------------------------");
        
        Shape shape;  // Reference type is Shape
        
        shape = new Circle(3);
        System.out.println("   shape = new Circle(3)");
        shape.draw();  // Calls Circle's draw
        
        shape = new Rectangle(2, 4);
        System.out.println("   shape = new Rectangle(2, 4)");
        shape.draw();  // Calls Rectangle's draw
        System.out.println();
        
        // 4. POLYMORPHISM WITH COLLECTIONS
        System.out.println("4. POLYMORPHISM WITH COLLECTIONS");
        System.out.println("   -------------------------------");
        
        Animal[] zoo = {
            new Dog("Buddy"),
            new Cat("Whiskers"),
            new Bird("Tweety"),
            new Dog("Rex")
        };
        
        System.out.println("   Zoo sounds:");
        for (Animal animal : zoo) {
            System.out.print("   ");
            animal.makeSound();
        }
        System.out.println();
        
        // 5. UPCASTING AND DOWNCASTING
        System.out.println("5. UPCASTING AND DOWNCASTING");
        System.out.println("   --------------------------");
        
        Dog myDog = new Dog("Max");
        Animal animal = myDog;  // Upcasting - automatic
        System.out.println("   Upcasting: Dog → Animal (automatic)");
        animal.makeSound();
        
        // Downcasting with instanceof check
        if (animal instanceof Dog) {
            Dog downcastDog = (Dog) animal;  // Downcasting - manual
            System.out.println("   Downcasting: Animal → Dog (manual)");
            downcastDog.fetch();  // Dog-specific method
        }
        System.out.println();
        
        // 6. REAL-WORLD EXAMPLE - Payment System
        System.out.println("6. REAL-WORLD EXAMPLE - Payment System");
        System.out.println("   ------------------------------------");
        
        Payment[] payments = {
            new CreditCardPayment(100.00, "1234567890123456"),
            new PayPalPayment(50.00, "user@email.com"),
            new CryptoPayment(200.00, "0x1234567890abcdef1234567890abcdef12345678")
        };
        
        PaymentProcessor processor = new PaymentProcessor();
        for (Payment payment : payments) {
            processor.process(payment);
            System.out.println();
        }
    }
}

// Calculator with overloaded methods
class Calculator {
    int add(int a, int b) {
        return a + b;
    }
    
    int add(int a, int b, int c) {
        return a + b + c;
    }
    
    double add(double a, double b) {
        return a + b;
    }
    
    String add(String a, String b) {
        return a + " " + b;
    }
}

// Shape hierarchy
abstract class Shape {
    abstract void draw();
    abstract double getArea();
}

class Circle extends Shape {
    private double radius;
    
    Circle(double radius) {
        this.radius = radius;
    }
    
    @Override
    void draw() {
        System.out.println("   Drawing Circle with radius " + radius);
    }
    
    @Override
    double getArea() {
        return Math.PI * radius * radius;
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
        System.out.println("   Drawing Rectangle " + width + "x" + height);
    }
    
    @Override
    double getArea() {
        return width * height;
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
        System.out.println("   Drawing Triangle with base " + base);
    }
    
    @Override
    double getArea() {
        return 0.5 * base * height;
    }
}

// Animal hierarchy
class Animal {
    protected String name;
    
    Animal(String name) {
        this.name = name;
    }
    
    void makeSound() {
        System.out.println(name + " makes a sound");
    }
}

class Dog extends Animal {
    Dog(String name) {
        super(name);
    }
    
    @Override
    void makeSound() {
        System.out.println(name + " says: Woof! Woof!");
    }
    
    void fetch() {
        System.out.println(name + " is fetching the ball!");
    }
}

class Cat extends Animal {
    Cat(String name) {
        super(name);
    }
    
    @Override
    void makeSound() {
        System.out.println(name + " says: Meow!");
    }
}

class Bird extends Animal {
    Bird(String name) {
        super(name);
    }
    
    @Override
    void makeSound() {
        System.out.println(name + " says: Tweet! Tweet!");
    }
}

// Payment system
abstract class Payment {
    protected double amount;
    
    Payment(double amount) {
        this.amount = amount;
    }
    
    abstract void processPayment();
}

class CreditCardPayment extends Payment {
    private String cardNumber;
    
    CreditCardPayment(double amount, String cardNumber) {
        super(amount);
        this.cardNumber = cardNumber;
    }
    
    @Override
    void processPayment() {
        System.out.println("   💳 Credit Card Payment: $" + amount);
        System.out.println("      Card: ****" + cardNumber.substring(12));
    }
}

class PayPalPayment extends Payment {
    private String email;
    
    PayPalPayment(double amount, String email) {
        super(amount);
        this.email = email;
    }
    
    @Override
    void processPayment() {
        System.out.println("   🅿️ PayPal Payment: $" + amount);
        System.out.println("      Account: " + email);
    }
}

class CryptoPayment extends Payment {
    private String walletAddress;
    
    CryptoPayment(double amount, String walletAddress) {
        super(amount);
        this.walletAddress = walletAddress;
    }
    
    @Override
    void processPayment() {
        System.out.println("   ₿ Crypto Payment: $" + amount);
        System.out.println("      Wallet: " + walletAddress.substring(0, 10) + "...");
    }
}

class PaymentProcessor {
    void process(Payment payment) {
        payment.processPayment();
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a notification system using polymorphism',
      hint: 'Create different notification types: Email, SMS, Push',
      starterCode: `public class NotificationDemo {
    public static void main(String[] args) {
        System.out.println("=== Notification System ===\\n");
        
        // Create different notification types
        Notification[] notifications = {
            new EmailNotification("user@example.com", "Welcome!", "Thanks for signing up!"),
            new SMSNotification("+1234567890", "Your OTP is 123456"),
            new PushNotification("device123", "New Message", "You have a new message!")
        };
        
        // Send all notifications using polymorphism
        NotificationService service = new NotificationService();
        for (Notification notification : notifications) {
            service.send(notification);
            System.out.println();
        }
    }
}

abstract class Notification {
    protected String message;
    
    Notification(String message) {
        this.message = message;
    }
    
    abstract void send();
}

class EmailNotification extends Notification {
    private String email;
    private String subject;
    
    EmailNotification(String email, String subject, String message) {
        super(message);
        this.email = email;
        this.subject = subject;
    }
    
    @Override
    void send() {
        System.out.println("📧 Sending Email");
        System.out.println("   To: " + email);
        System.out.println("   Subject: " + subject);
        System.out.println("   Message: " + message);
    }
}

class SMSNotification extends Notification {
    private String phoneNumber;
    
    SMSNotification(String phoneNumber, String message) {
        super(message);
        this.phoneNumber = phoneNumber;
    }
    
    @Override
    void send() {
        System.out.println("📱 Sending SMS");
        System.out.println("   To: " + phoneNumber);
        System.out.println("   Message: " + message);
    }
}

class PushNotification extends Notification {
    private String deviceId;
    private String title;
    
    PushNotification(String deviceId, String title, String message) {
        super(message);
        this.deviceId = deviceId;
        this.title = title;
    }
    
    @Override
    void send() {
        System.out.println("🔔 Sending Push Notification");
        System.out.println("   Device: " + deviceId);
        System.out.println("   Title: " + title);
        System.out.println("   Message: " + message);
    }
}

class NotificationService {
    void send(Notification notification) {
        notification.send();  // Polymorphism in action!
    }
}\`\`\`

---

## Real-World Applications

### Payment Processing System
Payment systems use polymorphism to handle different payment methods (credit card, PayPal, bank transfer) through a common Payment interface. Each payment type implements the processPayment() method differently, but the system treats them uniformly.

**Implementation Example:**
- Payment interface with processPayment() method
- CreditCardPayment, PayPalPayment, BankTransferPayment implementations
- PaymentProcessor class works with Payment interface
- Easy to add new payment methods without modifying existing code

### Notification Service
Notification systems use polymorphism to send messages through different channels (email, SMS, push notifications). All notification types implement a common Notification interface, allowing the system to send notifications without knowing the specific type.

**Implementation Example:**
- Notification base class with send() method
- EmailNotification, SMSNotification, PushNotification implementations
- NotificationService processes all notification types uniformly
- New notification channels can be added easily

### Database Access Layer
Database frameworks use polymorphism to support multiple database types (MySQL, PostgreSQL, Oracle). Each database has its own implementation, but they all implement a common DatabaseConnection interface.

**Implementation Example:**
- DatabaseConnection interface
- MySQLConnection, PostgreSQLConnection, OracleConnection implementations
- Application code works with DatabaseConnection interface
- Database can be switched without code changes

---

## Common Mistakes and How to Avoid Them

### Mistake 1: Not Using @Override Annotation
**Problem:** Missing @Override can lead to accidental method hiding instead of overriding.

**Solution:** Always use @Override when overriding methods:

\`\`\`java
@Override
public void makeSound() {
    System.out.println("Woof!");
}
\`\`\`

### Mistake 2: Confusing Overloading and Overriding
**Problem:** Mixing up method overloading (compile-time) and overriding (runtime).

**Solution:** Remember - overloading is same name, different parameters; overriding is same name, same parameters, different implementation.

### Mistake 3: Not Understanding Runtime vs Compile-Time
**Problem:** Expecting compile-time polymorphism behavior from runtime polymorphism.

**Solution:** Understand that runtime polymorphism is determined by actual object type, not reference type.

### Mistake 4: Accessing Overridden Methods Incorrectly
**Problem:** Trying to call overridden method from parent class incorrectly.

**Solution:** Use super.methodName() to call parent's version:

\`\`\`java
@Override
public void display() {
    super.display();  // Call parent's version
    // Add child-specific code
}
\`\`\`

---

## Frequently Asked Questions (FAQs)

### What is polymorphism and why is it important?

Polymorphism allows objects of different types to be treated through the same interface, enabling the same method call to produce different behaviors based on the actual object type. It's important because it enables code flexibility, extensibility, and maintainability. Polymorphism is one of the four pillars of OOP along with [Inheritance](/tutorial/inheritance), [Encapsulation](/tutorial/encapsulation), and [Abstraction](/tutorial/abstraction).

### What's the difference between compile-time and runtime polymorphism?

Compile-time polymorphism (method overloading) is resolved by the compiler based on method signatures. Runtime polymorphism (method overriding) is resolved at runtime based on the actual object type. Overloading provides flexibility in method calls, while overriding enables dynamic method dispatch based on object type.

### How does inheritance relate to polymorphism?

Inheritance enables polymorphism by allowing derived classes to override base class methods. When a method is called on a base class reference that points to a derived class object, the overridden method in the derived class is executed. This is runtime polymorphism. Learn about [Inheritance](/tutorial/inheritance) to understand the foundation.

### Can I achieve polymorphism without inheritance?

Yes, polymorphism can be achieved through interfaces as well. A class implementing an interface can be treated as that interface type, enabling polymorphism. Interfaces provide even more flexibility than inheritance for polymorphism. Learn about [Interfaces](/tutorial/interfaces) for interface-based polymorphism.

### What is method overriding?

Method overriding occurs when a subclass provides its own implementation of a method that exists in the parent class. The method signature must match exactly, and the @Override annotation should be used. Overriding enables runtime polymorphism, where the same method call produces different results based on the actual object type.

### What is method overloading?

Method overloading occurs when multiple methods have the same name but different parameters (different number, types, or order). The compiler determines which method to call based on the arguments provided. Overloading provides compile-time polymorphism and method call flexibility.

### Can I override static methods?

No, static methods cannot be overridden. They can be hidden (redefined in subclass), but this is not true overriding. Static methods are resolved at compile-time based on the reference type, not the actual object type. Use instance methods for true polymorphism.

### What is the difference between method hiding and overriding?

Method hiding occurs with static methods - the subclass defines a static method with the same signature, but it's resolved at compile-time. Method overriding occurs with instance methods - the subclass provides a new implementation that's resolved at runtime based on the actual object type.

### How does polymorphism improve code maintainability?

Polymorphism improves maintainability by allowing you to add new types without modifying existing code. You can extend functionality by adding new classes that implement the same interface, and existing code automatically works with the new types. This follows the Open/Closed Principle - open for extension, closed for modification.

### When should I use polymorphism?

Use polymorphism when you have multiple types that share common behavior but implement it differently. It's ideal for plugin architectures, framework design, and situations where you want to write code that works with base types but utilizes derived type implementations. Polymorphism is essential for building flexible, extensible systems.

---

## Key Takeaways

Before proceeding to advanced OOP concepts, ensure you understand these polymorphism fundamentals:

- **Polymorphism enables flexibility** by allowing different types to be treated uniformly
- **Method overloading** provides compile-time polymorphism with same method name, different parameters
- **Method overriding** provides runtime polymorphism with same method signature, different implementations
- **Runtime polymorphism** is determined by actual object type, not reference type
- **@Override annotation** should always be used when overriding methods
- **Inheritance enables polymorphism** through method overriding
- **Interfaces provide polymorphism** without inheritance requirements
- **Polymorphism improves maintainability** by enabling extension without modification

---

## What's Next?

Now that you understand polymorphism, you're ready to explore related OOP concepts:

### Immediate Next Steps

1. **[Inheritance](/tutorial/inheritance)**: Understand how inheritance enables polymorphism
2. **[Encapsulation](/tutorial/encapsulation)**: Learn data protection and access control
3. **[Abstraction](/tutorial/abstraction)**: Discover how to hide complexity
4. **[Interfaces](/tutorial/interfaces)**: Learn interface-based polymorphism

### Advanced Topics

- **Abstract Classes**: Understand classes that cannot be instantiated
- **Design Patterns**: Explore polymorphism-based patterns like Strategy, Factory
- **Dynamic Method Dispatch**: Deep dive into how Java resolves method calls
- **Covariant Return Types**: Learn about return type flexibility in overriding

### Related Tutorials

- **[OOPs Introduction](/tutorial/oops-introduction)**: Review object-oriented programming fundamentals
- **[Classes and Objects](/tutorial/classes-objects)**: Understand the foundation of polymorphism
- **[Java Introduction](/tutorial/java-introduction)**: Master Java fundamentals
- **[Spring Framework](/tutorial/spring-introduction)**: See polymorphism in enterprise frameworks

Polymorphism is essential for building flexible, maintainable software. Continue learning about [Inheritance](/tutorial/inheritance) to understand how polymorphism is enabled through class hierarchies.

---

## What's Next?

Master these related OOPs concepts:

1. **[Inheritance](/tutorial/inheritance)** — Build on existing classes
2. **[Encapsulation](/tutorial/encapsulation)** — Data hiding and access control
3. **[Abstraction](/tutorial/abstraction)** — Hide complexity, show essentials
4. **[Interfaces](/tutorial/interfaces)** — Define contracts for classes
5. **[Classes and Objects](/tutorial/classes-objects)** — Create and use objects
6. **[Constructors](/tutorial/constructors)** — Initialize objects properly

**Prerequisites:**
- Complete [OOPs Introduction](/tutorial/oops-introduction) first
- Understand [Inheritance](/tutorial/inheritance) for method overriding

**Next Level:**
- Use polymorphism in [Spring Framework](/tutorial/spring-framework-introduction)
- Build applications with [Spring Boot](/tutorial/spring-boot-introduction)
`
    }
  ]
};

export default polymorphism;
