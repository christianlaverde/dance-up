/**
 * UserService
 *
 * This service encapsulates all business logic related to users.
 * It acts as a bridge between the controller layer and the data access layer (UserModel).
 * Each method here delegates data retrieval or manipulation tasks to the UserModel,
 * while also handling any business-specific rules or error conditions.
 * 
 */

import { UserModel } from "../models/userModel.js";
import { User } from "../domain/user.js";
import logger from '../utils/logger.js';

export class UserService {
  // Instance of UserModel used to interact with the database.
  private userModel: UserModel;

  /**
   * Constructor for UserService.
   * @param userModel - An instance of UserModel for data access operations.
   */
  constructor(userModel: UserModel) {
    this.userModel = userModel;
  }

  /**
   * Retrieve all users from the database.
   * @returns Promise that resolves to an array of User entities.
   */
  async getAllUsers(): Promise<User[]> {
    logger.debug('UserService.getAllUsers called');
    const users = await this.userModel.getAllUsers();
    logger.debug({ count: users.length }, 'UserService.getAllUsers completed');
    return users;
  }

  /**
   * Retrieve a single user by their unique identifier.
   * @param id - The unique ID of the user.
   * @returns Promise that resolves to a User entity if found, or null if no user
   *          exists with the given ID.
   */
  async getUserById(id: string): Promise<User | null> {
    logger.debug('UserService.getUserById called');
    const user = await this.userModel.getUserById(id);
    if (user) {
      logger.debug({ id }, 'UserService.getUserById found user');
    } else {
      logger.warn({ id }, 'UserService.getUserById did not find a user');
    }
    return user || null;
  }

  /**
   * Retrieve a single user by their email address.
   * @param email - The email address of the user.
   * @returns Promise that resolves to a User entity if found, or null if no user
   *          exists with the given email.
   */
  async getUserByEmail(email: string): Promise<User | null> {
    logger.debug('UserService.getUserByEmail called');
    const user = await this.userModel.getUserByEmail(email);
    if (user) {
      logger.debug({ email }, 'UserService.getUserByEmail found user');
    } else {
      logger.warn({ email }, 'UserService.getUserByEmail did not find a user');
    }
    return user || null;
  }

  /**
   * Create a new user with the provided details.
   * @param email - Email address of the new user.
   * @param password_hash - Hashed password.
   * @param first_name - User's first name.
   * @param middle_name - User's middle name.
   * @param last_name - User's last name.
   * @param role - User's role (e.g., admin, user, etc.).
   * @returns Promise that resolves to the newly created User entity.
   */
  async createUser(
    email: string,
    password_hash: string,
    first_name: string,
    middle_name: string,
    last_name: string,
    role: string,
  ): Promise<User | null> {
    logger.debug('UserService.createUser called');
    // Delegates the task of inserting a new user to the UserModel.
    const newUser = await this.userModel.insertUser(
      email,
      password_hash,
      first_name,
      middle_name,
      last_name,
      role,
    );
    if (newUser) {
      logger.debug({ email }, 'UserService.createUser successfully created user');
    } else {
      logger.warn({ email }, 'UserService.createUser failed to create user');
    }
    return newUser || null;
  }
}
