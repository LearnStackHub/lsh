const mysqlInstallation = {
  id: 'mysql-installation',
  title: 'MySQL Installation and Setup',
  description: 'Step-by-step guide to install MySQL on Windows, Linux, and macOS',
  content: `
# MySQL Installation and Setup — Get Started in Minutes

Installing MySQL is straightforward. This guide covers installation on Windows, Linux, and macOS, plus initial configuration.

---

## Installation Methods

### 1. **MySQL Installer** (Windows - Recommended)
- Easiest method
- Includes MySQL Server, Workbench, and tools
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
2. Choose setup type:
   - **Developer Default** - Includes server, workbench, and tools
   - **Server only** - Just MySQL server
   - **Full** - Everything

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

1. Open MySQL Workbench
2. Click "+" to add connection
3. Enter:
   - **Connection Name**: Local MySQL
   - **Hostname**: localhost
   - **Port**: 3306
   - **Username**: root (or your user)
   - **Password**: Click "Store in Keychain"
4. Click "Test Connection"
5. Click "OK"

### Create Database Visually

1. Right-click in Schemas panel
2. Select "Create Schema"
3. Enter database name
4. Click "Apply"

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
('John Doe', 'john@example.com'),
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


