import * as db from '../db/db.js';
import { 
  getAllStudents, 
  getStudentByID as getStudentsByIDService 
} from '../services/studentService.js';

export const getStudents = async (req, res) => {
  try {
    const result = await getAllStudents();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send('Server Error')
  }
};

export const getStudentByID = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getStudentsByIDService(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send('Server Error')
  }
};
