import type { QueryConfig } from 'pg';
import * as db from '../db/db.js';

// Get All Students
export const getAllUsers = async () => {
  const query: QueryConfig = {
    text: "SELECT id, email, first_name, last_name FROM users",
  };
  const result = await db.query(query);
  return result.rows;
};

// Get Students By ID
export const getUserById = async (id: number) => {
  const query: QueryConfig = {
    text: "SELECT (id, email, first_name, last_name) FROM users WHERE id = $1",
    values: [id],
  }
  const result = await db.query(query);
  return result.rows;
};