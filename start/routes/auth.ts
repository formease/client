import Route from '@ioc:Adonis/Core/Route'

// file deepcode ignore NoRateLimitingForExpensiveWebOperation: <Already applied>

Route.get('/auth', async ({ view }) => {
  return view.render('auth')
})
