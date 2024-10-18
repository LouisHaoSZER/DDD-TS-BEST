import { injectable } from 'tsyringe'
import { UserRepo } from '../../infra/user/UserRepo.js'
import { CreateUserRO, UpdateUserRO } from '../../client/request/UserRO.js'

@injectable()
export class UserCmd {
  constructor(
    public userRepo: UserRepo,
  ) {}

  async updateUser(data: UpdateUserRO): Promise<void> {
    return await this.userRepo.updateUser(data)
  }

  async createUser(data: CreateUserRO): Promise<void> {
    return await this.userRepo.createUser(data)
  }

  async deleteUser(id: number): Promise<void> {
    return await this.userRepo.deleteUser(id)
  }
}
