// src/app/components/Header.tsx

"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import '../globals.css';

const Header = () => {
  const [balance, setBalance] = useState<number | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBalance = () => {
      return from(fetch('/api/balance')).pipe(
        map(response => response.json()),
        catchError(error => {
          throw new Error('Failed to fetch balance: ' + error.message);
        })
      );
    };

    const subscription = fetchBalance().subscribe({
      next: (data) => setBalance(data.balance),
      error: (err) => setError(err.message),
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <header className="header">
      <div className="logo">
        <Link href="/">My Exchange</Link>
      </div>
      <nav className="nav">
        <ul>
          <li><Link href="/home">Home</Link></li>
          <li><Link href="/trading">Trading</Link></li>
          <li><Link href="/random-orders">Random Orders</Link></li>
          <li><Link href="/order-book">Order Book</Link></li>
        </ul>
      </nav>
      <div className="user-info">
        {/* <span>Balance: ${balance !== null ? balance.toFixed(2) : 'Loading...'}</span> */}
        <button>Login</button>
        <button>Logout</button>
      </div>
      {error && <p>Error: {error}</p>}
    </header>
  );
};

export default Header;
