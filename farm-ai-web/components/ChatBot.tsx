'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Lightbulb } from 'lucide-react'
import { chatWithFarmAssistant } from '@/lib/gemini'
import { useStore } from '@/lib/store'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const quickQuestions = [
  'How to prevent powdery mildew?',
  'Best time to irrigate?',
  'What fertilizer should I use?',
  'How to identify leaf rust?',
]

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your Farm Assistant. Ask me any questions about your crops, diseases, farming practices, and more!',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { farm } = useStore()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async (userMessage: string) => {
    if (!userMessage.trim()) return

    const newMessages = [...messages, { role: 'user' as const, content: userMessage }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const response = await chatWithFarmAssistant(newMessages, farm || {})
      setMessages((prev) => [...prev, { role: 'assistant', content: response }])
    } catch (error) {
      console.error('Chat error:', error)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs sm:max-w-md lg:max-w-lg px-4 py-3 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-primary text-white rounded-br-none'
                  : 'bg-gray-100 text-gray-900 rounded-bl-none'
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-lg rounded-bl-none">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions */}
      {messages.length === 1 && (
        <div className="px-4 py-3 border-t border-gray-200">
          <p className="text-xs text-gray-600 mb-2 flex items-center gap-1">
            <Lightbulb size={14} />
            Suggested questions:
          </p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(q)}
                className="text-xs px-2 py-1 bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 rounded-full transition"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(input)}
            placeholder="Ask something..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-primary"
            disabled={loading}
          />
          <button
            onClick={() => handleSendMessage(input)}
            disabled={loading || !input.trim()}
            className="px-4 py-2 bg-primary text-white rounded-full hover:bg-green-700 disabled:opacity-50 transition"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
