/**
 * UserModel 
 * 
 * This model is responsible for all database operations related to the `users` table.
 * It uses a Database instance to execute SQL queries and returns User data.
 * 
 */

import type { QueryConfig } from 'pg';
import type { Database } from '../@types/db.js';
import type { User } from '../models/user.js';

export class UserModel {
  // Database instance used for executing queries.
  private db: Database;

  /**
   * Initializes the UserModel with a Database instance.
   * @param db - An instance of the Database class.
   */
  constructor(db: Database) {
    this.db = db;
  }

  /*==============================================
    Query Methods for Retrieving User Data
  ==============================================*/

  /**
   * Retrieves all users from the database.
   * @returns A promise that resolves to an array of User objects.
   */
  async getAllUsers(): Promise<User[]> {
    const queryText = `
      SELECT id, email, password_hash, first_name, last_name, role
      FROM users
    `;
    const query: QueryConfig = { text: queryText };

    // Execute the query and return the list of users.
    const result = await this.db.query(query);
    return result.rows;
  }

  /**
   * Retrieves a user by their unique ID.
   * @param id - The unique identifier of the user.
   * @returns A promise that resolves to a User object.
   */
  async getUserById(id: string): Promise<User | null> {
    const queryText = `
      SELECT id, email, password_hash, first_name, last_name, role
      FROM users
      WHERE id = $1
    `;
    const query: QueryConfig = {
      text: queryText,
      values: [id],
    };

    // Execute the query and return the first matching user.
    const result = await this.db.query(query);
    return result.rows[0] || null;
  }

  /**
   * Retrieves a user by their email address.
   * @param email - The email address of the user.
   * @returns A promise that resolves to a User object.
   */
  async getUserByEmail(email: string): Promise<User | null> {
    const queryText = `
      SELECT id, email, password_hash, first_name, last_name, role
      FROM users
      WHERE email = $1
    `;
    const query: QueryConfig = {
      text: queryText,
      values: [email],
    };

    // Execute the query and return the first matching user.
    const result = await this.db.query(query);
    return result.rows[0] || null;
  }

  /*==============================================
    Query Method for Inserting New User Data
  ==============================================*/

  /**
   * Inserts a new user into the database.
   * @param email - The user's email address.
   * @param password_hash - The hashed password for the user.
   * @param first_name - The user's first name.
   * @param middle_name - The user's middle name.
   * @param last_name - The user's last name.
   * @param role - The user's role.
   * @returns A promise that resolves to the newly created User object.
   */
  async insertUser(
    email: string,
    password_hash: string,
    first_name: string,
    middle_name: string,
    last_name: string,
    role: string,
  ): Promise<User | null> {
    const queryText = `
      INSERT INTO users (email, password_hash, first_name, middle_name, last_name, role)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, email, password_hash, first_name, middle_name, last_name, role
    `;
    const query: QueryConfig = {
      text: queryText,
      values: [email, password_hash, first_name, middle_name, last_name, role],
    };

    // Execute the query and return the newly inserted user.
    const result = await this.db.query(query);
    return result.rows[0] || null;
  }
}
