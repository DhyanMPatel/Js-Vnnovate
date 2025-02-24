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
    -  Return Products with 
        - quantity in stock equal to 49, 38, 72.
    ```sql
    SELECT *
    FROM products
    WHERE quantity_in_stock IN (49, "38", 72);

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
- _: Represent single char
- Exercise
    - get the customers whose
		1) addresses cuontain TRAIL or AVENUE
        2) phone numbers end with 9
    ```sql
        
    ```

### REGEXP Operator

### IS NULL Operator

### ORDER BY Operator

### LIMIT Operator
