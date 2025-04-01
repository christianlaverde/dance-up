import passport from 'passport';
import bcrypt from 'bcrypt';
import type { Request, Response, NextFunction } from 'express';
import { User } from '../entities/user.js';
import { UserService } from '../services/userService.js';

export class AuthController {
  constructor(private userService: UserService) {
    this.userService = userService;
  }

  loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Wrap passport.authenticate in a promise
      const { user, info } = await new Promise<{ user: User | null, info?: any }>((resolve, reject) => {
        passport.authenticate('local', (err: any, user: User, info: any) => {
          if (err) {
            return reject(err);
          }
          return resolve({user: user || null, info});
        })(req, res, next);
      });
  
      if (!user) {
        res.status(400).json({message: info.message});
        return;
      }
  
      // Wrap req.login in a promise
      await new Promise<void>((resolve, reject) => {
        req.login(user, (loginErr) => {
          if (loginErr) {
            return reject(loginErr);
          }
          resolve();
        });
      });
  
      res.status(200).json({message: 'Login successful', user: user});
      return;
    } catch (err) {
      return next(err);
    }
  }
  
  registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password, first_name, middle_name, last_name, role } = req.body;
    const saltRounds = 10;
  
    try {
      // Check if user already exists
      const existingUser = await this.userService.getUserByEmail(email);
      if (existingUser) {
        res.status(400).json({message: 'User already exists'});
        return;
      }
      // Hash password and create new user
      const password_hash = await bcrypt.hash(password, saltRounds);
      const newUser: User | null = await this.userService.createUser(email, password_hash, first_name, middle_name, last_name, role);
  
      if (newUser) {
        await new Promise<void>((resolve, reject) => {
          req.login(newUser, (err) => {
            if (err) {
              return reject(err);
            }
            resolve();
          });
        });
  
      } else {
        throw new Error('Error creating new user');
      }
  
      // Return successful response
      res.status(201).json({message: 'Registration successful', user: newUser});
      return;
    } catch(err: any) {
      return next(err);
    }
  }

}