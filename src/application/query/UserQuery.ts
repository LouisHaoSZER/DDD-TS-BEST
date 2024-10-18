import { injectable } from 'tsyringe'
import { UserRepo } from '../../infra/user/UserRepo.js'
import { UserCO } from '../../client/response/UserCO.js'

@injectable()
export class UserQuery {
  constructor(
    public userRepo: UserRepo,
  ) {}

  async getUser(id: number): Promise<UserCO | null> {
    return await this.userRepo.getUser(id)
  }

  async getUsers(size: number, page: number): Promise<UserCO[]> {
    return await this.userRepo.getUsers(size, page)
  }
}
