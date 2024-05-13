import { Pool } from 'pg';

const pool = new Pool({
  user: 'yourUsername',
  host: 'localhost',
  database: 'lob_exchange',
  password: 'yourPassword',
  port: 5432,
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
