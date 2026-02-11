# 🔗 Joins & Relationships

## Understanding Relationships

### One-to-Many (Most Common)

- One customer can have many orders
- One author can write many books
- One department can have many employees

### Many-to-Many

- Students can enroll in many courses, and courses can have many students
- Books can have many authors, and authors can write many books

### One-to-One

- One user has one profile
- One country has one capital city

## Types of Joins

### INNER JOIN

Returns only the matching rows from both tables.

```sql
-- Basic INNER JOIN
SELECT s.first_name, s.last_name, e.grade
FROM students s
INNER JOIN enrollments e ON s.student_id = e.student_id;
```

### LEFT (OUTER) JOIN

Returns all rows from the left table and matching rows from the right table.

```sql
-- Get all students and their enrollments (if any)
SELECT s.first_name, s.last_name, e.course_id
FROM students s
LEFT JOIN enrollments e ON s.student_id = e.student_id;
```

### RIGHT (OUTER) JOIN

Returns all rows from the right table and matching rows from the left table.

```sql
-- Get all courses and enrolled students (including courses with no students)
SELECT c.course_name, s.first_name, s.last_name
FROM students s
RIGHT JOIN enrollments e ON s.student_id = e.student_id
RIGHT JOIN courses c ON e.course_id = c.course_id;
```

### FULL OUTER JOIN

Returns all rows when there's a match in either table.

```sql
-- MySQL doesn't support FULL OUTER JOIN directly, but you can simulate it:
SELECT s.first_name, s.last_name, e.course_id
FROM students s
LEFT JOIN enrollments e ON s.student_id = e.student_id
UNION
SELECT s.first_name, s.last_name, e.course_id
FROM students s
RIGHT JOIN enrollments e ON s.student_id = e.student_id
WHERE s.student_id IS NULL;
```

### CROSS JOIN

Returns the Cartesian product of both tables.

```sql
-- All possible combinations of students and courses
SELECT s.first_name, c.course_name
FROM students s
CROSS JOIN courses c;
```

## Practical Join Examples

### Example 1: Student Enrollment System

```sql
-- Students and their enrolled courses
SELECT
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    c.course_code,
    c.course_name,
    e.enrollment_date,
    e.grade
FROM students s
INNER JOIN enrollments e ON s.student_id = e.student_id
INNER JOIN courses c ON e.course_id = c.course_id
WHERE e.semester = 'Fall 2025'
ORDER BY s.last_name, s.first_name, c.course_code;
```

### Example 2: E-commerce Orders

```sql
-- Customer orders with order details
SELECT
    o.order_id,
    o.order_date,
    CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
    p.product_name,
    oi.quantity,
    oi.unit_price,
    (oi.quantity * oi.unit_price) AS line_total
FROM orders o
INNER JOIN customers c ON o.customer_id = c.customer_id
INNER JOIN order_items oi ON o.order_id = oi.order_id
INNER JOIN products p ON oi.product_id = p.product_id
WHERE o.order_date BETWEEN '2025-01-01' AND '2025-12-31'
ORDER BY o.order_date DESC, o.order_id;
```

## Self Joins

When a table references data in itself.

```sql
-- Employees and their managers
SELECT
    e.employee_id,
    CONCAT(e.first_name, ' ', e.last_name) AS employee_name,
    e.job_title,
    CONCAT(m.first_name, ' ', m.last_name) AS manager_name,
    m.job_title AS manager_title
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.employee_id
ORDER BY e.department_id, e.last_name;
```

## Handling Many-to-Many Relationships

```sql
-- Students and their courses (using junction table)
SELECT
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    GROUP_CONCAT(c.course_name ORDER BY c.course_name SEPARATOR ', ') AS enrolled_courses
FROM students s
LEFT JOIN enrollments e ON s.student_id = e.student_id
LEFT JOIN courses c ON e.course_id = c.course_id
GROUP BY s.student_id, student_name;
```

## Join Performance Tips

1. **Use INNER JOIN** instead of OUTER JOIN when possible
2. **Filter early** with WHERE before joining large tables
3. **Index join columns** (foreign keys)
4. **Be careful with OR conditions** in JOIN clauses
5. **Avoid SELECT \*** - only select needed columns

[← CRUD Operations](./02_crud_operations.md) | [Next: Advanced Queries →](./04_advanced_queries.md)
