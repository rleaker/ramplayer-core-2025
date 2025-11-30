import express from 'express';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

const server = app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

const io = new Server(server, { cors: { origin: '*' } });

// Health endpoint with status
app.get('/health', (req, res) => {
  const status = Math.random() > 0.5 ? '🟢 Stable' : '🔥 Quench Alert'; // Mock for demo
  res.json({
    quench_status: status,
    weight_reduction: `${Math.floor(Math.random() * 20) + 70}%`,
    timestamp: new Date().toISOString(),
  });
});

// Sandbox ramp endpoint (mock CAD/crypto swap)
app.post('/ramp', async (req, res) => {
  const { amountCAD, direction } = req.body; // 'on' = fiat to crypto, 'off' = crypto to fiat

  // Mock Stripe charge for demo
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountCAD * 100, // cents
    currency: 'cad',
    metadata: { direction },
  });

  // Log to Supabase (sandbox table)
  const { data, error } = await supabase
    .from('transactions')
    .insert([{ amount: amountCAD, direction, stripe_id: paymentIntent.id }]);

  if (error) return res.status(500).json({ error });

  // Emit real-time update
  io.emit('ramp_update', { success: true, txId: paymentIntent.id, amount: amountCAD });

  res.json({ success: true, txId: paymentIntent.id, estimatedCrypto: amountCAD * 0.0004 }); // Mock BTC equiv
});

// WebSocket for live updates
io.on('connection', (socket) => {
  socket.emit('welcome', { message: 'Connected to RampLayer – Ready to swap!' });
  socket.on('disconnect', () => console.log('Client disconnected'));
});
