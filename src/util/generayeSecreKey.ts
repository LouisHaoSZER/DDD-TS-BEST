import { randomBytes } from 'node:crypto'
/**
 *
 * 生成随机密钥
 * @param {number} [length] 密钥长度
 */
export const generateSecretKey = (length = 32) => {
  return randomBytes(length).toString('base64')
}

console.log(generateSecretKey())
