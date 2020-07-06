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
      throw new Error('Something went wrong!')
    }

    const resData = await response.json()
    console.log(resData)
    dispatch({ type: SIGNUP })
  }
}

export const login = (email, password) => {
  const fetch = require('node-fetch')
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDnOdYmXTl9w2QUerDiD8seec0dIDlbJOo',
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
      throw new Error('Something went wrong!')
    }

    const resData = await response.json()
    console.log(resData)
    dispatch({ type: LOGIN })
  }
}
