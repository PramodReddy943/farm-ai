'use client'

import { useState } from 'react'
import { ChevronRight } from 'lucide-react'

interface AIAssistant {
  id: 'gemini' | 'chatgpt' | 'claude'
  name: string
  description: string
  icon: string
  features: string[]
  color: string
  bgColor: string
}

const assistants: AIAssistant[] = [
  {
    id: 'gemini',
    name: 'Google Gemini',
    description: 'Advanced vision-based disease detection and real-time crop analysis',
    icon: '🔍',
    features: ['Image Analysis', 'Real-time Detection', 'Weather Integration'],
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'Conversational AI for farming advice, crop planning, and market insights',
    icon: '💬',
    features: ['Market Insights', 'Crop Planning', 'Business Advice'],
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
  },
  {
    id: 'claude',
    name: 'Claude',
    description: 'Deep analytical capabilities for complex farming challenges',
    icon: '🤖',
    features: ['Data Analysis', 'Problem Solving', 'Detailed Reports'],
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
]

export default function AIAssistants() {
  const [selectedAI, setSelectedAI] = useState<'gemini' | 'chatgpt' | 'claude'>('gemini')
  const selected = assistants.find((a) => a.id === selectedAI)!

  return (
    <section id="ai-assistants" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Choose Your AI Assistant
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Three powerful AI engines at your fingertips. Select the one that fits your farming needs best.
          </p>
        </div>

        {/* AI Selector */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {assistants.map((ai) => (
            <button
              key={ai.id}
              onClick={() => setSelectedAI(ai.id)}
              className={`p-6 rounded-xl border-2 transition transform hover:scale-105 ${
                selectedAI === ai.id
                  ? `${ai.bgColor} border-current ${ai.color}`
                  : 'bg-gray-50 border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-4xl mb-3">{ai.icon}</div>
              <h3 className={`text-xl font-bold mb-2 ${selectedAI === ai.id ? ai.color : 'text-gray-900'}`}>
                {ai.name}
              </h3>
              <p className={`text-sm ${selectedAI === ai.id ? 'text-gray-700' : 'text-gray-600'}`}>
                {ai.description}
              </p>
            </button>
          ))}
        </div>

        {/* Selected AI Details */}
        <div className={`${selected.bgColor} rounded-2xl p-8 sm:p-12 border-2 border-current`}>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Info */}
            <div>
              <div className="text-6xl mb-6">{selected.icon}</div>
              <h3 className={`text-3xl font-bold mb-4 ${selected.color}`}>{selected.name}</h3>
              <p className="text-gray-700 mb-8 text-lg leading-relaxed">{selected.description}</p>

              {/* Features List */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Key Features:</h4>
                {selected.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <ChevronRight className={`w-5 h-5 ${selected.color}`} />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button className={`mt-8 px-6 py-3 rounded-lg font-semibold ${selected.color} bg-white hover:shadow-lg transition`}>
                Try {selected.name}
              </button>
            </div>

            {/* Use Cases */}
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-6">Best For:</h4>
              <div className="space-y-4">
                {selectedAI === 'gemini' && (
                  <>
                    <div className="bg-white rounded-lg p-4">
                      <div className="font-semibold text-gray-900 mb-2">📸 Disease Detection</div>
                      <p className="text-gray-600 text-sm">Upload plant photos for instant disease diagnosis</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <div className="font-semibold text-gray-900 mb-2">🔬 Crop Analysis</div>
                      <p className="text-gray-600 text-sm">Detailed analysis of crop health and growth patterns</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <div className="font-semibold text-gray-900 mb-2">🌍 Context Awareness</div>
                      <p className="text-gray-600 text-sm">Location-based farming recommendations</p>
                    </div>
                  </>
                )}
                {selectedAI === 'chatgpt' && (
                  <>
                    <div className="bg-white rounded-lg p-4">
                      <div className="font-semibold text-gray-900 mb-2">💭 Conversational Advice</div>
                      <p className="text-gray-600 text-sm">Chat naturally about farming challenges</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <div className="font-semibold text-gray-900 mb-2">📊 Market Intelligence</div>
                      <p className="text-gray-600 text-sm">Crop prices, market trends, and sales timing</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <div className="font-semibold text-gray-900 mb-2">📋 Planning</div>
                      <p className="text-gray-600 text-sm">Season planning and crop rotation advice</p>
                    </div>
                  </>
                )}
                {selectedAI === 'claude' && (
                  <>
                    <div className="bg-white rounded-lg p-4">
                      <div className="font-semibold text-gray-900 mb-2">🔍 Deep Analysis</div>
                      <p className="text-gray-600 text-sm">Complex agricultural data interpretation</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <div className="font-semibold text-gray-900 mb-2">📈 Predictions</div>
                      <p className="text-gray-600 text-sm">Yield forecasts and risk assessment</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <div className="font-semibold text-gray-900 mb-2">🎯 Optimization</div>
                      <p className="text-gray-600 text-sm">Resource optimization strategies</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
