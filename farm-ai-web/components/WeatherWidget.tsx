'use client'

import { useState, useEffect } from 'react'
import { Cloud, CloudRain, Wind, Droplets } from 'lucide-react'

export default function WeatherWidget() {
  const [weather, setWeather] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulated weather data - replace with OpenWeatherMap API
    setWeather({
      temp: 28,
      condition: 'Partly Cloudy',
      humidity: 65,
      windSpeed: 12,
      forecast: [
        { day: 'Mon', high: 30, low: 22, condition: 'Sunny' },
        { day: 'Tue', high: 28, low: 21, condition: 'Cloudy' },
        { day: 'Wed', high: 25, low: 19, condition: 'Rainy' },
      ],
    })
    setLoading(false)
  }, [])

  if (loading) {
    return <div className="animate-pulse h-24 bg-gray-200 rounded-lg" />
  }

  return (
    <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-lg p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm opacity-90">Current Weather</p>
          <h3 className="text-4xl font-bold">{weather?.temp}°C</h3>
          <p className="text-sm opacity-90 mt-1">{weather?.condition}</p>
        </div>
        <div className="text-5xl">☁️</div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-blue-300">
        <div className="flex items-center gap-2">
          <Droplets size={20} />
          <div>
            <p className="text-xs opacity-75">Humidity</p>
            <p className="font-semibold">{weather?.humidity}%</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Wind size={20} />
          <div>
            <p className="text-xs opacity-75">Wind</p>
            <p className="font-semibold">{weather?.windSpeed} km/h</p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-blue-300">
        <p className="text-xs opacity-75 mb-2">3-Day Forecast</p>
        <div className="flex gap-2">
          {weather?.forecast?.map((f: any, i: number) => (
            <div key={i} className="text-center text-sm flex-1">
              <p className="font-semibold">{f.day}</p>
              <p className="text-xs opacity-75">{f.high}°/{f.low}°</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
