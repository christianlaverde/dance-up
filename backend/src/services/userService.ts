import type { QueryConfig } from 'pg';
import * as db from '../db/db.js';
import * as UserModel from '../models/userModel.js';
import { User } from '../models/User.entity.js'

// Get All Students
export const getAllUsers = async (): Promise<User[]> => {
  const users = await UserModel.getAllUsers();
  return users;
};

// Get Student By ID
export const getUserById = async (id: string): Promise<User> => {
  const user = await UserModel.getUserById(id);
  if (!user) {
    throw new Error('User Not Found');
  }
  return user;
};

// Get Student By Email
export const getUserByEmail = async (email: string): Promise<User> => {
  const user = await UserModel.getUserByEmail(email);
  if (!user) {
    throw new Error('User Not Found');
  }
  return user
};

// Create new User
export const createUser = async (
  email: string, 
  password_hash: string,
  first_name: string, 
  middle_name: string, 
  last_name: string, 
  role: string,
): Promise<User | null> => {
  const newUser = UserModel.createUser(email, password_hash, first_name, middle_name, last_name, role);
  return newUser;
};