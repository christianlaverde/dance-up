-- ======================================================
-- Master Database Schema
-- =====================================================

-- CREATE DATABASE danceup;

CREATE TYPE user_role AS ENUM ('owner', 'member', 'instructor');

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  middle_name VARCHAR(100),
  last_name VARCHAR(100) NOT NULL,
  addr1 VARCHAR(200),
  addr2 VARCHAR(200),
  city VARCHAR(100),
  state VARCHAR(50),
  zip VARCHAR(20),
  role user_role NOT NULL DEFAULT 'member',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE studios (
  id SERIAL PRIMARY KEY,
  owner_id INTEGER NOT NULL,
  name VARCHAR(100) NOT NULL,
  addr1 VARCHAR(200),
  addr2 VARCHAR(200),
  city VARCHAR(100),
  state VARCHAR(50),
  zip VARCHAR(20),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_studios_owner FOREIGN KEY(owner_id) REFERENCES users(id)
);

CREATE TABLE studio_members (
  studio_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  joined_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (studio_id, user_id),
  CONSTRAINT fk_studio_members_studio
    FOREIGN KEY (studio_id)
      REFERENCES studios(id)
      ON DELETE CASCADE,
  CONSTRAINT fk_studio_members_user
    FOREIGN KEY (user_id)
      REFERENCES users(id)
      ON DELETE CASCADE
);

CREATE TABLE classes (
  id SERIAL PRIMARY KEY,
  studio_id INTEGER NOT NULL,
  instructor_id INTEGER NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  genre VARCHAR(35),
  day INTEGER NOT NULL CHECK (day >= 1 and day <= 7),
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  capacity INTEGER CHECK (capacity > 0),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_classes_studio FOREIGN KEY(studio_id) REFERENCES studios(id),
  CONSTRAINT fk_classes_instructor FOREIGN key(instructor_id) REFERENCES users(id),
  CONSTRAINT valid_time_range CHECK (end_time > start_time),
  CONSTRAINT instructor_is_studio_member
    FOREIGN KEY (studio_id, instructor_id)
    REFERENCES studio_members(studio_id, user_id)
);

CREATE FUNCTION trigger_update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
--
CREATE TRIGGER update_users_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION trigger_update_timestamp();

CREATE TRIGGER update_studio_timestamp
BEFORE UPDATE ON studios
FOR EACH ROW
EXECUTE FUNCTION trigger_update_timestamp();

CREATE TRIGGER update_classes_timestamp
BEFORE UPDATE ON classes
FOR EACH ROW
EXECUTE FUNCTION trigger_update_timestamp();

