/**
 * Interface made in order to make a imported module being
 * dynamicly able to be instantiated
 */
export interface Constructable<T> extends Function {
  // tslint:disable-next-line: callable-types
  new (...args: any[]): T
}
