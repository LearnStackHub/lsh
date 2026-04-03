const mysqlPrivileges = {
  id: 'mysql-privileges',
  title: 'MySQL Privileges & Security - GRANT, REVOKE, DCL',
  description: 'Learn Data Control Language: user management, privileges, GRANT, REVOKE, and database security',
  content: `
# MySQL Privileges & Security - Data Control Language (DCL)

MySQL DCL (Data Control Language) encompasses commands for managing database security, user permissions, and access control. DCL commands (GRANT, REVOKE) enable database administrators to control who can access databases, what operations they can perform, and on which objects. Understanding DCL is essential for database security, implementing least-privilege access, and maintaining secure database environments.

Enterprise applications require robust security through proper privilege management. DCL enables creating user accounts with specific permissions, restricting access to sensitive data, and implementing security policies. Proper privilege management is critical for protecting data, complying with security regulations, and preventing unauthorized access. Mastery of DCL is essential for database administrators and security-conscious developers.

**DCL Operations:**
- **User Management**: CREATE USER, DROP USER, ALTER USER
- **Privilege Granting**: GRANT privileges to users
- **Privilege Revocation**: REVOKE privileges from users
- **Access Control**: Control database, table, and column-level access

---

## What is DCL?

DCL includes:
- **GRANT** - Give privileges to users
- **REVOKE** - Remove privileges from users
- User management
- Security policies

---

## User Management

### Create User

\`\`\`sql
-- Create user
CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';

-- Create user with specific host
CREATE USER 'username'@'%' IDENTIFIED BY 'password';  -- Any host
CREATE USER 'username'@'192.168.1.%' IDENTIFIED BY 'password';  -- IP range

-- Create user with password expiration
CREATE USER 'username'@'localhost' 
IDENTIFIED BY 'password'
PASSWORD EXPIRE INTERVAL 90 DAY;
\`\`\`

### Drop User

\`\`\`sql
-- Drop user
DROP USER 'username'@'localhost';

-- Drop multiple users
DROP USER 'user1'@'localhost', 'user2'@'localhost';
\`\`\`

### Rename User

\`\`\`sql
-- Rename user
RENAME USER 'old_username'@'localhost' TO 'new_username'@'localhost';
\`\`\`

### Change Password

\`\`\`sql
-- Change password
ALTER USER 'username'@'localhost' IDENTIFIED BY 'new_password';

-- Set password (deprecated, use ALTER USER)
SET PASSWORD FOR 'username'@'localhost' = 'new_password';
\`\`\`

---

## Privilege Types

### Global Privileges

Apply to all databases:
- **ALL PRIVILEGES** - All privileges
- **CREATE USER** - Create users
- **RELOAD** - Reload server
- **SHUTDOWN** - Shut down server
- **PROCESS** - View processes

### Database Privileges

Apply to specific database:
- **CREATE** - Create tables
- **DROP** - Drop tables
- **ALTER** - Alter tables
- **SELECT** - Read data
- **INSERT** - Insert data
- **UPDATE** - Update data
- **DELETE** - Delete data
- **INDEX** - Create indexes
- **CREATE VIEW** - Create views
- **SHOW VIEW** - Show views

### Table Privileges

Apply to specific tables:
- **SELECT** - Read table
- **INSERT** - Insert rows
- **UPDATE** - Update rows
- **DELETE** - Delete rows
- **ALTER** - Alter table
- **DROP** - Drop table
- **INDEX** - Create indexes
- **REFERENCES** - Create foreign keys

### Column Privileges

Apply to specific columns:
- **SELECT** - Read column
- **INSERT** - Insert into column
- **UPDATE** - Update column

---

## GRANT Statement

Grant privileges to users.

### Grant Database Privileges

\`\`\`sql
-- Grant all privileges on database
GRANT ALL PRIVILEGES ON database_name.* TO 'username'@'localhost';

-- Grant specific privileges
GRANT SELECT, INSERT, UPDATE ON database_name.* TO 'username'@'localhost';

-- Grant on all databases
GRANT SELECT ON *.* TO 'username'@'localhost';
\`\`\`

### Grant Table Privileges

\`\`\`sql
-- Grant on specific table
GRANT SELECT, INSERT ON database_name.table_name TO 'username'@'localhost';

-- Grant on all tables
GRANT SELECT, INSERT ON database_name.* TO 'username'@'localhost';
\`\`\`

### Grant Column Privileges

\`\`\`sql
-- Grant on specific columns
GRANT SELECT (id, name), UPDATE (name) 
ON database_name.products 
TO 'username'@'localhost';
\`\`\`

### Grant with WITH GRANT OPTION

Allow user to grant privileges to others.

\`\`\`sql
-- Grant with grant option
GRANT SELECT ON database_name.* 
TO 'username'@'localhost' 
WITH GRANT OPTION;
\`\`\`

---

## REVOKE Statement

Remove privileges from users.

### Revoke Privileges

\`\`\`sql
-- Revoke all privileges
REVOKE ALL PRIVILEGES ON database_name.* FROM 'username'@'localhost';

-- Revoke specific privileges
REVOKE SELECT, INSERT ON database_name.* FROM 'username'@'localhost';

-- Revoke grant option
REVOKE GRANT OPTION ON database_name.* FROM 'username'@'localhost';
\`\`\`

---

## View Privileges

### Show User Privileges

\`\`\`sql
-- Show privileges for user
SHOW GRANTS FOR 'username'@'localhost';

-- Show current user privileges
SHOW GRANTS;
SHOW GRANTS FOR CURRENT_USER();
\`\`\`

### Query Privilege Tables

\`\`\`sql
-- View user privileges
SELECT * FROM mysql.user WHERE User = 'username';

-- View database privileges
SELECT * FROM mysql.db WHERE User = 'username';

-- View table privileges
SELECT * FROM mysql.tables_priv WHERE User = 'username';

-- View column privileges
SELECT * FROM mysql.columns_priv WHERE User = 'username';
\`\`\`

---

## Common Privilege Scenarios

### Scenario 1: Read-Only User

\`\`\`sql
-- Create read-only user
CREATE USER 'readonly'@'localhost' IDENTIFIED BY 'password';
GRANT SELECT ON database_name.* TO 'readonly'@'localhost';
FLUSH PRIVILEGES;
\`\`\`

### Scenario 2: Application User

\`\`\`sql
-- Create application user (no DDL)
CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'password';
GRANT SELECT, INSERT, UPDATE, DELETE ON database_name.* TO 'app_user'@'localhost';
FLUSH PRIVILEGES;
\`\`\`

### Scenario 3: Developer User

\`\`\`sql
-- Create developer user (full access to dev database)
CREATE USER 'developer'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON dev_database.* TO 'developer'@'localhost';
FLUSH PRIVILEGES;
\`\`\`

### Scenario 4: Admin User

\`\`\`sql
-- Create admin user (all privileges)
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;
\`\`\`

---

## FLUSH PRIVILEGES

Reload privilege tables after changes.

\`\`\`sql
-- Reload privileges
FLUSH PRIVILEGES;

-- Required after:
-- CREATE USER
-- GRANT
-- REVOKE
-- DROP USER
\`\`\`

---

## Security Best Practices

### 1. Principle of Least Privilege
Grant only necessary privileges.

### 2. Use Strong Passwords
\`\`\`sql
CREATE USER 'user'@'localhost' 
IDENTIFIED BY 'StrongP@ssw0rd123!';
\`\`\`

### 3. Limit Host Access
\`\`\`sql
-- Good: Specific host
CREATE USER 'user'@'192.168.1.100' IDENTIFIED BY 'password';

-- Avoid: Any host
CREATE USER 'user'@'%' IDENTIFIED BY 'password';
\`\`\`

### 4. Regular Audit
Review user privileges regularly.

\`\`\`sql
-- List all users
SELECT User, Host FROM mysql.user;

-- List users with specific privilege
SELECT User, Host FROM mysql.user WHERE Select_priv = 'Y';
\`\`\`

### 5. Remove Unused Users
\`\`\`sql
-- Drop unused users
DROP USER 'old_user'@'localhost';
\`\`\`

---

## Summary

DCL (Data Control Language) includes:
- **GRANT** - Give privileges
- **REVOKE** - Remove privileges
- **User Management** - CREATE, DROP, ALTER USER

**Privilege Levels:**
- Global (all databases)
- Database (specific database)
- Table (specific table)
- Column (specific columns)

**Security Best Practices:**
- Least privilege principle
- Strong passwords
- Limit host access
- Regular audits

Master DCL to secure your database!

---

## Practice Question

**Q:** Create:
1. Read-only user for reporting
2. Application user with INSERT/UPDATE/DELETE/SELECT
3. Revoke DELETE from application user

**Answer:**
\`\`\`sql
-- 1. Read-only user
CREATE USER 'reporter'@'localhost' IDENTIFIED BY 'password';
GRANT SELECT ON database_name.* TO 'reporter'@'localhost';
FLUSH PRIVILEGES;

-- 2. Application user
CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'password';
GRANT SELECT, INSERT, UPDATE, DELETE ON database_name.* TO 'app_user'@'localhost';
FLUSH PRIVILEGES;

-- 3. Revoke DELETE
REVOKE DELETE ON database_name.* FROM 'app_user'@'localhost';
FLUSH PRIVILEGES;
\`\`\`
---

## Real-World Applications

### Multi-User Database Environments
Enterprise databases with multiple users require careful privilege management. Different user roles (developers, analysts, administrators, applications) need different access levels. DCL enables implementing role-based access control.

**Implementation Example:**
- Read-only users for reporting and analytics
- Application users with limited DML permissions
- Developer users with development database access
- Admin users with full database control

### Application Security
Applications use dedicated database users with minimal required privileges. This follows the principle of least privilege, reducing security risk if application credentials are compromised. DCL enables creating application-specific users with only necessary permissions.

**Implementation Example:**
- Web application user with SELECT, INSERT, UPDATE on specific tables
- API user with read-only access to public data
- Background job user with specific operation permissions
- Admin interface user with broader but controlled access

### Compliance and Audit Requirements
Regulatory compliance requires strict access control and audit trails. DCL enables implementing security policies that meet compliance requirements, ensuring only authorized users access sensitive data.

**Implementation Example:**
- Healthcare systems with HIPAA-compliant access control
- Financial systems with SOX-compliant privilege management
- Government systems with security clearance requirements
- Audit logging of privilege changes

---

## Common Mistakes and How to Avoid Them

### Mistake 1: Using Root User for Applications
**Problem:** Root user has all privileges, creating security risk.

**Solution:** Create dedicated users with minimal required privileges:

\`\`\`sql
-- AVOID - Root user
-- Application connects as root

-- PREFER - Dedicated user
CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'password';
GRANT SELECT, INSERT, UPDATE, DELETE ON app_db.* TO 'app_user'@'localhost';
\`\`\`

### Mistake 2: Granting Excessive Privileges
**Problem:** Granting more privileges than needed increases security risk.

**Solution:** Follow principle of least privilege:

\`\`\`sql
-- AVOID - Too many privileges
GRANT ALL PRIVILEGES ON *.* TO 'user'@'localhost';

-- PREFER - Minimal required privileges
GRANT SELECT, INSERT ON specific_db.specific_table TO 'user'@'localhost';
\`\`\`

### Mistake 3: Not Using FLUSH PRIVILEGES
**Problem:** Privilege changes not taking effect immediately.

**Solution:** Always use FLUSH PRIVILEGES after GRANT/REVOKE:

\`\`\`sql
GRANT SELECT ON db.* TO 'user'@'localhost';
FLUSH PRIVILEGES;  -- Required!
\`\`\`

---

## Frequently Asked Questions (FAQs)

### What is DCL and why is it important?

DCL (Data Control Language) manages database security through user permissions and access control. It's important because it enables controlling who can access databases and what operations they can perform. DCL is essential for database security, implementing access policies, and protecting sensitive data from unauthorized access.

### What's the difference between GRANT and REVOKE?

GRANT gives privileges to users, enabling them to perform specific operations. REVOKE removes privileges from users, restricting their access. Use GRANT to allow access, REVOKE to restrict or remove access. Both commands modify user permissions for security control.

### Can I grant privileges on specific tables or columns?

Yes, you can grant privileges at different levels: database level (\`db.*\`), table level (\`db.table\`), or column level (specific columns). Column-level privileges enable fine-grained access control:

\`\`\`sql
GRANT SELECT (name, email) ON db.users TO 'user'@'localhost';
\`\`\`

This restricts access to specific columns only.

### What is the difference between a user and a role?

In MySQL, users are individual accounts, while roles (MySQL 8.0+) are collections of privileges that can be granted to users. Roles enable managing privileges for groups of users efficiently. For older MySQL versions, simulate roles by granting the same privileges to multiple users.

### How do I create a read-only user?

Create a user and grant only SELECT privilege:

\`\`\`sql
CREATE USER 'readonly'@'localhost' IDENTIFIED BY 'password';
GRANT SELECT ON database_name.* TO 'readonly'@'localhost';
FLUSH PRIVILEGES;
\`\`\`

This user can only read data, not modify it.

### What privileges should I grant to application users?

Grant only the privileges the application needs: typically SELECT, INSERT, UPDATE, DELETE on specific tables. Avoid granting DDL privileges (CREATE, ALTER, DROP) unless necessary. Follow the principle of least privilege - grant only what's needed.

### Can I see what privileges a user has?

Yes, use SHOW GRANTS to see user privileges:

\`\`\`sql
SHOW GRANTS FOR 'username'@'localhost';
SHOW GRANTS;  -- Current user
\`\`\`

This displays all privileges granted to the user.

### What happens if I revoke all privileges?

Revoking all privileges removes the user's ability to perform operations. The user account still exists but cannot access databases. To completely remove a user, use DROP USER instead of revoking all privileges.

### How do I change a user's password?

Use ALTER USER to change passwords:

\`\`\`sql
ALTER USER 'username'@'localhost' IDENTIFIED BY 'new_password';
\`\`\`

For older MySQL versions, use SET PASSWORD or UPDATE mysql.user table (then FLUSH PRIVILEGES).

### What is the principle of least privilege?

The principle of least privilege means granting users only the minimum privileges they need to perform their tasks. This reduces security risk by limiting what users can do if their credentials are compromised. Always grant minimal required privileges, not maximum possible privileges.

---

## Key Takeaways

Before proceeding to advanced MySQL topics, ensure you understand these DCL fundamentals:

- **DCL manages database security** through user permissions
- **GRANT gives privileges**, REVOKE removes them
- **Create dedicated users** for applications, not root
- **Follow principle of least privilege** - grant only what's needed
- **Use FLUSH PRIVILEGES** after GRANT/REVOKE changes
- **Privileges can be granted** at database, table, or column level
- **Read-only users** should only have SELECT privilege
- **Test privilege changes** before applying to production
- **Document user privileges** for security audits

---

## What's Next?

Now that you understand DCL and privileges, you're ready to explore advanced MySQL topics:

### Immediate Next Steps

1. **[MySQL Introduction](/tutorial/mysql-introduction)**: Review database fundamentals
2. **[MySQL Create Database](/tutorial/mysql-create-database)**: Create databases for user access
3. **[MySQL Security Best Practices](/tutorial/mysql-security)**: Master database security
4. **[Database Administration](/tutorial/database-administration)**: Learn administration tasks

### Advanced Topics

- **Role Management**: Master role-based access control (MySQL 8.0+)
- **Security Hardening**: Implement comprehensive security measures
- **Audit Logging**: Track privilege changes and access
- **Encryption**: Secure data at rest and in transit

### Related Tutorials

- **[MySQL Constraints](/tutorial/mysql-constraints)**: Understand data integrity alongside security
- **[Spring Boot Security](/tutorial/spring-boot-security)**: See application-level security
- **[Database Design](/tutorial/database-design)**: Design secure database schemas
- **[System Administration](/tutorial/system-administration)**: Master server-level security

DCL and privileges are essential for database security. Continue learning about [MySQL Security Best Practices](/tutorial/mysql-security) to implement comprehensive database security.

---

## 10 Important MySQL Privileges Interview Questions

### 1. What does GRANT do?

**Answer:** **GRANT** assigns **privileges** (e.g. **SELECT**, **INSERT**, **UPDATE**, **DELETE**, **ALL PRIVILEGES**) to a MySQL account identified as **\`'username'@'host'\`** at **global**, **database**, **table**, or **column** scope. **Privileges** are stored in the **mysql** system database and **apply** on **next** connection (or after **flush** in edge cases). **Principle of least privilege** means granting **only** what is **needed**.

### 2. Why does the host part of a user matter?

**Answer:** MySQL treats **\`'app'@'localhost'\`** and **\`'app'@'%'\`** as **different** accounts. **localhost** typically matches **TCP** connections from the **same** machine (or **socket**). **\`%\`** matches **any** remote host—**convenient** but **dangerous** without **firewall** and **strong** passwords. **Always** tie **users** to **known** **network** paths.

### 3. What is FLUSH PRIVILEGES?

**Answer:** **FLUSH PRIVILEGES** reloads **grant** tables from disk—rarely needed on **modern** MySQL for **normal** **GRANT**/**REVOKE** but still relevant if you **hand-edit** **mysql.user** (discouraged). **Know** it exists for **recovery** scenarios.

### 4. What is the principle of least privilege?

**Answer:** Application accounts should have **only** the **minimum** rights required: **read-only** users for **reporting**, **no** **DROP**/**ALTER** on **production** unless **migrations** run as a **separate** **role**. **Separation** limits **blast radius** when credentials **leak** or SQL injection **occurs**.

### 5. What are roles in MySQL 8+?

**Answer:** **Roles** bundle **grants** (e.g. **app_read**, **app_write**). You **GRANT** roles **TO** users and **SET DEFAULT ROLE** or **activate** per session. **Simplifies** **onboarding** and **rotation** compared to **per-user** **GRANT** lists.

### 6. How do you revoke privileges?

**Answer:** **REVOKE** removes privileges symmetrically to **GRANT**. **Audit** periodically: **SHOW GRANTS FOR 'user'@'host'**; query **information_schema.USER_PRIVILEGES**. **Dangerous** global rights include **SUPER**, **FILE**, **SHUTDOWN**—**restrict** to **DBA** accounts.

### 7. What is WITH GRANT OPTION?

**Answer:** It allows a user to **grant** their **own** privileges to **other** users—effectively **delegating** **administration**. **Use** **sparingly**—it **expands** the **attack** surface. **Revoke** when **roles** change jobs.

### 8. How do DB privileges relate to SQL injection?

**Answer:** **Prepared statements** stop **most** injection, but a **compromised** app or **bug** can still run **authorized** SQL—**least privilege** limits **damage** (e.g. **read-only** cannot **DROP** tables). **Defense in depth**: **app** validation + **DB** **privileges** + **network** controls.

### 9. What belongs on a production security checklist?

**Answer:** **No** **root** **remote** login; **TLS** for connections; **strong** **passwords** or **cert** auth; **minimal** grants; **network** isolation (VPC, **private** subnets); **audit** logs for **DDL**/**GRANT**; **rotate** credentials. **Align** with **compliance** (PCI, HIPAA) if applicable.

### 10. How do you inspect effective permissions?

**Answer:** **SHOW GRANTS FOR CURRENT_USER();** and **SHOW GRANTS FOR 'user'@'host';** display **privileges**. Use this when debugging **Access denied** errors—often a **wrong** **host** pattern or **missing** **database**-level **grant**.

---

## Related tutorials — quick links (topic-wise)

| Topic | Tutorial link |
|-------|----------------|
| **Installation / users** | [MySQL Installation](/tutorial/mysql-installation) |
| **DDL (object ownership)** | [MySQL DDL](/tutorial/mysql-ddl) |
| **App security** | [Servlet Security](/tutorial/servlet-security) |
| **API auth** | [Authentication & Authorization](/tutorial/authentication-authorization) |
| **HTTPS** | [HTTPS Security](/tutorial/https-security) |

---

## Test Your Knowledge

Mastered MySQL privileges? Test your skills with our comprehensive [MySQL MCQ Exam](/tutorial/mysql-mcq) covering privileges, security, and all MySQL topics!
  `,
  code: `-- MySQL Privileges & Security Examples

-- Note: These commands require appropriate privileges
-- Run as root or user with CREATE USER and GRANT privileges

-- ========== User Management ==========

-- Create user
CREATE USER 'testuser'@'localhost' IDENTIFIED BY 'password123';

-- Create user with specific host
CREATE USER 'remoteuser'@'%' IDENTIFIED BY 'password123';

-- Create user with IP range
CREATE USER 'networkuser'@'192.168.1.%' IDENTIFIED BY 'password123';

-- Drop user
DROP USER 'testuser'@'localhost';

-- Rename user
RENAME USER 'olduser'@'localhost' TO 'newuser'@'localhost';

-- Change password
ALTER USER 'testuser'@'localhost' IDENTIFIED BY 'newpassword123';

-- ========== GRANT Privileges ==========

-- Grant all privileges on database
GRANT ALL PRIVILEGES ON my_database.* TO 'testuser'@'localhost';

-- Grant specific privileges
GRANT SELECT, INSERT, UPDATE ON my_database.* TO 'testuser'@'localhost';

-- Grant on specific table
GRANT SELECT, INSERT ON my_database.products TO 'testuser'@'localhost';

-- Grant on all databases
GRANT SELECT ON *.* TO 'readonly'@'localhost';

-- Grant column-level privileges
GRANT SELECT (id, name), UPDATE (name) 
ON my_database.products 
TO 'testuser'@'localhost';

-- Grant with GRANT OPTION
GRANT SELECT ON my_database.* 
TO 'testuser'@'localhost' 
WITH GRANT OPTION;

-- ========== REVOKE Privileges ==========

-- Revoke all privileges
REVOKE ALL PRIVILEGES ON my_database.* FROM 'testuser'@'localhost';

-- Revoke specific privileges
REVOKE SELECT, INSERT ON my_database.* FROM 'testuser'@'localhost';

-- Revoke grant option
REVOKE GRANT OPTION ON my_database.* FROM 'testuser'@'localhost';

-- ========== View Privileges ==========

-- Show user privileges
SHOW GRANTS FOR 'testuser'@'localhost';

-- Show current user privileges
SHOW GRANTS;
SHOW GRANTS FOR CURRENT_USER();

-- Query privilege tables
SELECT User, Host FROM mysql.user;
SELECT * FROM mysql.db WHERE User = 'testuser';
SELECT * FROM mysql.tables_priv WHERE User = 'testuser';

-- ========== Common Scenarios ==========

-- Read-only user
CREATE USER 'readonly'@'localhost' IDENTIFIED BY 'password';
GRANT SELECT ON my_database.* TO 'readonly'@'localhost';
FLUSH PRIVILEGES;

-- Application user (no DDL)
CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'password';
GRANT SELECT, INSERT, UPDATE, DELETE ON my_database.* TO 'app_user'@'localhost';
FLUSH PRIVILEGES;

-- Developer user
CREATE USER 'developer'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON dev_database.* TO 'developer'@'localhost';
FLUSH PRIVILEGES;

-- Admin user
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;

-- ========== FLUSH PRIVILEGES ==========

-- Reload privileges (required after GRANT/REVOKE)
FLUSH PRIVILEGES;

-- ========== Security Best Practices ==========

-- List all users
SELECT User, Host FROM mysql.user;

-- List users with specific privilege
SELECT User, Host FROM mysql.user WHERE Select_priv = 'Y';

-- Remove unused users
DROP USER IF EXISTS 'olduser'@'localhost';

-- Change password regularly
ALTER USER 'testuser'@'localhost' IDENTIFIED BY 'new_secure_password';

-- Note: Always use strong passwords in production!
-- Consider using password validation plugin for MySQL 5.7+
`
};

export default mysqlPrivileges;


