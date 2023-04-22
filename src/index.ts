import express, { Request, Response } from 'express'
import { AppDataSource } from './database'
import 'reflect-metadata'
import cors from 'cors'

import userRoutes from './routes/userRoutes'
import loginRoutes from './routes/loginRoutes'

const server = express()
const PORT = 3000

server.use(express.json())
server.use(cors())
server.use('/user', userRoutes)
server.use('/login', loginRoutes)

server.get('/', (req: Request, res: Response) => {
  return res.status(200).json({ message: 'DioBank' })
})

server.listen(PORT, () => {
  console.log(`Server on running in port ${PORT}`)
  console.log(`Access in http://localhost:${PORT}`)
})