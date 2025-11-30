import { useState, useEffect } from 'react'
import axios from 'axios'
import io from 'socket.io-client'

const API = 'https://ramplayer-core-2025-production-c338.up.railway.app'

export default function App() {
  const [balance, setBalance] = useState(50000)
  const [quotes, setQuotes] = useState({})
  const [selected, setSelected] = useState({ exchange: 'virgocx', token: 'USDC', amount: 10000, direction: 'sell' })
  const [status, setStatus] = useState('Ready')
  const [txHash, setTxHash] = useState('')

  useEffect(() => {
    axios.get(`${API}/quotes`).then(r => setQuotes(r.data.quotes))
    const socket = io(API)
    socket.on('tx-update', (data) => {
      setStatus(`Confirmed – ${data.confirmations}/12 blocks`)
      setTxHash(data.hash)
    })
    return () => socket.disconnect()
  }, [])

  const execute = async () => {
    setStatus('Processing...')
    try {
      const res = await axios.post(`${API}/transaction`, { ...selected })
      setBalance(res.data.newBalance)
      setStatus(`Success – Fee: $${res.data.fee.toFixed(2)} (10 bps)`)
      setTxHash(res.data.hash)
    } catch (e) {
      setStatus('Failed – check console')
      console.error(e)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-gray-900 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
          SPLAT – Institutional Middleware
        </h1>
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="bg-black/60 backdrop-blur border border-purple-500/30 p-10 rounded-3xl">
            <h2 className="text-3xl mb-8">Execute Trade</h2>
            <div className="space-y-6">
              <div className="text-2xl">Apaylo Balance: <span className="text-green-400 font-bold">${balance.toLocaleString()} CAD</span></div>
              <select className="w-full p-4 bg-gray-900 rounded-xl text-xl" value={selected.exchange} onChange={e => setSelected({...selected, exchange: e.target.value})}>
                <option value="newton">Newton</option>
                <option value="virgocx">VirgoCX</option>
                <option value="bitbuy">Bitbuy</option>
              </select>
              <select className="w-full p-4 bg-gray-900 rounded-xl text-xl" value={selected.token} onChange={e => setSelected({...selected, token: e.target.value})}>
                <option>USDC</option><option>USDT</option><option>BTC</option>
              </select>
              <input type="number" placeholder="Amount" className="w-full p-4 bg-gray-900 rounded-xl text-xl" value={selected.amount} onChange={e => setSelected({...selected, amount: +e.target.value})} />
              <button onClick={execute} className="w-full py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-2xl text-2xl font-bold transform hover:scale-105 transition">
                EXECUTE {selected.direction.toUpperCase()}
              </button>
              <div className="text-xl mt-6">Status: <span className="font-mono">{status}</span></div>
              {txHash && <div className="break-all text-sm bg-gray-900 p-4 rounded">Tx: {txHash}</div>}
            </div>
          </div>
          <div className="bg-black/60 backdrop-blur border border-purple-500/30 p-10 rounded-3xl">
            <h2 className="text-3xl mb-6">Live Quotes (CAD)</h2>
            {Object.entries(quotes).map(([lp, rates]) => (
              <div key={lp} className={`p-6 rounded-xl mb-4 ${selected.exchange === lp ? 'bg-purple-900/70' : 'bg-gray-900'}`}>
                <p className="font-bold text-xl capitalize">{lp}</p>
                <div className="grid grid-cols-3 gap-4 mt-3 text-lg">
                  <div>USDC<br/><span className="text-2xl font-bold">{rates.USDC}</span></div>
                  <div>USDT<br/><span className="text-2xl font-bold">{rates.USDT}</span></div>
                  <div>BTC<br/><span className="text-2xl font-bold">{rates.BTC.toLocaleString()}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
