import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { FirebaseInit } from './auth'
import Swal from 'sweetalert2'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
;(async () => {
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
  const logoutBtn = document.querySelector('[data-logout-btn]')

  logoutBtn.addEventListener('click', () => {
    try {
      // deepcode ignore PromiseNotCaughtGeneral: <not required>
      Swal.fire({
        title: 'Really wanna logout?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Logout',
        footer: 'Looks like you did enough work..',
        allowEscapeKey: false,
        allowEnterKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          const auth = getAuth()
          signOut(auth)
            .then(() => {
              document.cookie = 'user= ; expires = Thu, 01 Jan 1970 00:00:00 GMT'
              document.location.href = '/'
            })
            .catch((error) => {
              alert(error)
              console.error(error)
            })
        }
      })
    } catch (error) {
      console.log(error)
    }
  })
})()
