// IUserRepository.ts

import { User } from "../entities/User.js";

/**
 * IUserRepository defines the contract for a User repository,
 * encapsulating all persistence operations for the User aggregate.
 */
export interface IUserRepository {
  /**
   * Retrieves all users from the persistence store.
   */
  findAll(): Promise<User[]>;

  /**
   * Retrieves a single user by its unique identifier.
   * @param id - The unique identifier of the user.
   */
  findById(id: string): Promise<User | null>;

  /**
   * Retrieves a single user by its email.
   * @param email - The email address of the user.
   */
  findByEmail(email: string): Promise<User | null>;

  /**
   * Persists a new User entity in the database.
   * @param user - The User domain entity to create.
   */
  createUser(user: User): Promise<User>;
}