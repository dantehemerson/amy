import { AmyApplication } from '../src/core'
import { UserController } from './src/user.controller'

async function bootstrap() {
  const app = new AmyApplication({
    port: 4023,
    controllers: [UserController]
  })

  app.start(() => {
    console.log('Listening on http://localhost:4023')
  })
}

bootstrap()
