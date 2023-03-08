import { IUser, UserService } from './UserService'

describe('Test UserService', () => {
  const mockDB: IUser[] = []
  const userService = new UserService(mockDB)

  it('should add a new user', () => {
    const mockConsole = jest.spyOn(global.console, 'log')
    userService.createUser('Mateus', 'teste@mail.com')

    expect(mockConsole).toHaveBeenCalledWith('DB updated: ', mockDB)
  })
})