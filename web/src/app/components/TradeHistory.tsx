"use client";

import { useEffect, useState } from 'react';
import { fetchTradeHistory } from '../../services/api';
import { Subscription } from 'rxjs';

const TradeHistory = () => {
  const [tradeHistory, setTradeHistory] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const subscription: Subscription = fetchTradeHistory().subscribe({
      next: (data) => {
        if (Array.isArray(data)) {
          setTradeHistory(data);
        } else {
          setError('Invalid trade history data');
        }
      },
      error: (err) => {
        console.error('Failed to fetch trade history:', err.message);
        setError('Failed to fetch trade history');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="trade-history">
      <h2>Trade History</h2>
      {error && <p>{error}</p>}
      <ul>
        {tradeHistory.map((trade, index) => (
          <li key={index}>
            {trade.size} @ {trade.price} ({trade.time})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TradeHistory;
