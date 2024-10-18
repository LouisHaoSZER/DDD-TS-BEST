import type { Action } from 'routing-controllers'
import { createKoaServer } from 'routing-controllers'
import type Application from 'koa'

import { UserController } from '../apis/UserController.js'
import { AuthController } from '../apis/AuthController.js'
import { ErrorHandlerMiddleware } from './ErrorHandler.js'

export const createApp = async (): Promise<Application> => {
  return createKoaServer({
    authorizationChecker: async (action: Action, _roles: string[]) => {
      const token = action.request.headers.authorization
      // const roles = action.request.headers.roles as string[]
      // console.log('action', action)
      // if (token !== undefined && roles.includes('admin')) {
      //   return true
      // }
      if (token !== undefined) {
        return true
      }
      return false
    },
    controllers: [UserController, AuthController],
    middlewares: [ErrorHandlerMiddleware],
  })
}
