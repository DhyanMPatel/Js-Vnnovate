DROP TABLE IF EXISTS `student_subject_with_faculty`;

CREATE TABLE IF NOT EXISTS `student_subject_with_faculty` AS 
	(
		SELECT 
			ss.enrollment_no AS enrollment_no,
			(SELECT first_name FROM students stu WHERE stu.enrollment_no = ss.enrollment_no ) AS students,
			ss.subject_id AS subject_id, 
			(SELECT subject_name FROM subjects sub WHERE sub.subject_id = ss.subject_id ) AS subjects,
			fs.faculty_id AS faculty_id,
			(SELECT faculty_name FROM faculty f WHERE f.faculty_id = fs.faculty_id) AS faculty
		FROM student_subject ss
		LEFT JOIN faculty_subject fs
			USING(subject_id)
		ORDER BY ss.subject_id, ss.enrollment_no
    );

UPDATE students
SET birth_date = '2004-10-26'
WHERE enrollment_no = 6; 

UPDATE students
SET enrollment_no = 2025020006
WHERE enrollment_no = 6;

ALTER TABLE `students`
-- DROP COLUMN `std_id`;
DROP COLUMN `age`;

ALTER TABLE students
CHANGE COLUMN middel_name middle_name varChar(50) not null;

ALTER TABLE students
MODIFY enrollment_no INT(11) PRIMARY KEY AUTO_INCREMENT;

ALTER TABLE students
ADD COLUMN birth_date date NOT NULL DEFAULT '1990-12-13';

ALTER TABLE student_sub
RENAME TO student_subject;

INSERT INTO `faculty_subject` (faculty_id, subject_id)
VALUES (6, 1),
		(2, 2),
		(3, 3),
        (4, 4),
        (5, 5),
        (6, 6);
        
INSERT INTO `student_subject` (enrollment_no, subject_id)
VALUES (1, 1),(1, 2),(1, 6),
		(2, 1),(2, 2),(2, 3),
        (3, 5),(3, 6),(4, 1),
		(4, 2),(4, 6),(5, 1),
        (6, 2),(6, 3),(5, 5),
        (5, 6);
        
INSERT INTO students (first_name, middle_name, last_name, birth_date)
VALUES ('Ramu', 'Mukeshbhai', 'Rabary', '2001-10-10');