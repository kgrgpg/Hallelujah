'use client';

import { useState, useEffect } from 'react';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { sendRandomOrder } from '../../utils/orderUtils';

const RandomOrders = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  useEffect(() => {
    if (isGenerating) {
      const sub = timer(0, 1000).pipe(
        switchMap(() => sendRandomOrder())
      ).subscribe({
        next: order => console.log('Order created:', order),
        error: err => console.error(err.message)
      });
      setSubscription(sub);
    } else if (subscription) {
      subscription.unsubscribe();
      setSubscription(null);
    }
  }, [isGenerating]);

  const handleButtonClick = () => {
    setIsGenerating(prev => !prev);
  };

  return (
    <div>
      <h1>Random Order Generator</h1>
      <button onClick={handleButtonClick}>
        {isGenerating ? 'Stop' : 'Start'} Generating Orders
      </button>
    </div>
  );
};

export default RandomOrders;
