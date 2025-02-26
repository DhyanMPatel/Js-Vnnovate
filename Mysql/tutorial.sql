USE sql_store;

-- SELECT Statement
SELECT *
FROM customers
-- WHERE customer_id = 1
ORDER BY first_name;

-- SELECT Clause - use for display that perticular columns
SELECT 
	last_name, 
    first_name, 
    points, 
    points+10 AS ten_add,
    points*10+100 AS 'mul 10 then add 100', 
    points + 10 * 100,  -- Here first: 10*100, second: points+1000
    (points + 10 ) * 100
FROM customers;

SELECT DISTINCT state	-- Helps to display distinct state, not dublicate.
FROM customers;

-- Exercise
	-- Return all the Products
	-- name
	-- unit price
	-- new price (unit price * 1.1)
SELECT 
	name,
    unit_price as "unit price",
    unit_price * 1.1 AS "new price"
FROM products;


-- WHERE Clause - use for filter data
	-- >, >=, <, <=, =, != (not equal), <> (not equal)
SELECT * 
FROM Customers
-- WHERE points > 3000;
WHERE birth_date > '1990-01-01';

-- Exercise
	-- Get the orders placed this year
SELECT *
FROM Orders
WHERE order_date >= "2017-01-01" and order_date <= "2017-12-31";


-- The AND, OR and NOT Operators
	-- AND: Should all condition true
    -- OR: One of the Condition Should be true
    -- NOT: condition matching data will not display

-- AND always evaluated first from OR.
SELECT * 
FROM Customers;
-- WHERE birth_date > '1990-01-01' OR (points > 1000 AND state = "VA");

-- WHERE NOT (birth_date > '1990-01-01' OR points > 1000)
	-- SAME AS
-- WHERE birth_date <= "1990-01-01" AND point <=1000

-- Exercise
	-- from the order_items table, get the items
		-- for order #6
		-- where the total price is greater than 30
SELECT * 
FROM Order_items 
WHERE order_id = 6 AND (quantity * unit_price) > 30;


-- The IN Operator
	-- IN: is shorter of OR Operator.
SELECT *
FROM Customers
-- WHERE state IN ('VA', 'fl', 'GA');
WHERE state NOT IN ('va','FL', 'GA');	-- Totaly Oposite of above

-- Exercise
	-- Return Products with 
		-- quantity in stock equal to 49, 38, 72.
SELECT * 
FROM Products
WHERE quantity_in_stock IN (49, "38", 72);


-- the BETWEEN Operator
	-- BETWEEN: use to display products in range.
SELECT *
FROM Customers
-- WHERE points >= 1000 AND points <=3000;
	-- Same as
WHERE points BETWEEN 1000 AND 3000;

-- Exercise
	-- Return customers born
		-- between 1/1/1990 and 1/1/2000
SELECT *
FROM Customers
WHERE birth_date BETWEEN "1990-01-01" and '2000-01-01';


-- The LIKE Operator
	-- %: Represent multiple char
    -- _: Represent single char

SELECT *
FROM customers
-- WHERE last_name LIKE 'b%';
-- WHERE last_name LIKE '%y';
-- WHERE last_name LIKE '%b%';

-- WHERE Last_name LIKE 'b_____';
-- WHERE birth_date LIKE '1986%';		-- Also posible

WHERE last_name NOT LIKE 'b_____';		-- Opposite of like 113

-- Exercises
	-- get the customers whose
		-- 1) addresses cuontain TRAIL or AVENUE
        -- 2) phone numbers end with 9
SELECT * 
FROM Customers
WHERE address LIKE '%TRAIL%' OR address LIKE '%AVENUE%';
-- WHERE phone like "%9";


-- The REGEXP Operator
	-- Allow us more complete search
    -- ^: Represent beginning
    -- $: Represent end
    -- |: Represent logical or
    -- []: use as set or range in regexp.
SELECT *
FROM Customers
-- WHERE last_name REGEXP 'field';
WHERE last_name REGEXP 'field|mac';

