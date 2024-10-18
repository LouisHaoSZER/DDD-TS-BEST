import jwt from 'jsonwebtoken'
import { generateSecretKey } from './generayeSecreKey.js'

/**
 * JWT工具类
 */
export class JwtUtil {
  private static secretKey = 'PA9PN0EKyd5JJenJoK6WUtfYzlp/zqLj+TUNBiwebt4='

  /**
   * @description 生成token
   * @param payload
   * @param expiresIn
   * @returns
   */
  public static generateToken = (payload: any, expiresIn: string = '1d'): string => {
    return jwt.sign(payload, this.secretKey, { expiresIn })
  }

  /**
   * @description 验证token
   * @param token
   * @returns
   */
  public static verifyToken = (token: string): any => {
    try {
      // 1. 验证token是否合法
      return jwt.verify(token, this.secretKey)
    }
    catch (e) {
      // 2. 不合法返回null，在AuthMiddleWare中会处理
      return null
    }
  }
}
