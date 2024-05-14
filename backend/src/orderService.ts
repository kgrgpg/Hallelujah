import { producer } from './kafkaService';
import redis from './redisService';
import { query } from './databaseService';
import { from, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

interface Order {
  id: string;
  product: string;
  quantity: number;
  price: number;
  userId: string;
  type: string;
}

export const createOrder = (order: Order) => {
  const queryText = 'INSERT INTO orders(user_id, product, quantity, price, type) VALUES($1, $2, $3, $4, $5) RETURNING *';
  const values = [order.userId, order.product, order.quantity, order.price, order.type];
  return from(query(queryText, values)).pipe(
    map(response => {
      const newOrder = response.rows[0];
      // Send to Kafka
      producer.send({
        topic: 'orders',
        messages: [{ value: JSON.stringify(newOrder) }],
      });
      // Cache in Redis
      redis.set(`order:${newOrder.id}`, JSON.stringify(newOrder));
      return newOrder;
    }),
    catchError(err => {
      throw new Error('Failed to create order: ' + err.message);
    })
  );
};

export const fetchOrders = () => {
  return from(redis.get('orders')).pipe(
    switchMap(cacheResult => {
      if (cacheResult) {
        console.log('Orders fetched from Redis:', cacheResult);
        return of(JSON.parse(cacheResult));
      } else {
        console.log('Orders not found in Redis, fetching from database.');
        return from(query('SELECT * FROM orders')).pipe(
          map(dbRes => {
            const orders = dbRes.rows;
            redis.set('orders', JSON.stringify(orders));  // Cache the result
            return orders;
          }),
          catchError(dbErr => {
            throw new Error('Database fetch failed: ' + dbErr.message);
          })
        );
      }
    }),
    catchError(err => {
      console.error('Failed to retrieve from Redis or database:', err);
      throw new Error('Failed to fetch orders: ' + err.message);
    })
  );
};
