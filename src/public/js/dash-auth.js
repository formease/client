import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { FirebaseInit } from './auth'

(async () => {
  await FirebaseInit()
  const auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('User is signed in')
      document.getElementById('user_profile_photo').src = user.photoURL
    } else {
      console.info('no user')
      document.location.href = '/auth'
    }
  })
  document.getElementById('sign_out-auth').addEventListener('click', () => {
    signOut(auth).then(() => {
      document.location.href = '/'
    }).catch((error) => {
      alert(error)
      console.error(error)
    })
  })
})()
