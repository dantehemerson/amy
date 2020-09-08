import { Constructable } from '../common/constructable'
import { IAmyModel } from './interfaces/amy.interface'

export class Repository {
  private readonly controllers: Constructable<any>[] = []
  private models: IAmyModel[] = []
  private readonly listeners?: Constructable<any>[] = []
}
