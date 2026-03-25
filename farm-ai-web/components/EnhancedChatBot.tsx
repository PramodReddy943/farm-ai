'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Loader, Zap, Wheat, Bug, Droplet, TrendingUp, Globe, DollarSign } from 'lucide-react'
import { callAI, type AIProvider, getAIConfig } from '@/lib/ai-providers'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  provider?: AIProvider
}

const suggestedQuestions = [
  { text: 'What crops should I plant this season?', icon: Wheat },
  { text: 'How do I prevent pest infestations?', icon: Bug },
  { text: 'What\'s the best irrigation schedule?', icon: Droplet },
  { text: 'How can I increase my yield?', icon: TrendingUp },
  { text: 'Tell me about weather patterns for my region', icon: Globe },
  { text: 'What\'s the market price for wheat?', icon: DollarSign },
]

export default function EnhancedChatBot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedAI, setSelectedAI] = useState<AIProvider>('gemini')
  const [farmContext] = useState({
    crops: ['wheat', 'rice'],
    location: 'Punjab, India',
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (text: string = input) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const contextString = `You are an agricultural expert helping a farmer who grows ${farmContext.crops.join(', ')} in ${farmContext.location}.`

      const response = await callAI(selectedAI, text, contextString)

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        provider: selectedAI,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content: `Sorry, I couldn't get a response from ${getAIConfig(selectedAI).name}. Please check your API key is configured correctly.`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-white to-gray-50">
      {/* AI Provider Selector */}
      <div className="flex gap-2 p-4 overflow-x-auto bg-white border-b shadow-sm">
        {(['gemini', 'chatgpt', 'claude'] as const).map((provider) => {
          const config = getAIConfig(provider)
          return (
            <button
              key={provider}
              onClick={() => setSelectedAI(provider)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl transition whitespace-nowrap font-medium text-sm ${
                selectedAI === provider
                  ? {
                      'gemini': 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg scale-105',
                      'chatgpt': 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg scale-105',
                      'claude': 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg scale-105',
                    }[provider]
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="text-lg">{config.icon}</span>
              <span>{config.name}</span>
            </button>
          )
        })}
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center py-12 px-4">
            <div className="mb-6 p-4 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full">
              <Wheat className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Hello, Farmer! 👋</h2>
            <p className="text-gray-600 mb-8 max-w-md text-lg">
              Ask me anything about farming - from disease prevention to market prices. I'll help you grow smarter!
            </p>

            {/* Suggested Questions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
              {suggestedQuestions.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.text}
                    onClick={() => handleSendMessage(item.text)}
                    className="flex items-start gap-3 p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-green-400 hover:bg-green-50 transition-all group text-left"
                  >
                    <div className="flex-shrink-0 p-2 bg-gray-100 rounded-lg group-hover:bg-green-100 transition">
                      <Icon className="w-5 h-5 text-gray-600 group-hover:text-green-600 transition" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-green-700">{item.text}</span>
                  </button>
                )
              })}
            </div>

            {/* Info Box */}
            <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200 max-w-md">
              <p className="text-xs text-gray-700">
                <span className="font-semibold text-blue-900">💡 Tip:</span> Switch between AI providers to get different perspectives on your farming questions!
              </p>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-xs sm:max-w-md lg:max-w-xl px-5 py-3 rounded-2xl ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-br-none shadow-md'
                  : 'bg-gray-100 text-gray-800 rounded-bl-none border border-gray-200'
              }`}
            >
              <p className="text-sm sm:text-base break-words leading-relaxed">{message.content}</p>
              {message.provider && (
                <div className={`text-xs mt-2 ${message.role === 'user' ? 'text-green-100' : 'text-gray-600'}`}>
                  💬 {getAIConfig(message.provider).name}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 px-5 py-3 rounded-2xl rounded-bl-none flex items-center gap-3 border border-gray-200">
              <Loader className="w-5 h-5 animate-spin text-green-600" />
              <span className="text-sm font-medium">Thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t p-4 shadow-lg sticky bottom-0">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
            placeholder="Ask me about your farm..."
            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 text-sm sm:text-base transition"
            disabled={loading}
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={loading || !input.trim()}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Send className="w-5 h-5" />
            <span className="hidden sm:inline font-medium">Send</span>
          </button>
        </div>
        <div className="mt-3 text-xs text-gray-600 text-center flex items-center justify-center gap-2">
          <Zap className="w-3 h-3" />
          Powered by <span className="font-semibold text-green-600">{getAIConfig(selectedAI).name}</span>
        </div>
      </div>
    </div>
  )
}
