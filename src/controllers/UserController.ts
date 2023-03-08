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
    const { name, email } = req.body

    if (!name) {
      return res.status(400).json({ message: 'Invalid name' })
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email' })
    }

    const userService2 = new UserService()
    userService2.createUser(name, email)
    return res.status(201).json({ message: 'User created' })
  }

  getAllUsers(req: Request, res: Response) {
    // const userService2 = new UserService()
    const users = this.userService.getAllUsers()

    return res.status(200).json(users)
  }

  deleteUser(req: Request, res: Response) {
    const { email } = req.body

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email' })
    }

    const userService2 = new UserService()
    userService2.deleteUser(email)
    return res.status(200).json({ message: 'User deleted' })
  }
}