import { initializeApp } from 'firebase/app'
import { getAuth, signInWithRedirect, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth'

export const FirebaseInit = () => {
  return new Promise((resolve, reject) => {
    const config = {
      apiKey: 'AIzaSyCtLctmVtf5LgHJv2y4h5eVx3h6DsM4KRY',
      authDomain: 'forms-server.firebaseapp.com',
      projectId: 'forms-server',
      storageBucket: 'forms-server.appspot.com',
      messagingSenderId: '265562888456',
      appId: '1:265562888456:web:0ad6cfe8a44ef7af7234bd'
    }

    initializeApp(config)
    resolve()
  })
}

export const loginGoogle = () => {
  return new Promise((resolve, reject) => {
    const auth = getAuth()
    const provider = new GoogleAuthProvider()
    signInWithRedirect(auth, provider)
    resolve()
  })
}

export const stateManager = () => {
  const auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('User is signed in')
      document.location.href = '/dashboard'
    } else {
      console.info('no user')
    }
  })
}
