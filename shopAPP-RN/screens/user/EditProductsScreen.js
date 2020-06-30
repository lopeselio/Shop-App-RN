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
import Input from '../../components/UI/input'
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
    let updatedFormIsValid = true
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    }
  }
  return state
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
    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form!',
        [{ text: 'Okay' }]
      )
    }
    if (editedProduct) {
      dispatch(
        productsActions.updateProduct(prodId, formState.inputValues.title, formState.inputValues.description, formState.inputValues.imageUrl)
      )
    } else {
      dispatch(
        productsActions.createProduct(formState.inputValues.title, formState.inputValues.description, formState.inputValues.imageUrl, +formState.inputValues.price)
      )
    }
    props.navigation.goBack()
  }, [dispatch, prodId, formState])

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
        <Input 
          label='Title'
          errorText='Please enter a valid Title'
          keyboardType='default'
          autoCapitalize='sentences'
          autoCorrect
          returnKeyType='next'
        /> 
        <Input 
          label='Image URL'
          errorText='Please enter a valid iamge url'
          keyboardType='default'
          // autoCapitalize='sentences'
          // autoCorrect
          returnKeyType='next'
        />        
        
        </View>
        {editedProduct ? null : (
          <Input 
          label='Price'
          errorText='Please enter a valid price'
          keyboardType='decimal-pa'
          autoCapitalize='sentences'
          // autoCorrect
          returnKeyType='next'
        /> 
        )}
        <Input 
          label='Description'
          errorText='Please enter a valid Description'
          keyboardType='default'
          autoCapitalize='sentences'
          autoCorrect
          multiline
          numbeOfLines={3}
          // returnKeyType='next'
        /> 
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
  }
})

export default EditProductScreen
