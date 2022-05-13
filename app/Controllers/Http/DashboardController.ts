import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import * as firebaseApp from '@ioc:Firebase'

export default class DashboardController {
  public async index(ctx: HttpContextContract) {
    let data: Array<object>
    try {
      if (!ctx.request.cookiesList()['user']) return ctx.response.redirect('/auth')
      const verify = await firebaseApp.auth().verifyIdToken(ctx.request.cookiesList()['user'])
      if (!verify.uid) return ctx.view.render('errors/unauthorized')
      try {
        data = await Database.from('users').where('uid', verify.uid)
        return ctx.view.render('dashboard', {
          data: data,
        })
      } catch (error) {
        return ctx.response.json({
          message: 'Opps! Something went wrong',
          error: error,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
  public async user(ctx: HttpContextContract) {
    let data: Array<object>
    let list: Array<object>
    try {
      const verify = await firebaseApp.auth().verifyIdToken(ctx.request.cookiesList()['user'])
      if (!verify.uid) return ctx.view.render('errors/unauthorized')
      data = await Database.from('users')
        .where('formid', ctx.params.formid)
        .where('uid', verify.uid)
      if (data.length === 0) return ctx.view.render('errors/unauthorized')
      list = await Database.from('users').where('uid', verify.uid)
      return ctx.view.render('project', {
        list: list,
        project: data[0],
      })
    } catch (error) {
      return ctx.view.render('errors/unauthorized')
    }
  }
}
