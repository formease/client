'use strict'

const THEME_BTN = document.getElementById('theme-toggler')
let currentTheme = document.documentElement.dataset.theme
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
