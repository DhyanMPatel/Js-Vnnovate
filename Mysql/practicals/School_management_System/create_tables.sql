DROP DATABASE IF EXISTS `school_management_system`;
CREATE DATABASE IF NOT EXISTS `school_management_system`;
USE `school_management_system`;

-- Changes happend in Operations file.
-- DROP TABLE IF EXISTS `students`;
CREATE TABLE IF NOT EXISTS `students` (
    `enrollment_no` INT NOT NULL auto_increment,
    `first_name` VARCHAR(50) NOT NULL,
    `middel_name` VARCHAR(50) NOT NULL,
    `last_name` VARCHAR(50) NOT NULL,
    `birth_date` date NOT NULL DEFAULT '1990-01-01',
    PRIMARY KEY (`enrollment_no`)
) auto_increment=7;


-- DROP TABLE IF EXISTS `subjects`;
CREATE TABLE IF NOT EXISTS `subjects` (
	`subject_id` INT auto_increment,
    `subject_name` VARCHAR(50) NOT NULL,
    PRIMARY KEY(`subject_id`)
);



-- DROP TABLE IF EXISTS `faculty`;
CREATE TABLE IF NOT EXISTS `faculty`(
	`faculty_id` INT AUTO_INCREMENT,
    `faculty_name` VARCHAR(50) NOT NULL,
    `birth_date` DATE NOT NULL,
    `faculty_experience` INT NOT NULL,
    `faculty_qualification` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`faculty_id`)	
) auto_increment=7;

-- DROP TABLE IF EXISTS `student_subject`;
CREATE TABLE IF NOT EXISTS `student_subject`(
	`enrollment_no` INT NOT NULL,
    `subject_id` INT NOT NULL,
    FOREIGN KEY (`enrollment_no`) REFERENCES `students`(`enrollment_no`) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (`subject_id`) REFERENCES `subjects`(`subject_id`) ON UPDATE CASCADE ON DELETE CASCADE
);


-- DROP TABLE IF EXISTS `faculty_subject`;
CREATE TABLE IF NOT EXISTS `faculty_subject`(
	`faculty_id` INT NOT NULL,
    `subject_id` INT NOT NULL,
    FOREIGN KEY (`faculty_id`) REFERENCES `faculty`(`faculty_id`) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (`subject_id`) REFERENCES `subjects`(`subject_id`) ON UPDATE CASCADE ON DELETE CASCADE
);

