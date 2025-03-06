import type { QueryConfig } from 'pg';
import * as db from '../db/db.js';

// Get All Users
export const getAllUsers = async () => {
  const query: QueryConfig = {
    text: 'SELECT * FROM users',
  };
  const result = await db.query(query);
  return result.rows;
};