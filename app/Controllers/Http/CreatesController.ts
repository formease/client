import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { v4 as uuidv4 } from 'uuid'

export default class CreatesController {
  public async index(ctx: HttpContextContract) {
    const { user } = ctx.request.body()
    const { projectName, projectDescription, discordWebhook } = ctx.request.body().request
    const data = await Database.from('users').where('uid', user)
    if (data.length === 5) {
      return ctx.response.status(403).send('You have reached the maximum number of projects')
    }
    const formId = uuidv4()
    await Database.table('users').insert({
      uid: `${user}`,
      formId: formId,
      name: `${projectName}`,
      description: `${projectDescription}` ? `${projectDescription}` : '',
      discord: `${ctx.request.body().request['Discord Webhook Support'] ? discordWebhook : null}`,
      sheets: `${ctx.request.body().request['Google Support'] ? 'done' : null}`,
    })
    return ctx.response.send({
      status: 200,
      data: {
        message: 'Project created successfully',
        id: formId,
      },
    })
  }
}
