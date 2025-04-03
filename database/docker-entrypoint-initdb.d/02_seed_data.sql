-- Begin transaction to ensure all inserts succeed or fail together
BEGIN;

-----------------------------
-- 1. Insert Users
-----------------------------
-- Insert 2 owners and 8 members (total 10 users).
-- Note: The SERIAL primary key will auto-assign ids.
INSERT INTO users (email, password_hash, first_name, middle_name, last_name, role)
VALUES
  -- Owners
  ('owner1@example.com', 'hashed_password1', 'Alice', 'Owner', 'Smith', 'owner'),
  ('owner2@example.com', 'hashed_password2', 'Bob', NULL, 'Johnson', 'owner'),
  
  -- Members
  ('member1@example.com', 'hashed_password3', 'Charlie', NULL, 'Brown', 'member'),
  ('member2@example.com', 'hashed_password4', 'Dana', NULL, 'White', 'member'),
  ('member3@example.com', 'hashed_password5', 'Eli', NULL, 'Green', 'member'),
  ('member4@example.com', 'hashed_password6', 'Fiona', NULL, 'Black', 'member'),
  ('member5@example.com', 'hashed_password7', 'George', NULL, 'Blue', 'member'),
  ('member6@example.com', 'hashed_password8', 'Hannah', NULL, 'Gray', 'member'),
  ('member7@example.com', 'hashed_password9', 'Ivan', NULL, 'Red', 'member'),
  ('member8@example.com', 'hashed_password10', 'Julia', NULL, 'Yellow', 'member');

-----------------------------
-- 2. Insert Studios
-----------------------------
-- Assuming the first two inserted users (id=1 and id=2) are the owners.
INSERT INTO studios (owner_id, studio_name, address)
VALUES
  (1, 'Studio One', '123 Main Street'),
  (2, 'Studio Two', '456 Broadway');

-----------------------------
-- 3. Associate Members with Studios
-----------------------------
-- In this example:
--   * 5 members will be linked to Studio One.
--   * 3 members will be linked to Studio Two.
-- Since owners have ids 1 and 2, members will have ids 3 through 10.
INSERT INTO studio_members (studio_id, user_id)
VALUES
  -- Studio One gets 5 members: users with id 3, 4, 5, 6, 7
  (1, 3),
  (1, 4),
  (1, 5),
  (1, 6),
  (1, 7),
  
  -- Studio Two gets 3 members: users with id 8, 9, 10
  (2, 8),
  (2, 9),
  (2, 10);

-- Commit the transaction
COMMIT;

-----------------------------
-- 2. Insert Classes
-----------------------------
-- Assuming the first two inserted users (id=1 and id=2) are the owners.
INSERT INTO classes (studio_id, class_name, class_description)
VALUES
  (1, 'Beginner Salsa', 'A fun salsa class for beginners'),
  (1, 'Intermediate Salsa', 'A fun salsa class for intermediates'),
  (1, 'Advanced Salsa', 'A tough salsa class for experts'),
  (2, 'Jazz', 'A fun jazz class'),
  (2, 'Ballet', 'A fun ballet class');

-- Commit the transaction
COMMIT;