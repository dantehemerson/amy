import { Router } from 'express'
import { HTTP_CONTROLLER, HTTP_ROUTE } from '../common'
import { Constructable } from '../common/constructable'
import { IControllerData } from '../common/decorators/interfaces/controller-metadata.interface'
import { IRouteMetadata } from '../common/decorators/interfaces/route-metadata.interface'
import { AmyAppConfig } from './interfaces/app-config.interface'
import { MetadataScanner } from './metadata.scanner'
import { Repository } from './repository'

export class RepositoryFactory {
  public static load(config: AmyAppConfig, repoRef: Repository, router: Router) {
    this.loadControllers(router, config.controllers, repoRef)
  }
  private static loadControllers(router: Router, controllers: Constructable<any>[], repo: Repository) {
    controllers.map((ctr: Constructable<any>) => {
      const reflectionMethods = MetadataScanner.scan<any, string>(ctr.prototype, HTTP_ROUTE)
      const reflectionClassData = MetadataScanner.scanClass<IControllerData>(ctr, HTTP_CONTROLLER)

      if (!reflectionClassData) {
        throw new Error(`${ctr.prototype.constructor.name} is an invalid controller, missing Controller decorator`)
      }

      const ctrInstance = new ctr()
      repo.loadController(ctrInstance)

      reflectionMethods.forEach(reflector => {
        if (reflector.descriptor.path === '') {
          throw new Error(`"" is an invalid route`)
        }
        if (reflectionClassData.prefix === '') {
          throw new Error(`${ctrInstance.constructor.name} has an invalid controller prefix`)
        }

        reflector.descriptor.path = this.routeFormatter(reflectionClassData.prefix, reflector.descriptor.path)
        this.loadRoutes(router, reflector.descriptor as IRouteMetadata, ctrInstance, reflector.method.name)
      })

      return true as any
    })
  }

  private static loadRoutes(appRouter: Router, route: IRouteMetadata, controller: any, functionName: string) {
    route.methods.map(method => {
      appRouter[method](route.path, (req, res) => controller[functionName](req, res))
    })
  }

  /**
   * Receives the prefix of controller and the path of the route
   * and escapes/explore it
   *
   * @param route
   */
  private static routeFormatter(prefix: string, path: string): string {
    let newRoute: string = ''

    // Is it not default controller nor default route
    if (path !== '/' && prefix !== '/') {
      newRoute = `/${prefix}/${path}`
    } else if (path === '/' && prefix !== '/') {
      // Is it not default controller and default route?
      newRoute = `/${prefix}`
    } else {
      if (path !== '/')
        // We dont want default route to be //
        newRoute = `/${path}` // means its default controller and a normal route
    }

    // Clean the route from last character slash and return it
    return newRoute[newRoute.length - 1] === '/' ? newRoute.slice(0, newRoute.length - 1) : newRoute
  }
}
