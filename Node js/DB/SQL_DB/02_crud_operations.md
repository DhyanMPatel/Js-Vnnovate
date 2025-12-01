# 📝 CRUD Operations

## 1. Create (INSERT)

### Inserting Single Row

```sql
-- Basic insert with all columns
INSERT INTO students (first_name, last_name, email, gpa)
VALUES ('John', 'Doe', 'john@example.com', 3.7);

-- Insert with DEFAULT values
INSERT INTO students (first_name, last_name, email)
VALUES ('Jane', 'Smith', 'jane@example.com');
-- enrollment_date will use DEFAULT (CURRENT_DATE)
-- gpa will be NULL if no DEFAULT is set
```

### Inserting Multiple Rows

```sql
-- Multiple rows in one statement
INSERT INTO students (first_name, last_name, email, gpa) VALUES
    ('Alice', 'Johnson', 'alice@example.com', 3.9),
    ('Bob', 'Williams', 'bob@example.com', 3.5),
    ('Charlie', 'Brown', 'charlie@example.com', 3.2);
```

### Insert from Another Table

```sql
-- Copy students with GPA > 3.5 to honors_students
INSERT INTO honors_students (student_id, name, gpa)
SELECT student_id, CONCAT(first_name, ' ', last_name), gpa
FROM students
WHERE gpa > 3.5;
```

## 2. Read (SELECT)

### Basic Selection

```sql
-- Select all columns
SELECT * FROM students;

-- Select specific columns
SELECT first_name, last_name, gpa FROM students;

-- Using column aliases
SELECT
    first_name AS "First Name",
    last_name AS "Last Name",
    gpa AS "Grade Point Average"
FROM students;
```

### Filtering Data

```sql
-- Basic WHERE clause
SELECT * FROM students WHERE gpa >= 3.5;

-- Multiple conditions with AND/OR
SELECT * FROM students
WHERE gpa >= 3.5 AND last_name LIKE 'S%';

-- Using IN for multiple possible values
SELECT * FROM students
WHERE last_name IN ('Smith', 'Johnson', 'Williams');

-- Pattern matching with LIKE
SELECT * FROM students
WHERE email LIKE '%@gmail.com';

-- Date filtering
SELECT * FROM students
WHERE enrollment_date >= '2025-01-01';
```

### Sorting and Limiting

```sql
-- Sort by one column
SELECT * FROM students ORDER BY gpa DESC;

-- Sort by multiple columns
SELECT * FROM students
ORDER BY last_name ASC, first_name ASC;

-- Limit results
SELECT * FROM students LIMIT 10;

-- Pagination (LIMIT offset, count)
SELECT * FROM students LIMIT 10 OFFSET 20;  -- Gets rows 21-30
-- Or shorter syntax:
SELECT * FROM students LIMIT 20, 10;
```

## 3. Update (UPDATE)

### Updating Single Record

```sql
-- Update email for a specific student
UPDATE students
SET email = 'john.doe@school.com'
WHERE student_id = 1;
```

### Updating Multiple Records

```sql
-- Give all students with GPA < 2.0 a warning status
UPDATE students
SET status = 'ACADEMIC_WARNING'
WHERE gpa < 2.0;

-- Increment GPA for all students
UPDATE students
SET gpa = LEAST(gpa + 0.1, 4.0);  -- Won't exceed 4.0
```

### Update with JOIN

```sql
-- Update based on another table
UPDATE students s
JOIN scholarships sc ON s.student_id = sc.student_id
SET s.gpa = s.gpa + 0.1
WHERE sc.scholarship_type = 'ACADEMIC';
```

## 4. Delete (DELETE)

### Deleting Specific Records

```sql
-- Delete a single student
DELETE FROM students
WHERE student_id = 42;

-- Delete with conditions
DELETE FROM students
WHERE gpa < 1.0 AND enrollment_date < '2024-01-01';
```

### Truncate vs Delete

```sql
-- DELETE (slower, can be rolled back, logs individual row deletions)
DELETE FROM students;

-- TRUNCATE (faster, can't be rolled back, resets auto-increment)
TRUNCATE TABLE students;
```

## 5. Transactions

```sql
-- Start a transaction
START TRANSACTION;

-- Execute multiple statements
UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
UPDATE accounts SET balance = balance + 100 WHERE account_id = 2;

-- If everything is fine
COMMIT;

-- If something went wrong
-- ROLLBACK;
```

[← Back to Basics](./01_basics.md) | [Next: Joins & Relationships →](./03_joins_relationships.md)
