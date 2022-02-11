import { getAuth } from 'firebase/auth'
import { FirebaseInit } from './auth'

// Theme functionality
const THEME_BTN = document.getElementById('theme-toggler')
let currentTheme = document.documentElement.dataset.theme
const localTheme = localStorage.getItem('theme')
const preferedTheme = window.matchMedia('(prefers-color-scheme: dark)')

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
} else if (preferedTheme.matches) {
  document.documentElement.dataset.theme = 'dark'
  THEME_BTN.innerHTML = themesBtnHTML.dark
  localStorage.setItem('theme', 'dark')
} else {
  localStorage.setItem('theme', 'light')
}

THEME_BTN.addEventListener('click', () => {
  currentTheme = document.documentElement.dataset.theme
  if (currentTheme === 'dark') {
    document.documentElement.dataset.theme = 'light'
    THEME_BTN.innerHTML = themesBtnHTML.light
    localStorage.setItem('theme', 'light')
  } else {
    document.documentElement.dataset.theme = 'dark'
    THEME_BTN.innerHTML = themesBtnHTML.dark
    localStorage.setItem('theme', 'dark')
  }
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

// popup functionality

class userPopup extends HTMLElement {
  connectedCallback () {
    this.classList.add('user__popup')

    this.addEventListener('click', (e) => {
      const target = e.target
      if (target.closest('.user__popup_removeBtn')) {
        const popupElem = target.closest('.user__popup')

        popupElem.classList.add('removing')
        setTimeout(() => {
          popupElem.remove()
        }, 250)
      }
    })
  }
}
customElements.define('user-popup', userPopup)

function createPopup (titleHTML, contentHTML, permanent = false, extraHTML = '') {
  const popupElem = document.createElement('user-popup')
  popupElem.innerHTML = `<div><h3 class="user__popup_h3">${titleHTML}</h3><p class="content">${contentHTML}</p>${extraHTML}</div> ${
    permanent
      ? ''
      : '<div class="user__popup_removeBtn"><span class="material-icons-round material-icons">remove</span></div><span>'
  }`
  if (permanent) {
    if (!window._user_popupElems) window._user_popupElems = []

    popupElem.dataset.popup__permanent = true
    window._user_popupElems.push(popupElem)
  }

  document.body.append(popupElem)
}

(async () => {
  await FirebaseInit()
})()
const auth = getAuth()
/* if (!auth.currentUser.emailVerified) {
  createPopup(
    'Oops!',
    'You need take one more step! Check up your emails and verify email!',
    false,
    '<small>Already verfied? Try reloading the page</small>'
  )
} */

const userId = auth.currentUser.uid
document.getElementById('user_profile_photo').src = `https://avatars.dicebear.com/api/identicon/${userId}.svg`
