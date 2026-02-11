# ⚡ Performance & Optimization

## Indexing Fundamentals

### Creating Indexes

```sql
-- Single column index
CREATE INDEX idx_student_email ON students(email);

-- Composite index (multiple columns)
CREATE INDEX idx_student_name ON students(last_name, first_name);

-- Unique index
CREATE UNIQUE INDEX idx_student_email_unique ON students(email);

-- Full-text index
CREATE FULLTEXT INDEX idx_article_content ON articles(title, content);
```

### When to Use Indexes

- Columns used in WHERE clauses
- Columns used in JOIN conditions
- Columns used in ORDER BY clauses
- Columns with high cardinality (many unique values)

### When NOT to Use Indexes

- Small tables (< 100 rows)
- Columns with low cardinality (gender, boolean)
- Columns frequently updated
- Tables with heavy INSERT/DELETE operations

## Query Optimization

### EXPLAIN Your Queries

```sql
-- Basic explain
EXPLAIN SELECT * FROM students WHERE email = 'john@example.com';

-- Extended explain (MySQL 8.0+)
EXPLAIN FORMAT=JSON
SELECT s.first_name, s.last_name, COUNT(*)
FROM students s
JOIN enrollments e ON s.student_id = e.student_id
WHERE s.gpa > 3.5
GROUP BY s.student_id;
```

### Reading EXPLAIN Output

- **type**: ALL (bad), index, range, ref, eq_ref, const (good)
- **key**: Which index is being used
- **rows**: Estimated rows to examine (lower is better)
- **Extra**: Using filesort, Using temporary (bad)

### Query Optimization Tips

```sql
-- BAD: Using function on indexed column
SELECT * FROM students WHERE YEAR(enrollment_date) = 2025;

-- GOOD: Using range on indexed column
SELECT * FROM students
WHERE enrollment_date >= '2025-01-01'
AND enrollment_date < '2026-01-01';

-- BAD: Leading wildcard in LIKE
SELECT * FROM students WHERE email LIKE '%@gmail.com';

-- GOOD: Trailing wildcard
SELECT * FROM students WHERE email LIKE 'john%@gmail.com';

-- BAD: OR conditions on different columns
SELECT * FROM students WHERE email = 'a@example.com' OR phone = '555-1234';

-- GOOD: Use UNION ALL or separate queries
SELECT * FROM students WHERE email = 'a@example.com'
UNION ALL
SELECT * FROM students WHERE phone = '555-1234';
```

## Database Design Optimization

### Normalization vs Denormalization

```sql
-- Normalized (better for writes, less redundancy)
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE user_addresses (
    address_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    street VARCHAR(200),
    city VARCHAR(100),
    country VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Denormalized (better for reads, faster queries)
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    street VARCHAR(200),
    city VARCHAR(100),
    country VARCHAR(100)
);
```

### Partitioning

```sql
-- Range partitioning by date
CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    order_date DATE,
    total_amount DECIMAL(10,2)
)
PARTITION BY RANGE (YEAR(order_date)) (
    PARTITION p2023 VALUES LESS THAN (2024),
    PARTITION p2024 VALUES LESS THAN (2025),
    PARTITION p2025 VALUES LESS THAN (2026),
    PARTITION pmax VALUES LESS THAN MAXVALUE
);
```

## Connection and Resource Management

### Connection Pooling

```javascript
// Node.js example with mysql2
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "password",
  database: "school_db",
  acquireTimeout: 60000,
  timeout: 60000,
});

// Use the pool
async function getStudents() {
  const [rows] = await pool.query("SELECT * FROM students LIMIT 100");
  return rows;
}
```

### Query Caching

```sql
-- Enable query cache (in my.cnf/my.ini)
query_cache_type = 1
query_cache_size = 64M

-- Check cache status
SHOW VARIABLES LIKE 'query_cache%';
SHOW STATUS LIKE 'Qcache%';
```

## Monitoring and Maintenance

### Slow Query Log

```sql
-- Enable slow query log (in my.cnf/my.ini)
slow_query_log = 1
slow_query_log_file = /var/log/mysql/mysql-slow.log
long_query_time = 2

-- View slow queries
SELECT * FROM mysql.slow_log ORDER BY start_time DESC LIMIT 10;
```

### Performance Schema

```sql
-- Enable performance schema (in my.cnf/my.ini)
performance_schema = ON

-- Monitor resource usage
SELECT * FROM performance_schema.events_statements_summary_by_digest
ORDER BY SUM_TIMER_WAIT DESC LIMIT 10;
```

### Regular Maintenance

```sql
-- Analyze tables (update statistics)
ANALYZE TABLE students;

-- Optimize tables (defragment)
OPTIMIZE TABLE students;

-- Check table health
CHECK TABLE students;

-- Repair table (if corrupted)
REPAIR TABLE students;
```

## Best Practices Summary

1. **Index Wisely**: Only index what you need, monitor index usage
2. **Avoid SELECT \***: Only select columns you need
3. **Use LIMIT**: Always limit result sets when possible
4. **Batch Operations**: Use bulk inserts instead of individual inserts
5. **Monitor Regularly**: Check slow queries and performance metrics
6. **Backup Before Changes**: Always backup before major optimizations
7. **Test in Staging**: Never optimize directly on production

[← Advanced Queries](./04_advanced_queries.md) | [Next: Practical Examples →](./06_practical_examples.md)
