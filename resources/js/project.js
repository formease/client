import { editProject } from './pop-up'
import { deleteRequest } from './send'
import Swal from 'sweetalert2'

document.querySelector('[data-projectEdit-btn]').addEventListener('click', async () => {
  await editProject()
})
document.querySelector('[data-inp-mode-btn]').addEventListener('click', async (e) => {
  if (e.target.innerText === 'Show link') {
    document.getElementById('discord-webhook-link').type = 'text'
    e.target.innerText = 'Hide link'
    return
  }
  document.getElementById('discord-webhook-link').type = 'password'
  e.target.innerText = 'Show link'
})
document.querySelector('[data-projectDelete-btn]').addEventListener('click', async () => {
  const documentUrl = document.location.href
  const projectId = documentUrl.split('/')[4]
  const done = await deleteRequest(projectId)
  await Swal.fire({
    toast: true,
    icon: 'success',
    title: 'Project deleted',
    text: `${done.data.message}`,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1000,
  })
  document.location.href = '/dashboard'
})
