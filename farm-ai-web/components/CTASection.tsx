'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-700 to-emerald-600">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main CTA */}
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
          Ready to Transform Your Farm?
        </h2>
        <p className="text-xl text-green-100 mb-12 max-w-2xl mx-auto">
          Join thousands of farmers using FarmAI to detect diseases early, optimize yields, and make smarter decisions
        </p>

        {/* Primary CTA Button */}
        <Link
          href="/disease/scanner"
          className="inline-flex items-center gap-2 bg-white text-green-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-50 transition transform hover:scale-105"
        >
          Start Free Today <ArrowRight className="w-5 h-5" />
        </Link>

        {/* Secondary Info */}
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur rounded-lg p-6 border border-white/20">
            <div className="text-2xl mb-2">✅</div>
            <h3 className="text-white font-bold mb-2">No Credit Card</h3>
            <p className="text-green-100 text-sm">Get started completely free</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-6 border border-white/20">
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="text-white font-bold mb-2">Instant Results</h3>
            <p className="text-green-100 text-sm">Analyze crops in seconds</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-6 border border-white/20">
            <div className="text-2xl mb-2">🔐</div>
            <h3 className="text-white font-bold mb-2">100% Private</h3>
            <p className="text-green-100 text-sm">Your data stays yours</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-green-100 text-sm">
          <p>Questions? <a href="#" className="text-white hover:underline">Contact our support team</a></p>
        </div>
      </div>
    </section>
  )
}
