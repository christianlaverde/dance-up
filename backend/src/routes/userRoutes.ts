import express from 'express';
import { getUsers, getUserById } from '../controllers/userController.js';


const router = express.Router();

router.get('/:id', getUserById);
router.get('/', getUsers);


export default router;