'use strict'

// Mode Toggler feature
const REGISTER_SECTION = document.querySelector('.register')
const SIGNIN_SECTION = document.querySelector('.sign-in')
const MODE_SWITCHER_CONTAINER = document.querySelector('.mode-switcher-container')

MODE_SWITCHER_CONTAINER.firstElementChild.addEventListener('click', function () {
  this.parentNode.dataset.currentMode = 'register'
  REGISTER_SECTION.classList.remove('hidden')
  SIGNIN_SECTION.classList.add('hidden')
})
MODE_SWITCHER_CONTAINER.lastElementChild.addEventListener('click', function () {
  this.parentNode.dataset.currentMode = 'signin'
  REGISTER_SECTION.classList.add('hidden')
  SIGNIN_SECTION.classList.remove('hidden')
})

// Automatic theme change
const defaultDarkMode = window.matchMedia('(prefers-color-scheme:dark)')

if (defaultDarkMode.matches) {
  document.documentElement.dataset.theme = 'dark'
}

// Password length check
const REGISTER_FORM = REGISTER_SECTION.querySelector('form')
const SIGNIN_FORM = SIGNIN_SECTION.querySelector('form')

REGISTER_FORM.addEventListener('submit', passwordLengthCheck)
SIGNIN_FORM.addEventListener('submit', passwordLengthCheck)

function passwordLengthCheck (e) {
  const form = e.currentTarget
  const passInput = form.querySelector('input[type="password"]')
  const errorBox = form.querySelector('.error-box')

  const valid = passInput.value.length >= 8

  if (!valid) {
    errorBox.innerHTML = 'Password should have least 8 characters.'
    e.preventDefault()
  }
}

// input placeholder effect

const TEXT_INPUTS = document.querySelectorAll('input[type="email"], input[type="password"]')

TEXT_INPUTS.forEach((input) => {
  input.addEventListener('input', inputPlaceholderEffectADD)
  input.addEventListener('blur', inputPlaceholderEffectREMOVE)
})
function inputPlaceholderEffectADD (e) {
  const input = e.currentTarget

  if (input.value) {
    input.previousElementSibling.classList.add('active')
  }
}
function inputPlaceholderEffectREMOVE (e) {
  const input = e.currentTarget

  if (!input.value) {
    input.previousElementSibling.classList.remove('active')
  }
}

// change section depending on the url
(function () {
  const currentURL = window.location.href
  const URLObj = new URL(currentURL)

  const mode = URLObj.searchParams.get('mode')

  if (mode?.toLowerCase() === 'signin') {
    document.querySelector('.mode-switcher-container').dataset.currentMode = 'sigin'
    document.querySelector('[data-signin-switcher]').click()
  }
})()

document.querySelector('#light-button').addEventListener('click', () => {
  document.documentElement.dataset.theme = 'light'
})
document.querySelector('#dark-button').addEventListener('click', () => {
  document.documentElement.dataset.theme = 'dark'
})

// Forget password dialog box
document.querySelector('.forget-password').addEventListener('click', function () {
  const container = document.createElement('div')
  container.classList.add('forget-password__dialog')
  container.innerHTML = '<form action="POST" class="forget-password__dialog--form"> <button class="forget-password__backBtn">Oh wait, I remember now!</button><h2>Change your forgotten password!</h2><div><label for="forget-password__email">Please enter your email</label><input type="email" id="forget-password__email" autocomplete="off" required></div><input type="submit" value="I forgot password :("></form>'

  container.querySelector('.forget-password__backBtn').addEventListener('click', () => {
    container.remove()
  })

  const input = container.querySelector('#forget-password__email')
  input.addEventListener('input', inputPlaceholderEffectADD)
  input.addEventListener('blur', inputPlaceholderEffectREMOVE)

  document.body.append(container)
})
