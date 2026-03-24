import { Router, Request, Response } from 'express'
import { getWeatherForecast, getCropAlerts } from '../utils/weather-service'
import { Farm } from '../models/Farm'
import { authenticate, AuthRequest } from '../middleware/authenticate'

const router = Router()

// GET /api/weather/:farmId - Get weather forecast
router.get('/:farmId', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const farm = await Farm.findById(req.params.farmId)

    if (!farm) {
      return res.status(404).json({ error: 'Farm not found' })
    }

    if (farm.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' })
    }

    // Get coordinates from farm or use default
    const { latitude = 20.5937, longitude = 78.9629 } = farm.coordinates || {}

    // Fetch weather
    const weather = await getWeatherForecast(latitude, longitude)

    // Get crop-specific alerts
    const alerts = await getCropAlerts(farm, weather)

    res.json({
      weather,
      alerts,
      location: farm.location,
      crops: farm.crops,
    })
  } catch (error) {
    console.error('Weather error:', error)
    res.status(500).json({ error: 'Failed to fetch weather' })
  }
})

export default router
