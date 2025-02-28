DROP DATABASE IF EXISTS `library_management_system`;
CREATE DATABASE IF NOT EXISTS `library_management_system`;
USE `library_management_system`;

DROP TABLE IF EXISTS `authors`;
CREATE TABLE IF NOT EXISTS `authors`(
	author_id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY(`author_id`)
) auto_increment=3;
INSERT INTO authors (author_id, name)
VALUES (1, 'ABDUL KALAM'),
		(2, 'JAWAHARLAL NEHRU');


DROP TABLE IF EXISTS `publicers`;
CREATE TABLE IF NOT EXISTS `publicers`(
	publicer_id INT(11) NOT NULL AUTO_INCREMENT,
    publicer_name VARCHAR(50) NOT NULL,
    address VARCHAR(100) NOT NULL,
    phone VARCHAR(10) NOT NULL,
    email VARCHAR(100) NOT NULL,
    PRIMARY KEY(`publicer_id`)
)auto_increment = 5;
INSERT INTO publicers (publicer_id, publicer_name, address, phone, email)
VALUES (1, 'UNIVERSITIES PRESS', 'AHMEDABAD', 1234567890, 'universities@press.com'),
		(2, 'RUPA PUBLICATIONS', 'GANDHINAGAR', 1112223334, 'rupa@publication.ac.in'),
        (3, 'HARPER COLLINS', 'KOLKATA', 1122334455, 'harper@collins.com'),
        (4, 'PENGUIN BOOKS', 'MUMBAI', 1234512345, 'penguin@books.com');

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
	category_id INT(10) NOT NULL AUTO_INCREMENT,
    category_name VARCHAR(100) unique NOT NULL,
    PRIMARY KEY (category_id)
)auto_increment = 4;
INSERT INTO categories (category_id, category_name)
VALUES (1, 'Autobiography'),
		(2, 'History'),
        (3, 'Guide');

DROP TABLE IF EXISTS `books`;
CREATE TABLE IF NOT EXISTS `books` (
	book_id INT(100) NOT NULL unique AUTO_INCREMENT,
    book_name VARCHAR(50) NOT NULL,
    author_id INT(50) NOT NULL,
    book_category VARCHAR(50) NOT NULL,
    publicer_id INT(50) NOT NULL,
    publication_year INT(11),
    FOREIGN KEY (author_id) REFERENCES `authors`(`author_id`),
    FOREIGN KEY (publicer_id) REFERENCES `publicers`(`publicer_id`),
    FOREIGN KEY (`book_category`) REFERENCES `categories`(`category_name`)
) auto_increment = 1;
INSERT INTO books (book_id, book_name, author_id, book_category, publicer_id, publication_year)
VALUES ( 1, 'WINGS OF FIRE',  1, 'Autobiography', 1, 1950),
		( 2, 'MY JOURNEY', 1, 'History', 2, 1960),
        ( 3, 'TURNING POINTS', 1, 'Guide', 3, 1970),
        ( 4, 'Jawaharlal Nehru', 2, 'Autobiography', 4, 1980);
        


DROP TABLE IF EXISTS `members`;
CREATE TABLE IF NOT EXISTS `members`(
	member_id INT(100) NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone VARCHAR(10) NOT NULL,
    email VARCHAR(100) NOT NULL,
    address VARCHAR(100) NOT NULL,
    PRIMARY KEY (member_id)
)auto_increment=4;
INSERT INTO members (member_id, first_name, last_name, phone, email, address)
VALUES ( 1, 'Ramesh', 'Patel', 1234567890, 'ramesh12@test.com', 'Ahmedabad'),
		( 2, 'Kanjee', 'Thakor', 1122334455, 'kanjee13@test.com', 'Gandhinagar'),
        ( 3, 'Marleen', 'Padhani', 1112223334, 'marleen23@test.com', 'Rajkot');

DROP TABLE IF EXISTS `librarian`;
CREATE TABLE IF NOT EXISTS `librarian`(
	librarian_id INT(10) NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone VARCHAR(10) NOT NULL,
    email VARCHAR(100) NOT NULL,
    PRIMARY KEY (librarian_id)
)auto_increment = 2;	
INSERT INTO librarian (librarian_id, first_name, last_name, phone, email)
VALUES ( 1, 'Rajubhai', 'Patel', 1234567890, 'raju1234@test.com');



-- DROP TABLE IF EXISTS `book_categories`;
-- CREATE TABLE IF NOT EXISTS `book_categories` (
-- 	book_id INT(100) NOT NULL,
-- 	category_id INT(100) NOT NULL,
--     FOREIGN KEY (category_id) REFERENCES `categories`(`category_id`),
--     FOREIGN KEY (book_id) REFERENCES `books`(`book_id`)
-- );


DROP TABLE IF EXISTS `transaction`;
CREATE TABLE IF NOT EXISTS `transaction` (
	transaction_id INT(100) AUTO_INCREMENT,
    member_id INT(100) NOT NULL,
    book_id INT(100) NOT NULL,
    librarian_id INT(100) NOT NULL,
    transaction_date DATE NOT NULL DEFAULT (CURRENT_DATE()),
    due_date DATE NOT NULL default (DATE_ADD(transaction_date, INTERVAL 30 DAY)),
    return_date DATE ,
    status ENUM('Issued', 'Returned', 'Overdue') DEFAULT 'Issued',
    PRIMARY KEY(transaction_id),
    FOREIGN KEY (`member_id`) REFERENCES `members`(`member_id`),
    FOREIGN KEY (`book_id`) REFERENCES `books`(`book_id`),
    FOREIGN KEY (`librarian_id`) REFERENCES `librarian`(`librarian_id`)
) auto_increment = 1;
INSERT INTO transaction (member_id, book_id, librarian_id, return_date, status)
VALUES (3, 1, 1, NULL, DEFAULT);