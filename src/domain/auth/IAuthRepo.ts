import type { UserRole } from '@prisma/client'
import type { User } from '../user/User.js'

export interface IAuthRepo {
  login: (name: string, password: string) => Promise<User | null>
  logout: (token: string) => Promise<any>
  refresh: (refreshToken: string) => Promise<User & { accessToken: string, refreshToken: string } | null>
  register: (name: string, password: string, role: UserRole) => Promise<User | null>
  addTokenBlacklist: (token: string) => Promise<boolean>
  isTokenBlacklisted: (token: string) => Promise<boolean>
}
