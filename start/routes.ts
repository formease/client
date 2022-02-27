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
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
// Custom Routes Start
import './routes/dashboard'
import './routes/create'
// Custom Routes end

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})

Route.get('auth', async ({ view }) => {
  return view.render('auth')
})

// 404 handler
Route.get('*', async ({ view }) => {
  return view.render('errors/not-found')
})
