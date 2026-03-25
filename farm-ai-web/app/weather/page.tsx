'use client'

import { useEffect, useState } from 'react'
import { Cloud, AlertCircle, Droplets } from 'lucide-react'
import WeatherForecast from '@/components/WeatherForecast'
import CropAlerts from '@/components/CropAlerts'
import { useStore } from '@/lib/store'

export default function WeatherPage() {
  const [loading, setLoading] = useState(true)
  const { farm } = useStore()

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mb-4" />
          <p className="text-gray-600 font-medium">Loading weather data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Beautiful Header */}
      <header className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 text-white shadow-lg">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <Cloud className="w-8 h-8" />
            <h1 className="text-4xl font-bold">Weather & Climate</h1>
          </div>
          {farm?.location && (
            <p className="text-blue-100 text-lg ml-11">📍 {farm.location}</p>
          )}
          <p className="text-blue-100 mt-2">Real-time forecasts to plan your farming activities</p>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Weather Stats Summary */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Cloud className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Current Condition</p>
                <p className="font-bold text-gray-900">Partly Cloudy</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl border border-cyan-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-cyan-100 rounded-lg">
                <Droplets className="w-6 h-6 text-cyan-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Rainfall Chance</p>
                <p className="font-bold text-gray-900">35%</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl border border-teal-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-teal-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Weather Alerts</p>
                <p className="font-bold text-gray-900">None</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          <section>
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <span className="w-1 h-8 bg-gradient-to-b from-blue-600 to-cyan-500 rounded-full" />
                7-Day Forecast
              </h2>
            </div>
            <WeatherForecast />
          </section>

          <section>
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <span className="w-1 h-8 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full" />
                Weather Alerts for Your Crops
              </h2>
            </div>
            <CropAlerts />
          </section>
        </div>
      </div>
    </div>
  )
}
