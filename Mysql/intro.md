# MySQL

- MySQL is open-source Relational Database Management System <strong>(`RDBMS`)</strong>.
- MySQL is ideal for both small and large application.
- Mysql is fast, reliable, scalable and easy to use.
- Mysql was first Released in `1995`.
- Users of MySQL: `Facebook`, `Twitter`, `Airbnb`, `Uber`, `Github`, `Youtube`, etc and Content Management Systems like `WordPress`.

## what is RDBMS?

- RDBMS stands for Relational Database Management System.
- RDBMS is a program use to maintain `Relational Database`.

## What is Relational Database?

- A relational database defines database relationships in the form of table. The tables are related to each other - based on data common to each.

## What is SQL.

- SQL is the standard language for dealing with `Relational Databases`.
- SQL is used to `insert`, `update`, `delete` and `search` database records.
- ### `Note`

  - SQL keywords are not case sensitive: `select` is same as `SELECT`.

- Some of the Mose Important SQL Commands

  - `SELECT` - Extracts data from a database.
  - `UPDATE` - Updates data in a database.
  - `DELETE` - Delete data in a database.
  - `INSERT INTO` - Insert new data into a database.
  - `CREATE DATABASE` - create a new database
  - `ALTER DATABASE` - Modifies a database
  - `CREATE TABLE` - Create a new table
  - `ALTER TABLE` - Modifies a table
  - `DROP TABLE` - delete a table
  - `CREATE INDEX` - Create a index (search key)
  - `DROP INDEX` - deletes a index

- to use any database use `USE` command.
- If want to comment out command do `-- ` at the start of line.

## SELECT Clause

- use for display that perticular columns
- Exercise
  - Return all the Products
    - name
    - Unit Price
    - new Price (unit price \* 1.1)
  ```sql
      SELECT
          name,
          unit_price,
          unitprice * 1.1 AS new_price
      FROM products;
  ```

## WHERE Clause

- use for filter data
- <, <=, >, >=, =, != (not equal), <> (not equal).
- Exercise
  - Get the Orders placed this year
  ```sql
      SELECT *
      FROM Orders
      WHERE order_date >= '2017-01-01' and order_date <= '2017-12-31';
  ```

## Operators

### AND, OR and NOT Operators

- AND: Should all condition true
- OR: One of the Condition Should be true
- NOT: Condition matching data will not display
- Exercise
  - from the Order_items table, get the items
    - for order #6
    - where the total price is greater than 30
  ```sql
      SELECT *
      FROM order_items
      WHERE order_id = 6 AND (quantity * unit_price) > 30;
  ```

### IN Operator

- IN: is shorter of `OR` Operator.
- Exercise
  - Return Products with
    - quantity in stock equal to 49, 38, 72.
  ```sql
  SELECT *
  FROM products
  WHERE quantity_in_stock IN (49, "38", 72);
  ```

### BETWEEN Operator

- BETWEEN: use to display products in range.
- Exercise
  - Return customers born
    - between 1/1/1990 and 1/1/2000
  ```sql
      SELECT *
      FROM Customers
      WHERE birth_date BETWEEN '1990-01-01' and '2000-01-01';
  ```

### LIKE Operator

- LIKE: use to display products with specific pattern.
- %: Represent multiple char
- \_: Represent single char
- Exercise
  - get the customers whose
    1. addresses cuontain TRAIL or AVENUE
    2. phone numbers end with 9
  ```sql
    SELECT *
    FROM Customers
    WHERE address LIKE '%trail%' AND address LIKE '%avenue%';
    -- WHERE phone LIKE '%9';
  ```

### REGEXP Operator

- Allow us more complex search
  - `^`: Represent beginning of String
  - `$`: Represent end of String
  - `|`: Represent logical or
  - `[]`: Represent set and range
- Exercise

  - Get the customers whose
    1. first names are ELKA or AMBUR
    2. last names end with EY or ON
    3. last names start with MY or contains SE
    4. last names contain B followed by R or U

  ```sql
        SELECT *
        FROM Customers
        -- WHERE first_name REGEXP 'elka|ambur';
        -- WHERE last_name 'ey$|on$';
        -- WHERE last_name '^my|se';
        -- WHERE last_name 'b[ru]';
  ```

### IS NULL Operator

- find out Records with missing values
- Exercise

  - Get the orders that are not shipped

  ```sql
  SELECT *
  FROM Orders
  WHERE shipped_date IS NULL;
  ```

### ORDER BY Operator

