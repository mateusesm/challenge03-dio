import { EntityManager } from "typeorm";
import { User } from "../entities/User";

export class UserRepository {
  private manager: EntityManager

  constructor(
    manager: EntityManager
  ) {
    this.manager = manager
  }

  async createUser(user: User): Promise<User> {
    return this.manager.save(user)
  }

  async getUser(userId: string): Promise<User | null> {
    return this.manager.findOne(User, {
      where: {
        id_user: userId,
      }
    })
  }

  async getUserByEmailAndPassword(email: string, password: string): Promise<User | null> {
    return this.manager.findOne(User, {
      where: {
        email,
        password
      }
    })
  }
}