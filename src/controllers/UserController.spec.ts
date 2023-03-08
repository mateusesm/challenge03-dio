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
    }),
    deleteUser: jest.fn()
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

  it('should return an error if name were empty in creation', () => {
    mockRequest.body.name = ''
    userController.createUser(mockRequest, mockResponse)

    expect(mockResponse.state.status).toBe(400)
    expect(mockResponse.state.json).toMatchObject({ message: 'Invalid name' })
  })

  it('should return an error if email were invalid in creation', () => {
    mockRequest.body.name = 'Mateus'
    mockRequest.body.email = 'hahaha'
    userController.createUser(mockRequest, mockResponse)

    expect(mockResponse.state.status).toBe(400)
    expect(mockResponse.state.json).toMatchObject({ message: 'Invalid email' })
  })

  it('should call getAllUsers function', () => {
    mockRequest.body.name = 'Mateus'
    mockRequest.body.email = 'teste@mail.com'
    userController.getAllUsers(mockRequest, mockResponse)

    expect(mockResponse.state.status).toBe(200)
    expect(mockResponse.state.json).toMatchObject([{ name: 'Mateus', email: 'teste@mail.com' }])
  })

  it('should delete user', () => {
    mockRequest.body.name = 'Mateus'
    mockRequest.body.email = 'teste@mail.com'
    userController.deleteUser(mockRequest, mockResponse)

    expect(mockResponse.state.status).toBe(200)
    expect(mockResponse.state.json).toMatchObject({ message: 'User deleted' })
  })

  it('should return an error if email were invalid in deletation', () => {
    mockRequest.body.name = 'Mateus'
    mockRequest.body.email = 'hahaha'
    userController.deleteUser(mockRequest, mockResponse)

    expect(mockResponse.state.status).toBe(400)
    expect(mockResponse.state.json).toMatchObject({ message: 'Invalid email' })
  })

})