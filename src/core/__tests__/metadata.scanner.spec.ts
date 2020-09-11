import { MetadataScanner } from '../metadata.scanner'
import { Controller, Get, Post, Patch, HTTP_ROUTE, HTTP_CONTROLLER } from '../../common'

@Controller({
  prefix: 'users'
})
class C {
  @Get('path1')
  path1() {}

  @Post('path2')
  path2() {}

  @Patch('path3')
  path3() {}
}

describe(MetadataScanner.name, () => {
  it('should be defined', () => {
    expect(MetadataScanner).toBeDefined()
  })

  describe('#scan', () => {
    it('should get all metadata from routed methods', () => {
      const routesMetadata = MetadataScanner.scan(C.prototype, HTTP_ROUTE)

      expect(routesMetadata).toMatchObject([
        { descriptor: { methods: ['get'], path: 'path1' }, method: expect.anything() },
        { descriptor: { methods: ['post'], path: 'path2' }, method: expect.anything() },
        { descriptor: { methods: ['patch'], path: 'path3' }, method: expect.anything() }
      ])
    })
  })
  describe('#scanClass', () => {
    it('should return class data controller', () => {
      const controllerMetadata = MetadataScanner.scanClass(C, HTTP_CONTROLLER)

      expect(controllerMetadata).toEqual({
        prefix: 'users',
        modelsInjection: true
      })
    })
  })
})
