# 🏗️ Database Basics

## SQL Database Characteristics

### Core Properties of SQL Databases

| Characteristic          | Description                                     | MySQL Implementation                             |
| ----------------------- | ----------------------------------------------- | ------------------------------------------------ |
| **ACID Compliance**     | Ensures data reliability and consistency        | Full ACID support with InnoDB engine             |
| **Schema-Based**        | Fixed structure with predefined tables/columns  | CREATE TABLE with defined data types             |
| **Relational Model**    | Data stored in related tables with foreign keys | Foreign key constraints enforce relationships    |
| **SQL Language**        | Standardized query language                     | ANSI SQL compliance with extensions              |
| **Transaction Support** | Group operations into atomic units              | START TRANSACTION, COMMIT, ROLLBACK              |
| **Data Integrity**      | Built-in constraints prevent invalid data       | PRIMARY KEY, UNIQUE, NOT NULL, CHECK constraints |

### ACID Properties Explained

**A - Atomicity**

- All operations in a transaction succeed or fail together
- Example: Bank transfer - both debit and credit must complete

```sql
START TRANSACTION;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;  -- Both updates succeed or neither does
```

**C - Consistency**

- Database remains in valid state after transactions
- Constraints ensure data rules are followed

```sql
-- This will fail if email already exists (UNIQUE constraint)
INSERT INTO users (email) VALUES ('existing@email.com');
```

**I - Isolation**

- Concurrent transactions don't interfere with each other
- Four isolation levels: READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, SERIALIZABLE

```sql
-- Set transaction isolation level
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
```

**D - Durability**

- Committed changes survive system failures
- Data is permanently stored on disk

### MySQL Engine Characteristics

**InnoDB (Default)**

- ✅ Full ACID compliance
- ✅ Foreign key support
- ✅ Row-level locking
- ✅ Crash recovery
- ✅ Transaction support

**MyISAM (Legacy)**

- ❌ No transactions
- ❌ No foreign keys
- ✅ Table-level locking
- ✅ Faster for read-heavy operations
- ✅ Smaller storage footprint

### Data Characteristics

**Structured Data**

```sql
-- Fixed schema enforces data consistency
CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,  -- Must have name
    price DECIMAL(10,2) CHECK (price > 0),  -- Price must be positive
    category ENUM('electronics', 'clothing', 'food'),  -- Limited values
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Auto-populated
);
```

**Relationship Types**

- **One-to-One**: One user has one profile
- **One-to-Many**: One customer has many orders
- **Many-to-Many**: Students enroll in many courses

**Normalization Benefits**

- Reduces data redundancy
- Prevents data anomalies
- Improves data integrity
- Easier maintenance

### Performance Characteristics

**Indexing**

- B-tree indexes for fast lookups
- Full-text indexes for text search
- Spatial indexes for geographic data

**Query Optimization**

- Query cache for repeated queries
- Execution plan optimization
- Statistics-based query planning

### Security Characteristics

**Access Control**

```sql
-- User management
CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'password';
GRANT SELECT, INSERT ON mydb.* TO 'app_user'@'localhost';
REVOKE ALL ON mydb.* FROM 'app_user'@'localhost';
```

**Data Protection**

- Password authentication
- SSL/TLS encryption
- Role-based permissions
- Audit logging

### Scalability Characteristics

**Vertical Scaling** - Improve capacity of a single Server

- More CPU, RAM, storage
- Better single-server performance

**Horizontal Scaling** - Add more Servers

- Replication (master-slave)
- Sharding (data partitioning)
- Clustering (MySQL Cluster)

### Comparison with NoSQL

| Aspect        | SQL (MySQL)    | NoSQL (MongoDB)    |
| ------------- | -------------- | ------------------ |
| Schema        | Fixed          | Flexible           |
| Consistency   | Strong         | Eventual           |
| Queries       | SQL            | Various APIs       |
| Scaling       | Vertical first | Horizontal first   |
| Transactions  | ACID           | Limited            |
| Relationships | Foreign keys   | Embedded documents |

---

## What is MySQL?

- Open-source RDBMS (Relational Database Management System)
- Used by tech giants: Facebook, Twitter, Uber, GitHub
- Perfect for both small and large applications
- First released in 1995

## Key Concepts

### Creating a Database

```sql
-- Create a new database
CREATE DATABASE school_db;

-- Select the database to use
USE school_db;
```

### Creating Tables

```sql
CREATE TABLE students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    enrollment_date DATE DEFAULT (CURRENT_DATE),
    gpa DECIMAL(3,2) CHECK (gpa BETWEEN 0 AND 4.0)
);
```

## Data Types Cheat Sheet

| Type             | Description                      | Example                            |
| ---------------- | -------------------------------- | ---------------------------------- |
| **INT**          | Whole numbers                    | `42`                               |
| **VARCHAR(n)**   | Variable string (1-65,535 chars) | `'John'`                           |
| **DECIMAL(m,d)** | Fixed-point numbers              | `3.14`                             |
| **DATE**         | Date (YYYY-MM-DD)                | `'2025-12-31'`                     |
| **DATETIME**     | Date and time                    | `'2025-12-31 23:59:59'`            |
| **BOOLEAN**      | True/False values                | `TRUE` or `1`                      |
| **ENUM**         | One of predefined values         | `ENUM('small', 'medium', 'large')` |
| **TEXT**         | Long text (up to 65,535 chars)   | `'Long text content...'`           |

## Constraints

| Constraint       | Description                      |
| ---------------- | -------------------------------- |
| `PRIMARY KEY`    | Uniquely identifies each record  |
| `FOREIGN KEY`    | Maintains referential integrity  |
| `UNIQUE`         | Ensures all values are unique    |
| `NOT NULL`       | Column cannot be NULL            |
| `DEFAULT`        | Sets default value               |
| `AUTO_INCREMENT` | Auto-increments value            |
| `CHECK`          | Validates data against condition |

## Common Commands

```sql
-- Show all databases
SHOW DATABASES;

-- Show tables in current database
SHOW TABLES;

-- Describe table structure
DESCRIBE students;

-- Drop a table (be careful!)
-- DROP TABLE students;

-- Alter table (add column)
ALTER TABLE students
ADD COLUMN phone VARCHAR(15) AFTER email;

-- Alter table (modify column)
ALTER TABLE students
MODIFY COLUMN phone VARCHAR(20);

-- Drop column
ALTER TABLE students
DROP COLUMN phone;
```

## Basic Queries

```sql
-- Select all columns
SELECT * FROM students;

-- Select specific columns
SELECT first_name, last_name FROM students;

-- Filtering with WHERE
SELECT * FROM students WHERE gpa > 3.5;

-- Sorting results
SELECT * FROM students ORDER BY last_name ASC, first_name ASC;

-- Limiting results
SELECT * FROM students LIMIT 10;

-- Distinct values
SELECT DISTINCT last_name FROM students;

-- Counting rows
SELECT COUNT(*) FROM students WHERE gpa > 3.5;
```

[Back to Main Index](../SQL_DB/intro.md) | [Next: CRUD Operations →](./02_crud_operations.md)
