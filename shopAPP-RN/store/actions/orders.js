export const ADD_ORDER = 'ADD_ORDER'

export const addOrder = (cartItems, totalAmount) => {
  const fetch = require('node-fetch')
  return async dispatch => {
    const date = new Date()
    const response = await fetch(
      'https://shopapp-reactnative-e0556.firebaseio.com/orders/u1.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString()
        })
      }
    )

    if (!response.ok) {
      throw new Error('Something went wrong!')
    }

    const resData = await response.json()

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items: cartItems,
        amount: totalAmount,
        date: date
      }
    })
  }
}
