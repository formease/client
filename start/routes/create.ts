import Route from '@ioc:Adonis/Core/Route'
import Database from '@ioc:Adonis/Lucid/Database'

// file deepcode ignore NoRateLimitingForExpensiveWebOperation: <Already applied>

Route.post('/createForm', async ({ request, response }) => {
  console.log(request.body())
  await Database.table('users').insert({
    uid: 'asdas',
    name: `${request.body().projectName}`,
    description: `${request.body().projectDescription}`,
    discord: `${request.body().discordWebhook}`,
  })
  return response.send({
    status: 200,
    data: {
      projectName: request.input('projectName'),
      projectDescription: request.input('projectDescription'),
    },
  })
})

/*
        <li data-project="${data.projectName}" role="tab" tabindex="0">${data.projectName}<small>${data.projectDescription}</small></li>
*/
