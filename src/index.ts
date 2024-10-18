import 'reflect-metadata'
import { useContainer } from 'routing-controllers'
import { container } from 'tsyringe'
import { createApp } from './bootstrap/Application.js'
import { disconnect } from './infra/Prisma.js'
import TsyringeAdapter from './bootstrap/TsyringeAdapter.js'

useContainer(new TsyringeAdapter(container))

await createApp().then((app) => {
  app.listen(3000)
  return new Promise<void>((resolve) => {
    app.on('close', () => {
      resolve()
    })
    app.on('error', (err) => {
      console.error(err)
      resolve()
    })
  })
}).then(() => {
  return disconnect()
})
