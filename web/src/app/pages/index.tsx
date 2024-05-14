import { useEffect, useState } from 'react';
import { fetchOrders } from '../../services/api';
import { Subscription } from 'rxjs';

const Home = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const subscription: Subscription = fetchOrders().subscribe({
      next: (data) => setOrders(data),
      error: (err) => setError(err.message),
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div>
      <h1>Order Book</h1>
      {error && <p>Error: {error}</p>}
      <ul>
        {orders.map((order: any) => (
          <li key={order.id}>
            {order.product} - {order.quantity} @ ${order.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
