-- ======================================================
-- Master Database Schema
-- =====================================================

-- CREATE DATABASE dance_up;

CREATE TYPE user_role AS ENUM ('owner', 'member');

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL,
  name VARCHAR(100) NOT NULL,
  addr1 VARCHAR(200),
  addr2 VARCHAR(200),
  city VARCHAR(100),
  state VARCHAR(50),
  zip VARCHAR(20),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_owner FOREIGN KEY(owner_id) REFERENCES users(id)
);

CREATE TABLE classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id UUID NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  genre VARCHAR(35),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  days INTEGER[] CHECK (
    array_length(days, 1) >= 1
    AND days <@ ARRAY[1,2,3,4,5,6,7]
  ),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_studio FOREIGN KEY(studio_id) REFERENCES studios(id),
  CONSTRAINT valid_time_range CHECK (end_time > start_time)
);


-- 4. Create Studio Members Join Table
-- Many-To-Many
-- One User may be a member of many Studios
-- One Studio may have many members
-- CREATE TABLE studio_members (
--   studio_id INTEGER NOT NULL,
--   user_id INTEGER NOT NULL,
--   joined_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
--   PRIMARY KEY (studio_id, user_id),
--   CONSTRAINT fk_studio
--     FOREIGN KEY (studio_id)
--       REFERENCES studios(id)
--       ON DELETE CASCADE,
--   CONSTRAINT fk_user
--     FOREIGN KEY (user_id)
--       REFERENCES users(id)
--       ON DELETE CASCADE
-- );

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

CREATE TRIGGER update_users_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION trigger_update_timestamp();

