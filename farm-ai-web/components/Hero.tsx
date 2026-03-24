'use client'

export default function Hero() {
  return (
    <div className="bg-gradient-to-b from-primary to-green-600 text-white pt-8 pb-6">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="text-4xl font-bold mb-2">Welcome to FarmAI</h1>
        <p className="text-green-100 text-lg">
          Your intelligent farming companion powered by AI
        </p>
        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl mb-1">🌾</div>
            <p className="text-sm font-medium">Smart Farming</p>
          </div>
          <div>
            <div className="text-3xl mb-1">🤖</div>
            <p className="text-sm font-medium">AI Powered</p>
          </div>
          <div>
            <div className="text-3xl mb-1">📱</div>
            <p className="text-sm font-medium">Mobile First</p>
          </div>
        </div>
      </div>
    </div>
  )
}
