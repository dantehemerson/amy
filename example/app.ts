import { AmyApplication } from '../src/core'

async function bootstrap() {
  const app = new AmyApplication({
    port: 4023
  })

  app.start(() => {
    console.log('Listening on http://localhost:4023')
  })
}

bootstrap()
