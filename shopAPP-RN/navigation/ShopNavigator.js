// import React from 'react'
import {
  // createStackNavigator,
  // createDrawerNavigator,
  createAppContainer
} from 'react-navigation'
import { Platform } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
// import { Ionicons } from '@expo/vector-icons'

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
// import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
// import CartScreen from '../screens/shop/CartScreen'
// import OrdersScreen from '../screens/shop/OrdersScreen'
// import UserProductsScreen from '../screens/user/UserProductsScreen'
// import EditProductScreen from '../screens/user/EditProductScreen'
import Colors from '../constants/Colors'

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
}

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen

  },
  {
    defaultNavigationOptions: defaultNavOptions

  }

)

export default createAppContainer(ProductsNavigator)
