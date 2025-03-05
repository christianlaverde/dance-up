import * as db from '../db/db.js';

export const getStudents = async (req, res) => {
  try {
    const result = await db.query(`SELECT * FROM users WHERE role = 'student'`);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).send('Server Error')
  }
};

export const getStudentByID = async (req, res) => {
  try {
    console.log(req);
    const result = await db.query(`SELECT * FROM users WHERE role = 'student' and id = ${req.params.id}`);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).send('Server Error')
  }
};
