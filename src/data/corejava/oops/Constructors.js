const constructors = {
  id: 'constructors',
  title: 'Constructors',
  description: 'Initializing objects the right way',
  content: `
# Constructors - Initializing Objects Properly

Constructors are special methods in Java that initialize objects when they are created. Unlike regular methods, constructors are automatically invoked when you use the \`new\` keyword to create an object instance. Constructors ensure that objects are properly initialized with valid initial state before they can be used, preventing objects from existing in an undefined or invalid condition.

Constructors are essential for object-oriented programming, providing a controlled way to set initial values, validate input, and perform setup operations. Enterprise applications rely on constructors for dependency injection, resource initialization, and ensuring objects start in a consistent, valid state. Understanding constructors is fundamental for creating robust, maintainable Java applications.

**Constructor Characteristics:**
- **Same name as class** - Must match the class name exactly
- **No return type** - Not even void (unlike regular methods)
- **Automatic invocation** - Called automatically when object is created
- **Initialization purpose** - Sets up object's initial state

---

## What is a Constructor?

A constructor is a special method that:
- Has the **same name as the class**
- Has **no return type** (not even void)
- Runs **automatically** when you use \`new\`
- **Initializes** the object's state

\`\`\`java
public class Car {
    String brand;
    String model;
    
    // This is a constructor
    public Car() {
        System.out.println("A new car is created!");
    }
}

// When you write:
Car myCar = new Car();  // Constructor runs automatically
// Output: A new car is created!
\`\`\`

---

## Types of Constructors

### 1. Default Constructor (No-Arg)

Takes no parameters. If you don't write any constructor, Java provides one automatically.

\`\`\`java
public class Person {
    String name;
    int age;
    
    // Default constructor
    public Person() {
        name = "Unknown";
        age = 0;
    }
}

Person p = new Person();
// p.name = "Unknown", p.age = 0
\`\`\`

### 2. Parameterized Constructor

Takes parameters to initialize the object with specific values.

\`\`\`java
public class Person {
    String name;
    int age;
    
    // Parameterized constructor
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}

Person p = new Person("John", 25);
// p.name = "John", p.age = 25
\`\`\`

### 3. Copy Constructor

Creates a new object as a copy of an existing one.

\`\`\`java
public class Person {
    String name;
    int age;
    
    // Copy constructor
    public Person(Person other) {
        this.name = other.name;
        this.age = other.age;
    }
}

Person original = new Person("John", 25);
Person copy = new Person(original);  // Copy of original
\`\`\`

---

## The \`this\` Keyword in Constructors

\`this\` refers to the current object. It's essential when parameter names match field names:

\`\`\`java
public class Person {
    String name;  // Field
    
    public Person(String name) {  // Parameter
        this.name = name;  // this.name is the field, name is the parameter
    }
}
\`\`\`

Without \`this\`:
\`\`\`java
public Person(String name) {
    name = name;  // WRONG! Assigns parameter to itself
}
\`\`\`

---

## Constructor Overloading

You can have multiple constructors with different parameters:

\`\`\`java
public class Product {
    String name;
    double price;
    int quantity;
    
    // Constructor 1: All parameters
    public Product(String name, double price, int quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
    
    // Constructor 2: Name and price only
    public Product(String name, double price) {
        this.name = name;
        this.price = price;
        this.quantity = 0;  // Default quantity
    }
    
    // Constructor 3: Name only
    public Product(String name) {
        this.name = name;
        this.price = 0.0;
        this.quantity = 0;
    }
}

// All valid:
Product p1 = new Product("Laptop", 999.99, 10);
Product p2 = new Product("Mouse", 29.99);
Product p3 = new Product("Keyboard");
\`\`\`

---

## Constructor Chaining with \`this()\`

One constructor can call another using \`this()\`:

\`\`\`java
public class Product {
    String name;
    double price;
    int quantity;
    
    // Main constructor
    public Product(String name, double price, int quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
    
    // Calls main constructor
    public Product(String name, double price) {
        this(name, price, 0);  // Calls the 3-parameter constructor
    }
    
    // Calls the 2-parameter constructor
    public Product(String name) {
        this(name, 0.0);  // Which then calls the 3-parameter one
    }
}
\`\`\`

**Rule:** \`this()\` must be the **first statement** in the constructor.

---

## Constructor vs Method

| Constructor | Method |
|-------------|--------|
| Same name as class | Any name |
| No return type | Has return type |
| Called automatically with \`new\` | Called explicitly |
| Initializes object | Performs actions |
| Cannot be inherited | Can be inherited |

---

## Common Mistakes

### 1. Adding a Return Type

\`\`\`java
// WRONG - This is a method, not a constructor!
public void Person() {
    // ...
}

// CORRECT
public Person() {
    // ...
}
\`\`\`

### 2. Forgetting \`this\`

\`\`\`java
// WRONG
public Person(String name) {
    name = name;  // Does nothing useful
}

// CORRECT
public Person(String name) {
    this.name = name;
}
\`\`\`

### 3. \`this()\` Not First

\`\`\`java
// WRONG
public Product(String name) {
    System.out.println("Creating product");
    this(name, 0.0);  // ERROR! Must be first
}

// CORRECT
public Product(String name) {
    this(name, 0.0);  // First statement
    System.out.println("Creating product");
}
\`\`\`

---

## Real-World Example: User Registration

\`\`\`java
public class User {
    private String username;
    private String email;
    private String password;
    private boolean isActive;
    private Date createdAt;
    
    // Full registration
    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = hashPassword(password);
        this.isActive = true;
        this.createdAt = new Date();
    }
    
    // Quick registration (email as username)
    public User(String email, String password) {
        this(email, email, password);
    }
    
    // Social login (no password)
    public User(String username, String email) {
        this.username = username;
        this.email = email;
        this.password = null;  // OAuth user
        this.isActive = true;
        this.createdAt = new Date();
    }
    
    private String hashPassword(String password) {
        // In real app, use proper hashing
        return "hashed_" + password;
    }
}
\`\`\`

Different constructors for different registration scenarios — that's constructor overloading in action!
`,
  code: `// Constructors Demo

public class ConstructorsDemo {
    public static void main(String[] args) {
        System.out.println("=== Constructors Demo ===\\n");
        
        // 1. DEFAULT CONSTRUCTOR
        System.out.println("1. DEFAULT CONSTRUCTOR");
        System.out.println("   --------------------");
        
        Person p1 = new Person();
        p1.display();
        System.out.println();
        
        // 2. PARAMETERIZED CONSTRUCTOR
        System.out.println("2. PARAMETERIZED CONSTRUCTOR");
        System.out.println("   --------------------------");
        
        Person p2 = new Person("Alice", 25);
        p2.display();
        
        Person p3 = new Person("Bob", 30);
        p3.display();
        System.out.println();
        
        // 3. CONSTRUCTOR OVERLOADING
        System.out.println("3. CONSTRUCTOR OVERLOADING");
        System.out.println("   ------------------------");
        
        Product prod1 = new Product("Laptop", 999.99, 10);
        Product prod2 = new Product("Mouse", 29.99);
        Product prod3 = new Product("Keyboard");
        
        prod1.display();
        prod2.display();
        prod3.display();
        System.out.println();
        
        // 4. COPY CONSTRUCTOR
        System.out.println("4. COPY CONSTRUCTOR");
        System.out.println("   -----------------");
        
        Person original = new Person("Charlie", 35);
        Person copy = new Person(original);
        
        System.out.println("   Original:");
        original.display();
        System.out.println("   Copy:");
        copy.display();
        
        // Modify original
        original.setName("Charlie Modified");
        System.out.println("\\n   After modifying original:");
        System.out.println("   Original:");
        original.display();
        System.out.println("   Copy (unchanged):");
        copy.display();
        System.out.println();
        
        // 5. CONSTRUCTOR CHAINING
        System.out.println("5. CONSTRUCTOR CHAINING");
        System.out.println("   ---------------------");
        
        Employee emp1 = new Employee("John", "Engineering", 75000);
        Employee emp2 = new Employee("Jane", "Marketing");
        Employee emp3 = new Employee("Jim");
        
        emp1.display();
        emp2.display();
        emp3.display();
        System.out.println();
        
        // 6. PRACTICAL EXAMPLE
        System.out.println("6. PRACTICAL EXAMPLE - Bank Account");
        System.out.println("   ----------------------------------");
        
        BankAccount acc1 = new BankAccount("Alice Smith", 5000);
        BankAccount acc2 = new BankAccount("Bob Jones");
        
        acc1.display();
        acc2.display();
    }
}

// Person class with multiple constructors
class Person {
    private String name;
    private int age;
    
    // Default constructor
    public Person() {
        this.name = "Unknown";
        this.age = 0;
        System.out.println("   Default constructor called");
    }
    
    // Parameterized constructor
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
        System.out.println("   Parameterized constructor called for " + name);
    }
    
    // Copy constructor
    public Person(Person other) {
        this.name = other.name;
        this.age = other.age;
        System.out.println("   Copy constructor called");
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public void display() {
        System.out.println("   Name: " + name + ", Age: " + age);
    }
}

// Product class with constructor overloading
class Product {
    private String name;
    private double price;
    private int quantity;
    
    // Full constructor
    public Product(String name, double price, int quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
    
    // Two parameters
    public Product(String name, double price) {
        this(name, price, 0);  // Constructor chaining
    }
    
    // One parameter
    public Product(String name) {
        this(name, 0.0, 0);  // Constructor chaining
    }
    
    public void display() {
        System.out.println("   " + name + " - $" + price + " (Stock: " + quantity + ")");
    }
}

// Employee class with constructor chaining
class Employee {
    private String name;
    private String department;
    private double salary;
    
    // Main constructor
    public Employee(String name, String department, double salary) {
        this.name = name;
        this.department = department;
        this.salary = salary;
        System.out.println("   Created employee: " + name);
    }
    
    // Chains to main constructor
    public Employee(String name, String department) {
        this(name, department, 50000);  // Default salary
    }
    
    // Chains to 2-param constructor
    public Employee(String name) {
        this(name, "General");  // Default department
    }
    
    public void display() {
        System.out.println("   " + name + " | " + department + " | $" + salary);
    }
}

// BankAccount class
class BankAccount {
    private static int nextAccountNumber = 1000;
    
    private int accountNumber;
    private String owner;
    private double balance;
    
    public BankAccount(String owner, double initialBalance) {
        this.accountNumber = nextAccountNumber++;
        this.owner = owner;
        this.balance = initialBalance;
    }
    
    public BankAccount(String owner) {
        this(owner, 0.0);  // Default balance
    }
    
    public void display() {
        System.out.println("   Account #" + accountNumber + ": " + owner + " - $" + balance);
    }
}`,
  practiceQuestions: [
    {
      question: 'Create a Book class with multiple constructors',
      hint: 'Include default, parameterized, and copy constructors',
      starterCode: `public class BookDemo {
    public static void main(String[] args) {
        System.out.println("=== Book Store ===\\n");
        
        // Different ways to create books
        Book book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 12.99, 100);
        Book book2 = new Book("1984", "George Orwell", 10.99);
        Book book3 = new Book("To Kill a Mockingbird");
        Book book4 = new Book();  // Unknown book
        
        // Display all books
        System.out.println("Inventory:");
        book1.display();
        book2.display();
        book3.display();
        book4.display();
        
        // Copy a book
        System.out.println("\\nCreating a copy of book1:");
        Book bookCopy = new Book(book1);
        bookCopy.display();
        
        System.out.println("\\nTotal books created: " + Book.getTotalBooks());
    }
}

class Book {
    private static int totalBooks = 0;
    
    private String title;
    private String author;
    private double price;
    private int stock;
    
    // Default constructor
    public Book() {
        this("Unknown Title", "Unknown Author", 0.0, 0);
    }
    
    // Title only
    public Book(String title) {
        this(title, "Unknown Author", 0.0, 0);
    }
    
    // Title, author, price
    public Book(String title, String author, double price) {
        this(title, author, price, 0);
    }
    
    // Full constructor
    public Book(String title, String author, double price, int stock) {
        this.title = title;
        this.author = author;
        this.price = price;
        this.stock = stock;
        totalBooks++;
    }
    
    // Copy constructor
    public Book(Book other) {
        this(other.title, other.author, other.price, other.stock);
    }
    
    public void display() {
        System.out.println("'" + title + "' by " + author + " - $" + price + " (Stock: " + stock + ")");
    }
    
    public static int getTotalBooks() {
        return totalBooks;
    }
}`
    }
  ]
};

export default constructors;