-- Exercises
	-- Get the customers whose
		-- 1) first names are ELKA or AMBUR
        -- 2) last names end with EY or ON
        -- 3) last names start with MY or contains SE
        -- 4) last names contain B followed by R or U
SELECT *
FROM Customers
-- WHERE first_name REGEXP 'ELKA|AMBUR';
-- WHERE last_name REGEXP 'EY$|ON$';
-- WHERE last_name REGEXP '^MY|SE';
WHERE last_name REGEXP 'b[ru]';


-- The IS NULL Operator
	-- find out Records with missing values
SELECT *
FROM Customers
WHERE phone IS NULL; 

-- Exercise
	-- Get the orders that are not shipped
SELECT * 
FROM orders 
WHERE shipped_date IS NULL;


-- The ORDER BY Operator
	-- Orders are 2 types ASCE(default) and DESC.
SELECT *
FROM Customers
-- ORDER BY first_name;
ORDER BY state, first_name;		-- order by first state, in same state order by first_name.

-- Exercise
	-- get order_id is 2 Products and short by total value in DESC
SELECT *, (quantity * unit_price) AS total_price
FROM order_items
WHERE order_id = 2
ORDER BY (quantity * unit_price) DESC;


-- The LIMIT Operator
	-- use to limit the number of record return with querys
SELECT *
FROM customers
LIMIT 3;
-- LIMIT 6, 3;		-- First 6 rows shoud skip then pick 3 rows.

-- Exercise
	-- Get the top three loyal Customers (that have hightest points)
SELECT *
FROM Customers
ORDER BY points DESC
LIMIT 3;


-- Inner Joins
	-- When we use Alias then use them every where, not use original name (it give error).
SELECT Order_id, o.Customer_id, First_name, Last_name
FROM Orders o
JOIN Customers c
	on o.customer_id = c.customer_id;

-- Exercise
	-- join order_item table with Products table and display order_items table and name from Product table
    
SELECT oi.*, p.name
FROM Order_items oi
JOIN Products p
	ON oi.product_id = p.product_id;
    
-- Joining Across Databases
	-- use to join multiple dbs
    -- There is Noticable thing is we use sql_store DB and join sql_inventory.
    
SELECT *
FROM order_items oi
JOIN sql_inventory.products p
	ON oi.product_id = p.product_id;
   
   
-- Self Joins
	-- Same table should have alias different to implement self join.
USE sql_hr;

SELECT e.employee_id, e.first_name, m.first_name as HR
FROM employees as e
JOIN employees as m
	ON e.reports_to = m.employee_id;
    

-- Joining Multiple Tables

USE sql_store;

SELECT 
	o.order_id, 
    o.order_date, 
    c.first_name, 
    c.last_name, 
    os.name AS status
FROM orders o
JOIN customers c
	ON o.customer_id = c.customer_id
JOIN order_statuses os
	ON o.status = os.order_status_id;
    
-- Exercise
	-- Use sql_invoicing DB. Connect Payments, clients and payment_methods. Display client (name), payment_methods (name) and Payments (amount)
    
USE sql_invoicing;

SELECT 
	p.date, 
	p.invoice_id, 
    p.amount, 
    c.name, 
    pm.name
FROM payments p
JOIN payment_methods pm
	ON p.payment_method = pm.payment_method_id
JOIN clients c
	ON p.client_id = c.client_id;
    

-- Compound Join Conditions
	-- Use multiple condition on join.

USE sql_store;

SELECT *
FROM order_items oi
JOIN order_item_notes as oin
	ON oi.order_id = oin.order_id
    AND oi.product_id = oin.product_id;


-- Implicit JOIN Syntax
	-- This is another Syntax that same as simple join (Explicit JOIN Syntax).
    -- This will acouse mistake if we forgot to write where.
SELECT *
FROM orders o, customers c
WHERE o.customer_id = c.customer_id;


