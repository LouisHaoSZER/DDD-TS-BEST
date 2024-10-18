import dotenv from 'dotenv'

const env = dotenv.config()

if (env.parsed == null) {
  throw new Error('No .env file found')
}

export const globalConfig: {
  JWT_SECRETKEY: string
  PORT: string
  DEBUG: string
} = {
  JWT_SECRETKEY: 'v6LHPDdAkFPe7FJEgzXjJe+MwuJ9kDD/hZXeirkzNjI=',
  PORT: '',
  DEBUG: '',
}

const keys = Object.keys(globalConfig)
for (const key of keys) {
  if (env.parsed[key] == null) {
    throw new Error(`No ${key} found in .env file`)
  }
}

Object.assign(globalConfig, env.parsed)
