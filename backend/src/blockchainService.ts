import { ethers } from 'ethers';
import contractABI from './contractABI.json';
import { from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new ethers.Contract(contractAddress, contractABI, provider);

export const fetchOrderData = () => {
  return from(contract.getOrders()).pipe(
    map(data => {
      console.log('Orders fetched from blockchain:', data);
      return data;
    }),
    catchError(err => {
      throw new Error('Blockchain fetch failed: ' + err.message);
    })
  );
};
