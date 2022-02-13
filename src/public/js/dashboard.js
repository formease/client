import Swal from 'sweetalert2'

// Theme functionality
const THEME_BTN = document.getElementById('theme-toggler')
let currentTheme = document.documentElement.dataset.theme
const localTheme = localStorage.getItem('theme')
const preferedTheme = window.matchMedia('(prefers-color-scheme: dark)')

const darkPopupStyleSheet = document.getElementById('popup-dark-theme')

const themesBtnHTML = {
  dark: `<span class="material-icons-outlined material-icons">
    dark_mode
    </span>`,
  light: `<span class="material-icons-outlined material-icons">
    light_mode
    </span>`
}

if (localTheme) {
  document.documentElement.dataset.theme = localTheme
  THEME_BTN.innerHTML = themesBtnHTML[localTheme]

  if (localTheme === 'light') darkPopupStyleSheet.remove()
} else if (preferedTheme.matches) {
  document.documentElement.dataset.theme = 'dark'

  THEME_BTN.innerHTML = themesBtnHTML.dark
  document.head.append(darkPopupStyleSheet)

  localStorage.setItem('theme', 'dark')
} else {
  localStorage.setItem('theme', 'light')
  if (localTheme === 'light') darkPopupStyleSheet.remove()
}

THEME_BTN.addEventListener('click', () => {
  currentTheme = document.documentElement.dataset.theme
  if (currentTheme === 'dark') {
    document.documentElement.dataset.theme = 'light'

    THEME_BTN.innerHTML = themesBtnHTML.light
    darkPopupStyleSheet.remove()

    localStorage.setItem('theme', 'light')
  } else {
    document.documentElement.dataset.theme = 'dark'
    THEME_BTN.innerHTML = themesBtnHTML.dark
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
document.querySelector('[data-sidebar-toggler]').addEventListener('click', () => {
  const asideElem = document.querySelector('aside')
  asideElem.classList.toggle('active')

  document.addEventListener('click', (e) => {
    if (e.target.closest('aside') || e.target.closest('[data-sidebar-toggler]')) return

    if (asideElem.classList.contains('active')) asideElem.classList.remove('active')
  })
})
// -----------------------
const createProjectBtn = document.querySelector('[data-create-project-btn]')

const createProjectPopupObj = {
  title: 'Create Project',
  html:
    '<input type="text" label="Name" placeholder="Enter Project name" class="swal2-input entered-project-name"/>' +
    '<input type="text" label="Description" placeholder="Enter Project Description" class="swal2-input entered-project-description"/>' +
    '<br><br>' +
    '<label for="google-support" class="popup-label">Google Drive support</label>' +
    '<input type="checkbox" label="Google drive support" id="google-support"/>' +
    '<br>' +
    '<label for="discord-webhook-support" class="popup-label">Discord Webhook support</label>' +
    '<input type="checkbox" label="Discord Webhook support" id="discord-webhook-support"/>',
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

createProjectBtn.addEventListener('click', async function (e) {
  if (e.defaultPrevented) return
  const { value: data } = await Swal.fire(createProjectPopupObj)
  if (!data) return
  if (data.projectName.length < 5) {
    const { value: projectName } = await Swal.fire({
      title: 'Project name should have at least 5 characters',
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
        if (value.length < 5) {
          return 'Name should have at least 5 characters!'
        }
      }
    })
    data.projectName = projectName
  }
  if (!data.projectName) return
  if (data && data.projectName.length >= 5) {
    Swal.fire({
      icon: 'success',
      title: 'Project Created!',
      html:
        `<b>Name:</b> ${data.projectName}<br>` +
        `<b>Description:</b> ${data.projectDescription}<br>` +
        `${data['Google Support'] ? '<b>Google Drive support</b>: Yes<br>' : ''}` +
        `${data['Discord Webhook Support'] ? '<b>Discord Webhook support</b>: Yes<br>' : ''}`
    })
  }
})
