import { EntityManager } from "typeorm";
import { AppDataSource } from "../database";
import { IUser } from "../services/UserService";

export class UserRepository {
  private manager: EntityManager

  constructor(
    manager = AppDataSource.manager
  ) {
    this.manager = manager
  }

  async createUser(user: IUser) {
    return this.manager.save(user)
  }
}