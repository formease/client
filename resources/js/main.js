import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { FirebaseInit } from './auth'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import '../css/main.css'
;(async () => {
  await FirebaseInit()
  const auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('User is signed in')
      localStorage.setItem('user', user.uid)
      document.getElementById('auth-button').textContent = 'Dashboard'
      document.getElementById('auth-button').href = `dashboard/${user.uid}`
      user
        .getIdToken(true)
        .catch((error) => {
          console.error(error)
        })
        .then((token) => {
          document.cookie = `user_verification=${token};expires = ${new Date(
            new Date().getTime() + 60 * 60 * 1000
          ).toUTCString()}`
        })
    } else {
      console.info('no user')
      document.getElementById('auth-button').href = 'auth'
    }
  })
})()
