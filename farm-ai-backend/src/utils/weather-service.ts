import axios from 'axios'

const WEATHER_API_KEY = process.env.WEATHER_API_KEY
const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast' // Free weather API

export async function getWeatherForecast(latitude: number, longitude: number) {
  try {
    const response = await axios.get(WEATHER_API_URL, {
      params: {
        latitude,
        longitude,
        daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum,relative_humidity_2m_max,windspeed_10m_max',
        timezone: 'auto',
      },
    })

    return {
      latitude: response.data.latitude,
      longitude: response.data.longitude,
      timezone: response.data.timezone,
      daily: response.data.daily,
    }
  } catch (error) {
    console.error('Error fetching weather:', error)
    throw error
  }
}

export async function getCropAlerts(farmData: any, weatherData: any) {
  const alerts = []

  // Check humidity for fungal diseases
  if (weatherData.daily.relative_humidity_2m_max[0] > 75) {
    alerts.push({
      type: 'fungal',
      message: 'High humidity alert: Watch for fungal diseases',
      severity: 'high',
    })
  }

  // Check temperature extremes
  if (weatherData.daily.temperature_2m_max[0] > 35) {
    alerts.push({
      type: 'heat',
      message: 'Extreme heat warning: Ensure adequate irrigation',
      severity: 'high',
    })
  }

  // Check rainfall
  if (weatherData.daily.precipitation_sum[2] > 30) {
    alerts.push({
      type: 'irrigation',
      message: 'Rainfall expected: Adjust irrigation schedule',
      severity: 'medium',
    })
  }

  return alerts
}
