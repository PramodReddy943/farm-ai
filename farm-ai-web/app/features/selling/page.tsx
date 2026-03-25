'use client'

import { useState } from 'react'
import { ShoppingCart, MapPin, Phone, IndianRupee, Search, Plus, Bot, Send, Loader, MessageCircle } from 'lucide-react'
import { useAuth } from '@/lib/auth'
import { getAIConfig, callAI } from '@/lib/ai-providers'

interface Listing {
  id: string
  farmerName: string
  location: string
  phone: string
  crops: string
  quantity: string
  price: string
  image?: string
  verified: boolean
}

interface Buyer {
  id: string
  name: string
  location: string
  phone: string
  crops: string
  verified: boolean
}

const demoListings: Listing[] = [
  {
    id: '1',
    farmerName: 'Rajesh Kumar',
    location: 'Meerut, Uttar Pradesh',
    phone: '+91-9876543210',
    crops: 'Wheat',
    quantity: '50 Quintals',
    price: '₹2,400/Quintal',
    verified: true,
  },
  {
    id: '2',
    farmerName: 'Priya Singh',
    location: 'Jaipur, Rajasthan',
    phone: '+91-9123456789',
    crops: 'Cotton',
    quantity: '20 Quintals',
    price: '₹5,800/Quintal',
    verified: true,
  },
  {
    id: '3',
    farmerName: 'Harjeet Singh',
    location: 'Ludhiana, Punjab',
    phone: '+91-8765432109',
    crops: 'Rice',
    quantity: '100 Bags',
    price: '₹3,200/Bag',
    verified: false,
  },
]

const demoBuyers: Buyer[] = [
  {
    id: '1',
    name: 'Sharma Trading Company',
    location: 'Delhi',
    phone: '+91-1234567890',
    crops: 'Wheat, Maize',
    verified: true,
  },
  {
    id: '2',
    name: 'foodirect India',
    location: 'Bangalore',
    phone: '+91-9988776655',
    crops: 'Rice, Pulses',
    verified: true,
  },
  {
    id: '3',
    name: 'Local Market Vendor',
    location: 'Agra',
    phone: '+91-8877665544',
    crops: 'Vegetables',
    verified: false,
  },
]

