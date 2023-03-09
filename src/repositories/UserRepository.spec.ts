import { EntityManager } from 'typeorm';
import { User } from './../entities/User';
import { UserRepository } from './UserRepository'
import { getMockEntityManager } from '../__mocks__/mockEntityManager.mock'

describe('Test UserRepository', () => {
  let userRepository: UserRepository
  let managerMock: Partial<EntityManager>

  const mockUser: User = {
    id_user: '12345',
    name: "teste",
    email: "teste@mail.com",
    password: "password"
  }

  beforeAll(async () => {
    managerMock = await getMockEntityManager({
      saveReturn: mockUser
    })
    userRepository = new UserRepository(managerMock as EntityManager)
  })

  it('should register a new user in the database', async () => {
    const response = await userRepository.createUser(mockUser)

    expect(managerMock.save).toHaveBeenCalled()
    expect(response).toMatchObject(mockUser)
  })
})