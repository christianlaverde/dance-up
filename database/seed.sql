-- ============================================
-- Test Data Insert Script for Updated Studio Manager Schema
-- ============================================

-- 1. Insert 1 Admin Account
INSERT INTO users (email, password_hash, first_name, middle_name, last_name, role)
VALUES ('admin@example.com', 'hashed_admin', 'Admin', NULL, 'User', 'admin');

-- 2. Insert 1 Instructor Account
-- Note: Our schema only supports 'student' and 'admin'; we designate the instructor by assigning them as instructor in sessions.
INSERT INTO users (email, password_hash, first_name, middle_name, last_name, role)
VALUES ('instructor@example.com', 'hashed_instructor', 'John', 'D.', 'Doe', 'student');

-- 3. Insert 8 Student Accounts
INSERT INTO users (email, password_hash, first_name, middle_name, last_name, role)
VALUES 
  ('student1@example.com', 'hashed_pwd1', 'Alice', 'M.', 'Johnson', 'student'),
  ('student2@example.com', 'hashed_pwd2', 'Bob', NULL, 'Smith', 'student'),
  ('student3@example.com', 'hashed_pwd3', 'Carol', 'A.', 'Davis', 'student'),
  ('student4@example.com', 'hashed_pwd4', 'David', NULL, 'Wilson', 'student'),
  ('student5@example.com', 'hashed_pwd5', 'Eva', NULL, 'Brown', 'student'),
  ('student6@example.com', 'hashed_pwd6', 'Frank', 'B.', 'Jones', 'student'),
  ('student7@example.com', 'hashed_pwd7', 'Grace', NULL, 'Miller', 'student'),
  ('student8@example.com', 'hashed_pwd8', 'Henry', 'C.', 'Taylor', 'student');

-- IDs summary:
-- Admin: id=1
-- Instructor: id=2
-- Students: id=3 to 10


-- 4. Insert 4 Class Types
-- (a) Beginner Salsa Course (course)
INSERT INTO class_types (title, description, duration, class_category)
VALUES ('Beginner Salsa Course', 'A course for beginners to learn salsa.', 60, 'course');

-- (b) Intermediate Salsa Course (course)
INSERT INTO class_types (title, description, duration, class_category)
VALUES ('Intermediate Salsa Course', 'A course for intermediate salsa dancers.', 60, 'course');

-- (c) Advanced Salsa Footwork (open)
INSERT INTO class_types (title, description, duration, class_category)
VALUES ('Advanced Salsa Footwork', 'An open class focusing on advanced footwork techniques.', 60, 'open');

-- (d) Ladies Styling Course (course)
INSERT INTO class_types (title, description, duration, class_category)
VALUES ('Ladies Styling Course', 'A course focusing on styling techniques for ladies.', 60, 'course');

-- Assume class_type IDs: 
-- 1: Beginner Salsa Course, 2: Intermediate Salsa Course, 3: Advanced Salsa Footwork, 4: Ladies Styling Course


-- 5. Insert Class Sessions for March 2025

-- (a) Beginner Salsa: Mondays at 7pm (March 3, 10, 17, 24, 31)
INSERT INTO class_sessions (class_type_id, scheduled_at, capacity, instructor_id)
VALUES 
  (1, '2025-03-03 19:00:00', 20, 2),
  (1, '2025-03-10 19:00:00', 20, 2),
  (1, '2025-03-17 19:00:00', 20, 2),
  (1, '2025-03-24 19:00:00', 20, 2),
  (1, '2025-03-31 19:00:00', 20, 2);

-- (b) Intermediate Salsa: Wednesdays at 7pm (March 5, 12, 19, 26)
INSERT INTO class_sessions (class_type_id, scheduled_at, capacity, instructor_id)
VALUES 
  (2, '2025-03-05 19:00:00', 20, 2),
  (2, '2025-03-12 19:00:00', 20, 2),
  (2, '2025-03-19 19:00:00', 20, 2),
  (2, '2025-03-26 19:00:00', 20, 2);

