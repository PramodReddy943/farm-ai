'use client'

import { useAuth } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import {
  ShoppingCart, Sprout, Zap, Cloud, Stethoscope, BookOpen, DollarSign, Users,
  Users2, Languages, Store, TrendingUp, Truck, Microscope, Apple, Calendar,
  CreditCard, Image, Handshake, Sun, Shield, Globe, Radio, Lightbulb, Warehouse,
  Leaf, Brain, AlertCircle, BarChart3
} from 'lucide-react'
import Link from 'next/link'

const topFeatures = [
  { id: 'selling', icon: ShoppingCart, label: 'Sell Your Crops', desc: 'Find nearby buyers and markets' },
  { id: 'prices', icon: TrendingUp, label: 'Market Prices', desc: 'Live mandi prices & trends' },
  { id: 'weather', icon: Cloud, label: 'Weather Alerts', desc: 'Daily updates for your region' },
  { id: 'advisory', icon: Stethoscope, label: 'Crop Advisory', desc: 'AI-powered crop recommendations' },
  { id: 'pest', icon: Apple, label: 'Pest Scanner', desc: 'Identify diseases with photos' },
  { id: 'supplies', icon: Store, label: 'Buy Supplies', desc: 'Seeds, fertilizers & more' },
  { id: 'financial', icon: DollarSign, label: 'Loans & Insurance', desc: 'Credit options & protection' },
  { id: 'labour', icon: Users, label: 'Hire Labour', desc: 'Find farm workers nearby' },
]

const allFeatures = [
  { id: 'selling', icon: ShoppingCart, label: 'Crop Selling', color: 'from-green-500 to-emerald-500' },
  { id: 'dairy', icon: Sprout, label: 'Dairy Animals', color: 'from-orange-500 to-amber-500' },
  { id: 'irrigation', icon: Zap, label: 'Drip Irrigation', color: 'from-blue-500 to-cyan-500' },
  { id: 'weather', icon: Cloud, label: 'Weather Alerts', color: 'from-sky-500 to-blue-500' },
  { id: 'advisory', icon: Stethoscope, label: 'Crop Advisory', color: 'from-green-600 to-teal-500' },
  { id: 'schemes', icon: BookOpen, label: 'Gov. Schemes', color: 'from-purple-500 to-pink-500' },
  { id: 'financial', icon: DollarSign, label: 'Financial Tools', color: 'from-amber-500 to-orange-500' },
  { id: 'labour', icon: Users, label: 'Labour Hiring', color: 'from-indigo-500 to-purple-500' },
  { id: 'community', icon: Users2, label: 'Community', color: 'from-rose-500 to-red-500' },
  { id: 'language', icon: Languages, label: 'Languages', color: 'from-cyan-500 to-blue-500' },
  { id: 'supplies', icon: Store, label: 'Input Supplies', color: 'from-emerald-500 to-green-500' },
  { id: 'planning', icon: Sprout, label: 'Crop Planning', color: 'from-lime-500 to-green-500' },
  { id: 'prices', icon: TrendingUp, label: 'Market Prices', color: 'from-orange-500 to-red-500' },
  { id: 'transport', icon: Truck, label: 'Transport', color: 'from-gray-500 to-slate-500' },
  { id: 'testing', icon: Microscope, label: 'Soil Testing', color: 'from-amber-500 to-yellow-500' },
  { id: 'pest', icon: Apple, label: 'Pest Scanner', color: 'from-red-500 to-orange-500' },
  { id: 'water', icon: Zap, label: 'Water Mgmt', color: 'from-blue-600 to-cyan-500' },
  { id: 'calendar', icon: Calendar, label: 'Farm Calendar', color: 'from-green-500 to-emerald-500' },
  { id: 'credit', icon: CreditCard, label: 'Credit & Loans', color: 'from-green-600 to-teal-500' },
  { id: 'journal', icon: Image, label: 'Farm Journal', color: 'from-purple-500 to-pink-500' },
  { id: 'contract', icon: Handshake, label: 'Contract Farming', color: 'from-blue-500 to-indigo-500' },
  { id: 'energy', icon: Sun, label: 'Renewable Energy', color: 'from-yellow-500 to-orange-500' },
  { id: 'workers', icon: Users2, label: 'Worker Mgmt', color: 'from-indigo-500 to-purple-500' },
  { id: 'insurance', icon: Shield, label: 'Insurance', color: 'from-red-500 to-pink-500' },
  { id: 'export', icon: Globe, label: 'Export Opps', color: 'from-green-600 to-blue-500' },
  { id: 'offline', icon: Radio, label: 'Offline Mode', color: 'from-slate-500 to-gray-500' },
  { id: 'training', icon: Lightbulb, label: 'Training', color: 'from-purple-500 to-pink-500' },
  { id: 'coop', icon: Warehouse, label: 'Cooperative Hub', color: 'from-amber-500 to-orange-500' },
]

