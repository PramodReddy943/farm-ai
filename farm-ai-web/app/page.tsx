'use client'

import { useAuth } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import {
  Leaf, ShoppingCart, Cloud, TrendingUp, Stethoscope, DollarSign, Users,
  BookOpen, Zap, Sprout, Store, Apple, MessageCircle, ArrowRight,
  Smartphone, Globe, Users2
} from 'lucide-react'

export default function LandingPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/home')
    }
  }, [user, router])

  const features = [
    {
      icon: ShoppingCart,
      title: 'Crop Selling',
      description: 'Connect with nearby markets and buyers. Get best prices for your crops.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: TrendingUp,
      title: 'Market Prices',
      description: 'Real-time mandi prices. Know when to sell for maximum profit.',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Cloud,
      title: 'Weather Alerts',
      description: 'Daily weather updates with crop-specific alerts and warnings.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Stethoscope,
      title: 'Crop Advisory',
      description: 'AI-powered recommendations for better yields and healthier crops.',
      color: 'from-green-600 to-teal-500',
    },
    {
      icon: Store,
      title: 'Input Supplies',
      description: 'Buy seeds, fertilizers, pesticides online with door delivery.',
      color: 'from-emerald-500 to-green-500',
    },
    {
      icon: DollarSign,
      title: 'Loans & Finance',
      description: 'Easy access to agricultural loans and crop insurance schemes.',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Apple,
      title: 'Pest Scanner',
      description: 'Click a photo, AI identifies diseases instantly. Get treatment advice.',
      color: 'from-red-500 to-orange-500',
    },
    {
      icon: Users,
      title: 'Labour Hiring',
      description: 'Find farm workers, rent equipment, and connect with suppliers.',
      color: 'from-purple-500 to-pink-500',
    },
  ]

  const whyChooseUs = [
    {
      icon: Lightning,
      title: 'Powered by AI & LLMs',
      description: 'Chat with Gemini, ChatGPT, and Claude for instant farming advice',
    },
    {
      icon: Smartphone,
      title: 'Mobile Friendly',
      description: 'Works perfectly on all devices - phones, tablets, and desktops',
    },
    {
      icon: Globe,
      title: 'Free & Accessible',
      description: '100% free platform accessible to all farmers across India',
    },
    {
      icon: Users2,
      title: 'Community Driven',
      description: 'Connect with thousands of farmers and share knowledge',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-700 via-emerald-600 to-teal-600 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Leaf className="w-8 h-8" />
              <span className="px-3 py-1 bg-green-500/20 rounded-full text-sm font-semibold">
                India's Smartest Farming Platform
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Smart Farming, Better Harvests 🌾
            </h1>
            <p className="text-xl text-green-100 mb-8 leading-relaxed">
              Access 28+ AI-powered tools to grow smarter, sell better, and earn more. From disease detection to market prices, we've got you covered.
            </p>
            <div className="flex gap-4">
              <Link
                href="/auth/signup"
                className="px-8 py-4 bg-white text-green-700 font-bold rounded-xl hover:bg-gray-100 transition flex items-center gap-2 text-lg"
              >
                Start Free Now <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/auth/login"
                className="px-8 py-4 bg-green-500/20 text-white font-bold rounded-xl hover:bg-green-500/30 transition border-2 border-white text-lg"
              >
                Sign In
              </Link>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              <div>
                <div className="text-3xl font-bold">10K+</div>
                <p className="text-green-100">Farmers</p>
              </div>
              <div>
                <div className="text-3xl font-bold">28+</div>
                <p className="text-green-100">Features</p>
              </div>
              <div>
                <div className="text-3xl font-bold">48h</div>
                <p className="text-green-100">Support</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="hidden md:block">
            <div className="bg-white/10 rounded-3xl p-8 backdrop-blur-md border border-white/20">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl h-96 flex items-center justify-center">
                <div className="text-center">
                  <Sprout className="w-32 h-32 text-green-600 mx-auto mb-4" />
                  <p className="text-green-700 font-semibold">FarmAI Dashboard</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">28+ Smart Features</h2>
            <p className="text-xl text-gray-600">Everything you need to succeed in modern farming</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-100"
                >
                  <div className={`bg-gradient-to-br ${feature.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* AI Integration Highlight */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <MessageCircle className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Chat with AI Experts 🤖</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
            Get instant answers from 3 powerful AI assistants - Google Gemini, ChatGPT, and Claude. Ask about crops, pests, market prices, or anything farm-related!
          </p>
          <Link
            href="/auth/signup"
            className="inline-block px-8 py-4 bg-white text-purple-600 font-bold rounded-xl hover:bg-gray-100 transition"
          >
            Try AI Chat Now →
          </Link>
        </div>
      </section>

      {/* Why Choose FarmAI */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Why Choose FarmAI?</h2>
            <p className="text-xl text-gray-600">The complete platform for modern farmers</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, idx) => {
              const Icon = item.icon
              return (
                <div key={idx} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">For Everyone in Agriculture</h2>
            <p className="text-xl text-gray-600">Tailored solutions for farmers, buyers, and suppliers</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-green-500">
              <div className="text-4xl mb-4">🚜</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">For Farmers</h3>
              <ul className="space-y-3 text-gray-700">
                <li>✓ Grow better crops with AI advice</li>
                <li>✓ Sell directly to buyers</li>
                <li>✓ Get real-time market prices</li>
                <li>✓ Access government schemes</li>
                <li>✓ Get easy loans and insurance</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-blue-500">
              <div className="text-4xl mb-4">🛒</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">For Buyers</h3>
              <ul className="space-y-3 text-gray-700">
                <li>✓ Find quality crops nearby</li>
                <li>✓ Direct contact with farmers</li>
                <li>✓ Verify crop quality</li>
                <li>✓ Negotiated bulk pricing</li>
                <li>✓ Arrange logistics easily</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-orange-500">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">For Suppliers</h3>
              <ul className="space-y-3 text-gray-700">
                <li>✓ Reach more farmers</li>
                <li>✓ Sell seeds & fertilizers</li>
                <li>✓ Offer equipment rental</li>
                <li>✓ Build customer base</li>
                <li>✓ Grow your business</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-700 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Grow Smarter? 🌱</h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of farmers who are already using FarmAI to make better decisions and earn more.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/auth/signup"
              className="px-8 py-4 bg-white text-green-700 font-bold rounded-xl hover:bg-gray-100 transition flex items-center gap-2"
            >
              Sign Up Free <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 text-white font-bold mb-4">
                <Leaf className="w-6 h-6" />
                FarmAI
              </div>
              <p className="text-sm">Making farming smarter for every farmer in India.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Features</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white">Crop Advisory</Link></li>
                <li><Link href="#" className="hover:text-white">Market Prices</Link></li>
                <li><Link href="#" className="hover:text-white">Disease Detection</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white">About Us</Link></li>
                <li><Link href="#" className="hover:text-white">Contact</Link></li>
                <li><Link href="#" className="hover:text-white">Privacy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white">FAQ</Link></li>
                <li><Link href="#" className="hover:text-white">Contact Support</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2024 FarmAI. All rights reserved. Helping farmers grow smarter.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
