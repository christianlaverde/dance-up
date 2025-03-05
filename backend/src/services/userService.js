import * as db from '../db/db.js';

// Get All Users
export const getAllUsers = async () => {
  const result = await db.query(`SELECT * FROM users`);
  return result.rows;
};