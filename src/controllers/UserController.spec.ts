import { Request } from 'express'
import { UserController } from './UserController'
import { UserService } from './../services/UserService'
import { makeMockResponse } from '../__mocks__/mockResponse.mock'


describe('Test UserController', () => {
  const mockUserService: Partial<UserService> = {
    createUser: jest.fn()
  }

  const userController = new UserController(mockUserService as UserService)

  it('should add a new user', () => {
    const mockRequest = {
      body: {
        name: 'Mateus',
        email: 'teste@mail.com'
      }
    } as Request
    const mockResponse = makeMockResponse()
    userController.createUser(mockRequest, mockResponse)
    expect(mockResponse.state.status).toBe(201)
    expect(mockResponse.state.json).toMatchObject({ message: 'User created' })
  })

})