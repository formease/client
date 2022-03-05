import { editProject } from './pop-up'
import { deleteRequest } from './send'
import Swal from 'sweetalert2'

document.querySelector('[data-projectEdit-btn]').addEventListener('click', async () => {
  await editProject()
})
document.querySelector('[data-projectDelete-btn]').addEventListener('click', async () => {
  const documentUrl = document.location.href
  const projectId = documentUrl.split('/')[5]
  const done = await deleteRequest(projectId)
  Swal.fire({
    toast: true,
    icon: 'success',
    title: 'Project deleted',
    text: `${done.data.message}`,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
  })
})
