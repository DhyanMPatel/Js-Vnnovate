# 🎯 Advanced Queries

## Subqueries

### In WHERE Clause

```sql
-- Find students with above average GPA
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

-- Using EXISTS
SELECT first_name, last_name
FROM students s
WHERE EXISTS (
    SELECT 1
    FROM enrollments e
    WHERE e.student_id = s.student_id
    AND e.grade = 'A+'
);
```

### In SELECT Clause

```sql
-- Number of courses each student is enrolled in
SELECT
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    (SELECT COUNT(*)
     FROM enrollments e
     WHERE e.student_id = s.student_id) AS course_count
FROM students s
ORDER BY course_count DESC;
```

### In FROM Clause (Derived Tables)

```sql
-- Average GPA by department with department name
SELECT
    d.department_name,
    ROUND(AVG(s.gpa), 2) AS avg_gpa,
    COUNT(s.student_id) AS student_count
FROM (
    SELECT * FROM students
    WHERE gpa IS NOT NULL
) s
JOIN departments d ON s.department_id = d.department_id
GROUP BY d.department_name
HAVING COUNT(s.student_id) > 5
ORDER BY avg_gpa DESC;
```

## Common Table Expressions (CTEs)

### Basic CTE

```sql
WITH top_students AS (
    SELECT student_id, first_name, last_name, gpa
    FROM students
    WHERE gpa >= 3.5
)
SELECT * FROM top_students
ORDER BY gpa DESC
LIMIT 10;
```

### Recursive CTE

```sql
-- Generate a series of dates
WITH RECURSIVE date_series AS (
    SELECT '2025-01-01' AS date
    UNION ALL
    SELECT date + INTERVAL 1 DAY
    FROM date_series
    WHERE date < '2025-01-31'
)
SELECT * FROM date_eries;

-- Organization hierarchy
WITH RECURSIVE org_chart AS (
    -- Base case: top-level employees (no manager)
    SELECT employee_id, first_name, last_name, manager_id, 1 AS level
    FROM employees
    WHERE manager_id IS NULL

    UNION ALL

    -- Recursive case: employees who report to someone in the previous level
    SELECT e.employee_id, e.first_name, e.last_name, e.manager_id, oc.level + 1
    FROM employees e
    JOIN org_chart oc ON e.manager_id = oc.employee_id
)
SELECT
    CONCAT(REPEAT('    ', level - 1), first_name, ' ', last_name) AS employee,
    level
FROM org_chart
ORDER BY level, last_name, first_name;
```

## Window Functions

### ROW_NUMBER, RANK, DENSE_RANK

```sql
-- Rank students within each department by GPA
SELECT
    department_name,
    first_name,
    last_name,
    gpa,
    ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY gpa DESC) AS row_num,
    RANK() OVER (PARTITION BY department_id ORDER BY gpa DESC) AS rank,
    DENSE_RANK() OVER (PARTITION BY department_id ORDER BY gpa DESC) AS dense_rank
FROM students s
JOIN departments d ON s.department_id = d.department_id
WHERE gpa IS NOT NULL;
```

### LAG and LEAD

```sql
-- Compare student's GPA with previous semester
SELECT
    student_id,
    semester,
    gpa,
    LAG(gpa, 1) OVER (PARTITION BY student_id ORDER BY semester) AS prev_gpa,
    gpa - LAG(gpa, 1) OVER (PARTITION BY student_id ORDER BY semester) AS gpa_change
FROM student_grades
ORDER BY student_id, semester;
```

## PIVOT Queries

### Using CASE for Pivoting

```sql
-- Pivot table showing number of students by department and enrollment year
SELECT
    department_name,
    COUNT(CASE WHEN YEAR(enrollment_date) = 2023 THEN 1 END) AS '2023',
    COUNT(CASE WHEN YEAR(enrollment_date) = 2024 THEN 1 END) AS '2024',
    COUNT(CASE WHEN YEAR(enrollment_date) = 2025 THEN 1 END) AS '2025'
FROM students s
JOIN departments d ON s.department_id = d.department_id
GROUP BY department_name
ORDER BY department_name;
```

## Full-Text Search

```sql
-- Enable full-text search on a table
ALTER TABLE articles
ADD FULLTEXT(title, content);

-- Natural language search
SELECT * FROM articles
WHERE MATCH(title, content) AGAINST('database optimization' IN NATURAL LANGUAGE MODE);

-- Boolean mode search
SELECT * FROM articles
WHERE MATCH(title, content)
AGAINST('+MySQL -Oracle' IN BOOLEAN MODE);
```

## JSON Functions (MySQL 5.7+)

```sql
-- Store and query JSON data
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    attributes JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert JSON data
INSERT INTO products (name, attributes)
VALUES (
    'Laptop',
    '{"brand": "Dell", "specs": {"ram": 16, "storage": "512GB SSD", "screen": "15.6\""}, "colors": ["silver", "black"]}'
);

-- Query JSON data
SELECT
    name,
    attributes->'$.brand' AS brand,
    attributes->'$.specs.ram' AS ram_gb,
    JSON_EXTRACT(attributes, '$.specs.storage') AS storage,
    JSON_CONTAINS(attributes->'$.colors', '"black"') AS has_black
FROM products
WHERE attributes->'$.specs.ram' >= 16;
```

[← Joins & Relationships](./03_joins_relationships.md) | [Next: Performance & Optimization →](./05_performance.md)
