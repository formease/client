import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { firebaseApp } from '../../../server'

export default class DashboardController {
  public async index(ctx: HttpContextContract) {
    let data: Array<object>
    try {
      const verify = await firebaseApp.auth().getUser(ctx.params.id)
      if (!verify.uid) return ctx.view.render('errors/unauthorized')
      data = await Database.from('users').where('uid', ctx.params.id)
      return ctx.view.render('dashboard', {
        data: data,
      })
    } catch (error) {
      return ctx.view.render('errors/unauthorized')
    }
  }
}
