import Route from '@ioc:Adonis/Core/Route'

// file deepcode ignore NoRateLimitingForExpensiveWebOperation: <Already applied>

Route.get('/dashboard', async ({ view }) => {
  return view.render('dashboard', {
    data: [
      {
        projectName: 'hello',
        projectDescription: 'world',
      },
      {
        projectName: 'hello2',
        projectDescription: 'world2',
      },
    ],
  })
})

/*
        <li data-project="${data.projectName}" role="tab" tabindex="0">${data.projectName}<small>${data.projectDescription}</small></li>
*/
