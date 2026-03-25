'use client'

import { useState } from 'react'
import { TrendingUp, TrendingDown, Search, Bot, Send, Loader } from 'lucide-react'
import { useAuth } from '@/lib/auth'
import { callAI } from '@/lib/ai-providers'

interface Price {
  crop: string
  location: string
  price: number
  unit: string
  date: string
  trend: 'up' | 'down' | 'stable'
  change: number
}

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const priceData: Price[] = [
  {
    crop: 'Wheat',
    location: 'Mandi, UP',
    price: 2400,
    unit: 'per Quintal',
    date: 'Today',
    trend: 'up',
    change: 2.5,
  },
  {
    crop: 'Rice',
    location: 'Mandi, Punjab',
    price: 3200,
    unit: 'per Quintal',
    date: 'Today',
    trend: 'stable',
    change: 0,
  },
  {
    crop: 'Cotton',
    location: 'Mandi, Gujarat',
    price: 5800,
    unit: 'per Quintal',
    date: 'Today',
    trend: 'down',
    change: -1.2,
  },
  {
    crop: 'Maize',
    location: 'Mandi, Rajasthan',
    price: 1900,
    unit: 'per Quintal',
    date: 'Today',
    trend: 'up',
    change: 3.1,
  },
  {
    crop: 'Sugarcane',
    location: 'Mill, UP',
    price: 280,
    unit: 'per Quintal',
    date: 'Today',
    trend: 'stable',
    change: 0,
  },
  {
    crop: 'Soybean',
    location: 'Mandi, MP',
    price: 6500,
    unit: 'per Quintal',
    date: 'Today',
    trend: 'down',
    change: -2.3,
  },
]

export default function MarketPricesPage() {
  const { user } = useAuth()
  const [searchCrop, setSearchCrop] = useState('')
  const [prices, setPrices] = useState<Price[]>(priceData)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const filteredPrices = prices.filter(
    (p) =>
      p.crop.toLowerCase().includes(searchCrop.toLowerCase()) ||
      p.location.toLowerCase().includes(searchCrop.toLowerCase())
  )

  const handleSendMessage = async () => {
    if (!input.trim()) return

    setMessages([...messages, { role: 'user', content: input }])
    setInput('')
    setLoading(true)

    try {
      const priceContext = `Current market prices:
${prices.map((p) => `${p.crop}: ₹${p.price} ${p.unit}`).join('\n')}

You are a market analysis expert. Provide insights on:
- Price trends and predictions
- Best time to sell crops
- Market demand patterns
- Regional price variations`

      const response = await callAI('gemini', input, priceContext)
      setMessages((prev) => [...prev, { role: 'assistant', content: response }])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I could not get market analysis. Please try again.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-12">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-600 to-red-500 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-8 h-8" />
            <h1 className="text-4xl font-bold">Market Prices</h1>
          </div>
          <p className="text-orange-100">Real-time crop prices from mandis across India</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search crop or mandi..."
                value={searchCrop}
                onChange={(e) => setSearchCrop(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 outline-none"
              />
            </div>

            {/* Prices Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredPrices.length > 0 ? (
                filteredPrices.map((price, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition border border-gray-100"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{price.crop}</h3>
                        <p className="text-sm text-gray-600">{price.location}</p>
                      </div>
                      {price.trend === 'up' ? (
                        <div className="px-2 py-1 bg-green-100 rounded flex items-center gap-1">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <span className="text-green-600 font-bold text-sm">+{price.change}%</span>
                        </div>
                      ) : price.trend === 'down' ? (
                        <div className="px-2 py-1 bg-red-100 rounded flex items-center gap-1">
                          <TrendingDown className="w-4 h-4 text-red-600" />
                          <span className="text-red-600 font-bold text-sm">{price.change}%</span>
                        </div>
                      ) : (
                        <div className="px-2 py-1 bg-gray-100 rounded">
                          <span className="text-gray-600 font-bold text-sm">Stable</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Current Price</p>
                        <p className="text-4xl font-bold text-orange-600">₹{price.price}</p>
                        <p className="text-sm text-gray-600">{price.unit}</p>
                      </div>

                      <div className="pt-3 border-t border-gray-200">
                        <p className="text-xs text-gray-500">Updated {price.date}</p>
                      </div>

                      <button className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition">
                        Set Price Alert
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-8 text-gray-600">
                  No crops found. Try searching for a different crop.
                </div>
              )}
            </div>

            {/* Historical Context */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Price Trends (Last 7 Days)</h3>
              <div className="space-y-3">
                {priceData.slice(0, 3).map((crop, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{crop.crop}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-6 bg-white rounded border border-gray-200">
                        {/* Simplified chart representation */}
                        <div
                          className={`h-full rounded ${
                            crop.trend === 'up'
                              ? 'bg-green-200 w-3/4'
                              : crop.trend === 'down'
                                ? 'bg-red-200 w-2/4'
                                : 'bg-gray-200 w-1/2'
                          }`}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-12">
                        {crop.change > 0 ? '+' : ''}
                        {crop.change}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - AI Advisor */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-orange-200">
            <div className="bg-gradient-to-r from-orange-600 to-red-500 text-white p-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Bot className="w-5 h-5" />
                Market Advisor
              </h2>
              <p className="text-orange-100 text-sm mt-2">Get AI-powered market insights</p>
            </div>

            <div className="flex flex-col h-96">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                {messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-center">
                    <div>
                      <Bot className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        Ask me about crop prices and market trends
                      </p>
                    </div>
                  </div>
                ) : (
                  messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                          msg.role === 'user'
                            ? 'bg-orange-600 text-white'
                            : 'bg-gray-200 text-gray-900'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))
                )}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-200 text-gray-900 px-3 py-2 rounded-lg text-sm flex items-center gap-2">
                      <Loader className="w-3 h-3 animate-spin" />
                      Analyzing...
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="border-t border-gray-200 p-3 bg-white">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !loading) {
                        handleSendMessage()
                      }
                    }}
                    placeholder="Ask about prices..."
                    className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 outline-none text-sm"
                    disabled={loading}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={loading}
                    className="px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition disabled:bg-gray-400"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
