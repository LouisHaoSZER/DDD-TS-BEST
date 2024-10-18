import { injectable } from 'tsyringe'
import type { UserRole } from '@prisma/client'
import { AuthRepo } from '../../infra/auth/AuthRepo.js'
import { User } from '../../domain/user/User.js'

@injectable()
export class AuthCmd {
  constructor(
    public authRepo: AuthRepo,
  ) {}

  async login(name: string, password: string): Promise<User & { accessToken: string, refreshToken: string } | null> {
    return await this.authRepo.login(name, password)
  }

  async refresh(refreshToken: string): Promise<User & { accessToken: string, refreshToken: string } | null> {
    return await this.authRepo.refresh(refreshToken)
  }

  async logout(token: string): Promise<boolean> {
    return await this.authRepo.logout(token)
  }

  async register(name: string, password: string, role: UserRole): Promise<User | null> {
    return await this.authRepo.register(name, password, role)
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    return await this.authRepo.isTokenBlacklisted(token)
  }

  async addTokenBlacklist(token: string): Promise<boolean> {
    return await this.authRepo.addTokenBlacklist(token)
  }
}
