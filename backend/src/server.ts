import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { createOrder, fetchOrders } from './orderService';
import { initializeKafka } from './kafkaService';
import { initializeDatabase } from './databaseInit';

const app = express();
app.use(express.json());
app.use(cors());

const server = createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('WebSocket client connected');
});

const broadcastNewOrder = (order: any) => {
  wss.clients.forEach(client => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(order));
    }
  });
};

app.post('/orders', (req, res) => {
  console.log('Received new order:', req.body);
  createOrder(req.body).subscribe({
    next: order => {
      console.log('Order created:', order);
      res.status(201).json(order);
      broadcastNewOrder(order); // Broadcast the new order to WebSocket clients
    },
    error: (err: Error) => res.status(500).json({ error: err.message })
  });
});

app.get('/orders', (req, res) => {
  fetchOrders().subscribe({
    next: orders => res.status(200).json(orders),
    error: (err: Error) => res.status(500).json({ error: err.message })
  });
});

const startServer = () => {
  initializeDatabase().subscribe({
    next: () => {
      console.log('Database initialized successfully');
      initializeKafka().then(() => {
        const PORT = process.env.PORT || 3000;
        server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
      }).catch((err: Error) => console.error('Failed to initialize Kafka:', err));
    },
    error: (err: Error) => console.error('Failed to initialize database:', err)
  });
};

startServer();
