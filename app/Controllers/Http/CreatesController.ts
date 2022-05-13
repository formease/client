import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { v4 as uuidv4 } from 'uuid'
import * as firebaseApp from '@ioc:Firebase'

export default class CreatesController {
  public async index(ctx: HttpContextContract) {
    if (!ctx.request.cookiesList()['user']) return ctx.response.redirect('/auth')
    const verify = await firebaseApp.auth().verifyIdToken(ctx.request.cookiesList()['user'])
    if (!verify.uid) return ctx.view.render('errors/unauthorized')
    console.log(ctx.request.body())
    if (
      !ctx.request.body().request['Discord Webhook Support'] &&
      !ctx.request.body().request['Google Support']
    ) {
      return ctx.response.badRequest({
        message: 'Please select atleast one option',
      })
    }
    const { projectName, projectDescription, discordWebhook } = ctx.request.body().request
    const data = await Database.from('users').where('uid', verify.uid)
    if (data.length === 5) {
      return ctx.response.status(403).send('You have reached the maximum number of projects')
    }
    const formId = uuidv4()
    await Database.table('users').insert({
      uid: `${verify.uid}`,
      formId: formId,
      name: `${projectName}`,
      description: `${projectDescription}` ? `${projectDescription}` : '',
      discord: `${ctx.request.body().request['Discord Webhook Support'] ? discordWebhook : null}`,
      sheets: `${ctx.request.body().request['Google Support'] ? 'done' : null}`,
    })
    return ctx.response.accepted({
      data: {
        message: 'Project created successfully !!!',
        id: formId,
      },
    })
  }
  public async delete(ctx: HttpContextContract) {
    const userid = ctx.request.cookiesList()['user']
    const verify = await firebaseApp.auth().verifyIdToken(userid)
    if (!verify.uid) return ctx.view.render('errors/unauthorized')
    await Database.from('users')
      .where('uid', verify.uid)
      .where('formId', ctx.request.body().request)
      .delete()
    return ctx.response.accepted({
      data: {
        message: 'Project deleted successfully !!!',
      },
    })
  }
}
