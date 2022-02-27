import Route from '@ioc:Adonis/Core/Route'

// file deepcode ignore NoRateLimitingForExpensiveWebOperation: <Already applied>

Route.get('/dashboard', async ({ view }) => {
  return view.render('dashboard')
})
