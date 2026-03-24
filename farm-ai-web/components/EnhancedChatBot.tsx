'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Loader, Zap } from 'lucide-react'
import { callAI, type AIProvider, getAIConfig } from '@/lib/ai-providers'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  provider?: AIProvider
}

const suggestedQuestions = [
  '🌾 What crops should I plant this season?',
  '🐛 How do I prevent pest infestations?',
  '💧 What\'s the best irrigation schedule?',
  '📈 How can I increase my yield?',
  '🌍 Tell me about weather patterns for my region',
  '💰 What\'s the market price for wheat?',
]

export default function EnhancedChatBot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedAI, setSelectedAI] = useState<AIProvider>('gemini')
  const [farmContext, setFarmContext] = useState({
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
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-emerald-600 text-white p-6 rounded-b-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-2">🤖 Smart Farm Assistant</h1>
        <p className="text-green-100">Chat with multiple AI experts for farming advice</p>
      </div>

      {/* AI Provider Selector */}
      <div className="flex gap-2 p-4 overflow-x-auto bg-white border-b">
        {(['gemini', 'chatgpt', 'claude'] as const).map((provider) => {
          const config = getAIConfig(provider)
          return (
            <button
              key={provider}
              onClick={() => setSelectedAI(provider)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition whitespace-nowrap ${
                selectedAI === provider
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="text-xl">{config.icon}</span>
              <span className="font-medium">{config.name}</span>
            </button>
          )
        })}
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="text-6xl mb-4">🌾</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Hello, Farmer!</h2>
            <p className="text-gray-600 mb-8 max-w-md">
              Ask me anything about farming - from disease prevention to market prices. I'll help you grow smarter!
            </p>

            {/* Suggested Questions */}
            <div className="grid grid-cols-1 gap-2 w-full">
              {suggestedQuestions.map((question) => (
                <button
                  key={question}
                  onClick={() => handleSendMessage(question)}
                  className="text-left px-4 py-3 bg-white border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-300 transition text-gray-700 text-sm"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-xs sm:max-w-md lg:max-w-xl px-4 py-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-green-600 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-800 rounded-bl-none border border-gray-300'
              }`}
            >
              <p className="text-sm sm:text-base break-words">{message.content}</p>
              {message.provider && (
                <div className="text-xs mt-2 opacity-70">
                  via {getAIConfig(message.provider).name}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-800 px-4 py-3 rounded-lg rounded-bl-none flex items-center gap-2">
              <Loader className="w-4 h-4 animate-spin" />
              <span className="text-sm">Thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t p-4 shadow-lg">
        <div className="flex gap-2">
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
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
            disabled={loading}
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={loading || !input.trim()}
            className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition disabled:bg-gray-400 flex items-center gap-2"
          >
            <Send className="w-5 h-5" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
        <div className="mt-2 text-xs text-gray-500 text-center flex items-center justify-center gap-1">
          <Zap className="w-3 h-3" />
          Powered by {getAIConfig(selectedAI).name}
        </div>
      </div>
    </div>
  )
}
