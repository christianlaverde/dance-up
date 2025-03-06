import express from 'express';
import { getStudentByID, getStudents } from '../controllers/studentController.js';


const router = express.Router();

router.get('/:id', getStudentByID);
router.get('/', getStudents);


export default router;