import { Request, Response } from 'express'
import validator from 'validator'
import { UserService } from '../services/UserService'

export class UserController {
  userService: UserService

  constructor(
    userService = new UserService()
  ) {
    this.userService = userService
  }

  createUser(req: Request, res: Response) {
    const { name, email, balance, password } = req.body

    if (!name) {
      return res.status(400).json({ message: 'Invalid name' })
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email' })
    }

    if (!password) {
      return res.status(400).json({ message: 'Invalid password' })
    }

    this.userService.createUser(name, email, balance, password)
    return res.status(201).json({ message: 'User created' })
  }

  async getUser(req: Request, res: Response) {
    const { userId } = req.params

    const user = await this.userService.getUser(userId)

    return res.status(200).json({
      userId: user?.id_user,
      name: user?.name,
      email: user?.email,
      balance: user?.balance
    })
  }

  /* deleteUser(req: Request, res: Response) {
    const { email } = req.body

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email' })
    }

    const userService2 = new UserService()
    userService2.deleteUser(email)
    return res.status(200).json({ message: 'User deleted' })
  } */
}