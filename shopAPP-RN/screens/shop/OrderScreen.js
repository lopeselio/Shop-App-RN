import React from 'react'
import { Text, View, Flatlist, Platform } from 'react-native'
import { useSelector } from 'react-redux'
import HeaderButton from '../../components/UI/HeaderButton'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

const OrdersScreen = props => {
  const orders = useSelector(state => state.orders.orders)
  return <Flatlist data={orders} keyExtractor={item => item.id} renderItem={itemData => <Text>{itemData.item.totalAmount}</Text>} />
}

OrdersScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Your Orders',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Cart'
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer()
          }}
        />
      </HeaderButtons>
    )
  }
  // headerTitle: 'Your Orders'
}
export default OrdersScreen
