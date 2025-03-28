// PgUserRepository.ts

import { IUserRepository } from "./IUserRepository.js";
import { User } from "../entities/User.js";
import type { Database } from "../../@types/db.d.js";

export class PgUserRepository implements IUserRepository {
  private db: Database;

  /**
   * Constructs a new PgUserRepository with a Database instance.
   * @param db - A database instance for executing queries.
   */
  constructor(db: Database) {
    this.db = db;
  }

  /**
   * Retrieves all users from the database.
   */
  async findAll(): Promise<User[]> {
    const queryText = `
      SELECT id, email, password_hash, first_name, middle_name, last_name, role
      FROM users
    `;
    const result = await this.db.query({ text: queryText });
    return result.rows.map((row: any) =>
      new User({
        id: row.id,
        email: row.email,
        passwordHash: row.password_hash,
        firstName: row.first_name,
        middleName: row.middle_name,
        lastName: row.last_name,
        role: row.role,
      })
    );
  }

  /**
   * Retrieves a user by its unique identifier.
   * @param id - The unique identifier of the user.
   */
  async findById(id: string): Promise<User | null> {
    const queryText = `
      SELECT id, email, password_hash, first_name, middle_name, last_name, role
      FROM users
      WHERE id = $1
    `;
    const result = await this.db.query({ text: queryText, values: [id] });
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return new User({
      id: row.id,
      email: row.email,
      passwordHash: row.password_hash,
      firstName: row.first_name,
      middleName: row.middle_name,
      lastName: row.last_name,
      role: row.role,
    });
  }

  /**
   * Retrieves a user by its email address.
   * @param email - The email address of the user.
   */
  async findByEmail(email: string): Promise<User | null> {
    const queryText = `
      SELECT id, email, password_hash, first_name, middle_name, last_name, role
      FROM users
      WHERE email = $1
    `;
    const result = await this.db.query({ text: queryText, values: [email] });
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return new User({
      id: row.id,
      email: row.email,
      passwordHash: row.password_hash,
      firstName: row.first_name,
      middleName: row.middle_name,
      lastName: row.last_name,
      role: row.role,
    });
  }

  /**
   * Persists a new User entity in the database.
   * @param user - The User domain entity to create.
   */
  async createUser(user: User): Promise<User> {
    const queryText = `
      INSERT INTO users (email, password_hash, first_name, middle_name, last_name, role)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, email, password_hash, first_name, middle_name, last_name, role
    `;
    const result = await this.db.query({
      text: queryText,
      values: [
        user.getEmail(),
        user.getPasswordHash(),
        user.getFirstName(),
        user.getMiddleName(),
        user.getLastName(),
        user.getRole(),
      ],
    });
    const row = result.rows[0];
    return new User({
      id: row.id,
      email: row.email,
      passwordHash: row.password_hash,
      firstName: row.first_name,
      middleName: row.middle_name,
      lastName: row.last_name,
      role: row.role,
    });
  }
}