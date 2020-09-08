import 'reflect-metadata'
import { HTTP_ROUTE } from '../../../common/constants'
import { HttpMethod } from '../../../common/enums'
import { Get, Post } from '../route.decorator'

class C {
  @Get()
  static method() {}

  @Post('/hello')
  static methodCustom() {}
}

describe('Route decorators', () => {
  it('should define "/" as default route', () => {
    const metadataValue = Reflect.getMetadata(HTTP_ROUTE, C.method)
    expect(metadataValue).toEqual({
      path: '/',
      methods: [HttpMethod.GET]
    })
  })

  it('should define custom path', () => {
    const metadataValue = Reflect.getMetadata(HTTP_ROUTE, C.methodCustom)
    expect(metadataValue).toEqual({
      path: '/hello',
      methods: [HttpMethod.POST]
    })
  })
})
