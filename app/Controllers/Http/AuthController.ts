import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
  public async login({ auth }: HttpContextContract) {
    const user = await User.find(1)
    const token = await auth.use('api').generate(user)

    return token
  }
}
