import type { KoaMiddlewareInterface } from 'routing-controllers'
import type { Context } from 'koa'
import { container } from 'tsyringe'
import { ResponseBuilder } from '../util/ResponseBuilder.js'
import { JwtUtil } from '../util/JwtUtil.js'
import { AuthCmd } from '../application/command/AuthCmd.js'
/**
 * 使用方法
 * @Controller()
 * @UseBefore(AuthMiddleWare)
 * export class UserController {}
 */
export class AuthMiddleWare implements KoaMiddlewareInterface {
  async use(context: Context, next: (err?: any) => Promise<any>): Promise<any> {
    const authHeader = context.request.headers.authorization
    // 1. 如果没有token或者token不是以Bearer开头的，返回401
    if (authHeader === undefined || authHeader.startsWith('Bearer ') === false) {
      context.status = 401
      // TODO： 自定义code内容可以不是401，可以是其他的，待确认
      context.body = ResponseBuilder.buildFailure(401, 'UNAUTHORIZED').build()
      return
    }
    // 2. 如果有token，验证token是否合法
    const token = authHeader?.split(' ')[1] as string
    const decoded = JwtUtil.verifyToken(token)
    // 2.1 查看token是否在黑名单中
    const authCmd = container.resolve(AuthCmd)
    const isTokenBlacklisted = await authCmd.isTokenBlacklisted(token)
    // 2.2 如果token过期或者在黑名单中，返回401
    if (decoded === null || isTokenBlacklisted) {
      context.status = 401
      context.body = ResponseBuilder.buildFailure(401, 'INVALID_TOKEN').build()
      return
    }

    // 2.2 如果token合法，将解析后的token放入context.state中，后续controller中可以通过context.state获取
    context.state['user'] = decoded
    return next()
  }
}
