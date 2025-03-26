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
  - `DROP DATABASE` - Delete database
  - `SHOW DATABASES` - list of Databases

  - `CREATE TABLE` - Create a new table
  - `ALTER TABLE` - Modifies a table
  - `DROP TABLE` - delete a table
  - `SHOW TABLES` - list of Tables

  - `CREATE INDEX` - Create a index (search key)
  - `DROP INDEX` - deletes a index

- to use any database use `USE` command.
- If want to comment out command do `-- ` at the start of line.
- By default mysql "on" safe mode, to toggle write command `SET SQL_SAFE_UPDATES = 0 OR 1`. `0` for OFF and `1` for ON

## SQL Datatypes

- They define the `type of values` that can be stored in a column.
- There are multiple pql data types like,

  1. **CHAR** - store Characters of fixed length, String(0-255)
  2. **VARCHAR** - store Characters up to given length, String(0-255)
  3. **BLOB** - store Binay large object, String(0-65535)
  4. **INT** - Integer (-2<sup>31</sup> to 2<sup>31</sup>-1)
  5. **TINYINT** - Integer (-128 to 127) (-2<sup>7</sup> to 2<sup>7</sup>-1)
  6. **BIGINT** - Integer (-2<sup>63</sup> to 2<sup>63</sup>-1)
  7. **BIT** - store x-bit values. x can range from 1 to 64.
  8. **FLOAT** - decimal number - with precision to 23 digits
  9. **DOUBLE** - decimal number - with 24 to 53 digits
  10. **BOOLEAN** - values 0 and 1
  11. **DATE** - in format of `YYYY-MM-DD`
  12. **YEAR** - 4 digit formate ranging from 1901 to 2155

- There are `Signed` and `Unsigned` keyword is used to change range

## Types of SQL Commands

- In whole SQL we perform such kind of SQL Commands
  1. `DDL` (Data Definition Language): create, alter, rename, truncate & drop
  2. `DQL` (Data Query Languge): select
  3. `DML` (Date Manipulation Language): insert, update & delete
  4. `DCL` (Data Control Language): grant & revoke permission to users
  5. `TCL` (Transection Control Language): start transaction, commit, rollback

## Keys

- There are mainly 2 type of Keys,

1. `Primary Key`: It is a Column (or set of Columns) in a table that uniquely identifies each row. (Must `unique` and `NOT NULL` and Single in Table )
2. `Foreign Key`: A foreign key is a column (or set of columns) in a table that refers to the primary key in another table.
   ```sql
     FOREIGN KEY('customer_id') REFERENCES 'customers'('customer_id')
   ```

- `Note`:- Primary Key contain table is known as `Parent Table`, where Foreign Key contain table known as `Child Table`

