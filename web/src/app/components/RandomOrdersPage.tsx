// src/app/components/RandomOrdersPage.tsx
'use client';

import { useEffect, useState } from 'react';
import { generateRandomOrder } from '../../services/orderGenerator';
import { from } from 'rxjs';
import axios from 'axios';
import { map, catchError } from 'rxjs/operators';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
});

const RandomOrdersPage: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [orders, setOrders] = useState([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000');
    ws.onmessage = (event) => {
      const newOrder = JSON.parse(event.data);
      setOrders((prevOrders) => [...prevOrders, newOrder]);
    };
    setSocket(ws);

    return () => ws.close();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGenerating) {
      interval = setInterval(() => {
        const order = generateRandomOrder();
        from(apiClient.post('/orders', order)).pipe(
          map(response => response.data),
          catchError(error => {
            console.error('Failed to create order:', error.message);
            return [];
          })
        ).subscribe();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const toggleGenerating = () => {
    setIsGenerating(!isGenerating);
  };

  return (
    <div>
      <h1>Random Orders</h1>
      <button onClick={toggleGenerating}>
        {isGenerating ? 'Stop Generating Orders' : 'Start Generating Orders'}
      </button>
      <ul>
        {orders.map((order: any, index: number) => (
          <li key={index}>
            {order.product} - {order.quantity} @ ${order.price} ({order.type})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RandomOrdersPage;
