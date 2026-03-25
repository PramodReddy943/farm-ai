'use client'

import { useState } from 'react'
import { Cloud, CloudRain, Wind, Droplets, Eye, AlertTriangle, Bell } from 'lucide-react'
import { useAuth } from '@/lib/auth'

interface WeatherData {
  date: string
  temp: number
  humidity: number
  rainfall: number
  windSpeed: number
  visibility: number
  condition: string
  icon: React.ReactNode
}

interface Alert {
  title: string
  description: string
  severity: 'high' | 'medium' | 'low'
  action: string
}

const weeklyWeather: WeatherData[] = [
  {
    date: 'Today',
    temp: 32,
    humidity: 65,
    rainfall: 0,
    windSpeed: 12,
    visibility: 10,
    condition: 'Sunny',
    icon: <Cloud className="w-12 h-12 text-yellow-400" />,
  },
  {
    date: 'Tomorrow',
    temp: 31,
    humidity: 70,
    rainfall: 5,
    windSpeed: 15,
    visibility: 9,
    condition: 'Partly Cloudy',
    icon: <Cloud className="w-12 h-12 text-gray-400" />,
  },
  {
    date: 'Day 3',
    temp: 28,
    humidity: 80,
    rainfall: 20,
    windSpeed: 18,
    visibility: 7,
    condition: 'Light Rain',
    icon: <CloudRain className="w-12 h-12 text-blue-400" />,
  },
  {
    date: 'Day 4',
    temp: 26,
    humidity: 85,
    rainfall: 40,
    windSpeed: 22,
    visibility: 5,
    condition: 'Heavy Rain',
    icon: <CloudRain className="w-12 h-12 text-blue-600" />,
  },
  {
    date: 'Day 5',
    temp: 27,
    humidity: 75,
    rainfall: 10,
    windSpeed: 16,
    visibility: 8,
    condition: 'Drizzle',
    icon: <CloudRain className="w-12 h-12 text-blue-300" />,
  },
  {
    date: 'Day 6',
    temp: 30,
    humidity: 60,
    rainfall: 0,
    windSpeed: 10,
    visibility: 10,
    condition: 'Clear',
    icon: <Cloud className="w-12 h-12 text-yellow-300" />,
  },
]

const alerts: Alert[] = [
  {
    title: 'Heavy Rain Alert',
    description: 'Heavy rainfall expected in next 48 hours. Moisture may cause fungal diseases.',
    severity: 'high',
    action: 'Apply fungicide this week',
  },
  {
    title: 'Strong Wind Warning',
    description: 'Wind speed up to 22 km/h expected. Risk to flowering crops.',
    severity: 'medium',
    action: 'Support tall crops, protect flowers',
  },
  {
    title: 'Optimal Growing Conditions',
    description: 'Ideal temperature and humidity for crop growth this week.',
    severity: 'low',
    action: 'Continue regular watering',
  },
]

const cropCalendar = [
  {
    crop: 'Wheat',
    stage: 'Grain Filling',
    waterNeeds: 'Moderate',
    riskLevel: 'Low',
    bestDay: 'Day 5-6 (After rain)',
  },
  {
    crop: 'Rice',
    stage: 'Maturity',
    waterNeeds: 'Low',
    riskLevel: 'High (Rain may damage)',
    bestDay: 'Avoid next 2 days',
  },
  {
    crop: 'Cotton',
    stage: 'Flowering',
    waterNeeds: 'Moderate',
    riskLevel: 'Medium (Wind risk)',
    bestDay: 'Day 2',
  },
]

