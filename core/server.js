import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());
// ROOT + HEALTH – makes the domain instantly useful
app.get('/', (req, res) => {
  res.send(`
    <h1>SPLAT CORE LIVE</h1>
    <p>Backend running. Apaylo balance: <b>50,000 CAD</b></p>
    <p><a href="/health">/health</a> • <a href="/quotes">/quotes</a></p>
    <pre>USDC • USDT • BTC real-time middleware</pre>
  `)
})

app.get('/health', (req, res) => {
  res.json({
    status: "SPLAT CORE LIVE",
    apaylo_balance: `${apayloBalance.toLocaleString()} CAD`,
    uptime: process.uptime().toFixed(0) + "s",
    timestamp: new Date().toISOString()
  })
})
// Mock data
let apayloBalance = 50000; // CAD
const approvedWallets = {
  "0x71C7656EC7ab88b098defB751B7401B5f6d8976F": { token: "USDC", approved: true },
  "0x71C7656EC7ab88b098defB751B7401B5f6d8976F": { token: "USDT", approved: true },
  "0x17a9e2919d12e9d1d2c9f9d8d8e9f8e9f8e9f8e9": { token: "BTC", approved: true }
};

const quotes = {
  "newton": { USDC: 1.378, USDT: 1.376, BTC: 145000 },
  "virgocx": { USDC: 1.381, USDT: 1.379, BTC: 145500 },
  "bitbuy": { USDC: 1.379, USDT: 1.377, BTC: 145200 }
};

app.get('/health', (req, res) => res.json({ status: "SPLAT CORE LIVE", apaylo: apayloBalance + " CAD" }));

app.get('/quotes', (req, res) => res.json({ quotes, timestamp: Date.now() }));

app.post('/transaction', (req, res) => {
  const { amount, token, exchange, direction } = req.body;
  const fee = amount * 0.001; // 10 bps
  apayloBalance += direction === 'sell' ? amount : -amount - fee;

  const fakeHash = "0x" + Math.random().toString(16).substr(2, 64);
  io.emit('tx-update', { hash: fakeHash, confirmations: 12, status: "confirmed" });

  res.json({ success: true, hash: fakeHash, fee, newBalance: apayloBalance });
});

io.on('connection', (socket) => {
  console.log('Client connected');
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`SPLAT CORE running on port ${PORT}`);
});
