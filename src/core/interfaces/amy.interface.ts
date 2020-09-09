import { IModelOptions } from '../../common/decorators/interfaces/model-options.interface'

/**
 * Provides an interface to link reference->options to our models
 */
export interface IAmyModel {
  reference: any
  options: IModelOptions
}
