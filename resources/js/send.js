import { projectFail, projectFailDelete } from './pop-up.js'
export const sendRequest = async (request) => {
  const sendBody = {
    request: request,
  }
  const response = await fetch('/createForm', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sendBody),
  })
  console.log(response.status)
  if (response.status !== 202) {
    projectFail()
    throw new Error(`Error: ${response.status} - ${response.message}`)
  }
  return response.json()
}

export const deleteRequest = async (request) => {
  const sendBody = {
    request: request,
  }
  const response = await fetch('/deleteForm', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sendBody),
  })
  if (response.status !== 202) {
    projectFailDelete()
    throw new Error(`Error: ${response.status} - ${response.message}`)
  }
  return response.json()
}
