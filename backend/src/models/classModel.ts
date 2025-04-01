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

}