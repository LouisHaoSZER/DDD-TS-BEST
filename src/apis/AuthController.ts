import { Body, JsonController, Post } from 'routing-controllers'
import { injectable } from 'tsyringe'
import { AuthCmd } from '../application/command/AuthCmd.js'
import { ResponseBuilder } from '../util/ResponseBuilder.js'
import { Response } from '../util/Response.js'
import type { UserCO } from '../client/response/UserCO.js'
import type { LoginRO } from '../client/request/LoginRO.js'
import type { UpdateUserRO } from '../client/request/UserRO.js'
import { refreshAccessToken } from '../application/service/tokenService.js'
import { BaseController } from './BaseController.js'

@JsonController('/auth')
@injectable()
export class AuthController extends BaseController {
  constructor(
    private authCmd: AuthCmd,
  ) {
    super()
  }

  @Post('/login')
  async login(@Body() loginData: LoginRO): Promise<Response<UserCO | null>> {
    const res = await this.authCmd.login(loginData.name, loginData.password)
    if (!res) {
      return ResponseBuilder.buildFailure<UserCO>(1, '未找到用户').buildData(null).build()
    }
    return ResponseBuilder.buildSuccess(res)
  }

  @Post('/refresh')
  async refresh(@Body() { refreshToken }: { refreshToken: string }): Promise<Response<UserCO & { accessToken: string } | null>> {
    try {
      const user = await this.authCmd.refresh(refreshToken)
      if (!user) {
        return ResponseBuilder.buildFailure<UserCO & { accessToken: string }>(1, '无效的刷新令牌').buildData(null).build()
      }
      const newAccessToken = refreshAccessToken(refreshToken)
      return ResponseBuilder.buildSuccess({ ...user, accessToken: newAccessToken })
    }
    catch (error) {
      return ResponseBuilder.buildFailure<UserCO & { accessToken: string }>(1, '刷新令牌无效').buildData(null).build()
    }
  }

  @Post('/register')
  async register(@Body() registerData: UpdateUserRO): Promise<Response<UserCO | null>> {
    const res = await this.authCmd.register(registerData.name, registerData.password, registerData.role)
    if (!res) {
      return ResponseBuilder.buildSuccess(res)
    }
    return ResponseBuilder.buildFailure<UserCO>(1, '注册失败').buildData(null).build()
  }

  @Post('/logout')
  async logout(@Body() accessToken: { token: string }): Promise<Response<null>> {
    await this.authCmd.logout(accessToken.token)
    return ResponseBuilder.buildSuccess(null)
  }
}
