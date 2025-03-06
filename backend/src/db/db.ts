import type { QueryConfig, QueryResult, QueryResultRow, QueryConfigValues } from 'pg';
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool();

export const query = async <R extends QueryResultRow = any, I = any[]>(
    queryTextOrConfig: string | QueryConfig<I>,
    values?: QueryConfigValues<I>,
): Promise<QueryResult<R>> => {
    return pool.query<R, I>(queryTextOrConfig, values);
}
