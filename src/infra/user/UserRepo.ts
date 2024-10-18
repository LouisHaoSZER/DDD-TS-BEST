import { singleton } from 'tsyringe'
import { IUserRepo } from '../../domain/user/IUserRepo.js'
import { User } from '../../domain/user/User.js'
import { prisma } from '../Prisma.js'

@singleton()
export class UserRepo implements IUserRepo {
  getUser: (id: number) => Promise<User | null> = async (id) => {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })
    if (!user)
      return null
    return user
  }

  getUsers: (size: number, page: number) => Promise<User[]> = async (size, page) => {
    const users = await prisma.user.findMany({
      skip: size * (page - 1),
      take: size,
    })
    return users
  }

  updateUser: (contest: User) => Promise<void> = async (user) => {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        role: user.role,
        name: user.name,
        password: user.password,
      },
    })
  }

  createUser: (contest: Omit<User, 'id'>) => Promise<void> = async (user) => {
    await prisma.user.create({
      data: {
        role: user.role,
        name: user.name,
        password: user.password,
      },
    })
  }

  deleteUser: (id: number) => Promise<void> = async (id) => {
    await prisma.user.delete({
      where: {
        id,
      },
    })
  }

  getUserCount: () => Promise<number> = async () => {
    return prisma.user.count()
  }
}
