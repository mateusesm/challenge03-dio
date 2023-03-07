import { Router } from 'express'
import { UserController } from '../controllers/UserController'

const router = Router()
const userController = new UserController()

router.get('/', userController.getAllUsers)
router.post('/', userController.createUser)

export default router