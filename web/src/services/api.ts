import axios from 'axios';
import { from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // Adjust the base URL as necessary
});

export const fetchOrders = () => {
  return from(apiClient.get('/orders')).pipe(
    map(response => response.data),
    catchError(error => {
      throw new Error('Failed to fetch orders: ' + error.message);
    })
  );
};

export const createOrder = (order: any) => {
  return from(apiClient.post('/orders', order)).pipe(
    map(response => response.data),
    catchError(error => {
      throw new Error('Failed to create order: ' + error.message);
    })
  );
};
