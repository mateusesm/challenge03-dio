const DB = [
  {
    name: "Joana",
    email: "teste@mail.com"
  }
]

export interface IUser {
  name: string,
  email: string
}

export class UserService {
  DB: IUser[]

  constructor(database = DB) {
    this.DB = database
  }

  createUser(name: string, email: string) {
    const user = {
      name,
      email
    }

    this.DB.push(user)
    console.log('DB updated: ', this.DB)
  }

  getAllUsers() {
    return this.DB
  }
}