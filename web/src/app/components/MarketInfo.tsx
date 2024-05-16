// src/app/components/MarketInfo.tsx

"use client";

import { useEffect, useState } from 'react';
import { fetchMarketData } from '../../services/api';
import { Subscription } from 'rxjs';

const MarketInfo = () => {
  const [marketData, setMarketData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const subscription: Subscription = fetchMarketData().subscribe({
      next: (data) => setMarketData(data),
      error: (err) => setError(err.message),
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!marketData) return <div>Loading...</div>;

  return (
    <div className="market-info">
      <h2>{marketData.pair}</h2>
      <p>Price: {marketData.price}</p>
      <p>24h Change: {marketData.change}</p>
      <p>Volume: {marketData.volume}</p>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default MarketInfo;
