import { singleton } from 'tsyringe'
// import bcrypt from 'bcrypt'
import type { UserRole } from '@prisma/client'
import type { User } from '../../domain/user/User.js'
import { IAuthRepo } from '../../domain/auth/IAuthRepo.js'
import { prisma } from '../Prisma.js'
import { JwtUtil } from '../../util/JwtUtil.js'

@singleton()
export class AuthRepo implements IAuthRepo {
  /**
   * 登录
   * @param name 用户名
   * @param password 密码
   * @returns 用户信息
   */
  login: (name: string, password: string) => Promise<User & { accessToken: string, refreshToken: string } | null> = async (name, password) => {
    const user = await prisma.user.findUnique({
      where: { name },
    })
    if (!user)
      return null

    // 使用安全的密码比较方法
    // const isPasswordValid = await bcrypt.compare(password, user.password)
    const isPasswordValid = password === user.password
    if (!isPasswordValid)
      return null

    // 生成新的 token
    const accessToken = JwtUtil.generateToken({ id: user.id })
    const refreshToken = JwtUtil.generateToken({ id: user.id }, '7d')

    return { ...user, accessToken, refreshToken }
  }

  /**
   * 刷新令牌
   * @param refreshToken 刷新令牌
   * @returns 新的令牌
   */
  refresh: (refreshToken: string) => Promise<(User & { accessToken: string, refreshToken: string }) | null> = async (refreshToken) => {
    try {
      const decoded = JwtUtil.verifyToken(refreshToken) as { id: string } | null
      if (!decoded)
        return null

      const user = await prisma.user.findUnique({
        where: { id: Number(decoded.id) },
      })
      if (!user)
        return null

      const accessToken = JwtUtil.generateToken({ id: user.id })
      const newRefreshToken = JwtUtil.generateToken({ id: user.id }, '7d')

      return { ...user, accessToken, refreshToken: newRefreshToken }
    }
    catch (e) {
      console.error(e)
      return null
    }
  }

  // 登出
  /**
   * 登出
   * @param token 令牌
   * @description 登出时，前端传入的是用户的token，这样可以避免用户名泄漏，用户名重复导致的问题
   */
  logout: (token: string) => Promise<boolean> = async (token) => {
    try {
      await this.addTokenBlacklist(token)
      return true
    }
    catch (e) {
      console.error(e)
      return false
    }
  }

  // 新增注册方法
  register: (name: string, password: string, role: UserRole) => Promise<User | null> = async (name, password, role) => {
    // 检查用户名是否已存在
    try {
      const existingUser = await prisma.user.findUnique({
        where: { name },
      })
      if (existingUser)
        return null
    }
    catch (e) {
      console.error(e)
      return null
    }

    // 加密密码
    // const hashedPassword = await bcrypt.hash(password, 10)

    // 创建新用户
    try {
      const newUser = await prisma.user.create({
        data: {
          name,
          password,
          role,
        },
      })
      return newUser
    }
    catch (e) {
      console.error(e)
      return null
    }
  }

  /**
   * 判断token是否在黑名单中
   * @param token 令牌
   * @returns 是否在黑名单中
   */
  isTokenBlacklisted: (token: string) => Promise<boolean> = async (token) => {
    const blacklist = await prisma.tokenBlacklist.findUnique({
      where: { token },
    })
    return !!blacklist
  }

  /**
   * 将token添加到黑名单中
   * @param token 令牌
   * @returns 是否添加成功
   */
  addTokenBlacklist: (token: string) => Promise<boolean> = async (token) => {
    try {
      await prisma.tokenBlacklist.create({
        data: { token },
      })
      return true
    }
    catch (e) {
      console.error(e)
      return false
    }
  }
}
