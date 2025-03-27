import { UserModel } from "../models/UserModel.js";
import { User } from "../models/User.entity.js";
import * as db from '../db/db.js';

const userModel = new UserModel(db);

// Get All Students
export const getAllUsers = async (): Promise<User[]> => {
  const users = await userModel.getAllUsers();
  return users;
};

// Get Student By ID
export const getUserById = async (id: string): Promise<User> => {
  const user = await userModel.getUserById(id);
  if (!user) {
    throw new Error('User Not Found');
  }
  return user;
};

// Get Student By Email
export const getUserByEmail = async (email: string): Promise<User> => {
  const user = await userModel.getUserByEmail(email);
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
): Promise<User> => {
  const newUser = userModel.insertUser(email, password_hash, first_name, middle_name, last_name, role);
  return newUser;
};
