import { Pool } from 'pg';
import { from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables from .env file

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432', 10),
});

export const query = (text: string, params?: any[]) => {
  return from(pool.query(text, params)).pipe(
    catchError(err => {
      throw new Error('Database query failed: ' + err.message);
    })
  );
};
