INSERT INTO `students` (enrollment_no, first_name, middel_name, last_name, birth_date)
VALUES (2025020001, 'Vinod', 'Mukeshbhai', 'Padhani', '2004-6-15'),
		(2025020002, 'Divya', 'Sanjaybhai', 'Thakor', '2002-7-23'),
        (2025020003, 'leela', 'kanteebhai', 'Barot', '2001-4-19'),
        (2025020004, 'Bhagat', 'sanjaybhai', 'Barot', '2003-6-29'),
        (2025020005, 'Bhumi', 'Vinodkumar', 'Barot', '2000-2-19'),
        (2025020006, 'Rakesh', 'Bharatbhai', 'Barot', '2001-4-19');
        
INSERT INTO `subjects` (subject_id, subject_name)
VALUES (1, 'Maths'),
		(2, 'Science'),
        (3, 'Physics'),
        (4, 'Biology'),
        (5, 'Economics'),
        (6, 'English');
        
INSERT INTO `faculty` (faculty_id, faculty_name, birth_date, faculty_experience, faculty_qualification)
VALUES (1, 'Harshbhai', '2004-6-15', 13, 'PHD'),
		(2, 'kalpheshbhai', '2004-6-15', 15, 'Bachelor'),
        (3, 'kalpheshbhai', '2004-6-15', 15, 'Bachelor'),
        (4, 'kalpheshbhai', '2004-6-15', 15, 'PHD'),
        (5, 'kalpheshbhai', '2004-6-15', 15, 'Bachelor'),
        (6, 'sanjaykumar', '2004-6-15', 12, 'Master');
        
INSERT INTO `student_subject` (enrollment_no, subject_id)
VALUES (2025020004, 1),
		(2025020004, 2),
        (2025020004, 6),
		(2025020005, 1),
        (2025020006, 2),
        (2025020006, 3),
        (2025020005, 5),
        (2025020005, 6),
        (2025020001, 5),
        (2025020002, 2),
        (2025020003, 4),
        (2025020001, 1),
        (2025020002, 4),
        (2025020001, 3);
        
        
INSERT INTO `faculty_subject` (faculty_id, subject_id)
VALUES (6, 1),
		(2, 2),
		(3, 3),
        (4, 4),
        (5, 5),
        (6, 6);

SELECT faculty_id
FROM faculty;

SELECT std_id
FROM students;

SELECT sub_id
FROM subjects;

