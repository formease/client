import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth'
const FirebaseInit = () => {
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
const stateManager = () => {
  return new Promise((resolve, reject) => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.info('welcoming now...' + user.email)
      } else {
        console.warn('onAuthStateChanged running with no user')
      }
    })
    resolve()
  })
}

const createUser = (email, password) => {
  const auth = getAuth()
  createUserWithEmailAndPassword(auth, email, password)
    .catch((error) => {
      console.error(error.code, error.message)
    })
}

(async () => {
  await FirebaseInit()
  if (document.getElementById('auth-page')) {
    await stateManager()
    document.getElementById('signup-form').addEventListener('submit', (e) => {
      e.preventDefault()
      const userEmail = document.getElementById('signup-email').textContent
      console.log(userEmail)
      const userPassword = document.getElementById('signup-pass').textContent
      console.info(userPassword)
      createUser(userEmail, userPassword)
    })
  }
})()

// # sourceMappingURL=http://localhost:3000/public/dist/auth.js.map