- Order are 2 types `ASCE`(default) and `DESC`.
- there can be multiple argument
  ```sql
    SELECT *
    FROM Customers
    -- ORDER BY first_name;
    ORDER BY state, first_name;		-- order by first state, in same state order by first_name.
  ```
- Exercise
  - Get order_id is 2 Products and short by total value in DESC
    ```sql
    SELECT *
    FROM Order_items
    WHERE order_id=2
    ORDER BY (quantity * unit_price) DESC;
    ```

### LIMIT Operator

- Use to limit the number of record return with querys

  ```sql
    SELECT *
    FROM Customers
    LIMIT 6,3;    -- First 6 rows skip then pick 3 rows.
  ```

- Exercise

  - Get the top three loyal Customers (That have Highest points)

    ```sql
      SELECT *
      FROM Customers
      LIMIT 3;
    ```

### Inner JOIN

- Exercise
  - Join order_item table with Products table and display order_items table and name from Product table.
    ```sql
      SELECT oi.*, p.name
      FROM Order_items oi
      JOIN Products p
        ON oi.product_id = p. product_id;
    ```

#### `NOTE`

- When use Alias then use them every where, not use original name(it give error).

### Join Across Database

- Use to join multiple DBs table
- If we use `sql_store` then no need to write `sql.store` before `order_items` table like `products` table in `sql_inventory` DB.

  ```sql
    USE sql_store;

    SELECT *
    FROM order_items AS oi
    JOIN sql_inventory.products p
      ON oi.product_id = p.product_id
  ```

### self Join

- We connect same table with self, applying different Alias.

  ```sql
    USE  sql_hr

    SELECT e.employee_id, e.first_name, m.first_name as Manager
    FROM employees as e
    JOIN employees m
      ON e.report_id = m.employee_id
  ```

### Multiple JOIN

- can join multiple tables

  ```sql
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
  ```

### Compound JOIN Conditions

- In some cases, there are multiple primary key that also repeate. Here use `Compound join`.
- Compound join use multiple command at join.

  ```sql
    USE sql_store;

    SELECT *
    FROM order_items oi
    JOIN order_item_notes as oin
      ON oi.order_id = oin.order_id
      AND oi.product_id = oin.product_id;
  ```

### Implicit JOIN Syntax

- When we use multiple arguments at `From`.

```sql
  SELECT *
  FROM orders o, customers c
  WHERE o.customer_id = c.customer_id
```

### Outer JOIN

- Inner join connect both table where not display whole first|second table.
- What if we want all rows from first table, use Outer JOINs
- In Outer join have 2 type,
  - `left join` (display first table)
  - `right join` (display second table)
- Example

  - Use products, order_items table
  - Here product 7 never been order so its order quantity will be null.

  ```sql
  SELECT p.product_id, p.name, oi.quantity
  FROM  products p
  LEFT JOIN order_items oi
    ON p.product_id = oi.product_id
  ORDER BY p.product_id;
  ```

### Outer Jions Between Multiple Tables

- Exercise

  - Join Orders, Customers, Shippers and Order_statuses tables

  ```sql
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
  ```

### Self Outer JOINs

- Using outer join we can print Manager name also.
  ```sql
    SELECT
      e.employee_id,
      e.first_name,
      m.first_name AS manager
    FROM employees e
    LEFT JOIN employees m
      ON e.reports_to = m.employee_id;
  ```

### The clause

- When column name is same in both table then use `Clause`, make more shorter.

  - `USING` only work when columns name is same in both table.

  ```sql
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
  ```

- If there are `multiple primary key` like order_item_notes.

  ```sql
  SELECT *
  FROM order_items oi
  JOIN order_item_notes oin
    -- USING (order_id, product_id)
    ON oi.product_id = oin.product_id
      AND oi.order_id = oin.order_id;
  ```

- Exercise

  - connect clients, payments and payment_methods table from sql_invoicing table

  ```sql
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
  ```

### Natural JOINs

- Table join based in same name column from both tables automatically.

  ```sql
  select
    o.order_id,
      c.first_name
  from orders o
  natural join customers c;
  ```

### CROSS JOINs

- Exercise

  - Do a cross join between shippers and products

    - using implicit syntax

      ```sql
      SELECT
        sh.name AS shipper,
          p.name AS product
      FROM products p, shippers sh;
      ```

    - using explicit syntax

      ```sql
      SELECT
        sh.name AS shipper,
          p.name AS product
      FROM products p
      CROSS JOIN shippers sh;
      ```

### UNION

- We can combine records from multiple result sets

- #### `Note`

  - There should be same `select colums` numbers, otherwise give error.
  - There output column name will be based on first query.

- Exercise

  ```sql
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
  ORDER BY first_name
  ```
