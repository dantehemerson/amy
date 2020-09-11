import { Request, Response } from 'express'
import { Controller, Get } from '../../src/common'

@Controller({
  prefix: 'users'
})
export class UserController {
  @Get('saludo')
  health(req: Request, res: Response) {
    res.json({
      message: `I'm healthy`
    })
  }
}
