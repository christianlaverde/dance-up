-- ======================================================
-- Updated Database Schema for Studio Manager Application
-- =====================================================

-- 1. Create ENUM Types

-- User roles: for all users (students, admins, etc.)
CREATE TYPE user_role AS ENUM ('admin', 'student', 'instructor');

-- Class category: distinguishes a class type as either part of a structured course or an open (drop-in) class.
CREATE TYPE class_category AS ENUM ('course', 'open');

-- Offering type: distinguishes between offerings that enroll a user in an entire course versus a class pack (fixed number of passes).
CREATE TYPE offering_type AS ENUM ('course', 'class_pack');


-- Create Studios Table
-- Stores all Studio records.
CREATE TABLE studios (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    street_address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(50) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL,
	-- TODO: Add Rooms Table
    number_of_rooms INT NOT NULL,
    phone VARCHAR(50),
    email VARCHAR(100),
    website VARCHAR(255),
    owner_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES users(id)
);


-- 2. Create Users Table
-- Stores all user records.
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  middle_name VARCHAR(255),
  last_name VARCHAR(255) NOT NULL,
  role user_role NOT NULL DEFAULT 'student',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- 3. Create Class Types Table
-- Defines generic details about each type of class.
-- The 'class_category' field distinguishes whether a class type is part of a course or is an open class.
CREATE TABLE class_types (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  duration INT, -- Duration in minutes
  class_category class_category NOT NULL,  -- 'course' or 'open'
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- 4. Create Class Sessions Table
-- Represents specific scheduled instances of a class.
CREATE TABLE class_sessions (
  id SERIAL PRIMARY KEY,
  class_type_id INT NOT NULL,
  scheduled_at TIMESTAMP NOT NULL,
  capacity INT NOT NULL,
  instructor_id INT,  -- References a user (instructor)
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (class_type_id) REFERENCES class_types(id),
  FOREIGN KEY (instructor_id) REFERENCES users(id)
);


-- 5. Create Offerings Table
-- Describes the purchase options available to students.
-- 'course' offerings enroll a student in all sessions of the linked course(s);
-- 'class_pack' offerings provide a fixed number of passes for open classes.
CREATE TABLE offerings (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  offering_type offering_type NOT NULL,  -- 'course' or 'class_pack'
  price DECIMAL(10,2) NOT NULL,
  classes_included INT,      -- For class packs (number of passes)
  course_start_date DATE,    -- Optional: for course offerings (display purposes)
  course_end_date DATE,      -- Optional: for course offerings (display purposes)
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- 6. Create Offering_Class_Types Table
-- Links an offering to one or more class types.
-- This high-level association implies that all sessions from the linked class types are part of the offering.
CREATE TABLE offering_class_types (
  id SERIAL PRIMARY KEY,
  offering_id INT NOT NULL,
  class_type_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (offering_id) REFERENCES offerings(id),
  FOREIGN KEY (class_type_id) REFERENCES class_types(id)
);


-- 7. Create Offering_Sessions Table
-- Provides a granular association between an offering and specific class sessions.
-- This table allows an admin to override the automatic inclusion provided by offering_class_types.
CREATE TABLE offering_sessions (
  id SERIAL PRIMARY KEY,
  offering_id INT NOT NULL,
  class_session_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (offering_id) REFERENCES offerings(id),
  FOREIGN KEY (class_session_id) REFERENCES class_sessions(id)
);


-- 8. Create Purchases Table
-- Records when a student purchases an offering.
CREATE TABLE purchases (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  offering_id INT NOT NULL,
  purchase_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  payment_amount DECIMAL(10,2) NOT NULL,
  payment_method VARCHAR(100),
  status VARCHAR(50) DEFAULT 'completed',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (offering_id) REFERENCES offerings(id)
);


-- 9. Create Check-Ins Table
-- Logs when a student checks in for a class session (e.g., via QR code).
CREATE TABLE check_ins (
  id SERIAL PRIMARY KEY,
  student_id INT NOT NULL,
  class_session_id INT NOT NULL,
  checkin_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES users(id),
  FOREIGN KEY (class_session_id) REFERENCES class_sessions(id),
  UNIQUE (student_id, class_session_id)  -- Ensures a student can check in only once per session
);
