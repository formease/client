import { projectFail } from './pop-up.js'
export const sendRequest = async (request) => {
  const sendBody = {
    request: request,
    user: localStorage.getItem('user'),
  }
  const response = await fetch('/createForm', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sendBody),
  })
  if (response.status !== 200) {
    projectFail()
    throw new Error(`Error: ${response.status} - ${response.statusText}`)
  }
  return response.json()
}
