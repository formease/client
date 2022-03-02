import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { FirebaseInit } from './auth'
export const sendRequest = async (request) => {
  await FirebaseInit()
  const auth = getAuth()
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const sendBody = {
        request: request,
        user: user.uid,
      }
      const response = await fetch('/createForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendBody),
      })
      if (response.status !== 200) {
        alert('Error Creating a Porject: ' + response.status)
        console.error('Error Creating a Porject: ' + response.status)
      }
    } else {
      console.info('no user')
      document.getElementById('auth-button').href = 'auth'
    }
  })
}
