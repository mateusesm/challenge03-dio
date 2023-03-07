const DB: object[] = [
  {
    name: "Joana",
    email: "joana@mail.com"
  }
]

export class UserService {
  createUser(name: string, email: string) {
    const user = {
      name,
      email
    }

    DB.push(user)
    console.log('DB updated: ', DB)
  }

  getAllUsers() {
    return DB
  }
}