import { Pool } from 'pg';
import { from } from 'rxjs';
import { catchError } from 'rxjs/operators';

const pool = new Pool({
  user: 'yourUsername',
  host: 'localhost',
  database: 'lob_exchange',
  password: 'yourPassword',
  port: 5432,
});

export const query = (text: string, params?: any[]) => {
  return from(pool.query(text, params)).pipe(
    catchError(err => {
      throw new Error('Database query failed: ' + err.message);
    })
  );
};
