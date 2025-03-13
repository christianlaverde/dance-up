import type { Request, Response } from 'express';
import { 
  getAllUsers, 
  getUserById as getUserByIdService 
} from '../services/userService.js';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send('Server Error')
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const user = await getUserByIdService(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send('Server Error')
  }
};
