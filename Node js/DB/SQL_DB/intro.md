# MySQL Mastery Guide 🚀

Welcome to your ultimate MySQL guide! This organized learning path covers everything from basic queries to advanced concepts. Each section builds on the previous one, making it perfect for both beginners and experienced developers. 🎯

## � Learning Path

### 🏗️ [1. Database Basics](./01_basics.md)

- What is MySQL and why it's popular
- Creating databases and tables
- Data types and constraints
- Essential SQL commands
- Basic queries and filtering

### 📝 [2. CRUD Operations](./02_crud_operations.md)

- **CREATE**: Inserting data (single & multiple rows)
- **READ**: Selecting data with conditions, sorting, and limiting
- **UPDATE**: Modifying existing records
- **DELETE**: Removing data safely
- Transactions for data integrity

### 🔗 [3. Joins & Relationships](./03_joins_relationships.md)

- Understanding database relationships
- INNER, LEFT, RIGHT, and FULL OUTER JOINs
- Self joins and cross joins
- Many-to-many relationships
- Join performance best practices

### 🎯 [4. Advanced Queries](./04_advanced_queries.md)

- Subqueries (WHERE, SELECT, FROM clauses)
- Common Table Expressions (CTEs)
- Recursive CTEs for hierarchical data
- Window functions (ROW_NUMBER, RANK, LAG, LEAD)
- PIVOT queries and JSON functions
- Full-text search capabilities

### ⚡ [5. Performance & Optimization](./05_performance.md)

- Indexing strategies and when to use them
- Query optimization with EXPLAIN
- Database design (normalization vs denormalization)
- Connection pooling and caching
- Monitoring and maintenance
- Performance best practices

### 🏆 [6. Practical Examples](./06_practical_examples.md)

- **Student Management System**: Complete schema and complex queries
- **E-commerce Database**: Sales reports and customer analytics
- **Blog/CMS**: Content management with tags and relationships
- Real-world business scenarios and solutions

### 🔧 [7. Backend Integration](./07_backend_integration.md)

- **ORM Integration**: Sequelize, TypeORM, and Repository patterns
- **Connection Management**: Pooling, health checks, and graceful shutdown
- **Testing Strategies**: Test databases, mocking, and integration tests
- **Security Best Practices**: SQL injection prevention and data encryption
- **Monitoring & Observability**: Query logging, performance metrics
- **Backup & Recovery**: Automated backups and disaster recovery

---

## 🏗️ Database Basics

### What is MySQL?

- Open-source RDBMS (Relational Database Management System)
- Used by tech giants: Facebook, Twitter, Uber, GitHub
- Perfect for both small and large applications

### Key Concepts

```sql
-- Creating a database
CREATE DATABASE school_db;
USE school_db;

-- Creating a table
CREATE TABLE students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    enrollment_date DATE DEFAULT (CURRENT_DATE),
    gpa DECIMAL(3,2) CHECK (gpa BETWEEN 0 AND 4.0)
);
```

### Data Types Cheat Sheet

| Type         | Description     | Example           |
| ------------ | --------------- | ----------------- |
| INT          | Whole numbers   | `42`              |
| VARCHAR(n)   | Variable string | `'John'`          |
| DECIMAL(m,d) | Fixed-point     | `3.14`            |
| DATE         | Date only       | `'2025-12-31'`    |
| BOOLEAN      | True/False      | `TRUE`            |
| TEXT         | Long text       | `'Long story...'` |

---

## 📝 CRUD Operations

### 1. Create (INSERT)

```sql
-- Single row
INSERT INTO students (first_name, last_name, email, gpa)
VALUES ('John', 'Doe', 'john@example.com', 3.7);

-- Multiple rows
INSERT INTO students (first_name, last_name, email) VALUES
    ('Alice', 'Smith', 'alice@example.com'),
    ('Bob', 'Johnson', 'bob@example.com');
```

### 2. Read (SELECT)

```sql
-- Basic select
SELECT * FROM students;

-- With conditions
SELECT first_name, last_name
FROM students
WHERE gpa > 3.5
ORDER BY last_name;

-- Aggregation
SELECT
    COUNT(*) as total_students,
    AVG(gpa) as avg_gpa
FROM students;
```

