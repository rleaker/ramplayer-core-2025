import { useState, useEffect } from 'react'
import axios from 'axios'
import io from 'socket.io-client'

const API = 'https://splat-core.up.railway.app' // will update after Railway live

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
    return () => socket.close()
  }, [])

  const execute = async () => {
    setStatus('Processing...')
    try {
      const res = await axios.post(`${API}/transaction`, { ...selected })
      setBalance(res.data.newBalance)
      setStatus(`Success – Fee: $${res.data.fee}`)
      setTxHash(res.data.hash)
    } catch { setStatus('Failed') }
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">SPLAT Business Dashboard</h1>
      <div className="grid grid-cols-2 gap-8">
        <div className="bg-gray-900 p-6 rounded-xl">
          <p className="text-2xl mb-6">Apaylo Balance: <span className="text-green-400 font-bold">${balance.toLocaleString()} CAD</span></p>
          <select className="w-full p-3 bg-gray-800 rounded mb-4" value={selected.exchange} onChange={e => setSelected({...selected, exchange: e.target.value})}>
            <option value="newton">Newton</option>
            <option value="virgocx">VirgoCX</option>
            <option value="bitbuy">Bitbuy</option>
          </select>
          <select className="w-full p-3 bg-gray-800 rounded mb-4" value={selected.token} onChange={e => setSelected({...selected, token: e.target.value})}>
            <option>USDC</option><option>USDT</option><option>BTC</option>
          </select>
          <input type="number" className="w-full p-3 bg-gray-800 rounded mb-4" value={selected.amount} onChange={e => setSelected({...selected, amount: +e.target.value})} />
          <button onClick={execute} className="w-full py-4 bg-purple-600 hover:bg-purple-500 rounded text-xl font-bold">
            EXECUTE {selected.direction.toUpperCase()}
          </button>
          <p className="mt-6 text-lg">Status: {status}</p>
          {txHash && <p className="mt-2 break-all text-sm">Hash: {txHash}</p>}
        </div>
        <div className="bg-gray-900 p-6 rounded-xl">
          <h2 className="text-2xl mb-4">Live Quotes (CAD)</h2>
          {Object.entries(quotes).map(([lp, rates]) => (
            <div key={lp} className={`p-4 rounded mb-3 ${selected.exchange === lp ? 'bg-purple-900' : 'bg-gray-800'}`}>
              <p className="font-bold capitalize">{lp}</p>
              <p>USDC: {rates.USDC} | USDT: {rates.USDT} | BTC: {rates.BTC.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
