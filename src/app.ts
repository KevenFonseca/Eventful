import express, { Request, Response, NextFunction } from 'express'
import path from 'path'

// routes
import authRoutes from './modules/auth/auth.routes.js'
import eventRoutes from './modules/events/event.routes.js'
import registration from './modules/registrations/registration.routes.js'

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// static files
app.use('/public', express.static(path.join(__dirname, 'public')))


app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to the Eventful API',
    status: 'running',
  })
})

// API routes
app.use('/api/', authRoutes)
app.use('/api/', eventRoutes)
app.use('/api/', registration)


// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: 'Page not found',
    status: 'error',
  })
})

export default app