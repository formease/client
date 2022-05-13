import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import * as firebaseApp from '@ioc:Firebase'
import Database from '@ioc:Adonis/Lucid/Database'
import uuidAPIKey from 'uuid-apikey'

export default class ApisController {
  public async auth(ctx: HttpContextContract) {
    try {
      if (!ctx.request.cookiesList()['user']) return ctx.response.redirect('/auth')
      const verify = await firebaseApp.auth().verifyIdToken(ctx.request.cookiesList()['user'])
      if (!verify.uid) return ctx.response.redirect('/auth')
      const data = await Database.from('api').where('user', verify.uid)
      if (data.length === 0 && ctx.request.qs()['regenerate'] === true)
        return ctx.response.json({
          message: 'Please register your API key',
        })
      if (ctx.request.qs()['regenerate'] === 'true') {
        const key = uuidAPIKey.create()
        await Database.from('api').where('user', verify.uid).delete()
        await Database.table('api').insert({
          user: verify.uid,
          uid: key.uuid,
        })
        return ctx.response.redirect('/api/key')
      }
      if (data.length === 0) {
        const apiKey = uuidAPIKey.create()
        await Database.table('api').insert({
          user: verify.uid,
          uid: apiKey.uuid,
        })
        return ctx.response.json({
          apiKey: apiKey.apiKey,
        })
      }
      return ctx.response.json({
        apiKey: uuidAPIKey.toAPIKey(data[0].uid),
      })
    } catch (error) {
      console.log(error)
    }
  }
  public async clientAuth(ctx: HttpContextContract) {
    return ctx.response.json({
      message: 'hello',
    })
  }
}
