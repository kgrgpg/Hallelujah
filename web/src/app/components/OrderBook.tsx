// src/app/components/OrderBook.tsx

"use client";

import { useEffect, useState } from 'react';
import { fetchOrders } from '../../services/api';
import { Subscription } from 'rxjs';

const OrderBook = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const subscription: Subscription = fetchOrders().subscribe({
      next: (data) => setOrders(data),
      error: (err) => setError(err.message),
    });

    return () => subscription.unsubscribe();
  }, []);

  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return price.toFixed(2);
    }
    return price;
  };

  return (
    <div className="order-book">
      <h1>Order Book</h1>
      {error && <p>Error: {error}</p>}
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: any) => (
            <tr key={order.id}>
              <td>{order.product}</td>
              <td>{order.quantity}</td>
              <td>${formatPrice(order.price)}</td>
              <td>{order.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderBook;
