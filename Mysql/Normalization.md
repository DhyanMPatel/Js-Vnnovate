# Normalization

## 1st Normal Form

- No Multi valued Attributes only single Valued.
- Example

  - There are Student that learn multiple course then `1NF` will not allow to add multiple values in single cell of `course column`.
  - <strong>Solution</strong>: Can `create multiple column` based on course or `create multiple row` based on courses.

    ```sql
    CREATE TABLE `student` (
        `roll_no` INT PRIMARY KEY,
        `name` VARCHAR(30) NOT NULL
    );

    CREATE TABLE `std_course`(
        `roll_no` INT NOT NULL,
        `course` VARCHAR(50) NOT NULL,
        FOREIGN KEY (`roll_no`) REFERENCES `student`(`roll_no`) ON UPDATE CASCADE ON DELETE CASCADE,
        PRIMARY KEY (`roll_no`,`course`)
    );
    ```

## 2nd Normal Form

- `1NF` + No Partial dependency only `Full dipendancy`.
- All the `non-prime` attributes should be fully functional dependent on `Candidate key`.
- If `non-prime` attribute will determined by any `part of CK` also called as `Partial Dependency`.
- Example

  - There are `AB` is combined unique key and determine to `C` which is Non-unique.
  - Now `A` or `B` individually can't determine to `C`. This called `Full Dependency`.
  - In `Partial Dependency`, There `A` and `B` individually can determin to `C`.

    ```sql
    CREATE TABLE `customer_store` (
        `custoemr_id` INT NOT NULL,
        `store_id` INT NOT NULL,
        `location` VARCHAR(50) NOT NULL
    );

    --  2NF
    CREATE TABLE `customer` (
        `customer_id` INT NOT NULL,
        `store_id` INT NOT NULL,
        PRIMARY KEY (`customer_id`,`store_id`)		-- CK
    );

    --   2NF
    CREATE TABLE `store`(
        `store_id` INT NOT NULL,
        `location` VARCHAR(50) NOT NULL,
        PRIMARY KEY (`store_id`)
    );
    ```

    - `customer_id` is A. `Store_id` is B and `location` is C.
    - C is individually determine by B which is part of CK in `customer_store` table.

## 3rd Normal Form

- `2NF` + No Transitive Dependency + non-prime should not determine non-primer.
- Example
  - There are `X` (PK) determine to `Y` and `Y` (Non-prime) determine to `Z` (Non-prime). So Transitively `X` also determin to `Z`.

## Boyce-Codd Normal Form

- `3NF` + L.H.S must be `CK` (Candidate Key) OR `SK` (Super Key).
- Example
  - There are `X` determine to `Y`. Then `X` should be `CK`/`SK`

## 4th Normal Form

- `BCNF` + No Multivalued Dependency.
- Example
  - there are person which had 3 mobile No. and 3 Email IDs.
  - This will create 9 rows of single person, which is not good and called `Multivalued Dependency`.
  - <strong>Solution</strong>: create 2 table `person with  mobile No.` and `person with Email IDs`.

## 5th Normal Form

- `4NF` + Lossless Decomposition
- Example
  - When we devide table from Vertically (means some columns in 1st table and remaining in 2nd table), then that both table we combine that time it will create tupples which create `Loss Decomposition`.
  - <strong>Solution</strong>: If we do Vertical Divide, common Attribute should be `CK`.
