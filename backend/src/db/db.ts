// Import necessary classes and types from 'pg'
import pg, {
  type QueryConfig,
  type QueryResult,
  type QueryResultRow,
  type QueryConfigValues,
} from 'pg';
const { Pool } = pg;

/**
 * Database class encapsulates a PostgreSQL connection pool.
 * It provides a simple query method to execute queries against the database.
 */
export class Database {
    private pool: pg.Pool;
  
    constructor() {
      // Initialize the connection pool
      this.pool = new Pool();
    }
  
    /**
     * Executes a database query using the underlying connection pool.
     *
     * @param queryTextOrConfig - The query string or configuration object.
     * @param values - Optional array of query parameter values.
     * @returns A promise that resolves to the query result.
     */
    public async query<R extends QueryResultRow = any, I extends any[] = any[]>(
      queryTextOrConfig: string | QueryConfig<I>,
      values?: QueryConfigValues<I>
    ): Promise<QueryResult<R>> {
      return this.pool.query<R, I>(queryTextOrConfig, values);
    }
  }