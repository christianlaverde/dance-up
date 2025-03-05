import * as db from '../db/db.js';

// Get All Students
export const getAllStudents = async () => {
  console.log('in all');
  const result = await db.query(`SELECT * FROM users WHERE role = 'student'`);
  return result.rows;
};

// Get Students By ID
export const getStudentByID = async (id) => {
  console.log('in id');
  const result = await db.query(`SELECT * FROM users WHERE role = 'student' and id = ${id}`);
  return result.rows;
};