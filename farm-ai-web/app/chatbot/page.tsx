'use client'

import { MessageCircle } from 'lucide-react'
import EnhancedChatBot from '@/components/EnhancedChatBot'

export default function ChatbotPage() {
  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <MessageCircle className="w-8 h-8" />
            <h1 className="text-3xl font-bold">AI Farm Assistant</h1>
          </div>
          <p className="text-purple-100">Chat with our AI experts - Gemini, ChatGPT, or Claude</p>
        </div>
      </header>

      {/* Chatbot */}
      <div className="flex-1 overflow-hidden">
        <EnhancedChatBot />
      </div>
    </div>
  )
}
