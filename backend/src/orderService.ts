import { producer } from './kafkaService';
import redis from './redisService';
import { query } from './databaseService';
import { from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

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
    catchError(err => {
      console.error('Failed to retrieve from Redis:', err);
      return from(query('SELECT * FROM orders')).pipe(
        map(dbRes => dbRes.rows),
        catchError(dbErr => {
          throw new Error('Database fetch failed: ' + dbErr.message);
        })
      );
    })
  );
};
