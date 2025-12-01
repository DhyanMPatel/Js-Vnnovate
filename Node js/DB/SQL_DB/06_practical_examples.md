# 🏆 Practical Examples

## Example 1: Complete Student Management System

### Database Schema

```sql
-- Departments
CREATE TABLE departments (
    department_id INT PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(100) NOT NULL UNIQUE,
    head_professor VARCHAR(100),
    building VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Students
CREATE TABLE students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    department_id INT,
    enrollment_date DATE DEFAULT (CURRENT_DATE),
    gpa DECIMAL(3,2) CHECK (gpa BETWEEN 0 AND 4.0),
    status ENUM('active', 'inactive', 'graduated') DEFAULT 'active',
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

-- Courses
CREATE TABLE courses (
    course_id INT PRIMARY KEY AUTO_INCREMENT,
    course_code VARCHAR(10) UNIQUE NOT NULL,
    course_name VARCHAR(100) NOT NULL,
    department_id INT,
    credits INT DEFAULT 3,
    description TEXT,
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

-- Enrollments (Junction Table)
CREATE TABLE enrollments (
    enrollment_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    course_id INT,
    semester VARCHAR(20) NOT NULL,
    year INT NOT NULL,
    enrollment_date DATE DEFAULT (CURRENT_DATE),
    grade CHAR(2),
    attendance_rate DECIMAL(5,2) DEFAULT 100.0,
    UNIQUE (student_id, course_id, semester, year),
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

-- Professors
CREATE TABLE professors (
    professor_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    department_id INT,
    hire_date DATE DEFAULT (CURRENT_DATE),
    title VARCHAR(50),
    salary DECIMAL(10,2),
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

-- Course Assignments
CREATE TABLE course_assignments (
    assignment_id INT PRIMARY KEY AUTO_INCREMENT,
    course_id INT,
    professor_id INT,
    semester VARCHAR(20) NOT NULL,
    year INT NOT NULL,
    UNIQUE (course_id, professor_id, semester, year),
    FOREIGN KEY (course_id) REFERENCES courses(course_id),
    FOREIGN KEY (professor_id) REFERENCES professors(professor_id)
);
```

### Sample Data

```sql
-- Insert departments
INSERT INTO departments (department_name, head_professor, building) VALUES
('Computer Science', 'Dr. Sarah Johnson', 'Tech Building'),
('Mathematics', 'Dr. Michael Chen', 'Science Hall'),
('Business', 'Dr. Lisa Anderson', 'Business Center'),
('Engineering', 'Dr. Robert Taylor', 'Engineering Lab');

-- Insert students
INSERT INTO students (first_name, last_name, email, department_id, gpa) VALUES
('John', 'Smith', 'john.smith@email.com', 1, 3.7),
('Emma', 'Johnson', 'emma.johnson@email.com', 1, 3.9),
('Michael', 'Williams', 'michael.williams@email.com', 2, 3.5),
('Sarah', 'Brown', 'sarah.brown@email.com', 3, 3.8),
('David', 'Davis', 'david.davis@email.com', 4, 3.6);

-- Insert courses
INSERT INTO courses (course_code, course_name, department_id, credits, description) VALUES
('CS101', 'Introduction to Programming', 1, 3, 'Basic programming concepts'),
('CS201', 'Data Structures', 1, 4, 'Advanced data structures and algorithms'),
('MATH101', 'Calculus I', 2, 4, 'Fundamental calculus concepts'),
('BUS101', 'Business Ethics', 3, 3, 'Ethical practices in business'),
('ENG101', 'Engineering Fundamentals', 4, 3, 'Introduction to engineering');
```

### Complex Queries

