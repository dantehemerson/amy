import { Router } from 'express'
import { Constructable } from 'src/common/constructable'

export class RepositoryFactory {
  private static loadControllers(router: Router, controllers: Constructable<any>) {}
}
