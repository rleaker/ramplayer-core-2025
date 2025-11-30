import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001'; // Swap with Railway URL later

function App() {
  const [amountCAD, setAmountCAD] = useState(100);
  const [direction, setDirection] = useState('on');
  const [status, setStatus] = useState('🟢 Ready');
  const [txId, setTxId] = useState('');

  const socket = io(BACKEND_URL);

  useEffect(() => {
    socket.on('ramp_update', (data) => {
      setStatus(data.success ? '✅ Complete!' : '❌ Error');
      if (data.txId) setTxId(data.txId);
    });
    return () => socket.disconnect();
  }, [socket]);

  const handleRamp = async () => {
    try {
      setStatus('⏳ Processing...');
      const res = await axios.post(`${BACKEND_URL}/ramp`, { amountCAD, direction });
      setStatus('✅ Simulated Success!');
      setTxId(res.data.txId);
    } catch (err) {
      setStatus('❌ Failed – Check Console');
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '300px' }}>
      <h3>RampLayer – Instant CAD ↔ Crypto</h3>
      <label>Amount CAD: </label>
      <input
        type="number"
        value={amountCAD}
        onChange={(e) => setAmountCAD(Number(e.target.value))}
        style={{ width: '100px' }}
      />
      <br />
      <label>
        <input
          type="radio"
          value="on"
          checked={direction === 'on'}
          onChange={(e) => setDirection(e.target.value)}
        />
        Fiat to Crypto
      </label>
      <br />
      <label>
        <input
          type="radio"
          value="off"
          checked={direction === 'off'}
          onChange={(e) => setDirection(e.target.value)}
        />
        Crypto to Fiat
      </label>
      <br />
      <button onClick={handleRamp} style={{ marginTop: '10px', padding: '10px' }}>Swap Now</button>
      <p>Status: {status}</p>
      {txId && <p>Tx ID: {txId.slice(0, 8)}...</p>}
    </div>
  );
}

export default App;
