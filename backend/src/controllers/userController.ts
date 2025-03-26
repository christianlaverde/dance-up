import type { Request, Response } from 'express';
import * as UserService from '../services/userService.js';
import logger from "../utils/logger.js";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    logger.error(err);
    res.status(500).json({message: 'Server Error'});
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const user = await UserService.getUserById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({message: 'User not found'});
    }
    
  } catch (err) {
    logger.error(err);
    res.status(500).json({message: 'Server Error'});
  }
};

export const getUserByEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const email = req.params.email;
    const user = await UserService.getUserByEmail(email);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({message: 'User not found'});
    }

  } catch (err) {
    logger.error(err);
    res.status(500).json({message: 'Server Error'});
  }
}

export const createUser = async (req: Request, res: Response): Promise<void> => {
  console.log('GET /users/register');
  try {

  } catch (err) {
    logger.error(err);
    res.status(500).json({message: 'Server Error'});
  }
}
