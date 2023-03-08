import express, { Request, Response } from 'express'
import { AppDataSource } from './database'
import 'reflect-metadata'

import userRoutes from './routes/userRoutes'



const server = express()
const PORT = 3000

server.use(express.json())
server.use('/user', userRoutes)

server.get('/', (req: Request, res: Response) => {
  return res.status(200).json({ message: 'DioBank' })
})

server.listen(PORT, () => {
  console.log(`Server on running in port ${PORT}`)
  console.log(`Access in http://localhost:${PORT}`)
})