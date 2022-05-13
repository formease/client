import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import uuidAPIKey from 'uuid-apikey'

export default class TokenVerification {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    try {
      if (!ctx.request.body().token)
        return ctx.response.status(400).json({
          message: 'Please provide a valid token',
        })
      if (!uuidAPIKey.isAPIKey(ctx.request.body().token))
        return ctx.response.status(400).json({
          message: 'Please provide a valid token',
        })
      const key = uuidAPIKey.toUUID(ctx.request.body().token)
      const data = await Database.from('api').where('uid', key)
      if (data.length === 0)
        return ctx.response.status(404).json({
          message: 'Token not found',
        })
      await next()
    } catch (err) {
      ctx.response.status(500).json({
        message: 'Internal server error',
      })
      console.log(err)
    }
  }
}
