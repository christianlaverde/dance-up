/**
 * UserModel 
 * 
 * This model is responsible for all database operations related to the `users` table.
 * It uses a Database instance to execute SQL queries and returns User data.
 * 
 */

import type { QueryConfig } from 'pg';
import type { Database } from '../@types/db.js';
import { User } from '../entities/user.js';
import logger from '../utils/logger.js';

export class UserModel {
  // Database instance used for executing queries.
  private db: Database;

  /**
   * Initializes the UserModel with a Database instance.
   * @param { Database } db - An instance of the Database class.
   */
  constructor(db: Database) {
    this.db = db;
  }

  /*==============================================
    Query Methods for Retrieving User Data
  ==============================================*/

  /**
   * Retrieves all user records from the database.
   *
   * Executes a SQL query to fetch all users and logs the query execution details.
   *
   * @returns {Promise<User[]>} A promise that resolves to an array of User objects.
   * @throws {Error} Will throw an error if the database query fails.
   */
  async getAllUsers(): Promise<User[]> {
    const queryText = `
      SELECT id, email, password_hash, first_name, last_name, role
      FROM users
    `;
    const query: QueryConfig = { text: queryText };

    logger.debug({ query: queryText }, 'Executing getAllUsers query');
    try {
      // Execute the query and return the list of users.
      const result = await this.db.query(query);
      logger.debug({ rowCount: result.rows.length }, 'getAllUsers query executed');
      return result.rows;
    } catch (error: any) {
      logger.error({ error }, 'Error executing getAllUsers query');
      throw error;
    }
  }

  /**
   * Retrieves a user record by its unique identifier.
   *
   * Executes a SQL query to fetch the user matching the provided ID and logs the operation.
   *
   * @param {string} id - The unique identifier of the user.
   * @returns {Promise<User | null>} A promise that resolves to a User object if found, or null if no matching record exists.
   * @throws {Error} Will throw an error if the database query fails.
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

    logger.debug({ query: queryText }, 'Executing getUserById query');
    try {
      // Execute the query and return the first matching user.
      const result = await this.db.query(query);
      logger.debug({ rowCount: result.rows.length, id: id }, 'getUserById query executed');
      return result.rows[0] || null;
    } catch (error: any) {
      logger.error({ error, id }, 'Error executing getUsersById query');
      throw error;
    }
  }

  /**
   * Retrieves a user record by email address.
   *
   * Executes a SQL query to fetch the user matching the provided email and logs the operation.
   *
   * @param {string} email - The email address of the user.
   * @returns {Promise<User | null>} A promise that resolves to a User object if found, or null if no matching record exists.
   * @throws {Error} Will throw an error if the database query fails.
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

    logger.debug({ query: queryText }, 'Executing getUserByEmail query');
    try {
      // Execute the query and return the first matching user.
      const result = await this.db.query(query);
      logger.debug({ rowCount: result.rows.length, email: email }, 'getUserByEmail query executed');
      return result.rows[0] || null;
    } catch (error: any) {
      logger.error({ error, email }, 'Error executing getUserByEmail query');
      throw error;
    }
  }

  /*==============================================
    Query Method for Inserting New User Data
  ==============================================*/

  /**
   * Inserts a new user record into the database.
   *
   * Executes a SQL INSERT statement with the provided user details, and logs the execution.
   *
   * @param {string} email - The email address of the new user.
   * @param {string} password_hash - The hashed password for the new user.
   * @param {string} first_name - The first name of the new user.
   * @param {string} middle_name - The middle name of the new user.
   * @param {string} last_name - The last name of the new user.
   * @param {string} role - The role assigned to the new user.
   * @returns {Promise<User | null>} A promise that resolves to the newly created User object if insertion was successful, or null otherwise.
   * @throws {Error} Will throw an error if the database insertion fails.
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

    logger.debug(
      { query: queryText, values: { email, first_name, middle_name, last_name, role } },
      'Executing insertUser query'
    );
    try {
      // Execute the query and return the newly inserted user.
      const result = await this.db.query(query);
      logger.debug({ rowCount: result.rows.length }, 'insertUser query executed');
      return result.rows[0] || null;
    } catch (error: any) {
      logger.error(
        { error: error, values: { email, first_name, middle_name, last_name, role }},
        'Error executing insertUser query'
      );
      throw error;
    }

  }
}
