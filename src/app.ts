import express, { Request, Response } from 'express'

const app = express()

// Middleware
app.use(express.json())

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to Eventful')
});

app.use((req, res) => {
  res.status(404).send('Page no found');
});

export default app