export default function WeatherAlertsPage() {
  const { user } = useAuth()
  const [selectedDay, setSelectedDay] = useState(0)
  const [notifications, setNotifications] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-12">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Cloud className="w-8 h-8" />
            <h1 className="text-4xl font-bold">Weather Alerts</h1>
          </div>
          <p className="text-blue-100">
            {user?.location ? `Weather for ${user.location}` : 'Local weather forecasts and crop alerts'}
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Alerts Section */}
        <div className="mb-12 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">⚠️ Important Alerts</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {alerts.map((alert, idx) => (
              <div
                key={idx}
                className={`rounded-xl shadow-lg p-5 border-l-4 ${
                  alert.severity === 'high'
                    ? 'bg-red-50 border-red-600'
                    : alert.severity === 'medium'
                      ? 'bg-yellow-50 border-yellow-600'
                      : 'bg-green-50 border-green-600'
                }`}
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle
                    className={`w-5 h-5 flex-shrink-0 mt-1 ${
                      alert.severity === 'high'
                        ? 'text-red-600'
                        : alert.severity === 'medium'
                          ? 'text-yellow-600'
                          : 'text-green-600'
                    }`}
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">{alert.title}</h3>
                    <p className="text-sm text-gray-700 my-2">{alert.description}</p>
                    <p className="text-xs font-semibold text-gray-800">Action: {alert.action}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Toggle */}
        <div className="mb-8 bg-white rounded-xl shadow-lg p-6 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-gray-900">Get Notifications</h3>
            <p className="text-sm text-gray-600">
              Receive alerts for severe weather and crop recommendations
            </p>
          </div>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              notifications
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {notifications ? '🔔 On' : '🔕 Off'}
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Weather Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Selected Day Details */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  {weeklyWeather[selectedDay].icon}
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {weeklyWeather[selectedDay].condition}
                </h2>
                <p className="text-5xl font-bold text-blue-600 my-2">
                  {weeklyWeather[selectedDay].temp}°C
                </p>
                <p className="text-gray-600">{weeklyWeather[selectedDay].date}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center">
                  <Droplets className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Humidity</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {weeklyWeather[selectedDay].humidity}%
                  </p>
                </div>
                <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg p-4 text-center">
                  <CloudRain className="w-6 h-6 text-cyan-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Rainfall</p>
                  <p className="text-2xl font-bold text-cyan-600">
                    {weeklyWeather[selectedDay].rainfall}mm
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 text-center">
                  <Wind className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Wind Speed</p>
                  <p className="text-2xl font-bold text-green-600">
                    {weeklyWeather[selectedDay].windSpeed}km/h
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 text-center">
                  <Eye className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Visibility</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {weeklyWeather[selectedDay].visibility}km
                  </p>
                </div>
              </div>
            </div>

            {/* 7-Day Forecast */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">7-Day Forecast</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-4">
                {weeklyWeather.map((day, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedDay(idx)}
                    className={`p-4 rounded-lg transition border-2 ${
                      selectedDay === idx
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-400'
                    }`}
                  >
                    <div className="text-center">
                      <p className="text-sm font-semibold text-gray-600 mb-2">{day.date}</p>
                      <div className="flex justify-center mb-2">{day.icon}</div>
                      <p className="text-lg font-bold text-gray-900">{day.temp}°</p>
                      <p className="text-xs text-gray-600 mt-1">{day.rainfall}mm</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Crop Calendar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Crop Calendar</h2>
              <div className="space-y-4">
                {cropCalendar.map((item, idx) => (
                  <div key={idx} className="border-l-4 border-blue-500 pl-4 py-2">
                    <p className="font-bold text-gray-900">{item.crop}</p>
                    <div className="space-y-1 text-sm text-gray-600 mt-2">
                      <p>
                        <span className="font-semibold">Stage:</span> {item.stage}
                      </p>
                      <p>
                        <span className="font-semibold">Water:</span> {item.waterNeeds}
                      </p>
                      <p
                        className={`${
                          item.riskLevel.includes('High')
                            ? 'text-red-600 font-semibold'
                            : 'text-yellow-600'
                        }`}
                      >
                        <span className="font-semibold">Risk:</span> {item.riskLevel}
                      </p>
                    </div>
                    <p className="text-xs bg-blue-50 text-blue-800 mt-2 p-2 rounded font-semibold">
                      {item.bestDay}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-900 mb-3">Weather Tips</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Avoid pesticide spray before rain</li>
                <li>• Irrigate after rain if needed</li>
                <li>• Watch for fungal diseases</li>
                <li>• Harvest before heavy rain</li>
                <li>• Check soil moisture daily</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
