import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import * as admin from 'firebase-admin'
import Env from '@ioc:Adonis/Core/Env'
/*
|--------------------------------------------------------------------------
| Provider
|--------------------------------------------------------------------------
|
| Your application is not ready when this file is loaded by the framework.
| Hence, the top level imports relying on the IoC container will not work.
| You must import them inside the life-cycle methods defined inside
| the provider class.
|
| @example:
|
| public async ready () {
|   const Database = this.app.container.resolveBinding('Adonis/Lucid/Database')
|   const Event = this.app.container.resolveBinding('Adonis/Core/Event')
|   Event.on('db:query', Database.prettyPrint)
| }
|
*/
export default class FirebaseProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
    // const account = require('./admin.json')
    const account = Env.get('FIREBASE')
    const firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(account as string)),
    })
    this.app.container.singleton('Firebase', () => firebaseApp)
  }

  public async boot() {
    // All bindings are ready, feel free to use them
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
