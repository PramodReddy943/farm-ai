import { Router, Request, Response } from 'express'
import { authenticate, AuthRequest } from '../middleware/authenticate'
import { ChatMessage } from '../models/ChatMessage'
import { chatWithAI } from '../utils/gemini-service'

const router = Router()

// POST /api/chat - Send message to AI assistant
router.post('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { message, farmId } = req.body
    const messages: any[] = [{ role: 'user', content: message }]

    // In real app, fetch farm context from farmId
    const farmContext = { crops: ['Tomato', 'Wheat'], location: 'India' }

    // Get response from Gemini
    const response = await chatWithAI(messages, farmContext)

    // Save to database
    const chatMsg = new ChatMessage({
      userId: req.userId,
      farmId,
      userMessage: message,
      assistantResponse: response,
      context: farmContext,
    })

    await chatMsg.save()

    res.json({
      id: chatMsg._id,
      userMessage: message,
      assistantResponse: response,
    })
  } catch (error) {
    console.error('Chat error:', error)
    res.status(500).json({ error: 'Failed to process message' })
  }
})

// GET /api/chat/history/:farmId - Get chat history
router.get('/history/:farmId?', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const filter: any = { userId: req.userId }
    if (req.params.farmId) {
      filter.farmId = req.params.farmId
    }

    const messages = await ChatMessage.find(filter)
      .sort({ createdAt: -1 })
      .limit(50)

    res.json(messages)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch chat history' })
  }
})

export default router
