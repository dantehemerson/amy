/**
 * Interface for Routes metadata
 */
export interface IRouteMetadata {
  path: string
  methods: string[]
  // tslint:disable-next-line: ban-types
  handler: Function
}
