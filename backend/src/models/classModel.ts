/**
 * ClassModel 
 * 
 * This model is responsible for all database operations related to the `classes` table.
 * It uses a Database instance to execute SQL queries and returns User data.
 * 
 */

import type { QueryConfig } from 'pg';
import type { Database } from '../@types/db.js';
import type { Class } from '../entities/class.js';

export class ClassModel {
  // Database instance used for executing queries.
  private db: Database;

  /**
  * Initializes the ClassModel with a Database instance.
  * @param db - An instance of the Database class.
  */
  constructor(db: Database) {
    this.db = db;
  }

  /**
   * Retrieves all users from the database.
   * @returns A promise that resolves to an array of User objects.
   */
  async getAllClasses(): Promise<Class[]> {
    const queryText = `
      SELECT id, studio_id, class_name, class_description
      FROM users
    `;
    const query: QueryConfig = { text: queryText };

    // Execute the query and return the list of users.
    const result = await this.db.query(query);
    return result.rows;
  }
}