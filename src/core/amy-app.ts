import Express from 'express'
import * as http from 'http'
import * as https from 'https'
import { AmyAppConfig } from './interfaces/app-config.interface'

export class AmyApplication {
  private readonly expressApp: Express.Application

  private readonly expressRouter: Express.Router

  private readonly server: http.Server | https.Server

  private static _singleton: AmyApplication

  constructor(private readonly config: AmyAppConfig) {
    console.log('Bootstraping App...')
    AmyApplication._singleton = this

    this.expressApp = Express()
  }
}
