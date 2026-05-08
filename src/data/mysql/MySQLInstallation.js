const mysqlInstallation = {
  id: 'mysql-installation',
  title: 'MySQL Installation and Setup',
  description: 'Step-by-step guide to install MySQL on Windows, Linux, and macOS',
  content: `
# MySQL Installation and Setup — Get Started in Minutes

Installing MySQL is straightforward. This guide covers installation on Windows, Linux, and macOS, plus initial configuration.

---

## Before you install: Server vs MySQL Workbench

These are **two different programs**:

| | **MySQL Server** (mysqld) | **MySQL Workbench** |
|---|---------------------------|----------------------|
| **What it is** | The database engine that stores your data and listens on port **3306** | A **GUI client** to run SQL and manage the server |
| **Required?** | **Yes** — without it, there is no database | **No** — you can use the mysql CLI, DBeaver, or another app instead |
| **Installs data?** | Yes — creates the data directory and system tables | **No** — it only connects to an existing server |

- **Installing MySQL Workbench alone does not give you a database.** You must install **MySQL Server** first (or use Docker/cloud).
- On Windows, **MySQL Installer** lets you choose products: **Server** is usually required; **Workbench** is optional.  
  If you pick **Server only**, Workbench is not installed — add it separately from the same installer (**Modify**) or download **MySQL Workbench** from [MySQL Downloads](https://dev.mysql.com/downloads/workbench/).
- A shortcut like **“Local instance MySQL80”** in Workbench only appears if the installer registered it. If you do not see it, create a **new connection** manually (see below).

---

## Installation Methods

### 1. **MySQL Installer** (Windows - Recommended)
- Easiest method on Windows
- Lets you choose **which products** to install (Server, Workbench, Shell, etc.)
- GUI-based installation

### 2. **Package Manager** (Linux/macOS)
- Quick installation
- Automatic updates
- Command-line based

### 3. **Docker** (All Platforms)
- Isolated environment
- Easy to remove
- Consistent across platforms

---

## Windows Installation

### Step 1: Download MySQL Installer

1. Go to: https://dev.mysql.com/downloads/installer/
2. Download **MySQL Installer for Windows**
3. Choose "Full" or "Developer Default" setup

### Step 2: Run Installer

1. Run the downloaded \`.msi\` file
2. Choose setup type (you can change products later with **Modify**):
   - **Developer Default** — Pre-selects common dev tools (usually includes **Server** + **Workbench** + connectors — check the list)
   - **Server only** — **MySQL Server only** (no Workbench — use CLI or install Workbench later)
   - **Custom** — Pick exactly which products (recommended if you want **Server** without Workbench, or vice versa)
   - **Full** — Everything in the catalog (large)

### Step 3: Configure Server

1. **Type and Networking:**
   - Config Type: Development Computer
   - Port: 3306 (default)
   - Open Windows Firewall: Yes

2. **Authentication:**
   - Use Strong Password Encryption
   - Set root password (remember this!)
   - Add MySQL user (optional)

3. **Windows Service:**
   - Start MySQL Server at System Startup: Yes
   - Run Windows Service as: Standard System Account

### Step 4: Complete Installation

1. Click "Execute" to install
2. Wait for installation to complete
3. Click "Finish"

### Step 5: Verify Installation

Open Command Prompt and run:

\`\`\`bash
mysql --version
\`\`\`

Should display: \`mysql Ver 8.0.x for Win64\`

---

## Linux Installation (Ubuntu/Debian)

### Using APT Package Manager

\`\`\`bash
# Update package list
sudo apt update

# Install MySQL Server
sudo apt install mysql-server

# Start MySQL service
sudo systemctl start mysql

# Enable MySQL to start on boot
sudo systemctl enable mysql

# Secure installation
sudo mysql_secure_installation
\`\`\`

### Secure Installation Options

- Set root password: **Yes**
- Remove anonymous users: **Yes**
- Disallow root login remotely: **Yes** (for security)
- Remove test database: **Yes**
- Reload privilege tables: **Yes**

### Verify Installation

\`\`\`bash
# Check MySQL version
mysql --version

# Check MySQL status
sudo systemctl status mysql
\`\`\`

---

## macOS Installation

### Using Homebrew (Recommended)

\`\`\`bash
# Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install MySQL
brew install mysql

# Start MySQL service
brew services start mysql

# Secure installation
mysql_secure_installation
\`\`\`

### Using MySQL DMG Installer

1. Download MySQL from: https://dev.mysql.com/downloads/mysql/
2. Choose macOS version
3. Run the \`.dmg\` file
4. Follow installation wizard
5. Set root password

---

## Docker Installation (All Platforms)

### Install Docker

1. Download Docker Desktop from: https://www.docker.com/products/docker-desktop
2. Install and start Docker

### Run MySQL Container

\`\`\`bash
# Pull MySQL image
docker pull mysql:8.0

# Run MySQL container
docker run --name mysql-container \\
  -e MYSQL_ROOT_PASSWORD=yourpassword \\
  -e MYSQL_DATABASE=mydb \\
  -p 3306:3306 \\
  -d mysql:8.0

# Check if running
docker ps
\`\`\`

### Connect to MySQL in Docker

\`\`\`bash
# Connect to MySQL
docker exec -it mysql-container mysql -u root -p

# Or from host machine
mysql -h 127.0.0.1 -P 3306 -u root -p
\`\`\`

---

## Initial Configuration

### 1. Connect to MySQL

**Command Line:**
\`\`\`bash
mysql -u root -p
# Enter your root password
\`\`\`

**MySQL Workbench:**
1. Open MySQL Workbench
2. Click "Local instance MySQL"
3. Enter root password
4. Click "OK"

### 2. Create a New User (Recommended)

\`\`\`sql
-- Create user
CREATE USER 'myuser'@'localhost' IDENTIFIED BY 'mypassword';

-- Grant privileges
GRANT ALL PRIVILEGES ON *.* TO 'myuser'@'localhost';

-- Apply changes
FLUSH PRIVILEGES;
\`\`\`

### 3. Create Your First Database

\`\`\`sql
-- Create database
CREATE DATABASE myfirstdb;

-- Use the database
USE myfirstdb;

-- Verify
SHOW DATABASES;
\`\`\`

---

## MySQL Workbench Setup

### Connect to Server

Workbench is **not** a substitute for installing **MySQL Server**. If **Test Connection** fails:

1. Confirm **mysqld** is running (Windows Services, Docker, or systemctl on Linux).
2. Confirm **port 3306** (or your custom port). On some systems, use **\`127.0.0.1\`** instead of \`localhost\` if the client resolves hostnames unexpectedly.
3. **MySQL 8** default authentication is **caching_sha2_password** — current Workbench supports it; older clients may need a user with **mysql_native_password** (legacy).

**Add a connection:**

1. Open MySQL Workbench → home screen.
2. **MySQL Connections** → **+** (or **Database** → **Manage Connections**).
3. **Connection Method:** Standard (TCP/IP).
4. **Hostname:** \`127.0.0.1\` · **Port:** \`3306\` · **Username:** \`root\` (or app user).
5. **Password:** Store in Keychain / Vault, or prompt each time.
6. **Test Connection** → **OK**.

### Create Database Visually

1. Open the connection (double-click the tile).
2. **Schemas** (left) → right-click → **Create Schema**.
3. **Name** (e.g. \`mydb\`) → **Apply** → **Finish**.

---

## Common Configuration

### Find Configuration File

**Windows:**
\`C:\\ProgramData\\MySQL\\MySQL Server 8.0\\my.ini\`

**Linux:**
\`/etc/mysql/mysql.conf.d/mysqld.cnf\`

**macOS:**
\`/usr/local/mysql/my.cnf\` or \`/etc/my.cnf\`

### Important Settings

\`\`\`ini
[mysqld]
# Port
port = 3306

# Data directory
datadir = /var/lib/mysql

# Character set
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci

# Max connections
max_connections = 200

# Buffer pool size (adjust based on RAM)
innodb_buffer_pool_size = 1G
\`\`\`

---

## Troubleshooting

### MySQL Won't Start

**Windows:**
\`\`\`bash
# Check service status
services.msc
# Find MySQL service and start it
\`\`\`

**Linux:**
\`\`\`bash
# Check status
sudo systemctl status mysql

# Start service
sudo systemctl start mysql

# Check logs
sudo tail -f /var/log/mysql/error.log
\`\`\`

### Can't Connect to MySQL

1. **Check if MySQL is running:**
   \`\`\`bash
   # Windows
   services.msc
   
   # Linux/macOS
   sudo systemctl status mysql
   \`\`\`

2. **Check port:**
   \`\`\`bash
   netstat -an | grep 3306
   \`\`\`

3. **Reset root password:**
   \`\`\`bash
   # Stop MySQL
   sudo systemctl stop mysql
   
   # Start in safe mode
   sudo mysqld_safe --skip-grant-tables &
   
   # Connect and reset
   mysql -u root
   ALTER USER 'root'@'localhost' IDENTIFIED BY 'newpassword';
   FLUSH PRIVILEGES;
   \`\`\`

---

## Verify Installation

### Test Connection

\`\`\`sql
-- Connect to MySQL
mysql -u root -p

-- Check version
SELECT VERSION();

-- Show databases
SHOW DATABASES;

-- Show current user
SELECT USER();

-- Exit
EXIT;
\`\`\`

### Create Test Database

\`\`\`sql
-- Create database
CREATE DATABASE testdb;

-- Use it
USE testdb;

-- Create table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100)
);

-- Insert data
INSERT INTO users (name, email) VALUES
('Dattu p', ' Dattu@example.com'),
('Jane Smith', 'jane@example.com');

-- Query data
SELECT * FROM users;

-- Drop database (cleanup)
DROP DATABASE testdb;
\`\`\`

---

## Next Steps

After installation:

1. ✅ **Learn SQL Basics** - SELECT, INSERT, UPDATE, DELETE
2. ✅ **Create Databases** - Design your schema
3. ✅ **Work with Tables** - Create and manage tables
4. ✅ **Write Queries** - Retrieve and manipulate data
5. ✅ **Advanced Topics** - Joins, functions, procedures

---

## Summary

MySQL installation is straightforward:
- **Windows**: Use MySQL Installer
- **Linux**: Use package manager (apt, yum)
- **macOS**: Use Homebrew or DMG installer
- **Docker**: Cross-platform option

**Key Steps:**
1. Download and install
2. Set root password
3. Start MySQL service
4. Create database and user
5. Verify installation

Your MySQL installation is complete and ready for database development.

---

## Practice Question

**Q:** After installing MySQL, you can't connect. What are the most common issues and how do you fix them?

**Answer:**
1. **MySQL service not running** - Start the service (services.msc on Windows, systemctl on Linux)
2. **Wrong password** - Reset password using safe mode
3. **Port blocked** - Check firewall settings, ensure port 3306 is open
4. **Wrong host** - Use 'localhost' or '127.0.0.1' for local connections
5. **User doesn't exist** - Create user with CREATE USER command
6. **Privileges not granted** - Grant privileges with GRANT command

---

## 10 Important MySQL Installation Interview Questions

### 1. How do you verify MySQL is installed correctly?

**Answer:** From the shell, run \`mysql --version\` to confirm the client binary is on your **PATH**. Then connect with \`mysql -u root -p\` (or another user) and execute \`SELECT VERSION();\`, \`SELECT @@hostname;\`, and \`SHOW DATABASES;\`. If \`mysql\` is “not found,” the install or **PATH** is wrong. If connection fails, separate **client** vs **server** issues (service down, wrong port, socket path on Linux).

### 2. What is the default network port and why does it matter?

**Answer:** MySQL listens on **TCP 3306** by default. Connection URLs, JDBC strings, Docker **port mappings**, and **security groups** must all align. **Remote** access also requires the server to **listen** on that interface (\`bind-address\`) and **firewalls** to allow inbound traffic. Changing the port is valid but must be coordinated everywhere.

### 3. Who is the \`root\` user?

**Answer:** \`root\` is the built-in **superuser** with full administrative privileges. It is acceptable for **local learning** and initial setup. In production **applications**, you create **dedicated** accounts with **least privilege** (only the databases and statements needed). **Never** embed \`root\` credentials in application config for production.

### 4. Why is a strong root password important?

**Answer:** \`root\` can **drop databases**, create users, grant **ALL PRIVILEGES**, and read all data. A weak password on a **network-exposed** instance is a common entry point for attackers. Best practice: strong password, **no** public exposure without VPN, and **fail2ban** or network isolation where applicable. **Rotate** credentials after install scripts.

### 5. What is MySQL Workbench?

**Answer:** **MySQL Workbench** is Oracle’s **GUI** for SQL editing, **schema** design, **server administration**, and **migration**. It is optional—many developers use the **CLI**, **VS Code** extensions, or **DataGrip**. In interviews, say you can use any client as long as you understand **SQL** and **connection** parameters.

### 6. How do you start and stop MySQL on Windows vs Linux?

**Answer:** On **Windows**, use **Services** (\`services.msc\`) to start/stop the MySQL service, or PowerShell equivalents. On **Linux**, the service name depends on the package (\`mysql\`, \`mysqld\`, or \`mariadb\`); common commands are \`systemctl start mysql\` / \`stop\` / \`status\`. **macOS** Homebrew uses \`brew services\`. Knowing the **exact** service name for your distro avoids confusion in troubleshooting.

### 7. What does \`bind-address\` control?

**Answer:** In \`my.cnf\` (or \`my.ini\`), \`bind-address\` sets **which IP addresses** MySQL listens on. **127.0.0.1** means **local only** connections. **0.0.0.0** (or **::**) means **all interfaces**—required for remote clients but **dangerous** without firewall and auth hardening. **skip-networking=1** disables TCP entirely (socket only).

### 8. What are common causes of “Can’t connect to MySQL server”?

**Answer:** Typical causes: **mysqld** not running; wrong **host** (\`localhost\` vs **127.0.0.1** vs socket); wrong **port**; **firewall** blocking 3306; **user** defined only for \`localhost\` while you connect from another host; **max_connections** reached; **SSL** requirements mismatch. Systematic checks: **ping**, **telnet/nc** to port, **error log**, \`SHOW PROCESSLIST\` for admins.

### 9. Why use MySQL in Docker?

**Answer:** Docker gives a **reproducible** MySQL version for every developer and CI job, without conflicting OS packages. You can pin **image tags**, map **ports** and **volumes**, and tear down environments cleanly. Trade-offs: **volume** backup strategy, **memory** limits, and **production** still needs proper **backup** and **HA**—Docker is not “production” by itself.

### 10. After installation, what first SQL should a beginner run?

**Answer:** Run \`SHOW DATABASES;\` to see schemas, \`CREATE DATABASE test_db;\` and \`USE test_db;\` to prove DDL rights, then \`CREATE TABLE\`, \`INSERT\`, \`SELECT\` to validate the full path. Also run \`SELECT USER(), CURRENT_USER();\` to see **which** account you authenticated as—important when debugging **privilege** issues.

---

## Related tutorials — quick links (topic-wise)

| Topic | Tutorial link |
|-------|----------------|
| **MySQL concepts** | [MySQL Introduction](/mysql/mysql-introduction) |
| **DDL: create objects** | [MySQL DDL](/mysql/mysql-ddl) |
| **Create DB & tables** | [Creating Databases and Tables](/mysql/mysql-create-database) |
| **Users & GRANT** | [MySQL Privileges](/mysql/mysql-privileges) |
| **Java connection** | [JDBC Connection Steps](/tutorial/jdbc-connection-steps) |

---

## Test Your Knowledge

MySQL installed successfully? Test your MySQL knowledge with our comprehensive [MySQL MCQ Exam](/mysql-mcq) covering installation, setup, and all MySQL topics!
  `,
  code: `-- MySQL Installation Verification

-- Connect to MySQL (from command line)
-- mysql -u root -p

-- Check MySQL version
SELECT VERSION();

-- Show all databases
SHOW DATABASES;

-- Show current user
SELECT USER(), CURRENT_USER();

-- Show MySQL variables
SHOW VARIABLES LIKE 'version%';
SHOW VARIABLES LIKE 'port';
SHOW VARIABLES LIKE 'datadir';

-- Create a test database
CREATE DATABASE IF NOT EXISTS test_installation;
USE test_installation;

-- Create a simple table
CREATE TABLE IF NOT EXISTS test_table (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert test data
INSERT INTO test_table (name) VALUES
('Test Record 1'),
('Test Record 2'),
('Test Record 3');

-- Query test data
SELECT * FROM test_table;

-- Check table structure
DESCRIBE test_table;
SHOW CREATE TABLE test_table;

-- Check table status
SHOW TABLE STATUS LIKE 'test_table';

-- Clean up (optional)
-- DROP DATABASE test_installation;

-- Exit MySQL
-- EXIT;`
};

export default mysqlInstallation;


