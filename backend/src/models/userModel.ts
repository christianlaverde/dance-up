import type { QueryConfig } from 'pg';
import { Database } from '../db/index.js';
import { User } from './User.entity.js'

export class UserModel {
  constructor(private db: Database) {
    this.db = db;
  };

  // Get All Users
  async getAllUsers(): Promise<User[]> {
    const queryText = `SELECT id, email, password_hash, first_name, last_name, role FROM users`;
    const query: QueryConfig = {
      text: queryText,
    };
    const result = await this.db.query(query);
    return result.rows;
  };

  // Get User By ID
  async getUserById(id: string): Promise<User>  {
    const queryText = `SELECT id, email, password_hash, first_name, last_name, role FROM users WHERE id = $1`;
    const query: QueryConfig = {
      text: queryText,
      values: [id],
    }
    const result = await this.db.query(query);
    return result.rows[0];
  };
  // Get User By Email
  async getUserByEmail(email: string): Promise<User> {
    const queryText = `SELECT id, email, password_hash, first_name, last_name, role FROM users WHERE email = $1`;
    const query: QueryConfig = {
      text: queryText,
      values: [email],
    }
    const result = await this.db.query(query);
    return result.rows[0];
  };

  // Insert new User
  async insertUser(
    email: string, 
    password_hash: string,
    first_name: string, 
    middle_name: string, 
    last_name: string, 
    role: string,
  ): Promise<User> {
      const queryText = `
        INSERT INTO users (email, password_hash, first_name, middle_name, last_name, role)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, email, password_hash, first_name, middle_name, last_name, role
      `;
      const query: QueryConfig = {
        text: queryText,
        values: [
          email, password_hash, first_name, middle_name, last_name, role
        ]
      };
      const result = await this.db.query(query);
      return result.rows[0];
  };
}