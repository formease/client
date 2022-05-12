import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import * as firebaseApp from '@ioc:Firebase'
import uuidAPIKey from 'uuid-apikey'

export default class ApisController {
  public async auth(ctx: HttpContextContract) {
    try {
      const verify = await firebaseApp.auth().verifyIdToken(ctx.request.cookiesList()['user'])
      if (!verify.uid) return ctx.response.redirect('/auth')
      return ctx.response.json({
        message: uuidAPIKey.create(),
      })
    } catch (error) {
      console.log(error)
    }
  }
}
