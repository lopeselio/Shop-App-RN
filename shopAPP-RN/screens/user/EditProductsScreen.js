import React, { useEffect, useCallback, useReducer } from 'react'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  Alert
} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux'

import HeaderButton from '../../components/UI/HeaderButton'
import * as productsActions from '../../store/actions/products'

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'
const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    }
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    }
    let formIsValid = true
    for (const key in updatedValidities) {
      formIsValid = formIsValid && updatedValidities[key]
    }
    return {
      formIsValid: formIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    }

  }
}
const EditProductScreen = props => {
  const prodId = props.navigation.getParam('productId')
  const editedProduct = useSelector(state =>
    state.products.userProducts.find(prod => prod.id === prodId)
  )
  const dispatch = useDispatch()
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      description: editedProduct ? editedProduct.description : '',
      price: ''
    },
    inputValidities: {
      title: !!editedProduct,
      imageUrl: !!editedProduct,
      description: !!editedProduct,
      price: !!editedProduct
    },
    formIsValid: !!editedProduct
  })

  // const [title, setTitle] = useState(editedProduct ? editedProduct.title : '')
  // const [titleIsValid, setTitleIsValid] = useState(false)
  // const [imageUrl, setImageUrl] = useState(
  //   editedProduct ? editedProduct.imageUrl : ''
  // )
  // const [price, setPrice] = useState('')
  // const [description, setDescription] = useState(
  //   editedProduct ? editedProduct.description : ''
  // )

  const submitHandler = useCallback(() => {
    if (!titleIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form!',
        [{ text: 'Okay' }]
      )
    }
    if (editedProduct) {
      dispatch(
        productsActions.updateProduct(prodId, title, description, imageUrl)
      )
    } else {
      dispatch(
        productsActions.createProduct(title, description, imageUrl, +price)
      )
    }
  }, [dispatch, prodId, title, description, imageUrl, price, titleIsValid])

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler })
  }, [submitHandler])

  const textChangeHandler = (inputIdentifier, text) => {
    let isValid = false
    if (text.trim().length > 0) {
      isValid = true
      // setTitleIsValid(false)
    } 
    // setTitle(text)
    dispatchFormState({ 
      type: FORM_INPUT_UPDATE,
      value: text,
      isValid: isValid,
      input: inputIdentifier
    })
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={textChangeHandler.bind(this, 'title')}
            autoCapitalize='sentences'
            autoCorrect
            returnKeyType='next'
            onEndEditing={() => console.log('onEnd Editing')}
            onSubmitEditing={() => console.log('onSubmit Editing')}
          />
          {!titleIsValid && <Text> Please enter a valid title!</Text>}
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={textChangeHandler.bind(this, 'imageUrl')}
          />
        </View>
        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={textChangeHandler.bind(this, 'price')}
              keyboardType='decimal-pad'
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={textChangeHandler.bind(this, 'description')}
          />
        </View>
      </View>
    </ScrollView>
  )
}

EditProductScreen.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam('submit')
  return {
    headerTitle: navData.navigation.getParam('productId')
      ? 'Edit Product'
      : 'Add Product',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Save'
          iconName={
            Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
          }
          onPress={submitFn}
        />
      </HeaderButtons>
    )
  }
}

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  formControl: {
    width: '100%'
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  }
})

export default EditProductScreen