### 3. Update (UPDATE)

```sql
-- Update single record
UPDATE students
SET email = 'john.doe@school.com'
WHERE student_id = 1;

-- Update multiple records
UPDATE students
SET gpa = gpa + 0.1
WHERE gpa < 3.0;
```

### 4. Delete (DELETE)

```sql
-- Delete specific records
DELETE FROM students
WHERE last_name = 'Smith';

-- Delete all records (be careful!)
-- TRUNCATE TABLE students;  -- Faster than DELETE without WHERE
```

---

## 🔗 Joins & Relationships

### Types of Joins

```sql
-- INNER JOIN (only matching rows)
SELECT s.first_name, c.course_name
FROM students s
INNER JOIN enrollments e ON s.student_id = e.student_id
INNER JOIN courses c ON e.course_id = c.course_id;

-- LEFT JOIN (all from left table + matches from right)
SELECT s.first_name, c.course_name
FROM students s
LEFT JOIN enrollments e ON s.student_id = e.student_id
LEFT JOIN courses c ON e.course_id = c.course_id;

-- SELF JOIN (comparing rows in same table)
SELECT a.first_name, b.first_name as friend_name
FROM students a
JOIN students b ON a.friend_id = b.student_id;
```

---

## 🎯 Advanced Queries

### Subqueries

```sql
-- Students with above average GPA
SELECT first_name, last_name, gpa
FROM students
WHERE gpa > (SELECT AVG(gpa) FROM students);

-- Using IN with subquery
SELECT first_name, last_name
FROM students
WHERE student_id IN (
    SELECT student_id
    FROM enrollments
    WHERE grade = 'A'
);
```

### Common Table Expressions (CTEs)

```sql
WITH top_students AS (
    SELECT student_id, gpa
    FROM students
    WHERE gpa >= 3.5
)
SELECT * FROM top_students
ORDER BY gpa DESC;
```

---

## ⚡ Performance & Optimization

### Indexing

```sql
-- Create index
CREATE INDEX idx_student_email ON students(email);

-- Composite index
CREATE INDEX idx_name ON students(last_name, first_name);

-- Show indexes
SHOW INDEX FROM students;
```

### EXPLAIN Query

```sql
EXPLAIN SELECT * FROM students WHERE last_name = 'Doe';
```

### Optimization Tips

1. Always use `WHERE` to filter early
2. `SELECT` only needed columns
3. Use `LIMIT` for large result sets
4. Avoid `SELECT *` in production
5. Use transactions for multiple related operations

---

## 🏆 Practical Examples

### Example 1: Student Management System

```sql
-- Create related tables
CREATE TABLE courses (
    course_id INT PRIMARY KEY AUTO_INCREMENT,
    course_name VARCHAR(100) NOT NULL,
    credits INT DEFAULT 3
);

CREATE TABLE enrollments (
    enrollment_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    course_id INT,
    enrollment_date DATE DEFAULT (CURRENT_DATE),
    grade CHAR(2),
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

-- Find students enrolled in 'Database Systems'
SELECT s.first_name, s.last_name, e.enrollment_date
FROM students s
JOIN enrollments e ON s.student_id = e.student_id
JOIN courses c ON e.course_id = c.course_id
WHERE c.course_name = 'Database Systems';
```

### Example 2: E-commerce Database

```sql
-- Create tables for e-commerce
CREATE TABLE products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT DEFAULT 0
);

CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'shipped', 'delivered') DEFAULT 'pending',
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- Monthly sales report
SELECT
    DATE_FORMAT(order_date, '%Y-%m') as month,
    COUNT(*) as total_orders,
    SUM(oi.quantity * oi.unit_price) as total_sales
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
GROUP BY month
ORDER BY month;
```

---

## 🎓 Final Tips

1. **Always backup** your database before major changes
2. Use **transactions** for data integrity
3. **Normalize** your database design (but don't overdo it)
4. **Document** your schema and complex queries
5. **Test** your queries with realistic data volumes

Happy querying! 🎉
