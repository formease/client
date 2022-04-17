import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import webhook from 'webhook-discord'

export default class FormsController {
  public async index(ctx: HttpContextContract) {
    console.log(ctx.request.body())
    const formId = ctx.request.param('formid')
    const dataFetch = await Database.from('users').where('formid', formId)
    if (dataFetch.length === 0)
      return ctx.response.badRequest({
        error: 'Form not found',
      })
    if (dataFetch[0].discord !== null) {
      const discord = dataFetch[0].discord
      const hook = new webhook.Webhook(discord)
      const message = new webhook.MessageBuilder()
        .setAvatar('https://i.imgur.com/XQ9QY.png')
        .setName(`FormEase (${dataFetch[0].name})`)
        .addField(
          `**A new response has been recorded !!!**`,
          `\`\`\`json\n${JSON.stringify(ctx.request.body(), null, 2)}\`\`\``
        )
        .addField('**Request IP**', ctx.request.ip())
        .setColor('#0099ff')
        .setTime()
      try {
        hook.send(message)
      } catch (e) {
        console.log(e)
        return ctx.response.status(500).json({
          error: 'Discord hook failed',
          message: 'Please check your discord hook',
        })
      }
    }
    return ctx.response.accepted({
      message: 'Form submitted successfully',
    })
  }
}
