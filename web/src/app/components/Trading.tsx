// src/app/components/Trading.tsx

import OrderBook from './OrderBook';
import TradeHistory from './TradeHistory';
import OrderForm from './OrderForm';
import Positions from './Positions';
import OpenOrders from './OpenOrders';
import MarketInfo from './MarketInfo';

const Trading = () => {
  return (
    <div className="trading-page">
      <div className="market-info">
        <MarketInfo />
      </div>
      <div className="main-content">
        <div className="order-book-section">
          <OrderBook />
        </div>
        <div className="order-form-section">
          <OrderForm />
        </div>
        <div className="trade-history-section">
          <TradeHistory />
        </div>
        <div className="positions-section">
          <Positions />
        </div>
        <div className="open-orders-section">
          <OpenOrders />
        </div>
      </div>
    </div>
  );
};

export default Trading;
