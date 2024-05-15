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
    switchMap(response => {
      const newOrder = response.rows[0];
      // Send to Kafka
      producer.send({
        topic: 'orders',
        messages: [{ value: JSON.stringify(newOrder) }],
      });
      // Cache in Redis
      return redis.get('orders').pipe(
        switchMap(ordersCache => {
          let orders = [];
          if (ordersCache) {
            try {
              orders = JSON.parse(ordersCache);
            } catch (err) {
              console.error('Failed to parse existing orders JSON:', err);
              return redis.del('orders').pipe(map(() => [newOrder]));
            }
          }
          orders.push(newOrder);
          return redis.set('orders', JSON.stringify(orders)).pipe(
            map(() => newOrder)
          );
        })
      );
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
        try {
          const orders = JSON.parse(cacheResult);
          console.log('Orders fetched from Redis:', orders);
          return of(orders);
        } catch (err) {
          console.error('Invalid JSON in Redis, clearing cache:', cacheResult);
          return redis.del('orders').pipe(
            switchMap(() => fetchOrdersFromDB())
          );
        }
      } else {
        console.log('Orders not found in Redis, fetching from database.');
        return fetchOrdersFromDB();
      }
    }),
    catchError(err => {
      console.error('Failed to retrieve from Redis or database:', err);
      throw new Error('Failed to fetch orders: ' + err.message);
    })
  );
};

const fetchOrdersFromDB = () => {
  return from(query('SELECT * FROM orders')).pipe(
    switchMap(dbRes => {
      const orders = dbRes.rows;
      return redis.set('orders', JSON.stringify(orders)).pipe(
        map(() => orders)
      );
    }),
    catchError(dbErr => {
      throw new Error('Database fetch failed: ' + dbErr.message);
    })
  );
};
