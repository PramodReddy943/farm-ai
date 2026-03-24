'use client'

import Hero from '@/components/Hero'
import QuickActions from '@/components/QuickActions'
import RecentScans from '@/components/RecentScans'
import WeatherWidget from '@/components/WeatherWidget'
import CropAdvisory from '@/components/CropAdvisory'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-light-bg pb-24">
      {/* Welcome Header */}
      <header className="bg-gradient-to-r from-green-700 to-emerald-600 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Welcome Back! 👋</h1>
          <p className="text-green-100">Your farm is looking great today</p>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4">
        {/* Quick Action Buttons */}
        <section className="py-6">
          <QuickActions />
        </section>

        {/* Weather Widget */}
        <section className="py-6">
          <WeatherWidget />
        </section>

        {/* Recent Disease Scans */}
        <section className="py-6">
          <RecentScans />
        </section>

        {/* Crop Advisory */}
        <section className="py-6">
          <CropAdvisory />
        </section>
      </div>
    </div>
  )
}
