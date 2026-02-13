import express, { Request, Response} from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

// routes
import authRoutes from './modules/auth/auth.routes.js'
import eventRoutes from './modules/events/event.routes.js'
import registration from './modules/registrations/registration.routes.js'

const app = express()

app.use(cors())

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// API routes
app.use('/api/auth', authRoutes)
app.use('/api/events', eventRoutes)
app.use('/api/registrations', registration)

// Static files
app.use(express.static(path.join(__dirname, '..', 'public')))

// Home route
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: 'Page not found',
    status: 'error',
  })
})

export default app