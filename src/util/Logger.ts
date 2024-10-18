import { type Logger, createLogger, format, transports } from 'winston'
import { globalConfig } from './GlobalConfig.js'

function getWinstonLogger(name: string): Logger {
  return createLogger({
    level: globalConfig.DEBUG ? 'debug' : 'warn',
    format: format.combine(
      format.timestamp(),
      format.label({ label: name }),
      format.simple(),
    ),
    transports: [
      new transports.Console(),
      new transports.File({ filename: './error.log', level: 'error' }),
      new transports.File({ filename: './debug.log', level: 'debug' }),
    ],
  })
}

const loggers: Record<string, Logger> = {}

export function getLogger(name: string): Logger {
  if (typeof loggers[name] === 'undefined') {
    loggers[name] = getWinstonLogger(name)
  }

  // @ts-expect-error winston type definition is incorrect
  return loggers[name]
}
