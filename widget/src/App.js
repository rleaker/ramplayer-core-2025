import React, { useState } from 'react';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

function App() {
  const [amount, setAmount] = useState(100);
  const [status, setStatus] = useState('Ready');

  const swap = async () => {
    setStatus('Processing...');
    try {
      const res = await axios.post(`${BACKEND_URL}/ramp`, { amountCAD: amount, direction: 'on' });
      setStatus(`Success! Tx: ${res.data.txId.slice(0,10)}...`);
    } catch (e) {
      setStatus('Failed');
    }
  };

  return (
    <div style={{fontFamily: 'system-ui', padding: 30, maxWidth: 320, border: '2px solid #333', borderRadius: 12}}>
      <h2>RampLayer Demo</h2>
      <input type="number" value={amount} onChange={e=>setAmount(+e.target.value)} />
      <button onClick={swap} style={{marginLeft:10, padding: '8px 16px'}}>Swap CAD → Crypto</button>
      <p><strong>Status:</strong> {status}</p>
    </div>
  );
}

export default App;