export default function HomePage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
    }
  }, [user, router])

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-12">
      {/* Welcome Header */}
      <header className="bg-gradient-to-r from-green-700 to-emerald-600 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Welcome, {user.name}! 👋</h1>
          <p className="text-green-100 text-lg">Smart farming starts here. Access 28+ tools to grow better.</p>
          {user.state && user.location && (
            <p className="text-green-100 text-sm mt-2">📍 {user.location}, {user.state}</p>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-green-500">
            <div className="text-3xl font-bold text-green-600">28+</div>
            <p className="text-gray-600 text-sm">Smart Features</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-blue-500">
            <div className="text-3xl font-bold text-blue-600">100%</div>
            <p className="text-gray-600 text-sm">Free to Use</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-orange-500">
            <div className="text-3xl font-bold text-orange-600">3x</div>
            <p className="text-gray-600 text-sm">Better Yields</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-purple-500">
            <div className="text-3xl font-bold text-purple-600">AI</div>
            <p className="text-gray-600 text-sm">Powered Tools</p>
          </div>
        </div>

        {/* Top Features Section */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <span className="w-1 h-10 bg-gradient-to-b from-green-600 to-emerald-500 rounded-full" />
              Popular Features
            </h2>
            <p className="text-gray-600 mt-2">Most used by {user.role === 'farmer' ? 'farmers' : 'users'} like you</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {topFeatures.map((feature) => {
              const Icon = feature.icon
              return (
                <Link
                  key={feature.id}
                  href={`/features/${feature.id}`}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-green-500 group"
                >
                  <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg w-fit mb-4 group-hover:from-green-600 group-hover:to-emerald-600 transition">
                    <Icon className="w-6 h-6 text-green-600 group-hover:text-white transition" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{feature.label}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </Link>
              )
            })}
          </div>
        </section>

        {/* All Features Grid */}
        <section>
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <span className="w-1 h-10 bg-gradient-to-b from-blue-600 to-cyan-500 rounded-full" />
              Explore All Tools
            </h2>
            <p className="text-gray-600 mt-2">Complete suite of agricultural solutions</p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allFeatures.map((feature) => {
              const Icon = feature.icon
              return (
                <Link
                  key={feature.id}
                  href={`/features/${feature.id}`}
                  className={`bg-gradient-to-br ${feature.color} rounded-xl shadow-md p-6 text-white hover:shadow-xl hover:scale-105 transition-all duration-300`}
                >
                  <Icon className="w-8 h-8 mb-3" />
                  <h3 className="font-bold mb-1">{feature.label}</h3>
                  <p className="text-sm opacity-90">Smart solution for your farm</p>
                </Link>
              )
            })}
          </div>
        </section>

        {/* AI Assistant CTA */}
        <section className="mt-12 bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl shadow-xl p-8 text-white">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-3 flex items-center gap-2">
                <Brain className="w-8 h-8" />
                Chat with AI Experts
              </h2>
              <p className="text-purple-100 mb-4 max-w-2xl">
                Get instant answers to your farming questions. Our AI assistants (Gemini, ChatGPT, Claude) are available 24/7 to help with crop advisory, pest control, market insights, and more.
              </p>
              <Link
                href="/chatbot"
                className="inline-block px-6 py-3 bg-white text-purple-600 font-bold rounded-lg hover:bg-gray-100 transition"
              >
                Start Chat Now →
              </Link>
            </div>
            <Brain className="w-32 h-32 opacity-20 hidden lg:block" />
          </div>
        </section>

        {/* Quick Tips */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">💡 Quick Tips</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
              <h3 className="font-bold text-blue-900 mb-2">🌾 For Better Crop Yields</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Check weather alerts daily</li>
                <li>• Use pest scanner for early detection</li>
                <li>• Follow crop advisor recommendations</li>
                <li>• Track farm activities in journal</li>
              </ul>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
              <h3 className="font-bold text-green-900 mb-2">💰 Maximize Profits</h3>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Monitor market prices in real-time</li>
                <li>• Connect with nearby buyers</li>
                <li>• Explore government subsidies</li>
                <li>• Get crop loans easily</li>
              </ul>
            </div>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-lg">
              <h3 className="font-bold text-orange-900 mb-2">🛠️ Reduce Costs</h3>
              <ul className="text-sm text-orange-800 space-y-1">
                <li>• Compare input supply prices</li>
                <li>• Rent equipment locally</li>
                <li>• Join farmer cooperatives</li>
                <li>• Access government schemes</li>
              </ul>
            </div>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg">
              <h3 className="font-bold text-purple-900 mb-2">📚 Learn & Grow</h3>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Join community discussions</li>
                <li>• Watch farming tutorials</li>
                <li>• Ask agronomist experts</li>
                <li>• Share success stories</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