-- Outer JOINs
	-- Inner join connect both table where not display whole first|second table. 
    -- What if we want all rows from first table, use Outer JOINs
    -- In Outer join have 2 type, 
		-- left join (display first table)
        -- right join (display second table)	
    
SELECT 
	c.customer_id,
    c.first_name,
    o.order_id
FROM customers c
LEFT JOIN orders o
	ON c.customer_id = o.customer_id
ORDER BY c.customer_id;

-- Exercise
	-- Use products, order_items table
    -- Here product 7 never been order so its order quantity will be null.
    
SELECT p.product_id, p.name, oi.quantity
FROM  products p
LEFT JOIN order_items oi
	ON p.product_id = oi.product_id
ORDER BY p.product_id;

-- Outer Jions Between Multiple Tables

SELECT 
	c.customer_id, 
	c.first_name, 
    o.order_id, 
	sh.name AS Shipper
FROM customers c
LEFT JOIN orders o
	ON c.customer_id = o.customer_id
LEFT JOIN shippers sh
	ON o.shipper_id = sh.shipper_id
ORDER BY c.customer_id;

-- Exercise
	-- Join Orders, Customers, Shippers and Order_statuses tables
    

SELECT 
	o.order_date, 
    o.order_id, 
    c.first_name, 
    sh.name AS shipper, 
    os.name AS status
FROM orders o
LEFT JOIN customers c
	ON o.customer_id = c.customer_id
LEFT JOIN shippers sh
	ON o.shipper_id = sh.shipper_id
LEFT JOIN order_statuses os
	ON o.status = os.order_status_id
ORDER BY os.order_status_id;


-- Self Outer JOINs
	-- Using outer join we can print Manager name also.
SELECT 
	e.employee_id,
    e.first_name,
    m.first_name AS manager
FROM employees e
LEFT JOIN employees m
	ON e.reports_to = m.employee_id;
    
-- The Clause
	-- When column name is same in both table then use Clause, make more shorter.
    -- USING only work when columns name is same in both table.

USE sql_store;
SELECT 
	o.order_id,
    c.first_name,
    sh.name AS Shipper
FROM orders o
JOIN customers c
	-- ON o.customer_id = c.customer_id
	USING (customer_id)
LEFT JOIN shippers sh
	USING (shipper_id);
    
-- If there are multiple primary key like order_item_notes.

SELECT *
FROM order_items oi
JOIN order_item_notes oin
	-- USING (order_id, product_id)
	ON oi.product_id = oin.product_id
    AND oi.order_id = oin.order_id;
    
-- Exercise
	-- connect clients, payments and payment_methods table from sql_invoicing table
USE sql_invoicing;
SELECT 
	p.date,
    c.name client,
    p.amount,
    pm.name payment_method
FROM payments p
JOIN clients c
	USING (client_id)
JOIN payment_methods pm
	ON p.payment_method = pm.payment_method_id; -- USING will not work
    
-- Natural JOINs
	-- Table join based in same name column from both tables.

select 
	o.order_id,
    c.first_name
from orders o
natural join customers c;

-- Cross JOIN
	-- join every record from first table with every record from second table.
USE sql_store;
SELECT 
	c.first_name AS Customer,
    p.name AS product
FROM customers c
-- FROM customers c, orders o 		-- Implicite join
CROSS JOIN products p		-- Explicite Join
ORDER BY c.first_name;

-- Exercise
	-- Do a cross join between shippers and products
		-- using implicit syntax
        -- using explicit syntax
        
SELECT 
	sh.name AS shipper,
    p.name AS product
FROM products p, shippers sh;

SELECT 
	sh.name AS shipper,
    p.name AS product
FROM products p
CROSS JOIN shippers sh;


-- Union
	-- We can combine records from multiple result sets
    -- Note: there should be same select colums numbers, otherwise give error.
    -- Note: there column name will be based on first query.
SELECT
	order_id,
    order_date,
    'Active' AS status
