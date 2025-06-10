-- Seed data for dance_up database
-- This script creates sample data for testing and development

-- Insert 10 users: 2 owners, 2 instructors, 6 members
INSERT INTO users (email, password_hash, first_name, middle_name, last_name, addr1, city, state, zip, role) VALUES
-- Owners (2)
('sarah.dance@email.com', '$2b$12$LQv3c1yqBwlVHpPqr5ceQuNmKoKTxOOOT8VJr6vBAHkv/DJOyTI3O', 'Sarah', 'Michelle', 'Johnson', '123 Dance Street', 'Los Angeles', 'CA', '90210', 'owner'),
('michael.studio@email.com', '$2b$12$LQv3c1yqBwlVHpPqr5ceQuNmKoKTxOOOT8VJr6vBAHkv/DJOyTI3O', 'Michael', 'Anthony', 'Rodriguez', '456 Broadway Ave', 'New York', 'NY', '10001', 'owner'),

-- Instructors (2)
('emma.ballet@email.com', '$2b$12$LQv3c1yqBwlVHpPqr5ceQuNmKoKTxOOOT8VJr6vBAHkv/DJOyTI3O', 'Emma', 'Grace', 'Thompson', '789 Elm Street', 'Los Angeles', 'CA', '90211', 'instructor'),
('carlos.hip@email.com', '$2b$12$LQv3c1yqBwlVHpPqr5ceQuNmKoKTxOOOT8VJr6vBAHkv/DJOyTI3O', 'Carlos', 'Antonio', 'Martinez', '321 Fifth Ave', 'New York', 'NY', '10002', 'instructor'),

-- Members (6)
('jessica.student@email.com', '$2b$12$LQv3c1yqBwlVHpPqr5ceQuNmKoKTxOOOT8VJr6vBAHkv/DJOyTI3O', 'Jessica', 'Marie', 'Davis', '654 Oak Lane', 'Los Angeles', 'CA', '90212', 'member'),
('david.dancer@email.com', '$2b$12$LQv3c1yqBwlVHpPqr5ceQuNmKoKTxOOOT8VJr6vBAHkv/DJOyTI3O', 'David', 'James', 'Wilson', '987 Pine Street', 'New York', 'NY', '10003', 'member'),
('amanda.moves@email.com', '$2b$12$LQv3c1yqBwlVHpPqr5ceQuNmKoKTxOOOT8VJr6vBAHkv/DJOyTI3O', 'Amanda', 'Rose', 'Brown', '147 Maple Drive', 'Los Angeles', 'CA', '90213', 'member'),
('ryan.rhythm@email.com', '$2b$12$LQv3c1yqBwlVHpPqr5ceQuNmKoKTxOOOT8VJr6vBAHkv/DJOyTI3O', 'Ryan', 'Christopher', 'Taylor', '258 Cedar Ave', 'New York', 'NY', '10004', 'member'),
('lily.leap@email.com', '$2b$12$LQv3c1yqBwlVHpPqr5ceQuNmKoKTxOOOT8VJr6vBAHkv/DJOyTI3O', 'Lily', 'Nicole', 'Anderson', '369 Birch Road', 'Los Angeles', 'CA', '90214', 'member'),
('kevin.groove@email.com', '$2b$12$LQv3c1yqBwlVHpPqr5ceQuNmKoKTxOOOT8VJr6vBAHkv/DJOyTI3O', 'Kevin', 'Michael', 'Garcia', '741 Spruce Lane', 'New York', 'NY', '10005', 'member');

-- Insert 2 studios (one for each owner)
-- We'll use subqueries to get the owner IDs by email
INSERT INTO studios (owner_id, name, addr1, city, state, zip) VALUES
((SELECT id FROM users WHERE email = 'sarah.dance@email.com'), 'Sunset Dance Academy', '123 Dance Street', 'Los Angeles', 'CA', '90210'),
((SELECT id FROM users WHERE email = 'michael.studio@email.com'), 'Broadway Movement Studio', '456 Broadway Ave', 'New York', 'NY', '10001');

