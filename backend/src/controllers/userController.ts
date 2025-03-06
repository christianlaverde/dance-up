import type { Request, Response } from 'express';
import { getAllUsers } from '../services/userService.js';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await getAllUsers();
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};