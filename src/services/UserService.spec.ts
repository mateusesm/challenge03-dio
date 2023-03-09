import * as jwt from 'jsonwebtoken'
import { UserService } from './UserService'

jest.mock('../repositories/UserRepository')
jest.mock('../database', () => {
  initialize: jest.fn()
})

jest.mock('jsonwebtoken')

const mockUserRepository = require('../repositories/UserRepository')

describe('Test UserService', () => {
  const userService = new UserService(mockUserRepository)
  const mockUser = {
    id_user: '123456',
    name: 'Mateus',
    email: 'teste@mail.com',
    password: '123456'
  }

  it('should add a new user', async () => {
    mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve(mockUser))
    const response = await userService.createUser('Mateus', 'teste@mail.com', '12345')

    expect(mockUserRepository.createUser).toHaveBeenCalled()
    expect(response).toMatchObject({
      id_user: '123456',
      name: 'Mateus',
      email: 'teste@mail.com',
      password: '123456'
    })
  })

  it('should return a user token', async () => {
    jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation(() => Promise.resolve(mockUser))

    jest.spyOn(jwt, 'sign').mockImplementation(() => 'token')

    const token = await userService.getToken('teste@mail.com', '123456')

    expect(token).toBe('token')
  })

  it('should return an error if not found user', async () => {
    jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation(() => Promise.resolve(null))

    await expect(userService.getToken('invalidemail', '123456')).rejects.toThrowError(new Error('Email/password invalid!'))
  })
})