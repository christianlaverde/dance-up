/**
 * StudioModel
 * 
 * This model is responsible for all database operations related to the `studio` and `studio_members` table.
 * It uses a Database instance to execute SQL queries and returns Studio data.
 * 
 */

import type { QueryConfig } from 'pg';
import type { Database } from '../@types/db.js';
import type { Studio } from './studio.js';
import type { User } from './user.js';

export class StudioModel {
  // Database instance used for executing queries.
  private db: Database;

  /**
   * Initializes the StudioModel with a Database instance.
   * @param db - An instance of the Database class.
   */
  constructor(db: Database) {
    this.db = db;
  }

  /*==============================================
    Query Methods for Retrieving Studio Data
  ==============================================*/

  /**
   * Retrieves all studios from the database.
   * @returns A promise that resolves to an array of Studio objects.
   */
    async getAllStudios(): Promise<Studio[]> {
      const queryText = `
        SELECT id, owner_id, studio_name, address
        FROM studios
      `;
      const query: QueryConfig = { text: queryText };
  
      // Execute the query and return the list of studios.
      const result = await this.db.query(query);
      return result.rows;
    }

  /**
   * Retrieves all studio members from the database given a studio id.
   * @param studioId - The id of the studio.
   * @returns A promise that resolves to an array of Studio objects.
   */
  async getAllStudioMembers(studioId: string): Promise<User[]> {
    const queryText = `
      SELECT 
        u.id AS user_id,
        u.email,
        u.first_name,
        u.middle_name,
        u.last_name,
        u.role,
        s.studio_name
      FROM studio_members sm
      JOIN users u ON sm.user_id = u.id
      JOIN studios s ON sm.studio_id = s.id
      WHERE sm.studio_id = $1;
    `;
    const query: QueryConfig = { text: queryText, values: [studioId] };

    // Execute the query and return the list of studio members.
    const result = await this.db.query(query);
    return result.rows;
  }

  /**
   * Adds an existing user to a studio given a user id and studio id.
   * @param studioId - the id of the studio.
   * @param userId - the id of the user.
   * @returns A promise that resolves to the added user id.
   */
    async insertStudioMember(studioId: string, userId: string): Promise<{user_id: string}> {
      const queryText = `
        INSERT INTO studio_members (studio_id, user_id)
        VALUES ($1, $2)
        RETURNING user_id
      `;
      const query: QueryConfig = { text: queryText, values: [studioId, userId] };

      // Execute the query and return the user id.
      const result = await this.db.query(query);
      return result.rows[0];
    }
}
