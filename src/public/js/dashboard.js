import Swal from 'sweetalert2'
import { sidebarInsert, templates } from './templates.js'
import { createProjectPopUp, deleteProject, descriptionError, editProject, projectSuccess, titleCollision, titleError, webhookInput } from './pop-up.js'
import { sendRequest } from './send.js'

// Theme functionality
const THEME_BTN = document.getElementById('theme-toggler')
let currentTheme = document.documentElement.dataset.theme
let localTheme = localStorage.getItem('theme')
const preferedTheme = window.matchMedia('(prefers-color-scheme: dark)')

const darkPopupStyleSheet = document.getElementById('popup-dark-theme')

const themeChecker = () => {
  if (localTheme) {
    localTheme = localStorage.getItem('theme')

    document.documentElement.dataset.theme = localTheme
    THEME_BTN.innerHTML = templates[localTheme]

    if (localTheme === 'light') darkPopupStyleSheet.remove()
    else if (localTheme === 'dark') document.head.append(darkPopupStyleSheet)
  } else if (preferedTheme.matches) {
    document.documentElement.dataset.theme = 'dark'

    THEME_BTN.innerHTML = templates.dark
    document.head.append(darkPopupStyleSheet)

    localStorage.setItem('theme', 'dark')
  } else {
    localStorage.setItem('theme', 'light')
    darkPopupStyleSheet.remove()
  }
}
themeChecker()

window.addEventListener('storage', (e) => {
  const storageArea = e.storageArea
  const keyChanged = e.key

  if (keyChanged !== 'theme') return
  localStorage.setItem(keyChanged, storageArea.theme)
  themeChecker()
})

THEME_BTN.addEventListener('click', () => {
  currentTheme = document.documentElement.dataset.theme
  if (currentTheme === 'dark') {
    document.documentElement.dataset.theme = 'light'
    THEME_BTN.innerHTML = templates.light
    darkPopupStyleSheet.remove()

    localStorage.setItem('theme', 'light')
  } else {
    document.documentElement.dataset.theme = 'dark'
    THEME_BTN.innerHTML = templates.dark
    localStorage.setItem('theme', 'dark')

    document.head.append(darkPopupStyleSheet)
  }
})
// profile tooltip toggler
const profileWrapper = document.querySelector('.profile-wrapper')
profileWrapper.addEventListener('click', function () {
  profileWrapper.querySelector('.profile__tooltip').classList.toggle('profile__tooltip--active')
})

