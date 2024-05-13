import express from 'express';
import { createOrder, fetchOrders } from './orderService';

const app = express();
app.use(express.json());

app.post('/orders', (req, res) => {
  createOrder(req.body).subscribe({
    next: order => res.status(201).json(order),
    error: err => res.status(500).json({ error: err.message })
  });
});

app.get('/orders', (req, res) => {
  fetchOrders().subscribe({
    next: orders => res.status(200).json(orders),
    error: err => res.status(500).json({ error: err.message })
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
