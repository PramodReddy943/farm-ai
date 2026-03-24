import { Router, Request, Response } from 'express'
import { authenticate, AuthRequest } from '../middleware/authenticate'
import { DiseaseScan } from '../models/DiseaseScan'
import { analyzeDiseaseWithGemini, analyzeSymptoms } from '../utils/gemini-service'

const router = Router()

// POST /api/disease/scan - Upload and analyze image
router.post('/scan', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { imageBase64, cropType } = req.body

    if (!imageBase64) {
      return res.status(400).json({ error: 'Image is required' })
    }

    // Analyze with Gemini
    const analysis = await analyzeDiseaseWithGemini(imageBase64)

    // Save scan to database
    const scan = new DiseaseScan({
      userId: req.userId,
      imageUrl: imageBase64, // In production, upload to cloud storage (S3, Cloudinary)
      diseaseName: analysis.disease_name,
      confidence: analysis.confidence,
      geminiResponse: analysis,
      symptoms: analysis.symptoms,
      treatments: analysis.treatments,
      severity: analysis.severity,
      cropType,
    })

    await scan.save()

    res.json({
      id: scan._id,
      ...analysis,
    })
  } catch (error) {
    console.error('Error analyzing disease:', error)
    res.status(500).json({ error: 'Failed to analyze image' })
  }
})

// POST /api/disease/symptoms - Analyze symptoms
router.post('/symptoms', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { crop, symptoms, weather, cropType } = req.body

    if (!crop || !symptoms || !weather) {
      return res.status(400).json({ error: 'Crop, symptoms, and weather are required' })
    }

    // Analyze with Gemini
    const analysis = await analyzeSymptoms(crop, symptoms, weather)

    // Save scan to database
    const scan = new DiseaseScan({
      userId: req.userId,
      diseaseName: analysis.possible_diseases?.[0]?.name || 'Unknown',
      confidence: analysis.possible_diseases?.[0]?.probability || 0,
      geminiResponse: analysis,
      symptoms,
      treatments: analysis.possible_diseases?.[0]?.treatments || [],
      cropType: cropType || crop,
    })

    await scan.save()

    res.json({
      id: scan._id,
      ...analysis,
    })
  } catch (error) {
    console.error('Error analyzing symptoms:', error)
    res.status(500).json({ error: 'Failed to analyze symptoms' })
  }
})

// GET /api/disease/:id - Get scan results
router.get('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const scan = await DiseaseScan.findById(req.params.id)

    if (!scan) {
      return res.status(404).json({ error: 'Scan not found' })
    }

    if (scan.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' })
    }

    res.json(scan)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch scan' })
  }
})

// GET /api/disease/history/:limit - Get recent scans
router.get('/history/:limit?', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const limit = parseInt(req.params.limit || '10')
    const scans = await DiseaseScan.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .limit(limit)

    res.json(scans)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch scan history' })
  }
})

export default router