export default function CropSellingPage() {
  const { user } = useAuth()
  const [tab, setTab] = useState<'sell' | 'buy' | 'chat'>('sell')
  const [listings, setListings] = useState<Listing[]>(demoListings)
  const [buyers, setBuyers] = useState<Buyer[]>(demoBuyers)
  const [showListingForm, setShowListingForm] = useState(false)
  const [messages, setMessages] = useState<any[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    crops: '',
    quantity: '',
    price: '',
  })

  const handleAddListing = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.crops && formData.quantity && formData.price && user) {
      const newListing: Listing = {
        id: Date.now().toString(),
        farmerName: user.name,
        location: `${user.location}, ${user.state}`,
        phone: user.phone || 'N/A',
        crops: formData.crops,
        quantity: formData.quantity,
        price: formData.price,
        verified: false,
      }
      setListings([newListing, ...listings])
      setFormData({ crops: '', quantity: '', price: '' })
      setShowListingForm(false)
    }
  }

  const handleSendMessage = async () => {
    if (!input.trim()) return

    setMessages([...messages, { role: 'user', content: input }])
    setInput('')
    setLoading(true)

    try {
      const context = `You are a helpful agricultural market expert. Help farmers with pricing information, market demand, and crop selling strategies. ${user ? `The user is a ${user.role} from ${user.state}.` : ''}`
      const response = await callAI('gemini', input, context)
      setMessages((prev) => [...prev, { role: 'assistant', content: response }])
    } catch (error) {
      setMessages((prev) => [...prev, {
        role: 'assistant',
        content: 'Sorry, I could not get a response. Please try again.',
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-12">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-emerald-500 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingCart className="w-8 h-8" />
            <h1 className="text-4xl font-bold">Crop Selling Marketplace</h1>
          </div>
          <p className="text-green-100">Connect with buyers directly and get fair prices for your crops</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto border-b border-gray-200">
          <button
            onClick={() => setTab('sell')}
            className={`px-6 py-3 font-semibold whitespace-nowrap border-b-2 transition ${
              tab === 'sell'
                ? 'border-green-600 text-green-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            I'm Selling
          </button>
          <button
            onClick={() => setTab('buy')}
            className={`px-6 py-3 font-semibold whitespace-nowrap border-b-2 transition ${
              tab === 'buy'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            I'm Buying
          </button>
          <button
            onClick={() => setTab('chat')}
            className={`px-6 py-3 font-semibold whitespace-nowrap border-b-2 transition ${
              tab === 'chat'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <MessageCircle className="w-4 h-4 inline mr-2" />
            AI Advice
          </button>
        </div>

        {/* Sellers Tab */}
        {tab === 'sell' && (
          <div className="space-y-8">
            {/* Add Listing Button */}
            {user?.role === 'farmer' && (
              <button
                onClick={() => setShowListingForm(!showListingForm)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition"
              >
                <Plus className="w-5 h-5" />
                Add Your Crop Listing
              </button>
            )}

            {/* Add Listing Form */}
            {showListingForm && (
              <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-green-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">List Your Crops</h3>
                <form onSubmit={handleAddListing} className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="What crops? (e.g., Wheat, Rice)"
                      required
                      value={formData.crops}
                      onChange={(e) => setFormData({ ...formData, crops: e.target.value })}
                      className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Quantity (e.g., 50 Quintals)"
                      required
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Price (e.g., ₹2,400/Quintal)"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 outline-none"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                      Post Listing
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowListingForm(false)}
                      className="px-6 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Listings Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing) => (
                <div
                  key={listing.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition border border-gray-100"
                >
                  <div className="bg-gradient-to-r from-green-100 to-emerald-100 h-32 flex items-center justify-center">
                    <ShoppingCart className="w-16 h-16 text-green-600 opacity-50" />
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{listing.crops}</h3>
                        <p className="text-sm text-gray-600">{listing.quantity}</p>
                      </div>
                      {listing.verified && (
                        <div className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
                          ✓ Verified
                        </div>
                      )}
                    </div>

                    <div className="space-y-2 mb-4">
                      <p className="text-2xl font-bold text-green-600">{listing.price}</p>
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <MapPin className="w-4 h-4" />
                        {listing.location}
                      </div>
                      <p className="font-medium text-gray-900">{listing.farmerName}</p>
                    </div>

                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                      <Phone className="w-4 h-4" />
                      {listing.phone}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Buyers Tab */}
        {tab === 'buy' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-blue-900 mb-2">I'm a Buyer</h3>
              <p className="text-blue-800">Find farmers directly selling their crops. Click to contact them.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {buyers.map((buyer) => (
                <div
                  key={buyer.id}
                  className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{buyer.name}</h3>
                      {buyer.verified && (
                        <p className="text-xs text-green-600 font-semibold">✓ Verified Buyer</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{buyer.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <ShoppingCart className="w-4 h-4" />
                      <span className="text-sm">Looking for: {buyer.crops}</span>
                    </div>
                  </div>

                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    <Phone className="w-4 h-4" />
                    {buyer.phone}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Chat Tab */}
        {tab === 'chat' && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Bot className="w-6 h-6" />
                AI Market Advisor
              </h2>
              <p className="text-purple-100 mt-2">Get instant advice on crop pricing, market demand, and selling strategies</p>
            </div>

            <div className="flex flex-col h-96">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                {messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-center text-gray-600">
                    <div>
                      <Bot className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p>Ask me anything about selling your crops!</p>
                      <p className="text-sm text-gray-500 mt-2">Example: "What's the current price for wheat?"</p>
                    </div>
                  </div>
                ) : (
                  messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
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
                    <div className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg flex items-center gap-2">
                      <Loader className="w-4 h-4 animate-spin" />
                      Thinking...
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="border-t border-gray-200 p-4 bg-white">
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
                    placeholder="Ask me about crop prices..."
                    className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 outline-none"
                    disabled={loading}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={loading}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:bg-gray-400"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
