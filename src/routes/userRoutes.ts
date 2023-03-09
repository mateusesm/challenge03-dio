import { Router, Request, Response } from 'express'

import { verifyAuth } from '../middlewares/verifyAuth'
import { UserController } from '../controllers/UserController'

const router = Router()
const userController = new UserController()

router.get('/:userId', verifyAuth, (req: Request, res: Response) => userController.getUser(req, res))
router.post('/', (req: Request, res: Response) => userController.createUser(req, res))
// router.delete('/', userController.deleteUser)

export default router