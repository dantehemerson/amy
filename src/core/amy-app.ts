import Express, { response } from 'express'
import * as http from 'http'
import * as https from 'https'
import { AmyAppConfig } from './interfaces/app-config.interface'
import { Repository } from './repository'

export class AmyApplication {
  private readonly expressApp: Express.Application

  private readonly expressRouter: Express.Router

  private readonly server: http.Server | https.Server

  private static _singleton: AmyApplication

  private repository: Repository

  constructor(private readonly config: AmyAppConfig) {
    console.log('Bootstraping App...')
    AmyApplication._singleton = this

    this.expressApp = Express()

    // Initialize our repository
    this.repository = new Repository()

    if (this.config.sslOptions) {
      this.server = https.createServer(this.config.sslOptions, this.expressApp)
    } else {
      this.server = http.createServer(this.expressApp)
    }
  }

  public static get singleton(): AmyApplication {
    if (this._singleton === undefined) {
      throw new Error('AmyApplication is not initializated')
    }
    return this._singleton
  }

  start(onStart?: () => unknown) {
    if (this.config !== undefined && this.config.port) {
      this.server.listen(this.config.port, () => {
        console.log('AmyApp has started')
        if (onStart) onStart()
      })
    }
  }
}
