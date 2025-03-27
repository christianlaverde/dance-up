export interface Database {
  query: (query: QueryConfig) => Promise<{ rows: any[] }>;
}