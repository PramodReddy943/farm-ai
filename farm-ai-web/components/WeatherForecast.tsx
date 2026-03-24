'use client'

export default function WeatherForecast() {
  const forecast = [
    { day: 'Monday', high: 32, low: 24, condition: 'Sunny', icon: '☀️', humidity: 60, rainfall: 0 },
    { day: 'Tuesday', high: 30, low: 23, condition: 'Partly Cloudy', icon: '⛅', humidity: 65, rainfall: 5 },
    { day: 'Wednesday', high: 28, low: 22, condition: 'Rainy', icon: '🌧️', humidity: 85, rainfall: 45 },
    { day: 'Thursday', high: 26, low: 20, condition: 'Cloudy', icon: '☁️', humidity: 75, rainfall: 15 },
    { day: 'Friday', high: 29, low: 22, condition: 'Sunny', icon: '☀️', humidity: 55, rainfall: 0 },
    { day: 'Saturday', high: 31, low: 23, condition: 'Sunny', icon: '☀️', humidity: 50, rainfall: 0 },
    { day: 'Sunday', high: 33, low: 25, condition: 'Hot', icon: '🔥', humidity: 45, rainfall: 0 },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">7-Day Forecast</h2>
      <div className="space-y-3">
        {forecast.map((day, i) => (
          <div key={i} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{day.day}</h3>
                <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                  <span>{day.icon}</span>
                  {day.condition}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">
                  {day.high}°
                  <span className="text-gray-500 font-normal">/{day.low}°</span>
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-gray-100 text-sm text-gray-600">
              <div>Humidity: {day.humidity}%</div>
              <div>Rainfall: {day.rainfall}mm</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
