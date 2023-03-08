import { Request } from 'express'
import { UserController } from './UserController'
import { UserService } from './../services/UserService'
import { makeMockResponse } from '../__mocks__/mockResponse.mock'
import { IUser } from '../services/UserService'

describe('Test UserController', () => {
  const mockUserService: Partial<UserService> = {
    createUser: jest.fn(),
    getAllUsers: jest.fn(() => {
      return [{ name: 'Mateus', email: 'teste@mail.com' }]
    })
  }

  const userController = new UserController(mockUserService as UserService)

  const mockRequest = {
    body: {
      name: 'Mateus',
      email: 'teste@mail.com'
    }
  } as Request

  const mockResponse = makeMockResponse()

  it('should add a new user', () => {
    userController.createUser(mockRequest, mockResponse)

    expect(mockResponse.state.status).toBe(201)
    expect(mockResponse.state.json).toMatchObject({ message: 'User created' })
  })

  it('should return an error if name were empty', () => {
    mockRequest.body.name = ''
    userController.createUser(mockRequest, mockResponse)

    expect(mockResponse.state.status).toBe(400)
    expect(mockResponse.state.json).toMatchObject({ message: 'Invalid name' })
  })

  it('should call getAllUsers function', () => {
    userController.getAllUsers(mockRequest, mockResponse)

    expect(mockResponse.state.status).toBe(200)
    expect(mockResponse.state.json).toMatchObject([{ name: 'Mateus', email: 'teste@mail.com' }])
  })

})