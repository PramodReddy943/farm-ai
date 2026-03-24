import { Router, Request, Response } from 'express'
import { authenticate, AuthRequest } from '../middleware/authenticate'
import { Farm } from '../models/Farm'

const router = Router()

// GET /api/farm/:id - Get farm details
router.get('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const farm = await Farm.findById(req.params.id)

    if (!farm) {
      return res.status(404).json({ error: 'Farm not found' })
    }

    if (farm.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' })
    }

    res.json(farm)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch farm' })
  }
})

// POST /api/farm - Create new farm
router.post('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { name, size, location, crops, soilType } = req.body

    if (!name || !size || !location) {
      return res.status(400).json({ error: 'Name, size, and location are required' })
    }

    const farm = new Farm({
      userId: req.userId,
      name,
      size,
      location,
      crops: crops || [],
      soilType,
    })

    await farm.save()
    res.status(201).json(farm)
  } catch (error) {
    res.status(400).json({ error: 'Failed to create farm' })
  }
})

// PUT /api/farm/:id - Update farm details
router.put('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const farm = await Farm.findById(req.params.id)

    if (!farm) {
      return res.status(404).json({ error: 'Farm not found' })
    }

    if (farm.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' })
    }

    Object.assign(farm, req.body)
    await farm.save()

    res.json(farm)
  } catch (error) {
    res.status(400).json({ error: 'Failed to update farm' })
  }
})

// DELETE /api/farm/:id - Delete farm
router.delete('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const farm = await Farm.findById(req.params.id)

    if (!farm) {
      return res.status(404).json({ error: 'Farm not found' })
    }

    if (farm.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' })
    }

    await Farm.deleteOne({ _id: req.params.id })
    res.json({ message: 'Farm deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete farm' })
  }
})

export default router