FROM  orders
WHERE order_date >= '2019-01-01'
UNION
SELECT
	order_id,
    order_date,
    'Archived' AS status
FROM orders
WHERE order_date < '2019-01-01';

-- Exercise
	-- Give customers types like Bronze, Silver, Gold based on points

SELECT 
	customer_id,
    first_name,
    points,
    'Bronze' AS Type
FROM customers
WHERE points < 2000
UNION
SELECT 
	customer_id,
    first_name,
    points,
    'Silver' AS Type
FROM customers
WHERE points BETWEEN 2000 AND 3000
UNION
SELECT 
	customer_id,
    first_name,
    points,
    'Gold' AS Type
FROM customers
WHERE points >= 3000
ORDER BY first_name;


-- Column Attributes
-- Insert a Single Row

INSERT INTO customers
VALUES (DEFAULT, 'John', 'Smith', '1990-01-01',DEFAULT, 'address', 'city', 'CA', DEFAULT);
	-- OR
INSERT INTO customers (first_name, last_name, birth_date, address, city, state)
VALUES ('John', 'Smith', '1990-01-01', 'address', 'city', 'CA');

-- Insert Multiple Rows

INSERT INTO shippers (name)
VALUES ('Shipper 1'),
		('Shipper 2'),
		('Shipper 2');
	
-- Exercise
	-- Insert three rows in the products table
INSERT INTO products (name, quantity_in_stock, unit_price)
VALUES ('product 1', 95, 4.15),
		('product 2', 90, 2.05),
        ('product 3', 105, 13.20);


-- Inserting Hierarchical Rows
	-- Here we insert data in multiple tables
    -- assume Orders table is parent and order_items table is chail
INSERT INTO orders(customer_id, order_date, status)
VALUES (1, '2019-01-02', 1);

select Last_insert_id(); 	-- Return last insert operation table

INSERT INTO order_items
VALUES 
	(last_insert_id(), 1,2,3.14),
    (LAST_INSERT_ID(), 2, 4, 5.14);
    
-- Create a Copy of Table
	-- This methods will not make PK in new table
CREATE TABLE order_archived AS
SELECT * FROM orders;
	-- OR 
INSERT INTO order_archived
SELECT *
FROM orders
WHERE order_date < '2019-01-01';

-- Exercise
	-- In invoice table inside sql_invoicing DB there is client_id.
    -- Make new table invoice_Archive that replace client_id with client_name.
USE sql_invoicing;

CREATE TABLE invoice_archived AS
SELECT 
	i.invoice_id,
    i.number,
    c.name AS client,
    i.invoice_total,
    i.payment_total,
    i.invoice_date,
    i.payment_date,
    i.due_date
FROM invoices i
JOIN clients c
	USING(client_id)
WHERE payment_date IS NOT NULL;


-- Update single row

UPDATE invoices
SET payment_total = invoice_total * 0.5, payment_date = '1990-04-02'
WHERE invoice_id = 5;

-- Update Multiple Rows
	-- Condition will make changes in updating multiple rows or updating single row.
    
UPDATE invoices
SET payment_total = invoice_total * 0.5, payment_date = "2025-03-25"
Where client_id = 2;

-- Exercise
	-- give any customers born before 1990
    -- 50 extra points
USE sql_store;
UPDATE customers
SET points = points+50
WHERE birth_date < '1990-01-01';


-- UPDATE Using Subquery
USE sql_invoicing;
UPDATE invoices
SET 
	payment_total = invoice_total * 0.5,
    payment_date = due_date
WHERE client_id = 
			(SELECT client_id
			FROM clients 
			WHERE name = 'Myworks');
            
-- Exercise
	-- 
USE sql_store;

UPDATE orders
SET comments = 'Gold Customers'
WHERE customer_id IN

(SELECT customer_id
FROM customers
WHERE points > 3000);

-- DELETE data
DELETE FROM invoices;

DELETE FROM invoices
WHERE client_id =
			(SELECT client_id
			FROM clients
			WHERE name = 'Myworks');