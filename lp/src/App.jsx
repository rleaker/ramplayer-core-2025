import { useState } from 'react'
const CORE_API = 'https://ramplayer-core-2025-production-c338.up.railway.app'
export default function App() {
  const [spread, setSpread] = useState({ USDC: 0.28, USDT: 0.30, BTC: 0.45 })

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Liquidity Provider Panel – VirgoCX</h1>
      
      <div className="bg-gray-900 p-8 rounded-xl">
        <h2 className="text-2xl mb-6">Set Your Spread (%)</h2>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block text-lg mb-2">USDC/CAD</label>
            <input type="number" step="0.01" value={spread.USDC} onChange={e => setSpread({...spread, USDC: +e.target.value})}
              className="w-full p-4 bg-gray-800 rounded text-2xl" />
          </div>
          <div>
            <label className="block text-lg mb-2">USDT/CAD</label>
            <input type="number" step="0.01" value={spread.USDT} onChange={e => setSpread({...spread, USDT: +e.target.value})}
              className="w-full p-4 bg-gray-800 rounded text-2xl" />
          </div>
          <div>
            <label className="block text-lg mb-2">BTC/CAD</label>
            <input type="number" step="0.01" value={spread.BTC} onChange={e => setSpread({...spread, BTC: +e.target.value})}
              className="w-full p-4 bg-gray-800 rounded text-2xl" />
          </div>
        </div>
        <button className="mt-8 px-12 py-4 bg-green-600 hover:bg-green-500 rounded text-xl font-bold">
          PUSH LIVE SPREAD
        </button>
      </div>

      <div className="mt-12 bg-gray-900 p-8 rounded-xl">
        <h2 className="text-2xl mb-6">Approved Business Wallets</h2>
        <div className="space-y-4">
          <div className="bg-gray-800 p-4 rounded">
            <p className="font-mono text-sm">0x71C7656EC7ab88b098defB751B7401B5f6d8976F → USDC/USDT</p>
            <span className="text-green-400">Approved</span>
          </div>
          <div className="bg-gray-800 p-4 rounded">
            <p className="font-mono text-sm">0x17a9e2919d12e9d1d2c9f9d8d8e9f8e9f8e9f8e9 → BTC</p>
            <span className="text-green-400">Approved</span>
          </div>
        </div>
      </div>
    </div>
  )
}
