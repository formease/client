import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { FirebaseInit } from './auth'
(async () => {
  await FirebaseInit()
  const auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('User is signed in')
      document.getElementById('auth-button').textContent = 'Dashboard'
      document.getElementById('auth-button').href = 'dashboard'
    } else {
      console.info('no user')
      document.getElementById('auth-button').href = 'auth'
    }
  })
})()
