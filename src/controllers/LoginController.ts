import { Request, Response } from 'express'
import { UserService } from './../services/UserService';

export class LoginController {

  userService: UserService

  constructor(
    userService = new UserService()
  ) {
    this.userService = userService
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body

    try {
      const objTokenAndIdUser = await this.userService.getToken(email, password)

      return res.status(200).json(objTokenAndIdUser)
    } catch (error) {
      return res.status(500).json({ message: 'Email/password invalid!'})
    }

  }
}