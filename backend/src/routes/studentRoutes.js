import express from 'express';
import { getStudentByID, getStudents } from '../controllers/studentController.js';


const router = express.Router();

router.get('/', getStudents);
router.get('/:id', getStudentByID);



export default router;