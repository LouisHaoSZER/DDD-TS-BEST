import { Response } from './Response.js'

export class ResponseBuilder<T> {
  private resp: Partial<Response<T>>

  private constructor(part: Partial<Response<T>>) {
    this.resp = part
  }

  static buildSuccess<T>(data: T) {
    return new Response(200, 'success', data)
  }

  static buildFailure<T = null>(code: number, message: string) {
    return new ResponseBuilder<T | null>({ code, message, data: null })
  }

  buildData(data: T) {
    return new ResponseBuilder<T>({ ...this.resp, data })
  }

  build() {
    if (this.resp.code == null) {
      throw new Error('code is required')
    }
    if (this.resp.message == null) {
      throw new Error('message is required')
    }
    return new Response<T>(this.resp.code, this.resp.message, this.resp.data as T)
  }
}
