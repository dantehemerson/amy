/**
 * Configuration data for controller decorator
 *
 */
export interface IControllerData {
  /**
   * URL prefix
   *
   * @default /
   */
  prefix?: string
  /**
   * Define whether you want to receives a Models Container
   *
   * @default true
   */
  modelsInjection?: boolean
}
