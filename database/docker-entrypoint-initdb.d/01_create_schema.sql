-- ======================================================
-- Master Database Schema
-- =====================================================

-- 1. Create ENUM Types (must be created before using them in tables)

-- User roles: for all users (students, admins, etc.)
CREATE TYPE user_role AS ENUM ('admin', 'student');


-- 2. Create Users Table
-- Stores all user records.
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE CHECK (email <> ''), -- Ensures email is not empty
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  middle_name VARCHAR(255),
  last_name VARCHAR(255) NOT NULL,
  role user_role NOT NULL DEFAULT 'student',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create a Trigger to Auto-Update 'updated_at'
-- Ensures 'updated_at' is updated whenever a row is modified
CREATE FUNCTION trigger_update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION trigger_update_timestamp();