-- Insert studio memberships
-- Sunset Dance Academy (LA) members
INSERT INTO studio_members (studio_id, user_id) VALUES
-- Owner Sarah is automatically a member
((SELECT id FROM studios WHERE name = 'Sunset Dance Academy'), (SELECT id FROM users WHERE email = 'sarah.dance@email.com')),
-- Instructor Emma
((SELECT id FROM studios WHERE name = 'Sunset Dance Academy'), (SELECT id FROM users WHERE email = 'emma.ballet@email.com')),
-- LA Members
((SELECT id FROM studios WHERE name = 'Sunset Dance Academy'), (SELECT id FROM users WHERE email = 'jessica.student@email.com')),
((SELECT id FROM studios WHERE name = 'Sunset Dance Academy'), (SELECT id FROM users WHERE email = 'amanda.moves@email.com')),
((SELECT id FROM studios WHERE name = 'Sunset Dance Academy'), (SELECT id FROM users WHERE email = 'lily.leap@email.com')),

-- Broadway Movement Studio (NY) members
-- Owner Michael is automatically a member
((SELECT id FROM studios WHERE name = 'Broadway Movement Studio'), (SELECT id FROM users WHERE email = 'michael.studio@email.com')),
-- Instructor Carlos
((SELECT id FROM studios WHERE name = 'Broadway Movement Studio'), (SELECT id FROM users WHERE email = 'carlos.hip@email.com')),
-- NY Members
((SELECT id FROM studios WHERE name = 'Broadway Movement Studio'), (SELECT id FROM users WHERE email = 'david.dancer@email.com')),
((SELECT id FROM studios WHERE name = 'Broadway Movement Studio'), (SELECT id FROM users WHERE email = 'ryan.rhythm@email.com')),
((SELECT id FROM studios WHERE name = 'Broadway Movement Studio'), (SELECT id FROM users WHERE email = 'kevin.groove@email.com'));

-- Insert sample classes
INSERT INTO classes (studio_id, instructor_id, name, description, genre, day, start_time, end_time, capacity) VALUES
-- Sunset Dance Academy Classes (LA) - Emma teaching
((SELECT id FROM studios WHERE name = 'Sunset Dance Academy'), (SELECT id FROM users WHERE email = 'emma.ballet@email.com'), 'Beginner Ballet', 'Perfect for those new to ballet. Learn basic positions and movements.', 'Ballet', 1, '18:00:00', '19:00:00', 15),
((SELECT id FROM studios WHERE name = 'Sunset Dance Academy'), (SELECT id FROM users WHERE email = 'emma.ballet@email.com'), 'Intermediate Ballet', 'Build on your ballet foundation with more complex combinations.', 'Ballet', 3, '19:30:00', '20:30:00', 12),
((SELECT id FROM studios WHERE name = 'Sunset Dance Academy'), (SELECT id FROM users WHERE email = 'emma.ballet@email.com'), 'Ballet Technique', 'Focus on perfecting your technique and artistry.', 'Ballet', 6, '10:00:00', '11:30:00', 10),

-- Broadway Movement Studio Classes (NY) - Carlos teaching
((SELECT id FROM studios WHERE name = 'Broadway Movement Studio'), (SELECT id FROM users WHERE email = 'carlos.hip@email.com'), 'Hip Hop Fundamentals', 'Learn the basics of hip hop dance and culture.', 'Hip Hop', 2, '19:00:00', '20:00:00', 20),
((SELECT id FROM studios WHERE name = 'Broadway Movement Studio'), (SELECT id FROM users WHERE email = 'carlos.hip@email.com'), 'Advanced Hip Hop', 'High-energy class for experienced hip hop dancers.', 'Hip Hop', 4, '20:30:00', '21:30:00', 15),
((SELECT id FROM studios WHERE name = 'Broadway Movement Studio'), (SELECT id FROM users WHERE email = 'carlos.hip@email.com'), 'Freestyle Friday', 'Open freestyle session with battles and cyphers.', 'Hip Hop', 5, '21:00:00', '22:30:00', 25);

