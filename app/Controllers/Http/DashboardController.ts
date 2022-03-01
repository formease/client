import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class DashboardController {
  public async index(ctx: HttpContextContract) {
    if (ctx.request.cookiesList().uid) {
      let data: Array<object>
      data = await Database.from('users').where('uid', ctx.request.cookiesList().uid)
      return ctx.view.render('dashboard', {
        data: data,
      })
    }
    return ctx.view.render('dashboard')
  }
}
