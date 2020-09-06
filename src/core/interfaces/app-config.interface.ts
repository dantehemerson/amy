import { ServerOptions } from 'https'
import { SessionOptions } from 'express-session'
import { CorsOptions } from 'cors'
import { Constructable } from '../../common/constructable'

/**
 * Application configuration is the boot configuration seed
 * that is provided to Amy Application in order to know
 * what to setup or load
 *
 */
export interface AmyAppConfig {
  /**
   * Application name
   */
  name?: string
  /**
   * Server port to be running http(s)/socket server
   * @required
   */
  port: number
  /**
   * If you want HTTP's provide the
   * SSL Options to be loaded in order to create a
   * HTTPS Server
   * @default none
   */
  sslOptions?: ServerOptions
  /**
   * Models are likely as data providers and the data manipularors
   * By providing a model, he will be added into the model repository
   * and passed to controllers and listeners
   * Also you can access to them via `AmyApplication.singleton`
   */
  models?: Constructable<any>[]
  /**
   * Controllers are the route handlers when something hit
   * the desired URL
   */
  controllers?: Constructable<any>[]
  /**
   * Listeners are our event handlers for socket.io
   */
  listeners?: Constructable<any>[]
  /**
   * Provide any database instance you have created to be passed
   * to your models.
   *
   * Warning: By passing unsafe database we cannot
   * guarantee the connection is alive and notify in case it don't
   * @default none
   */
  unsafeDatabase?: any
  /**
   * Express session configuration
   * In order to enable session's please
   * provide the required options.
   * Remmeber: Express session is shared
   * if you have socketio enabled
   * @default
   */
  sessionOptions?: SessionOptions
  /**
   * Server hostname for remote connection
   * @default localhost
   */
  hostname?: string
  /**
   * Express response view engine
   * @default ejs
   */
  viewEngine?: string
  /**
   * If you are using some proxy reverse such as Nginx
   * please set this to true
   * @default false
   */
  trustProxy?: boolean
  /**
   * Enable CORS module with the provided options
   */
  corsOptions?: CorsOptions
}
