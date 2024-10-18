import type { KoaMiddlewareInterface } from 'routing-controllers'

export class ErrorHandlerMiddleware implements KoaMiddlewareInterface {
  async use(_context: any, next: (err?: any) => Promise<any>): Promise<any> {
    try {
      return await next()
    }
    catch (error) {
      console.log('Internal server error', error)
      return 'Internal server error'
    }
  }
}
