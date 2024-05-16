// src/services/api.ts

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

export const fetchMarketData = () => {
  return from(apiClient.get('/market')).pipe(
    map(response => response.data),
    catchError(error => {
      throw new Error('Failed to fetch market data: ' + error.message);
    })
  );
};

export const fetchOrderBook = () => {
  return from(apiClient.get('/orderbook')).pipe(
    map(response => response.data),
    catchError(error => {
      throw new Error('Failed to fetch order book: ' + error.message);
    })
  );
};

export const fetchTradeHistory = () => {
  return from(apiClient.get('/trades')).pipe(
    map(response => response.data),
    catchError(error => {
      throw new Error('Failed to fetch trade history: ' + error.message);
    })
  );
};

export const fetchPositions = () => {
  return from(apiClient.get('/positions')).pipe(
    map(response => {
      if (Array.isArray(response.data)) {
        return response.data;
      } else {
        throw new Error('Invalid response format');
      }
    }),
    catchError(error => {
      throw new Error('Failed to fetch positions: ' + error.message);
    })
  );
};

export const fetchOpenOrders = () => {
  return from(apiClient.get('/openorders')).pipe(
    map(response => response.data),
    catchError(error => {
      throw new Error('Failed to fetch open orders: ' + error.message);
    })
  );
};
