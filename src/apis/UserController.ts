import { Authorized, Body, Get, JsonController, Param, Post, QueryParam, UseBefore } from 'routing-controllers'
import { injectable } from 'tsyringe'
import type { CreateUserRO, UpdateUserRO } from '../client/request/UserRO.js'
import { UserQuery } from '../application/query/UserQuery.js'
import { UserCmd } from '../application/command/UserCmd.js'
import { UserCO } from '../client/response/UserCO.js'
import { ResponseBuilder } from '../util/ResponseBuilder.js'
import { Response } from '../util/Response.js'
import { AuthMiddleWare } from '../bootstrap/AuthMiddleWare.js'
import { BaseController } from './BaseController.js'

@JsonController('/user')
@UseBefore(AuthMiddleWare)
@injectable()
export class UserController extends BaseController {
  constructor(
    private userQuery: UserQuery,
    private userCmd: UserCmd,
  ) {
    super()
  }

  @Get('/get/:id')
  async getUser(@Param('id') id: number): Promise<Response<UserCO | null>> {
    const res = await this.userQuery.getUser(id)
    if (!res) {
      return ResponseBuilder.buildFailure<null>(1, 'User not found').buildData(null).build()
    }
    return ResponseBuilder.buildSuccess(res)
  }

  @Get('/list')
  @Authorized()
  async getUsers(@QueryParam('size') size: number, @QueryParam('page') page: number): Promise<Response<UserCO[]>> {
    const res = await this.userQuery.getUsers(size, page)
    return ResponseBuilder.buildSuccess(res)
  }

  @Post('/update')
  async updateUser(@Body() user: UpdateUserRO): Promise<Response<null>> {
    await this.userCmd.updateUser(user)
    return ResponseBuilder.buildSuccess(null)
  }

  @Post('/create')
  async createUser(@Body() user: CreateUserRO): Promise<Response<null>> {
    await this.userCmd.createUser(user)
    return ResponseBuilder.buildSuccess(null)
  }

  @Post('/delete/:id')
  async deleteUser(@Param('id') id: number): Promise<Response<null>> {
    await this.userCmd.deleteUser(id)
    return ResponseBuilder.buildSuccess(null)
  }
}
