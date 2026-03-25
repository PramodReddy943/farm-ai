'use client'

import { useState } from 'react'
import { Leaf, Droplets, Beaker, AlertCircle, Plus, Bot, Send, Loader } from 'lucide-react'
import { useAuth } from '@/lib/auth'
import { callAI } from '@/lib/ai-providers'

interface Advice {
  title: string
  description: string
  actions: string[]
  priority: 'high' | 'medium' | 'low'
}

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const myAdvice: Advice[] = [
  {
    title: 'Wheat - Nutrient Management',
    description: 'Your wheat crop is in grain filling stage. Potassium demand is high.',
    actions: [
      'Apply potassium fertilizer',
      'Monitor soil moisture',
      'Avoid overwatering',
      'Scout for diseases',
    ],
    priority: 'high',
  },
  {
    title: 'Rice - Disease Prevention',
    description: 'High humidity increases risk of blast disease.',
    actions: [
      'Apply fungicide preventively',
      'Improve air circulation',
      'Remove diseased leaves',
      'Ensure proper drainage',
    ],
    priority: 'high',
  },
  {
    title: 'Cotton - Growth Regulation',
    description: 'Cotton is in flowering stage. Manage vegetative growth.',
    actions: [
      'Apply growth regulator',
      'Monitor for pests',
      'Maintain plant spacing',
      'Continue irrigation',
    ],
    priority: 'medium',
  },
]

const soilRecommendations = [
  {
    nutrient: 'Nitrogen (N)',
    current: '25 mg/kg',
    requirement: '280 kg/ha',
    status: 'Deficient',
    color: 'text-red-600',
  },
  {
    nutrient: 'Phosphorus (P)',
    current: '15 mg/kg',
    requirement: '60 kg/ha',
    status: 'Low',
    color: 'text-orange-600',
  },
  {
    nutrient: 'Potassium (K)',
    current: '200 mg/kg',
    requirement: '120 kg/ha',
    status: 'Good',
    color: 'text-green-600',
  },
]

const fertilizers = [
  {
    name: 'Urea (Nitrogen)',
    frequency: 'Once every 20 days',
    quantity: '50 kg/acre',
    cost: '₹500',
    supplier: 'Local Agricultural Store',
  },
  {
    name: 'DAP (Phosphorus)',
    frequency: 'Once at sowing',
    quantity: '40 kg/acre',
    cost: '₹3,200',
    supplier: 'Agricultural Cooperative',
  },
  {
    name: 'Potash (Potassium)',
    frequency: 'Twice in season',
    quantity: '30 kg/acre',
    cost: '₹4,500',
    supplier: 'Agro Supplier',
  },
]

export default function CropAdvisoryPage() {
  const { user } = useAuth()
  const [advice, setAdvice] = useState<Advice[]>(myAdvice)
  const [showAddAdvisor, setShowAddAdvisor] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!input.trim()) return

    setMessages([...messages, { role: 'user', content: input }])
    setInput('')
    setLoading(true)

    try {
      const context = `You are an expert agricultural advisor. Provide personalized crop recommendations based on:
- Soil conditions: N: Low, P: Low, K: Good
- Weather: Warm, high humidity
- Crops: Wheat, Rice, Cotton
- Stage: Wheat (grain filling), Rice (maturity), Cotton (flowering)

Provide practical, implementable advice suited for Indian farmers.`

      const response = await callAI('gemini', input, context)
      setMessages((prev) => [...prev, { role: 'assistant', content: response }])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I could not get advisory. Please try again.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-12">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Leaf className="w-8 h-8" />
            <h1 className="text-4xl font-bold">Crop Advisory</h1>
          </div>
          <p className="text-green-100">
            Personalized recommendations for your crops based on soil, weather, and growth stage
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Advisory */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Current Advisory</h2>
                <button
                  onClick={() => setShowAddAdvisor(!showAddAdvisor)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  <Plus className="w-4 h-4" />
                  Add Crop
                </button>
              </div>

              {showAddAdvisor && (
                <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Add Your Crop</h3>
                  <form className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Crop name"
                        className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Current stage"
                        className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Area (acres)"
                        className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 outline-none"
                      />
                      <input
                        type="date"
                        className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 outline-none"
                      />
                    </div>
                    <div className="flex gap-4">
                      <button
                        type="submit"
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                      >
                        Add Crop
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddAdvisor(false)}
                        className="px-6 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Advice Cards */}
              <div className="space-y-4">
                {advice.map((item, idx) => (
                  <div
                    key={idx}
                    className={`rounded-xl shadow-lg p-6 border-l-4 ${
                      item.priority === 'high'
                        ? 'bg-red-50 border-red-600'
                        : item.priority === 'medium'
                          ? 'bg-yellow-50 border-yellow-600'
                          : 'bg-green-50 border-green-600'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.priority === 'high'
                            ? 'bg-red-200 text-red-800'
                            : item.priority === 'medium'
                              ? 'bg-yellow-200 text-yellow-800'
                              : 'bg-green-200 text-green-800'
                        }`}
                      >
                        {item.priority.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-4">{item.description}</p>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-gray-900">Actions:</p>
                      <ul className="space-y-1">
                        {item.actions.map((action, jdx) => (
                          <li key={jdx} className="text-sm text-gray-700 flex items-center gap-2">
                            <span className="text-green-600">✓</span> {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Soil Analysis */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Beaker className="w-6 h-6 text-green-600" />
                Soil Analysis
              </h2>
              <div className="space-y-4">
                {soilRecommendations.map((item, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-bold text-gray-900">{item.nutrient}</p>
                      <p className={`font-bold ${item.color}`}>{item.status}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>
                        <p className="text-xs text-gray-500">Current</p>
                        <p className="font-semibold text-gray-900">{item.current}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Required</p>
                        <p className="font-semibold text-gray-900">{item.requirement}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Action</p>
                        <p className="font-semibold text-green-600">Apply</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fertilizer Recommendations */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Fertilizer Recommendations</h2>
              <div className="space-y-4">
                {fertilizers.map((fert, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-bold text-gray-900">{fert.name}</p>
                        <p className="text-sm text-gray-600">{fert.supplier}</p>
                      </div>
                      <p className="font-bold text-green-600">{fert.cost}</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div>
                        <p className="text-xs text-gray-500">Quantity</p>
                        <p className="font-semibold text-gray-900">{fert.quantity}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Frequency</p>
                        <p className="font-semibold text-gray-900">{fert.frequency}</p>
                      </div>
                      <button className="col-span-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm">
                        Order Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - AI Advisor */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-green-200">
            <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Bot className="w-5 h-5" />
                Advisory Bot
              </h2>
              <p className="text-green-100 text-sm mt-2">Ask crop-specific questions</p>
            </div>

            <div className="flex flex-col h-96">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                {messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-center">
                    <div>
                      <Leaf className="w-10 h-10 text-green-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        Ask me about crop management, fertilizers, or diseases
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
                            ? 'bg-green-600 text-white'
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
                      Advising...
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
                    placeholder="Ask about crops..."
                    className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 outline-none text-sm"
                    disabled={loading}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={loading}
                    className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:bg-gray-400"
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
