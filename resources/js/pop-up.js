import { templates } from './templates.js'
import Swal from 'sweetalert2'
import 'core-js/stable'
import 'regenerator-runtime/runtime'

export const createProjectPopUp = async () => {
  const createProjectPopupObj = {
    title: 'Create Project',
    html: templates.createProject,
    showCancelButton: true,
    confirmButtonText: 'Create Project',
    preConfirm: () => {
      return {
        'projectName': document.querySelector('.entered-project-name').value,
        'projectDescription': document.querySelector('.entered-project-description').value,
        'Google Support': document.getElementById('google-support').checked,
        'Discord Webhook Support': document.getElementById('discord-webhook-support').checked,
      }
    },
  }
  return await Swal.fire(createProjectPopupObj)
}

export const titleError = async (data) => {
  return await Swal.fire({
    title: 'Project name should have at least 4 characters and at maximum 40',
    input: 'text',
    icon: 'error',
    inputLabel: 'Enter Project name',
    inputValue: data.projectName,
    inputPlaceholder: 'Project name..',
    showCancelButton: true,
    inputAttributes: {
      autocomplete: 'off',
    },
    inputValidator: (value) => {
      if (value.length < 4) {
        return 'Name should have at least 4 characters and at maximum 30!'
      } else if (value.length > 40) {
        return 'Name should have at maximum 40 characters!'
      }
    },
  })
}
export const descriptionError = async (data) => {
  return await Swal.fire({
    title: 'Project description should have at least 5 characters and at maximum 100',
    input: 'text',
    icon: 'error',
    inputLabel: 'Enter Project description',
    inputValue: data.projectName,
    inputPlaceholder: 'Project description..',
    showCancelButton: true,
    inputAttributes: {
      autocomplete: 'off',
    },
    inputValidator: (value) => {
      if (value.length < 5) {
        return 'Name should have at least 5 characters and at maximum 30!'
      } else if (value.length > 100) {
        return 'Name should have at maximum 100 characters!'
      }
    },
  })
}

export const titleCollision = () => {
  Swal.fire({
    icon: 'error',
    title: 'Already a project with same name',
    text: 'Please choose a different name for your project',
    inputAttributes: {
      autocomplete: 'off',
    },
  })
}

export const webhookInput = async () => {
  return await Swal.fire({
    icon: 'info',
    title: 'One more step! Enter your discord webhook here!',
    footer:
      "Don't really know how? Follow the steps-<a href='https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks'> here</a>",
    input: 'url',
    inputLabel: 'Discord Webhook url',
    inputPlaceholder: 'Enter the URL',
    inputAttributes: {
      autocomplete: 'off',
    },
    showCancelButton: true,
    inputValidator: (value) => {
      if (!/(https?):\/{2}discord.com\/api\/webhooks\/[0-9]+\//.test(value)) {
        return 'Please enter a valid Discord Webhook url'
      }
    },
  })
}

export const projectSuccess = () => {
  Swal.fire({
    toast: true,
    icon: 'success',
    title: 'Project created successfully!',
    position: 'top-end',
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
  })
}
export const projectFail = () => {
  Swal.fire({
    toast: true,
    icon: 'error',
    title: 'Project cannot be created!',
    position: 'top-end',
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
  })
}
export const projectFailDelete = () => {
  Swal.fire({
    toast: true,
    icon: 'error',
    title: 'Project cannot be deleted!',
    position: 'top-end',
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
  })
}

export const editProject = async (data) => {
  return await Swal.fire({
    title: 'Edit Project',
    icon: 'info',
    showCancelButton: false,
    confirmButtonText: 'Okay',
    text: 'Editing project is a WIP feature. Thus currently is not available',
    allowEnterKey: false,
  })
}

export const deleteProject = async () => {
  return await Swal.fire({
    title: 'Delete Project?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Delete Project',
    html: "<b>Warning</b>- This action is permanent and can't be undone.",
    allowEnterKey: false,
  })
}
