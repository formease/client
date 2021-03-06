import {
  createProjectPopUp,
  descriptionError,
  projectSuccess,
  titleError,
  webhookInput,
} from './pop-up.js'
import { sendRequest } from './send.js'
import '../css/dashboard.css'

const createProjectBtn = document.querySelector('[data-create-project-btn]')

createProjectBtn.addEventListener('click', async function (e) {
  if (e.defaultPrevented) return

  const { value: data } = await createProjectPopUp()
  if (!data) return

  if (data.projectName.length < 4 || data.projectName.length > 40) {
    const { value: projectName } = await titleError(data)
    data.projectName = projectName
  }
  if (!data.projectName) return
  if (data.projectDescription.length < 5 || data.projectDescription.length > 100) {
    const { value: projectDescription } = await descriptionError(data)
    data.projectDescription = projectDescription
  }

  if (data['Discord Webhook Support']) {
    const { value: webhook } = await webhookInput()
    if (!webhook) return
    data.discordWebhook = webhook
  }
  if (data && data.projectName.length >= 4 && data.projectName.length <= 40) {
    let result = await sendRequest(data)
    projectSuccess()
    document.location.href = `/dashboard/${result.data.id}`
  }
})

document.querySelectorAll('[data-form]').forEach((form) => {
  form.addEventListener('click', async (e) => {
    const id = form.dataset.form
    document.location.href = `/dashboard/${id}`
  })
})

const childProjects = document.getElementById('project-list').childNodes
if (childProjects.length === 1) {
  while (document.getElementById('project-list').firstChild) {
    document
      .getElementById('project-list')
      .removeChild(document.getElementById('project-list').firstChild)
  }
}
