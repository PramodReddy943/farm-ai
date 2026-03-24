'use client'

import Link from 'next/link'
import { ArrowRight, Leaf, Zap, Globe } from 'lucide-react'

export default function LandingHero() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] bg-repeat" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-green-400 rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6 text-green-900" />
            </div>
            <span className="text-white text-2xl font-bold">FarmAI</span>
          </div>
          <div className="hidden md:flex gap-8">
            <a href="#features" className="text-white hover:text-green-300 transition">Features</a>
            <a href="#about" className="text-white hover:text-green-300 transition">About</a>
            <a href="#ai-assistants" className="text-white hover:text-green-300 transition">AI Assistants</a>
          </div>
          <Link
            href="/disease/scanner"
            className="bg-green-400 text-green-900 px-6 py-2 rounded-full font-semibold hover:bg-green-300 transition flex items-center gap-2"
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-block bg-green-400/20 border border-green-400 rounded-full px-4 py-2 text-green-300 mb-6">
              ✨ Revolutionizing Farming with AI
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
              Smart Farming, Better Harvests
            </h1>
            <p className="text-xl text-green-100 mb-8 max-w-md">
              AI-powered disease detection, personalized farming advice, and real-time weather alerts. 
              Everything a modern farmer needs in one app.
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-4 flex-wrap">
              <Link
                href="/disease/scanner"
                className="bg-green-400 text-green-900 px-8 py-3 rounded-lg font-semibold hover:bg-green-300 transition flex items-center gap-2"
              >
                Start Scanning <Zap className="w-5 h-5" />
              </Link>
              <a
                href="#ai-assistants"
                className="border-2 border-green-400 text-green-400 px-8 py-3 rounded-lg font-semibold hover:bg-green-400/10 transition"
              >
                Explore AI Assistants
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              <div>
                <div className="text-3xl font-bold text-green-300">10K+</div>
                <div className="text-green-100">Active Farmers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-300">50K+</div>
                <div className="text-green-100">Crops Analyzed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-300">98%</div>
                <div className="text-green-100">Accuracy Rate</div>
              </div>
            </div>
          </div>

          {/* Right - Hero Image Placeholder */}
          <div className="relative">
            <div className="relative w-full h-96 sm:h-[500px] bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-2xl border-2 border-green-400/30 overflow-hidden flex items-center justify-center">
              <div className="text-center">
                <Globe className="w-24 h-24 text-green-300 mx-auto mb-4 opacity-50" />
                <p className="text-green-200 text-lg">🌾 Lush Fields Ready for Growth</p>
              </div>
            </div>
            {/* Floating cards */}
            <div className="absolute -right-6 bottom-12 bg-white rounded-lg shadow-lg p-4 w-64 transform hover:scale-105 transition">
              <div className="text-green-600 font-semibold text-sm">Disease Alert</div>
              <div className="text-2xl font-bold text-gray-800 mt-2">Early Blight</div>
              <div className="text-gray-600 text-sm mt-2">Detected with 94% confidence</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="relative z-10 flex justify-center pb-8">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  )
}
