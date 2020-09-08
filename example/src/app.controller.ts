import { Controller, Get } from '../../src/common'

@Controller()
export class UserController {
  @Get()
  getUser(): string {
    return 'hola'
  }
}
