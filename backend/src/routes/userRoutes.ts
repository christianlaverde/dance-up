import express from 'express';
import { getUsers, getUserById, getUserByEmail } from '../controllers/userController.js';


const router = express.Router();

router.get('/', getUsers);
router.get('/email/:email', getUserByEmail);
router.get('/:id', getUserById);

export default router;
