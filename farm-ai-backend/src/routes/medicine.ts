import { Router, Request, Response } from 'express'
import { Medicine } from '../models/Medicine'

const router = Router()

// GET /api/medicines - Get medicines by disease
router.get('/', async (req: Request, res: Response) => {
  try {
    const { disease, name } = req.query

    let filter: any = {}
    if (disease) {
      filter.diseases = disease
    }
    if (name) {
      filter.name = { $regex: name, $options: 'i' }
    }

    const medicines = await Medicine.find(filter).limit(20)
    res.json(medicines)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch medicines' })
  }
})

// GET /api/medicines/:id - Get medicine details
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const medicine = await Medicine.findById(req.params.id)

    if (!medicine) {
      return res.status(404).json({ error: 'Medicine not found' })
    }

    res.json(medicine)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch medicine' })
  }
})

// Optional: Admin route to add medicines (with authentication)
router.post('/', async (req: Request, res: Response) => {
  try {
    const medicineData = req.body

    const medicine = new Medicine(medicineData)
    await medicine.save()

    res.status(201).json(medicine)
  } catch (error) {
    res.status(400).json({ error: 'Failed to create medicine' })
  }
})

export default router
