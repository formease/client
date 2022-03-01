import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class CreatesController {
  public async index(ctx: HttpContextContract) {
    const { user } = ctx.request.body()
    const { projectName, projectDescription, discordWebhook } = ctx.request.body().request
    await Database.table('users').insert({
      uid: `${user}`,
      formId: `${projectName}`,
      name: `${projectName}`,
      description: `${projectDescription}` ? `${projectDescription}` : '',
      discord: `${ctx.request.body().request['Discord Webhook Support'] ? discordWebhook : null}`,
      sheets: `${ctx.request.body().request['Google Support'] ? 'done' : null}`,
    })
    return ctx.response.send({
      status: 200,
      data: {
        projectName: ctx.request.input('projectName'),
        projectDescription: ctx.request.input('projectDescription'),
      },
    })
  }
}
