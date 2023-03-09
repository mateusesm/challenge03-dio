import { Request } from 'express'
import { UserController } from './UserController'
import { UserService } from './../services/UserService'
import { makeMockResponse } from '../__mocks__/mockResponse.mock'
import { makeMockRequest } from '../__mocks__/mockRequest.mock'

const mockUserService = {
  createUser: jest.fn(),
  getUser: jest.fn()
}

jest.mock('../services/UserService', () => {
  return {
    UserService: jest.fn().mockImplementation(() => {
      return mockUserService
    })
  }
})

describe('Test UserController', () => {

  const userController = new UserController()

  const mockRequest = {
    body: {
      name: 'Mateus',
      email: 'teste@mail.com',
      password: '123456'
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
    mockRequest.body.email = 'teste@mail.com'
    mockRequest.body.password = '123456'
    userController.createUser(mockRequest, mockResponse)

    expect(mockResponse.state.status).toBe(400)
    expect(mockResponse.state.json).toMatchObject({ message: 'Invalid name' })
  })

  it('should return an error if email were invalid in creation', () => {
    mockRequest.body.name = 'Mateus'
    mockRequest.body.email = ''
    mockRequest.body.password = '123456'
    userController.createUser(mockRequest, mockResponse)

    expect(mockResponse.state.status).toBe(400)
    expect(mockResponse.state.json).toMatchObject({ message: 'Invalid email' })
  })

  it('should return an error if password were invalid in creation', () => {
    mockRequest.body.name = 'Mateus'
    mockRequest.body.email = 'teste@mail.com'
    mockRequest.body.password = ''
    userController.createUser(mockRequest, mockResponse)

    expect(mockResponse.state.status).toBe(400)
    expect(mockResponse.state.json).toMatchObject({ message: 'Invalid password' })
  })

  it ('should return an user with informed userId', () => {
    const mockRequest = makeMockRequest({
      params: {
        userId: '123456'
      }
    })

    userController.getUser(mockRequest, mockResponse)
    expect(mockUserService.getUser).toHaveBeenCalledWith('123456')
    expect(mockResponse.state.status).toBe(200)
  })

  /* it('should delete user', () => {
    mockRequest.body.name = 'Mateus'
    mockRequest.body.email = 'teste@mail.com'
    mockRequest.body.password = '123456'
    userController.deleteUser(mockRequest, mockResponse)

    expect(mockResponse.state.status).toBe(200)
    expect(mockResponse.state.json).toMatchObject({ message: 'User deleted' })
  })

  it('should return an error if email were invalid in deletation', () => {
    mockRequest.body.name = 'Mateus'
    mockRequest.body.email = ''
    mockRequest.body.password = '123456'
    userController.deleteUser(mockRequest, mockResponse)

    expect(mockResponse.state.status).toBe(400)
    expect(mockResponse.state.json).toMatchObject({ message: 'Invalid email' })
  })
  */

})