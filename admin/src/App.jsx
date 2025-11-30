const CORE_API = 'https://ramplayer-core-2025-production-c338.up.railway.app'
export default function App() {
  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-5xl font-bold mb-10">SPLAT Revenue Admin</h1>
      
      <div className="grid grid-cols-4 gap-6 mb-12">
        <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-8 rounded-2xl">
          <p className="text-2xl opacity-90">Total Volume</p>
          <p className="text-5xl font-bold mt-2">$12,847,200</p>
        </div>
        <div className="bg-gradient-to-br from-green-600 to-green-800 p-8 rounded-2xl">
          <p className="text-2xl opacity-90">Revenue @ 10 bps</p>
          <p className="text-5xl font-bold mt-2">$12,847</p>
        </div>
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-2xl">
          <p className="text-2xl opacity-90">Active LPs</p>
          <p className="text-5xl font-bold mt-2">3</p>
        </div>
        <div className="bg-gradient-to-br from-orange-600 to-red-600 p-8 rounded-2xl">
          <p className="text-2xl opacity-90">Live Tx</p>
          <p className="text-5xl font-bold mt-2">47</p>
        </div>
      </div>

      <div className="bg-gray-900 p-8 rounded-2xl">
        <h2 className="text-3xl mb-6">Latest Transactions</h2>
        <div className="space-y-4">
          {[
            { hash: "0x4a8f...9b2e", amount: 250000, token: "USDC", fee: 250, lp: "VirgoCX" },
            { hash: "0x9f1c...3d8a", amount: 85000, token: "BTC", fee: 85, lp: "Bitbuy" },
            { hash: "0x2b7e...1f4c", amount: 100000, token: "USDT", fee: 100, lp: "Newton" }
          ].map(tx => (
            <div key={tx.hash} className="bg-gray-800 p-6 rounded-xl flex justify-between items-center">
              <div>
                <p className="font-mono text-sm">{tx.hash}</p>
                <p className="text-xl">{tx.amount.toLocaleString()} {tx.token} → CAD via {tx.lp}</p>
              </div>
              <p className="text-2xl text-green-400">+${tx.fee}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
