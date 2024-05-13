import { ethers } from 'ethers';
import contractABI from './contractABI.json';

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const contractAddress = process.env.CONTRACT_ADDRESS;

const contract = new ethers.Contract(contractAddress, contractABI, provider);

export const fetchOrderData = async () => {
  const data = await contract.getOrders();
  console.log('Orders fetched from blockchain:', data);
  // Convert and handle blockchain data as needed
};
