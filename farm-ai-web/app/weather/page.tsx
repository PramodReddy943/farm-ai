'use client'

import { useEffect, useState } from 'react'
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-light-bg">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="mx-auto max-w-2xl px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Weather & Climate</h1>
          {farm?.location && (
            <p className="text-sm text-gray-600 mt-1">{farm.location}</p>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-6 space-y-6">
        <WeatherForecast />
        <CropAlerts />
      </div>
    </div>
  )
}
