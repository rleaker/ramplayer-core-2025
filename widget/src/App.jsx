import React, { useState } from 'react'
import axios from 'axios'

const BACKEND_URL = 'https://ramplayer-core-2025-production.up.railway.app'

export default function App() {
  const [amount, setAmount] = useState(100)
  const [status, setStatus] = useState('🟢 Ready')

  const swap = async () => {
    setStatus('⏳ Processing...')
    try {
      const res = await axios.post(`${BACKEND_URL}/ramp`, { amountCAD: amount, direction: 'on' })
      setStatus(`✅ Success! Tx: ${res.data.txId.slice(0,10)}...`)
    } catch (e) {
      setStatus('❌ Failed – check backend')
    }
  }

  return (
    <div style={{fontFamily: 'system-ui', padding: 40, maxWidth: 400, border: '3px solid #000', borderRadius: 16, background: '#fff'}}>
      <h1>RampLayer Live</h1>
      <input style={{padding: 12, fontSize: 18}} type="number" value={amount} onChange={e => setAmount(+e.target.value)} />
      <button onClick={swap} style={{marginLeft: 12, padding: '12px 24px', fontSize: 18, background: '#000', color: '#fff', border: 'none', borderRadius: 8}}>
        Swap CAD → Crypto
      </button>
      <p style={{marginTop: 20, fontSize: 20}}><strong>Status:</strong> {status}</p>
    </div>
  )
}
