export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

export const deleteProduct = productId => {
  return { type: DELETE_PRODUCT, pid: productId }
}

export const createProduct = (title, description, imageUrl, price) => {
  const fetch = require('node-fetch')
  return dispatch => {
    fetch('https://shopapp-rn-f4814.firebaseio.com/products.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        price
      })
    })
    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        title,
        description,
        imageUrl,
        price
      }
    })
    // async code
  }
}

export const updateProduct = (id, title, description, imageUrl) => {
  return {
    type: UPDATE_PRODUCT,
    pid: id,
    productData: {
      title,
      description,
      imageUrl
    }
  }
}
