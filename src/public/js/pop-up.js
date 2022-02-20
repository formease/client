import { templates } from './templates.js'
import Swal from 'sweetalert2'

export const createProjectPopUp = async () => {
  const createProjectPopupObj = {
    title: 'Create Project',
    html: templates.createProject,
    showCancelButton: true,
    confirmButtonText: 'Create Project',
    preConfirm: () => {
      return {
        projectName: document.querySelector('.entered-project-name').value,
        projectDescription: document.querySelector('.entered-project-description').value,
        'Google Support': document.getElementById('google-support').checked,
        'Discord Webhook Support': document.getElementById('discord-webhook-support').checked
      }
    }
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
      autocomplete: 'off'
    },
    inputValidator: (value) => {
      if (value.length < 4) {
        return 'Name should have at least 4 characters and at maximum 30!'
      } else if (value.length > 40) {
        return 'Name should have at maximum 40 characters!'
      }
    }
  })
}

export const titleCollision = () => {
  Swal.fire({
    icon: 'error',
    title: 'Already a project with same name',
    text: 'Please choose a different name for your project',
    inputAttributes: {
      autocomplete: 'off'
    }
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
      autocomplete: 'off'
    },
    showCancelButton: true
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
    timerProgressBar: true
  })
}