```sql
-- 1. Student GPA Report by Department
SELECT
    d.department_name,
    COUNT(s.student_id) AS total_students,
    ROUND(AVG(s.gpa), 2) AS avg_gpa,
    MIN(s.gpa) AS min_gpa,
    MAX(s.gpa) AS max_gpa,
    COUNT(CASE WHEN s.gpa >= 3.5 THEN 1 END) AS honor_students
FROM departments d
LEFT JOIN students s ON d.department_id = s.department_id
WHERE s.status = 'active'
GROUP BY d.department_id, d.department_name
ORDER BY avg_gpa DESC;

-- 2. Course Enrollment Statistics
SELECT
    c.course_code,
    c.course_name,
    d.department_name,
    COUNT(e.student_id) AS enrolled_students,
    AVG(e.attendance_rate) AS avg_attendance,
    COUNT(CASE WHEN e.grade IN ('A', 'A+', 'A-') THEN 1 END) AS top_grades,
    COUNT(CASE WHEN e.grade IN ('F', 'D') THEN 1 END) AS failing_grades
FROM courses c
LEFT JOIN departments d ON c.department_id = d.department_id
LEFT JOIN enrollments e ON c.course_id = e.course_id
WHERE e.semester = 'Fall' AND e.year = 2025
GROUP BY c.course_id, c.course_code, c.course_name, d.department_name
ORDER BY enrolled_students DESC;

-- 3. Student Academic Progress
WITH student_enrollments AS (
    SELECT
        s.student_id,
        s.first_name,
        s.last_name,
        COUNT(e.course_id) AS courses_taken,
        AVG(CASE
            WHEN e.grade = 'A+' THEN 4.0
            WHEN e.grade = 'A' THEN 4.0
            WHEN e.grade = 'A-' THEN 3.7
            WHEN e.grade = 'B+' THEN 3.3
            WHEN e.grade = 'B' THEN 3.0
            WHEN e.grade = 'B-' THEN 2.7
            WHEN e.grade = 'C+' THEN 2.3
            WHEN e.grade = 'C' THEN 2.0
            WHEN e.grade = 'C-' THEN 1.7
            WHEN e.grade = 'D' THEN 1.0
            WHEN e.grade = 'F' THEN 0.0
        END) AS semester_gpa
    FROM students s
    LEFT JOIN enrollments e ON s.student_id = e.student_id
    WHERE e.grade IS NOT NULL
    GROUP BY s.student_id, s.first_name, s.last_name
)
SELECT
    first_name,
    last_name,
    courses_taken,
    ROUND(semester_gpa, 2) AS semester_gpa,
    CASE
        WHEN semester_gpa >= 3.5 THEN 'Dean\'s List'
        WHEN semester_gpa >= 3.0 THEN 'Good Standing'
        WHEN semester_gpa >= 2.0 THEN 'Academic Warning'
        ELSE 'Academic Probation'
    END AS academic_status
FROM student_enrollments
WHERE courses_taken > 0
ORDER BY semester_gpa DESC;

-- 4. Professor Teaching Load
SELECT
    p.first_name,
    p.last_name,
    d.department_name,
    COUNT(ca.course_id) AS courses_teaching,
    SUM(c.credits) AS total_credits,
    COUNT(DISTINCT e.student_id) AS total_students
FROM professors p
LEFT JOIN departments d ON p.department_id = d.department_id
LEFT JOIN course_assignments ca ON p.professor_id = ca.professor_id
LEFT JOIN courses c ON ca.course_id = c.course_id
LEFT JOIN enrollments e ON c.course_id = e.course_id
WHERE ca.semester = 'Fall' AND ca.year = 2025
GROUP BY p.professor_id, p.first_name, p.last_name, d.department_name
ORDER BY total_credits DESC;
```

## Example 2: E-commerce Database

### Schema

```sql
-- Customers
CREATE TABLE customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(50),
    state VARCHAR(50),
    zip_code VARCHAR(10),
    registration_date DATE DEFAULT (CURRENT_DATE),
    customer_type ENUM('regular', 'premium', 'vip') DEFAULT 'regular'
);

-- Products
CREATE TABLE products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    category VARCHAR(50),
    price DECIMAL(10,2) NOT NULL,
    cost_price DECIMAL(10,2),
    stock_quantity INT DEFAULT 0,
    min_stock_level INT DEFAULT 5,
    weight DECIMAL(5,2),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders
CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    subtotal DECIMAL(10,2) NOT NULL,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    shipping_amount DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(50),
    tracking_number VARCHAR(50),
    shipping_address TEXT,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- Order Items
CREATE TABLE order_items (
    order_item_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);
```

### Business Queries

