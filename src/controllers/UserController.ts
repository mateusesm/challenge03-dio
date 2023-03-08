import { Request, Response } from 'express'
import { UserService } from '../services/UserService'

export class UserController {
  userService: UserService

  constructor(userService = new UserService()) {
    this.userService = userService
  }

  createUser(req: Request, res: Response) {
    const { name, email } = req.body

    if (!name) {
      return res.status(400).json({ message: 'Invalid name' })
    }

    this.userService.createUser(name, email)
    return res.status(201).json({ message: 'User created' })
  }

  getAllUsers(req: Request, res: Response) {
    const users = this.userService.getAllUsers()

    return res.status(200).json(users)
  }
}