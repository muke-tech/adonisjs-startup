import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
  public async me({ auth }: HttpContextContract) {
    await auth.use('api').authenticate()
    return auth.use('api').user!
  }
}
