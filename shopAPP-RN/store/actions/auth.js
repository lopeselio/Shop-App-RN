// 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDnOdYmXTl9w2QUerDiD8seec0dIDlbJOo',
// 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDnOdYmXTl9w2QUerDiD8seec0dIDlbJOo',
export const SIGNUP = 'SIGNUP'
export const LOGIN = 'LOGIN'

export const signup = (email, password) => {
  const fetch = require('node-fetch')
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDnOdYmXTl9w2QUerDiD8seec0dIDlbJOo',

      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    )

    if (!response.ok) {
      const errorResData = await response.json()
      const errorId = errorResData.error.message
      let message = 'Something went wrong!'
      if (errorId === 'EMAIL_EXISTS') {
        message = 'This email exists already!'
      }
      throw new Error(message)
    }

    const resData = await response.json()
    console.log(resData)
    dispatch({ type: SIGNUP, token: resData.idToken, userId: resData.localId })
  }
}

export const login = (email, password) => {
  const fetch = require('node-fetch')
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBY8UJq_xLD0nEe1HZHuvEOUfYIS9gg4pA',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    )

    if (!response.ok) {
      const errorResData = await response.json()
      const errorId = errorResData.error.message
      let message = 'Something went wrong!'
      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'This email could not be found!'
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'This password is not valid!'
      }
      throw new Error(message)
    }

    const resData = await response.json()
    console.log(resData)
    dispatch({ type: LOGIN, token: resData.idToken, userId: resData.localId })
  }
}
