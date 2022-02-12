import { loginGoogle, loginGithub, FirebaseInit, stateManager } from './auth'

const localTheme = localStorage.getItem('theme')
const preferedTheme = window.matchMedia('(prefers-color-scheme: dark)')

if (localTheme) {
  document.documentElement.dataset.theme = localTheme
} else if (preferedTheme.matches) {
  document.documentElement.dataset.theme = 'dark'
  localStorage.setItem('theme', 'dark')
} else {
  localStorage.setItem('theme', 'light')
}

document.querySelector('#light-button').addEventListener('click', () => {
  document.documentElement.dataset.theme = 'light'
  localStorage.setItem('theme', 'light')
})
document.querySelector('#dark-button').addEventListener('click', () => {
  document.documentElement.dataset.theme = 'dark'
  localStorage.setItem('theme', 'dark')
})
const runner = async () => {
  await FirebaseInit()
  stateManager()
  document.getElementById('google_auth').addEventListener('click', () => {
    loginGoogle()
  })
  document.getElementById('github_auth').addEventListener('click', () => {
    loginGithub()
  })
}
runner()
