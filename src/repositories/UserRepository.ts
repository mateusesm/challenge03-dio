import { EntityManager } from "typeorm"
import bcryptjs from 'bcryptjs'
import { User } from "../entities/User"

export class UserRepository {
  private manager: EntityManager

  constructor(
    manager: EntityManager
  ) {
    this.manager = manager
  }

  async createUser(user: User): Promise<User> {
    const password_hash = await bcryptjs.hash(user.password, 8)
    user.password = password_hash
    return this.manager.save(user)
  }

  async getUser(userId: string): Promise<User | null> {
    return this.manager.findOne(User, {
      where: {
        id_user: userId,
      }
    })
  }

  async getUserByEmail(email: string, pass: string): Promise<User | null> {
    const user = await this.manager.findOne(User, {
      where: {
        email,
      }
    })

    if (!user) return null

    const isValid = await this.passwordIsValid(pass, user.password)

    if (!isValid) return null

    return user
  }

  async passwordIsValid(pass: string, password: string): Promise<boolean> {
    return bcryptjs.compare(pass, password)
  }
}