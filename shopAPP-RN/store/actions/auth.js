// 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDnOdYmXTl9w2QUerDiD8seec0dIDlbJOo',
// 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDnOdYmXTl9w2QUerDiD8seec0dIDlbJOo',
import { AsyncStorage } from 'react-native'
// export const SIGNUP = 'SIGNUP'
// export const LOGIN = 'LOGIN'
export const AUTHENTICATE = 'AUTHENTICATE'
export const LOGOUT = 'LOGOUT'

export const authenticate = (userId, token) => {
  return { type: AUTHENTICATE, userId: userId, token: token };
};

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
    // dispatch({ type: SIGNUP, token: resData.idToken, userId: resData.localId })
    dispatch(authenticate(resData.localId, resData.idToken))
    const expirationDate = new Date(new Date().getTime + parseInt(resData.expiresIn) * 1000)
    SaveDataToStorage(resData.idToken, resData.localId, expirationDate)
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
    dispatch(authenticate(resData.localId, resData.idToken))
    // dispatch({ type: LOGIN, token: resData.idToken, userId: resData.localId })
    const expirationDate = new Date(new Date().getTime + parseInt(resData.expiresIn) * 1000)
    SaveDataToStorage(resData.idToken, resData.localId, expirationDate)
  }
}

export const logout = () => {
  return { type: LOGOUT }
}

const SaveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem('userData', JSON.stringify({
    token: token,
    userId: userId,
    expiryDate: expirationDate.toISOString()
  }))
}