```sql
-- 1. Monthly Sales Report
SELECT
    DATE_FORMAT(order_date, '%Y-%m') AS month,
    COUNT(DISTINCT order_id) AS total_orders,
    COUNT(DISTINCT customer_id) AS unique_customers,
    SUM(total_amount) AS total_sales,
    AVG(total_amount) AS avg_order_value,
    SUM(quantity) AS total_items_sold
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
WHERE o.status != 'cancelled'
GROUP BY DATE_FORMAT(order_date, '%Y-%m')
ORDER BY month DESC;

-- 2. Top Selling Products
SELECT
    p.product_id,
    p.name,
    p.category,
    SUM(oi.quantity) AS total_sold,
    SUM(oi.total_price) AS total_revenue,
    COUNT(DISTINCT oi.order_id) AS order_count,
    AVG(oi.unit_price) AS avg_price
FROM products p
JOIN order_items oi ON p.product_id = oi.product_id
JOIN orders o ON oi.order_id = o.order_id
WHERE o.status != 'cancelled'
GROUP BY p.product_id, p.name, p.category
ORDER BY total_revenue DESC
LIMIT 20;

-- 3. Customer Lifetime Value
WITH customer_purchases AS (
    SELECT
        c.customer_id,
        CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
        c.customer_type,
        COUNT(DISTINCT o.order_id) AS order_count,
        SUM(o.total_amount) AS total_spent,
        AVG(o.total_amount) AS avg_order_value,
        MIN(o.order_date) AS first_purchase,
        MAX(o.order_date) AS last_purchase,
        DATEDIFF(MAX(o.order_date), MIN(o.order_date)) AS customer_lifetime_days
    FROM customers c
    LEFT JOIN orders o ON c.customer_id = o.customer_id
    WHERE o.status != 'cancelled'
    GROUP BY c.customer_id, c.customer_name, c.customer_type
)
SELECT
    customer_name,
    customer_type,
    order_count,
    ROUND(total_spent, 2) AS total_spent,
    ROUND(avg_order_value, 2) AS avg_order_value,
    customer_lifetime_days,
    CASE
        WHEN total_spent >= 1000 THEN 'High Value'
        WHEN total_spent >= 500 THEN 'Medium Value'
        ELSE 'Low Value'
    END AS value_segment
FROM customer_purchases
ORDER BY total_spent DESC;

-- 4. Inventory Analysis
SELECT
    p.product_id,
    p.name,
    p.category,
    p.stock_quantity,
    p.min_stock_level,
    CASE
        WHEN p.stock_quantity <= p.min_stock_level THEN 'Low Stock'
        WHEN p.stock_quantity <= p.min_stock_level * 2 THEN 'Medium Stock'
        ELSE 'Good Stock'
    END AS stock_status,
    COALESCE(sales.last_30_days, 0) AS sold_last_30_days,
    CASE
        WHEN p.stock_quantity = 0 AND COALESCE(sales.last_30_days, 0) > 0 THEN 'Urgent Reorder'
        WHEN p.stock_quantity <= p.min_stock_level AND COALESCE(sales.last_30_days, 0) > 0 THEN 'Reorder Needed'
        ELSE 'OK'
    END AS reorder_status
FROM products p
LEFT JOIN (
    SELECT
        product_id,
        SUM(quantity) AS last_30_days
    FROM order_items oi
    JOIN orders o ON oi.order_id = o.order_id
    WHERE o.order_date >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)
    AND o.status != 'cancelled'
    GROUP BY product_id
) sales ON p.product_id = sales.product_id
WHERE p.is_active = TRUE
ORDER BY p.stock_quantity ASC;
```

## Example 3: Blog/Content Management System

```sql
-- Users and Posts Schema
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    bio TEXT,
    avatar_url VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
    post_id INT PRIMARY KEY AUTO_INCREMENT,
    author_id INT,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    published_at TIMESTAMP NULL,
    view_count INT DEFAULT 0,
    like_count INT DEFAULT 0,
    comment_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(user_id)
);

CREATE TABLE tags (
    tag_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) UNIQUE NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE post_tags (
    post_id INT,
    tag_id INT,
    PRIMARY KEY (post_id, tag_id),
    FOREIGN KEY (post_id) REFERENCES posts(post_id),
    FOREIGN KEY (tag_id) REFERENCES tags(tag_id)
);

-- Popular Posts Query
SELECT
    p.post_id,
    p.title,
    p.slug,
    CONCAT(u.first_name, ' ', u.last_name) AS author_name,
    u.username,
    p.published_at,
    p.view_count,
    p.like_count,
    p.comment_count,
    GROUP_CONCAT(t.name ORDER BY t.name SEPARATOR ', ') AS tags
FROM posts p
JOIN users u ON p.author_id = u.user_id
LEFT JOIN post_tags pt ON p.post_id = pt.post_id
LEFT JOIN tags t ON pt.tag_id = t.tag_id
WHERE p.status = 'published'
AND p.published_at >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)
GROUP BY p.post_id, p.title, p.slug, author_name, u.username, p.published_at, p.view_count, p.like_count, p.comment_count
ORDER BY (p.view_count * 0.3 + p.like_count * 0.4 + p.comment_count * 0.3) DESC
LIMIT 10;
```

[← Performance & Optimization](./05_performance.md) | [Back to Main Index](./intro.md)
