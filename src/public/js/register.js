import { FirebaseInit } from './auth'
import { getAuth, signInWithRedirect, GoogleAuthProvider, onAuthStateChanged, GithubAuthProvider } from 'firebase/auth'

let localTheme = localStorage.getItem('theme')
const preferedTheme = window.matchMedia('(prefers-color-scheme: dark)')

const themeChecker = () => {
  if (localTheme) {
    localTheme = localStorage.getItem('theme') 
    document.documentElement.dataset.theme = localTheme
  } else if (preferedTheme.matches) {
    document.documentElement.dataset.theme = 'dark'
    localStorage.setItem('theme', 'dark')
  } else {
    localStorage.setItem('theme', 'light')
  }
}
themeChecker()
window.addEventListener('storage', (e) =>{
  let storageArea = e.storageArea;
  let keyChanged = e.key;

  if (keyChanged !== 'theme') return;
  localStorage.setItem(keyChanged, storageArea.theme)
  themeChecker()
})

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
  const auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('User is signed in')
      document.location.href = '/dashboard'
    } else {
      console.info('no user')
    }
  })
  document.getElementById('google_auth').addEventListener('click', () => {
    const auth = getAuth()
    const provider = new GoogleAuthProvider()
    signInWithRedirect(auth, provider)
  })
  document.getElementById('github_auth').addEventListener('click', () => {
    const provider = new GithubAuthProvider()
    const auth = getAuth()
    signInWithRedirect(auth, provider)
  })
}
runner()
