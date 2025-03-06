import type { QueryConfig } from 'pg';
import * as db from '../db/db.js';

// Get All Students
export const getAllStudents = async () => {
  const query: QueryConfig = {
    text: "SELECT * FROM users WHERE role = 'student'",
  };
  const result = await db.query(query);
  return result.rows;
};

// Get Students By ID
export const getStudentByID = async (id: number) => {
  const query: QueryConfig = {
    text: "SELECT * FROM users WHERE role = 'student' and id = $1",
    values: [id],
  }
  const result = await db.query(query);
  return result.rows;
};