-- (c) Advanced Salsa Footwork: Wednesdays at 8pm (March 5, 12, 19, 26)
INSERT INTO class_sessions (class_type_id, scheduled_at, capacity, instructor_id)
VALUES 
  (3, '2025-03-05 20:00:00', 20, 2),
  (3, '2025-03-12 20:00:00', 20, 2),
  (3, '2025-03-19 20:00:00', 20, 2),
  (3, '2025-03-26 20:00:00', 20, 2);

-- (d) Ladies Styling: Tuesdays at 7pm (March 4, 11, 18, 25)
INSERT INTO class_sessions (class_type_id, scheduled_at, capacity, instructor_id)
VALUES 
  (4, '2025-03-04 19:00:00', 20, 2),
  (4, '2025-03-11 19:00:00', 20, 2),
  (4, '2025-03-18 19:00:00', 20, 2),
  (4, '2025-03-25 19:00:00', 20, 2);

-- Expected session IDs:
-- Beginner Salsa: IDs 1–5
-- Intermediate Salsa: IDs 6–9
-- Advanced Salsa Footwork: IDs 10–13
-- Ladies Styling: IDs 14–17


-- 6. Insert Offerings

-- (a) Beginner Salsa Course Package: offering_type = 'course'
INSERT INTO offerings (title, description, offering_type, price, course_start_date, course_end_date)
VALUES ('Beginner Salsa Course Package', 'Access to all Beginner Salsa classes in March 2025.', 'course', 100.00, '2025-03-03', '2025-03-31');

-- (b) Team Package: offering_type = 'course', covers all classes
INSERT INTO offerings (title, description, offering_type, price, course_start_date, course_end_date)
VALUES ('Team Package', 'Access to all classes available in March 2025.', 'course', 300.00, '2025-03-03', '2025-03-31');

-- (c) Intermediate Salsa Course Package: offering_type = 'course', includes Beginner and Intermediate courses
INSERT INTO offerings (title, description, offering_type, price, course_start_date, course_end_date)
VALUES ('Intermediate Salsa Course Package', 'Access to all Beginner and Intermediate Salsa classes in March 2025.', 'course', 150.00, '2025-03-03', '2025-03-31');

-- (d) 4 Session Class Pack: offering_type = 'class_pack', for open classes (Advanced Salsa Footwork)
INSERT INTO offerings (title, description, offering_type, price, classes_included)
VALUES ('4 Session Class Pack', '4 passes for open classes (Advanced Salsa Footwork).', 'class_pack', 80.00, 4);

-- Assume offering IDs:
-- 1: Beginner Salsa Course Package, 2: Team Package, 3: Intermediate Salsa Course Package, 4: 4 Session Class Pack


-- 7. Create Links in offering_class_types and offering_sessions

-- offering_class_types:
-- Offering 1 (Beginner Salsa) -> Class Type 1 (Beginner Salsa Course)
INSERT INTO offering_class_types (offering_id, class_type_id)
VALUES (1, 1);

-- Offering 2 (Team Package) -> All Class Types (1, 2, 3, 4)
INSERT INTO offering_class_types (offering_id, class_type_id)
VALUES 
  (2, 1),
  (2, 2),
  (2, 3),
  (2, 4);

-- Offering 3 (Intermediate Salsa) -> Class Types 1 (Beginner) and 2 (Intermediate)
INSERT INTO offering_class_types (offering_id, class_type_id)
VALUES 
  (3, 1),
  (3, 2);

-- Offering 4 (4 Session Class Pack) -> Open classes only (Advanced Salsa Footwork, id=3)
INSERT INTO offering_class_types (offering_id, class_type_id)
VALUES (4, 3);

-- offering_sessions (granular links):
-- For Offering 1: Link all Beginner Salsa sessions (IDs 1–5)
INSERT INTO offering_sessions (offering_id, class_session_id)
VALUES 
  (1, 1),
  (1, 2),
  (1, 3),
  (1, 4),
  (1, 5);

-- For Offering 2: Link all sessions (IDs 1–17)
INSERT INTO offering_sessions (offering_id, class_session_id)
VALUES 
  (2, 1), (2, 2), (2, 3), (2, 4), (2, 5),
  (2, 6), (2, 7), (2, 8), (2, 9),
  (2, 10), (2, 11), (2, 12), (2, 13),
  (2, 14), (2, 15), (2, 16), (2, 17);

