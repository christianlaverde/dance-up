import pg from 'pg';
import { Class } from '../domain/class.js';
import { IClassRepository } from "../repositories/iClassRepository.js";
import { CreateClassDto } from '../dto/CreateClassDto.js';

const { Pool } = pg;

export class PgClassRepository implements IClassRepository {
  private pool: pg.Pool;

  constructor() {
    this.pool = new Pool();
  }

  async getAllClasses(): Promise<Class[]> {
    const queryText = `
      SELECT id, studio_id, class_name, class_description
      FROM classes
    `;
    const query = { text: queryText };

    const result = await this.pool.query(query);
    return result.rows.map(
      (row) => new Class(row.id, row.studio_id, row.class_name, row.class_description, 0)
    );
  }

  async getClassesByStudioId(studioId: string): Promise<Class[]> {
    const queryText =`
      SELECT id, studio_id, class_name, class_description
      FROM classes
      WHERE studio_id = $1;
    `;
    const query = {
      text: queryText,
      values: [studioId]
    };

    const result = await this.pool.query(query);
    return result.rows.map(
      (row) => new Class(row.id, row.studio_id, row.class_name, row.class_description, 0)
    );
  }

  async getClassById(classId: string): Promise<Class | null> {
    const queryText = `
    SELECT id, studio_id, class_name, class_description
    FROM classes
    WHERE id = $1
    `;
    const query = {
      text: queryText,
      values: [classId],
    };

    const result = await this.pool.query(query);
    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];
    return new Class(row.id, row.studio_id, row.class_name, row.class_description, 0);
  }

  async createClass(createClassDto: CreateClassDto): Promise<Class> {
    const queryText = `
    INSERT INTO classes (studio_id, class_name, class_description)
    VALUES ($1, $2, $3, $4)
    RETURNING id, studio_id, class_name, class_description
    `;
    const query = {
      text: queryText,
      values: [
        createClassDto.studioId,
        createClassDto.className,
        createClassDto.classDescription
      ]
    };
    const result = await this.pool.query(query);
    const row = result.rows[0];
    return new Class(row.id, row.studio_id, row.class_name, row.class_description, 0);
  }
}