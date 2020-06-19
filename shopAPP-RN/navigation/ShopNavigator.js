import { createStackNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation'
import { Platform } from 'react-native'
import OrdersScreen from '../screens/shop/OrderScreen'
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import CartScreen from '../screens/shop/CartScreen'
import Colors from '../constants/Colors'

const defaultNavOptions = {

  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary

}
const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
)

const OrdersNavigator = createStackNavigator({
  orders: OrdersScreen
}, {
  defaultNavigationOptions: defaultNavOptions
})

const ShopNavigator = createDrawerNavigator({
  Products: ProductsNavigator,
  Orders: OrdersNavigator
}, {
  contentOptions: {
    activeTintColor: Colors.primary
  }
})

export default createAppContainer(ShopNavigator)
