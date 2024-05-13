import { producer } from './kafkaService';
import redis from './redisService';
import { query } from './databaseService';

interface Order {
  id: string;
  product: string;  // Assuming 'product' maps to 'type' in your DB, you might want to rename it for clarity
  quantity: number; // Assuming 'quantity' maps to 'amount' in your DB
  price: number;
  userId: string;   // Additional property to identify the user
  type: string;     // Additional property to describe the order type, if necessary
}

export const createOrder = async (order: Order) => {
  // Assuming 'product' maps to 'type' and 'quantity' maps to 'amount'
  const res = await query('INSERT INTO orders(user_id, amount, price, type) VALUES($1, $2, $3, $4) RETURNING *', [
      order.userId, order.quantity, order.price, order.product
  ]);
  const newOrder = res.rows[0];

  // Cache in Redis
  await redis.set(`order:${newOrder.id}`, JSON.stringify(newOrder));

  // Send to Kafka
  await producer.send({
      topic: 'orders',
      messages: [{ value: JSON.stringify(newOrder) }],
  });

  return newOrder;
};

export const fetchOrders = async () => {
  // Attempt to fetch from Redis first
  const cacheResult = await redis.get('orders');
  if (cacheResult) return JSON.parse(cacheResult);

  // If not in cache, fetch from database
  const dbResult = await query('SELECT * FROM orders');
  await redis.set('orders', JSON.stringify(dbResult.rows));  // Cache the result
  return dbResult.rows;
};
