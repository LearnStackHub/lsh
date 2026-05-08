const jdbcProjectSetup = {
  id: 'jdbc-project-setup',
  title: 'JDBC Project Setup - MySQL Connection',
  description: 'Complete guide to create a JDBC project, add MySQL Connector/J, connect to MySQL, and a full banking menu example (create account, deposit, withdraw, transfer with transactions).',
  content: `
# JDBC Project Setup — MySQL Database Connection

This guide walks you through creating a JDBC project, adding MySQL Connector/J, and running a **menu-driven banking example** (\`BankApp\`) against MySQL.

> **Download this tutorial’s JDBC sample code:** Open [LearnStackHub/Jdbc](https://github.com/LearnStackHub/Jdbc) on GitHub to clone the repo or download a ZIP (**Code**). \`git clone https://github.com/LearnStackHub/Jdbc.git\`

---

## Prerequisites

Before starting, ensure you have:
- **Java JDK 8+** installed
- **Eclipse IDE** or **IntelliJ IDEA**
- **MySQL Server** installed and running
- **MySQL Connector/J** JAR file (we'll download this)

---

## 📦 Step 1: Download MySQL Connector/J

### What is MySQL Connector/J?

**MySQL Connector/J** is the official JDBC driver for MySQL. It allows Java applications to connect to MySQL databases.

### Where to Download

1. **Visit:** https://dev.mysql.com/downloads/connector/j/
2. **Select Platform:** Platform Independent
3. **Download:**
   - **ZIP Archive:** \`mysql-connector-j-8.0.xx.zip\` (recommended)
   - Or **TAR Archive:** \`mysql-connector-j-8.0.xx.tar.gz\`

### Extract the JAR File

1. **Extract the downloaded ZIP/TAR file**
2. **Navigate to the extracted folder**
3. **Find the JAR file:**
   \`\`\`
   mysql-connector-j-8.0.xx/
   └── mysql-connector-j-8.0.xx.jar  ⭐ This is what you need!
   \`\`\`

**File name examples:**
- \`mysql-connector-j-8.0.33.jar\`
- \`mysql-connector-java-8.0.33.jar\`

**Note:** The exact name may vary by version, but it will contain "mysql-connector" and end with ".jar"

### Alternative: Direct JAR Download

**Maven Central Repository:**
- Visit: https://repo1.maven.org/maven2/mysql/mysql-connector-java/
- Navigate to latest version (e.g., 8.0.33)
- Download: \`mysql-connector-java-8.0.33.jar\`

---

## Method 1: Eclipse IDE Setup

### Step 1: Create Java Project

1. Open Eclipse
2. **File → New → Java Project**
3. Enter project name: \`JDBCExample\`
4. Click **Finish**

### Step 2: Add MySQL Connector/J JAR File

**Option A: Add to Build Path (Recommended)**

1. **Right-click on project** → **Properties**
2. Go to **Java Build Path** → **Libraries** tab
3. Click **Add External JARs...**
4. **Navigate to where you extracted MySQL Connector/J:**
   - Find: \`mysql-connector-j-8.0.xx.jar\`
   - Select it
5. Click **Open**
6. Click **Apply and Close**

**Option B: Create lib Folder**

1. **Right-click on project** → **New → Folder**
2. Name it: \`lib\`
3. **Copy the JAR file:**
   - From: Where you extracted MySQL Connector/J
   - To: \`JDBCExample/lib/mysql-connector-j-8.0.xx.jar\`
4. **Right-click on JAR file** → **Build Path → Add to Build Path**
5. You should see it under "Referenced Libraries"

### Step 3: Verify JAR File is Added

1. **Expand your project** in Package Explorer
2. **Look for:**
   - \`Referenced Libraries\` → \`mysql-connector-j-8.0.xx.jar\`
   - Or \`lib/\` folder → \`mysql-connector-j-8.0.xx.jar\`

### Step 4: Add the banking application class

Create **\`src/com/example/BankApp.java\`** using the full **\`BankApp\`** source code in the **Complete Example: Banking Application** section below (same file contains driver load, connection, \`PreparedStatement\`, and a transfer transaction).

### Step 5: Create the database

Before running, ensure MySQL has the **\`bankdb\`** database (the program creates the \`accounts\` table on first run if needed):

\`\`\`sql
mysql -u root -p
CREATE DATABASE IF NOT EXISTS bankdb;
\`\`\`

### Step 6: Run the project

1. **Right-click \`BankApp.java\`**
2. **Run As → Java Application**
3. Use the **Banking System Menu** in the console (create account, deposit, withdraw, transfer, exit)

---

## Method 2: IntelliJ IDEA Setup

### Step 1: Create Java Project

1. **File → New → Project**
2. Select **Java**
3. Select **JDK** version
4. Click **Next**
5. Enter project name: \`JDBCExample\`
6. Click **Finish**

### Step 2: Add MySQL Connector/J JAR File

**Option A: Add as Library**

1. **File → Project Structure** (or \`Ctrl+Alt+Shift+S\` / \`Cmd+;\` on Mac)
2. Go to **Libraries**
3. Click **+** → **Java**
4. **Navigate to MySQL Connector/J JAR file:**
   - Find: \`mysql-connector-j-8.0.xx.jar\`
   - Select it
5. Click **OK**
6. Select the module to add library to
7. Click **OK**

**Option B: Create lib Folder**

1. **Right-click on project** → **New → Directory**
2. Name it: \`lib\`
3. **Copy JAR file** to \`lib/\` folder
4. **Right-click on JAR file** → **Add as Library...**
5. Click **OK**

### Step 3: Verify JAR File

1. **Expand project** → **External Libraries**
2. You should see: \`mysql-connector-j-8.0.xx.jar\`

### Step 4: Add \`BankApp.java\`

Same as Eclipse: add **\`src/com/example/BankApp.java\`** using the code from **Complete Example: Banking Application** below.

### Step 5: Run the project

1. **Right-click \`BankApp.java\`**
2. **Run 'BankApp.main()'**
3. Use the console menu

---

## Method 3: Maven Project Setup

### Step 1: Create Maven Project

\`\`\`bash
mvn archetype:generate -DgroupId=com.example -DartifactId=JDBCExample -DarchetypeArtifactId=maven-archetype-quickstart
\`\`\`

### Step 2: Add MySQL Dependency (pom.xml)

**Maven automatically downloads the JAR file!**

Edit \`pom.xml\`:

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    
    <groupId>com.example</groupId>
    <artifactId>JDBCExample</artifactId>
    <version>1.0-SNAPSHOT</version>
    
    <properties>
        <maven.compiler.source>11</maven.compiler.source>
        <maven.compiler.target>11</maven.compiler.target>
    </properties>
    
    <dependencies>
        <!-- MySQL Connector/J - Maven downloads this automatically -->
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <version>8.0.33</version>
        </dependency>
        
        <!-- Or for older versions: -->
        <!--
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.33</version>
        </dependency>
        -->
    </dependencies>
</project>
\`\`\`

### Step 3: Build Project

\`\`\`bash
# Maven downloads MySQL Connector/J automatically
mvn clean compile

# Run the project
mvn exec:java -Dexec.mainClass="com.example.BankApp"
\`\`\`

**Note:** With Maven, you don't need to manually download or add JAR files. Maven downloads them from Maven Central Repository.

---

## Method 4: Manual Setup (Command Line)

### Step 1: Create Project Structure

\`\`\`
JDBCExample/
├── src/
│   └── com/example/
│       └── BankApp.java
└── lib/
    └── mysql-connector-j-8.0.xx.jar
\`\`\`

### Step 2: Compile with Classpath

\`\`\`bash
# Compile with MySQL JAR in classpath
javac -cp "lib/mysql-connector-j-8.0.xx.jar" src/com/example/BankApp.java -d out/

# Run (create bankdb in MySQL first — see banking section)
java -cp "out:lib/mysql-connector-j-8.0.xx.jar" com.example.BankApp

# Windows:
java -cp "out;lib/mysql-connector-j-8.0.xx.jar" com.example.BankApp
\`\`\`

---

## Complete Example: Banking Application (Console Menu)

This puts together **driver loading**, **\`Connection\`**, **\`PreparedStatement\`**, and a **transaction** (transfer) on one project—similar to a typical JDBC lab assignment.

### 1. Create the database

\`\`\`sql
CREATE DATABASE IF NOT EXISTS bankdb;
USE bankdb;
\`\`\`

The program below also creates the \`accounts\` table if it does not exist (same columns as in the lab: \`id\`, \`cus_name\`, \`balance\`).

**Important:** Replace \`your_password\` with your MySQL password. Do not commit real passwords to source control.

### 2. Single class: \`BankApp.java\`

Create **\`src/com/example/BankApp.java\`** (add the MySQL JAR to the classpath as in the steps above).

\`\`\`java
package com.example;

import java.sql.*;
import java.util.Scanner;

public class BankApp {

    private static final String URL =
            "jdbc:mysql://localhost:3306/bankdb?characterEncoding=utf8&serverTimezone=UTC";
    private static final String USER = "root";
    private static final String PASS = "your_password";

    public static void main(String[] args) {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            System.err.println("MySQL JDBC Driver not found. Add mysql-connector-j to classpath.");
            return;
        }

        try (Connection connection = DriverManager.getConnection(URL, USER, PASS);
             Scanner scanner = new Scanner(System.in)) {

            initializeDatabase(connection);

            int choice;
            do {
                displayMenu();
                choice = scanner.nextInt();
                switch (choice) {
                    case 1:
                        createAccount(connection, scanner);
                        break;
                    case 2:
                        deposit(connection, scanner);
                        break;
                    case 3:
                        withdraw(connection, scanner);
                        break;
                    case 4:
                        transfer(connection, scanner);
                        break;
                    case 5:
                        System.out.println("Goodbye!");
                        break;
                    default:
                        System.out.println("Invalid choice. Please try again.");
                }
            } while (choice != 5);

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private static void initializeDatabase(Connection connection) throws SQLException {
        try (Statement statement = connection.createStatement()) {
            statement.executeUpdate(
                    "CREATE TABLE IF NOT EXISTS accounts ("
                            + "id INT AUTO_INCREMENT PRIMARY KEY,"
                            + " cus_name VARCHAR(255) NOT NULL,"
                            + " balance DOUBLE NOT NULL)");
        }
    }

    private static void displayMenu() {
        System.out.println("\\n--- Banking System Menu ---");
        System.out.println("1. Create Account");
        System.out.println("2. Deposit");
        System.out.println("3. Withdraw");
        System.out.println("4. Transfer (transaction)");
        System.out.println("5. Exit");
        System.out.print("Enter your choice: ");
    }

    private static void createAccount(Connection connection, Scanner scanner) throws SQLException {
        System.out.print("Enter Account Holder Name: ");
        String accountHolder = scanner.next();
        System.out.print("Enter Initial Balance: ");
        double initialBalance = scanner.nextDouble();

        String sql = "INSERT INTO accounts (cus_name, balance) VALUES (?, ?)";
        try (PreparedStatement pstmt = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            pstmt.setString(1, accountHolder);
            pstmt.setDouble(2, initialBalance);
            pstmt.executeUpdate();
            try (ResultSet keys = pstmt.getGeneratedKeys()) {
                if (keys.next()) {
                    System.out.println("Account created successfully. Account ID: " + keys.getInt(1));
                } else {
                    System.out.println("Failed to create account.");
                }
            }
        }
    }

    private static void deposit(Connection connection, Scanner scanner) throws SQLException {
        System.out.print("Enter Account ID for Deposit: ");
        int accountId = scanner.nextInt();
        System.out.print("Enter Deposit Amount: ");
        double depositAmount = scanner.nextDouble();

        String sql = "UPDATE accounts SET balance = balance + ? WHERE id = ?";
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setDouble(1, depositAmount);
            pstmt.setInt(2, accountId);
            int rows = pstmt.executeUpdate();
            System.out.println(rows > 0 ? "Deposit successful." : "Account ID not found.");
        }
    }

    private static void withdraw(Connection connection, Scanner scanner) throws SQLException {
        System.out.print("Enter Account ID for Withdrawal: ");
        int accountId = scanner.nextInt();
        System.out.print("Enter Withdrawal Amount: ");
        double withdrawalAmount = scanner.nextDouble();

        String checkSql = "SELECT balance FROM accounts WHERE id = ?";
        try (PreparedStatement check = connection.prepareStatement(checkSql)) {
            check.setInt(1, accountId);
            try (ResultSet rs = check.executeQuery()) {
                if (!rs.next()) {
                    System.out.println("Account ID not found.");
                    return;
                }
                if (rs.getDouble("balance") < withdrawalAmount) {
                    System.out.println("Insufficient balance.");
                    return;
                }
            }
        }

        String sql = "UPDATE accounts SET balance = balance - ? WHERE id = ?";
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setDouble(1, withdrawalAmount);
            pstmt.setInt(2, accountId);
            pstmt.executeUpdate();
            System.out.println("Withdrawal successful.");
        }
    }

    /**
     * Transfer money from one account to another using one Connection and commit/rollback.
     * Uses a single amount (debit sender, credit receiver)—not separate debit/credit amounts.
     */
    private static void transfer(Connection connection, Scanner scanner) throws SQLException {
        System.out.print("Enter sender account ID: ");
        int senderId = scanner.nextInt();
        System.out.print("Enter receiver account ID: ");
        int receiverId = scanner.nextInt();
        System.out.print("Enter amount to transfer: ");
        double amount = scanner.nextDouble();

        if (senderId == receiverId || amount <= 0) {
            System.out.println("Invalid sender, receiver, or amount.");
            return;
        }

        connection.setAutoCommit(false);
        try {
            if (!updateBalance(connection, senderId, -amount)) {
                connection.rollback();
                System.out.println("Transfer failed: sender not found or insufficient balance.");
                return;
            }
            if (!updateBalance(connection, receiverId, amount)) {
                connection.rollback();
                System.out.println("Transfer failed: receiver not found.");
                return;
            }
            connection.commit();
            System.out.println("Transfer successful.");
        } catch (SQLException e) {
            connection.rollback();
            throw e;
        } finally {
            connection.setAutoCommit(true);
        }
    }

    /** Apply delta to balance if row exists and balance would not go negative. */
    private static boolean updateBalance(Connection connection, int accountId, double delta)
            throws SQLException {
        String read = "SELECT balance FROM accounts WHERE id = ? FOR UPDATE";
        try (PreparedStatement ps = connection.prepareStatement(read)) {
            ps.setInt(1, accountId);
            try (ResultSet rs = ps.executeQuery()) {
                if (!rs.next()) {
                    return false;
                }
                double bal = rs.getDouble("balance");
                if (bal + delta < 0) {
                    return false;
                }
            }
        }
        String write = "UPDATE accounts SET balance = balance + ? WHERE id = ?";
        try (PreparedStatement ps = connection.prepareStatement(write)) {
            ps.setDouble(1, delta);
            ps.setInt(2, accountId);
            return ps.executeUpdate() == 1;
        }
    }
}
\`\`\`

### 3. Step-by-step code walkthrough

Read this **top to bottom** while looking at \`BankApp.java\` above.

#### A. Imports, package, and constants

1. **\`package com.example;\`** — Your class lives in the \`com.example\` folder so the JVM can find it (must match the directory \`com/example/\`).
2. **\`import java.sql.*;\`** — Brings in JDBC types: \`Connection\`, \`DriverManager\`, \`Statement\`, \`PreparedStatement\`, \`ResultSet\`, \`SQLException\`, etc.
3. **\`import java.util.Scanner;\`** — Reads numbers and text from the keyboard in the console.
4. **\`URL\`, \`USER\`, \`PASS\`** — The JDBC URL points at **host** (\`localhost\`), **port** (\`3306\`), **database** (\`bankdb\`), plus \`characterEncoding\` and \`serverTimezone\` so MySQL 8 connects reliably. Username and password must match your MySQL user.

#### B. \`main\` — load driver and open one session

5. **\`Class.forName("com.mysql.cj.jdbc.Driver")\`** — Loads the MySQL JDBC driver class into the JVM. If the connector JAR is missing from the classpath, this throws **\`ClassNotFoundException\`** and the program exits early with a clear message.
6. **\`DriverManager.getConnection(URL, USER, PASS)\`** — Asks MySQL for a live **\`Connection\`** (a session). All SQL for this run goes through this object.
7. **\`try (Connection ...; Scanner ...)\`** — *Try-with-resources* closes the connection and scanner automatically when the block ends, even if an error occurs. That avoids connection leaks.
8. **\`initializeDatabase(connection)\`** — Runs once at startup so the \`accounts\` table exists before any menu option uses it.

#### C. Menu loop

9. **\`do { ... } while (choice != 5);\`** — Shows the menu, reads an **\`int\`**, runs the matching branch, and repeats until the user chooses **5 (Exit)**.
10. **\`switch (choice)\`** — **1** create account, **2** deposit, **3** withdraw, **4** transfer, **5** goodbye, **default** invalid option. Each case calls a **\`static\`** helper and passes the **same** \`connection\` and \`scanner\` so you do not open new connections or scanners per action.

#### D. \`initializeDatabase\`

11. **\`createStatement()\`** — A simple \`Statement\` is enough here because the SQL is fixed (no user input in this string).
12. **\`CREATE TABLE IF NOT EXISTS accounts (...)\`** — Creates \`accounts\` only if it is missing. Columns: **\`id\`** (auto-increment primary key), **\`cus_name\`**, **\`balance\`**. Every later query targets this table and **\`id\`** as the account number.

#### E. \`displayMenu\`

13. Prints options and **\`Enter your choice:\`** without a newline after the last print, so the user types on the same line.

#### F. \`createAccount\`

14. **\`scanner.next()\` / \`nextDouble()\`** — Reads name and starting balance from the console.
15. **\`INSERT INTO accounts (cus_name, balance) VALUES (?, ?)\`** — **\`?\`** are *placeholders*; values are bound with \`setString\` / \`setDouble\`. That avoids SQL injection and handles special characters safely.
16. **\`prepareStatement(..., Statement.RETURN_GENERATED_KEYS)\`** — After \`executeUpdate()\`, **\`getGeneratedKeys()\`** returns a \`ResultSet\` containing the new **\`id\`** MySQL assigned (the new account number).

#### G. \`deposit\`

17. **\`UPDATE accounts SET balance = balance + ? WHERE id = ?\`** — Adds the deposit to the current balance for the given \`id\`.
18. **\`executeUpdate()\`** returns how many rows changed; **0** means no row had that \`id\` (unknown account).

#### H. \`withdraw\`

19. **First query:** \`SELECT balance FROM accounts WHERE id = ?\` — Confirms the account exists and reads **current** balance.
20. If **no row** → print not found and **\`return\`**. If **balance < amount** → insufficient funds and **\`return\`** (no update).
21. **Second query:** same \`UPDATE ... balance - ?\` pattern as deposit, but subtracts. This is two round-trips; a stricter design could use a transaction and \`FOR UPDATE\` here too, but this is clear for learning.

#### I. \`transfer\` — transaction (all-or-nothing)

22. Reads **sender id**, **receiver id**, and **one** **\`amount\`** (money moved from sender to receiver).
23. **Guards:** same account or non-positive amount → error and exit (no DB change).
24. **\`setAutoCommit(false)\`** — After this, each statement does **not** auto-save. You either **\`commit()\`** both updates together or **\`rollback()\`** so neither half applies.
25. **\`updateBalance(connection, senderId, -amount)\`** — Debits the sender (negative delta).
26. If that returns **false** (no account or would go negative) → **\`rollback()\`**, message, **\`return\`**.
27. **\`updateBalance(connection, receiverId, amount)\`** — Credits the receiver. If **false** (e.g. receiver id invalid) → **\`rollback()\`** so the debit is undone too.
28. If both succeed → **\`commit()\`**. **\`finally\`** sets **\`setAutoCommit(true)\`** so later menu options behave normally (each statement commits on its own again).
29. **\`catch\`** — On any \`SQLException\` during the transfer, **\`rollback()\`** then rethrow so the outer **\`main\`** catch can print the stack trace.

#### J. \`updateBalance\` — used only inside a transfer transaction

30. **\`SELECT ... FOR UPDATE\`** — Under InnoDB, this **locks** the row for this transaction until commit/rollback, so two programs do not corrupt the same balance at once.
31. If no row → **false**. If **\`bal + delta < 0\`** (withdrawing more than balance) → **false** without updating.
32. **\`UPDATE accounts SET balance = balance + ? WHERE id = ?\`** — \`delta\` is negative for sender, positive for receiver. Returns **true** only if exactly one row was updated.

---

### 4. Run

- **Eclipse / IntelliJ:** Right-click \`BankApp.java\` → Run as Java application.  
- Ensure **MySQL is running** and the **database \`bankdb\`** exists.

### Fixes applied vs. a common student version

| Issue | What we changed |
|--------|-----------------|
| Table name mismatch (\`accounts\` vs \`bank\`) | Use **\`accounts\`** for \`CREATE TABLE\`, \`INSERT\`, and \`UPDATE\`. |
| Wrong column (\`account_id\` vs \`id\`) | Primary key is \`id\`; use \`WHERE id = ?\`. |
| Second \`Connection\` in transfer | Reuse the same \`Connection\` with \`setAutoCommit(false)\`, \`commit\`, \`rollback\`. |
| Two amounts for transfer | Use **one** transfer amount: debit sender, credit receiver. |
| Extra \`Scanner\` in transfer | Single \`Scanner\` created in \`main\` (try-with-resources). |
| Password in source | Use \`your_password\`; never commit real DB passwords. |

---

## Common Issues and Solutions

### Issue 1: ClassNotFoundException: com.mysql.cj.jdbc.Driver

**Error:** \`java.lang.ClassNotFoundException: com.mysql.cj.jdbc.Driver\`

**Solution:**
- **Verify JAR file is added to classpath**
- **Check JAR file name** (should be mysql-connector-j-8.0.xx.jar)
- **Refresh project** in IDE
- **Rebuild project**

### Issue 2: No Suitable Driver Found

**Error:** \`No suitable driver found for jdbc:mysql://...\`

**Solution:**
- **Check URL format:** \`jdbc:mysql://localhost:3306/dbname\`
- **Verify MySQL is running:** \`mysql -u root -p\`
- **Check JAR file is in classpath**
- **For MySQL 8.0+:** Use \`com.mysql.cj.jdbc.Driver\`
- **For MySQL 5.x:** Use \`com.mysql.jdbc.Driver\`

### Issue 3: Access Denied

**Error:** \`Access denied for user 'root'@'localhost'\`

**Solution:**
- **Check username and password**
- **Verify MySQL user exists:**
  \`\`\`sql
  SELECT User, Host FROM mysql.user;
  \`\`\`
- **Grant permissions:**
  \`\`\`sql
  GRANT ALL PRIVILEGES ON bankdb.* TO 'root'@'localhost';
  FLUSH PRIVILEGES;
  \`\`\`

### Issue 4: Connection Refused

**Error:** \`Communications link failure\`

**Solution:**
- **Check MySQL is running:**
  \`\`\`bash
  # Windows
  net start MySQL
  
  # Linux/Mac
  sudo systemctl status mysql
  \`\`\`
- **Verify port 3306 is open**
- **Check firewall settings**

### Issue 5: Timezone Error (MySQL 8.0+)

**Error:** \`The server time zone value 'xxx' is unrecognized\`

**Solution:**
- **Add timezone to URL:**
  \`\`\`java
  String URL = "jdbc:mysql://localhost:3306/bankdb?serverTimezone=UTC";
  \`\`\`
- **Or set MySQL timezone:**
  \`\`\`sql
  SET GLOBAL time_zone = '+00:00';
  \`\`\`

---

## Project Structure Best Practices

\`\`\`
JDBCExample/
├── src/
│   └── com/example/
│       └── BankApp.java               # JDBC banking menu (this tutorial)
├── lib/
│   └── mysql-connector-j-8.0.xx.jar
└── README.md
\`\`\`

---

## Summary

**Steps to create this JDBC project:**
1. Download MySQL Connector/J from https://dev.mysql.com/downloads/connector/j/
2. Create a Java project in your IDE (or use Maven / command line as above)
3. Add the JAR to the classpath (or add the \`mysql-connector-j\` Maven dependency)
4. Add **\`BankApp.java\`** from the banking section and create the **\`bankdb\`** database
5. Run **\`BankApp\`** and use the console menu

**Key points:**
- **JAR:** \`lib/\` or Build Path (or Maven)
- **Driver:** \`com.mysql.cj.jdbc.Driver\` (MySQL 8.0+)
- **URL:** \`jdbc:mysql://localhost:3306/bankdb?...\` (match \`BankApp\` constants)

For more JDBC patterns (CRUD, DAOs), see **[JDBC CRUD Operations](/tutorial/jdbc-crud-operations)** after this project runs.

---

## Next Steps

- Learn about **[PreparedStatement Interface](/tutorial/jdbc-prepared-statement)** for parameterized queries
- Understand **[ResultSet Interface](/tutorial/jdbc-result-set-interface)** for retrieving data
- Explore **[Transaction Management](/tutorial/jdbc-transaction-management)**
- Practice **[CRUD Operations](/tutorial/jdbc-crud-operations)** with a separate DAO-style example

**Prerequisites:**
- Complete [JDBC Introduction](/tutorial/jdbc-introduction) first
- Learn [MySQL Introduction](/tutorial/mysql-introduction) to understand databases

**Next Level:**
- Use [Spring Boot JPA](/tutorial/spring-boot-jpa) for easier database operations
- Learn [Hibernate](/hibernate/hibernate-introduction) for ORM

---

## Test Your Knowledge

JDBC project set up? Test your JDBC skills with our comprehensive [JDBC MCQ Exam](/tutorial/jdbc-mcq) covering project setup, drivers, connections, and all JDBC topics!
---


## 10 Important JDBC Project Setup Interview Questions

### 1. What are the prerequisites for setting up a JDBC project?
**Answer:** You need JDK, a database server, the correct JDBC driver dependency, and a build/runtime setup (IDE, Maven, or command line). Without matching driver/database versions, the application may compile but fail at runtime. This is why version alignment is a setup interview favorite.

### 2. Why is dependency management important in JDBC project setup?
**Answer:** Dependency management ensures the correct driver version is packaged and reproducible across environments. Tools like Maven avoid manual JAR drift and reduce classpath errors. Interviewers expect you to prefer managed builds over ad hoc copying of libraries.

### 3. What is a common classpath issue during JDBC setup?
**Answer:** A common issue is ClassNotFoundException or No suitable driver due to missing/incorrect driver JAR. This usually comes from wrong dependency scope, wrong artifact, or missing runtime path. A strong answer includes how to verify dependency resolution and startup logs.

### 4. How does IDE setup differ from Maven setup in JDBC projects?
**Answer:** IDE setup may work with manually added external JARs, but Maven setup provides portable and versioned dependency control for teams and CI. In interviews, mention that Maven is preferred for maintainability and consistency across developers.

### 5. Why should configuration be externalized in JDBC apps?
**Answer:** Database URL, username, password, and pool settings should be outside source code to support multiple environments safely. Hardcoded values cause security and deployment problems. External config also enables faster operations and safer credential rotation.

### 6. What should a proper JDBC project structure include?
**Answer:** A clean structure includes configuration, DAO/repository classes, model classes, service layer, and utility classes for connection handling. This separation keeps SQL centralized and testable. Interviewers often probe this to assess code organization maturity.

### 7. How do you verify that JDBC setup is correct?
**Answer:** Run a small connectivity test, execute a simple SELECT 1 query, and verify graceful close of resources. Also check logs for driver loading and DB connectivity latency. Verification should cover both correctness and operational visibility.

### 8. What environment-specific setup challenges appear in teams?
**Answer:** Teams often face different local DB ports, credentials, and OS-specific path issues. Containerized databases and shared config templates reduce these inconsistencies. Mentioning this shows practical team experience.

### 9. Why is error handling important at setup stage itself?
**Answer:** Setup-time errors provide early feedback for dependency, network, and credentials problems before business logic is implemented. Proper handling and clear messages speed up onboarding and debugging. Interviewers value proactive diagnostics.

### 10. What is an interview-ready best-practice setup summary?
**Answer:** Use managed dependencies, externalized config, environment-specific properties, quick connection health checks, and clear layering from day one. This keeps JDBC projects portable, secure, and easy to scale in teams. Good setup decisions prevent many runtime failures later.

  `,
  code: `// JDBC Project Setup Guide
// This is a reference guide for JDBC project setup

/*
 * JDBC PROJECT SETUP CHECKLIST
 * =============================
 */

// 1. DOWNLOAD MYSQL CONNECTOR/J
/*
Visit: https://dev.mysql.com/downloads/connector/j/
Download: mysql-connector-j-8.0.xx.zip
Extract and find: mysql-connector-j-8.0.xx.jar

Alternative: Maven Central
https://repo1.maven.org/maven2/mysql/mysql-connector-java/
*/

// 2. PROJECT STRUCTURE
/*
JDBCExample/
├── src/
│   └── com/example/
│       └── BankApp.java
└── lib/
    └── mysql-connector-j-8.0.xx.jar
*/

// 3. ADD JAR FILE TO PROJECT
/*
Eclipse:
  - Right-click project → Properties
  - Java Build Path → Libraries
  - Add External JARs → Select mysql-connector-j-8.0.xx.jar
  - OR: Copy to lib/ folder → Add to Build Path

IntelliJ:
  - File → Project Structure → Libraries
  - Add JAR → Select mysql-connector-j-8.0.xx.jar
  - OR: Copy to lib/ → Add as Library

Maven:
  - Add dependency in pom.xml
  - Maven downloads automatically
*/

// 4. MAIN CLASS (see tutorial body for full BankApp.java)
/*
 * Use BankApp.java from the page: driver load, Connection,
 * PreparedStatement, menu, and transfer with commit/rollback.
 * Database: bankdb, table: accounts (created if missing).
 */

// 5. MYSQL CONNECTION URL FORMAT
/*
jdbc:mysql://host:port/database?parameters

Examples:
  jdbc:mysql://localhost:3306/bankdb
  jdbc:mysql://localhost:3306/bankdb?serverTimezone=UTC
  jdbc:mysql://192.168.1.100:3306/mydb
*/

// 6. DRIVER CLASS NAMES
/*
MySQL 8.0+: com.mysql.cj.jdbc.Driver
MySQL 5.x:  com.mysql.jdbc.Driver
*/

// 7. COMMON ERRORS AND SOLUTIONS
/*
ClassNotFoundException:
  - JAR file not in classpath
  - Wrong JAR file name
  - Solution: Add JAR to Build Path

No suitable driver:
  - Wrong URL format
  - MySQL not running
  - Solution: Check URL and MySQL status

Access denied:
  - Wrong username/password
  - User doesn't have permissions
  - Solution: Check credentials and grants

Connection refused:
  - MySQL not running
  - Wrong port
  - Solution: Start MySQL, check port
*/

// 8. MAVEN DEPENDENCY (pom.xml)
/*
<dependencies>
    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
        <version>8.0.33</version>
    </dependency>
</dependencies>
*/

// 9. COMPILE AND RUN (Command Line)
/*
javac -cp "lib/mysql-connector-j-8.0.xx.jar" src/com/example/BankApp.java -d out/
java -cp "out:lib/mysql-connector-j-8.0.xx.jar" com.example.BankApp
# Windows: use ; instead of : in classpath
*/

// 10. VERIFY
/*
1. MySQL running
2. CREATE DATABASE bankdb;
3. JAR on classpath
4. Run BankApp — menu should appear
*/`
};

export default jdbcProjectSetup;


