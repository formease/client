import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class FormsController {
  public async index(ctx: HttpContextContract) {
    console.log(ctx.request.body())
    ctx.response.accepted({
      message: 'Form submitted successfully',
    })
  }
}