// sidebar toggler
const asideElem = document.querySelector('aside')
document.querySelector('[data-sidebar-toggler]').addEventListener('click', () => {
  asideElem.classList.toggle('active')

  document.addEventListener('click', (e) => {
    const target = e.target
    if (target.closest('aside') || target.closest('[data-sidebar-toggler]')) return
    if (asideElem.classList.contains('active')) asideElem.classList.remove('active')
  })
})
// -----------------------
const createProjectBtn = document.querySelector('[data-create-project-btn]')
const projectList = document.getElementById('project-list')
const mainWrapper = document.querySelector('.main__wrapper')
let projects = []

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

  if (projects.find((project) => project.projectName === data.projectName)) {
    titleCollision()
    return
  }

  if (data['Discord Webhook Support']) {
    const { value: webhook } = await webhookInput()
    if (!webhook) return
    data.discordWebhook = webhook
  }
  if (data && data.projectName.length >= 4 && data.projectName.length <= 40) {
    projectSuccess()
    projects.push(data)
    // project creation results here 👇
    const projectObj = projects[projects.length - 1]
    sendRequest(projectObj)

    const projectElemHTML = `<li data-project="${data.projectName}">${data.projectName}<small>${data.projectDescription}</small></li>`
    projectList.insertAdjacentHTML('beforeend', projectElemHTML)

    const projectDashboardHTML = sidebarInsert(data)
    mainWrapper.insertAdjacentHTML('beforeend', projectDashboardHTML)
    removeOtherDashboard(data.projectName)

    projectObj.asideProjectElem = projectList.lastElementChild
    projectObj.mainProjectElem = mainWrapper.lastElementChild

    // extra stuff
    const currentProjectDashboard = mainWrapper.lastElementChild
    const copyBtn = currentProjectDashboard.querySelector('[data-copy-btn]')
    const inputModeChangeBtn = currentProjectDashboard.querySelector('[data-inp-mode-btn]')
    const editBtn = currentProjectDashboard.querySelector('[data-projectEdit-btn]')
    const deleteBtn = currentProjectDashboard.querySelector('[data-projectDelete-btn]')

    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(copyBtn.previousElementSibling.value)
        const copyBtnText = copyBtn.textContent
        copyBtn.textContent = 'Copied!'
        setTimeout(() => {
          copyBtn.textContent = copyBtnText
        }, 1500)
      })
    }
    if (inputModeChangeBtn) {
      inputModeChangeBtn.addEventListener('click', () => {
        const input = inputModeChangeBtn.previousElementSibling
        if (input.type === 'url') {
          input.type = 'password'
          inputModeChangeBtn.textContent = 'Show link'
          return
        }
        input.type = 'url'
        inputModeChangeBtn.textContent = 'Hide link'
      })
    }

    editBtn.addEventListener('click', async () => {
      const { value: result } = await editProject(data)
      if (!result) return
      if (result.projectName.length < 4 || result.projectName.length > 40) {
        const { value: projectName } = await titleError(result)
        result.projectName = projectName
      }
      if (!result.projectName) return
      if (result.projectDescription.length < 5 || result.projectDescription.length > 100) {
        const { value: projectDescription } = await descriptionError(result)
        result.projectDescription = projectDescription
      }
      if (projects.find((project) => project.projectName === result.projectName)) {
        titleCollision()
        return
      }
      projectObj.projectDescription = result.projectDescription
      projectObj.projectName = result.projectName

      projectObj.asideProjectElem.innerHTML = `${result.projectName}<small>${result.projectDescription}</small>`
      projectObj.mainProjectElem.querySelector('h2').textContent = result.projectName
      projectObj.mainProjectElem.querySelector('.description').textContent =
        result.projectDescription
      if (result.discordWebhook) {
        if (!/(https?):\/{2}discord.com\/api\/webhooks\/[0-9]+\//.test(result.discordWebhook)) {
          return Swal.fire({
            icon: 'error',
            title: 'Invalid Discord Webhook url',
            text: 'Please enter a valid Discord Webhook url'
          })
        }
        projectObj.mainProjectElem.querySelector('.discord-webhook-link').value = result.discordWebhook
        projectObj.discordWebhook = result.discordWebhook
      }
    })

    deleteBtn.addEventListener('click', () => {
      // deepcode ignore PromiseNotCaughtGeneral:
      deleteProject().then((result) => {
        if (!result.isConfirmed) return
        const { mainProjectElem, asideProjectElem } = projectObj

        if (mainProjectElem.previousElementSibling) {
          mainProjectElem.previousElementSibling.classList.remove('hidden')
        } else {
          mainProjectElem.nextElementSibling?.classList.remove('hidden')
        }

        asideProjectElem.remove()
        mainProjectElem.remove()

        projects = projects.filter((project) => project !== projectObj)
      })
    })
  }
})

// dashboard project change
projectList.addEventListener('click', function (e) {
  const target = e.target.closest('li')
  if (!target) return

  const projectName = target.dataset.project
  removeOtherDashboard(projectName)
})

function removeOtherDashboard (currentDashboard) {
  const otherProjectDashboard = document.querySelectorAll(
    `.main__wrapper > .project-dashboard:not([data-project-for="${currentDashboard}"])`
  )

  otherProjectDashboard.forEach((projectDash) => {
    projectDash.classList.add('removing')
    setTimeout(() => {
      projectDash.classList.add('hidden')
      projectDash.classList.remove('removing')
    }, 300)
  })
  setTimeout(() => {
    document.querySelector(`[data-project-for="${currentDashboard}"]`).classList?.remove('hidden')
  }, 310)

  if (asideElem.classList.contains('active')) asideElem.classList.remove('active')
}
