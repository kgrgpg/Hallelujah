import { v4 as uuidv4 } from 'uuid';

interface Order {
  id: string;
  product: string;
  quantity: number;
  price: number;
  userId: string;
  type: string;
}

const products = ['BTC', 'ETH', 'LTC', 'XRP', 'BCH'];
const orderTypes = ['buy', 'sell'];

export const generateRandomOrder = (): Order => {
  const product = products[Math.floor(Math.random() * products.length)];
  const quantity = Math.floor(Math.random() * 10) + 1; // Random quantity between 1 and 10
  const price = parseFloat((Math.random() * 10000).toFixed(2)); // Random price between 0 and 10000
  const userId = `user${Math.floor(Math.random() * 1000)}`; // Random user ID between 0 and 999
  const type = orderTypes[Math.floor(Math.random() * orderTypes.length)];

  return {
    id: uuidv4(),
    product,
    quantity,
    price,
    userId,
    type,
  };
};
