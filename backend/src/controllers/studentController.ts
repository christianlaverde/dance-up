import type { Request, Response } from 'express';
import { 
  getAllStudents, 
  getStudentByID as getStudentsByIDService 
} from '../services/studentService.js';

export const getStudents = async (req: Request, res: Response) => {
  try {
    const result = await getAllStudents();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send('Server Error')
  }
};

export const getStudentByID = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const result = await getStudentsByIDService(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send('Server Error')
  }
};
