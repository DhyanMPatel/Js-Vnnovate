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
