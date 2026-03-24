import { Request, Response, NextFunction } from 'express'

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now()
  
  res.on('finish', () => {
    const duration = Date.now() - start
    const timestamp = new Date().toISOString()
    const statusCode = res.statusCode
    const color = statusCode < 400 ? '\x1b[32m' : statusCode < 500 ? '\x1b[33m' : '\x1b[31m'
    
    console.log(
      `${color}[${timestamp}] ${req.method} ${req.path} - ${statusCode} (${duration}ms)\x1b[0m`
    )
  })
  
  next()
}
