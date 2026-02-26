const polymorphism = {
  id: 'polymorphism',
  title: 'Polymorphism',
  description: 'One interface, many implementations',
  content: `
# Polymorphism — Many Forms, One Interface

The word "polymorphism" comes from Greek: "poly" (many) + "morph" (form). In programming, it means the same method can behave differently depending on which object calls it.

Think of a universal remote control — the "power" button works on your TV, DVD player, and sound system, but each device responds differently.

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
