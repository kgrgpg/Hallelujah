// src/app/components/OrderForm.tsx

"use client";

import { useState } from 'react';
import { createOrder } from '../../services/api';
import { Subscription } from 'rxjs';

const OrderForm = () => {
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('buy');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const order = { price, amount, type };

    const subscription: Subscription = createOrder(order).subscribe({
      next: () => {
        setPrice('');
        setAmount('');
      },
      error: (err) => setError(err.message),
    });

    // Unsubscribe from the observable when the component unmounts
    return () => subscription.unsubscribe();
  };

  return (
    <div className="order-form">
      <h2>Place Order</h2>
      {error && <p>Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Price</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div>
          <label>Amount</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        </div>
        <div>
          <label>Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
        </div>
        <button type="submit">Submit Order</button>
      </form>
    </div>
  );
};

export default OrderForm;