-- For Offering 3: Link Beginner and Intermediate sessions (IDs 1–9)
INSERT INTO offering_sessions (offering_id, class_session_id)
VALUES 
  (3, 1), (3, 2), (3, 3), (3, 4), (3, 5),
  (3, 6), (3, 7), (3, 8), (3, 9);

-- For Offering 4: Link 4 sessions from open classes (Advanced Salsa Footwork: IDs 10–13)
INSERT INTO offering_sessions (offering_id, class_session_id)
VALUES 
  (4, 10), (4, 11), (4, 12), (4, 13);


-- 8. Randomize Student Purchases (each offering purchased at least once)
-- Student IDs are 3 to 10.

-- Student 3 buys Offering 1
INSERT INTO purchases (user_id, offering_id, payment_amount, payment_method, status)
VALUES (3, 1, 100.00, 'credit_card', 'completed');

-- Student 4 buys Offering 2
INSERT INTO purchases (user_id, offering_id, payment_amount, payment_method, status)
VALUES (4, 2, 300.00, 'paypal', 'completed');

-- Student 5 buys Offering 3
INSERT INTO purchases (user_id, offering_id, payment_amount, payment_method, status)
VALUES (5, 3, 150.00, 'credit_card', 'completed');

-- Student 6 buys Offering 4
INSERT INTO purchases (user_id, offering_id, payment_amount, payment_method, status)
VALUES (6, 4, 80.00, 'credit_card', 'completed');

-- Additional purchases:
INSERT INTO purchases (user_id, offering_id, payment_amount, payment_method, status)
VALUES 
  (7, 1, 100.00, 'paypal', 'completed'),
  (8, 2, 300.00, 'credit_card', 'completed'),
  (9, 3, 150.00, 'credit_card', 'completed'),
  (10, 4, 80.00, 'paypal', 'completed');


-- 9. Populate the Check-Ins Table
-- For each purchase, insert a check-in for every class session linked to that offering.
-- We simulate this by inserting check-in records using the session IDs from offering_sessions.

-- For Offering 1 (Beginner Salsa Package): sessions 1–5
INSERT INTO check_ins (student_id, class_session_id)
VALUES 
  -- Student 3 (Offering 1)
  (3, 1), (3, 2), (3, 3), (3, 4), (3, 5),
  -- Student 7 (Offering 1)
  (7, 1), (7, 2), (7, 3), (7, 4), (7, 5);

-- For Offering 2 (Team Package): sessions 1–17
INSERT INTO check_ins (student_id, class_session_id)
VALUES 
  -- Student 4 (Offering 2)
  (4, 1), (4, 2), (4, 3), (4, 4), (4, 5),
  (4, 6), (4, 7), (4, 8), (4, 9), (4, 10),
  (4, 11), (4, 12), (4, 13), (4, 14), (4, 15),
  (4, 16), (4, 17),
  -- Student 8 (Offering 2)
  (8, 1), (8, 2), (8, 3), (8, 4), (8, 5),
  (8, 6), (8, 7), (8, 8), (8, 9), (8, 10),
  (8, 11), (8, 12), (8, 13), (8, 14), (8, 15),
  (8, 16), (8, 17);

-- For Offering 3 (Intermediate Salsa Package): sessions 1–9
INSERT INTO check_ins (student_id, class_session_id)
VALUES 
  -- Student 5 (Offering 3)
  (5, 1), (5, 2), (5, 3), (5, 4), (5, 5),
  (5, 6), (5, 7), (5, 8), (5, 9),
  -- Student 9 (Offering 3)
  (9, 1), (9, 2), (9, 3), (9, 4), (9, 5),
  (9, 6), (9, 7), (9, 8), (9, 9);

-- For Offering 4 (4 Session Class Pack): sessions 10–13
INSERT INTO check_ins (student_id, class_session_id)
VALUES 
  -- Student 6 (Offering 4)
  (6, 10), (6, 11), (6, 12), (6, 13),
  -- Student 10 (Offering 4)
  (10, 10), (10, 11), (10, 12), (10, 13);
