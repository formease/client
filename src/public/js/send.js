export const sendRequest = async (request) => {
  const response = await fetch('/createForm', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  })
  if (response.status !== 200) {
    alert('Error Creating a Porject: ' + response.status)
    console.error('Error Creating a Porject: ' + response.status)
  }
}
