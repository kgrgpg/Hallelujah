// src/app/components/OrderBook.tsx
"use client";

import { useEffect, useState } from 'react';
import { fetchOrders } from '../../services/api';
import { Subscription } from 'rxjs';

interface Order {
  id: string;
  user_id: string;
  product: string;
  quantity: number;
  price: number;
  type: string;
}

const OrderBook: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string>('');
  const [filter, setFilter] = useState<string>('all');
  const [sortKey, setSortKey] = useState<string>('price');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const subscription: Subscription = fetchOrders().subscribe({
      next: (data: Order[]) => setOrders(data),
      error: (err: Error) => setError(err.message),
    });

    return () => subscription.unsubscribe();
  }, []);

  const filteredOrders = orders.filter(order => 
    filter === 'all' ? true : order.type === filter
  );

  const sortedOrders = filteredOrders.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortKey] > b[sortKey] ? 1 : -1;
    } else {
      return a[sortKey] < b[sortKey] ? 1 : -1;
    }
  });

  return (
    <div>
      <h1>Order Book</h1>
      {error && <p>Error: {error}</p>}

      <div>
        <label>
          Filter:
          <select value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
        </label>
        <label>
          Sort By:
          <select value={sortKey} onChange={e => setSortKey(e.target.value)}>
            <option value="price">Price</option>
            <option value="quantity">Quantity</option>
          </select>
        </label>
        <label>
          Order:
          <select value={sortOrder} onChange={e => setSortOrder(e.target.value as 'asc' | 'desc')}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>

      <ul>
        {sortedOrders.map(order => (
          <li key={order.id}>
            {order.product} - {order.quantity} @ ${order.price} ({order.type})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderBook;
