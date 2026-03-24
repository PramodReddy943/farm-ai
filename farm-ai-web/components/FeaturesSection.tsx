'use client'

import { Leaf, Zap, Cloud, MessageSquare, TrendingUp, Shield } from 'lucide-react'

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  color: string
}

const features: Feature[] = [
  {
    icon: <Leaf className="w-8 h-8" />,
    title: 'Disease Detection',
    description: 'AI-powered image analysis to identify diseases instantly',
    color: 'text-green-600',
  },
  {
    icon: <Cloud className="w-8 h-8" />,
    title: 'Weather Integration',
    description: 'Real-time forecasts and automated crop alerts',
    color: 'text-blue-600',
  },
  {
    icon: <MessageSquare className="w-8 h-8" />,
    title: 'Smart Assistant',
    description: 'Get personalized farming advice from multiple AI experts',
    color: 'text-purple-600',
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: 'Yield Optimization',
    description: 'Data-driven recommendations to boost your harvest',
    color: 'text-emerald-600',
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'Fast Analysis',
    description: 'Get results in seconds, not hours',
    color: 'text-yellow-600',
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Farm Privacy',
    description: 'Your farm data is always secure and private',
    color: 'text-red-600',
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Powerful Features Built for Farmers
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to modernize your farming and increase productivity
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 hover:shadow-lg transition transform hover:scale-105 border border-gray-200"
            >
              <div className={`${feature.color} mb-4`}>{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Feature Highlight */}
        <div className="mt-20 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-12 text-white">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">Why Choose FarmAI?</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <span className="text-2xl">✓</span>
                  <span>Over 10,000 active farmers trust us</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">✓</span>
                  <span>98% accuracy in disease detection</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">✓</span>
                  <span>Available 24/7 with no downtime</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">✓</span>
                  <span>Works in all languages</span>
                </li>
              </ul>
            </div>
            <div className="bg-white/10 rounded-xl p-8 border border-white/20">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">98%</div>
                <div className="text-lg mb-6">Average Accuracy Rate</div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-bold">50K+</div>
                    <div>Crops Analyzed</div>
                  </div>
                  <div>
                    <div className="font-bold">150+</div>
                    <div>Countries</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
