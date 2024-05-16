import { query } from './databaseService';
import { from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const createTables = () => {
  const createOrdersTable = `
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      product VARCHAR(255) NOT NULL,
      quantity NUMERIC NOT NULL,
      price NUMERIC NOT NULL,
      type VARCHAR(255) NOT NULL
    );
  `;

  return from(query(createOrdersTable)).pipe(
    map(() => 'Orders table created successfully'),
    catchError((err: any) => {
      throw new Error('Failed to create tables: ' + err.message);
    })
  );
};

export const initializeDatabase = () => {
  return createTables();
};
