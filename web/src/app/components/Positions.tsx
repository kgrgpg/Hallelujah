// src/app/components/Positions.tsx
"use client";

import { useEffect, useState } from 'react';
import { fetchPositions } from '../../services/api';
import { Subscription } from 'rxjs';

const Positions = () => {
  const [positions, setPositions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const subscription: Subscription = fetchPositions().subscribe({
      next: (data) => {
        if (Array.isArray(data)) {
          setPositions(data);
        } else {
          setError('Invalid positions data');
        }
      },
      error: (err) => setError(err.message),
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="positions">
      <h2>Positions</h2>
      {error && <p>Error: {error}</p>}
      <ul>
        {positions.map((position, index) => (
          <li key={index}>
            {position.product} - {position.size} @ {position.entryPrice} ({position.unrealizedPnl})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Positions;
