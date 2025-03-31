-- ======================================================
-- Master Database Schema
-- =====================================================

-- Create Database
-- CREATE DATABASE dance_up;

-- 1. Create ENUM Types (must be created before using them in tables)

-- User roles: for all users (students, admins, etc.)
CREATE TYPE user_role AS ENUM ('owner', 'member');

-- 2. Create Users Table
-- Stores all user records.
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE CHECK (email <> ''), -- Ensures email is not empty
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  middle_name VARCHAR(255),
  last_name VARCHAR(255) NOT NULL,
  role user_role NOT NULL DEFAULT 'member',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create Studios Table
-- Stores all studio records.
CREATE TABLE studios (
  id SERIAL PRIMARY KEY,
  owner_id INTEGER NOT NULL,
  studio_name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_owner
    FOREIGN KEY(owner_id) 
      REFERENCES users(id)
      ON DELETE CASCADE
);

-- 4. Create Studio Members Join Table
-- Many-To-Many
-- One User may be a member of many Studios
-- One Studio may have many members
CREATE TABLE studio_members (
  studio_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  joined_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (studio_id, user_id),
  CONSTRAINT fk_studio
    FOREIGN KEY (studio_id)
      REFERENCES studios(id)
      ON DELETE CASCADE,
  CONSTRAINT fk_user
    FOREIGN KEY (user_id)
      REFERENCES users(id)
      ON DELETE CASCADE
);

-- 5. Create a Trigger to Auto-Update 'updated_at'
-- Ensures 'updated_at' is updated whenever a row is modified
CREATE FUNCTION trigger_update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION trigger_update_timestamp();

CREATE TRIGGER update_studio_timestamp
BEFORE UPDATE ON studios
FOR EACH ROW
EXECUTE FUNCTION trigger_update_timestamp();