- There are Some other keys based on Condition,

  1. `Candidate Key`: If any key Uniquely Identify any 2 tupples then it can be `Candidate Key`.

     - CK can be Multiple. We make any one of them as `Primary Key`.

  2. `Composite Key`: IF there are Multiple columns combination create uniqueness is called `Composite Key`.

  3. `Super Key`: A Super Key is a combination of all possible attribute which can uniquely identify two tuples in a table.

     - There should be `CK` atleast included in `SK`.
     - `Super Key` is an attribute (or set of attributes) that is used to `uniquely identify all attributes` in a relation. All super keys can’t be candidate keys but the reverse is true.

     [Keys Diagram that helps to understand](https://media.geeksforgeeks.org/wp-content/uploads/20230314093236/keys-in-dbms.jpg)

## Contrains

- Contrains are used to specify rulls for data in table.
  1. NOT NULL
  2. UNIQUE
  3. PRIMARY KEY
  4. FOREIGN KEY
  5. DEFAULT: set a default value. e.g. "salary INT `DEFAULT 25000`"
  6. AUTO_INCREMENT
  7. CHECK: can limit the values allowed in a column. e.g. "CONSTRAINT age_check `CHECK (age >= 18 AND city='Delhi')`", "age INT `CHECK (age >= 18)`"

## Aggregate Functions

- Aggregate Functions perform a calculation on a set of values and return a single value.
  1. COUNT()
  2. MAX()
  3. MIN()
  4. SUM()
  5. AVG()

## Group By Clause

- Group rows that have a same values into summary rows.
- It collect data from multiple records and groups the result by one or more column.
- #### `Note`
  - Generally We use group by with some `Aggregation Function`.
  - must maintain same number of columns (accept Aggregate function) in `select` and `group by` command, otherwise give error (1055).

```sql
  SELECT city, COUNT(name)
  FROM student
  GROUP BY city;
```

- Exercise
  - Display client name from clients table with how many time they invoiced from invoices table for each client.

```sql
USE sql_invoicing;

SELECT
  c.name,
  (SELECT COUNT(invoice_id)
  FROM invoices i
  WHERE i.client_id = c.client_id) AS invoices
FROM clients c
GROUP BY c.client_id
```

## Having

- The `HAVING` clause in SQL is used to filter query results based on `aggregate functions`.
- Unlike the `WHERE` clause, which filters individual rows before grouping, the `HAVING` clause filters groups of data after aggregation.
- Without `GROUP BY`, can't use `HAVING`.

- Exercise

  - There are clients and payments tables.
  - Display client_id, client name and total amount they spend.

    ```sql
    SELECT
        c.client_id,
        c.name,
        total_amount.t_amount
    FROM clients c
    JOIN (
        SELECT
            client_id,
            sum(amount) AS t_amount
        FROM payments p
        GROUP BY client_id
        HAVING sum(amount) >= 100   -- OR  HAVING client_id
    ) total_amount
      USING (client_id)
    ```

## SELECT Clause

- use to select any data from the database.
- Exercise
  - Return all the Products
    - name
    - Unit Price
    - new Price (unit price \* 1.1)
  ```sql
      SELECT
          name,
          unit_price,
          (unitprice * 1.1) AS new_price
      FROM products;
  ```
- `DISTINCT` keyword is use to print unique values, not duplicate values

## WHERE Clause

- use for filter data based on condition.
- <, <=, >, >=, =, != (not equal), <> (not equal).
- Exercise
  - Get the Orders placed this year
  ```sql
      SELECT *
      FROM Orders
      WHERE order_date >= '2017-01-01' and order_date <= '2017-12-31';
  ```

## Operators

- There are total 4 types of Operators.
  1. Arithmetic Operators: +, -, \*, /, %
  2. Comparison Operators: =, != (or <>), >, <, >=, <=
  3. Logical Operators: AND, OR, NOT, IN, BETWEEN, ALL, LIKE, ANY
  4. Bitwise Operators: &, |

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

- Order are 2 types `ASC`(default) and `DESC`.
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

# Joins

- Joins is used to combine rows from two or more tables, based on a related column between them.
- there are 2 types of Joins
  1. `Inner Join`: Return maching values from both table.
  2. `Outer Joins`: Based on bellow 3 types,
     - `Left join`: If want left table all data.
     - `Right join`: If want right table all data.
     - `Full join`: if want all data from both table

## Inner JOIN

- Inner JOIN display common column 2 times.

- Exercise
  - Join order_item table with Products table and display order_items table and name from Product table.
    ```sql
      SELECT oi.*, p.name
      FROM Order_items oi
      INNER JOIN Products p
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
    INNER JOIN sql_inventory.products p
      ON oi.product_id = p.product_id
  ```

### self Join

- We connect same table with self, applying different Alias.

  ```sql
    USE  sql_hr

    SELECT e.employee_id, e.first_name, m.first_name as Manager
    FROM employees as e
    INNER JOIN employees m
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
    INNER JOIN payment_methods pm
    	ON p.payment_method = pm.payment_method_id
    INNER JOIN clients c
    	ON p.client_id = c.client_id;
  ```

### Compound JOIN Conditions

- In some cases, there are multiple primary key that also repeate. Here use `Compound join`.
- Compound join use multiple command at join.

  ```sql
    USE sql_store;

    SELECT *
    FROM order_items oi
    INNER JOIN order_item_notes as oin
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

## Outer JOIN

- Inner join connect both table where not display whole first|second table.
- What if we want all rows from first table, use Outer JOINs
- In Outer join have 2 type,
  - `left join` (return left table all data + right table matched data)
  - `right join` (display right table all data + left table matched data)
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

### Exclusive Join

- There are 2 types of Exclusive Join

  1. `Left Exclusive Join`: Return only left table data which is not in right table.
  2. `Right Exclusive Join`: Return only right table data which is not in left table.

- we can apply using one condition `WHERE b.id IS NULL` (return L_E_J if use LEFT JOIN) or `WHERE a.id IS NULL`(return R_E_J if use RIGHT JOIN).

- Simply it return not matching data in both table.

## Natural JOINs

- Natural join is an SQL join operation that creates a join on the base of the `common columns` name in the tables. To perform natural join there must be one common attribute(Column) between two tables.
- This can lead mistake and hard to understand.

- Natural Join create just one copy of common column where Inner Join not do.

- Table join based in same name column from both tables automatically.

  ```sql
  SELECT
    o.order_id,
      c.first_name
  FROM orders o
  NATURAL JOIN customers c;
  ```

## CROSS JOINs

- the CROSS JOIN is a unique join operation that returns the `Cartesian product` of two or more tables. means all rows of left table connect with each rows of right table.

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

## UNION

- Union combine the result-set of two or more select statements and give `UNIQUE` records.
- We can combine records from multiple result sets

- #### `Note`

  - There should be same No. of `colums` in every Select, otherwise give error.
  - columns must have similar data types
  - columns in every SELECT should be in same order.
  - There output column name will be based on first query.

- There are another thing `UNION ALL` that allow duplicate values also.

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

## Insert Command

### Insert a Single Row

- There are 2 ways to insert data

  ```sql
    INSERT INTO customers
    VALUES (DEFAULT, 'John', 'Smith', '1990-01-01', DEFAULT, 'address', 'city', 'CA', DEFAULT);

      // OR

    INSERT INTO Customers (first_name, last_name, birth_date, address, city, state)
    VALUES ('John', 'Smith', '1990-01-01', 'address', 'city', 'CA');
  ```

### Insert Multiple ROWs

- Exercise
  - Insert three rows in the products table
    ```sql
      INSERT INTO products (name, quantity_in_stock, unit_price)
      VALUES ('product 1', 95, 4.35),
              ('product 2', 90, 2.05),
              ('product 3', 105, 13.20);
    ```

### Inserting Hierarchical Rows

- Here we Insert data in Multiple tables
- There is an Orders table as a `Parent` and an Order_items table as a `Child`.

```sql
  INSERT INTO orders(customer_id, order_date, status)
  VALUES (1, '2020-01-01', 1);

  SELECT LAST_INSERT_ID();  -- Return last insert Operation table

  INSERT INTO order_items
  VALUES (last_insert_id(), 1, 2, 3.14),
          (last_insert_id(), 2, 4, 5.14);
```

## Create a Copy of Table

- This methods will not make PK in new table
- Exercise

  - In invoice table inside sql_invoicing DB there is client_id.
  - Make new Table invoice_Archive that replace client_id with client_name.

    ```SQL
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
    ```

## Update Operation

### Update Single Row

```sql
  UPDATE invoices
  SET payment_total = invoice_total * 0.5, payment_date = '1990-04-02'
  WHERE invoice_id = 5;
```

### Update Multiple Rows

- Condition will make changes in updating multiple rows or updating single row.

- Exercise

  - Give 50 extra Points to any customers born before 1990

    ```sql
      USE sql_store;

      UPDATE customers
      SET points = points + 50
      WHERE birth_date < '1990-01-01';
    ```

### UPDATE Using Subquery

- Exercise

  - Give 'Gold Customers' comment on customers table where points > 3000.

  ```sql
    USE sql_store;

    UPDATE orders
    SET comments = 'Gold Customers'
    WHERE customer_id IN
        (SELECT customer_id
        FROM customers
        WHERE points > 3000);
  ```

## DELETE Data

- Delete every thing in invoices table.

  ```sql
    DELETE FROM invoices;
  ```

- Delete using Subquery
  ```sql
    DELETE FROM invoice
    WHERE client_id =
          (SELECT client_id
          FROM clients
          WHERE name = 'Myworks');
  ```

## Cascading for Foreign Key

- Cascading means if changes happened in `Parent Table` then changes should happened in `Child Table`.
- There are 2 type of cascading
  1. `ON DELETE CASECADE`
     - When we create a foreign key using this option, it delete the referencing rows in the child table when the referenced row is deleted in the parent table which has a primary key.
  2. `ON UPDATE CASECADE`
     - When we create a foreign key using this option, it update the referencing rows in the child table when the referenced row is updated in the parent table which has a primary key.
  ```sql
  FOREIGN KEY ('client_id') REFERENCES 'clients'('client_id') ON UPDATE CASCADE ON DELETE CASCADE
  ```

## Alter

- Use to change the schema of Table or Database

### Alter Table

- there are many Command like `ADD COLUMN`, `DROP COLUMN`, `RENAME TO` (rename table name), `CHANGE COLUMN`, `MODIFY` (modify datatype/constraint of column), `TRUNCATE TABLE` (to delete table's data, not affect schema).

  ```SQL
    ALTER TABLE order_archived
    ADD COLUMN test varchar(10) DEFAULT NULL;

    ALTER TABLE order_archived
    RENAME TO order_archived_changed;

    ALTER TABLE order_archived_changed
    CHANGE COLUMN test test_changed INT NOT NULL;

    ALTER TABLE order_archived_changed
    MODIFY test_changed BOOLEAN NOT NULL DEFAULT FALSE;

    ALTER TABLE order_archived_changed
    DROP COLUMN test_changed;

    TRUNCATE TABLE order_archived_changed;
  ```

## Subquery

- A Subquery or Inner query or a Nested Query is a query within another SQL query.
- Subquery is used when we want dynamic Answers based on current changes of table.

- It involves 2 select statements
- There are 3 way to use Subquery
  1. write in SELECT clause: Subquery Should return `Single value`.
  2. write in FROM clause: If we write subquery in FROM, that means we `create new Tamp_table` and pass it.
     - `Note`:- Must give Alias.
  3. write in WHERE clause: If we pass `only one value` then write in WHERE clause

## VIEW

- A view is `virtual Table` based on the result-set of an SQL statement.
- View not reflact actual data.
- We can do all Operation like above with View.

- Exercise

  - What if There are Students table contain rollno, name, marks, grade and city.
  - Now we create view and select only rollno, name and marks from `Students` table.

    ```sql
      CREATE VIEW view1 AS
          SELECT rollno, name, marks FROM students;

      SELECT * FROM view1;
    ```

## PROCEDURE

- `procedure` is used to save SQL code that can use again & again.

- ### <strong>Banifite</strong>:

  - Performance Optimization
  - Security
  - Code Reusability
  - Reduced Network Traffic
  - Better Error Handling

- Example

  - There are customers table contain id, first_name, last_name, country.

  ```sql
  -- Create a store Procedure,
    DELIMITER &&
    CREATE PROCEDURE get_customers_by_country ()
    BEGIN
      SELECT * FROM student_info WHERE marks > 70;
      SELECT COUNT(stud_code) AS Total_Student FROM student_info;
    END &&
    DELIMITER;

  -- Execute store Procedure
    CALL get_merit_student();

  ```
