import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import Logger from '@ioc:Adonis/Core/Logger'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    Logger.info('App is booted')
  }

  public async ready() {
    Logger.info('App is ready !!!')
  }

  public async shutdown() {
    Logger.info('App is about to shut down')
  }
}
