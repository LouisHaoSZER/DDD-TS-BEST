import type { User } from './User.js'

export interface IUserRepo {
  getUser: (id: number) => Promise<User | null>
  getUsers: (size: number, page: number) => Promise<User[]>
  updateUser: (contest: User) => Promise<void>
  createUser: (contest: Omit<User, 'id'>) => Promise<void>
  deleteUser: (id: number) => Promise<void>
  getUserCount: () => Promise<number>
}
