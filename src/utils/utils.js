export const getRequestParams = (reqBody, method) => {
  return {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reqBody)

  }
}
export const messageColor = {
  success: 'success',
  error: 'danger',
  warning: 'warning'
}