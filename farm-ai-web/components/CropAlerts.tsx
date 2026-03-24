'use client'

import { AlertTriangle, Droplets, Thermometer, Wind } from 'lucide-react'

const alerts = [
  {
    type: 'fungal',
    message: 'High humidity alert: Watch for fungal diseases (75%+ humidity)',
    severity: 'high',
    icon: AlertTriangle,
  },
  {
    type: 'irrigation',
    message: 'Rainfall expected: Adjust irrigation schedule for Wednesday',
    severity: 'medium',
    icon: Droplets,
  },
  {
    type: 'heat',
    message: 'Extreme heat warning: Ensure adequate irrigation (35°C expected)',
    severity: 'high',
    icon: Thermometer,
  },
]

export default function CropAlerts() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Crop Alerts</h2>
      {alerts.map((alert, i) => {
        const Icon = alert.icon
        const bgColor = alert.severity === 'high' ? 'bg-red-50' : 'bg-yellow-50'
        const textColor = alert.severity === 'high' ? 'text-red-700' : 'text-yellow-700'
        const borderColor = alert.severity === 'high' ? 'border-red-200' : 'border-yellow-200'

        return (
          <div
            key={i}
            className={`${bgColor} border ${borderColor} rounded-lg p-4 flex gap-3`}
          >
            <Icon size={20} className={textColor} />
            <div>
              <p className={`${textColor} font-medium text-sm`}>{alert.message}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
