import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
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
export const stateManager = () => {
  return new Promise((resolve, reject) => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.info('welcoming now...' + user.email)
        if (!user.emailVerified) {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              console.info('email sent')
            }).catch((error) => {
              console.error(error.code, error.message)
              alert('error', error.message)
            })
        }
        if (document.getElementById('auth-page')) {
          document.location.href = '/dashboard'
        }
      } else {
        console.warn('onAuthStateChanged running with no user')
        if (document.getElementById('dashboard-page')) {
          document.location.href = '/auth'
        }
      }
    })
    resolve()
  })
}

export const createUser = (email, password) => {
  const auth = getAuth()
  createUserWithEmailAndPassword(auth, email, password)
    .catch((error) => {
      console.error(error.code, error.message)
      alert('error', error.message)
    })
}

export const loginUser = (email, password) => {
  const auth = getAuth()
  signInWithEmailAndPassword(auth, email, password)
    .catch((error) => {
      console.error(error.code, error.message)
      alert('error', error.message)
    }).then(() => {
      sendEmailVerification(auth.currentUser)
        .then(() => {
          console.info('email sent')
        }).catch((error) => {
          console.error(error.code, error.message)
          alert('error', error.message)
        })
    })
}

(async () => {
  await FirebaseInit()
  await stateManager()
  if (document.getElementById('auth-page')) {
    document.getElementById('signup-form').addEventListener('submit', (e) => {
      e.preventDefault()
      const userEmail = document.getElementById('signup-email').value
      const userPassword = document.getElementById('signup-pass').value
      createUser(userEmail, userPassword)
    })
    document.getElementById('signin-form').addEventListener('submit', (e) => {
      e.preventDefault()
      const userEmail = document.getElementById('signin-email').value
      const userPassword = document.getElementById('signin-pass').value
      loginUser(userEmail, userPassword)
    })
  }
})()

// # sourceMappingURL=/public/dist/auth.js.map
