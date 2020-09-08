import 'reflect-metadata'
import { HttpMethod } from '../enums'
import { HTTP_ROUTE } from '../constants'
import { IRouteMetadata } from './interfaces/route-metadata.interface'

const createMapping = (method: HttpMethod) => (path: string = '/'): MethodDecorator => {
  return (target: object, methodName, descriptor) => {
    /** Do we have already methods on this fn? */
    if (Reflect.hasMetadata(HTTP_ROUTE, descriptor.value)) {
      const previous: IRouteMetadata = Reflect.getMetadata(HTTP_ROUTE, descriptor.value)

      const newMethods: string[] = previous.methods.concat(method)

      Reflect.defineMetadata(
        HTTP_ROUTE,
        {
          path,
          methods: newMethods
        } as IRouteMetadata,
        descriptor.value
      )
    } else {
      Reflect.defineMetadata(
        HTTP_ROUTE,
        {
          path,
          methods: [method]
        } as IRouteMetadata,
        descriptor.value
      )
    }
  }
}

export const Get = createMapping(HttpMethod.GET)
export const Post = createMapping(HttpMethod.POST)
export const Put = createMapping(HttpMethod.PUT)
export const Patch = createMapping(HttpMethod.PATCH)
