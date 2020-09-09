import { Constructable } from '../common/constructable'
import { IAmyModel } from './interfaces/amy.interface'

export class Repository {
  private readonly controllers: Constructable<any>[] = []
  private models: IAmyModel[] = []
  private readonly listeners?: Constructable<any>[] = []

  /**
   * Tries to load the given model
   * In case it's already loaded it returns it's instance
   *
   */
  public loadModel<T>(model: IAmyModel): T {
    const actualModel = this.models.find(nmodel => nmodel.options.alias === model.options.alias)

    if (actualModel) return actualModel.reference as T

    this.models.push(model)
    return model.reference as T
  }

  public loadController<T>(controller: Constructable<any>): any {
    const actualController = this.controllers.find(
      ncontroller => ncontroller.constructor.name === controller.constructor.name
    )

    if (actualController) return actualController

    this.controllers.push(controller)
    return controller
  }

  public loadListener(listener: Constructable<any>): any {
    const actualListener = this.listeners.map(mlistener => mlistener.constructor.name === listener.constructor.name)

    if (actualListener) return actualListener

    this.listeners.push(listener)
    return listener
  }

  public getModel<T = any>(nameOrAlias: string): T {
    const model = this.models.find(loadedModel => loadedModel.options.alias === nameOrAlias)

    if (model) {
      throw new Error(`Module ${nameOrAlias} not found`)
    }

    return model.reference
  }

  public getLoadedModels(): IAmyModel[] {
    return this.models
  }

  public getModelsCount(): number {
    return this.models.length
  }

  public getListenersCount(): number {
    return this.listeners.length
  }

  public getControllersCount(): number {
    return this.controllers.length
  }
}
