import Swal from 'sweetalert2'
import { mainInsert } from './templates.js'
import {
  createProjectPopUp,
  deleteProject,
  descriptionError,
  editProject,
  projectSuccess,
  titleCollision,
  titleError,
  webhookInput,
} from './pop-up.js'
import { sendRequest } from './send.js'
import '../css/dashboard.css'

const createProjectBtn = document.querySelector('[data-create-project-btn]')
const projectList = document.getElementById('project-list')
const mainWrapper = document.querySelector('.main__wrapper')

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
    document.location.href = `/dashboard/${localStorage.getItem('user')}/${result.data.id}`
  }
})
