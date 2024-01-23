/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import Http from 'App/Helper/Http'

Route.get('/http', async () => {
  const http = new Http('appkey')

  return http.post({
    c: 2,
    a: {
      b: 1,
      a: 2
    }
  })
})

// 用于回显请求详情
Route.any('/echo', async (request) => {

  return request
})

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.post('/login', 'AuthController.login').as('login')
  Route.get('/user/me', 'UsersController.me').as('users.me')
}).prefix('api')
