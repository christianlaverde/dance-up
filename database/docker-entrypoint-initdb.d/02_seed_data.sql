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
