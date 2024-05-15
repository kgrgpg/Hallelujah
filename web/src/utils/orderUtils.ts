import axios from 'axios';
import { of, from, timer } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

const products = ['BTC', 'ETH', 'LTC'];
const types = ['buy', 'sell'];

export const generateRandomOrder = () => {
  const product = products[Math.floor(Math.random() * products.length)];
  const type = types[Math.floor(Math.random() * types.length)];
  const quantity = Math.floor(Math.random() * 10) + 1; // Random quantity between 1 and 10
  const price = Math.floor(Math.random() * 10000) + 1000; // Random price between 1000 and 10000

  return {
    product,
    type,
    quantity,
    price,
  };
};

export const sendRandomOrder = () => {
  const order = generateRandomOrder();
  return from(axios.post('http://localhost:3000/orders', order)).pipe(
    map(response => response.data),
    catchError(error => {
      throw new Error('Failed to create order: ' + error.message);
    })
  );
};
