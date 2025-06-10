import pg from 'pg';
import { Studio } from '../domain/studio.js';
import { Class } from '../domain/class.js';
import { IStudioRepository } from "./iStudioRepository.js";

const { Pool } = pg;

export class PgStudioRepository implements IStudioRepository {
  private pool: pg.Pool;

  constructor() {
    this.pool = new Pool();
  }

  async getAllStudios(): Promise<Studio[]> {
    const queryText = `
      SELECT id, owner_id, studio_name, address
      FROM studios
    `;
    const query = { text: queryText };
    const result = await this.pool.query(query);
    return result.rows.map(
      (row) => new Studio(row.id, row.owner_id, row.studio_name, row.address)
    );
  }

  async getAllStudiosWithClasses(): Promise<Studio[]> {
    const studios = await this.getAllStudios();
    const queryText =`
      SELECT id, studio_id, class_name, class_description
      FROM classes
      WHERE studio_id = $1;
    `;
    await Promise.all(studios.map(async (studio) => {
      const studioId = studio.getId();
      const query = {
        text: queryText,
        values: [studioId]
      };
      const result = await this.pool.query(query);
      result.rows.forEach((row) => {
        const cls = new Class(row.id, row.studio_id, row.class_name, row.class_description, 0);
        studio.addClass(cls);
      });
    }));
    return studios;
  }

  async getStudioById(id: string): Promise<Studio | null> {
    const queryText = `
    SELECT id, owner_id, studio_name, address
    FROM studios
    WHERE id = $1
    `;
    const query = {
      text: queryText,
      values: [id],
    };

    const result = await this.pool.query(query);
    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];
    return new Studio(row.id, row.owner_id, row.studio_name, row.addClass);
  }

  /*
  async getStudioWithClassesById(studioId: string): Promise<Studio> {
    
  }
  */

  async saveStudio(studio: Studio): Promise<void> {
    const queryText = `
      INSERT INTO studios (id, owner_id, studio_name, address)
      VALUES ($1, $2, $3, $4)
    `;
    const query = {
      text: queryText,
      values: [studio.getId(), studio.getOwnerId(), studio.getStudioName(), studio.getAddress()]
    };

    await this.pool.query(query);
  }
}