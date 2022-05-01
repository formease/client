import { templates } from './templates.js'
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
const profileWrapper = document.querySelector('.profile-wrapper');
const profileTooltip = profileWrapper.querySelector('.profile__tooltip');

profileWrapper.addEventListener('click', function () {
  const profileTooltipActive = profileTooltip.classList.contains('profile__tooltip--active')
  
  if (profileTooltipActive) {
    profileTooltip.classList.remove("profile__tooltip--active");
    profileTooltip.classList.add("profile__tooltip--closed");

    profileTooltip.addEventListener('animationend', () => {
      profileTooltip.classList.remove("profile__tooltip--closed");
    }, {once: true})
    return;
  }

  profileTooltip.classList.remove("profile__tooltip--closed")
  profileTooltip.classList.add("profile__tooltip--active")
})

// sidebar toggler
const asideElem = document.querySelector('aside')

document.addEventListener('keyup', (e) => {
  if (e.key === 'Enter' && document.activeElement.closest('#project-list li')) {
    document.activeElement.click()
  }
})
document.querySelector('[data-sidebar-toggler]').addEventListener('click', () => {
  asideElem.classList.toggle('active')
})
document.addEventListener('click', (e) => {
  const target = e.target
  if (target.closest('aside') || target.closest('[data-sidebar-toggler]')) return
  if (asideElem.classList.contains('active')) asideElem.classList.remove('active')
})

// service worker registration
if (navigator.serviceWorker) {
  navigator.serviceWorker.register("/service-worker.js").then(() => {
    console.log("Service worker successfully registered")
  }, () => {
    console.log("Service worker failed to register")
  })
} else {
  console.log("Service workers aren't supported")
}
