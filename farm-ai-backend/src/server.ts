import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

// Load environment variables
dotenv.config()

// Import routes
import authRoutes from './routes/auth'
import farmRoutes from './routes/farm'
import diseaseRoutes from './routes/disease'
import medicineRoutes from './routes/medicine'
import weatherRoutes from './routes/weather'
import chatRoutes from './routes/chat'

// Import middleware
import { errorHandler } from './middleware/errorHandler'
import { requestLogger } from './middleware/requestLogger'

const app: Express = express()
const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/farm-ai'

// Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(requestLogger)

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'Server is running', timestamp: new Date() })
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/farm', farmRoutes)
app.use('/api/disease', diseaseRoutes)
app.use('/api/medicines', medicineRoutes)
app.use('/api/weather', weatherRoutes)
app.use('/api/chat', chatRoutes)

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`,
  })
})

// Error handling middleware
app.use(errorHandler)

// Database connection
async function connectDatabase() {
  try {
    await mongoose.connect(MONGODB_URI, {
      retryWrites: true,
      w: 'majority',
    })
    console.log('✓ MongoDB connected successfully')
  } catch (error) {
    console.error('✗ MongoDB connection error:', error)
    process.exit(1)
  }
}

// Start server
async function startServer() {
  try {
    await connectDatabase()
    app.listen(PORT, () => {
      console.log(`
╔════════════════════════════════════════╗
║         FarmAI Backend Server          ║
║                                        ║
║  Server running at:                    ║
║  http://localhost:${String(PORT).padStart(4)}                  ║
║                                        ║
║  Environment: ${process.env.NODE_ENV || 'development'.padEnd(15)} ║
╚════════════════════════════════════════╝
      `)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server')
  mongoose.connection.close()
  process.exit(0)
})

startServer()

export default app
