import { sign } from 'jsonwebtoken';
import { AppDataSource } from '../database'
import { User } from '../entities/User'
import { UserRepository } from './../repositories/UserRepository'

export class UserService {
  private userRepository: UserRepository

  constructor(
    userRepository = new UserRepository(AppDataSource.manager)
  ) {
    this.userRepository = userRepository
  }

  async createUser(name: string, email: string, balance: number, password: string): Promise<User> {
    const user = new User(name, email, balance, password)
    return this.userRepository.createUser(user)
  }

  async getUser(userID: string): Promise<User | null> {
    return this.userRepository.getUser(userID)
  }

  getAuthenticatedUser(email: string, password: string): Promise<User | null> {
    return this.userRepository.getUserByEmailAndPassword(email, password)
  }

  async getToken(email: string, password: string): Promise<string> {
    const user = await this.getAuthenticatedUser(email, password)

    if (!user) {
      throw new Error('Email/password invalid!')
    }

    const tokenData = {
      name: user?.name,
      email: user?.email
    }

    const tokenKey = '123456789'

    const tokenOptions = {
      subject: user?.id_user
    }

    const token = sign(tokenData, tokenKey, tokenOptions)

    return { id: user.id_user, token } as any
  }
}