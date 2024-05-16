// src/app/components/OpenOrders.tsx

"use client";

import { useEffect, useState } from 'react';
import { fetchOpenOrders } from '../../services/api';
import { Subscription } from 'rxjs';

const OpenOrders = () => {
  const [openOrders, setOpenOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const subscription: Subscription = fetchOpenOrders().subscribe({
      next: (data) => setOpenOrders(data),
      error: (err) => setError(err.message),
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="open-orders">
      <h2>Open Orders</h2>
      {error && <p>Error: {error}</p>}
      <ul>
        {openOrders.map((order, index) => (
          <li key={index}>
            {order.product} - {order.size} @ {order.price} ({order.status})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OpenOrders;
