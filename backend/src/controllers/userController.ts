/**
 * UserController
 *
 * This controller handles HTTP requests related to users.
 * It leverages a UserService instance to perform business logic,
 * and it returns appropriate HTTP responses.
 *
 * We use arrow functions for controller methods to preserve the correct
 * `this` context when they are passed as callbacks to Express routes.
 * Without arrow functions, the context of `this` might be lost, leading to
 * errors when accessing instance properties (like `this.userService`).
 * 
 */

import type { Request, Response } from 'express';
import { UserService } from '../services/UserService.js';
import logger from "../utils/logger.js";

export class UserController {
  // Instance of UserService injected via the constructor.
  private userService: UserService;

  /**
   * Constructs a new UserController.
   * @param userService - An instance of UserService for handling user logic.
   */
  constructor(userService: UserService) {
    this.userService = userService;
  }

  /**
   * Handler for retrieving all users.
   * Sends a 200 response with the list of users or a 500 error if something goes wrong.
   *
   * @param req - Express Request object.
   * @param res - Express Response object.
   */
  getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (err) {
      logger.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  }

  /**
   * Handler for retrieving a single user by ID.
   * If the user exists, sends a 200 response with the user data.
   * If not, sends a 404 response indicating the user was not found.
   *
   * @param req - Express Request object with a parameter `id`.
   * @param res - Express Response object.
   */
  getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const user = await this.userService.getUserById(id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (err) {
      logger.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  };

  /**
   * Handler for retrieving a single user by email.
   * If the user exists, sends a 200 response with the user data.
   * If not, sends a 404 response indicating the user was not found.
   *
   * @param req - Express Request object with a parameter `email`.
   * @param res - Express Response object.
   */
  getUserByEmail = async (req: Request, res: Response): Promise<void> => {
    try {
      const email = req.params.email;
      const user = await this.userService.getUserByEmail(email);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (err) {
      logger.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  }
}