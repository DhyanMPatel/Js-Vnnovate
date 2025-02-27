INSERT INTO `students` (std_id, roll_no, first_name, middel_name, last_name, age)
VALUES (4, 4, 'Vinod', 'Mukeshbhai', 'Padhani', 21),
		(5, 5, 'Divya', 'Sanjaybhai', 'Thakor', 23),
        (6, 6, 'leela', 'kanteebhai', 'Barot', 19);
        
INSERT INTO `subjects` (sub_id, sub_name)
VALUES (1, 'Maths'),
		(2, 'Science'),
        (3, 'Physics'),
        (4, 'Biology'),
        (5, 'Economics'),
        (6, 'English');
        
INSERT INTO `faculty` (faculty_id, faculty_name, age, experience, qualification)
VALUES (4, 'Harshbhai', 33, 13, 'PHD'),
		(5, 'kalpheshbhai', 45, 15, 'Bachelor'),
        (6, 'sanjaykumar', 35, 12, 'Master');
        
INSERT INTO `std_sub` (std_id, sub_id)
VALUES (4, 1),
		(4, 2),
        (4, 6),
		(5, 1),
        (6, 2),
        (6, 3),
        (5, 5),
        (5, 6);
        
INSERT INTO `faculty_sub` (faculty_id, sub_id)
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

