import { Router, Request, Response } from 'express'

import { LoginController } from "../controllers/LoginController"

const router = Router()
const loginController = new LoginController()

router.post('/', (req: Request, res: Response) => loginController.login(req, res))

export default router