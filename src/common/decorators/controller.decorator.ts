import 'reflect-metadata'
import { HTTP_CONTROLLER } from '../constants'
import { IControllerData } from './interfaces/controller-metadata.interface'

/**
 * Controller is the decorator to specify that the class above is
 * going to have routes and handle http requests
 * @param data
 */
export function Controller(data?: IControllerData): ClassDecorator {
  const newData: IControllerData = {
    prefix: data?.prefix ?? '/',
    modelsInjection: data?.modelsInjection ?? true
  }

  return (target: object) => {
    Reflect.defineMetadata(HTTP_CONTROLLER, newData, target)
  }
}
