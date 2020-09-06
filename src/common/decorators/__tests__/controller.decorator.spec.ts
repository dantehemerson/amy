import 'reflect-metadata'
import { Controller } from '../controller.decorator'
import { HTTP_CONTROLLER } from '../../constants'

@Controller()
class DefaultProperties {}

@Controller({
  prefix: '/foo',
  modelsInjection: false
})
class CustomProperties {}

describe('@Controller', () => {
  it('should define default properties', () => {
    const metadataValue = Reflect.getMetadata(HTTP_CONTROLLER, DefaultProperties)

    expect(metadataValue).toEqual({
      prefix: '/',
      modelsInjection: true
    })
  })

  it('should define custom properties', () => {
    const metadataValue = Reflect.getMetadata(HTTP_CONTROLLER, CustomProperties)
    expect(metadataValue).toEqual({
      prefix: '/foo',
      modelsInjection: false
    })
  })
})
