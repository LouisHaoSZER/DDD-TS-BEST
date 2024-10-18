import { JwtUtil } from '../../util/JwtUtil.js'

/**
 * @description 生成token
 * @param userId
 * @returns
 */
export function generateTokens(userId: string) {
  const accessToken = JwtUtil.generateToken({ userId })
  const refreshToken = JwtUtil.generateToken({ userId }, '7d')
  return { accessToken, refreshToken }
}

/**
 * @description 刷新token
 * @param refreshToken
 * @returns
 */
export function refreshAccessToken(refreshToken: string) {
  try {
    const decoded = JwtUtil.verifyToken(refreshToken) as { userId: string }
    const newAccessToken = JwtUtil.generateToken({ userId: decoded.userId }, '15m')
    return newAccessToken
  }
  catch (error) {
    throw new Error('Invalid refresh token')
  }
}
