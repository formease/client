'use strict'

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
  document.querySelector('aside').classList.toggle('active')
})
